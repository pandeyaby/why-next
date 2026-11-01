/* Flagship – different types of texts (ages 5–7): sort six books onto Story, Poem and Facts shelves (the cover can trick
   you); hunt for the clue inside a page that shows its type; drag the pencil and paintbrush tags to the author and the
   illustrator on two covers; tap rhyming lines in a poem; then be the author and illustrator of your own little book. */
(()=>{
const SHELF=[['📖','Story'],['🎵','Poem'],['🔎','Facts']];
const BOOKS=[['🐉','The Dragon Who Lost His Roar',0],['🦎','All About Lizards',2],['🌙','Twinkle, Twinkle, Little Star',1],
 ['🚒','How a Fire Engine Works',2],['🐻','Goldilocks and the Three Bears',0],['🌧️','Rhymes for Rainy Days',1]];
const PAGES=[{k:0,bits:['Once upon a time, a fox lost his hat.','🦊 a picture','page 3'],why:'“Once upon a time” starts a story. A story has characters and something happens.'},
 {k:1,bits:['Rain, rain, go away. Come again another day.','☔ a picture','page 7'],why:'Short lines and rhyming words, away and day. That is a poem.'},
 {k:2,bits:['Fact: a shark has no bones.','🦈 a picture','page 12'],why:'A true fact about a real animal. That is a fact book.'}];
const COVERS=[{t:'Max and the Moon',e:'🌕',who:[['by Mia Lee','w'],['pictures by Sam Ade','p']]},{t:'My Big Red Bus',e:'🚌',who:[['words and pictures by Ana Ruiz','wp']]}];
const TAGS={w:['✏️','writes the words'],p:['🖌️','draws the pictures']};
const POEM=[['A cat sat on a mat,','mat',0],['It had a big red hat.','hat',0],['It saw a little bee','bee',1],['That flew into a tree.','tree',1]];
const WRITE=[['Once upon a time, a pig found a gold key.',0],['Pig, pig, do a jig! Dance in the mud, big pig!',1],['Pigs roll in mud to keep cool.',2]];
const PICS=['🐷🔑','🐷💃','🐷🟫'];
VIS.reg('flagtexts',c=>{let A,ctl,chal,qq=-1,run=0,ord=0;c.fig.classList.add('young');
const fresh=()=>({cb:()=>{},shelf:{},grab:null,sel:-1,pg:0,found:0,cov:0,put:{},pair:[],first:-1,made:{},wr:-1,pic:-1,last:'',bad:-1,zones:[]}),S=fresh();
const mode=()=>['sort','clue','who','rhyme','make','quiz'][A.step];
const sz=n=>Math.round(n*(A.narrow?1:1.2)),quick=()=>A.reduced();
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function wrap(g,t,x,y,mw,px,col,heavy){g.font=`${heavy?800:600} ${sz(px)}px system-ui,sans-serif`;g.fillStyle=col||A.col.tx;g.textAlign='center';g.textBaseline='middle';
 const rows=[];let cur='';for(const w of t.split(' ')){const tr=cur?cur+' '+w:w;if(g.measureText(tr).width>mw&&cur){rows.push(cur);cur=w}else cur=tr}rows.push(cur);
 const lh=sz(px)*1.25;rows.forEach((r,i)=>g.fillText(r,x,y+(i-(rows.length-1)/2)*lh))}
function box(g,x,y,w,h,tone,fillA,zone){g.fillStyle=A.alpha(tone,fillA);A.paint.rrect(x,y,w,h,14);g.fill();g.strokeStyle=tone;g.lineWidth=3;A.paint.rrect(x,y,w,h,14);g.stroke();if(zone)S.zones.push(Object.assign({x,y,w,h},zone))}
function book(g,x,y,w,h,b,tone){box(g,x,y,w,h,tone,.18);g.fillStyle=A.alpha(tone,.7);g.fillRect(x+6,y+6,6,h-12);g.fillStyle=A.col.tx;g.font=`${sz(26)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillText(b[0],x+w/2+4,y+h*.32);wrap(g,b[1],x+w/2+4,y+h*.7,w-22,11,A.col.tx,1)}
function shelves(g,W,H,top){const C=A.col,sw=(W-32)/3;SHELF.forEach(([e,n],i)=>{const x=10+i*(sw+6),hot=S.bad===i;box(g,x,top,sw,H-top-8,hot?C.rd:C.vi,hot?.3:.12,{shelf:i});
 wrap(g,e+' '+n,x+sw/2,top+sz(16),sw-8,14,C.tx,1);let n2=0;BOOKS.forEach((b,j)=>{if(S.shelf[j]===i){g.fillStyle=C.tx;g.font=`${sz(28)}px system-ui`;g.textAlign='center';g.fillText(b[0],x+sw/2+(n2%2-.5)*sz(38),top+sz(52));n2++}})})}
function draw(A){const{ctx:g,W,H,col:C}=A,m=mode();S.zones=[];g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(m==='quiz'){g.font=`${sz(64)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillText('📚',W/2,H*.45);return}
 if(m==='sort'){const left=BOOKS.map((b,i)=>i).filter(i=>S.shelf[i]==null),bw=Math.min(150,(W-30)/3-6),bh=H*.24;
  left.forEach((i,j)=>{if(S.grab&&S.grab.i===i)return;const x=10+(j%3)*(bw+8),y=H*.03+Math.floor(j/3)*(bh+8);book(g,x,y,bw,bh,BOOKS[i],S.sel===i?C.cy:C.am);S.zones.push({x,y,w:bw,h:bh,bk:i})});
  if(!left.length)wrap(g,'All on the shelves!',W/2,H*.2,W,17,C.tx,1);shelves(g,W,H,H*.58);if(S.grab)book(g,S.grab.x-bw/2,S.grab.y-bh/2,bw,bh,BOOKS[S.grab.i],C.cy)}
 if(m==='clue'){const p=PAGES[Math.min(S.pg,PAGES.length-1)];if(S.found>=PAGES.length){wrap(g,'The words inside tell you the type of text.',W/2,H/2,W-40,17,C.tx,1);return A.fx.draw(g)}
  box(g,W*.08,H*.05,W*.84,H*.9,C.ln,.12);wrap(g,`Page ${S.pg+1} of 3: tap the clue`,W/2,H*.12,W-60,14,C.mu,1);
  p.bits.forEach((t,i)=>{const y=H*(.24+i*.24),bad=S.bad===i;box(g,W*.14,y,W*.72,H*.2,bad?C.rd:C.cy,bad?.3:.1,{bit:i});wrap(g,t,W/2,y+H*.1,W*.66,i?13:15,C.tx,!i)})}
 if(m==='who'){const cv=COVERS[Math.min(S.cov,1)];if(S.cov>=COVERS.length){wrap(g,'The author writes the words. The illustrator draws the pictures. One person can do both.',W/2,H/2,W-40,16,C.tx,1);return A.fx.draw(g)}
  const cx=W*.06,cw=A.narrow?W*.88:W*.56,ch=A.narrow?H*.6:H*.88;box(g,cx,H*.04,cw,ch,C.vi,.12);wrap(g,cv.t,cx+cw/2,H*.11,cw-20,17,C.tx,1);g.font=`${sz(48)}px system-ui`;g.textAlign='center';g.fillText(cv.e,cx+cw/2,H*.27);
  cv.who.forEach(([n],i)=>{const y=H*.04+ch*(.56+i*.22),bad=S.bad===i;box(g,cx+12,y,cw-24,ch*.18,bad?C.rd:C.cy,bad?.3:.12,{line:i});
   const on=Object.keys(S.put).filter(k=>S.put[k]===i).map(k=>TAGS[k][0]).join(' ');wrap(g,(on?on+' ':'')+n,cx+cw/2,y+ch*.09,cw-40,13,C.tx,1)});
  const tx=A.narrow?W*.06:W*.66,tw=A.narrow?(W*.88-10)/2:W*.3,ty=A.narrow?H*.68:H*.1;Object.keys(TAGS).forEach((k,i)=>{if(S.put[k]!=null||(S.grab&&S.grab.k===k))return;
   const x=A.narrow?tx+i*(tw+10):tx,y=A.narrow?ty:ty+i*H*.3;box(g,x,y,tw,H*.24,S.sel===k?C.cy:C.am,.2,{tag:k});wrap(g,TAGS[k][0]+' '+TAGS[k][1],x+tw/2,y+H*.12,tw-12,13,C.tx,1)});
  if(S.grab)wrap(g,TAGS[S.grab.k][0]+' '+TAGS[S.grab.k][1],S.grab.x,S.grab.y,160,14,C.tx,1)}
 if(m==='rhyme'){wrap(g,`Rhyming pairs found: ${S.pair.length} of 2`,W/2,H*.08,W-30,15,C.tx,1);POEM.forEach(([t],i)=>{const y=H*(.17+i*.2),got=S.pair.some(p=>p.includes(i)),bad=S.bad===i,on=S.first===i;
   box(g,W*.08,y,W*.84,H*.17,bad?C.rd:got?C.gr:on?C.cy:C.am,got||on||bad?.3:.12,{row:i});wrap(g,t,W/2,y+H*.085,W*.78,16,C.tx,1)})}
 if(m==='make'){const done=Object.keys(S.made).length;wrap(g,`Books made: ${done} of 2 kinds`,W/2,H*.06,W,14,C.tx,1);const bx=W*.2,bw=W*.6,by=H*.12,bh=H*.42;box(g,bx,by,bw,bh,C.vi,.12);
  if(S.wr>=0)wrap(g,WRITE[S.wr][0],bx+bw/2,by+bh*.28,bw-24,13,C.tx,1);else wrap(g,'✏️ Author: tap some words',bx+bw/2,by+bh*.28,bw-24,12,C.mu);
  if(S.pic>=0){g.font=`${sz(38)}px system-ui`;g.textAlign='center';g.fillText(PICS[S.pic],bx+bw/2,by+bh*.66)}else wrap(g,'🖌️ Illustrator: tap a picture',bx+bw/2,by+bh*.66,bw-24,12,C.mu);
  wrap(g,'by You · pictures by You',bx+bw/2,by+bh*.9,bw-20,11,C.mu);const cw=(W-36)/3;
  WRITE.forEach(([t],i)=>{const x=10+i*(cw+8),y=H*.58;box(g,x,y,cw,H*.22,S.wr===i?C.cy:C.am,.15,{wr:i});wrap(g,t,x+cw/2,y+H*.11,cw-10,11,C.tx)});
  PICS.forEach((p,i)=>{const x=10+i*(cw+8),y=H*.83;box(g,x,y,cw,H*.14,S.pic===i?C.cy:C.am,.15,{pic:i});g.fillStyle=C.tx;g.font=`${sz(26)}px system-ui`;g.textAlign='center';g.fillText(p,x+cw/2,y+H*.07)})}
 A.fx.draw(g)}
const nope=(t,i)=>{A.sound.miss();S.bad=i==null?-1:i;speak(t);setTimeout(()=>{S.bad=-1;A.redraw()},quick()?10:850);A.redraw()};
function shelve(i,s){if(mode()!=='sort'||S.shelf[i]!=null)return;const b=BOOKS[i];S.sel=-1;
 if(s!==b[2]){const hint=b[2]===2?`${b[1]} tells true facts about real things. It goes on Facts.`:b[2]===1?`${b[1]} is a rhyme to say or sing. It goes on Poem.`:`${b[1]} has characters and something happens. It goes on Story.`;
  return nope((b[0]==='🦎'?'A lizard on the cover does not make it a story. ':'')+hint,s)}
 S.shelf[i]=s;A.sound.tick();speak(`${b[1]}: ${SHELF[s][1]} shelf.`);buttons();A.redraw();S.cb()}
function clue(i){if(mode()!=='clue'||S.found>=PAGES.length)return;const p=PAGES[S.pg];
 if(i!==0)return nope(i===1?'Every kind of book can have pictures. Look at the words for the clue.':'Every book has page numbers. Look at the words for the clue.',i);
 S.found++;S.pg=Math.min(S.pg+1,PAGES.length-1);A.sound.pop();speak(p.why+(S.found<PAGES.length?' Next page.':''));buttons();A.redraw();S.cb()}
function tag(k,i){if(mode()!=='who'||S.cov>=COVERS.length||S.put[k]!=null)return;const cv=COVERS[S.cov];S.sel=-1;
 if(!cv.who[i][1].includes(k))return nope(k==='w'?'That person draws the pictures. The author is the one who writes the words.':'That person writes the words. The illustrator is the one who draws the pictures.',i);
 S.put[k]=i;A.sound.tick();if(S.put.w!=null&&S.put.p!=null){const both=cv.who.length===1;S.cov++;S.put={};A.sound.pop();
  speak(both?'Ana Ruiz wrote the words and drew the pictures. She is the author and the illustrator.':'Mia Lee is the author. Sam Ade is the illustrator. Here is the next cover.')}else speak(`${TAGS[k][0]} on ${cv.who[i][0]}.`);buttons();A.redraw();S.cb()}
function line(i){if(mode()!=='rhyme'||S.pair.some(p=>p.includes(i)))return;if(S.first<0){S.first=i;A.sound.tick();speak(`${POEM[i][1]}. Now tap the line that rhymes.`);return A.redraw()}
 const a=S.first;S.first=-1;if(a===i){speak('Tap a different line.');return A.redraw()}
 if(POEM[a][2]!==POEM[i][2])return nope(`${POEM[a][1]} and ${POEM[i][1]} do not rhyme. Say the last words out loud: do they end with the same sound?`,i);
 S.pair.push([a,i]);A.sound.pop();speak(`${POEM[a][1]} and ${POEM[i][1]} rhyme! Rhyme is a clue that it is a poem.`);buttons();A.redraw();S.cb()}
function finish(){if(S.wr<0||S.pic<0)return;const k=WRITE[S.wr][1];S.made[k]=1;const n=['story','poem','fact book'][k];A.sound.pop();
 speak(`You made a ${n}! You wrote the words, so you are the author. You drew the picture, so you are the illustrator.`);S.wr=-1;S.pic=-1;buttons();A.redraw();S.cb()}
function write(i){if(mode()!=='make')return;S.wr=i;A.sound.tick();speak(`Words: ${WRITE[i][0]}`);S.pic>=0?finish():A.redraw()}
function paint(i){if(mode()!=='make')return;S.pic=i;A.sound.tick();if(S.wr<0){speak('Picture chosen. Now tap some words.');return A.redraw()}finish()}
function buttons(){if(!ctl)return;ctl.innerHTML='';const m=mode(),b=(t,fn,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);e.onclick=fn};
 if(m==='sort'){const i=BOOKS.findIndex((x,j)=>S.shelf[j]==null);if(i>=0)SHELF.forEach(([e,n],s)=>b(`${e} ${n}`,()=>shelve(i,s),`Put ${BOOKS[i][1]} on the ${n} shelf`))}
 if(m==='clue'&&S.found<PAGES.length)PAGES[S.pg].bits.forEach((t,i)=>b(t,()=>clue(i)));
 if(m==='who'&&S.cov<COVERS.length){const cv=COVERS[S.cov];Object.keys(TAGS).filter(k=>S.put[k]==null).forEach(k=>cv.who.forEach(([n],i)=>b(`${TAGS[k][0]} → ${n}`,()=>tag(k,i),`Put ${TAGS[k][1]} on ${n}`)))}
 if(m==='rhyme')POEM.forEach(([t],i)=>{if(!S.pair.some(p=>p.includes(i)))b(t,()=>line(i))});
 if(m==='make'){WRITE.forEach(([t],i)=>b('✏️ '+t,()=>write(i),'Write: '+t));PICS.forEach((p,i)=>b('🖌️ '+p,()=>paint(i),'Draw picture '+(i+1)))}A.redraw()}
const within=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h,hitAt=p=>S.zones.find(r=>within(p,r));
function down(p){const m=mode(),h=hitAt(p);if(!h)return false;
 if(m==='sort'){if(h.bk!=null){S.grab={i:h.bk,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}if(h.shelf!=null&&S.sel>=0)shelve(S.sel,h.shelf);return false}
 if(m==='who'){if(h.tag){S.grab={k:h.tag,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}if(h.line!=null&&S.sel!==-1)tag(S.sel,h.line);return false}
 if(h.bit!=null)clue(h.bit);if(h.row!=null)line(h.row);if(h.wr!=null)write(h.wr);if(h.pic!=null)paint(h.pic);return false}
function move(p){if(!S.grab)return;S.grab.x=p.x;S.grab.y=p.y;A.redraw()}
function up(p){const d=S.grab;if(!d)return;S.grab=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<8,h=hitAt(p);
 if(mode()==='sort'){if(tap){S.sel=d.i;speak(`${BOOKS[d.i][1]} picked. Now tap a shelf.`);return A.redraw()}if(h&&h.shelf!=null)return shelve(d.i,h.shelf);speak('Drop the book on a shelf.');return A.redraw()}
 if(tap){S.sel=d.k;speak(`${TAGS[d.k][1]} picked. Now tap a name.`);return A.redraw()}if(h&&h.line!=null)return tag(d.k,h.line);speak('Drop the tag on a name.');A.redraw()}
const ok=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list){const k=++ord;list.forEach((fn,j)=>setTimeout(()=>{if(k===ord)fn()},quick()?j*40+30:(j+1)*330))}
const clear=()=>{ord++;Object.assign(S,fresh())};
const steps=[
{h:'Story, poem or facts?',p:'Drag each book to a shelf, or tap a book and then tap a shelf.',
 predict:{q:'A book has a lizard on the cover. Is it a story?',opts:['Yes, animals mean a story','Not always. It could be a fact book'],ans:1},task:'Put all 6 books on the right shelf',
 show:()=>{steps[0].go();play(BOOKS.map((b,i)=>()=>shelve(i,b[2])))},go:()=>{clear();speak('Sort the books: story, poem or facts.');buttons();S.cb=ok(0,()=>BOOKS.every((b,i)=>S.shelf[i]!=null),'Stories, poems and fact books are three types of text.')}},
{h:'Look for clues',p:'Each page has one clue that shows what type of text it is. Tap the clue.',task:'Find the clue on 3 pages',
 show:()=>{steps[1].go();play([()=>clue(0),()=>clue(0),()=>clue(0)])},go:()=>{clear();speak('Page 1. Tap the clue.');buttons();S.cb=ok(1,()=>S.found>=3,'The words give the clue. Pictures and page numbers are in every kind of book.')}},
{h:'Who made the book?',p:'Drag ✏️ and 🖌️ to the right names on the cover, or tap a tag and then a name.',
 predict:{q:'Who draws the pictures in a book?',opts:['The author','The illustrator'],ans:1},task:'Put the tags on 2 covers',
 show:()=>{steps[2].go();play([()=>tag('w',0),()=>tag('p',1),()=>tag('w',0),()=>tag('p',0)])},go:()=>{clear();speak('Who wrote the words? Who drew the pictures?');buttons();S.cb=ok(2,()=>S.cov>=2,'The author writes the words. The illustrator draws the pictures.')}},
{h:'Hear the rhyme',p:'Tap a line, then tap the line that rhymes with it. Say the last words out loud.',task:'Find 2 rhyming pairs',
 show:()=>{steps[3].go();play([()=>line(0),()=>line(1),()=>line(2),()=>line(3)])},go:()=>{clear();speak('Find the lines that rhyme.');buttons();S.cb=ok(3,()=>S.pair.length>=2,'Many poems have short lines and rhyme.')}},
{h:'Be the author',p:'Tap some words to write the page. Tap a picture to draw it. Make two different kinds of book.',task:'Make 2 kinds of book',
 show:()=>{steps[4].go();play([()=>write(0),()=>paint(0),()=>write(2),()=>paint(2)])},go:()=>{clear();speak('Write the words and draw the picture.');buttons();S.cb=ok(4,()=>Object.keys(S.made).length>=2,'The words you write decide the type of text.')}},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.cb()});
const QS=[['A book says: Bees make honey. A bee has six legs. What type of text is it?',[['A fact book','ok'],['A story','story'],['A poem','poem']]],
 ['Who writes the words in a book?',[['The author','ok'],['The illustrator','illus'],['The person reading it','reader']]],
 ['Hop, hop, hop. Frog will not stop! What type of text is it?',[['A poem','ok'],['A fact book','fact'],['A story','long']]],
 ['A book has a lion on the cover. How can you tell if it is a story?',[['Look at the words inside','ok'],['A lion means it is a story','cover'],['Count the pages','pages']]],
 ['The cover says: Words and pictures by Jo Park. Who is the illustrator?',[['Jo Park','ok'],['No one','none'],['You cannot tell','tell']]]];
function why(t){let m='Look at the words: what do they do?';
 if(t==='story')m='No one is in it and nothing happens. It tells true facts about bees, so it is a fact book.';
 if(t==='poem')m='These lines do not rhyme. They tell true facts about bees, so it is a fact book.';
 if(t==='illus')m='The illustrator draws the pictures. The author writes the words.';
 if(t==='reader')m='The reader reads the words. The author is the one who wrote them.';
 if(t==='fact')m='Hop and stop rhyme, and the lines are short. That is a poem, not facts.';
 if(t==='long')m='It is very short, and hop and stop rhyme. That makes it a poem.';
 if(t==='cover')m='A lion could be in a fact book about real lions. Look at the words inside.';
 if(t==='pages')m='Stories and fact books can both be long or short. Look at the words inside.';
 if(t==='none')m='Someone always makes the pictures. Here Jo Park did both jobs.';
 if(t==='tell')m='Words and pictures by Jo Park means Jo did both jobs. Jo is the author and the illustrator.';
 return m}
function ask(){qq++;const[q,o]=QS[qq%QS.length],r=qq%3;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Choices"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');o.slice(r).concat(o.slice(0,r)).forEach(([t,k])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,t);e.onclick=()=>mark(k)});speak('Challenge: '+q);A.redraw()}
function mark(k){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=chal.querySelector('.fl-fb'),good=k==='ok';
 if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes, that is right.':'✗ '+why(k)}${good?` In a row: ${run}.`:''} <button type="button" class="linkish">Next question →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});buttons()}});
A.start()})})();
