/* Flagship – guessing how many, then counting (ages 3–4; EYFS Development Matters 3–4 Mathematics: one number for each
   item, the cardinal principle, comparing with 'more than' and 'fewer than'; ELG Number; NCETM: estimate, then count to
   check). Touch and count, guess a jar then count and compare to the guess, pick the sensible guess, big against small
   things, spread a row out (conservation). Data and the seeded scatter layout in learn/guess_art.js. */
(()=>{const {TOUCH,JARS,SENSE,SIZE,SIZENAME,SPREAD,QS,spots}=GUESS;
VIS.reg('flagguess',c=>{let A,keys,qa,qn=-1,run=0;const G={};c.fig.classList.add('young');
const PEN='#1e293b',RIGHT='#047857',WRONG='#b91c1c',SOFT='#6b7280',PURP='#7c3aed',FT='px system-ui,sans-serif';
const scene=()=>['touch','jar','sense','size','spread','quiz'][A.step];
const em=n=>A.narrow?n:Math.round(n*1.14);
function sky(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fef9c3',A.col.dark?.07:.55);g.fillRect(0,0,A.W,A.H)}
function note(t,x,y,o){o=o||{};const g=A.ctx;let n=em(o.n||14);g.font=`800 ${n}${FT}`;let w=g.measureText(t).width+24;
 while(w>A.W-10&&n>10){n--;g.font=`800 ${n}${FT}`;w=g.measureText(t).width+24}
 const h=n+16,x0=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,h/2);g.fill();g.lineWidth=o.ok?3:1.5;g.strokeStyle=o.ok?RIGHT:SOFT;g.stroke();
 g.fillStyle=PEN;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1)}
function thing(p,e,o){o=o||{};const g=A.ctx;if(o.num!=null){g.fillStyle=A.col.dark?'#334155':'#ede9fe';g.beginPath();g.arc(p.x,p.y,p.r*1.15,0,7);g.fill()}
 g.font=`${Math.round(p.r*1.5)}${FT}`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,p.x,p.y);
 if(o.num!=null){const rr=Math.max(11,p.r*.45);g.fillStyle=PURP;g.beginPath();g.arc(p.x+p.r*.8,p.y-p.r*.8,rr,0,7);g.fill();g.fillStyle='#ffffff';g.font=`900 ${Math.round(rr*1.15)}${FT}`;g.fillText(String(o.num),p.x+p.r*.8,p.y-p.r*.8+1)}
 if(o.bad){g.lineWidth=4;g.strokeStyle=WRONG;g.beginPath();g.arc(p.x,p.y,p.r*1.2,0,7);g.stroke()}}
const near=(p,q)=>Math.hypot(p.x-q.x,p.y-q.y)<=Math.max(q.r*1.25,22);
function btn(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bad?'#fee2e2':o.ok?'#d1fae5':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=o.bad||o.ok||o.on?4:2;g.strokeStyle=o.bad?WRONG:o.ok?RIGHT:o.on?PURP:SOFT;g.stroke();
 g.fillStyle=PEN;g.textAlign='center';g.textBaseline='middle';let n=em(o.n||17);g.font=`800 ${n}${FT}`;while(g.measureText(t).width>r.w-10&&n>10){n--;g.font=`800 ${n}${FT}`}g.fillText(t,r.x+r.w/2,r.y+r.h/2+1)}
function row(n,y,h){const gap=10,w=Math.min(150,(A.W-gap*(n+1))/n),x0=(A.W-(w*n+gap*(n-1)))/2;return Array.from({length:n},(_,i)=>({i,x:x0+i*(w+gap),y,w,h}))}
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* 1. touch and count */
const plate=()=>({x:A.W*.1,y:A.H*.16,w:A.W*.8,h:A.H*.74});
function drawTouch(){const s=G.t,g=A.ctx;sky();
 if(s.k>=TOUCH.length){note('3 plates counted',A.W/2,A.H*.1,{ok:1});TOUCH.forEach(([e,nm,n],j)=>note(`${e} ${n} ${nm}`,A.W/2,A.H*(.34+j*.18),{n:16,ok:1}));return}
 const [e,nm,n]=TOUCH[s.k],P=spots(n,plate(),s.k+1),pl=plate();g.fillStyle=A.col.dark?'#1f2937':'#ffffff';g.beginPath();g.ellipse(pl.x+pl.w/2,pl.y+pl.h/2,pl.w/2,pl.h/2,0,0,7);g.fill();g.lineWidth=2;g.strokeStyle=SOFT;g.stroke();
 note(s.seq.length>=n?`The last number was ${n}: there are ${n} ${nm}`:`Plate ${s.k+1} of 3: touch each one once`,A.W/2,A.H*.07,{n:13,ok:s.seq.length>=n});
 P.forEach((p,i)=>thing(p,e,{num:s.seq.includes(i)?s.seq.indexOf(i)+1:null,bad:s.bad===i}))}
function touchOne(i){const s=G.t;if(s.k>=TOUCH.length)return;const [e,nm,n]=TOUCH[s.k];
 if(s.seq.length>=n){s.k++;s.seq=[];s.bad=-1;return tell(s.k>=TOUCH.length?'All 3 plates counted. The last number you say tells you how many.':`Next plate. Touch each one and say a number.`)}
 if(s.seq.includes(i)){s.bad=i;A.sound.miss();return tell(`You counted that one already: it is number ${s.seq.indexOf(i)+1}. Each one gets just one number, or your count gets too big.`)}
 s.seq.push(i);s.bad=-1;A.sound.pop();const k=s.seq.length;
 tell(k>=n?`${k}! That was the last one. There are ${k} ${nm}. Tap any ${nm.slice(0,-1)} for the next plate.`:`${k}.`)}
function touchNext(){const s=G.t;if(s.k>=TOUCH.length)return;const n=TOUCH[s.k][2];const i=Array.from({length:n},(_,j)=>j).find(j=>!s.seq.includes(j));touchOne(i==null?0:i)}
/* 2. guess, count, compare */
const jarBox=()=>({x:A.W*.2,y:A.H*.14,w:A.W*.6,h:A.H*.5});
const guessKeys=()=>{const n=10,gap=6,w=Math.min(52,(A.W-gap*(n+1))/n),x0=(A.W-(w*n+gap*(n-1)))/2;return Array.from({length:n},(_,i)=>({v:i+1,x:x0+i*(w+gap),y:A.H*.7,w,h:Math.max(44,A.H*.12)}))};
const cmpKeys=()=>row(3,A.H*.72,Math.max(48,A.H*.14)).map((r,i)=>Object.assign(r,{t:['More than my guess','Fewer than my guess','Same as my guess'][i]}));
function drawJar(){const s=G.j,g=A.ctx;sky();
 if(s.k>=JARS.length){note('3 jars: guess, count, compare',A.W/2,A.H*.1,{ok:1});note('A close guess is a good guess',A.W/2,A.H*.4,{n:16});note('Then count to check',A.W/2,A.H*.6,{n:16});return}
 const [e,nm,n]=JARS[s.k],J=jarBox();g.fillStyle=A.col.dark?'#0f172a':'#f0f9ff';A.paint.rrect(J.x,J.y,J.w,J.h,26);g.fill();g.lineWidth=3;g.strokeStyle=SOFT;g.stroke();
 const P=spots(n,{x:J.x+12,y:J.y+12,w:J.w-24,h:J.h-24},s.k+11);P.forEach((p,i)=>thing(p,e,{num:s.guess!=null&&s.seq.includes(i)?s.seq.indexOf(i)+1:null,bad:s.bad===i}));
 if(s.guess==null){note(`Jar ${s.k+1} of 3: guess how many ${nm}`,A.W/2,A.H*.06,{n:13});guessKeys().forEach(r=>btn(r,String(r.v),{n:16}));return}
 if(s.seq.length<n){note(`You guessed ${s.guess}. Now touch each one to count`,A.W/2,A.H*.06,{n:13});return}
 note(`You guessed ${s.guess}. You counted ${n}.`,A.W/2,A.H*.06,{n:13,ok:1});cmpKeys().forEach((r,i)=>btn(r,r.t,{n:14,bad:s.bad===100+i}))}
function setGuess(v){const s=G.j;if(s.k>=JARS.length||s.guess!=null)return;s.guess=v;A.sound.pop();tell(`Your guess: ${v}. Now count to check. Touch each ${JARS[s.k][1].replace(/s$/,'')} once.`)}
function countJar(i){const s=G.j;if(s.k>=JARS.length||s.guess==null)return;const n=JARS[s.k][2];if(s.seq.length>=n)return;
 if(s.seq.includes(i)){s.bad=i;A.sound.miss();return tell('That one has a number already. Touch each one just once.')}
 s.seq.push(i);s.bad=-1;A.sound.pop();tell(s.seq.length>=n?`${n}. There are ${n}. You guessed ${s.guess}. Is ${n} more than, fewer than, or the same as your guess?`:`${s.seq.length}.`)}
function countJarAll(){const s=G.j;if(s.k>=JARS.length)return;const n=JARS[s.k][2];for(let i=0;i<n;i++)if(!s.seq.includes(i))countJar(i)}
function compare(k){const s=G.j;if(s.k>=JARS.length||s.guess==null)return;const n=JARS[s.k][2];if(s.seq.length<n)return;const truth=n>s.guess?0:n<s.guess?1:2;
 if(k!==truth){s.bad=100+k;A.sound.miss();return tell(`Look again: you guessed ${s.guess} and counted ${n}. ${n} is ${truth===0?'more than':truth===1?'fewer than':'the same as'} ${s.guess}.`)}
 const off=Math.abs(n-s.guess);s.k++;s.guess=null;s.seq=[];s.bad=-1;A.sound.pop();
 tell((truth===2?`Spot on: ${n} is your guess.`:`Yes, ${n} is ${truth===0?'more than':'fewer than'} your guess.`)+(off===0?'':off<=2?' Only '+off+' away: a close guess, a good guess.':` ${off} away. Next time, look for small groups you know.`)+(s.k>=JARS.length?' All 3 jars done.':''))}
/* 3. sensible guess */
function drawSense(){const s=G.s,g=A.ctx;sky();
 if(s.k>=SENSE.length){note('4 sensible guesses',A.W/2,A.H*.1,{ok:1});note('Close to the real number, not a giant one',A.W/2,A.H*.45,{n:15});return}
 const [e,nm,n,ch]=SENSE[s.k];note(`Set ${s.k+1} of 4: which guess makes sense?`,A.W/2,A.H*.06,{n:13});
 spots(n,{x:A.W*.15,y:A.H*.14,w:A.W*.7,h:A.H*.46},s.k+21).forEach(p=>thing(p,e));row(3,A.H*.68,Math.max(54,A.H*.16)).forEach((r,i)=>btn(r,String(ch[i]),{n:20,bad:s.bad===i}))}
function pickSense(i){const s=G.s;if(s.k>=SENSE.length)return;const [e,nm,n,ch,ok]=SENSE[s.k],v=ch[i];
 if(i!==ok){s.bad=i;A.sound.miss();return tell(v>n*3?`${v} ${nm}? That is far too many: ${v} would fill the whole screen. Pick a guess close to what you see.`:`${v} is too few. You can see more than ${v}. Pick a guess close to what you see.`)}
 s.k++;s.bad=-1;A.sound.pop();tell(`${v} is sensible: there are ${n} ${nm}. ${v===n?'Exactly right!':'Close!'}`+(s.k>=SENSE.length?' All 4 picked.':''))}
/* 4. big things, small things */
const sideBox=k=>{const w=(A.W-36)/2;return{x:12+k*(w+12),y:A.H*.12,w,h:A.H*.5}};
const sizeKeys=()=>row(3,A.H*.72,Math.max(48,A.H*.14)).map((r,i)=>Object.assign(r,{t:['This side','That side','The same'][i]}));
function drawSize(){const s=G.z,g=A.ctx;sky();
 if(s.k>=SIZE.length){note('3 pairs compared',A.W/2,A.H*.1,{ok:1});note('Big things fill more space, not more number',A.W/2,A.H*.45,{n:14});return}
 const [le,ln,lb,re,rn,rb]=SIZE[s.k];note(`Pair ${s.k+1} of 3: which side has more?`,A.W/2,A.H*.06,{n:13});
 [[le,ln,lb],[re,rn,rb]].forEach(([e,n,big],k)=>{const B=sideBox(k);g.fillStyle=A.col.dark?'#1f2937':'#ffffff';A.paint.rrect(B.x,B.y,B.w,B.h,18);g.fill();g.lineWidth=2;g.strokeStyle=SOFT;g.stroke();
  const P=spots(n,{x:B.x+8,y:B.y+8,w:B.w-16,h:B.h-16},s.k*2+k+31).map(p=>Object.assign(p,{r:big?Math.min(B.w,B.h)*.17:Math.min(B.w,B.h)*.09}));P.forEach((p,i)=>thing(p,e,{num:s.shown?i+1:null}))});
 const L=['◀ '+SIZENAME[le],SIZENAME[re]+' ▶','Same number'];sizeKeys().forEach((r,i)=>btn(r,L[i],{n:14,bad:s.bad===i}))}
function pickSize(k){const s=G.z;if(s.k>=SIZE.length)return;const [le,ln,lb,re,rn,rb]=SIZE[s.k],truth=ln>rn?0:rn>ln?1:2;s.shown=true;
 if(k!==truth){s.bad=k;A.sound.miss();return tell(`Count to check: ${ln} ${SIZENAME[le]} and ${rn} ${SIZENAME[re]}. `+(truth===2?'The same number, even though one side looks fuller.':`The ${SIZENAME[truth?re:le]} side has more. Big things fill more space, but that is not more.`))}
 s.k++;s.shown=false;s.bad=-1;A.sound.pop();tell(`Yes: ${ln} ${SIZENAME[le]} and ${rn} ${SIZENAME[re]}.`+(truth===2?' The same number.':` ${Math.max(ln,rn)} is more than ${Math.min(ln,rn)}.`)+(s.k>=SIZE.length?' All 3 compared.':''))}
/* 5. bunched or spread: drag the slider to spread the bottom row, then judge */
const railR=()=>({x:A.W*.15,y:A.H*.62,w:A.W*.7,h:28});
const spreadKeys=()=>row(3,A.H*.78,Math.max(46,A.H*.13)).map((r,i)=>Object.assign(r,{t:['Top row','Bottom row','The same'][i]}));
function drawSpread(){const s=G.p,g=A.ctx;sky();
 if(s.k>=SPREAD.length){note('3 rows judged',A.W/2,A.H*.1,{ok:1});note('Spreading out does not change how many',A.W/2,A.H*.45,{n:15});return}
 const [a,b]=SPREAD[s.k],r=Math.min(A.W/15,26);note(`Row ${s.k+1} of 3: which row has more?`,A.W/2,A.H*.06,{n:13});
 const gapA=r*1.7,gapB=r*1.7+s.wide*(Math.min((A.W-3*r)/Math.max(1,b-1),r*5)-r*1.7);
 for(let i=0;i<a;i++)thing({x:A.W/2+(i-(a-1)/2)*gapA,y:A.H*.22,r},'🚗',{num:s.shown?i+1:null});
 for(let i=0;i<b;i++)thing({x:A.W/2+(i-(b-1)/2)*gapB,y:A.H*.44,r},'🚗',{num:s.shown?i+1:null});
 const R=railR();g.fillStyle=A.col.dark?'#475569':'#e2e8f0';A.paint.rrect(R.x,R.y+R.h/2-5,R.w,10,5);g.fill();const kx=R.x+s.wide*R.w;g.fillStyle=PURP;g.beginPath();g.arc(kx,R.y+R.h/2,14,0,7);g.fill();
 g.fillStyle=A.col.tx;g.font=`700 ${em(12)}${FT}`;g.textAlign='center';g.fillText('drag to spread the bottom row',A.W/2,R.y-4);
 spreadKeys().forEach((q,i)=>btn(q,q.t,{n:14,bad:s.bad===i}))}
function setWide(v){G.p.wide=Math.max(0,Math.min(1,v));if(G.p.wide>.5)G.p.slid=true;A.cv.setAttribute('aria-label',`Bottom row spread ${Math.round(G.p.wide*100)} percent`);A.redraw()}
function pickSpread(k){const s=G.p;if(s.k>=SPREAD.length)return;const [a,b]=SPREAD[s.k],truth=a>b?0:b>a?1:2;s.shown=true;
 if(k!==truth){s.bad=k;A.sound.miss();return tell(`Count each row: top ${a}, bottom ${b}. `+(truth===2?'The bottom row only looks longer because the cars are spread out.':'The longer row is not always the one with more.'))}
 s.k++;s.shown=false;s.bad=-1;s.wide=0;A.sound.pop();tell(`Yes: top ${a}, bottom ${b}.`+(truth===2?' Spread out or bunched up, it is still '+a+'.':' Count, do not judge by length.')+(s.k>=SPREAD.length?' All 3 rows judged.':''))}
function draw(){const k=scene();if(k==='quiz'){sky();note('Challenge',A.W/2,A.H*.16,{ok:1});note('Guess, then count to check',A.W/2,A.H*.5,{n:15});return}
 ({touch:drawTouch,jar:drawJar,sense:drawSense,size:drawSize,spread:drawSpread})[k]();A.fx.draw(A.ctx)}
function down(p){const k=scene();
 if(k==='touch'&&G.t.k<TOUCH.length){const [e,nm,n]=TOUCH[G.t.k];const P=spots(n,plate(),G.t.k+1),i=P.findIndex(q=>near(p,q));if(i>=0)touchOne(i);return false}
 if(k==='jar'&&G.j.k<JARS.length){const s=G.j;if(s.guess==null){const r=guessKeys().find(r=>hit(p,r));if(r)setGuess(r.v);return false}
  const n=JARS[s.k][2];if(s.seq.length>=n){const i=cmpKeys().findIndex(r=>hit(p,r));if(i>=0)compare(i);return false}
  const J=jarBox(),P=spots(n,{x:J.x+12,y:J.y+12,w:J.w-24,h:J.h-24},s.k+11),i=P.findIndex(q=>near(p,q));if(i>=0)countJar(i);return false}
 if(k==='sense'){const i=row(3,A.H*.68,Math.max(54,A.H*.16)).findIndex(r=>hit(p,r));if(i>=0)pickSense(i);return false}
 if(k==='size'){const i=sizeKeys().findIndex(r=>hit(p,r));if(i>=0)pickSize(i);return false}
 if(k==='spread'){const R=railR();if(p.y>=R.y-16&&p.y<=R.y+R.h+16&&p.x>=R.x-20&&p.x<=R.x+R.w+20){G.drag=1;setWide((p.x-R.x)/R.w);return true}
  const i=spreadKeys().findIndex(r=>hit(p,r));if(i>=0)pickSpread(i)}return false}
function move(p){if(G.drag&&scene()==='spread'){const R=railR();setWide((p.x-R.x)/R.w)}}
function up(){if(G.drag){G.drag=0;tell(`Bottom row spread out. It looks longer. Has the number changed?`)}}
function wipe(){run++;for(const k in G)delete G[k];Object.assign(G,{t:{k:0,seq:[],bad:-1},j:{k:0,guess:null,seq:[],bad:-1},s:{k:0,bad:-1},z:{k:0,bad:-1,shown:false},p:{k:0,bad:-1,wide:0,shown:false},drag:0,hook:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keypad();G.hook()}
const gate=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,desc,ok,msg){wipe();tell(desc);G.hook=gate(i,ok,msg)}
function auto(i,acts,ms){steps[i].go();const r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},ms*(j+1)))}
function keypad(){if(!keys)return;keys.innerHTML='';const k=scene(),K=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(k==='touch'&&G.t.k<TOUCH.length)K(G.t.seq.length>=TOUCH[G.t.k][2]?'Next plate':'Touch the next one',touchNext);
 if(k==='jar'&&G.j.k<JARS.length){const s=G.j,n=JARS[s.k][2];if(s.guess==null)for(let v=1;v<=10;v++)K(String(v),()=>setGuess(v),`Guess ${v}`);
  else if(s.seq.length<n)K('Touch the next one',()=>{const i=Array.from({length:n},(_,j)=>j).find(j=>!s.seq.includes(j));countJar(i)});
  else['More than my guess','Fewer than my guess','Same as my guess'].forEach((t,i)=>K(t,()=>compare(i)))}
 if(k==='sense'&&G.s.k<SENSE.length)SENSE[G.s.k][3].forEach((v,i)=>K(String(v),()=>pickSense(i),`Guess ${v}`));
 if(k==='size'&&G.z.k<SIZE.length){const q=SIZE[G.z.k];K(`More ${SIZENAME[q[0]]}`,()=>pickSize(0));K(`More ${SIZENAME[q[3]]}`,()=>pickSize(1));K('The same number',()=>pickSize(2))}
 if(k==='spread'&&G.p.k<SPREAD.length){K('Spread the bottom row',()=>{setWide(1);tell('Bottom row spread out. It looks longer. Has the number changed?')});K('Top row has more',()=>pickSpread(0));K('Bottom row has more',()=>pickSpread(1));K('The same',()=>pickSpread(2))}}
