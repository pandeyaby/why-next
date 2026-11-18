/* Flagship – colons and semicolons in lists (ages 10–11; NC England Y6 Appendix 2): colon after a complete sentence,
   semicolons between items that hold commas, counting items, fixing slips, building a list. */
(()=>{
/* lead-in, does a colon fit?, why */
const LEAD=[['You will need the following','a torch, a map and a drink.',1,'That is a complete sentence, so a colon can open the list.'],
 ['We need','eggs, flour and milk.',0,'We need is not finished: need must run straight on to what we need. No colon.'],
 ['Three animals live in the pond','a frog, a newt and a duck.',1,'That makes sense alone, so the colon fits.'],
 ['My best colours are','red, blue and green.',0,'are must run straight on to the colours. A colon would cut the sentence in half.'],
 ['Pack these things for camp','a tent, a torch and a mat.',1,'That is a complete command, so a colon fits.'],
 ['The box held','pens, glue and string.',0,'The box held what? held needs its list right after it. No colon.']];
/* [lead, items with their own commas] */
const SEMI=[['We visited three cities:',['Paris, France','Rome, Italy','Oslo, Norway']],
 ['Prizes went to three children:',['Ali, aged 9','Ben, aged 10','Cara, aged 11']],
 ['Bring these things:',['a pencil, sharpened','a ruler, 30 cm long','a rubber']],
 ['The club meets on three days:',['Monday, after school','Wednesday, at lunch','Friday, before school']]];
/* [sentence, items, why] */
const COUNT=[['I met Sam, my cousin; Ella; and Jo.',3,'Sam, my cousin is one person, so: Sam | Ella | Jo.'],
 ['I met Sam; my cousin; Ella; and Jo.',4,'Each semicolon splits off a person: Sam | my cousin | Ella | Jo.'],
 ['On the shelf were Cats, a story; Owls, a fact book; and Maps.',3,'Cats, a story | Owls, a fact book | Maps: three books.'],
 ['We ate ham, cheese and pickle rolls; soup; and fruit.',3,'ham, cheese and pickle rolls | soup | fruit: the commas sit inside the first item.']];
/* [tokens, index of the wrong mark, why] */
const FIX=[[['We','need',':','eggs',',','flour','and','milk','.'],2,'We need is not a complete sentence, so no colon. Write: We need eggs, flour and milk.'],
 [['Pack','three','things',';','a','hat',',','a','coat','and','boots','.'],3,'A semicolon cannot open a list. Pack three things is complete, so use a colon.'],
 [['The','winners','were',':','Asha','and','Tom','.'],3,'were must run on to the winners. No colon after were.'],
 [['We','saw','Rome',',','Italy',';','Lima',',','Peru',',','and','Cairo',',','Egypt','.'],9,'Once items are split by semicolons, keep going: Peru; and Cairo.']];
const MARKS=[':',';',','];
/* [lead, items, right mark for each gap] gaps: after lead, then between items */
const BUILD=[['Our trip had three stops',['Bath, a city','Wells, a town','Cheddar, a village']],
 ['The cake needs three things',['200 g of flour','2 eggs, beaten','a pinch of salt']],
 ['Meet the team',['Kim, who bowls','Lee, who bats','Max, who keeps wicket']]];
VIS.reg('flagcolsemi',c=>{let A,X,pad,chal,qn=-1,ep=0;const T={};
const NIB='#111827',CHIT='#ffffff',RULE2='#6b7280',RIGHT='#065f46',WRONG='#9f1239',DRAGC='#1e40af',BLUSH='#ffe4e6',MINT='#d1fae5',LEMON='#fef3c7';
const z=n=>Math.round(n*(A.narrow?.9:1.06)),typeF=(n,w)=>`${w||700} ${z(n)}px system-ui,sans-serif`,inR=(p,r,m)=>{m=m||0;return !!r&&p.x>=r.x-m&&p.x<=r.x+r.w+m&&p.y>=r.y-m&&p.y<=r.y+r.h+m};
const SEQ=['lead','semi','count','fix','build','quiz'],stage=()=>SEQ[A.step],SRC={lead:LEAD,semi:SEMI,count:COUNT,fix:FIX,build:BUILD},gone=n=>T[n].i>=SRC[n].length;
const warnC=()=>A.col.dark?'#fda4af':WRONG;
function back(){X.fillStyle=A.col.dark?'#0b1120':'#f9fafb';X.fillRect(0,0,A.W,A.H)}
function ff(n,w,al){X.font=typeF(n,w);X.textAlign=al||'center';X.textBaseline='middle'}
function lines(t,x,y,w,n){const R=[];let row='';String(t).split(' ').forEach(q=>{const s=row?row+' '+q:q;if(X.measureText(s).width>w&&row){R.push(row);row=q}else row=s});R.push(row);
 const lh=z(n)*1.27;R.forEach((s,i)=>X.fillText(s,x,y+(i-(R.length-1)/2)*lh))}
function chip(r,t,o){o=o||{};X.fillStyle=o.bg||CHIT;A.paint.rrect(r.x,r.y,r.w,r.h,9);X.fill();X.lineWidth=o.ring?3.4:1.3;X.strokeStyle=o.ring||RULE2;X.stroke();
 if(t!=null){X.fillStyle=o.fg||NIB;ff(o.n||17,o.w||700);lines(t,r.x+r.w/2,r.y+r.h/2,r.w-12,o.n||17)}}
function top(t,won){ff(14,800);const w=Math.min(A.W-8,X.measureText(t).width+26),h=z(14)+14,y=A.H*.02;chip({x:A.W/2-w/2,y,w,h},null,{bg:won?MINT:CHIT,ring:won?RIGHT:null});X.fillStyle=NIB;X.fillText(t,A.W/2,y+h/2+1,w-12)}
function say2(t,y,n,col){X.fillStyle=col||A.col.tx;ff(n||14,650);lines(t,A.W/2,y,A.W-26,n||14)}
function wrapUp(t,L){back();top(t,1);L.forEach((s,i)=>chip({x:12,y:A.H*(.15+i*.2),w:A.W-24,h:A.H*.17},s,{n:16,bg:'#ecfdf5'}))}
/* lay out tokens as tiles in centred rows; returns rects */
function flow(tk,y0,n,gap){ff(n,750);const h=z(n)+z(14),rows=[[]];let x=0,y=y0;
 tk.forEach((t,i)=>{const mark=t.length===1&&/[:;,.]/.test(t),w=X.measureText(t).width+z(mark?20:12);if(x+w>A.W-24&&x>0){rows.push([]);x=0;y+=h+z(8)}rows[rows.length-1].push({t,i,mark,x,y,w,h});x+=w+z(gap==null?6:gap)});
 rows.forEach(r=>{const e=r[r.length-1],off=(A.W-(e.x+e.w))/2;r.forEach(q=>q.x+=off)});return rows.flat()}
/* ---- 1: does a colon fit? ---- */
function pickR(){const w=(A.W-36)/2,h=z(64);return[{v:1,t:'Add a colon',x:12,y:A.H*.7,w,h},{v:0,t:'No colon',x:24+w,y:A.H*.7,w,h}]}
function drawLead(){const s=T.lead;back();if(gone('lead'))return wrapUp('All 6 lead-ins checked',['A colon comes after a complete sentence.','No colon straight after need, are or held.']);
 const [lead,list]=LEAD[s.i];top(`Lead-in ${s.i+1} of 6: does a colon fit?`);
 chip({x:12,y:A.H*.13,w:A.W-24,h:A.H*.13},lead+' ▢',{n:19,bg:LEMON});say2('…then the list: '+list,A.H*.32,15);
 say2('Ask: could the words before the gap stand alone as a sentence?',A.H*.42,13);
 if(s.msg)say2(s.msg,A.H*.56,13,warnC());pickR().forEach(r=>chip(r,r.t,{n:18,bg:s.miss===r.v?BLUSH:r.v?MINT:'#f1f5f9',ring:s.miss===r.v?WRONG:null}))}
function lead(v){const s=T.lead;if(gone('lead'))return;const [l,list,ok,why]=LEAD[s.i];
 if(v===ok){s.i++;s.msg='';s.miss=null;A.sound.pop();return tell(v?`${l}: ${list} ${why}`:`${l} ${list} ${why}`)}
 s.miss=v;A.sound.miss();let m;if(v)m=`Not here. ${why}`;else m=`A colon does fit. ${why}`;s.msg=m;tell(m)}
/* ---- 2: which commas become semicolons? ---- */
function semiTok(){const [lead,I]=SEMI[T.semi.i],tk=lead.split(' ');const kind=[...tk.map(()=>0)];
 I.forEach((it,j)=>{if(j===I.length-1){tk.push('and');kind.push(0)}it.split(', ').forEach((part,k)=>{if(k){tk.push(',');kind.push(1)}part.split(' ').forEach(w=>{tk.push(w);kind.push(0)})});
  if(j<I.length-1){tk.push(T.semi.got.includes(j)?';':',');kind.push(2+j)}});tk[tk.length-1]+='.';return{tk,kind}}
function semiR(){return flow(semiTok().tk,A.H*.2,19)}
function drawSemi(){const s=T.semi;back();if(gone('semi'))return wrapUp('All 4 lists fixed',['Items with commas inside need semicolons between them.','The semicolon goes before and, too.']);
 top(`List ${s.i+1} of 4: tap each comma that should be a semicolon`);const {kind}=semiTok();
 semiR().forEach(r=>{const k=kind[r.i];if(r.mark&&k)chip(r,r.t,{n:19,w:900,bg:k>=2&&s.got.includes(k-2)?MINT:s.miss===r.i?BLUSH:LEMON,ring:s.miss===r.i?WRONG:k>=2&&s.got.includes(k-2)?RIGHT:null});else{X.fillStyle=A.col.tx;ff(19,750);X.fillText(r.t,r.x+r.w/2,r.y+r.h/2)}});
 say2('Each yellow comma can be tapped. Which ones sit between whole items?',A.H*.66,13);if(s.msg)say2(s.msg,A.H*.78,13,warnC())}
function semi(i){const s=T.semi;if(gone('semi'))return;const {tk,kind}=semiTok(),k=kind[i],I=SEMI[s.i][1];if(!k)return;let m;
 if(k>=2){if(s.got.includes(k-2))return;s.got.push(k-2);s.miss=null;s.msg='';A.sound.pop();
  if(s.got.length===I.length-1){const out=SEMI[s.i][0]+' '+I.slice(0,-1).join('; ')+'; and '+I[I.length-1]+'.';s.i++;s.got=[];return tell(`Done: ${out}`)}return tell('Yes: that comma sits between two whole items.')}
 const it=I.find(x=>x.includes(tk[i-1]+', '+tk[i+1])||x.includes(tk[i-1]+', '))||'';s.miss=i;A.sound.miss();m=`That comma stays: it is inside one item, ${it}.`;s.msg=m;tell(m)}
/* ---- 3: how many items? ---- */
function numR(){const w=Math.min(z(72),(A.W-60)/4);return[2,3,4,5].map((v,j)=>({v,x:A.W/2-(4*w+30)/2+j*(w+10),y:A.H*.62,w,h:z(58)}))}
function drawCount(){const s=T.count;back();if(gone('count'))return wrapUp('All 4 lists counted',['Semicolons show where each item ends.','Commas inside an item do not start a new one.']);
 top(`List ${s.i+1} of 4: how many items?`);chip({x:12,y:A.H*.14,w:A.W-24,h:A.H*.22},COUNT[s.i][0],{n:19,bg:'#e0f2fe'});say2('Count the people or things in the list.',A.H*.45,14);
 numR().forEach(r=>chip(r,String(r.v),{n:24,bg:s.miss===r.v?BLUSH:CHIT,ring:s.miss===r.v?WRONG:null}));if(s.msg)say2(s.msg,A.H*.86,13,warnC())}
function count(v){const s=T.count;if(gone('count'))return;const [t,n,why]=COUNT[s.i],commas=(t.match(/,/g)||[]).length,semis=(t.match(/;/g)||[]).length;let m;
 if(v===n){s.i++;s.msg='';s.miss=null;A.sound.pop();return tell(`${n}. ${why}`)}
 s.miss=v;A.sound.miss();if(v>n)m=`Too many: a comma inside an item does not start a new one. ${why}`;else m=`Too few: there are ${semis} semicolons, so ${semis+1} items.`;s.msg=m;tell(m)}
/* ---- 4: tap the wrong mark ---- */
function fixR(){return flow(FIX[T.fix.i][0],A.H*.24,20)}
function drawFix(){const s=T.fix;back();if(gone('fix'))return wrapUp('All 4 slips fixed',['No colon after need, were or are.','A list opens with a colon, not a semicolon.','Do not mix , and ; between items.']);
 top(`Sentence ${s.i+1} of 4: tap the wrong mark`);fixR().forEach(r=>{if(r.mark)chip(r,r.t,{n:20,w:900,bg:s.miss===r.i?BLUSH:LEMON,ring:s.miss===r.i?WRONG:null});else{X.fillStyle=A.col.tx;ff(20,750);X.fillText(r.t,r.x+r.w/2,r.y+r.h/2)}});
 say2('Only the yellow marks can be wrong.',A.H*.62,13);if(s.msg)say2(s.msg,A.H*.76,13,warnC())}
function fix(i){const s=T.fix;if(gone('fix'))return;const [tk,bad,why]=FIX[s.i];if(!/^[:;,.]$/.test(tk[i]))return;let m;
 if(i===bad){s.i++;s.msg='';s.miss=null;A.sound.pop();return tell(`Found it. ${why}`)}
 s.miss=i;A.sound.miss();if(tk[i]==='.')m='The full stop is right: the sentence ends there.';else if(tk[i]===',')m='That comma is fine: it sits inside an item or between simple items.';else m='That mark is fine. Look for one that breaks a rule.';s.msg=m;tell(m)}
/* ---- 5: drag marks into the gaps ---- */
function need(g){return g===0?':':';'}
function buildTok(){const [lead,I]=BUILD[T.build.i],tk=lead.split(' '),gap=[...tk.map(()=>-1)];tk.push(T.build.f[0]||'▢');gap.push(0);
 I.forEach((it,j)=>{if(j===I.length-1){tk.push('and');gap.push(-1)}it.split(' ').forEach(w=>{tk.push(w);gap.push(-1)});if(j<I.length-1){tk.push(T.build.f[j+1]||'▢');gap.push(j+1)}});tk[tk.length-1]+='.';return{tk,gap}}
function buildR(){return flow(buildTok().tk,A.H*.14,18)}
function markR(){const w=z(70),h=z(60),tot=3*w+28;return MARKS.map((t,j)=>{const r={t,x:A.W/2-tot/2+j*(w+14),y:A.H*.76,w,h};return T.hold&&T.hold.t===t?{...r,x:T.hold.x-w/2,y:T.hold.y-h/2}:r})}
function drawBuild(){const s=T.build;back();if(gone('build'))return wrapUp('All 3 lists built',['Colon after the complete lead-in.','Semicolons between items that have commas.']);
 top(`List ${s.i+1} of 3: drag a mark into each gap`);const {gap}=buildTok();
 buildR().forEach(r=>{const g=gap[r.i];if(g>=0)chip(r,r.t,{n:18,w:900,bg:s.f[g]?MINT:LEMON,ring:s.f[g]?RIGHT:s.miss===g?WRONG:A.col.dark?'#93c5fd':DRAGC});else{X.fillStyle=A.col.tx;ff(18,750);X.fillText(r.t,r.x+r.w/2,r.y+r.h/2)}});
 if(s.msg)say2(s.msg,A.H*.64,13,warnC());markR().forEach(r=>chip(r,r.t,{n:30,w:900,bg:'#ede9fe',fg:'#2e1065',ring:T.hold&&T.hold.t===r.t?DRAGC:null}))}
function nextGap(){const s=T.build,n=BUILD[s.i][1].length;for(let g=0;g<n;g++)if(!s.f[g])return g;return -1}
function build(t,g){const s=T.build;if(gone('build'))return;if(g==null)g=nextGap();if(g<0||s.f[g])return;const want=need(g);let m;
 if(t===want){s.f[g]=t;s.msg='';s.miss=null;A.sound.pop();if(nextGap()<0){const [lead,I]=BUILD[s.i];s.i++;s.f=[];return tell(`Built: ${lead}: ${I.slice(0,-1).join('; ')}; and ${I[I.length-1]}.`)}return tell(`Yes, ${t} goes there.`)}
 s.miss=g;A.sound.miss();
 if(g===0&&t===';')m='A semicolon cannot open a list. The lead-in is a complete sentence, so use a colon.';
 else if(g===0)m='A comma is too weak to open this list. Use a colon after a complete sentence.';
 else if(t===':')m='A colon only opens the list once. Between items, use a semicolon.';
 else m='These items have commas inside, so a comma here hides where one item ends. Use a semicolon.';s.msg=m;tell(m)}
/* ---- pointer ---- */
function down(p){const k=stage();
 if(k==='lead'&&!gone('lead')){const r=pickR().find(r=>inR(p,r));if(r)lead(r.v)}
 if(k==='semi'&&!gone('semi')){const r=semiR().find(r=>inR(p,r,4));if(r)semi(r.i)}
 if(k==='count'&&!gone('count')){const r=numR().find(r=>inR(p,r));if(r)count(r.v)}
 if(k==='fix'&&!gone('fix')){const r=fixR().find(r=>inR(p,r,4));if(r)fix(r.i)}
 if(k==='build'&&!gone('build')){const r=markR().find(r=>inR(p,r));if(r){T.hold={t:r.t,x:p.x,y:p.y};A.redraw();return true}}return false}
function move(p){if(T.hold){T.hold.x=p.x;T.hold.y=p.y;A.redraw()}}
function up(p){const h=T.hold;if(!h)return;T.hold=null;if(stage()==='build'){const {gap}=buildTok(),r=buildR().find(r=>gap[r.i]>=0&&inR(p,r,z(18)));if(r)return build(h.t,gap[r.i])}A.redraw()}
function wipe(){ep++;for(const k in T)delete T[k];Object.assign(T,{lead:{i:0},semi:{i:0,got:[]},count:{i:0},fix:{i:0},build:{i:0,f:[]},hold:null,test:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();T.test()}
function enter(i,first,ok,msg){wipe();tell(first);T.test=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=ep;acts.forEach((f,j)=>setTimeout(()=>{if(me===ep)f()},ms*(j+1)))}
function keys(){if(!pad)return;pad.innerHTML='';const k=stage(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='lead'&&!gone('lead'))pickR().forEach(r=>b(r.t,()=>lead(r.v),`${r.t} after "${LEAD[T.lead.i][0]}"`));
 if(k==='semi'&&!gone('semi')){const {tk,kind}=semiTok();kind.forEach((q,i)=>{if(q&&!(q>=2&&T.semi.got.includes(q-2)))b(`, after ${tk[i-1]}`,()=>semi(i),`Make the comma after ${tk[i-1]} a semicolon`)})}
 if(k==='count'&&!gone('count'))[2,3,4,5].forEach(v=>b(String(v),()=>count(v),`${v} items`));
 if(k==='fix'&&!gone('fix')){const tk=FIX[T.fix.i][0];tk.forEach((t,i)=>{if(/^[:;,.]$/.test(t))b(`${t} after ${tk[i-1]}`,()=>fix(i),`The ${t} after ${tk[i-1]} is wrong`)})}
 if(k==='build'&&!gone('build'))MARKS.forEach(t=>b(t,()=>build(t),`Put ${t==':'?'a colon':t==';'?'a semicolon':'a comma'} in the next gap`))}
const steps=[
{h:'Colon or not?',p:'A colon can open a list, but only after words that make a complete sentence on their own.',
predict:{q:'"We need ▢ eggs, flour and milk." Does a colon go in the gap?',opts:['yes, a list follows','no: We need is not a complete sentence'],ans:1},task:'Check all 6 lead-ins',
show:()=>demo(0,LEAD.map(q=>()=>lead(q[2])),600),go:()=>enter(0,'Could the words before the gap stand alone? Tap Add a colon or No colon.',()=>gone('lead'),'Complete sentence first, then the colon.')},
{h:'Semicolons in long lists',p:'When list items have commas inside them, commas alone blur where each item ends. Put semicolons between the whole items.',
predict:{q:'"Paris, France, Rome, Italy and Oslo, Norway": why not just commas?',opts:['commas are fine here','readers can’t tell where items end'],ans:1},task:'Fix all 4 lists',
show:()=>demo(1,SEMI.flatMap(q=>q[1].slice(1).map(()=>()=>{const {kind}=semiTok();semi(kind.findIndex(x=>x>=2&&!T.semi.got.includes(x-2)))})),450),go:()=>enter(1,'Tap each comma that sits between whole items.',()=>gone('semi'),'Semicolons mark the big breaks.')},
{h:'Count the items',p:'Semicolons tell the reader exactly how many items there are. A comma inside an item does not start a new one.',
predict:{q:'"I met Sam, my cousin, Ella and Jo." How many people?',opts:['4: Sam, my cousin, Ella, Jo','we can’t be sure'],ans:1},task:'Count all 4',
show:()=>demo(2,COUNT.map(q=>()=>count(q[1])),600),go:()=>enter(2,'Tap how many items the list has.',()=>gone('count'),'Semicolons settle it.')},
{h:'Fix the slip',p:'Three common slips: a colon straight after a verb, a semicolon where the colon should be, and mixing commas with semicolons.',task:'Fix all 4',
show:()=>demo(3,FIX.map(q=>()=>fix(q[1])),600),go:()=>enter(3,'Tap the mark that is wrong.',()=>gone('fix'),'Rules kept.')},
{h:'Build the list',p:'Now punctuate it yourself: a colon after the complete lead-in, then semicolons between items that have commas.',task:'Build all 3',
show:()=>demo(4,BUILD.flatMap(q=>q[1].map((_,g)=>()=>build(need(g)))),400),go:()=>enter(4,'Drag a mark into each blue gap.',()=>gone('build'),'Colon to open, semicolons between.')},
{h:'Challenge',p:'',go:()=>{wipe();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>T.test()});
const QS=[
{q:'Which is punctuated correctly?',a:'Bring three things: a hat, a coat and gloves.',o:[['Bring: a hat, a coat and gloves.','Bring is not a complete sentence, so no colon.'],['Bring three things; a hat, a coat and gloves.','A list opens with a colon, not a semicolon.']]},
{q:'Which list needs semicolons?',a:'Leeds, England, Cork, Ireland and Perth, Scotland',o:[['apples, pears and plums','Simple items: commas are enough.'],['red, blue and green','No item has a comma inside, so commas will do.']]},
{q:'"We met Kim, a nurse; Li, a vet; and Jo." How many people?',a:'3',o:[['5','The commas inside an item do not add people.'],['2','Count the items between the semicolons: Kim, Li, Jo.']]},
{q:'Where does the colon go?',a:'After a complete sentence, before the list',o:[['Straight after are or need','That cuts the verb off from its list.'],['Between every item','Between items use commas or semicolons.']]},
{q:'"…Rome, Italy; Lima, Peru, and Cairo, Egypt." What is wrong?',a:'The comma after Peru should be a semicolon.',o:[['The comma after Rome should go.','Rome, Italy is one item; that comma stays.'],['Nothing is wrong.','Once you start using semicolons between items, keep using them.']]},
{q:'Why use semicolons in a list?',a:'To show where items with commas end',o:[['To make the list look longer','They are for clarity, not length.'],['To open the list','A colon opens the list.']]}];
function quiz(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,''],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chal.querySelector('.fl-pick');ord.forEach(([v,why])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>mark(why,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(why,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=!why;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why)}
function draw(){const k=stage();if(k==='quiz'){back();top('Challenge',1);[': opens a list after a complete sentence','; splits items that have commas inside',', splits simple items'].forEach((t,i)=>chip({x:14,y:A.H*(.2+i*.24),w:A.W-28,h:A.H*.18},t,{n:18,bg:[LEMON,MINT,'#e0f2fe'][i]}));return}
 ({lead:drawLead,semi:drawSemi,count:drawCount,fix:drawFix,build:drawBuild})[k]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Punctuation buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});keys()}}).start()})})();
