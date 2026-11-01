/* Flagship – matching numerals 1 to 5 to groups (ages 4–5): put apples on a plate to match a numeral card, drag numeral
   cards onto groups that are spread out, bunched up, big or small, find the card on the wrong group, and read numerals on
   a door, a bus and a birthday card. Drag or tap, big targets, few words. */
(()=>{
const MAKE=[3,5,2];
/* a group is [how many, layout, big] ; layouts: line, wide (spread out), tight (bunched), ring */
const SETS=[[[4,'wide',0],[2,'line',0],[5,'tight',0]],[[3,'ring',0],[5,'wide',0],[1,'line',0]],
 [[2,'line',1],[5,'tight',0],[3,'line',1]],[[4,'tight',0],[1,'line',1],[3,'wide',0]]];
const FIX=[[[2,2],[4,3],[5,5]],[[3,3],[1,1],[5,4]],[[4,5],[2,2],[3,3]]]; // [count, card shown]
const WORLD=[['door',4,[3,4,5]],['bus',2,[5,2,3]],['card',5,[4,3,5]]];
const WORD=['zero','one','two','three','four','five','six'];
VIS.reg('flagnumer',c=>{let A,pad,quiz,qi=-1,run=0;c.fig.classList.add('young');
const B0=()=>({want:()=>{},won:0,r:0,k:0,cards:[],put:[],grid:[],sel:-1,grab:null,bad:-1,flash:''}),S=B0();
const mode=()=>['make','match','big','fix','world','quiz'][A.step];
const R=()=>A.reduced(),fz=n=>Math.round(n*(A.narrow?1:1.15));
const say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const need=()=>MAKE[Math.min(S.r,2)];
function words(g,t,x,y,n,col){g.font=`800 ${fz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
function card(g,n,x,y,w,h,hot){const C=A.col;g.fillStyle=C.dark?'#1e293b':'#fffbeb';A.paint.rrect(x,y,w,h,10);g.fill();g.strokeStyle=hot?C.vi:C.tx;g.lineWidth=hot?5:3;A.paint.rrect(x,y,w,h,10);g.stroke();
 g.font=`900 ${Math.round(Math.min(w,h)*.72)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=C.tx;g.fillText(String(n),x+w/2,y+h/2+2)}
function apple(g,x,y,r,big){const C=A.col;A.paint.ball(x,y,r,big?'#2563eb':'#dc2626');g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.arc(x,y,r,0,7);g.stroke();
 if(!big){g.strokeStyle='#15803d';g.lineWidth=3;g.beginPath();g.moveTo(x,y-r);g.lineTo(x+r*.25,y-r*1.4);g.stroke()}}
/* ---- layout ---- */
function boxes(){const{W,H}=A,gap=8,w=(W-20-gap*2)/3,y=H*.4,h=H*.57;return[0,1,2].map(k=>({x:10+k*(w+gap),y,w,h}))}
const WIDE=[[-.34,-.3],[.33,-.2],[0,.05],[-.3,.34],[.34,.36]];
function spots(n,lay,rc,big){const cx=rc.x+rc.w/2,cy=rc.y+rc.h*.6,s=Math.min(rc.w,rc.h*.75),r=big?s*.17:s*.1,out=[];
 for(let i=0;i<n;i++){let x,y;
  if(lay==='wide'){x=cx+WIDE[i][0]*rc.w;y=cy+WIDE[i][1]*rc.h*.62}
  else if(lay==='ring'){const a=i/n*6.283-1.57;x=cx+Math.cos(a)*s*.28;y=cy+Math.sin(a)*s*.28}
  else{const cols=big?2:3,sp=lay==='tight'?r*2.1:r*2.9,row=Math.floor(i/cols),inRow=Math.min(cols,n-row*cols),col=i%cols;x=cx+(col-(inRow-1)/2)*sp;y=cy+(row-(Math.ceil(n/cols)-1)/2)*sp}
  out.push({x,y,r})}return out}
function cardRects(){const{W,H}=A,n=S.cards.length,w=Math.min(W/5,74),h=Math.min(H*.27,w*1.3),gap=(W-n*w)/(n+1);
 return S.cards.map((_,i)=>{if(S.grab&&S.grab.i===i&&S.grab.x!=null)return{x:S.grab.x-w/2,y:S.grab.y-h/2,w,h};const b=S.put[i];
  if(b>=0){const rc=boxes()[b],sw=Math.min(rc.w*.5,w*.75),sh=sw*1.3;return{x:rc.x+rc.w/2-sw/2,y:rc.y+6,w:sw,h:sh}}return{x:gap+i*(w+gap),y:H*.06,w,h}})}
function makeGeo(){const{W,H}=A,u=Math.min(W,H);return{card:{x:W*.05,y:H*.22,w:W*.22,h:H*.42},plate:{x:W*.52,y:H*.52,rx:W*.21,ry:H*.3},tray:{x:W*.82,y:H*.12,w:W*.15,h:H*.8},r:u*.045}}
function plateSpots(){const G=makeGeo(),out=[];for(let i=0;i<S.k;i++){const col=i%2,row=Math.floor(i/2);out.push({x:G.plate.x+(col-.5)*G.r*2.8,y:G.plate.y+(row-(Math.ceil(S.k/2)-1)/2)*G.r*2.6,r:G.r})}return out}
/* ---- drawing ---- */
function drawMake(g){const G=makeGeo(),C=A.col;card(g,need(),G.card.x,G.card.y,G.card.w,G.card.h,false);
 g.fillStyle=A.alpha(C.cy,.14);g.beginPath();g.ellipse(G.plate.x,G.plate.y,G.plate.rx,G.plate.ry,0,0,7);g.fill();g.strokeStyle=S.bad===1?C.rd:C.cy;g.lineWidth=4;g.stroke();
 plateSpots().forEach(p=>apple(g,p.x,p.y,p.r));
 g.fillStyle=A.alpha(C.am,.16);A.paint.rrect(G.tray.x,G.tray.y,G.tray.w,G.tray.h,14);g.fill();g.strokeStyle=C.am;g.lineWidth=3;A.paint.rrect(G.tray.x,G.tray.y,G.tray.w,G.tray.h,14);g.stroke();
 for(let i=0;i<6-S.k;i++)apple(g,G.tray.x+G.tray.w/2,G.tray.y+G.r*1.6+i*G.r*2.5,G.r);
 if(S.grab&&S.grab.x!=null)apple(g,S.grab.x,S.grab.y,G.r);words(g,S.flash||`Make ${need()}`,A.W*.52,A.H*.1,17)}
function drawBox(g,rc,k,grp,hot){const C=A.col;g.fillStyle=hot?A.alpha(C.rd,.14):A.alpha(C.cy,.1);A.paint.rrect(rc.x,rc.y,rc.w,rc.h,16);g.fill();g.strokeStyle=hot?C.rd:C.cy;g.lineWidth=4;A.paint.rrect(rc.x,rc.y,rc.w,rc.h,16);g.stroke();
 spots(grp[0],grp[1]||'line',rc,grp[2]).forEach(p=>apple(g,p.x,p.y,p.r,grp[2]));words(g,`Group ${k+1}`,rc.x+rc.w/2,rc.y+rc.h-14,12,C.mu)}
function drawMatch(g){S.grid.forEach((grp,k)=>drawBox(g,boxes()[k],k,grp,S.bad===k));const rs=cardRects(),order=S.cards.map((_,i)=>i).sort((a,b)=>(S.grab&&S.grab.i===a)-(S.grab&&S.grab.i===b));
 order.forEach(i=>card(g,S.cards[i],rs[i].x,rs[i].y,rs[i].w,rs[i].h,S.sel===i))}
function drawFix(g){S.grid.forEach((grp,k)=>{const rc=boxes()[k];drawBox(g,rc,k,[grp[0],'line',0],S.bad===k);const sw=Math.min(rc.w*.5,56);card(g,grp[1],rc.x+rc.w/2-sw/2,rc.y+6,sw,sw*1.3,false)});words(g,'One card is wrong. Tap that group.',A.W/2,A.H*.2,15)}
function drawWorld(g){const[kind,n,opts]=WORLD[Math.min(S.r,2)],{W,H}=A,C=A.col,cx=W/2,y0=H*.04,h=H*.31;
 if(kind==='door'){g.fillStyle='#92400e';A.paint.rrect(cx-h*.33,y0,h*.66,h,8);g.fill();card(g,n,cx-h*.17,y0+h*.12,h*.34,h*.34,false);g.fillStyle='#facc15';g.beginPath();g.arc(cx+h*.2,y0+h*.62,h*.05,0,7);g.fill()}
 if(kind==='bus'){g.fillStyle='#f59e0b';A.paint.rrect(cx-h*.9,y0+h*.15,h*1.8,h*.65,14);g.fill();g.fillStyle='#bae6fd';for(let i=0;i<3;i++)g.fillRect(cx-h*.75+i*h*.4,y0+h*.25,h*.3,h*.22);card(g,n,cx+h*.48,y0+h*.22,h*.32,h*.34,false);
  g.fillStyle='#111';[-.5,.5].forEach(d=>{g.beginPath();g.arc(cx+d*h,y0+h*.82,h*.12,0,7);g.fill()})}
 if(kind==='card'){g.fillStyle=C.dark?'#831843':'#fce7f3';A.paint.rrect(cx-h*.55,y0,h*1.1,h,10);g.fill();g.strokeStyle=C.pk;g.lineWidth=3;A.paint.rrect(cx-h*.55,y0,h*1.1,h,10);g.stroke();words(g,'Happy birthday',cx,y0+h*.16,11);card(g,n,cx-h*.22,y0+h*.3,h*.44,h*.6,false)}
 opts.forEach((m,k)=>drawBox(g,boxes()[k],k,[m,'line',0],S.bad===k))}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.04:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){words(g,'Point to each one as you count.',W/2,H*.4,15);words(g,'1   2   3   4   5',W/2,H*.58,24);return}
 if(S.won>=lastN()){words(g,ending(),W/2,H/2,15);return A.fx.draw(g)}
 if(v==='make')drawMake(g);else if(v==='fix')drawFix(g);else if(v==='world')drawWorld(g);else drawMatch(g);A.fx.draw(g)}
const lastN=()=>({make:3,match:2,big:2,fix:3,world:3}[mode()]||9);
const ending=()=>({make:'The card tells you how many to put.',match:'Spread out or bunched up: the number stays the same.',big:'Big or small, each thing counts as one.',fix:'Count, then check the card.',world:'Numerals are all around you.'}[mode()]);
const miss=(t,b)=>{A.sound.miss();S.bad=b==null?-1:b;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},R()?10:900);A.redraw()};
function setup(){const v=mode(),r=S.r;S.sel=-1;S.grab=null;S.flash='';S.k=0;
 if(v==='match'||v==='big'){S.grid=SETS[(v==='big'?2:0)+Math.min(r,1)];S.cards=S.grid.map(x=>x[0]).sort((a,b)=>a-b);S.put=S.cards.map(()=>-1)}
 if(v==='fix')S.grid=FIX[Math.min(r,2)];if(v==='world')S.grid=WORLD[Math.min(r,2)][2].map(n=>[n])}
function win(t){S.won++;S.r++;A.sound.pop();if(S.won<lastN()){setup();say(t+' Next one.')}else say(t);buttons();A.redraw();S.want()}
/* make */
function add(){if(mode()!=='make'||S.won>=3)return;if(S.k>=6)return miss('The bowl is empty. Count the plate.');S.k++;A.sound.tick();say(`${S.k} on the plate.`);A.redraw()}
function take(){if(mode()!=='make'||S.won>=3)return;if(!S.k)return miss('The plate is empty.');S.k--;A.sound.tick();say(`${S.k} on the plate.`);A.redraw()}
function check(){if(mode()!=='make'||S.won>=3)return;const n=need();
 if(S.k<n)return miss(`The card says ${n}. You have ${S.k}. Put ${n-S.k===1?'one':'some'} more.`,1);
 if(S.k>n)return miss(`Count them: you have ${S.k}. The card says ${n}. Take ${S.k-n===1?'one':'some'} away.`,1);
 win(`Yes! ${n} apples for the numeral ${n}.`)}
/* match: say why a card does not fit this group */
function place(i,b){const v=mode();if(!['match','big'].includes(v)||S.put[i]>=0)return;S.sel=-1;const n=S.cards[i],grp=S.grid[b];
 if(S.put.some((x,j)=>x===b&&j!==i))return miss(`Group ${b+1} has a card already. Try another group.`,b);
 if(n!==grp[0]){const g=grp[0];let t=`Count group ${b+1}: it has ${WORD[g]}. The card says ${n}.`;
  if(grp[1]==='wide'&&n>g)t=`They are spread out, but that does not make more. Count: there are ${WORD[g]}.`;
  else if(grp[1]==='tight'&&n<g)t=`They are bunched up, but there are still ${WORD[g]}. Touch each one.`;
  else if(grp[2]&&n>g)t=`They are big, but there are only ${WORD[g]}. Big things count as one each.`;
  else if(!grp[2]&&v==='big'&&n<g)t=`Small things count too. There are ${WORD[g]}.`;return miss(t,b)}
 S.put[i]=b;A.sound.tick();if(S.put.every(x=>x>=0))return win('All the cards match!');say(`Yes, ${n} goes with group ${b+1}.`);buttons();A.redraw()}
function fixTap(b){if(mode()!=='fix'||S.won>=3)return;const[g,shown]=S.grid[b];
 if(g===shown)return miss(`Group ${b+1} has ${WORD[g]} and the card says ${shown}. That one matches.`,b);
 S.grid=S.grid.map((x,k)=>k===b?[g,g]:x);win(`Yes! It has ${WORD[g]}, so the card should say ${g}.`)}
function worldTap(b){if(mode()!=='world'||S.won>=3)return;const[kind,n]=WORLD[Math.min(S.r,2)],g=S.grid[b][0];
 if(g!==n)return miss(`That group has ${WORD[g]}. The ${kind} says ${n}. Count each one.`,b);win(`Yes! The ${kind} says ${n} and that group has ${WORD[n]}.`)}
function pickNext(){const left=S.cards.map((_,i)=>i).filter(i=>S.put[i]<0);if(!left.length)return;S.sel=left[(left.indexOf(S.sel)+1)%left.length];A.sound.tick();say(`Picked the card ${S.cards[S.sel]}. Now pick a group.`);A.redraw()}
function onGroup(b){if(S.sel<0)pickNext();if(S.sel>=0)place(S.sel,b)}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='quiz'||S.won>=lastN())return;
 if(v==='make'){B('Add one 🍎',add,'Add one apple to the plate');B('Take one away',take,'Take one apple off the plate');B('Check ✓',check,'Check if the plate matches the card')}
 if(v==='match'||v==='big'){B('Pick a card ▶',pickNext,'Pick the next numeral card');[0,1,2].forEach(b=>B(`On group ${b+1}`,()=>onGroup(b),`Put the picked card on group ${b+1}`))}
 if(v==='fix')[0,1,2].forEach(b=>B(`Group ${b+1} is wrong`,()=>fixTap(b),`The card on group ${b+1} is wrong`));
 if(v==='world')[0,1,2].forEach(b=>B(`Group ${b+1}`,()=>worldTap(b),`Group ${b+1} matches the numeral`))}