const steps=[
{h:'Touch and count',p:'Touch each one and say a number: 1, 2, 3. Touch each one just once. The last number tells you how many.',
 task:'Count all 3 plates',show:()=>auto(0,Array(TOUCH.reduce((a,t)=>a+t[2]+1,0)).fill(touchNext),170),
 go:()=>enter(0,'A plate with 4 strawberries. Touch each one to count.',()=>G.t.k>=TOUCH.length,'4 strawberries, 7 ladybirds, 6 buttons. One number for each one, and the last number is how many.')},
{h:'Guess, then count',p:'Look at the jar. Guess how many: tap a number. Then touch each one to count. Was it more than, fewer than, or the same as your guess?',
 predict:{q:'You guess 4. You count 5. Was your guess bad?',opts:['Yes, it was wrong','No, it was close'],ans:1},task:'Guess and check all 3 jars',
 show:()=>auto(1,JARS.flatMap(([e,nm,n,gs])=>[()=>setGuess(gs),countJarAll,()=>compare(n>gs?0:n<gs?1:2)]),550),
 go:()=>enter(1,'A jar of sweets. Tap a number to guess how many.',()=>G.j.k>=JARS.length,'You guessed, counted, and said more, fewer or the same. A guess that is close is a good guess.')},
{h:'Sensible guess',p:'A good guess is close to the real number. Look, then tap the guess that makes sense.',task:'Pick the sensible guess 4 times',
 show:()=>auto(2,SENSE.map(x=>()=>pickSense(x[4])),550),
 go:()=>enter(2,'Some grapes. Is it 1, 5 or 100?',()=>G.s.k>=SENSE.length,'5 for 6 grapes, 8 for 9 bees, 3 for 3 ducks, 6 for 7 stars. Close guesses, not giant ones.')},
{h:'Big or small?',p:'Which side has more? Big things take up more space. Does that mean more? Tap a button, then count to check.',
 predict:{q:'4 big apples look fuller than 7 blueberries. Which has more?',opts:['The apples, they look fuller','The blueberries: 7 is more'],ans:1},task:'Compare all 3 pairs',
 show:()=>auto(3,SIZE.map(q=>()=>pickSize(q[1]>q[4]?0:q[4]>q[1]?1:2)),600),
 go:()=>enter(3,'Left: 4 big apples. Right: 7 small blueberries.',()=>G.z.k>=SIZE.length,'7 blueberries beat 4 apples, 6 blueberries beat 3 balls, and 5 melons equal 5 cherries. Count, do not judge by size.')},
{h:'Spread out',p:'Drag the purple dot to spread out the bottom row. Then say which row has more.',
 predict:{q:'Spread 5 cars out in a long row. Are there more now?',opts:['Yes, the row is longer','No, still 5'],ans:1},task:'Judge all 3 rows',
 show:()=>auto(4,SPREAD.flatMap(([a,b])=>[()=>setWide(1),()=>pickSpread(a>b?0:b>a?1:2)]),450),
 go:()=>enter(4,'Two rows of cars. Top row bunched, bottom row ready to spread.',()=>G.p.k>=SPREAD.length,'Spreading cars out made the row longer, but the number stayed the same.')},
{h:'Challenge',p:'',go:()=>{wipe();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.hook()});
function help(t){let m='Guess first, then count each one to check.';
 if(t==='exact')m='A guess does not have to be exact. Close is good. Then you count to find the real number.';
 if(t==='size')m='Big things fill more space, but that does not make more. Count them to check.';
 if(t==='big')m='A giant number is not a good guess. A good guess is close to what you can see.';
 if(t==='last')m='The last number you say tells you how many. 1, 2, 3, 4, 5 means 5.';
 if(t==='spread')m='Spreading things out makes the row longer, not the number bigger. Count again: it is the same.';
 if(t==='twice')m='Touch each one just once. Counting one twice makes your number too big.';
 return m}
function next(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 qa.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=qa.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function score(t,a){qa.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+help(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':help(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{qa.hidden=B.step!==5;keys.hidden=B.step===5;keypad()},
 init:B=>{A=B;const holder=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Counting buttons'},holder);qa=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});keypad()}}).start()})})();
