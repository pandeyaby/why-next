/* Flagship – connecting reading to experience (ages 5–7; NC England Y1 reading: link what they read or hear to their own
   experiences; Y2: draw on what they already know). Pick the memory that really links (not the same name or word), borrow a
   feeling, check the story's words when a character feels differently, predict from world knowledge, work out a new word. */
(()=>{
/* story line, three memories as [text, why]: ok = same thing happened, name = same name only, word = shares a word, off = not linked */
const MEMS=[["Maya's tooth is wobbly.",[['My tooth was wobbly too.','ok'],['My friend is called Maya.','name'],['I like apples.','off']]],
 ["Tom is lost in a big shop.",[['I went to a shop for milk.','word'],['I lost my mum in a shop once.','ok'],['My cat is called Tom.','name']]],
 ["The new baby cries all night.",[['I have a toy baby.','word'],['I ate peas.','off'],['My baby cousin cried and woke me.','ok']]],
 ["Ben's kite is stuck in a tree.",[['My ball got stuck on a roof.','ok'],['I like to climb trees.','word'],['My coat is red.','off']]],
 ["It is Lily's first day at school.",[['My school has a blue door.','word'],['I felt shy on my first day.','ok'],['I had toast today.','off']]]];
/* what happens, the feeling, two wrong feelings, a time from your own life to think of */
const FEEL=[['Sam\u2019s balloon flies away.','sad',['happy','sleepy'],'when you lost a toy'],['Gran hugs Ali at the door.','happy',['cross','scared'],'when someone you love hugs you'],
 ['A big dog barks at Pip.','scared',['happy','bored'],'when a loud thing made you jump'],['Jo knocks Jen\u2019s tower down on purpose.','cross',['happy','sleepy'],'when someone broke what you made'],
 ['Kai wins the race.','proud',['sad','scared'],'when you did something hard']];
/* words of the story line, index of the clue word, the feeling the story shows, the feeling many people have */
const TEXT=[[['Leo','is','at','the','dentist.','He','smiles.'],6,'happy','scared'],[['Rain!','Nell','jumps','in','puddles','and','laughs.'],6,'happy','cross'],
 [['Max','leaves','his','old','house.','He','cries.'],6,'sad','excited'],[['The','fair','is','loud.','Ana','hides','her','face.'],5,'scared','excited']];
/* what happens, three guesses (the first is right), what you know from life */
const NEXT=[['Dan plants a seed. He waters it every day.',['A little plant grows.','A cake grows.','The seed flies away.'],'seeds need water to grow'],
 ['Mia puts her snowman in the hot sun.',['It melts.','It gets bigger.','It sings a song.'],'snow melts when it is warm'],
 ['Raj has no coat. It starts to rain.',['He gets wet.','He gets hot.','He finds a fish.'],'rain makes you wet'],
 ['The baby is tired. She yawns.',['She goes to sleep.','She runs a race.','She reads a book.'],'tired people go to sleep']];
/* sentence, the new word, three meanings (the first is right), a time you felt it */
const WORD=[['The puppy came in from the rain, soaked.','soaked',['very wet','very hungry','very small'],'come in from heavy rain'],
 ['After the long walk, Dad was exhausted.','exhausted',['very tired','very happy','very cold'],'walk a long way'],
 ['The hot pie smelled delicious.','delicious',['very tasty','very old','very loud'],'smell your best dinner'],
 ['Sid shivered in the snow.','shivered',['shook with cold','laughed','ran fast'],'stand in the snow with no coat']];
VIS.reg('flagremind',c=>{let A,pad,qbox,turn=-1,epoch=0;c.fig.classList.add('young');
const M={};
const INKY='#1e1b4b',YES='#166534',NO='#9f1239',LINE='#57534e',HOLD='#1d4ed8',PAGE='#fffbeb',MEMO='#e0e7ff',MEMI='#3730a3',FACE='#fde68a';
const sz=v=>Math.round(v*(A.narrow?1:1.12)),typ=(v,w)=>`${w||800} ${sz(v)}px system-ui,sans-serif`;
const which=()=>['mem','feel','text','next','word','chal'][A.step],over=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function wash(){const g=A.ctx;g.fillStyle=A.col.dark?'#1c1917':'#fafaf9';g.fillRect(0,0,A.W,A.H)}
function banner(t,y,won){const g=A.ctx;let n=16;g.font=typ(n);while(g.measureText(t).width+34>A.W-8&&n>10){n--;g.font=typ(n)}
 const w=g.measureText(t).width+28,h=sz(n)+18;g.fillStyle=won?'#dcfce7':'#ffffff';A.paint.rrect(A.W/2-w/2,y-h/2,w,h,12);g.fill();g.lineWidth=2;g.strokeStyle=won?YES:LINE;g.stroke();
 g.fillStyle=INKY;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function tile(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.fill||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=o.rim?4:2;g.strokeStyle=o.rim||LINE;g.stroke();
 if(t==null)return;g.fillStyle=o.ink||INKY;g.font=typ(o.n||18);g.textAlign='center';g.textBaseline='middle';fitLines(t,r.x+r.w/2,r.y+r.h/2,r.w-12,sz(o.n||18)+4)}
function fitLines(t,x,y,maxw,lh){const g=A.ctx,out=[''];t.split(' ').forEach(w=>{const z=out[out.length-1]?out[out.length-1]+' '+w:w;if(g.measureText(z).width>maxw&&out[out.length-1])out.push(w);else out[out.length-1]=z});
 out.forEach((s,k)=>g.fillText(s,x,y+(k-(out.length-1)/2)*lh,maxw))}
function line(t,y,n){const g=A.ctx;g.fillStyle=A.col.tx;g.font=typ(n||17,700);g.textAlign='center';g.textBaseline='middle';fitLines(t,A.W/2,y,A.W-20,sz(n||17)+5)}
/* the open story book every step draws its line on */
const book=()=>({x:12,y:A.H*.15,w:A.W-24,h:A.H*.2});
function storyPage(t,hot){const b=book();tile(b,null,{fill:PAGE,rim:hot?HOLD:'#b45309'});const g=A.ctx;g.fillStyle='#78350f';g.font=typ(18,800);g.textAlign='center';g.textBaseline='middle';fitLines(t,b.x+b.w/2,b.y+b.h/2,b.w-20,sz(18)+5)}
/* a column of answer cards, big enough for small fingers */
function stack(list,y0){const w=Math.min(A.W-24,sz(330)),h=sz(54),gap=sz(10);return list.map((t,j)=>({x:A.W/2-w/2,y:y0+j*(h+gap),w,h,t,j}))}
function row2(list,y){const n=list.length,w=Math.min(sz(140),(A.W-24-(n-1)*10)/n),h=sz(56);return list.map((t,j)=>({x:A.W/2-(n*w+(n-1)*10)/2+j*(w+10),y,w,h,t,j}))}
const turnOrder=(arr,n)=>{const k=n%arr.length;return arr.slice(k).concat(arr.slice(0,k))};
/* ---- 1: this reminds me of… ---- */
const memList=n=>MEMS[n][1];
function drawMem(){const s=M.mem;wash();if(s.n>=MEMS.length){banner('All 5 linked',A.H*.07,1);line('A good link: the same thing happened to me.',A.H*.3);line('Same name or same word is not enough.',A.H*.45);line('This reminds me of when I\u2026',A.H*.62,19);return}
 banner(`Story ${s.n+1} of 5: which memory fits?`,A.H*.07);storyPage(MEMS[s.n][0],!!M.lift);const d=M.lift;
 stack(memList(s.n).map(m=>m[0]),A.H*.42).forEach(r=>tile(d&&d.j===r.j?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,r.t,{fill:MEMO,ink:MEMI,rim:d&&d.j===r.j?HOLD:s.bad===r.j?NO:null,n:16}))}
function mem(j){const s=M.mem;if(s.n>=MEMS.length)return;const [story,list]=MEMS[s.n],[t,why]=list[j],good=list.find(m=>m[1]==='ok')[0];
 if(why!=='ok'){s.bad=j;A.sound.miss();return say(why==='name'?`Same name, but that is all. It does not help you get the story. Try: ${good}`:why==='word'?`That has the same word, but not the same thing happening. Try: ${good}`:`That is not about the story. Try: ${good}`)}
 s.n++;s.bad=null;A.sound.pop();say(`${story} This reminds me: ${t}`+(s.n>=MEMS.length?' All 5 linked.':''))}
/* ---- 2: feel it ---- */
const feelOpts=n=>turnOrder([FEEL[n][1],...FEEL[n][2]],n);
const faceSpot=()=>({x:A.W/2-sz(70),y:A.H*.4,w:sz(140),h:sz(64)});
function drawFeel(){const s=M.feel;wash();if(s.n>=FEEL.length){banner('All 5 feelings found',A.H*.07,1);FEEL.forEach((q,i)=>line(`${q[0]} \u2192 ${q[1]}`,A.H*(.2+i*.15),15));return}
 const q=FEEL[s.n];banner(`Story ${s.n+1} of 5: how do they feel?`,A.H*.07);storyPage(q[0]);
 tile(faceSpot(),s.got||'?',{fill:FACE,ink:'#78350f',rim:s.bad?NO:'#b45309',n:22});line(`Think of ${q[3]}.`,A.H*.4+sz(84),15);const d=M.lift;
 row2(feelOpts(s.n),A.H*.72).forEach(r=>tile(d&&d.j===r.j?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,r.t,{fill:MEMO,ink:MEMI,rim:d&&d.j===r.j?HOLD:null,n:20}))}
function feel(v){const s=M.feel;if(s.n>=FEEL.length)return;const [what,ok,,life]=FEEL[s.n];
 if(v!==ok){s.bad=1;A.sound.miss();return say(`Think of ${life}. Did you feel ${v}? Most of us feel ${ok}.`)}
 s.n++;s.bad=0;s.got=null;A.sound.pop();say(`${what} I know that feeling: ${ok}.`+(s.n>=FEEL.length?' All 5 found.':''))}
/* ---- 3: check the story's words ---- */
function wordTiles(n){const g=A.ctx,ws=TEXT[n][0];g.font=typ(21);const h=sz(54),out=[];let x=10,y=A.H*.3,cur=[];
 const lay=()=>{const tot=cur.reduce((a,r)=>a+r.w,0)+8*(cur.length-1);let xx=A.W/2-tot/2;cur.forEach(r=>{r.x=xx;xx+=r.w+8;out.push(r)});cur=[]};
 ws.forEach((t,i)=>{const w=g.measureText(t).width+22;if(x+w>A.W-10&&cur.length){lay();x=10;y+=h+8}cur.push({x,y,w,h,t,i});x+=w+8});lay();return out}
function drawText(){const s=M.text;wash();if(s.n>=TEXT.length){banner('All 4 checked: the story wins',A.H*.07,1);TEXT.forEach((q,i)=>line(`${q[0][q[1]].replace(/[.!]/g,'')} \u2192 ${q[2]}, not ${q[3]}`,A.H*(.24+i*.16),16));return}
 const q=TEXT[s.n];banner(`Story ${s.n+1} of 4: tap the clue word`,A.H*.07);line(`Lots of people feel ${q[3]} here. What does the story show?`,A.H*.19,14);
 wordTiles(s.n).forEach(r=>tile(r,r.t,{n:21,fill:r.i===q[1]&&s.seen?'#dcfce7':s.bad===r.i?'#ffe4e6':'#ffffff',rim:r.i===q[1]&&s.seen?YES:s.bad===r.i?NO:null}))}
function clue(i){const s=M.text;if(s.n>=TEXT.length)return;const [ws,k,shown,mine]=TEXT[s.n],bare=w=>w.replace(/[.!]/g,'');
 if(i!==k){s.bad=i;A.sound.miss();return say(`${bare(ws[i])} does not tell us a feeling. Find the word that shows how they feel.`)}
 s.n++;s.bad=null;A.sound.pop();say(`${bare(ws[k])}: they feel ${shown}, not ${mine}. You might feel ${mine}, but the story shows ${shown}.`+(s.n>=TEXT.length?' All 4 checked.':''))}
/* ---- 4: what happens next? ---- */
const nextOpts=n=>turnOrder(NEXT[n][1],n+1);
function drawNext(){const s=M.next;wash();if(s.n>=NEXT.length){banner('All 4 guessed from what you know',A.H*.07,1);NEXT.forEach((q,i)=>line(`${q[2]}: ${q[1][0]}`,A.H*(.24+i*.16),15));return}
 banner(`Story ${s.n+1} of 4: what happens next?`,A.H*.07);storyPage(NEXT[s.n][0]);
 stack(nextOpts(s.n),A.H*.42).forEach(r=>tile(r,r.t,{fill:MEMO,ink:MEMI,rim:s.bad===r.t?NO:null,n:18}))}
function next(v){const s=M.next;if(s.n>=NEXT.length)return;const [,opts,know]=NEXT[s.n];
 if(v!==opts[0]){s.bad=v;A.sound.miss();return say(`Could that really happen? You know ${know}. So: ${opts[0]}`)}
 s.n++;s.bad=null;A.sound.pop();say(`Yes. You know ${know}.`+(s.n>=NEXT.length?' All 4 done.':''))}
/* ---- 5: a new word from a time you felt it ---- */
const wordOpts=n=>turnOrder(WORD[n][2],n+2);
const wordSlot=()=>({x:A.W/2-sz(90),y:A.H*.39,w:sz(180),h:sz(56)});
function drawWord(){const s=M.word;wash();if(s.n>=WORD.length){banner('All 4 new words worked out',A.H*.07,1);WORD.forEach((q,i)=>line(`${q[1]} = ${q[2][0]}`,A.H*(.24+i*.16),18));return}
 const q=WORD[s.n];banner(`Word ${s.n+1} of 4: what does ${q[1]} mean?`,A.H*.07);storyPage(q[0]);tile(wordSlot(),q[1],{fill:FACE,ink:'#78350f',rim:s.bad?NO:'#b45309',n:22});
 line(`Think: how do you feel when you ${q[3]}?`,A.H*.39+sz(76),14);const d=M.lift;
 row2(wordOpts(s.n),A.H*.74).forEach(r=>tile(d&&d.j===r.j?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,r.t,{fill:MEMO,ink:MEMI,rim:d&&d.j===r.j?HOLD:null,n:15}))}
function word(v){const s=M.word;if(s.n>=WORD.length)return;const [,w,opts,life]=WORD[s.n];
 if(v!==opts[0]){s.bad=1;A.sound.miss();return say(`Think of when you ${life}. Would you be ${v}? ${w} means ${opts[0]}.`)}
 s.n++;s.bad=0;A.sound.pop();say(`${w} means ${opts[0]}.`+(s.n>=WORD.length?' All 4 worked out.':''))}
function draw(){const k=which();if(k==='chal'){wash();banner('Challenge',A.H*.25,1);banner('This reminds me of when I\u2026',A.H*.55);return}
 ({mem:drawMem,feel:drawFeel,text:drawText,next:drawNext,word:drawWord})[k]();A.fx.draw(A.ctx)}
function press(p){const k=which();
 if(k==='mem'&&M.mem.n<MEMS.length){const r=stack(memList(M.mem.n).map(m=>m[0]),A.H*.42).find(r=>over(p,r));if(r){M.lift={j:r.j,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 if(k==='feel'&&M.feel.n<FEEL.length){const r=row2(feelOpts(M.feel.n),A.H*.72).find(r=>over(p,r));if(r){M.lift={j:r.j,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}return false}
 if(k==='text'&&M.text.n<TEXT.length){const r=wordTiles(M.text.n).find(r=>over(p,r));if(r)clue(r.i);return false}
 if(k==='next'&&M.next.n<NEXT.length){const r=stack(nextOpts(M.next.n),A.H*.42).find(r=>over(p,r));if(r)next(r.t);return false}
 if(k==='word'&&M.word.n<WORD.length){const r=row2(wordOpts(M.word.n),A.H*.74).find(r=>over(p,r));if(r){M.lift={j:r.j,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}}return false}
function slide(p){if(M.lift){M.lift.x=p.x;M.lift.y=p.y;A.redraw()}}
/* a drop on the target, or a plain tap (hardly moved), both count as choosing that card */
function release(p){const d=M.lift;if(!d)return;M.lift=null;const k=which(),tap=Math.hypot(p.x-d.x0,p.y-d.y0)<12;
 if(k==='mem'){if(tap||over(p,book()))mem(d.j);else A.redraw();return}
 if(k==='feel'){const v=feelOpts(M.feel.n)[d.j];if(tap||over(p,faceSpot())||p.y<A.H*.6)feel(v);else A.redraw();return}
 if(k==='word'){const v=wordOpts(M.word.n)[d.j];if(tap||over(p,wordSlot())||over(p,book()))word(v);else A.redraw()}}
function fresh(){epoch++;for(const k in M)delete M[k];Object.assign(M,{mem:{n:0},feel:{n:0},text:{n:0},next:{n:0},word:{n:0},lift:null,judge:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keypad();M.judge()}
function begin(i,desc,ok,msg){fresh();say(desc);M.judge=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(me===epoch)f()},ms*(j+1)))}
function keypad(){if(!pad)return;pad.innerHTML='';const k=which(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='mem'&&M.mem.n<MEMS.length)memList(M.mem.n).forEach((m,j)=>add(m[0],()=>mem(j),`Link the story to: ${m[0]}`));
 if(k==='feel'&&M.feel.n<FEEL.length)feelOpts(M.feel.n).forEach(v=>add(v,()=>feel(v),`They feel ${v}`));
 if(k==='text'&&M.text.n<TEXT.length)TEXT[M.text.n][0].forEach((t,i)=>add(t.replace(/[.!]/g,''),()=>clue(i),`Clue word: ${t.replace(/[.!]/g,'')}`));
 if(k==='next'&&M.next.n<NEXT.length)nextOpts(M.next.n).forEach(v=>add(v,()=>next(v),`Next: ${v}`));
 if(k==='word'&&M.word.n<WORD.length)wordOpts(M.word.n).forEach(v=>add(v,()=>word(v),`${WORD[M.word.n][1]} means ${v}`))}
const steps=[
{h:'This reminds me of\u2026',p:'Good readers think: this reminds me of a time when I\u2026 Drag the memory that fits the story onto the book.',
predict:{q:'Maya\u2019s tooth is wobbly. Which memory helps more?',opts:['My friend is called Maya.','My tooth was wobbly too.'],ans:1},task:'Link all 5 stories',
show:()=>demo(0,MEMS.map(q=>()=>mem(q[1].findIndex(m=>m[1]==='ok'))),600),
go:()=>begin(0,"Maya's tooth is wobbly. Drag the memory that fits onto the book.",()=>M.mem.n>=MEMS.length,'The best link is when the same thing happened to you.')},
{h:'Feel it too',p:'Think of a time it happened to you. How did you feel? The person in the story may feel the same. Drag a feeling onto the face.',task:'Find all 5 feelings',
show:()=>demo(1,FEEL.map(q=>()=>feel(q[1])),600),
go:()=>begin(1,'Sam\u2019s balloon flies away. Drag a feeling onto the face.',()=>M.feel.n>=FEEL.length,'Your own feelings help you understand a story.')},
{h:'Check the story',p:'Not everyone feels the same as you. The words in the story tell you how this person feels. Tap the clue word.',
predict:{q:'You feel scared at the dentist. Is Leo scared too?',opts:['Yes, like me','I must read the story'],ans:1},task:'Check all 4 stories',
show:()=>demo(2,TEXT.map(q=>()=>clue(q[1])),650),
go:()=>begin(2,'Leo is at the dentist. He smiles. Tap the word that shows how Leo feels.',()=>M.text.n>=TEXT.length,'Use your life, then check the words.')},
{h:'What happens next?',p:'You know lots about the world. Use it to guess what will happen next. Tap the best guess.',task:'Guess all 4',
show:()=>demo(3,NEXT.map(q=>()=>next(q[1][0])),650),
go:()=>begin(3,'Dan plants a seed. He waters it every day. What happens next?',()=>M.next.n>=NEXT.length,'What you know helps you think ahead.')},
{h:'New words',p:'A new word? Think of a time you felt it or saw it. Drag the meaning onto the word.',
predict:{q:'Sid shivered in the snow. Think of snow. Did Sid shake or laugh?',opts:['He laughed','He shook with cold'],ans:1},task:'Work out all 4 words',
show:()=>demo(4,WORD.map(q=>()=>word(q[2][0])),650),
go:()=>begin(4,'The puppy came in from the rain, soaked. Drag a meaning onto soaked.',()=>M.word.n>=WORD.length,'Your own life helps you work out new words.')},
{h:'Challenge',p:'',go:()=>{fresh();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.judge()});
const QS=[
{q:'Kim\u2019s goldfish dies. Which memory helps you feel how Kim feels?',a:'My pet died and I cried.',o:[['My aunt is called Kim.','name'],['I like fish fingers.','word']]},
{q:'Jay falls off his bike and cuts his knee. How does he feel?',a:'hurt and upset',o:[['happy','feel'],['sleepy','feel']]},
{q:'You love the dark. Bea says, \u201cI hate the dark!\u201d How does Bea feel?',a:'scared of the dark',o:[['She loves it, like me','self'],['She is hungry','off']]},
{q:'Pip leaves his ice lolly in the hot sun. What happens next?',a:'It melts.',o:[['It gets cold.','life'],['It grows.','life']]},
{q:'The giant stomped. Think of how you walk when you stomp. What does stomped mean?',a:'walked with big, heavy steps',o:[['walked on tiptoe','word2'],['sang a song','off']]},
{q:'Which is a good link to a story about a lost dog?',a:'This reminds me of when my dog ran off.',o:[['I like the cover.','surface'],['My sock is blue.','off']]}];
function fault(t){let m='Think of a time the same thing happened to you.';
 switch(t){case 'name':m='Same name, but nothing the same happened. Look for the same event or feeling.';break;
 case 'word':m='It shares a word (fish), but not what happened. A pet dying is what links to Kim.';break;
 case 'feel':m='Think of a time you fell and got hurt. You did not feel happy or sleepy.';break;
 case 'self':m='You love the dark, but Bea says she hates it. The story\u2019s words win.';break;
 case 'off':m='That has nothing to do with the story.';break;
 case 'life':m='You know what the hot sun does to ice: it melts.';break;
 case 'word2':m='Stomping is loud and heavy. Tiptoe is quiet and soft.';break;
 case 'surface':m='Liking the cover is not about what happens. Link the lost dog to a time you lost something.';break}
 return m}
function pose(){turn++;const Q=QS[turn%QS.length],all=[[Q.a,'ok'],...Q.o],r=turn%3,ord=all.slice(r).concat(all.slice(0,r));
 qbox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=qbox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+fault(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=pose;c.say(ok?'Yes.':fault(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:B=>{qbox.hidden=B.step!==5;pad.hidden=B.step===5;keypad()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Story link buttons'},w);qbox=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down:press,move:slide,up:release});keypad()}}).start()})})();
