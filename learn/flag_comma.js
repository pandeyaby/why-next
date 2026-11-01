/* Flagship – commas in lists (ages 6–11): tap the gaps in a sentence to put commas between the items in a list and
   watch "what the reader sees" split into separate things, keep two-word items like "chocolate cake" whole, take the
   comma out of a list of two, pack a lunch box and join the list with commas and "and", then fix three broken lists.
   Tap a gap on the sentence, or move the cursor with the buttons and add or remove a comma. */
(()=>{
/* a sentence: words, the items of its list (word indexes), and the commas it starts with (gap k = after word k) */
const T=(w,items,c0)=>({w:w.split(' '),items,c0:c0||[]});
const SENT={
 one:[T('At the shop I bought apples pears plums and grapes',[[5],[6],[7],[9]])],
 two:[T('For the picnic we packed cheese sandwiches chocolate cake and orange juice',[[5,6],[7,8],[10,11]])],
 pair:[T('I like cats and dogs',[[2],[4]],[2]),T('Mum and Dad came to the show',[[0],[2]],[0])],
 fix:[T('I saw a fox a deer and an owl',[[2,3],[4,5],[7,8]],[1]),T('Red blue green and yellow are my best colours',[[0],[1],[2],[4]],[0,4]),T('Sam Priya Leo and Max ran in the race',[[0],[1],[2],[4]],[0,1,3])]};
const FOOD=[['🍎','an apple'],['🍌','a banana'],['🧀','some cheese'],['🥕','two carrots']],JOIN=['?',',','and',', and'];
VIS.reg('flagcomma',c=>{let A,pad,qbox,qi=-1,ver=0,streak=0;
const fresh=()=>({want:()=>{},won:0,si:0,set:new Set(),cur:0,box:[],joins:[],drag:null,flash:-1,note:''}),S=fresh();
const mode=()=>['one','two','pair','build','fix','quiz'][A.step],fast=()=>A.reduced();
const say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)},need=()=>({one:1,two:1,pair:2,build:1,fix:3}[mode()]||9);
const fs=n=>Math.round(n*(A.narrow?1:1.12)),sent=()=>(SENT[mode()]||[])[S.si];
function label(g,t,x,y,n,col,wt,al,mw){g.font=`${wt||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-12)}
/* what each gap is, for this sentence: need (a comma must go here), opt (serial comma before "and"), or no */
function role(s,k){const it=s.items,n=it.length,ends=it.map(r=>r[r.length-1]),j=ends.indexOf(k);
 if(j>=0&&j<n-1){if(j===n-2)return n===2?'two':'opt';return 'need'}
 if(j===n-1)return k<s.w.length-1?'last':'end';if(k===it[0][0]-1)return 'before';if(s.w[k]==='and')return 'and';
 if(it.some(r=>r.includes(k)&&r.includes(k+1)))return 'inside';return 'no'}
function status(s){const bad=[],miss=[];for(let k=0;k<s.w.length-1;k++){const r=role(s,k),on=S.set.has(k);if(on&&!['need','opt'].includes(r))bad.push(k);if(!on&&r==='need')miss.push(k)}return{bad,miss,ok:!bad.length&&!miss.length}}
/* split the list where the commas and "and" are: this is what a reader takes as separate things */
function seen(s){const a=s.items[0][0],b=s.items[s.items.length-1].slice(-1)[0],out=[];let cur=[];
 for(let k=a;k<=b;k++){if(s.w[k]==='and'){if(cur.length)out.push(cur.join(' '));cur=[];continue}cur.push(s.w[k]);if(S.set.has(k)||k===b){out.push(cur.join(' '));cur=[]}}return out.filter(Boolean)}
/* lay the words out in lines; remember where each gap is so a tap can find it */
function layout(words){const g=A.ctx,size=fs(A.narrow?19:20),lh=size*2.1,pad=14,mw=A.W-2*pad;g.font=`700 ${size}px system-ui,sans-serif`;
 const sp=size*.9,pos=[];let x=pad,y=A.H*.12;words.forEach((w,i)=>{const t=w+(i===words.length-1?'.':''),ww=g.measureText(t).width+(S.set.has(i)?g.measureText(',').width:0);
  if(x+ww>pad+mw&&x>pad){x=pad;y+=lh}pos.push({x,y,w:ww,t});x+=ww+sp});return{pos,size,sp,lh}}
function drawSentence(g){const s=sent();if(!s)return;const C=A.col,L=layout(s.w);let first=true;
 L.pos.forEach((p,i)=>{const word=s.w[i]+(i===s.w.length-1?'.':'');g.font=`700 ${L.size}px system-ui,sans-serif`;g.textAlign='left';g.textBaseline='middle';g.fillStyle=C.tx;g.fillText(word,p.x,p.y);
  if(S.set.has(i)){const wx=g.measureText(s.w[i]).width;g.fillStyle=i===S.flash?C.rd:C.vi;g.font=`900 ${L.size*1.15}px system-ui,sans-serif`;g.fillText(',',p.x+wx,p.y)}
  if(i<s.w.length-1){const nx=L.pos[i+1],gx=nx.y===p.y?p.x+p.w+L.sp/2:p.x+p.w+6;if(i===S.cur){g.strokeStyle=C.ac;g.lineWidth=3;g.beginPath();g.moveTo(gx,p.y-L.size*.8);g.lineTo(gx,p.y+L.size*.8);g.stroke()}
   else{g.fillStyle=A.mix(C.tx,C.pn,.65);g.beginPath();g.arc(gx,p.y+L.size*.75,2.2,0,7);g.fill()}p.gx=gx}});
 S.lay=L;const parts=seen(s),y0=L.pos[L.pos.length-1].y+L.lh*.9,h=A.H-y0-8;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.08:.55);A.paint.rrect(8,y0,A.W-16,h,12);g.fill();
 label(g,`What the reader sees: ${parts.length} thing${parts.length===1?'':'s'}`,A.W/2,y0+16,13,C.tx,800);
 const cols=A.narrow?(parts.some(t=>t.length>16)?1:2):(parts.some(t=>t.length>22)?2:3),cw=(A.W-28)/cols;parts.forEach((t,j)=>{const x=14+(j%cols)*cw,y=y0+34+Math.floor(j/cols)*34;g.fillStyle=C.dark?'#1e293b':'#fff';A.paint.rrect(x,y,cw-8,28,9);g.fill();g.strokeStyle=A.mix(C.tx,C.pn,.45);g.lineWidth=1.5;g.stroke();label(g,t,x+(cw-8)/2,y+14,13,C.tx,700,'center',cw-14)})}
/* ---- lunch box: drag food into the sentence, then choose each join ---- */
const shelf=i=>{const n=FOOD.length,w=(A.W-20)/n;return{x:10+i*w,y:A.H*.04,w:w-8,h:A.H*.2}};
function buildWords(){const out=[];S.box.forEach((f,i)=>{out.push(FOOD[f][1]);if(i<S.box.length-1)out.push(JOIN[S.joins[i]])});return out}
function drawBuild(g){const C=A.col;FOOD.forEach((f,i)=>{const r=shelf(i),used=S.box.includes(i);g.fillStyle=used?A.mix(C.pn,C.tx,.06):C.dark?'#1e293b':'#fff';A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=A.mix(C.tx,C.pn,.45);g.lineWidth=1.5;g.stroke();
  g.font=`${Math.round(r.h*.38)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#111';g.fillText(f[0],r.x+r.w/2,r.y+r.h*.36);label(g,used?'packed':f[1],r.x+r.w/2,r.y+r.h*.78,12,used?C.mu:C.tx,700,'center',r.w-6)});
 const d=S.drag;if(d&&d.x!=null){g.font='34px system-ui';g.textAlign='center';g.fillText(FOOD[d.f][0],d.x,d.y)}
 const y=A.H*.36,lh=fs(17)*2.2;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.08:.55);A.paint.rrect(8,y-26,A.W-16,A.H*.5,12);g.fill();
 const toks=['In my lunch box I have'].concat(S.box.length?buildWords():['…']);let x=18,yy=y;S.hits=[];g.font=`700 ${fs(17)}px system-ui,sans-serif`;
 toks.forEach((t,i)=>{const isJ=i>0&&i%2===0,last=i===toks.length-1,txt=t+(last&&S.box.length?'.':''),w=g.measureText(txt).width+(isJ?18:0);if(!isJ&&x+w>A.W-18){x=18;yy+=lh}
  if(isJ){const j=i/2-1,r={x:x-2,y:yy-16,w:w,h:32,j};g.fillStyle=t==='?'?A.alpha(C.am,.25):A.alpha(C.vi,.18);A.paint.rrect(r.x,r.y,r.w,r.h,8);g.fill();g.strokeStyle=j===S.cur?C.ac:C.vi;g.lineWidth=j===S.cur?3:1.5;g.stroke();S.hits.push(r);label(g,t,r.x+w/2,yy,17,C.tx,800,'center',w)}
  else label(g,txt,x,yy,17,C.tx,700,'left');x+=w+fs(17)*.45});
 label(g,S.note||(S.box.length<3?'Drag 3 or 4 things into the lunch box':'Tap each ? to choose , or and'),A.W/2,A.H*.82,13,C.mu,700)}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#f8fafc',C.dark?.03:.4);g.fillRect(0,0,W,H);const m=mode();
 if(m==='build')drawBuild(g);else if(m!=='quiz')drawSentence(g);else{label(g,'Commas go between the items.',W/2,H*.4,18,C.tx,800);label(g,'apples, pears and plums',W/2,H*.56,17,C.vi,800)}A.fx.draw(g)}
function miss(t){A.sound.miss();say(t);A.redraw()}
const name=(s,k)=>{const r=s.items.find(r=>r.includes(k));return r?r.map(i=>s.w[i]).join(' '):s.w[k]};
/* add or take away a comma at gap k, with feedback that names the slip */
function toggle(k){const s=sent();if(!s||S.lock||S.won>=need()||k<0||k>=s.w.length-1)return;S.cur=k;const on=!S.set.has(k),r=role(s,k),w=s.w[k];on?S.set.add(k):S.set.delete(k);A.sound.tick();S.flash=-1;
 if(on){const msg={need:`Yes: that comma ends "${name(s,k)}".`,opt:`Allowed. A comma before "and" is the serial (Oxford) comma. UK schools usually leave it out; many US writers put it in.`,
  two:`A list of two things just needs "and". No comma: ${s.w.slice(0,s.items[1][0]+1).join(' ').replace(',','')}…`,before:`The list has not started yet. No comma after "${w}", before the first item.`,
  and:`No comma after "and". "And" already joins the last two items.`,inside:`"${name(s,k)}" is one item. A comma there splits it into two things. Look at what the reader sees!`,
  last:`"${name(s,k)}" is the last item. The list is over, so no comma after it.`,no:`No comma there: it is not between two items.`}[r];
  if(!['need','opt'].includes(r)){S.flash=k;A.sound.miss()}say(msg)}else say(r==='need'?`That comma was needed: it splits "${name(s,k)}" from the next item.`:`Comma taken out after "${w}".`);
 const st=status(s);if(st.ok){S.won++;S.lock=1;A.sound.pop();say((on?'':'Good fix. ')+(mode()==='pair'?'Two things just need "and", with no comma.':'Every item is split off with a comma, and "and" joins the last two.')+(S.won<need()?' Here is the next one.':''));if(S.won<need()){const v=ver,i0=S.si;setTimeout(()=>{if(v===ver&&S.si===i0)load(i0+1)},fast()?10:1100)}S.want()}keys();A.redraw()}
function load(i){const s=SENT[mode()][i];if(!s)return;S.si=i;S.lock=0;S.set=new Set(s.c0);S.cur=s.items[0][0];S.flash=-1;A.redraw()}
/* lunch box joins */
function pack(f){if(mode()!=='build'||S.box.includes(f)||S.box.length>=4||S.won)return;S.box.push(f);if(S.box.length>1)S.joins.push(0);S.cur=Math.max(0,S.joins.length-1);A.sound.pop();say(`Packed ${FOOD[f][1]}. ${S.box.length<3?'Pack more.':'Now choose the joins.'}`);keys();checkBuild();A.redraw()}
function cycle(j){if(S.won||j<0||j>=S.joins.length)return;S.cur=j;S.joins[j]=S.joins[j]%3+1;A.sound.tick();const n=S.joins.length,v=JOIN[S.joins[j]],last=j===n-1;
 say(last?(v===','?'This is the last join. A comma alone does not tell the reader the list is ending: use "and".':v==='and'?'"And" before the last item. Good.':'A comma and "and": the serial comma. That is allowed too.'):
  (v===','?'A comma between these items. Good.':v==='and'?'Too many "and"s! Use "and" only before the last item. Use commas between the others.':'Only the last join gets "and". Here, just a comma.'));checkBuild();keys();A.redraw()}
function checkBuild(){const n=S.joins.length;if(S.box.length<3||S.won)return;const ok=S.joins.every((v,j)=>j<n-1?v===1:v===2||v===3);if(ok){S.won=1;say(`In my lunch box I have ${buildWords().join(' ').replace(/ ,/g,',')}. Commas between the items, and "and" before the last one.`);S.want()}}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode();if(m==='quiz'||S.won>=need())return;const B=(t,l,f,cl)=>{const b=c.el('button',{type:'button',class:'lbtn '+(cl||'ghost'),'aria-label':l},pad,t);b.onclick=f};
 if(m==='build'){FOOD.forEach((f,i)=>{if(!S.box.includes(i)&&S.box.length<4)B(f[0]+' '+f[1],`Pack ${f[1]}`,()=>pack(i))});if(S.joins.length){B('◀','Previous join',()=>{S.cur=Math.max(0,S.cur-1);say(`Join ${S.cur+1}: ${JOIN[S.joins[S.cur]]}`);A.redraw()});B('▶','Next join',()=>{S.cur=Math.min(S.joins.length-1,S.cur+1);say(`Join ${S.cur+1}: ${JOIN[S.joins[S.cur]]}`);A.redraw()});B('Change join','Change the selected join',()=>cycle(S.cur),'')}
  if(S.box.length)B('Empty','Empty the lunch box',()=>{S.box=[];S.joins=[];S.cur=0;say('The lunch box is empty.');keys();A.redraw()});return}
 const s=sent();if(!s)return;const at=()=>`after "${s.w[S.cur]}"`;
 B('◀','Move the cursor left',()=>{S.cur=Math.max(0,S.cur-1);say(`Cursor ${at()}.${S.set.has(S.cur)?' There is a comma here.':''}`);A.redraw()});
 B('▶','Move the cursor right',()=>{S.cur=Math.min(s.w.length-2,S.cur+1);say(`Cursor ${at()}.${S.set.has(S.cur)?' There is a comma here.':''}`);A.redraw()});
 B(', add / remove','Add or remove a comma at the cursor',()=>toggle(S.cur),'')}
