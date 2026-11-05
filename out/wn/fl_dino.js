/* Flagship: dinosaurs were real (ages 5–7; KS1 animals long ago; fossils as evidence of past life).
   Place dinosaurs before people on a timeline, dig fossil clues, sort evidence vs toys, match finds to
   body parts, then a challenge that traps toy=real, dragon=dinosaur, and people-with-dinos myths. */
(()=>{
VIS.reg('flagdino',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['time','dig','sort','match','size','mix','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.08:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Dinosaurs were real animals',W/2,H*.32,A.narrow?15:18,{w:900});T('Fossils are the evidence',W/2,H*.52,A.narrow?13:16,{c:C.mu});A.fx.draw(g);return}
 if(k==='time'){T('Who lived first?',W/2,H*.08,A.narrow?15:18,{w:800});
  g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(W*.1,H*.55);g.lineTo(W*.9,H*.55);g.stroke();
  T('Long ago',W*.2,H*.62,12,{c:C.mu});T('Later',W*.8,H*.62,12,{c:C.mu});
  const slots=[{x:W*.25,lab:'Dinosaurs'},{x:W*.75,lab:'People'}];
  slots.forEach((s,i)=>{g.fillStyle=S.placed&&S.placed[i]?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(s.x-W*.12,H*.35,W*.24,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(s.x-W*.12,H*.35,W*.24,H*.16);T(S.placed&&S.placed[i]?S.placed[i]:'？',s.x,H*.43,A.narrow?14:16)});
  T(S.pick?('Holding: '+S.pick):'Tap Dinosaurs, put them on Long ago',W/2,H*.88,A.narrow?12:14,{c:C.mu})}
 if(k==='dig'){T('Dig for fossil clues',W/2,H*.08,A.narrow?15:18,{w:800});
  g.fillStyle=A.alpha(C.or,.4);g.fillRect(0,H*.55,W,H*.45);
  (S.finds||[]).forEach((f,i)=>{const x=W*(.2+i*.2),y=H*.7;if(S.dug>i){T(f,x,y,28);g.strokeStyle=C.gr;g.lineWidth=2;g.strokeRect(x-24,y-24,48,48)}else{g.fillStyle=A.alpha(C.tx,.2);g.fillRect(x-24,y-16,48,32);T('?',x,y,18,{c:C.mu})}});
  T(`Found ${S.dug} of ${(S.finds||[]).length}`,W/2,H*.2,A.narrow?13:15,{c:C.mu})}
 if(k==='sort'){T('Fossil evidence or not?',W/2,H*.08,A.narrow?14:17,{w:800});
  const items=S.sortItems||[],i=S.sortIdx||0;
  if(i<items.length){T(items[i][0],W/2,H*.4,40);T(items[i][1],W/2,H*.58,A.narrow?14:17)}
  else T('All sorted!',W/2,H*.45,20,{c:C.gr});
  T(`Item ${Math.min(i+1,items.length)} of ${items.length}`,W/2,H*.9,12,{c:C.mu})}
 if(k==='match'){T('Match the fossil find',W/2,H*.08,A.narrow?15:18,{w:800});
  T(S.clue||'',W/2,H*.28,A.narrow?16:20,{w:800});
  (S.opts||[]).forEach((t,i)=>{const x=W*.2+i*W*.3,y=H*.58;g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(x-W*.12,y-H*.1,W*.24,H*.2);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-W*.12,y-H*.1,W*.24,H*.2);T(t,x,y,A.narrow?14:17)})}
 if(k==='size'){T('Not all dinosaurs were huge',W/2,H*.1,A.narrow?14:17,{w:800});
  T(S.big?'Some were bus-sized':'Tap to show a huge dinosaur',W/2,H*.35,A.narrow?13:15,{c:C.mu});
  if(S.big){g.fillStyle=A.alpha(C.vi,.35);g.fillRect(W*.15,H*.45,W*.7,H*.25);T('Huge plant-eater',W/2,H*.57,16)}
  T(S.small?'Some were chicken-sized':'Also show a small dinosaur',W/2,H*.82,A.narrow?13:15,{c:C.mu});
  if(S.small){g.fillStyle=A.alpha(C.or,.4);g.fillRect(W*.4,H*.72,W*.2,H*.1);T('Small',W/2,H*.77,12)}}
 if(k==='mix'){T('Tap the true sentence',W/2,H*.1,A.narrow?15:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?12:15,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{placed:[null,null],pick:null,finds:[],dug:0,sortItems:[],sortIdx:0,clue:'',opts:[],picked:null,big:0,small:0,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*300))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function place(slot){if(!S.pick){A.sound.miss();say('Pick Dinosaurs or People first.');return}
 const need=slot===0?'Dinosaurs':'People';if(S.pick!==need){A.sound.miss();say(need+' belong on this side of the timeline.');return}
 S.placed[slot]=S.pick;S.pick=null;A.sound.pop();say(need+' placed.');A.redraw();S.check()}
function dig(){if(S.dug>=(S.finds||[]).length)return;S.dug++;A.sound.tick();say('Found '+S.finds[S.dug-1]+' fossil clue.');A.redraw();S.check()}
function sortPick(yes){if(S.sortIdx>=S.sortItems.length)return;const want=S.sortItems[S.sortIdx][2];
 if(yes!==want){A.sound.miss();say(want?'That IS fossil evidence from a living thing in rock.':'Not fossil evidence — toys and cartoons are not fossils.');return}
 S.sortIdx++;A.sound.tick();say(S.sortIdx>=S.sortItems.length?'All sorted.':'Yes. Next.');A.redraw();S.check()}
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='time'){btn('Dinosaurs',()=>{S.pick='Dinosaurs';say('Holding Dinosaurs. Put them on Long ago.');A.redraw()},'Pick Dinosaurs');
  btn('People',()=>{S.pick='People';say('Holding People. Put them on Later.');A.redraw()},'Pick People');
  btn('Put on Long ago',()=>place(0),'Place on Long ago side');btn('Put on Later',()=>place(1),'Place on Later side')}
 if(kind()==='dig')btn('Dig next clue',dig,'Dig for the next fossil clue');
 if(kind()==='sort'&&S.sortIdx<S.sortItems.length){btn('Fossil evidence',()=>sortPick(1),'This is fossil evidence');btn('Not evidence',()=>sortPick(0),'This is not fossil evidence')}
 if(kind()==='match')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say('You picked '+t);A.redraw();S.check()},'Pick '+t));
 if(kind()==='size'){btn('Show huge dinosaur',()=>{S.big=1;A.sound.tick();say('Some dinosaurs were huge plant-eaters.');A.redraw();S.check()},'Show a huge dinosaur');
  btn('Show small dinosaur',()=>{S.small=1;A.sound.tick();say('Some dinosaurs were as small as a chicken.');A.redraw();S.check()},'Show a small dinosaur')}
 if(kind()==='mix')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say('You picked '+t);A.redraw();S.check()},'Pick sentence'))}