/* pointer */
const inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h,boxAt=p=>boxes().findIndex(r=>inR(p,r));
function onPlate(p){const G=makeGeo().plate;return((p.x-G.x)/G.rx)**2+((p.y-G.y)/G.ry)**2<1}
function down(p){const v=mode();if(S.won>=lastN())return false;
 if(v==='make'){if(inR(p,makeGeo().tray)){S.grab={i:-1,x:null,y:null,x0:p.x,y0:p.y};return true}if(onPlate(p)&&plateSpots().some(q=>Math.hypot(p.x-q.x,p.y-q.y)<q.r*1.3))take();return false}
 if(v==='match'||v==='big'){const rs=cardRects(),i=rs.findIndex((r,j)=>S.put[j]<0&&inR(p,r));if(i>=0){S.grab={i,x:null,y:null,x0:p.x,y0:p.y};return true}const b=boxAt(p);if(b>=0&&S.sel>=0)place(S.sel,b);return false}
 const b=boxAt(p);if(b>=0)(v==='fix'?fixTap:worldTap)(b);return false}
function move(p){if(!S.grab)return;if(S.grab.x!=null||Math.hypot(p.x-S.grab.x0,p.y-S.grab.y0)>8){S.grab.x=p.x;S.grab.y=p.y;A.redraw()}}
function up(p){const g=S.grab;S.grab=null;if(!g)return;
 if(g.i<0){if(g.x==null||onPlate(p))add();return A.redraw()}
 if(g.x==null){S.sel=g.i;A.sound.tick();say(`Picked the card ${S.cards[g.i]}. Now tap a group.`);return A.redraw()}const b=boxAt(p);if(b>=0)place(g.i,b);A.redraw()}
