/* Flagship: what division means (ages 8–9; National Curriculum in England Year 3/4 multiplication and division, NCETM
   'grouping and sharing' structures; CCSS 3.OA.A.2 "interpret whole-number quotients … as the number of objects in each
   share … or as a number of shares"). Bag 12 cookies in threes (how many groups?), deal 12 cookies onto 3 plates (how
   many in each?), jump back in fives from 20 (repeated subtraction), sort four stories by which question they ask, and
   share 3 pizzas between 12 children to see that 3 ÷ 12 is not 12 ÷ 3. Every canvas tap has a button twin. */
(()=>{
const P={ink:'#111827',soft:'#4b5563',edge:'#334155',card:'#ffffff',good:'#166534',goodBg:'#dcfce7',bad:'#9f1239',note:'#f1f5ff',
 cookie:'#b45309',chip:'#3f1d0b',bag:'#0f766e',plate:'#e2e8f0',line:'#1e293b',jump:'#7c3aed',pizza:'#f59e0b',crust:'#92400e'};
const STORIES=[{t:'28 chairs go in rows of 7. How many rows?',g:1},{t:'28 pencils are shared by 7 pots. How many in each pot?',g:0},
 {t:'30 eggs go in boxes of 6. How many boxes?',g:1},{t:'30 cards are dealt to 6 players. How many does each get?',g:0}];
VIS.reg('flagdivmean',c=>{let A,X,ctl,quiz,qn=-1,run=0;const S={after:()=>{}};
const sc=v=>Math.round(v*(A.narrow?1:1.1));
const txt=(s,x,y,size,col,align,weight)=>{X.font=`${weight||700} ${sc(size)}px system-ui,sans-serif`;X.fillStyle=col||P.ink;X.textAlign=align||'center';X.textBaseline='middle';X.fillText(String(s),x,y,A.W-12)};
function wrap(s,maxW,size){X.font=`700 ${sc(size)}px system-ui,sans-serif`;const rows=[];let row='';
 String(s).split(' ').forEach(w=>{const tryRow=row?row+' '+w:w;if(row&&X.measureText(tryRow).width>maxW){rows.push(row);row=w}else row=tryRow});rows.push(row);return rows}
function box(x,y,w,h,fill,stroke,lw,r){A.paint.rrect(x,y,w,h,r==null?9:r);X.fillStyle=fill;X.fill();if(stroke){X.lineWidth=lw||2;X.strokeStyle=stroke;X.stroke()}}
function banner(s,won){const rows=wrap(s,A.W-36,13),gap=sc(13)+4,h=Math.max(sc(42),rows.length*gap+14);box(10,8,A.W-20,h,won?P.goodBg:P.note,won?P.good:P.edge);
 rows.forEach((r,i)=>txt(r,A.W/2,8+h/2+(i-(rows.length-1)/2)*gap,13,won?P.good:P.ink));return 8+h}
function note(){if(!S.say)return;const rows=wrap((S.wrong?'✗ ':'✓ ')+S.say,A.W-40,13),gap=sc(13)+5,h=rows.length*gap+10,y=A.H-h-8;
 box(10,y,A.W-20,h,P.card,S.wrong?P.bad:P.good,3);rows.forEach((r,i)=>txt(r,A.W/2,y+5+gap*(i+.5),13,S.wrong?P.bad:P.ink))}
function cookie(x,y,r){X.fillStyle=P.cookie;X.beginPath();X.arc(x,y,r,0,7);X.fill();X.fillStyle=P.chip;[[-.35,-.3],[.3,-.1],[-.1,.35],[.38,.4]].forEach(([a,b])=>{X.beginPath();X.arc(x+a*r,y+b*r,Math.max(1.5,r*.14),0,7);X.fill()})}
const live=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const miss=s=>{S.wrong=true;S.say=s;A.sound.miss();sync()};
const hit=s=>{S.wrong=false;S.say=s;A.sound.pop();sync()};
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---- step 0: grouping ---- */
function bagThree(){if(S.ok||S.left<3)return;S.left-=3;S.bags++;A.sound.tick();
 if(S.left===0){S.ok=true;return hit('No cookies left. You made 4 bags, so 12 ÷ 3 = 4. Here the 4 counts groups.')}
 S.wrong=false;S.say=`Bag ${S.bags} holds 3. ${S.left} cookies still in the pile.`;sync()}
function drawGrouping(){const top=banner(S.ok?'12 ÷ 3 = 4: four bags of 3. Grouping asks how many groups.':'12 cookies. Tap the pile to fill a bag with 3. How many bags can you fill?',S.ok);
 const r=sc(11),gx=A.W/2-3*r*2.6/2+r*1.3,gy=top+sc(26);S.pile={x:gx-r*2,y:gy-r*1.6,w:r*2.6*3+r*2,h:r*2.6*4+r};
 box(S.pile.x,S.pile.y,S.pile.w,S.pile.h,'#fff7ed',P.cookie,2);for(let i=0;i<S.left;i++)cookie(gx+(i%3)*r*2.6,gy+Math.floor(i/3)*r*2.6,r);
 txt(S.left?`pile: ${S.left}`:'pile is empty',A.W/2,S.pile.y+S.pile.h+sc(12),12,P.soft);
 const by=S.pile.y+S.pile.h+sc(32),bw=Math.min(sc(76),(A.W-40)/4-8);
 for(let b=0;b<4;b++){const bx=20+b*((A.W-40)/4)+((A.W-40)/4-bw)/2;box(bx,by,bw,sc(56),b<S.bags?'#ccfbf1':'#f8fafc',b<S.bags?P.bag:'#94a3b8',2);
  if(b<S.bags){for(let k=0;k<3;k++)cookie(bx+bw/2+(k-1)*r*2.1,by+sc(24),r*.8);txt('bag '+(b+1),bx+bw/2,by+sc(46),11,P.bag)}else txt('empty',bx+bw/2,by+sc(30),11,P.soft)}}
/* ---- step 1: sharing ---- */
function give(i){if(S.ok)return;if(!S.left){return miss('The pile is empty. Start again to share fairly.')}S.plates[i]++;S.left--;A.sound.tick();
 if(S.left===0){const [a,b,d]=S.plates;if(a===b&&b===d){S.ok=true;return hit('Every plate has 4. 12 ÷ 3 = 4: this time the 4 is how many on each plate.')}
  return miss(`Not fair: the plates have ${S.plates.join(', ')}. Sharing means every plate ends with the same number. Start again.`)}
 S.wrong=false;S.say=`Plate ${i+1} has ${S.plates[i]}. ${S.left} left to give out.`;sync()}
function dealRound(){if(S.ok)return;if(S.left<3&&S.left>0)return miss('Fewer than 3 left, so a full round will not go.');for(let i=0;i<3;i++)if(S.left)give(i)}
function restart(){const keep=S.after;reset();S.after=keep;sync()}
function drawSharing(){const top=banner(S.ok?'Three plates of 4. Sharing asks how many in each group.':'12 cookies, 3 plates. Tap a plate to give it one cookie. Share them all out fairly.',S.ok);
 const r=sc(9);txt(`pile: ${S.left}`,A.W/2,top+sc(16),13,P.soft);for(let i=0;i<S.left;i++)cookie(A.W/2+(i%6-2.5)*r*2.4,top+sc(36)+Math.floor(i/6)*r*2.4,r);
 const py=top+sc(96),pw=(A.W-40)/3;S.plateHit=[];
 for(let i=0;i<3;i++){const cx=20+pw*i+pw/2,R=Math.min(pw/2-6,sc(52));X.fillStyle=P.plate;X.beginPath();X.arc(cx,py+R,R,0,7);X.fill();X.strokeStyle=P.edge;X.lineWidth=2;X.stroke();
  for(let k=0;k<S.plates[i];k++){const ang=k/Math.max(4,S.plates[i])*6.283;cookie(cx+Math.cos(ang)*R*.5,py+R+Math.sin(ang)*R*.5,r)}
  txt(`plate ${i+1}: ${S.plates[i]}`,cx,py+2*R+sc(14),12,P.ink);S.plateHit.push({x:cx-R,y:py,w:2*R,h:2*R})}}
/* ---- step 2: repeated subtraction ---- */
const NL=()=>({x:sc(24),w:A.W-2*sc(24),y:A.H*.56});
function hop(){if(S.ok)return;if(S.at<5)return;S.trail.push(S.at);S.at-=5;A.sound.tick();
 if(S.at===0){S.ok=true;return hit(`${S.trail.length} jumps of 5 take 20 back to 0. 20 ÷ 5 = 4.`)}S.wrong=false;S.say=`Jump ${S.trail.length}: 20 − ${5*S.trail.length} = ${S.at}.`;sync()}
function drawLine(){const top=banner(S.ok?'Division undoes repeated adding: take away 5 again and again and count the jumps.':'Start at 20. Tap left of the dot to jump back 5. How many jumps reach 0?',S.ok),L=NL();
 X.strokeStyle=P.line;X.lineWidth=3;X.beginPath();X.moveTo(L.x,L.y);X.lineTo(L.x+L.w,L.y);X.stroke();
 for(let v=0;v<=20;v++){const x=L.x+L.w*v/20,big=v%5===0;X.lineWidth=big?2.5:1;X.beginPath();X.moveTo(x,L.y-(big?10:5));X.lineTo(x,L.y+(big?10:5));X.stroke();if(big)txt(v,x,L.y+sc(22),12,P.ink)}
 S.trail.forEach((from,j)=>{const x0=L.x+L.w*from/20,x1=L.x+L.w*(from-5)/20,h=sc(34);X.strokeStyle=P.jump;X.lineWidth=3;X.beginPath();X.moveTo(x0,L.y-4);X.quadraticCurveTo((x0+x1)/2,L.y-h*2,x1,L.y-4);X.stroke();
  txt('−5',(x0+x1)/2,L.y-h-sc(6),12,P.jump);txt(j+1,(x0+x1)/2,L.y-h+sc(9),11,P.soft)});
 const dx=L.x+L.w*S.at/20;X.fillStyle=S.ok?P.good:P.jump;X.beginPath();X.arc(dx,L.y,sc(11),0,7);X.fill();X.strokeStyle='#fff';X.lineWidth=3;X.stroke();
 txt(`jumps: ${S.trail.length}`,A.W/2,L.y+sc(52),15,S.ok?P.good:P.ink);S.lineHit={x:0,y:L.y-sc(80),w:dx,h:sc(110)}}
/* ---- step 3: sort the stories ---- */
function pickStory(i){if(S.ok||S.placed[i]!=null)return;S.sel=i;A.sound.tick();S.wrong=false;S.say='Now tap the box: is the answer a number of groups, or the number in each group?';sync()}
function drop(g){if(S.ok)return;if(S.sel==null)return miss('Tap a story first, then a box.');const st=STORIES[S.sel];
 if(st.g!==g){return miss(st.g?`This story tells you the size of each group (${st.t.match(/of (\d+)/)[1]}) and asks how many groups. That is grouping.`:'Here you know how many groups there are and must find how many go in each one. That is sharing.')}
 S.placed[S.sel]=g;S.sel=null;if(S.placed.every(v=>v!=null)){S.ok=true;return hit('All four sorted. Both kinds are division: 28 ÷ 7 = 4 and 30 ÷ 6 = 5 either way.')}hit('Yes. Pick the next story.')}
function drawStories(){const top=banner(S.ok?'Same calculation, two questions: how many groups (grouping) or how many in each (sharing).':'Tap a story, then tap the box it belongs in.',S.ok);
 const binH=sc(46),binY=A.H-binH-(S.say?wrap('✓ '+S.say,A.W-40,13).length*(sc(13)+5)+24:sc(12));let y=top+sc(8);const w=A.W-28;S.storyHit=[];
 STORIES.forEach((st,i)=>{const rows=wrap(st.t,w-sc(70),12),h=rows.length*(sc(12)+4)+12,placed=S.placed[i];
  box(14,y,w,h,placed==null?(S.sel===i?'#ede9fe':P.card):P.goodBg,S.sel===i?P.jump:placed==null?P.edge:P.good,S.sel===i?3:1.5);
  rows.forEach((r,k)=>txt(r,26,y+8+(k+.5)*(sc(12)+4),12,P.ink,'left',600));if(placed!=null)txt(placed?'groups':'each',14+w-8,y+h/2,11,P.good,'right');
  S.storyHit.push({x:14,y,w,h});y+=h+sc(6)});
 if(S.ok){S.binHit=[];return}
 S.binHit=[0,1].map(g=>{const bw=(A.W-36)/2,bx=14+g*(bw+8);box(bx,binY,bw,binH,'#f8fafc',P.bag,2);
  txt(g?'How many groups?':'How many in each?',bx+bw/2,binY+binH*.38,12,P.bag);txt(g?'grouping':'sharing',bx+bw/2,binY+binH*.72,11,P.soft,'center',600);return{x:bx,y:binY,w:bw,h:binH,g}})}
/* ---- step 4: 3 pizzas between 12 children ---- */
function slice(){if(S.ok)return;S.cut=S.cut%6+1;A.sound.tick();S.wrong=false;S.say=`Each pizza in ${S.cut} slice${S.cut>1?'s':''}: ${3*S.cut} slices in all.`;sync()}
function handOut(){if(S.ok)return;const n=3*S.cut;
 if(n<12)return miss(`${n} slices for 12 children: ${12-n} get nothing. 3 pizzas cannot give each child a whole one. Cut smaller.`);
 if(n%12)return miss(`${n} slices: each child gets 1 and ${n-12} are left over. Not a fair share yet.`);
 S.ok=true;hit('12 slices, one each. Each pizza was cut into 4, so every child gets 1/4 of a pizza. 3 ÷ 12 = 1/4, but 12 ÷ 3 = 4.')}
function drawPizza(){const top=banner(S.ok?'3 pizzas ÷ 12 children = 1/4 each. 12 pizzas ÷ 3 children = 4 each. Order matters in division.':'3 pizzas, 12 children. Tap a pizza to cut every pizza smaller, then share.',S.ok);
 const R=Math.min(sc(44),(A.W-60)/6),y=top+R+sc(18);S.pizzaHit=[];
 for(let p=0;p<3;p++){const cx=A.W/2+(p-1)*(2*R+sc(16));X.fillStyle=P.pizza;X.beginPath();X.arc(cx,y,R,0,7);X.fill();X.strokeStyle=P.crust;X.lineWidth=4;X.stroke();
  X.lineWidth=2;X.strokeStyle='#fff';for(let k=0;k<S.cut&&S.cut>1;k++){const a=k/S.cut*6.283-1.571;X.beginPath();X.moveTo(cx,y);X.lineTo(cx+Math.cos(a)*R,y+Math.sin(a)*R);X.stroke()}
  S.pizzaHit.push({x:cx-R,y:y-R,w:2*R,h:2*R})}
 txt(`${3*S.cut} slices`,A.W/2,y+R+sc(16),14,P.ink);
 const cy=y+R+sc(44),cw=(A.W-28)/12,given=S.ok?12:0;for(let k=0;k<12;k++){const x=14+cw*(k+.5);X.fillStyle=k<given?P.good:'#94a3b8';X.beginPath();X.arc(x,cy,Math.min(cw*.32,sc(9)),0,7);X.fill();X.fillRect(x-Math.min(cw*.3,8),cy+sc(10),2*Math.min(cw*.3,8),sc(12))}
 txt('12 children',A.W/2,cy+sc(36),12,P.soft)}
/* ---- input and frame ---- */
const kind=()=>['group','share','line','story','pizza','quiz'][A.step];
function down(p){const k=kind();
 if(k==='group'&&within(p,S.pile)){bagThree();return true}
 if(k==='share'&&S.plateHit){const i=S.plateHit.findIndex(r=>within(p,r));if(i>=0){give(i);return true}}
 if(k==='line'&&within(p,S.lineHit)){hop();return true}
 if(k==='story'){const i=(S.storyHit||[]).findIndex(r=>within(p,r));if(i>=0){pickStory(i);return true}const b=(S.binHit||[]).find(r=>within(p,r));if(b){drop(b.g);return true}}
 if(k==='pizza'&&(S.pizzaHit||[]).some(r=>within(p,r))){slice();return true}return false}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const k=kind();if(k==='group')drawGrouping();if(k==='share')drawSharing();if(k==='line')drawLine();if(k==='story')drawStories();if(k==='pizza')drawPizza();
 if(k==='quiz'){banner('Division answers two questions: how many groups, or how many in each group. 12 ÷ 3 = 4 both ways.');const r=sc(10);for(let i=0;i<12;i++)cookie(A.W/2+(i%4-1.5)*r*3,A.H*.36+Math.floor(i/4)*r*3,r)}
 note();A.fx.draw(X)}
function sync(){const k=kind();let d='Challenge.';
 if(k==='group')d=`Pile ${S.left} cookies, ${S.bags} bags of 3.`;if(k==='share')d=`Pile ${S.left}. Plates hold ${S.plates.join(', ')}.`;
 if(k==='line')d=`Number line 0 to 20. Dot at ${S.at} after ${S.trail.length} jumps of 5.`;
 if(k==='story')d=STORIES.map((s,i)=>`${s.t} ${S.placed[i]==null?(S.sel===i?'selected':'not sorted'):S.placed[i]?'grouping':'sharing'}.`).join(' ');
 if(k==='pizza')d=`3 pizzas each cut into ${S.cut}, ${3*S.cut} slices for 12 children.`;
 live((S.say?S.say+' ':'')+d);controls();S.after()}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),add=(label,fn,aria)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':aria||null},ctl,label).onclick=fn};
 if(k==='group'&&!S.ok)add('Fill a bag of 3',bagThree);
 if(k==='share'&&!S.ok){[0,1,2].forEach(i=>add(`Plate ${i+1} +1`,()=>give(i),`Give plate ${i+1} one cookie`));add('One each',dealRound,'Give every plate one cookie');add('Start again',restart)}
 if(k==='line'&&!S.ok)add('Jump back 5',hop);
 if(k==='story'&&!S.ok){STORIES.forEach((s,i)=>{if(S.placed[i]==null)add(`Story ${i+1}`,()=>pickStory(i),'Select: '+s.t)});add('How many groups?',()=>drop(1),'Put it in: how many groups');add('How many in each?',()=>drop(0),'Put it in: how many in each')}
 if(k==='pizza'&&!S.ok){add('Cut smaller',slice,'Cut every pizza into more slices');add('Share out',handOut,'Share the slices between 12 children')}
 A.redraw()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++run;fns.forEach((f,j)=>setTimeout(()=>{if(id===run)f()},(j+1)*(A.reduced()?30:ms)))};
function reset(){run++;Object.assign(S,{after:()=>{},ok:false,say:'',wrong:false,left:12,bags:0,plates:[0,0,0],at:20,trail:[],placed:[null,null,null,null],sel:null,cut:1})}
const times=(f,n)=>Array.from({length:n},()=>f);
const steps=[
{h:'Grouping',p:'You know the size of each group. Division tells you how many groups you can make.',
predict:{q:'12 cookies, 3 in each bag. How many bags?',opts:['4','3','36'],ans:0},
task:'Bag all 12 cookies in threes',show:()=>{steps[0].go();play(times(bagThree,4),480)},go:()=>{reset();sync();S.after=finish(0,()=>S.ok,'4 bags of 3.')}},
{h:'Sharing',p:'Now you know how many groups (plates). Division tells you how many go in each one.',
task:'Share 12 cookies fairly onto 3 plates',show:()=>{steps[1].go();play(times(dealRound,4),520)},go:()=>{reset();sync();S.after=finish(1,()=>S.ok,'4 on each plate.')}},
{h:'Jumping back',p:'Division is repeated subtraction. Take away the same amount until nothing is left, and count how many times.',
predict:{q:'How many jumps of 5 take you from 20 back to 0?',opts:['4','5','15'],ans:0},
task:'Jump from 20 to 0 in fives',show:()=>{steps[2].go();play(times(hop,4),480)},go:()=>{reset();sync();S.after=finish(2,()=>S.ok,'4 jumps.')}},
{h:'Which question?',p:'Every division story asks one of two questions. Read the end of the story to tell which.',
task:'Sort all four stories',show:()=>{steps[3].go();play([0,1,2,3].flatMap(i=>[()=>pickStory(i),()=>drop(STORIES[i].g)]),360)},go:()=>{reset();sync();S.after=finish(3,()=>S.ok,'Sorted.')}},
{h:'Order matters',p:'You can swap the numbers in 3 × 12. Can you swap them in a division?',
predict:{q:'Is 3 ÷ 12 the same as 12 ÷ 3?',opts:['No: 3 shared by 12 gives each less than 1','Yes, like 3 × 12 = 12 × 3','Only with pizza'],ans:0},
task:'Share 3 pizzas fairly between 12 children',show:()=>{steps[4].go();play([slice,slice,slice,handOut],520)},go:()=>{reset();sync();S.after=finish(4,()=>S.ok,'1/4 of a pizza each.')}},
{h:'Challenge',p:'',go:()=>{reset();nextQ()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.after()});
const BANK=[['24 children get into teams of 6. How many teams?','4',[['18','takeOnce'],['144','timesInstead']]],
['15 stickers are shared by 5 friends. How many does each get?','3',[['10','takeOnce'],['75','timesInstead']]],
['Which story is 20 ÷ 4 as grouping?','20 eggs in boxes of 4: how many boxes?',[['20 eggs shared by 4 people: how many each?','swapMeaning'],['4 boxes with 20 eggs in each','timesInstead']]],
['Is 6 ÷ 2 the same as 2 ÷ 6?','No: 6 ÷ 2 = 3, but 2 ÷ 6 is less than 1',[['Yes: you can swap them, like 2 × 6','swapOrder'],['Yes: both make 3','swapOrder']]],
['How many jumps of 4 take 28 back to 0?','7',[['24','takeOnce'],['8','countStart']]],
['18 sweets go in bags of 3. 18 ÷ 3 = 6. What does the 6 mean?','6 bags',[['6 sweets in each bag','swapMeaning'],['6 sweets left over','leftover']]]];
function because(tag){let m='Ask what you know: the size of each group, or the number of groups. Division finds the other one.';
 if(tag==='takeOnce')m='That takes the group size away only once. Keep taking it away until none are left, and count the groups.';
 if(tag==='timesInstead')m='That multiplies. Dividing splits a number into equal groups, so the answer is smaller than the start.';
 if(tag==='swapMeaning')m='Check the end of the story. Bags or boxes of a given size means you are finding how many groups, not how many in each.';
 if(tag==='swapOrder')m='Division cannot be swapped. 6 ÷ 2 shares 6 things between 2 (3 each); 2 ÷ 6 shares 2 things between 6, less than 1 each.';
 if(tag==='countStart')m='Count the jumps, not the numbers you land on. 28, 24, 20, 16, 12, 8, 4, 0 is 8 numbers but only 7 jumps.';
 if(tag==='leftover')m='18 is exactly 6 threes, so nothing is left over. The 6 is the number of bags.';
 return m}
function nextQ(){qn++;const [q,right,wrongs]=BANK[qn%BANK.length],all=[[right,'ok']].concat(wrongs),s=qn%3,order=all.slice(s).concat(all.slice(0,s));
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');order.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>grade(tag,right)});live('Challenge: '+q);A.redraw()}
let streak=0;
function grade(tag,right){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=tag==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+right+'. Streak: '+streak+'.':'✗ '+because(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=nextQ}
FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:B=>{quiz.hidden=B.step!==5;ctl.hidden=B.step===5;controls()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Division lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}}).start()})})();
