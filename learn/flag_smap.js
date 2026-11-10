/* Flagship – characters, settings and events (ages 5–8; CCSS RL.K.3, RL.1.3, RL.K.2; NC England Y1 traditional tales).
   Sort story cards, find who counts as a character, tap where and when clues, keep key events not details, fill a story
   map. Not flagaloud (listening, answers from the text) or flagtale (ordering with time words). */
(()=>{
const KIND=['Characters','Setting','Events'],KC=['#7c3aed','#0f766e','#c2410c'];
const SORT=[['👧','Goldilocks',0],['🌲','the woods',1],['🥣','She eats the porridge',2],['🐻','Baby Bear',0],['☀️','one morning',1],['🏃','She runs home',2]];
const SMISS={0:'is someone who acts in the story, so it is a character.',1:'tells where or when the story happens, so it is part of the setting.',2:'is something that happens, so it is an event.'};
const CAST=[['🍪','the Gingerbread Man',1],['🔥','the oven',0,'The oven is a thing in the story. It does not talk, think or act, so it is not a character.'],['👵','the old woman',1],['🌊','the river',0,'The river is where part of the story happens. That makes it part of the setting, not a character.'],['🐄','the cow',1],['🦊','the fox',1]];
const CLUE=[[['Long ago,','wn'],['a girl','c'],['lived','e'],['in a cottage by the woods.','wh']],[['One night,','wn'],['the Gingerbread Man','c'],['ran','e'],['to the river.','wh']],[['Three pigs','c'],['built houses','e'],['on a hill','wh'],['one sunny morning.','wn']]];
const CMISS={c:'is a character, not the setting. The setting tells where and when.',e:'is something that happens, an event. The setting tells where and when.'};
const PIGS=[['🌾','The wolf blows down the straw house',1],['🎩','The first pig wears a hat',0],['🪵','The wolf blows down the stick house',1],['☀️','It is a sunny day',0],['🧱','The wolf cannot blow down the brick house',1],['👂','The wolf has big ears',0]];
const SLOT=['Characters','Setting','Big problem','Ending'];
const MAPC=[['👴','Grandpa, Grandma, a dog, a cat, a mouse',0],['🏙️','a busy city',-1,'The story happens in Grandpa\'s garden, not a city.'],['🌱','Grandpa\'s garden',1],
 ['🐉','a dragon',-1,'There is no dragon in this story. A map only holds what is in it.'],['💪','The giant turnip will not come up',2],['🎉','They all pull together, and out it pops',3]];
VIS.reg('flagsmap',c=>{let A,pad,quiz,qn=-1,tick=0;const W={};c.fig.classList.add('young');
const F=(n,w)=>`${w||800} ${n}px system-ui,sans-serif`,INK='#0f172a',GOOD='#047857',BAD='#b91c1c',EDGE='#64748b',SEL='#6d28d9';
const rr=(x,y,w,h,r)=>A.paint.rrect(x,y,w,h,r),mid=g=>{g.textAlign='center';g.textBaseline='middle'},now=()=>['sort','cast','clue','key','map','chal'][A.step];
const sz=n=>A.narrow?n:Math.round(n*1.2);
function paper(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#ede9fe',A.col.dark?.07:.5);g.fillRect(0,0,A.W,A.H)}
function tag(t,x,y,o){o=o||{};const g=A.ctx;let n=sz(o.n||14);g.font=F(n);let w=g.measureText(t).width+22;
 while(w>A.W-10&&n>10){n--;g.font=F(n);w=g.measureText(t).width+22}const h=n+16,l=Math.max(5,Math.min(A.W-w-5,x-w/2));
 g.fillStyle='#ffffff';rr(l,y-h/2,w,h,12);g.fill();g.lineWidth=o.ok||o.bad?3:1.5;g.strokeStyle=o.ok?GOOD:o.bad?BAD:EDGE;g.stroke();g.fillStyle=INK;mid(g);g.fillText(t,l+w/2,y+1)}
function lines(t,max,n){const g=A.ctx;g.font=F(n);const out=[];let cur='';t.split(' ').forEach(w=>{const tr=cur?cur+' '+w:w;if(g.measureText(tr).width>max&&cur){out.push(cur);cur=w}else cur=tr});out.push(cur);return out}
function tile(r,e,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.dim?'#e2e8f0':'#ffffff';rr(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=o.ok||o.bad||o.sel?4:1.5;g.strokeStyle=o.ok?GOOD:o.bad?BAD:o.sel?SEL:(o.col||EDGE);g.stroke();
 const em=Math.min(r.h*.36,r.w*.3,40);g.font=F(Math.round(em),400);mid(g);g.fillStyle='#000';g.fillText(e,r.x+r.w/2,r.y+em*.75);
 let n=sz(13),L=lines(t,r.w-10,n);while((L.length>3||L.length*(n+3)>r.h-em*1.5)&&n>9){n--;L=lines(t,r.w-10,n)}g.fillStyle=INK;g.font=F(n);
 const y0=r.y+em*1.5+(r.h-em*1.5-L.length*(n+3))/2+n/2;L.forEach((s,i)=>g.fillText(s,r.x+r.w/2,y0+i*(n+3)))}
function cells(n,cols,y0,y1){const gap=8,rows=Math.ceil(n/cols),w=(A.W-gap*(cols+1))/cols,h=Math.min(130,(y1-y0-gap*(rows-1))/rows);return [...Array(n)].map((_,i)=>({i,x:gap+(i%cols)*(w+gap),y:y0+Math.floor(i/cols)*(h+gap),w,h}))}
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* 1. sort into three baskets */
const sortTiles=()=>cells(6,3,A.H*.1,A.H*.56);
const baskets=()=>cells(3,3,A.H*.64,A.H*.97).map(r=>({...r,h:A.H*.33}));
function drawSort(){const g=A.ctx,s=W.s;paper();tag(`Goldilocks and the Three Bears: ${s.put.filter(v=>v!=null).length} of 6 sorted`,A.W/2,A.H*.05,{n:12,ok:s.done});
 baskets().forEach(b=>{g.fillStyle=A.alpha(KC[b.i],A.col.dark?.35:.14);rr(b.x,b.y,b.w,b.h,14);g.fill();g.strokeStyle=KC[b.i];g.lineWidth=3;g.stroke();
  g.fillStyle=A.col.dark?'#ffffff':INK;g.font=F(sz(13));g.textAlign='center';g.textBaseline='top';g.fillText(KIND[b.i],b.x+b.w/2,b.y+6,b.w-6);
  const inn=SORT.map((v,i)=>i).filter(i=>s.put[i]===b.i);g.font=F(sz(20),400);g.textBaseline='middle';inn.forEach((i,j)=>g.fillText(SORT[i][0],b.x+b.w/2+(j-(inn.length-1)/2)*sz(28),b.y+b.h*.62))});
 sortTiles().forEach(r=>{if(s.put[r.i]!=null||(W.drag&&W.drag.i===r.i))return;const v=SORT[r.i];tile(r,v[0],v[1],{sel:s.sel===r.i,bad:s.bad===r.i})});
 if(W.drag){const d=W.drag,r=sortTiles()[d.i],v=SORT[d.i];tile({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},v[0],v[1],{sel:1})}}
function choose(i){const s=W.s;if(s.put[i]!=null)return;s.sel=i;A.sound.tick();talk(`"${SORT[i][1]}" picked. Now tap the box it belongs in.`)}
function drop(i,b){const s=W.s;if(i==null)i=s.sel;if(i==null||i<0)return talk('Tap a card first, then a box.');if(s.put[i]!=null)return;const v=SORT[i];
 if(v[2]!==b){s.bad=i;s.sel=-1;A.sound.miss();return talk(`Not ${KIND[b]}. "${v[1]}" ${SMISS[v[2]]}`+(i===4?' A setting is when, as well as where.':''))}
 s.put[i]=b;s.sel=-1;s.bad=-1;A.sound.pop();if(s.put.every(v=>v!=null))s.done=1;talk(`Yes: "${v[1]}" ${SMISS[b]}`+(s.done?' Characters are who, the setting is where and when, events are what happens.':''))}
/* 2. who is a character? */
const castTiles=()=>cells(6,3,A.H*.14,A.H*.92);
function drawCast(){const s=W.k;paper();tag(`The Gingerbread Man: ${s.got.length} of 4 characters`,A.W/2,A.H*.06,{n:13,ok:s.got.length>=4});
 castTiles().forEach(r=>{const v=CAST[r.i];tile(r,v[0],v[1],{ok:s.got.includes(r.i),bad:s.bad===r.i})})}
function cast(i){const s=W.k,v=CAST[i];if(s.got.includes(i)||s.got.length>=4)return;
 if(!v[2]){s.bad=i;A.sound.miss();return talk(v[3])}
 s.got.push(i);s.bad=-1;A.sound.pop();talk(`Yes, ${v[1]} is a character: ${i===0?'a biscuit, but he talks and runs':'it acts in the story'}.`+(s.got.length>=4?' A character can be a person, an animal or even a biscuit, if it talks, thinks or acts.':''))}
/* 3. setting clues */
function clueRects(){const g=A.ctx,n=sz(A.narrow?14:17),out=[];g.font=F(n);const parts=CLUE[Math.min(W.c.k,2)];let x=8,y=A.H*.3;
 parts.forEach(([t],j)=>{const w=g.measureText(t).width+20;if(x+w>A.W-8){x=8;y+=n+26}out.push({j,t,x,y,w,h:n+16,n});x+=w+8});return out}
function drawClue(){const s=W.c,g=A.ctx;paper();tag(s.k>=3?'All setting clues found':`Story ${s.k+1} of 3: tap the where and when clues`,A.W/2,A.H*.07,{n:13,ok:s.k>=3});
 if(s.k<3)clueRects().forEach(r=>{const f=s.found.includes(r.j),bad=s.bad===r.j,ty=CLUE[s.k][r.j][1];g.fillStyle=f?(ty==='wh'?'#ccfbf1':'#fef3c7'):'#ffffff';rr(r.x,r.y,r.w,r.h,10);g.fill();
  g.lineWidth=f||bad?3:1.5;g.strokeStyle=f?GOOD:bad?BAD:EDGE;g.stroke();g.fillStyle=INK;g.font=F(r.n);mid(g);g.fillText(r.t,r.x+r.w/2,r.y+r.h/2+1)});
 const done=s.k>=3?CLUE:CLUE.slice(0,s.k),cur=s.k<3?CLUE[s.k].filter((v,j)=>s.found.includes(j)):[],all=done.flat().concat(cur);
 [['wh','Where'],['wn','When']].forEach(([ty,nm],i)=>{const x=8+i*(A.W/2),w=A.W/2-16,y=A.H*.66,h=A.H*.3;g.fillStyle='#ffffff';rr(x,y,w,h,12);g.fill();g.strokeStyle=ty==='wh'?'#0f766e':'#b45309';g.lineWidth=3;g.stroke();
  g.fillStyle=INK;g.font=F(sz(13));g.textAlign='center';g.textBaseline='top';g.fillText(nm,x+w/2,y+6);g.font=F(sz(11),700);
  all.filter(v=>v[1]===ty).forEach((v,j)=>g.fillText(v[0].replace(/[.,]$/,''),x+w/2,y+sz(28)+j*sz(17),w-8))})}
function clue(j){const s=W.c;if(s.k>=3||s.found.includes(j))return;const [t,ty]=CLUE[s.k][j];
 if(ty==='c'||ty==='e'){s.bad=j;A.sound.miss();return talk(`"${t}" ${CMISS[ty]}`)}
 s.found.push(j);s.bad=-1;A.sound.pop();const two=s.found.length>=2;let msg=`"${t.replace(/[.,]$/,'')}" tells ${ty==='wh'?'where':'when'} the story happens.`;
 if(two){s.k++;s.found=[];msg+=s.k>=3?' All 3 settings found: each one has a where and a when.':' Both clues found. Next story.'}talk(msg)}
/* 4. key events or small details */
const pigTiles=()=>cells(6,A.narrow?2:3,A.H*.1,A.H*.62);
function slotR(k){const w=(A.W-32)/3;return{x:8+k*(w+8),y:A.H*.7,w,h:A.H*.27}}
function drawKey(){const s=W.p;paper();tag(`The Three Little Pigs: ${s.keep.length} of 3 key events`,A.W/2,A.H*.05,{n:13,ok:s.keep.length>=3});
 pigTiles().forEach(r=>{if(s.keep.includes(r.i))return;const v=PIGS[r.i];tile(r,v[0],v[1],{bad:s.bad===r.i,dim:s.out.includes(r.i)})});
 for(let k=0;k<3;k++){const r=slotR(k),i=s.keep[k],g=A.ctx;if(i!=null)tile(r,PIGS[i][0],PIGS[i][1],{ok:1});else{g.setLineDash([6,5]);g.strokeStyle=A.col.dark?'#e2e8f0':'#475569';g.lineWidth=2;rr(r.x,r.y,r.w,r.h,12);g.stroke();g.setLineDash([]);
  g.fillStyle=A.col.tx;g.font=F(sz(11),700);mid(g);g.fillText('Key event '+(k+1),r.x+r.w/2,r.y+r.h/2)}}}
function keep(i){const s=W.p,v=PIGS[i];if(s.keep.includes(i)||s.keep.length>=3)return;
 if(!v[2]){s.bad=i;if(!s.out.includes(i))s.out.push(i);A.sound.miss();return talk(`"${v[1]}" is a small detail. Take it out and the story still works. Keep the big things that happen.`)}
 s.keep.push(i);s.bad=-1;A.sound.pop();talk(`Key event: ${v[1].toLowerCase()}.`+(s.keep.length>=3?' Retell it: the wolf blew down the straw house and the stick house, but not the brick house.':` ${s.keep.length} of 3.`))}
/* 5. story map */
const mapTiles=()=>cells(6,A.narrow?2:3,A.H*.06,A.H*.54);
const mapSlots=()=>cells(4,2,A.H*.6,A.H*.98);
function drawMap(){const s=W.m,g=A.ctx;paper();
 mapSlots().forEach(r=>{const i=s.slot[r.i];if(i!=null){tile(r,MAPC[i][0],MAPC[i][1],{ok:1});g.fillStyle=GOOD}else{g.fillStyle=A.alpha(KC[r.i%3],A.col.dark?.3:.12);rr(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=KC[r.i%3];g.lineWidth=2.5;g.stroke();g.fillStyle=A.col.dark?'#ffffff':INK}
  g.font=F(sz(12));g.textAlign='left';g.textBaseline='top';if(i==null)g.fillText(SLOT[r.i],r.x+8,r.y+6)});
 mapTiles().forEach(r=>{if(s.slot.includes(r.i)||(W.drag&&W.drag.i===r.i))return;const v=MAPC[r.i];tile(r,v[0],v[1],{sel:s.sel===r.i,bad:s.bad===r.i,dim:s.out.includes(r.i)})});
 if(W.drag){const d=W.drag,r=mapTiles()[d.i],v=MAPC[d.i];tile({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},v[0],v[1],{sel:1})}}
function lift(i){const s=W.m;if(s.slot.includes(i))return;s.sel=i;A.sound.tick();talk(`"${MAPC[i][1]}" picked. Now tap its place on the story map.`)}
function place(i,k){const s=W.m;if(i==null)i=s.sel;if(i==null||i<0)return talk('Tap a card first, then a place.');if(s.slot[k]!=null)return talk('That part is full.');if(s.slot.includes(i))return;const v=MAPC[i];
 if(v[2]<0){s.bad=i;s.sel=-1;if(!s.out.includes(i))s.out.push(i);A.sound.miss();return talk(v[3])}
 if(v[2]!==k){s.bad=i;s.sel=-1;A.sound.miss();return talk(`"${v[1]}" is not the ${SLOT[k].toLowerCase()}. It goes in ${SLOT[v[2]]}.`)}
 s.slot[k]=i;s.sel=-1;s.bad=-1;A.sound.pop();if(s.slot.every(v=>v!=null))s.done=1;talk(`${SLOT[k]}: ${v[1]}.`+(s.done?' The story map is full: who, where, the big problem and how it ends.':''))}
function draw(){const k=now();if(k==='chal'){paper();tag('Challenge',A.W/2,A.H*.16,{ok:1});tag('Who, where and when, what happens',A.W/2,A.H*.5,{n:15});return}
 ({sort:drawSort,cast:drawCast,clue:drawClue,key:drawKey,map:drawMap})[k]();A.fx.draw(A.ctx)}
function down(p){const k=now();
 if(k==='sort'){const r=sortTiles().find(r=>hit(p,r)&&W.s.put[r.i]==null);if(r){W.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}const b=baskets().find(r=>hit(p,r));if(b)drop(null,b.i);return false}
 if(k==='map'){const r=mapTiles().find(r=>hit(p,r)&&!W.m.slot.includes(r.i));if(r){W.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}const b=mapSlots().find(r=>hit(p,r));if(b)place(null,b.i);return false}
 if(k==='cast'){const r=castTiles().find(r=>hit(p,r));if(r)cast(r.i);return false}
 if(k==='clue'&&W.c.k<3){const r=clueRects().find(r=>hit(p,r));if(r)clue(r.j);return false}
 if(k==='key'){const r=pigTiles().find(r=>hit(p,r));if(r)keep(r.i)}return false}
function move(p){if(!W.drag)return;W.drag.x=p.x;W.drag.y=p.y;A.redraw()}
function up(p){const d=W.drag;if(!d)return;W.drag=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10,k=now();
 if(k==='sort'){if(tap)return choose(d.i);const b=baskets().find(r=>hit(p,r));if(b)drop(d.i,b.i);else A.redraw();return}
 if(k==='map'){if(tap)return lift(d.i);const b=mapSlots().find(r=>hit(p,r));if(b)place(d.i,b.i);else A.redraw()}}
function reset(){tick++;for(const k in W)delete W[k];Object.assign(W,{s:{put:Array(6).fill(null),sel:-1,bad:-1,done:0},k:{got:[],bad:-1},c:{k:0,found:[],bad:-1},p:{keep:[],out:[],bad:-1},m:{slot:[null,null,null,null],sel:-1,bad:-1,out:[],done:0},drag:null,ping:()=>{}})}
function talk(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();W.ping()}
const gate=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,desc,ok,msg){reset();talk(desc);W.ping=gate(i,ok,msg)}
function demo(i,acts,ms){steps[i].go();const t0=tick;acts.forEach((f,j)=>setTimeout(()=>{if(t0===tick)f()},ms*(j+1)))}
function keys(){if(!pad)return;pad.innerHTML='';const k=now(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='sort'&&!W.s.done){const i=W.s.sel;if(i<0)SORT.forEach((v,j)=>{if(W.s.put[j]==null)B(`${v[0]} ${v[1]}`,()=>choose(j))});else KIND.forEach((n,b)=>B(`${SORT[i][1]} → ${n}`,()=>drop(i,b),`Put ${SORT[i][1]} in ${n}`))}
 if(k==='cast'&&W.k.got.length<4)CAST.forEach((v,i)=>{if(!W.k.got.includes(i))B(`${v[0]} ${v[1]}`,()=>cast(i))});
 if(k==='clue'&&W.c.k<3)CLUE[W.c.k].forEach(([t],j)=>{if(!W.c.found.includes(j))B(t,()=>clue(j))});
 if(k==='key'&&W.p.keep.length<3)PIGS.forEach((v,i)=>{if(!W.p.keep.includes(i))B(`${v[0]} ${v[1]}`,()=>keep(i),`Keep "${v[1]}" as a key event`)});
 if(k==='map'&&!W.m.done){const i=W.m.sel;if(i<0)MAPC.forEach((v,j)=>{if(!W.m.slot.includes(j))B(`${v[0]} ${v[1]}`,()=>lift(j))});else SLOT.forEach((n,b)=>{if(W.m.slot[b]==null)B(`→ ${n}`,()=>place(i,b),`Put ${MAPC[i][1]} in ${n}`)})}}
const steps=[
{h:'Who, where, what happens',p:'Goldilocks and the Three Bears. Drag each card into its box, or tap a card and then a box.',task:'Sort all 6 cards',
 show:()=>demo(0,SORT.map((v,i)=>()=>drop(i,v[2])),600),
 go:()=>enter(0,'Six story cards and three boxes: Characters, Setting and Events.',()=>W.s.done,'Goldilocks and Baby Bear are characters, the woods and one morning are the setting, and the rest are events.')},
{h:'Who is a character?',p:'The Gingerbread Man. Tap everyone who is a character in the story.',
 predict:{q:'The Gingerbread Man is a biscuit. Can he be a character?',opts:['No, characters are people','Yes, he talks and runs, so he is a character'],ans:1},task:'Find all 4 characters',
 show:()=>demo(1,[0,2,4,5].map(i=>()=>cast(i)),600),
 go:()=>enter(1,'Six pictures from The Gingerbread Man.',()=>W.k.got.length>=4,'Four characters: they all act. The oven is a thing and the river is part of the setting.')},
{h:'Where and when',p:'Read each story start. Tap the words that tell where the story happens, and when.',
 predict:{q:'"One night" is at the start of a story. What does it tell you?',opts:['What happens','When the story happens'],ans:1},task:'Find the where and when in all 3 stories',
 show:()=>demo(2,[()=>clue(0),()=>clue(3),()=>clue(0),()=>clue(3),()=>clue(2),()=>clue(3)],500),
 go:()=>enter(2,'A story start: Long ago, a girl lived in a cottage by the woods.',()=>W.c.k>=3,'The setting is where and when: a cottage, a river, a hill; long ago, one night, one sunny morning.')},
{h:'Key events',p:'The Three Little Pigs. To retell a story, keep the key events. Tap the 3 key events. Leave the small details.',
 predict:{q:'The wolf has big ears. Is that a key event?',opts:['Yes, it is in the story','No, the story works without it'],ans:1},task:'Keep the 3 key events',
 show:()=>demo(3,[0,2,4].map(i=>()=>keep(i)),650),
 go:()=>enter(3,'Six cards from The Three Little Pigs and three empty spaces.',()=>W.p.keep.length>=3,'Key events change the story. The hat, the sun and the ears are details you can leave out.')},
{h:'Story map',p:'Grandpa plants a turnip. It grows huge, and he cannot pull it up. Grandma, the dog, the cat and a mouse help. They all pull, and out it pops! Drag each card to the map.',task:'Fill all 4 parts of the story map',
 show:()=>demo(4,[[0,0],[2,1],[4,2],[5,3]].map(([i,k])=>()=>place(i,k)),650),
 go:()=>enter(4,'Six cards and a story map: Characters, Setting, Big problem and Ending.',()=>W.m.done,'Who, where, the big problem and how it ends: the whole story on one map.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W.ping()});
const QS=[
 {q:'Which is part of the setting?',a:'Once upon a time, at night',o:[['The wolf','place'],['The wolf blows the house down','swap']]},
 {q:'In The Gingerbread Man, who is a character?',a:'The fox',o:[['The oven','thing'],['The river','place']]},
 {q:'Which is a key event in The Three Little Pigs?',a:'The wolf cannot blow the brick house down',o:[['The first pig has a hat','detail'],['It is a sunny day','detail']]},
 {q:'"Goldilocks eats the porridge" is…',a:'an event',o:[['the setting','swap'],['a character','swap']]},
 {q:'Who is the main character in Goldilocks and the Three Bears?',a:'Goldilocks',o:[['The porridge','thing'],['The woods','place']]},
 {q:'When you retell a story, you tell…',a:'who, where and the key events',o:[['every small detail','detail'],['only how it ends','short']]}];
function why(t){let m='Characters are who, the setting is where and when, and events are what happens.';
 if(t==='place')m='The setting is where and when the story happens: a place or a time, not a who.';
 if(t==='thing')m='A thing that does not talk, think or act is not a character. Characters can be people, animals or even a biscuit.';
 if(t==='detail')m='That is a small detail. A key event changes what happens next. Leave details out when you retell.';
 if(t==='swap')m='Something that happens is an event. Who did it is a character, and where or when is the setting.';
 if(t==='short')m='Just the ending leaves out most of the story. Tell who, where, and the key events in order.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
 init:B=>{A=B;const wrap=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Story element buttons'},wrap);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});keys()}}).start()})})();
