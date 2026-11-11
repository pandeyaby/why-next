/* Flagship: Division as Unknown Factor (ages 8–9; CCSS 3.OA.B.6 "understand division as an unknown-factor problem, e.g.
   find 32 ÷ 8 by finding the number that makes 32 when multiplied by 8"; NC Y3 "write and calculate mathematical
   statements for multiplication and division using the times tables"; inverse relationship).
   Stretch an 8-row array until it holds 32; pick 42 off the 6 times-table strip; build the 3-5-15 fact family and reject
   3 ÷ 15; slide the missing factor in 7 × ? = 56; check Sam's 48 ÷ 6 = 9 by multiplying.
   Not flagdiv/lesson 08 (sharing and grouping), flagcommul (a × b = b × a) or flagwmd (written methods). */
(()=>{
VIS.reg('flagunkf',c=>{let A,pad,quizBox,item=-1,run=0;const S={};c.fig.classList.add('young');
const stage=()=>['grid','table','family','slide','check','chal'][A.step];
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function put(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||A.col.tx;g.fillText(String(s),x,y)}
const fz=()=>A.narrow?16:19,huge=()=>A.narrow?24:30,ORANGE='#ea580c',TEAL='#0d9488';
function tile(x,y,w,h,label,o){o=o||{};const g=A.ctx,C=A.col;g.fillStyle=o.fill||A.alpha(C.ac,.12);A.paint.rrect(x,y,w,h,10);g.fill();g.strokeStyle=o.edge||C.tx;g.lineWidth=o.lw||2;g.stroke();put(label,x+w/2,y+h/2,o.px||fz(),{w:800,ink:o.ink})}
/* 1: an 8-row array whose number of columns the child stretches */
const ROWS=8,GOAL=32;const cs=()=>Math.min(A.W*.07,A.H*.072),gx=()=>A.W*(A.narrow?.22:.16),gy=()=>A.H*.2;
function drawGrid(){const g=A.ctx,s=cs();put(`${GOAL} ÷ ${ROWS} = ?   means   ${ROWS} × ? = ${GOAL}`,A.W/2,A.H*.08,fz(),{w:800});
 for(let r=0;r<ROWS;r++)for(let k=0;k<S.cols;k++){g.fillStyle=k%2?TEAL:ORANGE;g.beginPath();g.arc(gx()+k*s+s/2,gy()+r*s+s/2,s*.36,0,7);g.fill()}
 put(`${ROWS} rows`,gx()-8,gy()+ROWS*s/2,A.narrow?13:15,{al:'right',w:700});const hx=gx()+Math.max(S.cols,0)*s+6;g.fillStyle=A.col.ac;A.paint.rrect(hx,gy(),Math.max(12,s*.5),ROWS*s,6);g.fill();
 put('⇔',hx+Math.max(6,s*.25),gy()-14,A.narrow?16:18,{ink:A.col.ac});
 put(`${ROWS} × ${S.cols} = ${ROWS*S.cols}`,A.W/2,gy()+ROWS*s+30,huge(),{w:900,ink:ROWS*S.cols===GOAL?A.col.gr:A.col.tx})}
/* 2: the 6 times-table as a strip of tappable products */
const T6=[6,12,18,24,30,36,42,48,54,60],t6At=i=>{const w=A.W*.17,h=A.H*.12;return{x:A.W*.06+(i%5)*A.W*.18,y:A.H*(.3+Math.floor(i/5)*.17),w,h}};
function drawTable(){put('42 ÷ 6 = ?   →   6 × ? = 42',A.W/2,A.H*.1,fz(),{w:800});T6.forEach((v,i)=>{const b=t6At(i);tile(b.x,b.y,b.w,b.h,v,{fill:S.tapped===i?(v===42?A.alpha(A.col.gr,.35):A.alpha(A.col.rd,.25)):null})});
 if(S.tapped!=null)put(`6 × ${S.tapped+1} = ${T6[S.tapped]}`,A.W/2,A.H*.78,huge(),{w:900,ink:T6[S.tapped]===42?A.col.gr:A.col.tx})}
/* 3: fact family cards for 3, 5 and 15; four are true, two are traps */
const CARDS=[['3 × 5 = 15',1],['15 ÷ 3 = 5',1],['3 ÷ 15 = 5',0],['5 × 3 = 15',1],['15 × 3 = 5',0],['15 ÷ 5 = 3',1]];
const cardAt=i=>{const w=A.W*.42,h=A.H*.11;return{x:A.W*(i%2?.53:.05),y:A.H*(.22+Math.floor(i/2)*.15),w,h}};
function drawFamily(){const C=A.col;put('Fact family: 3, 5 and 15',A.W/2,A.H*.09,fz(),{w:800});CARDS.forEach(([t,ok],i)=>{const b=cardAt(i),st=S.fam[i];
 tile(b.x,b.y,b.w,b.h,(st===1?'✓ ':st===-1?'✗ ':'')+t,{fill:st===1?A.alpha(C.gr,.3):st===-1?A.alpha(C.rd,.22):null})});
 put(`True facts found: ${S.fam.filter(x=>x===1).length} of 4`,A.W/2,A.H*.72,fz(),{w:800})}
/* 4: a number line 1–12 with a knob for the missing factor */
const kx=n=>A.W*(.08+(n-1)*.0764),ky=()=>A.H*.55;
function drawSlide(){const g=A.ctx,C=A.col,y=ky();put(`7 × ${S.n} = ${7*S.n}`,A.W/2,A.H*.14,huge(),{w:900,ink:7*S.n===56?C.gr:C.tx});
 put(7*S.n<56?'too small':7*S.n>56?'too big':'= 56 ✓',A.W/2,A.H*.27,fz(),{w:800,ink:7*S.n===56?C.gr:C.mu});
 g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(kx(1),y);g.lineTo(kx(12),y);g.stroke();
 for(let n=1;n<=12;n++){g.beginPath();g.moveTo(kx(n),y-8);g.lineTo(kx(n),y+8);g.stroke();put(n,kx(n),y+26,A.narrow?14:16,{w:n===S.n?900:600})}
 g.fillStyle=C.ac;g.beginPath();g.arc(kx(S.n),y,A.narrow?14:17,0,7);g.fill();put('?',kx(S.n),y,A.narrow?14:16,{ink:C.dark?'#0f172a':'#ffffff',w:900});put('Goal: 7 × ? = 56',A.W/2,A.H*.8,fz(),{ink:C.mu})}
/* 5: check Sam's answer by multiplying back */
const ANS=[7,8,9],ansAt=i=>{const w=A.W*.2,h=A.H*.14;return{x:A.W*(.14+i*.26),y:A.H*.56,w,h}};
function drawCheck(){const C=A.col;put('Sam: 48 ÷ 6 = 9',A.W/2,A.H*.1,huge(),{w:900});
 if(S.checked)put('Check: 6 × 9 = 54, not 48 ✗',A.W/2,A.H*.3,fz(),{w:800,ink:C.rd});else put('Check it: does 6 × 9 make 48?',A.W/2,A.H*.3,fz(),{ink:C.mu});
 ANS.forEach((v,i)=>{const b=ansAt(i),picked=S.pick===v;tile(b.x,b.y,b.w,b.h,v,{px:huge(),fill:picked?(v===8?A.alpha(C.gr,.35):A.alpha(C.rd,.22)):null})});
 if(S.pick)put(`6 × ${S.pick} = ${6*S.pick}`,A.W/2,A.H*.84,fz(),{w:800,ink:6*S.pick===48?C.gr:C.tx})}
function draw(Q){const C=Q.col;Q.ctx.fillStyle=Q.mix(C.pn,'#ccfbf1',C.dark?.05:.35);Q.ctx.fillRect(0,0,Q.W,Q.H);
 ({grid:drawGrid,table:drawTable,family:drawFamily,slide:drawSlide,check:drawCheck}[stage()]||(()=>put(S.q?'Use a times fact you know':'',Q.W/2,Q.H*.45,fz(),{w:800})))()}
function fresh(o){run++;for(const k in S)delete S[k];Object.assign(S,{cols:0,grab:false,tapped:null,fam:Array(6).fill(0),n:1,checked:false,pick:null,q:'',ok:()=>{}},o||{})}
const finishIf=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function auto(i,acts){steps[i].go();const t=run;acts.forEach((f,j)=>setTimeout(()=>{if(t===run)f()},A.reduced()?25*(j+1):380*(j+1)))}
function after(m){tell(m);A.redraw();keys();S.ok()}
function setCols(n){n=Math.max(0,Math.min(8,n));if(n===S.cols)return;S.cols=n;A.sound.tick();const p=ROWS*n;
 after(p===GOAL?`${ROWS} × ${n} = ${GOAL}. So ${GOAL} ÷ ${ROWS} = ${n}: the missing factor is the answer.`:p>GOAL?`${ROWS} × ${n} = ${p}. That is more than ${GOAL}. Take a column off.`:`${ROWS} × ${n} = ${p}. Not ${GOAL} yet.`)}
function tapT6(i){S.tapped=i;const v=T6[i];v===42?A.sound.pop():A.sound.miss();
 after(v===42?'6 × 7 = 42, so 42 ÷ 6 = 7. The answer is how many sixes make 42.':v<42?`6 × ${i+1} = ${v}. That is less than 42. Go further along the table.`:`6 × ${i+1} = ${v}. That is past 42. Go back.`)}
function tapCard(i){if(S.fam[i]===1)return;const ok=CARDS[i][1];S.fam[i]=ok?1:-1;ok?A.sound.pop():A.sound.miss();const n=S.fam.filter(x=>x===1).length;
 after(!ok?(i===2?'3 ÷ 15 is not 5. In a division the total comes first: 15 ÷ 3 = 5.':'15 × 3 is 45, not 5. Multiplying the total makes it bigger.'):n===4?'Two times facts and two division facts. One fact gives you all four.':`True: ${CARDS[i][0]}.`)}
const famNext=()=>{const i=CARDS.findIndex(([,ok],j)=>ok&&S.fam[j]!==1);if(i>=0)tapCard(i)};
function setN(n){n=Math.max(1,Math.min(12,n));if(n===S.n)return;S.n=n;A.sound.tick();const p=7*n;
 after(p===56?'7 × 8 = 56. So 56 ÷ 7 = 8.':p<56?`7 × ${n} = ${p}. Too small. Try a bigger number.`:`7 × ${n} = ${p}. Too big. Try a smaller number.`)}
function doCheck(){S.checked=true;A.sound.miss();after('6 × 9 = 54, not 48. So Sam is wrong. Which number times 6 makes 48?')}
function pickAns(v){if(!S.checked){A.sound.miss();return after('First check Sam’s answer: work out 6 × 9.')}S.pick=v;v===8?A.sound.pop():A.sound.miss();
 after(v===8?'6 × 8 = 48. So 48 ÷ 6 = 8. Multiplying back caught the slip.':`6 × ${v} = ${6*v}, not 48. Try another.`)}
function keys(){if(!pad)return;pad.innerHTML='';const k=stage(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='grid'){b('Add a column',()=>setCols(S.cols+1),`Add a column of ${ROWS}`);b('Take a column off',()=>setCols(S.cols-1))}
 if(k==='table'){b('Next fact',()=>tapT6(S.tapped==null?0:Math.min(9,S.tapped+1)),'Show the next fact in the 6 times table');if(S.tapped)b('Back one',()=>tapT6(S.tapped-1))}
 if(k==='family')CARDS.forEach(([t],i)=>{if(S.fam[i]!==1)b(t,()=>tapCard(i),'Card: '+t)});
 if(k==='slide'){b('? − 1',()=>setN(S.n-1),'Make the missing number smaller');b('? + 1',()=>setN(S.n+1),'Make the missing number bigger')}
 if(k==='check'){if(!S.checked)b('Check: 6 × 9',doCheck,'Check Sam: work out 6 times 9');ANS.forEach(v=>b(`Answer ${v}`,()=>pickAns(v),`48 ÷ 6 = ${v}`))}}
const inside=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){const k=stage();
 if(k==='grid'){if(p.y<gy()-20||p.y>gy()+ROWS*cs()+10)return false;S.grab=true;setCols(Math.round((p.x-gx())/cs()));return true}
 if(k==='table'){const i=T6.findIndex((v,j)=>inside(p,t6At(j)));if(i>=0){tapT6(i);return true}return false}
 if(k==='family'){const i=CARDS.findIndex((v,j)=>inside(p,cardAt(j)));if(i>=0){tapCard(i);return true}return false}
 if(k==='slide'){if(Math.abs(p.y-ky())>A.H*.18)return false;setN(Math.round((p.x-kx(1))/(kx(2)-kx(1)))+1);return true}
 if(k==='check'){const i=ANS.findIndex((v,j)=>inside(p,ansAt(j)));if(i>=0){pickAns(ANS[i]);return true}if(p.y<A.H*.42&&!S.checked){doCheck();return true}}return false}
function move(p){const k=stage();if(k==='grid'&&S.grab)setCols(Math.round((p.x-gx())/cs()));if(k==='slide')setN(Math.round((p.x-kx(1))/(kx(2)-kx(1)))+1)}
function up(){S.grab=false}
const steps=[
{h:'A times question in disguise',p:'32 ÷ 8 asks: 8 times what makes 32? Stretch the array of 8 rows until it holds 32 dots.',
 predict:{q:'32 ÷ 8 = ? is the same question as…',opts:['8 × ? = 32','32 × 8 = ?','8 + ? = 32'],ans:0},
 task:'Make 8 rows hold exactly 32 dots',show:()=>auto(0,[1,2,3,4].map(n=>()=>setCols(n))),
 go:()=>{fresh();tell('An empty array with 8 rows. Drag the handle right to add columns.');keys();S.ok=finishIf(0,()=>S.cols*ROWS===GOAL,'8 × 4 = 32, so 32 ÷ 8 = 4.')}},
{h:'Use a fact you know',p:'You do not need to share 42 things out one by one. Find 42 in the 6 times table instead.',
 predict:{q:'Which fact helps you find 42 ÷ 6?',opts:['42 − 6 = 36','6 × 7 = 42','4 × 2 = 8'],ans:1},
 task:'Find 42 in the 6 times table',show:()=>auto(1,[0,1,2,3,4,5,6].map(i=>()=>tapT6(i))),
 go:()=>{fresh();tell('The 6 times table: 6, 12, 18 and on to 60.');keys();S.ok=finishIf(1,()=>S.tapped===6,'42 is the 7th number in the 6 times table, so 42 ÷ 6 = 7.')}},
{h:'One family, four facts',p:'3, 5 and 15 make a fact family. Tap every true fact. Watch out for two traps.',
 task:'Find all 4 true facts',show:()=>auto(2,[famNext,famNext,famNext,famNext]),
 go:()=>{fresh();tell('Six fact cards for 3, 5 and 15.');keys();S.ok=finishIf(2,()=>S.fam.filter(x=>x===1).length===4,'3 × 5 = 15 gives 15 ÷ 3 = 5 and 15 ÷ 5 = 3.')}},
{h:'Find the missing factor',p:'56 ÷ 7 asks: 7 times what makes 56? Slide the ? along until the fact is true.',
 predict:{q:'In 56 ÷ 7 = ?, which number is the total?',opts:['7','56','The answer'],ans:1},
 task:'Make 7 × ? = 56 true',show:()=>auto(3,[5,6,7,8].map(n=>()=>setN(n))),
 go:()=>{fresh({n:1});tell('A number line 1 to 12 with a ? knob on 1. 7 × 1 = 7.');keys();S.ok=finishIf(3,()=>S.n===8,'The missing factor 8 is the answer to 56 ÷ 7.')}},
{h:'Check by multiplying',p:'Sam says 48 ÷ 6 = 9. Multiply back to check him, then pick the right answer.',
 predict:{q:'How can you check Sam’s 48 ÷ 6 = 9?',opts:['Work out 6 × 9 and see if it is 48','Work out 48 + 6','You cannot check a division'],ans:0},
 task:'Check Sam, then find the right answer',show:()=>auto(4,[doCheck,()=>pickAns(8)]),
 go:()=>{fresh();tell('Sam wrote 48 ÷ 6 = 9. Three answer tiles: 7, 8 and 9.');keys();S.ok=finishIf(4,()=>S.checked&&S.pick===8,'Multiplying undoes dividing, so it checks the answer.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
const QS=[['24 ÷ 6 = ? Which question is the same?','6 × ? = 24',[['24 × 6 = ?','total'],['6 + ? = 24','add']]],
 ['What is 35 ÷ 5?','7',[['6','fact'],['30','sub']]],
 ['Which fact is in the family of 4, 5 and 20?','20 ÷ 4 = 5',[['4 ÷ 20 = 5','order'],['20 × 4 = 5','total']]],
 ['9 × 7 = 63. So 63 ÷ 9 = ?','7',[['63','total'],['9','divisor']]],
 ['Mo says 54 ÷ 6 = 8. Is he right?','No: 6 × 8 = 48, so it is 9',[['Yes, 8 is close enough','check'],['Yes, you cannot check it','check']]],
 ['8 × ? = 72. What is the missing number?','9',[['8','fact'],['64','sub']]]];
function why(tag){let m='Turn the division into a times question: what times the divisor makes the total?';
 if(tag==='total')m='The total is the big number you start with. You do not multiply it. Ask: what times the other number makes the total?';
 if(tag==='add')m='Division undoes multiplying, not adding. 6 × ? = 24, so the answer is 4.';
 if(tag==='sub')m='That takes the number away only once. Ask how many of them make the total.';
 if(tag==='fact')m='Close, but check the times fact: multiply your answer back and see if it makes the total.';
 if(tag==='order')m='A division starts with the total. 20 ÷ 4 = 5, but 4 ÷ 20 is less than 1.';
 if(tag==='divisor')m='9 is the number you divide by. The answer is the missing factor: 9 × 7 = 63.';
 if(tag==='check')m='You can always check: multiply the answer by the divisor. 6 × 8 = 48, not 54.';
 return m}
function ask(){item++;const[q,ans,bad]=QS[item%QS.length],opts=[[ans,'ok'],...bad],r=item%3,order=opts.slice(r).concat(opts.slice(0,r));S.q=q;
 quizBox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(tag,ans)});tell('Challenge: '+q);A.redraw()}
function mark(tag,ans){quizBox.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=tag==='ok';ok?A.win():A.sound.miss();tell(ok?'Yes. '+ans+'.':why(tag));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(tag))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.05,draw,onStep:Q=>{quizBox.hidden=Q.step!==5;pad.hidden=Q.step===5;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Division controls'},w);quizBox=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down,move,up});keys()}});
A.start()})})();
