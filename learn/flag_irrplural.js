/* Flagship – irregular plural nouns (ages 7–9; NC England Y1–2 plurals -s/-es and irregular forms; CCSS L.2.1b
   form and use frequently occurring irregular plural nouns: feet, children, teeth, mice, fish; L.2.1a collective nouns).
   Test whether plain -s works, swap the vowels inside foot/tooth/goose/man/mouse, sort nouns into change-inside,
   add-en and no-change families, catch over-regularised plurals (mouses, tooths, childs), and name groups with
   collective nouns. Not flagplural (regular -s and -es plurals). */
(()=>{
const TEST=[['cat','cats',0],['mouse','mice',1],['book','books',0],['tooth','teeth',1],['dog','dogs',0],['child','children',1]];
const SWAP=[{w:'foot',a:1,b:3,put:'ee',out:'feet'},{w:'tooth',a:1,b:3,put:'ee',out:'teeth'},{w:'goose',a:1,b:3,put:'ee',out:'geese'},
{w:'man',a:1,b:2,put:'e',out:'men'},{w:'mouse',a:1,b:5,put:'ice',out:'mice'}];
const PARTS=['ee','e','ice'];
const FAM=[['tooth','teeth',0],['child','children',1],['sheep','sheep',2],['woman','women',0],['ox','oxen',1],['deer','deer',2]];
const FAMS=['Changes inside','Adds en','Stays the same'];
const SLIP=[{t:['Two','mouses','ran','.'],bad:1,good:'mice',why:'mouse has an irregular plural. It changes inside: mice.'},
{t:['I','brush','my','tooths','.'],bad:3,good:'teeth',why:'tooth does not take s. oo changes to ee: teeth.'},
{t:['The','childs','played','.'],bad:1,good:'children',why:'child adds ren, not s: children.'},
{t:['Three','sheeps','ate','grass','.'],bad:1,good:'sheep',why:'sheep stays the same for one or many: three sheep.'},
{t:['My','foots','are','cold','.'],bad:1,good:'feet',why:'foot changes inside: feet.'}];
const GROUP=[{of:'birds',a:'flock'},{of:'wolves',a:'pack'},{of:'cows',a:'herd'},{of:'bees',a:'swarm'}];
const NAMES=['flock','pack','herd','swarm'],USE={flock:'birds or sheep',pack:'wolves or dogs',herd:'cows or elephants',swarm:'bees or flies'};
VIS.reg('flagirrpl',c=>{let A,ctl,qbox,qk=-1,gen=0;const Z={};c.fig.classList.add('young');
const TXT='#111827',RIGHT='#047857',WRONG='#b91c1c',RULE='#6b7280',ONE='#0f766e',ONEF='#ccfbf1',MANY='#7e22ce',MANYF='#f3e8ff',GRAB='#1d4ed8';
const ft=(n,w)=>`${w||800} ${n}px system-ui,sans-serif`,big=n=>A.narrow?n:Math.round(n*1.2),mid=g=>{g.textAlign='center';g.textBaseline='middle'};
const stage=()=>['test','swap','fam','slip','group','quiz'][A.step],hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const yes=()=>A.sound.pop(),no=()=>A.sound.miss();
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#f0fdfa',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H)}
function head(t,y,ok,n){const g=A.ctx;let px=big(n||14);g.font=ft(px);let w=g.measureText(t).width+26;while(w>A.W-10&&px>10){px--;g.font=ft(px);w=g.measureText(t).width+26}
const h=px+16,x=Math.max(5,A.W/2-w/2);g.fillStyle='#ffffff';A.paint.rrect(x,y-h/2,w,h,h/2);g.fill();g.lineWidth=ok?3:1.5;g.strokeStyle=ok?RIGHT:RULE;g.stroke();g.fillStyle=TXT;mid(g);g.fillText(t,x+w/2,y+1)}
function chip(r,t,o){o=o||{};const g=A.ctx;if(t==='.'){g.fillStyle=A.col.tx;g.font=ft(Math.round(r.h*.5));mid(g);g.fillText(t,r.x+r.w/2,r.y+r.h/2);return}
g.fillStyle=o.bg||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,11);g.fill();g.lineWidth=(o.ok||o.no||o.held)?4:2;g.strokeStyle=o.ok?RIGHT:o.no?WRONG:o.held?GRAB:RULE;
if(o.dash)g.setLineDash([6,5]);g.stroke();g.setLineDash([]);if(t==null)return;g.fillStyle=o.ink||TXT;g.font=ft(o.px||Math.round(r.h*.46));mid(g);g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-8)}
function sentence(ws,y){const g=A.ctx,px=big(20);g.font=ft(px);const hh=px+26,sp=7,wd=ws.map(s=>s==='.'?24:Math.max(46,g.measureText(s).width+20));
const tot=wd.reduce((a,b)=>a+b,0)+sp*(wd.length-1),k=Math.min(1,(A.W-14)/tot);let x=(A.W-tot*k)/2;return wd.map(w=>{const r={x,y,w:w*k,h:hh*Math.max(.8,k)};x+=(w+sp)*k;return r})}
function dropIn(p,r,pad){return hit(p,{x:r.x-pad,y:r.y-pad,w:r.w+2*pad,h:r.h+2*pad})}
/* step 1: does plain s work? */
function testZones(){const w=(A.W-30)/2,h=A.H*.3;return[{x:10,y:A.H*.62,w,h},{x:20+w,y:A.H*.62,w,h}]}
function testCard(){const w=Math.min(big(170),A.W*.5),h=big(62);return{x:A.W/2-w/2,y:A.H*.24,w,h}}
function drawTest(){const s=Z.t,g=A.ctx;ground();head(s.k>=6?'All 6 tested':`Noun ${s.k+1} of 6: one ${TEST[Math.min(s.k,5)][0]}, two …?`,A.H*.08,s.k>=6,13);
testZones().forEach((r,j)=>{g.fillStyle=j?MANYF:ONEF;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=j?MANY:ONE;g.lineWidth=2.5;g.stroke();g.fillStyle=TXT;g.font=ft(big(15));g.textAlign='center';g.textBaseline='top';
g.fillText(j?'The word changes':'Just add s',r.x+r.w/2,r.y+8,r.w-8);g.font=ft(big(14),700);const got=TEST.slice(0,s.k).filter(x=>x[2]===j).map(x=>x[1]);
for(let n=0;n<got.length;n+=2)g.fillText(got.slice(n,n+2).join('  '),r.x+r.w/2,r.y+r.h*.36+n*big(11),r.w-8)});
if(s.k<6){const r=testCard(),d=Z.drag;chip(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,TEST[s.k][0],{held:!!d,no:s.miss,bg:ONEF,ink:ONE,px:big(26)})}}
function judgeTest(j){const s=Z.t;if(s.k>=6)return;const [one,many,b]=TEST[s.k];
if(j!==b){s.miss=1;no();return say(b?`${one}s is a slip. We do not say ${one}s. One ${one}, two ${many}.`:`${one} is a regular noun. Just add s: ${many}.`)}
s.k++;s.miss=0;yes();say(`One ${one}, two ${many}. `+(b?'An irregular plural: the word changes.':'A regular plural: add s.')+(s.k>=6?' All 6 tested.':''))}
/* step 2: change the letters inside */
function swapLay(){const q=SWAP[Math.min(Z.s.k,4)],n=q.w.length,gap=A.narrow?6:10,u=Math.min(big(58),(A.W-30-gap*(n-1))/n),x0=(A.W-(n*u+(n-1)*gap))/2;
const L=[...q.w].map((ch,i)=>({ch,r:{x:x0+i*(u+gap),y:A.H*.3,w:u,h:u}}));const pw=Math.min(big(96),(A.W-40)/3);
return{L,zone:{x:L[q.a].r.x,y:L[q.a].r.y,w:L[q.b-1].r.x+u-L[q.a].r.x,h:u},parts:PARTS.map((t,j)=>({x:(A.W-(3*pw+20))/2+j*(pw+10),y:A.H*.7,w:pw,h:big(56)}))}}
function drawSwap(){const s=Z.s;ground();if(s.k>=5){head('5 plurals made',A.H*.08,1);SWAP.forEach((q,j)=>head(`one ${q.w}  →  two ${q.out}`,A.H*(.22+j*.14),1,16));return}
const q=SWAP[s.k],R=swapLay();head(`${s.k+1} of 5: one ${q.w}, two …? Drag in the new middle.`,A.H*.08,0,13);
R.L.forEach((o,i)=>{const inside=i>=q.a&&i<q.b;chip(o.r,o.ch,{bg:inside?ONEF:null,ink:inside?ONE:TXT,no:inside&&s.miss!=null,px:Math.round(o.r.h*.55)})});
const g=A.ctx;g.strokeStyle=ONE;g.lineWidth=3;g.setLineDash([5,4]);g.strokeRect(R.zone.x-4,R.zone.y-4,R.zone.w+8,R.zone.h+8);g.setLineDash([]);
g.fillStyle=A.col.tx;g.font=ft(big(13),700);mid(g);g.fillText('Swap the letters in the dashed box',A.W/2,R.zone.y+R.zone.h+24);
const d=Z.drag;PARTS.forEach((t,j)=>{const r=d&&d.j===j?{...R.parts[j],x:d.x-R.parts[j].w/2,y:d.y-R.parts[j].h/2}:R.parts[j];chip(r,t,{bg:MANYF,ink:MANY,held:d&&d.j===j,px:big(24)})})}
function swapIn(t){const s=Z.s;if(s.k>=5)return;const q=SWAP[s.k];
if(t!==q.put){s.miss=t;no();const made=q.w.slice(0,q.a)+t+q.w.slice(q.b);return say(`${made} is not right. Say it: one ${q.w}, two ${q.out}. Listen to the middle sound.`)}
s.k++;s.miss=null;yes();say(`${q.w} → ${q.out}. The middle changes and there is no s on the end.`+(s.k>=5?' All 5 made.':''))}
/* step 3: three families */
function famBins(){const w=(A.W-40)/3,h=A.H*.34;return FAMS.map((_,j)=>({x:10+j*(w+10),y:A.H*.6,w,h}))}
function famCard(){const w=Math.min(big(160),A.W*.46),h=big(60);return{x:A.W/2-w/2,y:A.H*.24,w,h}}
function drawFam(){const s=Z.f,g=A.ctx;ground();head(s.k>=6?'All 6 sorted':`Noun ${s.k+1} of 6: how does it make its plural?`,A.H*.08,s.k>=6,13);
famBins().forEach((r,j)=>{g.fillStyle=MANYF;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=MANY;g.lineWidth=2.5;g.stroke();g.fillStyle=TXT;g.font=ft(big(13));g.textAlign='center';g.textBaseline='top';
g.fillText(FAMS[j],r.x+r.w/2,r.y+8,r.w-6);g.font=ft(big(13),700);FAM.slice(0,s.k).filter(x=>x[2]===j).forEach((x,n)=>g.fillText(`${x[0]} → ${x[1]}`,r.x+r.w/2,r.y+r.h*.32+n*big(19),r.w-6))});
if(s.k<6){const r=famCard(),d=Z.drag;chip(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,FAM[s.k][0],{held:!!d,no:s.miss,bg:ONEF,ink:ONE,px:big(26)})}}
function famPut(j){const s=Z.f;if(s.k>=6)return;const [one,many,b]=FAM[s.k];
if(j!==b){s.miss=1;no();return say(b===0?`Say one ${one}, two ${many}. The letters inside change.`:b===1?`Say one ${one}, two ${many}. It ends in en.`:`Say one ${one}, two ${many}. It does not change at all.`)}
s.k++;s.miss=0;yes();say(`One ${one}, two ${many}: ${FAMS[b].toLowerCase()}.`+(s.k>=6?' All 6 sorted.':''))}
/* step 4: catch the over-regularised plural */
function drawSlip(){const s=Z.l;ground();if(s.k>=5){head('All 5 fixed',A.H*.08,1);SLIP.forEach((q,j)=>head(q.t.map((w,i)=>i===q.bad?q.good:w).join(' ').replace(' .','.'),A.H*(.22+j*.14),1,16));return}
const q=SLIP[s.k],R=sentence(q.t,A.H*.38);head(`Line ${s.k+1} of 5: one plural is wrong. Tap it.`,A.H*.08,0,13);
q.t.forEach((w,i)=>chip(R[i],w,{bg:w==='.'?'transparent':null,no:s.miss===i,px:big(19)}))}
function slipTap(i){const s=Z.l;if(s.k>=5)return;const q=SLIP[s.k];if(q.t[i]==='.')return;
if(i!==q.bad){s.miss=i;no();return say(`${q.t[i]} is fine. Find the noun that should be plural but has the wrong form.`)}
s.k++;s.miss=null;yes();say(`${q.t[i]} → ${q.good}. ${q.why}`+(s.k>=5?' All 5 fixed.':''))}
/* step 5: name the group */
function groupLay(){const n=NAMES.length,w=Math.min(big(96),(A.W-50)/n),x0=(A.W-(n*w+(n-1)*10))/2;const ph=sentence(['a','____','of',GROUP[Math.min(Z.g.k,3)].of],A.H*.5);
return{ph,slot:ph[1],keys:NAMES.map((t,j)=>({x:x0+j*(w+10),y:A.H*.76,w,h:big(54)}))}}
function crowd(kind,y){const g=A.ctx,n=7;for(let i=0;i<n;i++){const x=A.W/2+(i-3)*Math.min(30,A.W/12),yy=y+(i%2?10:-6);const dk=A.col.dark;g.fillStyle=kind==='bees'?'#ca8a04':kind==='cows'?(dk?'#d6d3d1':'#57534e'):kind==='wolves'?(dk?'#cbd5e1':'#475569'):(dk?'#93c5fd':'#2563eb');
if(kind==='birds'){g.strokeStyle=g.fillStyle;g.lineWidth=3;g.beginPath();g.moveTo(x-9,yy-4);g.quadraticCurveTo(x-4,yy-10,x,yy);g.quadraticCurveTo(x+4,yy-10,x+9,yy-4);g.stroke()}
else{g.beginPath();g.ellipse(x,yy,kind==='bees'?6:11,kind==='bees'?4:7,0,0,7);g.fill()}}}
function drawGroup(){const s=Z.g;ground();if(s.k>=4){head('All 4 groups named',A.H*.08,1);GROUP.forEach((q,j)=>head(`a ${q.a} of ${q.of}`,A.H*(.26+j*.16),1,17));return}
const q=GROUP[s.k],R=groupLay();head(`Group ${s.k+1} of 4: drag in the word for the group`,A.H*.08,0,13);crowd(q.of,A.H*.28);
R.ph.forEach((r,i)=>i===1?chip(r,null,{dash:1,no:s.miss!=null}):chip(r,['a','','of',q.of][i],{px:big(19)}));
const d=Z.drag;NAMES.forEach((t,j)=>{const r=d&&d.j===j?{...R.keys[j],x:d.x-R.keys[j].w/2,y:d.y-R.keys[j].h/2}:R.keys[j];chip(r,t,{bg:ONEF,ink:ONE,held:d&&d.j===j,px:big(18)})})}
function nameGroup(t){const s=Z.g;if(s.k>=4)return;const q=GROUP[s.k];
if(t!==q.a){s.miss=t;no();return say(`We say a ${t} of ${USE[t]}. For ${q.of}, the group word is ${q.a}.`)}
s.k++;s.miss=null;yes();say(`a ${q.a} of ${q.of}. ${q.a} is a collective noun: one word for a whole group.`+(s.k>=4?' All 4 named.':''))}
function draw(){const k=stage();if(k==='quiz'){ground();head('Challenge',A.H*.2,1);head('one mouse · two mice',A.H*.5,0,20);return}
({test:drawTest,swap:drawSwap,fam:drawFam,slip:drawSlip,group:drawGroup})[k]();A.fx.draw(A.ctx)}
function down(p){const k=stage();
if(k==='test'&&Z.t.k<6){if(hit(p,testCard())){Z.drag={x:p.x,y:p.y};return true}const b=testZones().findIndex(r=>hit(p,r));if(b>=0)judgeTest(b);return false}
if(k==='swap'&&Z.s.k<5){const j=swapLay().parts.findIndex(r=>hit(p,r));if(j>=0){Z.drag={j,x:p.x,y:p.y};return true}return false}
if(k==='fam'&&Z.f.k<6){if(hit(p,famCard())){Z.drag={x:p.x,y:p.y};return true}const b=famBins().findIndex(r=>hit(p,r));if(b>=0)famPut(b);return false}
if(k==='slip'&&Z.l.k<5){const i=sentence(SLIP[Z.l.k].t,A.H*.38).findIndex(r=>hit(p,r));if(i>=0)slipTap(i);return false}
if(k==='group'&&Z.g.k<4){const j=groupLay().keys.findIndex(r=>hit(p,r));if(j>=0){Z.drag={j,x:p.x,y:p.y};return true}}return false}
function move(p){if(!Z.drag)return;Z.drag.x=p.x;Z.drag.y=p.y;A.redraw()}
function lift(p){const d=Z.drag;if(!d)return;Z.drag=null;const k=stage();
if(k==='test'){const b=testZones().findIndex(r=>hit(p,r));if(b>=0)judgeTest(b);else A.redraw();return}
if(k==='fam'){const b=famBins().findIndex(r=>hit(p,r));if(b>=0)famPut(b);else A.redraw();return}
if(k==='swap'){const R=swapLay();if(dropIn(p,R.zone,26)||hit(p,R.parts[d.j]))swapIn(PARTS[d.j]);else A.redraw();return}
if(k==='group'){const R=groupLay();if(dropIn(p,R.slot,26)||hit(p,R.keys[d.j]))nameGroup(NAMES[d.j]);else A.redraw()}}
function clear(){gen++;for(const k in Z)delete Z[k];Object.assign(Z,{t:{k:0},s:{k:0},f:{k:0},l:{k:0},g:{k:0},drag:null,check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();Z.check()}
function arm(i,desc,ok,msg){clear();say(desc);Z.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function keys(){if(!ctl)return;ctl.innerHTML='';const k=stage(),K=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
if(k==='test'&&Z.t.k<6){const w=TEST[Z.t.k][0];K('Just add s',()=>judgeTest(0),`${w}: just add s`);K('The word changes',()=>judgeTest(1),`${w}: the word changes`)}
if(k==='swap'&&Z.s.k<5)PARTS.forEach(t=>K(t,()=>swapIn(t),`${SWAP[Z.s.k].w}: put ${t} in the middle`));
if(k==='fam'&&Z.f.k<6)FAMS.forEach((t,j)=>K(t,()=>famPut(j),`${FAM[Z.f.k][0]}: ${t}`));
if(k==='slip'&&Z.l.k<5)SLIP[Z.l.k].t.forEach((w,i)=>{if(w!=='.')K(w,()=>slipTap(i),`Is ${w} wrong?`)});
if(k==='group'&&Z.g.k<4)NAMES.forEach(t=>K(t,()=>nameGroup(t),`a ${t} of ${GROUP[Z.g.k].of}`))}
const steps=[
{h:'Does s work?',p:'Most nouns add s to mean more than one. Some do not. Say one, then two, out loud. Drag the noun to the right box.',
predict:{q:'One mouse, two …?',opts:['mouses','mice'],ans:1},task:'Test all 6 nouns',
show:()=>demo(0,TEST.map(x=>()=>judgeTest(x[2])),600),
go:()=>arm(0,'Card: cat. Boxes: just add s, or the word changes.',()=>Z.t.k>=6,'cats, books, dogs add s. mice, teeth, children change.')},
{h:'Change the middle',p:'Some nouns change the letters inside instead of adding s. Drag the new middle into the dashed box.',
predict:{q:'One goose, two …?',opts:['gooses','geese'],ans:1},task:'Make all 5 plurals',
show:()=>demo(1,SWAP.map(q=>()=>swapIn(q.put)),650),
go:()=>arm(1,'The word foot. The letters o, o are in a dashed box. Drag ee, e or ice in.',()=>Z.s.k>=5,'feet, teeth, geese, men, mice: no s at all.')},
{h:'Three families',p:'Irregular plurals come in families. Some change inside, some add en, and some do not change at all.',
predict:{q:'One sheep, two …?',opts:['sheeps','sheep'],ans:1},task:'Sort all 6 nouns',
show:()=>demo(2,FAM.map(x=>()=>famPut(x[2])),550),
go:()=>arm(2,'Card: tooth. Boxes: changes inside, adds en, stays the same.',()=>Z.f.k>=6,'teeth and women change inside; children and oxen add en; sheep and deer stay the same.')},
{h:'Catch the slip',p:'Writers often add s to an irregular noun by mistake. Find the wrong plural and fix it.',task:'Fix all 5 lines',
show:()=>demo(3,SLIP.map(q=>()=>slipTap(q.bad)),700),
go:()=>arm(3,'Two mouses ran. Each word is a tile.',()=>Z.l.k>=5,'mice, teeth, children, sheep, feet.')},
{h:'Words for groups',p:'A collective noun is one word for a whole group, like a flock of birds. Drag the right group word into the gap.',task:'Name all 4 groups',
show:()=>demo(4,GROUP.map(q=>()=>nameGroup(q.a)),750),
go:()=>arm(4,'A picture of birds. a, gap, of birds. Words: flock, pack, herd, swarm.',()=>Z.g.k>=4,'a flock of birds, a pack of wolves, a herd of cows, a swarm of bees.')},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.check()});
const QS=[
{q:'One child, two …?',a:'children',o:[['childs','s'],['childrens','twice']]},
{q:'One foot, two …?',a:'feet',o:[['foots','s'],['feets','twice']]},
{q:'One deer, three …?',a:'deer',o:[['deers','same'],['dears','same']]},
{q:'Which sentence is right?',a:'The women sang.',o:[['The womans sang.','s'],['The womens sang.','twice']]},
{q:'One goose, two …?',a:'geese',o:[['gooses','s'],['geeses','twice']]},
{q:'a ___ of bees',a:'swarm',o:[['flock','flock'],['pack','pack']]}];
function why(t){let m='Say one, then two, out loud. Irregular nouns change instead of adding s.';
if(t==='s')m='Adding s is the rule for regular nouns. This one is irregular, so the word itself changes.';
if(t==='twice')m='That word is already plural. Do not add s as well: children, feet, women, geese.';
if(t==='same')m='deer does not change. One deer, three deer. dears means something else.';
if(t==='flock')m='A flock is for birds or sheep. Bees fly in a swarm.';
if(t==='pack')m='A pack is for wolves or dogs. Bees fly in a swarm.';
return m}
function ask(){qk++;const Q=QS[qk%QS.length],all=[[Q.a,'ok'],...Q.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
qbox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const bx=qbox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},bx,v).onclick=()=>check(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function check(t,a){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else no();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:B=>{qbox.hidden=B.step!==5;ctl.hidden=B.step===5;keys()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Plural buttons'},bx);qbox=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up:lift});keys()}}).start()})})();
