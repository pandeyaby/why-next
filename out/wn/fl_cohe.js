/* Flagship – cohesion within paragraphs (9–11): swap a repeated noun for a pronoun but keep the first mention; swap
   a repeat for a synonym that names the same thing; drag adverbials of sequence into a set of instructions; pick
   adverbials of cause, contrast and example to link two sentences; find the sentence that breaks the cohesive chain.
   Arcs draw the reference chain from each pronoun or synonym back to the noun it points to. */
(()=>{
const REP=[{s:['Foxes live in our towns.','Foxes sleep by day and hunt at night.'],a:[0,0],t:[1,0],r:'They'},
 {s:['Grandad grew a huge pumpkin.','Grandad took it to the village show.'],a:[0,0],t:[1,0],r:'He'},
 {s:['Sharks have rows of sharp teeth.','Sharks lose teeth all the time, but new ones grow.'],a:[0,0],t:[1,0],r:'They'}];
const SYN=[{s:['The volcano erupted in May.','Ash from the volcano covered the town.'],a:[0,1],t:[1,3],o:['mountain','town','ash']},
 {s:['A fox crept up to our bin.','The fox knocked the lid off.'],a:[0,1],t:[1,1],o:['animal','bin','lid']},
 {s:['Isaac Newton studied light.','Newton showed that white light splits into colours.'],a:[0,1],t:[1,0],o:['The scientist','The rainbow','The prism']}];
const SEQ=['___ fill a pot with soil.','___ push a seed in.','___ water it well.','___ put it in the sun.'],
 CARDS=['Firstly,','Next,','After that,','Finally,'];
const LCARDS=['As a result,','However,','For example,'],
 LINK=[{s:['Bees carry pollen from flower to flower.','___ plants can make seeds.'],k:0},{s:['Penguins are birds.','___ they cannot fly.'],k:1},
 {s:['Some animals sleep all winter.','___ hedgehogs hibernate from November to March.'],k:2}];
const LMSG=[[null,'However shows a contrast. Seeds come because of the pollen, so this is cause and effect.','Making seeds is not an example of carrying pollen. It is a result of it.'],
 ['Being a bird does not cause not flying. It is a surprise, so it needs a contrast.',null,'Not flying is a surprise, not an example. Use a word that shows contrast.'],
 ['Hedgehogs do not hibernate because of other animals. They are one example of them.','Nothing is being contrasted. Hedgehogs are one example of animals that sleep all winter.',null]];
const BRK=[{s:['Hedgehogs hunt at night.','They eat beetles and worms.','She laughed at the joke.','In winter, they hibernate.'],b:2,m:'She does not point back to anyone in the paragraph, so the chain breaks.'},
 {s:['Firstly, mix the flour and butter.','Finally, stir in the sugar.','After that, add the milk.','Bake for twenty minutes.'],b:1,m:'Finally says this is the last step, but more steps come after it.'},
 {s:['Owls have huge eyes.','However, they can see in the dark.','Their soft feathers make no sound.','This helps them catch mice.'],b:1,m:'However shows a contrast, but seeing in the dark follows from huge eyes. As a result would fit.'}];
VIS.reg('flagcohe',c=>{let A,pad,quiz,qi=-1,run=0;
const B0=()=>({want:()=>{},won:0,r:0,ok:0,pick:'',slot:[],drag:null,bad:'',said:''}),S=B0();
const mode=()=>['rep','syn','seq','link','brk','quiz'][A.step];
const R=()=>A.reduced(),speak=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)},rn=()=>Math.min(S.r,2),FS=()=>A.narrow?17:19;
const font=(w,n)=>`${w} ${n}px system-ui,sans-serif`;
function para(){const v=mode();return v==='rep'?REP[rn()].s:v==='syn'?SYN[rn()].s:v==='seq'?SEQ:v==='link'?LINK[rn()].s:[]}
function shown(si,wi,w){const v=mode(),r=rn();
 if(v==='rep'&&S.ok&&si===REP[r].t[0]&&wi===REP[r].t[1])return REP[r].r;
 if(v==='syn'&&S.pick&&si===SYN[r].t[0]&&wi===SYN[r].t[1])return S.pick;
 if(w==='___')return v==='seq'?S.slot[si]||w:S.pick||w;return w}
function gapW(){const g=A.ctx;g.font=font(600,FS());return Math.max(...(mode()==='seq'?CARDS:LCARDS).map(k=>g.measureText(k).width))+18}
function lay(){const g=A.ctx,fs=FS(),lh=fs*2.05,x0=14,x1=A.W-14;let x=x0,y=72;const T=[];g.font=font(500,fs);const sp=g.measureText(' ').width;
 para().forEach((s,si)=>s.split(' ').forEach((w,wi)=>{if(mode()==='seq'&&!wi&&si){x=x0;y+=lh}const t=shown(si,wi,w);g.font=font(t!==w?700:500,fs);const ww=w==='___'?gapW():g.measureText(t).width;
  const m=w==='___'?5:0;if(x+ww+m>x1&&x>x0){x=x0;y+=lh}x+=x>x0?m:0;T.push({si,wi,w,t,x,y,ww,fs});x+=ww+sp+m}));return T}
const tok=(T,p)=>T.find(o=>o.si===p[0]&&o.wi===p[1]);
function tray(){const v=mode(),g=A.ctx,fs=FS();let L=v==='seq'?CARDS.filter(k=>!S.slot.includes(k)):v==='link'?LCARDS:v==='syn'?SYN[rn()].o:[];
 g.font=font(700,fs);const out=[];let x=12,row=0;L.forEach(t=>{const w=g.measureText(t).width+26;if(x+w>A.W-12){x=12;row++}out.push({t,x,row,w,h:fs*2.3});x+=w+10});
 const n=row+1;out.forEach(o=>o.y=A.H-12-(n-o.row)*(o.h+10)+10);return out}
function arc(g,a,b,col){[a,b].forEach(o=>{g.fillStyle=col;g.fillRect(o.x,o.y+o.fs*.62,o.ww,3)});if(Math.abs(a.y-b.y)>2)return;const p={x:a.x+a.ww/2,y:a.y-a.fs*.8},q={x:b.x+b.ww/2,y:b.y-b.fs*.8},cy=Math.min(p.y,q.y)-30;g.strokeStyle=col;g.lineWidth=3;
 g.beginPath();g.moveTo(p.x,p.y);g.quadraticCurveTo((p.x+q.x)/2,cy,q.x,q.y);g.stroke();g.fillStyle=col;g.beginPath();g.moveTo(q.x,q.y+2);g.lineTo(q.x-7,q.y-9);g.lineTo(q.x+7,q.y-9);g.fill()}
function chip(g,o,col,txt){A.paint.rrect(o.x,o.y-o.h/2,o.w,o.h,10);g.fillStyle=col;g.fill();g.strokeStyle=A.col.tx;g.lineWidth=1.5;g.stroke();
 g.fillStyle=A.col.tx;g.font=font(700,FS());g.textAlign='center';g.textBaseline='middle';g.fillText(txt,o.x+o.w/2,o.y)}
function rows(){const g=A.ctx,fs=A.narrow?15:18,lh=fs*1.45,x0=48,x1=A.W-12;g.font=font(500,fs);let y=52;
 return BRK[rn()].s.map((s,i)=>{const L=[];let cur='';s.split(' ').forEach(w=>{const t=cur?cur+' '+w:w;if(g.measureText(t).width>x1-x0-16&&cur){L.push(cur);cur=w}else cur=t});L.push(cur);
  const h=L.length*lh+14,o={i,L,y,h,x0,x1,fs,lh};y+=h+12;return o})}
function draw(A){const{ctx:g,W,H,col:C}=A,v=mode();g.fillStyle=A.mix(C.pn,'#ecfeff',C.dark?.05:.5);g.fillRect(0,0,W,H);
 const head=t=>{g.font=font(800,16);g.textAlign='center';g.textBaseline='middle';g.fillStyle=C.tx;g.fillText(t,W/2,22,W-20)};
 if(v==='quiz'){head('Pronoun, synonym or adverbial?');const n=3,w=Math.min(110,(W-40)/n),y=H*.5;['pronoun','synonym','adverbial'].forEach((t,i)=>{const x=W/2+(i-1)*(w-8)-w/2;g.strokeStyle=[C.cy,C.vi,C.gr][i];g.lineWidth=7;A.paint.rrect(x,y-w*.32,w,w*.64,w*.3);g.stroke();g.fillStyle=C.tx;g.font=font(700,A.narrow?13:15);g.textAlign='center';g.textBaseline='middle';g.fillText(t,x+w/2,y+w*.55)});return}
 if(v==='brk'){const L=rows(),d=BRK[rn()];L.forEach((o,k)=>{const found=S.won>S.r&&o.i===d.b,red=S.bad==='r'+o.i||found;
   A.paint.rrect(o.x0,o.y,o.x1-o.x0,o.h,10);g.fillStyle=red?A.alpha(C.rd,.22):A.alpha(C.cy,.14);g.fill();g.strokeStyle=red?C.rd:A.alpha(C.mu,.8);g.lineWidth=red?3:1.5;g.stroke();
   g.fillStyle=C.tx;g.font=font(800,15);g.textAlign='center';g.textBaseline='middle';g.fillText(String(o.i+1),24,o.y+o.h/2);
   g.font=font(500,o.fs);g.textAlign='left';o.L.forEach((t,j)=>g.fillText(t,o.x0+8,o.y+7+o.lh*(j+.5)));
   if(k){const y0=L[k-1].y+L[k-1].h,y1=o.y,brk=found||(S.won>S.r&&L[k-1].i===d.b);g.strokeStyle=brk?C.rd:C.gr;g.lineWidth=4;g.setLineDash(brk?[4,5]:[]);
    g.beginPath();g.moveTo(24,y0-4);g.lineTo(24,y1+4);g.stroke();g.setLineDash([])}});head(S.won>=3?'Done!':'Tap the sentence that breaks the chain.');return A.fx.draw(g)}
 const T=lay();T.forEach(o=>{const bad=S.bad===o.si+':'+o.wi,isGap=o.w==='___',filled=isGap&&o.t!=='___',tgt=v==='syn'&&o.si===SYN[rn()].t[0]&&o.wi===SYN[rn()].t[1];
  if(isGap){A.paint.rrect(o.x-2,o.y-o.fs*.8,o.ww,o.fs*1.6,8);g.fillStyle=filled?A.alpha(C.gr,.28):A.alpha(C.am,.18);g.fill();g.strokeStyle=bad?C.rd:filled?C.gr:C.am;g.lineWidth=2;g.setLineDash(filled?[]:[5,4]);g.stroke();g.setLineDash([])}
  if(tgt||bad){g.fillStyle=A.alpha(bad?C.rd:C.am,.3);A.paint.rrect(o.x-3,o.y-o.fs*.85,o.ww+6,o.fs*1.7,6);g.fill()}
  g.font=font(isGap?600:o.t!==o.w?700:500,o.fs);g.textAlign=isGap?'center':'left';g.textBaseline='middle';g.fillStyle=C.tx;if(!isGap||filled)g.fillText(o.t,o.x+(isGap?o.ww/2-2:0),o.y)});
 if(v==='rep'&&S.ok){const d=REP[rn()];arc(g,tok(T,d.t),tok(T,d.a),C.gr)}
 if(v==='syn'&&S.ok){const d=SYN[rn()];arc(g,tok(T,d.t),tok(T,d.a),C.gr)}
 if(v!=='rep')tray().forEach(o=>{if(!(S.drag&&S.drag.t===o.t))chip(g,{...o,y:o.y+o.h/2},A.alpha(C.vi,.22),o.t)});
 if(S.drag){g.font=font(700,FS());const w=g.measureText(S.drag.t).width+26;chip(g,{x:S.drag.x-w/2,y:S.drag.y,w,h:FS()*2.3},A.alpha(C.vi,.45),S.drag.t)}
 head(S.won>=lastN()?'Done!':v==='rep'?'Tap the noun that repeats.':v==='syn'?'Which word names the same thing?':v==='seq'?'Put the steps in order.':'Which adverbial links them?');A.fx.draw(g)}
const lastN=()=>({rep:3,syn:3,seq:4,link:3,brk:3}[mode()]||9);
const miss=(t,k)=>{A.sound.miss();S.bad=k;speak(t);setTimeout(()=>{S.bad='';A.redraw()},R()?10:900);A.redraw()};
function win(t,keep){S.won++;A.sound.pop();speak(S.won<lastN()?t+(keep?'':' Next one.'):t);if(!keep)setTimeout(()=>{if(S.won<lastN()&&S.won>S.r){S.r++;S.ok=0;S.pick='';A.redraw();buttons()}},R()?20:700);buttons();A.redraw();S.want()}
function tapWord(si,wi){if(mode()!=='rep'||S.won>S.r||S.won>=3)return;const d=REP[rn()],w=d.s[si].split(' ')[wi].replace(/[.,]/g,'');
 if(si===d.t[0]&&wi===d.t[1]){S.ok=1;return win(`Yes! ${d.r} points back to ${w}. The reference chain holds.`)}
 if(si===d.a[0]&&wi===d.a[1])return miss(`Keep the first ${w}. The reader needs the noun first, so the pronoun has something to point back to.`,si+':'+wi);
 miss(`${w} is not repeated. Find the noun that comes up twice.`,si+':'+wi)}
function pickSyn(o){if(mode()!=='syn'||S.won>S.r||S.won>=3)return;const d=SYN[rn()],ante=d.s[d.a[0]].split(' ')[d.a[1]].replace(/[.,]/g,'');
 if(o!==d.o[0])return miss(`${o.replace('The ','the ')} is a different thing. A synonym here must name the same ${ante}.`,d.t[0]+':'+d.t[1]);
 S.pick=o;S.ok=1;win(`Yes! ${o} names the same ${ante} in a new way.`)}
function place(k,slot){if(mode()!=='seq'||S.slot.includes(k)||S.won>=4)return;if(slot==null)slot=[0,1,2,3].find(i=>!S.slot[i]);if(S.slot[slot])return;
 const ok=slot===0?k==='Firstly,':slot===3?k==='Finally,':k==='Next,'||k==='After that,';
 if(!ok){const m=k==='Finally,'?'Finally tells the reader this is the last step, so it cannot go here.':k==='Firstly,'?'Firstly only goes on the very first step.':slot===0?`${k.slice(0,-1)} means a step came before it. Start with Firstly.`:'The last step needs Finally, so the reader knows the job is done.';return miss(m,slot+':0')}
 S.slot[slot]=k;win(slot===3?'Done! Firstly, Next, After that, Finally: the reader can follow every step.':`${k.slice(0,-1)} fits step ${slot+1}.`,1)}
function pickLink(i){if(mode()!=='link'||S.won>S.r||S.won>=3)return;const d=LINK[rn()];if(i!==d.k)return miss(LMSG[d.k][i],'1:0');
 S.pick=LCARDS[i];win(['As a result shows cause and effect.','However shows a contrast.','For example gives one case of the idea.'][i])}
function pickRow(i){if(mode()!=='brk'||S.won>S.r||S.won>=3)return;const d=BRK[rn()];
 if(i!==d.b)return miss(`Sentence ${i+1} links back to the one before it. Look for a word that points nowhere or a linking word that does not fit.`,'r'+i);win(d.m)}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='quiz'||S.won>=lastN())return;
 if(v==='rep'){const d=REP[rn()];d.s.forEach((s,si)=>s.split(' ').forEach((w,wi)=>{const n=w.replace(/[.,]/g,'');if(/^[A-Z]/.test(n))B(`${n} (${si?"2nd":"1st"})`,()=>tapWord(si,wi),`Swap ${n} in sentence ${si+1}`)}))}
 if(v==='syn')SYN[rn()].o.forEach(o=>B(o,()=>pickSyn(o),`Use ${o} instead`));
 if(v==='seq')CARDS.filter(k=>!S.slot.includes(k)).forEach(k=>B(k,()=>place(k),`Put ${k} in the next gap`));
 if(v==='link')LCARDS.forEach((k,i)=>B(k,()=>pickLink(i),`Link with ${k}`));
 if(v==='brk')[0,1,2,3].forEach(i=>B(`Sentence ${i+1}`,()=>pickRow(i),`Sentence ${i+1} breaks the chain`))}
