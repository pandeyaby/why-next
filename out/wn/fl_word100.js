/* Flagship – number words to 100 (ages 6–7; NC 2013 Year 2 "read and write numbers to at least 100 in numerals and in
   words"). Scenes: pick the tens word for rods of ten (forty, not fourteen or fourty); join a tens word and a ones word
   with a hyphen; read a word and build it from rods and cubes; put words in order of size; check a robot's spellings.
   Data in learn/word100_art.js. Distinct from flagnumword (words to 20, teen numbers): this lab is about tens words,
   the hyphen and how a two-part word maps onto the tens and ones digits. */
(()=>{const D=W100;
VIS.reg('flagword100',c=>{let A,btnRow,quizBox,qn=-1,epoch=0;const G={};c.fig.classList.add('young');
const P={ink:'#1c1917',ok:'#166534',no:'#b91c1c',edge:'#78716c',paper:'#fef9ee',mat:'#f5f5f4',rod:'#1d4ed8',rodLt:'#bfdbfe',cube:'#c2410c',cubeLt:'#fed7aa',pick:'#6d28d9'};
const PX='px system-ui,sans-serif';
const sceneOf=()=>['tens','join','build','order','robot','quiz'][A.step];
const fs=n=>A.narrow?n:Math.round(n*1.18);
const onBox=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function paper(){const g=A.ctx;g.fillStyle=P.paper;g.fillRect(0,0,A.W,A.H)}
/* a white label with dark text; the font shrinks until the label fits the canvas width */
function tag(t,x,y,o){o=o||{};const g=A.ctx;let n=fs(o.n||14);g.font=`800 ${n}${PX}`;while(g.measureText(t).width+24>A.W-8&&n>10){n--;g.font=`800 ${n}${PX}`}
 const w=g.measureText(t).width+24,h=n+16,x0=Math.max(4,Math.min(A.W-w-4,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,10);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?P.ok:o.no?P.no:P.edge;g.stroke();g.fillStyle=P.ink;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1)}
/* a word card: a big tap target with the word centred; rim shows wrong, right or picked */
function card(b,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.on?'#ede9fe':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();
 g.lineWidth=o.no||o.ok||o.on?3.5:1.5;g.strokeStyle=o.no?P.no:o.ok?P.ok:o.on?P.pick:P.edge;g.stroke();if(t==null)return;
 let n=fs(o.n||18);g.font=`900 ${n}${PX}`;while(g.measureText(t).width>b.w-12&&n>10){n--;g.font=`900 ${n}${PX}`}
 g.fillStyle=P.ink;g.textAlign='center';g.textBaseline='middle';g.fillText(t,b.x+b.w/2,b.y+b.h/2+1)}
/* n boxes side by side starting at y, or two per row when there are 4 on a phone */
function row(n,y,h){const per=A.narrow&&n>3?2:n,gap=10,w=(A.W-16-gap*(per-1))/per;return[...Array(n)].map((_,i)=>({i,x:8+(i%per)*(w+gap),y:y+Math.floor(i/per)*(h+gap),w,h}))}
/* base-ten pieces: a rod is a column of 10 unit squares, a cube is one square */
function rod(x,y,u){const g=A.ctx;for(let k=0;k<10;k++){g.fillStyle=P.rodLt;g.fillRect(x,y+k*u,u,u);g.strokeStyle=P.rod;g.lineWidth=1.4;g.strokeRect(x+.5,y+k*u+.5,u-1,u-1)}}
function cube(x,y,u){const g=A.ctx;g.fillStyle=P.cubeLt;g.fillRect(x,y,u,u);g.strokeStyle=P.cube;g.lineWidth=1.6;g.strokeRect(x+.5,y+.5,u-1,u-1)}
/* draw t rods and o cubes centred in box b; returns the unit size used */
function pieces(t,o,b){const u=Math.max(5,Math.min(b.h/10.5,(b.w-12)/((t*1.5)+(o?2.6:0)+.2))),wide=t*u*1.5+(o?u*2.6:0),x0=b.x+(b.w-wide)/2,y0=b.y+(b.h-u*10)/2;
 for(let k=0;k<t;k++)rod(x0+k*u*1.5,y0,u);for(let k=0;k<o;k++)cube(x0+t*u*1.5+u*.6+(k%2)*u*1.1,y0+u*10-(Math.floor(k/2)+1)*u*1.1,u);return u}
/* ---- 1. tens words ---- */
const tensCards=()=>row(3,A.H*.66,A.H*.2);
function drawTens(){const s=G.tens;paper();if(s.i>=D.TENW.length){tag('All 5 tens words found',A.W/2,A.H*.16,{ok:1});tag('twenty, forty, fifty, sixty, ninety',A.W/2,A.H*.36,{n:13});return}
 const R=D.TENW[s.i];tag(`Word ${s.i+1} of ${D.TENW.length}: which word is ${R.n}?`,A.W/2,A.H*.07,{n:14});
 pieces(R.n/10,0,{x:10,y:A.H*.15,w:A.W-20,h:A.H*.38});tag(`${R.n/10} tens = ${R.n}`,A.W/2,A.H*.58,{n:13});
 tensCards().forEach(b=>card(b,R.o[b.i],{no:s.miss===b.i}))}
function tensTap(k){const s=G.tens;if(s.i>=D.TENW.length)return;const R=D.TENW[s.i],w=R.o[k];
 if(w!==D.say(R.n)){s.miss=k;A.sound.miss();return tell(D.FIX[w])}
 s.miss=-1;s.i++;A.sound.pop();tell(`Yes: ${R.n} is ${w}.`+(s.i<D.TENW.length?' Next one.':''))}
/* ---- 2. join with a hyphen ---- */
const joinTop=()=>row(3,A.H*.5,A.H*.14),joinLow=()=>row(3,A.H*.74,A.H*.14);
function drawJoin(){const s=G.join,g=A.ctx;paper();if(s.i>=D.JOIN.length){tag('All 4 numbers joined',A.W/2,A.H*.16,{ok:1});tag('fifty-seven, eighty-three, twenty-four, sixty-one',A.W/2,A.H*.36,{n:12});return}
 const R=D.JOIN[s.i],t=Math.floor(R.n/10),o=R.n%10;tag(`Number ${s.i+1} of ${D.JOIN.length}: write ${R.n} in words`,A.W/2,A.H*.06,{n:14});
 pieces(t,o,{x:10,y:A.H*.12,w:A.W*.62,h:A.H*.24});g.fillStyle=P.ink;g.font=`900 ${fs(34)}${PX}`;g.textAlign='center';g.textBaseline='middle';g.fillText(String(R.n),A.W*.82,A.H*.24);
 tag(`${s.tw||'____'}-${s.ow||'____'}`,A.W/2,A.H*.42,{n:17,ok:s.tw&&s.ow});
 g.fillStyle=P.ink;g.font=`800 ${fs(12)}${PX}`;g.textAlign='left';g.fillText('Tens word',10,A.H*.48);g.fillText('Ones word',10,A.H*.72);
 joinTop().forEach(b=>card(b,R.t[b.i],{no:s.missT===b.i,on:s.tw===R.t[b.i]}));joinLow().forEach(b=>card(b,R.o[b.i],{no:s.missO===b.i,on:s.ow===R.o[b.i]}))}
function joinTap(top,k){const s=G.join;if(s.i>=D.JOIN.length)return;const R=D.JOIN[s.i],t=Math.floor(R.n/10),o=R.n%10;
 if(top){const w=R.t[k];if(w!==D.say(t*10)){s.missT=k;A.sound.miss();return tell(/teen$/.test(w)?`${w} is a teen word, between 13 and 19. Count the rods: ${t} tens.`:w==='ten'?`Ten is one rod. There are ${t} rods here.`:`${w} is the wrong tens word. Count the rods: there are ${t}.`)}
  s.missT=-1;s.tw=w;A.sound.tick()}
 else{const w=R.o[k];if(w!==D.say(o)){s.missO=k;A.sound.miss();return tell(`${w} is not right for the ones. Count the single cubes: there are ${o}.`)}s.missO=-1;s.ow=w;A.sound.tick()}
 if(!(s.tw&&s.ow))return tell(s.tw?`${s.tw}: good. Now pick the ones word.`:`${s.ow}: good. Now pick the tens word.`);
 const made=`${s.tw}-${s.ow}`;s.i++;s.tw=s.ow='';A.sound.pop();tell(`${R.n} is ${made}: tens word, hyphen, ones word.`+(s.i<D.JOIN.length?' Next number.':''))}
/* ---- 3. read a word, build it ---- */
const tenPile=()=>({x:8,y:A.H*.76,w:A.W/2-14,h:A.H*.18}),onePile=()=>({x:A.W/2+6,y:A.H*.76,w:A.W/2-14,h:A.H*.18}),mat=()=>({x:8,y:A.H*.15,w:A.W-16,h:A.H*.46});
function drawBuild(){const s=G.build,g=A.ctx;paper();if(s.i>=D.BUILD.length){tag('All 5 words built',A.W/2,A.H*.16,{ok:1});tag('sixty-two = 6 tens and 2 ones = 62',A.W/2,A.H*.36,{n:13});return}
 const n=D.BUILD[s.i],v=s.t*10+s.o;tag(`Word ${s.i+1} of ${D.BUILD.length}: build ${D.say(n)}`,A.W/2,A.H*.07,{n:15});
 const M=mat();card(M,null,{no:v>n});g.fillStyle=P.mat;pieces(s.t,s.o,{x:M.x+6,y:M.y+6,w:M.w-12,h:M.h-12});
 tag(`${s.t} tens and ${s.o} ones = ${v}`,A.W/2,A.H*.68,{n:15,no:v>n});
 [[tenPile(),'Tap: add a ten'],[onePile(),'Tap: add a one']].forEach(([b,t],k)=>{card(b,null);const u=Math.min(b.h/12,9);if(k)cube(b.x+14,b.y+b.h/2-u/2,u*1.6);else rod(b.x+14,b.y+(b.h-u*10)/2,u);
  g.fillStyle=P.ink;g.font=`800 ${fs(13)}${PX}`;g.textAlign='left';g.textBaseline='middle';g.fillText(t,b.x+(k?u*1.6+24:u+24),b.y+b.h/2)})}
function buildAdd(ten){const s=G.build;if(s.i>=D.BUILD.length)return;const n=D.BUILD[s.i];
 if(ten){if(s.t>=10)return tell('Ten tens make one hundred. That is as many as fit.');s.t++}else{if(s.o>=9)return tell('Nine ones is the most. Ten ones would make another ten: tap the tens pile instead.');s.o++}
 A.sound.tick();buildCheck(n)}
function buildTake(ten){const s=G.build;if(s.i>=D.BUILD.length)return;if(ten?!s.t:!s.o)return tell(ten?'There are no tens to take away.':'There are no ones to take away.');if(ten)s.t--;else s.o--;A.sound.tick();buildCheck(D.BUILD[s.i])}
function buildCheck(n){const s=G.build,v=s.t*10+s.o,T=Math.floor(n/10),O=n%10;
 if(v===n){s.i++;s.t=s.o=0;A.sound.pop();return tell(`Yes: ${D.say(n)} is ${n}.`+(n===100?' Ten tens make one hundred.':O?` The tens word gives ${T} tens and the ones word gives ${O} ones.`:` ${D.say(n)} has no ones word, so there are 0 ones.`)+(s.i<D.BUILD.length?' Next word.':''))}
 if(s.t>T){A.sound.miss();return tell(`Too many tens: ${s.t} tens is more than ${D.say(n)}. Tap the mat on the left to take a ten away.`)}
 if(s.t===T&&s.o>O){A.sound.miss();return tell(`Too many ones: ${D.say(n)} has ${O} ones. Tap the mat on the right to take a one away.`)}
 tell(`${s.t} tens and ${s.o} ones make ${v}. Keep building ${D.say(n)}.`)}
/* ---- 4. smallest to biggest ---- */
const orderCards=()=>row(4,A.H*.15,A.narrow?A.H*.16:A.H*.24),orderSlots=()=>{const gap=6,w=(A.W-16-gap*3)/4;return[0,1,2,3].map(i=>({i,x:8+i*(w+gap),y:A.H*.72,w,h:A.H*.16}))};
function drawOrder(){const s=G.order,g=A.ctx;paper();if(s.r>=D.ORDER.length){tag('Both rows in order',A.W/2,A.H*.16,{ok:1});tag('nineteen, sixty-nine, ninety, ninety-six',A.W/2,A.H*.36,{n:13});return}
 const W=D.ORDER[s.r];tag(`Row ${s.r+1} of ${D.ORDER.length}: tap from smallest to biggest`,A.W/2,A.H*.07,{n:13});
 orderCards().forEach(b=>{if(!s.put.includes(W[b.i]))card(b,W[b.i],{no:s.miss===b.i})});
 orderSlots().forEach((b,j)=>{card(b,j<s.put.length?String(D.VAL[s.put[j]]):null,{ok:j<s.put.length,n:20});if(j>=s.put.length){g.fillStyle='#57534e';g.font=`700 ${fs(11)}${PX}`;g.textAlign='center';g.textBaseline='middle';g.fillText(j?j===3?'biggest':'':'smallest',b.x+b.w/2,b.y+b.h/2)}})}
function orderTap(k){const s=G.order;if(s.r>=D.ORDER.length)return;const W=D.ORDER[s.r],w=W[k];if(s.put.includes(w))return;
 const left=W.filter(x=>!s.put.includes(x)),want=left.reduce((a,b)=>D.VAL[a]<D.VAL[b]?a:b);
 if(w!==want){s.miss=k;A.sound.miss();return tell(`${w} is ${D.VAL[w]}. ${want} is ${D.VAL[want]}, which is smaller. Look at the tens first, not the length of the word.`)}
 s.miss=-1;s.put.push(w);A.sound.tick();if(s.put.length<W.length)return tell(`${w} is ${D.VAL[w]}. Now the next smallest.`);
 const line=s.put.map(x=>`${x} (${D.VAL[x]})`).join(', ');s.r++;s.put=[];A.sound.pop();tell(`In order: ${line}.`+(s.r<D.ORDER.length?' Next row.':''))}
/* ---- 5. robot ---- */
const verdicts=()=>{const w=Math.min(170,(A.W-36)/2);return[0,1].map(k=>({i:k,x:A.W/2+(k?6:-w-6),y:A.H*.7,w,h:Math.min(A.H*.18,64)}))};
function drawRobot(){const s=G.robot,g=A.ctx;paper();if(s.i>=D.ROBOT.length){tag('All 6 checked',A.W/2,A.H*.16,{ok:1});tag('forty, eighty, sixty-four, fifty',A.W/2,A.H*.36,{n:13});return}
 const R=D.ROBOT[s.i],x=A.W/2,y=A.H*.18,u=Math.min(A.W*.06,24);g.fillStyle='#d6d3d1';A.paint.rrect(x-u,y-u,u*2,u*2,8);g.fill();g.strokeStyle=P.ink;g.lineWidth=2;g.stroke();
 g.fillStyle=P.ink;g.fillRect(x-u*.55,y-u*.3,u*.3,u*.3);g.fillRect(x+u*.25,y-u*.3,u*.3,u*.3);g.fillRect(x-u*.45,y+u*.4,u*.9,3);
 tag(`“${R.n} in words is ${R.w}.”`,A.W/2,A.H*.42,{n:15});tag(`${s.i+1} of ${D.ROBOT.length}: right, or a slip?`,A.W/2,A.H*.56,{n:12});
 verdicts().forEach(b=>card(b,b.i?'✗ Slip':'✓ Right',{no:s.miss===b.i}))}
function robotTap(k){const s=G.robot;if(s.i>=D.ROBOT.length)return;const R=D.ROBOT[s.i];
 if((k===0)!==R.ok){s.miss=k;A.sound.miss();return tell(R.ok?`Look again: that one is right. ${R.fix}`:`Look closely at every letter. ${R.fix}`)}
 s.miss=-1;s.i++;A.sound.pop();tell((R.ok?'Yes, right. ':'Yes, a slip. ')+R.fix)}
function draw(){const k=sceneOf();if(k==='quiz'){paper();tag('Challenge',A.W/2,A.H*.22,{ok:1});tag('Number words to 100',A.W/2,A.H*.48,{n:13});return}
 ({tens:drawTens,join:drawJoin,build:drawBuild,order:drawOrder,robot:drawRobot})[k]();A.fx.draw(A.ctx)}
/* a tap on the canvas goes to whatever scene is showing */
function tap(p){const k=sceneOf(),pick=bs=>{const b=bs.find(q=>onBox(p,q));return b?b.i:-1};let i;
 if(k==='tens'&&(i=pick(tensCards()))>=0)tensTap(i);
 if(k==='join'){if((i=pick(joinTop()))>=0)joinTap(true,i);else if((i=pick(joinLow()))>=0)joinTap(false,i)}
 if(k==='build'){if(onBox(p,tenPile()))buildAdd(true);else if(onBox(p,onePile()))buildAdd(false);else if(onBox(p,mat()))buildTake(p.x<A.W/2)}
 if(k==='order'&&(i=pick(orderCards()))>=0)orderTap(i);
 if(k==='robot'&&(i=pick(verdicts()))>=0)robotTap(i);
 return false}
function fresh(){epoch++;for(const k in G)delete G[k];Object.assign(G,{tens:{i:0,miss:-1},join:{i:0,tw:'',ow:'',missT:-1,missO:-1},build:{i:0,t:0,o:0},order:{r:0,put:[],miss:-1},robot:{i:0,miss:-1},after:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();mirror();G.after()}
/* every canvas action also has a button under the canvas */
function mirror(){if(!btnRow)return;btnRow.innerHTML='';const k=sceneOf(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},btnRow,t).onclick=f};
 if(k==='tens'&&G.tens.i<D.TENW.length){const R=D.TENW[G.tens.i];R.o.forEach((w,i)=>add(w,()=>tensTap(i),`${R.n} is ${w}`))}
 if(k==='join'&&G.join.i<D.JOIN.length){const R=D.JOIN[G.join.i];R.t.forEach((w,i)=>add(w,()=>joinTap(true,i),`Tens word ${w}`));R.o.forEach((w,i)=>add(w,()=>joinTap(false,i),`Ones word ${w}`))}
 if(k==='build'&&G.build.i<D.BUILD.length){add('+ ten',()=>buildAdd(true),'Add a ten rod');add('+ one',()=>buildAdd(false),'Add a one cube');add('− ten',()=>buildTake(true),'Take a ten rod away');add('− one',()=>buildTake(false),'Take a one cube away')}
 if(k==='order'&&G.order.r<D.ORDER.length){const W=D.ORDER[G.order.r];W.forEach((w,i)=>{if(!G.order.put.includes(w))add(w,()=>orderTap(i),`Put ${w} next`)})}
 if(k==='robot'&&G.robot.i<D.ROBOT.length){add('✓ Right',()=>robotTap(0),'The robot is right');add('✗ Slip',()=>robotTap(1),'The robot made a slip')}}
const complete=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,ok){fresh();tell(D.DESC[i]);G.after=complete(i,ok,D.DONE[i])}
function auto(i,acts,ms){steps[i].go();const e0=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e0===epoch)f()},ms*(j+1)))}
const rightJoin=R=>[()=>joinTap(true,R.t.indexOf(D.say(Math.floor(R.n/10)*10))),()=>joinTap(false,R.o.indexOf(D.say(R.n%10)))];
const steps=[
{h:'Tens words',p:'Count the rods of ten. Tap the word for the number. Whole tens end in -ty.',
 predict:{q:'Four rods of ten make 40. Which word is 40?',opts:['fourteen','forty'],ans:1},task:'Find all 5 tens words',
 show:()=>auto(0,D.TENW.map(R=>()=>tensTap(R.o.indexOf(D.say(R.n)))),500),go:()=>enter(0,()=>G.tens.i>=D.TENW.length)},
{h:'Join with a hyphen',p:'Pick the tens word, then the ones word. A short line called a hyphen joins them: fifty-seven.',task:'Write all 4 numbers in words',
 show:()=>auto(1,D.JOIN.flatMap(rightJoin),330),go:()=>enter(1,()=>G.join.i>=D.JOIN.length)},
{h:'Build the word',p:'Read the word. Tap the tens pile for each ten and the ones pile for each one. Tap the mat to take one back.',
 predict:{q:'How do we write sixty-two as a number?',opts:['602','62'],ans:1},task:'Build all 5 words',
 show:()=>auto(2,D.BUILD.flatMap(n=>[...Array(Math.floor(n/10))].map(()=>()=>buildAdd(true)).concat([...Array(n%10)].map(()=>()=>buildAdd(false)))),95),go:()=>enter(2,()=>G.build.i>=D.BUILD.length)},
{h:'Smallest to biggest',p:'Tap the words in order, from the smallest number to the biggest. Look at the tens word first.',
 predict:{q:'Which is bigger: fourteen or forty?',opts:['fourteen, it is longer','forty'],ans:1},task:'Put both rows in order',
 show:()=>auto(3,D.ORDER.flatMap(W=>[...W].sort((a,b)=>D.VAL[a]-D.VAL[b]).map(w=>()=>orderTap(D.ORDER[G.order.r]?D.ORDER[G.order.r].indexOf(w):0))),380),go:()=>enter(3,()=>G.order.r>=D.ORDER.length)},
{h:'Check the robot',p:'The robot writes numbers in words. Is each one right, or a slip?',task:'Check all 6',
 show:()=>auto(4,D.ROBOT.map(R=>()=>robotTap(R.ok?0:1)),500),go:()=>enter(4,()=>G.robot.i>=D.ROBOT.length)},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
function why(t){let m='Say the number: the tens word first, then the ones word.';
 if(t==='teen')m='Teen words are between 13 and 19. Whole tens end in -ty: forty is 40, seventeen is 17.';
 if(t==='spell')m='Forty has no u: f-o-r-t-y, even though four has one.';
 if(t==='place')m='Sixty-two is 6 tens and 2 ones, so it has two digits: 62. 602 would be six hundred and two.';
 if(t==='swap')m='The tens come first. In 85 the 8 is the tens digit, so the word starts with eighty.';
 if(t==='hyphen')m='A hyphen joins the tens word and the ones word: eighty-five.';
 if(t==='same')m='They are not the same. Nineteen is 19, ninety is 90.';
 return m}
function next(){qn++;const Q=D.QS[qn%D.QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 quizBox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quizBox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),yes=t==='ok';if(yes)A.win();else A.sound.miss();
 fb.innerHTML=(yes?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=next;c.say(yes?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:x=>{quizBox.hidden=x.step!==5;btnRow.hidden=x.step===5;mirror()},
 init:x=>{A=x;const w=c.el('div',{class:'fl-below'},A.below);btnRow=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Number words lab buttons'},w);quizBox=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down:tap});mirror()}}).start()})})();
