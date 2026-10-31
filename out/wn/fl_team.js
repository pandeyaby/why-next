/* Flagship – vocabulary of working with others (ages 5–8): cooperate (two friends lift a log one cannot), compromise
   (pick the plan that gives each friend a part), listen (tap the signs that show Bear is really listening), disagree
   respectfully (sort kind and unkind ways to say "I don't agree"), include (bring two left-out friends into the team
   so the tower grows). Every drag has a big button twin, and the canvas label says what just happened. */
(()=>{
const PLANS=[['Fox wants red paint. Owl wants blue.',['🦊🔴','🦉🔵'],[['🎨','Paint half red, half blue',1,'Each friend gets some of what they want. That is a compromise!'],['🦊','Fox gets red, Owl gets none',0,'Only Fox gets his way. A compromise gives each friend a part.'],['🚫','Stop and paint nothing',0,'Then nobody gets anything. Find a plan with a part for each friend.']]],
 ['Fox wants tag. Owl wants hide and seek.',['🦊🏃','🦉🙈'],[['⏱️','Tag first, then hide and seek',1,'Both games get a turn. That is a compromise!'],['📢','Shout until Owl gives up',0,'Shouting makes Owl give in. That is not a compromise. Each friend needs a part.'],['😞','Owl plays tag and feels sad',0,'Owl gave in and feels sad. A compromise means each friend gets some of what they want.']]]];
const EARS=[['👀','looks at Owl',1,'Yes! Bear looks at Owl. That shows he is listening.'],['🧸','plays with a toy',0,'Playing with a toy means Bear is not listening. Find a listening sign.'],
 ['🤐','waits his turn',1,'Yes! Bear waits until Owl has finished.'],['🗣️','talks over Owl',0,'Talking over Owl means Owl is not heard. Find a listening sign.'],['💬','says it back: “A bridge?”',1,'Yes! Saying it back shows Bear really heard the idea.']];
const SAY=[['🙂','“I see it a different way.”',0,'Kind words. You can not agree and still be kind.'],['😝','“Your idea is silly!”',1,'That hurts. Say what you think, not that their idea is silly.'],
 ['🤔','“What if we do both?”',0,'Kind! Asking “what if” helps the team find a plan.'],['😤','“No! Mine is best!”',1,'That is bossy. Say why you think it, in a calm voice.'],
 ['👍','“Good idea! Can we add a door?”',0,'Kind! You say what you like, then add your idea.'],['🙄','Roll your eyes',1,'Rolling your eyes is unkind, even with no words. Use kind words.']];
const OUT=[['🦆','Duck'],['🐭','Mouse']];
VIS.reg('flagteam',c=>{let A,pad,qb,qi=-1,gen=0,run=0;c.fig.classList.add('young');
const fresh=()=>({next:()=>{},n:0,got:[],deck:[],grab:null,bad:-1,glow:-1,round:0,lift:0}),S=fresh();
const mode=()=>['coop','plan','listen','kind','incl','quiz'][A.step],fast=()=>A.reduced();
const need=()=>({coop:2,plan:2,listen:3,kind:4,incl:2}[mode()]||99);
const sz=n=>Math.round(n*(A.narrow?1:1.12));
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function txt(g,t,x,y,n,col,mw){g.font=`800 ${sz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-10)}
/* one line if it fits the card, else two */
function txt2(g,t,x,y,n,col,mw){g.font=`800 ${sz(n)}px system-ui,sans-serif`;if(g.measureText(t).width<=mw)return txt(g,t,x,y,n,col,mw);
 const w=t.split(' '),h=Math.ceil(w.length/2),d=sz(n)*.6;txt(g,w.slice(0,h).join(' '),x,y-d,n,col,mw);txt(g,w.slice(h).join(' '),x,y+d,n,col,mw)}
function emo(g,e,x,y,s){g.font=`${Math.round(s)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
function card(g,r,fill,line,w){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=w||2;g.strokeStyle=line;g.stroke()}
const inR=(p,r)=>r&&p.x>=r.x-5&&p.x<=r.x+r.w+5&&p.y>=r.y-5&&p.y<=r.y+r.h+5;
const ink=()=>A.mix(A.col.tx,A.col.pn,.4),paper=()=>A.col.dark?'#1e293b':'#fff',soft=(h,k)=>A.mix(A.col.pn,h,A.col.dark?.22:k||.65);
const sq=k=>{const s=Math.min(A.W*.2,A.H*.24,92);return s*(k||1)};
/* layout */
const log=()=>({x:A.W*.22,y:A.H*(.42-.2*S.lift),w:A.W*.56,h:A.H*.1});
const grip=j=>{const L=log(),s=sq(.9);return{x:L.x+(j?L.w:0)-s/2,y:L.y+L.h+4,w:s,h:s}};
const homeF=k=>{const s=sq(.9);return{x:k?A.W*.86-s/2:A.W*.14-s/2,y:A.H*.78,w:s,h:s}};
const planBox=()=>{const w=Math.min(A.W*.5,240);return{x:A.W/2-w/2,y:A.H*.22,w,h:A.H*.3}};
const planCards=()=>{const w=(A.W-24)/3-8;return[0,1,2].map(i=>({x:12+i*(w+8)+4,y:A.H*.68,w,h:A.H*.26}))};
const earSpot=i=>{const s=sq(.82),u=[.12,.31,.5,.69,.88][i];return{x:A.W*u-s/2,y:A.H*.66,w:s,h:s}};
const bins=()=>[0,1].map(i=>({x:A.W/2*i+6,y:A.H*.04,w:A.W/2-12,h:A.H*.6}));
const waitCard=()=>{const w=Math.min(A.W*.88,360);return{x:A.W/2-w/2,y:A.H*.71,w,h:A.H*.2}};
const ring=()=>({x:A.W/2,y:A.H*.42,r:Math.min(A.W*.25,A.H*.3)});
const ringBox=()=>{const R=ring();return{x:R.x-R.r,y:R.y-R.r,w:R.r*2,h:R.r*2}};
const outF=k=>{const s=sq(.9);return{x:(k?A.W*.9:A.W*.1)-s/2,y:A.H*.8-s/2,w:s,h:s}};
const at=r=>{const d=S.grab;return d&&d.x!=null?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r};
function drawCoop(g){const C=A.col,L=log();g.fillStyle=C.dark?'#14532d':'#dcfce7';g.fillRect(0,A.H*.62,A.W,A.H*.38);
 g.fillStyle='#92400e';A.paint.rrect(L.x,L.y,L.w,L.h,L.h/2);g.fill();g.strokeStyle='#451a03';g.lineWidth=2;g.stroke();
 txt(g,S.lift?'Up it goes! 🎉':'Big, heavy log',A.W/2,L.y-18,14,C.tx);
 [0,1].forEach(j=>{if(S.got[j]==null){const r=grip(j);g.setLineDash([6,5]);card(g,r,A.alpha(C.vi,.07),j===S.glow?C.vi:ink(),j===S.glow?4:2);g.setLineDash([]);txt(g,'hold',r.x+r.w/2,r.y+r.h/2,12,C.mu)}});
 ['🦊','🐻'].forEach((e,k)=>{const j=S.got.indexOf(k),r=j>=0?grip(j):S.grab&&S.grab.k===k?at(homeF(k)):homeF(k);emo(g,e,r.x+r.w/2,r.y+r.h/2,r.w*.7)})}
function drawPlan(g){const C=A.col,P=PLANS[S.round%2],B=planBox();txt2(g,P[0],A.W/2,A.H*.08,14,C.tx,A.W-20);
 emo(g,P[1][0],A.W*.12,A.H*.36,Math.min(A.W*.09,44));emo(g,P[1][1],A.W*.88,A.H*.36,Math.min(A.W*.09,44));
 g.setLineDash([6,6]);card(g,B,A.alpha(C.vi,.08),S.glow===0?C.vi:ink(),S.glow===0?4:2);g.setLineDash([]);
 txt2(g,S.n>S.round?'Both are happy! 😊':'Our plan?',B.x+B.w/2,B.y+B.h/2,14,C.tx,B.w-10);
 if(S.n<=S.round)planCards().forEach((b,i)=>{const it=P[2][S.deck[i]],r=S.grab&&S.grab.k===i?at(b):b;card(g,r,paper(),S.bad===i?C.rd:ink(),S.bad===i?4:2);
  emo(g,it[0],r.x+r.w/2,r.y+r.h*.28,r.h*.3);txt2(g,it[1],r.x+r.w/2,r.y+r.h*.7,12,C.tx,r.w-8)})}
function drawListen(g){const C=A.col;emo(g,'🦉',A.W*.16,A.H*.2,Math.min(A.W*.14,64));emo(g,'🐻',A.W*.84,A.H*.2,Math.min(A.W*.14,64));
 const b={x:A.W*.28,y:A.H*.07,w:A.W*.44,h:A.H*.24};card(g,b,paper(),ink());txt2(g,'“Let’s build a bridge!”',b.x+b.w/2,b.y+b.h/2,13,C.tx,b.w-10);
 txt(g,`Listening signs: ${S.n} of 3`,A.W/2,A.H*.5,14,C.tx);
 EARS.forEach((it,i)=>{const r=earSpot(i),on=S.got.includes(i);card(g,r,on?soft('#bbf7d0'):paper(),i===S.bad?C.rd:i===S.glow?C.vi:on?C.gr:ink(),on||i===S.bad||i===S.glow?4:2);emo(g,it[0],r.x+r.w/2,r.y+r.h/2,r.w*.55);txt(g,['looks','toy','waits','talks over','says back'][i],r.x+r.w/2,r.y+r.h+14,11,C.tx,r.w+8)})}
function drawKind(g){const C=A.col;bins().forEach((r,i)=>{card(g,r,soft(i?'#fecaca':'#bbf7d0',.6),i===S.glow?C.vi:ink(),i===S.glow?5:2);
  txt(g,i?'👎 Unkind':'👍 Kind way',r.x+r.w/2,r.y+22,14,C.tx,r.w-8);S.got.filter(p=>p.bin===i).forEach((p,j)=>emo(g,SAY[p.k][0],r.x+r.w*(.25+.5*(j%2)),r.y+r.h*(.38+.26*Math.floor(j/2)),Math.min(r.w*.24,44)))});
 const k=S.deck[0];if(k!=null){const r=at(waitCard());card(g,r,paper(),S.bad===k?C.rd:ink(),S.bad===k?4:2);emo(g,SAY[k][0],r.x+r.h*.5,r.y+r.h/2,r.h*.5);txt2(g,SAY[k][1],r.x+r.h+(r.w-r.h)/2,r.y+r.h/2,13,C.tx,r.w-r.h-8)}}
function drawIncl(g){const C=A.col,R=ring();g.beginPath();g.arc(R.x,R.y,R.r,0,7);g.fillStyle=soft('#fde68a',.55);g.fill();g.lineWidth=S.glow===0?5:2;g.strokeStyle=S.glow===0?C.vi:ink();g.stroke();
 const team=['🦊','🦉','🐻',...S.got.map(k=>OUT[k][0])];team.forEach((e,i)=>{const a=-Math.PI/2+i*2*Math.PI/team.length;emo(g,e,R.x+Math.cos(a)*R.r*.68,R.y+Math.sin(a)*R.r*.68,R.r*.32)});
 for(let i=0;i<2+S.got.length;i++){const w=R.r*.36,h=R.r*.14;g.fillStyle=['#ef4444','#3b82f6','#eab308','#22c55e'][i%4];g.fillRect(R.x-w/2,R.y+R.r*.18-i*h,w,h-2)}
 txt(g,S.got.length>=2?'Everyone has a job! 🎉':`Tower: ${2+S.got.length} blocks`,A.W/2,A.H*.92,14,C.tx);
 OUT.forEach((it,k)=>{if(S.got.includes(k))return;const r=S.grab&&S.grab.k===k?at(outF(k)):outF(k);emo(g,it[0],r.x+r.w/2,r.y+r.h/2,r.w*.7);txt(g,'on my own',r.x+r.w/2,r.y-10,11,C.mu,r.w+30)})}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.04:.35);g.fillRect(0,0,A.W,A.H);
 ({coop:drawCoop,plan:drawPlan,listen:drawListen,kind:drawKind,incl:drawIncl,quiz:drawIncl}[mode()])(g);A.fx.draw(g)}
function flash(i){S.glow=i;const v=gen;setTimeout(()=>{if(v===gen){S.glow=-1;A.redraw()}},420)}
function no(t){A.sound.miss();tell(t);A.redraw()}
function ok(t){S.n++;S.bad=-1;A.sound.pop();tell(t);keys();A.redraw();S.next()}
/* a friend takes an end of the log */
function hold(k){if(S.got.includes(k)||S.n>=2)return;flash(S.got.length);S.got.push(k);
 if(S.got.length<2)return ok(`${k?'Bear':'Fox'} pulls and pulls. The log will not lift! It is too heavy for one friend.`);
 A.tween(S,{lift:1},700,'out');ok('They cooperate: two friends work together, and the log lifts!')}
/* try plan card j for this round */
function pick(j){if(S.n>=2||S.n>S.round)return;flash(0);const it=PLANS[S.round%2][2][S.deck[j]];if(!it[2]){S.bad=j;return no(it[3])}
 const v=gen;ok(it[3]);if(S.n<2)setTimeout(()=>{if(v===gen){S.round++;S.deck=[2,0,1];S.bad=-1;keys();A.redraw()}},fast()?20:900)}
function ear(i){if(S.n>=3||S.got.includes(i))return;flash(i);const it=EARS[i];if(!it[2]){S.bad=i;return no(it[3])}S.got.push(i);ok(it[3]+(S.n>=2?' Bear is really listening.':''))}
function sortTo(bin){const k=S.deck[0];if(k==null||S.n>=4)return;flash(bin);const it=SAY[k];
 if(it[2]!==bin){S.bad=k;return no(bin?`That one is kind! ${it[3]}`:`Not kind. ${it[3]}`)}S.got.push({k:S.deck.shift(),bin});ok(it[3])}
function bring(k){if(S.got.includes(k))return;flash(0);S.got.push(k);ok(`“Come and help us, ${OUT[k][1]}!” You include ${OUT[k][1]}. Now ${OUT[k][1]} has a job and the tower grows.`)}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode();if(m==='quiz'||S.n>=need())return;
 const B=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},pad,t);b.onclick=f};
 if(m==='coop')[['🦊 Fox',0],['🐻 Bear',1]].forEach(([t,k])=>{if(!S.got.includes(k))B(t+': hold the log',`${t.slice(3)} holds an end of the log`,()=>hold(k))});
 if(m==='plan'&&S.n<=S.round)S.deck.forEach((d,j)=>{const it=PLANS[S.round%2][2][d];B(it[0]+' '+it[1],`Plan: ${it[1]}`,()=>pick(j))});
 if(m==='listen')EARS.forEach((it,i)=>{if(!S.got.includes(i))B(it[0]+' Bear '+it[1],`Bear ${it[1]}`,()=>ear(i))});
 if(m==='kind'&&S.deck.length)[['👍 Kind',0],['👎 Unkind',1]].forEach(([t,i])=>B(t,`${SAY[S.deck[0]][1]}: ${t.slice(3)}`,()=>sortTo(i)));
 if(m==='incl')OUT.forEach((it,k)=>{if(!S.got.includes(k))B(`${it[0]} Ask ${it[1]} to join`,`Ask ${it[1]} to join the team`,()=>bring(k))})}
