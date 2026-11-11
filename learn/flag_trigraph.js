/* Flagship – trigraphs (ages 5–6; NC England Year 1 phonics: igh, air, ear, are, three letters for one phoneme;
   Letters and Sounds Phase 3; ear says two sounds, as in hear and bear).
   Drop a three-letter chunk into a picture word, count phonemes (not letters), tap all three letters of the trigraph,
   sort ear words by the sound they make, and mend a spelling that splits the chunk. Big tiles, tiny words.
   Not flagdgraph (two-letter consonant digraphs), flagvowel (vowel teams) or flagmagice (split digraphs). */
(()=>{
const CHUNK=['igh','air','ear','are'];
const BUILD=[{pre:'n',post:'t',tri:'igh',pic:'moon'},{pre:'ch',post:'',tri:'air',pic:'chair'},{pre:'l',post:'t',tri:'igh',pic:'bulb'},
{pre:'h',post:'',tri:'ear',pic:'ear'},{pre:'squ',post:'',tri:'are',pic:'square'}];
const REAL={hair:'Hair grows on your head.',hare:'A hare is like a big rabbit.'};
const SOUNDS=[{w:'night',p:['n','igh','t']},{w:'chair',p:['ch','air']},{w:'high',p:['h','igh']},{w:'fear',p:['f','ear']},{w:'light',p:['l','igh','t']}];
const SPOT=[{w:'right',at:1},{w:'hair',at:1},{w:'dear',at:1},{w:'share',at:2},{w:'sight',at:1}];
const EARS=[['near',0],['bear',1],['fear',0],['pear',1],['year',0],['wear',1]];
const MEND=[{t:['I','sit','on','a','chare','.'],bad:4,good:'chair',why:'chare is not how we write it. chair uses a, i, r for the air sound.'},
{t:['It','is','nite','.'],bad:2,good:'night',why:'nite is a slip. The sound igh is three letters: n, igh, t.'},
{t:['I','can','heer','you','.'],bad:2,good:'hear',why:'heer is a slip. hear uses e, a, r for the ear sound.'},
{t:['The','sun','is','brite','.'],bad:3,good:'bright',why:'brite is a slip. bright has igh in the middle: b, r, igh, t.'}];
VIS.reg('flagtgraph',c=>{let A,keys,chal,turn=-1,epoch=0;const G={};c.fig.classList.add('young');
const DK='#1f2937',YES='#047857',OOPS='#b91c1c',LINE='#6b7280',TRI='#6d28d9',TRIF='#ede9fe',WARM='#9a3412',WARMF='#ffedd5',HELD='#1d4ed8';
const font=(n,b)=>`${b||800} ${n}px system-ui,sans-serif`,sz=n=>A.narrow?n:Math.round(n*1.22),centre=g=>{g.textAlign='center';g.textBaseline='middle'};
const now=()=>['build','count','spot','ear','mend','quiz'][A.step],within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const good=()=>A.sound.pop(),bad=()=>A.sound.miss();
function wash(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#f5f3ff',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H)}
function banner(t,y,ok,n){const g=A.ctx;let px=sz(n||14);g.font=font(px);let w=g.measureText(t).width+28;while(w>A.W-10&&px>10){px--;g.font=font(px);w=g.measureText(t).width+28}
const h=px+16,x=Math.max(5,Math.min(A.W-w-5,A.W/2-w/2));g.fillStyle='#ffffff';A.paint.rrect(x,y-h/2,w,h,8);g.fill();g.lineWidth=ok?3:1.5;g.strokeStyle=ok?YES:LINE;g.stroke();g.fillStyle=DK;centre(g);g.fillText(t,x+w/2,y+1)}
function card(r,t,o){o=o||{};const g=A.ctx;if(t==='.'){g.fillStyle=A.col.tx;g.font=font(Math.round(r.h*.5));centre(g);g.fillText(t,r.x+r.w/2,r.y+r.h/2);return}
g.fillStyle=o.bg||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=(o.ok||o.no||o.lift)?4:2;g.strokeStyle=o.ok?YES:o.no?OOPS:o.lift?HELD:LINE;
if(o.dash)g.setLineDash([7,5]);g.stroke();g.setLineDash([]);if(t==null)return;g.fillStyle=o.ink||DK;g.font=font(o.px||Math.round(r.h*.5));centre(g);g.fillText(t,r.x+r.w/2,r.y+r.h/2+2,r.w-6)}
function strip(n,y,s0){const gap=A.narrow?7:11,s=Math.min(s0||sz(60),(A.W-20-gap*(n-1))/n),x0=(A.W-(n*s+(n-1)*gap))/2;return Array.from({length:n},(_,i)=>({x:x0+i*(s+gap),y,w:s,h:s}))}
function words(ws,y){const g=A.ctx,px=sz(20);g.font=font(px);const hh=px+26,sp=7,wid=ws.map(s=>s==='.'?24:Math.max(46,g.measureText(s).width+20));
const tot=wid.reduce((a,b)=>a+b,0)+sp*(wid.length-1),k=Math.min(1,(A.W-14)/tot);let x=(A.W-tot*k)/2;return wid.map(w=>{const r={x,y,w:w*k,h:hh*Math.max(.8,k)};x+=(w+sp)*k;return r})}
/* tiny flat pictures so a young reader has a concrete clue */
function pic(kind,cx,cy,s){const g=A.ctx;g.save();g.lineWidth=3;g.strokeStyle=DK;g.lineJoin='round';
g.fillStyle='#ffffff';A.paint.rrect(cx-s*.62,cy-s*.62,s*1.24,s*1.24,14);g.fill();g.lineWidth=1.5;g.strokeStyle=LINE;g.stroke();g.lineWidth=3;g.strokeStyle=DK;
if(kind==='moon'){g.fillStyle='#1e3a8a';A.paint.rrect(cx-s*.55,cy-s*.55,s*1.1,s*1.1,12);g.fill();g.fillStyle='#fde68a';g.beginPath();g.arc(cx,cy,s*.32,0,7);g.fill();g.fillStyle='#1e3a8a';g.beginPath();g.arc(cx+s*.14,cy-s*.08,s*.28,0,7);g.fill();
g.fillStyle='#fde68a';[[-.35,-.32],[.3,.32],[-.25,.36]].forEach(([a,b])=>{g.beginPath();g.arc(cx+a*s,cy+b*s,s*.04,0,7);g.fill()})}
if(kind==='chair'){g.fillStyle='#b45309';g.fillRect(cx-s*.28,cy-s*.42,s*.1,s*.84);g.fillRect(cx-s*.28,cy,s*.56,s*.1);g.fillRect(cx+s*.18,cy,s*.1,s*.42);g.fillRect(cx-s*.28,cy-s*.42,s*.4,s*.1)}
if(kind==='bulb'){g.fillStyle='#fde047';g.beginPath();g.arc(cx,cy-s*.1,s*.28,0,7);g.fill();g.stroke();g.fillStyle='#9ca3af';g.fillRect(cx-s*.13,cy+s*.17,s*.26,s*.2);g.strokeRect(cx-s*.13,cy+s*.17,s*.26,s*.2)}
if(kind==='ear'){g.fillStyle='#fdba74';g.beginPath();g.ellipse(cx,cy,s*.26,s*.4,0,0,7);g.fill();g.stroke();g.beginPath();g.arc(cx+s*.02,cy-s*.06,s*.12,Math.PI*.9,Math.PI*2.3);g.stroke()}
if(kind==='square'){g.fillStyle='#93c5fd';g.fillRect(cx-s*.32,cy-s*.32,s*.64,s*.64);g.strokeRect(cx-s*.32,cy-s*.32,s*.64,s*.64)}
g.restore()}
/* step 1: drop the chunk into the word */
function buildLay(){const q=BUILD[Math.min(G.b.n,4)],cells=[...q.pre].length+1+[...q.post].length,u=Math.min(sz(54),(A.W-40)/(cells+1.4));
const tw=u*1.9,total=u*([...q.pre].length+[...q.post].length)+tw+8*(cells-1),x0=(A.W-total)/2,y=A.H*.42;let x=x0;const L=[];
[...q.pre].forEach(ch=>{L.push({ch,r:{x,y,w:u,h:u}});x+=u+8});const gap={x,y,w:tw,h:u};x+=tw+8;[...q.post].forEach(ch=>{L.push({ch,r:{x,y,w:u,h:u}});x+=u+8});
const bw=Math.min(sz(96),(A.W-50)/4),bh=sz(56),bx=(A.W-(4*bw+30))/2;return{L,gap,tiles:CHUNK.map((t,j)=>({x:bx+j*(bw+10),y:A.H*.76,w:bw,h:bh}))}}
function drawBuild(){const s=G.b;wash();if(s.n>=5){banner('5 words built',A.H*.08,1);BUILD.forEach((q,j)=>banner(`${q.pre}  ${q.tri}  ${q.post}  →  ${q.pre+q.tri+q.post}`,A.H*(.22+j*.14),1,17));return}
const q=BUILD[s.n],R=buildLay();banner(`Word ${s.n+1} of 5: drag in the 3 letters`,A.H*.08,0,13);pic(q.pic,A.W/2,A.H*.24,Math.min(sz(64),A.H*.17));
R.L.forEach(o=>card(o.r,o.ch,{px:Math.round(o.r.h*.55)}));card(R.gap,s.done?q.tri:null,{dash:!s.done,no:s.miss!=null,bg:TRIF,ink:TRI});
const d=G.drag;CHUNK.forEach((t,j)=>{const r=d&&d.j===j?{...R.tiles[j],x:d.x-R.tiles[j].w/2,y:d.y-R.tiles[j].h/2}:R.tiles[j];card(r,t,{bg:TRIF,ink:TRI,lift:d&&d.j===j,px:sz(22)})})}
function dropChunk(t){const s=G.b;if(s.n>=5)return;const q=BUILD[s.n],w=q.pre+q.tri+q.post;
if(t!==q.tri){s.miss=t;bad();const made=q.pre+t+q.post,twin=(t==='air'&&q.tri==='are')||(t==='are'&&q.tri==='air');
return say(twin?`${made} sounds right, but we write ${w} with ${q.tri}. air and are can make the same sound.`:REAL[made]?`${made} is a word, but not this one. ${REAL[made]} We want ${w}.`:`${q.pre}-${t}${q.post?'-'+q.post:''} is not a word. Look at the picture: ${w}. Say it slowly. Listen for ${q.tri}.`)}
s.n++;s.miss=null;good();say(`${q.pre} + ${q.tri}${q.post?' + '+q.post:''} = ${w}. The 3 letters ${[...q.tri].join(', ')} make 1 sound.`+(s.n>=5?' All 5 built.':''))}
/* step 2: how many sounds? */
const OPTS=[2,3,4,5];
function countKeys(){const w=Math.min(sz(68),(A.W-50)/4),x0=(A.W-(4*w+36))/2;return OPTS.map((v,i)=>({v,x:x0+i*(w+12),y:A.H*.7,w,h:w}))}
function drawCount(){const s=G.c,g=A.ctx;wash();if(s.n>=5){banner('All 5 counted',A.H*.08,1);SOUNDS.forEach((q,j)=>banner(`${q.w}:  ${q.p.join(' · ')}  =  ${q.p.length} sounds`,A.H*(.22+j*.14),1,15));return}
const q=SOUNDS[s.n],R=strip(q.w.length,A.H*.24,sz(56));banner(`Word ${s.n+1} of 5: how many sounds?`,A.H*.08,0,13);
[...q.w].forEach((ch,i)=>card(R[i],ch,{px:Math.round(R[i].h*.55)}));g.fillStyle=A.col.tx;g.font=font(sz(13),700);centre(g);g.fillText(`${q.w.length} letters. Sounds, not letters!`,A.W/2,R[0].y+R[0].h+20);
countKeys().forEach(r=>card(r,String(r.v),{no:s.miss===r.v,px:Math.round(r.h*.5)}))}
function pickCount(v){const s=G.c;if(s.n>=5)return;const q=SOUNDS[s.n],k=q.p.length;
if(v!==k){s.miss=v;bad();return say(v===q.w.length?`${v} is the number of letters. Some letters team up. Say it: ${q.p.join(', ')}.`:`Not ${v}. Say it slowly and hold up a finger for each sound: ${q.p.join(', ')}.`)}
s.n++;s.miss=null;good();say(`${q.w}: ${q.p.join(', ')}. That is ${k} sounds from ${q.w.length} letters.`+(s.n>=5?' All 5 counted.':''))}
/* step 3: tap all three letters of the trigraph */
function spotTiles(){return strip(SPOT[Math.min(G.s.n,4)].w.length,A.H*.4,sz(62))}
function drawSpot(){const s=G.s;wash();if(s.n>=5){banner('All 5 found',A.H*.08,1);SPOT.forEach((q,j)=>banner(`${q.w}:  ${q.w.slice(q.at,q.at+3)}`,A.H*(.22+j*.14),1,16));return}
const q=SPOT[s.n],R=spotTiles();banner(`Word ${s.n+1} of 5: tap the 3 letters that make 1 sound`,A.H*.08,0,13);
[...q.w].forEach((ch,i)=>{const on=s.got.includes(i);card(R[i],ch,{ok:on,no:s.miss===i,bg:on?TRIF:null,ink:on?TRI:DK,px:Math.round(R[i].h*.56)})});
if(s.got.length===3){const g=A.ctx,a=R[q.at],b=R[q.at+2];g.strokeStyle=TRI;g.lineWidth=4;g.beginPath();g.moveTo(a.x+4,a.y+a.h+10);g.lineTo(b.x+b.w-4,b.y+b.h+10);g.stroke()}
banner(`Found ${s.got.length} of 3`,A.H*.84,s.got.length===3,12)}
function tapSpot(i){const s=G.s;if(s.n>=5)return;const q=SPOT[s.n];if(s.got.includes(i))return;
if(i<q.at||i>q.at+2){s.miss=i;bad();return say(`${q.w[i]} is not in the team. Look for igh, air, ear or are.`)}
s.got.push(i);s.miss=null;good();if(s.got.length<3)return say(`${q.w[i]}: yes. ${3-s.got.length} more.`);
const t=q.w.slice(q.at,q.at+3);s.n++;s.got=[];say(`${t} in ${q.w}: 3 letters, 1 sound.`+(s.n>=5?' All 5 found.':''))}
/* step 4: two sounds for ear */
function earBins(){const w=(A.W-30)/2,h=A.H*.34;return[{x:10,y:A.H*.6,w,h},{x:20+w,y:A.H*.6,w,h}]}
function earCard(){const w=Math.min(sz(170),A.W*.5),h=sz(62);return{x:A.W/2-w/2,y:A.H*.24,w,h}}
function drawEar(){const s=G.e,g=A.ctx;wash();banner(s.n>=6?'All 6 sorted':`Card ${s.n+1} of 6: which sound does ear make?`,A.H*.08,s.n>=6,13);
earBins().forEach((r,j)=>{g.fillStyle=j?WARMF:TRIF;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=j?WARM:TRI;g.lineWidth=2.5;g.stroke();g.fillStyle=DK;g.font=font(sz(17));g.textAlign='center';g.textBaseline='top';
g.fillText(j?'like bear':'like hear',r.x+r.w/2,r.y+8,r.w-8);g.font=font(sz(15),700);const got=EARS.slice(0,s.n).filter(x=>x[1]===j).map(x=>x[0]);g.fillText(got.join('  '),r.x+r.w/2,r.y+r.h*.45,r.w-8)});
if(s.n<6){const r=earCard(),d=G.drag;card(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,EARS[s.n][0],{lift:!!d,no:s.miss,px:sz(28)})}}
function sortEar(j){const s=G.e;if(s.n>=6)return;const [w,b]=EARS[s.n];
if(j!==b){s.miss=1;bad();return say(b?`Say ${w}. It rhymes with bear and chair, not with hear.`:`Say ${w}. It rhymes with hear and dear, not with bear.`)}
s.n++;s.miss=0;good();say(`${w}: ear sounds like ${b?'air, as in bear':'ear, as in hear'}.`+(s.n>=6?' All 6 sorted.':''))}
/* step 5: mend the spelling */
function drawMend(){const s=G.m;wash();if(s.n>=4){banner('All 4 mended',A.H*.08,1);MEND.forEach((q,j)=>banner(q.t.map((w,i)=>i===q.bad?q.good:w).join(' ').replace(' .','.'),A.H*(.25+j*.16),1,16));return}
const q=MEND[s.n],R=words(q.t,A.H*.38);banner(`Line ${s.n+1} of 4: one word is spelt wrong. Tap it.`,A.H*.08,0,13);
q.t.forEach((w,i)=>card(R[i],w,{bg:w==='.'?'transparent':null,no:s.miss===i,px:sz(19)}))}
function tapMend(i){const s=G.m;if(s.n>=4)return;const q=MEND[s.n];if(q.t[i]==='.')return;
if(i!==q.bad){s.miss=i;bad();return say(`${q.t[i]} is spelt right. Find the word that is missing its 3-letter team.`)}
s.n++;s.miss=null;good();say(`${q.t[i]} → ${q.good}. ${q.why}`+(s.n>=4?' All 4 mended.':''))}
function draw(){const k=now();if(k==='quiz'){wash();banner('Challenge',A.H*.2,1);banner('igh · air · ear · are',A.H*.5,0,20);return}
({build:drawBuild,count:drawCount,spot:drawSpot,ear:drawEar,mend:drawMend})[k]();A.fx.draw(A.ctx)}
function down(p){const k=now();
if(k==='build'&&G.b.n<5){const j=buildLay().tiles.findIndex(r=>within(p,r));if(j>=0){G.drag={j,x:p.x,y:p.y};return true}return false}
if(k==='count'&&G.c.n<5){const r=countKeys().find(r=>within(p,r));if(r)pickCount(r.v);return false}
if(k==='spot'&&G.s.n<5){const i=spotTiles().findIndex(r=>within(p,r));if(i>=0)tapSpot(i);return false}
if(k==='ear'&&G.e.n<6){if(within(p,earCard())){G.drag={x:p.x,y:p.y};return true}const b=earBins().findIndex(r=>within(p,r));if(b>=0)sortEar(b);return false}
if(k==='mend'&&G.m.n<4){const i=words(MEND[G.m.n].t,A.H*.38).findIndex(r=>within(p,r));if(i>=0)tapMend(i)}return false}
function move(p){if(!G.drag)return;G.drag.x=p.x;G.drag.y=p.y;A.redraw()}
function lift(p){const d=G.drag;if(!d)return;G.drag=null;const k=now();
if(k==='build'){const R=buildLay(),gp=R.gap;if(within(p,{x:gp.x-26,y:gp.y-26,w:gp.w+52,h:gp.h+52})||within(p,R.tiles[d.j]))dropChunk(CHUNK[d.j]);else A.redraw();return}
const b=earBins().findIndex(r=>within(p,r));if(b>=0)sortEar(b);else A.redraw()}
function reset(){epoch++;for(const k in G)delete G[k];Object.assign(G,{b:{n:0},c:{n:0},s:{n:0,got:[]},e:{n:0},m:{n:0},drag:null,check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pad();G.check()}
function begin(i,desc,ok,msg){reset();say(desc);G.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(me===epoch)f()},ms*(j+1)))}
function pad(){if(!keys)return;keys.innerHTML='';const k=now(),K=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
if(k==='build'&&G.b.n<5){const q=BUILD[G.b.n];CHUNK.forEach(t=>K(t,()=>dropChunk(t),`Put ${t} after ${q.pre}`))}
if(k==='count'&&G.c.n<5)OPTS.forEach(v=>K(String(v),()=>pickCount(v),`${v} sounds`));
if(k==='spot'&&G.s.n<5){const q=SPOT[G.s.n];[...q.w].forEach((ch,i)=>{if(!G.s.got.includes(i))K(ch,()=>tapSpot(i),`Letter ${i+1}: ${ch}`)})}
if(k==='ear'&&G.e.n<6){K('like hear',()=>sortEar(0),'ear sounds like hear');K('like bear',()=>sortEar(1),'ear sounds like bear')}
if(k==='mend'&&G.m.n<4)MEND[G.m.n].t.forEach((w,i)=>{if(w!=='.')K(w,()=>tapMend(i),`Is ${w} spelt wrong?`)})}
const steps=[
{h:'Three letters, one sound',p:'Some sounds need 3 letters. igh, air, ear and are are each 1 sound. We call them trigraphs. Look at the picture and drag in the 3 letters.',
predict:{q:'In night, do i, g and h each make a sound?',opts:['Yes, 3 sounds','No, igh is 1 sound'],ans:1},task:'Build all 5 words',
show:()=>auto(0,BUILD.map(q=>()=>dropChunk(q.tri)),650),
go:()=>begin(0,'A moon picture. Letters n, gap, t. Chunks to drag: igh, air, ear, are.',()=>G.b.n>=5,'igh, air, ear and are: 3 letters, 1 sound.')},
{h:'Count the sounds',p:'Say the word slowly. Hold up 1 finger for each sound. The 3 letters of a trigraph get just 1 finger.',
predict:{q:'chair has 5 letters. How many sounds?',opts:['5 sounds','2 sounds: ch, air'],ans:1},task:'Count all 5 words',
show:()=>auto(1,SOUNDS.map(q=>()=>pickCount(q.p.length)),650),
go:()=>begin(1,'The word night, 5 letters. How many sounds? Pick 2, 3, 4 or 5.',()=>G.c.n>=5,'Count sounds, not letters: night is n, igh, t.')},
{h:'Find the trigraph',p:'Tap the 3 letters that work as a team.',task:'Find all 5 trigraphs',
show:()=>auto(2,SPOT.flatMap(q=>[0,1,2].map(d=>()=>tapSpot(q.at+d))),240),
go:()=>begin(2,'The word right, 5 letters. Tap the 3 that make 1 sound.',()=>G.s.n>=5,'igh in right and sight, air in hair, ear in dear, are in share.')},
{h:'Two sounds for ear',p:'ear can say ear, as in hear. It can also say air, as in bear. Say the word, then drag it to the box.',
predict:{q:'Does ear always sound like hear?',opts:['Yes, always','No: in bear it sounds like air'],ans:1},task:'Sort all 6 words',
show:()=>auto(3,EARS.map(x=>()=>sortEar(x[1])),550),
go:()=>begin(3,'Card: near. Boxes: like hear, or like bear.',()=>G.e.n>=6,'near, fear and year say ear. bear, pear and wear say air.')},
{h:'Mend the spelling',p:'One word in each line splits or swaps its 3-letter team. Tap it to fix it.',task:'Mend all 4 lines',
show:()=>auto(4,MEND.map(q=>()=>tapMend(q.bad)),750),
go:()=>begin(4,'I sit on a chare. Each word is a tile.',()=>G.m.n>=4,'chair, night, hear, bright.')},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.check()});
const QS=[
{q:'How many sounds in light?',a:'3',o:[['5','letters'],['4','split']]},
{q:'Which 3 letters make 1 sound in chair?',a:'air',o:[['cha','cha'],['hai','hai']]},
{q:'Which word has ear like in hear?',a:'fear',o:[['bear','bear'],['pear','bear']]},
{q:'Which is spelt right?',a:'night',o:[['nite','nite'],['nigt','nogh']]},
{q:'In high, what do i, g, h say together?',a:'igh, like in night',o:[['i, g, h, one by one','each'],['g, like in go','g']]},
{q:'Which word has are, like in square?',a:'care',o:[['chair','air'],['hear','ear']]}];
function why(t){let m='Look for igh, air, ear or are: 3 letters, 1 sound.';
if(t==='letters')m='5 is how many letters. igh is 1 sound, so light is l, igh, t: 3 sounds.';
if(t==='split')m='i, g, h are not 2 sounds. igh is 1 sound: l, igh, t.';
if(t==='cha')m='ch is its own sound. The team after it is air: ch, air.';
if(t==='hai')m='h is part of ch. The 3-letter team is air.';
if(t==='bear')m='In that word, ear says air, like bear. fear says ear, like hear.';
if(t==='nite')m='nite is a slip. igh needs all 3 letters: night.';
if(t==='nogh')m='nigt is missing the h. igh is 3 letters: night.';
if(t==='each')m='They do not make 3 sounds. i, g, h team up to say igh.';
if(t==='g')m='The g does not say g here. igh is 1 sound, the same as in night.';
if(t==='air')m='chair sounds the same but uses a, i, r. care uses a, r, e.';
if(t==='ear')m='hear has ear, not are. care uses a, r, e.';
return m}
function next(){turn++;const Q=QS[turn%QS.length],all=[[Q.a,'ok'],...Q.o],r=turn%3,ord=all.slice(r).concat(all.slice(0,r));
chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const bx=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},bx,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else bad();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:B=>{chal.hidden=B.step!==5;keys.hidden=B.step===5;pad()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Trigraph buttons'},bx);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up:lift});pad()}}).start()})})();
