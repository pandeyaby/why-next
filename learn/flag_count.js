/* Flagship – counting up to five things (ages 3–4): touch or move each thing once as you say one number for it
   (one-to-one), find that the LAST number said tells how many (cardinal principle), spread out or squash the same
   things and see the number stay the same, count out "give me three" and stop at three, and spot small groups at a
   glance (subitising). Challenge on the usual counting slips: double counting, skipping, saying the list again. */
(()=>{const NUM=['zero','one','two','three','four','five'];
const SETS=[['🦆',4],['🐸',5]],HOWMANY=[['🍎',3],['🚗',5],['🐞',2]],GIVE=[3,2,4],DICE=[3,1,5,2,4];
const PIPS={1:[[.5,.5]],2:[[.3,.3],[.7,.7]],3:[[.25,.25],[.5,.5],[.75,.75]],4:[[.3,.3],[.7,.3],[.3,.7],[.7,.7]],5:[[.27,.27],[.73,.27],[.5,.5],[.27,.73],[.73,.73]]};
VIS.reg('flagcount',c=>{let A,pad,quiz,qn=-1,run=0;c.fig.classList.add('young');
const G={tok:0,want:()=>{},round:0,things:[],said:0,oops:-1,solved:0,picked:-1,stars:[],moved:0,plate:0,flash:'',hold:null};
const mode=()=>['touch','last','move','give','glance','quiz'][A.step];
const speak=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fs=n=>Math.round(n*(A.narrow?1.1:1.25));
function txt(g,s,x,y,n,col,w){g.font=`${w||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(s,x,y,A.W-10)}
function tile(g,x,y,w,h,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(x,y,w,h,16);g.fill();g.lineWidth=lw||2;g.strokeStyle=edge;A.paint.rrect(x,y,w,h,16);g.stroke()}
const inside=(p,x,y,w,h)=>p.x>x&&p.x<x+w&&p.y>y&&p.y<y+h,near=(p,t,r)=>Math.hypot(p.x-t.x,p.y-t.y)<r;
const R=()=>Math.min(A.W/12,A.H/9);
function scatter(n,seed){const out=[],sp=[[.18,.2],[.5,.14],[.8,.24],[.3,.42],[.68,.44]];for(let i=0;i<n;i++){const s=sp[(i+seed)%5];out.push({x:A.W*s[0],y:A.H*s[1],n:0})}return out}
const slot=i=>({x:A.W*(.12+i*.19),y:A.H*.8});
function setRound(){const[e,n]=SETS[G.round]||SETS[1];G.things=scatter(n,G.round);G.said=0;G.icon=e}
function starRow(kind){const n=5;G.stars=[];for(let i=0;i<n;i++){const t=kind==='wide'?.08+i*.21:kind==='tight'?.34+i*.08:[.15,.62,.4,.82,.28][i];G.stars.push({x:A.W*t,y:A.H*(kind==='mix'?[.2,.3,.48,.22,.5][i]:.36)})}}
function paint(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.04:.4);g.fillRect(0,0,W,H);const r=R();
 if(v==='quiz'){txt(g,'1, 2, 3, 4, 5',W/2,H*.36,22,C.tx,800);txt(g,'The last number says how many.',W/2,H*.56,14,C.tx,700);return}
 if(v==='touch'){G.things.forEach((t,i)=>{if(G.hold&&G.hold.i===i)return;const p=t.n?slot(t.n-1):t;tile(g,p.x-r,p.y-r,2*r,2*r,A.alpha(t.n?C.gr:C.cy,t.n?.25:.12),G.oops===i?C.rd:C.tx,G.oops===i?4:2);txt(g,G.icon,p.x,p.y-(t.n?r*.18:0),26);if(t.n)txt(g,String(t.n),p.x,p.y+r*.62,12,C.tx,800)});
  g.strokeStyle=C.tx;g.setLineDash([6,6]);g.lineWidth=1.5;g.beginPath();g.moveTo(8,H*.64);g.lineTo(W-8,H*.64);g.stroke();g.setLineDash([]);
  txt(g,G.said?'I said: '+NUM.slice(1,G.said+1).join(', '):'Tap or drag each one down here',W/2,H*.69,12,C.tx,600);
  if(G.hold)txt(g,G.icon,G.hold.x,G.hold.y,30)}
 if(v==='last'){const[e,n]=HOWMANY[G.solved]||HOWMANY[2];for(let i=0;i<n;i++){const x=W*(i+.5)/n,y=H*.3;txt(g,e,x,y,28);if(G.said>i)txt(g,NUM[i+1],x,y+r*1.1,13,C.tx,800)}
  txt(g,G.said>=n?'How many '+(e==='🍎'?'apples':e==='🚗'?'cars':'ladybirds')+'?':'Listen to the count…',W/2,H*.62,15,C.tx,800);
  for(let k=1;k<=5;k++){const w=(W-36)/5,x=6+(k-1)*(w+6);tile(g,x,H*.72,w,H*.2,A.alpha(C.or,G.picked===k?.45:.18),G.oops===k?C.rd:C.tx,G.oops===k?4:2);txt(g,String(k),x+w/2,H*.82,22,C.tx,800)}}
 if(v==='move'){G.stars.forEach((s,i)=>{if(G.hold&&G.hold.i===i)return;txt(g,'⭐',s.x,s.y,28)});if(G.hold)txt(g,'⭐',G.hold.x,G.hold.y,30);
  txt(g,'Moved '+G.moved+' of 2 times',W/2,H*.62,12,C.tx,600);txt(g,'How many stars now?',W/2,H*.7,15,C.tx,800);
  for(let k=4;k<=6;k++){const w=(W-30)/3,x=6+(k-4)*(w+6);tile(g,x,H*.76,w,H*.18,A.alpha(C.vi,.16),G.oops===k?C.rd:C.tx,G.oops===k?4:2);txt(g,String(k),x+w/2,H*.85,22,C.tx,800)}}
 if(v==='give'){const want=GIVE[G.solved]||GIVE[2];txt(g,'Put '+want+' on the plate',W/2,H*.08,16,C.tx,800);
  g.fillStyle=A.alpha(C.cy,.14);g.beginPath();g.ellipse(W*.3,H*.42,W*.24,H*.2,0,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();txt(g,'plate',W*.3,H*.68,11,C.tx,600);
  tile(g,W*.6,H*.2,W*.36,H*.44,A.alpha(C.or,.14),C.tx);txt(g,'basket',W*.78,H*.68,11,C.tx,600);
  for(let i=0;i<G.plate;i++)txt(g,'🍓',W*.3+((i%3)-1)*r*1.5,H*.36+Math.floor(i/3)*r*1.3,24);
  for(let i=0;i<7-G.plate;i++)txt(g,'🍓',W*.68+(i%3)*r*1.2,H*.3+Math.floor(i/3)*r*1.1,20);
  if(G.hold)txt(g,'🍓',G.hold.x,G.hold.y,26);txt(g,G.plate?'On the plate: '+NUM.slice(1,G.plate+1).join(', ')+(G.plate>5?' …':''):'Drag one at a time, and count',W/2,H*.8,13,C.tx,700);
  txt(g,'Done: '+G.solved+' of 3',W/2,H*.92,11,C.tx,600)}
 if(v==='glance'){const n=DICE[G.solved%5],s=Math.min(W*.42,H*.5),x=W/2-s/2,y=H*.06;tile(g,x,y,s,s,A.alpha(C.cy,.1),C.tx,3);
  if(G.flash!=='hide')PIPS[n].forEach(([u,w])=>{g.fillStyle=C.tx;g.beginPath();g.arc(x+u*s,y+w*s,s*.08,0,7);g.fill()});else txt(g,'?',W/2,y+s/2,30,C.tx,800);
  txt(g,'Right: '+G.solved+' of 3',W/2,H*.64,12,C.tx,600);
  for(let k=1;k<=5;k++){const w=(W-36)/5,bx=6+(k-1)*(w+6);tile(g,bx,H*.72,w,H*.2,A.alpha(C.gr,.16),G.oops===k?C.rd:C.tx,G.oops===k?4:2);txt(g,String(k),bx+w/2,H*.82,22,C.tx,800)}}
 A.fx.draw(g)}
const oops=t=>{A.sound.miss();speak(t);A.redraw()},yes=t=>{A.sound.pop();speak(t);buttons();A.redraw();G.want()};
function touch(i){G.hold=null;const t=G.things[i];if(!t)return A.redraw();
 if(t.n){G.oops=i;return oops(`That ${G.icon} has a number already: ${NUM[t.n]}. Count each one only once.`)}
 G.oops=-1;G.said++;t.n=G.said;A.sound.tick();const n=G.things.length;
 if(G.said<n){speak(NUM[G.said]+'…');buttons();return A.redraw()}
 const msg=`${NUM.slice(1,n+1).join(', ')}. The last number was ${NUM[n]}, so there are ${n}.`;G.round++;
 if(G.round<SETS.length){const k=G.tok;setTimeout(()=>{if(k===G.tok){setRound();buttons();A.redraw()}},A.reduced()?20:900)}yes(msg)}
function sayCount(){const n=(HOWMANY[G.solved]||HOWMANY[2])[1],gap=G.auto?200:320;G.said=0;G.picked=-1;const k=++G.tok;for(let i=1;i<=n;i++)setTimeout(()=>{if(k===G.tok){G.said=i;A.sound.tick();speak(NUM[i]+(i===n?'. How many?':'…'));A.redraw();if(i===n&&G.auto)setTimeout(()=>{if(k===G.tok)howMany(n)},A.reduced()?10:250)}},A.reduced()?i*8:i*gap)}
function howMany(k){const n=(HOWMANY[G.solved]||HOWMANY[2])[1];if(G.solved>=3||G.said<n)return;G.picked=k;
 if(k!==n){G.oops=k;return oops(k<n?`${k} is too few. We said ${NUM.slice(1,n+1).join(', ')}. The last word, ${NUM[n]}, is how many.`:`${k} is too many. The count stopped at ${NUM[n]}. The last word says how many.`)}
 G.oops=-1;G.solved++;yes(`Yes, ${n}! We stopped at ${NUM[n]}, so there are ${n}.`);if(G.solved<3){const t=G.tok;setTimeout(()=>{if(t===G.tok)sayCount()},A.reduced()?20:G.auto?500:800)}}
function shuffle(kind){starRow(kind);G.ready=true;G.oops=-1;A.sound.whoosh();speak(kind==='wide'?'Spread out. How many stars now?':kind==='tight'?'Squashed up. How many stars now?':'All mixed up. How many stars now?');buttons();A.redraw()}
function stars(k){if(!G.ready)return speak('Move the stars first.');if(k!==5){G.oops=k;return oops(k>5?`They look like more, but no star was added. Count them: still 5.`:`No star was taken away. Count them: still 5.`)}
 G.oops=-1;G.ready=false;G.moved++;yes('Still 5! Moving things does not change how many.')}
function addOne(){G.hold=null;if(G.plate>=7)return;G.plate++;A.sound.tick();speak(NUM[G.plate]||String(G.plate));buttons();A.redraw()}
function takeOne(){if(G.plate<1)return;G.plate--;speak('Put one back. Now '+G.plate+'.');buttons();A.redraw()}
function check(){const want=GIVE[G.solved];if(want==null)return;if(G.plate!==want)return oops(G.plate>want?`You gave ${G.plate}. Stop when you say ${NUM[want]}.`:`You gave ${G.plate}. Keep going until you say ${NUM[want]}.`);
 G.solved++;G.plate=0;yes(`${NUM.slice(1,want+1).join(', ')}. Stop! ${want} on the plate.`)}
function glance(k){const n=DICE[G.solved%5];if(G.solved>=3)return;if(k!==n){G.oops=k;G.flash='';return oops(`Look again. ${n===4?'2 on top and 2 below make 4.':n===5?'4 at the corners and 1 in the middle make 5.':n===3?'3 in a line.':'Count the dots.'}`)}
 G.oops=-1;G.solved++;G.flash='';yes(`Yes, ${n}! You saw it without counting.`);const t=++G.ft;if(G.solved<3)setTimeout(()=>{if(t===G.ft){G.flash='hide';A.redraw();setTimeout(()=>{if(t===G.ft){G.flash='';A.redraw()}},A.reduced()?10:700)}},A.reduced()?10:500)}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='touch')G.things.forEach((t,i)=>{if(!t.n)B(G.icon+' '+(i+1),()=>touch(i),'Count this one, number '+(i+1)+' from the left')});
 if(v==='last'||v==='glance')for(let k=1;k<=5;k++)B(String(k),()=>v==='last'?howMany(k):glance(k),'Answer '+k);
 if(v==='move'){B('↔ Spread out',()=>shuffle('wide'));B('🤏 Squash up',()=>shuffle('tight'));B('🔀 Mix up',()=>shuffle('mix'));[4,5,6].forEach(k=>B(String(k),()=>stars(k),k+' stars'))}
 if(v==='give'&&G.solved<3){B('🍓 Put one on',addOne,'Put one strawberry on the plate');B('↩ Take one off',takeOne,'Take one strawberry off');B('✔ That is it',check,'Check the plate')}}
function down(p){const v=mode(),r=R();
 if(v==='touch'){const i=G.things.findIndex(t=>!t.n&&near(p,t,r*1.1));if(i>=0){G.hold={i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}const j=G.things.findIndex(t=>t.n&&near(p,slot(t.n-1),r));if(j>=0)touch(j);return false}
 if(v==='move'){const i=G.stars.findIndex(s=>near(p,s,r*1.2));if(i>=0){G.hold={i,x:p.x,y:p.y};return true}for(let k=4;k<=6;k++){const w=(A.W-30)/3;if(inside(p,6+(k-4)*(w+6),A.H*.76,w,A.H*.18))stars(k)}return false}
 if(v==='give'){if(inside(p,A.W*.6,A.H*.2,A.W*.36,A.H*.44)&&G.solved<3){G.hold={x:p.x,y:p.y};return true}if(G.plate&&Math.hypot((p.x-A.W*.3)/(A.W*.24),(p.y-A.H*.42)/(A.H*.2))<1)takeOne();return false}
 if(v==='last'||v==='glance'){for(let k=1;k<=5;k++){const w=(A.W-36)/5;if(inside(p,6+(k-1)*(w+6),A.H*.72,w,A.H*.2))v==='last'?howMany(k):glance(k)}}return false}
function move(p){if(G.hold){G.hold.x=p.x;G.hold.y=p.y;A.redraw()}}
function up(p){const v=mode(),h=G.hold;if(!h)return;
 if(v==='touch'){const moved=Math.hypot(p.x-h.x0,p.y-h.y0);return moved<12||p.y>A.H*.62?touch(h.i):(G.hold=null,A.redraw())}
 if(v==='move'){G.stars[h.i].x=Math.max(20,Math.min(A.W-20,p.x));G.stars[h.i].y=Math.max(20,Math.min(A.H*.56,p.y));G.hold=null;G.ready=true;speak('You moved a star. How many stars now?');return A.redraw()}
 if(v==='give'){G.hold=null;return Math.hypot((p.x-A.W*.3)/(A.W*.24),(p.y-A.H*.42)/(A.H*.2))<1.2?addOne():A.redraw()}}
const ok=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const seq=(fns,ms)=>{const k=++G.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===G.tok)fn()},A.reduced()?j*30+30:(j+1)*ms))};
const clean=()=>{G.tok++;G.ft=(G.ft||0)+1;Object.assign(G,{auto:false,want:()=>{},round:0,things:[],said:0,oops:-1,solved:0,picked:-1,stars:[],moved:0,plate:0,flash:'',hold:null,ready:false})};
const steps=[
{h:'Touch and count',p:'Touch each one and say one number. Move it down so you know it is counted.',task:'Count the ducks, then the frogs',
 show:()=>{steps[0].go();const t=[0,1,2,3].map(i=>()=>touch(i));seq([...t,()=>{},()=>{},()=>{},...[0,1,2,3,4].map(i=>()=>touch(i))],330)},
 go:()=>{clean();setRound();speak('Touch a duck and say one.');buttons();G.want=ok(0,()=>G.round>=2,'Each one got one number, and none was counted twice.')}},
{h:'The last number',p:'Count, then say how many. The last number you say is how many there are.',
 predict:{q:'You count “one, two, three” apples. How many apples?',opts:['Count again to find out','3'],ans:1},task:'Say how many, 3 times',
 show:()=>{steps[1].go();G.auto=true;sayCount()},
 go:()=>{clean();sayCount();buttons();G.want=ok(1,()=>G.solved>=3,'The last number said tells you how many.')}},
{h:'Move them about',p:'Here are 5 stars. Spread them out, squash them up, or drag them. Then say how many.',
 predict:{q:'Spread the 5 stars out wide. How many now?',opts:['More than 5','Still 5'],ans:1},task:'Move the stars 2 times',
 show:()=>{steps[2].go();seq([()=>shuffle('wide'),()=>stars(5),()=>shuffle('tight'),()=>stars(5)],450)},
 go:()=>{clean();starRow('mix');speak('5 stars. Move them, then say how many.');buttons();G.want=ok(2,()=>G.moved>=2,'Still 5 every time. Moving does not change how many.')}},
{h:'Give me some',p:'Put strawberries on the plate. Count as you go, and stop at the number.',task:'Fill 3 plates',
 show:()=>{steps[3].go();const a=()=>addOne();seq([a,a,a,check,a,a,check,a,a,a,a,check],300)},
 go:()=>{clean();speak('Put 3 strawberries on the plate.');buttons();G.want=ok(3,()=>G.solved>=3,'You stopped right on the number each time.')}},
{h:'Quick look',p:'Some small groups you can see at once, like dots on a dice. Say how many without counting.',task:'Get 3 right',
 show:()=>{steps[4].go();seq([()=>glance(3),()=>{},()=>{},()=>{},()=>{},()=>glance(1),()=>{},()=>{},()=>{},()=>{},()=>glance(5)],330)},
 go:()=>{clean();speak('How many dots?');buttons();G.want=ok(4,()=>G.solved>=3,'Small groups can be seen at a glance.')}},
{h:'Challenge',p:'',go:()=>{clean();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.want()});
const QS=[['🍎🍎🍎🍎 Count the apples. How many?',[['4','ok'],['1, 2, 3, 4','list'],['5','extra']]],
 ['Tom counts 3 cars. Then he spreads them out. How many cars now?',[['3','ok'],['More than 3','spread'],['Fewer than 3','fewer']]],
 ['Mia counts one ball two times. What goes wrong?',[['She gets too many','ok'],['Nothing goes wrong','fine'],['She gets too few','few']]],
 ['“Give me 2 spoons.” When do you stop?',[['When I say two','ok'],['When the spoons run out','allout'],['After I say three','over']]],
 ['Which count of 5 bees is right?',[['1, 2, 3, 4, 5','ok'],['1, 2, 4, 5, 6','skip'],['1, 2, 3, 3, 4','again']]],
 ['🐟🐟🐟 Count from the other end. How many fish?',[['3','ok'],['A new number','order'],['1','first']]]];
function why(t){let m='Touch each one once, say one number each time, and the last number is how many.';
 if(t==='list')m='That is the counting. The question is how many: the last number, 4.';
 if(t==='extra')m='Only 4 apples. Did you count one twice? Touch each one once.';
 if(t==='spread')m='Spread out looks bigger, but no car was added. Still 3.';
 if(t==='fewer')m='No car was taken away. Moving them keeps 3.';
 if(t==='fine')m='Each thing gets only one number. Counting one twice adds one too many.';
 if(t==='few')m='Counting twice adds a number, so the total comes out too big, not too small.';
 if(t==='allout')m='Stop when you say the number you were asked for: two.';
 if(t==='over')m='Three is one too many. Stop at two.';
 if(t==='skip')m='This count skips 3, so it says 6 when there are only 5.';
 if(t==='again')m='This count says 3 twice. Each number is said once, in order.';
 if(t==='order')m='You can start at either end. Each fish still gets one number, so it is still 3.';
 if(t==='first')m='1 is the first number said. The last number, 3, is how many.';
 return m}
function nextQ(){qn++;const[q,ops]=QS[qn%QS.length],rot=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);A.redraw()}
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=t==='ok';
 if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(good?'✓ Yes! In a row: '+run+'.':'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=nextQ}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw:paint,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);clean();A.gest({down,move,up});buttons()}});
A.start()})})();