/* which thing on the canvas can be picked up, and where it may land */
function grabAt(p){const m=mode();
 if(m==='coop')return[0,1].find(k=>!S.got.includes(k)&&inR(p,homeF(k)));
 if(m==='plan'&&S.n<=S.round){const j=planCards().findIndex(r=>inR(p,r));return j<0?undefined:j}
 if(m==='kind'&&S.deck.length&&inR(p,waitCard()))return S.deck[0];
 if(m==='incl')return[0,1].find(k=>!S.got.includes(k)&&inR(p,outF(k)))}
function drop(k,p,moved){const m=mode();
 if(m==='coop'){if(moved&&!(inR(p,grip(0))||inR(p,grip(1)))){tell('Drag the friend to an end of the log.');return A.redraw()}return hold(k)}
 if(m==='plan'){if(moved&&!inR(p,planBox())){tell('Drag the plan into the middle box, or tap a button.');return A.redraw()}return pick(k)}
 if(m==='kind'){const i=bins().findIndex(r=>inR(p,r));if(!moved||i<0){tell('Drag the words into a box, or tap a box.');return A.redraw()}return sortTo(i)}
 if(m==='incl'){if(moved&&!inR(p,ringBox())){tell('Drag the friend into the circle.');return A.redraw()}return bring(k)}}
