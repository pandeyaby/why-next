/* Flagship – noticing when something is tricky (ages 4–5): spot tricky signs, say "this is tricky", slow down on a
   twisty path, turn a block to try a new way, sort try-again vs ask a grown-up. Big taps, button twins. */
(()=>{
const SIGNS=[[['😣','Cross face',1],['🙂','All done',0],['🔁','Same mistake again',1],['😤','Want to throw it',1],['🎉','It worked!',0],['🤷','Not sure what to do',1]],
 [['👍','Easy peasy',0],['😟','Worried face',1],['❌','Keeps going wrong',1],['😊','Having fun',0],['💧','Teary eyes',1],['⏳','Taking so long',1]]];
const SAY=[['🧱','The tower keeps falling down.',[['This is tricky.','ok'],['I am bad at this.','bad'],['Grr! Kick it!','kick']]],
 ['🧩','The puzzle piece will not go in.',[["I'm stuck.",'ok'],['Puzzles are silly.','bad'],['Hide it under the bed.','hide']]],
 ['👟','The shoe will not do up.',[['Can you help me, please?','ok'],['I will never do it.','never'],['Say nothing and cry.','hide']]]];
const SHAPES=[['rect',90,180],['tri',180,360],['ell',270,360]];
const JOBS=[['🧩','Puzzle piece will not fit',0,'You can turn the piece and try a new way first.'],['🍯','Jar lid stuck. Tried 2 times.',1,'You tried twice and it is still stuck. Now ask.'],
 ['🧸','Teddy on a high shelf',1,'High up is not safe to climb. Ask a grown-up.'],['✏️','My line went wobbly',0,'Slow down and have another go.'],
 ['🧥','Zip stuck. Tried a new way too.',1,'You tried and tried. Asking now is smart, not giving up.'],['🧦','Sock is inside out',0,'Turn it the right way and try again. You can do this one.']];
const BINS=['Try again','Ask a grown-up'];
VIS.reg('flagtrick',c=>{let A,pad,chal,qi=-1,gen=0,streak=0;c.fig.classList.add('young');
const fresh=()=>({want:()=>{},won:0,r:0,bad:-1,found:[],said:-1,bee:0,save:0,grab:null,ang:0,tries:0,ok:false,spin:0,sorted:[],pick:-1}),S=fresh();
const mode=()=>['signs','say','slow','turn','ask','quiz'][A.step],fast=()=>A.reduced(),fz=n=>Math.round(n*(A.narrow?1:1.15));
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const need=()=>({signs:2,say:3,slow:2,turn:3,ask:1}[mode()]||9);
function word(g,t,x,y,n,col,wt){g.font=`${wt||800} ${fz(n)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-12)}
function box(g,r,state){const C=A.col,edge=state==='bad'?C.rd:state==='good'?C.gr:state==='hot'?C.vi:C.tx;g.fillStyle=state==='good'?A.alpha(C.gr,.24):(C.dark?'#1f2937':'#fff7ed');
 A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();g.strokeStyle=edge;g.lineWidth=state?5:2.5;A.paint.rrect(r.x,r.y,r.w,r.h,16);g.stroke()}
const r1=()=>Math.min(S.r,1),r2=()=>Math.min(S.r,2),inR=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
/* ---- 1. spot the tricky signs ---- */
function signRects(){const cols=A.narrow?2:3,gap=10,w=(A.W-gap*(cols+1))/cols,h=Math.min((A.H*.78-gap*4)/(6/cols),110);return[0,1,2,3,4,5].map(k=>({x:gap+(k%cols)*(w+gap),y:A.H*.16+Math.floor(k/cols)*(h+gap),w,h}))}
function drawSigns(g){const set=SIGNS[r1()],left=set.filter((s,k)=>s[2]&&!S.found.includes(k)).length;word(g,left?`Find the tricky signs: ${left} left`:'All found!',A.W/2,A.H*.08,16);
 signRects().forEach((r,k)=>{const[e,t]=set[k];box(g,r,S.bad===k?'bad':S.found.includes(k)?'good':'');word(g,e,r.x+r.w/2,r.y+r.h*.38,30,A.col.tx,400);word(g,t,r.x+r.w/2,r.y+r.h*.76,13,A.col.tx,800)})}
function tapSign(k){if(mode()!=='signs'||S.won>=need()||S.found.includes(k))return;const set=SIGNS[r1()],[,t,tricky]=set[k];
 if(!tricky)return oops(`${t} means it is going well. That is not a tricky sign.`,k);S.found.push(k);A.sound.tick();
 const left=set.filter((s,j)=>s[2]&&!S.found.includes(j)).length;if(!left)return win('You found every tricky sign. Tricky does not mean bad at it. It means: time to choose what to do.');speak(`Yes, ${t} is a tricky sign. ${left} more.`);A.redraw()}
/* ---- 2. say it ---- */
const kitAt=()=>({x:A.W/2,y:A.H*.2,r:Math.min(A.W,A.H)*.1});
function bubRects(){const w=Math.min(A.W-24,420),h=Math.min(A.H*.13,62);return[0,1,2].map(k=>{if(S.grab&&S.grab.k===k&&S.grab.x!=null)return{x:S.grab.x-w/2,y:S.grab.y-h/2,w,h};return{x:(A.W-w)/2,y:A.H*.52+k*(h+10),w,h}})}
function drawSay(g){const[e,scene,opts]=SAY[r2()],k=kitAt();A.paint.ball(k.x,k.y,k.r,'#fbbf24');g.fillStyle='#111';[-1,1].forEach(s=>{g.beginPath();g.arc(k.x+s*k.r*.32,k.y-k.r*.15,k.r*.1,0,7);g.fill()});
 g.strokeStyle='#111';g.lineWidth=3;g.beginPath();g.moveTo(k.x-k.r*.3,k.y+k.r*.4);g.lineTo(k.x+k.r*.3,k.y+k.r*.4);g.stroke();word(g,e,k.x+k.r*2,k.y,30,A.col.tx,400);
 word(g,scene,A.W/2,A.H*.37,15);word(g,'What can Kit say? Drag a bubble to Kit, or tap it.',A.W/2,A.H*.45,12,A.col.mu,700);
 const order=[0,1,2].sort((a,b)=>(S.grab&&S.grab.k===a)-(S.grab&&S.grab.k===b)),rs=bubRects();order.forEach(j=>{box(g,rs[j],S.bad===j?'bad':S.said===j?'good':'');word(g,'💬 '+opts[j][0],rs[j].x+rs[j].w/2,rs[j].y+rs[j].h/2,15)})}
const sayWhy={bad:'Tricky is not the same as bad at it. Say: this is tricky.',kick:'Kicking breaks things and does not help. Say how it feels: this is tricky.',hide:'Hiding it means nobody knows you need a hand. Say it out loud.',never:'Never? You just have not done it yet. Ask for help.'};
function sayIt(j){if(mode()!=='say'||S.won>=need()||S.said>=0)return;const[,scene,opts]=SAY[r2()],[t,tag]=opts[j];if(tag!=='ok')return oops(sayWhy[tag],j);
 S.said=j;A.sound.tick();A.redraw();setTimeout(()=>win(`Kit says: ${t} Saying it is the first step.`),fast()?20:450)}
/* ---- 3. slow down ---- */
function path(){const n=48,amp=A.H*(S.r?.2:.15),waves=S.r?3:2;return Array.from({length:n},(_,i)=>{const u=i/(n-1);return{x:A.W*(.08+.84*u),y:A.H*.5+amp*Math.sin(u*Math.PI*waves*2)}})}
const lane=()=>Math.max(18,A.W*.04);
function drawSlow(g){const C=A.col,P=path(),L=lane();g.lineCap=g.lineJoin='round';g.strokeStyle=C.dark?'#475569':'#a8a29e';g.lineWidth=L*2+6;g.beginPath();P.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));g.stroke();
 g.strokeStyle=C.dark?'#14532d':'#bbf7d0';g.lineWidth=L*2;g.stroke();const e=P[P.length-1],b=P[Math.min(S.bee,P.length-1)];word(g,'🌼',e.x,e.y,30,C.tx,400);word(g,'🐝',b.x,b.y,30,C.tx,400);
 word(g,S.bad===1?'Bump! Too fast.':'Twisty path: go slow and stay on the green.',A.W/2,A.H*.1,15,S.bad===1?C.rd:C.tx)}
function bump(why){S.bee=S.save;S.grab=null;oops(why,1)}
function beeTo(i){const P=path(),last=P.length-1;S.bee=Math.max(S.bee,Math.min(i,last));if(S.bee>=last/3&&S.save<1)S.save=Math.round(last/3);if(S.bee>=last*2/3)S.save=Math.round(last*2/3);
 if(S.bee>=last)return win('The bee got home. Slow and steady works on tricky paths.');A.redraw()}
function slowStep(){if(mode()!=='slow'||S.won>=need())return;A.sound.tick();beeTo(S.bee+4);speak(`Slow step. ${47-S.bee} dots to the flower.`)}
function zoom(){if(mode()!=='slow'||S.won>=need())return;bump('Whoosh! Going fast on a twisty path made the bee bump. Slow down.')}
/* ---- 4. try a new way ---- */
function shapePath(g,kind,x,y,s,ang){g.save();g.translate(x,y);g.rotate(ang*Math.PI/180);g.beginPath();
 if(kind==='rect')g.rect(-s,-s*.5,s*2,s);if(kind==='tri'){g.moveTo(0,-s*.8);g.lineTo(s*.9,s*.6);g.lineTo(-s*.9,s*.6);g.closePath()}
 if(kind==='ell'){g.moveTo(-s*.7,-s*.8);g.lineTo(-s*.1,-s*.8);g.lineTo(-s*.1,s*.2);g.lineTo(s*.8,s*.2);g.lineTo(s*.8,s*.8);g.lineTo(-s*.7,s*.8);g.closePath()}g.restore()}
const holeAt=()=>({x:A.W/2,y:A.H*.3}),sz=()=>Math.min(A.W,A.H)*.13;
function pieceAt(){if(S.grab&&S.grab.x!=null)return{x:S.grab.x,y:S.grab.y};if(S.ok)return holeAt();return{x:A.W/2,y:A.H*.72}}
function drawTurn(g){const C=A.col,[kind]=SHAPES[r2()],h=holeAt(),p=pieceAt();g.fillStyle=C.dark?'#0f172a':'#78716c';g.fillRect(A.W*.2,h.y-sz()*1.5,A.W*.6,sz()*3);
 shapePath(g,kind,h.x,h.y,sz()*1.08,0);g.fillStyle='#000';g.fill();shapePath(g,kind,p.x,p.y,sz(),S.ang+S.spin);g.fillStyle=S.ok?'#22c55e':'#3b82f6';g.fill();g.strokeStyle='#fff';g.lineWidth=3;g.stroke();
 word(g,S.ok?'It fits!':S.tries>1?'Same way, same bump. Turn it ↻':'Drag it to the hole. Tap to turn.',A.W/2,A.H*.93,14,S.tries>1&&!S.ok?C.vi:C.tx)}
function fits(){const[,,per]=SHAPES[r2()];return((S.ang%per)+per)%per===0}
function turn(){if(mode()!=='turn'||S.ok||S.won>=need())return;S.spin=-90;S.ang+=90;A.sound.tick();A.tween(S,{spin:0},fast()?1:260,'out');speak('You turned it. That is a new way. Now try it.');A.redraw()}
function push(){if(mode()!=='turn'||S.ok||S.won>=need())return;if(!fits()){S.tries++;S.grab=null;return oops(S.tries>1?'It bumped again. Pushing the same way again will not help. Try a new way: turn it.':'Bump! It does not fit this way.',-1)}
 S.ok=true;S.grab=null;A.sound.tick();A.redraw();setTimeout(()=>win(S.tries?`It fits! Trying a new way worked when the same way did not.`:'It fits!'),fast()?20:450)}
/* ---- 5. try again or ask ---- */
function jobRects(){const cols=2,gap=10,w=(A.W-gap*3)/2,h=Math.min(A.H*.15,82);return JOBS.map((j,k)=>{if(S.grab&&S.grab.k===k&&S.grab.x!=null)return{x:S.grab.x-w/2,y:S.grab.y-h/2,w,h};return{x:gap+(k%cols)*(w+gap),y:A.H*.03+Math.floor(k/cols)*(h+gap),w,h}})}
function binRects(){const gap=12,w=(A.W-gap*3)/2,h=A.H*.24;return[0,1].map(b=>({x:gap+b*(w+gap),y:A.H*.73,w,h}))}
function drawAsk(g){const C=A.col;binRects().forEach((r,b)=>{box(g,r,S.bad===10+b?'bad':S.pick>=0?'hot':'');word(g,b?'🙋':'🔁',r.x+r.w/2,r.y+r.h*.3,26,C.tx,400);word(g,BINS[b],r.x+r.w/2,r.y+r.h*.62,15);
  word(g,`${S.sorted.filter(k=>JOBS[k][2]===b).length}`,r.x+r.w/2,r.y+r.h*.86,13,C.mu,700)});
 const rs=jobRects();JOBS.map((j,k)=>k).filter(k=>!S.sorted.includes(k)).sort((a,b)=>(S.grab&&S.grab.k===a)-(S.grab&&S.grab.k===b)).forEach(k=>{const r=rs[k];box(g,r,S.bad===k?'bad':S.pick===k?'hot':'');
  word(g,JOBS[k][0],r.x+r.w*.13,r.y+r.h/2,22,C.tx,400);g.save();g.font=`700 ${fz(12)}px system-ui`;g.textAlign='left';g.textBaseline='middle';g.fillStyle=C.tx;
  const ws=JOBS[k][1].split(' '),half=Math.ceil(ws.length/2),l1=ws.slice(0,half).join(' '),l2=ws.slice(half).join(' ');g.fillText(l1,r.x+r.w*.26,r.y+r.h*.36,r.w*.72);g.fillText(l2,r.x+r.w*.26,r.y+r.h*.66,r.w*.72);g.restore()})}
function file(k,b){if(mode()!=='ask'||S.sorted.includes(k)||S.won>=need())return;S.pick=-1;S.grab=null;const[,t,want,why]=JOBS[k];if(b!==want)return oops(`${t}: ${why}`,10+b);
 S.sorted.push(k);A.sound.tick();if(S.sorted.length===JOBS.length)return win('All sorted. Try again first, and ask when you are still stuck or it is not safe.');speak(`Yes: ${BINS[b]}. ${why}`);pad.fill();A.redraw()}
function pickNext(){const left=JOBS.map((j,k)=>k).filter(k=>!S.sorted.includes(k));if(!left.length)return;S.pick=left[(left.indexOf(S.pick)+1)%left.length];A.sound.tick();speak(`Picked: ${JOBS[S.pick][1]} Where does it go?`);A.redraw()}
/* ---- shared ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,m=mode();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(m==='quiz'){word(g,'🤔 ➜ 🐢 🔁 🙋',W/2,H*.42,28,C.tx,400);word(g,'Notice it. Say it. Choose what to do.',W/2,H*.62,15);return}
 if(S.won>=need()){word(g,{signs:'Tricky signs tell you: stop and choose.',say:'Say it: this is tricky, I am stuck.',slow:'Tricky? Slow down.',turn:'Same way not working? Try a new way.',ask:'Still stuck? Ask for help.'}[m],W/2,H/2,15);return A.fx.draw(g)}
 ({signs:drawSigns,say:drawSay,slow:drawSlow,turn:drawTurn,ask:drawAsk})[m](g);A.fx.draw(g)}
function oops(t,k){A.sound.miss();S.bad=k;speak(t);setTimeout(()=>{S.bad=-1;A.redraw()},fast()?10:950);A.redraw()}
function setRound(){Object.assign(S,{found:[],said:-1,bee:0,save:0,grab:null,ang:SHAPES[r2()][1],tries:0,ok:false,spin:0,pick:-1})}
function win(t){S.won++;S.r++;A.sound.pop();if(S.won<need()){setRound();speak(t+' Here is another one.')}else speak(t);pad.fill();A.redraw();S.want()}
function down(p){const m=mode();if(S.won>=need())return false;
 if(m==='signs'){const k=signRects().findIndex(r=>inR(p,r));if(k>=0)tapSign(k);return false}
 if(m==='say'){const k=bubRects().findIndex(r=>inR(p,r));if(k>=0){S.grab={k,x:null,y:null,x0:p.x,y0:p.y};return true}return false}
 if(m==='slow'){const b=path()[S.bee];if(Math.hypot(p.x-b.x,p.y-b.y)<lane()*2.2){S.grab={t:performance.now(),x:p.x,y:p.y};return true}return false}
 if(m==='turn'){const q=pieceAt();if(!S.ok&&Math.hypot(p.x-q.x,p.y-q.y)<sz()*1.3){S.grab={x:null,y:null,x0:p.x,y0:p.y};return true}return false}
 if(m==='ask'){const b=binRects().findIndex(r=>inR(p,r));if(b>=0&&S.pick>=0){file(S.pick,b);return false}const k=jobRects().findIndex((r,j)=>!S.sorted.includes(j)&&inR(p,r));if(k>=0){S.grab={k,x:null,y:null,x0:p.x,y0:p.y};return true}}return false}
function move(p){const G=S.grab;if(!G)return;if(mode()==='slow'){steer(p);return}if(G.x!=null||Math.hypot(p.x-G.x0,p.y-G.y0)>8){G.x=p.x;G.y=p.y;A.redraw()}}
/* bee drag: too quick or off the green lane sends it back to the last flower check */
function steer(p){const G=S.grab,now=performance.now(),P=path(),dt=Math.max(1,now-G.t),v=Math.hypot(p.x-G.x,p.y-G.y)/dt;G.t=now;G.x=p.x;G.y=p.y;
 let best=S.bee,bd=1e9;for(let i=S.bee;i<Math.min(P.length,S.bee+6);i++){const d=Math.hypot(p.x-P[i].x,p.y-P[i].y);if(d<bd){bd=d;best=i}}
 if(v>A.W/420*1.6)return bump('Too fast! The bee bumped. Slow down on the twisty bits.');if(bd>lane()*1.6)return bump('Off the path! Slow down and stay on the green.');beeTo(best)}
function up(p){const G=S.grab,m=mode();S.grab=null;if(!G)return;if(m==='slow')return A.redraw();
 if(m==='say'){if(G.x==null||Math.hypot(p.x-kitAt().x,p.y-kitAt().y)<kitAt().r*2.2)return sayIt(G.k);return A.redraw()}
 if(m==='turn'){if(G.x==null)return turn();if(p.y<A.H*.5)return push();return A.redraw()}
 if(m==='ask'){if(G.x==null){S.pick=G.k;A.sound.tick();speak(`Picked: ${JOBS[G.k][1]} Now tap a basket.`);return A.redraw()}const b=binRects().findIndex(r=>inR(p,r));if(b>=0)return file(G.k,b);A.redraw()}}
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++gen;list.forEach((fn,j)=>setTimeout(()=>{if(k===gen)fn()},fast()?j*40+30:(j+1)*(gap||250)))}
const restart=()=>{gen++;Object.assign(S,fresh());if(A)setRound()};
const steps=[
{h:'Tricky signs',p:'Our body and our work give us clues when a job is tricky. Tap every tricky sign.',predict:{q:'Kit\'s tower fell 3 times and Kit feels cross. What does that tell us?',opts:['Kit is bad at towers','This job is tricky for Kit'],ans:1},task:'Find the tricky signs in 2 pictures',
 show:()=>{steps[0].go();play([0,1].flatMap(r=>SIGNS[r].map((s,k)=>[s,k]).filter(([s])=>s[2]).map(([,k])=>()=>tapSign(k))),220)},go:()=>{restart();speak('Tap each sign that the job is tricky.');pad.fill();S.want=check(0,()=>S.won>=2,'Tricky signs mean: stop and choose what to do.')}},
{h:'Say it',p:'When it is tricky, say so. Words help a grown-up know, and they help you think.',task:'Help Kit say it 3 times',
 show:()=>{steps[1].go();play([0,1,2].map(()=>()=>sayIt(SAY[r2()][2].findIndex(o=>o[1]==='ok'))),600)},go:()=>{restart();speak('The tower keeps falling. What can Kit say?');pad.fill();S.want=check(1,()=>S.won>=3,'This is tricky. I\'m stuck. Can you help me? All good words.')}},
{h:'Slow down',p:'Drag the bee to the flower. Stay on the green. If you rush, it bumps.',predict:{q:'The path is twisty. What helps the bee get home?',opts:['Go really fast','Go slow and careful'],ans:1},task:'Get the bee home 2 times',
 show:()=>{steps[2].go();play(Array.from({length:26},()=>slowStep),110)},go:()=>{restart();speak('Drag the bee slowly along the path.');pad.fill();S.want=check(2,()=>S.won>=2,'Slowing down helps on tricky bits.')}},
{h:'Try a new way',p:'The block bumps. Pushing the same way again will not help. Tap it to turn it, then push.',predict:{q:'The block bumps the hole. What will help?',opts:['Push the same way, harder','Turn it, try a new way'],ans:1},task:'Fit 3 blocks',
 show:()=>{steps[3].go();const t=()=>{if(!fits())turn();else push()};play(Array.from({length:12},()=>t),300)},go:()=>{restart();speak('Drag the block up to the hole, or tap it to turn it.');pad.fill();S.want=check(3,()=>S.won>=3,'When one way does not work, change something.')}},
{h:'Try or ask?',p:'Some tricky jobs we try again. Some need a grown-up. Drag each card to a basket.',task:'Sort all 6 cards',
 show:()=>{steps[4].go();play(JOBS.map((j,k)=>()=>file(k,j[2])),260)},go:()=>{restart();speak('Drag each card to Try again or Ask a grown-up.');pad.fill();S.want=check(4,()=>S.won>=1,'Asking for help is a smart choice, not giving up.')}},
{h:'Challenge',p:'',go:()=>{restart();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Your puzzle is hard and you feel cross. What is true?',[['It is tricky. I can choose what to do.','ok'],['I am bad at puzzles.','bad'],['I must throw it.','throw']]],
 ['The path is twisty. How do you go?',[['Slow and careful','ok'],['As fast as I can','rush'],['Shut my eyes','eyes']]],
 ['You pushed the block 2 times. It bumps. What next?',[['Turn it and try a new way','ok'],['Push the same way again','same'],['Give up for ever','quit']]],
 ['The jar lid is still stuck after 2 tries. What now?',[['Ask a grown-up for help','ok'],['Bang it on the floor','bang'],['Never ask anyone','never']]],
 ['You are stuck. What can you say?',[["I'm stuck. Can you help me?",'ok'],['Nothing, just hide it','hide'],['I am silly','bad']]]];
function why(t){let m='Notice it, say it, then slow down, try a new way or ask.';
 if(t==='bad')m='Tricky does not mean bad at it. It means you are learning something new.';if(t==='throw')m='Throwing it will not help. Say: this is tricky. Then choose.';
 if(t==='rush')m='Rushing on a twisty path makes you bump. Slow down.';if(t==='eyes')m='You need to look to stay on the path. Look and go slow.';
 if(t==='same')m='Same way, same bump. Change something: turn it.';if(t==='quit')m='You can try a new way, or ask for help. Then have another go.';
 if(t==='bang')m='That could break it or hurt you. You tried twice, so ask a grown-up.';if(t==='never')m='Asking for help is smart. Grown-ups like to help.';
 if(t==='hide')m='If you hide it, nobody can help. Say: I\'m stuck.';return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});speak('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! You noticed it and chose well.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;pad.el.hidden=A.step===5;pad.fill()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below),el=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);
  pad={el,fill(){el.innerHTML='';const m=mode(),B=(t,fn,l)=>{const b=E('button',{type:'button',class:'lbtn ghost','aria-label':l||null},el,t);b.onclick=fn};if(m==='quiz'||S.won>=need())return;
   if(m==='signs')SIGNS[r1()].forEach((s,k)=>{if(!S.found.includes(k))B(`${s[0]} ${s[1]}`,()=>tapSign(k))});
   if(m==='say')SAY[r2()][2].forEach((o,j)=>B('💬 '+o[0],()=>sayIt(j)));
   if(m==='slow'){B('🐢 Slow step',slowStep,'Move the bee one slow step');B('⏩ Zoom fast',zoom,'Zoom the bee fast')}
   if(m==='turn'){B('↻ Turn it',turn,'Turn the block');B('⬆ Push it in',push,'Push the block into the hole')}
   if(m==='ask'){B('Pick a card ▶',pickNext,'Pick the next card');BINS.forEach((t,b)=>B(`Put in: ${t}`,()=>{if(S.pick<0)pickNext();if(S.pick>=0)file(S.pick,b)}))}}};
  restart();A.gest({down,move,up})}});
A.start()})})();
