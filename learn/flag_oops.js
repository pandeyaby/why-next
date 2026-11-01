/* Flagship – learning from mistakes (ages 8–9): tap the wrong line in a worked answer; sort mistakes into slips,
   misconceptions and misreads; open a marked test to find the mistake that keeps coming back; put the four moves of
   error analysis in order; sort thoughts that help learning from ones that stop it. Tap, drag or use the buttons. */
(()=>{
const WORK=[{q:'47 + 38 = ?',rows:['Ones: 7 + 8 = 15','Write 5, carry 1 ten','Tens: 4 + 3 = 7','Answer: 75'],bad:2,fix:'The carried ten was lost. 4 + 3 + 1 = 8 tens, so 85.'},
 {q:'Sam has 12 stickers. Mo has 5 more than Sam. How many has Mo?',rows:['Mo has more than Sam','12 − 5 = 7','Answer: Mo has 7'],bad:1,fix:'"5 more than" means add. 12 + 5 = 17.'},
 {q:'Write the plural of fox.',rows:['Fox ends in x','Add s to make more than one','Answer: foxs'],bad:1,fix:'Words that end in x add es. One fox, two foxes.'}];
const KIND={bins:['Slip','Misconception','Misread'],sub:['rushed','wrong idea','missed it'],cards:[
 ['Knows 6 × 7 = 42 but wrote 43 in a hurry',0,'They know the fact. Rushing caused it, so it is a slip.'],
 ['Thinks 0.25 is bigger than 0.5 because 25 is bigger than 5',1,'That is a wrong idea about decimals: a misconception. 0.5 is half; 0.25 is a quarter.'],
 ['The question said "how many more", but they added',2,'They missed the key words in the question. That is a misread.'],
 ['Thinks plants get their food from the soil',1,'Plants make food from light, air and water. Believing the soil feeds them is a misconception.'],
 ['Copied 41 from the board as 14',0,'They knew it and copied it wrong. That is a slip.'],
 ['Wrote about cats when the question asked about dogs',2,'The question asked about dogs. They misread it.']]};
const TEST=[['36 + 27 = 53',0],['7 × 8 = 54',1],['58 + 25 = 73',0],['"How many are left?" Ava added',2],['49 + 16 = 55',0],['7 × 6 = 43',1]];
const CAUSE=['Forgot to carry','7 times table','Misread'];
const MOVES=['Spot it','Find why','Fix it','Try a new one'],JUMBLE=[2,0,3,1];
const MOVE_TIP=['First you have to spot which part went wrong.','Before you fix it, find why it went wrong.','Once you know why, fix it.','Last, try a fresh question to check the fix sticks.'];
const THINK={bins:['Helps me learn','Stops me learning'],sub:['',''],cards:[
 ['Which step went wrong?',0,'Asking which step went wrong is error analysis. It helps.'],
 ['I got it wrong, so I am stupid',1,'A mistake shows what to learn next, not that you are stupid.'],
 ['Rub it out fast so no one sees',1,'If you rub it out, you cannot find why it went wrong.'],
 ['I was sure, and I was wrong! Let me see why',0,'Being surprised by a mistake helps the right answer stick.'],
 ['I will never get this',1,'Say "not yet". Finding the cause is how you get it.'],
 ['Try the same kind again tomorrow',0,'Trying again later checks the fix has stuck.']]};
VIS.reg('flagoops',c=>{let A,ctl,quiz,qi=-1,tok=0;c.fig.classList.add('young');
const st0=()=>({want:()=>{},won:0,w:0,flash:-1,card:0,tray:[],grab:null,seen:[],slots:[],pickedCause:-1}),S=st0();
const phase=()=>['find','kind','test','order','think','quiz'][A.step];
const px=n=>Math.round(n*(A.narrow?1:1.12)),RM=()=>A.reduced();
const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
function ink(g,t,x,y,n,col,w,al,mw){g.font=`${w||800} ${px(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-24)}
function para(g,t,x,y,w,n,col){g.font=`700 ${px(n)}px system-ui,sans-serif`;const out=[];let line='';for(const z of t.split(' ')){const s=line?line+' '+z:z;if(g.measureText(s).width>w&&line){out.push(line);line=z}else line=s}out.push(line);
 out.forEach((s,i)=>ink(g,s,x,y+(i-(out.length-1)/2)*px(n)*1.25,n,col,700))}
function pill(g,x,y,w,h,col,fill,ring){g.fillStyle=A.alpha(col,fill);A.paint.rrect(x,y,w,h,12);g.fill();g.lineWidth=ring?5:2.5;g.strokeStyle=ring?A.col.rd:col;A.paint.rrect(x,y,w,h,12);g.stroke()}
/* step 0: the worked answer, one row per line of working */
const rowRect=i=>{const{W,H}=A,n=WORK[Math.min(S.w,2)].rows.length,h=H*.5/n;return{x:16,y:H*.36+i*h,w:W-32,h:h-8}};
function drawFind(g){const{W,H}=A,C=A.col,p=WORK[Math.min(S.w,2)];pill(g,12,H*.04,W-24,H*.26,C.am,.14);para(g,p.q,W/2,H*.17,W-48,15);
 p.rows.forEach((r,i)=>{const b=rowRect(i);pill(g,b.x,b.y,b.w,b.h,C.mu,.08,S.flash===i);ink(g,(i+1)+'.  '+r,b.x+14,b.y+b.h/2,15,C.tx,700,'left')});
 ink(g,`Worked answer ${Math.min(S.w+1,3)} of 3 · tap the wrong line`,W/2,H*.93,12,C.mu,600)}
/* steps 1 and 4: one card at a time, dropped into a tray */
const deck=()=>phase()==='kind'?KIND:THINK;
const trayRect=i=>{const{W,H}=A,n=deck().bins.length,w=(W-16)/n;return{x:8+i*w+4,y:H*.5,w:w-8,h:H*.46}};
const cardRect=()=>({x:A.W*.07,y:A.H*.05,w:A.W*.86,h:A.H*.28});
function drawDeck(g){const D=deck(),C=A.col,hue=[C.cy,C.vi,C.or];D.bins.forEach((t,i)=>{const b=trayRect(i),n=S.tray.filter(k=>k===i).length;pill(g,b.x,b.y,b.w,b.h,hue[i],.15,S.flash===i);
  para(g,t,b.x+b.w/2,b.y+px(20),b.w-8,D.bins.length>2?11:15);if(D.sub[i])ink(g,D.sub[i],b.x+b.w/2,b.y+px(48),11,C.tx,600,0,b.w-8);ink(g,n?'✓'.repeat(n):'',b.x+b.w/2,b.y+b.h*.7,16,hue[i])});
 const k=D.cards[S.card];if(!k)return;const r=cardRect(),q=S.grab,x=q?q.x-r.w/2:r.x,y=q?q.y-r.h/2:r.y;
 A.paint.shadow(12,5,.25);pill(g,x,y,r.w,r.h,C.ac,.22);A.paint.noShadow();g.fillStyle=C.pn;A.paint.rrect(x+4,y+4,r.w-8,r.h-8,9);g.fill();para(g,k[0],x+r.w/2,y+r.h/2,r.w-28,14);
 if(!q)ink(g,'Drag the card down ↓',A.W/2,A.H*.43,12,C.mu,600)}
/* step 2: Ava's marked test and the tally of causes */
const testRow=i=>{const{W,H}=A,h=H*.42/6;return{x:12,y:H*.04+i*h,w:W-24,h:h-5}};
function drawTest(g){const{W,H}=A,C=A.col,hue=[C.rd,C.vi,C.or];TEST.forEach((t,i)=>{const b=testRow(i),open=S.seen.includes(i);pill(g,b.x,b.y,b.w,b.h,open?hue[t[1]]:C.mu,open?.16:.08,S.flash===i);
  ink(g,'✗ '+t[0],b.x+10,b.y+b.h/2,13,C.tx,700,'left',b.w-20)});
 const tally=[0,0,0];S.seen.forEach(i=>tally[TEST[i][1]]++);
 CAUSE.forEach((n,j)=>{const y=H*.54+j*H*.115,bx=W*.5,bw=(W*.5-16)*tally[j]/3;ink(g,`${n}: ${tally[j]}`,16,y,13,C.tx,700,'left',W*.48-20);if(bw){g.fillStyle=hue[j];A.paint.rrect(bx,y-px(9),bw,px(18),5);g.fill()}});
 ink(g,S.seen.length<6?`Tap each wrong answer (${S.seen.length} of 6)`:'Which one should Ava practise first?',W/2,H*.92,13,C.mu,600)}
/* step 3: the four moves */
const slotRect=i=>{const{W,H}=A,h=H*.2;return{x:10,y:H*.06+i*(h+4),w:W*.46,h}};
const pickRect=j=>{const{W,H}=A,h=H*.2;return{x:W*.52,y:H*.06+j*(h+4),w:W*.46,h}};
function drawOrder(g){const C=A.col;MOVES.forEach((m,i)=>{const b=slotRect(i),got=S.slots[i];pill(g,b.x,b.y,b.w,b.h,got!=null?C.gr:C.mu,got!=null?.18:.06,i===S.slots.length&&S.flash>=0);
  ink(g,`${i+1}. ${got!=null?MOVES[got]:'…'}`,b.x+12,b.y+b.h/2,15,C.tx,800,'left')});
 JUMBLE.forEach((m,j)=>{if(S.slots.includes(m))return;const b=pickRect(j),q=S.grab&&S.grab.m===m;const x=q?S.grab.x-b.w/2:b.x,y=q?S.grab.y-b.h/2:b.y;pill(g,x,y,b.w,b.h,C.ac,.2);ink(g,MOVES[m],x+b.w/2,y+b.h/2,15)})}
function draw(A){const{ctx:g,W,H,col:C}=A,v=phase();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.38);g.fillRect(0,0,W,H);
 if(v==='quiz'){ink(g,'Spot it → Find why → Fix it → Try again',W/2,H*.45,15);ink(g,'🔍 Mistakes show what to learn next',W/2,H*.62,14,C.mu,700);return}
 if(S.won>=target()){para(g,finale(),W/2,H/2,W-40,16);return A.fx.draw(g)}
 ({find:drawFind,kind:drawDeck,think:drawDeck,test:drawTest,order:drawOrder})[v](g);A.fx.draw(g)}
const target=()=>({find:3,kind:1,test:1,order:1,think:1}[phase()]||9);
function finale(){return{find:'Look at a mistake before you rub it out. It shows you what to fix.',kind:'Slips, misconceptions and misreads need different fixes.',
 test:'The mistake that keeps coming back is the one to practise first.',order:'Spot it, find why, fix it, then try a new one.',think:'Mistakes help most when you look at why. A big surprise sticks!'}[phase()]}
const nope=(t,f)=>{A.sound.miss();S.flash=f==null?-1:f;voice(t);setTimeout(()=>{S.flash=-1;A.redraw()},RM()?10:900);A.redraw()};
function score(t){S.won++;A.sound.pop();voice(t);controls();A.redraw();S.want()}
function tapRow(i){if(phase()!=='find'||S.won>=3)return;const p=WORK[S.w];if(i!==p.bad)return nope(i<p.bad?`Line ${i+1} is right. Keep checking.`:`Line ${i+1} only follows on. The mistake is earlier.`,i);
 S.w++;score('Found it! '+p.fix)}
function drop(b){const D=deck(),k=D.cards[S.card];if(!k||S.won)return;S.grab=null;if(b!==k[1])return nope(k[2],b);
 S.tray.push(b);S.card++;A.sound.tick();if(S.card>=D.cards.length)return score(finale());voice(`Yes, ${D.bins[b]}. Next: ${D.cards[S.card][0]}`);controls();A.redraw()}
function look(i){if(phase()!=='test'||S.won)return;if(S.seen.includes(i))return nope(`You opened that one. It was: ${CAUSE[TEST[i][1]]}.`,i);S.seen.push(i);A.sound.tick();
 voice(`${TEST[i][0]}. Cause: ${CAUSE[TEST[i][1]]}.`);controls();A.redraw()}
function practise(j){if(phase()!=='test'||S.won)return;if(S.seen.length<6)return nope('Open all 6 wrong answers first, then decide.');
 if(j!==0)return nope(j===1?'The 7s went wrong 2 times, but carrying went wrong 3 times. Start with the one that happens most.':'Misreading happened once. Carrying went wrong 3 times.');score('Carrying! 3 of the 6 mistakes came from it.')}
function place(m){if(phase()!=='order'||S.won)return;S.grab=null;const want=S.slots.length;if(m!==want)return nope(MOVE_TIP[want],want);S.slots.push(m);A.sound.tick();
 if(S.slots.length===4)return score(finale());voice(`${want+1}: ${MOVES[m]}. What comes next?`);controls();A.redraw()}
function controls(){if(!ctl)return;ctl.innerHTML='';const v=phase(),btn=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='quiz'||S.won>=target())return;
 if(v==='find')WORK[S.w].rows.forEach((r,i)=>btn('Line '+(i+1),()=>tapRow(i),'Line '+(i+1)+' is wrong: '+r));
 if(v==='kind'||v==='think')deck().bins.forEach((t,i)=>btn('↓ '+t,()=>drop(i),'This card goes in '+t));
 if(v==='test'){if(S.seen.length<6)btn('Open the next wrong answer',()=>look(TEST.findIndex((t,i)=>!S.seen.includes(i))));else CAUSE.forEach((n,j)=>btn('Practise: '+n,()=>practise(j)))}
 if(v==='order')JUMBLE.filter(m=>!S.slots.includes(m)).forEach(m=>btn(MOVES[m],()=>place(m),'Next move: '+MOVES[m]))}
const inside=(p,b)=>p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h;
function down(p){const v=phase();if(v==='quiz'||S.won>=target())return false;
 if(v==='find'){WORK[S.w].rows.forEach((r,i)=>{if(inside(p,rowRect(i)))tapRow(i)});return false}
 if(v==='test'){for(let i=0;i<6;i++)if(inside(p,testRow(i))){look(i);break}return false}
 if(v==='order'){for(let j=0;j<4;j++){const m=JUMBLE[j];if(!S.slots.includes(m)&&inside(p,pickRect(j))){S.grab={m,x:p.x,y:p.y};A.redraw();return true}}return false}
 if(inside(p,cardRect())){S.grab={x:p.x,y:p.y};A.redraw();return true}
 for(let i=0;i<deck().bins.length;i++)if(inside(p,trayRect(i))){drop(i);break}return false}
function move(p){if(S.grab){S.grab.x=p.x;S.grab.y=p.y;A.redraw()}}
function up(p){const q=S.grab;if(!q)return;if(phase()==='order'){if(p.x<A.W*.5)place(q.m);else{S.grab=null;A.redraw()}return}
 let hit=-1;for(let i=0;i<deck().bins.length;i++)if(p.y>A.H*.44&&p.x>trayRect(i).x-4&&p.x<trayRect(i).x+trayRect(i).w+4)hit=i;S.grab=null;if(hit>=0)drop(hit);else A.redraw()}
const goalCheck=(n,msg)=>()=>{if(A.step===n&&S.won>=target()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(list,gap){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},RM()?j*40+30:(j+1)*(gap||250)))}
const reset=()=>{tok++;Object.assign(S,st0())};
const begin=(n,line,msg)=>()=>{reset();voice(line);controls();S.want=goalCheck(n,msg)};
const steps=[
{h:'Find the wrong line',p:'Each answer has one wrong line. Read it line by line, then tap the line where it goes wrong.',
 predict:{q:'You get a sum wrong. What helps you learn most?',opts:['Rub it out fast and move on','Look for the line that went wrong'],ans:1},task:'Find the mistake in 3 answers',
 show:()=>{steps[0].go();auto(WORK.map(p=>()=>tapRow(p.bad)),500)},go:begin(0,'Tap the line where it goes wrong.','Looking at the mistake shows exactly what to fix.')},
{h:'What kind of mistake?',p:'A slip: you knew it but rushed. A misconception: you had the wrong idea. A misread: you missed what the question asked.',task:'Sort all 6 mistakes',
 show:()=>{steps[1].go();auto(KIND.cards.map(k=>()=>drop(k[1])),260)},go:begin(1,'Slip, misconception or misread?','A slip needs a check, a misconception needs the idea relearned, a misread needs a careful reread.')},
{h:'The mistake that comes back',p:'Ava got 6 wrong on a test. Tap each one to see the cause. Then choose what she should practise first.',
 predict:{q:'Ava got 6 wrong. What is the best plan?',opts:['Practise everything again','Practise the mistake that keeps coming back'],ans:1},task:'Find what Ava should practise',
 show:()=>{steps[2].go();auto([0,1,2,3,4,5].map(i=>()=>look(i)).concat([()=>practise(0)]),220)},go:begin(2,'Tap each wrong answer on Ava\'s test.','A mistake that repeats points to one thing to learn.')},
{h:'Four moves',p:'Learning from a mistake has four moves. Drag them into order, or tap them in order.',task:'Put the four moves in order',
 show:()=>{steps[3].go();auto([0,1,2,3].map(m=>()=>place(m)),350)},go:begin(3,'Which move comes first?','Spot it, find why, fix it, try a new one.')},
{h:'Thoughts that help',p:'What you think after a mistake matters. Drag each thought to Helps me learn or Stops me learning.',
 predict:{q:'You were sure, but you were wrong. When you see the right answer, does it stick better or worse?',opts:['Worse','Better'],ans:1},task:'Sort all 6 thoughts',
 show:()=>{steps[4].go();auto(THINK.cards.map(k=>()=>drop(k[1])),260)},go:begin(4,'Does this thought help you learn?','Surprise helps: a mistake you were sure about is one you remember fixing.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Jo knows 8 × 5 = 40 but wrote 45 in a rush. What kind of mistake?',[['A slip','ok'],['A misconception','idea'],['A misread','read']]],
 ['Ben thinks heavy things always sink. What kind of mistake?',[['A misconception','ok'],['A slip','rush'],['A misread','read']]],
 ['Mia gets a sum wrong. What should she do first?',[['Find the line that went wrong','ok'],['Rub it out','hide'],['Do the next sum','skip']]],
 ['Kit forgot to carry in 4 of 5 wrong sums. What should Kit practise?',[['Carrying','ok'],['Every sum again','all'],['Nothing, it was bad luck','luck']]],
 ['Leo got a spelling wrong. He thinks, "I am rubbish at spelling." Which thought helps more?',[['"Which letters did I miss?"','ok'],['"I will never get it"','never'],['"Spelling does not matter"','skip']]]];
function why(t){let m='Look at the mistake, find why, then fix it.';
 if(t==='idea')m='She knows 8 × 5 = 40. Knowing it but rushing is a slip, not a wrong idea.';
 if(t==='read')m='Nothing in the question was missed. Check the kind of mistake again.';
 if(t==='rush')m='He really believes it, so it is a wrong idea: a misconception. A big log floats!';
 if(t==='hide')m='If she rubs it out first, she cannot find why it went wrong.';
 if(t==='skip')m='Skipping it means the same mistake can come back. Look at it first.';
 if(t==='all')m='Practising everything wastes time. The mistake that repeats is carrying, so start there.';
 if(t==='luck')m='4 of 5 is a pattern, not luck. It shows what to practise.';
 if(t==='never')m='"Never" stops you trying. Asking which letters you missed shows what to fix.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});voice('Challenge: '+q);A.redraw()}
let run=0;
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Right, that is how to learn from it.':'✗ '+why(t)}${ok?` In a row: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});controls()}});
A.start()})})();
