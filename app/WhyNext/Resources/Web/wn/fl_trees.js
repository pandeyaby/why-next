/* Flagship: common plants & trees (ages 5–6; Y1 Science: name wild/garden plants; deciduous vs evergreen).
   Match names, sort deciduous/evergreen, wild vs garden, reject "all trees lose leaves" myths, then challenge. */
(()=>{
VIS.reg('flagtrees',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['name','decid','wild','match','idea','keep','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#ecfdf5',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Name plants and trees',W/2,H*.32,A.narrow?14:17,{w:900});T('Deciduous lose leaves. Evergreen keep them.',W/2,H*.52,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='name'){T('What plant is this?',W/2,H*.08,A.narrow?15:18,{w:800});
  T(S.pic||'🌼',W/2,H*.32,48);T(S.clue||'',W/2,H*.48,A.narrow?13:15,{c:C.mu});
  (S.opts||[]).forEach((t,i)=>{const x=W*.2+i*W*.3,y=H*.72;g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(x-W*.12,y-H*.1,W*.24,H*.2);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-W*.12,y-H*.1,W*.24,H*.2);T(t,x,y,A.narrow?13:15)})}
 if(k==='decid'){T('Loses leaves or keeps them?',W/2,H*.08,A.narrow?14:16,{w:800});
  const items=S.items||[],i=S.idx||0;if(i<items.length){T(items[i][0],W/2,H*.35,40);T(items[i][1],W/2,H*.55,A.narrow?13:15)}else T('All sorted!',W/2,H*.45,20,{c:C.gr});
  T(`Tree ${Math.min(i+1,items.length)} of ${items.length}`,W/2,H*.9,12,{c:C.mu})}
 if(k==='wild'){T('Wild plant or garden plant?',W/2,H*.08,A.narrow?14:16,{w:800});
  const items=S.items||[],i=S.idx||0;if(i<items.length){T(items[i][0],W/2,H*.35,40);T(items[i][1],W/2,H*.55,A.narrow?13:15)}else T('All sorted!',W/2,H*.45,20,{c:C.gr});
  T(`Plant ${Math.min(i+1,items.length)} of ${items.length}`,W/2,H*.9,12,{c:C.mu})}
 if(k==='match'){T('Match the clue to the name',W/2,H*.08,A.narrow?14:16,{w:800});
  T(S.clue||'',W/2,H*.32,A.narrow?14:16,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.48+i*.14);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.08,y-H*.06,W*.84,H*.12);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.08,y-H*.06,W*.84,H*.12);T(t,W/2,y,A.narrow?13:15)})}
 if(k==='idea'){T('Tap the true sentence',W/2,H*.1,A.narrow?15:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?12:14,{max:W*.84})})}
 if(k==='keep'){T('Which tree keeps leaves in winter?',W/2,H*.08,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const x=W*.22+i*W*.28,y=H*.55;g.fillStyle=S.picked===i?A.alpha(C.gr,.4):A.alpha(C.tx,.08);g.fillRect(x-W*.12,y-H*.18,W*.24,H*.36);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-W*.12,y-H*.18,W*.24,H*.36);T(t,x,y,A.narrow?12:14)});
  T(S.picked==null?'Tap one tree':'Picked '+S.opts[S.picked],W/2,H*.9,13,{c:C.mu})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{pic:'',clue:'',opts:[],picked:null,items:[],idx:0,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*280))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function pickName(i){S.picked=i;A.sound.tick();say(S.opts[i]);A.redraw();S.check()}
function sortDecid(yes){if(S.idx>=S.items.length)return;const want=S.items[S.idx][2];
 if(yes!==want){A.sound.miss();say(want?'That tree loses its leaves in autumn.':'That tree keeps its leaves — evergreen.');return}
 S.idx++;A.sound.tick();say(S.idx>=S.items.length?'All sorted.':'Yes. Next.');A.redraw();S.check()}
function sortWild(yes){if(S.idx>=S.items.length)return;const want=S.items[S.idx][2];
 if(yes!==want){A.sound.miss();say(want?'Often grows wild in fields or hedges.':'Often grown in gardens on purpose.');return}
 S.idx++;A.sound.tick();say(S.idx>=S.items.length?'All sorted.':'Yes. Next.');A.redraw();S.check()}
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='name'||kind()==='match'||kind()==='idea'||kind()==='keep')(S.opts||[]).forEach((t,i)=>btn(t,()=>pickName(i),'Pick '+t));
 if(kind()==='decid'&&S.idx<S.items.length){btn('Loses leaves',()=>sortDecid(1),'Deciduous — loses leaves');btn('Keeps leaves',()=>sortDecid(0),'Evergreen — keeps leaves')}
 if(kind()==='wild'&&S.idx<S.items.length){btn('Wild',()=>sortWild(1),'Wild plant');btn('Garden',()=>sortWild(0),'Garden plant')}}
function down(p){if(kind()==='chal')return false;S.drag=1;
 if(kind()==='decid'){sortDecid(p.x<A.W/2?1:0);return true}
 if(kind()==='wild'){sortWild(p.x<A.W/2?1:0);return true}
 if(kind()==='name'||kind()==='keep'){const n=(S.opts||[]).length||1;pickName(Math.min(n-1,Math.max(0,Math.floor(p.x/A.W*n))));return true}
 if(kind()==='match'||kind()==='idea'){const n=(S.opts||[]).length||1;pickName(Math.min(n-1,Math.max(0,Math.floor((p.y-A.H*.25)/(A.H*.55)*n))));return true}
 return true}
