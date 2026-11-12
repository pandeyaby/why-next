/* Flagship – capitals for names, days and I (ages 5–7; NC England Y1 Appendix 2 "capital letters for names and for the
   personal pronoun I", Y1 spelling: days of the week; CCSS L.1.2a "capitalize dates and names of people").
   Sort name words from ordinary words, tap the names in sentences, stamp a capital on day names (not sunny or morning),
   fix the lone i but not in or it, then fill a postcard where one word must stay small. Not flagstop (sentence starts). */
(()=>{
const SORTW=[['sam',0],['dog',1],['leeds',0],['park',1],['mia',0],['girl',1],['london',0],['town',1]];
const BINS=['a name','not a name'],BSUB=['Big letter','small letter'];
/* sentences as words; names to fix are marked by index */
const NAMES=[{w:['We','met','sam','at','school','.'],fix:[2]},{w:['My','dog','is','called','rex','.'],fix:[4]},{w:['I','sat','with','ben','and','amy','.'],fix:[3,5]},{w:['We','went','to','york','by','bus','.'],fix:[3]}];
const DAYW=[['monday',1],['morning',0],['friday',1],['sunny',0],['sunday',1],['week',0]];
const IW=[{w:['Mum','and','i','went','in','.'],fix:[2]},{w:['Can','i','sit','in','it','?'],fix:[1]},{w:['Ben','and','i','like','it','.'],fix:[2]}];
/* postcard: text before, right word, wrong word */
const CARD=[['On','Monday','monday'],['we went to','Leeds','leeds'],['with','Raj','raj'],['and','I','i'],['saw a big','dog','Dog']];
const up1=w=>w[0].toUpperCase()+w.slice(1);
VIS.reg('flagnamecap',c=>{let A,bar,chal,cq=-1,tok=0;c.fig.classList.add('young');
const Z={};
const INK='#1e293b',YES='#047857',NO='#b91c1c',LINE='#64748b',HELD='#1d4ed8',CAPF='#e0e7ff',CAPI='#3730a3',BOXF='#ecfccb',BOXE='#3f6212';
const sz=n=>Math.round(n*(A.narrow?1:1.2)),fnt=(n,w)=>`${w||800} ${sz(n)}px system-ui,sans-serif`;
const part=()=>['sort','names','days','me','card','quiz'][A.step],on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function wash(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#eef2ff',A.col.dark?.05:.5);g.fillRect(0,0,A.W,A.H)}
function banner(t,y,ok){const g=A.ctx;let n=15;g.font=fnt(n);while(g.measureText(t).width+28>A.W-8&&n>10){n--;g.font=fnt(n)}
const w=g.measureText(t).width+26,h=sz(n)+16;g.fillStyle='#ffffff';A.paint.rrect(A.W/2-w/2,y-h/2,w,h,10);g.fill();g.lineWidth=ok?3:1.5;g.strokeStyle=ok?YES:LINE;g.stroke();
g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function pill(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=o.rim?4:2;g.strokeStyle=o.rim||LINE;if(o.dash)g.setLineDash([6,5]);g.stroke();g.setLineDash([]);
if(t==null)return;g.font=fnt(o.n||22);g.textAlign='center';g.textBaseline='middle';const w=g.measureText(t).width;
if(o.cap&&t.length){const first=t[0],rest=t.slice(1),w1=g.measureText(first).width,x=r.x+r.w/2-w/2;g.textAlign='left';g.fillStyle=CAPI;g.fillText(first,x,r.y+r.h/2+1);g.fillStyle=o.fg||INK;g.fillText(rest,x+w1,r.y+r.h/2+1);return}
g.fillStyle=o.fg||INK;g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-6)}
/* flow words into rows that fit the canvas */
function flow(ws,y0,n){const g=A.ctx;g.font=fnt(n||21);const gap=sz(8),h=sz(52),rows=[[]];let x=8;const R=[];
ws.forEach((w,i)=>{const mark=/^[.?]$/.test(w),wd=mark?sz(16):g.measureText(w).width+sz(24);if(x+wd>A.W-8&&rows[rows.length-1].length){rows.push([]);x=8}rows[rows.length-1].push(i);R[i]={x,w:wd,row:rows.length-1};x+=wd+gap});
rows.forEach((ix,k)=>{const last=R[ix[ix.length-1]],shift=(A.W-8-(last.x+last.w))/2;ix.forEach(i=>{R[i].x+=shift;R[i].y=y0+k*(h+sz(10));R[i].h=h})});return R}
function words(ws,shown,miss){const R=flow(ws,A.H*.32);ws.forEach((w,i)=>{const r=R[i];if(/^[.?]$/.test(w)){const g=A.ctx;g.fillStyle=A.col.tx;g.font=fnt(26);g.textAlign='center';g.textBaseline='middle';g.fillText(w,r.x+r.w/2,r.y+r.h/2);return}
const big=shown.includes(i);pill(r,big?up1(w):w,{cap:big,rim:big?YES:miss===i?NO:null,bg:big?CAPF:null})});return R}
/* step 1: name or not */
function sBins(){const w=(A.W-30)/2;return BINS.map((t,j)=>({t,j,x:10+j*(w+10),y:A.H*.5,w,h:A.H*.44}))}
function sCard(){const w=Math.min(A.W-60,sz(190));return{x:A.W/2-w/2,y:A.H*.2,w,h:sz(56)}}
function drawSort(){const s=Z.s,g=A.ctx;wash();banner(s.n>=8?'All 8 sorted':`Word ${s.n+1} of 8: is it a name?`,A.H*.07,s.n>=8);
sBins().forEach(r=>{g.fillStyle=BOXF;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=BOXE;g.lineWidth=2.5;g.stroke();g.fillStyle=INK;g.font=fnt(14);g.textAlign='center';g.textBaseline='top';g.fillText(r.t,r.x+r.w/2,r.y+8,r.w-8);g.font=fnt(12,700);g.fillText(BSUB[r.j],r.x+r.w/2,r.y+8+sz(18),r.w-8);
const got=SORTW.slice(0,s.n).filter(x=>x[1]===r.j).map(x=>r.j?x[0]:up1(x[0]));g.font=fnt(17,700);got.forEach((w,k)=>g.fillText(w,r.x+r.w/2,r.y+sz(42)+k*sz(24),r.w-8))});
if(s.n<8){const d=Z.drag,b=sCard();pill(d?{...b,x:d.x-b.w/2,y:d.y-b.h/2}:b,SORTW[s.n][0],{rim:d?HELD:s.miss?NO:null,n:26})}}
function putSort(j){const s=Z.s;if(s.n>=8)return;const [w,k]=SORTW[s.n];
if(j!==k){s.miss=1;A.sound.miss();return speak(k?`${w} is a kind of thing, not a name. It keeps a small letter.`:`${w} is the name of ${['sam','mia'].includes(w)?'a person':'a place'}. Names get a big letter: ${up1(w)}.`)}
s.n++;s.miss=0;A.sound.pop();speak((k?`${w}: small letter.`:`${up1(w)}: a name, so a capital.`)+(s.n>=8?' All 8 sorted.':''))}
/* steps 2 and 4: tap words that need a capital */
function tapWord(key,i){const s=Z[key],L=s.list[s.n];if(!L)return;const w=L.w[i];if(/^[.?]$/.test(w))return;
if(s.got.includes(i))return speak(`${up1(w)} has its capital already.`);
if(!L.fix.includes(i)){s.miss=i;A.sound.miss();
 if(i===0)return speak(`${w} starts the sentence, so it has a capital already.`);
 if(key==='m')return speak(w.includes('i')?`${w} has an i inside it, but it is a whole word. Only i on its own, meaning me, is a capital.`:`${w} stays small. Find the i that means me.`);
 return speak(`${w} is not a name. It stays small.`)}
s.got.push(i);s.miss=null;A.sound.pop();
if(s.got.length<L.fix.length)return speak(`${up1(w)}. One more to fix.`);
const done=L.w.map((x,j)=>s.got.includes(j)?up1(x):x).join(' ').replace(/ ([.?])/,'$1');s.n++;s.got=[];speak(done+(s.n>=s.list.length?` All ${s.list.length} fixed.`:''))}
function drawTap(key,head,done){const s=Z[key];wash();if(s.n>=s.list.length){banner(done,A.H*.07,1);s.list.forEach((L,j)=>banner(L.w.map((x,k)=>L.fix.includes(k)?up1(x):x).join(' ').replace(/ ([.?])/,'$1'),A.H*(.26+j*.17),1));return}
banner(`${head} ${s.n+1} of ${s.list.length}`,A.H*.07);words(s.list[s.n].w,s.got,s.miss);
const g=A.ctx;g.fillStyle=A.col.tx;g.font=fnt(15,700);g.textAlign='center';g.textBaseline='middle';g.fillText(key==='m'?'Tap the i that means me.':'Tap the word that is a name.',A.W/2,A.H*.86,A.W-12)}
/* step 3: the capital stamp */
function dLay(){const w=(A.W-30)/2,h=sz(54);return DAYW.map((d,i)=>({x:10+(i%2)*(w+10),y:A.H*.36+Math.floor(i/2)*(h+sz(10)),w,h}))}
function stamp(){const w=sz(84),h=sz(56);return{x:A.W/2-w/2,y:A.H*.17,w,h}}
function drawDays(){const s=Z.d,g=A.ctx;wash();const left=DAYW.filter((d,i)=>d[1]&&!s.got.includes(i)).length;banner(left?'Drag the capital stamp onto each day':'All 3 days have capitals',A.H*.07,!left);
dLay().forEach((r,i)=>{const big=s.got.includes(i);pill(r,big?up1(DAYW[i][0]):DAYW[i][0],{cap:big,rim:big?YES:s.miss===i?NO:null,bg:big?CAPF:null})});
if(left){const d=Z.drag,b=stamp(),r=d?{...b,x:d.x-b.w/2,y:d.y-b.h/2}:b;pill(r,'A B C',{bg:CAPF,fg:CAPI,rim:d?HELD:CAPI,n:18})}}
function stampDay(i){const s=Z.d,[w,k]=DAYW[i];if(s.got.includes(i))return speak(`${up1(w)} has its capital already.`);
if(!k){s.miss=i;A.sound.miss();return speak(w==='sunny'?'sunny is about the weather. Sunday is the day name.':w==='morning'?'morning is a time of day, not the name of a day. It stays small.':'week is not a day name. It stays small.')}
s.got.push(i);s.miss=null;A.sound.pop();const left=DAYW.filter((d,j)=>d[1]&&!s.got.includes(j)).length;speak(`${up1(w)}: days of the week are names.`+(left?'':' All 3 days done.'))}
/* step 5: the postcard */
const cOrder=n=>n%2?[CARD[n][2],CARD[n][1]]:[CARD[n][1],CARD[n][2]];
function cKeys(){const w=Math.min(sz(150),(A.W-36)/2),h=sz(56);return[0,1].map(j=>({x:A.W/2+(j?8:-w-8),y:A.H*.74,w,h}))}
function cSlot(){return{x:A.W/2-sz(80),y:A.H*.56,w:sz(160),h:sz(48)}}
function drawCard(){const s=Z.c,g=A.ctx;wash();banner(s.n>=5?'Postcard done':`Word ${s.n+1} of 5: big or small?`,A.H*.07,s.n>=5);
const txt=CARD.slice(0,s.n).map(q=>q[0]+' '+q[1]).join(' ')+(s.n<5?' '+CARD[s.n][0]+' ___':'.');
g.font=fnt(17,700);g.fillStyle=A.col.tx;g.textAlign='left';g.textBaseline='top';const lines=[];let cur='';txt.split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(g.measureText(t).width>A.W-28&&cur){lines.push(cur);cur=w}else cur=t});lines.push(cur);
lines.forEach((l,k)=>g.fillText(l,14,A.H*.17+k*sz(26)));
if(s.n<5){const d=Z.drag;pill(cSlot(),null,{dash:1});g.fillStyle=A.col.tx;g.font=fnt(13,700);g.textAlign='center';g.textBaseline='middle';g.fillText('drop here',A.W/2,A.H*.56+sz(24));
cOrder(s.n).forEach((w,j)=>{const b=cKeys()[j];pill(d&&d.j===j?{...b,x:d.x-b.w/2,y:d.y-b.h/2}:b,w,{bg:CAPF,rim:d&&d.j===j?HELD:s.miss===w?NO:null,n:22})})}}
function putCard(w){const s=Z.c;if(s.n>=5)return;const q=CARD[s.n];
if(w!==q[1]){s.miss=w;A.sound.miss();return speak(q[1]==='dog'?'dog is not a name, so it stays small: a big dog.':q[1]==='I'?'I on its own means me. It is always a capital: I.':`${q[1]} is a ${q[1]==='Monday'?'day':q[1]==='Leeds'?'place':'person'}'s name, so it needs a capital: ${q[1]}.`)}
s.n++;s.miss=null;A.sound.pop();speak(`${q[0]} ${q[1]}`+(s.n>=5?'. The postcard is done.':''))}
function draw(){const k=part();if(k==='quiz'){wash();banner('Challenge',A.H*.25,1);banner('Sam, Leeds, Monday, I  ·  dog, park, sunny',A.H*.55);return}
({sort:drawSort,names:()=>drawTap('n','Sentence','All 4 fixed'),days:drawDays,me:()=>drawTap('m','Line','All 3 fixed'),card:drawCard})[k]();A.fx.draw(A.ctx)}
const keyOf={names:'n',me:'m'};
function down(p){const k=part();
if(k==='sort'&&Z.s.n<8){if(on(p,sCard())){Z.drag={x:p.x,y:p.y};return true}const b=sBins().find(r=>on(p,r));if(b)putSort(b.j);return false}
if(keyOf[k]){const s=Z[keyOf[k]],L=s.list[s.n];if(L){const i=flow(L.w,A.H*.32).findIndex(r=>on(p,r));if(i>=0)tapWord(keyOf[k],i)}return false}
if(k==='days'){if(on(p,stamp())){Z.drag={x:p.x,y:p.y};return true}const i=dLay().findIndex(r=>on(p,r));if(i>=0)stampDay(i);return false}
if(k==='card'&&Z.c.n<5){const j=cKeys().findIndex(r=>on(p,r));if(j>=0){Z.drag={j,x:p.x,y:p.y};return true}}return false}
function move(p){if(Z.drag){Z.drag.x=p.x;Z.drag.y=p.y;A.redraw()}}
function up(p){const d=Z.drag;if(!d)return;Z.drag=null;const k=part();
if(k==='sort'){const b=sBins().find(r=>on(p,r));if(b)putSort(b.j);else A.redraw();return}
if(k==='days'){const i=dLay().findIndex(r=>on(p,r));if(i>=0)stampDay(i);else A.redraw();return}
if(k==='card'){const sl=cSlot();if(on(p,{x:sl.x-24,y:sl.y-24,w:sl.w+48,h:sl.h+48})||on(p,cKeys()[d.j]))putCard(cOrder(Z.c.n)[d.j]);else A.redraw()}}
function clear(){tok++;for(const k in Z)delete Z[k];Object.assign(Z,{s:{n:0},n:{list:NAMES,n:0,got:[]},d:{got:[]},m:{list:IW,n:0,got:[]},c:{n:0},drag:null,check:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();Z.check()}
function arm(i,desc,ok,msg){clear();speak(desc);Z.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=tok;acts.forEach((f,j)=>setTimeout(()=>{if(me===tok)f()},ms*(j+1)))}
function pads(){if(!bar)return;bar.innerHTML='';const k=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
if(k==='sort'&&Z.s.n<8)BINS.forEach((t,j)=>B(t,()=>putSort(j),`${SORTW[Z.s.n][0]}: ${t}`));
if(keyOf[k]){const s=Z[keyOf[k]],L=s.list[s.n];if(L)L.w.forEach((w,i)=>{if(!/^[.?]$/.test(w))B(w,()=>tapWord(keyOf[k],i),`Give ${w} a capital`)})}
if(k==='days')DAYW.forEach((d,i)=>{if(!Z.d.got.includes(i))B(d[0],()=>stampDay(i),`Stamp a capital on ${d[0]}`)});
if(k==='card'&&Z.c.n<5)cOrder(Z.c.n).forEach(w=>B(w,()=>putCard(w),`Write ${w}`))}
const steps=[
{h:'Is it a name?',p:'Names of people and places start with a big letter, called a capital. Other words stay small. Drag each word to a box.',
predict:{q:'Which word needs a capital letter?',opts:['park','paris'],ans:1},task:'Sort all 8 words',
show:()=>demo(0,SORTW.map(x=>()=>putSort(x[1])),420),
go:()=>arm(0,'Card: sam. Boxes: a name, or not a name.',()=>Z.s.n>=8,'Sam, Leeds, Mia, London: names get capitals.')},
{h:'Fix the names',p:'Each sentence has a name with a small letter. Tap the name to give it a capital.',task:'Fix all 4 sentences',
show:()=>demo(1,NAMES.flatMap(L=>L.fix.map(i=>()=>tapWord('n',i))),700),
go:()=>arm(1,'We met sam at school. Each word is a tile.',()=>Z.n.n>=4,'Sam, Rex, Ben, Amy, York.')},
{h:'Days are names too',p:'The days of the week are names, so they get a capital. Drag the stamp onto each day.',
predict:{q:'Which one needs a capital?',opts:['sunny','sunday'],ans:1},task:'Stamp all 3 days',
show:()=>demo(2,DAYW.map((d,i)=>d[1]?()=>stampDay(i):null).filter(Boolean),800),
go:()=>arm(2,'Words: monday, morning, friday, sunny, sunday, week.',()=>DAYW.every((d,i)=>!d[1]||Z.d.got.includes(i)),'Monday, Friday, Sunday. morning and sunny stay small.')},
{h:'I is always big',p:'When you write about yourself, I is always a capital, even in the middle. Tap the i that means me.',
predict:{q:'Mum and ___ went in.',opts:['i','I'],ans:1},task:'Fix all 3 lines',
show:()=>demo(3,IW.map(L=>()=>tapWord('m',L.fix[0])),800),
go:()=>arm(3,'Mum and i went in. Each word is a tile.',()=>Z.m.n>=3,'I on its own is always big. in and it stay small.')},
{h:'Write a postcard',p:'Pick big or small for each word. Careful: one word is not a name.',task:'Finish the postcard',
show:()=>demo(4,CARD.map(q=>()=>putCard(q[1])),700),
go:()=>arm(4,'On ___ we went to ... Choices: Monday or monday.',()=>Z.c.n>=5,'Names, days and I get capitals. dog does not.')},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.check()});
const QS=[
{q:'Which is right?',a:'I saw Sam.',o:[['i saw Sam.','lowi'],['I saw sam.','lowname']]},
{q:'Which word needs a capital?',a:'friday',o:[['morning','time'],['sunny','weather']]},
{q:'Which is right?',a:'We went to London.',o:[['We went to london.','place'],['We Went to London.','every']]},
{q:'Which is right?',a:'My cat is called Tom.',o:[['My Cat is called Tom.','thing'],['My cat is called tom.','pet']]},
{q:'Why does Monday have a capital?',a:'It is the name of a day',o:[['It is a long word','long'],['It is at the end','end']]},
{q:'Which is right?',a:'Can I come in?',o:[['Can i come in?','lowi2'],['Can I come In?','inword']]}];
function why(t){let m='Ask: is it a name, a day, or I? Only those get a capital.';
if(t==='lowi')m='I on its own means me. It is always a capital, even at the start.';
if(t==='lowname')m='sam is a person\'s name. Names get a capital: Sam.';
if(t==='time')m='morning is a time of day, not a day\'s name. It stays small.';
if(t==='weather')m='sunny is about the weather. Friday is a day, so it gets the capital.';
if(t==='place')m='london is the name of a place. Places get a capital: London.';
if(t==='every')m='Went is not a name. Only names, days, I and the first word get capitals.';
if(t==='thing')m='cat is a kind of animal, not a name. Tom is the name.';
if(t==='pet')m='A pet\'s name is a name too: Tom.';
if(t==='long')m='Long words do not get capitals. Monday has one because it names a day.';
if(t==='end')m='Where a word sits does not matter. Monday is a day name, so it is always big.';
if(t==='lowi2')m='i on its own must be a capital: Can I come in?';
if(t==='inword')m='in is a whole word, not me. It stays small. Only the lone I is big.';
return m}
function ask(){cq++;const Q=QS[cq%QS.length],all=[[Q.a,'good'],...Q.o],r=cq%3,ord=all.slice(r).concat(all.slice(0,r));
chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const bx=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},bx,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='good';if(ok)A.win();else A.sound.miss();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:B=>{chal.hidden=B.step!==5;bar.hidden=B.step===5;pads()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Capital letter buttons'},bx);chal=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});pads()}}).start()})})();