function down(p){if(kind()==='chal')return false;S.drag=1;
 if(kind()==='dig'){dig();return true}if(kind()==='sort'){sortPick(p.x<A.W/2?1:0);return true}
 if(kind()==='time'){if(p.y<A.H*.5){S.pick=p.x<A.W/2?'Dinosaurs':'People';A.redraw()}else place(p.x<A.W/2?0:1);return true}
 return true}
function move(){}
function up(){S.drag=0}
const steps=[
{h:'Deep time',p:'Dinosaurs lived millions of years ago — long before people. Put dinosaurs first on the timeline.',
 predict:{q:'Who lived first on Earth?',opts:['dinosaurs','people','toy makers'],ans:0},
 task:'Place dinosaurs on Long ago and people on Later',show:()=>auto(0,[()=>{S.placed=['Dinosaurs','People'];A.redraw();S.check()}]),
 go:()=>{reset({placed:[null,null]});say('Place dinosaurs long ago, people later.');controls();S.check=finish(0,()=>S.placed[0]==='Dinosaurs'&&S.placed[1]==='People','Dinosaurs first. People much later.')}},
{h:'Dig clues',p:'Fossils are clues in rock: bones, teeth, footprints, eggs. Dig them up carefully.',
 predict:{q:'A fossil clue can be…',opts:['a bone in rock','a plastic toy','a cartoon'],ans:0},
 task:'Dig up all 4 fossil clues',show:()=>auto(1,[dig,dig,dig,dig]),
 go:()=>{reset({finds:['🦴','🦷','👣','🥚'],dug:0});say('Dig for fossil clues.');controls();S.check=finish(1,()=>S.dug>=4,'Bones, teeth, footprints and eggs can be fossils.')}},
{h:'Evidence or not?',p:'Fossil evidence comes from living things in rock. Toys and cartoons are not fossils.',
 predict:{q:'Which is fossil evidence?',opts:['tooth in rock','plastic dinosaur','dragon cartoon'],ans:0},
 task:'Sort 4 items as evidence or not',show:()=>auto(2,[()=>sortPick(1),()=>sortPick(0),()=>sortPick(1),()=>sortPick(0)]),
 go:()=>{reset({sortItems:[['🦴','Bone in rock',1],['🧸','Soft toy',0],['👣','Footprint in rock',1],['📺','Cartoon dragon',0]],sortIdx:0});say('Sort each item.');controls();S.check=finish(2,()=>S.sortIdx>=4,'Only rock finds from living things count as fossil evidence.')}},
{h:'Match the find',p:'A long neck bone fossil matches a long-neck plant-eater. Match the clue to the idea.',
 predict:{q:'A sharp tooth fossil often means…',opts:['a meat-eater','a soft pillow','a metal coin'],ans:0},
 task:'Match sharp tooth to meat-eater',show:()=>auto(3,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({clue:'Sharp tooth fossil',opts:['meat-eater','soft toy','cartoon'],picked:null});say('What does this fossil suggest?');controls();S.check=finish(3,()=>S.picked===0,'Sharp teeth often belong to meat-eaters. Toys are not fossils.')}},
{h:'Big and small',p:'Some dinosaurs were huge. Some were small — about chicken size. Not all were giants.',
 predict:{q:'Were all dinosaurs huge?',opts:['no — some were small','yes — every one was bus-sized','only toys were small'],ans:0},
 task:'Show both a huge and a small dinosaur',show:()=>auto(4,[()=>{S.big=1;S.small=1;A.redraw();S.check()}]),
 go:()=>{reset({big:0,small:0});say('Show huge and small dinosaurs.');controls();S.check=finish(4,()=>S.big&&S.small,'Dinosaurs came in many sizes. Fossils show both.')}},
{h:'True sentence',p:'Pick the sentence that matches the evidence.',
 predict:{q:'Which is true?',opts:['fossils prove dinosaurs were real','dinosaurs are only cartoons','people rode dragons to school'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Fossils prove dinosaurs were real','Dinosaurs are only plastic toys','People and dinosaurs lived together'],picked:null});say('Tap the true sentence.');controls();S.check=finish(5,()=>S.picked===0,'Fossils are the evidence. Toys are models; people came much later.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Dinosaurs were…',[['real animals long ago','ok'],['only plastic toys','toy'],['the same as dragons','drag']]],
 ['We know from…',[['fossils in rock','ok'],['toy shops','shop'],['cartoons alone','toon']]],
 ['People and dinosaurs…',[['did not live at the same time','ok'],['went to school together','school'],['built robots together','bot']]],
 ['A footprint in rock…',[['can be a fossil clue','ok'],['is always paint','paint'],['is a metal coin','coin']]],
 ['A cartoon dragon is…',[['make-believe','ok'],['a fossil dinosaur','foss'],['proof of flying buses','bus']]],
 ['Not all dinosaurs were…',[['huge — some were small','ok'],['real','real'],['found as fossils ever','never']]],
 ['Dig carefully so…',[['you do not break the fossil shape','ok'],['the rock tastes nice','taste'],['fossils melt in air','melt']]]];
function why(t){let m='Use fossil evidence, not toys or myths.';
 if(t==='toy'||t==='shop')m='Plastic toys are models made in factories. They are not fossils.';
 if(t==='drag'||t==='toon'||t==='foss')m='Dragons and cartoons are stories. Dinosaurs are real animals known from fossils.';
 if(t==='school'||t==='bot')m='People lived millions of years after dinosaurs. They did not live together.';
 if(t==='paint'||t==='coin')m='A footprint fossil is a shape left in rock by a living thing — not paint or metal.';
 if(t==='bus')m='Stories about flying dragons are make-believe, not fossil evidence.';
 if(t==='real')m='Dinosaurs were real. The trap was size: some were small, not that they were fake.';
 if(t==='never')m='Many dinosaur fossils have been found. The point is sizes varied.';
 if(t==='taste'||t==='melt')m='We dig carefully to protect the fossil shape in the rock.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Dinosaur controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:up});controls()}});
A.start()})})();