function down(p){const m=mode();if(m==='quiz'||S.won>=need())return false;
 if(m==='build'){const i=FOOD.findIndex((f,i)=>{const r=shelf(i);return p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h});if(i>=0&&!S.box.includes(i)){S.drag={f:i,x:null,x0:p.x,y0:p.y};return true}
  const h=(S.hits||[]).find(r=>p.x>r.x-6&&p.x<r.x+r.w+6&&p.y>r.y-8&&p.y<r.y+r.h+8);if(h)cycle(h.j);return false}
 const L=S.lay,s=sent();if(!L||!s)return false;let best=-1,bd=1e9;L.pos.forEach((q,i)=>{if(q.gx==null)return;const d=Math.abs(p.x-q.gx)+Math.abs(p.y-q.y)*2;if(d<bd){bd=d;best=i}});if(best>=0&&bd<L.size*2.2)toggle(best);return false}
function move(p){const d=S.drag;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>6){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d)return;if(d.x==null||p.y>A.H*.28)pack(d.f);else{say('Drag it down into the lunch box sentence.');A.redraw()}}
const ready=(n,okf,msg)=>()=>{if(A.step===n&&okf()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++ver;list.forEach((fn,j)=>setTimeout(()=>{if(k===ver)fn()},fast()?j*40+30:(j+1)*(gap||300)))}
const showFix=n=>{const out=[];for(let i=0;i<n;i++){const s=SENT[mode()][i];const acts=[];for(let k=0;k<s.w.length-1;k++){const r=role(s,k),on=s.c0.includes(k);if(on&&!['need','opt'].includes(r)||!on&&r==='need')acts.push(k)}
 acts.forEach(k=>out.push(()=>{if(S.si!==i)load(i);toggle(k)}))}return out};
const wipe=(note)=>{ver++;Object.assign(S,fresh(),{note:note||''})};
const steps=[
{h:'Where do the commas go?',p:'This sentence has a list, but no commas. Tap a gap to add a comma. Watch what the reader sees.',predict:{q:'Where do the commas go?',opts:['After every word','Between the items in the list'],ans:1},task:'Split the list with commas',
 show:()=>{steps[0].go();play(showFix(1),450)},go:()=>{wipe();load(0);say('At the shop I bought apples pears plums and grapes. Tap a gap to add a comma.');keys();S.want=ready(0,()=>S.won>=1,'Commas go between the items, so the reader sees 4 things.')}},
{h:'Two-word items',p:'Some items take two words. Put commas in so the reader sees 3 picnic things.',predict:{q:'Is there a comma between "chocolate" and "cake"?',opts:['Yes: a comma after every word','No: chocolate cake is one item'],ans:1},task:'Make the reader see 3 things',
 show:()=>{steps[1].go();play(showFix(1),450)},go:()=>{wipe();load(0);say('For the picnic we packed cheese sandwiches chocolate cake and orange juice.');keys();S.want=ready(1,()=>S.won>=1,'Each comma comes after a whole item, so chocolate cake stays one thing.')}},
{h:'A list of two',p:'These lists have only two things. Do they need a comma? Fix both sentences.',predict:{q:'Does a list of two things need a comma?',opts:['Yes: cats, and dogs','No: cats and dogs'],ans:1},task:'Fix 2 sentences',
 show:()=>{steps[2].go();play(showFix(2),700)},go:()=>{wipe();load(0);say('I like cats, and dogs. Is that comma right?');keys();S.want=ready(2,()=>S.won>=2,'Two things just need "and". Commas start when there are three or more.')}},
{h:'Pack a lunch box',p:'Drag 3 or 4 foods into the sentence. Then tap each ? to choose a comma or "and".',task:'Pack and join a list',
 show:()=>{steps[3].go();play([()=>pack(0),()=>pack(2),()=>pack(3),()=>cycle(0),()=>cycle(1),()=>cycle(1)],380)},go:()=>{wipe();say('Drag food into the lunch box sentence.');keys();S.want=ready(3,()=>S.won>=1,'Commas between the items, "and" before the last one.')}},
{h:'Fix the list',p:'Each sentence has a comma slip. Add or take away commas until it is right.',task:'Fix 3 lists',
 show:()=>{steps[4].go();play(showFix(3),400)},go:()=>{wipe();load(0);say('I saw, a fox a deer and an owl. Find the slip.');keys();S.want=ready(4,()=>S.won>=3,'No comma before the list, inside an item, after "and" or after the last item.')}},
{h:'Challenge',p:'',go:()=>{wipe();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which sentence is right?',[['I need pens, pencils and paper.','ok'],['I need, pens pencils and paper.','before'],['I need pens pencils, and, paper.','and']]],
 ['Which sentence is right?',[['We ate fish and chips, peas and ice cream.','ok'],['We ate fish, and chips, peas, and ice, cream.','every'],['We ate fish and chips peas and ice cream.','none']]],
 ['Which sentence is right?',[['I have a cat and a dog.','ok'],['I have a cat, and a dog.','two'],['I have, a cat and a dog.','before']]],
 ['Which sentence is right?',[['Jo, Ali and Kim, went home.','last'],['Jo, Ali and Kim went home.','ok'],['Jo Ali, and Kim went home.','miss']]],
 ['What do the commas in a list tell the reader?',[['Where each item ends','ok'],['Where to take a breath','breath'],['That a word is important','important']]]];
function hint(t){let m='Commas go between the items in a list, and "and" goes before the last one.';
 if(t==='before')m='The list has not started yet. No comma before the first item.';
 if(t==='and')m='No comma after "and". "And" already joins the last two items.';
 if(t==='every')m='Commas go after whole items, not after every word. "Fish and chips" and "ice cream" are each one item.';
 if(t==='none')m='Without commas the reader cannot tell where each item ends. Put a comma after each item except the last two.';
 if(t==='two')m='Two things only need "and". Commas start when there are three or more.';
 if(t==='last')m='Kim is the last item. The list is over, so no comma after it.';
 if(t==='miss')m='Jo is an item too. It needs a comma after it, before Ali.';
 if(t==='breath')m='You might pause, but the job of a list comma is to show where one item ends and the next begins.';
 if(t==='important')m='Commas do not make words important. In a list they separate the items.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
function judge(t){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),good=t==='ok';
 if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Right: commas between the items, "and" before the last.':'✗ '+hint(t)}${good?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:A=>{qbox.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qbox=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
A.start()})})();
