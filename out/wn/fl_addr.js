/* Flagship – commas with yes, no and names (ages 10–11; Common Core L.5.2c; NC England Y5–6 commas to clarify meaning):
   direct address vs a name in the sentence, comma pairs, tag questions, when not to use a comma, and a name on the move. */
(()=>{
/* [words, person spoken to or -1] */
const WHO=[['Sam come and look at this'.split(' '),0],['Sam came to look at this'.split(' '),-1],['Can you help me Priya'.split(' '),4],
 ['I gave Priya the book'.split(' '),-1],[['Thanks','for','coming','Mr Lee'],3],['Mum said it was late'.split(' '),-1]];
/* [words, comma after word g] */
const GAP=[['Yes I understand'.split(' '),[0],'.'],['No thank you'.split(' '),[0],'.'],['Thank you Ben'.split(' '),[1],'.'],
 ['I think Mum that we are late'.split(' '),[1,2],'.'],['Yes Dad I did tidy my room'.split(' '),[0,1],'.']];

const TAG=[["It's cold today","isn't it"],['You finished your homework',"didn't you"],["We can't stay up late",'can we'],["She's your sister","isn't she"]];
const MARKS=[',','.','?'];

const SORT=[['No dogs are allowed here',1,'no means not any dogs here. It is part of the sentence, so no comma.'],
 ['No I do not want any',0,'No is a reply on its own: No, I do not want any.'],
 ['Yes is the right answer',1,'yes is the subject here, the thing the sentence is about. No comma.'],
 ['Yes you can go now',0,'Yes is a reply: Yes, you can go now.'],
 ['I told Ben the news',1,'Ben is the person told, not the person spoken to. No comma.'],
 ['Ben you were right',0,'You are speaking to Ben: Ben, you were right.'],
 ['She said no to the plan',1,'no is what she said, inside the sentence. No comma.'],
 ['Is that you Grandad',0,'You are speaking to Grandad: Is that you, Grandad?']];
const BINS=['Needs a comma','No comma'];

const BASE='please pass the salt'.split(' '),NAME='Zara',SPOT=[[0,[0]],[1,[0,1]],[4,[3]]],SPOTN=['at the start','in the middle','at the end'];
VIS.reg('flagaddr',c=>{let A,X,pad,box,qi=-1,ver=0,grab=null;const T={};
const INK='#0f172a',CHIP='#ffffff',RIM='#475569',OK='#15803d',ERR='#b91c1c',PICK='#1d4ed8',NAMEBG='#dbeafe',CREAM='#fef3c7',MISS='#fee2e2';
const px=n=>Math.round(n*(A.narrow?1:1.1)),fnt=(n,w)=>`${w||700} ${px(n)}px system-ui,sans-serif`;
const KEYS=['who','gap','tag','sort','move','chal'],now=()=>KEYS[A.step],SET={who:WHO,gap:GAP,tag:TAG,sort:SORT,move:SPOT},gone=k=>T[k].i>=SET[k].length;
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function paper(){X.fillStyle=A.col.dark?'#0b1120':'#f8fafc';X.fillRect(0,0,A.W,A.H)}
function write(t,x,y,n,w,col){X.fillStyle=col||INK;X.font=fnt(n,w);X.textAlign='center';X.textBaseline='middle';X.fillText(t,x,y,A.W-16)}
function chip(r,t,o){o=o||{};X.fillStyle=o.bg||CHIP;A.paint.rrect(r.x,r.y,r.w,r.h,o.rad||9);X.fill();X.lineWidth=o.rim?3.5:1.6;X.strokeStyle=o.rim||RIM;X.stroke();if(t!=null)write(t,r.x+r.w/2,r.y+r.h/2+1,o.n||20,o.w,o.ink)}
function head(t,ok){X.font=fnt(15,800);const w=Math.min(A.W-12,X.measureText(t).width+30),h=px(15)+16,y=A.H*.03;chip({x:A.W/2-w/2,y,w,h},null,{bg:ok?'#dcfce7':CHIP,rim:ok?OK:null,rad:h/2});write(t,A.W/2,y+h/2+1,15,800)}
function wrapLine(m,y){if(!m)return;X.font=fnt(14);const L=[];let ln='';m.split(' ').forEach(w=>{const t=ln?ln+' '+w:w;if(X.measureText(t).width>A.W-30&&ln){L.push(ln);ln=w}else ln=t});L.push(ln);L.forEach((t,j)=>write(t,A.W/2,y+(j-(L.length-1)/2)*px(18),14,700,A.col.tx))}
function sum(t,L){paper();head(t,1);L.forEach((s,m)=>write(s,A.W/2,A.H*(.18+m*.115),16,700,A.col.tx))}
function lay(words,y0,end){X.font=fnt(20);const g=px(30),h=px(46),out=[];let x=10,y=y0;
 words.forEach((w,j)=>{const cw=X.measureText(w+(j===words.length-1?end||'':'')).width+px(20);if(x+cw+g>A.W-10){x=10;y+=h+12}out.push({j,word:w,x,y,w:cw,h});x+=cw+g});
 const rows={};out.forEach(o=>(rows[o.y]=rows[o.y]||[]).push(o));Object.values(rows).forEach(L=>{const z=L[L.length-1],sh=(A.W-(z.x+z.w)-10)/2;L.forEach(o=>o.x+=sh)});return out}
function dots(L){return L.slice(0,-1).map((o,g)=>{const nx=L[g+1],same=nx.y===o.y,r=px(13),cx=same?(o.x+o.w+nx.x)/2:o.x+o.w+px(14);return{g,x:cx-r,y:o.y+o.h/2-r,w:2*r,h:2*r,r}})}
function sentence(words,y0,commas,o){o=o||{};const L=lay(words,y0,o.end);L.forEach(r=>chip(r,r.word+(r.j===words.length-1?o.end||'':''),{bg:r.word===o.hi?NAMEBG:CHIP,rim:o.bad===r.j?ERR:o.ring===r.j?PICK:null,ink:INK}));
 if(o.gaps!==false)dots(L).forEach(d=>{const on=commas.includes(d.g),bad=o.badGap===d.g;X.fillStyle=on?'#bbf7d0':bad?MISS:A.col.dark?'#1e293b':'#e2e8f0';X.beginPath();X.arc(d.x+d.r,d.y+d.r,d.r,0,7);X.fill();X.lineWidth=2;X.strokeStyle=on?OK:bad?ERR:A.col.dark?'#94a3b8':RIM;X.stroke();
  if(on)write(',',d.x+d.r,d.y+d.r-2,22,900,'#14532d')});return L}
/* ---- 1: who is being spoken to? ---- */
const none=()=>({x:A.W/2-px(90),y:A.H*.6,w:px(180),h:px(52)});
function drawWho(){const s=T.who;if(gone('who'))return sum('All 6 sentences read',WHO.map(([w,k])=>k<0?w.join(' ')+' (nobody)':w.map((x,j)=>j===k?`[${x}]`:x).join(' ')));
 paper();head(`Sentence ${s.i+1} of 6: who is spoken to?`);write('Tap the person spoken to, or Nobody.',A.W/2,A.H*.15,14,700,A.col.tx);
 s.L=sentence(WHO[s.i][0],A.H*.25,[],{gaps:false,bad:s.bad,end:'.'});chip(none(),'Nobody',{bg:CREAM,rim:s.bad===-1?ERR:null,n:20});wrapLine(s.m,A.H*.86)}
function who(j){const s=T.who;if(gone('who'))return;const [w,k]=WHO[s.i];
 if(j===k){s.i++;s.bad=null;s.m='';A.sound.pop();return voice((k<0?'Right: nobody is spoken to, so no comma.':`Yes: you are speaking to ${w[k]}. That name gets a comma.`)+(gone('who')?' All 6 read.':''))}
 s.bad=j;A.sound.miss();s.m=j===-1?`Someone is spoken to here: ${w[k]}.`:k<0?`${w[j]} is in the sentence, but nobody is being spoken to. Tap Nobody.`:`${w[j]} is not the person you are speaking to. Who would hear this?`;voice(s.m)}
/* ---- 2 and 5: tap the gaps ---- */
function cur2(){if(now()==='gap')return GAP[T.gap.i];const [at,gs]=SPOT[T.move.i],w=BASE.slice();w.splice(at,0,NAME);if(at===0)w[1]='please';else w[0]='Please';return[w,gs,'.']}
function drawGap(k){const s=T[k];if(gone(k))return k==='gap'?sum('All 5 sentences punctuated',GAP.map(([w,g,e])=>w.map((x,j)=>x+(g.includes(j)?',':'')).join(' ')+e)):sum('The commas follow the name',SPOT.map(([at,gs])=>{const w=BASE.slice();w.splice(at,0,NAME);if(at)w[0]='Please';return w.map((x,j)=>x+(gs.includes(j)?',':'')).join(' ')+'.'}));
 paper();if(k==='move'&&!s.placed)return drawMove();const [w,need]=cur2();head(k==='gap'?`Sentence ${s.i+1} of 5: ${need.length-s.got.length} comma${need.length-s.got.length===1?'':'s'} to place`:`Name ${SPOTN[s.i]}: place the commas`);
 write('Tap a dot to put a comma there.',A.W/2,A.H*.15,14,700,A.col.tx);s.L=sentence(w,A.H*.28,s.got,{badGap:s.bad,end:'.',hi:k==='move'?NAME:null});wrapLine(s.m,A.H*.8)}
function gap(k,g){const s=T[k];if(gone(k))return;const [w,need]=cur2();if(s.got.includes(g))return;
 if(!need.includes(g)){s.bad=g;A.sound.miss();const a=w[g],b=w[g+1];
  s.m=a==='Thank'?'Thank you stays together. The comma goes before the name.':need.length>1&&g>need[1]?`The name ends at ${w[need[1]]}. The second comma goes right after it.`:`A comma between ${a} and ${b} splits words that belong together. Commas go around the yes, no or name.`;return voice(s.m)}
 s.got.push(g);s.bad=null;s.m='';A.sound.pop();if(s.got.length<need.length)return voice(`Comma after ${w[g]}. ${need.length===2?'A name in the middle needs a second comma.':''}`);
 const done=w.map((x,j)=>x+(need.includes(j)?',':'')).join(' ')+'.';s.i++;s.got=[];s.placed=false;voice(done+(gone(k)?k==='gap'?' All 5 done.':' The commas follow the name.':''))}
/* ---- 3: tag questions: drag marks into the two slots ---- */
function tray(){const w=Math.min(px(76),(A.W-60)/3);return MARKS.map((m,j)=>({m,x:A.W/2-(3*w+20)/2+j*(w+10),y:A.H*.6,w,h:px(60)}))}
function drawTag(){const s=T.tag;if(gone('tag'))return sum('All 4 tag questions',TAG.map(([a,t])=>`${a}, ${t}?`));
 const [a,t]=TAG[s.i];paper();head(`Tag ${s.i+1} of 4: slot ${s.k+1} of 2`);write('Drag a mark into the glowing slot.',A.W/2,A.H*.15,14,700,A.col.tx);
 X.font=fnt(20);const st={word:a,x:10,y:A.H*.2,w:Math.min(A.W-20,X.measureText(a).width+px(20)),h:px(46)};const tg={word:t,x:A.W-10-(X.measureText(t).width+px(20)),y:st.y+px(56),w:X.measureText(t).width+px(20),h:px(46)};
 tg.x-=px(40);chip(st,a,{n:20});chip(tg,t,{n:20,bg:CREAM});
 const sl=[{x:Math.min(st.x+st.w+4,A.W-px(40)),y:st.y+px(6),w:px(34),h:px(40)},{x:Math.min(tg.x+tg.w+4,A.W-px(38)),y:tg.y+px(6),w:px(34),h:px(40)}];s.sl=sl;
 sl.forEach((r,j)=>{const v=s.put[j];chip(r,v||'',{bg:v?'#dcfce7':j===s.k?'#dbeafe':CHIP,rim:j===s.k&&!v?PICK:v?OK:null,n:26,w:900})});
 tray().forEach(r=>{const g=grab&&grab.m===r.m;chip(g?{...r,x:grab.x-r.w/2,y:grab.y-r.h/2}:r,r.m,{n:32,w:900,bg:s.bad===r.m?MISS:CREAM,rim:g?PICK:s.bad===r.m?ERR:null})});wrapLine(s.m,A.H*.88)}
function mark(m){const s=T.tag;if(gone('tag'))return;const want=s.k?'?':',';
 if(m!==want){s.bad=m;A.sound.miss();s.m=s.k===0?(m==='?'?'Not yet: the question mark goes at the very end, after the tag.':'A full stop here would end the sentence before the tag. Use a comma.'):(m===','?'The sentence is over, so it needs an end mark.':'The tag asks a question, so it ends with a question mark.');return voice(s.m)}
 s.put[s.k]=m;s.k++;s.bad=null;s.m='';A.sound.pop();if(s.k<2)return voice('Comma before the tag. Now the end mark.');
 const [a,t]=TAG[s.i];s.i++;s.k=0;s.put=[];voice(`${a}, ${t}?`+(gone('tag')?' All 4 done.':''))}
/* ---- 4: needs a comma or not ---- */
function bins(){const g=10,w=(A.W-3*g)/2;return[0,1].map(j=>({j,x:g+j*(w+g),y:A.H*.45,w,h:A.H*.52}))}
const deal=()=>{X.font=fnt(17);const w=Math.min(A.W-20,X.measureText(SORT[T.sort.i][0]).width+px(28));return{x:A.W/2-w/2,y:A.H*.13,w,h:px(52)}};
function drawSort(){const s=T.sort;paper();head(gone('sort')?'All 8 sorted':`Card ${s.i+1} of 8: comma or not?`,gone('sort'));
 bins().forEach(b=>{chip(b,null,{bg:b.j?'#e0e7ff':'#dcfce7',rim:s.bad===b.j?ERR:RIM});X.fillStyle=INK;X.font=fnt(15,800);X.textAlign='center';X.textBaseline='top';X.fillText(BINS[b.j],b.x+b.w/2,b.y+8,b.w-8);
  X.font=fnt(12,600);SORT.slice(0,s.i).filter(x=>x[1]===b.j).forEach((x,m)=>X.fillText(x[0],b.x+b.w/2,b.y+px(32)+m*px(20),b.w-8))});
 if(!gone('sort')){const r=deal();chip(grab&&grab.card?{...r,x:grab.x-r.w/2,y:grab.y-r.h/2}:r,SORT[s.i][0],{n:17,rim:grab?PICK:null})}if(s.m)wrapLine(s.m,A.H*.355)}
function sortIt(j){const s=T.sort;if(gone('sort'))return;const [t,ok,why]=SORT[s.i];
 if(j!==ok){s.bad=j;A.sound.miss();s.m=why;return voice(why)}s.i++;s.bad=null;s.m='';A.sound.pop();voice(`${BINS[ok]}: ${why}`+(gone('sort')?' All 8 sorted.':''))}
/* ---- 5: drag the name into place first ---- */
function holes(){const L=lay(BASE,A.H*.3,'.');return[{at:0,x:L[0].x-px(26),y:L[0].y,w:px(24),h:L[0].h},{at:1,x:L[0].x+L[0].w+2,y:L[0].y,w:px(26),h:L[0].h},{at:4,x:L[3].x+L[3].w+2,y:L[3].y,w:px(24),h:L[3].h}]}
const nameCard=()=>({x:A.W/2-px(50),y:A.H*.66,w:px(100),h:px(50)});
function drawMove(){const s=T.move;head(`Put ${NAME} ${SPOTN[s.i]}`);write('Drag the name into the sentence.',A.W/2,A.H*.15,14,700,A.col.tx);
 lay(BASE,A.H*.3,'.').forEach(r=>chip(r,r.word+(r.j===3?'.':''),{n:20}));holes().forEach(h=>{X.fillStyle=h.at===SPOT[s.i][0]?'#bfdbfe':A.col.dark?'#334155':'#e2e8f0';A.paint.rrect(h.x,h.y,h.w,h.h,6);X.fill()});
 const r=nameCard();chip(grab&&grab.name?{...r,x:grab.x-r.w/2,y:grab.y-r.h/2}:r,NAME,{bg:NAMEBG,rim:grab?PICK:null,n:22});wrapLine(s.m,A.H*.88)}
function drop(at){const s=T.move;if(gone('move'))return;if(at!==SPOT[s.i][0]){s.m=`This round puts the name ${SPOTN[s.i]}. Drop it in the blue slot.`;A.sound.miss();return voice(s.m)}
 s.placed=true;s.m='';A.sound.pop();voice(`${NAME} is ${SPOTN[s.i]}. Now place the comma${SPOT[s.i][1].length>1?'s':''}.`)}
/* ---- pointer ---- */
function down(p){const k=now();if(k==='chal'||gone(k))return false;
 if(k==='who'){if(inside(p,none()))return who(-1),false;const r=(T.who.L||[]).find(r=>inside(p,r));if(r)who(r.j)}
 if(k==='gap'||(k==='move'&&T.move.placed)){const d=dots(lay(cur2()[0],A.H*.28,'.')).find(d=>inside(p,{x:d.x-6,y:d.y-6,w:d.w+12,h:d.h+12}));if(d)gap(k,d.g)}
 if(k==='move'&&!T.move.placed&&inside(p,nameCard())){grab={name:1,x:p.x,y:p.y};return true}
 if(k==='tag'){const r=tray().find(r=>inside(p,r));if(r){grab={m:r.m,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}}
 if(k==='sort'){if(inside(p,deal())){grab={card:1,x:p.x,y:p.y};return true}const b=bins().find(r=>inside(p,r));if(b)sortIt(b.j)}return false}
function move(p){if(grab){grab.x=p.x;grab.y=p.y;A.redraw()}}
function up(p){if(!grab)return;const g=grab;grab=null;
 if(g.m){const sl=(T.tag.sl||[])[T.tag.k];if(inside(p,sl&&{x:sl.x-12,y:sl.y-12,w:sl.w+24,h:sl.h+24})||Math.hypot(p.x-g.x0,p.y-g.y0)<8)mark(g.m);else A.redraw()}
 else if(g.card){const b=bins().find(r=>inside(p,r));if(b)sortIt(b.j);else A.redraw()}
 else if(g.name){const h=holes().find(h=>inside(p,{x:h.x-14,y:h.y-14,w:h.w+28,h:h.h+28}));if(h)drop(h.at);else A.redraw()}}
function clear(){ver++;grab=null;for(const k in T)delete T[k];KEYS.slice(0,5).forEach(k=>T[k]={i:0});T.gap.got=[];T.move.got=[];T.tag.k=0;T.tag.put=[];T.ping=()=>{}}
function voice(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();ctl();T.ping()}
function open(i,first,ready,msg){clear();voice(first);T.ping=()=>{if(A.step===i&&ready()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=ver;acts.forEach((f,j)=>setTimeout(()=>{if(me===ver)f()},ms*(j+1)))}
function ctl(){if(!pad)return;pad.innerHTML='';const k=now(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};if(k==='chal'||gone(k))return;
 if(k==='who'){WHO[T.who.i][0].forEach((w,j)=>b(w,()=>who(j),`${w} is spoken to`));b('Nobody',()=>who(-1),'Nobody is spoken to')}
 if(k==='gap'||(k==='move'&&T.move.placed)){const w=cur2()[0];w.slice(0,-1).forEach((x,g)=>{if(!T[k].got.includes(g))b(`${x} , ${w[g+1]}`,()=>gap(k,g),`Comma after ${x}`)})}
 if(k==='move'&&!T.move.placed)['start','middle','end'].forEach((n,j)=>b(`${NAME} at the ${n}`,()=>drop([0,1,4][j]),`Put ${NAME} at the ${n}`));
 if(k==='tag')MARKS.forEach(m=>b(m,()=>mark(m),`Put ${m==='?'?'a question mark':m===','?'a comma':'a full stop'} in the slot`));
 if(k==='sort')BINS.forEach((h,j)=>b(h,()=>sortIt(j),`${SORT[T.sort.i][0]}: ${h}`))}
const steps=[
{h:'Who is spoken to?',p:'A name only gets a comma when you are talking to that person. If the name is just in the sentence, it gets no comma.',
predict:{q:'Mum said it was late. Does Mum need a comma?',opts:['Yes, it is a name','No, nobody is spoken to'],ans:1},task:'Read all 6 sentences',
show:()=>auto(0,WHO.map(([,k])=>()=>who(k)),500),go:()=>open(0,'Sam come and look at this. Tap the person spoken to, or Nobody.',()=>gone('who'),'Comma for the person spoken to.')},
{h:'Place the commas',p:'Put a comma after yes or no at the start of a reply. Put a comma between the name and the rest. A name in the middle needs two commas.',
predict:{q:'I think Mum that we are late. How many commas?',opts:['1','2'],ans:1},task:'Punctuate all 5 sentences',
show:()=>auto(1,GAP.flatMap(([,g])=>g.map(x=>()=>gap('gap',x))),420),go:()=>open(1,'Yes I understand. Tap a dot to put a comma there.',()=>gone('gap'),'Commas around yes, no and names.')},
{h:'Tag questions',p:"A tag question is a short question on the end, like isn't it. Put a comma before the tag and a question mark at the end.",task:'Punctuate all 4 tags',
show:()=>auto(2,TAG.flatMap(()=>[()=>mark(','),()=>mark('?')]),420),go:()=>open(2,"It's cold today isn't it. Drag a mark into the first slot.",()=>gone('tag'),'Comma before the tag, question mark at the end.')},
{h:'Comma or not?',p:'Not every yes, no or name gets a comma. No dogs are allowed means not any dogs. Only a reply or a person spoken to is set off.',
predict:{q:'No dogs are allowed here. Comma after No?',opts:['Yes, after no','No comma'],ans:1},task:'Sort all 8 cards',
show:()=>auto(3,SORT.map(x=>()=>sortIt(x[1])),420),go:()=>open(3,'No dogs are allowed here. Drag it to a box, or use the buttons.',()=>gone('sort'),'Set off replies and names spoken to, nothing else.')},
{h:'Move the name',p:'Move the name around the sentence. The commas follow it: one at the start or end, a pair in the middle.',task:'Place the name 3 ways',
show:()=>auto(4,SPOT.flatMap(([at,gs])=>[()=>drop(at),...gs.map(g=>()=>gap('move',g))]),450),go:()=>open(4,'Drag Zara to the start of the sentence.',()=>gone('move'),'The commas follow the name.')},
{h:'Challenge',p:'',go:()=>{clear();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.ping()});
const QS=[
{q:'Which is right?',a:"Yes, I'll come.",o:[["Yes I'll come.",'noyes'],["Yes I'll, come.",'stray']]},
{q:'Which is right?',a:'Thank you, Leo.',o:[['Thank, you Leo.','split'],['Thank you Leo.','noname']]},
{q:'A sign that keeps dogs out says…',a:'No dogs allowed.',o:[['No, dogs allowed.','nodet'],['No dogs, allowed.','stray2']]},
{q:'Which is right?',a:"You're coming, aren't you?",o:[["You're coming aren't you?",'notag'],["You're coming, aren't you.",'tagstop']]},
{q:'Which is right?',a:"I think, Mia, you're right.",o:[["I think, Mia you're right.",'half'],["I think Mia, you're right.",'half2']]},
{q:'Which is right?',a:'I said yes to the trip.',o:[['I said, yes to the trip.','inside'],['I said yes, to the trip.','inside2']]}];
function why(t){let m='Commas set off a reply, a tag or the person spoken to.';
 switch(t){case 'noyes':m='Yes is a reply here, so it needs a comma after it.';break;
 case 'stray':m='The comma belongs after Yes, not inside the sentence.';break;
 case 'split':m='Thank you stays together. The comma goes before the name.';break;
 case 'noname':m='You are speaking to Leo, so a comma sets the name off.';break;
 case 'nodet':m='No, dogs allowed means dogs are allowed! No here means not any, so no comma.';break;
 case 'stray2':m='A comma never splits a subject from its verb.';break;
 case 'notag':m="aren't you is a tag question. Put a comma before it.";break;
 case 'tagstop':m='A tag question asks something, so it ends with a question mark.';break;
 case 'half':m='A name in the middle needs a pair of commas. One is missing after Mia.';break;
 case 'half2':m='A name in the middle needs a pair of commas. One is missing before Mia.';break;
 case 'inside':m='yes is what I said, inside the sentence. It is not a reply, so no comma.';break;
 case 'inside2':m='A comma after yes cuts off what I said yes to. No comma here.';break}
 return m}
function quiz(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>mark2(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark2(t,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
function draw(){const k=now();if(k==='chal'){paper();head('Challenge',1);write('Yes, … · …, Leo. · …, isn’t it? · I think, Mia, …',A.W/2,A.H*.5,16,800,A.col.tx);return}
 if(k==='who')drawWho();else if(k==='gap'||k==='move')drawGap(k);else if(k==='tag')drawTag();else drawSort();A.fx.draw(X)}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{box.hidden=B.step!==5;pad.hidden=B.step===5;ctl()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Comma buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});ctl()}}).start()})})();
