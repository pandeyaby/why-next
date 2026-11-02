/* Flagship – predicting what happens next in a story (ages 4–7). A prediction is a guess that fits the clues: the title,
   the pictures and what has happened so far. Find the clues on a cover, pick the guess the story points to, name the clue
   that backs a guess, then turn the page and keep or change the guess. Every drag has a big button twin. */
(()=>{
const COVER={t:'The Lost Kite',chips:[['“Lost” in the title',1],['A kite in a tree',1],['A girl looks up',1],['It has 20 pages',0,'The number of pages does not tell you what happens. Look at the words and the picture.'],['It is a big book',0,'Big books and small books can be about anything. Look at the title and the picture.']]};
const STORY=[{p:[['🧒','He gets a spade'],['👒','He puts on a sun hat'],['🚗','He gets in the car']],o:[['🏖️ He goes to the beach',1],['🛏️ He goes to bed',0,'Bed? Nothing in the story says it is night. A spade and a sun hat point to sand and sun.'],['🚀 He flies to the moon',0,'That is fun, but no clue points to the moon. A good guess fits the spade, the hat and the car.']]},
 {p:[['🐶','A dog sees a cat'],['🐱','The cat runs'],['💨','The dog gets ready']],o:[['🐶 The dog runs after the cat',1],['😴 The dog has a nap',0,'The dog is getting ready, not sleepy. What does a dog do when a cat runs?'],['📖 The dog reads a book',0,'Dogs in this story do dog things. Use what happened: the cat ran and the dog got ready.']]},
 {p:[['🎂','Mum makes a cake'],['🎈','She blows up balloons'],['🔔','Ding dong! Friends come']],o:[['🎉 It is a party',1],['🏫 It is time for school',0,'Cake, balloons and friends at the door are not school clues. Put the clues together.'],['🌧️ It starts to rain',0,'Nothing in the story is about the sky. The cake, the balloons and the friends all point one way.']]}];
const WHY=[{g:'Ben’s ice cream will melt.',o:[['☀️ The sun is very hot',1],['👕 Ben has a red top',0,'A red top does not make ice cream melt. Which clue would make it melt?'],['🐦 A bird sings',0,'A bird singing does not change the ice cream. Look for the clue about heat.']]},
 {g:'Tom will get wet.',o:[['🌧️ Dark clouds, then rain',1],['🎒 Tom has a bag',0,'A bag does not make you wet. Which clue is about water?'],['🐈 A cat sits on a wall',0,'The cat is just there. It is not the reason. Find the clue about rain.']]},
 {g:'The tower will fall down.',o:[['🧱 The tower wobbles',1],['🔴 The blocks are red',0,'Red blocks can stand up fine. What shows the tower is about to fall?'],['🧸 Teddy is watching',0,'Teddy watching does not push the tower. Which clue shows it is not steady?']]}];
const TURN=[{g:'They will play on the sand.',n:['🌧️','Big rain starts. Splash!'],o:[['Keep: they play on the sand',0,'The new page changed things. Rain is a new clue, so change your guess.'],['Change: they run inside',1]]},
 {g:'The dog will catch the cat.',n:['🌳','The cat jumps up a tree.'],o:[['Keep: the dog catches the cat',0,'Dogs cannot climb trees. The new page is a clue, so change your guess.'],['Change: the cat gets away',1]]},
 {g:'It is a party.',n:['🎁','Friends bring presents and sing.'],o:[['Keep: it is a party',1],['Change: it is not a party',0,'Presents and singing are party clues too. The new page fits your guess, so keep it.']]}];
VIS.reg('flagpgnext',c=>{let A,pad,quiz,qn=-1,run=0,row=0;c.fig.classList.add('young');
const fresh=()=>({at:0,got:0,need:3,bad:-1,found:[],hold:null,hot:[],after:()=>{},fast:0,ok:0}),S=fresh();
const mode=()=>['hi','cover','story','why','turn','quiz'][A.step];
const k=v=>Math.round(v*(A.narrow?1:1.1)),quick=()=>A.reduced()||S.fast;
const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function words(g,s,x,y,w,px,col,wt){g.font=`${wt||800} ${k(px)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const out=[''];String(s).split(' ').forEach(p=>{const j=out.length-1,t=out[j]?out[j]+' '+p:p;if(out[j]&&g.measureText(t).width>w)out.push(p);else out[j]=t});
 out.forEach((l,i)=>g.fillText(l,x,y+(i-(out.length-1)/2)*k(px)*1.25))}
function pic(g,e,x,y,s){g.fillStyle='#000';g.font=`${Math.round(s)}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
function tile(g,r,tone,dash){const C=A.col,h={ok:C.gr,no:C.rd,am:C.am,cy:C.cy,vi:C.vi}[tone];g.save();A.paint.shadow(4,2,.1);g.fillStyle=h?A.mix(C.pn,h,.15):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();A.paint.noShadow();
 if(dash)g.setLineDash([8,6]);g.lineWidth=h?3:1.5;g.strokeStyle=h||C.ln;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke();g.restore()}
/* answer cards stacked in rows at the bottom; a held card follows the finger */
function rowsOf(list,y0,y1){const n=list.length,gap=8,h=Math.min(k(58),(y1-y0-gap*(n-1))/n),d=S.hold;
 return list.map((o,i)=>d&&d.i===i&&d.x!=null?{x:d.x-(A.W-24)/2,y:d.y-h/2,w:A.W-24,h,o}:{x:12,y:y0+i*(h+gap),w:A.W-24,h,o})}
function grid(list,y0,y1){const gap=8,cols=2,rws=Math.ceil(list.length/cols),w=(A.W-24-gap)/cols,h=Math.min(k(56),(y1-y0-gap*(rws-1))/rws),d=S.hold;
 return list.map((o,i)=>d&&d.i===i&&d.x!=null?{x:d.x-w/2,y:d.y-h/2,w,h,o}:{x:12+(i%cols)*(w+gap),y:y0+Math.floor(i/cols)*(h+gap),w,h,o})}
const item=()=>({story:STORY,why:WHY,turn:TURN}[mode()]||[])[S.at];
const top=()=>({x:8,y:A.H*.03,w:A.W-16,h:A.H*.5});
function panels(g,p,y,h){const n=p.length,gap=6,w=(A.W-16-gap*(n-1))/n;p.forEach(([e,t],i)=>{const r={x:8+i*(w+gap),y,w,h};tile(g,r,'cy');pic(g,e,r.x+w/2,y+h*.34,Math.min(k(40),w*.45));words(g,t,r.x+w/2,y+h*.74,w-8,14,A.col.tx,700)})}
function guess(g,t,y){const r={x:12,y,w:A.W-24,h:k(44)};tile(g,r,'am',1);words(g,'My guess: '+t,A.W/2,y+r.h/2,r.w-12,15,A.col.tx,800)}
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,m=mode(),it=item();S.hot=[];
 if(m==='quiz'){words(g,'Good readers guess what comes next, say why, and change the guess when the story changes.',W/2,H*.45,W-40,18);return}
 if(m==='hi'){pic(g,'📖',W/2,H*.16,k(60));words(g,'Stop before you turn the page.',W/2,H*.34,W-30,19);words(g,'Ask: what will happen next?',W/2,H*.46,W-30,19,C.vi);
  pic(g,'🔍',W/2,H*.62,k(44));words(g,'Use the clues: the title, the pictures, and what has happened so far.',W/2,H*.8,W-40,15,C.mu,700);return}
 if(m==='cover'){const b={x:W*.18,y:H*.03,w:W*.64,h:H*.36};tile(g,b,'vi');words(g,COVER.t,W/2,b.y+b.h*.18,b.w-16,20,C.tx,900);pic(g,'🌳',W/2-b.w*.12,b.y+b.h*.58,k(54));pic(g,'🪁',W/2-b.w*.06,b.y+b.h*.42,k(28));pic(g,'👧',W/2+b.w*.22,b.y+b.h*.72,k(36));
  words(g,S.found.length?'Clues: '+S.found.map(i=>COVER.chips[i][0]).join(' · '):'Which things are clues? Drag them onto the book, or tap them.',W/2,H*.46,W-24,14,C.tx,800);
  const left=COVER.chips.map((x,i)=>i).filter(i=>!S.found.includes(i));if(S.got<S.need){const t=grid(left,H*.53,H*.97);t.forEach((r,j)=>{r.v=left[j];tile(g,r,S.bad===left[j]?'no':'vi');words(g,COVER.chips[left[j]][0],r.x+r.w/2,r.y+r.h/2,r.w-10,14)});S.hot=t}
  A.fx.draw(g);return}
 if(m==='story'||m==='why'){if(m==='story')panels(g,it.p,H*.03,H*.25);else{words(g,'Guess:',W/2,H*.06,W,15,C.mu);guess(g,it.g,H*.1)}
  words(g,S.ok?'✓ That guess fits the clues.':m==='story'?'What will happen next? Drag a guess up to the story, or tap it.':'Which clue made you guess that? Drag it up, or tap it.',W/2,H*.36,W-24,15,S.ok?C.gr:C.tx,800);
  const t=rowsOf(it.o,H*.44,H*.97);t.forEach((r,i)=>{r.v=i;tile(g,r,S.ok&&it.o[i][1]?'ok':S.bad===i?'no':'vi');words(g,it.o[i][0],r.x+r.w/2,r.y+r.h/2,r.w-12,15)});if(!S.ok)S.hot=t}
 if(m==='turn'){guess(g,it.g,H*.03);const r={x:12,y:H*.15,w:W-24,h:H*.2};tile(g,r,'cy');pic(g,it.n[0],r.x+k(36),r.y+r.h/2,k(40));words(g,'Next page: '+it.n[1],r.x+r.w/2+k(22),r.y+r.h/2,r.w-k(84),15);
  words(g,S.ok?'✓ Good readers check the guess on every page.':'Keep your guess, or change it? Drag one up, or tap it.',W/2,H*.42,W-24,15,S.ok?C.gr:C.tx,800);
  const t=rowsOf(it.o,H*.5,H*.9);t.forEach((q,i)=>{q.v=i;tile(g,q,S.ok&&it.o[i][1]?'ok':S.bad===i?'no':'vi');words(g,it.o[i][0],q.x+q.w/2,q.y+q.h/2,q.w-12,15)});if(!S.ok)S.hot=t}
 A.fx.draw(g)}
function oops(t,j){A.sound.miss();S.bad=j;tell(t);setTimeout(()=>{S.bad=-1;A.redraw()},quick()?10:1400);A.redraw()}
function score(t){S.got++;A.sound.pop();tell(t);buttons();A.redraw();S.after()}
function soon(f,ms){const r=run,at=S.at;setTimeout(()=>{if(r!==run||S.at!==at||S.got>=S.need)return;f()},quick()?5:ms)}
function turn(){S.at++;S.ok=0;tell('Next story.');buttons();A.redraw()}
function chip(i){if(mode()!=='cover'||S.got>=S.need||S.found.includes(i))return;const x=COVER.chips[i];if(!x[1])return oops(x[2],i);
 S.found.push(i);score(`Yes: ${x[0]} is a clue about what will happen.`)}
function choose(i){const m=mode();if(!['story','why','turn'].includes(m)||S.got>=S.need||S.ok)return;const it=item(),o=it.o[i];if(!o[1])return oops(o[2],i);
 S.ok=1;const say={story:'Yes! That guess fits all the clues.',why:`Yes: ${o[0].replace(/^\S+\s/,'')}. That clue is why the guess makes sense.`,turn:o[0].startsWith('Keep')?'Keep it: the new page fits your guess.':'Change it: the new page gave a new clue.'}[m];score(say);soon(turn,1500)}
const tap=i=>mode()==='cover'?chip(i):choose(i);
function buttons(){if(!pad)return;pad.innerHTML='';const m=mode(),it=item(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(m==='quiz'||m==='hi'||S.got>=S.need)return;
 if(m==='cover')COVER.chips.forEach((x,i)=>{if(!S.found.includes(i))B(x[0],()=>chip(i),`Is “${x[0]}” a clue?`)});
 else if(!S.ok)it.o.forEach((o,i)=>B(o[0],()=>choose(i),m==='why'?`The clue is: ${o[0]}`:null))}
const within=(p,r,e)=>(e=e||0,p.x>r.x-e&&p.x<r.x+r.w+e&&p.y>r.y-e&&p.y<r.y+r.h+e);
function down(p){const m=mode();if(m==='quiz'||m==='hi'||S.got>=S.need)return false;const r=S.hot.find(r=>within(p,r,4));if(!r)return false;S.hold={i:S.hot.indexOf(r),v:r.v,x:null,x0:p.x,y0:p.y};return true}
function move(p){const d=S.hold;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.hold;S.hold=null;if(!d)return;if(d.x==null||within(p,top(),10))return tap(d.v);tell('Drop it up on the story.');A.redraw()}
const fin=(i,msg)=>()=>{if(A.step===i&&S.got>=S.need&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function auto(f){const r=++run,go=()=>{if(r!==run||S.got>=S.need)return;f();setTimeout(go,60)};setTimeout(go,30)}
const reset=()=>{run++;Object.assign(S,fresh())};
function best(){const m=mode();if(m==='cover'){const i=COVER.chips.findIndex((x,j)=>x[1]&&!S.found.includes(j));return i>=0&&chip(i)}const it=item();if(it&&!S.ok)choose(it.o.findIndex(o=>o[1]))}
const demo=i=>()=>{steps[i].go();S.fast=1;auto(best)};
const steps=[
{h:'What happens next?',p:'Before you turn the page, stop and guess what will happen next. That guess is called a prediction. A good prediction uses clues.',
 go:()=>{reset();tell('Stop and ask: what will happen next?')}},
{h:'Clues on the cover',p:'The title and the picture on the cover are clues. They help you guess what the story is about.',predict:{q:'Can the title help you guess the story?',opts:['No, just start reading','Yes, the title is a clue'],ans:1},task:'Find 3 clues on the cover',show:demo(1),
 go:()=>{reset();tell('Which things are clues? Drag them onto the book, or tap them.');buttons();S.after=fin(1,'The title and the pictures are clues. The page count and the size of the book are not.')}},
{h:'Use what happened',p:'Look at what has happened so far. A good guess fits those clues. It does not come from nowhere.',predict:{q:'A good guess is…',opts:['Any idea you like','An idea that fits the clues'],ans:1},task:'Guess what happens in 3 stories',show:demo(2),
 go:()=>{reset();tell('What will happen next? Drag a guess up, or tap it.');buttons();S.after=fin(2,'Each good guess fits what already happened in the story.')}},
{h:'Say why',p:'Tell someone why you guessed it: “I think … because …”. The because part is the clue.',task:'Find the clue for 3 guesses',show:demo(3),
 go:()=>{reset();tell('Which clue made you guess that? Drag it up, or tap it.');buttons();S.after=fin(3,'I think the ice cream will melt because the sun is hot. The clue is your reason.')}},
{h:'Turn the page',p:'Now read on. Was your guess right? If the new page gives a new clue, change your guess. That is what good readers do.',predict:{q:'Your guess was not what happened. Was guessing a mistake?',opts:['Yes, I got it wrong','No, I change my guess and read on'],ans:1},task:'Keep or change 3 guesses',show:demo(4),
 go:()=>{reset();tell('Keep your guess, or change it? Drag one up, or tap it.');buttons();S.after=fin(4,'Check your guess on every page. Keep it if it fits. Change it if a new clue comes.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[['The book is called “The Big Snow”. What will it be about?',[['Something cold and snowy','ok'],['A hot day at the beach','against'],['I cannot guess yet','title']]],
 ['Sam is hungry. He opens the fridge. What will he do next?',[['Get some food','ok'],['Go swimming','random'],['Paint the fridge','random2']]],
 ['You guessed the cat would win the race. Then the cat falls asleep. What now?',[['Change my guess','ok'],['Keep it, I said it first','stick'],['Stop reading','quit']]],
 ['Mia says, “The boat will sink.” What makes it a good prediction?',[['She says why: it has a hole','ok'],['She says it loudly','loud'],['She says it first','first']]],
 ['Which is a clue about what will happen?',[['The dark clouds in the picture','ok'],['The page number','page'],['The book is big','size']]],
 ['Your guess was wrong. What does that mean?',[['Nothing bad. I read on and check.','ok'],['I am bad at reading','bad'],['I should not guess','noguess']]]];
function why(t){let m='A good guess fits the clues in the story.';
 if(t==='against')m='The title says snow. Snow is cold, so a hot beach does not fit the clue.';if(t==='title')m='You can guess from the title! Snow is the clue.';
 if(t==='random')m='Nothing in the story points to swimming. He is hungry and at the fridge.';if(t==='random2')m='Painting does not fit. Hungry plus fridge points to food.';
 if(t==='stick')m='Saying it first does not make it right. The cat fell asleep: that is a new clue, so change your guess.';if(t==='quit')m='Keep reading! Change your guess and see what happens.';
 if(t==='loud')m='How loud you say it does not matter. A good guess has a because: the hole.';if(t==='first')m='Being first does not make it good. The reason, the hole, makes it good.';
 if(t==='page')m='The page number does not tell you what happens. Pictures and words do.';if(t==='size')m='A big book can be about anything. Look at the pictures and the words.';
 if(t==='bad')m='Good readers often guess wrong. They change the guess and read on.';if(t==='noguess')m='Keep guessing! It helps you think about the story, even when it changes.';return m}
function ask(){qn++;const [q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){row++;A.win()}else{row=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes!':'✗ '+why(t)}${ok?` Right in a row: ${row}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.7,tall:1.4,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}});
A.start()})})();
