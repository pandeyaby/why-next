/* Flagship – adjective order (ages 9–10; CCSS L.4.1d). Books disagree on age vs shape, so those two never meet here. */
(()=>{
const KIND=['opinion','size','age','shape','colour','origin','material','purpose'];
const ASK=['what someone thinks','how big','how old','what shape','what colour','where it is from','what it is made of','what it is for'];
const TINT=['#fde68a','#bfdbfe','#ddd6fe','#fbcfe8','#fecaca','#bbf7d0','#fed7aa','#cbd5e1'];
const NAME=[['lovely',0,'a lovely day'],['tiny',1,'a tiny ant'],['old',2,'an old coat'],['round',3,'a round table'],['red',4,'a red kite'],['French',5,'French bread'],['wooden',6,'a wooden spoon'],['sleeping',7,'a sleeping bag']];
const BUILD=[[['small',1],['red',4],'bag'],[['big',1],['wooden',6],'table'],[['beautiful',0],['old',2],'house'],[['tall',1],['grey',4],['stone',6],'castle'],[['delicious',0],['Italian',5],'pizza']];
const FIX=[[['wooden',6],['big',1],'table'],[['Spanish',5],['small',1],'guitar'],[['stone',6],['grey',4],['tall',1],'castle'],[['red',4],['lovely',0],'scarf']];
/* [word, 0 opinion / 1 fact, why] */
const OPF=[['lovely',0,'Lovely is what someone thinks. Another person might not agree.'],['tiny',1,'Tiny is a size. Anyone can check it.'],
 ['horrible',0,'Horrible is a feeling. People can disagree.'],['square',1,'Square is a shape. Anyone can check the sides.'],
 ['ugly',0,'Ugly is an opinion. Someone else might love it.'],['ancient',1,'Ancient is an age. You can find out how old.']];
const SIDE=['Opinion: what I think','Fact: anyone can check'];
const PURP=[['black','running','shoes'],['big','frying','pan'],['old','football','boots'],['green','sleeping','bag']];
const BANK=[['lovely',0],['huge',1],['old',2],['blue',4],['Japanese',5],['glass',6]],OWN_NOUN='vase';
VIS.reg('flagadjord',c=>{let A,X,pad,qbox,qn=-1,run=0,hold=null;const S={};
const INK='#111827',PAPER='#ffffff',LINE='#4b5563',YES='#166534',NO='#b91c1c',FOCUS='#1d4ed8',WARN='#fee2e2';
const u=n=>Math.round(n*(A.narrow?1:1.1)),face=(n,w)=>`${w||700} ${u(n)}px system-ui,sans-serif`;
const MODES=['name','build','fix','opf','purp','own','chal'],mode=()=>MODES[A.step],LIST={name:NAME,build:BUILD,fix:FIX,opf:OPF,purp:PURP},
 over=k=>k==='own'?S.own.made.length>=3:S[k].i>=LIST[k].length;
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function wash(){X.fillStyle=A.col.dark?'#0f172a':'#f9fafb';X.fillRect(0,0,A.W,A.H)}
function say(t,x,y,n,w,col){X.fillStyle=col||INK;X.font=face(n,w);X.textAlign='center';X.textBaseline='middle';X.fillText(t,x,y,A.W-14)}
function tile(r,t,o){o=o||{};X.fillStyle=o.bg||PAPER;A.paint.rrect(r.x,r.y,r.w,r.h,o.rad||10);X.fill();X.lineWidth=o.ring?3.5:1.6;X.strokeStyle=o.ring||LINE;X.stroke();
 if(t!=null)say(t,r.x+r.w/2,r.y+r.h/2+(o.sub?-u(7):1),o.n||19,o.w);if(o.sub)say(o.sub,r.x+r.w/2,r.y+r.h/2+u(12),11,600,'#374151')}
function title(t,ok){X.font=face(15,800);const w=Math.min(A.W-12,X.measureText(t).width+30),h=u(15)+16,y=A.H*.03;tile({x:A.W/2-w/2,y,w,h},null,{bg:ok?'#dcfce7':PAPER,ring:ok?YES:null,rad:h/2});say(t,A.W/2,y+h/2+1,15,800)}
function hint(t,y){say(t,A.W/2,A.H*y,14,600,A.col.tx)}
function msg(m,y){if(!m)return;X.font=face(14);const rows=[];let ln='';m.split(' ').forEach(w=>{const t=ln?ln+' '+w:w;if(X.measureText(t).width>A.W-28&&ln){rows.push(ln);ln=w}else ln=t});rows.push(ln);
 rows.forEach((t,j)=>say(t,A.W/2,A.H*y+(j-(rows.length-1)/2)*u(18),14,700,A.col.tx))}
function recap(t,L){wash();title(t,1);L.forEach((s,j)=>say(s,A.W/2,A.H*(.17+j*.11),16,700,A.col.tx))}
/* centred row of word tiles; wraps when narrow */
function row(words,y,minW){X.font=face(19);const gap=8,h=u(50),out=[];let x=0,y0=y;const lines=[[]];
 words.forEach(w=>{const tw=Math.max((minW||0)*(A.narrow?.8:1),X.measureText(w).width+u(22));const L=lines[lines.length-1],used=L.reduce((s,o)=>s+o.w+gap,0);if(used+tw>A.W-20&&L.length)lines.push([]);lines[lines.length-1].push({w:tw,word:w})});
 lines.forEach((L,li)=>{const tot=L.reduce((s,o)=>s+o.w,0)+gap*(L.length-1);x=(A.W-tot)/2;L.forEach(o=>{out.push({word:o.word,x,y:y0+li*(h+10),w:o.w,h});x+=o.w+gap})});return out}
const later=(a,b)=>a[1]>b[1],no=()=>A.sound.miss(),ok=()=>A.sound.pop(),fine=s=>{s.bad=null;s.m='';ok()};
const art=w=>/^[aeiou]/i.test(w)?'an':'a';
function phrase(L){return art(L[0][0])+' '+L.map(x=>x[0]).join(' ')}
/* ---- 1: what kind? ---- */
function kindKeys(){const cols=4,g=8,w=(A.W-20-(cols-1)*g)/cols,h=u(46);return KIND.map((k,j)=>({j,x:10+(j%cols)*(w+g),y:A.H*.5+Math.floor(j/cols)*(h+g),w,h}))}
function drawName(){const s=S.name;if(over('name'))return recap('All 8 kinds named',NAME.map(([w,k])=>`${w}: ${KIND[k]}`));
 const [w,,ex]=NAME[s.i];wash();title(`Word ${s.i+1} of 8: what kind is it?`);hint(`In "${ex}", what does ${w} tell?`,.15);
 X.font=face(26,800);const cw=X.measureText(w).width+u(40);tile({x:A.W/2-cw/2,y:A.H*.24,w:cw,h:u(62)},w,{n:26,w:800,bg:'#fef9c3'});
 kindKeys().forEach(r=>tile(r,KIND[r.j],{bg:TINT[r.j],n:14,ring:s.bad===r.j?NO:null}));msg(s.m,.88)}
function nameIt(j){const s=S.name;if(over('name'))return;const [w,k]=NAME[s.i];
 if(j!==k){s.bad=j;no();s.m=`${w} tells ${ASK[k]}, not ${ASK[j]}.`;return tell(s.m)}
 s.i++;fine(s);tell(`Yes: ${w} is ${KIND[k]}. It tells ${ASK[k]}.`+(over('name')?' All 8 named.':''))}
/* ---- 2: build the phrase ---- */
const deck=()=>BUILD[S.build.i].slice(0,-1);
function drawBuild(){const s=S.build;if(over('build'))return recap('All 5 phrases built',BUILD.map(b=>phrase(b.slice(0,-1))+' '+b[b.length-1]));
 const set=deck(),noun=BUILD[s.i][set.length];wash();title(`Phrase ${s.i+1} of 5: build it`);hint('Drag the next word into the gap.',.15);
 const slots=row(['a',...set.map(()=>'       '),noun],A.H*.24,u(70));s.slots=slots;
 slots.forEach((r,j)=>{const inner=j>0&&j<=set.length,got=s.got[j-1];if(!inner)return tile(r,r.word,{bg:'#f3f4f6'});
  tile(r,got?got[0]:'',{bg:got?TINT[got[1]]:j-1===s.got.length?'#dbeafe':PAPER,ring:!got&&j-1===s.got.length?FOCUS:null,sub:got?KIND[got[1]]:null})});
 const left=set.filter(x=>!s.got.includes(x)).slice().reverse();s.cards=row(left.map(x=>x[0]),A.H*.58,u(90)).map((r,j)=>({...r,item:left[j]}));
 s.cards.forEach(r=>{const g=hold&&hold.item===r.item;tile(g?{...r,x:hold.x-r.w/2,y:hold.y-r.h/2}:r,r.word,{bg:TINT[r.item[1]],sub:KIND[r.item[1]],ring:g?FOCUS:s.bad===r.item?NO:null})});msg(s.m,.88)}
function place(item){const s=S.build;if(over('build'))return;const set=deck(),left=set.filter(x=>!s.got.includes(x)),first=left.reduce((a,b)=>later(a,b)?b:a);
 if(item!==first){s.bad=item;no();s.m=`${item[0]} is ${KIND[item[1]]}. ${first[0]} is ${KIND[first[1]]}, and ${KIND[first[1]]} comes before ${KIND[item[1]]}.`;return tell(s.m)}
 s.got.push(item);fine(s);if(s.got.length<set.length)return tell(`${item[0]} goes next.`);
 const done=phrase(set)+' '+BUILD[s.i][set.length];s.i++;s.got=[];tell(done+'.'+(over('build')?' All 5 built.':''))}
/* ---- 3: fix the order with one swap ---- */
function drawFix(){const s=S.fix;if(over('fix'))return recap('All 4 phrases fixed',s.log);
 const noun=FIX[s.i][s.now.length];wash();title(`Phrase ${s.i+1} of 4: it sounds wrong`);hint('Tap two words to swap them.',.15);
 s.tiles=row(['a',...s.now.map(x=>x[0]),noun],A.H*.3,u(64));s.tiles.forEach((r,j)=>{const w=j>0&&j<=s.now.length;tile(r,r.word,{bg:w?(s.pick===j-1?'#dbeafe':PAPER):'#f3f4f6',ring:w&&s.pick===j-1?FOCUS:null,n:20})});msg(s.m,.78)}
function swapPick(j){const s=S.fix;if(over('fix'))return;if(s.pick==null){s.pick=j;A.sound.tick();return tell(`${s.now[j][0]} picked.`)}
 if(s.pick===j){s.pick=null;return tell('Unpicked.')}
 const t=s.now.slice(),a=s.pick;[t[a],t[j]]=[t[j],t[a]];s.pick=null;const bad=t.findIndex((x,m)=>m&&later(t[m-1],x));
 if(bad>=0){no();const p=t[bad-1],q=t[bad];s.m=`Still odd: ${q[0]} is ${KIND[q[1]]}, so it goes before ${p[0]} (${KIND[p[1]]}).`;return tell(s.m)}
 const f=phrase(t)+' '+FIX[s.i][s.now.length];s.log.push(f);s.i++;fine(s);s.now=over('fix')?[]:FIX[s.i].slice(0,-1);tell(f+'. Sounds right.'+(over('fix')?' All 4 fixed.':''))}
/* ---- 4: opinion or fact ---- */
function pots(){const g=10,w=(A.W-3*g)/2;return[0,1].map(j=>({j,x:g+j*(w+g),y:A.H*.46,w,h:A.H*.5}))}
function card4(){X.font=face(22,800);const w=X.measureText(OPF[S.opf.i][0]).width+u(44);return{x:A.W/2-w/2,y:A.H*.14,w,h:u(54)}}
function drawOpf(){const s=S.opf;wash();title(over('opf')?'All 6 sorted':`Word ${s.i+1} of 6: opinion or fact?`,over('opf'));
 pots().forEach(b=>{tile(b,null,{bg:b.j?'#e0f2fe':'#fef3c7',ring:s.bad===b.j?NO:LINE});X.fillStyle=INK;X.font=face(14,800);X.textAlign='center';X.textBaseline='top';X.fillText(SIDE[b.j],b.x+b.w/2,b.y+8,b.w-8);
  X.font=face(14,600);OPF.slice(0,s.i).filter(x=>x[1]===b.j).forEach((x,m)=>X.fillText(x[0],b.x+b.w/2,b.y+u(34)+m*u(22),b.w-8))});
 if(!over('opf')){const r=card4();tile(hold&&hold.word4?{...r,x:hold.x-r.w/2,y:hold.y-r.h/2}:r,OPF[s.i][0],{n:22,w:800,ring:hold?FOCUS:null})}msg(s.m,.355)}
function judge(j){const s=S.opf;if(over('opf'))return;const [w,k,why]=OPF[s.i];if(j!==k){s.bad=j;no();s.m=why;return tell(why)}
 s.i++;fine(s);tell(`${SIDE[k].split(':')[0]}: ${why}`+(over('opf')?' All 6 sorted.':''))}
/* ---- 5: purpose words touch the noun ---- */
function gaps5(L){const h=L[0].h,y=L[0].y,w=u(26);return[{at:0,x:L[0].x-w-6,y,w,h},{at:1,x:L[0].x+L[0].w+6,y,w,h}]}
const chip5=()=>({x:A.W/2-u(55),y:A.H*.62,w:u(110),h:u(50)});
function drawPurp(){const s=S.purp;if(over('purp'))return recap('Purpose words touch the noun',PURP.map(([w,p,n])=>`a ${w} ${p} ${n}`));
 const [w,p,n]=PURP[s.i];wash();title(`Pair ${s.i+1} of 4: where does ${w} go?`);hint(`${p} ${n}: ${p} tells what the ${n} ${/s$/.test(n)?'are':'is'} for.`,.15);
 const L=row([p,n],A.H*.3,u(80));L[0].x-=u(20);L[1].x+=u(20);L.forEach(r=>tile(r,r.word,{bg:r.word===p?TINT[7]:'#f3f4f6',n:20}));
 gaps5(L).forEach(g=>{X.fillStyle=s.bad===g.at?WARN:A.col.dark?'#334155':'#e5e7eb';A.paint.rrect(g.x,g.y,g.w,g.h,6);X.fill();X.lineWidth=2;X.strokeStyle=s.bad===g.at?NO:A.col.dark?'#94a3b8':LINE;X.stroke()});s.L=L;
 const r=chip5();tile(hold&&hold.word5?{...r,x:hold.x-r.w/2,y:hold.y-r.h/2}:r,w,{bg:'#fef9c3',ring:hold?FOCUS:null,n:21});msg(s.m,.88)}
function slot(at){const s=S.purp;if(over('purp'))return;const [w,p,n]=PURP[s.i];
 if(at!==0){s.bad=at;no();s.m=`${p} ${w} ${n} splits ${p} from ${n}. A purpose word touches its noun.`;return tell(s.m)}
 s.i++;fine(s);tell(`a ${w} ${p} ${n}.`+(over('purp')?' All 4 done.':''))}
/* ---- 6: build your own ---- */
function bankTiles(){return row(BANK.map(b=>b[0]),A.H*.54,u(84)).map((r,j)=>({...r,item:BANK[j]}))}
function drawOwn(){const s=S.own;if(over('own'))return recap('3 phrases of your own',s.made.map(m=>m+' '+OWN_NOUN));
 wash();title(`Phrase ${s.made.length+1} of 3: pick 3 words`);hint('Tap 3 words in an order that sounds right.',.15);
 const cur=row([s.cur.length?art(s.cur[0][0]):'a',...s.cur.map(x=>x[0]),...Array(3-s.cur.length).fill('     '),OWN_NOUN],A.H*.2,u(56));
 cur.forEach((r,j)=>{const w=s.cur[j-1];tile(r,r.word,{bg:w?TINT[w[1]]:j>0&&j<=3?PAPER:'#f3f4f6',sub:w?KIND[w[1]]:null})});
 bankTiles().forEach(r=>tile(r,r.word,{bg:s.cur.includes(r.item)?'#e5e7eb':TINT[r.item[1]],sub:KIND[r.item[1]],ring:s.bad===r.item?NO:null}));msg(s.m,.93)}
function addOwn(item){const s=S.own;if(over('own')||s.cur.includes(item))return;const last=s.cur[s.cur.length-1];
 if(last&&!later(item,last)){s.bad=item;no();s.m=`${item[0]} is ${KIND[item[1]]}. It belongs before ${last[0]} (${KIND[last[1]]}).`;return tell(s.m)}
 s.cur.push(item);fine(s);if(s.cur.length<3)return tell(phrase(s.cur)+' …');
 const p=phrase(s.cur);if(s.made.includes(p)){s.cur=[];s.m='You made that one. Try a new mix.';return tell(s.m)}
 s.made.push(p);s.cur=[];tell(p+' '+OWN_NOUN+'. Sounds right.'+(over('own')?' 3 made.':''))}
/* ---- pointer ---- */
function down(p){const k=mode();if(k==='chal'||over(k))return false;
 if(k==='name'){const r=kindKeys().find(r=>within(p,r));if(r)nameIt(r.j)}
 if(k==='build'){const r=(S.build.cards||[]).find(r=>within(p,r));if(r){hold={item:r.item,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}}
 if(k==='fix'){const j=(S.fix.tiles||[]).findIndex(r=>within(p,r));if(j>0&&j<=S.fix.now.length)swapPick(j-1)}
 if(k==='opf'){if(within(p,card4())){hold={word4:1,x:p.x,y:p.y};return true}const b=pots().find(r=>within(p,r));if(b)judge(b.j)}
 if(k==='purp'&&within(p,chip5())){hold={word5:1,x:p.x,y:p.y};return true}
 if(k==='own'){const r=bankTiles().find(r=>within(p,r));if(r)addOwn(r.item)}return false}
function move(p){if(hold){hold.x=p.x;hold.y=p.y;A.redraw()}}
function up(p){if(!hold)return;const h=hold;hold=null;
 if(h.item){const sl=(S.build.slots||[])[S.build.got.length+1];if(within(p,sl&&{x:sl.x-16,y:sl.y-16,w:sl.w+32,h:sl.h+32})||Math.hypot(p.x-h.x0,p.y-h.y0)<8)place(h.item);else A.redraw()}
 else if(h.word4){const b=pots().find(r=>within(p,r));if(b)judge(b.j);else A.redraw()}
 else if(h.word5){const g=gaps5(S.purp.L||[]).find(g=>within(p,{x:g.x-16,y:g.y-16,w:g.w+32,h:g.h+32}));if(g)slot(g.at);else A.redraw()}}
function reset(){run++;hold=null;for(const k in S)delete S[k];['name','build','fix','opf','purp'].forEach(k=>S[k]={i:0});S.build.got=[];S.fix.now=FIX[0].slice(0,-1);S.fix.log=[];S.own={made:[],cur:[]};S.tick=()=>{}}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.tick()}
function begin(i,first,ready,line){reset();tell(first);S.tick=()=>{if(A.step===i&&ready()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(line+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=run;acts.forEach((f,j)=>setTimeout(()=>{if(me===run)f()},ms*(j+1)))}
function buttons(){if(!pad)return;pad.innerHTML='';const k=mode(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};if(k==='chal'||over(k))return;
 if(k==='name')KIND.forEach((n,j)=>B(n,()=>nameIt(j),`${NAME[S.name.i][0]} is ${n}`));
 if(k==='build')deck().filter(x=>!S.build.got.includes(x)).forEach(x=>B(x[0],()=>place(x),`Put ${x[0]} next`));
 if(k==='fix')S.fix.now.forEach((x,j)=>B(x[0],()=>swapPick(j),`Swap ${x[0]}`));
 if(k==='opf')SIDE.forEach((n,j)=>B(n,()=>judge(j),`${OPF[S.opf.i][0]}: ${n}`));
 if(k==='purp'){const [w,p,n]=PURP[S.purp.i];B(`${w} ${p} ${n}`,()=>slot(0),`Put ${w} before ${p}`);B(`${p} ${w} ${n}`,()=>slot(1),`Put ${w} between ${p} and ${n}`)}
 if(k==='own'){BANK.filter(b=>!S.own.cur.includes(b)).forEach(b=>B(b[0],()=>addOwn(b),`Add ${b[0]} (${KIND[b[1]]})`));B('Start again',()=>{S.own.cur=[];S.own.m='';tell('Phrase cleared.')},'Clear this phrase')}}
const steps=[
{h:'What kind of word?',p:'Describing words (adjectives) tell different things: what someone thinks, how big, how old, what shape, colour, where from, what it is made of, what it is for.',task:'Name all 8 kinds',
show:()=>play(0,NAME.map(x=>()=>nameIt(x[1])),420),go:()=>begin(0,'lovely. Tap its kind.',()=>over('name'),'Each describing word has a kind.')},
{h:'Build the phrase',p:'When two or more describing words come before a noun, English puts them in a usual order. Opinion, then size, then age or shape, then colour, origin, material and purpose.',
predict:{q:'Which sounds right?',opts:['Both sound the same','a small red bag','a red small bag'],ans:1},task:'Build all 5 phrases',
show:()=>play(1,BUILD.flatMap(b=>b.slice(0,-1).map(x=>()=>place(x))),380),go:()=>begin(1,'small, red, bag. Drag the first word.',()=>over('build'),'Size before colour before material.')},
{h:'Fix the order',p:'Fluent speakers hear a wrong order at once, even if they cannot say the rule. Swap two words so it sounds right.',task:'Fix all 4 phrases',
show:()=>play(2,[[0,1],[0,1],[0,2],[0,1]].flatMap(([a,b])=>[()=>swapPick(a),()=>swapPick(b)]),360),go:()=>begin(2,'a wooden big table. Tap two words to swap.',()=>over('fix'),'One swap puts the kinds in order.')},
{h:'Opinion goes first',p:'An opinion word says what someone thinks. A fact word says something anyone can check. Opinion words come before fact words.',
predict:{q:'Which sounds right?',opts:['a big lovely dog','a lovely big dog'],ans:1},task:'Sort all 6 words',
show:()=>play(3,OPF.map(x=>()=>judge(x[1])),400),go:()=>begin(3,'lovely. Opinion or fact? Drag it to a box.',()=>over('opf'),'Opinion first, then facts.')},
{h:'What is it for?',p:'A purpose word says what the thing is for, like running in running shoes. It stays right next to its noun.',
predict:{q:'Which is right?',opts:['a sleeping green bag','a green sleeping bag'],ans:1},task:'Place all 4 words',
show:()=>play(4,PURP.map(()=>()=>slot(0)),450),go:()=>begin(4,'black, running shoes. Drag black into a gap.',()=>over('purp'),'The purpose word touches the noun.')},
{h:'Build your own',p:'Tap three words in an order that sounds right. Each new word must be a later kind than the one before.',task:'Build 3 different phrases',
show:()=>play(5,[0,1,3,2,4,5,1,3,5].map(j=>()=>addOwn(BANK[j])),380),go:()=>begin(5,'Tap 3 words for vase.',()=>over('own'),'Your phrases follow the order.')},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.tick()});
const QS=[
{q:'Which sounds right?',a:'a small brown dog',o:[['a brown small dog','colsize'],['a small dog brown','after']]},
{q:'Which sounds right?',a:'a lovely old house',o:[['an old lovely house','opinlate'],['a house lovely old','after2']]},
{q:'Which sounds right?',a:'a big plastic box',o:[['a plastic big box','matfirst'],['a big box plastic','after3']]},
{q:'Which is right?',a:'a red sleeping bag',o:[['a sleeping red bag','purp'],['a red bag sleeping','after4']]},
{q:'Which sounds right?',a:'a delicious Italian pizza',o:[['an Italian delicious pizza','opinlate2'],['a delicious pizza Italian','after5']]},
{q:'What kind of describing word is wooden?',a:'material',o:[['colour','kindcol'],['origin','kindori']]}];
function why(t){let m='In English, describing words come before the noun, not after it.';
 switch(t){case 'colsize':m='brown is colour and small is size. Size comes before colour.';break;
 case 'opinlate':m='lovely is an opinion. Opinion words come first, before age.';break;
 case 'opinlate2':m='delicious is an opinion, so it comes before Italian (origin).';break;
 case 'matfirst':m='plastic is what it is made of. Material comes after size, close to the noun.';break;
 case 'purp':m='sleeping says what the bag is for. A purpose word touches its noun.';break;
 case 'kindcol':m='wooden tells what it is made of, not its colour.';break;
 case 'kindori':m='wooden tells what it is made of. Origin is where it is from, like French.';break;
}
 return m}
function quiz(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 qbox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=qbox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>answer(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function answer(t,a){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else no();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
function draw(){const k=mode();if(k==='chal'){wash();title('Challenge',1);kindKeys().forEach(r=>tile(r,KIND[r.j],{bg:TINT[r.j],n:14}));hint('Read the kinds in order, left to right.',.3);return}
 ({name:drawName,build:drawBuild,fix:drawFix,opf:drawOpf,purp:drawPurp,own:drawOwn})[k]();A.fx.draw(X)}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{qbox.hidden=B.step!==6;pad.hidden=B.step===6;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Adjective buttons'},w);qbox=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
