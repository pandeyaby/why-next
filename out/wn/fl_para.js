/* Flagship – organising writing into paragraphs (7–10): group sentences by idea, mark where a new paragraph starts,
   give the TiPToP reason in a story, place a title and sub-headings, and open a paragraph with its topic sentence. */
(()=>{
const GROUP={heads:['What they look like','What they eat','Where they live'],cards:[['Hedgehogs are covered in about 5,000 sharp spines.',0],['Slugs, beetles and worms are their favourite food.',1],['They sleep in nests of leaves under hedges.',2],['A hedgehog has a pointed nose and tiny black eyes.',0],['In winter they hibernate in a pile of logs.',2],['They hunt for insects at night.',1]]};
const FOX=['A red fox has orange-red fur and a bushy tail.','Its large, pointed ears pick up tiny sounds.','Foxes are omnivores, so they eat plants and animals.','They hunt mice, rabbits and birds.','They also eat berries, fruit and worms.','In towns, some foxes look for scraps in bins.','A fox family lives in an underground den called an earth.','The cubs are born there in spring.'],FOXB=[2,6];
const FOXT=['looks','looks','food','food','food','food','home','home'];
const TIP=['Time','Place','Topic','Person'];
const STORY=[['Mia packed her net and her jam jar.',-1],['The next morning, she set off before breakfast.',0],['Down at the river, the water was clear and cold.',1],['"Look, a newt!" shouted Sam from the bank.',3],['Suddenly, the jam jar slipped and smashed on a rock.',2]];
const BATS={slots:['Title','Above paragraph 1','Above paragraph 2','Above paragraph 3'],paras:['Bats are the only mammals that can truly fly. Their wings are skin stretched over long finger bones.','Most bats in the UK eat insects. One pipistrelle can eat thousands of midges in a night.','Bats rest in roosts in trees, caves and roofs.'],cards:[['Bats',0],['Bodies built to fly',1],['Food',2],['Roosts',3],['Bats eat insects.',-1]]};
const TOPIC=[[['Owls are built to hunt at night.','Their huge eyes see in dim light.','Soft feathers let them fly without a sound.'],0],[['They can spin their heads a long way round.','Owls have special necks.','They have 14 neck bones, twice as many as us.'],1]];
VIS.reg('flagpara',c=>{let A,pad,quiz,qi=-1,run=0;
const B0=()=>({want:()=>{},won:0,i:0,box:[[],[],[]],brk:{},tip:-1,sel:-1,slot:[null,null,null,null],hits:[],bad:-1,ok:0,grab:null,msg:''}),S=B0();
const mode=()=>['group','break','tip','head','topic','quiz'][A.step];
const R=()=>A.reduced(),fs=n=>Math.round(n*(A.narrow?1:1.12));
const speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function wrap(g,t,x,y,w,lh,draw){const ws=t.split(' ');let line='',n=0;for(const wd of ws){const tr=line?line+' '+wd:wd;if(g.measureText(tr).width>w&&line){if(draw)g.fillText(line,x,y+n*lh);n++;line=wd}else line=tr}if(draw)g.fillText(line,x,y+n*lh);return(n+1)*lh}
function font(g,n,b){g.font=`${b?800:500} ${fs(n)}px system-ui,sans-serif`;g.textAlign='left';g.textBaseline='top'}
function box(g,x,y,w,h,col,fill,k){g.fillStyle=fill;A.paint.rrect(x,y,w,h,10);g.fill();g.strokeStyle=col;g.lineWidth=2;A.paint.rrect(x,y,w,h,10);g.stroke();if(k!=null)S.hits.push({x,y,w,h,k})}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();S.hits=[];g.fillStyle=A.mix(C.pn,'#fffbeb',C.dark?.04:.5);g.fillRect(0,0,W,H);const P=10,TW=W-2*P;
 if(v==='group'){const cur=GROUP.cards[S.i];font(g,13,1);g.fillStyle=C.tx;
  if(cur){const h=wrap(g,cur[0],0,0,TW-20,18)+16;box(g,P,8,TW,h,C.vi,A.alpha(C.vi,.14),'card');g.fillStyle=C.tx;wrap(g,cur[0],P+10,16,TW-20,18,1);if(S.grab&&S.grab.x!=null){g.globalAlpha=.85;box(g,S.grab.x-70,S.grab.y-16,140,32,C.vi,C.pn);g.globalAlpha=1}}
  const top=78,bh=(H-top-8)/3;GROUP.heads.forEach((hd,b)=>{const y=top+b*bh;box(g,P,y,TW,bh-8,S.bad===b?C.rd:C.ln,S.bad===b?A.alpha(C.rd,.12):C.bg,'b'+b);font(g,13,1);g.fillStyle=C.tx;g.fillText(hd,P+10,y+8,TW-20);
   font(g,12);S.box[b].forEach((t,j)=>{g.fillStyle=C.tx;wrap(g,'• '+t,P+10,y+28+j*26,TW-20,16,1)})})}
 if(v==='break'){let y=8;font(g,13);FOX.forEach((t,i)=>{if(i&&S.brk[i]){y+=14}g.fillStyle=C.tx;const ind=S.brk[i]||!i?16:0,h=wrap(g,t,P+ind,y,TW-ind,18,0);wrap(g,t,P+ind,y,TW-ind,18,1);
   if(S.bad===i){g.strokeStyle=C.rd;g.lineWidth=2;g.strokeRect(P-4,y-3,TW+8,h+4)}y+=h;if(i<FOX.length-1){const gy=y;S.hits.push({x:0,y:gy-4,w:W,h:16,k:'g'+(i+1)});g.strokeStyle=S.brk[i+1]?C.gr:A.alpha(C.mu,.5);g.setLineDash(S.brk[i+1]?[]:[4,4]);g.lineWidth=S.brk[i+1]?3:1;g.beginPath();g.moveTo(P,gy+3);g.lineTo(W-P,gy+3);g.stroke();g.setLineDash([]);
   if(S.brk[i+1]){font(g,12,1);g.fillStyle=C.tx;g.fillText('¶ new paragraph',W-P-110,gy+6);font(g,13)}y+=10}})}
 if(v==='tip'){let y=8;font(g,13);STORY.forEach(([t],i)=>{const cur=i===S.i+1;const h=wrap(g,t,0,0,TW-36,18,0)+10;if(cur)box(g,P,y-4,TW,h+2,C.vi,A.alpha(C.vi,.14));g.fillStyle=C.tx;wrap(g,t,P+18,y+1,TW-36,18,1);
   if(i&&i<=S.i){font(g,11,1);g.fillStyle=C.tx;g.fillText('✓ '+TIP[STORY[i][1]],P+2,y+h-12);font(g,13)}y+=h+8});
  const tw=(TW-18)/4,ty=H-70;TIP.forEach((t,k)=>{box(g,P+k*(tw+6),ty,tw,60,S.bad===k?C.rd:C.ac,S.bad===k?A.alpha(C.rd,.15):A.alpha(C.ac,.12),'t'+k);font(g,14,1);g.fillStyle=C.tx;g.textAlign='center';g.fillText(t,P+k*(tw+6)+tw/2,ty+21,tw-6)})}
 if(v==='head'){let y=8;const sw=TW;BATS.slots.forEach((s,k)=>{const f=S.slot[k],hh=k?30:36;box(g,P,y,sw,hh,f!=null?C.gr:S.bad===k?C.rd:C.ln,f!=null?A.alpha(C.gr,.14):C.bg,'s'+k);font(g,k?13:16,1);g.fillStyle=f!=null?C.tx:C.mu;g.fillText(f!=null?BATS.cards[f][0]:(k?'sub-heading ':'heading ')+'here',P+10,y+(hh-fs(k?13:16))/2,sw-20);y+=hh+4;
   if(k){font(g,12);g.fillStyle=C.tx;y+=wrap(g,BATS.paras[k-1],P+4,y,TW-8,16,1)+8}});
  const left=BATS.cards.map((x,i)=>i).filter(i=>!S.slot.includes(i));let x=P,cy=y+4;font(g,13,1);left.forEach(i=>{const w=g.measureText(BATS.cards[i][0]).width+20;if(x+w>W-P){x=P;cy+=40}
   box(g,x,cy,w,34,S.sel===i?C.vi:C.ac,S.sel===i?A.alpha(C.vi,.25):A.alpha(C.ac,.1),'c'+i);g.fillStyle=C.tx;g.fillText(BATS.cards[i][0],x+10,cy+9);x+=w+6})}
 if(v==='topic'){const T=TOPIC[S.won?TOPIC.length-1:S.i],set=T[0],ord=S.won?[T[1]].concat([0,1,2].filter(j=>j!==T[1])):S.ord||[0,1,2];let y=8;font(g,13,1);g.fillStyle=C.tx;g.fillText('Which sentence should open the paragraph?',P,y,TW);y+=30;
  ord.forEach((j,n)=>{font(g,13);const h=wrap(g,set[j],0,0,TW-20,18,0)+16,on=S.won&&!n;box(g,P,y,TW,h,S.bad===j?C.rd:on?C.gr:C.ac,S.bad===j?A.alpha(C.rd,.12):on?A.alpha(C.gr,.14):A.alpha(C.ac,.08),'o'+j);g.fillStyle=C.tx;wrap(g,set[j],P+10,y+8,TW-20,18,1);y+=h+8})}
 if(S.msg)A.paint.label(S.msg,W/2,H-12,{bg:S.ok?'#14532d':'#7f1d1d',font:`700 ${fs(13)}px system-ui`});A.fx.draw(g)}
const miss=(t,b)=>{A.sound.miss();S.bad=b;S.ok=0;S.msg='✗ Not quite';speak(t);setTimeout(()=>{S.bad=-1;S.msg='';A.redraw()},R()?10:900);buttons();A.redraw()};
const good=t=>{S.ok=1;S.msg='';A.sound.tick();speak(t);buttons();A.redraw()};
function place(b){if(mode()!=='group')return;const cur=GROUP.cards[S.i];if(!cur)return;const[t,k]=cur;
 if(b!==k)return miss(`That sentence is about ${['what they look like','what they eat','where they live'][k]}, not ${['looks','food','homes'][b]}. Each paragraph keeps to one idea.`,b);
 S.box[b].push(t.split(' ').slice(0,5).join(' ')+' …');S.i++;if(S.i>=GROUP.cards.length){S.won=1;good('All six sentences are grouped: one idea per paragraph, each under its sub-heading.');return S.want()}good('Yes, it belongs in '+GROUP.heads[b]+'.')}
function gap(i){if(mode()!=='break'||S.won)return;S.brk[i]=S.brk[i]?0:1;S.msg='';A.sound.tick();speak(S.brk[i]?`New paragraph before sentence ${i+1}.`:`Joined sentence ${i+1} back on.`);buttons();A.redraw()}
function checkBreaks(){if(mode()!=='break'||S.won)return;const on=Object.keys(S.brk).filter(k=>S.brk[k]).map(Number).sort((a,b)=>a-b);
 const extra=on.find(i=>!FOXB.includes(i)),missing=FOXB.find(i=>!on.includes(i));
 if(extra!=null)return miss(`Sentences ${extra} and ${extra+1} are both about ${FOXT[extra]}. Keep them in one paragraph, however many sentences it has.`,extra);
 if(missing!=null)return miss(`Sentence ${missing+1} starts a new idea: the fox's ${FOXT[missing]}. Start a new paragraph there.`,missing);
 S.won=1;good('Right: 2 sentences on looks, 4 on food, 2 on home. Paragraphs change when the idea changes, not after a set number of lines.');S.want()}
function tip(k){if(mode()!=='tip'||S.won)return;const cur=STORY[S.i+1];if(!cur)return;const ok=cur[1];
 if(k!==ok){const m={0:'Look at the opening words: "The next morning" is a jump in time.',1:'"Down at the river" moves us to a new place.',2:'Something new happens: the jar smashes. That is a new event, a new topic.',3:'Someone new speaks. A new speaker always gets a new paragraph.'}[ok];return miss(m,k)}
 S.i++;if(S.i>=STORY.length-1){S.won=1;good('TiPToP: a new paragraph for a new Time, Place, Topic or Person speaking.');return S.want()}good(`Yes: ${TIP[ok]}. Next break.`)}
function choose(i){if(mode()!=='head'||S.won)return;S.sel=S.sel===i?-1:i;A.sound.tick();speak(S.sel<0?'Card put back.':`Picked "${BATS.cards[i][0]}". Now choose where it goes.`);buttons();A.redraw()}
function drop(k,i){if(mode()!=='head'||S.won)return;if(i==null)i=S.sel;if(i<0||i==null)return speak('Pick a heading card first.');if(S.slot[k]!=null)return speak('That place has a heading already.');const want=BATS.cards[i][1];S.sel=-1;
 if(want<0)return miss('That is a sentence from the text, not a heading. A heading is a short label with no full stop.',k);
 if(want!==k){const m=k===0?`"${BATS.cards[i][0]}" only fits one part. The title names the whole topic: Bats.`:want===0?'"Bats" names the whole page, so it is the title, not a sub-heading.':`That sub-heading does not match this paragraph. Read it: what is it about?`;return miss(m,k)}
 S.slot[k]=i;if(S.slot.every(x=>x!=null)){S.won=1;good('The title names the topic and each sub-heading names one paragraph, so a reader can find facts fast.');return S.want()}good('Yes, that fits.')}
function opener(j){if(mode()!=='topic'||S.won)return;const[set,ok]=TOPIC[S.i];if(j!==ok)return miss(`"${set[j]}" is a detail. The topic sentence says what the whole paragraph is about, so it goes first.`,j);
 S.i++;if(S.i>=TOPIC.length){S.won=1;good('A topic sentence opens the paragraph, then the details back it up.');return S.want()}S.ord=[2,0,1];good('Yes, that sentence tells us what the paragraph is about. One more.')}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l,on)=>{const b=c.el('button',{type:'button',class:'lbtn ghost'+(on?' on':''),'aria-label':l||null,'aria-pressed':on==null?null:String(!!on)},pad,t);b.onclick=fn};
 if(v==='group'&&!S.won)GROUP.heads.forEach((h,b)=>B(h,()=>place(b),'Put the sentence under '+h));
 if(v==='break'&&!S.won){for(let i=1;i<FOX.length;i++)B(`¶ ${i+1}`,()=>gap(i),`New paragraph before sentence ${i+1}`,!!S.brk[i]);B('Check',checkBreaks,'Check the paragraph breaks')}
 if(v==='tip'&&!S.won)TIP.forEach((t,k)=>B(t,()=>tip(k),'New paragraph because of a new '+t.toLowerCase()));
 if(v==='head'&&!S.won){BATS.cards.forEach((x,i)=>{if(!S.slot.includes(i))B(x[0],()=>choose(i),'Pick the card '+x[0],S.sel===i)});if(S.sel>=0)BATS.slots.forEach((s,k)=>{if(S.slot[k]==null)B('→ '+s,()=>drop(k),'Put it: '+s)})}
 if(v==='topic'&&!S.won){const[set]=TOPIC[S.i];(S.ord||[0,1,2]).forEach(j=>B(`"${set[j].slice(0,22)}…"`,()=>opener(j),'Open with: '+set[j]))}A.redraw()}
const hit=p=>S.hits.find(h=>p.x>=h.x&&p.x<=h.x+h.w&&p.y>=h.y&&p.y<=h.y+h.h);
function down(p){const h=hit(p),v=mode();if(!h)return false;const k=h.k,n=+k.slice(1);
 if(v==='group'){if(k==='card'){S.grab={x:null,y:null,x0:p.x,y0:p.y};return true}if(k[0]==='b')place(n);return false}
 if(v==='break'&&k[0]==='g')gap(n);if(v==='tip'&&k[0]==='t')tip(n);if(v==='topic'&&k[0]==='o')opener(n);
 if(v==='head'){if(k[0]==='c'){choose(n);S.grab={x:null,y:null,x0:p.x,y0:p.y,i:n};return true}if(k[0]==='s')drop(n)}return false}
function move(p){if(!S.grab)return;S.grab.x=p.x;S.grab.y=p.y;A.redraw()}
function up(p){const d=S.grab;if(!d)return;S.grab=null;A.redraw();if(Math.hypot(p.x-d.x0,p.y-d.y0)<8)return;const h=hit(p);if(!h)return;
 if(mode()==='group'&&h.k[0]==='b')place(+h.k.slice(1));if(mode()==='head'&&h.k[0]==='s')drop(+h.k.slice(1),d.i)}
const check=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list){const k=++run;list.forEach((fn,j)=>setTimeout(()=>{if(k===run)fn()},R()?j*40+30:(j+1)*260))}
const fresh=()=>{run++;Object.assign(S,B0());S.ord=null};
const steps=[
{h:'One idea per paragraph',p:'A report on hedgehogs has three paragraphs, each under a sub-heading. Drag each sentence into the right paragraph, or tap a box.',task:'Group all 6 sentences',
 show:()=>{steps[0].go();play(GROUP.cards.map(x=>()=>place(x[1])))},go:()=>{fresh();speak('Where does this sentence belong?');S.want=check(0,()=>S.won,'Sentences about the same idea go together in one paragraph.')}},
{h:'Where does a new paragraph start?',p:'This fox report has no paragraphs. Tap the gap before a sentence that starts a new idea, then Check.',
 predict:{q:'How do you know when to start a new paragraph?',opts:['After every 3 sentences','When the idea changes'],ans:1},task:'Mark the 2 paragraph breaks',
 show:()=>{steps[1].go();play([()=>gap(3),checkBreaks,()=>gap(3),()=>gap(2),()=>gap(6),checkBreaks])},go:()=>{fresh();speak('Tap a gap to start a new paragraph.');S.want=check(1,()=>S.won,'A paragraph can be 2 sentences or 4. It ends when the idea changes.')}},
{h:'Stories: TiPToP',p:'Stories start a new paragraph for a new Time, Place, Topic or Person speaking. Why does each highlighted paragraph start?',
 predict:{q:'Sam suddenly speaks. Does his line need a new paragraph?',opts:['No, only a new place does','Yes, a new speaker gets one'],ans:1},task:'Give the reason for all 4 breaks',
 show:()=>{steps[2].go();play([()=>tip(1),()=>tip(0),()=>tip(1),()=>tip(3),()=>tip(2)])},go:()=>{fresh();speak('Why does this paragraph start? Time, Place, Topic or Person?');S.want=check(2,()=>S.won,'TiPToP: Time, Place, Topic, Person.')}},
{h:'Headings and sub-headings',p:'Non-fiction uses a title for the whole page and a sub-heading for each paragraph. Drag a card to its place, or tap it and then tap a place.',task:'Fill the title and all 3 sub-headings',
 show:()=>{steps[3].go();play([()=>choose(4),()=>drop(1),()=>choose(0),()=>drop(0),()=>choose(1),()=>drop(1),()=>choose(2),()=>drop(2),()=>choose(3),()=>drop(3)])},go:()=>{fresh();speak('Put the title and sub-headings in place.');S.want=check(3,()=>S.won,'A title names the topic; a sub-heading names one paragraph.')}},
{h:'Topic sentence first',p:'A paragraph usually opens with a topic sentence that says what it is about. Tap the sentence that should go first.',task:'Pick the opener for 2 paragraphs',
 show:()=>{steps[4].go();play([()=>opener(1),()=>opener(0),()=>opener(1)])},go:()=>{fresh();speak('Which sentence should open the paragraph?');S.want=check(4,()=>S.won,'Topic sentence first, details after.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Your report has 2 sentences about a bird’s nest, then 4 about what it eats. How many paragraphs?',[['2: one for each idea','ok'],['3: about 3 sentences each','three'],['1: it is one report','one']]],
 ['In a story, "Later that night, the wind howled." Why start a new paragraph?',[['A new time','ok'],['A new person speaks','person'],['It is a long sentence','long']]],
 ['Which is the best sub-heading for a paragraph about what sharks eat?',[['Food','ok'],['Sharks eat fish and seals.','sentence'],['Sharks','title']]],
 ['"Ben shouted, “Wait for me!”" comes after Mia speaks. What do you do?',[['Start a new paragraph','ok'],['Keep it in Mia’s paragraph','same'],['Add a sub-heading','headstory']]],
 ['Which sentence should open a paragraph about penguins’ feathers?',[['Penguins have special feathers for the cold.','ok'],['Each feather is short and stiff.','detail'],['Penguins live in the south.','off']]]];
function why(t){let m='Ask: has the idea, time, place or speaker changed?';
 if(t==='three')m='Paragraphs do not have a set length. Two ideas make two paragraphs: one of 2 sentences, one of 4.';
 if(t==='one')m='One report can have many paragraphs. Each new idea gets its own.';
 if(t==='person')m='Nobody speaks in that line. "Later that night" shows a jump in time.';
 if(t==='long')m='Length is not the reason. "Later that night" moves the story to a new time.';
 if(t==='sentence')m='That is a full sentence. A sub-heading is a short label, like Food.';
 if(t==='title')m='"Sharks" names the whole report, so it is the title. The sub-heading names one part: Food.';
 if(t==='same')m='Each new speaker gets a new paragraph, so readers know who is talking.';
 if(t==='headstory')m='Stories do not usually use sub-headings. A new speaker gets a new paragraph.';
 if(t==='detail')m='That is a detail. The topic sentence says what the whole paragraph is about.';
 if(t==='off')m='That sentence is about where penguins live, not their feathers. It belongs in another paragraph.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});speak('Challenge: '+q);A.redraw()}
let streak=0;
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Well organised.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
