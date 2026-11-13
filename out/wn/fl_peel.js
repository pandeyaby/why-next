/* Flagship – word parts as clues (ages 5–8; Common Core L.K.4b, L.1.4b/c; NC England Year 1 -s, -ed, -er and un-).
   -ed says it already happened, un- says not or undo, -s says more than one (unless s is part of the root, as in bus),
   -er names the person on a doing word and means more on a describing word. Then build a word from a meaning clue. */
(()=>{
/* step 1: [word, 1 = already happened (-ed), 0 = happens now] */
const TIME=[['jumped',1],['kicks',0],['helped',1],['plays',0],['rested',1],['looks',0],['packed',1],['waves',0]];
const TIMEB=['It happens now','It already happened'];
/* step 2: [un- word, right meaning, tempting wrong meaning, why the wrong one is wrong] */
const FLIP=[['unhappy','not happy','very happy','un does not mean very. un flips the word: not happy.'],
 ['unlock','open the lock','lock it again','un does not mean again. It undoes the job: the lock opens.'],
 ['unkind','not kind','very kind','un does not make it more. It flips it: not kind.'],
 ['untie','undo the knot','tie it tight','un undoes tie. The knot comes out.'],
 ['unsafe','not safe','very safe','un flips safe into its opposite: not safe.']];
/* step 3: [word, picture, 1 = more than one] */
const MANY=[['balls','ball',1],['hat','hat',0],['cups','cup',1],['bus','bus',0],['bugs','bug',1],['dress','dress',0]];
/* step 4: [word, root, 0 = person who does it, 1 = more; the doing-word form for the feedback] */
const ERW=[['painter','paint',0,'paints'],['taller','tall',1],['farmer','farm',0,'farms'],['faster','fast',1],['singer','sing',0,'sings'],['softer','soft',1],['teacher','teach',0,'teaches'],['longer','long',1]];
const ERB=['A person who does it','More'];
/* step 5: [clue, root, front, end] */
const MAKE=[['It already happened: we took the things out of the bag.','pack','un','ed'],['There are three of them on the table.','cup','','s'],
 ['A person who reads a lot of books.','read','','er'],['Not fair.','fair','un',''],['Yesterday we ___ in the park. It already happened.','play','','ed']];
const BITS=['un','ed','s','er'];
VIS.reg('flagpeel',c=>{let A,K,row,quiz,qq=-1,gen=0,grab=null;const P={};
const INK='#1e1b4b',CARD='#ffffff',EDGE='#6b7280',GOOD='#166534',OOPS='#9f1239',GRAB='#1e40af',TILE='#fce7f3',TILEINK='#831843';
const ROOM=['#e0f2fe','#fef9c3'];
const sz=n=>Math.round(n*(A.narrow?1:1.1)),fnt=(n,w)=>`${w||800} ${sz(n)}px system-ui,sans-serif`;
const ORDER=['time','flip','many','er','make','quiz'],key=()=>ORDER[A.step],DATA={time:TIME,flip:FLIP,many:MANY,er:ERW,make:MAKE},over=k=>P[k].n>=DATA[k].length;
const inside=(p,r,m=0)=>!!r&&p.x>=r.x-m&&p.x<=r.x+r.w+m&&p.y>=r.y-m&&p.y<=r.y+r.h+m;
function paper(){K.fillStyle=A.col.dark?'#111827':'#f0f9ff';K.fillRect(0,0,A.W,A.H)}
function word(t,x,y,n,w,col){K.fillStyle=col||INK;K.font=fnt(n,w);K.textAlign='center';K.textBaseline='middle';K.fillText(t,x,y,A.W-14)}
function card(r,t,o){o=o||{};K.fillStyle=o.bg||CARD;A.paint.rrect(r.x,r.y,r.w,r.h,o.rr||14);K.fill();K.lineWidth=o.edge?4:2;K.strokeStyle=o.edge||EDGE;if(o.dash)K.setLineDash([6,5]);K.stroke();K.setLineDash([]);
 if(t!=null)word(t,r.x+r.w/2,r.y+r.h/2+1,o.n||26,o.w,o.ink)}
function banner(t,won){K.font=fnt(15);const w=Math.min(A.W-10,K.measureText(t).width+30),h=sz(15)+16,y=A.H*.025;card({x:A.W/2-w/2,y,w,h},null,{bg:won?'#dcfce7':CARD,edge:won?GOOD:null,rr:h/2});word(t,A.W/2,y+h/2+1,15)}
function lines(t,y,n){K.fillStyle=A.col.tx;K.font=fnt(n||16,700);K.textAlign='center';K.textBaseline='middle';const out=[''];
 t.split(' ').forEach(w=>{const s=out[out.length-1]?out[out.length-1]+' '+w:w;if(K.measureText(s).width>A.W-30)out.push(w);else out[out.length-1]=s});out.forEach((r,k)=>K.fillText(r,A.W/2,y+k*sz((n||16)+6)))}
/* ---- two rooms to sort into (steps 1 and 4) ---- */
function rooms(){const g=10,w=(A.W-3*g)/2;return[0,1].map(j=>({j,x:g+j*(w+g),y:A.H*.45,w,h:A.H*.52}))}
const pile=()=>{const w=Math.min(A.W-80,sz(170));return{x:A.W/2-w/2,y:A.H*.17,w,h:sz(58)}};
function drawRooms(k,names){const s=P[k],L=DATA[k];paper();banner(over(k)?`All ${L.length} sorted`:`Word ${s.n+1} of ${L.length}: which side?`,over(k));
 rooms().forEach(b=>{card(b,null,{bg:ROOM[b.j],edge:s.bad===b.j?OOPS:'#0369a1'});K.fillStyle=INK;K.font=fnt(15);K.textAlign='center';K.textBaseline='top';
  const tl=[''];names[b.j].split(' ').forEach(u=>{const v=tl[tl.length-1]?tl[tl.length-1]+' '+u:u;if(K.measureText(v).width>b.w-12)tl.push(u);else tl[tl.length-1]=v});tl.forEach((t,m)=>K.fillText(t,b.x+b.w/2,b.y+8+m*sz(18),b.w-8));
  K.font=fnt(17,700);L.slice(0,s.n).filter(x=>x[k==='er'?2:1]===b.j).forEach((x,m)=>K.fillText(x[0],b.x+b.w/2,b.y+sz(16+18*tl.length)+m*sz(23),b.w-8))});
 if(!over(k)){const r=pile();card(grab?{...r,x:grab.x-r.w/2,y:grab.y-r.h/2}:r,L[s.n][0],{edge:grab?GRAB:null,n:30})}}
function place(k,j){const s=P[k];if(over(k))return;const it=DATA[k][s.n],right=k==='er'?it[2]:it[1];
 if(j!==right){s.bad=j;A.sound.miss();return speak(k==='er'?erWhy(it):timeWhy(it))}
 s.n++;s.bad=null;A.sound.pop();speak(`${it[0]}: ${(k==='er'?ERB:TIMEB)[right].toLowerCase()}.`+(over(k)?' All sorted.':''))}
function timeWhy([w,past]){return past?`${w} ends in ed. The ed is the clue: it already happened.`:`${w} has no ed at the end. It is not over yet: it happens now.`}
function erWhy([w,root,j,does]){return j?`${root} is a describing word. Add er and it means more ${root}: ${w}.`:`You can ${root}. A ${w} is a person who ${does}. It does not mean more ${root}.`}
/* ---- step 2: un- meanings ---- */
const flipSide=i=>i%2?[FLIP[i][2],FLIP[i][1]]:[FLIP[i][1],FLIP[i][2]];
function flipCards(){const w=Math.min(sz(170),(A.W-36)/2);return[0,1].map(j=>({j,x:A.W/2+(j?8:-w-8),y:A.H*.56,w,h:sz(66)}))}
function drawFlip(){const s=P.flip;paper();if(over('flip')){banner('All 5 un words read',1);FLIP.forEach((f,m)=>word(`${f[0]} = ${f[1]}`,A.W/2,A.H*(.22+m*.15),20,800,A.col.tx));return}
 const f=FLIP[s.n];banner(`Word ${s.n+1} of 5: what does it mean?`);card({x:A.W/2-sz(95),y:A.H*.2,w:sz(190),h:sz(64)},null,{n:30});
 K.font=fnt(30);const wa=K.measureText('un').width,wb=K.measureText(f[0].slice(2)).width,x0=A.W/2-(wa+wb)/2;K.textAlign='left';K.textBaseline='middle';
 K.fillStyle='#be185d';K.fillText('un',x0,A.H*.2+sz(33));K.fillStyle=INK;K.fillText(f[0].slice(2),x0+wa,A.H*.2+sz(33));
 flipSide(s.n).forEach((v,j)=>card(flipCards()[j],v,{n:20,edge:s.bad===v?OOPS:null,bg:s.bad===v?'#ffe4e6':CARD}))}
function pickFlip(v){const s=P.flip;if(over('flip'))return;const f=FLIP[s.n];if(v!==f[1]){s.bad=v;A.sound.miss();return speak(f[3])}
 s.n++;s.bad=null;A.sound.pop();speak(`${f[0]} means ${f[1]}.`+(over('flip')?' All 5 done.':''))}
/* ---- step 3: one or more than one ---- */
function icon(kind,x,y,u){K.save();K.lineWidth=2;K.strokeStyle='#1f2937';
 if(kind==='ball'){K.fillStyle='#f97316';K.beginPath();K.arc(x,y,u,0,7);K.fill();K.stroke()}
 if(kind==='hat'){K.fillStyle='#7c3aed';K.fillRect(x-u*.6,y-u,u*1.2,u*1.3);K.strokeRect(x-u*.6,y-u,u*1.2,u*1.3);K.fillRect(x-u,y+u*.3,u*2,u*.35);K.strokeRect(x-u,y+u*.3,u*2,u*.35)}
 if(kind==='cup'){K.fillStyle='#0ea5e9';K.beginPath();K.moveTo(x-u*.8,y-u*.8);K.lineTo(x+u*.6,y-u*.8);K.lineTo(x+u*.4,y+u*.8);K.lineTo(x-u*.6,y+u*.8);K.closePath();K.fill();K.stroke();K.beginPath();K.arc(x+u*.65,y-u*.1,u*.35,-1.4,1.4);K.stroke()}
 if(kind==='bus'){K.fillStyle='#facc15';A.paint.rrect(x-u*1.3,y-u*.8,u*2.6,u*1.4,u*.25);K.fill();K.stroke();K.fillStyle='#e0f2fe';for(let i=0;i<3;i++)K.fillRect(x-u*1.1+i*u*.8,y-u*.6,u*.6,u*.5);K.fillStyle='#1f2937';[-.7,.7].forEach(d=>{K.beginPath();K.arc(x+d*u,y+u*.65,u*.25,0,7);K.fill()})}
 if(kind==='bug'){K.fillStyle='#dc2626';K.beginPath();K.ellipse(x,y,u*.9,u*.7,0,0,7);K.fill();K.stroke();K.fillStyle='#1f2937';[[-.3,-.2],[.3,.1],[-.1,.35]].forEach(([a,b])=>{K.beginPath();K.arc(x+a*u,y+b*u,u*.13,0,7);K.fill()})}
 if(kind==='dress'){K.fillStyle='#ec4899';K.beginPath();K.moveTo(x-u*.35,y-u);K.lineTo(x+u*.35,y-u);K.lineTo(x+u*.9,y+u);K.lineTo(x-u*.9,y+u);K.closePath();K.fill();K.stroke()}
 K.restore()}
function panes(){const w=(A.W-30)/2;return[0,1].map(j=>({j,x:10+j*(w+10),y:A.H*.38,w,h:A.H*.5}))}
function drawMany(){const s=P.many;paper();if(over('many')){banner('All 6 words matched',1);MANY.forEach((m,i)=>word(`${m[0]}: ${m[2]?'more than one':'one'}`,A.W/2,A.H*(.19+i*.13),19,800,A.col.tx));return}
 const [w,kind]=MANY[s.n];banner(`Word ${s.n+1} of 6: tap the picture`);card({x:A.W/2-sz(80),y:A.H*.15,w:sz(160),h:sz(56)},w,{n:30});
 panes().forEach(b=>{card(b,null,{bg:s.bad===b.j?'#ffe4e6':CARD,edge:s.bad===b.j?OOPS:null});const u=Math.min(b.w,b.h)*.13,n=b.j?3:1;
  for(let i=0;i<n;i++)icon(kind,b.x+b.w*(n===1?.5:.22+i*.28),b.y+b.h*(n===1?.45:i===1?.35:.55),u);word(b.j?'3':'1',b.x+b.w/2,b.y+b.h-sz(16),16,800)})}
function pickMany(j){const s=P.many;if(over('many'))return;const [w,,more]=MANY[s.n];
 if(j!==more){s.bad=j;A.sound.miss();return speak(more?`${w} ends in s. The s tells you there is more than one.`:/s$/.test(w)?`${w} ends in s, but the s is part of the word. Take it off: ${w.slice(0,-1)} is not a word. Just one ${w}.`:`${w} has no s at the end, so there is just one.`)}
 s.n++;s.bad=null;A.sound.pop();speak(`${w}: ${more?'more than one':'one'}.`+(over('many')?' All 6 done.':''))}
/* ---- step 5: build the word from the clue ---- */
function slots(){const w=Math.min(sz(84),(A.W-40)/3.4),h=sz(64),root=Math.min(sz(120),(A.W-40)-2*w),tot=w*2+root+16,x=A.W/2-tot/2,y=A.H*.34;
 return{front:{x,y,w,h},root:{x:x+w+8,y,w:root,h},end:{x:x+w+root+16,y,w,h}}}
function bitTiles(){const n=BITS.length,g=10,w=Math.min(sz(70),(A.W-20-g*(n-1))/n),x0=A.W/2-(n*w+g*(n-1))/2;return BITS.map((t,j)=>({t,j,x:x0+j*(w+g),y:A.H-sz(56)-12,w,h:sz(56)}))}
function drawMake(){const s=P.make;paper();if(over('make')){banner('All 5 words built',1);MAKE.forEach((m,i)=>word(`${m[2]}${m[1]}${m[3]}`,A.W/2,A.H*(.22+i*.15),22,800,A.col.tx));return}
 const m=MAKE[s.n],S=slots();banner(`Clue ${s.n+1} of 5: build the word`);lines(m[0],A.H*.19,15);
 card(S.front,s.front||'front',{dash:!s.front,bg:s.front?TILE:'#f3f4f6',ink:s.front?TILEINK:'#4b5563',n:s.front?24:14});card(S.root,m[1],{n:26});card(S.end,s.end||'end',{dash:!s.end,bg:s.end?TILE:'#f3f4f6',ink:s.end?TILEINK:'#4b5563',n:s.end?24:14});
 const ck=checkBox();card(ck,'Check',{bg:'#fef9c3',n:18});
 bitTiles().forEach(b=>{const d=grab&&grab.j===b.j;card(d?{...b,x:grab.x-b.w/2,y:grab.y-b.h/2}:b,b.t,{bg:TILE,ink:TILEINK,edge:d?GRAB:TILEINK,n:24})})}
const checkBox=()=>{const S=slots();return{x:A.W/2-sz(60),y:(S.root.y+S.root.h+A.H-sz(56)-12)/2-sz(22),w:sz(120),h:sz(44)}};
function drop(t,side){const s=P.make;if(over('make'))return;if(t==='un'&&side==='end'){A.sound.miss();return speak('un is a front part. It goes before the root.')}
 if(t!=='un'&&side==='front'){A.sound.miss();return speak(`${t} is an ending. It goes after the root.`)}
 s[side]=s[side]===t?'':t;A.sound.tick();speak(`${s.front||''}${MAKE[s.n][1]}${s.end||''}`)}
function judge(){const s=P.make;if(over('make'))return;const [clue,root,front,end]=MAKE[s.n],got=`${s.front||''}${root}${s.end||''}`,want=front+root+end;
 if(got===want){s.n++;s.front=s.end='';A.sound.pop();return speak(`${want}: ${front?'un at the front, ':''}${end?end+' at the end':'no ending'}.`+(over('make')?' All 5 built.':''))}
 A.sound.miss();let m;if(front&&!s.front)m='The clue says not or undo. That needs un at the front.';else if(!front&&s.front)m='Nothing in the clue says not or undo, so no un.';
 else if(end==='ed')m='The clue says it already happened. That needs ed at the end.';else if(end==='s')m='The clue says more than one. That needs s at the end.';
 else if(end==='er')m='The clue says a person who does it. That needs er at the end.';else m='Nothing in the clue needs an ending. Take the end part off.';speak(m)}
/* ---- draw and pointer ---- */
function draw(){const k=key();if(k==='quiz'){paper();banner('Challenge',1);word('jumped · unkind · cups · painter · taller',A.W/2,A.H*.5,17,800,A.col.tx);return}
 if(k==='time')drawRooms('time',TIMEB);else if(k==='er')drawRooms('er',ERB);else if(k==='flip')drawFlip();else if(k==='many')drawMany();else drawMake();A.fx.draw(K)}
function down(p){const k=key();if(k==='quiz'||over(k))return false;
 if(k==='time'||k==='er'){if(inside(p,pile())){grab={x:p.x,y:p.y};return true}const b=rooms().find(r=>inside(p,r));if(b)place(k,b.j);return false}
 if(k==='flip'){const b=flipCards().find(r=>inside(p,r));if(b)pickFlip(flipSide(P.flip.n)[b.j]);return false}
 if(k==='many'){const b=panes().find(r=>inside(p,r));if(b)pickMany(b.j);return false}
 const t=bitTiles().find(r=>inside(p,r));if(t){grab={j:t.j,x:p.x,y:p.y};return true}const S=slots();
 if(inside(p,S.front)&&P.make.front)drop(P.make.front,'front');else if(inside(p,S.end)&&P.make.end)drop(P.make.end,'end');else if(inside(p,checkBox()))judge();return false}
function move(p){if(grab){grab.x=p.x;grab.y=p.y;A.redraw()}}
function up(p){const g=grab;if(!g)return;grab=null;const k=key();
 if(k==='time'||k==='er'){const b=rooms().find(r=>inside(p,r));if(b)place(k,b.j);else A.redraw();return}
 const S=slots(),t=BITS[g.j];if(inside(p,S.front,16))drop(t,'front');else if(inside(p,S.end,16))drop(t,'end');else A.redraw()}
function fresh(){gen++;grab=null;for(const k in P)delete P[k];ORDER.slice(0,5).forEach(k=>P[k]={n:0});P.make.front=P.make.end='';P.after=()=>{}}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();P.after()}
function begin(i,first,ready,msg){fresh();speak(first);P.after=()=>{if(A.step===i&&ready()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function pads(){if(!row)return;row.innerHTML='';const k=key(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};if(k==='quiz'||over(k))return;
 if(k==='time'||k==='er'){const w=DATA[k][P[k].n][0];(k==='er'?ERB:TIMEB).forEach((h,j)=>b(h,()=>place(k,j),`${w}: ${h}`))}
 if(k==='flip')flipSide(P.flip.n).forEach(v=>b(v,()=>pickFlip(v),`${FLIP[P.flip.n][0]} means ${v}`));
 if(k==='many'){const w=MANY[P.many.n][0];b('One',()=>pickMany(0),`${w}: one`);b('More than one',()=>pickMany(1),`${w}: more than one`)}
 if(k==='make'){b('un at the front',()=>drop('un','front'));['ed','s','er'].forEach(t=>b(`${t} at the end`,()=>drop(t,'end')));b('Check',judge,'Check the word')}}
function buildDemo(){const a=[];MAKE.forEach(([, ,f,e])=>{if(f)a.push(()=>drop(f,'front'));if(e)a.push(()=>drop(e,'end'));a.push(()=>judge())});return a}
const steps=[
{h:'-ed: it already happened',p:'Look at the end of the word. ed at the end is a clue. It tells you it already happened.',
predict:{q:'Sam kicked the ball. Is he kicking it right now?',opts:['Yes, right now','No, it already happened'],ans:1},task:'Sort all 8 words',
show:()=>auto(0,TIME.map(x=>()=>place('time',x[1])),420),
go:()=>begin(0,'Word: jumped. Drag it to a side, or use the buttons.',()=>over('time'),'ed at the end means it already happened.')},
{h:'un- flips the word',p:'un at the front is a clue too. With a describing word it means not. With a doing word it undoes the job.',
predict:{q:'What does unhappy mean?',opts:['Very happy','Not happy'],ans:1},task:'Read all 5 un words',
show:()=>auto(1,FLIP.map(f=>()=>pickFlip(f[1])),600),
go:()=>begin(1,'unhappy. Tap what it means.',()=>over('flip'),'un means not, or undo.')},
{h:'-s: more than one',p:'s at the end of a thing word can mean more than one. But some words just end in s, like bus.',task:'Match all 6 words',
show:()=>auto(2,MANY.map(m=>()=>pickMany(m[2])),520),
go:()=>begin(2,'balls. Tap one, or more than one.',()=>over('many'),'s can mean more than one. Check the s is not part of the word.')},
{h:'-er has two jobs',p:'Look at the root. If you can do it, er means a person who does it: a painter paints. If it describes, er means more: taller.',
predict:{q:'Does er always mean more?',opts:['Yes, always','No, it can mean a person'],ans:1},task:'Sort all 8 er words',
show:()=>auto(3,ERW.map(x=>()=>place('er',x[2])),420),
go:()=>begin(3,'Word: painter. Is it a person, or more?',()=>over('er'),'Doing word + er = a person. Describing word + er = more.')},
{h:'Build from the clue',p:'Read the clue. Drag un to the front, or an ending to the end. Then tap Check.',task:'Build all 5 words',
show:()=>auto(4,buildDemo(),450),
go:()=>begin(4,'Clue: it already happened, we took the things out of the bag. Root: pack.',()=>over('make'),'Each part adds a clue: un-, -ed, -s, -er.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>P.after()});
const QS=[
{q:'What does unpainted mean?',a:'not painted',o:[['painted again','again'],['painted a lot','lots']]},
{q:'Sam rowed the boat. When did he row?',a:'It already happened',o:[['He is rowing now','now'],['He will row later','later']]},
{q:'What is a climber?',a:'a person who climbs',o:[['more climb','moreclimb'],['a thing you climb','thing']]},
{q:'Which word tells you there is more than one?',a:'pens',o:[['pen','nos'],['bus','partofword']]},
{q:'Which word means more soft?',a:'softer',o:[['unsoft','unmore'],['softs','smore']]},
{q:'The gift is unwrapped. What happened?',a:'The paper came off',o:[['It got more paper','unadd'],['It was never wrapped','unnever']]}];
function why(t){let m='Find the parts: the front, the root, the end. Each part is a clue.';
 switch(t){case 'again':m='un does not mean again. It means not: unpainted is not painted.';break;
 case 'lots':m='un does not mean a lot. It flips the word: not painted.';break;
 case 'now':m='rowed ends in ed. The ed tells you it already happened.';break;
 case 'later':m='ed does not mean later. It means it already happened.';break;
 case 'moreclimb':m='climb is a doing word. er on a doing word means a person who does it.';break;
 case 'thing':m='You climb a tree. A climber is the person who climbs.';break;
 case 'nos':m='pen has no s at the end, so there is just one pen.';break;
 case 'partofword':m='The s in bus is part of the word. Take it off and bu is not a word. One bus.';break;
 case 'unmore':m='un means not. unsoft is not even a word. er means more: softer.';break;
 case 'smore':m='s does not mean more of a feeling. With soft, er means more: softer.';break;
 case 'unadd':m='un undoes the job. The wrapping came off, not more paper.';break;
 case 'unnever':m='un undoes wrap. It was wrapped first, then the paper came off.';break}
 return m}
function ask(){qq++;const Q=QS[qq%QS.length],all=[[Q.a,'ok'],...Q.o],r=qq%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function score(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{quiz.hidden=B.step!==5;row.hidden=B.step===5;pads()},
 init:B=>{A=B;K=A.ctx;c.fig.classList.add('young');const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Word part buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});pads()}}).start()})})();
