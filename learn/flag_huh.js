/* Flagship – the feeling of not understanding (ages 6–7): sort sentences into "makes sense" or "huh?", tap the word
   where a sentence stopped making sense, follow a grown-up's instructions but press Huh? instead of guessing when a
   word is new, sort fix-ups that help from ones that hide the problem, and reread to pick the right meaning of a
   word with two meanings. Drag or tap on the canvas, or use the buttons. */
(()=>{
const SENSE=[['The cat sat on the mat.',0,'A cat can sit on a mat, so this one makes sense.'],
 ['The fish rode a bike to school.',1,'Fish cannot ride bikes. Your brain should say huh?'],
 ['I put on my socks, then my shoes.',0,'Socks go on first, then shoes. That makes sense.'],
 ['We drank our soup with a fork.',1,'A fork cannot hold soup, so this does not make sense.'],
 ['The sun is cold and dark.',1,'The sun is hot and bright. This does not make sense.'],
 ['Dad cut the bread with a knife.',0,'You can cut bread with a knife. It makes sense.']];
const SPOT=[['Mum put the milk in the fridge to keep it hot.',10,'A fridge keeps milk cold, not hot.'],
 ['The dog wagged its tail and said “meow”.',7,'Dogs say woof. Cats say meow.'],
 ['We wore big coats because it was so hot.',8,'Big coats are for cold days, not hot days.']];
const ROOM=[['📦','the box'],['🛏️','under the bed'],['🧺','the basket'],['📚','the shelf']];
const ASK=[['Put the ball in the box.','','',0],['Put the ball beneath the bed.','beneath','Beneath means under.',1],['Put the ball in the hamper.','hamper','A hamper is a big basket.',2]];
const FIX=[['🔁','Read it again',0],['🙋','Ask “What does that mean?”',0],['🖼️','Look at the picture',0],['🐢','Slow down',0],
 ['🤥','Pretend I get it',1,'Pretending hides the problem, so you stay stuck.'],['🏃','Race on fast',1,'Racing on makes it worse. Stop and fix it first.'],['📕','Shut the book',1,'If you give up, you never find out. Try a fix-up.']];
const TWO=[['The bat flew out of the cave.',['🏏','🦇'],['a cricket bat','a bat that flies'],1,'A cricket bat cannot fly. “Flew out of the cave” tells you it is the animal.'],
 ['The bark of the dog was loud.',['🐶','🌳'],['a dog’s woof','a tree’s bark'],0,'Tree bark makes no sound. “Of the dog” and “loud” tell you it is a woof.'],
 ['I need my glasses to read.',['🥛','👓'],['a glass of milk','glasses you wear'],1,'You cannot read with a glass of milk. “To read” tells you it is the glasses you wear.']];
VIS.reg('flaghuh',c=>{let A,ctl,cq,qn=-1,tok=0,row=0;c.fig.classList.add('young');
const base=()=>({then:()=>{},got:0,pile:[],kept:[],hold:null,wrong:-1,glow:-1,turn:0,asked:false,ball:null,note:''}),T=base();
const kind=()=>['sense','spot','ask','fix','two','quiz'][A.step],snap=()=>A.reduced();
const target=()=>({sense:4,spot:3,ask:3,fix:4,two:3}[kind()]||9);
const px=n=>Math.round(n*(A.narrow?1:1.15));
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function ink(g,t,x,y,n,col,mw,al){g.font=`800 ${px(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-12)}
function glyph(g,e,x,y,s){g.font=`${Math.round(s)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#111';g.fillText(e,x,y)}
function pill(g,r,fill,line,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=line;g.lineWidth=lw||2;g.stroke()}
const on=(p,r)=>p.x>r.x-6&&p.x<r.x+r.w+6&&p.y>r.y-6&&p.y<r.y+r.h+6;
const rim=()=>A.mix(A.col.tx,A.col.pn,.45),paper=()=>A.col.dark?'#1e293b':'#ffffff';
const dock=()=>{const w=Math.min(A.W*.9,440),h=A.H*.15;return{x:A.W/2-w/2,y:A.H*.8-h/2,w,h}};
const bins=()=>[0,1].map(i=>({x:A.W/2*i+6,y:A.H*.04,w:A.W/2-12,h:A.H*.6}));
/* lay the words of a sentence out as chips, wrapping onto new lines */
function chips(g){const words=SPOT[T.turn%3][0].split(' '),out=[],gap=8,h=Math.max(44,A.H*.11);g.font=`800 ${px(17)}px system-ui,sans-serif`;let x=12,y=A.H*.2;
 words.forEach(w=>{const ww=g.measureText(w).width+22;if(x+ww>A.W-12){x=12;y+=h+gap}out.push({w,x,y,w2:ww,h});x+=ww+gap});return out.map(o=>({t:o.w,x:o.x,y:o.y,w:o.w2,h:o.h}))}
const places=()=>{const w=(A.W-24)/2-8,h=A.H*.22;return ROOM.map((_,i)=>({x:12+(i%2)*(w+16),y:A.H*.06+Math.floor(i/2)*(h+12),w,h}))};
const ballHome=()=>({x:A.W/2,y:A.H*.78});
const panes=()=>{const w=(A.W-36)/2,h=A.H*.48;return[0,1].map(i=>({x:12+i*(w+12),y:A.H*.36,w,h}))};
const drops=()=>({sense:bins(),fix:bins(),ask:places()}[kind()]||[]);
function slip(g,label,r,bad){const C=A.col;pill(g,r,paper(),bad?C.rd:rim(),bad?4:2);ink(g,label,r.x+r.w/2,r.y+r.h/2,14,C.tx,r.w-14)}
const follow=r=>{const d=T.hold;return d&&d.x!=null?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r};
function drawBins(g,names,list,show){const C=A.col;bins().forEach((r,i)=>{pill(g,r,A.mix(C.pn,i?'#fde68a':'#bbf7d0',C.dark?.2:.6),i===T.glow?C.vi:rim(),i===T.glow?5:2);
  ink(g,names[i],r.x+r.w/2,r.y+22,14,C.tx,r.w-8);T.kept.filter(k=>k.at===i).forEach((k,j)=>show(g,k.k,r,j))});
 const k=T.pile[0];if(k!=null)slip(g,list(k),follow(dock()),T.wrong===k)}
function drawSense(g){drawBins(g,['✅ Makes sense','🤔 Huh?'],k=>SENSE[k][0],(g,k,r,j)=>glyph(g,SENSE[k][1]?'🤔':'✅',r.x+r.w*(.25+.5*(j%2)),r.y+r.h*(.42+.28*Math.floor(j/2)),Math.min(r.w*.22,40)))}
function drawFix(g){drawBins(g,['🔧 Helps me fix it','🙈 Does not help'],k=>FIX[k][0]+' '+FIX[k][1],(g,k,r,j)=>glyph(g,FIX[k][0],r.x+r.w*(.25+.5*(j%2)),r.y+r.h*(.42+.28*Math.floor(j/2)),Math.min(r.w*.22,40)))}
function drawSpot(g){const C=A.col;ink(g,T.got>T.turn?'Found it! 🔎':'Tap the word that makes it go wrong.',A.W/2,A.H*.08,14,C.mu);
 chips(g).forEach((r,i)=>{const hitW=T.got>T.turn&&i===SPOT[T.turn%3][1];pill(g,r,hitW?A.mix(C.pn,'#fecaca',C.dark?.3:.8):paper(),i===T.wrong?C.rd:i===T.glow||hitW?C.vi:rim(),hitW||i===T.wrong?4:2);ink(g,r.t,r.x+r.w/2,r.y+r.h/2,17,C.tx,r.w-6)});
 glyph(g,T.got>T.turn?'🤔':'📖',A.W/2,A.H*.82,Math.min(A.W*.14,60))}
function drawAsk(g){const C=A.col,R=ASK[T.turn%3];places().forEach((r,i)=>{pill(g,r,A.mix(C.pn,'#e0f2fe',C.dark?.15:.6),i===T.glow?C.vi:rim(),i===T.glow?5:2);glyph(g,ROOM[i][0],r.x+r.w/2,r.y+r.h*.42,Math.min(r.h*.5,52));ink(g,ROOM[i][1],r.x+r.w/2,r.y+r.h*.84,12,C.tx,r.w-8)});
 const y=A.H*.62;ink(g,'🧑 says: '+R[0],A.W/2,y,15,C.tx,A.W-16);if(T.asked&&R[1])ink(g,'💡 '+R[2],A.W/2,y+px(24),14,C.dark?'#86efac':'#166534',A.W-16);
 const b=T.ball||ballHome();if(T.got<=T.turn||T.got>=3)glyph(g,'⚽',b.x,b.y+A.H*.06,Math.min(A.W*.12,52))}
function drawTwo(g){const C=A.col,R=TWO[T.turn%3];ink(g,R[0],A.W/2,A.H*.12,17,C.tx,A.W-16);ink(g,'Which picture fits?',A.W/2,A.H*.24,13,C.mu);
 panes().forEach((r,i)=>{const good=T.got>T.turn&&i===R[3];pill(g,r,good?A.mix(C.pn,'#bbf7d0',C.dark?.3:.8):paper(),i===T.wrong?C.rd:good||i===T.glow?C.vi:rim(),good||i===T.wrong?4:2);glyph(g,R[1][i],r.x+r.w/2,r.y+r.h*.42,Math.min(r.w*.42,r.h*.5,90));ink(g,R[2][i],r.x+r.w/2,r.y+r.h*.86,13,C.tx,r.w-8)})}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.04:.3);g.fillRect(0,0,A.W,A.H);const m=kind();
 if(m==='sense')drawSense(g);if(m==='spot')drawSpot(g);if(m==='ask')drawAsk(g);if(m==='fix')drawFix(g);if(m==='two')drawTwo(g);
 if(m==='quiz'){glyph(g,'🤔',A.W/2,A.H*.4,Math.min(A.W*.25,110));ink(g,'Notice it. Stop. Fix it.',A.W/2,A.H*.75,16,C.tx)}A.fx.draw(g)}
function pulse(i){T.glow=i;const v=tok;setTimeout(()=>{if(v===tok){T.glow=-1;A.redraw()}},420)}
function nope(t){A.sound.miss();tell(t);A.redraw()}
function good(t){T.got++;T.wrong=-1;A.sound.pop();tell(t);pads();A.redraw();T.then()}
const later=f=>{const v=tok;setTimeout(()=>{if(v===tok)f()},snap()?20:700)};
/* sort the waiting card into bin i (sense or fix step) */
function bin(i){const k=T.pile[0];if(k==null||T.got>=4)return;pulse(i);const m=kind(),it=m==='sense'?SENSE[k]:FIX[k];
 if(it[1+(m==='fix')]!==i){T.wrong=k;return nope(m==='sense'?`Read it again. ${it[2]}`:i?`${it[1]} does help! It is a fix-up.`:`${it[1]}? ${it[3]}`)}
 T.kept.push({k:T.pile.shift(),at:i});good(m==='sense'?(i?`Yes, huh! ${it[2]} Good noticing.`:`Yes. ${it[2]}`):(i?`Right. ${it[3]}`:`Yes! ${it[1]} helps you fix a huh.`))}
/* tap word i in the sentence */
function word(i){if(T.got>T.turn||T.got>=3)return;pulse(i);const S=SPOT[T.turn%3],w=S[0].split(' ')[i];if(i!==S[1]){T.wrong=i;return nope(`“${w}” is fine here. Keep reading: which word made you say huh?`)}
 good(`Yes! “${w.replace(/[.”“]/g,'')}” is where it stopped making sense. ${S[2]}`);if(T.got<3)later(()=>{T.turn++;T.wrong=-1;pads();A.redraw()})}
/* the Huh? button: ask what the new word means */
function huh(){const R=ASK[T.turn%3];if(T.got>T.turn)return;if(!R[1])return nope('You know all these words, so you can just do it. Drag the ball to the box.');T.asked=true;tell(`Good asking! ${R[2]} Now drag the ball.`);pads();A.redraw()}
/* put the ball in place i */
function drop(i){const R=ASK[T.turn%3];T.ball=null;if(T.got>T.turn||T.got>=3)return;pulse(i);
 if(R[1]&&!T.asked){T.wrong=i;return nope(`You guessed! Did you know what “${R[1]}” means? Press Huh? to ask first.`)}
 if(i!==R[3])return nope(`Not ${ROOM[i][1]}. Listen again: ${R[0]}`);good(R[1]?`Yes! You asked, so you knew: ${R[2]}`:'Yes! You knew every word, so you did not need to ask.');if(T.got<3)later(()=>{T.turn++;T.asked=false;pads();A.redraw()})}
/* tap picture i for the word with two meanings */
function pick(i){const R=TWO[T.turn%3];if(T.got>T.turn||T.got>=3)return;pulse(i);if(i!==R[3]){T.wrong=i;return nope(`Read it again. ${R[4]}`)}
 good(`Yes! Reading again fixed it. ${R[4]}`);if(T.got<3)later(()=>{T.turn++;T.wrong=-1;pads();A.redraw()})}
function pads(){if(!ctl)return;ctl.innerHTML='';const m=kind();if(m==='quiz'||T.got>=target())return;const B=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},ctl,t);b.onclick=f};
 if((m==='sense'||m==='fix')&&T.pile.length){const it=m==='sense'?SENSE[T.pile[0]]:FIX[T.pile[0]],lab=m==='sense'?it[0]:it[1];(m==='sense'?[['✅ Makes sense',0],['🤔 Huh?',1]]:[['🔧 Helps',0],['🙈 Does not help',1]]).forEach(([t,i])=>B(t,`${lab}: ${t.slice(2)}`,()=>bin(i)))}
 if(m==='spot'&&T.got<=T.turn)SPOT[T.turn%3][0].split(' ').forEach((w,i)=>B(w,`The word ${w}`,()=>word(i)));
 if(m==='ask'&&T.got<=T.turn){if(!T.asked)B('🤔 Huh? What does that mean?','Huh? Ask what a word means',huh);ROOM.forEach(([e,n],i)=>B(e+' '+n,`Put the ball in ${n}`,()=>drop(i)))}
 if(m==='two'&&T.got<=T.turn)TWO[T.turn%3][2].forEach((n,i)=>B(TWO[T.turn%3][1][i]+' '+n,`It means ${n}`,()=>pick(i)))}
function down(p){const m=kind();if(m==='quiz'||T.got>=target())return false;
 if(m==='spot'){const i=chips(A.ctx).findIndex(r=>on(p,r));if(i>=0)word(i);return false}
 if(m==='two'){const i=panes().findIndex(r=>on(p,r));if(i>=0)pick(i);return false}
 if(m==='ask'){const b=ballHome();if(T.got<=T.turn&&Math.hypot(p.x-b.x,p.y-(b.y+A.H*.06))<A.W*.12){T.hold={ball:1,x:null,x0:p.x,y0:p.y};return true}const i=places().findIndex(r=>on(p,r));if(i>=0)drop(i);return false}
 if(T.pile.length&&on(p,dock())){T.hold={x:null,x0:p.x,y0:p.y};return true}const i=bins().findIndex(r=>on(p,r));if(i>=0&&T.pile.length)bin(i);return false}
function move(p){const d=T.hold;if(!d||(d.x==null&&Math.hypot(p.x-d.x0,p.y-d.y0)<=8))return;d.x=p.x;d.y=p.y;if(d.ball)T.ball={x:p.x,y:p.y-A.H*.06};A.redraw()}
function up(p){const d=T.hold;T.hold=null;if(!d)return;const i=drops().findIndex(r=>on(p,r));if(d.x==null||i<0){T.ball=null;tell(d.ball?'Drag the ball to a place, or tap a button.':'Drag the card into a box, or tap a button.');return A.redraw()}d.ball?drop(i):bin(i)}
const close=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(list,gap){const k=++tok;list.forEach((f,j)=>setTimeout(()=>{if(k===tok)f()},snap()?j*40+30:(j+1)*(gap||450)))}
const fresh=(pile,more)=>{tok++;Object.assign(T,base(),{pile},more||{})};
const steps=[
{h:'Does it make sense?',p:'Read each sentence. Does it make sense, or does your brain say huh? Drag it to a box.',predict:{q:'A sentence does not make sense. What do good readers do?',opts:['Keep reading fast','Stop and notice it'],ans:1},task:'Sort 4 sentences',
 show:()=>{steps[0].go();demo([0,1,2,3].map(()=>()=>bin(SENSE[T.pile[0]][1])))},go:()=>{fresh([0,1,2,3,4,5]);tell('The cat sat on the mat. Does it make sense?');pads();T.then=close(0,()=>T.got>=4,'Your brain can feel huh? when words do not fit. That feeling is useful!')}},
{h:'Where did it go wrong?',p:'Each sentence goes wrong at one word. Tap the word where you felt huh?',task:'Find 3 huh words',
 show:()=>{steps[1].go();demo([0,1,2].map(()=>()=>word(SPOT[T.turn%3][1])),1100)},go:()=>{fresh([]);tell('Mum put the milk in the fridge to keep it hot. Tap the huh word.');pads();T.then=close(1,()=>T.got>=3,'Spotting the exact word helps you know what to fix.')}},
{h:'Huh? Ask, do not guess',p:'Do what the grown-up says. If a word is new, press Huh? to ask what it means.',predict:{q:'You do not know a word the grown-up said. What should you do?',opts:['Guess and do something','Stop and ask what it means'],ans:1},task:'Do 3 jobs',
 show:()=>{steps[2].go();demo([()=>drop(0),()=>huh(),()=>drop(1),()=>huh(),()=>drop(2)],800)},go:()=>{fresh([]);tell('Put the ball in the box.');pads();T.then=close(2,()=>T.got>=3,'Asking “What does that mean?” is smart, not silly. Guessing can go wrong.')}},
{h:'Fix the huh',p:'When you feel huh?, what helps? Drag each card to helps or does not help.',predict:{q:'Feeling huh? means…',opts:['I am not clever','My brain found something to fix'],ans:1},task:'Sort 4 fix-ups',
 show:()=>{steps[3].go();demo([0,1,2,3].map(()=>()=>bin(FIX[T.pile[0]][2])))},go:()=>{fresh([4,0,5,1,6,2,3]);tell('Pretend I get it. Does it help?');pads();T.then=close(3,()=>T.got>=4,'Read it again, ask, look at the picture, or slow down. Pretending keeps you stuck.')}},
{h:'Read it again',p:'Some words mean two things. Read the whole sentence again, then tap the picture that fits.',task:'Fix 3 sentences',
 show:()=>{steps[4].go();demo([0,1,2].map(()=>()=>pick(TWO[T.turn%3][3])),1100)},go:()=>{fresh([]);tell('The bat flew out of the cave. Which picture fits?');pads();T.then=close(4,()=>T.got>=3,'Reading again, with the words around it, fixed the huh.')}},
{h:'Challenge',p:'',go:()=>{fresh([]);ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.then()});
const QS=[['Which sentence should make you say huh?',[['The cow flew to the shop.','ok'],['The cow ate grass.','fine'],['The cow said moo.','fine']]],
 ['You feel huh? while you read. What is a good thing to do?',[['Read it again','ok'],['Pretend you get it','pretend'],['Read on faster','race']]],
 ['The teacher says a word you do not know. What should you do?',[['Ask what it means','ok'],['Guess','guess'],['Say nothing','hide']]],
 ['Feeling huh? means…',[['My brain spotted a problem','ok'],['I am bad at reading','bad'],['The book is broken','broken']]],
 ['“I put on my coat because it was hot.” Which word makes it go wrong?',[['hot','ok'],['coat','coat'],['put','put']]]];
function fix(t){let m='Look back at the lab: notice the huh, stop, then fix it.';
 if(t==='fine')m='That one makes sense. A cow flying is the one that does not.';
 if(t==='pretend')m='Pretending hides the problem, so you stay stuck. Read it again.';
 if(t==='race')m='Going faster makes it worse. Slow down and read it again.';
 if(t==='guess')m='A guess can be wrong. Asking tells you for sure.';
 if(t==='hide')m='If you say nothing, no one knows you need help. Ask!';
 if(t==='bad')m='Everyone feels huh? sometimes. It means your brain is checking.';
 if(t==='broken')m='The book is fine. The huh feeling is your brain saying: stop and check.';
 if(t==='coat')m='A coat is fine to put on. Coats are for cold days, so “hot” is the huh word.';
 if(t==='put')m='“Put on” is fine. Read it again: a coat when it is hot? “Hot” is wrong.';return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;
 cq.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=cq.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>score(t)});tell('Challenge: '+q);A.redraw()}
function score(t){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Well done.':'✗ '+fix(t)}${ok?` Streak: ${row}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{cq.hidden=A.step!==5;ctl.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);cq=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pads()}});
A.start()})})();