const chk=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++run;list.forEach((fn,j)=>setTimeout(()=>{if(k===run)fn()},R()?j*40+30:(j+1)*(gap||260)))}
const fresh=()=>{run++;Object.assign(S,B0());if(A)setup()};
const matchAll=()=>[0,1].flatMap(r=>[0,1,2].map(i=>()=>{const n=S.cards[i];place(i,S.grid.findIndex(x=>x[0]===n))}));
const steps=[
{h:'Make the number',p:'Look at the card. Put that many apples on the plate. Drag them, or tap Add one. Then tap Check.',task:'Make 3 plates that match',
 show:()=>{steps[0].go();play(MAKE.flatMap(n=>Array(n).fill(add).concat([check])),190)},go:()=>{fresh();say('Make 3. Put 3 apples on the plate.');buttons();S.want=chk(0,()=>S.won>=3,'The numeral tells you how many.')}},
{h:'Card to group',p:'Drag each numeral card to the group with that many. Or tap a card, then tap a group.',predict:{q:'4 apples spread far apart, 5 bunched up. Which has more?',opts:['The spread-out 4','The bunched-up 5'],ans:1},task:'Match the cards 2 times',
 show:()=>{steps[1].go();play(matchAll(),280)},go:()=>{fresh();say('Match each card to its group.');buttons();S.want=chk(1,()=>S.won>=2,'Count them. Spreading out does not change how many.')}},
{h:'Big and small',p:'Some groups have big balls. Some have small apples. Count each one.',predict:{q:'2 big balls and 5 small apples. Which card goes with the balls?',opts:['5, they are bigger','2, there are two'],ans:1},task:'Match the cards 2 times',
 show:()=>{steps[2].go();play(matchAll(),280)},go:()=>{fresh();say('Big or small? Count each one.');buttons();S.want=chk(2,()=>S.won>=2,'Big or small, each thing is one.')}},
{h:'Oops! Wrong card',p:'Someone put the cards out. One card is wrong. Count each group and tap the wrong one.',task:'Fix 3 wrong cards',
 show:()=>{steps[3].go();play(FIX.map(f=>()=>fixTap(f.findIndex(x=>x[0]!==x[1]))),500)},go:()=>{fresh();say('One card is wrong. Which group?');buttons();S.want=chk(3,()=>S.won>=3,'Count first, then check the card.')}},
{h:'Numerals everywhere',p:'Numerals are on doors, buses and cards. Which group matches the numeral?',task:'Match 3 numerals',
 show:()=>{steps[4].go();play(WORLD.map(([,n,o])=>()=>worldTap(o.indexOf(n))),500)},go:()=>{fresh();say('Read the numeral. Find the group.');buttons();S.want=chk(4,()=>S.won>=3,'You read the numeral and found that many.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['The card says 4. Which group matches?',[['● ● ● ●','ok'],['● ● ●','less'],['● ● ● ● ●','more']]],
 ['5 small beads and 2 big balls. Which group goes with the numeral 5?',[['The beads','ok'],['The balls, they are bigger','size'],['Both of them','both']]],
 ['3 cars far apart. Which card goes with them?',[['3','ok'],['5, they take up more room','spread'],['1, it is one row','row']]],
 ['Sam counts his blocks: 1, 2, 3, 4. Which card does he pick?',[['4','ok'],['1, the first one','first'],['5','skip']]],
 ['Mia has the card 2. She puts out 5 spoons. What is wrong?',[['Too many, she needs 2','ok'],['Nothing is wrong','none'],['Too few','few']]]];
function why(t){let m='Count each one, then find the card that says that many.';
 if(t==='less')m='That group has 3. Count again: the card says 4.';if(t==='more')m='That group has 5, one too many.';
 if(t==='size')m='Big does not mean more. There are only 2 balls.';if(t==='both')m='The balls are 2, not 5.';
 if(t==='spread')m='Far apart does not make more. There are still 3.';if(t==='row')m='Count the cars, not the rows. There are 3.';
 if(t==='first')m='The last number you say tells how many. Sam said 4 last.';if(t==='skip')m='Sam stopped at 4, so there are 4.';
 if(t==='none')m='The card says 2, but there are 5 spoons.';if(t==='few')m='5 is more than 2. She has too many.';return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Good matching.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
