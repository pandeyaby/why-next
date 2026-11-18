/* Flagship – homophones (ages 7–9; NC England Appendix 1 Y3–4 homophones, /eɪ/ as ei, eigh, ey; Y2 there/their/they're).
   Meaning picks the spelling, swap test, clue letters inside words, build ay words, fix mix-ups. Not flagaltsp. */
(()=>{
const PAIRS=[{s:['Squeeze the','to stop the bike.'],ok:'brake',no:'break',pic:'bike',mean:{brake:'brake: stops a bike',break:'break: to smash'}},
{s:['I ate a','of pie.'],ok:'piece',no:'peace',pic:'pie',mean:{piece:'piece: a part',peace:'peace: calm'}},
{s:['A','flew over the hill.'],ok:'plane',no:'plain',pic:'plane',mean:{plane:'plane: it flies',plain:'plain: simple'}},
{s:['We had a','time at the fair.'],ok:'great',no:'grate',pic:'star',mean:{great:'great: very good',grate:'grate: to shred cheese'}},
{s:['The dog ate the','.'],ok:'meat',no:'meet',pic:'bone',mean:{meat:'meat: food',meet:'meet: come together'}}];
const TTT=[['___ coats are wet.','their'],['Put the bag over ___.','there'],['___ late for school!','they\'re'],['___ is a fox in the garden.','there'],['The twins lost ___ hats.','their'],['I think ___ hungry.','they\'re']];
const BINS=['there','their','they\'re'];
const HOOK=[{w:'hear',a:1,b:3,why:'You hear with your ear.'},{w:'meat',a:1,b:3,why:'You eat meat.'},{w:'piece',a:0,b:2,why:'A piece of pie.'},
{w:'there',a:1,b:4,why:'here, there, where: all places.'},{w:'heel',a:1,b:2,why:'ee, like the ee in feet. Your heel is on your foot.'}];
const AY=[{pre:'w',post:'',g:'eigh',out:'weigh'},{pre:'th',post:'',g:'ey',out:'they'},{pre:'v',post:'n',g:'ei',out:'vein'},
{pre:'',post:'t',g:'eigh',out:'eight'},{pre:'gr',post:'',g:'ey',out:'grey'},{pre:'r',post:'n',g:'ei',out:'rein'}];
const GR=['ei','eigh','ey'];
const SLIPS=[{t:['Press','the','break','.'],bad:2,fix:'brake',why:'break means smash. The stopping part is a brake.'},
{t:['Can','I','have','a','peace','of','cake','?'],bad:4,fix:'piece',why:'peace means calm. A part of a cake is a piece, like a piece of pie.'},
{t:['Their','is','a','cat','.'],bad:0,fix:'There',why:'Their means it belongs to them. For a place or "there is", write there.'},
{t:['Let\'s','meat','at','two','.'],bad:1,fix:'meet',why:'meat is food. To come together is to meet.'}];
VIS.reg('flaghphone',c=>{let A,ctl,qbox,qn=-1,gen=0;const S={};
const INK='#111827',GOOD='#065f46',BAD='#b91c1c',RIM='#6b7280',GRAB='#1d4ed8',HP='#0f766e',HPF='#ccfbf1',AYC='#7c2d12',AYF='#fed7aa';
const ff=(n,w)=>`${w||800} ${n}px system-ui,sans-serif`,big=n=>A.narrow?n:Math.round(n*1.2),mid=g=>{g.textAlign='center';g.textBaseline='middle'};
const stage=()=>['pair','ttt','hook','ay','slip','quiz'][A.step],hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const yay=()=>A.sound.pop(),nope=()=>A.sound.miss();
function paper(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#f0fdfa',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H)}
function head(t,y,ok,n){const g=A.ctx;let s=big(n||14);g.font=ff(s);let w=g.measureText(t).width+26;while(w>A.W-10&&s>10){s--;g.font=ff(s);w=g.measureText(t).width+26}
const h=s+16,x=Math.max(5,A.W/2-w/2);g.fillStyle='#ffffff';A.paint.rrect(x,y-h/2,w,h,9);g.fill();g.lineWidth=ok?3:1.5;g.strokeStyle=ok?GOOD:RIM;g.stroke();g.fillStyle=INK;mid(g);g.fillText(t,x+w/2,y+1)}
function chip(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,11);g.fill();g.lineWidth=(o.ok||o.no||o.held)?4:2;
g.strokeStyle=o.ok?GOOD:o.no?BAD:o.held?GRAB:RIM;if(o.dash)g.setLineDash([6,5]);g.stroke();g.setLineDash([]);if(t==null)return;g.fillStyle=o.ink||INK;g.font=ff(o.px||Math.round(r.h*.46));mid(g);g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-8)}
/* flat picture clue so the meaning, not the sound, picks the spelling */
function sketch(k,cx,cy,s){const g=A.ctx;g.save();g.fillStyle='#ffffff';A.paint.rrect(cx-s*.6,cy-s*.6,s*1.2,s*1.2,12);g.fill();g.strokeStyle=RIM;g.lineWidth=1.5;g.stroke();g.strokeStyle=INK;g.lineWidth=3;g.lineCap='round';
if(k==='bike'){[[-.28,.15],[.28,.15]].forEach(([a,b])=>{g.beginPath();g.arc(cx+a*s,cy+b*s,s*.2,0,7);g.stroke()});g.beginPath();g.moveTo(cx-s*.28,cy+s*.15);g.lineTo(cx,cy-s*.12);g.lineTo(cx+s*.28,cy+s*.15);g.moveTo(cx,cy-s*.12);g.lineTo(cx+s*.12,cy-s*.32);g.stroke();
g.fillStyle=BAD;g.beginPath();g.arc(cx+s*.14,cy-s*.33,s*.06,0,7);g.fill()}
if(k==='pie'){g.fillStyle='#f59e0b';g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,s*.4,-.3,Math.PI*1.6);g.closePath();g.fill();g.stroke();g.fillStyle='#fde68a';g.beginPath();g.moveTo(cx+s*.12,cy-s*.05);g.arc(cx+s*.12,cy-s*.05,s*.4,Math.PI*1.6,Math.PI*1.9);g.closePath();g.fill();g.stroke()}
if(k==='plane'){g.fillStyle='#93c5fd';g.beginPath();g.ellipse(cx,cy,s*.42,s*.1,0,0,7);g.fill();g.stroke();g.beginPath();g.moveTo(cx-s*.05,cy);g.lineTo(cx-s*.2,cy-s*.32);g.lineTo(cx+s*.05,cy);g.lineTo(cx-s*.2,cy+s*.32);g.closePath();g.fill();g.stroke()}
if(k==='star'){g.fillStyle='#facc15';g.beginPath();for(let i=0;i<10;i++){const r=i%2?s*.18:s*.42,a=-Math.PI/2+i*Math.PI/5;g.lineTo(cx+r*Math.cos(a),cy+r*Math.sin(a))}g.closePath();g.fill();g.stroke()}
if(k==='bone'){g.fillStyle='#fef3c7';g.fillRect(cx-s*.3,cy-s*.07,s*.6,s*.14);[[-.32,-.1],[-.32,.1],[.32,-.1],[.32,.1]].forEach(([a,b])=>{g.beginPath();g.arc(cx+a*s,cy+b*s,s*.1,0,7);g.fill();g.stroke()});g.strokeRect(cx-s*.3,cy-s*.07,s*.6,s*.14)}
g.restore()}
/* step 1: the meaning picks the spelling */
function pairBoxes(){const w=Math.min(big(130),(A.W-40)/2),h=big(54),x0=A.W/2-w-8;return[{x:x0,y:A.H*.74,w,h},{x:A.W/2+8,y:A.H*.74,w,h}]}
function slotBox(){const w=Math.min(big(130),A.W*.36),h=big(46);return{x:A.W/2-w/2,y:A.H*.5,w,h}}
const order=q=>S.p.n%2?[q.no,q.ok]:[q.ok,q.no];
function drawPair(){const s=S.p,g=A.ctx;paper();if(s.n>=5){head('5 sentences done',A.H*.08,1);PAIRS.forEach((q,j)=>head(q.mean[q.ok],A.H*(.22+j*.14),1,14));return}
const q=PAIRS[s.n];head(`Sentence ${s.n+1} of 5: which spelling fits?`,A.H*.08,0,13);sketch(q.pic,A.W/2,A.H*.27,Math.min(big(62),A.H*.16));
g.fillStyle=A.col.tx;g.font=ff(big(17),700);mid(g);const sl=slotBox();g.fillText(q.s[0],A.W/2,sl.y-big(16),A.W-16);g.fillText(q.s[1],A.W/2,sl.y+sl.h+big(16),A.W-16);
chip(sl,s.got?q.ok:null,{dash:!s.got,no:s.miss,bg:HPF,ink:HP});const d=S.drag;
order(q).forEach((w,j)=>{const b=pairBoxes()[j],r=d&&d.j===j?{...b,x:d.x-b.w/2,y:d.y-b.h/2}:b;chip(r,w,{bg:HPF,ink:HP,held:d&&d.j===j,px:big(21)})})}
function choosePair(w){const s=S.p;if(s.n>=5)return;const q=PAIRS[s.n];
if(w!==q.ok){s.miss=1;nope();return tell(`${w} sounds right, but look at the meaning. ${q.mean[w]}. Here we need ${q.mean[q.ok]}.`)}
s.n++;s.miss=0;yay();tell(`${q.ok}. ${q.mean[q.ok]}. Same sound as ${q.no}, different meaning.`+(s.n>=5?' All 5 done.':''))}
/* step 2: there, their, they're */
function tBins(){const w=(A.W-40)/3,h=A.H*.3;return BINS.map((t,j)=>({t,x:10+j*(w+10),y:A.H*.62,w,h}))}
function tCard(){const w=Math.min(A.W-24,big(330)),h=big(58);return{x:A.W/2-w/2,y:A.H*.24,w,h}}
function drawTtt(){const s=S.t,g=A.ctx;paper();head(s.n>=6?'All 6 sorted':`Card ${s.n+1} of 6: which word fills the gap?`,A.H*.08,s.n>=6,13);
g.fillStyle=A.col.tx;g.font=ff(big(13),700);mid(g);g.fillText('Swap test: if "they are" fits, write they\'re.',A.W/2,A.H*.5,A.W-14);
tBins().forEach(r=>{g.fillStyle=HPF;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=HP;g.lineWidth=2.5;g.stroke();g.fillStyle=INK;g.font=ff(big(19));g.textAlign='center';g.textBaseline='top';g.fillText(r.t,r.x+r.w/2,r.y+8,r.w-6);
const n=TTT.slice(0,s.n).filter(x=>x[1]===r.t).length;g.font=ff(big(14),700);g.fillText(n?'✓ '+n:'',r.x+r.w/2,r.y+r.h*.55)});
if(s.n<6){const r=tCard(),d=S.drag;chip(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,TTT[s.n][0],{held:!!d,no:s.miss,px:big(18)})}}
function sortT(t){const s=S.t;if(s.n>=6)return;const [line,a]=TTT[s.n];
if(t!==a){s.miss=1;nope();return tell(a==='they\'re'?`Try the swap test: "${line.replace('___','they are')}" makes sense, so write they're.`:a==='their'?'It belongs to them: their.':'A place, or there is: there.')}
s.n++;s.miss=0;yay();const done=TTT[s.n-1][0].replace('___',a);tell(`${done[0].toUpperCase()+done.slice(1)} `+({there:'Place word.',their:'Belongs to them.','they\'re':'They are.'})[a]+(s.n>=6?' All 6 sorted.':''))}
/* step 3: memory clue inside the spelling */
function hookRow(){const q=HOOK[Math.min(S.h.n,4)],n=q.w.length,gap=8,u=Math.min(big(60),(A.W-20-gap*(n-1))/n),x0=(A.W-(n*u+gap*(n-1)))/2;return[...q.w].map((ch,i)=>({x:x0+i*(u+gap),y:A.H*.38,w:u,h:u}))}
function drawHook(){const s=S.h,g=A.ctx;paper();if(s.n>=5){head('All 5 clues found',A.H*.08,1);HOOK.forEach((q,j)=>head(`${q.w}: ${q.w.slice(q.a,q.b+1)}. ${q.why}`,A.H*(.22+j*.14),1,13));return}
const q=HOOK[s.n],R=hookRow();head(`Word ${s.n+1} of 5: tap the hidden clue letters`,A.H*.08,0,13);
g.fillStyle=A.col.tx;g.font=ff(big(14),700);mid(g);g.fillText(['What do you hear with?','What do you do with meat?','Find a food in piece.','Find a place word.','Which letters match feet?'][s.n],A.W/2,A.H*.24,A.W-14);
[...q.w].forEach((ch,i)=>{const on=s.got.includes(i);chip(R[i],ch,{ok:on,no:s.miss===i,bg:on?HPF:null,ink:on?HP:INK,px:Math.round(R[i].h*.56)})});
head(`${s.got.length} of ${q.b-q.a+1} found`,A.H*.82,s.got.length===q.b-q.a+1,12)}
function tapHook(i){const s=S.h;if(s.n>=5)return;const q=HOOK[s.n];if(s.got.includes(i))return;
if(i<q.a||i>q.b){s.miss=i;nope();return tell(`${q.w[i]} is not part of the clue. ${q.why.split('.')[0]}.`)}
s.got.push(i);s.miss=null;yay();const need=q.b-q.a+1;if(s.got.length<need)return tell(`${q.w[i]}: yes. ${need-s.got.length} more.`);
s.n++;s.got=[];tell(`${q.w.slice(q.a,q.b+1)} in ${q.w}. ${q.why}`+(s.n>=5?' All 5 found.':''))}
/* step 4: the ay sound spelt ei, eigh, ey */
function ayLay(){const q=AY[Math.min(S.a.n,5)],u=Math.min(big(52),A.W/9),gw=u*2.1;const L=[],y=A.H*.42;
const tot=u*([...q.pre].length+[...q.post].length)+gw+6*([...q.pre].length+[...q.post].length);let x=(A.W-tot)/2;
[...q.pre].forEach(ch=>{L.push({ch,r:{x,y,w:u,h:u}});x+=u+6});const gap={x,y,w:gw,h:u};x+=gw+6;[...q.post].forEach(ch=>{L.push({ch,r:{x,y,w:u,h:u}});x+=u+6});
const bw=Math.min(big(100),(A.W-40)/3),bh=big(54),bx=(A.W-(3*bw+20))/2;return{L,gap,keys:GR.map((t,j)=>({x:bx+j*(bw+10),y:A.H*.74,w:bw,h:bh}))}}
function drawAy(){const s=S.a;paper();if(s.n>=6){head('All 6 built',A.H*.08,1);[['ei','vein, rein'],['eigh','weigh, eight'],['ey','they, grey']].forEach(([a,b],j)=>head(`${a}: ${b}`,A.H*(.3+j*.18),1,17));return}
const q=AY[s.n],R=ayLay();head(`Word ${s.n+1} of 6: which letters say "ay"?`,A.H*.08,0,13);const g=A.ctx;g.fillStyle=A.col.tx;g.font=ff(big(14),700);mid(g);
g.fillText({weigh:'Find how heavy it is.',they:'Those people.',vein:'A tube that carries blood.',eight:'The number after seven.',grey:'The colour of rain clouds.',rein:'A strap to steer a horse.'}[q.out],A.W/2,A.H*.26,A.W-14);
R.L.forEach(o=>chip(o.r,o.ch,{px:Math.round(o.r.h*.55)}));chip(R.gap,null,{dash:1,no:s.miss,bg:AYF});const d=S.drag;
GR.forEach((t,j)=>{const r=d&&d.j===j?{...R.keys[j],x:d.x-R.keys[j].w/2,y:d.y-R.keys[j].h/2}:R.keys[j];chip(r,t,{bg:AYF,ink:AYC,held:d&&d.j===j,px:big(21)})})}
function putAy(t){const s=S.a;if(s.n>=6)return;const q=AY[s.n];
if(t!==q.g){s.miss=1;nope();const made=q.pre+t+q.post;return tell(`${made} is not how we spell it. ${q.out==='weigh'?'weigh uses eigh, like eight. way is a path.':q.out==='rein'?'A horse\'s rein uses ei. rain falls from clouds.':'Learn its family: '+({ei:'vein, rein',eigh:'eight, weigh, sleigh',ey:'they, grey, obey'})[q.g]+'.'}`)}
s.n++;s.miss=0;yay();tell(`${q.pre}+${q.g}${q.post?'+'+q.post:''} = ${q.out}.`+(s.n>=6?' All 6 built.':''))}
/* step 5: catch the wrong homophone */
function lineTiles(ws){const g=A.ctx,px=big(18);g.font=ff(px);const hh=px+24,sp=6,wd=ws.map(w=>/^[.?]$/.test(w)?22:Math.max(42,g.measureText(w).width+18));
const tot=wd.reduce((a,b)=>a+b,0)+sp*(wd.length-1),k=Math.min(1,(A.W-12)/tot);let x=(A.W-tot*k)/2;return wd.map(w=>{const r={x,y:A.H*.4,w:w*k,h:hh*Math.max(.8,k)};x+=(w+sp)*k;return r})}
function drawSlip(){const s=S.s;paper();if(s.n>=4){head('All 4 fixed',A.H*.08,1);SLIPS.forEach((q,j)=>head(q.t.map((w,i)=>i===q.bad?q.fix:w).join(' ').replace(/ ([.?])/,'$1'),A.H*(.25+j*.16),1,15));return}
const q=SLIPS[s.n],R=lineTiles(q.t);head(`Line ${s.n+1} of 4: tap the wrong homophone`,A.H*.08,0,13);
q.t.forEach((w,i)=>{if(/^[.?]$/.test(w)){const g=A.ctx;g.fillStyle=A.col.tx;g.font=ff(big(22));mid(g);g.fillText(w,R[i].x+R[i].w/2,R[i].y+R[i].h/2);return}chip(R[i],w,{no:s.miss===i,px:big(18)})})}
function tapSlip(i){const s=S.s;if(s.n>=4)return;const q=SLIPS[s.n];if(/^[.?]$/.test(q.t[i]))return;
if(i!==q.bad){s.miss=i;nope();return tell(`${q.t[i]} is right here. Find the one with the wrong meaning.`)}
s.n++;s.miss=null;yay();tell(`${q.t[i]} → ${q.fix}. ${q.why}`+(s.n>=4?' All 4 fixed.':''))}
function draw(){const k=stage();if(k==='quiz'){paper();head('Challenge',A.H*.2,1);head('same sound · different meaning',A.H*.5,0,18);return}
({pair:drawPair,ttt:drawTtt,hook:drawHook,ay:drawAy,slip:drawSlip})[k]();A.fx.draw(A.ctx)}
function down(p){const k=stage();
if(k==='pair'&&S.p.n<5){const j=pairBoxes().findIndex(r=>hit(p,r));if(j>=0){S.drag={j,x:p.x,y:p.y};return true}return false}
if(k==='ttt'&&S.t.n<6){if(hit(p,tCard())){S.drag={x:p.x,y:p.y};return true}const b=tBins().find(r=>hit(p,r));if(b)sortT(b.t);return false}
if(k==='hook'&&S.h.n<5){const i=hookRow().findIndex(r=>hit(p,r));if(i>=0)tapHook(i);return false}
if(k==='ay'&&S.a.n<6){const j=ayLay().keys.findIndex(r=>hit(p,r));if(j>=0){S.drag={j,x:p.x,y:p.y};return true}return false}
if(k==='slip'&&S.s.n<4){const i=lineTiles(SLIPS[S.s.n].t).findIndex(r=>hit(p,r));if(i>=0)tapSlip(i)}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const k=stage();
if(k==='pair'){const sl=slotBox();if(hit(p,{x:sl.x-30,y:sl.y-30,w:sl.w+60,h:sl.h+60})||hit(p,pairBoxes()[d.j]))choosePair(order(PAIRS[S.p.n])[d.j]);else A.redraw();return}
if(k==='ay'){const R=ayLay(),gp=R.gap;if(hit(p,{x:gp.x-26,y:gp.y-26,w:gp.w+52,h:gp.h+52})||hit(p,R.keys[d.j]))putAy(GR[d.j]);else A.redraw();return}
const b=tBins().find(r=>hit(p,r));if(b)sortT(b.t);else A.redraw()}
function wipe(){gen++;for(const k in S)delete S[k];Object.assign(S,{p:{n:0},t:{n:0},h:{n:0,got:[]},a:{n:0},s:{n:0},drag:null,check:()=>{}})}
function tell(t){if(!t)return;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();S.check()}
function open(i,desc,ok,msg){wipe();tell(desc);S.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=stage(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
if(k==='pair'&&S.p.n<5){const q=PAIRS[S.p.n];order(q).forEach(w=>B(w,()=>choosePair(w),`Put ${w} in the gap`))}
if(k==='ttt'&&S.t.n<6)BINS.forEach(t=>B(t,()=>sortT(t),`The gap is ${t}`));
if(k==='hook'&&S.h.n<5){const q=HOOK[S.h.n];[...q.w].forEach((ch,i)=>{if(!S.h.got.includes(i))B(ch,()=>tapHook(i),`Letter ${i+1}: ${ch}`)})}
if(k==='ay'&&S.a.n<6)GR.forEach(t=>B(t,()=>putAy(t),`Use ${t}`));
if(k==='slip'&&S.s.n<4)SLIPS[S.s.n].t.forEach((w,i)=>{if(!/^[.?]$/.test(w))B(w,()=>tapSlip(i),`Is ${w} the wrong word?`)})}
const steps=[
{h:'Same sound, new meaning',p:'Homophones sound the same but mean different things. Look at the picture, then drag in the spelling that fits.',
predict:{q:'brake and break sound the same. Can you use either one?',opts:['Yes, they sound the same','No, the meaning picks the spelling'],ans:1},task:'Finish all 5 sentences',
show:()=>play(0,PAIRS.map(q=>()=>choosePair(q.ok)),700),
go:()=>open(0,'A bike. Squeeze the gap to stop the bike: brake or break?',()=>S.p.n>=5,'The meaning, not the sound, picks the spelling.')},
{h:'There, their, they\'re',p:'there: a place. their: it belongs to them. they\'re: they are. Drag each card to its box.',
predict:{q:'"___ coats are wet." Which word?',opts:['There','Their'],ans:1},task:'Sort all 6 cards',
show:()=>play(1,TTT.map(x=>()=>sortT(x[1])),600),
go:()=>open(1,'Card: ___ coats are wet. Boxes: there, their, they\'re.',()=>S.t.n>=6,'Place: there. Belongs: their. They are: they\'re.')},
{h:'Clues inside words',p:'Many homophones hide a clue. hear has ear in it. Tap the letters of the clue.',task:'Find all 5 clues',
show:()=>play(2,HOOK.flatMap(q=>Array.from({length:q.b-q.a+1},(_,d)=>()=>tapHook(q.a+d))),260),
go:()=>open(2,'The word hear. Tap the hidden word that tells you what you hear with.',()=>S.h.n>=5,'ear in hear, eat in meat, pie in piece.')},
{h:'ei, eigh and ey',p:'The "ay" sound can be spelt ei, eigh or ey. Read the meaning, then drag in the letters.',
predict:{q:'they rhymes with day. How is it spelt?',opts:['thay','they'],ans:1},task:'Build all 6 words',
show:()=>play(3,AY.map(q=>()=>putAy(q.g)),650),
go:()=>open(3,'w, gap. Find how heavy it is. Choose ei, eigh or ey.',()=>S.a.n>=6,'vein, eight, they: three ways to spell ay.')},
{h:'Catch the mix-up',p:'One word in each line has the wrong meaning. Tap it.',task:'Fix all 4 lines',
show:()=>play(4,SLIPS.map(q=>()=>tapSlip(q.bad)),800),
go:()=>open(4,'Press the break. Each word is a tile.',()=>S.s.n>=4,'brake, piece, There, meet.')},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[
{q:'"I can ___ the band." Which word?',a:'hear',o:[['here','place'],['heer','spell']]},
{q:'"___ going to the park." Which word?',a:'They\'re',o:[['Their','own'],['There','place2']]},
{q:'Which means a part of something?',a:'piece',o:[['peace','calm'],['peice','ie']]},
{q:'Which spelling is the number 8?',a:'eight',o:[['ate','ate'],['ayt','ay8']]},
{q:'Squeeze the ___ to slow down.',a:'brake',o:[['break','smash'],['braik','ayk']]},
{q:'What makes two words homophones?',a:'Same sound, different meaning',o:[['Same spelling, same meaning','same'],['They rhyme','rhyme']]}];
function why(t){let m='Think about the meaning first.';
if(t==='place')m='here is a place. You hear with your ear: hear.';
if(t==='spell')m='heer is not a word. hear has ear in it.';
if(t==='own')m='Their means it is theirs. "They are going" fits: They\'re.';
if(t==='place2')m='There is a place. "They are going" fits: They\'re.';
if(t==='calm')m='peace means calm. A part is a piece, like pie.';
if(t==='ie')m='peice swaps letters. Think: a piece of pie.';
if(t==='ate')m='ate is the past of eat. The number is eight, with eigh.';
if(t==='ay8')m='ayt is not a word. The number is eight, with eigh.';
if(t==='ayk')m='braik is not a word. The stopping part is brake, like make.';
if(t==='smash')m='break means smash or a rest. The stopping part is a brake.';
if(t==='same')m='That is just one word. Homophones only share a sound.';
if(t==='rhyme')m='cat and hat rhyme but are not the same sound.';
return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
qbox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const bx=qbox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},bx,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else nope();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.08,draw,onStep:B=>{qbox.hidden=B.step!==5;ctl.hidden=B.step===5;controls()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Homophone buttons'},bx);qbox=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});controls()}}).start()})})();
