/* Flagship – sharing and taking turns (ages 3–4): play a race game where the go swaps every time (my turn, your turn),
   give Kit the fire truck and watch it come back after her go, offer a toy to the friend who has none, share out
   snacks one for you and one for me until it is fair, then sort kind and unkind ways to play. Drag or tap, big buttons. */
(()=>{
const PALS=[['🐰','Kit'],['🐶','Pip'],['🐱','Mo']],TOYS=['🚒','⚽','🧸'],SNACK=[['🍓','strawberries',6],['🍪','biscuits',8]];
const KIND=[['Say: your turn!',0],['Grab the toy',1],['Give the toy back',0],['Hide all the toys',1],['Wait for my go',0],['Push in first',1]];
const NOPE={'Grab the toy':'Grabbing is not kind. Ask: can I have a turn after you?','Hide all the toys':'Hiding toys means nobody else can play. Share them.',
 'Push in first':'Pushing in takes a turn away. Wait, and your go will come.','Say: your turn!':'Saying "your turn" is kind. It gives a friend a go.',
 'Give the toy back':'Giving it back is kind. Now the next person can play.','Wait for my go':'Waiting for your go is kind. Everyone gets one.'};
VIS.reg('flagshare',c=>{let A,pad,qbox,qi=-1,ver=0;c.fig.classList.add('young');
const fresh=()=>({want:()=>{},won:0,r:0,lane:[0,0],who:0,lend:'me',play:{k:0},hold:-1,drag:null,have:[1,0,1],plate:[0,0],lastP:-1,pile:0,ci:0,bad:-1,hi:-1}),S=fresh();
const mode=()=>['turn','lend','offer','fair','kind','quiz'][A.step],fast=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.15));
const voice=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function write(g,t,x,y,n,col,wt){g.font=`${wt||800} ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-12)}
function emo(g,e,x,y,s){g.font=`${Math.round(s)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#111';g.fillText(e,x,y)}
function tile(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();g.strokeStyle=edge;g.lineWidth=lw||3;A.paint.rrect(r.x,r.y,r.w,r.h,16);g.stroke()}
const soft=()=>A.col.dark?'#1e293b':'#fff7ed',inside=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
const need=()=>({turn:1,lend:2,offer:3,fair:2,kind:6}[mode()]||9);
/* ---- 1 my turn, your turn ---- */
const LEN=4,NAMES=['you','Kit'];
function laneBox(row,i){const w=Math.min((A.W-90)/(LEN+1),84),x0=(A.W-(LEN+1)*w)/2+30;return{x:x0+i*w,y:A.H*(.1+row*.22),w:w-6,h:A.H*.17}}
function whoBox(k){const w=Math.min(A.W*.42,190),h=Math.min(A.H*.2,82),gap=14;return{x:A.W/2-w-gap/2+k*(w+gap),y:A.H*.68,w,h}}
function drawTurn(g){const C=A.col;[0,1].forEach(row=>{for(let i=0;i<=LEN;i++){const r=laneBox(row,i);tile(g,r,i===LEN?A.alpha(C.gr,.25):soft(),C.mu,2);if(i===LEN)emo(g,'🏁',r.x+r.w/2,r.y+r.h/2,r.h*.5)}
  const r=laneBox(row,S.lane[row]);emo(g,row?'🐰':'🧒',r.x+r.w/2,r.y+r.h/2,r.h*.62);write(g,row?'Kit':'You',laneBox(row,0).x-26,r.y+r.h/2,13)});
 write(g,S.won?'Game over: you both had every go!':`Whose turn now? ${S.lane[0]+S.lane[1]?'':'You go first.'}`,A.W/2,A.H*.6,15,C.tx);
 [0,1].forEach(k=>{const r=whoBox(k);tile(g,r,soft(),S.bad===k?C.rd:C.tx,S.bad===k?6:3);write(g,k?'🐰 Your turn, Kit':'🧒 My turn',r.x+r.w/2,r.y+r.h/2,15)})}
function pickTurn(k){if(mode()!=='turn'||S.won)return;if(k!==S.who)return nope(k?(S.lane[1]?'Kit just had her go. Now it is your turn. Say: my turn!':'You go first. Say: my turn!'):'You just had a go. Now it is Kit’s turn. Say: your turn, Kit!',k);
 S.lane[k]++;S.who=1-k;A.sound.tick();if(S.lane[0]>=LEN&&S.lane[1]>=LEN)return got('Your turn, my turn: you both got every go!');
 voice(`${k?'Kit':'You'} moved. Now it is ${S.who?'Kit’s':'your'} turn.`);keys();A.redraw()}
/* ---- 2 the toy comes back ---- */
const youAt=()=>({x:A.W*.2,y:A.H*.42}),kitAt=()=>({x:A.W*.8,y:A.H*.42}),toyR=()=>Math.min(A.W*.11,A.H*.13);
function toyPos(){if(S.drag&&S.drag.x!=null)return S.drag;const a=youAt(),b=kitAt(),k=S.lend==='kit'?1:S.lend==='back'?1-S.play.k:0;return{x:a.x+(b.x-a.x)*k,y:a.y+toyR()*1.4}}
function drawLend(g){const C=A.col,a=youAt(),b=kitAt(),R=toyR();emo(g,'🧒',a.x,a.y-R*.6,R*1.5);emo(g,'🐰',b.x,b.y-R*.6,R*1.5);write(g,'You',a.x,a.y-R*1.7,13);write(g,'Kit',b.x,b.y-R*1.7,13);
 const t=toyPos();emo(g,TOYS[Math.min(S.r,1)],t.x,t.y,R*1.4);
 if(S.lend==='kit'){const bw=A.W*.5,bx=A.W*.25,by=A.H*.74;g.fillStyle=A.alpha(C.mu,.25);A.paint.rrect(bx,by,bw,18,9);g.fill();g.fillStyle=C.gr;A.paint.rrect(bx,by,bw*S.play.k,18,9);g.fill();write(g,'Kit’s go…',A.W/2,by+38,14)}
 else write(g,S.lend==='back'?'Here it comes back!':'Drag the toy to Kit, or tap it.',A.W/2,A.H*.8,14,C.tx)}
function lend(){if(mode()!=='lend'||S.won>=need()||S.lend!=='me')return;S.lend='kit';S.play={k:0};A.sound.pop();voice('You gave Kit a turn. Kit is playing with it now.');keys();A.redraw();const v=ver;
 A.tween(S.play,{k:1},fast()?10:1100,'io',()=>{if(v!==ver)return;S.lend='back';S.play={k:0};A.tween(S.play,{k:1},fast()?10:500,'out',()=>{if(v!==ver)return;S.lend='me';got(`Kit says thank you. The ${['fire truck','ball'][Math.min(S.r,1)]} came back to you!`)})})}
function grab(){if(S.lend!=='kit')return;nope('Wait! It is Kit’s go. The toy comes back when her go is done.')}
/* ---- 3 offer a toy ---- */
function palBox(i){const w=Math.min((A.W-40)/3,170);return{x:(A.W-3*w-20)/2+i*(w+10),y:A.H*.06,w,h:A.H*.36}}
function basket(i){const w=Math.min((A.W-60)/3,104),h=Math.min(A.H*.2,96);return{x:(A.W-3*w-24)/2+i*(w+12),y:A.H*.66,w,h}}
function drawOffer(g){const C=A.col;PALS.forEach(([e,n],i)=>{const r=palBox(i);tile(g,r,soft(),S.bad===i?C.rd:C.mu,S.bad===i?6:2);emo(g,e,r.x+r.w/2,r.y+r.h*.34,r.h*.4);
  write(g,n,r.x+r.w/2,r.y+r.h*.66,13);emo(g,S.have[i]?TOYS[i]:'😢',r.x+r.w/2,r.y+r.h*.86,r.h*.2)});
 write(g,'Who has nothing to play with?',A.W/2,A.H*.55,14,C.mu,700);
 TOYS.forEach((t,i)=>{let r=basket(i);if(S.drag&&S.drag.i===i&&S.drag.x!=null)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};tile(g,r,soft(),S.hold===i?C.vi:C.tx,S.hold===i?6:3);emo(g,t,r.x+r.w/2,r.y+r.h/2,r.h*.55)})}
function give(toy,i){if(mode()!=='offer'||S.won>=need())return;S.hold=-1;if(S.have[i])return nope(`${PALS[i][1]} already has a toy. Look for the friend who has nothing.`,i);
 S.have[i]=1;A.sound.pop();const n=PALS[i][1];S.won++;if(S.won>=need()){voice(`You offered ${n} a toy. ${n} says thank you!`);keys();A.redraw();return S.want()}
 const next=[[1,0,1],[1,1,0],[0,1,1]][S.won];S.have=next.slice();voice(`${n} says thank you! Now ${PALS[next.indexOf(0)][1]} has nothing. Offer a toy.`);keys();A.redraw()}
/* ---- 4 one for you, one for me ---- */
function plate(k){const w=Math.min(A.W*.42,200),h=A.H*.34;return{x:A.W/2-w-8+k*(w+16),y:A.H*.05,w,h}}
const pileBox=()=>({x:A.W*.1,y:A.H*.6,w:A.W*.8,h:A.H*.24});
function drawFair(g){const C=A.col,[e,,n]=SNACK[Math.min(S.r,1)];[0,1].forEach(k=>{const r=plate(k);tile(g,r,soft(),S.bad===k?C.rd:C.tx,S.bad===k?6:3);write(g,k?'🐰 Kit':'🧒 You',r.x+r.w/2,r.y+18,13);
  for(let j=0;j<S.plate[k];j++)emo(g,e,r.x+r.w*(.2+(j%3)*.3),r.y+r.h*(.42+Math.floor(j/3)*.3),Math.min(r.w*.22,34));write(g,String(S.plate[k]),r.x+r.w-16,r.y+18,14)});
 const left=n-S.pile,P=pileBox();for(let j=0;j<left;j++)emo(g,e,P.x+P.w*(j+.5)/n,P.y+P.h/2,Math.min(P.w/n*.8,38));
 write(g,left?'One for you, one for Kit…':`${S.plate[0]} and ${S.plate[1]}: fair!`,A.W/2,A.H*.5,15,C.tx,800)}
function deal(k){if(mode()!=='fair'||S.won>=need())return;const[,name,n]=SNACK[Math.min(S.r,1)];if(S.pile>=n)return;
 if(S.lastP===k)return nope(`One for you, one for ${k?'me':'Kit'}. That plate just had one. Give the other plate one.`,k);
 S.plate[k]++;S.pile++;S.lastP=k;A.sound.tick();if(S.pile>=n)return got(`${S.plate[0]} for you and ${S.plate[1]} for Kit. Same for both: fair!`);voice(`${S.plate[0]} for you, ${S.plate[1]} for Kit.`);keys();A.redraw()}
/* ---- 5 kind or not kind ---- */
function bin(k){const w=Math.min(A.W*.42,200),h=Math.min(A.H*.24,100);return{x:A.W/2-w-8+k*(w+16),y:A.H*.66,w,h}}
function drawKind(g){const C=A.col;if(S.ci<KIND.length){let r={x:A.W*.15,y:A.H*.16,w:A.W*.7,h:A.H*.24};if(S.drag&&S.drag.x!=null)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};tile(g,r,soft(),C.tx,3);write(g,KIND[S.ci][0],r.x+r.w/2,r.y+r.h/2,17)}
 write(g,`${S.ci} of ${KIND.length} sorted`,A.W/2,A.H*.52,13,C.mu,700);[['😊 Kind',0],['😟 Not kind',1]].forEach(([t,k])=>{const r=bin(k);tile(g,r,soft(),S.bad===k?C.rd:C.tx,S.bad===k?6:3);write(g,t,r.x+r.w/2,r.y+r.h/2,16)})}
function sortCard(k){if(mode()!=='kind'||S.ci>=KIND.length)return;const[t,ans]=KIND[S.ci];if(k!==ans)return nope(NOPE[t],k);S.ci++;S.won++;A.sound.tick();
 if(S.won>=need()){voice('All sorted. Kind play means everyone gets a go.');keys();A.redraw();return S.want()}voice(`Yes. ${t}: ${ans?'not kind':'kind'}. Next card.`);keys();A.redraw()}
/* ---- shared ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.04:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){write(g,'🧒 🤝 🐰',W/2,H*.4,30,C.tx,400);write(g,'Everyone gets a go.',W/2,H*.62,15);return}
 if(S.won>=need()&&v!=='kind'&&v!=='offer'){write(g,{turn:'My turn, your turn, my turn…',lend:'Give a turn: the toy comes back.',fair:'One for you, one for me.'}[v],W/2,H/2,15);return A.fx.draw(g)}
 ({turn:drawTurn,lend:drawLend,offer:drawOffer,fair:drawFair,kind:drawKind})[v](g);A.fx.draw(g)}
function nope(t,b){A.sound.miss();S.bad=b==null?-1:b;voice(t);setTimeout(()=>{S.bad=-1;A.redraw()},fast()?10:900);A.redraw()}
function again(){S.lane=[0,0];S.who=0;S.lend='me';S.play={k:0};S.plate=[0,0];S.pile=0;S.lastP=-1;S.hold=-1;S.drag=null}
function got(t){S.won++;S.r++;A.sound.pop();if(S.won<need()){again();voice(t+' Let’s do another one.')}else voice(t);keys();A.redraw();S.want()}
function keys(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};if(v==='quiz'||S.won>=need())return;
 if(v==='turn'){B('🧒 My turn',()=>pickTurn(0),'My turn: move my counter');B('🐰 Your turn, Kit',()=>pickTurn(1),'Kit’s turn: move Kit’s counter')}
 if(v==='lend'){if(S.lend==='me')B(`Give Kit a turn ${TOYS[Math.min(S.r,1)]}`,lend,'Give Kit a turn with the toy');if(S.lend==='kit')B('Grab it back',grab,'Grab the toy back from Kit')}
 if(v==='offer')PALS.forEach(([e,n],i)=>B(`Give ${n} a toy ${e}`,()=>give(0,i)));
 if(v==='fair'){B('One for me 🧒',()=>deal(0),'Put one on my plate');B('One for Kit 🐰',()=>deal(1),'Put one on Kit’s plate')}
 if(v==='kind'){B('😊 Kind',()=>sortCard(0),'Sort the card as kind');B('😟 Not kind',()=>sortCard(1),'Sort the card as not kind')}}
function down(p){const v=mode();if(S.won>=need())return false;
 if(v==='turn'){const k=[0,1].find(k=>inside(p,whoBox(k)));if(k!=null)pickTurn(k);return false}
 if(v==='lend'){const t=toyPos(),R=toyR();if(S.lend==='me'&&Math.hypot(p.x-t.x,p.y-t.y)<R*1.3){S.drag={x:null,y:null,x0:p.x,y0:p.y};return true}if(S.lend==='kit'&&p.x>A.W*.6)grab();return false}
 if(v==='offer'){const i=TOYS.findIndex((t,i)=>inside(p,basket(i)));if(i>=0){S.drag={i,x:null,y:null,x0:p.x,y0:p.y};return true}const k=PALS.findIndex((x,k)=>inside(p,palBox(k)));if(k>=0&&S.hold>=0)give(S.hold,k);return false}
 if(v==='fair'){const k=[0,1].find(k=>inside(p,plate(k)));if(k!=null)deal(k);return false}
 if(v==='kind'){const k=[0,1].find(k=>inside(p,bin(k)));if(k!=null){sortCard(k);return false}if(p.y<A.H*.45){S.drag={x:null,y:null,x0:p.x,y0:p.y};return true}}return false}
function move(p){if(!S.drag)return;if(S.drag.x!=null||Math.hypot(p.x-S.drag.x0,p.y-S.drag.y0)>8){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){const d=S.drag,v=mode();S.drag=null;if(!d)return;
 if(v==='lend'){if(d.x==null||p.x>A.W*.6)lend();else{voice('Drag the toy all the way to Kit.');A.redraw()}return}
 if(v==='offer'){if(d.x==null){S.hold=d.i;A.sound.tick();voice('Picked a toy. Now tap the friend who has nothing.');return A.redraw()}const k=PALS.findIndex((x,k)=>inside(p,palBox(k)));if(k>=0)give(d.i,k);return A.redraw()}
 if(v==='kind'){const k=[0,1].find(k=>inside(p,bin(k)));if(k!=null&&d.x!=null)sortCard(k);A.redraw()}}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++ver;list.forEach((fn,j)=>setTimeout(()=>{if(k===ver)fn()},fast()?j*40+30:(j+1)*(gap||260)))}
const wipe=()=>{ver++;Object.assign(S,fresh());if(A)again()};
const steps=[
{h:'My turn, your turn',p:'Play the race game with Kit. After each go, the turn swaps. Tap whose turn it is.',predict:{q:'You just had a go. Who goes next?',opts:['Me again','Kit'],ans:1},task:'Finish the game, taking turns',
 show:()=>{steps[0].go();play([0,1,0,1,0,1,0,1].map(k=>()=>pickTurn(k)),260)},go:()=>{wipe();voice('You go first. Tap: my turn.');keys();S.want=ready(0,()=>S.won>=1,'Turns swap: me, then you, then me.')}},
{h:'The toy comes back',p:'Kit wants a turn with your fire truck. Drag it to Kit, or tap it. Watch what happens after her go.',predict:{q:'You give Kit your truck. What happens?',opts:['It is gone for good','It comes back after her go'],ans:1},task:'Give 2 turns',
 show:()=>{steps[1].go();play([lend,()=>{},()=>{},()=>{},()=>{},()=>{},()=>{},lend],330)},go:()=>{wipe();voice('Drag the fire truck to Kit.');keys();S.want=ready(1,()=>S.won>=2,'Sharing is a turn, not giving it away.')}},
{h:'Offer a toy',p:'One friend has nothing to play with. Drag a toy to that friend, or tap a toy, then the friend.',task:'Offer 3 toys',
 show:()=>{steps[2].go();play([1,2,0].map(i=>()=>give(i,i)),500)},go:()=>{wipe();voice('Pip has nothing. Offer Pip a toy.');keys();S.want=ready(2,()=>S.won>=3,'You saw who had nothing and offered a toy.')}},
{h:'One for you, one for me',p:'Share the snack with Kit. Tap a plate to give it one. Take turns: one for you, one for Kit.',predict:{q:'There are 6 strawberries. You get 5 and Kit gets 1. Is that fair?',opts:['Yes, fair','No, not fair'],ans:1},task:'Share 2 snacks fairly',
 show:()=>{steps[3].go();play(Array.from({length:14},(_,j)=>()=>deal(j%2)),180)},go:()=>{wipe();voice('Tap a plate: one for you, one for Kit.');keys();S.want=ready(3,()=>S.won>=2,'One each, again and again, makes it fair.')}},
{h:'Kind or not kind?',p:'Drag each card to a box, or tap a box. Is it a kind way to play?',task:'Sort 6 cards',
 show:()=>{steps[4].go();play(KIND.map(([,a])=>()=>sortCard(a)),400)},go:()=>{wipe();voice('Is it kind? Tap a box.');keys();S.want=ready(4,()=>S.won>=6,'Kind play lets everyone have a go.')}},
{h:'Challenge',p:'',go:()=>{wipe();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['You just had a go on the slide. Who goes now?',[['My friend','ok'],['Me again','again'],['Nobody','none']]],
 ['Kit is having a turn with your ball. What do you do?',[['Wait, it comes back','ok'],['Grab it back now','grab'],['Cry and shout','shout']]],
 ['Pip has no toy. You have three. What is kind?',[['Offer Pip one','ok'],['Keep all three','keep'],['Hide them','hide']]],
 ['You share 4 grapes with Kit. Which is fair?',[['2 for you, 2 for Kit','ok'],['3 for you, 1 for Kit','more'],['4 for you','all']]],
 ['You want a turn on the bike. What can you say?',[['Can I have a turn next?','ok'],['Mine! Get off!','mine'],['Say nothing and push','push']]]];
function hint(t){let m='Everyone gets a go. Take turns and share.';
 if(t==='again')m='You just had a go. Now it is your friend’s turn. Then it is you again.';if(t==='none')m='Somebody always goes next. Turns swap.';
 if(t==='grab')m='Grabbing stops Kit’s turn. Wait, and the ball comes back to you.';if(t==='shout')m='Kit is only borrowing it. Wait for her go to end.';
 if(t==='keep')m='Pip has nothing to play with. Offer one: you still have two.';if(t==='hide')m='Hidden toys make nobody happy. Offer one to Pip.';
 if(t==='more')m='3 and 1 are not the same. One for you, one for Kit gives 2 each.';if(t==='all')m='Kit gets none. That is not fair. Share them out: 2 each.';
 if(t==='mine')m='Shouting does not get a turn. Ask: can I have a turn next?';if(t==='push')m='Pushing hurts. Use words: can I have a turn next?';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});voice('Challenge: '+q);A.redraw()}
let good=0;
function judge(t){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){good++;A.win()}else{good=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! That is sharing.':'✗ '+hint(t)}${ok?` Streak: ${good}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{qbox.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qbox=E('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});keys()}});
A.start()})})();
