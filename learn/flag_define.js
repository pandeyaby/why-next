/* Flagship – defining words by category and key attributes (ages 6–9, CCSS L.1.5): drop a group word into
   "A duck is a ___" and watch the picture cards that no longer fit fade out, add key attributes ("that quacks")
   until the definition fits only the target word, fix weak definitions (too broad, the word itself, just one
   example), sort words into categories, and link "cozy" to real places at home. Drag or tap; buttons for all. */
(()=>{
const GROUP=[{w:'duck',e:'🦆',cards:[['🦆','duck','bird animal thing'],['🦢','swan','bird animal thing'],['🐧','penguin','bird animal thing'],['🐈','cat','animal thing'],['🐟','fish','animal thing'],['🚗','car','thing']],
  chips:[['a thing','thing'],['an animal','animal'],['a bird','bird']],best:'bird'},
 {w:'tiger',e:'🐅',cards:[['🐅','tiger','cat animal living'],['🦁','lion','cat animal living'],['🐆','cheetah','cat animal living'],['🐕','dog','animal living'],['🦓','zebra','animal living'],['🌳','tree','living']],
  chips:[['a living thing','living'],['an animal','animal'],['a big cat','cat']],best:'cat'}];
const TRAIT=[{w:'duck',g:'bird',cards:[['🦆','duck','swims quacks wings'],['🦢','swan','swims wings'],['🐧','penguin','swims wings'],['🦉','owl','hoots wings']],
  chips:[['that has wings','wings'],['that swims','swims'],['that has four legs','legs'],['that quacks','quacks']]},
 {w:'tiger',g:'big cat',cards:[['🐅','tiger','fur large stripes'],['🦁','lion','fur large mane'],['🐆','cheetah','fur spots'],['🐈','pet cat','fur small']],
  chips:[['that has fur','fur'],['that is large','large'],['that has a trunk','trunk'],['that has stripes','stripes']]}];
const FIX=[['spoon','🥄',[['A spoon is a tool you use to eat soup.',1,'Yes! It names the group (a tool) and a key attribute (you eat soup with it).'],['A spoon is a spoon.',0,'That uses the word to define itself, so it tells you nothing new.'],['A spoon is something.',0,'“Something” fits everything. Name the group: a spoon is a tool.']]],
 ['hat','🎩',[['A hat is red.',0,'Not every hat is red. A key attribute must be true for all hats.'],['A hat is clothing you wear on your head.',1,'Yes! The group is clothing, and you wear it on your head.'],['A hat is like my blue one.',0,'That is one example, not a definition. Say the group and what makes a hat a hat.']]]];
const BINS=[['🍎','Fruit'],['🔨','Tools'],['👕','Clothes']];
const WORDS=[['🍐','pear',0],['🔨','hammer',1],['🧦','sock',2],['🪚','saw',1],['🍌','banana',0],['🧥','coat',2]];
const HOME=[['🛏️','warm bed',1,'Yes! A warm, soft bed feels cozy.'],['🌧️','cold rain',0,'Cold rain is not cozy. Cozy means warm, safe and snug.'],['🧣','soft blanket',1,'Yes! Snuggled in a soft blanket is cozy.'],
 ['🧊','icy step',0,'An icy step is cold and hard. Find a warm, snug place.'],['🔥','by the fire',1,'Yes! Sitting warm by the fire feels cozy.']];
VIS.reg('flagdefine',c=>{let A,pad,qb,qi=-1,gen=0,run=0;c.fig.classList.add('young');
const reset0=()=>({next:()=>{},n:0,rd:0,pick:null,adds:[],got:[],deck:[],grab:null,bad:-1,glow:-1}),S=reset0();
const mode=()=>['group','trait','fix','sort','real','quiz'][A.step],fast=()=>A.reduced();
const goal=()=>({group:2,trait:2,fix:2,sort:4,real:3}[mode()]||99),fz=n=>Math.round(n*(A.narrow?1:1.12));
function sayIt(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function write(g,t,x,y,n,col,mw,wt){g.font=`${wt||800} ${fz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-10)}
/* wrap onto two lines if the text is wider than mw */
function write2(g,t,x,y,n,col,mw){g.font=`800 ${fz(n)}px system-ui,sans-serif`;if(g.measureText(t).width<=mw)return write(g,t,x,y,n,col,mw);
 const w=t.split(' '),h=Math.ceil(w.length/2),d=fz(n)*.6;write(g,w.slice(0,h).join(' '),x,y-d,n,col,mw);write(g,w.slice(h).join(' '),x,y+d,n,col,mw)}
function glyph(g,e,x,y,s){g.font=`${Math.round(s)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
function panel(g,r,fill,line,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=lw||2;g.strokeStyle=line;g.stroke()}
const on=(p,r)=>r&&p.x>=r.x-5&&p.x<=r.x+r.w+5&&p.y>=r.y-5&&p.y<=r.y+r.h+5;
const rim=()=>A.mix(A.col.tx,A.col.pn,.4),sheet=()=>A.col.dark?'#1e293b':'#fff',tint=h=>A.mix(A.col.pn,h,A.col.dark?.22:.62);
const strip=()=>({x:8,y:A.H*.03,w:A.W-16,h:A.H*.17});
const grid=n=>{const cols=n>4?3:2,w=(A.W-16)/cols-8,h=A.H*(n>4?.19:.18);return[...Array(n)].map((_,i)=>({x:8+(i%cols)*(w+8)+4,y:A.H*.24+Math.floor(i/cols)*(h+6),w,h}))};
const chipR=n=>{const cols=A.narrow&&n>3?2:n,w=(A.W-16)/cols-8,h=A.H*(cols<n?.09:.12),top=A.H*(cols<n?.73:.8);return[...Array(n)].map((_,i)=>({x:8+(i%cols)*(w+8)+4,y:top+Math.floor(i/cols)*(h+6),w,h}))};
const dict=()=>({x:A.W*.1,y:A.H*.04,w:A.W*.8,h:A.H*.24});
const rows=()=>[0,1,2].map(i=>({x:A.W*.06,y:A.H*(.36+i*.21),w:A.W*.88,h:A.H*.17}));
const bins=()=>[0,1,2].map(i=>{const w=A.W/3-10;return{x:5+i*(A.W/3),y:A.H*.04,w,h:A.H*.6}});
const wait=()=>{const w=Math.min(A.W*.6,240);return{x:A.W/2-w/2,y:A.H*.72,w,h:A.H*.2}};
const spots=()=>[[.18,.3],[.5,.24],[.82,.3],[.3,.66],[.7,.66]].map(([u,v])=>{const s=Math.min(A.W*.22,A.H*.26,104);return{x:A.W*u-s/2,y:A.H*v-s/2,w:s,h:s}});
const at=r=>{const d=S.grab;return d&&d.x!=null?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r};
/* the cards a definition still fits */
const fitsG=R=>R.cards.filter(k=>S.pick&&k[2].split(' ').includes(S.pick));
const fitsT=R=>R.cards.filter(k=>S.adds.every(a=>k[2].split(' ').includes(a)));
function sentence(){const m=mode();if(m==='group'){const R=GROUP[S.rd%2];return`A ${R.w} is ${S.pick?R.chips.find(x=>x[1]===S.pick)[0]:'___'}`}
 const R=TRAIT[S.rd%2],ph=S.adds.map((a,i)=>{const t=R.chips.find(x=>x[1]===a)[0];return i?t.replace(/^that /,''):t});return`A ${R.w} is a ${R.g} ${ph.length?ph.join(' and '):'that ___'}.`}
function drawCards(g,list,alive){const C=A.col;grid(list.length).forEach((r,i)=>{const k=list[i],live=alive.includes(k);g.globalAlpha=live?1:.3;
  panel(g,r,live?sheet():A.mix(C.pn,C.ln,.4),rim());glyph(g,k[0],r.x+r.w*.3,r.y+r.h/2,r.h*.55);write(g,k[1],r.x+r.w*.68,r.y+r.h/2,13,C.tx,r.w*.6);g.globalAlpha=1;
  if(!live){g.strokeStyle=C.rd;g.lineWidth=3;g.beginPath();g.moveTo(r.x+8,r.y+8);g.lineTo(r.x+r.w-8,r.y+r.h-8);g.stroke()}})}
function drawChips(g,chips,used){const C=A.col;chipR(chips.length).forEach((b,i)=>{if(used(chips[i][1]))return;const r=S.grab&&S.grab.k===i?at(b):b;
  panel(g,r,tint('#fde68a'),S.bad===i?C.rd:rim(),S.bad===i?4:2);write2(g,chips[i][0],r.x+r.w/2,r.y+r.h/2,12,C.tx,r.w-8)})}
function drawDefine(g){const C=A.col,m=mode(),R=(m==='group'?GROUP:TRAIT)[S.rd%2],s=strip();g.setLineDash([6,5]);panel(g,s,A.alpha(C.vi,.08),S.glow===0?C.vi:rim(),S.glow===0?4:2);g.setLineDash([]);
 write2(g,sentence(),s.x+s.w/2,s.y+s.h/2,14,C.tx,s.w-16);const alive=m==='group'?(S.pick?fitsG(R):R.cards):fitsT(R);drawCards(g,R.cards,alive);
 write(g,`Fits ${alive.length} of ${R.cards.length}`+(alive.length===1?' ✓ only the '+R.w+'!':''),A.W/2,A.H*.67,13,C.mu,A.W-10,700);
 if(S.n<=S.rd&&S.n<2)drawChips(g,R.chips,k=>m==='group'?k===S.pick:S.adds.includes(k))}
function drawFix(g){const C=A.col,F=FIX[S.rd%2],d=dict();panel(g,d,tint('#bfdbfe'),S.glow===0?C.vi:rim(),S.glow===0?4:2);glyph(g,F[1],d.x+d.h*.5,d.y+d.h/2,d.h*.55);
 write(g,'📖 My word book: '+F[0],d.x+d.h+(d.w-d.h)/2,d.y+d.h*.3,13,C.tx,d.w-d.h-8);const best=S.n>S.rd?F[2].find(x=>x[1]):null;
 write2(g,best?best[0]:'Drag the best definition here.',d.x+d.h+(d.w-d.h)/2,d.y+d.h*.68,12,best?C.tx:C.mu,d.w-d.h-8);
 if(S.n<=S.rd&&S.n<2)rows().forEach((b,i)=>{const r=S.grab&&S.grab.k===i?at(b):b;panel(g,r,sheet(),S.bad===i?C.rd:rim(),S.bad===i?4:2);write2(g,F[2][S.deck[i]][0],r.x+r.w/2,r.y+r.h/2,13,C.tx,r.w-12)})}
function drawSort(g){const C=A.col;bins().forEach((r,i)=>{panel(g,r,tint(['#fecaca','#e2e8f0','#bbf7d0'][i]),i===S.glow?C.vi:rim(),i===S.glow?5:2);glyph(g,BINS[i][0],r.x+r.w/2,r.y+24,26);
  write(g,BINS[i][1],r.x+r.w/2,r.y+54,13,C.tx,r.w-6);S.got.filter(p=>p.b===i).forEach((p,j)=>glyph(g,WORDS[p.k][0],r.x+r.w/2,r.y+r.h*(.5+.2*j),Math.min(r.w*.3,40)))});
 const k=S.deck[0];if(k!=null){const r=at(wait());panel(g,r,sheet(),S.bad===k?C.rd:rim(),S.bad===k?4:2);glyph(g,WORDS[k][0],r.x+r.h*.5,r.y+r.h/2,r.h*.55);write(g,WORDS[k][1],r.x+r.h+(r.w-r.h)/2,r.y+r.h/2,15,C.tx,r.w-r.h-6)}}
function drawReal(g){const C=A.col;g.fillStyle=A.mix(C.pn,'#fed7aa',C.dark?.12:.4);g.fillRect(0,A.H*.12,A.W,A.H*.88);write(g,`“Cozy” places: ${S.n} of 3`,A.W/2,A.H*.06,15,C.tx);
 spots().forEach((r,i)=>{const hit=S.got.includes(i);panel(g,r,hit?tint('#bbf7d0'):sheet(),i===S.bad?C.rd:i===S.glow?C.vi:hit?C.gr:rim(),hit||i===S.bad||i===S.glow?4:2);glyph(g,HOME[i][0],r.x+r.w/2,r.y+r.h*.42,r.w*.48);write(g,HOME[i][1],r.x+r.w/2,r.y+r.h*.84,11,C.tx,r.w-4)})}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.04:.3);g.fillRect(0,0,A.W,A.H);const m=mode();
 if(m==='group'||m==='trait')drawDefine(g);if(m==='fix')drawFix(g);if(m==='sort')drawSort(g);if(m==='real'||m==='quiz')drawReal(g);A.fx.draw(g)}
function lit(i){S.glow=i;const v=gen;setTimeout(()=>{if(v===gen){S.glow=-1;A.redraw()}},420)}
function miss(t){A.sound.miss();sayIt(t);A.redraw()}
function good(t){S.n++;S.bad=-1;A.sound.pop();sayIt(t);pads();A.redraw();S.next()}
function nextRound(deck){const v=gen;if(S.n<2)setTimeout(()=>{if(v===gen){S.rd++;S.pick=null;S.adds=[];S.bad=-1;if(deck)S.deck=deck;pads();A.redraw()}},fast()?20:1000)}
const names=l=>l.map(k=>k[1]).join(', ');
/* drop group chip i into the sentence */
function group(i){if(S.n>=2||S.n>S.rd)return;lit(0);const R=GROUP[S.rd%2],ch=R.chips[i];S.pick=ch[1];const left=fitsG(R);
 if(ch[1]!==R.best){S.bad=i;return miss(`“${ch[0]}” still fits ${left.length} cards: ${names(left)}. Pick a smaller group that is closer to a ${R.w}.`)}
 good(`Yes! “${ch[0]}” is the closest group. It still fits ${names(left)}, so next we need a key attribute.`);nextRound()}
/* add key attribute chip i */
function trait(i){if(S.n>=2||S.n>S.rd)return;lit(0);const R=TRAIT[S.rd%2],ch=R.chips[i],me=R.cards[0];if(S.adds.includes(ch[1]))return;
 if(!me[2].split(' ').includes(ch[1])){S.bad=i;return miss(`A ${R.w} is not a ${R.g} ${ch[0]}. A key attribute must be true for the word.`)}
 const before=fitsT(R).length;S.adds.push(ch[1]);const left=fitsT(R);
 if(left.length===before){S.adds.pop();S.bad=i;return miss(`Every card left is a ${R.g} ${ch[0]}, so it still fits ${left.length}. Pick a key attribute that only some have.`)}
 S.bad=-1;if(left.length>1){A.sound.tick();sayIt(`Closer! It still fits ${names(left)}. Add another key attribute.`);pads();return A.redraw()}
 good(`Yes! ${sentence()} Now it fits only the ${R.w}.`);nextRound()}
function fix(j){if(S.n>=2||S.n>S.rd)return;lit(0);const it=FIX[S.rd%2][2][S.deck[j]];if(!it[1]){S.bad=j;return miss(it[2])}good(it[2]);nextRound([1,2,0])}
function sortTo(b){const k=S.deck[0];if(k==null||S.n>=4)return;lit(b);const it=WORDS[k];if(it[2]!==b){S.bad=k;return miss(`A ${it[1]} is not in ${BINS[b][1]}. What kind of thing is a ${it[1]}?`)}
 S.got.push({k:S.deck.shift(),b});good(`Yes! A ${it[1]} goes in ${BINS[b][1]}.`)}
function real(i){if(S.n>=3||S.got.includes(i))return;lit(i);const it=HOME[i];if(!it[2]){S.bad=i;return miss(it[3])}S.got.push(i);S.bad=-1;good(it[3])}
function pads(){if(!pad)return;pad.innerHTML='';const m=mode();if(m==='quiz'||S.n>=goal())return;
 const B=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},pad,t);b.onclick=f};
 if(m==='group'&&S.n<=S.rd)GROUP[S.rd%2].chips.forEach((x,i)=>{if(x[1]!==S.pick)B(x[0],`A ${GROUP[S.rd%2].w} is ${x[0]}`,()=>group(i))});
 if(m==='trait'&&S.n<=S.rd)TRAIT[S.rd%2].chips.forEach((x,i)=>{if(!S.adds.includes(x[1]))B('+ '+x[0],`Add: ${x[0]}`,()=>trait(i))});
 if(m==='fix'&&S.n<=S.rd)S.deck.forEach((d,j)=>{const t=FIX[S.rd%2][2][d][0];B(t,`Pick: ${t}`,()=>fix(j))});
 if(m==='sort'&&S.deck.length)BINS.forEach((x,b)=>B(x[0]+' '+x[1],`${WORDS[S.deck[0]][1]} goes in ${x[1]}`,()=>sortTo(b)));
 if(m==='real')HOME.forEach((x,i)=>{if(!S.got.includes(i))B(x[0]+' '+x[1],`Is ${x[1]} cozy?`,()=>real(i))})}
function grabAt(p){const m=mode();if(S.n>S.rd&&m!=='sort')return;
 if(m==='group'||m==='trait'){const R=(m==='group'?GROUP:TRAIT)[S.rd%2],j=chipR(R.chips.length).findIndex(r=>on(p,r));return j<0?undefined:j}
 if(m==='fix'){const j=rows().findIndex(r=>on(p,r));return j<0?undefined:j}
 if(m==='sort'&&S.deck.length&&on(p,wait()))return S.deck[0]}
function land(k,p,moved){const m=mode();
 if(m==='sort'){const b=bins().findIndex(r=>on(p,r));if(!moved||b<0){sayIt('Drag the word into a box, or tap a box.');return A.redraw()}return sortTo(b)}
 const tgt=m==='fix'?dict():strip();if(moved&&!on(p,tgt)){sayIt(m==='fix'?'Drag it into the word book.':'Drag the card into the sentence.');return A.redraw()}
 ({group,trait,fix}[m])(k)}
function down(p){const m=mode();if(m==='quiz'||S.n>=goal())return false;
 if(m==='real'){const i=spots().findIndex(r=>on(p,r));if(i>=0)real(i);return false}
 const k=grabAt(p);if(k!=null){S.grab={k,x:null,x0:p.x,y0:p.y};return true}
 if(m==='sort'){const b=bins().findIndex(r=>on(p,r));if(b>=0)sortTo(b)}return false}
function move(p){const d=S.grab;if(d&&(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8)){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.grab;S.grab=null;if(d)land(d.k,p,d.x!=null)}
const close=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(list,ms){const k=++gen;list.forEach((f,j)=>setTimeout(()=>{if(k===gen)f()},fast()?j*40+30:(j+1)*(ms||450)))}
const fresh=(deck,more)=>{gen++;Object.assign(S,reset0(),{deck},more||{})};
const steps=[
{h:'Name the group',p:'To define a word, first say what group it belongs to. Drag a group card into the sentence and watch which cards still fit.',predict:{q:'Which group tells you most about a duck?',opts:['a thing','a bird'],ans:1},task:'Pick the closest group twice',
 show:()=>{steps[0].go();auto([()=>group(2),()=>group(2)],1300)},go:()=>{fresh([]);sayIt('A duck is a what? Drag a group card.');pads();S.next=close(0,()=>S.n>=2,'The closest group (category) is the first part of a definition.')}},
{h:'Add a key attribute',p:'Lots of birds swim. Add key attributes until the definition fits only the duck.',predict:{q:'“A duck is a bird that swims.” Does it fit only the duck?',opts:['Yes, only the duck','No, a swan swims too'],ans:1},task:'Make 2 definitions fit one card',
 show:()=>{steps[1].go();auto([()=>trait(1),()=>trait(3),()=>trait(1),()=>trait(3)],900)},go:()=>{fresh([]);sayIt('A duck is a bird that what? Add a key attribute.');pads();S.next=close(1,()=>S.n>=2,'Group plus key attribute: a duck is a bird that swims and quacks.')}},
{h:'Fix the definition',p:'Some definitions do not help. Drag the best one into the word book.',task:'Fix 2 definitions',
 show:()=>{steps[2].go();auto([()=>fix(S.deck.indexOf(0)),()=>fix(S.deck.indexOf(1))],1300)},go:()=>{fresh([0,2,1]);sayIt('Which is the best definition of spoon?');pads();S.next=close(2,()=>S.n>=2,'A good definition says the group and a key attribute that is true.')}},
{h:'Sort into groups',p:'Words that are the same kind go together. Drag each word into its group.',task:'Sort 4 words',
 show:()=>{steps[3].go();auto([0,1,2,3].map(()=>()=>sortTo(WORDS[S.deck[0]][2])))},go:()=>{fresh([0,1,2,3,4,5]);sayIt('Where does pear go?');pads();S.next=close(3,()=>S.n>=4,'Pear and banana are fruit, hammer and saw are tools, sock and coat are clothes.')}},
{h:'Words in real life',p:'Cozy means warm, safe and snug. Tap 3 places at home that feel cozy.',task:'Find 3 cozy places',
 show:()=>{steps[4].go();auto([()=>real(0),()=>real(2),()=>real(4)])},go:()=>{fresh([]);sayIt('Tap a place that feels cozy.');pads();S.next=close(4,()=>S.n>=3,'Linking a word to real places helps you know what it means.')}},
{h:'Challenge',p:'',go:()=>{fresh([],{got:[0,2,4]});quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.next()});
const QS=[['Which is the best definition of a duck?',[['A bird that swims and quacks','ok'],['A thing','broad'],['A duck is a duck','self']]],
 ['“A tiger is a big cat.” What should you add?',[['A key attribute, like stripes','ok'],['Nothing, it is done','done'],['“It is a tiger”','self']]],
 ['“A hat is red.” What is wrong with it?',[['Not every hat is red','ok'],['It is too short','short'],['Nothing is wrong','fine']]],
 ['Which group does a carrot go in?',[['Vegetables','ok'],['Tools','tool'],['Clothes','cloth']]],
 ['Which is a real-life link for “cozy”?',[['Curled up in a soft blanket','ok'],['Standing in cold rain','cold'],['A loud, busy road','loud']]]];
function why(t){let m='Look back at the lab: name the group, then add a key attribute that is true.';
 if(t==='broad')m='“A thing” fits nearly everything. Name the closest group: a duck is a bird.';
 if(t==='self')m='Using the word to define itself tells you nothing new. Say the group and a key attribute.';
 if(t==='done')m='Lions are big cats too, so it fits more than the tiger. Add a key attribute, like stripes.';
 if(t==='short')m='Short is fine. The problem is that not every hat is red, so it is not a key attribute.';
 if(t==='fine')m='Lots of hats are not red. A key attribute must be true for every hat.';
 if(t==='tool')m='A carrot is not a tool. It is a food that grows in the ground: a vegetable.';
 if(t==='cloth')m='You eat a carrot, you do not wear it. It is a vegetable.';
 if(t==='cold')m='Cold rain is the opposite of cozy. Cozy means warm, safe and snug.';
 if(t==='loud')m='A loud, busy road is not snug or calm. Pick a warm, safe place.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 qb.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qb.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});sayIt('Challenge: '+q);A.redraw()}
function mark(t){qb.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qb.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Well defined.':'✗ '+why(t)}${ok?` Streak: ${run}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.64,tall:1.2,draw,onStep:A=>{qb.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qb=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pads()}});
A.start()})})();
