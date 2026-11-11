/* Flagship – recommending books (ages 9–10, England NC Years 5–6 Reading comprehension: "recommending books that they
   have read to their peers, giving reasons for their choices"; "identifying and discussing themes and conventions in and
   across a wide range of writing"; "making comparisons within and across books"). Match three readers to the book that
   fits what they already enjoy, sort specific reasons from vague praise, spot the spoilers in a recommendation, link two
   books by a shared genre or theme, then build a full recommendation. Targets the slips of recommending your own
   favourite, saying only "it's good", giving away the ending, and comparing books by surface details like length. */
(()=>{const FONT='Nunito,ui-rounded,system-ui,sans-serif';
const BOOKS=[{t:'The Clockwork Fox',g:'mystery',d:'A detective story full of clues. The narrator jokes with you.'},
 {t:'Storm Island',g:'adventure',d:'Four friends survive on an island after a storm. Long chapters, no pictures.'},
 {t:'Space Pets',g:'funny sci-fi',d:'A comic-strip book about a hamster on a rocket. Short chapters, lots of pictures.'}];
const READERS=[{n:'Maya',w:'Loved a detective story. Likes to solve puzzles.',b:0},{n:'Leo',w:'Reads comics. Wants something funny with pictures.',b:2},{n:'Ava',w:'Loved a book about friends lost at sea.',b:1}];
const WHY=[["It's good.",1],['The clues are hidden, so you can solve it before the detective.',0],["It's the best book ever.",1],['Each chapter ends on a cliffhanger, so you keep reading.',0],['Everyone in my class has read it.',1],['The narrator talks to you and makes jokes.',0]];
const REC=[['The Clockwork Fox is a mystery set in a busy city.',0],['You can collect clues with the detective.',0],['The thief turns out to be the gardener.',1],['The jokes made me laugh out loud.',0],['At the end, the fox gets home safely.',1]];
const PAIRS=[{a:'The Missing Key',b:'The Clockwork Fox',o:[['both are mysteries with clues to solve','ok'],['both have about 200 pages','size'],['both have a red cover','cover']]},
 {a:'Lost in the Snow',b:'Storm Island',o:[['both are about friends who must survive together','ok'],['both have a girl on the cover','cover'],['both came out last year','date']]}];
const SLOTS=[{k:'Who it suits',o:[['If you like mysteries you can solve,','ok'],['Everyone should read this,','all'],['I read it in two days,','me']]},
 {k:'Reason',o:[['the clues are hidden in plain sight.','ok'],['it is really, really good.','vague'],['it has 200 pages.','size']]},
 {k:'Compare',o:[['It is like The Missing Key, but funnier.','ok'],['It is a book.','vague'],['It is nothing like any book.','none']]},
 {k:'No spoilers',o:[["I won't tell you who the thief is!",'ok'],['The thief is the gardener.','spoil'],['It ends with the fox safe at home.','spoil']]}];
VIS.reg('flagrecbk',c=>{let R,pad,quiz,qn=-1,run=0;const V={};
const now=()=>['match','reasons','spoil','link','build','quiz'][R.step];
const say=s=>{c.say(s);if(R)R.cv.setAttribute('aria-label',s)};
const fz=n=>Math.round(n*(R.narrow?1.12:1.12)),paint=()=>R.redraw();
function font(n,w){return`${w||700} ${fz(n)}px ${FONT}`}
/* wrap text into lines that fit width w */
function lines(g,s,w,n,wt){g.font=font(n,wt);const out=[];let cur='';s.split(' ').forEach(word=>{const t=cur?cur+' '+word:word;if(g.measureText(t).width>w&&cur){out.push(cur);cur=word}else cur=t});if(cur)out.push(cur);return out}
function card(g,r,s,n,opt={}){const K=R.col,P=R.paint;P.rrect(r.x,r.y,r.w,r.h,10);g.fillStyle=opt.fill||K.pn;g.fill();g.lineWidth=opt.hot?3.5:1.8;g.strokeStyle=opt.edge||K.tx;g.stroke();
 const ls=lines(g,s,r.w-20,n,opt.wt),lh=fz(n)*1.25,y0=r.y+r.h/2-(ls.length-1)*lh/2;g.fillStyle=opt.col||K.tx;g.textAlign='center';g.textBaseline='middle';ls.forEach((l,i)=>g.fillText(l,r.x+r.w/2,y0+i*lh))}
function head(g,s){const K=R.col;g.font=font(15,800);g.textAlign='center';g.textBaseline='middle';g.fillStyle=K.tx;g.fillText(s,R.W/2,20,R.W-16)}
/* layouts: a column of rects on phones, a grid on wide screens */
function grid(n,top,bottom,cols){const W=R.W,c=R.narrow?1:cols,rows=Math.ceil(n/c),gw=(W-24-(c-1)*10)/c,gh=Math.min(R.narrow?80:78,(bottom-top-(rows-1)*8)/rows);
 return[...Array(n)].map((_,i)=>({x:12+(i%c)*(gw+10),y:top+Math.floor(i/c)*(gh+8),w:gw,h:gh}))}
const inR=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function draw(A){const{ctx:g,W,H,col:K}=A,v=now();g.fillStyle=A.mix(K.pn,K.vi,K.dark?.03:.05);g.fillRect(0,0,W,H);V.hits=[];
 if(v==='quiz'){card(g,{x:16,y:H*.12,w:W-32,h:H*.76},'A good recommendation: who it suits, a specific reason, a comparison, and no spoilers.',16,{wt:800});return}
 if(v==='match'){const r=READERS[V.ri]||READERS[2];head(g,V.ri<3?`Which book for ${r.n}?`:'All 3 readers matched!');
  card(g,{x:12,y:40,w:W-24,h:R.narrow?64:56},`${r.n}: ${r.w}`,14,{fill:A.mix(K.pn,K.am,.16),edge:K.am,wt:800});
  grid(3,R.narrow?116:112,H-10,3).forEach((b,i)=>{const B=BOOKS[i];card(g,b,`${B.t} (${B.g}). ${B.d}`,R.narrow?12.5:13,{hot:V.pick===i,edge:V.pick===i?K.vi:K.tx});V.hits.push({r:b,i})})}
 if(v==='reasons'){head(g,`Drag each reason to a box. Sorted: ${V.sorted.size} of ${WHY.length}`);const bw=(W-36)/2,by=H-(R.narrow?96:90),bh=R.narrow?86:80;
  V.bins=[{x:12,y:by,w:bw,h:bh},{x:24+bw,y:by,w:bw,h:bh}];
  card(g,V.bins[0],`Specific: tells my friend something real (${[...V.sorted].filter(i=>!WHY[i][1]).length})`,13,{fill:A.mix(K.pn,K.gr,.14),edge:K.gr,wt:800});
  card(g,V.bins[1],`Too vague: says nothing about the book (${[...V.sorted].filter(i=>WHY[i][1]).length})`,13,{fill:A.mix(K.pn,K.rd,.1),edge:K.rd,wt:800});
  const left=WHY.map((_,i)=>i).filter(i=>!V.sorted.has(i)),rs=grid(left.length||1,40,by-10,2);
  left.forEach((i,j)=>{const r=V.drag&&V.drag.i===i?{...rs[j],x:V.drag.x-rs[j].w/2,y:V.drag.y-rs[j].h/2}:rs[j];card(g,r,WHY[i][0],13,{hot:V.pick===i,edge:V.pick===i?K.vi:K.tx});V.hits.push({r:rs[j],i})})}
 if(v==='spoil'){head(g,`Tap the spoilers. Found: ${V.found.size} of 2`);grid(REC.length,40,H-8,1).forEach((r,i)=>{const f=V.found.has(i);card(g,r,(f?'Spoiler: ':'')+REC[i][0],13,{fill:f?A.mix(K.pn,K.rd,.16):K.pn,edge:f?K.rd:K.tx,wt:f?800:700});V.hits.push({r,i})})}
 if(v==='link'){const P=PAIRS[Math.min(V.pi,1)];head(g,V.pi<2?'What do the two books share?':'Both pairs linked!');
  card(g,{x:12,y:40,w:W-24,h:54},`If you liked ${P.a}, try ${P.b}, because...`,14,{fill:A.mix(K.pn,K.cy,.14),edge:K.cy,wt:800});
  grid(3,106,H-8,1).forEach((r,i)=>{card(g,r,P.o[(i+V.pi)%3][0],13);V.hits.push({r,i:(i+V.pi)%3})})}
 if(v==='build'){head(g,'Tap each part to change it. Then press Check.');grid(4,38,H-8,2).forEach((r,i)=>{const s=SLOTS[i],o=s.o[V.sel[i]];
  card(g,r,`${s.k}: ${o[0]}`,R.narrow?12.5:13,{fill:V.bad===i?A.mix(K.pn,K.rd,.14):K.pn,edge:V.bad===i?K.rd:K.tx});V.hits.push({r,i})})}
 A.fx.draw(g)}
const no=s=>{R.sound.miss();say(s);paint()},good=s=>{R.sound.pop();say(s);ctrls();paint();V.check()};
const sparkle=()=>{R.fx.add(12,i=>({x:R.W/2,y:R.H*.4,vx:Math.cos(i)*140,vy:Math.sin(i)*140,life:.6,r:3,col:R.col.gr}));R.kick()};
/* step 0: matching readers to books */
function give(i){if(now()!=='match'||V.ri>=3)return;const r=READERS[V.ri],B=BOOKS[i];V.pick=i;
 if(i!==r.b){const why=r.b===0?`${r.n} likes puzzles and detectives. ${B.t} is ${B.g}, not a mystery.`:r.b===2?`${r.n} wants funny with pictures. ${B.t} has ${i===1?'long chapters and no pictures':'jokes but no comic pictures'}.`:`${r.n} loved friends lost at sea. ${B.t} is not a survival story.`;return no(why+' Think about what the reader enjoyed, not what you like.')}
 V.ri++;V.pick=-1;sparkle();if(V.ri<3){R.sound.pop();say(`Yes, ${B.t} fits ${r.n}. Next: ${READERS[V.ri].n}. ${READERS[V.ri].w}`);ctrls();return paint()}
 good(`All 3 readers have a book that fits what they already enjoy.`)}
/* step 1: sorting reasons */
function put(i,bin){if(now()!=='reasons'||V.sorted.has(i))return;const vague=WHY[i][1];
 if(bin!==vague)return no(vague?`"${WHY[i][0]}" sounds nice, but it tells your friend nothing about the book itself.`:`"${WHY[i][0]}" names a real feature of the book, so it is a specific reason.`);
 V.sorted.add(i);V.pick=-1;R.sound.tick();if(V.sorted.size===WHY.length)return good('All sorted. Specific reasons name a real feature: the clues, the cliffhangers, the narrator.');
 say(`Sorted: ${V.sorted.size} of ${WHY.length}.`);ctrls();paint()}
/* step 2: spotting spoilers */
function tapRec(i){if(now()!=='spoil'||V.found.has(i))return;if(!REC[i][1])return no(`"${REC[i][0]}" is fine: it tells your friend what the book is like without giving away what happens.`);
 V.found.add(i);R.sound.tick();if(V.found.size===2)return good('Both spoilers found. Who did it and how it ends are surprises the reader should meet for themselves.');say('1 spoiler found. One more.');ctrls();paint()}
/* step 3: linking books */
function link(k){if(now()!=='link'||V.pi>=2)return;const P=PAIRS[V.pi],t=P.o[k][1];
 if(t!=='ok')return no(t==='size'?'Page count says nothing about what the story is like. Look for a shared genre or theme.':t==='cover'?'A cover is not the story. Readers want to know what the books share inside.':'When a book came out does not tell a reader if they will enjoy it. Look for genre or theme.');
 V.pi++;sparkle();if(V.pi<2){R.sound.pop();say(`Yes: genre links them. Next pair: ${PAIRS[1].a} and ${PAIRS[1].b}.`);ctrls();return paint()}good('Both links use genre or theme: the reasons a reader liked the first book.')}
/* step 4: building a recommendation */
function turn(i){if(now()!=='build')return;V.sel[i]=(V.sel[i]+1)%3;V.bad=-1;R.sound.tick();say(`${SLOTS[i].k}: ${SLOTS[i].o[V.sel[i]][0]}`);paint()}
function test(){if(now()!=='build')return;const i=V.sel.findIndex(s=>s!==0);
 if(i>=0){V.bad=i;const t=SLOTS[i].o[V.sel[i]][1];return no(t==='all'?'Not every reader likes the same things. Say who this book suits.':t==='me'?'How fast you read it is about you, not about the book. Say who it suits.':t==='vague'?'That part is too vague. Name a real feature of the book.':t==='size'?'Length is not a reason to enjoy a book. Name what makes it gripping.':t==='none'?'A comparison helps your friend. Link it to a book they know.':'That gives away the ending. Hint at the surprise without telling it.')}
 V.made=true;sparkle();good('A full recommendation: who it suits, a specific reason, a comparison and no spoilers.')}
function ctrls(){if(!pad)return;pad.innerHTML='';const v=now(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='match'&&V.ri<3)BOOKS.forEach((b,i)=>B(`Give ${READERS[V.ri].n} ${b.t}`,()=>give(i)));
 if(v==='reasons'){const i=WHY.findIndex((_,k)=>!V.sorted.has(k));if(i>=0){B(`Specific: "${WHY[i][0]}"`,()=>put(i,0));B('Too vague',()=>put(i,1),`Too vague: ${WHY[i][0]}`)}}
 if(v==='spoil')REC.forEach((r,i)=>{if(!V.found.has(i))B(`Spoiler? ${r[0]}`,()=>tapRec(i))});
 if(v==='link'&&V.pi<2)PAIRS[V.pi].o.forEach((o,k)=>B(o[0],()=>link(k)));
 if(v==='build'){SLOTS.forEach((s,i)=>B(`Change: ${s.k}`,()=>turn(i)));B('Check',test,'Check the recommendation')}}
let grab=null;
function down(p){const v=now(),h=(V.hits||[]).find(x=>inR(p,x.r));
 if(v==='reasons'){if(h){grab={i:h.i,x0:p.x,y0:p.y};V.pick=h.i;V.drag={i:h.i,x:p.x,y:p.y};paint();return true}if(V.pick>=0){const b=(V.bins||[]).findIndex(r=>inR(p,r));if(b>=0){put(V.pick,b);return true}}return false}
 if(!h)return false;if(v==='match')give(h.i);else if(v==='spoil')tapRec(h.i);else if(v==='link')link(h.i);else if(v==='build')turn(h.i);return true}
function move(p){if(!grab)return;V.drag={i:grab.i,x:p.x,y:p.y};paint()}
function up(p){if(!grab)return;const i=grab.i,moved=p&&Math.hypot(p.x-grab.x0,p.y-grab.y0)>12;grab=null;V.drag=null;if(moved&&p){const b=(V.bins||[]).findIndex(r=>inR(p,r));if(b>=0)return put(i,b)}paint()}
const doneIf=(n,test,msg)=>()=>{if(R.step===n&&test()&&(!steps[n].predict||R.pred[n]!=null))R.done(msg+R.reveal(n))};
const play=(fns,ms)=>{const k=++V.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===V.tok)fn()},R.reduced()?j*30+30:(j+1)*ms))};
const fresh=o=>{const t=(V.tok||0)+1;Object.keys(V).forEach(k=>delete V[k]);Object.assign(V,{tok:t,check:()=>{},pick:-1,hits:[]},o);grab=null};
const steps=[
{h:'Know your reader',p:'A recommendation is for someone else. Read what each friend enjoyed, then give them the book that fits.',
 predict:{q:'What matters most when you pick a book for a friend?',opts:['What they already enjoy','Your own favourite book','The longest book'],ans:0},task:'Find a book for Maya, Leo and Ava',
 show:()=>{steps[0].go();play([()=>give(0),()=>give(2),()=>give(1)],800)},
 go:()=>{fresh({ri:0});say(`Maya: ${READERS[0].w} Tap the book that fits her.`);ctrls();V.check=doneIf(0,()=>V.ri>=3,'Match the book to the reader, not to yourself.')}},
{h:'Give a real reason',p:'"It\'s good" does not help a friend choose. A real reason names something in the book. Drag each reason to a box.',
 predict:{q:'Which reason helps a friend most?',opts:['Each chapter ends on a cliffhanger','It is the best book ever','Everyone has read it'],ans:0},task:'Sort all 6 reasons',
 show:()=>{steps[1].go();play(WHY.map((w,i)=>()=>put(i,w[1])),550)},
 go:()=>{fresh({sorted:new Set()});say('Drag a reason into Specific or Too vague. Or tap it, then tap a box.');ctrls();V.check=doneIf(1,()=>V.sorted.size===WHY.length,'Specific reasons name a feature of the book.')}},
{h:'No spoilers',p:'Here is Sam\'s recommendation. Some lines give away surprises. Tap each spoiler.',
 predict:{q:'Should you tell your friend how the book ends?',opts:['No, just hint that it is a surprise','Yes, so they know it is good','Yes, if it is a happy ending'],ans:0},task:'Find the 2 spoilers',
 show:()=>{steps[2].go();play([()=>tapRec(2),()=>tapRec(4)],800)},
 go:()=>{fresh({found:new Set()});say('Read each line. Tap the ones that give away what happens.');ctrls();V.check=doneIf(2,()=>V.found.size===2,'Hint at the surprise; never tell it.')}},
{h:'Compare books',p:'"If you liked this, try that" works when the two books share something inside: a genre, a theme or a style.',task:'Link 2 pairs of books',
 show:()=>{steps[3].go();play([()=>link(0),()=>link(0)],900)},
 go:()=>{fresh({pi:0});say(`If you liked ${PAIRS[0].a}, try ${PAIRS[0].b}. What do they share?`);ctrls();V.check=doneIf(3,()=>V.pi>=2,'Compare by genre, theme or style.')}},
{h:'Build a recommendation',p:'Put it all together. Tap each part until it says who the book suits, a real reason, a comparison and no spoilers.',task:'Build a full recommendation',
 show:()=>{steps[4].go();V.sel=[2,1,1,2];paint();play([()=>turn(0),()=>turn(1),()=>turn(1),()=>turn(2),()=>turn(2),()=>turn(3),test],500)},
 go:()=>{fresh({sel:[1,1,1,1],bad:-1});say('Each part starts weak. Tap a part to change it, then press Check.');ctrls();V.check=doneIf(4,()=>V.made,'That is a recommendation a friend can trust.')}},
{h:'Challenge',p:'',go:()=>{fresh({});ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>V.check()});
const QS=[['Zara loved a funny book about a talking dog. Which is the best book to recommend?',[['Another funny animal story','ok'],['Your favourite war story','mine'],['The thickest book in the library','size']]],
 ['Which is the most helpful reason?',[['The two sisters argue in a way that feels real','ok'],["It's amazing",'vague'],['My teacher liked it','other']]],
 ['Which line is a spoiler?',[['The villain is really her uncle','ok'],['It is set in a castle','fine'],['The chapters are short','fine2']]],
 ['"If you liked Storm Island, try Lost in the Snow because..." Which ending is best?',[['both are about friends surviving together','ok'],['both have 12 chapters','size'],['both covers are blue','cover']]],
 ['Why compare a new book to one your friend already read?',[['It shows them what to expect','ok'],['It makes your answer longer','long'],['So they do not have to read it','skip']]],
 ['Which is a theme?',[['Friendship','ok'],['Hardback','format'],['Chapter 3','part']]]];
function hint(t){let m='A good recommendation fits the reader, gives a real reason and keeps the surprises.';
 if(t==='mine')m="Your favourite might not suit Zara. She liked funny animal stories, so start there.";
 if(t==='size')m='Length, page count or chapter count do not tell a reader if they will enjoy the story.';
 if(t==='vague')m="'Amazing' is praise, not a reason. Name something in the book.";
 if(t==='other')m='What someone else thought is not about the book. Give your own specific reason.';
 if(t==='fine'||t==='fine2')m="That tells the reader what the book is like but not what happens, so it is not a spoiler. Who the villain is would be.";
 if(t==='cover')m='Covers do not show what happens inside. Link by genre or theme.';
 if(t==='long')m='A comparison is not padding. It tells your friend what kind of book to expect.';
 if(t==='skip')m='A recommendation makes someone want to read the book, not skip it.';
 if(t==='format')m='Hardback is how the book is made. A theme is a big idea the story explores, like friendship or courage.';
 if(t==='part')m='Chapter 3 is a part of the book. A theme is a big idea that runs through it.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],rot=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const r=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},r,o);b.onclick=()=>grade(t)});say('Challenge: '+q);paint()}
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=t==='ok';
 if(good){run++;R.win()}else{run=0;R.sound.miss()}fb.innerHTML=(good?'Yes! In a row: '+run+'.':'Not quite. '+hint(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=ask}
R=FK.shell(c,{steps,ratio:.62,tall:1.55,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;ctrls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh({});
  A.gest({down,move,up});ctrls()}});
R.start()})})();
