/* Flagship – asking to join in (ages 4–5): watch a game of shops first and tap the clues that tell you the game,
   sort kind and unkind ways to ask, give an idea that fits the game (shops, pirates, a den), cheer Bo up after
   "not now" by picking good things to do next, then put the four join-in steps in order. Drag or tap, big buttons. */
(()=>{
const CLUE=[['🍎','apples',1,'Apples to sell. That looks like a shop!'],['🪙','coins',1,'Coins to pay with. They are playing shops.'],
 ['🧺','a basket',1,'A basket for shopping. Someone is buying things.'],['🐦','a bird',0,'A bird! It does not tell you the game. Look at what the children have.'],
 ['☁️','a cloud',0,'A cloud does not tell you the game. Look at the things on the table.']];
const ASKS=[['🙋','“Can I play?”',0,'Kind words help them say yes.'],['✋','Grab the apples',1,'Grabbing spoils their game. Use words to ask.'],
 ['📢','Shout “ME! ME!”',1,'Shouting is too loud. Use a calm, kind voice.'],['😊','“That looks fun! Can I join?”',0,'Saying what you like about the game is a great way to ask.'],
 ['🙈','Hide and say nothing',1,'They do not know you want to play. Say it with words.'],['🧒','“Can I be in your game?”',0,'Clear, kind words. Now they know what you want.']];
const GAMES=[['🏪','Shops',[['🛒','“I can be the shopper!”',1,''],['⚽','“Let’s play football!”',0,'That is a new game. Pick a part in their game of shops.'],['👑','“I am the boss now!”',0,'Bossing spoils it. Ask for a part, like the shopper.']]],
 ['🏴‍☠️','Pirate ship',[['🦜','“I can be the parrot!”',1,''],['📺','“Let’s watch TV!”',0,'TV is not part of the pirate game. Give a pirate idea.'],['🚫','“Pirates are silly.”',0,'That might hurt their feelings. Say an idea for the ship.']]],
 ['⛺','Building a den',[['🧣','“I can hold the blanket!”',1,''],['💥','Knock the den down',0,'Knocking it down spoils their work. Give a helping idea.'],['🛌','“I want a nap.”',0,'That does not help the den. Say how you can help build it.']]]];
const CALM=[['🌬️','Take a big breath',1],['🧩','Find another game',1],['🙋','Ask someone else to play',1],['⏰','Ask again later',1],
 ['🏗️','Knock their game over',0,'That would spoil their game and make everyone sad. Try something kind.'],['😠','Shout “You are mean!”',0,'“Not now” is not mean. It just means not yet. Try a calm idea.']];
const ORDER=[['👀','Watch'],['🙋','Ask'],['💡','Give an idea'],['🎉','Play']];
const FACE=['😢','😕','🙂','😊'];
VIS.reg('flagentry',c=>{let A,pad,qbox,qi=-1,gen=0,run=0;c.fig.classList.add('young');
const blank=()=>({next:()=>{},n:0,deck:[],got:[],grab:null,bad:-1,lit:-1,round:0,mood:0,slots:1,note:''}),S=blank();
const M=()=>['look','ask','idea','calm','order','quiz'][A.step],quick=()=>A.reduced();
const goal=()=>({look:3,ask:4,idea:3,calm:3,order:3}[M()]||9);
const big=n=>Math.round(n*(A.narrow?1:1.15));
function speak(t){c.say(t);A&&A.cv.setAttribute('aria-label',t)}
function word(g,t,x,y,n,col,mw){g.font=`800 ${big(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-12)}
/* two short lines when a card is too narrow for one */
function lines(g,t,x,y,n,col,mw){g.font=`800 ${big(n)}px system-ui,sans-serif`;if(g.measureText(t).width<=mw)return word(g,t,x,y,n,col,mw);const w=t.split(' '),h=Math.ceil(w.length/2),d=big(n)*.62;
 word(g,w.slice(0,h).join(' '),x,y-d,n,col,mw);word(g,w.slice(h).join(' '),x,y+d,n,col,mw)}
function pic(g,e,x,y,s){g.font=`${Math.round(s)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#111';g.fillText(e,x,y)}
function tile(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();g.strokeStyle=edge;g.lineWidth=lw||2;g.stroke()}
const hit=(p,r)=>p.x>r.x-6&&p.x<r.x+r.w+6&&p.y>r.y-6&&p.y<r.y+r.h+6;
const edge=()=>A.mix(A.col.tx,A.col.pn,.45),card=()=>A.col.dark?'#1e293b':'#ffffff';
/* where things sit on the canvas */
const home=()=>{const w=Math.min(A.W*.84,340),h=A.H*.13;return{x:A.W/2-w/2,y:A.H*.82-h/2,w,h}};
const halves=()=>[0,1].map(i=>({x:A.W/2*i+6,y:A.H*.05,w:A.W/2-12,h:A.H*.62}));
const spots=()=>[[.2,.6],[.5,.6],[.8,.6],[.16,.16],[.84,.14]].map(([u,v])=>{const s=Math.min(A.W*.2,A.H*.2,96);return{x:A.W*u-s/2,y:A.H*v-s/2,w:s,h:s}});
const gap=()=>{const s=Math.min(A.W*.3,A.H*.3,140);return{x:A.W/2-s/2,y:A.H*.2,w:s,h:s*.82}};
const ideaCards=()=>{const n=3,w=(A.W-24)/n-8,h=A.H*.2;return[0,1,2].map(i=>({x:12+i*(w+8)+4,y:A.H*.7,w,h}))};
const calmCards=()=>{const cols=A.narrow?2:3,w=(A.W-20)/cols-8,h=A.H*(A.narrow?.12:.15);return CALM.map((_,i)=>({x:10+(i%cols)*(w+8)+4,y:A.H*.42+Math.floor(i/cols)*(h+8),w,h}))};
const rowSlots=()=>{const w=(A.W-20)/4-8,h=A.H*.3;return[0,1,2,3].map(i=>({x:10+i*(w+8)+4,y:A.H*.1,w,h}))};
const drops=()=>({ask:halves(),idea:[gap()],order:rowSlots()}[M()]||[]);
function held(g,item,r,wrong){const C=A.col;tile(g,r,card(),wrong?C.rd:edge(),wrong?4:2);pic(g,item[0],r.x+r.h*.5,r.y+r.h/2,r.h*.55);word(g,item[1],r.x+r.h*.95+(r.w-r.h*.95)/2,r.y+r.h/2,13,C.tx,r.w-r.h*1.1)}
function moved(r){const d=S.grab;return d&&d.x!=null?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r}
function drawLook(g){const C=A.col,W=A.W,H=A.H;g.fillStyle=C.dark?'#1e3a5f':'#dbeafe';g.fillRect(0,0,W,H*.55);g.fillStyle=C.dark?'#14532d':'#bbf7d0';g.fillRect(0,H*.55,W,H*.45);
 const t={x:W*.1,y:H*.7,w:W*.8,h:H*.08};g.fillStyle='#b45309';g.fillRect(t.x,t.y,t.w,t.h);pic(g,'🧒',W*.36,H*.42,Math.min(W*.13,64));pic(g,'👧',W*.64,H*.42,Math.min(W*.13,64));
 spots().forEach((r,i)=>{const on=S.got.includes(i);if(on){g.strokeStyle=C.dark?'#4ade80':'#15803d';g.lineWidth=4;g.beginPath();g.arc(r.x+r.w/2,r.y+r.h/2,r.w*.55,0,7);g.stroke()}
  if(i===S.lit){g.strokeStyle=C.vi;g.lineWidth=4;g.strokeRect(r.x,r.y,r.w,r.h)}pic(g,CLUE[i][0],r.x+r.w/2,r.y+r.h/2,r.w*.6)});
 pic(g,'🐻',W*.08,H*.9,Math.min(W*.1,48));word(g,`Clues found: ${S.got.filter(i=>CLUE[i][2]).length} of 3`,W*.56,H*.9,14,C.dark?'#f8fafc':'#14532d')}
function drawAsk(g){const C=A.col;halves().forEach((r,i)=>{tile(g,r,i?A.mix(C.pn,'#fecaca',C.dark?.2:.6):A.mix(C.pn,'#bbf7d0',C.dark?.2:.6),i===S.lit?C.vi:edge(),i===S.lit?5:2);
  word(g,i?'👎 Not a good way':'👍 Good way to ask',r.x+r.w/2,r.y+22,14,C.tx,r.w-8);S.got.filter(p=>p.at===i).forEach((p,j)=>pic(g,ASKS[p.k][0],r.x+r.w*(.25+.5*(j%2)),r.y+r.h*(.4+.28*Math.floor(j/2)),Math.min(r.w*.24,44)))});
 const k=S.deck[0];if(k!=null)held(g,ASKS[k],moved(home()),S.bad===k)}
function drawIdea(g){const C=A.col,G=GAMES[S.round%3],r=gap();pic(g,G[0],A.W*.2,A.H*.32,Math.min(A.W*.16,72));pic(g,'🧒',A.W*.8,A.H*.28,Math.min(A.W*.12,56));pic(g,'👧',A.W*.8,A.H*.46,Math.min(A.W*.12,56));
 word(g,`They are playing: ${G[1]}`,A.W/2,A.H*.08,15,C.tx);g.setLineDash([6,6]);tile(g,r,A.alpha(C.vi,.08),S.lit===0?C.vi:edge(),S.lit===0?5:2);g.setLineDash([]);
 word(g,S.n>S.round?'You are in! 🎉':'Your idea?',r.x+r.w/2,r.y+r.h/2,14,C.tx,r.w-8);
 if(S.n<=S.round&&S.n<3)ideaCards().forEach((b,i)=>{const it=G[2][S.deck[i]];const rr=S.grab&&S.grab.k===i?moved(b):b;tile(g,rr,card(),S.bad===i?C.rd:edge(),S.bad===i?4:2);pic(g,it[0],rr.x+rr.w/2,rr.y+rr.h*.3,rr.h*.34);lines(g,it[1],rr.x+rr.w/2,rr.y+rr.h*.72,12,C.tx,rr.w-8)})}
function drawCalm(g){const C=A.col;pic(g,FACE[S.mood],A.W*.22,A.H*.2,Math.min(A.W*.18,80));word(g,'Bo heard “Not now.”',A.W*.62,A.H*.13,15,C.tx,A.W*.6);word(g,S.mood>=3?'Bo feels OK again!':'What can Bo do?',A.W*.62,A.H*.27,14,C.mu,A.W*.6);
 calmCards().forEach((r,i)=>{const on=S.got.includes(i);tile(g,r,on?A.mix(C.pn,'#bbf7d0',C.dark?.25:.7):card(),i===S.bad?C.rd:i===S.lit?C.vi:edge(),i===S.bad||i===S.lit?4:2);pic(g,CALM[i][0],r.x+r.h*.45,r.y+r.h/2,r.h*.5);lines(g,CALM[i][1],r.x+r.h*.9+(r.w-r.h*.9)/2,r.y+r.h/2,12,C.tx,r.w-r.h*1.05)})}
function drawOrder(g){const C=A.col;rowSlots().forEach((r,i)=>{const on=i<S.slots,nx=i===S.slots;tile(g,r,on?A.mix(C.pn,'#fde68a',C.dark?.25:.7):C.pn,nx||i===S.lit?C.vi:edge(),nx?4:2);
  word(g,String(i+1),r.x+16,r.y+16,13,C.mu,24);if(on){pic(g,ORDER[i][0],r.x+r.w/2,r.y+r.h*.42,Math.min(r.w*.42,44));word(g,ORDER[i][1],r.x+r.w/2,r.y+r.h*.78,12,C.tx,r.w-6)}else word(g,nx?'next?':'?',r.x+r.w/2,r.y+r.h/2,14,C.mu)});
 const k=S.deck[0];if(k!=null&&M()==='order')held(g,ORDER[k],moved(home()),S.bad===k)}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.03:.35);g.fillRect(0,0,A.W,A.H);const m=M();
 if(m==='look')drawLook(g);if(m==='ask')drawAsk(g);if(m==='idea')drawIdea(g);if(m==='calm')drawCalm(g);if(m==='order'||m==='quiz'){if(m==='quiz')S.slots=4;drawOrder(g)}A.fx.draw(g)}
function blink(i){S.lit=i;const v=gen;setTimeout(()=>{if(v===gen){S.lit=-1;A.redraw()}},420)}
function oops(t){A.sound.miss();speak(t);A.redraw()}
function yes(t){S.n++;S.bad=-1;A.sound.pop();speak(t);buttons();A.redraw();S.next()}
/* tap a thing in the shop scene */
function look(i){if(S.n>=3||S.got.includes(i))return;blink(i);const it=CLUE[i];if(!it[2])return oops(it[3]);S.got.push(i);yes(S.n<2?it[3]:it[3]+' You watched first, so now you know the game.')}
/* drop the waiting ask card into box i */
function sortAsk(i){const k=S.deck[0];if(k==null||S.n>=4)return;blink(i);const it=ASKS[k];
 if(it[2]!==i){S.bad=k;return oops(i?`${it[1]} is a good way to ask! ${it[3]}`:`Not that one. ${it[3]}`)}S.got.push({k:S.deck.shift(),at:i});yes(`Yes! ${it[3]}`)}
/* offer idea card j to the game */
function offer(j){if(S.n>=3||S.n>S.round)return;blink(0);const it=GAMES[S.round%3][2][S.deck[j]];if(!it[2]){S.bad=j;return oops(it[3])}
 const v=gen;yes(`Yes! ${it[1]} That fits the game, so they say “Come and play!”`);if(S.n<3)setTimeout(()=>{if(v===gen){S.round++;S.deck=S.round%2?[2,0,1]:[1,2,0];S.bad=-1;buttons();A.redraw()}},quick()?20:900)}
/* pick something to do after "not now" */
function calm(i){if(S.mood>=3||S.got.includes(i))return;blink(i);const it=CALM[i];if(!it[2]){S.bad=i;return oops(it[3])}S.got.push(i);S.bad=-1;S.mood++;
 yes(['Good! A big breath helps the cross feeling get smaller.','Good idea! There is lots more to do.','Yes! Someone else may say yes.','Yes! Later the answer might be yes.'][i]+(S.mood>=3?' Bo feels OK again.':''))}
/* place the waiting step card in the next box */
function place(i){const k=S.deck[0];if(k==null||S.n>=3)return;blink(i);if(i!==S.slots)return oops(`Put it in box ${S.slots+1}, the next empty one.`);
 if(k!==S.slots){S.bad=k;const v=gen;setTimeout(()=>{if(v===gen&&S.deck[0]===k){S.deck.push(S.deck.shift());S.bad=-1;buttons();A.redraw()}},quick()?10:900);
  return oops(['','First watch, then ask. You need to ask before you can join.','You give your idea after you ask, not before.','You play last, after you ask and give an idea.'][k]||'Not yet.')}
 S.deck.shift();S.slots++;yes(['','Yes! After watching, you ask: “Can I play?”','Yes! Then you give an idea for a part.','Yes! Now you play together.'][k])}
function buttons(){if(!pad)return;pad.innerHTML='';const m=M();if(m==='quiz'||S.n>=goal())return;
 const B=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},pad,t);b.onclick=f};
 if(m==='look')CLUE.forEach((it,i)=>{if(!S.got.includes(i))B(it[0]+' '+it[1],`Look at ${it[1]}`,()=>look(i))});
 if(m==='ask'&&S.deck.length)[['👍 Good way',0],['👎 Not a good way',1]].forEach(([t,i])=>B(t,`${ASKS[S.deck[0]][1]}: ${t.slice(3)}`,()=>sortAsk(i)));
 if(m==='idea'&&S.n<=S.round)S.deck.forEach((d,j)=>{const it=GAMES[S.round%3][2][d];B(it[0]+' '+it[1],`Say ${it[1]}`,()=>offer(j))});
 if(m==='calm')CALM.forEach((it,i)=>{if(!S.got.includes(i))B(it[0]+' '+it[1],it[1],()=>calm(i))});
 if(m==='order')[1,2,3].filter(k=>S.deck.includes(k)).forEach(k=>B(ORDER[k][0]+' '+ORDER[k][1],`${ORDER[k][1]} goes next`,()=>{S.deck=[k,...S.deck.filter(x=>x!==k)];place(S.slots)}))}
function down(p){const m=M();if(m==='quiz'||S.n>=goal())return false;
 if(m==='look'){const i=spots().findIndex(r=>hit(p,r));if(i>=0)look(i);return false}
 if(m==='calm'){const i=calmCards().findIndex(r=>hit(p,r));if(i>=0)calm(i);return false}
 if(m==='idea'){const j=ideaCards().findIndex(r=>hit(p,r));if(j>=0&&S.n<=S.round){S.grab={k:j,x:null,x0:p.x,y0:p.y};return true}return false}
 if(S.deck.length&&hit(p,home())){S.grab={x:null,x0:p.x,y0:p.y};return true}
 const i=drops().findIndex(r=>hit(p,r));if(i>=0&&S.deck.length)(m==='ask'?sortAsk:place)(i);return false}
function move(p){const d=S.grab;if(d&&(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8)){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.grab,m=M();S.grab=null;if(!d)return;const i=drops().findIndex(r=>hit(p,r));
 if(m==='idea'){if(d.x!=null&&i<0){speak('Drag the idea into the gap, or tap a button.');return A.redraw()}return offer(d.k)}
 if(d.x==null||i<0){speak('Drag the card into a box, or tap a button.');return A.redraw()}(m==='ask'?sortAsk:place)(i)}
const finish=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(list,gap){const k=++gen;list.forEach((f,j)=>setTimeout(()=>{if(k===gen)f()},quick()?j*40+30:(j+1)*(gap||450)))}
const reset=(deck,extra)=>{gen++;Object.assign(S,blank(),{deck},extra||{})};
const steps=[
{h:'Watch first',p:'Bo the bear wants to play. First, watch. What are the children playing? Tap the 3 clues.',predict:{q:'What should Bo do first?',opts:['Run in and grab a toy','Watch what they are playing'],ans:1},task:'Find 3 clues',
 show:()=>{steps[0].go();auto([()=>look(0),()=>look(1),()=>look(2)])},go:()=>{reset([]);speak('Tap the things that show the game.');buttons();S.next=finish(0,()=>S.n>=3,'Watching first tells you the game: shops!')}},
{h:'Ask with kind words',p:'How can Bo ask? Drag each card to a good way or not a good way.',task:'Sort 4 cards',
 show:()=>{steps[1].go();auto([0,1,2,3].map(j=>()=>sortAsk(ASKS[S.deck[0]][2])))},go:()=>{reset([0,1,2,3,4,5]);speak('Drag the card: Can I play?');buttons();S.next=finish(1,()=>S.n>=4,'Kind words like “Can I play?” work best. Grabbing and shouting do not.')}},
{h:'Give an idea',p:'Joining is easier with an idea for their game. Drag the idea that fits into the gap.',predict:{q:'They play shops. What helps Bo join in?',opts:['“Let’s play football!”','“I can be the shopper!”'],ans:1},task:'Join 3 games',
 show:()=>{steps[2].go();auto([0,1,2].map(r=>()=>offer(S.deck.indexOf(0))),1100)},go:()=>{reset([1,0,2]);speak('They are playing shops. Pick an idea.');buttons();S.next=finish(2,()=>S.n>=3,'An idea that fits their game shows you want to play with them.')}},
{h:'When they say “Not now”',p:'Sometimes the answer is “Not now.” That is OK. Tap 3 good things Bo can do.',predict:{q:'They said “Not now.” Does that mean they will never play with Bo?',opts:['Yes, never','No, maybe later'],ans:1},task:'Help Bo feel OK',
 show:()=>{steps[3].go();auto([0,1,3].map(i=>()=>calm(i)))},go:()=>{reset([]);speak('Bo heard not now. Tap a good thing to do.');buttons();S.next=finish(3,()=>S.mood>=3,'“Not now” is not “never.” Take a breath, find a game, or ask again later.')}},
{h:'The join-in steps',p:'Put the steps in order. Watch is first. Drag the next step to the next box.',task:'Order 3 steps',
 show:()=>{steps[4].go();auto([1,2,3].map(k=>()=>{S.deck=[k,...S.deck.filter(x=>x!==k)];place(S.slots)}),600)},go:()=>{reset([2,3,1]);speak('Watch is first. What comes next?');buttons();S.next=finish(4,()=>S.n>=3,'Watch, ask, give an idea, then play!')}},
{h:'Challenge',p:'',go:()=>{reset([]);quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.next()});
const QS=[['What do you do first?',[['Watch the game','ok'],['Grab a toy','grab'],['Shout “ME!”','loud']]],
 ['Which is a kind way to ask?',[['“Can I play?”','ok'],['Push in','push'],['Say nothing','quiet']]],
 ['They are playing doctors. Which idea fits?',[['“I can be the patient!”','ok'],['“Let’s play tag!”','newgame'],['“I am the boss!”','boss']]],
 ['They say “Not now.” What can you do?',[['Find another game','ok'],['Knock their game over','spoil'],['Never ask again','never']]],
 ['They say “Not now.” Does it mean never?',[['No, maybe later','ok'],['Yes, never ever','never'],['They hate me','hate']]]];
function why(t){let m='Look back at the lab: watch, ask, give an idea, and stay calm.';
 if(t==='grab')m='Grabbing spoils their game. Watch first, then use words.';
 if(t==='loud')m='Shouting is too loud. Watch first, then ask in a calm voice.';
 if(t==='push')m='Pushing in can hurt and spoil the game. Ask with kind words.';
 if(t==='quiet')m='If you say nothing, they do not know you want to play. Use words.';
 if(t==='newgame')m='Tag is a new game. Give an idea for their game: doctors.';
 if(t==='boss')m='Bossing makes it less fun. Ask for a part in the game.';
 if(t==='spoil')m='That would make everyone sad. Find another game or ask again later.';
 if(t==='never')m='“Not now” means not yet. You can ask again later.';
 if(t==='hate')m='“Not now” does not mean they do not like you. Maybe the game is full.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});speak('Challenge: '+q);A.redraw()}
function mark(t){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),good=t==='ok';
 if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes! Well done.':'✗ '+why(t)}${good?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{qbox.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qbox=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});buttons()}});
A.start()})})();
