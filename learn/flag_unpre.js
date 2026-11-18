/* Flagship – the prefix un- (ages 5–6; NC England Y1 spelling "the prefix un-" with Appendix 1 examples unhappy, undo,
   unload, unfair, unlock; Y1 writing Eng_Y1_WT_07). Put un- at the front (not the back), see un- flip a describing word
   (unkind = not kind) and undo an action (unlock opens the lock), spell un- words without changing the root, tell real
   un- words from words that only start with u-n (under, uncle), then pick the word a sentence needs. */
(()=>{
const FLIP=[['happy','not happy'],['kind','not kind'],['fair','not fair'],['tidy','not tidy']];
/* undo cards: word, which picture is right (0 or 1), picture kind */
const UNDO=[['unlock',1,'lock'],['untie',0,'lace'],['unzip',1,'zip'],['unpack',0,'bag']];
const SPELL=[['happy','unhappy','unhapy','un happy'],['zip','unzip','onzip','unzipp'],['do','undo','undoo','ondo'],['kind','unkind','un kind','unkin']];
/* word, is it un- + a real word? */
const REAL=[['unfair',1],['under',0],['unlock',1],['uncle',0],['untidy',1],['unicorn',0]];
const GAPS=[['The bed is a mess. It is','untidy','tidy'],['Gran gave me a hug. She is','kind','unkind'],['I want to take my shoes off. I','untie','tie'],['He got no cake. That is','unfair','fair']];
VIS.reg('flagunpre',c=>{let A,row,quiz,qn=-1,run=0;c.fig.classList.add('young');
const K={};
const DARK='#1e293b',GOOD='#047857',BAD='#b91c1c',RIM='#64748b',HOLD='#1d4ed8',PRE='#7c2d12',PREBG='#ffedd5',CARD='#ffffff',BIN='#f0f9ff',BINR='#0369a1';
const px=n=>Math.round(n*(A.narrow?1:1.2)),font=(n,b)=>`${b||800} ${px(n)}px system-ui,sans-serif`;
const stage=()=>['join','undo','spell','real','gap','quiz'][A.step],hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function bg(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fff7ed',A.col.dark?.04:.55);g.fillRect(0,0,A.W,A.H)}
function say(t,y,ok){const g=A.ctx;let n=15;g.font=font(n);while(g.measureText(t).width+30>A.W-8&&n>10){n--;g.font=font(n)}
const w=g.measureText(t).width+28,h=px(n)+16;g.fillStyle=CARD;A.paint.rrect(A.W/2-w/2,y-h/2,w,h,h/2);g.fill();g.lineWidth=ok?3:1.5;g.strokeStyle=ok?GOOD:RIM;g.stroke();
g.fillStyle=DARK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
/* a word card; when pre is set the un- part is drawn in its own colour */
function card(r,word,o){o=o||{};const g=A.ctx;g.fillStyle=o.fill||CARD;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=o.edge?4:2;g.strokeStyle=o.edge||RIM;if(o.dash)g.setLineDash([7,5]);g.stroke();g.setLineDash([]);
if(word==null)return;g.font=font(o.n||24);g.textBaseline='middle';const y=r.y+r.h/2+1;
if(o.pre){const a=g.measureText('un').width,b=g.measureText(word.slice(2)).width,x=r.x+r.w/2-(a+b)/2;g.textAlign='left';g.fillStyle=PRE;g.fillText('un',x,y);g.fillStyle=DARK;g.fillText(word.slice(2),x+a,y);return}
g.textAlign='center';g.fillStyle=o.ink||DARK;g.fillText(word,r.x+r.w/2,y,r.w-8)}
function note(t,y){const g=A.ctx;g.fillStyle=A.col.tx;g.font=font(15,700);g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y,A.W-12)}
/* ---- step 1: where does un- go? ---- */
const jWord=()=>{const w=Math.min(px(170),A.W*.42);return{x:A.W/2-w/2,y:A.H*.4,w,h:px(60)}};
const jSlots=()=>{const r=jWord(),w=px(64);return[{x:r.x-w-px(10),y:r.y,w,h:r.h,s:0},{x:r.x+r.w+px(10),y:r.y,w,h:r.h,s:1}]};
const jTile=()=>{const w=px(72);return{x:A.W/2-w/2,y:A.H*.7,w,h:px(56)}};
function drawJoin(){const s=K.j;bg();if(s.n>=4){say('All 4 words made',A.H*.08,1);FLIP.forEach((f,i)=>say(`un${f[0]} = ${f[1]}`,A.H*(.27+i*.16),1));return}
say(`Word ${s.n+1} of 4: where does un- go?`,A.H*.08);const r=jWord();card(r,FLIP[s.n][0],{n:26});
jSlots().forEach(z=>card(z,null,{dash:1,edge:s.miss===z.s?BAD:null,fill:A.col.dark?'#334155':'#f8fafc'}));
const fz=jSlots()[0],g=A.ctx;g.fillStyle=A.col.tx;g.font=font(13,700);g.textAlign='center';g.textBaseline='middle';g.fillText('front',fz.x+fz.w/2,fz.y+fz.h+px(14));g.fillText('back',fz.x+fz.w*1.5+jWord().w+px(20),fz.y+fz.h+px(14));if(s.last){g.font=font(17,700);g.fillText(s.last,A.W/2,A.H*.24,A.W-12)}const d=K.drag,t=jTile();card(d?{...t,x:d.x-t.w/2,y:d.y-t.h/2}:t,'un',{fill:PREBG,ink:PRE,edge:d?HOLD:PRE,n:26})}
function join(side){const s=K.j;if(s.n>=4)return;const w=FLIP[s.n][0];
if(side===1){s.miss=1;A.sound.miss();return tell(`${w}un is not a word. un- is a prefix, so it goes at the front: un${w}.`)}
s.n++;s.miss=null;s.last=`un + ${w} = un${w}: ${FLIP[s.n-1][1]}`;A.sound.pop();tell(`un + ${w} = un${w}. It means ${FLIP[s.n-1][1]}.`+(s.n>=4?' All 4 made.':''))}
/* ---- step 2: un- undoes an action; tap the picture ---- */
function icon(kind,open,r){const g=A.ctx,cx=r.x+r.w/2,cy=r.y+r.h*.48,u=Math.min(r.w,r.h)/6;g.lineWidth=Math.max(3,u*.35);g.strokeStyle=DARK;g.fillStyle='#fde68a';g.lineCap='round';
if(kind==='lock'){g.beginPath();g.arc(cx,cy-u*.6-(open?u*.9:0),u*1.1,Math.PI,0);g.stroke();if(open){g.beginPath();g.moveTo(cx+u*1.1,cy-u*1.5);g.lineTo(cx+u*1.1,cy-u*.7);g.stroke()}
 g.fillRect(cx-u*1.7,cy-u*.6,u*3.4,u*2.6);g.strokeRect(cx-u*1.7,cy-u*.6,u*3.4,u*2.6);g.fillStyle=DARK;g.beginPath();g.arc(cx,cy+u*.5,u*.35,0,7);g.fill()}
if(kind==='lace'){g.beginPath();g.moveTo(cx-u*2.4,cy+u*1.5);g.lineTo(cx,cy);g.lineTo(cx+u*2.4,cy+u*1.5);g.stroke();
 if(!open){g.beginPath();g.ellipse(cx-u*1.1,cy-u*.5,u*1.1,u*.6,-.4,0,7);g.ellipse(cx+u*1.1,cy-u*.5,u*1.1,u*.6,.4,0,7);g.stroke()}else{g.beginPath();g.moveTo(cx,cy);g.lineTo(cx-u*1.8,cy-u*1.2);g.moveTo(cx,cy);g.lineTo(cx+u*1.9,cy-u*.4);g.stroke()}}
if(kind==='zip'){const top=cy-u*2,bot=cy+u*2;g.beginPath();if(open){g.moveTo(cx-u*2,top);g.lineTo(cx,bot);g.lineTo(cx+u*2,top)}else{g.moveTo(cx,top);g.lineTo(cx,bot)}g.stroke();
 g.fillStyle=DARK;g.fillRect(cx-u*.5,(open?bot:top)-u*.4,u,u*.9)}
if(kind==='bag'){g.lineWidth=Math.max(2.5,u*.2);const bw=open?u*3.2:u*4,bx=open?cx-u*2.4:cx-u*2;g.fillStyle='#bfdbfe';g.fillRect(bx,cy-u,bw,u*2.6);g.fillStyle='#fca5a5';
 const items=open?[[cx+u*1.75,cy-u*.7],[cx+u*1.75,cy+u*.45],[cx+u*1.75,cy+u*1.6]]:[[cx-u*1.2,cy+u*.4],[cx,cy+u*.4],[cx+u*1.2,cy+u*.4]];
 items.forEach(([a,b])=>{g.beginPath();g.arc(a,b,u*.5,0,7);g.fill();g.stroke()});g.strokeRect(bx,cy-u,bw,u*2.6)}}
const uPics=()=>{const w=(A.W-36)/2,h=Math.min(A.H*.42,w*.95);return[0,1].map(j=>({x:12+j*(w+12),y:A.H*.3,w,h,j}))};
function drawUndo(){const s=K.u;bg();if(s.n>=4){say('All 4 matched',A.H*.08,1);UNDO.forEach((u,i)=>say(`${u[0]}: it undoes ${u[0].slice(2)}`,A.H*(.27+i*.16),1));return}
const [w,ok,kind]=UNDO[s.n];say(`Picture ${s.n+1} of 4: which one shows ${w}?`,A.H*.08);card({x:A.W/2-px(80),y:A.H*.15,w:px(160),h:px(46)},w,{pre:1,n:24});
/* the "open" picture is the undone one, except lace and bag where the un- picture is drawn first */
uPics().forEach(r=>{card(r,null,{edge:s.miss===r.j?BAD:null});const undone=kind==='lace'||kind==='bag'?r.j===0:r.j===1;icon(kind,undone,r)})}
function pickUndo(j){const s=K.u;if(s.n>=4)return;const [w,ok]=UNDO[s.n];const root=w.slice(2);
if(j!==ok){s.miss=j;A.sound.miss();return tell(`That one is still ${root==='lock'?'locked':root==='tie'?'tied':root==='zip'?'zipped up':'packed'}. ${w} undoes ${root}, so it goes back the other way.`)}
s.n++;s.miss=null;A.sound.pop();tell(`${w}: un- undoes ${root}.`+(s.n>=4?' All 4 matched.':''))}
/* ---- step 3: spell it ---- */
const sOrder=n=>{const o=SPELL[n].slice(1),k=n%3;return o.slice(k).concat(o.slice(0,k))};
const sTiles=()=>{const h=px(54),gap=px(10);return[0,1,2].map(i=>({x:A.W/2-Math.min(px(110),A.W*.3),y:A.H*.42+i*(h+gap),w:Math.min(px(220),A.W*.6),h}))};
function drawSpell(){const s=K.s;bg();if(s.n>=4){say('All 4 spelled',A.H*.08,1);SPELL.forEach((q,i)=>say(`un + ${q[0]} = ${q[1]}`,A.H*(.27+i*.16),1));return}
say(`Word ${s.n+1} of 4: un + ${SPELL[s.n][0]}`,A.H*.08);note('Tap the right spelling.',A.H*.3);
sOrder(s.n).forEach((w,i)=>card(sTiles()[i],w,{edge:s.miss===w?BAD:null,n:24}))}
function spell(w){const s=K.s;if(s.n>=4)return;const q=SPELL[s.n];
if(w!==q[1]){s.miss=w;A.sound.miss();return tell(w.includes(' ')?`No gap. un- joins right on: ${q[1]}.`:w[0]==='o'?`The prefix is u then n: un. So ${q[1]}.`:`Keep ${q[0]} just as it is and put un in front: ${q[1]}.`)}
s.n++;s.miss=null;A.sound.pop();tell(`${q[1]}: un, then ${q[0]}, with no change.`+(s.n>=4?' All 4 spelled.':''))}
/* ---- step 4: real un- words ---- */
const rBins=()=>{const w=(A.W-30)/2;return[0,1].map(j=>({x:10+j*(w+10),y:A.H*.52,w,h:A.H*.44,j}))};
const rCard=()=>{const w=Math.min(A.W-60,px(180));return{x:A.W/2-w/2,y:A.H*.22,w,h:px(58)}};
const RB=['un + a word','not un-'],RS=['unfair = un + fair','under: der is no word'];
function drawReal(){const s=K.r,g=A.ctx;bg();say(s.n>=6?'All 6 sorted':`Word ${s.n+1} of 6: take off un. Is a word left?`,A.H*.08,s.n>=6);
rBins().forEach(r=>{g.fillStyle=BIN;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=BINR;g.lineWidth=2.5;g.stroke();g.fillStyle=DARK;g.textAlign='center';g.textBaseline='top';g.font=font(14);g.fillText(RB[r.j],r.x+r.w/2,r.y+8,r.w-8);
g.font=font(11,700);g.fillText(RS[r.j],r.x+r.w/2,r.y+8+px(18),r.w-8);g.font=font(17,700);REAL.slice(0,s.n).filter(x=>x[1]!==r.j).forEach((x,k)=>g.fillText(x[0],r.x+r.w/2,r.y+px(44)+k*px(24),r.w-8))});
if(s.n<6){const d=K.drag,b=rCard();card(d?{...b,x:d.x-b.w/2,y:d.y-b.h/2}:b,REAL[s.n][0],{edge:d?HOLD:s.miss?BAD:null,n:26})}}
function sortReal(j){const s=K.r;if(s.n>=6)return;const [w,real]=REAL[s.n],want=real?0:1;
if(j!==want){s.miss=1;A.sound.miss();return tell(real?`Take off un and ${w.slice(2)} is left. That is a real word, so ${w} is un + ${w.slice(2)}.`:`Take off un and ${w.slice(2)} is left. That is not a word, so ${w} just starts with u-n.`)}
s.n++;s.miss=0;A.sound.pop();tell((real?`${w} = un + ${w.slice(2)}.`:`${w} is one word. ${w.slice(2)} is not a word.`)+(s.n>=6?' All 6 sorted.':''))}
/* ---- step 5: which word fits? ---- */
const gOrder=n=>n%2?[GAPS[n][2],GAPS[n][1]]:[GAPS[n][1],GAPS[n][2]];
const gKeys=()=>{const w=Math.min(px(150),(A.W-36)/2),h=px(58);return[0,1].map(j=>({x:A.W/2+(j?8:-w-8),y:A.H*.74,w,h,j}))};
const gSlot=()=>({x:A.W/2-px(80),y:A.H*.52,w:px(160),h:px(50)});
function drawGap(){const s=K.g,g=A.ctx;bg();if(s.n>=4){say('All 4 sentences done',A.H*.08,1);GAPS.forEach((q,i)=>say(`${q[0]} ${q[1]}.`,A.H*(.27+i*.16),1));return}
say(`Sentence ${s.n+1} of 4`,A.H*.08);g.font=font(19,700);g.fillStyle=A.col.tx;g.textAlign='center';g.textBaseline='middle';
const words=GAPS[s.n][0].split(' '),lines=[''];words.forEach(w=>{const t=lines[lines.length-1]?lines[lines.length-1]+' '+w:w;if(g.measureText(t).width>A.W-30)lines.push(w);else lines[lines.length-1]=t});lines.forEach((l,k)=>g.fillText(l,A.W/2,A.H*.24+k*px(28)));
card(gSlot(),null,{dash:1});const d=K.drag;gOrder(s.n).forEach((w,j)=>{const b=gKeys()[j];card(d&&d.j===j?{...b,x:d.x-b.w/2,y:d.y-b.h/2}:b,w,{fill:PREBG,edge:d&&d.j===j?HOLD:s.miss===w?BAD:null,n:22,pre:w.startsWith('un')})})}
function fill(w){const s=K.g;if(s.n>=4)return;const q=GAPS[s.n];
if(w!==q[1]){s.miss=w;A.sound.miss();return tell(q[1]==='kind'?'A hug is a nice thing to do, so Gran is kind. unkind would mean not kind.':q[1]==='untie'?'The laces are tied now. To take shoes off you undo the bow: untie.':`un${q[2]} means not ${q[2]}. ${q[0]} ... ${q[1]}.`)}
s.n++;s.miss=null;A.sound.pop();tell(`${q[0]} ${q[1]}.`+(s.n>=4?' All 4 done.':''))}
function draw(){const k=stage();if(k==='quiz'){bg();say('Challenge',A.H*.25,1);say('unhappy = not happy  ·  unlock undoes lock',A.H*.55);return}
({join:drawJoin,undo:drawUndo,spell:drawSpell,real:drawReal,gap:drawGap})[k]();A.fx.draw(A.ctx)}
function down(p){const k=stage();
if(k==='join'&&K.j.n<4){if(hit(p,jTile())){K.drag={x:p.x,y:p.y};return true}const z=jSlots().find(r=>hit(p,r));if(z)join(z.s);return false}
if(k==='undo'){const r=uPics().find(q=>hit(p,q));if(r)pickUndo(r.j);return false}
if(k==='spell'&&K.s.n<4){const i=sTiles().findIndex(r=>hit(p,r));if(i>=0)spell(sOrder(K.s.n)[i]);return false}
if(k==='real'&&K.r.n<6){if(hit(p,rCard())){K.drag={x:p.x,y:p.y};return true}const b=rBins().find(r=>hit(p,r));if(b)sortReal(b.j);return false}
if(k==='gap'&&K.g.n<4){const b=gKeys().find(r=>hit(p,r));if(b){K.drag={j:b.j,x:p.x,y:p.y};return true}}return false}
function move(p){if(K.drag){K.drag.x=p.x;K.drag.y=p.y;A.redraw()}}
function up(p){const d=K.drag;if(!d)return;K.drag=null;const k=stage();
if(k==='join'){const z=jSlots().find(r=>hit(p,{x:r.x-20,y:r.y-20,w:r.w+40,h:r.h+40}));if(z)join(z.s);else A.redraw();return}
if(k==='real'){const b=rBins().find(r=>hit(p,r));if(b)sortReal(b.j);else A.redraw();return}
if(k==='gap'){const sl=gSlot();if(hit(p,{x:sl.x-24,y:sl.y-24,w:sl.w+48,h:sl.h+48})||hit(p,gKeys()[d.j]))fill(gOrder(K.g.n)[d.j]);else A.redraw()}}
function reset(){run++;for(const k in K)delete K[k];Object.assign(K,{j:{n:0},u:{n:0},s:{n:0},r:{n:0},g:{n:0},drag:null,test:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();K.test()}
function setup(i,desc,met,msg){reset();tell(desc);K.test=()=>{if(A.step===i&&met()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,moves,ms){steps[i].go();const me=run;moves.forEach((f,j)=>setTimeout(()=>{if(me===run)f()},ms*(j+1)))}
function buttons(){if(!row)return;row.innerHTML='';const k=stage(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
if(k==='join'&&K.j.n<4){const w=FLIP[K.j.n][0];add('un- at the front',()=>join(0),`Put un- in front of ${w}`);add('un- at the back',()=>join(1),`Put un- after ${w}`)}
if(k==='undo'&&K.u.n<4)['left picture','right picture'].forEach((t,j)=>add(t,()=>pickUndo(j),`${UNDO[K.u.n][0]}: the ${t}`));
if(k==='spell'&&K.s.n<4)sOrder(K.s.n).forEach(w=>add(w,()=>spell(w),`Spell it ${w}`));
if(k==='real'&&K.r.n<6)RB.forEach((t,j)=>add(t,()=>sortReal(j),`${REAL[K.r.n][0]}: ${t}`));
if(k==='gap'&&K.g.n<4)gOrder(K.g.n).forEach(w=>add(w,()=>fill(w),`Fill the gap with ${w}`))}
const steps=[
{h:'un- goes at the front',p:'un- is a prefix. A prefix goes at the front of a word. Drag un- to the front of each word.',
predict:{q:'What does unhappy mean?',opts:['very happy','not happy'],ans:1},task:'Make all 4 un- words',
show:()=>play(0,FLIP.map(()=>()=>join(0)),650),
go:()=>setup(0,'Word: happy. Tile: un. Slots in front and at the back.',()=>K.j.n>=4,'un- at the front flips the meaning: unkind = not kind.')},
{h:'un- can undo',p:'un- can also undo a job. unlock undoes lock. Tap the picture that shows the un- word.',
predict:{q:'You unzip your coat. What happens?',opts:['It shuts','It opens'],ans:1},task:'Match all 4 pictures',
show:()=>play(1,UNDO.map(u=>()=>pickUndo(u[1])),800),
go:()=>setup(1,'unlock. Left: a shut lock. Right: an open lock.',()=>K.u.n>=4,'unlock, untie, unzip, unpack: each one undoes the job.')},
{h:'Spell it',p:'Put un in front. Keep the word the same. No gap.',task:'Spell all 4 words',
show:()=>play(2,SPELL.map(q=>()=>spell(q[1])),800),
go:()=>setup(2,'un + happy. Choices: unhappy, unhapy, un happy.',()=>K.s.n>=4,'un + the word, with every letter kept.')},
{h:'Is it really un-?',p:'Some words just start with u and n. Take off un. If a real word is left, it is un- + a word.',
predict:{q:'Is under like unhappy, un + a word?',opts:['Yes','No'],ans:1},task:'Sort all 6 words',
show:()=>play(3,REAL.map(x=>()=>sortReal(x[1]?0:1)),500),
go:()=>setup(3,'Card: unfair. Boxes: un + a word, or not un-.',()=>K.r.n>=6,'unfair, unlock, untidy have un-. under, uncle, unicorn do not.')},
{h:'Pick the word',p:'Read the sentence. Does it need the un- word or the plain word? Careful: not every gap needs un-.',task:'Finish all 4 sentences',
show:()=>play(4,GAPS.map(q=>()=>fill(q[1])),800),
go:()=>setup(4,'The bed is a mess. It is ___. Choices: untidy or tidy.',()=>K.g.n>=4,'un- flips the meaning, so pick it only when you mean not.')},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.test()});
const QS=[
{q:'What does unkind mean?',a:'not kind',o:[['very kind','very'],['kind again','again']]},
{q:'Which is spelt right?',a:'unpack',o:[['onpack','on'],['un pack','gap']]},
{q:'You unlock a door. What happens?',a:'It opens',o:[['It gets locked','lockit'],['Nothing','nothing']]},
{q:'Which word has the prefix un-?',a:'unwell',o:[['under','under'],['uncle','uncle']]},
{q:'Where does un- go in unfair?',a:'at the front',o:[['at the end','end'],['in the middle','middle']]},
{q:'The dog is not happy. The dog is ...',a:'unhappy',o:[['happy','plain'],['happyun','back']]}];
function reason(t){let m='un- goes at the front and means not, or undoes a job.';
switch(t){case 'very':m='un- does not mean very. unkind means not kind.';break;
case 'again':m='Doing it again is re-, not un-. unkind means not kind.';break;
case 'on':m='The prefix is spelt u then n: unpack.';break;
case 'gap':m='un- joins on with no gap: unpack.';break;
case 'lockit':m='unlock undoes lock, so the lock opens. It does not lock it.';break;
case 'nothing':m='unlock is a job: it opens the lock.';break;
case 'under':m='Take un off under and der is left. That is not a word, so under has no prefix.';break;
case 'uncle':m='Take un off uncle and cle is left. That is not a word, so uncle has no prefix.';break;
case 'end':m='A prefix goes at the front. un + fair = unfair.';break;
case 'middle':m='un- goes at the very front, before the whole word fair.';break;
case 'plain':m='happy is the opposite. not happy is unhappy.';break;
case 'back':m='un- goes at the front, not the back: unhappy.';break}
return m}
function next(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const box=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+reason(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':reason(t))}
FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:B=>{quiz.hidden=B.step!==5;row.hidden=B.step===5;buttons()},
init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'un- word buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