function down(p){const m=mode();if(m==='quiz'||S.n>=need())return false;
 if(m==='listen'){const i=EARS.findIndex((_,j)=>inR(p,earSpot(j)));if(i>=0)ear(i);return false}
 const k=grabAt(p);if(k!=null){S.grab={k,x:null,x0:p.x,y0:p.y};return true}
 if(m==='kind'){const i=bins().findIndex(r=>inR(p,r));if(i>=0)sortTo(i)}return false}
function move(p){const d=S.grab;if(d&&(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8)){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.grab;S.grab=null;if(d)drop(d.k,p,d.x!=null)}
const end=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,ms){const k=++gen;list.forEach((f,j)=>setTimeout(()=>{if(k===gen)f()},fast()?j*40+30:(j+1)*(ms||450)))}
const begin=(deck,more)=>{gen++;S.lift=0;Object.assign(S,fresh(),{deck},more||{})};
const steps=[
{h:'Cooperate',p:'Fox and Bear want to move a big log to their den. Drag each friend to an end of the log.',predict:{q:'Can Fox lift the big log on his own?',opts:['Yes, Fox is strong','No, Fox needs a friend'],ans:1},task:'Lift the log',
 show:()=>{steps[0].go();play([()=>hold(0),()=>hold(1)],700)},go:()=>{begin([]);tell('Drag Fox to an end of the log.');keys();S.next=end(0,()=>S.n>=2,'Cooperate means working together on one job.')}},
{h:'Compromise',p:'Fox and Owl want different things. Drag the plan that is fair to both friends into the middle.',predict:{q:'What is a compromise?',opts:['One friend gets their way','Each friend gets some of what they want'],ans:1},task:'Find 2 compromises',
 show:()=>{steps[1].go();play([()=>pick(S.deck.indexOf(0)),()=>pick(S.deck.indexOf(0))],1100)},go:()=>{begin([1,0,2]);tell(PLANS[0][0]+' Pick a plan.');keys();S.next=end(1,()=>S.n>=2,'A compromise gives each friend a part of what they want.')}},
{h:'Listen',p:'Owl has an idea. Is Bear listening? Tap the 3 signs that show Bear is really listening.',task:'Find 3 listening signs',
 show:()=>{steps[2].go();play([()=>ear(0),()=>ear(2),()=>ear(4)])},go:()=>{begin([]);tell('Owl says: let’s build a bridge! Tap a listening sign.');keys();S.next=end(2,()=>S.n>=3,'Listening means looking, waiting, and saying back what you heard.')}},
{h:'Disagree kindly',p:'Friends do not always agree. Drag each card to a kind way or an unkind way to say “I don’t agree.”',task:'Sort 4 cards',
 show:()=>{steps[3].go();play([0,1,2,3].map(()=>()=>sortTo(SAY[S.deck[0]][2])))},go:()=>{begin([0,1,2,3,4,5]);tell('Drag the card: I see it a different way.');keys();S.next=end(3,()=>S.n>=4,'You can disagree and still be kind: say what you think, calmly.')}},
{h:'Include',p:'Duck and Mouse are on their own. Drag each one into the team circle to include them.',predict:{q:'Duck is on her own. What does include mean?',opts:['Let Duck watch from far away','Ask Duck to join and give her a job'],ans:1},task:'Include 2 friends',
 show:()=>{steps[4].go();play([()=>bring(0),()=>bring(1)],700)},go:()=>{begin([]);tell('Duck and Mouse are on their own. Drag one into the circle.');keys();S.next=end(4,()=>S.got.length>=2,'Include means asking others to join, so nobody is left out.')}},
{h:'Challenge',p:'',go:()=>{begin([],{got:[0,1]});quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.next()});
const QS=[['Two friends carry a heavy box together. Which word is that?',[['Cooperate','ok'],['Compromise','comp'],['Include','incl']]],
 ['Mia wants to draw. Sam wants to build. Which plan is a compromise?',[['Draw first, then build','ok'],['Only draw. Sam must agree','givein'],['Nobody plays','nobody']]],
 ['How do you show you are listening?',[['Look at the talker and wait','ok'],['Talk over them','over'],['Play with a toy','toy']]],
 ['You do not agree with your friend’s idea. What can you say?',[['“I see it a different way.”','ok'],['“Your idea is silly!”','rude'],['Say nothing and sulk','sulk']]],
 ['A new child is on her own. How can you include her?',[['“Come and play with us!”','ok'],['Let her watch','watch'],['“We are full. Go away.”','away']]]];
function why(t){let m='Look back at the lab: cooperate, compromise, listen, disagree kindly and include.';
 if(t==='comp')m='A compromise is a fair plan when friends want different things. Working together on one job is cooperate.';
 if(t==='incl')m='Include means asking someone to join. Working together to carry it is cooperate.';
 if(t==='givein')m='Then Sam just gives in. A compromise gives each friend some of what they want.';
 if(t==='nobody')m='If nobody plays, nobody gets anything. A compromise has a part for each friend.';
 if(t==='over')m='Talking over someone means they are not heard. Look at them and wait.';
 if(t==='toy')m='Playing with a toy shows you are not listening. Look at the talker.';
 if(t==='rude')m='Calling an idea silly hurts. Say what you think in a kind way.';
 if(t==='sulk')m='Sulking does not tell your friend what you think. Use kind words.';
 if(t==='watch')m='Watching from far away still leaves her out. Ask her to join.';
 if(t==='away')m='That leaves her out and feels unkind. Include her: ask her to join.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 qb.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qb.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){qb.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qb.querySelector('.fl-fb'),good=t==='ok';
 if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes! Great teamwork.':'✗ '+why(t)}${good?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{qb.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qb=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
A.start()})})();
