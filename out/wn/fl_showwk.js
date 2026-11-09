/* Flagship: Showing Your Working (ages 5–6; NC KS1 Year 1 maths: represent and use number bonds, solve one-step addition and
   subtraction problems using concrete objects and pictorial representations; NCETM "explain how you know" talk).
   Build 3 + 4 with counters in a ten frame; draw 7 − 2 by crossing out dots; put "I drew… I crossed out… are left" in order;
   hop 5 + 3 along a number line (the first hop lands on 6, not 5); count a friend's drawing to agree or disagree.
   Not flagcheck (checking your own work), flagnbonds (bonds), flagcountup (counting on) or flagjustify (equation steps). */
(()=>{
VIS.reg('flagshowwk',c=>{let A,pad,quizBox,item=-1,run=0;const S={};c.fig.classList.add('young');
const now=()=>['make','draw','say','hop','agree','chal'][A.step];
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function word(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.b||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||A.col.tx;g.fillText(String(s),x,y,o.max||A.W-12)}
/* wrap a sentence over as many lines as it needs, so phone text is never squashed */
function para(s,x,y,px,o){o=o||{};const g=A.ctx,mw=o.max||A.W*.92;g.font=`${o.b||700} ${px}px system-ui,sans-serif`;const out=[];let line='';
 for(const w of String(s).split(' ')){const t=line?line+' '+w:w;if(g.measureText(t).width>mw&&line){out.push(line);line=w}else line=t}out.push(line);
 const lh=px*1.25,y0=y-(out.length-1)*lh/2;out.forEach((l,i)=>word(l,x,y0+i*lh,px,{...o,max:mw}))}
const near=(p,q,r)=>Math.hypot(p.x-q.x,p.y-q.y)<=r,fs=()=>A.narrow?16:19,big=()=>A.narrow?24:30;
const RED='#dc2626',BLUE='#2563eb';
/* ten frame: 2 rows of 5 squares; counters fill it left to right, reds first */
const cellAt=k=>{const w=Math.min(A.W*.15,A.H*.2);return{x:A.W/2-2.5*w+(k%5)*w,y:A.H*.12+Math.floor(k/5)*w,w}};
const pileAt=i=>({x:A.W*(i?.75:.25),y:A.H*.68});
function counter(x,y,r,col){const g=A.ctx;g.fillStyle=col;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle='#0f172a';g.lineWidth=2;g.stroke()}
function drawMake(){const g=A.ctx,C=A.col;word('3 + 4 = ?',A.W/2,A.H*.05,fs(),{b:800});
 for(let k=0;k<10;k++){const r=cellAt(k);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(r.x,r.y,r.w,r.w);
  const col=k<S.red?RED:k<S.red+S.blue?BLUE:null;if(col)counter(r.x+r.w/2,r.y+r.w/2,r.w*.36,col)}
 [0,1].forEach(i=>{const p=pileAt(i),r=A.narrow?22:26;for(let j=0;j<3;j++)counter(p.x-r+j*r,p.y,r*.9,i?BLUE:RED);word(i?'Tap: add blue':'Tap: add red',p.x,p.y+r*1.9,A.narrow?14:16,{b:800})});
 para(S.msg||'Put in 3 red and 4 blue',A.W/2,A.H*.9,fs(),{ink:C.mu})}
/* seven dots in a row; tapping one crosses it out (tap again to undo) */
const dotAt=i=>({x:A.W*(.12+i*.127),y:A.H*.38});
function dots(n,crossed,y){const g=A.ctx,C=A.col,r=A.narrow?17:22;for(let i=0;i<n;i++){const p=dotAt(i);counter(p.x,y||p.y,r,'#f59e0b');
 if(crossed[i]){g.strokeStyle=C.rd;g.lineWidth=5;g.beginPath();g.moveTo(p.x-r,(y||p.y)-r);g.lineTo(p.x+r,(y||p.y)+r);g.moveTo(p.x+r,(y||p.y)-r);g.lineTo(p.x-r,(y||p.y)+r);g.stroke()}}}
const nCross=()=>S.cross.filter(Boolean).length;
function drawDraw(){word('7 − 2 = ?',A.W/2,A.H*.1,big(),{b:800});dots(7,S.cross);
 word(`Crossed out: ${nCross()}`,A.W/2,A.H*.58,fs(),{b:800});para(S.msg||'Tap 2 dots to cross them out',A.W/2,A.H*.82,fs(),{ink:A.col.mu})}
/* sentence cards: tap them in order to tell how the picture was made */
const SAY=['I drew 7 dots.','I crossed out 2.','5 are left.','I added 2 more.'];
function drawSay(){const C=A.col;dots(7,[0,0,0,0,0,1,1],A.H*.12);
 [0,1,2].forEach(i=>{const y=A.H*(.3+i*.14),t=S.said[i]!=null?SAY[S.said[i]]:'…';const g=A.ctx;g.fillStyle=A.alpha(C.ac,S.said[i]!=null?.18:.05);g.fillRect(A.W*.12,y-A.H*.055,A.W*.76,A.H*.11);word(`${i+1}. ${t}`,A.W/2,y,fs(),{b:800})});
 para(S.msg||'Tap the sentences in order',A.W/2,A.H*.86,fs(),{ink:C.mu})}
/* number line 0–10 with a frog that hops one number per tap */
const tickX=n=>A.W*(.06+n*.088),lineY=()=>A.H*.55;
function drawHop(){const g=A.ctx,C=A.col,y=lineY();word('5 + 3 = ?',A.W/2,A.H*.08,big(),{b:800});g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(tickX(0),y);g.lineTo(tickX(10),y);g.stroke();
 for(let n=0;n<=10;n++){g.beginPath();g.moveTo(tickX(n),y-8);g.lineTo(tickX(n),y+8);g.stroke();word(n,tickX(n),y+24,A.narrow?15:18,{b:n===S.at?900:600,ink:n===S.at?C.gr:C.tx})}
 S.path.forEach((n,i)=>{const a=tickX(n-1),b=tickX(n);g.strokeStyle=C.ac;g.lineWidth=3;g.beginPath();g.arc((a+b)/2,y-4,(b-a)/2,Math.PI,0);g.stroke();word(i+1,(a+b)/2,y-(b-a)/2-14,A.narrow?13:15,{ink:C.ac,b:900})});
 word('🐸',tickX(S.at),y-(A.narrow?62:80),A.narrow?26:34);word(`Hops: ${S.path.length}`,A.W/2,A.H*.24,fs(),{b:800});para(S.msg||'Tap the next number to hop',A.W/2,A.H*.86,fs(),{ink:C.mu})}
/* Mia's drawing: 4 dots and 2 dots; she wrote 7. Tap each dot to count it. */
const miaAt=i=>({x:A.W*(i<4?.08+i*.12:.68+(i-4)*.14),y:A.H*.42});
function drawAgree(){const C=A.col,r=A.narrow?17:22;para('Mia: 4 + 2 = 7',A.W/2,A.H*.1,big(),{b:800});word('+',A.W*.56,A.H*.42,big(),{b:900});
 for(let i=0;i<6;i++){const p=miaAt(i);counter(p.x,p.y,r,i<4?'#10b981':'#a855f7');const k=S.counted.indexOf(i);if(k>=0)word(k+1,p.x,p.y+r*1.9,fs(),{b:900,ink:C.ac})}
 if(S.verdict)word(S.verdict==='no'?'✓ It is 6, not 7':'✗ Count again',A.W/2,A.H*.68,big(),{b:900,ink:S.verdict==='no'?C.gr:C.rd});
 para(S.msg||'Tap each dot to count Mia’s drawing',A.W/2,A.H*.87,fs(),{ink:C.mu})}
function draw(Q){const C=Q.col;Q.ctx.fillStyle=Q.mix(C.pn,'#fef3c7',C.dark?.05:.45);Q.ctx.fillRect(0,0,Q.W,Q.H);
 ({make:drawMake,draw:drawDraw,say:drawSay,hop:drawHop,agree:drawAgree}[now()]||(()=>para(S.q||'Show how you know',Q.W/2,Q.H*.42,Q.narrow?20:24,{b:800})))()}
function fresh(o){run++;for(const k in S)delete S[k];Object.assign(S,{red:0,blue:0,cross:Array(7).fill(0),said:[],at:5,path:[],counted:[],verdict:null,msg:'',q:'',ok:()=>{}},o||{})}
const finishIf=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function auto(i,acts){steps[i].go();const t=run;acts.forEach((f,j)=>setTimeout(()=>{if(t===run)f()},A.reduced()?25*(j+1):380*(j+1)))}
function after(m){S.msg=m;tell(m);A.redraw();keys();S.ok()}
function add(blue){if(S.red+S.blue>=10)return;blue?S.blue++:S.red++;A.sound.pop();
 const m=S.red>3?`That is ${S.red} red. The sum says 3 red. Take one off.`:S.blue>4?`That is ${S.blue} blue. The sum says 4 blue. Take one off.`:
  S.red===3&&S.blue===4?'3 red and 4 blue. Count them all: 7. Now you can show how you know.':`${S.red} red, ${S.blue} blue.`;after(m)}
function takeOff(){if(S.blue)S.blue--;else if(S.red)S.red--;A.sound.tick();after(`${S.red} red, ${S.blue} blue.`)}
function cross(i){S.cross[i]=S.cross[i]?0:1;A.sound.pop();const n=nCross();
 after(n>2?`You crossed out ${n}. Take away 2 means cross out only 2. Tap one to undo.`:n===2?'2 crossed out. Count the dots left: 5. So 7 − 2 = 5.':`${n} crossed out.`)}
function crossNext(){const i=S.cross.lastIndexOf(0);if(i>=0)cross(i)}
function say(k){const want=S.said.length;if(want>2)return;
 if(k===want){S.said.push(k);A.sound.pop();after(want===2?'You told how you did it: drew, crossed out, counted what is left.':'Yes. What did you do next?')}
 else{A.sound.miss();after(k===3?'Look at the picture. The dots were crossed out, not added.':want===0?'First say what you started with.':'Say what you did before what is left.')}}
function hop(n){if(n===S.at){A.sound.miss();return after('You are already on 5. Do not count it. The first hop lands on 6.')}
 if(n!==S.at+1){A.sound.miss();return after(`Hop one number at a time. The next number is ${S.at+1}.`)}if(S.path.length>=3)return after('That is 3 hops already. 5 + 3 = 8.');
 S.at=n;S.path.push(n);A.sound.pop();after(S.path.length===3?'6, 7, 8. Three hops from 5 lands on 8. So 5 + 3 = 8.':`${n}. That is ${S.path.length} hop${S.path.length>1?'s':''}.`)}
function countDot(i){if(S.counted.includes(i))return;S.counted.push(i);A.sound.tick();after(S.counted.length===6?'6 dots in all. Mia wrote 7. Do you agree?':`${S.counted.length}`)}
function countNext(){const i=[0,1,2,3,4,5].find(j=>!S.counted.includes(j));if(i!=null)countDot(i)}
function verdict(v){S.verdict=v;v==='no'?A.sound.pop():A.sound.miss();
 after(v==='no'?'I disagree. The drawing shows 4 and 2, and that makes 6.':'The drawing does not show 7. Count the dots: there are 6.')}
function keys(){if(!pad)return;pad.innerHTML='';const k=now(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='make'){b('Add red',()=>add(0),'Add a red counter');b('Add blue',()=>add(1),'Add a blue counter');b('Take one off',takeOff)}
 if(k==='draw'){b('Cross out a dot',crossNext);b('Undo',()=>{const i=S.cross.indexOf(1);if(i>=0)cross(i)},'Undo a cross')}
 if(k==='say'&&S.said.length<3)[2,0,3,1].forEach(i=>b(SAY[i],()=>say(i),'Say: '+SAY[i]))
 if(k==='hop'&&S.path.length<3){b('Hop',()=>hop(S.at+1),`Hop to ${S.at+1}`);if(!S.path.length)b('Land on 5',()=>hop(5),'Count 5 as the first hop')}
 if(k==='agree'){if(S.counted.length<6)b('Count a dot',countNext);if(S.verdict!=='no'){b('I agree: 7',()=>verdict('yes'));b('I disagree: 6',()=>verdict('no'))}}}
function down(p){const k=now();
 if(k==='make'){for(const i of[0,1])if(near(p,pileAt(i),A.W*.14)){add(i);return true}for(let j=0;j<10;j++){const r=cellAt(j);if(p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.w){takeOff();return true}}return false}
 if(k==='draw'){const i=[0,1,2,3,4,5,6].find(j=>near(p,dotAt(j),A.W*.06));if(i!=null){cross(i);return true}return false}
 if(k==='hop'){if(Math.abs(p.y-lineY())>A.H*.2)return false;let n=0;for(let j=1;j<=10;j++)if(Math.abs(p.x-tickX(j))<Math.abs(p.x-tickX(n)))n=j;hop(n);return true}
 if(k==='agree'){const i=[0,1,2,3,4,5].find(j=>near(p,miaAt(j),A.W*.065));if(i!=null){countDot(i);return true}}return false}
const steps=[
{h:'Show it with counters',p:'Ben says 3 + 4 = 7. How does he know? Show it: put 3 red counters and 4 blue counters in the frame, then count them all.',
 predict:{q:'Ben wrote 7. His teacher asks: how do you know? What should Ben do?',opts:['Say 7 again, louder','Show it with counters or a drawing','Say he just knows'],ans:1},
 task:'Put 3 red and 4 blue in the frame',show:()=>auto(0,[()=>add(0),()=>add(0),()=>add(0),()=>add(1),()=>add(1),()=>add(1),()=>add(1)]),
 go:()=>{fresh();tell('An empty ten frame. Red and blue counters below.');keys();S.ok=finishIf(0,()=>S.red===3&&S.blue===4,'The counters show 3 and 4 make 7.')}},
{h:'Draw it',p:'You can draw your working too. For 7 take away 2, draw 7 dots. Cross out 2. Count what is left.',
 predict:{q:'7 take away 2. How many dots do you cross out?',opts:['7','2','5'],ans:1},
 task:'Cross out 2 of the 7 dots',show:()=>auto(1,[()=>cross(6),()=>cross(5)]),
 go:()=>{fresh();tell('7 dots in a row.');keys();S.ok=finishIf(1,()=>nCross()===2,'5 dots are left, so 7 − 2 = 5.')}},
{h:'Say what you did',p:'Now tell it in words, in order. What did you start with? What did you do? What is the answer?',
 task:'Tap the 3 sentences in order',show:()=>auto(2,[()=>say(0),()=>say(1),()=>say(2)]),
 go:()=>{fresh();tell('The drawing: 7 dots, 2 crossed out.');keys();S.ok=finishIf(2,()=>S.said.length===3,'Start, what you did, the answer. That is showing your working.')}},
{h:'Count on',p:'For 5 + 3, start on 5 and hop 3 times along the number line. Each hop is one more.',
 predict:{q:'Start on 5 and count on 3. What is the first number you say?',opts:['5','6','3'],ans:1},
 task:'Make 3 hops from 5',show:()=>auto(3,[()=>hop(6),()=>hop(7),()=>hop(8)]),
 go:()=>{fresh();tell('A number line from 0 to 10. The frog sits on 5.');keys();S.ok=finishIf(3,()=>S.path.length===3,'The hops show how you got 8.')}},
{h:'Agree or disagree?',p:'Mia drew her working. Check it. Count her dots, then say if you agree.',
 predict:{q:'Mia drew 4 dots and 2 dots. She wrote 7. Do you agree?',opts:['Yes, she drew it','No, check her drawing','You cannot check it'],ans:1},
 task:'Count Mia’s dots, then agree or disagree',show:()=>auto(4,[countNext,countNext,countNext,countNext,countNext,countNext,()=>verdict('no')]),
 go:()=>{fresh();tell('Mia drew 4 green dots and 2 purple dots. She wrote 7.');keys();S.ok=finishIf(4,()=>S.counted.length===6&&S.verdict==='no','Her drawing helped you find the slip: 4 + 2 = 6.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
const QS=[['Sam says 2 + 3 = 5. Which shows how he knows?','2 dots and 3 dots, 5 in all',[['Just the number 5','only'],['2 dots and 2 dots','match']]],
 ['Ali drew 6 dots and crossed out 1. What sum did he show?','6 take away 1',[['6 add 1','sign'],['6 add 6','match']]],
 ['Start on 4. Count on 2. Where do you land?','6',[['5','start'],['7','extra']]],
 ['Zoe drew 5 dots and 1 dot. She wrote 7. Do you agree?','No, the drawing shows 6',[['Yes, she wrote 7','only'],['Yes, the drawing does not matter','only']]],
 ['How do you know 3 + 2 = 5? Pick the best answer.','I had 3, then counted on 4, 5',[['I just know','only'],['3 and 2 is 6','match']]],
 ['8 take away 3. How many dots do you cross out?','3',[['8','match'],['5','sign']]]];
function why(tag){let m='Look at the picture again and count.';
 if(tag==='only')m='A number on its own does not show how. Show it with counters, a drawing or words.';
 if(tag==='match')m='The picture must match the numbers in the sum. Count each part.';
 if(tag==='start')m='Do not count the number you start on. The first hop lands on the next number.';
 if(tag==='sign')m='Check the sign. Add means put more in. Take away means cross out.';
 if(tag==='extra')m='One hop for each number you add. Count the hops: just 2.';
 return m}
function ask(){item++;const[q,ans,bad]=QS[item%QS.length],opts=[[ans,'ok'],...bad],r=item%3,order=opts.slice(r).concat(opts.slice(0,r));S.q=q;
 quizBox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(tag,ans)});tell('Challenge: '+q);A.redraw()}
function mark(tag,ans){quizBox.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=tag==='ok';ok?A.win():A.sound.miss();tell(ok?'Yes. '+ans+'.':why(tag));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(tag))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.05,draw,onStep:Q=>{quizBox.hidden=Q.step!==5;pad.hidden=Q.step===5;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Working controls'},w);quizBox=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down});keys()}});
A.start()})})();
