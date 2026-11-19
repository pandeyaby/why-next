/* Flagship – number words to twenty (ages 5–6; NC 2013 Year 1 "read and write numbers from 1 to 20 in numerals and
   words"; NCETM Mastering Number Year 1 teen numbers). Scenes: read a word to its numeral, build a teen numeral in a
   tens box and a ones box, pick the right teen spelling, drag word cards onto an 11-20 track, and check a robot that
   writes numerals for words. Data in learn/numword_art.js. */
(()=>{const {WORD,READ,TEEN,SPELL,CARDS,ROBOT,DESC,DONE,QS}=NWD;
VIS.reg('flagnumword',c=>{let A,ctl,chal,qi=-1,run=0;const K={};c.fig.classList.add('young');
const INK='#1e293b',OK='#047857',NO='#b91c1c',RULE='#64748b',SEL='#7c3aed',TENC='#2563eb',ONEC='#d97706',FONT='px system-ui,sans-serif';
const part=()=>['read','teen','spell','track','robot','quiz'][A.step];
const big=n=>A.narrow?n:Math.round(n*1.25);
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function sky(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fef3c7',A.col.dark?.06:.45);g.fillRect(0,0,A.W,A.H)}
function word(t,x,y,n,col,wt){const g=A.ctx;g.font=`${wt||800} ${big(n)}${FONT}`;g.fillStyle=col||A.col.tx;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y)}
function banner(t,x,y,o){o=o||{};const g=A.ctx;let n=big(o.n||14);g.font=`800 ${n}${FONT}`;let w=g.measureText(t).width+26;
 while(w>A.W-10&&n>10){n--;g.font=`800 ${n}${FONT}`;w=g.measureText(t).width+26}
 const h=n+16,x0=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(x0,y-h/2,w,h,12);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?OK:o.no?NO:RULE;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x0+w/2,y+1)}
function tile(r,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':o.on?'#ede9fe':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();
 g.lineWidth=o.no||o.ok||o.on?3.5:1.5;g.strokeStyle=o.no?NO:o.ok?OK:o.on?SEL:RULE;g.stroke()}
/* a 2 x 5 grid of keys holding the values in vals */
function keyGrid(vals,y0,h0){const cols=5,gap=8,w=Math.min(80,(A.W-24-gap*(cols-1))/cols),h=Math.min(h0,58),x0=(A.W-(w*cols+gap*(cols-1)))/2;
 return vals.map((v,i)=>({v,x:x0+(i%cols)*(w+gap),y:y0+Math.floor(i/cols)*(h+gap),w,h}))}
/* a ten frame: filled dots for n (0..10) */
function frame(x,y,cell,n,col){const g=A.ctx;for(let i=0;i<10;i++){const cx=x+(i%5)*cell,cy=y+Math.floor(i/5)*cell;g.strokeStyle=RULE;g.lineWidth=1.5;g.strokeRect(cx,cy,cell,cell);
 if(i<n){g.fillStyle=col;g.beginPath();g.arc(cx+cell/2,cy+cell/2,cell*.34,0,7);g.fill()}}}
/* 1. read a word, tap its numeral */
const readKeys=()=>keyGrid([1,2,3,4,5,6,7,8,9,10],A.H*.6,A.H*.16);
function drawRead(){const s=K.a;sky();if(s.i>=READ.length){banner('All 3 words read',A.W/2,A.H*.14,{ok:1});banner('six = 6, nine = 9, two = 2',A.W/2,A.H*.34,{n:15});return}
 const v=READ[s.i];banner(`Word ${s.i+1} of ${READ.length}. Which numeral is it?`,A.W/2,A.H*.08,{n:12});
 const card={x:A.W/2-Math.min(110,A.W*.3),y:A.H*.17,w:Math.min(220,A.W*.6),h:A.H*.24};tile(card,{});word(WORD[v],A.W/2,card.y+card.h/2,30,INK,900);
 const cell=Math.min(20,A.W/18);if(s.show){frame(A.W/2-cell*2.5,A.H*.45,cell,s.show,TENC);word(`${WORD[s.show]} = ${s.show}`,A.W/2,A.H*.45+cell*2+12,12,A.col.tx,800)}
 readKeys().forEach(r=>{tile(r,{no:s.bad===r.v});word(String(r.v),r.x+r.w/2,r.y+r.h/2+1,20,INK,900)})}
function readTap(v){const s=K.a;if(s.i>=READ.length)return;const w=READ[s.i],ww=WORD[w];
 if(v!==w){s.bad=v;A.sound.miss();const same=WORD[v][0]===ww[0];
  return tell(same?`${v} is ${WORD[v]}. ${WORD[v]} and ${ww} both start with ${ww[0]}. Read past the first letter.`:`${v} is ${WORD[v]}. Read the word again, letter by letter: ${ww.split('').join('-')}.`)}
 s.bad=-1;s.show=w;A.sound.pop();s.i++;tell(`Yes: ${ww} is ${w}.`+(s.i<READ.length?' Next word.':''))}
/* 2. build a teen numeral: tens box then ones box */
const digitKeys=()=>keyGrid([1,2,3,4,5,6,7,8,9,0],A.H*.66,A.H*.14);
const slotR=()=>{const w=Math.min(76,A.W*.2),h=Math.min(86,A.H*.22);return[{k:0,x:A.W/2-w-6,y:A.H*.3,w,h},{k:1,x:A.W/2+6,y:A.H*.3,w,h}]};
function drawTeen(){const s=K.b,g=A.ctx;sky();if(s.i>=TEEN.length){banner('All 3 teen numbers built',A.W/2,A.H*.14,{ok:1});banner('17, 14 and 19: one ten first',A.W/2,A.H*.34,{n:15});return}
 const n=TEEN[s.i];banner(`Build the numeral for: ${WORD[n]}`,A.W/2,A.H*.08,{n:14});
 slotR().forEach(r=>{tile(r,{no:s.bad&&s.got.length===2,on:s.got.length===r.k});word(s.got[r.k]==null?'':String(s.got[r.k]),r.x+r.w/2,r.y+r.h/2+2,34,INK,900);
  word(r.k?'ones':'tens',r.x+r.w/2,r.y-12,11,r.k?ONEC:TENC,800)});
 const cell=Math.min(13,A.W/32);if(s.show){frame(A.W*.06,A.H*.31,cell,10,TENC);frame(A.W*.94-cell*5,A.H*.31,cell,n-10,ONEC)}
 g.lineWidth=1;digitKeys().forEach(r=>{tile(r,{});word(String(r.v),r.x+r.w/2,r.y+r.h/2+1,20,INK,900)});A.fx.draw(g)}
function teenTap(v){const s=K.b;if(s.i>=TEEN.length)return;if(s.got.length>=2){s.got=[];s.bad=false}
 s.got.push(v);A.sound.tick();if(s.got.length<2)return tell(`Tens box: ${v}. Now tap the ones digit.`);
 const n=TEEN[s.i],t=s.got[0],o=s.got[1],ones=n-10;
 if(t===1&&o===ones){s.bad=false;s.show=true;A.sound.pop();const msg=`Yes: ${WORD[n]} is 1 ten and ${ones} ones, ${n}.`;s.i++;s.got=[];
  setTimeout(()=>{s.show=false;A.redraw()},900);return tell(msg+(s.i<TEEN.length?' Next word.':''))}
 s.bad=true;A.sound.miss();
 if(t===ones&&o===1)return tell(`${WORD[n]} says ${WORD[ones]} first, but ${ones} is the ones. Teen means one ten, and the ten goes first: ${n}. Tap a key to try again.`);
 if(t===ones&&o===0)return tell(`${ones}0 is ${WORD[ones]}ty, ${ones} tens. ${WORD[n]} ends in -teen: one ten and ${ones} ones. Tap a key to try again.`);
 tell(`Teen numbers have 1 ten. Put 1 in the tens box, then the ones you hear: ${ones}. Tap a key to try again.`)}
/* 3. pick the right teen spelling */
const pickR=()=>{const w=Math.min(250,A.W-30),h=Math.min(60,A.H*.15);return[0,1,2].map(k=>({k,x:(A.W-w)/2,y:A.H*.42+k*(h+10),w,h}))};
function spellOrder(S){const all=[[S.ok,'ok'],...S.o],r=S.n%3;return all.slice(r).concat(all.slice(0,r))}
function drawSpell(){const s=K.c;sky();if(s.i>=SPELL.length){banner('All 4 spelt',A.W/2,A.H*.14,{ok:1});banner('thirteen, fifteen, eighteen, twelve',A.W/2,A.H*.34,{n:14});return}
 const S=SPELL[s.i];banner(`Numeral ${s.i+1} of ${SPELL.length}. Tap the right word.`,A.W/2,A.H*.08,{n:12});word(String(S.n),A.W/2,A.H*.26,48,A.col.tx,900);
 const ord=spellOrder(S);pickR().forEach(r=>{tile(r,{no:s.bad===r.k});word(ord[r.k][0],r.x+r.w/2,r.y+r.h/2+1,20,INK,800)})}
const SPELLWHY={thir:'Three changes to thir in thirteen: there is no threeteen.',fif:'Five changes to fif in fifteen: there is no fiveteen.',eigh:'Eight already ends in t, so eighteen has only one t.',own:'There is no twoteen. 12 has its own word: twelve.',ty:'Words ending in -ty mean tens: thirty is 30, fifty is 50. Teen numbers end in -teen.'};
function spellTap(k){const s=K.c;if(s.i>=SPELL.length)return;const S=SPELL[s.i],[w,t]=spellOrder(S)[k];
 if(t!=='ok'){s.bad=k;A.sound.miss();return tell(`${w}: ${SPELLWHY[t]}`)}
 s.bad=-1;A.sound.pop();s.i++;tell(`Yes: ${S.n} is ${S.ok}.`+(s.i<SPELL.length?' Next numeral.':''))}
/* 4. drag word cards onto an 11-20 track */
function trackCells(){const cols=A.narrow?5:10,gap=6,w=Math.min(64,(A.W-12-gap*(cols-1))/cols),h=Math.min(64,A.H*.15),x0=(A.W-(w*cols+gap*(cols-1)))/2;
 return Array.from({length:10},(_,i)=>({v:11+i,x:x0+(i%cols)*(w+gap),y:A.H*.17+Math.floor(i/cols)*(h+gap),w,h}))}
function cardHome(i){const gap=8,w=Math.min(120,(A.W-24-gap)/2),h=Math.min(56,A.H*.14),x0=(A.W-(w*2+gap))/2;return{x:x0+(i%2)*(w+gap),y:A.H*.64+Math.floor(i/2)*(h+gap),w,h}}
function drawTrack(){const s=K.d,g=A.ctx;sky();const done=s.placed.every(Boolean);
 banner(done?'All 4 cards are on the track':s.pick<0?'Drag each card to its numeral':`Now tap the box for: ${CARDS[s.pick].w}`,A.W/2,A.H*.08,{n:12,ok:done});
 const cells=trackCells();cells.forEach(r=>{const at=CARDS.findIndex((C,i)=>s.placed[i]&&C.n===r.v);tile(r,{no:s.bad===r.v,ok:at>=0});
  word(String(r.v),r.x+r.w/2,r.y+(at>=0?r.h*.33:r.h/2+1),16,INK,900);if(at>=0)word(CARDS[at].w,r.x+r.w/2,r.y+r.h*.72,10,INK,800)});
 CARDS.forEach((C,i)=>{if(s.placed[i])return;let r=cardHome(i);if(s.drag&&s.drag.i===i)r={...r,x:s.drag.x-r.w/2,y:s.drag.y-r.h/2};tile(r,{on:s.pick===i});word(C.w,r.x+r.w/2,r.y+r.h/2+1,17,INK,900)})}
function cardWhy(C,v){if(C.w==='twelve'&&v===20)return 'Twelve and twenty both start with tw. Twenty is 20; twelve is 12.';
 if(C.w==='twenty')return `${v} is ${WORD[v]}. Twenty ends in -ty: 2 tens and no ones, 20.`;
 if(C.n<13)return `${v} is ${WORD[v]}. ${C.w} is ${C.n}: it has its own word, with no teen in it.`;
 return `${v} is ${WORD[v]}. ${C.w} is ${C.n}: teen means one ten, then the ones.`}
function placeCard(i,v){const s=K.d;if(i<0||s.placed[i])return tell('Pick a word card first.');const C=CARDS[i];
 if(v!==C.n){s.bad=v;A.sound.miss();return tell(cardWhy(C,v))}
 s.placed[i]=true;s.pick=-1;s.bad=-1;A.sound.pop();tell(`Yes: ${C.w} is ${C.n}.`)}
/* 5. the robot writes numerals for words */
const verdictR=()=>[0,1].map(k=>{const w=Math.min(170,(A.W-36)/2);return{k,x:A.W/2+(k?6:-w-6),y:A.H*.74,w,h:Math.min(A.H*.17,64)}});
function drawRobot(){const s=K.e,g=A.ctx;sky();if(s.i>=ROBOT.length){banner('All 4 robot answers checked',A.W/2,A.H*.15,{ok:1});banner('Slips: ones first, and twelve as twenty',A.W/2,A.H*.4,{n:13});return}
 const R=ROBOT[s.i],cx=A.W*.15,cy=A.H*.32,u=Math.min(A.W*.08,36);
 g.fillStyle='#94a3b8';A.paint.rrect(cx-u,cy-u,u*2,u*1.7,10);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();g.fillStyle='#0ea5e9';[-1,1].forEach(e=>{g.beginPath();g.arc(cx+e*u*.45,cy-u*.3,u*.22,0,7);g.fill()});
 g.fillStyle=INK;g.fillRect(cx-u*.4,cy+u*.25,u*.8,u*.12);
 banner(`The word is "${R.w}".`,A.W*.6,A.H*.16,{n:14});banner(`The robot writes: ${R.wrote}`,A.W*.6,A.H*.36,{n:15});banner(`Robot ${s.i+1} of ${ROBOT.length}. Right, or a slip?`,A.W/2,A.H*.56,{n:12});
 verdictR().forEach(r=>{tile(r,{no:s.bad===r.k});word(r.k?'✗ Slip':'✓ Right',r.x+r.w/2,r.y+r.h/2+1,17,INK,900)})}
function judge(k){const s=K.e;if(s.i>=ROBOT.length)return;const R=ROBOT[s.i];
 if((k===0)!==R.ok){s.bad=k;A.sound.miss();return tell(R.ok?`Look again: ${R.fix}`:`Say the word slowly and check each digit. ${R.fix}`)}
 s.bad=-1;A.sound.pop();s.i++;tell((R.ok?'Yes, right. ':'Yes, a slip. ')+R.fix)}
function draw(){const k=part();if(k==='quiz'){sky();banner('Challenge',A.W/2,A.H*.2,{ok:1});banner('Read every letter. Teen: the ten goes first.',A.W/2,A.H*.5,{n:13});return}
 ({read:drawRead,teen:drawTeen,spell:drawSpell,track:drawTrack,robot:drawRobot})[k]();if(k!=='teen')A.fx.draw(A.ctx)}
function down(p){const k=part();
 if(k==='read'){const r=readKeys().find(q=>hit(p,q));if(r)readTap(r.v);return false}
 if(k==='teen'){const r=digitKeys().find(q=>hit(p,q));if(r)teenTap(r.v);return false}
 if(k==='spell'){const r=pickR().find(q=>hit(p,q));if(r)spellTap(r.k);return false}
 if(k==='track'){const s=K.d,i=CARDS.findIndex((_,j)=>!s.placed[j]&&hit(p,cardHome(j)));
  if(i>=0){s.pick=i;s.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.sound.tick();tell(`Picked ${CARDS[i].w}. Drag it, or tap its numeral.`);return true}
  const cell=trackCells().find(q=>hit(p,q));if(cell&&s.pick>=0)placeCard(s.pick,cell.v);return false}
 if(k==='robot'){const v=verdictR().find(q=>hit(p,q));if(v)judge(v.k);return false}
 return false}
function move(p){const s=K.d;if(s.drag){s.drag.x=p.x;s.drag.y=p.y;A.redraw()}}
function up(p){const s=K.d;if(!s.drag)return;const d=s.drag;s.drag=null;const moved=Math.hypot(p.x-d.x0,p.y-d.y0)>12;
 const cell=trackCells().find(q=>p.x>=q.x&&p.x<=q.x+q.w&&p.y>=q.y-20&&p.y<=q.y+q.h+20);if(moved&&cell)placeCard(d.i,cell.v);else A.redraw()}
function reset(){run++;for(const k in K)delete K[k];Object.assign(K,{a:{i:0,bad:-1,show:0},b:{i:0,got:[],bad:false,show:false},c:{i:0,bad:-1},d:{placed:CARDS.map(()=>false),pick:-1,bad:-1,drag:null},e:{i:0,bad:-1},check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();K.check()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){reset();tell(DESC[i]);K.check=finish(i,ok,DONE[i])}
function play(i,acts,ms){steps[i].go();const r0=run;acts.forEach((f,j)=>setTimeout(()=>{if(r0===run)f()},ms*(j+1)))}
const steps=[
{h:'Read the word',p:'Read the number word on the card. Tap the numeral that matches it.',
 predict:{q:'six and seven both start with s. Is the first letter enough to read the word?',opts:['Yes, the first letter is enough','No, read all the letters'],ans:1},task:'Read all 3 words',
 show:()=>play(0,READ.map(v=>()=>readTap(v)),600),go:()=>begin(0,()=>K.a.i>=READ.length)},
{h:'Teen numbers',p:'Teen words say the ones first. Build the numeral: tap the tens digit, then the ones digit.',
 predict:{q:'seventeen. Which digit do you write first?',opts:['7, because you say seven first','1, for the one ten'],ans:1},task:'Build 17, 14 and 19',
 show:()=>play(1,TEEN.flatMap(n=>[()=>teenTap(1),()=>teenTap(n-10)]),550),go:()=>begin(1,()=>K.b.i>=TEEN.length)},
{h:'Spell the teens',p:'Some teen words change their first part. Tap the right spelling for each numeral.',
 predict:{q:'How do you spell 15?',opts:['fiveteen: five + teen','fifteen: five changes to fif'],ans:1},task:'Spell all 4 numerals',
 show:()=>play(2,SPELL.map(S=>()=>spellTap(spellOrder(S).findIndex(o=>o[1]==='ok'))),650),go:()=>begin(2,()=>K.c.i>=SPELL.length)},
{h:'Words on the track',p:'Drag each word card to its numeral on the track. Eleven, twelve and twenty have no teen in them.',task:'Put all 4 cards on the track',
 show:()=>play(3,CARDS.map((C,i)=>()=>{K.d.pick=i;placeCard(i,C.n)}),650),go:()=>begin(3,()=>K.d.placed.every(Boolean))},
{h:'Spot the slip',p:'The robot hears a number word and writes the numeral. Is it right, or did it slip?',task:'Check all 4 robot answers',
 show:()=>play(4,ROBOT.map(R=>()=>judge(R.ok?0:1)),700),go:()=>begin(4,()=>K.e.i>=ROBOT.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.check()});
function why(t){let m='Read every letter, and write the ten first in a teen number.';
 if(t==='order')m='Teen words say the ones first, but you write the 1 ten first: nineteen is 19, not 91.';
 if(t==='ty')m='Words that end in -ty mean tens: fifty is 50, twenty is 20. Teen numbers end in -teen.';
 if(t==='fif')m='Five changes to fif in fifteen. There is no fiveteen.';
 if(t==='thir')m='Three changes to thir in thirteen. There is no threeteen.';
 if(t==='own')m='11 and 12 have their own words: eleven and twelve. There is no twoteen.';
 if(t==='first')m='Two words can start with the same letter. Read all the letters: s-i-x is six.';
 if(t==='teen')m='A word that ends in -teen is more than ten. Six is just 6.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+why(t))+' <button type="button" class="lbtn sm">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='read'&&K.a.i<READ.length)for(let v=1;v<=10;v++)B(String(v),()=>readTap(v),`Numeral ${v}`);
 if(k==='teen'&&K.b.i<TEEN.length)for(const v of [1,2,3,4,5,6,7,8,9,0])B(String(v),()=>teenTap(v),`Digit ${v}`);
 if(k==='spell'&&K.c.i<SPELL.length)spellOrder(SPELL[K.c.i]).forEach(([w],j)=>B(w,()=>spellTap(j),`Spelling: ${w}`));
 if(k==='track'){const s=K.d;if(s.pick<0)CARDS.forEach((C,i)=>{if(!s.placed[i])B(C.w,()=>{s.pick=i;tell(`Picked ${C.w}. Now choose its numeral.`)},`Pick the card ${C.w}`)});
  else for(let v=11;v<=20;v++)B(String(v),()=>placeCard(s.pick,v),`Put ${CARDS[s.pick].w} on ${v}`)}
 if(k==='robot'&&K.e.i<ROBOT.length){B('✓ Right',()=>judge(0),'The robot is right');B('✗ Slip',()=>judge(1),'The robot made a slip')}}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:S=>{chal.hidden=S.step!==5;ctl.hidden=S.step===5;controls()},
 init:S=>{A=S;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Number words lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});controls()}}).start()})})();
