/* Flagship – trying a new approach (ages 7–8): steer a robot that keeps bumping a wall until you find a new route,
   count a muddle of stars by grouping in fives instead of one by one, sort "same again" from "new approach",
   pick a strategy (draw it, break it into parts, work backwards) for each problem, and judge which of two tries
   worked better. Tap or drag on the canvas, or use the buttons. */
(()=>{
const COLS=6,ROWS=4,WALL=['2,0','2,1','2,2','4,2','4,3'],HOME=[1,1],GOAL=[5,1];
const ROUTE=[[1,0],[0,1],[0,1],[1,0],[1,0],[0,-1],[0,-1],[1,0],[1,0]];
const DIRS=[['⬆️','up',0,-1],['⬇️','down',0,1],['⬅️','left',-1,0],['➡️','right',1,0]];
const NSTAR=23;
const MOVES=[['Do the same sum the same way again',0,'Doing it the same way gives the same answer.'],['Draw a picture of the problem',1,'A picture lets you see the problem in a new way.'],
 ['Rub it out and write the same thing',0,'Writing the same thing again will not fix it.'],['Try it with smaller numbers first',1,'Small numbers show you how the problem works.'],
 ['Say the word again, louder',0,'Louder is still the same way.'],['Break the word into parts',1,'Small parts are easier than one long word.'],
 ['Ask how a friend did it',1,'A friend may know a way you had not thought of.'],['Push the stuck door harder',0,'Harder is the same move. Maybe it says pull!']];
const TOOLS=[['🖍️','Draw it'],['🧩','Break it into parts'],['⏪','Work backwards']];
const PROBS=[['A house has 3 floors. Each floor has 4 windows. How many windows?',0,'Draw 3 floors with 4 windows each, then count all 12.'],
 ['Spell “butterfly”.',1,'Butter + fly. Two short words are easier than one long one.'],
 ['I ate 3 sweets. Now I have 5. How many did I have at the start?',2,'Start at the end: 5, then put back the 3 you ate. That makes 8.'],
 ['How many legs do 3 ducks have?',0,'Draw 3 ducks with 2 legs each and count: 6 legs.'],
 ['Read “sunflower”.',1,'Sun + flower. Read each part, then put them together.'],
 ['4 more cars came. Now there are 9. How many were there before?',2,'Go back from 9 and take away the 4 that came. 5 were there before.']];
const TRIES=[['12 + 9 = ?',[['Count on 9, one at a time','13, 14, 15 … lost count: 20 ✗'],['Add 10, then take 1 away','12 + 10 = 22, take 1 = 21 ✓']],1],
 ['Spell “friend”',[['Sound it out: f-r-e-n-d','frend ✗'],['Think: a fri-END to the END','friend ✓']],1],
 ['Read “unhappy”',[['Break it into un + happy','un-happy ✓'],['Guess from the first letter','under? ✗']],0]];
VIS.reg('flagswap',c=>{let A,keys,quiz,qn=-1,ver=0,streak=0;
const P={};function clear(extra){ver++;Object.assign(P,{won:0,bot:HOME.slice(),bumps:0,lastBump:'',trail:[],t:0,grouped:false,tally:0,rowsDone:0,deck:[],placed:[],drag:null,wrongCard:-1,flash:-1,round:0,chose:-1,then:()=>{}},extra||{})}clear();
const kind=()=>['robot','stars','same','tool','judge','quiz'][A.step],goal=()=>({robot:1,stars:1,same:6,tool:4,judge:3})[kind()]||99,fast=()=>A.reduced();
const sz=n=>Math.round(n*(A.narrow?1:1.1));
function say(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function word(g,t,x,y,n,col,mw,al){g.font=`700 ${sz(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-16)}
function lines(g,t,x,y,n,mw,col){g.font=`700 ${sz(n)}px system-ui,sans-serif`;const out=[];let s='';
 for(const w of t.split(' ')){const k=s?s+' '+w:w;if(s&&g.measureText(k).width>mw){out.push(s);s=w}else s=k}out.push(s);
 const gap=sz(n)*1.25;out.forEach((l,i)=>word(g,l,x,y+(i-(out.length-1)/2)*gap,n,col,mw))}
function icon(g,e,x,y,s){g.font=`${Math.round(s)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#111';g.fillText(e,x,y)}
function box(g,r,fill,line,w){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=line;g.lineWidth=w||2;g.stroke()}
const inside=(p,r)=>p.x>r.x-5&&p.x<r.x+r.w+5&&p.y>r.y-5&&p.y<r.y+r.h+5;
const rimC=()=>A.mix(A.col.tx,A.col.pn,.5),card=()=>A.col.dark?'#1e293b':'#ffffff',wash=h=>A.mix(A.col.pn,h,A.col.dark?.2:.5);
const okInk=()=>A.col.dark?'#86efac':'#166534',badInk=()=>A.col.dark?'#fca5a5':'#991b1b';
/* robot board */
const board=()=>{const s=Math.min((A.W-24)/COLS,A.H*.68/ROWS),w=s*COLS;return{x:(A.W-w)/2,y:A.H*.04,s}};
const cellR=(cx,cy)=>{const b=board();return{x:b.x+cx*b.s+2,y:b.y+cy*b.s+2,w:b.s-4,h:b.s-4}};
function drawRobot(g){const C=A.col,b=board();for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++){const r=cellR(x,y),wall=WALL.includes(x+','+y);
  box(g,r,wall?(C.dark?'#7c2d12':'#fed7aa'):P.trail.includes(x+','+y)?wash('#bbf7d0'):card(),rimC(),1.5);if(wall)icon(g,'🧱',r.x+r.w/2,r.y+r.h/2,r.h*.6)}
 const gr=cellR(...GOAL);icon(g,'🏁',gr.x+gr.w/2,gr.y+gr.h/2,gr.h*.62);const br=cellR(...P.bot);icon(g,'🤖',br.x+br.w/2,br.y+br.h/2,br.h*.66);
 if(P.lastBump){const d=DIRS.find(d=>d[1]===P.lastBump);icon(g,'💥',br.x+br.w/2+d[2]*b.s*.5,br.y+br.h/2+d[3]*b.s*.5,b.s*.4)}
 word(g,`Bumps: ${P.bumps}`,A.W/2,A.H*.8,15,P.bumps>1?badInk():C.tx);
 word(g,P.won?'You found a new way! 🎉':P.bumps>1?'Same move, same bump. Try a different way!':'Get the robot to the flag.',A.W/2,A.H*.9,14,C.mu)}
/* stars: scattered, then grouped in rows of 5 */
const scatter=i=>{const a=Math.sin(i*12.9898)*43758.5453,b=Math.sin(i*78.233)*12345.678;return{x:.06+(a-Math.floor(a))*.88,y:.08+(b-Math.floor(b))*.56}};
const rowR=k=>{const h=A.H*.115;return{x:12,y:A.H*.04+k*(h+6),w:A.W-24,h}};
const slot=i=>{const k=Math.floor(i/5),j=i%5,r=rowR(k),w=Math.min(r.h*1.1,(r.w-70)/5);return{x:r.x+64+j*w+w/2,y:r.y+r.h/2}};
function drawStars(g){const C=A.col,s=Math.min(A.W*.06,30);
 if(P.t>0)for(let k=0;k<5;k++){const r=rowR(k),done=k<P.rowsDone;box(g,r,done?wash('#bbf7d0'):wash('#e0e7ff'),k===P.flash?C.vi:rimC(),k===P.flash?4:1.5);
  if(done)word(g,String(Math.min(NSTAR,(k+1)*5)),r.x+30,r.y+r.h/2,15,C.tx)}
 for(let i=0;i<NSTAR;i++){const a=scatter(i),b=slot(i),x=a.x*A.W+(b.x-a.x*A.W)*P.t,y=a.y*A.H+(b.y-a.y*A.H)*P.t;icon(g,'⭐',x,y,s)}
 if(!P.grouped)lines(g,'Ben counted one by one. First he got 22, then 24. He lost count!',A.W/2,A.H*.82,14,A.W-24,C.tx);
 else word(g,P.won?`23 stars! Groups made it quick.`:P.rowsDone<5?'Tap each row to count on in fives.':'How many stars? Pick the number.',A.W/2,A.H*.86,14,C.tx)}
/* card sorting into bins (same step and tool step) */
const bins=()=>kind()==='same'?[0,1].map(i=>({x:12+i*(A.W/2-6),y:A.H*.04,w:A.W/2-18,h:A.H*.56})):[0,1,2].map(i=>{const w=(A.W-44)/3;return{x:12+i*(w+10),y:A.H*.04,w,h:A.H*.5}});
const deckR=()=>{const w=Math.min(A.W-24,480),h=A.H*(kind()==='tool'?.3:.2);return{x:(A.W-w)/2,y:A.H*(kind()==='tool'?.58:.66),w,h}};
const dragged=r=>P.drag&&P.drag.x!=null?{...r,x:P.drag.x-r.w/2,y:P.drag.y-r.h/2}:r;
function drawSort(g){const C=A.col,tool=kind()==='tool';bins().forEach((r,i)=>{box(g,r,wash(tool?['#fce7f3','#dcfce7','#e0f2fe'][i]:i?'#fef3c7':'#e2e8f0'),i===P.flash?C.vi:rimC(),i===P.flash?4:2);
  if(tool){icon(g,TOOLS[i][0],r.x+r.w/2,r.y+r.h*.25,Math.min(r.w*.35,r.h*.3,48));lines(g,TOOLS[i][1],r.x+r.w/2,r.y+r.h*.55,13,r.w-8);word(g,'✓'.repeat(P.placed.filter(p=>p.at===i).length),r.x+r.w/2,r.y+r.h*.85,16,okInk())}
  else{word(g,i?'💡 New approach':'🔁 Same again',r.x+r.w/2,r.y+20,14,C.tx,r.w-8);P.placed.filter(p=>p.at===i).forEach((p,j)=>word(g,MOVES[p.k][0],r.x+r.w/2,r.y+46+j*sz(19),11,C.tx,r.w-10))}});
 const k=P.deck[0];if(k!=null&&P.won<goal()){const r=dragged(deckR());box(g,r,card(),P.wrongCard===k?C.rd:rimC(),P.wrongCard===k?4:2);lines(g,tool?PROBS[k][0]:MOVES[k][0],r.x+r.w/2,r.y+r.h/2,14,r.w-16)}}
/* judge two tries */
const panes=()=>{const w=(A.W-34)/2;return[0,1].map(i=>({x:12+i*(w+10),y:A.H*.2,w,h:A.H*.5}))};
function drawJudge(g){const C=A.col,T=TRIES[P.round%3];word(g,T[0],A.W/2,A.H*.1,18,C.tx);
 panes().forEach((r,i)=>{const pick=P.chose===i,good=i===T[2];box(g,r,pick?wash(good?'#bbf7d0':'#fecaca'):card(),pick?(good?C.gr:C.rd):i===P.flash?C.vi:rimC(),pick?4:2);
  word(g,i?'Way 2':'Way 1',r.x+r.w/2,r.y+20,13,C.mu);lines(g,T[1][i][0],r.x+r.w/2,r.y+r.h*.4,14,r.w-14);lines(g,T[1][i][1],r.x+r.w/2,r.y+r.h*.78,14,r.w-14,T[1][i][1].includes('✓')?okInk():badInk())});
 word(g,'Which way worked better? Tap it.',A.W/2,A.H*.82,14,C.mu)}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.3);g.fillRect(0,0,A.W,A.H);const m=kind();
 if(m==='robot')drawRobot(g);if(m==='stars')drawStars(g);if(m==='same'||m==='tool')drawSort(g);if(m==='judge')drawJudge(g);
 if(m==='quiz'){icon(g,'💡',A.W/2,A.H*.38,Math.min(A.W*.22,100));word(g,'Not working? Try a new way.',A.W/2,A.H*.74,16,C.tx)}A.fx.draw(g)}
function blink(i){P.flash=i;const v=ver;setTimeout(()=>{if(v===ver){P.flash=-1;A.redraw()}},420)}
function no(t){A.sound.miss();say(t);A.redraw()}
function ok(t){P.won++;P.wrongCard=-1;A.sound.pop();say(t);keypad();A.redraw();P.then()}
const wait=f=>{const v=ver;setTimeout(()=>{if(v===ver)f()},fast()?20:900)};
/* move the robot one square */
function step(dx,dy){if(P.won)return;const nx=P.bot[0]+dx,ny=P.bot[1]+dy,d=DIRS.find(d=>d[2]===dx&&d[3]===dy)[1];
 if(nx<0||ny<0||nx>=COLS||ny>=ROWS)return no('That is the edge of the board. Try another way.');
 if(WALL.includes(nx+','+ny)){P.bumps++;const again=P.lastBump===d;P.lastBump=d;return no(again?`Bump again! Same move, same bump. Doing the same thing will not work. Try a different way round.`:`Bump! A wall is in the way going ${d}.`)}
 P.lastBump='';P.trail.push(P.bot.join(','));P.bot=[nx,ny];A.sound.tick();
 if(nx===GOAL[0]&&ny===GOAL[1])return ok(`You made it! You stopped bumping the wall and went a new way round.`);say(`The robot moved ${d}.`);A.redraw()}
/* stars */
function group(){if(P.grouped)return;P.grouped=true;say('The stars are in rows of 5 now. Tap each row to count on in fives.');A.tween(P,{t:1},900,'io',()=>{keypad();A.redraw()});keypad()}
function oneByOne(){no('Ben tried that twice and got 22, then 24. Same way, same muddle. Try a new way: groups of 5.')}
function countRow(k){if(!P.grouped||P.t<1||P.won)return;blink(k);if(k!==P.rowsDone)return no(`Count the rows in order, from the top. Next is row ${P.rowsDone+1}.`);
 P.rowsDone++;A.sound.tick();say(P.rowsDone<5?`${P.rowsDone*5}.`:`The last row has 3 more: 21, 22, 23.`);keypad();A.redraw()}
function answer(n){if(P.rowsDone<5||P.won)return;if(n!==23)return no(n===25?'25 would be 5 full rows. The last row has only 3 stars.':'Count again: 4 full rows is 20, and 3 more makes 23.');ok('Yes, 23! Grouping in fives was quicker and you did not lose count.')}
/* sorting */
function drop(i){const k=P.deck[0];if(k==null||P.won>=goal())return;blink(i);
 if(kind()==='same'){const M=MOVES[k];if(M[1]!==i){P.wrongCard=k;return no(i?`“${M[0]}” is the same thing again. ${M[2]}`:`“${M[0]}” is a new way to try! ${M[2]}`)}
  P.placed.push({k:P.deck.shift(),at:i});return ok(`Yes. ${M[2]}`)}
 const Q=PROBS[k];if(Q[1]!==i){P.wrongCard=k;return no(`${TOOLS[i][1]}? Think again. ${i===0?'A picture helps when you can see the things.':i===1?'Parts help with long words.':'Working backwards helps when you know the end.'}`)}
 P.placed.push({k:P.deck.shift(),at:i});ok(`Yes! ${Q[2]}`)}
/* judging */
function judge(i){const T=TRIES[P.round%3];if(P.chose>=0||P.won>=3)return;blink(i);if(i!==T[2])return no(`Look at the result. ${T[1][i][1].replace(' ✗','')} was wrong. The other way got it right.`);
 P.chose=i;ok(`Yes! ${T[1][i][0]} worked better. Checking which way works helps you choose next time.`);if(P.won<3)wait(()=>{P.round++;P.chose=-1;keypad();A.redraw()})}
function keypad(){if(!keys)return;keys.innerHTML='';const m=kind();if(m==='quiz'||P.won>=goal())return;
 const B=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},keys,t);b.onclick=f};
 if(m==='robot')DIRS.forEach(([e,n,dx,dy])=>B(e,`Move ${n}`,()=>step(dx,dy)));
 if(m==='stars'){if(!P.grouped){B('☝️ Count one by one again','Count one by one again',oneByOne);B('🖐️ Put them in groups of 5','Put the stars in groups of 5',group)}
  else if(P.rowsDone<5)B(`Count row ${P.rowsDone+1}`,`Count row ${P.rowsDone+1}`,()=>countRow(P.rowsDone));else[22,23,25].forEach(n=>B(String(n),`${n} stars`,()=>answer(n)))}
 if((m==='same'||m==='tool')&&P.deck.length){const lab=m==='same'?MOVES[P.deck[0]][0]:PROBS[P.deck[0]][0];(m==='same'?[['🔁','Same again',0],['💡','New approach',1]]:TOOLS.map((t,i)=>[t[0],t[1],i])).forEach(([e,n,i])=>B(e+' '+n,`${lab} ${n}`,()=>drop(i)))}
 if(m==='judge'&&P.chose<0)TRIES[P.round%3][1].forEach((w,i)=>B(`Way ${i+1}: ${w[0]}`,`Way ${i+1} worked better: ${w[0]}`,()=>judge(i)))}
function down(p){const m=kind();if(m==='quiz'||P.won>=goal())return false;
 if(m==='robot'){const b=board(),cx=Math.floor((p.x-b.x)/b.s),cy=Math.floor((p.y-b.y)/b.s),dx=cx-P.bot[0],dy=cy-P.bot[1];if(Math.abs(dx)+Math.abs(dy)===1)step(dx,dy);else if(cx>=0&&cy>=0&&cx<COLS&&cy<ROWS)say('Tap a square next to the robot.');return false}
 if(m==='stars'){if(!P.grouped){say('These stars are a muddle. Try a new way: tap Put them in groups of 5.');return false}for(let k=0;k<5;k++)if(inside(p,rowR(k))){countRow(k);break}return false}
 if(m==='judge'){const i=panes().findIndex(r=>inside(p,r));if(i>=0)judge(i);return false}
 if(P.deck.length&&inside(p,deckR())){P.drag={x:null,x0:p.x,y0:p.y};return true}const i=bins().findIndex(r=>inside(p,r));if(i>=0)drop(i);return false}
function move(p){const d=P.drag;if(!d||(d.x==null&&Math.hypot(p.x-d.x0,p.y-d.y0)<=8))return;d.x=p.x;d.y=p.y;A.redraw()}
function up(p){const d=P.drag;P.drag=null;if(!d)return;const i=bins().findIndex(r=>inside(p,r));if(d.x==null||i<0){say('Drag the card into a box, or tap a button.');return A.redraw()}drop(i)}
const close=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(list,gap){const k=++ver;list.forEach((f,j)=>setTimeout(()=>{if(k===ver)f()},fast()?j*40+30:(j+1)*(gap||450)))}
const steps=[
{h:'Bump, bump, bump',p:'Help the robot reach the flag. Tap a square next to it, or use the arrows. Start by going right.',predict:{q:'The robot bumps the wall. What should it do?',opts:['Go right again, but harder','Try a different way round'],ans:1},task:'Reach the flag',
 show:()=>{steps[0].go();auto(ROUTE.map(([dx,dy])=>()=>step(dx,dy)),420)},go:()=>{clear();say('The robot is next to a wall. Tap right to try.');keypad();P.then=close(0,()=>P.won>=1,`Doing the same move again gave the same bump. A new route worked.`)}},
{h:'Lost count',p:'Ben counted these stars one by one and got two different answers. Try a new way to count them.',predict:{q:'Ben lost count. What will help most?',opts:['Count one by one again, faster','Put the stars in groups of 5'],ans:1},task:'Count the stars a new way',
 show:()=>{steps[1].go();const k=++ver,at=fast()?[30,90,130,170,210,250,290]:[300,1450,1850,2250,2650,3050,3600];[()=>group(),()=>countRow(0),()=>countRow(1),()=>countRow(2),()=>countRow(3),()=>countRow(4),()=>answer(23)].forEach((f,j)=>setTimeout(()=>{if(k===ver)f()},at[j]))},go:()=>{clear();say('Ben got 22, then 24. Try a new way to count.');keypad();P.then=close(1,()=>P.won>=1,'A new way, groups of 5, was quicker and right.')}},
{h:'Same again, or new?',p:'Something is not working. Is each idea the same thing again, or a new approach? Drag each card.',predict:{q:'If you do exactly the same thing again, it will usually…',opts:['Work this time','Give the same result'],ans:1},task:'Sort 6 ideas',
 show:()=>{steps[2].go();auto([0,1,2,3,4,5].map(()=>()=>drop(MOVES[P.deck[0]][1])))},go:()=>{clear({deck:[0,1,2,3,4,5,6,7]});say('Do the same sum the same way again. Same, or new?');keypad();P.then=close(2,()=>P.won>=6,'A new approach changes how you try, not just how hard.')}},
{h:'Pick a strategy',p:'Different problems need different ways. Drag each problem to the strategy that helps most.',task:'Match 4 problems',
 show:()=>{steps[3].go();auto([0,1,2,3].map(()=>()=>drop(PROBS[P.deck[0]][1])),600)},go:()=>{clear({deck:[0,1,2,3,4,5]});say('A house has 3 floors with 4 windows each. Which strategy helps?');keypad();P.then=close(3,()=>P.won>=4,'Draw it, break it into parts, or work backwards. Now you have three new ways to try.')}},
{h:'Which way worked?',p:'Here are two tries at each problem. Look at the results. Tap the way that worked better.',task:'Judge 3 problems',
 show:()=>{steps[4].go();auto([0,1,2].map(()=>()=>judge(TRIES[P.round%3][2])),1100)},go:()=>{clear();say('12 add 9. Which way worked better?');keypad();P.then=close(4,()=>P.won>=3,'Good learners check which way worked, then use it next time.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>P.then()});
const QS=[['You try a sum 3 times the same way. It is still wrong. What now?',[['Try a new way, like drawing it','ok'],['Do it the same way a 4th time','same'],['Give up','quit']]],
 ['Is trying a new approach the same as giving up?',[['No. You are still trying, just in a new way.','ok'],['Yes. It means you could not do it.','quit2'],['Yes. It is cheating.','cheat']]],
 ['You cannot spell “football”. Which is a new approach?',[['Break it into foot + ball','ok'],['Write the same wrong letters again','same'],['Press harder with the pencil','hard']]],
 ['Ben loses count of 30 buttons. What could help?',[['Put them in groups of 10','ok'],['Count one by one, faster','fast'],['Guess a number','guess']]],
 ['You tried a new way and it worked better. What should you do next time?',[['Remember it and use it again','ok'],['Forget it','forget'],['Only ever use your first idea','first']]],
 ['A door will not open when you push. What is the new approach?',[['Look at the sign. Maybe it says pull!','ok'],['Push harder','hard'],['Push again and again','same']]]];
function hint(t){let m='Look back at the lab: if it is not working, try a new way, then check which way worked.';
 if(t==='same')m='The same way gives the same result. Change how you try it.';
 if(t==='quit')m='Do not give up yet. A new way might work, like drawing the sum.';
 if(t==='quit2')m='Trying a new way is not giving up. You are still working on it.';
 if(t==='cheat')m='It is not cheating. Good learners choose a better way.';
 if(t==='hard')m='Harder is still the same way. Try something different.';
 if(t==='fast')m='Faster is still one by one, so you can lose count again. Make groups.';
 if(t==='guess')m='A guess is not counting. Groups help you count right.';
 if(t==='forget')m='Remember the way that worked, so you can use it next time.';
 if(t==='first')m='Your first idea might not be the best. Keep the way that works.';return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},g,o);b.onclick=()=>grade(t)});say('Challenge: '+q);A.redraw()}
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),right=t==='ok';
 if(right){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${right?'✓ Yes! Well done.':'✗ '+hint(t)}${right?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{quiz.hidden=A.step!==5;keys.hidden=A.step===5;keypad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keypad()}});
A.start()})})();
