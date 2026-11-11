/* Flagship – knowing what you don't know (ages 14–16): confidence is a claim you can test. Reveal a classmate's
   "90% sure" answers and mark how often they were right; set rainy days to make a forecaster calibrated; answer and
   rate your own questions on a live calibration chart; drag answers into sure/unsure × right/wrong (checking each
   one yourself); then turn doubt into the right action for the situation. */
(()=>{
 const SAM=[1,0,1,1,0,1,0,1,1,0]; // Sam said 90% sure on all ten; six were right
 const FC=[30,70,90]; // forecast chances of rain, each said on 10 days
 const QZ=[['Which is bigger?','0.5','0.45',0],['Who has more bones?','A newborn baby','An adult',0],['In biology, a tomato is a…','fruit','vegetable',0],
  ['Which is bigger?','2¹⁰','10³',0],['In a vacuum, a hammer and a feather dropped together…','land together','hammer lands first',0],['Can lightning strike the same place twice?','Yes','No',0]];
 const CONF=[50,70,90,100],CW={50:'50% (a guess)',70:'70%',90:'90%',100:'100% (certain)'};
 // [claim, confidence word, sure?, right?, why]
 const CARDS=[['7 × 8 = 56','“certain”',1,1,'7 × 8 is 56.'],['0.3 × 0.2 = 0.6','“definitely”',1,0,'3 × 2 = 6 with two decimal places: 0.06.'],
  ['√49 = 7','“total guess”',0,1,'7 × 7 = 49, so it is right.'],['3² = 6','“not sure”',0,0,'3² is 3 × 3 = 9, not 3 × 2.'],
  ['½ + ⅓ = ⅖','“certain”',1,0,'Use sixths: 3/6 + 2/6 = 5/6. You cannot add the tops and bottoms.'],['Plants make oxygen in photosynthesis','“certain”',1,1,'Oxygen is a product of photosynthesis.'],
  ['Spiders are insects','“unsure”',0,0,'Spiders have 8 legs and 2 body parts: they are arachnids.'],['Water boils at 100 °C at sea level','“not sure”',0,1,'At sea-level pressure, pure water boils at 100 °C.']];
 const BOX=[['Sure and right',1,1],['Sure and wrong',1,0],['Unsure and right',0,1],['Unsure and wrong',0,0]];
 // [situation, options [text, ok?, reason]]
 const DO=[['Homework. You are 50% sure of a date in History. Your textbook is on the desk.',[['Look it up in the textbook',1,'Doubt plus a source to hand: checking costs a minute and turns a guess into knowledge.'],['Write your guess and move on',0,'With the book right there, a guess wastes the doubt you noticed.']]],
  ['Maths exam. No marks lost for wrong answers. You are 40% sure on a question.',[['Write your best answer, flag it, come back if there is time',1,'A blank scores nothing; a reasoned answer may score. Flagging lets you return.'],['Leave it blank',0,'There is no penalty for a wrong answer, so a blank throws away a chance of marks.']]],
  ['A quick mental sum in a test. You feel 100% sure.',[['Check it another way, such as estimating',1,'Fast answers feel certain. A 10-second estimate catches the slip.'],['Move on: certain means right',0,'Feeling certain is not proof. Sure-and-wrong slips hide here.']]],
  ['Class discussion. You are unsure what “mitigate” means.',[['Ask, or check the word, before you use it',1,'Asking shows good monitoring, not weakness.'],['Nod and hope it becomes clear',0,'Hiding doubt keeps the gap open.']]]];
VIS.reg('flagcalib',c=>{let A,pad,quiz,reader;
 const st={open:[],mark:null,rain:[5,5,5],qi:0,pick:null,mine:[],ci:0,boxed:[],di:0,bad:null,drag:null,tok:0,onChange:()=>{}};
 const mode=()=>['sam','fc','me','box','do','quiz'][A.step];
 function speak(t){c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(reader)reader.textContent=t}}
 function nope(t){A.sound.miss();speak(t);A.redraw()}
 const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 function write(g,t,x,y,n,col,w,al){g.font=`${w||700} ${n}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-16)}
 function box(g,r,col,a,thick){g.fillStyle=A.alpha(col,a||.12);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=col;g.lineWidth=thick?3:1.5;g.stroke()}
 // ---------- geometry ----------
 function samR(i){const cols=A.narrow?5:10,gap=6,w=(A.W-gap*(cols+1))/cols,h=Math.min(54,A.H*.13);return{x:gap+(i%cols)*(w+gap),y:A.H*.08+Math.floor(i/cols)*(h+gap),w,h}}
 const barR=()=>({x:A.W*.08,y:A.H*.72,w:A.W*.84,h:22});
 function rowR(i){return{x:A.W*.22,y:A.H*(.16+i*.27),w:A.W*.74,h:Math.min(40,A.H*.1)}}
 const chartR=()=>({x:A.W*.16,y:A.H*.08,w:A.W*.78,h:A.H*.74});
 function quadR(i){const w=(A.W-30)/2,h=A.H*.3;return{x:10+(i%2)*(w+10),y:A.H*.34+Math.floor(i/2)*(h+8),w,h}}
 // ---------- drawing ----------
 function drawSam(g){const C=A.col;write(g,'Sam: “90% sure” on all ten answers',A.W/2,A.H*.035+6,13,C.tx);
  SAM.forEach((ok,i)=>{const r=samR(i),o=st.open.includes(i);box(g,r,o?(ok?C.gr:C.rd):C.mu,o?.25:.08,o);write(g,o?(ok?'✓':'✗'):'Q'+(i+1),r.x+r.w/2,r.y+r.h/2,o?20:13,o?(ok?C.gr:C.rd):C.tx,800)});
  const right=SAM.filter((v,i)=>v&&st.open.includes(i)).length;write(g,`Revealed ${st.open.length} of 10 · right so far: ${right}`,A.W/2,A.H*.52,13,C.mu,600);
  const b=barR();box(g,b,C.mu,.08);const px=v=>b.x+b.w*v/100;
  g.strokeStyle=C.vi;g.lineWidth=3;g.beginPath();g.moveTo(px(90),b.y-8);g.lineTo(px(90),b.y+b.h+8);g.stroke();write(g,'said 90%',px(90),b.y-18,12,C.vi);
  for(let v=0;v<=100;v+=20)write(g,v+'%',px(v),b.y+b.h+16,11,C.mu,500);
  if(st.mark!=null){A.paint.ball(px(st.mark),b.y+b.h/2,13,st.mark===60&&st.open.length===10?C.gr:C.or);write(g,'actually right: '+st.mark+'%',px(st.mark),b.y+b.h+36,13,C.tx)}
  else write(g,'Drag along the bar: how often was Sam right?',A.W/2,b.y+b.h+36,13,C.tx,600)}
 function drawFc(g){const C=A.col;write(g,'Each forecast was said on 10 days. How many should be rainy?',A.W/2,A.H*.06,13,C.tx);
  FC.forEach((f,i)=>{const r=rowR(i),n=st.rain[i],ok=n*10===f;write(g,f+'% rain',A.W*.11,r.y+r.h/2,14,C.tx,800);
   for(let d=0;d<10;d++){const x=r.x+r.w*(d+.5)/10;write(g,d<n?'🌧':'☀️',x,r.y+r.h/2,Math.min(24,r.w/12),C.tx)}
   write(g,`${n} of 10 rainy`+(ok?' ✓ calibrated':''),r.x+r.w/2,r.y+r.h+14,12,ok?C.gr:C.mu,700)})}
 function drawChart(g){const C=A.col,r=chartR(),X=v=>r.x+r.w*(v-46)/60,Y=v=>r.y+r.h*(1-v/100);
  g.strokeStyle=C.ln;g.lineWidth=1;g.strokeRect(r.x,r.y,r.w,r.h);g.setLineDash([6,5]);g.strokeStyle=C.gr;g.beginPath();g.moveTo(X(50),Y(50));g.lineTo(X(100),Y(100));g.stroke();g.setLineDash([]);
  write(g,'perfectly calibrated',X(84),Y(66),11,C.gr,600);[50,70,90,100].forEach(v=>write(g,v+'%',X(v),r.y+r.h+12,11,C.mu,500));[0,50,100].forEach(v=>write(g,v+'%',r.x-18,Y(v),11,C.mu,500));
  write(g,'how sure you said →',r.x+r.w/2,r.y+r.h+28,11,C.mu,600);
  CONF.forEach(v=>{const a=st.mine.filter(m=>m.c===v);if(!a.length)return;const hit=100*a.filter(m=>m.ok).length/a.length;A.paint.ball(X(v),Y(hit),6+3*a.length,hit<v-15?C.rd:hit>v+15?C.cy:C.or);write(g,`${a.filter(m=>m.ok).length}/${a.length}`,X(v),Y(hit)-18,11,C.tx)});
  if(!st.mine.length)write(g,'Your answers will appear here',r.x+r.w/2,r.y+r.h/2,13,C.mu,600)}
 function drawBox(g){const C=A.col,k=CARDS[st.ci];BOX.forEach((b,i)=>{const r=quadR(i),n=st.boxed.filter(j=>CARDS[j][2]===b[1]&&CARDS[j][3]===b[2]).length;box(g,r,i===1?C.rd:i===0?C.gr:C.cy,st.bad===i?.3:.08,st.bad===i);write(g,b[0]+(n?` (${n})`:''),r.x+r.w/2,r.y+16,13,C.tx,800)});
  if(!k)return write(g,'All eight sorted.',A.W/2,A.H*.16,15,C.gr,800);const at=st.drag||{x:A.W/2,y:A.H*.15},w=Math.min(A.W-20,360);
  box(g,{x:at.x-w/2,y:at.y-30,w,h:60},C.or,.2,true);write(g,k[0],at.x,at.y-9,15,C.tx,800);write(g,'said '+k[1],at.x,at.y+16,12,C.mu,600)}
 function drawDo(g){const C=A.col,d=DO[st.di];if(!d)return write(g,'Doubt used well, four times.',A.W/2,A.H/2,15,C.gr,800);
  const words=d[0].split(' '),lines=[];let cur='';g.font='700 15px system-ui,sans-serif';words.forEach(w=>{const n=cur?cur+' '+w:w;if(g.measureText(n).width>A.W-40&&cur){lines.push(cur);cur=w}else cur=n});lines.push(cur);
  lines.forEach((l,i)=>write(g,l,A.W/2,A.H*.3+i*22,15,C.tx));write(g,`Situation ${st.di+1} of ${DO.length}`,A.W/2,A.H*.12,12,C.mu,600)}
 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.35);g.fillRect(0,0,W,H);
  ({sam:drawSam,fc:drawFc,me:drawChart,box:drawBox,do:drawDo,quiz:()=>write(g,'🎯',W/2,H/2,60,C.tx)})[mode()](g);A.fx.draw(g)}
 // ---------- actions ----------
 function reveal(i){if(st.open.includes(i))return;st.open.push(i);A.sound.tick();report(SAM[i]?`Q${i+1} was right.`:`Q${i+1} was wrong, even at 90% sure.`)}
 function setMark(v){v=Math.max(0,Math.min(100,Math.round(v/10)*10));if(st.open.length<10){nope('Reveal all ten answers first, then mark how often Sam was right.');return}st.mark=v;
  if(v===60){A.sound.pop();report('Yes: 6 of 10 is 60%. Sam said 90% but was right 60% of the time. That gap is overconfidence.')}
  else report(v>60?`${v}% is higher than Sam scored. Count the ticks: 6 of 10.`:`${v}% is lower than Sam scored. Count the ticks: 6 of 10.`)}
 function setRain(i,n){st.rain[i]=Math.max(0,Math.min(10,n));A.sound.tick();const f=FC[i],ok=st.rain[i]*10===f;
  report(ok?`Right: a calibrated ${f}% forecast is followed by rain on ${f/10} of 10 days.`:`${st.rain[i]} of 10 is ${st.rain[i]*10}%. A ${f}% forecast should match that rate.`)}
 function answer(k){st.pick=k;A.sound.tick();report('Now say how sure you are.')}
 function rate(v){const q=QZ[st.qi];if(!q||st.pick==null)return;const ok=st.pick===q[3];st.mine.push({c:v,ok});st.qi++;st.pick=null;ok?A.sound.pop():A.sound.miss();
  report(`${ok?'Right':'Wrong'}: ${q[1+q[3]]}. You said ${v}% sure.`+(st.qi>=QZ.length?' Look at your chart: are your dots near the line?':''))}
 function place(i){const k=CARDS[st.ci];if(!k)return;const b=BOX[i];st.drag=null;
  if(b[1]===k[2]&&b[2]===k[3]){st.boxed.push(st.ci);st.ci++;st.bad=null;A.sound.pop();return report(`${k[0]}: ${k[3]?'right':'wrong'}. ${k[4]}`)}
  st.bad=i;if(b[1]!==k[2])return nope(`Look at the words: “${k[1].replace(/[“”]/g,'')}” is ${k[2]?'sure':'unsure'}. Sure or unsure is how they felt, not whether they were right.`);
  nope(`Check it yourself: ${k[0]} is ${k[3]?'right':'wrong'}. ${k[4]}`)}
 function choose(j){const d=DO[st.di];if(!d)return;const o=d[1][j];if(o[1]){st.di++;A.sound.pop();return report('Good move. '+o[2])}nope('Not the best move. '+o[2])}
 function report(msg){const v=mode();let t='';
  if(v==='sam')t=`Sam said 90% sure on ten answers. ${st.open.length} revealed.`+(st.mark!=null?` Your mark: ${st.mark}%.`:'');
  else if(v==='fc')t='Rainy days set: '+FC.map((f,i)=>`${f}% forecast, ${st.rain[i]} of 10`).join('; ')+'.';
  else if(v==='me')t=st.qi<QZ.length?`Question ${st.qi+1} of ${QZ.length}: ${QZ[st.qi][0]}`:'Calibration chart: '+CONF.map(c=>{const a=st.mine.filter(m=>m.c===c);return a.length?`said ${c}%, right ${a.filter(m=>m.ok).length} of ${a.length}`:''}).filter(Boolean).join('; ')+'.';
  else if(v==='box')t=CARDS[st.ci]?`Card: ${CARDS[st.ci][0]}, said ${CARDS[st.ci][1]}. Which box?`:'All cards sorted.';
  else if(v==='do')t=DO[st.di]?DO[st.di][0]:'All situations done.';else t='Challenge time.';
  speak((msg?msg+' ':'')+t);buttons();st.onChange()}
 function buttons(){if(!A||!pad)return;pad.innerHTML='';const v=mode();const b=(t,f,label)=>{const e=c.el('button',{type:'button',class:'lbtn ghost sm','aria-label':label||null},pad,t);e.onclick=f};
  if(v==='sam'){if(st.open.length<10)b('Reveal next answer',()=>reveal([...Array(10).keys()].find(i=>!st.open.includes(i))));else[40,50,60,70,80,90].forEach(x=>b(x+'%',()=>setMark(x),`Sam was right ${x}% of the time`))}
  if(v==='fc')FC.forEach((f,i)=>{b(`${f}%: fewer`,()=>setRain(i,st.rain[i]-1),`${f}% forecast: one fewer rainy day`);b(`${f}%: more`,()=>setRain(i,st.rain[i]+1),`${f}% forecast: one more rainy day`)});
  if(v==='me'&&QZ[st.qi]){const q=QZ[st.qi];if(st.pick==null){c.el('span',{},pad,q[0]);[1,2].forEach(j=>b(q[j],()=>answer(j-1)))}else{c.el('span',{},pad,'How sure?');CONF.forEach(x=>b(CW[x],()=>rate(x)))}}
  if(v==='box'&&CARDS[st.ci])BOX.forEach((x,i)=>b(x[0],()=>place(i)));
  if(v==='do'&&DO[st.di])DO[st.di][1].forEach((o,j)=>b(o[0],()=>choose(j)));A.redraw()}
 // ---------- canvas input ----------
 function down(p){const v=mode();
  if(v==='sam'){const i=SAM.findIndex((x,i)=>inside(p,samR(i)));if(i>=0){reveal(i);return false}const r=barR();if(p.y>r.y-20&&p.y<r.y+r.h+30){setMark((p.x-r.x)/r.w*100);return st.open.length>=10}return false}
  if(v==='fc'){const i=FC.findIndex((f,i)=>{const r=rowR(i);return p.y>r.y-10&&p.y<r.y+r.h+20});if(i<0)return false;const r=rowR(i);setRain(i,Math.round((p.x-r.x)/r.w*10));return true}
  if(v==='box'&&CARDS[st.ci]&&p.y<A.H*.32){st.drag=p;return true}
  if(v==='box'){const i=BOX.findIndex((x,i)=>inside(p,quadR(i)));if(i>=0)place(i)}return false}
 function move(p){const v=mode();if(v==='sam'){const r=barR();st.mark=null;setMark((p.x-r.x)/r.w*100)}
  else if(v==='fc'){const i=FC.findIndex((f,i)=>{const r=rowR(i);return p.y>r.y-10&&p.y<r.y+r.h+20});if(i>=0){const r=rowR(i),n=Math.max(0,Math.min(10,Math.round((p.x-r.x)/r.w*10)));if(n!==st.rain[i])setRain(i,n)}}
  else if(v==='box'){st.drag=p;A.redraw()}}
 function up(p){if(mode()==='box'&&st.drag){const i=BOX.findIndex((x,i)=>inside(p,quadR(i)));if(i>=0)place(i);else{st.drag=null;A.redraw()}}}
 // ---------- steps ----------
 const whenDone=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const later=(fns,ms)=>{const k=st.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===st.tok)f()},A.reduced()?j*20:j*ms))};
 const fresh=()=>{st.tok++;st.onChange=()=>{};st.open=[];st.mark=null;st.rain=[5,5,5];st.qi=0;st.pick=null;st.mine=[];st.ci=0;st.boxed=[];st.di=0;st.bad=null;st.drag=null};
 const steps=[
  {h:'Sure is not right',p:'Sam marked every answer “90% sure”. Reveal the ten answers, then drag on the bar to show how often Sam was right.',
   predict:{q:'Sam was 90% sure on all ten. How many were right?',opts:['About 9','Fewer, about 6'],ans:1},task:'Reveal all ten and mark Sam’s real hit rate',
   show:()=>{steps[0].go();later([...SAM.map((x,i)=>()=>reveal(i)),()=>setMark(60)],200)},go:()=>{fresh();report();st.onChange=whenDone(0,()=>st.mark===60&&st.open.length===10,'Said 90%, right 60%: that gap is overconfidence.')}},
  {h:'What calibrated means',p:'A forecaster is calibrated if, on all the days she says 70%, it rains on about 70% of them. Drag along each row to set the rainy days.',
   predict:{q:'A calibrated forecaster says “30% rain” on 10 days. It rains on…',opts:['0 days','About 3 days'],ans:1},task:'Make all three forecasts calibrated',
   show:()=>{steps[1].go();later(FC.map((f,i)=>()=>setRain(i,f/10)),400)},go:()=>{fresh();report();st.onChange=whenDone(1,()=>FC.every((f,i)=>st.rain[i]*10===f),'Calibrated: your “70% sure” is right 70% of the time.')}},
  {h:'Rate yourself',p:'Answer six questions and say how sure you are. Each dot shows how often you were right at that level of sureness.',task:'Answer and rate all six',
   show:()=>{steps[2].go();later(QZ.flatMap((q,i)=>[()=>answer(i===1?1:q[3]),()=>rate([70,100,90,90,50,70][i])]),250)},go:()=>{fresh();report();st.onChange=whenDone(2,()=>st.qi>=QZ.length,'One dot is not a verdict. Calibration shows up over many answers.')}},
  {h:'Four boxes',p:'Check each answer yourself, then drag it to its box (or use the buttons). Sure or unsure is how they felt; right or wrong is the truth.',
   predict:{q:'Which mistakes are hardest to catch on your own?',opts:['Unsure and wrong','Sure and wrong'],ans:1},task:'Sort all eight answers',
   show:()=>{steps[3].go();later(CARDS.map(k=>()=>place(BOX.findIndex(b=>b[1]===k[2]&&b[2]===k[3]))),250)},go:()=>{fresh();report();st.onChange=whenDone(3,()=>st.ci>=CARDS.length,'You check what feels shaky; sure-and-wrong slips get past.')}},
  {h:'Use the doubt',p:'Doubt is useful when it makes you check, ask or look it up. Pick the best move for each situation.',task:'Choose well in all four situations',
   show:()=>{steps[4].go();later(DO.map(d=>()=>choose(d[1].findIndex(o=>o[1]))),400)},go:()=>{fresh();report();st.onChange=whenDone(4,()=>st.di>=DO.length,'Low confidence: check, ask or flag. High confidence: still check fast answers.')}},
  {h:'Challenge',p:'',go:()=>{fresh();pose()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>st.onChange()});
 // ---------- challenge ----------
 const QS=[['Ana said “90% sure” on 20 answers and got 12 right. She is…',[['overconfident (60% right)','ok'],['underconfident','flip'],['well calibrated','calc']]],
  ['Leo marked 10 answers “just guessing” (50%) and got 9 right. He is…',[['underconfident','ok'],['overconfident','flip'],['proof that guessing works','luck']]],
  ['A calibrated forecaster says 70% on 20 days. About how many are rainy?',[['14','ok'],['20, she said it will rain','sure'],['7','calc']]],
  ['You are certain 0.3 × 0.2 = 0.6. Best move?',[['Check another way: 3 × 2 = 6, two decimal places, 0.06','ok'],['Move on: certain means right','sure'],['Rub it out and leave it blank','blank']]],
  ['Exam, no marks lost for wrong answers, you are 40% sure. Best move?',[['Write your best answer, flag it, return if time','ok'],['Leave it blank','blank'],['Spend 15 minutes on it now','stuck']]],
  ['Which errors most need a second look?',[['Answers you felt sure of but did fast','ok'],['Only answers you felt unsure of','sure'],['None: first instincts are always best','luck']]]];
 function slip(tag){let m='Try again.';
  if(tag==='flip')m='Over means said more sure than the results; under means less. Compare the two numbers.';
  if(tag==='calc')m='Turn it into a rate: right ÷ total, then compare with how sure they said.';
  if(tag==='sure')m='Feeling sure is a claim, not proof. Sure-and-wrong slips only get caught by checking.';
  if(tag==='blank')m='A blank scores nothing. Answer, flag, and come back.';
  if(tag==='stuck')m='Doubt should trigger a quick check or a flag, not eat your time.';
  if(tag==='luck')m='One run of results is not a rule. Look at the rate over many answers.';
  return m}
 let qk=-1,stars=0;
 function pose(){qk++;const[q,ops]=QS[qk%QS.length],turn=qk%3;
  quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quiz.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(tag)});speak('Challenge: '+q);A.redraw()}
 function mark(tag){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=tag==='ok';
  if(good){stars++;A.win()}else{stars=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes.':'✗ '+slip(tag)}${good?` Streak: ${stars}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
  init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);reader=E('p',{class:'fl-read','aria-hidden':'true'});
   pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});buttons()}});
 A.start()})})();
