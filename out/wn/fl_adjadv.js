/* Flagship – adjectives vs adverbs (ages 7–8; NC England Y2 grammar: adjectives, -ly to turn adjectives into adverbs;
   Appendix 1 Y3–4 suffix -ly spelling; CCSS L.2.1e choose between adjectives and adverbs).
   Point each describing word at the word it describes (noun or verb), bolt the right -ly ending onto an adjective,
   drop the right card into a gap, catch the slip in a sentence, and sort words by the job they do, not by their -ly.
   Not flagnv (nouns and verbs), flagnph (noun phrases) or flagadvl (fronted adverbials). */
(()=>{
const LINK=[{t:['The','slow','dog','walks','.'],d:1,to:2,kind:'adj'},{t:['The','dog','walks','slowly','.'],d:3,to:3-1,kind:'adv'},
{t:['A','loud','bell','rang','.'],d:1,to:2,kind:'adj'},{t:['The','bell','rang','loudly','.'],d:3,to:2,kind:'adv'}];
const ENDS=[{k:'ly',lab:'+ ly'},{k:'ily',lab:'y → ily'},{k:'le',lab:'le → ly'}];
const MAKE=[{w:'quick',k:'ly',out:'quickly'},{w:'happy',k:'ily',out:'happily'},{w:'gentle',k:'le',out:'gently'},{w:'soft',k:'ly',out:'softly'},{w:'easy',k:'ily',out:'easily'}];
const GAP=[{t:['Sam','runs','___','.'],c:['quick','quickly'],a:1,why:'runs is a doing word. To say how Sam runs, use the adverb quickly.'},
{t:['The','cat','is','___','.'],c:['quiet','quietly'],a:0,why:'is is not an action. The word tells us about the cat, so use the adjective quiet.'},
{t:['She','sang','___','.'],c:['sweet','sweetly'],a:1,why:'sang is a doing word. How did she sing? Sweetly.'},
{t:['The','___','fox','jumped','.'],c:['quick','quickly'],a:0,why:'The word sits before fox and tells us about the fox, so it is the adjective quick.'},
{t:['The','baby','slept','___','.'],c:['calm','calmly'],a:1,why:'slept is the verb. How did the baby sleep? Calmly.'}];
const FIX=[{t:['She','spoke','polite','.'],bad:2,good:'politely',why:'polite tells how she spoke, so it needs ly: politely.'},
{t:['Walk','careful','on','the','ice','!'],bad:1,good:'carefully',why:'careful tells how to walk, so it must be the adverb carefully.'},
{t:['The','sun','was','brightly','.'],bad:3,good:'bright',why:'was is not an action. The word tells us about the sun: bright.'},
{t:['The','kind','girl','smiled','happy','.'],bad:4,good:'happily',why:'happy tells how she smiled, so it becomes happily. kind is fine: it tells about the girl.'}];
const JOB=[['a friendly cat','friendly',0],['She sang softly.','softly',1],['a fast car','fast',0],['He ran fast.','fast',1],
['a lovely day','lovely',0],['He worked hard.','hard',1],['a hard rock','hard',0],['She swims well.','well',1]];
VIS.reg('flagadjadv',c=>{let A,pad,quiz,qn=-1,gen=0;const st={};c.fig.classList.add('young');
const INK='#111827',OK='#047857',NO='#b91c1c',RIM='#6b7280',ADJ='#1e40af',ADJF='#dbeafe',ADV='#9a3412',ADVF='#ffedd5',SEL='#7c3aed';
const F=(px,wt)=>`${wt||700} ${px}px system-ui,sans-serif`,up=px=>A.narrow?px:Math.round(px*1.2),ctr=g=>{g.textAlign='center';g.textBaseline='middle'};
const part=()=>['link','make','gap','fix','job','quiz'][A.step],inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const ding=()=>A.sound.pop(),buzz=()=>A.sound.miss();
function note(t,y){const g=A.ctx;let px=up(14);g.font=F(px,700);while(g.measureText(t).width>A.W-20&&px>10){px--;g.font=F(px,700)}g.fillStyle=A.col.tx;ctr(g);g.fillText(t,A.W/2,y)}
function bg(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#eef2ff',A.col.dark?.06:.45);g.fillRect(0,0,A.W,A.H)}
function pill(s,x,y,o){o=o||{};const g=A.ctx;let px=up(o.px||14);g.font=F(px,800);let w=g.measureText(s).width+24;while(w>A.W-12&&px>10){px--;g.font=F(px,800);w=g.measureText(s).width+24}
const h=px+16,l=Math.max(6,Math.min(A.W-w-6,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,9);g.fill();g.lineWidth=o.ok?3:1.5;g.strokeStyle=o.ok?OK:RIM;g.stroke();g.fillStyle=INK;ctr(g);g.fillText(s,l+w/2,y+1)}
function box(r,s,o){o=o||{};const g=A.ctx;if(s==='.'||s==='!'){g.fillStyle=A.col.tx;g.font=F(Math.round(r.h*.5),800);ctr(g);g.fillText(s,r.x+r.w/2,r.y+r.h/2);return}g.fillStyle=o.fill||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=(o.ok||o.no||o.held||o.pick)?4:2;
g.strokeStyle=o.ok?OK:o.no?NO:o.held?'#1d4ed8':o.pick?SEL:RIM;if(o.gap)g.setLineDash([7,5]);g.stroke();g.setLineDash([]);if(s==null)return;g.fillStyle=o.ink||INK;g.font=F(o.px||Math.round(r.h*.46),800);ctr(g);g.fillText(s,r.x+r.w/2,r.y+r.h/2+1,r.w-6)}
/* lay out a sentence of word tiles on one line, shrinking to fit the canvas */
function line(words,y){const g=A.ctx,px=up(20);g.font=F(px,800);const h=px+26,gap=7,ws=words.map(s=>/^[.!]$/.test(s)?26:Math.max(48,g.measureText(s).width+20));
const all=ws.reduce((a,b)=>a+b,0)+gap*(ws.length-1),k=Math.min(1,(A.W-14)/all);let x=(A.W-all*k)/2;return ws.map(w=>{const r={x,y,w:w*k,h:h*Math.max(.8,k)};x+=(w+gap)*k;return r})}
function arrow(a,b,col){const g=A.ctx,x1=a.x+a.w/2,x2=b.x+b.w/2,y=a.y+a.h+6,dip=Math.max(26,Math.min(64,Math.abs(x2-x1)*.5));g.strokeStyle=col;g.lineWidth=4;g.beginPath();g.moveTo(x1,y);
g.bezierCurveTo(x1,y+dip,x2,y+dip,x2,y+4);g.stroke();g.fillStyle=col;g.beginPath();g.moveTo(x2,y);g.lineTo(x2-7,y+12);g.lineTo(x2+7,y+12);g.fill()}
/* step 1: what does the describing word describe? */
function drawLink(){const s=st.l;bg();if(s.k>=4){pill('All 4 linked',A.W/2,A.H*.09,{ok:1});
LINK.forEach((q,j)=>pill(q.t.join(' ').replace(' .','.')+(q.kind==='adj'?'  → adjective, tells about '+q.t[q.to]:'  → adverb, tells how it '+q.t[q.to]),A.W/2,A.H*(.26+j*.17),{px:13,ok:1}));return}
const q=LINK[s.k],R=line(q.t,A.H*.32);pill(`Sentence ${s.k+1} of 4: tap the word that ${q.t[q.d]} tells about`,A.W/2,A.H*.09,{px:13});
q.t.forEach((w,i)=>{if(w==='.')return box(R[i],w,{fill:'transparent'});const isD=i===q.d;box(R[i],w,{fill:isD?(q.kind==='adj'?ADJF:ADVF):null,ink:isD?(q.kind==='adj'?ADJ:ADV):INK,no:s.miss===i,pick:isD})});
note('A thing (noun) or an action (verb)?',A.H*.86)}
function tapLink(i){const s=st.l;if(s.k>=4)return;const q=LINK[s.k];if(q.t[i]==='.'||i===q.d)return;
if(i!==q.to){s.miss=i;buzz();return say(q.kind==='adj'?`${q.t[q.d]} does not tell about ${q.t[i]}. Which thing is ${q.t[q.d]}? The ${q.t[q.to]}.`:`${q.t[q.d]} does not tell what kind of ${q.t[i]}. It tells how something happens. Find the doing word.`)}
s.k++;s.miss=null;ding();say(q.kind==='adj'?`Yes. ${q.t[q.d]} tells what the ${q.t[q.to]} is like. A word that describes a noun is an adjective.`:`Yes. ${q.t[q.d]} tells how it ${q.t[q.to]}. A word that describes a verb is an adverb.`+(s.k>=4?' All 4 linked.':''))}
/* step 2: bolt the right -ly ending on */
function makeRects(){const r=A.H*.24,w=Math.min(A.W*.6,up(220)),h=up(64),bw=(A.W-40)/3,bh=up(54);return{word:{x:A.W/2-w/2,y:r,w,h},ends:ENDS.map((e,j)=>({x:10+j*(bw+10),y:A.H*.68,w:bw,h:bh}))}}
function drawMake(){const s=st.m;bg();if(s.k>=5){pill('5 adverbs made',A.W/2,A.H*.09,{ok:1});MAKE.forEach((m,j)=>pill(`${m.w}  →  ${m.out}`,A.W/2,A.H*(.22+j*.14),{px:16,ok:1}));return}
const m=MAKE[s.k],R=makeRects();pill(`Word ${s.k+1} of 5: drag the right ending onto ${m.w}`,A.W/2,A.H*.09,{px:13});box(R.word,m.w,{fill:ADJF,ink:ADJ,no:s.miss!=null,px:up(30)});
const d=st.drag;ENDS.forEach((e,j)=>{const r=d&&d.j===j?{...R.ends[j],x:d.x-R.ends[j].w/2,y:d.y-R.ends[j].h/2}:R.ends[j];box(r,e.lab,{fill:ADVF,ink:ADV,held:d&&d.j===j,px:up(18)})});
note('Look at the last letters first.',A.H*.56)}
function bolt(k){const s=st.m;if(s.k>=5)return;const m=MAKE[s.k];
if(k!==m.k){s.miss=k;buzz();const tail=m.w.slice(-2),bad=k==='ly'?m.w+'ly':k==='ily'?m.w.replace(/y$/,'')+'ily':m.w.replace(/le$/,'')+'ly';
return say(m.k==='ily'?`${bad} is not right. ${m.w} ends in y, so change y to i, then add ly.`:m.k==='le'?`${bad} is not right. ${m.w} ends in le, so swap le for ly.`:`${m.w} ends in ${tail}, not y or le. Just add ly.`)}
s.k++;s.miss=null;ding();say(`${m.w} → ${m.out}. ${m.k==='ly'?'Most words just add ly.':m.k==='ily'?'y changes to i, then ly.':'le becomes ly.'}`+(s.k>=5?' All 5 made.':''))}
/* step 3: pick the card for the gap */
function gapCards(){const w=Math.min(up(150),(A.W-36)/2),h=up(58);return[{x:A.W/2-w-8,y:A.H*.64,w,h},{x:A.W/2+8,y:A.H*.64,w,h}]}
function drawGap(){const s=st.g;bg();if(s.k>=5){pill('All 5 gaps filled',A.W/2,A.H*.09,{ok:1});GAP.forEach((q,j)=>pill(q.t.join(' ').replace('___',q.c[q.a]).replace(' .','.'),A.W/2,A.H*(.22+j*.14),{px:15,ok:1}));return}
const q=GAP[s.k],R=line(q.t,A.H*.3),gi=q.t.indexOf('___');pill(`Gap ${s.k+1} of 5: drag the right word in`,A.W/2,A.H*.09,{px:13});
q.t.forEach((w,i)=>i===gi?box(R[i],null,{gap:1,no:s.miss!=null}):box(R[i],w,{fill:w==='.'?'transparent':null}));
const d=st.drag;gapCards().forEach((r,j)=>{const rr=d&&d.j===j?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r;box(rr,q.c[j],{fill:j?ADVF:ADJF,ink:j?ADV:ADJ,held:d&&d.j===j,px:up(22)})})}
function fill(j){const s=st.g;if(s.k>=5)return;const q=GAP[s.k];if(j!==q.a){s.miss=j;buzz();return say(q.why)}
s.k++;s.miss=null;ding();say(`${q.c[j]}. ${q.why}`+(s.k>=5?' All 5 filled.':''))}
/* step 4: find the slip */
function drawFix(){const s=st.f;bg();if(s.k>=4){pill('All 4 fixed',A.W/2,A.H*.09,{ok:1});FIX.forEach((q,j)=>pill(q.t.map((w,i)=>i===q.bad?q.good:w).join(' ').replace(/ ([.!])$/,'$1'),A.W/2,A.H*(.25+j*.16),{px:15,ok:1}));return}
const q=FIX[s.k],R=line(q.t,A.H*.36);pill(`Line ${s.k+1} of 4: one describing word is wrong. Tap it.`,A.W/2,A.H*.09,{px:13});
q.t.forEach((w,i)=>box(R[i],w,{fill:/^[.!]$/.test(w)?'transparent':null,no:s.miss===i}));note('About a thing, or how it is done?',A.H*.84)}
function tapFix(i){const s=st.f;if(s.k>=4)return;const q=FIX[s.k];if(/^[.!]$/.test(q.t[i]))return;
if(i!==q.bad){s.miss=i;buzz();return say(`${q.t[i]} is fine here. Find a describing word doing the wrong job.`)}
s.k++;s.miss=null;ding();say(`${q.t[i]} → ${q.good}. ${q.why}`+(s.k>=4?' All 4 fixed.':''))}
/* step 5: sort by job, not by -ly */
function jobBins(){const w=(A.W-30)/2,h=A.H*.3;return[{x:10,y:A.H*.64,w,h},{x:20+w,y:A.H*.64,w,h}]}
function jobCard(){const w=Math.min(up(260),A.W*.8),h=up(60);return{x:A.W/2-w/2,y:A.H*.25,w,h}}
function drawJob(){const s=st.j,g=A.ctx;bg();pill(s.k>=8?'All 8 sorted':`Card ${s.k+1} of 8: what job does the coloured word do?`,A.W/2,A.H*.09,{px:13,ok:s.k>=8});
jobBins().forEach((r,j)=>{g.fillStyle=j?ADVF:ADJF;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=j?ADV:ADJ;g.lineWidth=2.5;g.stroke();g.fillStyle=INK;g.font=F(up(13),800);g.textAlign='center';g.textBaseline='top';
g.fillText(j?'Adverb: how':'Adjective: a thing',r.x+r.w/2,r.y+8,r.w-8);g.font=F(up(14),700);const got=JOB.slice(0,s.k).filter(x=>x[2]===j).map(x=>x[1]);
for(let n=0;n<got.length;n+=2)g.fillText(got.slice(n,n+2).join('  '),r.x+r.w/2,r.y+r.h*.34+n*up(10),r.w-8)});
if(s.k<8){const r=jobCard(),d=st.drag,rr=d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,[ph,word]=JOB[s.k];box(rr,null,{held:!!d,no:s.miss});
const px=up(20);g.font=F(px,800);const pre=ph.slice(0,ph.lastIndexOf(word)),post=ph.slice(ph.lastIndexOf(word)+word.length),wa=g.measureText(pre).width,wb=g.measureText(word).width,wc=g.measureText(post).width;
let x=rr.x+rr.w/2-(wa+wb+wc)/2;const y=rr.y+rr.h/2+1;g.textAlign='left';g.textBaseline='middle';g.fillStyle=INK;g.fillText(pre,x,y);x+=wa;g.fillStyle=SEL;g.fillText(word,x,y);g.fillRect(x,y+px*.55,wb,3);x+=wb;g.fillStyle=INK;g.fillText(post,x,y)}}
function sortJob(j){const s=st.j;if(s.k>=8)return;const [ph,w,b]=JOB[s.k];
if(j!==b){s.miss=1;buzz();return say(b?`In "${ph}", ${w} tells how it is done, so it is an adverb here.`+(/ly$/.test(w)?'':` It has no -ly, but its job is still how.`):`In "${ph}", ${w} tells what the thing is like, so it is an adjective.`+(/ly$/.test(w)?' Some adjectives end in -ly too.':''))}
s.k++;s.miss=0;ding();say(`${w}: ${b?'adverb, it tells how.':'adjective, it tells about a thing.'}`+(s.k>=8?' All 8 sorted.':''))}
function draw(){const k=part();if(k==='quiz'){bg();pill('Challenge',A.W/2,A.H*.2,{ok:1});pill('the slow dog · walks slowly',A.W/2,A.H*.5,{px:18});return}
({link:drawLink,make:drawMake,gap:drawGap,fix:drawFix,job:drawJob})[k]();A.fx.draw(A.ctx)}
function down(p){const k=part();
if(k==='link'&&st.l.k<4){const i=line(LINK[st.l.k].t,A.H*.32).findIndex(r=>inR(p,r));if(i>=0)tapLink(i);return false}
if(k==='make'&&st.m.k<5){const j=makeRects().ends.findIndex(r=>inR(p,r));if(j>=0){st.drag={j,x:p.x,y:p.y};return true}return false}
if(k==='gap'&&st.g.k<5){const j=gapCards().findIndex(r=>inR(p,r));if(j>=0){st.drag={j,x:p.x,y:p.y};return true}return false}
if(k==='fix'&&st.f.k<4){const i=line(FIX[st.f.k].t,A.H*.36).findIndex(r=>inR(p,r));if(i>=0)tapFix(i);return false}
if(k==='job'&&st.j.k<8){if(inR(p,jobCard())){st.drag={x:p.x,y:p.y};return true}const b=jobBins().findIndex(r=>inR(p,r));if(b>=0)sortJob(b)}return false}
function move(p){if(!st.drag)return;st.drag.x=p.x;st.drag.y=p.y;A.redraw()}
function lift(p){const d=st.drag;if(!d)return;st.drag=null;const k=part();
if(k==='make'){const R=makeRects();if(inR(p,{x:R.word.x-20,y:R.word.y-20,w:R.word.w+40,h:R.word.h+40})||inR(p,R.ends[d.j]))bolt(ENDS[d.j].k);else A.redraw();return}
if(k==='gap'){const q=GAP[st.g.k],R=line(q.t,A.H*.3),gr=R[q.t.indexOf('___')];if(inR(p,{x:gr.x-24,y:gr.y-24,w:gr.w+48,h:gr.h+48})||inR(p,gapCards()[d.j]))fill(d.j);else A.redraw();return}
const b=jobBins().findIndex(r=>inR(p,r));if(b>=0)sortJob(b);else A.redraw()}
function wipe(){gen++;for(const k in st)delete st[k];Object.assign(st,{l:{k:0},m:{k:0},g:{k:0},f:{k:0},j:{k:0},drag:null,check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();btns();st.check()}
function open(i,desc,ok,msg){wipe();say(desc);st.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function btns(){if(!pad)return;pad.innerHTML='';const k=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
if(k==='link'&&st.l.k<4){const q=LINK[st.l.k];q.t.forEach((w,i)=>{if(w!=='.'&&i!==q.d)B(w,()=>tapLink(i),`${q.t[q.d]} tells about ${w}`)})}
if(k==='make'&&st.m.k<5)ENDS.forEach(e=>B(e.lab,()=>bolt(e.k),`${MAKE[st.m.k].w}: ${e.lab}`));
if(k==='gap'&&st.g.k<5)GAP[st.g.k].c.forEach((w,j)=>B(w,()=>fill(j),`Put ${w} in the gap`));
if(k==='fix'&&st.f.k<4)FIX[st.f.k].t.forEach((w,i)=>{if(!/^[.!]$/.test(w))B(w,()=>tapFix(i),`Is ${w} wrong?`)});
if(k==='job'&&st.j.k<8){B('Adjective',()=>sortJob(0),'Adjective: tells about a thing');B('Adverb',()=>sortJob(1),'Adverb: tells how it is done')}}
const steps=[
{h:'Who or how?',p:'A describing word points at the word it tells about. An adjective tells about a thing (a noun). An adverb tells how an action (a verb) is done.',
predict:{q:'The dog walks slowly. What does slowly tell us about?',opts:['the dog','walks: how the dog walks'],ans:1},task:'Link all 4 describing words',
show:()=>play(0,LINK.map(q=>()=>tapLink(q.to)),650),
go:()=>open(0,'The slow dog walks. The word slow is coloured. Tap the word it tells about.',()=>st.l.k>=4,'Adjectives point at nouns. Adverbs point at verbs.')},
{h:'Make an adverb',p:'Many adverbs are an adjective plus ly. Check the end of the word first: y changes to i, and le changes to ly.',
predict:{q:'What do you get when happy becomes an adverb?',opts:['happyly','happily'],ans:1},task:'Make all 5 adverbs',
show:()=>play(1,MAKE.map(m=>()=>bolt(m.k)),650),
go:()=>open(1,'The word quick. Three endings to drag: plus ly, y to ily, le to ly.',()=>st.m.k>=5,'quick → quickly, happy → happily, gentle → gently.')},
{h:'Fill the gap',p:'Look at the word next to the gap. Is it a doing word, or a word like is or was? Drag the right card in.',
predict:{q:'The cat is ___. Which word fits?',opts:['quiet','quietly'],ans:0},task:'Fill all 5 gaps',
show:()=>play(2,GAP.map(q=>()=>fill(q.a)),700),
go:()=>open(2,'Sam runs, gap. Cards: quick and quickly.',()=>st.g.k>=5,'After a doing word, use the adverb. To tell about a thing, use the adjective.')},
{h:'Spot the slip',p:'Each line has one describing word doing the wrong job. Tap it.',task:'Fix all 4 lines',
show:()=>play(3,FIX.map(q=>()=>tapFix(q.bad)),750),
go:()=>open(3,'She spoke polite. Each word is a tile.',()=>st.f.k>=4,'spoke politely, walk carefully, was bright, smiled happily.')},
{h:'Job, not ending',p:'Do not just look for ly. Ask what job the word does in this sentence. The same word can do both jobs.',
predict:{q:'In a friendly cat, what is friendly?',opts:['An adverb, because it ends in ly','An adjective, because it tells about the cat'],ans:1},task:'Sort all 8 cards',
show:()=>play(4,JOB.map(x=>()=>sortJob(x[2])),480),
go:()=>open(4,'Card: a friendly cat. Boxes: adjective or adverb.',()=>st.j.k>=8,'friendly and lovely are adjectives. fast, hard and well can be adverbs with no ly.')},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.check()});
const QS=[
{q:'Which is right? The tea is ___.',a:'hot',o:[['hotly','is'],['both are fine','both']]},
{q:'Which is right? Mia ran ___.',a:'quickly',o:[['quick','verb'],['quickely','plain']]},
{q:'In "a silly joke", what kind of word is silly?',a:'adjective',o:[['adverb','ly'],['verb','noverb']]},
{q:'How do you write easy as an adverb?',a:'easily',o:[['easyly','spell'],['easly','spell']]},
{q:'Which is right? She plays the piano ___.',a:'well',o:[['good','well'],['goodly','well']]},
{q:'In "He spoke softly", which word does softly tell about?',a:'spoke',o:[['He','head'],['nothing, it is on its own','alone']]}];
function why(t){let m='Ask what the word tells about: a thing, or how something is done.';
if(t==='is')m='is is not an action. The word tells about the tea, so use the adjective hot.';
if(t==='verb')m='ran is a doing word. To say how she ran, use the adverb quickly.';
if(t==='ly')m='It ends in ly, but it tells about the joke, a thing. So silly is an adjective.';
if(t==='spell')m='easy ends in y. Change y to i, then add ly: easily.';
if(t==='well')m='good tells about a thing: a good song. goodly is not used for this. To tell how she plays, use the adverb well.';
if(t==='head')m='An adverb tells about a verb. softly tells how he spoke.';
if(t==='both')m='Only one fits. is links the word back to the tea, so use the adjective hot.';
if(t==='plain')m='quick just adds ly. There is no e: quickly.';
if(t==='noverb')m='silly is not a doing word. It tells about the joke, so it is an adjective.';
if(t==='alone')m='softly is not on its own. It tells how he spoke.';
return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const bx=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},bx,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else buzz();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;btns()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Adjective and adverb buttons'},bx);quiz=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up:lift});btns()}}).start()})})();
