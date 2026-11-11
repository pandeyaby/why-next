/* Flagship: Simple tests and experiments (ages 5–7; NC KS1 working scientifically: perform simple tests, observe closely,
   use observations and ideas to suggest answers to questions, gather and record data). Guess first, then dip three
   paper strips in water and watch it climb; fix the three things that make the test unfair but keep the paper as the
   one thing that changes; count the wet squares and record them; answer the question from the results, not the guess;
   then set up a sun-or-shade ice test with same-size cubes and read what happened.
   Not flagsciq (kinds of questions), flaghlens (hand lens), flagobsvs (observation vs idea) or flagramp (slopes). */
(()=>{
VIS.reg('flagsimtest',c=>{let A,pad,quizBox,item=-1,run=0;const S={};c.fig.classList.add('young');
const PAPER=[{n:'Kitchen towel',k:'towel',h:9,col:'#fde68a'},{n:'Tissue',k:'tissue',h:6,col:'#bfdbfe'},{n:'Shiny paper',k:'shiny',h:1,col:'#e9d5ff'}];
const now=()=>['dip','fair','count','answer','plan','melt','chal'][A.step];
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function word(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.b||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.ink||A.col.tx;g.fillText(String(s),x,y,o.max||A.W-12)}
function tile(r,fill,lw){const g=A.ctx;g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=A.col.tx;g.lineWidth=lw||1.5;g.stroke()}
/* wrap a sentence onto as many lines as it needs, centred on y, so phone text never gets squashed */
function para(s,x,y,px,o){o=o||{};const g=A.ctx,mw=o.max||A.W*.92;g.font=`${o.b||700} ${px}px system-ui,sans-serif`;const out=[];let line='';
 for(const w of String(s).split(' ')){const t=line?line+' '+w:w;if(g.measureText(t).width>mw&&line){out.push(line);line=w}else line=t}out.push(line);
 const lh=px*1.25,y0=y-(out.length-1)*lh/2;out.forEach((l,i)=>word(l,x,y0+i*lh,px,{...o,max:mw}))}
const over=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const fs=()=>A.narrow?15:17,big=()=>A.narrow?20:24;
/* a paper strip of ten squares hanging into a tray; squares at or below the water level are drawn wet */
const stripBox=i=>{const w=(S.wide===i?A.W*.13:A.W*.085),top=A.H*(S.short===i?.3:.14);return{x:A.W*(.2+i*.3)-w/2,y:top,w,h:A.H*.62-top}};
const sqH=i=>stripBox(i).h/10;
function drawStrip(i,wet){const g=A.ctx,C=A.col,r=stripBox(i),p=PAPER[i],h=sqH(i);
 for(let k=0;k<10;k++){const y=r.y+r.h-(k+1)*h,isWet=k<wet;g.fillStyle=isWet?A.mix(p.col,'#1d4ed8',.55):p.col;g.fillRect(r.x,y,r.w,h);g.strokeStyle='#334155';g.lineWidth=1;g.strokeRect(r.x,y,r.w,h)}
 if(S.pickStrip===i&&S.tap!=null){g.strokeStyle=S.tapOk?C.gr:C.rd;g.lineWidth=4;g.strokeRect(r.x-3,r.y+r.h-(S.tap+1)*h-1,r.w+6,h+2)}
 word(p.n,r.x+r.w/2,A.H*.08,A.narrow?12:15,{b:800,max:A.W*.3})}
function tray(level){const g=A.ctx;g.fillStyle=A.alpha('#3b82f6',.55);g.fillRect(A.W*.05,A.H*(level||.6),A.W*.9,A.H*.68-A.H*(level||.6));g.strokeStyle=A.col.tx;g.lineWidth=2;g.strokeRect(A.W*.05,A.H*.56,A.W*.9,A.H*.12)}
function drawDip(){tray();PAPER.forEach((p,i)=>drawStrip(i,S.lv[i]));para(S.msg||'Tap a strip to dip it in the water',A.W/2,A.H*.78,fs(),{ink:A.col.mu,max:A.W*.94})}
/* the fair-test kit: three cups, three strips, three timers; each unfair thing can be tapped to fix it */
const cupBox=i=>({x:A.W*(.06+i*.32),y:A.H*.18,w:A.W*.24,h:A.H*.3});
const FIX=[{k:'water',i:2,say:'Same water in every cup'},{k:'size',i:1,say:'Same size strip'},{k:'time',i:0,say:'Same time: 1 minute each'}];
function drawFair(){const g=A.ctx,C=A.col;PAPER.forEach((p,i)=>{const r=cupBox(i),low=!S.fixed.water&&i===2,wide=!S.fixed.size&&i===1,long=!S.fixed.time&&i===0;
  tile(r,A.alpha(C.tx,.04),1.5);g.fillStyle=A.alpha('#3b82f6',.6);const wl=low?.75:.45;g.fillRect(r.x+r.w*.15,r.y+r.h*wl,r.w*.7,r.h*(.92-wl));g.strokeStyle=C.tx;g.strokeRect(r.x+r.w*.15,r.y+r.h*.2,r.w*.7,r.h*.72);
  const sw=r.w*(wide?.42:.18);g.fillStyle=p.col;g.fillRect(r.x+r.w/2-sw/2,r.y-A.H*.04,sw,r.h*.8);g.strokeStyle='#334155';g.strokeRect(r.x+r.w/2-sw/2,r.y-A.H*.04,sw,r.h*.8);
  word(p.n,r.x+r.w/2,r.y+r.h+A.H*.05,A.narrow?12:14,{b:800});word('⏱ '+(long?'5 min':'1 min'),r.x+r.w/2,r.y+r.h+A.H*.12,A.narrow?13:15,{ink:long?C.rd:C.tx});
  if(low||wide||long)word('!',r.x+r.w-12,r.y+14,big(),{ink:C.rd,b:900})});
 para(S.msg||'Find 3 things that are not the same',A.W/2,A.H*.86,fs(),{ink:C.mu,max:A.W*.94})}
/* results table: one bar of squares per paper */
function table(y){const g=A.ctx,C=A.col;PAPER.forEach((p,i)=>{const yy=A.H*y+i*A.H*.07,v=S.rec[i];word(p.n,A.W*.3,yy,A.narrow?12:14,{al:'right',b:700});
  for(let k=0;k<10;k++){g.fillStyle=k<(v||0)?A.alpha(C.ac,.55):A.alpha(C.tx,.05);g.fillRect(A.W*.33+k*A.W*.05,yy-A.H*.025,A.W*.045,A.H*.05)}word(v==null?'?':v,A.W*.88,yy,A.narrow?14:16,{b:900})})}
function drawCount(){PAPER.forEach((p,i)=>drawStrip(i,p.h));table(.69);
 const i=S.pickStrip;para(S.msg||(i<3?`How many squares are wet on the ${PAPER[i].n.toLowerCase()}?`:'All three counted'),A.W/2,A.H*.92,A.narrow?13:15,{ink:A.col.mu,max:A.W*.94})}
function drawAnswer(){table(.18);para('Which paper soaks up the most water?',A.W/2,A.H*.07,fs(),{b:800});para(S.msg||'Use the table, not the guess',A.W/2,A.H*.5,fs(),{ink:A.col.mu,max:A.W*.94});
 if(S.chose!=null){const p=PAPER[S.chose];word((S.chose===0?'✓ ':'✗ ')+p.n,A.W/2,A.H*.64,big(),{ink:S.chose===0?A.col.gr:A.col.rd,b:900})}}
/* ice test: a plate in the sun and a plate in the shade */
const plate=i=>({x:A.W*(.08+i*.5),y:A.H*.42,w:A.W*.34,h:A.H*.2});
function ice(r,size,melt){const g=A.ctx,s=r.w*(size==='big'?.42:.26)*(1-melt*.85),cx=r.x+r.w/2,cy=r.y+r.h*.42;
 if(melt>0){g.fillStyle=A.alpha('#60a5fa',.45);g.beginPath();g.ellipse(cx,cy+s*.4,r.w*.18+melt*r.w*.22,r.h*.12+melt*r.h*.1,0,0,7);g.fill()}
 if(s>2){g.fillStyle='#e0f2fe';A.paint.rrect(cx-s/2,cy-s/2,s,s,4);g.fill();g.strokeStyle='#0369a1';g.lineWidth=1.5;g.stroke()}}
function drawIce(){const g=A.ctx,C=A.col;g.fillStyle='#facc15';g.beginPath();g.arc(A.W*.12,A.H*.13,A.H*.07,0,7);g.fill();word('☀️ sun',A.W*.25,A.H*.3,fs(),{b:800});
 g.fillStyle=A.alpha('#166534',.35);g.fillRect(A.W*.52,A.H*.08,A.W*.44,A.H*.6);word('🌳 shade',A.W*.75,A.H*.3,fs(),{b:800});
 [0,1].forEach(i=>{const r=plate(i);g.fillStyle='#f8fafc';g.beginPath();g.ellipse(r.x+r.w/2,r.y+r.h*.55,r.w/2,r.h*.4,0,0,7);g.fill();g.strokeStyle='#475569';g.lineWidth=2;g.stroke();ice(r,S.size[i],S.melt[i])});
 if(now()==='melt'&&S.mins>0)word(`⏱ ${S.mins} minutes`,A.W/2,A.H*.72,big(),{b:900});
 para(S.msg||(now()==='plan'?'Make the test fair, then start it':'Watch both plates'),A.W/2,A.H*.86,fs(),{ink:C.mu,max:A.W*.94})}
function draw(Q){const C=Q.col,k=now();Q.ctx.fillStyle=Q.mix(C.pn,'#e0f2fe',C.dark?.06:.5);Q.ctx.fillRect(0,0,Q.W,Q.H);
 ({dip:drawDip,fair:drawFair,count:drawCount,answer:drawAnswer,plan:drawIce,melt:drawIce}[k]||(()=>{para(S.q||'Guess, test, look, answer',Q.W/2,Q.H*.42,Q.narrow?19:24,{max:Q.W*.92,b:800})}))()}
function fresh(o){run++;for(const k in S)delete S[k];Object.assign(S,{lv:[0,0,0],dipped:[],fixed:{},rec:[null,null,null],pickStrip:0,tap:null,tapOk:false,chose:null,size:['big','small'],melt:[0,0],mins:0,started:false,msg:'',q:'',ok:()=>{}},o||{})}
const finishIf=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function auto(i,acts){steps[i].go();const t=run;acts.forEach((f,j)=>setTimeout(()=>{if(t===run)f()},A.reduced()?25*(j+1):420*(j+1)))}
function dip(i){if(S.dipped.includes(i))return;S.dipped.push(i);const p=PAPER[i];A.sound.pop();A.tween(S.lv,{[i]:p.h},A.reduced()?1:900,'out',()=>{S.msg=`${p.n}: water climbed ${p.h} square${p.h>1?'s':''}.`;tell(S.msg);A.redraw();keys();S.ok()});tell(p.n+' goes in the water.');keys()}
function fix(k){if(S.fixed[k])return;S.fixed[k]=true;A.sound.pop();S.msg=FIX.find(f=>f.k===k).say+'. Fixed.';tell(S.msg);A.redraw();keys();S.ok()}
function samePaper(){A.sound.miss();S.msg='Keep the papers different! The paper is the one thing we change.';tell(S.msg);A.redraw()}
function count(v){const i=S.pickStrip;if(i>2)return;S.tap=v-1;S.tapOk=v===PAPER[i].h;
 if(S.tapOk){S.rec[i]=v;A.sound.pop();S.msg=`${v}. Put it in the table.`;S.pickStrip++;S.tap=null}
 else{A.sound.miss();S.msg=v>PAPER[i].h?`Square ${v} is still dry. Look where the dark colour stops.`:`Square ${v} is wet, but more are wet above it. Count to the top of the dark part.`}tell(S.msg);A.redraw();keys();S.ok()}
function choose(i){S.chose=i;i===0?A.sound.pop():A.sound.miss();S.msg=i===0?'Kitchen towel: 9 squares, the most. The results answer the question.':i===1?'Tissue got 6 squares. Kitchen towel got 9, more than that.':'Shiny paper got only 1 square, the least of all.';tell(S.msg);A.redraw();keys();S.ok()}
function evenIce(){if(S.size[1]==='big')return;S.size[1]='big';A.sound.pop();S.msg='Both ice cubes are the same size now.';tell(S.msg);A.redraw();keys();S.ok()}
function start(){if(S.size[1]!=='big'){A.sound.miss();S.msg='Not fair yet: one ice cube is smaller, so it would melt first anyway.';tell(S.msg);A.redraw();return}S.started=true;A.sound.pop();S.msg='The test is fair. Only the place is different.';tell(S.msg);A.redraw();keys();S.ok()}
function wait(){if(S.mins>=20)return;S.mins+=10;A.sound.tick();A.tween(S.melt,S.mins>=20?{0:1,1:.45}:{0:.55,1:.2},A.reduced()?1:700,'out',()=>{A.redraw()});
 S.msg=S.mins>=20?'20 minutes: the sun cube is a puddle. The shade cube is still there.':'10 minutes: the cube in the sun is smaller.';tell(S.msg);A.redraw();keys();S.ok()}
function keys(){if(!pad)return;pad.innerHTML='';const k=now(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='dip')PAPER.forEach((p,i)=>{if(!S.dipped.includes(i))b('Dip '+p.n.toLowerCase(),()=>dip(i))});
 if(k==='fair'){if(!S.fixed.water)b('Fix the water',()=>fix('water'),'Fill cup 3 to the same level');if(!S.fixed.size)b('Fix the strip size',()=>fix('size'),'Cut the tissue strip to the same size');if(!S.fixed.time)b('Fix the time',()=>fix('time'),'Give the towel 1 minute like the others');b('Make the papers the same',samePaper)}
 if(k==='count'&&S.pickStrip<3){const h=PAPER[S.pickStrip].h,o=[[h+1,h,h-1],[h-1,h+1,h],[h,h+1,h+2]][S.pickStrip];o.filter(v=>v>0).forEach(v=>b(String(v),()=>count(v),`${v} wet squares`))}
 if(k==='answer'&&S.chose!==0)PAPER.forEach((p,i)=>b(p.n,()=>choose(i)));
 if(k==='plan'&&!S.started){if(S.size[1]!=='big')b('Make the ice the same size',evenIce);b('Start the test',start)}
 if(k==='melt'&&S.mins<20)b('Wait 10 minutes',wait)}
function down(p){const k=now();
 if(k==='dip'){const i=[0,1,2].find(j=>over(p,stripBox(j)));if(i!=null){dip(i);return true}return false}
 if(k==='fair'){const i=[0,1,2].find(j=>over(p,cupBox(j))||over(p,{x:cupBox(j).x,y:cupBox(j).y+cupBox(j).h,w:cupBox(j).w,h:A.H*.16}));if(i==null)return false;const f=FIX.find(x=>x.i===i&&!S.fixed[x.k]);f?fix(f.k):samePaper();return true}
 if(k==='count'){const i=S.pickStrip;if(i>2)return false;const r=stripBox(i),y=p.y;if(p.x<r.x||p.x>r.x+r.w||y<r.y||y>r.y+r.h)return false;count(10-Math.floor((y-r.y)/sqH(i)));return true}
 if(k==='plan'){if(over(p,plate(1))){evenIce();return true}return false}
 if(k==='melt'){if(over(p,plate(0))||over(p,plate(1))){wait();return true}}return false}
const steps=[
{h:'Guess, then test',p:'Which paper soaks up the most water? Make a guess. Then dip each strip in the water and watch.',
 predict:{q:'Which paper will soak up the most water?',opts:['Shiny paper, it looks strong','Kitchen towel','They will all be the same'],ans:1},
 task:'Dip all three strips',show:()=>auto(0,[()=>dip(0),()=>dip(1),()=>dip(2)]),
 go:()=>{fresh();tell('Three paper strips over a tray of water.');keys();S.ok=finishIf(0,()=>S.dipped.length===3&&S.lv[2]>=1,'The water climbed the kitchen towel most. The test told us, not the guess.')}},
{h:'Make it fair',p:'Only one thing should change: the paper. The water, the strip size and the time must be the same for all three.',
 predict:{q:'Tom gives the towel 5 minutes and the tissue 1 minute. Is that a fair test?',opts:['Yes, it is still a test','No, the time must be the same','Yes, if he is quick'],ans:1},
 task:'Fix the 3 things that are not the same',show:()=>auto(1,[()=>fix('water'),()=>fix('size'),()=>fix('time')]),
 go:()=>{fresh();tell('Three cups. Some things are not the same.');keys();S.ok=finishIf(1,()=>FIX.every(f=>S.fixed[f.k]),'Now only the paper is different, so the test is fair.')}},
{h:'Look and count',p:'Scientists look closely and write down what they see. Count the wet, dark squares on each strip.',
 task:'Count the wet squares on all 3 strips',show:()=>auto(2,[()=>count(9),()=>count(6),()=>count(1)]),
 go:()=>{fresh({lv:[9,6,1]});tell('Count the wet squares on the kitchen towel.');keys();S.ok=finishIf(2,()=>S.pickStrip===3,'9, 6 and 1. The table shows what happened.')}},
{h:'Answer the question',p:'Look at the table to answer the question. If your guess was different, that is fine. Change your idea.',
 predict:{q:'Mia guessed shiny paper. The test shows kitchen towel. What should Mia do?',opts:['Keep her guess','Change her idea to fit the test','Stop testing things'],ans:1},
 task:'Pick the paper to mop up a spill',show:()=>auto(3,[()=>choose(0)]),
 go:()=>{fresh({rec:[9,6,1]});tell('The table: towel 9, tissue 6, shiny paper 1.');keys();S.ok=finishIf(3,()=>S.chose===0,'Kitchen towel is best for a spill. We know because we tested it.')}},
{h:'Plan a new test',p:'Does ice melt faster in the sun or in the shade? Change only the place. Keep the ice the same.',
 predict:{q:'One plate is in the sun and one is in the shade. What else must be the same?',opts:['The size of the ice cubes','Nothing else','The place'],ans:0},
 task:'Make the ice the same size, then start',show:()=>auto(4,[evenIce,start]),
 go:()=>{fresh();tell('A plate in the sun with a big ice cube. A plate in the shade with a small one.');keys();S.ok=finishIf(4,()=>S.started,'Same ice, same plates. Only the place is different.')}},
{h:'What happened?',p:'Wait and look at both plates. Then say what you saw.',
 predict:{q:'Which ice cube will melt first?',opts:['The one in the sun','The one in the shade','Both at the same time'],ans:0},
 task:'Wait 20 minutes and watch',show:()=>auto(5,[wait,wait]),
 go:()=>{fresh({size:['big','big'],started:true});tell('Two same ice cubes. Tap Wait to let time pass.');keys();S.ok=finishIf(5,()=>S.mins>=20,'Ice melts faster in the sun. That is the answer to our question.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
const QS=[['Two plants. One gets water, one does not. What do we change?','Only the water',[['The water and the pot size','two'],['Nothing at all','none']]],
 ['Kim guessed tissue would win. The towel soaked up most. What is the answer?','The towel soaks up most',[['The tissue, because Kim guessed it','guess'],['We cannot tell','cannot']]],
 ['Paper A: water went up 4 squares. Paper B: 7 squares. Which soaked up more?','Paper B',[['Paper A','look'],['Both the same','look']]],
 ['Cars roll onto carpet and onto wood. What must stay the same?','The car and the slope',[['The floor','none'],['Nothing needs to','two']]],
 ['Ben sprays one coat a lot and one coat a little. Is it fair?','No, spray both the same',[['Yes, it is a test','two'],['Yes, if teddy is big','two']]],
 ['The ice in the sun melted first. What does the test show?','Ice melts faster in the sun',[['Ice melts faster in the shade','look'],['Ice never melts','cannot']]]];
function why(tag){let m='Look again at what changed and what you saw.';
 if(tag==='two')m='Two things are changing. Change only one thing, or you cannot tell which one made the difference.';
 if(tag==='none')m='That is the one thing we are testing, so it must change. Everything else stays the same.';
 if(tag==='guess')m='A guess is not the answer. The result of the test is the answer.';
 if(tag==='cannot')m='The test did give an answer. Use what you saw.';
 if(tag==='look')m='Look closely at the results. The bigger number means more.';
 return m}
function ask(){item++;const[q,ans,bad]=QS[item%QS.length],opts=[[ans,'ok'],...bad],r=item%3,order=opts.slice(r).concat(opts.slice(0,r));S.q=q;
 quizBox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');order.forEach(([v,tag])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(tag,ans)});tell('Challenge: '+q);A.redraw()}
function mark(tag,ans){quizBox.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=tag==='ok';ok?A.win():A.sound.miss();tell(ok?'Yes. '+ans+'.':why(tag));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(tag))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.1,draw,onStep:Q=>{quizBox.hidden=Q.step!==6;pad.hidden=Q.step===6;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Test controls'},w);quizBox=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down});keys()}});
A.start()})})();
