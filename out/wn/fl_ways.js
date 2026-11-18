/* Flagship – the product rule for counting (ages 13–15; GCSE (9–1) Maths N5 "apply systematic listing strategies including
   use of the product rule for counting"). Build every outfit by listing, grow an a × b × c choice block to hit targets,
   sort AND (multiply) from OR (add) situations, list 2-letter codes with no repeats, then set the choices per place for codes. */
(()=>{
const TOPS=['red','blue','green'],BOTS=['jeans','shorts'],TCOL=['#b91c1c','#1d4ed8','#15803d'];
const GOAL=[[12,[2,3,2]],[30,[5,3,2]],[18,[3,3,2]]];
const ANDOR=[['Pick a sandwich AND a drink',0],['Pick ONE dessert: a cake or an ice cream',1],['Roll a dice AND flip a coin',0],
 ['Go by bus OR by train: one trip',1],['Choose a first name AND a surname for a game character',0],['Borrow ONE book from shelf A or shelf B',1]],AOBIN=['multiply ×: this AND that','add +: this OR that'];
const ABC=['A','B','C'];
const CODES=[['3-digit lock, digits 0–9, repeats allowed',[10,10,10]],['3-digit code, no digit used twice',[10,9,8]],
 ['3-digit number: it cannot start with 0',[9,10,10]],['3 letters from A–E, no letter used twice',[5,4,3]]];
VIS.reg('flagways',c=>{let A,tray,cq,qi=-1,ver=0;const W={};
const NAVY='#0f172a',YES='#15803d',NO='#be123c',RIM='#64748b',DRAG='#2563eb',CELL='#f8fafc',PALE='#ecfeff',PALEI='#155e75',WARM='#fff7ed',WARMI='#9a3412';
const q=v=>Math.round(v*(A.narrow?.94:1.08)),fo=(v,w)=>`${w||700} ${q(v)}px system-ui,sans-serif`,cen=g=>{g.textAlign='center';g.textBaseline='middle'};
const stage=()=>['wear','grow','andor','list','code','quiz'][A.step],inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function wash(){const g=A.ctx;g.fillStyle=A.col.dark?'#0b1220':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function tag(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.lineWidth=o.edge?3.5:1.5;g.strokeStyle=o.edge||RIM;g.stroke();
 if(t==null)return;g.fillStyle=o.ink||NAVY;let n=o.n||15;g.font=fo(n,o.w||800);while(g.measureText(t).width>r.w-10&&n>9){n--;g.font=fo(n,o.w||800)}cen(g);g.fillText(t,r.x+r.w/2,r.y+r.h/2+1)}
function top(t,y,won){const g=A.ctx;let n=15;g.font=fo(n,800);while(g.measureText(t).width+26>A.W-8&&n>10){n--;g.font=fo(n,800)}const w=g.measureText(t).width+24,h=q(n)+15;
 tag({x:A.W/2-w/2,y:y-h/2,w,h},t,{bg:won?'#dcfce7':'#fff',edge:won?YES:null,n})}
function say2(t,y,n){const g=A.ctx;g.fillStyle=A.col.tx;g.font=fo(n||14,600);cen(g);g.fillText(t,A.W/2,y,A.W-12)}
function lineup(list,y,h){const n=list.length,gap=6,w=Math.min(q(110),(A.W-20-gap*(n-1))/n),x0=A.W/2-(n*w+gap*(n-1))/2;return list.map((t,i)=>({x:x0+i*(w+gap),y,w,h,t,i}))}
/* 1: outfits */
const topsR=()=>lineup(TOPS,A.H*.14,q(44)),botsR=()=>lineup(BOTS,A.H*.27,q(44));
function grid(cols,rows,y,h){const gw=Math.min(A.W-24,q(420)),cw=gw/cols,ch=Math.min(q(46),h/rows);return{x:A.W/2-gw/2,y,cw,ch,cols,rows}}
function drawWear(){const s=W.wear,g=A.ctx;wash();const done=s.got.size>=6;top(done?'All 6 outfits: 3 × 2 = 6':`Tap a top, then trousers (${s.got.size} of 6)`,A.H*.06,done);
 topsR().forEach(r=>tag(r,r.t,{bg:'#fff',ink:TCOL[r.i],edge:s.pick===r.i?DRAG:null}));botsR().forEach(r=>tag(r,r.t,{bg:WARM,ink:WARMI}));
 const G=grid(2,3,A.H*.42,A.H*.4);g.font=fo(12,700);for(let i=0;i<3;i++)for(let j=0;j<2;j++){const r={x:G.x+j*G.cw+3,y:G.y+i*G.ch+3,w:G.cw-6,h:G.ch-6},k=i+','+j,has=s.got.has(k);
  tag(r,has?`${TOPS[i]} + ${BOTS[j]}`:'?',{bg:has?'#dcfce7':CELL,ink:has?YES:RIM,edge:s.dup===k?NO:null,n:14})}
 say2(s.note||'Each top goes with each pair of trousers',A.H*.42+G.ch*3+q(18),13)}
function wear(kind,i){const s=W.wear;if(s.got.size>=6)return;if(kind==='t'){s.pick=i;A.sound.tick();return talk(`${TOPS[i]} top chosen. Now tap jeans or shorts.`)}
 if(s.pick==null){A.sound.miss();return talk('Tap a top first, then the trousers to go with it.')}const k=s.pick+','+i;
 if(s.got.has(k)){s.dup=k;A.sound.miss();return talk(`You already made ${TOPS[s.pick]} + ${BOTS[i]}. Each outfit is counted once: try a new pair.`)}
 s.got.add(k);s.dup=null;A.sound.pop();s.note=`Each top makes 2 outfits: ${TOPS.map((t,a)=>[0,1].filter(b=>s.got.has(a+','+b)).length).join(' + ')}`;
 talk(`${TOPS[s.pick]} + ${BOTS[i]}. ${s.got.size} of 6.`+(s.got.size>=6?' 3 tops, each with 2 trousers: 3 × 2 = 6, not 3 + 2.':''))}
/* 2: grow the block */
const bars=()=>{const w=Math.min(q(70),(A.W-60)/3),h=A.H*.34;return[0,1,2].map(i=>({x:A.W/2-(3*w+40)/2+i*(w+20),y:A.H*.16,w,h,i}))};
const total=()=>W.grow.v.reduce((a,b)=>a*b,1);
function drawGrow(){const s=W.grow,g=A.ctx;wash();const done=s.n>=GOAL.length;top(done?'All 3 targets hit':`Target ${s.n+1} of 3: make exactly ${GOAL[s.n][0]} outcomes`,A.H*.06,done);
 bars().forEach(b=>{tag(b,null,{bg:CELL,edge:W.hold&&W.hold.i===b.i?DRAG:null});const f=s.v[b.i]/6,hh=(b.h-8)*f;g.fillStyle=['#0891b2','#7c3aed','#ea580c'][b.i];A.paint.rrect(b.x+4,b.y+b.h-4-hh,b.w-8,hh,6);g.fill();
  g.fillStyle=NAVY;g.font=fo(20,800);cen(g);g.fillText(String(s.v[b.i]),b.x+b.w/2,b.y+q(16));g.fillStyle=A.col.tx;g.font=fo(12,700);g.fillText(`stage ${b.i+1}`,b.x+b.w/2,b.y+b.h+q(12))});
 const [a,b,c3]=s.v,N=a*b*c3;say2(`${a} × ${b} × ${c3} = ${N}`,A.H*.58,20);
 const cw=Math.min((A.W-40)/b,q(40)),chh=Math.min(A.H*.3/a,q(26)),x0=A.W/2-cw*b/2,y0=A.H*.64;for(let i=0;i<a;i++)for(let j=0;j<b;j++){g.fillStyle=PALE;g.strokeStyle=RIM;g.lineWidth=1;g.fillRect(x0+j*cw+1,y0+i*chh+1,cw-2,chh-2);g.strokeRect(x0+j*cw+1,y0+i*chh+1,cw-2,chh-2);
  g.fillStyle='#ea580c';for(let k=0;k<c3;k++){g.beginPath();g.arc(x0+j*cw+cw*(k+1)/(c3+1),y0+i*chh+chh/2,Math.min(3.5,cw/(2*c3+2)),0,7);g.fill()}}
 if(s.note)say2(s.note,A.H*.97,12)}
function set(i,v){const s=W.grow;if(s.n>=GOAL.length)return;v=Math.max(1,Math.min(6,v));if(v===s.v[i])return A.redraw();s.v[i]=v;A.sound.tick();const N=total(),T=GOAL[s.n][0];
 if(N===T){s.n++;A.sound.pop();s.note=`${s.v.join(' × ')} = ${T}`;talk(`${s.v.join(' × ')} = ${T}. Target hit.`+(s.n>=GOAL.length?' All 3 hit. Every stage multiplies the total.':''));return}
 s.note=v===1?'A stage with 1 option multiplies by 1: no change.':N>T?`${N} is too many. Make a stage smaller.`:`${N} is not enough yet.`;talk(`${s.v.join(' × ')} = ${N}. Target ${T}.`)}
function hitGoal(k){const s=W.grow;if(s.n!==k)return;const want=GOAL[k][1];s.v=[1,1,1];want.forEach((v,i)=>{if(i<2)s.v[i]=v});set(2,want[2])}
/* 3: AND or OR */
function bins(names,y){const gap=6,w=(A.W-16-gap)/2;return names.map((t,j)=>({x:8+j*(w+gap),y,w,h:A.H-y-8,t,j}))}
const cardR=()=>({x:16,y:A.H*.15,w:A.W-32,h:q(56)});
function drawAndOr(){const s=W.andor,g=A.ctx;wash();top(s.n>=ANDOR.length?'All 6 sorted':`Situation ${s.n+1} of 6: multiply or add?`,A.H*.06,s.n>=ANDOR.length);
 bins(AOBIN,A.H*.4).forEach(b=>{tag(b,null,{bg:b.j?WARM:PALE,edge:s.bad===b.j?NO:null});g.fillStyle=b.j?WARMI:PALEI;g.font=fo(13,800);g.textAlign='center';g.textBaseline='top';g.fillText(b.t,b.x+b.w/2,b.y+8,b.w-8);
  g.font=fo(12,600);g.fillStyle=NAVY;ANDOR.slice(0,s.n).filter(x=>x[1]===b.j).forEach((x,i)=>g.fillText(x[0].split(' ').slice(0,3).join(' ')+'…',b.x+b.w/2,b.y+q(34)+i*q(20),b.w-8))});
 if(s.n<ANDOR.length){const r=cardR(),m=W.hold?{...r,x:W.hold.x-r.w/2,y:W.hold.y-r.h/2}:r;tag(m,ANDOR[s.n][0],{edge:W.hold?DRAG:null,n:16});if(!W.hold)say2('Drag it to a box',A.H*.15+q(72),13)}}
function andor(j){const s=W.andor;if(s.n>=ANDOR.length)return;const [t,k]=ANDOR[s.n];
 if(j!==k){s.bad=j;A.sound.miss();return talk(k?'You make only ONE choice here, from one group or the other, so the choices add.':'You make both choices, one after the other. Every first choice pairs with every second: multiply.')}
 s.n++;s.bad=null;A.sound.pop();talk(`${k?'Add':'Multiply'}: ${t}.`+(s.n>=ANDOR.length?' All 6 sorted. AND multiplies, OR adds.':''))}
/* 4: list codes with no repeats */
function drawList(){const s=W.list,g=A.ctx;wash();const done=s.got.size>=6;top(done?'All 6 codes: 3 × 2 = 6':`Tap every 2-letter code with no repeats (${s.got.size} of 6)`,A.H*.06,done);
 const n=3,cs=Math.min(q(74),(A.W-80)/n),x0=A.W/2-cs*n/2+q(14),y0=A.H*.2;g.fillStyle=A.col.tx;g.font=fo(13,700);cen(g);
 ABC.forEach((L,i)=>{g.fillText(L,x0+i*cs+cs/2,y0-q(12));g.fillText(L,x0-q(16),y0+i*cs+cs/2)});g.fillText('1st',x0-q(16),y0-q(12));
 for(let i=0;i<n;i++)for(let j=0;j<n;j++){const k=ABC[i]+ABC[j],has=s.got.has(k);tag({x:x0+j*cs+3,y:y0+i*cs+3,w:cs-6,h:cs-6},has||s.bad===k?k:'',{bg:has?'#dcfce7':s.bad===k?'#ffe4e6':CELL,ink:has?YES:NO,edge:s.bad===k?NO:null,n:18})}
 say2(s.note||'Row: 1st letter. Column: 2nd letter.',y0+cs*n+q(22),13);if(done)say2('3 choices for the 1st, then 2 left for the 2nd.',y0+cs*n+q(44),13)}
const cellAt=p=>{const n=3,cs=Math.min(q(74),(A.W-80)/n),x0=A.W/2-cs*n/2+q(14),y0=A.H*.2,j=Math.floor((p.x-x0)/cs),i=Math.floor((p.y-y0)/cs);return i>=0&&j>=0&&i<n&&j<n?ABC[i]+ABC[j]:null};
function list(k){const s=W.list;if(s.got.size>=6||!k)return;if(k[0]===k[1]){s.bad=k;A.sound.miss();return talk(`${k} uses ${k[0]} twice. With no repeats, once ${k[0]} is first it is used up.`)}
 if(s.got.has(k)){A.sound.miss();return talk(`${k} is already listed.`)}s.got.add(k);s.bad=null;A.sound.pop();s.note=`${s.got.size} listed: ${[...s.got].join(', ')}`;talk(`${k}. ${s.got.size} of 6.`+(s.got.size>=6?' 9 cells minus the 3 repeats: 3 × 2 = 6.':''))}
/* 5: codes */
const slots=()=>{const w=Math.min(q(86),(A.W-60)/3);return[0,1,2].map(i=>({x:A.W/2-(3*w+24)/2+i*(w+12),y:A.H*.3,w,h:q(80),i}))};
function drawCode(){const s=W.code,g=A.ctx;wash();if(s.n>=CODES.length){top('All 4 codes counted',A.H*.06,1);CODES.forEach(([t,v],i)=>say2(`${v.join(' × ')} = ${v.reduce((a,b)=>a*b,1)}: ${t}`,A.H*(.2+i*.14),13));return}
 const [t]=CODES[s.n];top(`Code ${s.n+1} of 4: choices for each place?`,A.H*.06);tag({x:12,y:A.H*.13,w:A.W-24,h:q(40)},t,{bg:WARM,ink:WARMI,n:15});
 slots().forEach(r=>{tag(r,String(s.v[r.i]),{n:28,edge:s.bad===r.i?NO:W.hold&&W.hold.i===r.i?DRAG:null});g.fillStyle=A.col.tx;g.font=fo(12,700);cen(g);g.fillText(`place ${r.i+1}`,r.x+r.w/2,r.y+r.h+q(12))});
 say2(`${s.v.join(' × ')} = ${s.v.reduce((a,b)=>a*b,1)}`,A.H*.62,20);say2('Drag a box up or down to change it, then Check',A.H*.7,12);tag(chk(),'Check',{bg:'#dbeafe',ink:'#1e3a8a',n:16});if(s.note)say2(s.note,A.H*.93,12)}
const chk=()=>({x:A.W/2-q(60),y:A.H*.76,w:q(120),h:q(44)});
function tweak(i,d){const s=W.code;if(s.n>=CODES.length)return;s.v[i]=Math.max(1,Math.min(10,s.v[i]+d));s.bad=null;A.sound.tick();talk(`Place ${i+1}: ${s.v[i]} choices.`)}
function check(){const s=W.code;if(s.n>=CODES.length)return;const [t,want]=CODES[s.n],v=s.v,bad=v.findIndex((x,i)=>x!==want[i]);
 if(bad<0){s.n++;A.sound.pop();s.note=`${want.join(' × ')} = ${want.reduce((a,b)=>a*b,1)}`;s.v=[1,1,1];return talk(`Yes: ${s.note}.`+(s.n>=CODES.length?' All 4 counted.':''))}
 s.bad=bad;A.sound.miss();const norep=/twice/.test(t);
 talk(s.n===2&&bad===0?'The first place cannot be 0, so it has only 9 choices: 1 to 9.':norep&&bad>0&&v[bad]>=v[bad-1]?`No repeats: one ${/letter/.test(t)?'letter':'digit'} is used up at each place, so place ${bad+1} has one fewer choice than place ${bad}.`:
  !norep&&v[bad]<want[bad]?`Repeats are allowed, so place ${bad+1} can use every ${/digit/.test(t)?'digit':'letter'}: ${want[bad]} choices.`:/letter/.test(t)&&bad===0?'There are 5 letters, A to E, for the first place.':`Count the choices for place ${bad+1} again.`)}
function setCode(k){W.code.v=CODES[k][1].slice();check()}
function draw(){const k=stage();if(k==='quiz'){wash();top('Challenge',A.H*.25,1);top('AND × · OR + · one fewer each time',A.H*.55);return}
 ({wear:drawWear,grow:drawGrow,andor:drawAndOr,list:drawList,code:drawCode})[k]();A.fx.draw(A.ctx)}
function down(p){const k=stage();
 if(k==='wear'){const t=topsR().find(r=>inR(p,r));if(t)wear('t',t.i);const b=botsR().find(r=>inR(p,r));if(b)wear('b',b.i);return false}
 if(k==='grow'){const b=bars().find(r=>inR(p,r));if(b){W.hold={i:b.i,y:p.y};return true}return false}
 if(k==='andor'&&W.andor.n<ANDOR.length){if(inR(p,cardR())){W.hold={x:p.x,y:p.y};return true}const b=bins(AOBIN,A.H*.4).find(r=>inR(p,r));if(b)andor(b.j);return false}
 if(k==='list'){list(cellAt(p));return false}
 if(k==='code'&&W.code.n<CODES.length){if(inR(p,chk())){check();return false}const r=slots().find(r=>inR(p,r));if(r){W.hold={i:r.i,y:p.y,v:W.code.v[r.i]};return true}}return false}
function move(p){const h=W.hold;if(!h)return;const k=stage();
 if(k==='grow'){const b=bars()[h.i];set(h.i,Math.round(6*(b.y+b.h-p.y)/b.h))}
 else if(k==='code'){const v=Math.max(1,Math.min(10,h.v+Math.round((h.y-p.y)/q(12))));if(v!==W.code.v[h.i]){W.code.v[h.i]=v;W.code.bad=null;A.redraw()}}
 else{h.x=p.x;h.y=p.y;A.redraw()}}
function up(p){const h=W.hold;W.hold=null;if(!h)return;const k=stage();if(k==='andor'){const b=bins(AOBIN,A.H*.4).find(r=>inR(p,r));if(b)andor(b.j);else A.redraw()}
 else if(k==='code')talk(`Place ${h.i+1}: ${W.code.v[h.i]} choices.`);else A.redraw()}
function wipe(){ver++;for(const k in W)delete W[k];Object.assign(W,{wear:{got:new Set(),pick:null},grow:{n:0,v:[1,1,1]},andor:{n:0},list:{got:new Set()},code:{n:0,v:[1,1,1]},hold:null,test:()=>{}})}
function talk(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();W.test()}
function arm(i,desc,ok,msg){wipe();talk(desc);W.test=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function run(i,acts,ms){steps[i].go();const me=ver;acts.forEach((f,j)=>setTimeout(()=>{if(me===ver)f()},ms*(j+1)))}
function keys(){if(!tray)return;tray.innerHTML='';const k=stage(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},tray,t).onclick=f};
 if(k==='wear'&&W.wear.got.size<6){TOPS.forEach((t,i)=>b(t+' top',()=>wear('t',i)));BOTS.forEach((t,i)=>b(t,()=>wear('b',i),`Pair the chosen top with ${t}`))}
 if(k==='grow'&&W.grow.n<GOAL.length)[0,1,2].forEach(i=>{b(`stage ${i+1} −`,()=>set(i,W.grow.v[i]-1),`Stage ${i+1}: one fewer option`);b(`stage ${i+1} +`,()=>set(i,W.grow.v[i]+1),`Stage ${i+1}: one more option`)});
 if(k==='andor'&&W.andor.n<ANDOR.length)AOBIN.forEach((t,j)=>b(t.split(':')[0],()=>andor(j),`${ANDOR[W.andor.n][0]}: ${t}`));
 if(k==='list'&&W.list.got.size<6)ABC.forEach(x=>ABC.forEach(y=>b(x+y,()=>list(x+y),`Code ${x}${y}`)));
 if(k==='code'&&W.code.n<CODES.length){[0,1,2].forEach(i=>{b(`place ${i+1} −`,()=>tweak(i,-1),`Place ${i+1}: one fewer choice`);b(`place ${i+1} +`,()=>tweak(i,1),`Place ${i+1}: one more choice`)});b('Check',check)}}
const steps=[
{h:'Every outfit',p:'You have 3 tops and 2 pairs of trousers. Make every outfit once: tap a top, then the trousers. Watch how the outfits line up.',
predict:{q:'3 tops and 2 pairs of trousers. How many different outfits?',opts:['5, because 3 + 2','6, because 3 × 2'],ans:1},task:'Make all 6 outfits',
show:()=>run(0,[0,1,2].flatMap(i=>[0,1].flatMap(j=>[()=>wear('t',i),()=>wear('b',j)])),240),
go:()=>arm(0,'Tap a top, then jeans or shorts.',()=>W.wear.got.size>=6,'One outfit for every top–trouser pair.')},
{h:'Grow the choices',p:'Each stage of choices multiplies the total. Drag a bar up or down to set its options, and hit each target exactly.',task:'Hit all 3 targets',
show:()=>run(1,GOAL.map((g,k)=>()=>hitGoal(k)),700),
go:()=>arm(1,'Target 12. Each bar is a stage of choices. Total is the product.',()=>W.grow.n>=GOAL.length,'Total = options × options × options.')},
{h:'AND or OR?',p:'If you make one choice AND then another, multiply. If you make only ONE choice, from this group OR that one, add. Drag each situation to a box.',
predict:{q:'A café has 4 sandwiches and 3 soups. You buy ONE item. How many choices?',opts:['12, because 4 × 3','7, because 4 + 3'],ans:1},task:'Sort all 6',
show:()=>run(2,ANDOR.map(x=>()=>andor(x[1])),420),
go:()=>arm(2,'Pick a sandwich AND a drink. Multiply or add?',()=>W.andor.n>=ANDOR.length,'AND multiplies; OR adds.')},
{h:'No repeats',p:'Make 2-letter codes from A, B and C, using no letter twice. Tap every code that is allowed.',task:'List all 6 codes',
show:()=>run(3,['AB','AC','BA','BC','CA','CB'].map(k=>()=>list(k)),400),
go:()=>arm(3,'Rows give the 1st letter, columns the 2nd. Tap every allowed code.',()=>W.list.got.size>=6,'A used letter cannot come again.')},
{h:'Count the codes',p:'Count the choices for each place, then multiply. Drag a box up or down, or use the buttons, then press Check.',task:'Count all 4 codes',
show:()=>run(4,CODES.map((x,k)=>()=>setCode(k)),600),
go:()=>arm(4,'3-digit lock, digits 0 to 9, repeats allowed. Set the choices for each place.',()=>W.code.n>=CODES.length,'Choices per place, multiplied.')},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W.test()});
const QS=[
{q:'4 starters, 5 mains and 3 desserts. How many three-course meals?',a:'60',o:[['12','add'],['20','stage']]},
{q:'A PIN has 4 digits, 0 to 9, and digits may repeat. How many PINs?',a:'10 000',o:[['40','add'],['5040','norep']]},
{q:'You pick ONE fruit: one of 3 apples or one of 4 pears. How many choices?',a:'7',o:[['12','mult'],['3','one']]},
{q:'5 runners race. How many ways can gold and silver be given?',a:'20',o:[['25','rep'],['10','order']]},
{q:'2-letter codes from A, B, C, D, no letter used twice. How many?',a:'12',o:[['16','rep'],['8','add']]},
{q:'You add a stage with only 1 option. What happens to the total?',a:'It stays the same (× 1)',o:[['It goes up by 1','plus'],['It doubles','double']]}];
function why(t){let m='Count the choices at each stage, then decide: AND multiplies, OR adds.';
 switch(t){case 'add':m='Those choices happen one after another (AND), so multiply, do not add.';break;
 case 'stage':m='That leaves out a stage. Multiply all three: 4 × 5 × 3.';break;
 case 'norep':m='Repeats are allowed here, so every digit has all 10 choices: 10 × 10 × 10 × 10.';break;
 case 'mult':m='You choose only ONE fruit, from one group OR the other, so add: 3 + 4.';break;
 case 'one':m='The apples are not the only option. Count both groups: 3 + 4.';break;
 case 'rep':m='One runner cannot win both medals. After gold, only 4 are left: 5 × 4.';break;
 case 'order':m='Gold then silver is a different result from the other way round, so do not halve.';break;
 case 'plus':m='Stages multiply. Multiplying by 1 changes nothing.';break;
 case 'double':m='Doubling needs a stage with 2 options. × 1 leaves the total the same.';break}
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=cq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+why(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:B=>{cq.hidden=B.step!==5;tray.hidden=B.step===5;keys()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);tray=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Counting buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});keys()}}).start()})})();