function move(){}
function up(){S.drag=0}
const steps=[
{h:'Name the plant',p:'Common plants have names. A daisy is a small white flower with a yellow middle. Grass grows in short green blades.',
 predict:{q:'A daisy is…',opts:['a common flowering plant','a kind of rock','always a tall oak tree'],ans:0},
 task:'Pick daisy for the flower clue',show:()=>auto(0,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({pic:'🌼',clue:'Small white petals, yellow middle',opts:['daisy','oak tree','holly'],picked:null});say('Name this plant.');controls();S.check=finish(0,()=>S.picked===0,'That flower is a daisy — a common plant.')}},
{h:'Deciduous or evergreen',p:'Deciduous trees lose their leaves in autumn. Evergreen trees keep green leaves all year.',
 predict:{q:'An oak tree in winter…',opts:['has lost its leaves','keeps every leaf like holly','turns into grass'],ans:0},
 task:'Sort 4 trees as lose or keep leaves',show:()=>auto(1,[()=>sortDecid(1),()=>sortDecid(0),()=>sortDecid(1),()=>sortDecid(0)]),
 go:()=>{reset({items:[['🌳','Oak in winter',1],['🌲','Holly all year',0],['🍂','Beech after autumn',1],['🎄','Fir keeps needles',0]],idx:0});say('Lose leaves or keep them?');controls();S.check=finish(1,()=>S.idx>=4,'Deciduous lose leaves; evergreen keep them.')}},
{h:'Wild or garden',p:'Some plants grow wild in parks and hedges. Others are grown in gardens on purpose — like rose bushes.',
 predict:{q:'A rose bush in a flower bed is…',opts:['often a garden plant','always a wild oak','not a plant'],ans:0},
 task:'Sort 4 plants as wild or garden',show:()=>auto(2,[()=>sortWild(1),()=>sortWild(0),()=>sortWild(1),()=>sortWild(0)]),
 go:()=>{reset({items:[['🌾','Dandelion in a field',1],['🌹','Rose in a bed',0],['🌿','Nettle by a path',1],['🌷','Tulip in a garden',0]],idx:0});say('Wild or garden?');controls();S.check=finish(2,()=>S.idx>=4,'Wild plants grow free; garden plants are planted.')}},
{h:'Match the clue',p:'Use a clue to name the plant. Broad leaves that fall = deciduous oak. Sharp green leaves all year = holly.',
 predict:{q:'Sharp leaves all year points to…',opts:['holly (evergreen)','oak that lost leaves','a daisy petal'],ans:0},
 task:'Pick holly for the evergreen clue',show:()=>auto(3,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({clue:'Sharp green leaves that stay in winter',opts:['holly','oak','daisy'],picked:null});say('Match the clue.');controls();S.check=finish(3,()=>S.picked===0,'Holly is evergreen — it keeps its leaves.')}},
{h:'True sentence',p:'Pick the sentence that matches what we learned about plants and trees.',
 predict:{q:'Which is true?',opts:['some trees keep leaves all year','every tree loses every leaf','grass is not a plant'],ans:0},
 task:'Tap the true sentence',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Some trees are evergreen and keep leaves','Every tree loses all leaves always','Grass is never a plant'],picked:null});say('Tap the true sentence.');controls();S.check=finish(4,()=>S.picked===0,'Evergreens keep leaves; deciduous lose them; grass is a plant.')}},
{h:'Keeps leaves',p:'Find the evergreen. Holly and many firs keep leaves. Oak and beech lose theirs.',
 predict:{q:'Which keeps leaves in winter?',opts:['holly','oak','beech after leaf-fall'],ans:0},
 task:'Pick the evergreen tree',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['holly','oak','bare beech'],picked:null});say('Which keeps leaves?');controls();S.check=finish(5,()=>S.picked===0,'Holly keeps its leaves — evergreen.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['A daisy is…',[['a common flowering plant','ok'],['a kind of metal','metal'],['always an oak tree','oak']]],
 ['Deciduous trees…',[['lose leaves in autumn','ok'],['keep every leaf like holly','keep'],['are never plants','never']]],
 ['Evergreen trees…',[['keep green leaves all year','ok'],['always lose every leaf','lose'],['are only daisies','daisy']]],
 ['A rose in a flower bed is…',[['often a garden plant','ok'],['always a wild oak','wildoak'],['not a living plant','dead']]],
 ['Holly in winter…',[['keeps its sharp green leaves','ok'],['becomes a daisy','becomedaisy'],['is the same as bare oak','bareoak']]],
 ['Grass is…',[['a common plant','ok'],['never a plant','noplant'],['always a tall tree','talltree']]],
 ['Why sort oak vs holly?',[['oak loses leaves; holly keeps them','ok'],['both are rocks','rocks'],['neither is a plant','neither']]]];
function why(t){let m='Name plants; deciduous lose leaves; evergreen keep them.';
 if(t==='metal'||t==='oak'||t==='daisy'||t==='becomedaisy')m='A daisy is a flowering plant. Oak and holly are trees — different names.';
 if(t==='keep'||t==='lose'||t==='bareoak')m='Deciduous (oak, beech) lose leaves. Evergreen (holly, fir) keep leaves.';
 if(t==='never'||t==='dead'||t==='noplant'||t==='neither'||t==='rocks')m='Plants are living. Grass, daisies, roses, oaks and holly are plants.';
 if(t==='wildoak'||t==='talltree')m='Garden plants are grown on purpose. Grass is a plant, not a tall tree.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Plants and trees controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:up});controls()}});
A.start()})})();
