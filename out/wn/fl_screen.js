/* Flagship: text and media connections (ages 9–10; CCSS ELA RL.4.7: connect the text of a story or drama with a visual
   or oral presentation of it, noting where each version reflects specific descriptions and directions in the text).
   Match film shots to the exact sentence they show, sort film moments into "matches" or "changed", link moments on
   stage to the stage directions they follow, give each audiobook line the voice its words call for, and choose the
   shot that shows a feeling the book only tells. Every tap and drag also has a button below the picture. */
(()=>{
const {C,BOOK,ABOUT,SHOTS,FILM,BINS,SCRIPT,STAGE,VOICES,LINES,FEEL,QS}=SCREENART;
VIS.reg('flagscreen',c=>{let A,X,btns,chal,qn=-1,run=0;const S={after:()=>{}};
const z=n=>Math.round(n*Math.min(1.22,Math.max(1,A.W/380)));
const say=m=>{c.say(m);A.cv.setAttribute('aria-label',m)};
const mode=()=>['shots','sort','stage','voice','feel','quiz'][A.step];
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function font(n,w){X.font=`${w||700} ${z(n)}px system-ui,sans-serif`}
function text(t,x,y,n,col,w,al){font(n,w);X.fillStyle=col||C.ink;X.textAlign=al||'left';X.textBaseline='middle';X.fillText(t,x,y)}
function lines(t,maxW,n,w){font(n,w);const out=[];let row='';String(t).split(' ').forEach(word=>{const next=row?row+' '+word:word;if(row&&X.measureText(next).width>maxW){out.push(row);row=word}else row=next});out.push(row);return out}
function box(x,y,w,h,fill,edge,lw,r){A.paint.rrect(x,y,w,h,r||10);X.fillStyle=fill;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
/* a block of wrapped text inside a box; returns its rectangle */
function block(t,x,y,w,n,fill,edge,col,wt,lw){const L=lines(t,w-z(16),n,wt),lh=z(n)+5,h=L.length*lh+z(10);box(x,y,w,h,fill,edge,lw);L.forEach((r,i)=>text(r,x+z(8),y+z(5)+lh*(i+.5),n,col,wt));return{x,y,w,h}}
/* film-strip banner for the current shot, moment or line */
function reel(t,y){const w=A.W-24,L=lines(t,w-z(44),14,800),lh=z(14)+5,h=Math.max(z(40),L.length*lh+z(14));box(12,y,w,h,C.reelBg,C.reel,2.5,6);X.fillStyle=C.reel;
 for(let k=0;k<Math.floor(h/12);k++){X.fillRect(16,y+5+k*12,8,6);X.fillRect(A.W-24,y+5+k*12,8,6)}L.forEach((r,i)=>text(r,A.W/2,y+h/2+(i-(L.length-1)/2)*lh,14,C.reel,800,'center'));return y+h}
function head(t,won){const L=lines(t,A.W-44,13,700),lh=z(13)+4,h=L.length*lh+z(12);box(12,10,A.W-24,h,won?C.goodBg:'#fff7ed',won?C.good:C.rim,2);L.forEach((r,i)=>text(r,A.W/2,10+h/2+(i-(L.length-1)/2)*lh,13,won?C.good:C.ink,700,'center'));return 10+h+z(6)}
function note(){if(!S.msg)return;const L=lines((S.bad?'✗ ':'✓ ')+S.msg,A.W-48,13,700),lh=z(13)+5,h=L.length*lh+12,y=A.H-h-8;box(12,y,A.W-24,h,'#ffffff',S.bad?C.oops:C.good,3);L.forEach((r,i)=>text(r,A.W/2,y+6+lh*(i+.5),13,S.bad?C.oops:C.ink,700,'center'))}
const wrong=m=>{S.bad=true;S.msg=m;A.sound.miss();sync()};
const right=m=>{S.bad=false;S.msg=m;A.sound.pop()};
/* step 0: which sentence does the shot show? */
function pickSentence(i){if(S.won)return;const sh=SHOTS[S.i];if(i!==sh[1])return wrong(`That sentence is about ${ABOUT[i]}. This shot shows ${ABOUT[sh[1]]}.`);
 S.lit.push(i);right(`Yes: “${BOOK[i]}”`);S.i++;if(S.i===SHOTS.length){S.won=true;S.msg='Every shot came from exact words in the book.'}sync()}
/* step 1: match or changed? */
function sortMoment(b){if(S.won)return;const f=FILM[S.i];if(b!==f[1])return wrong(`Check the book. ${f[3]}`);S.bins[b].push(f[2]);right(f[3]);S.i++;if(S.i===FILM.length){S.won=true;S.msg='Three details kept, three changed. Name the words each time.'}sync()}
/* step 2: which stage direction is the actor following? */
function pickDirection(row,spoken){if(S.won)return;const m=STAGE[S.i];if(spoken)return wrong('That is a spoken line: the actor says it out loud. Stage directions are the words in brackets.');
 if(row!==m[1])return wrong(`That direction is ${SCRIPT[row][1]}. Find the one that tells the actor to do what you see.`);S.lit.push(row);right(`The actor followed ${SCRIPT[row][1]}.`);S.i++;
 if(S.i===STAGE.length){S.won=true;S.msg='Nobody said the words in brackets. The actors turned them into actions.'}sync()}
/* step 3: which voice do the words ask for? */
function pickVoice(v){if(S.won)return;const l=LINES[S.i];if(v!==l[1])return wrong(`Look at “${l[2]}”. Those words ask for a ${VOICES[l[1]].toLowerCase()} voice, not ${VOICES[v].toLowerCase()}.`);
 right(`${VOICES[v]}: the clue is “${l[2]}”.`);S.i++;if(S.i===LINES.length){S.won=true;S.msg='The reader’s voice comes from clues in the words.'}sync()}
/* step 4: which shot shows the feeling? options rotate so the right one is not always first */
const order=i=>[0,1,2].map(k=>(k+i)%3);
function pickShot(k){if(S.won)return;const f=FEEL[S.i];if(k)return wrong(f[2][k-1]);right(`Yes. The book tells it; the film shows it.`);S.i++;if(S.i===FEEL.length){S.won=true;S.msg='A film shows feelings with faces, sound and wide or close shots.'}sync()}
function drawShots(t,b){const sh=SHOTS[Math.min(S.i,SHOTS.length-1)];let y=reel(S.won?'All four shots found.':`Shot ${S.i+1} of 4. ${sh[0]}`,t)+z(8);
 S.hits=BOOK.map((s,i)=>{const on=S.lit.includes(i),r=block(s,14,y,A.W-28,13,on?C.lit:'#ffffff',on?C.litInk:C.rim,on?C.litInk:C.ink,on?800:600,on?3:1.5);r.i=i;y+=r.h+z(5);return r})}
function drawSort(t,b){const f=FILM[Math.min(S.i,FILM.length-1)];let y=t;
 if(!S.won){const w=Math.min(A.W-40,z(300)),d=S.drag,x=d?d.x-w/2:(A.W-w)/2,yy=d?d.y-z(20):y;S.card=block(f[0],x,yy,w,15,'#ffffff',C.reel,C.ink,800,d?4:3);if(d)S.card={x:(A.W-w)/2,y,w,h:S.card.h};y+=S.card.h+z(12)}else{S.card=null;y+=z(10)}
 const w=(A.W-36)/2,h=Math.max(z(110),b-y-z(4));S.hits=BINS.map((n,k)=>{const r={x:12+k*(w+12),y,w,h,k};box(r.x,y,w,h,k?C.oopsBg:C.goodBg,k?C.oops:C.good,2.5);
  lines(n,w-12,13,900).forEach((s,i)=>text(s,r.x+w/2,y+z(16)+i*z(17),13,k?C.oops:C.good,900,'center'));S.bins[k].forEach((s,i)=>text('• '+s,r.x+z(10),y+z(52)+i*z(20),12,C.ink,700));return r})}
function drawStage(t,b){const m=STAGE[Math.min(S.i,STAGE.length-1)];let y=reel(S.won?'All four moments matched.':`On stage: ${m[0]}`,t)+z(10);S.hits=[];
 SCRIPT.forEach((r,j)=>{if(r[0]){text(r[0],18,y+z(8),12,C.soft,900);y+=z(18)}const on=S.lit.includes(j);font(14,800);const dw=Math.min(A.W-36,X.measureText(r[1]).width+z(20)),d={x:18,y,w:dw,h:z(30),row:j};
  box(d.x,y,dw,d.h,on?C.lit:C.dirBg,on?C.litInk:C.dir,on?3:2,15);text(r[1],d.x+z(10),y+d.h/2,14,on?C.litInk:C.dir,800);S.hits.push(d);y+=d.h+z(4);
  if(r[2]){font(15,700);const s={x:18,y,w:X.measureText(r[2]).width+z(14),h:z(24),row:j,spoken:1};text(r[2],s.x+z(4),y+s.h/2,15,C.ink,700);S.hits.push(s);y+=s.h}y+=z(8)})}
function drawVoice(t,b){const l=LINES[Math.min(S.i,LINES.length-1)];const L=lines(S.won?'All four lines voiced.':l[0],A.W-60,19,800);let y=t+z(8);box(16,y,A.W-32,L.length*z(26)+z(18),'#ffffff',C.rim,2);
 L.forEach((r,i)=>text(r,A.W/2,y+z(9)+z(26)*(i+.5),19,C.ink,800,'center'));y+=L.length*z(26)+z(30);const w=(A.W-44)/2,h=Math.min(z(62),(b-y-z(10))/2);
 S.hits=VOICES.map((v,k)=>{const r={x:16+(k%2)*(w+12),y:y+Math.floor(k/2)*(h+10),w,h,k};box(r.x,r.y,w,h,C.reelBg,C.reel,2.5);text(v,r.x+w/2,r.y+h/2,20,C.reel,900,'center');return r})}
function drawFeel(t,b){const f=FEEL[Math.min(S.i,FEEL.length-1)];let y=t;const bk=block('Book: '+(S.won?'all three feelings shown.':f[0]),14,y,A.W-28,15,'#fff7ed',C.litInk,C.litInk,800,2.5);y+=bk.h+z(10);
 S.hits=S.won?[]:order(S.i).map(k=>{const r=block(f[1][k],14,y,A.W-28,14,'#ffffff',C.reel,C.ink,700,2);r.k=k;y+=r.h+z(8);return r})}
function draw(){X.fillStyle=A.col.dark?'#1c1917':C.paper;X.fillRect(0,0,A.W,A.H);X.fillStyle=C.paper;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const m=mode(),T={shots:['Which sentence does this shot show? Tap it.','Shots matched to words.'],sort:['Does the film match the book? Drag the card to a box, or tap a box.','Film checked against the book.'],
  stage:['Which stage direction is the actor following? Tap it.','Directions found.'],voice:['How should the reader say this line? Tap a voice.','Voices chosen.'],feel:['Which shot shows this feeling? Tap it.','Feelings shown.'],quiz:['Book, film, stage and audio.','']};
 const t=head(T[m][S.won?1:0]||T[m][0],S.won),b=A.H-(S.msg?z(66):z(10));
 if(m==='shots')drawShots(t,b);if(m==='sort')drawSort(t,b);if(m==='stage')drawStage(t,b);if(m==='voice')drawVoice(t,b);if(m==='feel')drawFeel(t,b);
 if(m==='quiz')lines('Find the exact words. Say what the film, stage or audio version kept, changed or showed in its own way.',A.W-40,15,700).forEach((r,i)=>text(r,A.W/2,t+z(30)+i*z(24),15,C.soft,700,'center'));note();A.fx.draw(X)}
function down(p){const m=mode();if(S.won)return false;if(m==='sort'&&hit(p,S.card)){S.drag={x:p.x,y:p.y};A.redraw();return true}const r=(S.hits||[]).find(q=>hit(p,q));if(!r)return false;
 if(m==='shots')pickSentence(r.i);if(m==='sort')sortMoment(r.k);if(m==='stage')pickDirection(r.row,!!r.spoken);if(m==='voice')pickVoice(r.k);if(m==='feel')pickShot(r.k);return true}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){if(!S.drag)return;S.drag=null;const r=(S.hits||[]).find(q=>hit(p,q));if(r&&mode()==='sort')sortMoment(r.k);else A.redraw()}
function sync(){const m=mode();let d='Challenge.';
 if(m==='shots')d=S.won?'All shots matched.':`Shot ${S.i+1} of 4: ${SHOTS[S.i][0]} Book sentences: ${BOOK.join(' ')}`;
 if(m==='sort')d=S.won?'All six film moments sorted.':`Film moment ${S.i+1} of 6: ${FILM[S.i][0]} Book: ${BOOK.slice(0,4).join(' ')} ${BOOK[5]}`;
 if(m==='stage')d=S.won?'All four stage moments matched.':`On stage: ${STAGE[S.i][0]} Stage directions: ${SCRIPT.map(r=>r[1]).join(', ')}.`;
 if(m==='voice')d=S.won?'All four lines voiced.':`Line ${S.i+1} of 4: ${LINES[S.i][0]} Voices: ${VOICES.join(', ')}.`;
 if(m==='feel')d=S.won?'All three feelings shown.':`Book: ${FEEL[S.i][0]} Shots: ${order(S.i).map(k=>FEEL[S.i][1][k]).join(' Or: ')}`;
 say((S.msg?S.msg+' ':'')+d);pads();S.after()}
function pads(){if(!btns)return;btns.innerHTML='';const m=mode(),add=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},btns,t).onclick=()=>{fn();sync()}};if(S.won)return A.redraw();
 if(m==='shots')BOOK.forEach((s,i)=>add(`Sentence ${i+1}: ${s.split(' ').slice(0,4).join(' ')}…`,()=>pickSentence(i)));
 if(m==='sort')BINS.forEach((n,k)=>add(n,()=>sortMoment(k)));
 if(m==='stage')SCRIPT.forEach((r,j)=>add(r[1],()=>pickDirection(j,false)));
 if(m==='voice')VOICES.forEach((v,k)=>add(v,()=>pickVoice(k)));
 if(m==='feel')order(S.i).forEach(k=>add(FEEL[S.i][1][k],()=>pickShot(k)));A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++run;fns.forEach((f,j)=>setTimeout(()=>{if(id===run){f();sync()}},(j+1)*(A.reduced()?60:ms)))};
function reset(){run++;Object.assign(S,{after:()=>{},won:false,msg:'',bad:false,i:0,lit:[],bins:[[],[]],drag:null,hits:[],card:null})}
const steps=[
{h:'From words to pictures',p:'A film of a story is built from the words. Each shot shows something the writer described. Find the exact sentence behind each shot.',
task:'Match 4 shots to their sentences',show:()=>{steps[0].go();play(SHOTS.map(s=>()=>pickSentence(s[1])),500)},go:()=>{reset();sync();S.after=ready(0,()=>S.won,'You can point to the words behind every shot.')}},
{h:'Same or changed?',p:'Film makers keep some details and change others. Check each film moment against the words in the book.',
predict:{q:'A film of a book will show…',opts:['Every detail exactly as written','Some details the same, some changed','Nothing from the book'],ans:1},
task:'Sort 6 film moments',show:()=>{steps[1].go();play(FILM.map(f=>()=>sortMoment(f[1])),450)},go:()=>{reset();sync();S.after=ready(1,()=>S.won,'Three kept, three changed.')}},
{h:'Stage directions come alive',p:'A play script has two kinds of words: lines the actors speak, and stage directions in brackets that tell them what to do.',
predict:{q:'In a play script, the words in brackets are…',opts:['Said out loud by the actor','Instructions for how to act','Notes for the audience to read'],ans:1},
task:'Match 4 stage moments',show:()=>{steps[2].go();play(STAGE.map(m=>()=>pickDirection(m[1],false)),500)},go:()=>{reset();sync();S.after=ready(2,()=>S.won,'Directions are acted, not spoken.')}},
{h:'Hear the audiobook',p:'An audiobook reader turns clues in the words into a voice: a quiet whisper, a loud BANG, a pause at three dots.',
predict:{q:'How does the reader know to whisper a line?',opts:['They choose at random','A word in the text, like “whispered”','Every line is read the same way'],ans:1},
task:'Give 4 lines a voice',show:()=>{steps[3].go();play(LINES.map(l=>()=>pickVoice(l[1])),500)},go:()=>{reset();sync();S.after=ready(3,()=>S.won,'The words told the reader how to sound.')}},
{h:'Show, not tell',p:'A book can tell you what a character feels. A film has to show it, with faces, sounds and how close the camera is.',
task:'Pick the shot for 3 feelings',show:()=>{steps[4].go();play(FEEL.map(()=>()=>pickShot(0)),650)},go:()=>{reset();sync();S.after=ready(4,()=>S.won,'Each shot matches what the book says.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.after()});
function ask(){qn++;const [q,ok,bad]=QS[qn%QS.length],all=[[ok,'ok']].concat(bad),r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>judge(tag,ok)});say('Challenge: '+q);A.redraw()}
let streak=0;
function judge(tag,ok){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),good=tag==='ok';let m='Go back to the exact words in the book.';
 if(tag==='near')m='Close is not the same. Compare word by word: one detail is different, so it is a change.';
 if(tag==='book')m='The book is the starting point. When the film differs, the film has changed it.';
 if(tag==='spoken')m='That is a spoken line. Words in brackets are stage directions: actors do them, not say them.';
 if(tag==='flip')m='“Whispered” means quiet. A loud voice goes against the words.';
 if(tag==='other')m='Nothing in “whispered” says fast. It tells you how loud, so read it quietly.';
 if(tag==='tell')m='That tells the feeling out loud. A film usually shows it with faces and sound, as the book’s words suggest.';
 if(tag==='mood')m='A sunny beach feels happy and calm. It does not show fear.';
 if(tag==='memory')m='Memory slips. Find the exact words first, then compare.';
 if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes: '+ok+'. In a row: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.4,draw,onStep:B=>{chal.hidden=B.step!==5;btns.hidden=B.step===5;pads()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);btns=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Text and media lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
