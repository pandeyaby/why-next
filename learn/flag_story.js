/* Flagship: Addition and subtraction word problems within 10 (ages 4–6; CCSS K.OA.2, NC Year 1 "solve one-step problems
   using concrete objects and pictorial representations"). Act out take-from, add-to and put-together stories with the
   objects themselves, decide whether a story makes more or fewer, build the number sentence that matches it, and check
   whether an answer makes sense. Not flagtake (taking away), flagaddtog (combining) or flagrepass (ways to represent). */
(()=>{
VIS.reg('flagstory',c=>{
let K,pad,quiz,turn=-1;const st={};c.fig.classList.add('young');
const STAGES=['birds','ducks','apples','sign','sentence','sense','chal'];
const stage=()=>STAGES[K.step];
const SIGN_CARDS=[['2 more frogs jump in','+'],['The cat eats 1 fish','−'],['3 balloons pop','−'],['Gran gives me 2 more','+'],['4 kids go home','−'],['1 more bee comes','+']];
const BUILD=['6','−','2','4'],TILES=['2','+','6','4','−','8'];
const SENSE=[[8,'birds','2 fly away',10,false],[4,'ducks','3 more come',7,true],[5,'cakes','1 is eaten',6,false]];
function voice(t){c.say(t);if(K)K.cv.setAttribute('aria-label',t)}
function word(t,x,y,px,o){o=o||{};const g=K.ctx;g.font=`${o.b||800} ${px}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=o.ink||K.col.tx;g.fillText(String(t),x,y,o.max||K.W-16)}
const wash=(k,a)=>K.mix(K.col.pn,K.col[k],K.col.dark?a*.7:a);
function plate(r,k,a,rad){const g=K.ctx;g.fillStyle=wash(k,a);K.paint.rrect(r.x,r.y,r.w,r.h,rad||14);g.fill();g.lineWidth=2;g.strokeStyle=K.col.tx;g.stroke()}
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function footer(t){const g=K.ctx,px=K.narrow?17:19,rows=[''];g.font=`700 ${px}px system-ui,sans-serif`;
 for(const w of t.split(' ')){const k=rows.length-1,nx=(rows[k]+' '+w).trim();if(rows[k]&&g.measureText(nx).width>K.W-28)rows.push(w);else rows[k]=nx}
 const n=Math.min(3,rows.length),lh=px+6,top=K.H-n*lh-14;g.fillStyle=K.alpha(K.col.pn,.96);g.fillRect(0,top,K.W,K.H-top);rows.slice(0,3).forEach((r,j)=>word(r,K.W/2,top+7+lh*j+lh/2,px,{b:700}))}
/* little pictures */
function bird(x,y,r,k){const g=K.ctx;K.paint.ball(x,y,r,K.col[k]);g.fillStyle=K.col.am;g.beginPath();g.moveTo(x+r*.9,y-r*.1);g.lineTo(x+r*1.5,y+r*.1);g.lineTo(x+r*.9,y+r*.3);g.fill();g.fillStyle=K.col.tx;g.beginPath();g.arc(x+r*.4,y-r*.3,r*.14,0,7);g.fill()}
function duck(x,y,r){const g=K.ctx;g.fillStyle='#f5c518';g.beginPath();g.ellipse(x,y,r*1.2,r*.75,0,0,7);g.fill();g.beginPath();g.arc(x+r*.8,y-r*.7,r*.5,0,7);g.fill();g.fillStyle='#e8740c';g.beginPath();g.moveTo(x+r*1.25,y-r*.75);g.lineTo(x+r*1.7,y-r*.6);g.lineTo(x+r*1.25,y-r*.5);g.fill();g.fillStyle='#111';g.beginPath();g.arc(x+r*.95,y-r*.82,r*.1,0,7);g.fill()}
function apple(x,y,r,green){const g=K.ctx;K.paint.ball(x,y,r,green?'#3fa34d':'#d63a3a');g.strokeStyle='#6b3e1f';g.lineWidth=3;g.beginPath();g.moveTo(x,y-r);g.lineTo(x+3,y-r-8);g.stroke()}
/* ---- 1. birds fly away (take from) ---- */
const birdAt=i=>{const gap=(K.W-40)/7;return{x:20+gap*(i+.5),y:K.H*.4,r:K.narrow?17:22}};
function drawBirds(){const g=K.ctx;word('7 birds sit on a fence. 3 fly away.',K.W/2,26,K.narrow?18:22);
 g.fillStyle=K.col.am;g.fillRect(14,K.H*.4+20,K.W-28,10);for(let i=0;i<8;i++)g.fillRect(14+i*(K.W-38)/7,K.H*.4+20,8,40);
 for(let i=0;i<7;i++){const B=birdAt(i),f=st.fly[i]&&st.fly[i].v;if(st.fly[i])bird(B.x+f*(K.W*.5-B.x)*.5+f*(i-3)*12,B.y-f*(B.y-K.H*.16),B.r*.8,'cy');else bird(B.x,B.y,B.r,'cy')}
 const gone=st.fly.filter(v=>v!=null).length;word(`flew away: ${gone}`,K.W/2,K.H*.62,K.narrow?20:24,{ink:K.col.pk});
 if(st.birdsOk)word('4 are left. 7 take away 3 is 4.',K.W/2,K.H*.72,K.narrow?20:24,{ink:K.col.gr})}
function flyAway(i){if(st.fly[i]!=null||st.birdsOk)return;const gone=st.fly.filter(v=>v!=null).length;
 if(gone>=3)return tellIt('Only 3 fly away. Stop at 3. Now count the birds that are left.',false);
 st.fly[i]={v:0};K.tween(st.fly[i],{v:1},600,'out');tellIt(gone+1===3?'3 flew away. How many are left on the fence?':`${gone+1} flew away.`,true)}
function countBirds(n){const gone=st.fly.filter(v=>v!=null).length;if(gone<3)return tellIt('First make 3 birds fly away. Tap a bird.',false);
 if(n===4){st.birdsOk=true;return tellIt('Yes! 4 birds are left. There are fewer than at the start.',true)}
 tellIt(n===3?'3 is how many flew away. Count the birds still on the fence.':'The birds flew away, so there are fewer, not more. Count the ones on the fence.',false)}
/* ---- 2. more ducks come (add to) ---- */
const pond=()=>({x:K.W*.04,y:K.H*.2,w:K.W*.6,h:K.H*.42});
const bank=i=>({x:K.W*.72,y:K.H*(.2+i*.15),w:K.W*.24,h:K.H*.13});
function drawDucks(){const g=K.ctx,P=pond();word('5 ducks swim. 3 more come.',K.W/2,24,K.narrow?18:22);
 g.fillStyle=wash('cy',.35);K.paint.rrect(P.x,P.y,P.w,P.h,40);g.fill();g.strokeStyle=K.col.tx;g.lineWidth=2;g.stroke();
 const r=K.narrow?12:16,inn=5+st.inPond;for(let i=0;i<inn;i++)duck(P.x+P.w*(.17+(i%4)*.21),P.y+P.h*(.3+Math.floor(i/4)*.42),r);
 for(let i=0;i<3;i++){if(i<st.inPond)continue;const B=bank(i);if(st.lift&&st.lift.i===i)continue;plate(B,'gr',.2);duck(B.x+B.w/2,B.y+B.h*.6,r)}
 if(st.lift)duck(st.lift.x,st.lift.y,r);word(`in the pond: ${inn}`,K.W/2,K.H*.7,K.narrow?20:24,{ink:st.ducksOk?K.col.gr:K.col.tx})}
function swimIn(){if(st.inPond>=3)return;st.inPond++;tellIt(st.inPond===3?'All 3 came. How many ducks now?':`${st.inPond} more came.`,true)}
function countDucks(n){if(st.inPond<3)return tellIt('First bring all 3 ducks into the pond.',false);
 if(n===8){st.ducksOk=true;return tellIt('Yes! 5 and 3 more make 8. More came, so there are more.',true)}
 tellIt(n===3?'3 is how many came. Count all the ducks in the pond.':'More ducks came, so there are more than 5. Count them all.',false)}
/* ---- 3. put together ---- */
const appleAt=i=>{const gap=K.W/7;return{x:gap*(i+.5)+(i>=4?gap*.5:0),y:K.H*.4,r:K.narrow?18:24}};
function drawApples(){word('4 red apples and 2 green apples.',K.W/2,24,K.narrow?18:22);word('How many in all?',K.W/2,52,K.narrow?18:22);
 for(let i=0;i<6;i++){const A=appleAt(i);apple(A.x,A.y,A.r,i>=4);const n=st.tapped.indexOf(i);if(n>=0)word(n+1,A.x,A.y+A.r+22,K.narrow?20:24,{ink:K.col.vi})}
 if(st.applesOk)word('4 and 2 make 6.',K.W/2,K.H*.66,K.narrow?22:26,{ink:K.col.gr})}
function tapApple(i){if(st.applesOk)return;if(st.tapped.includes(i))return tellIt('You counted that one. Each apple gets one number.',false);
 st.tapped.push(i);const n=st.tapped.length;if(n===6){st.applesOk=true;return tellIt('6 apples in all. Red and green together.',true)}tellIt(String(n),true)}
/* ---- 4. more or fewer? ---- */
const sbin=i=>{const w=(K.W-36)/2;return{x:12+i*(w+12),y:K.H*.44,w,h:K.H*.34}};
function drawSign(){const card=SIGN_CARDS[st.si];
 if(card){const r=st.cardR={x:K.W*.08,y:K.H*.12,w:K.W*.84,h:K.narrow?58:64},d=st.lift,b=d?{x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h}:r;plate(b,'vi',.22);word(card[0],b.x+b.w/2,b.y+b.h/2,K.narrow?19:23,{max:b.w-12})}
 else word('All sorted ✓',K.W/2,K.H*.2,K.narrow?20:24,{ink:K.col.gr});
 [['+','more ➕','gr'],['−','fewer ➖','pk']].forEach(([s,l,k],i)=>{const r=sbin(i);plate(r,k,.16);word(l,r.x+r.w/2,r.y+24,K.narrow?20:24);
  st.done.filter(x=>x[1]===s).forEach((x,j)=>word(x[0],r.x+r.w/2,r.y+56+j*24,K.narrow?13:15,{b:600,max:r.w-8}))})}
function sortSign(s){const card=SIGN_CARDS[st.si];st.lift=null;if(!card)return;
 if(s!==card[1])return tellIt(card[1]==='+'?`"${card[0]}": more come, so there are more.`:`"${card[0]}": some go away, so there are fewer.`,false);
 st.done.push(card);st.si++;if(st.si>=SIGN_CARDS.length){st.signOk=true;return tellIt('More come: add. Some go away: take away.',true)}tellIt(s==='+'?'Yes, more.':'Yes, fewer.',true)}
/* ---- 5. number sentence ---- */
const tileAt=i=>{const w=K.narrow?(K.W-60)/3:90;const cols=K.narrow?3:6,x0=(K.W-cols*w-(cols-1)*12)/2;return{x:x0+(i%cols)*(w+12),y:K.H*.5+Math.floor(i/cols)*70,w,h:58}};
function drawSentence(){word('6 apples. 2 are eaten. How many left?',K.W/2,26,K.narrow?17:21);
 const row=[0,1,2,'=',3].map(k=>k==='='?'=':st.slots[k]!=null?st.slots[k]:'?');word(row.join('  '),K.W/2,K.H*.24,K.narrow?34:42,{ink:st.sentOk?K.col.gr:K.col.tx});
 for(let i=0;i<6;i++){if(st.used.includes(i))continue;const r=st.lift&&st.lift.i===i?{x:st.lift.x-30,y:st.lift.y-29,w:60,h:58}:tileAt(i);plate(r,'am',.24);word(TILES[i],r.x+r.w/2,r.y+r.h/2,30)}}
function putTile(i){const k=st.slots.length,want=BUILD[k],t=TILES[i];if(want==null)return;
 if(t!==want){const tips=['Start with how many there were at the start: 6.',t==='+'?'Eaten means they go away. Use take away: −.':'Pick the sign: add or take away?','How many were eaten? 2.','Count what is left: 6 take away 2.'];return tellIt(tips[k],false)}
 st.slots.push(t);st.used.push(i);if(st.slots.length===4){st.sentOk=true;return tellIt('6 − 2 = 4. The sentence tells the story.',true)}tellIt('Yes! Next.',true)}
/* ---- 6. does it make sense? ---- */
function drawSense(){const q=SENSE[st.qi]||SENSE[SENSE.length-1],[n,thing,what,ans]=q;
 word(SENSE[st.qi]?`${n} ${thing}. ${what}.`:'All checked ✓',K.W/2,28,K.narrow?20:24,{ink:SENSE[st.qi]?K.col.tx:K.col.gr});
 if(SENSE[st.qi]){word(`Pip says: ${ans}`,K.W/2,K.H*.18,K.narrow?24:30,{ink:K.col.vi});
  const g=K.ctx,r=Math.min(13,(K.W-150)/22),x0=K.narrow?100:150;[[n,'Start','cy',K.H*.3],[ans,'Pip','vi',K.H*.42]].forEach(([v,l,k,y])=>{word(`${l}: ${v}`,x0/2+4,y,K.narrow?15:18,{max:x0-8});for(let j=0;j<v;j++)K.paint.ball(x0+r+j*(2*r+4),y,r,K.col[k])})}
 st.yes={x:K.W*.08,y:K.H*.6,w:K.W*.38,h:64};st.no={x:K.W*.54,y:K.H*.6,w:K.W*.38,h:64};
 if(SENSE[st.qi]){plate(st.yes,'gr',.25);word('✓ makes sense',st.yes.x+st.yes.w/2,st.yes.y+32,K.narrow?16:20,{max:st.yes.w-8});plate(st.no,'rd',.2);word('✗ not right',st.no.x+st.no.w/2,st.no.y+32,K.narrow?16:20,{max:st.no.w-8})}}
function judgeSense(says){const q=SENSE[st.qi];if(!q)return;const [n,,what,ans,ok]=q,more=/more/.test(what);
 if(says!==ok)return tellIt(ok?`${what}, so there should be more than ${n}. ${ans} is more. It makes sense.`:`${what}, so there should be ${more?'more':'fewer'} than ${n}. ${ans} is ${ans>n?'more':'fewer'}. Not right.`,false);
 st.qi++;if(st.qi>=SENSE.length){st.senseOk=true;return tellIt('Ask: should there be more or fewer at the end?',true)}tellIt(ok?'Yes, it makes sense.':`Yes, not right. It should be ${more?'more':'fewer'}.`,true)}
/* ---- frame ---- */
function draw(){const{ctx:g,W,H,col:C}=K,m=stage();g.fillStyle=K.mix(C.pn,C.am,.05);g.fillRect(0,0,W,H);
 if(m==='chal'){word('Story time!',W/2,H*.42,K.narrow?22:26);word('Answer below',W/2,H*.56,16,{ink:C.mu,b:500});K.fx.draw(g);return}
 ({birds:drawBirds,ducks:drawDucks,apples:drawApples,sign:drawSign,sentence:drawSentence,sense:drawSense})[m]();if(st.msg)footer(st.msg);K.fx.draw(g)}
function tellIt(t,good){st.msg=t;if(good)K.sound.pop();else if(good===false)K.sound.miss();voice(t);buttons();K.redraw();st.check&&st.check()}
function wipe(){for(const k in st)delete st[k];Object.assign(st,{fly:Array(7).fill(null),inPond:0,tapped:[],si:0,done:[],slots:[],used:[],qi:0,msg:'',check:()=>{}});if(K)K.redraw()}
function buttons(){if(!pad)return;pad.innerHTML='';const m=stage();if(m==='chal')return;
 const add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(m==='birds'&&!st.birdsOk){add('🐦 Fly away',()=>{const i=st.fly.findIndex(v=>v==null);if(i>=0)flyAway(i)},'Make one bird fly away');[3,4,10].forEach(n=>add(String(n),()=>countBirds(n),`${n} birds are left`))}
 if(m==='ducks'&&!st.ducksOk){add('🦆 Swim in',swimIn,'Bring one duck into the pond');[8,3,2].forEach(n=>add(String(n),()=>countDucks(n),`${n} ducks now`))}
 if(m==='apples'&&!st.applesOk)add('Count next apple',()=>{const i=[0,1,2,3,4,5].find(j=>!st.tapped.includes(j));if(i!=null)tapApple(i)});
 if(m==='sign'&&SIGN_CARDS[st.si]){add('➕ more',()=>sortSign('+'),`${SIGN_CARDS[st.si][0]}: more`);add('➖ fewer',()=>sortSign('−'),`${SIGN_CARDS[st.si][0]}: fewer`)}
 if(m==='sentence'&&!st.sentOk)TILES.forEach((t,i)=>{if(!st.used.includes(i))add(t,()=>putTile(i),`Put ${t==='−'?'minus':t==='+'?'plus':t} next`)});
 if(m==='sense'&&SENSE[st.qi]){add('✓ makes sense',()=>judgeSense(true));add('✗ not right',()=>judgeSense(false))}}
function press(p){const m=stage();if(m==='chal')return false;
 if(m==='birds'&&!st.birdsOk){for(let i=0;i<7;i++){const B=birdAt(i);if(st.fly[i]==null&&Math.hypot(p.x-B.x,p.y-B.y)<B.r+14){flyAway(i);return true}}return false}
 if(m==='ducks'&&st.inPond<3){for(let i=st.inPond;i<3;i++)if(within(p,bank(i))){st.lift={i,x:p.x,y:p.y,x0:p.x,y0:p.y};K.redraw();return true}return false}
 if(m==='apples'&&!st.applesOk){for(let i=0;i<6;i++){const A=appleAt(i);if(Math.hypot(p.x-A.x,p.y-A.y)<A.r+14){tapApple(i);return true}}return false}
 if(m==='sign'&&SIGN_CARDS[st.si]){if(within(p,st.cardR)){st.lift={x:p.x,y:p.y};return true}for(let i=0;i<2;i++)if(within(p,sbin(i))){sortSign(i?'−':'+');return true}return false}
 if(m==='sentence'&&!st.sentOk){for(let i=0;i<6;i++)if(!st.used.includes(i)&&within(p,tileAt(i))){st.lift={i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 if(m==='sense'&&SENSE[st.qi]){if(within(p,st.yes)){judgeSense(true);return true}if(within(p,st.no)){judgeSense(false);return true}}
 return false}
function drag(p){if(st.lift){st.lift.x=p.x;st.lift.y=p.y;K.redraw()}}
function drop(){const d=st.lift,m=stage();if(!d)return;st.lift=null;
 if(m==='ducks'){if(within(d,pond())||Math.hypot(d.x-d.x0,d.y-d.y0)<10)return swimIn();return tellIt('Drop the duck in the pond.',false)}
 if(m==='sign'){const i=[0,1].find(j=>within(d,sbin(j)));return i!=null?sortSign(i?'−':'+'):K.redraw()}
 if(m==='sentence')return putTile(d.i)}
const ready=(i,ok,line)=>()=>{if(K.step===i&&!K.isDone&&(K.pred[i]!=null||!steps[i].predict)&&ok())K.done(line()+K.reveal(i))};
function play(i,acts){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(K.step===i)f()},K.reduced()?30*(j+1):(j+1)*400))}
function begin(i,hint,ok,line){wipe();tellIt(hint);st.check=ready(i,ok,line)}
const steps=[
{h:'Birds fly away',p:'7 birds sit on a fence. 3 fly away. How many are left?',
 predict:{q:'At the end, are there more birds or fewer birds?',opts:['more birds','fewer birds'],ans:1},
 task:'Make 3 birds fly, then count',show:()=>play(0,[()=>flyAway(0),()=>flyAway(3),()=>flyAway(6),()=>countBirds(4)]),
 go:()=>begin(0,'Tap a bird to make it fly away.',()=>st.birdsOk,()=>'7 take away 3 is 4.')},
{h:'More ducks come',p:'5 ducks swim in a pond. 3 more ducks come. How many ducks now?',
 predict:{q:'Will there be more than 5 ducks, or fewer?',opts:['fewer than 5','more than 5'],ans:1},
 task:'Bring 3 ducks in, then count',show:()=>play(1,[swimIn,swimIn,swimIn,()=>countDucks(8)]),
 go:()=>begin(1,'Drag a duck from the grass into the pond.',()=>st.ducksOk,()=>'5 and 3 more make 8.')},
{h:'Put them together',p:'4 red apples and 2 green apples. How many apples in all? Count each apple once.',
 task:'Count all the apples',show:()=>play(2,[0,1,2,3,4,5].map(i=>()=>tapApple(i))),
 go:()=>begin(2,'Tap each apple to count it.',()=>st.applesOk,()=>'4 and 2 make 6.')},
{h:'More or fewer?',p:'Listen to the story. Do more come, or do some go away?',
 task:'Sort all 6 stories',show:()=>play(3,SIGN_CARDS.map(x=>()=>sortSign(x[1]))),
 go:()=>begin(3,'Drag the story to more or fewer. Or tap a box.',()=>st.signOk,()=>'More: add. Fewer: take away.')},
{h:'Write the sum',p:'A number sentence tells the story. Start with how many there were.',
 task:'Build 6 − 2 = 4',show:()=>play(4,BUILD.map(v=>()=>putTile(TILES.findIndex((t,i)=>t===v&&!st.used.includes(i))))),
 go:()=>begin(4,'Tap or drag a card into the next box.',()=>st.sentOk,()=>'6 − 2 = 4.')},
{h:'Does it make sense?',p:'Pip has answers. Check each one. Should there be more or fewer at the end?',
 task:'Check all 3 answers',show:()=>play(5,SENSE.map(q=>()=>judgeSense(q[4]))),
 go:()=>begin(5,'Is Pip right? Tap a button.',()=>st.senseOk,()=>'More or fewer tells you.')},
{h:'Challenge',p:'',go:()=>{wipe();nextQ()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>st.check()});
const QS=[
 ['7 birds. 3 fly away. How many are left?',[['4','ok'],['3','flew'],['10','added']]],
 ['5 ducks. 3 more come. How many now?',[['8','ok'],['2','tookaway'],['3','flew']]],
 ['4 red apples and 2 green apples. How many in all?',[['6','ok'],['4','part'],['2','tookaway']]],
 ['6 apples. 2 are eaten. Which sum fits?',[['6 − 2 = 4','ok'],['6 + 2 = 8','added'],['2 − 6','order']]],
 ['9 cakes. 1 is eaten. Pip says 10. Is Pip right?',[['No, there should be fewer','ok'],['Yes','added'],['No, there should be more','tookaway']]],
 ['3 cats. 2 more come. How many cats?',[['5','ok'],['1','tookaway'],['2','flew']]]];
function fix(t){let m='Act it out: do more come, or do some go away?';
 if(t==='flew')m='That is how many moved. Count how many there are at the end.';
 if(t==='added')m='Some went away, so there are fewer, not more.';
 if(t==='tookaway')m='More came, so there are more, not fewer.';
 if(t==='part')m='That is only the red apples. Count the green ones too.';
 if(t==='order')m='Start with how many there were at the start: 6.';
 return m}
function nextQ(){turn++;const q=QS[turn%QS.length],r=turn%3,opts=[...q[1].slice(r),...q[1].slice(0,r)];
 quiz.innerHTML=`<p><b>${q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>grade(t)});voice('Challenge: '+q[0]);K.redraw()}
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)K.win();else K.sound.miss();fb.innerHTML=(ok?'✓ Yes! ':'✗ '+fix(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=nextQ}
K=FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:X=>{quiz.hidden=X.step!==6;pad.hidden=X.step===6;buttons()},
 init:A=>{K=A;wipe();const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Story buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);A.gest({down:press,move:drag,up:drop});buttons()}});
K.start()})})();