const inR=(p,o)=>p.x>o.x-4&&p.x<o.x+o.w+4&&p.y>o.y-4&&p.y<o.y+o.h+4;
function down(p){const v=mode();
 if(v==='rep'){const o=lay().find(o=>p.x>o.x-4&&p.x<o.x+o.ww+4&&Math.abs(p.y-o.y)<o.fs*1.1);if(o)tapWord(o.si,o.wi);return false}
 if(v==='brk'){const o=rows().find(o=>p.y>o.y&&p.y<o.y+o.h);if(o)pickRow(o.i);return false}
 const t=tray().find(o=>inR(p,o));if(t){S.drag={t:t.t,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
function move(p){if(S.drag){Object.assign(S.drag,{x:p.x,y:p.y});A.redraw()}}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const v=mode(),tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10,T=lay();
 const hit=T.find(o=>p.x>o.x-14&&p.x<o.x+o.ww+14&&Math.abs(p.y-o.y)<o.fs*1.4&&(v==='syn'?o.si===SYN[rn()].t[0]&&o.wi===SYN[rn()].t[1]:o.w==='___'));
 if(v==='syn'&&(tap||hit))return pickSyn(d.t);if(v==='link'&&(tap||hit))return pickLink(LCARDS.indexOf(d.t));
 if(v==='seq'&&(tap||hit))return place(d.t,tap?null:hit.si);speak('Drop the card on a gap.');A.redraw()}
const chk=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++run;list.forEach((fn,j)=>setTimeout(()=>{if(k===run)fn()},R()?j*60+40:(j+1)*(gap||300)))}
const fresh=()=>{run++;Object.assign(S,B0())};
const steps=[
{h:'Too much repeating',p:'Saying the same noun again and again sounds clunky. Once the reader knows who or what, a pronoun can point back to it. Tap the noun to swap, and keep the first one.',task:'Fix 3 repeats',
 show:()=>{steps[0].go();play(REP.map(d=>()=>tapWord(...d.t)),900)},go:()=>{fresh();speak('Tap the noun that repeats.');buttons();S.want=chk(0,()=>S.won>=3,'A pronoun points back to a noun the reader has already met.')}},
{h:'Same thing, new name',p:'A synonym is a different word for the same thing. Drag a card onto the highlighted word, or tap the card.',
 predict:{q:'The volcano erupted. Ash from the volcano… What can replace the second volcano?',opts:['the town','the mountain','the ash'],ans:1},task:'Choose 3 synonyms',
 show:()=>{steps[1].go();play(SYN.map(d=>()=>pickSyn(d.o[0])),900)},go:()=>{fresh();speak('Which word names the same thing?');buttons();S.want=chk(1,()=>S.won>=3,'Synonyms keep the chain going without repeating.')}},
{h:'Order the steps',p:'Adverbials of sequence tell the reader the order. Drag each card into a gap, or tap a card to fill the next gap.',
 predict:{q:'Which adverbial belongs on the first step?',opts:['Finally,','Next,','Firstly,'],ans:2},task:'Fill 4 gaps in order',
 show:()=>{steps[2].go();play(CARDS.map(k=>()=>place(k)),500)},go:()=>{fresh();speak('Put the steps in order.');buttons();S.want=chk(2,()=>S.won>=4,'Sequence adverbials guide the reader through each step.')}},
{h:'Show how ideas link',p:'Some adverbials show cause (As a result), contrast (However) or an example (For example). Drag the one that fits into the gap.',
 predict:{q:'Penguins are birds. ___ they cannot fly. Which fits?',opts:['As a result,','However,'],ans:1},task:'Link 3 pairs of sentences',
 show:()=>{steps[3].go();play(LINK.map(d=>()=>pickLink(d.k)),900)},go:()=>{fresh();speak('Which adverbial links them?');buttons();S.want=chk(3,()=>S.won>=3,'The adverbial tells the reader how two ideas connect.')}},
{h:'Find the break',p:'A cohesive paragraph is a chain: each sentence links back. Tap the sentence that breaks the chain.',task:'Find 3 breaks',
 show:()=>{steps[4].go();play(BRK.map(d=>()=>pickRow(d.b)),900)},go:()=>{fresh();speak('Tap the sentence that breaks the chain.');buttons();S.want=chk(4,()=>S.won>=3,'Every sentence should link back to the one before.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Tigers are big cats. Which sentence comes next?',[['They hunt alone.','ok'],['Tigers hunt alone.','rep'],['He hunts alone.','who']]],
 ['Which adverbial shows a contrast?',[['However','ok'],['As a result','cause'],['Firstly','seq']]],
 ['Mo gave Sam a book. He smiled. Who smiled?',[['We cannot tell, so use a name','ok'],['Mo','guess'],['Sam','guess']]],
 ['Which adverbial shows cause and effect?',[['As a result','ok'],['However','contrast'],['For example','ex']]],
 ['A recipe has four steps. Which word starts the last one?',[['Finally','ok'],['Firstly','first'],['However','con2']]]];
function why(t){let m='Ask what each word points back to, and how the ideas link.';
 if(t==='rep')m='Repeating Tigers sounds clunky. The reader already knows, so they can point back.';
 if(t==='who')m='He is for one male. Tigers is plural, so the pronoun is they.';
 if(t==='cause')m='As a result shows cause and effect, not a contrast.';
 if(t==='seq')m='Firstly shows order. However shows a contrast.';
 if(t==='guess')m='He could mean Mo or Sam. When a pronoun is unclear, use the name again.';
 if(t==='contrast')m='However shows a contrast. As a result shows that one thing caused another.';
 if(t==='ex')m='For example gives a case of an idea. As a result shows cause and effect.';
 if(t==='first')m='Firstly starts the first step. Finally starts the last one.';
 if(t==='con2')m='However shows a contrast, not an order. The last step starts with Finally.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);A.redraw()}
let streak=0;
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Right.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
