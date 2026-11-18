/* Flagship – Firsthand and secondhand accounts (ages 9–10; CCSS RI.4.6 "Compare and contrast a firsthand and secondhand
   account of the same event or topic; describe the differences in focus and the information provided"). */
(()=>{
/* step 1: who wrote it? 0 firsthand (the writer was there), 1 secondhand (the writer found out from others) */
const SRC=[['Mia\'s diary, written the night of the flood',0],['A biography of a famous explorer',1],['A letter home from a soldier',0],['An encyclopedia page about volcanoes',1],['An astronaut\'s autobiography',0],['Your history textbook',1],['A firefighter telling what she saw',0],['A website written 50 years after a storm',1],['A sailor\'s logbook from the ship',0],['A news report built from interviews',1]];
/* step 2: one event, two accounts. 0 = Mia's diary (she was 10 and there), 1 = a local history book written in 2024 */
const LINES=[['My boots filled with icy water.',0],['The river rose two metres in one night.',1],['I was so scared I could not sleep.',0],['More than 300 homes were flooded.',1],['Dad carried our cat up to the attic.',0],['Experts later found that blocked drains made it worse.',1],['I can still smell the mud.',0],['The town built a flood wall two years later.',1]];
/* step 3: compare. zone 0 diary only, 1 both, 2 book only; [card text, short tag, zone] */
const VENN=[['The river flooded on 3 March 2004.','flood on 3 March',1],['Mia\'s street was under water.','her street flooded',0],['It rained all night before the flood.','rain all night',1],['About 300 homes were damaged.','300 homes',2],['Mia hid under her blanket.','hid under blanket',0],['People were rescued by boat.','boat rescues',1],['The flood cost the town £5 million.','£5 million cost',2],['Mia\'s neighbour brought hot soup.','hot soup',0],['A new flood wall was built.','flood wall',2]];
/* step 4: which account can answer this question? 0 diary, 1 book, 2 neither */
const ASK=[['How did it feel to be there?',0],['How many homes were flooded?',1],['What did Mia hear that night?',0],['Why did the water rise so fast?',1],['What did the mayor eat for breakfast?',2],['What happened to the town afterwards?',1],['What did Mia do with her cat?',0],['Will the town flood again in 2050?',2]];
/* step 5: diary line, three history-book versions (first is right), slip for each wrong one */
const TONE=[['The water was up to my knees and freezing!',['Water was about 50 cm deep in some streets.','I was freezing in the deep water.','It was the scariest water ever.'],['me','feel']],
['We waited ages on the roof for the boat.',['Some families waited on roofs to be rescued.','We were stuck for ages.','Nobody was rescued.'],['me','fact']],
['Our whole street smelt of mud for weeks.',['Clean-up in flooded streets took several weeks.','The mud smelt horrible to me.','Clean-up took one hour.'],['me','fact']],
['I cried when I saw my ruined drawings.',['Many families lost belongings in the flood.','I was very sad about my drawings.','Everyone cried all day.'],['me','all']]];
VIS.reg('flagacct',c=>{let A,keysEl,chalEl,ix=-1,ticket=0;
const W={};
const INK='#111827',PASS='#065f46',FAIL='#9f1239',EDGE='#6b7280',PICK='#3730a3',SHEET='#ffffff';
const DIARY=['#fef3c7','#78350f'],BOOK=['#dbeafe','#1e3a8a'],BOTH=['#dcfce7','#14532d'],NONE=['#f1f5f9','#334155'];
const px=v=>Math.round(v*(A.narrow?.93:1.06)),face=(v,w)=>`${w||800} ${px(v)}px system-ui,sans-serif`;
const now=()=>['src','line','venn','ask','tone','quiz'][A.step],hits=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function paper(){const g=A.ctx;g.fillStyle=A.col.dark?'#0b1120':'#fafaf9';g.fillRect(0,0,A.W,A.H)}
function panel(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||SHEET;A.paint.rrect(r.x,r.y,r.w,r.h,o.rad||10);g.fill();g.lineWidth=o.rim?3.5:1.5;g.strokeStyle=o.rim||EDGE;g.stroke();
 if(t!=null)wrap(t,r,o.n||16,o.fg||INK,o.w||700)}
function wrap(t,r,n,col,wt){const g=A.ctx;g.font=face(n,wt);g.fillStyle=col;g.textAlign='center';g.textBaseline='middle';const rows=[];let cur='';
 t.split(' ').forEach(w=>{const tr=cur?cur+' '+w:w;if(g.measureText(tr).width>r.w-16&&cur){rows.push(cur);cur=w}else cur=tr});rows.push(cur);
 const lh=px(n)+4;rows.forEach((l,i)=>g.fillText(l,r.x+r.w/2,r.y+r.h/2+(i-(rows.length-1)/2)*lh+1,r.w-8))}
function title(t,won){const g=A.ctx;let n=15;g.font=face(n);while(g.measureText(t).width+30>A.W-8&&n>10){n--;g.font=face(n)}const w=g.measureText(t).width+26;
 panel({x:A.W/2-w/2,y:A.H*.025,w,h:px(n)+14},t,{bg:won?'#d1fae5':SHEET,rim:won?PASS:null,n,w:800})}
function note(t,y,n){const g=A.ctx;g.fillStyle=A.col.tx;g.font=face(n||14,650);g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y,A.W-12)}
const carried=(r,j)=>W.hold&&W.hold.j===j?{...r,x:W.hold.x-r.w/2,y:W.hold.y-r.h/2}:r;
const slot=()=>{const w=Math.min(A.W-20,px(380));return{x:A.W/2-w/2,y:A.H*.12,w,h:px(68)}};
/* two drop zones: a notebook and a book */
function twin(y,names){const gp=10,w=(A.W-20-gp)/2;return names.map((t,j)=>({x:10+j*(w+gp),y,w,h:A.H-y-8,t,j}))}
const SN=['Firsthand: I was there','Secondhand: found out later'],LN=['Mia\'s diary (2004)','History book (2024)'];
const SETS={src:[SRC,SN],line:[LINES,LN]};
function drawSet(key){const [L,N]=SETS[key],s=W[key],g=A.ctx,end=s.n>=L.length;paper();title(end?`All ${L.length} sorted`:`${key==='src'?'Source':'Line'} ${s.n+1} of ${L.length}: ${key==='src'?'was the writer there?':'which account says it?'}`,end);
 twin(A.H*.36,N).forEach(b=>{const h=b.j?BOOK:DIARY;g.fillStyle=h[0];A.paint.rrect(b.x,b.y,b.w,b.h,b.j?6:14);g.fill();g.strokeStyle=s.bad===b.j?FAIL:h[1];g.lineWidth=s.bad===b.j?4:2;g.stroke();
  if(!b.j){g.strokeStyle=h[1];g.lineWidth=1;for(let y=b.y+px(36);y<b.y+b.h-6;y+=px(18)){g.beginPath();g.moveTo(b.x+8,y);g.lineTo(b.x+b.w-8,y);g.globalAlpha=.25;g.stroke();g.globalAlpha=1}}
  g.fillStyle=INK;g.font=face(14,800);g.textAlign='center';g.textBaseline='top';const hd=b.t.split(': ');hd.forEach((l,i)=>{g.font=face(i?12:15,i?650:800);g.fillText(l,b.x+b.w/2,b.y+7+i*px(18),b.w-8)});g.font=face(11,600);
  L.slice(0,s.n).filter(x=>x[1]===b.j).forEach((x,i)=>{const t=x[0].length>30?x[0].slice(0,29)+'…':x[0];g.fillText(t,b.x+b.w/2,b.y+px(22)+hd.length*px(16)+i*px(16),b.w-8)})});
 if(!end)panel(carried(slot(),0),L[s.n][0],{rim:W.hold?PICK:null,n:17})}
function setDrop(key,j){const [L]=SETS[key],s=W[key];if(s.n>=L.length)return;const [t,want]=L[s.n];
 if(j!==want){s.bad=j;A.sound.miss();let m;
  if(key==='src')m=want?(/biography|news/.test(t)?'The writer was not there. They put it together from other people\'s words and records: secondhand.':'The writer learned this from books or records, not by being there: secondhand.'):(/autobiography/.test(t)?'An autobiography is a life story written by the person who lived it: firsthand.':'This person saw it happen and wrote or told it: firsthand.');
  else m=want?'This is a number, a cause or what came later. Someone found that out after the event: the history book.':'This is what one girl saw, felt or did that night: Mia\'s diary.';
  return tell(m)}
 s.n++;s.bad=null;A.sound.pop();tell(`${t} ${key==='src'?['Firsthand.','Secondhand.'][want]:['Diary.','History book.'][want]}`+(s.n>=L.length?' All sorted.':''))}
/* Venn: two overlapping circles, three drop regions by x */
function rings(){const cy=A.H*.66,r=Math.min(A.W*.29,A.H*.28),gap=r*.62;return{cy,r,lx:A.W/2-gap,rx:A.W/2+gap}}
function region(p){const R=rings();if(p.y<A.H*.34)return -1;const a=Math.hypot(p.x-R.lx,p.y-R.cy)<=R.r,b=Math.hypot(p.x-R.rx,p.y-R.cy)<=R.r;return a&&b?1:a?0:b?2:-1}
function drawVenn(){const s=W.venn,g=A.ctx,R=rings(),end=s.n>=VENN.length;paper();title(end?'Both accounts compared':`Detail ${s.n+1} of 9: drop it where it belongs`,end);
 [[R.lx,DIARY],[R.rx,BOOK]].forEach(([x,h])=>{g.fillStyle=h[0];g.beginPath();g.arc(x,R.cy,R.r,0,7);g.fill()});g.save();g.beginPath();g.arc(R.lx,R.cy,R.r,0,7);g.clip();g.fillStyle=BOTH[0];g.beginPath();g.arc(R.rx,R.cy,R.r,0,7);g.fill();g.restore();
 [[R.lx,DIARY,0],[R.rx,BOOK,2]].forEach(([x,h,z])=>{g.beginPath();g.arc(x,R.cy,R.r,0,7);g.lineWidth=s.bad===z?4:2;g.strokeStyle=s.bad===z?FAIL:h[1];g.stroke()});
 if(s.bad===1){g.save();g.beginPath();g.arc(R.lx,R.cy,R.r,0,7);g.clip();g.beginPath();g.arc(R.rx,R.cy,R.r,0,7);g.lineWidth=5;g.strokeStyle=FAIL;g.stroke();g.restore()}
 g.font=face(13,800);g.textBaseline='bottom';g.textAlign='center';g.fillStyle=A.col.tx;g.fillText('Diary only',R.lx-R.r*.45,R.cy-R.r-4,R.r);g.fillText('Book only',R.rx+R.r*.45,R.cy-R.r-4,R.r);g.fillStyle=BOTH[1];g.fillText('Both',A.W/2,R.cy-R.r*.6);
 const xs=[R.lx-R.r*.42,A.W/2,R.rx+R.r*.42],cnt=[0,0,0];g.font=face(11,650);g.fillStyle=INK;g.textBaseline='middle';
 VENN.slice(0,s.n).forEach(v=>{const z=v[2];g.fillText(v[1],xs[z],R.cy-R.r*.45+cnt[z]*px(16),z===1?R.r*.6:R.r*.85);cnt[z]++});
 if(!end)panel(carried(slot(),0),VENN[s.n][0],{rim:W.hold?PICK:null,n:16})}
function venn(z){const s=W.venn;if(s.n>=VENN.length)return;const v=VENN[s.n];
 if(z!==v[2]){s.bad=z;A.sound.miss();return tell(v[2]===1?'Both accounts tell you this. The main event is in both: drop it in the middle.':v[2]===0?'Only someone who was there would know this small, personal detail: diary only.':'A girl of 10 that night could not know this. It was counted or decided later: book only.')}
 s.n++;s.bad=null;A.sound.pop();tell(`${v[0]} ${['Diary only.','Both.','Book only.'][v[2]]}`+(s.n>=VENN.length?' All 9 placed.':''))}
/* ask: three answer cards */
const AN=['Mia\'s diary','History book','Neither'];
function askCards(){const gp=8,n=3,w=(A.W-20-gp*2)/n,h=px(74);return AN.map((t,j)=>({t,j,x:10+j*(w+gp),y:A.H*.6,w,h}))}
function drawAsk(){const s=W.ask;paper();if(s.n>=ASK.length){title('All 8 questions matched',1);ASK.forEach((q,i)=>note(`${q[0]} → ${AN[q[1]]}`,A.H*(.15+i*.1),13));return}
 const q=ASK[s.n];title(`Question ${s.n+1} of 8: who can answer it?`);panel(slot(),q[0],{bg:NONE[0],fg:NONE[1],n:19,w:800});note('Tap the account that answers it',A.H*.48,13);
 askCards().forEach(r=>panel(r,r.t,{bg:[DIARY,BOOK,NONE][r.j][0],fg:[DIARY,BOOK,NONE][r.j][1],n:15,w:800,rim:s.bad===r.j?FAIL:null}))}
function ask(j){const s=W.ask;if(s.n>=ASK.length)return;const [q,want]=ASK[s.n];
 if(j!==want){s.bad=j;A.sound.miss();return tell(want===0?'Only someone who was there knows this. The diary gives feelings, sounds and small details.':want===1?'This needs numbers, causes or what came later. The history book was written after people checked the records.':'Neither account was there for that or could know it. Some questions need a different source.')}
 s.n++;s.bad=null;A.sound.pop();tell(`${q} ${AN[want]}.`+(s.n>=ASK.length?' All 8 matched.':''))}
/* tone: pick the history-book version */
function toneOpts(){const q=TONE[W.tone.n],gp=8,h=px(58),w=Math.min(A.W-20,px(400)),r=(W.tone.n+1)%3;return q[1].map((t,j)=>({t,j,x:A.W/2-w/2,w,h,y:A.H*.38+((j+r)%3)*(h+gp)}))}
function drawTone(){const s=W.tone;paper();if(s.n>=TONE.length){title('All 4 rewritten',1);TONE.forEach((q,i)=>note(q[1][0],A.H*(.2+i*.17),13));return}
 const q=TONE[s.n];title(`Line ${s.n+1} of 4: how would the history book say it?`);panel(slot(),'Diary: '+q[0],{bg:DIARY[0],fg:DIARY[1],n:16});
 toneOpts().forEach(r=>panel(r,r.t,{bg:BOOK[0],fg:BOOK[1],n:15,rim:s.bad===r.j?FAIL:null}))}
function tone(j){const s=W.tone;if(s.n>=TONE.length)return;const q=TONE[s.n];
 if(j){s.bad=j;A.sound.miss();const k=q[2][j-1];return tell(k==='me'?'That still says I or we. The history writer was not there, so it uses they, people or families.':k==='feel'?'That adds a feeling. A history book reports what happened, in calm words.':k==='all'?'Everyone all day is too big a claim. The book sticks to what records show.':'That changes the facts. A secondhand account must match what really happened.')}
 s.n++;s.bad=null;A.sound.pop();tell(`Book: ${q[1][0]}`+(s.n>=TONE.length?' All 4 done.':''))}
function draw(){const m=now();if(m==='quiz'){paper();title('Challenge',1);note('Was the writer there? What can each account tell you?',A.H*.5,15);return}
 if(SETS[m])drawSet(m);else({venn:drawVenn,ask:drawAsk,tone:drawTone})[m]();A.fx.draw(A.ctx)}
function grab(p){const m=now();
 if(SETS[m]){const [L,N]=SETS[m];if(W[m].n>=L.length)return false;if(hits(p,slot())){W.hold={j:0,x:p.x,y:p.y};return true}const b=twin(A.H*.36,N).find(r=>hits(p,r));if(b)setDrop(m,b.j);return false}
 if(m==='venn'&&W.venn.n<VENN.length){if(hits(p,slot())){W.hold={j:0,x:p.x,y:p.y};return true}const z=region(p);if(z>=0)venn(z);return false}
 if(m==='ask'&&W.ask.n<ASK.length){const r=askCards().find(r=>hits(p,r));if(r)ask(r.j)}
 if(m==='tone'&&W.tone.n<TONE.length){const r=toneOpts().find(r=>hits(p,r));if(r)tone(r.j)}return false}
function slide(p){if(W.hold){W.hold.x=p.x;W.hold.y=p.y;A.redraw()}}
function release(p){const m=now();if(!W.hold)return;W.hold=null;
 if(SETS[m]){const b=twin(A.H*.36,SETS[m][1]).find(r=>hits(p,r));b?setDrop(m,b.j):A.redraw();return}
 if(m==='venn'){const z=region(p);z>=0?venn(z):A.redraw()}}
function wipe(){ticket++;for(const k in W)delete W[k];Object.assign(W,{src:{n:0},line:{n:0},venn:{n:0},ask:{n:0},tone:{n:0},hold:null,check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();W.check()}
function setup(i,first,ok,msg){wipe();tell(first);W.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=ticket;acts.forEach((f,j)=>setTimeout(()=>{if(me===ticket)f()},ms*(j+1)))}
function pads(){if(!keysEl)return;keysEl.innerHTML='';const m=now(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keysEl,t).onclick=f};
 if(SETS[m]&&W[m].n<SETS[m][0].length){const [L,N]=SETS[m];N.forEach((t,j)=>b(t,()=>setDrop(m,j),`${L[W[m].n][0]}: ${t}`))}
 if(m==='venn'&&W.venn.n<VENN.length)['Diary only','Both','Book only'].forEach((t,z)=>b(t,()=>venn(z),`${VENN[W.venn.n][0]}: ${t}`));
 if(m==='ask'&&W.ask.n<ASK.length)AN.forEach((t,j)=>b(t,()=>ask(j),`${ASK[W.ask.n][0]} ${t}`));
 if(m==='tone'&&W.tone.n<TONE.length)toneOpts().sort((x,y)=>x.y-y.y).forEach(r=>b(r.t,()=>tone(r.j),'History book: '+r.t))}
const steps=[
{h:'Was the writer there?',p:'A firsthand account is written by someone who was there, like a diary or a letter. A secondhand account is written by someone who found out later, from books, records or other people. Drag each source.',
predict:{q:'A biography of a famous explorer is…',opts:['firsthand: it is all about her','secondhand: someone else wrote it'],ans:1},task:'Sort all 10 sources',
show:()=>demo(0,SRC.map(x=>()=>setDrop('src',x[1])),420),
go:()=>setup(0,'Mia\'s diary, written the night of the flood. Drag it.',()=>W.src.n>=SRC.length,'Being there is what makes it firsthand.')},
{h:'One flood, two accounts',p:'In 2004 a river flooded Mia\'s town. Mia was 10 and wrote a diary that night. In 2024 a writer made a history book about it. Drag each line to the account it came from.',task:'Sort all 8 lines',
show:()=>demo(1,LINES.map(x=>()=>setDrop('line',x[1])),460),
go:()=>setup(1,'My boots filled with icy water. Which account says this?',()=>W.line.n>=LINES.length,'The diary zooms in on one girl. The book zooms out to the whole town.')},
{h:'Same event, different focus',p:'Compare the two accounts. Some details are in both. Some are only in the diary, and some only in the book. Drag each detail into the right part of the circles.',task:'Place all 9 details',
show:()=>demo(2,VENN.map(v=>()=>venn(v[2])),520),
go:()=>setup(2,'The river flooded on 3 March 2004. Drag it into the circles.',()=>W.venn.n>=VENN.length,'Both tell the main event. Each adds what only it could know.')},
{h:'Which account do you need?',p:'Each account is good for different questions. Read the question, then tap the account that can answer it, or Neither.',
predict:{q:'Which account is more useful?',opts:['the history book: it has the facts','it depends on your question'],ans:1},task:'Match all 8 questions',
show:()=>demo(3,ASK.map(q=>()=>ask(q[1])),520),
go:()=>setup(3,'How did it feel to be there? Tap the account that answers it.',()=>W.ask.n>=ASK.length,'Feelings come from the diary. Numbers and causes come from the book.')},
{h:'Same fact, different words',p:'A firsthand account uses I and we, and shows feelings. A secondhand account uses they and people, and calm, careful words. Tap how the history book would write each diary line.',task:'Rewrite all 4 lines',
show:()=>demo(4,TONE.map(()=>()=>tone(0)),620),
go:()=>setup(4,'The water was up to my knees and freezing! Tap the history-book version.',()=>W.tone.n>=TONE.length,'Same event: personal words in the diary, calm words in the book.')},
{h:'Challenge',p:'',go:()=>{wipe();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W.check()});
const QS=[
{q:'Which is a firsthand account of a volcano erupting?',a:'A diary kept by someone who lived nearby',o:[['A science book about volcanoes','book'],['A biography of a volcano expert','bio']]},
{q:'An autobiography is…',a:'firsthand: the writer tells their own life',o:[['secondhand: it is about a person','about'],['neither: it is a story book','neither']]},
{q:'You want to know how many people saw the first Moon landing on TV. Use…',a:'a secondhand account that used records',o:[['an astronaut\'s diary from the Moon','feel'],['either one, they say the same','same']]},
{q:'Which line is most likely from a firsthand account?',a:'I could hear the crowd cheering below me.',o:[['Historians agree the crowd was large.','big'],['The event was held in 1969.','big']]},
{q:'A diary and a textbook describe the same storm. What is true?',a:'They tell the same event with a different focus.',o:[['The textbook is always right.','trust'],['The diary is always right.','trust2']]}];
function why(t){let m='Ask: was the writer there, or did they find out later?';switch(t){case 'book':m='A science book was written by someone who studied it later: secondhand.';break;
 case 'bio':m='A biography is about a person but written by someone else: secondhand.';break;case 'about':m='Being about a person does not make it secondhand. The writer of an autobiography lived it: firsthand.';break;
 case 'neither':m='An autobiography is a true life story, told by the person who lived it.';break;case 'feel':m='An astronaut on the Moon could not count TV viewers on Earth. Numbers come from records.';break;
 case 'same':m='They do not say the same things. Each one has a different focus.';break;case 'big':m='That is a fact someone checked later, written in calm words. I could hear… is someone who was there.';break;
 case 'trust':m='A textbook can still leave things out, like how it felt. Compare both.';break;case 'trust2':m='A diary shows one view and can miss the big picture. Compare both.'}return m}
function next(){ix++;const Q=QS[ix%QS.length],all=[[Q.a,'ok'],...Q.o],r=ix%3,ord=all.slice(r).concat(all.slice(0,r));
 chalEl.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chalEl.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function score(t,a){chalEl.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chalEl.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();const m=ok?'':why(t);
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+m)+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':m)}
FK.shell(c,{steps,ratio:.68,tall:1.3,draw,onStep:B=>{chalEl.hidden=B.step!==5;keysEl.hidden=B.step===5;pads()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);keysEl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Account buttons'},w);chalEl=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down:grab,move:slide,up:release});pads()}}).start()})})();
