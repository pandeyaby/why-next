/* Flagship: wild, farm & pet animals (ages 5–7; KS1: animal care groups).
   Sort animals into wild/farm/pet, match who finds food vs who needs people,
   choose watch-not-touch for wild, reject grab-a-fox, then challenge.
   Distinct from animal homes (flaghome) and living/not living (flagalive). */
(()=>{
VIS.reg('flagfarm',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['sort','food','distance','petcare','mixup','idea','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function box(g,x,y,w,h,label,on){g.fillStyle=on?A.alpha(A.col.ac,.3):A.alpha(A.col.tx,.07);g.fillRect(x,y,w,h);g.strokeStyle=A.col.tx;g.lineWidth=2;g.strokeRect(x,y,w,h);T(label,x+w/2,y+h*.5,A.narrow?12:14)}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.08:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Wild · Farm · Pet',W/2,H*.32,A.narrow?15:18,{w:900});T('Different care. Watch wild from afar.',W/2,H*.55,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='sort'){T('Where does the '+((S.cur||'fox'))+' belong?',W/2,H*.1,A.narrow?13:15,{w:800});
  box(g,W*.05,H*.35,W*.28,H*.28,'Wild',S.bin==='wild');box(g,W*.36,H*.35,W*.28,H*.28,'Farm',S.bin==='farm');box(g,W*.67,H*.35,W*.28,H*.28,'Pet',S.bin==='pet');
  T(S.bin?('Sorted: '+S.bin):'Tap a group',W/2,H*.85,A.narrow?13:15,{c:C.mu})}
 if(k==='food'){T('Who finds their own food?',W/2,H*.1,A.narrow?14:16,{w:800});
  T('🦊 wild',W*.25,H*.4,18);T('🐕 pet',W*.75,H*.4,18);
  T(S.picked==null?'Pick who finds food in nature':'Picked '+['wild fox','house dog'][S.picked],W/2,H*.8,A.narrow?12:14,{c:C.mu})}
 if(k==='distance'){T('A fox in the garden',W/2,H*.1,A.narrow?15:18,{w:800});
  T('🦊',W/2,H*.4,40);
  T(S.picked==null?'Watch from afar or grab for a cuddle?':'Picked '+['watch from a safe distance','grab for a cuddle'][S.picked],W/2,H*.78,A.narrow?11:13,{c:C.mu,max:W*.92})}
 if(k==='petcare'){T('What do pets need?',W/2,H*.1,A.narrow?15:18,{w:800});
  T(S.picked==null?'Choose the true need':'Picked '+['people feed them daily','they never need people'][S.picked],W/2,H*.45,A.narrow?13:15,{c:C.mu,max:W*.9});
  T('Pets = companionship + care',W/2,H*.75,A.narrow?12:14,{c:C.mu})}
 if(k==='mixup'){T('Fix the mix-up',W/2,H*.1,A.narrow?15:18,{w:800});
  T('Sheep kept for wool → ?',W/2,H*.4,A.narrow?14:16);
  T(S.picked==null?'Wild, farm or pet?':'Picked '+['farm','wild','pet'][S.picked],W/2,H*.7,A.narrow?13:15,{c:C.mu})}
 if(k==='idea'){T('Tap the true sentence',W/2,H*.1,A.narrow?15:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{cur:'fox',need:'wild',bin:null,picked:null,opts:[],check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*280))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='sort'){btn('Wild',()=>{S.bin='wild';const ok=S.bin===S.need;A.sound[ok?'tick':'miss']();say(ok?'Wild — finds own food':'Not this group');A.redraw();if(ok)S.check()},'Sort to wild');btn('Farm',()=>{S.bin='farm';const ok=S.bin===S.need;A.sound[ok?'tick':'miss']();say(ok?'Farm animal':'Not this group');A.redraw();if(ok)S.check()},'Sort to farm');btn('Pet',()=>{S.bin='pet';const ok=S.bin===S.need;A.sound[ok?'tick':'miss']();say(ok?'Pet — needs people':'Not this group');A.redraw();if(ok)S.check()},'Sort to pet')}
 if(kind()==='food'){btn('Wild fox',()=>{S.picked=0;A.sound.tick();say('Wild finds its own food');A.redraw();S.check()},'Wild finds food');btn('House dog',()=>{S.picked=1;A.sound.miss();say('Pets need people to feed them');A.redraw()},'Pet needs people')}
 if(kind()==='distance'){btn('Watch from a safe distance',()=>{S.picked=0;A.sound.tick();say('Observe wild animals safely');A.redraw();S.check()},'Watch from afar');btn('Grab for a cuddle',()=>{S.picked=1;A.sound.miss();say('Do not touch wild animals');A.redraw()},'Unsafe cuddle')}
 if(kind()==='petcare'){btn('People feed them daily',()=>{S.picked=0;A.sound.tick();say('Pets need daily care');A.redraw();S.check()},'Daily care');btn('They never need people',()=>{S.picked=1;A.sound.miss();say('Pets rely on people');A.redraw()},'No care — wrong')}
 if(kind()==='mixup'){btn('Farm',()=>{S.picked=0;A.sound.tick();say('Sheep are farm animals');A.redraw();S.check()},'Farm');btn('Wild',()=>{S.picked=1;A.sound.miss();say('Farm sheep are not wild');A.redraw()},'Wild — wrong');btn('Pet',()=>{S.picked=2;A.sound.miss();say('Wool sheep are farm, not house pets');A.redraw()},'Pet — wrong')}
 if(kind()==='idea')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;S.drag=1;
 if(kind()==='sort'){S.bin=p.x<A.W/3?'wild':p.x<2*A.W/3?'farm':'pet';const ok=S.bin===S.need;A.sound[ok?'tick':'miss']();A.redraw();if(ok)S.check();return true}
 if(kind()==='food'||kind()==='distance'||kind()==='petcare'){S.picked=p.x<A.W/2?0:1;if(S.picked===0){A.sound.tick();S.check()}else A.sound.miss();A.redraw();return true}
 if(kind()==='mixup'){S.picked=p.x<A.W/3?0:p.x<2*A.W/3?1:2;if(S.picked===0){A.sound.tick();S.check()}else A.sound.miss();A.redraw();return true}
 return true}
function move(){}
function up(){S.drag=0}
const steps=[
{h:'Sort the fox',p:'Wild animals find their own food and shelter in nature. A fox belongs in the wild group.',
 predict:{q:'A wild animal…',opts:['finds its own food and shelter in nature','must live in a house as a pet','is only kept for wool'],ans:0},
 task:'Sort the fox into Wild',show:()=>auto(0,[()=>{S.bin='wild';A.redraw();S.check()}]),
 go:()=>{reset({cur:'fox',need:'wild',bin:null});say('Where does the fox belong?');controls();S.check=finish(0,()=>S.bin==='wild','Fox → wild. It finds its own food in nature.')}},
{h:'Who finds food?',p:'Wild animals find food themselves. Pets need people to feed them every day.',
 predict:{q:'Pets need…',opts:['people to feed and care for them daily','no human help ever','to hunt alone in the forest always'],ans:0},
 task:'Pick the wild fox as self-feeding',show:()=>auto(1,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('Who finds food in nature?');controls();S.check=finish(1,()=>S.picked===0,'Wild animals find food; pets rely on people.')}},
{h:'Safe distance',p:'Watch wild animals from a safe distance. Do not grab a fox for a cuddle.',
 predict:{q:'If you see a fox in the garden…',opts:['watch from a safe distance — do not grab it','pick it up for a cuddle','put it in a sheep pen as a farm animal'],ans:0},
 task:'Choose watch from a safe distance',show:()=>auto(2,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('What should you do?');controls();S.check=finish(2,()=>S.picked===0,'Observe wildlife — do not touch.')}},
{h:'Pet care',p:'Pets are kept for companionship. People must feed them and look after them daily.',
 predict:{q:'A dog that lives in a house for friendship is…',opts:['a pet','always a wild animal','only a farm sheep'],ans:0},
 task:'Pick people feed them daily',show:()=>auto(3,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('What do pets need?');controls();S.check=finish(3,()=>S.picked===0,'Pets need daily human care.')}},
{h:'Farm not wild',p:'Sheep kept for wool are farm animals — cared for by people, not living wild.',
 predict:{q:'A sheep on a farm…',opts:['is a farm animal kept for wool or food','is always a wild animal with no people','must be a house pet'],ans:0},
 task:'Sort sheep to farm',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('Sheep for wool belong where?');controls();S.check=finish(4,()=>S.picked===0,'Sheep → farm, kept for wool or food.')}},
{h:'True sentence',p:'Pick the sentence that matches wild, farm and pet care groups.',
 predict:{q:'Calling every animal a pet is…',opts:['a mistake — wild and farm groups differ','always correct','required by science'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Wild find food; farm animals are kept for products; pets need daily care','Every animal is a pet you should cuddle','Farm animals never need people'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Three care groups — wild, farm, pet — with different rules.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['A wild animal…',[['finds its own food and shelter in nature','ok'],['must live in a house as a pet','house'],['is only kept for wool','wool']]],
 ['Farm animals are kept…',[['by people for food, wool or eggs','ok'],['only for cuddles like every pet','cuddles'],['with no human care at all','nocare']]],
 ['If you see a fox in the garden…',[['watch from a safe distance — do not grab it','ok'],['pick it up for a cuddle','grab'],['put it in a sheep pen as a farm animal','pen']]],
 ['Pets need…',[['people to feed and care for them daily','ok'],['no human help ever','never'],['to hunt alone in the forest always','hunt']]],
 ['Calling every animal a pet is…',[['a mistake — wild and farm groups differ','ok'],['always correct','always'],['required by science','science']]],
 ['Why keep distance from wild animals?',[['they look after themselves and can be unsafe to touch','ok'],['they are secretly all pets','secret'],['farms forbid watching nature','forbid']]],
 ['Farm animals looking after themselves with no people…',[['mixes them up with wild animals','ok'],['is the farm definition','farmdef'],['means they are pets','meanspet']]]];
function why(t){let m='Wild animals find their own food; farm animals are kept for products; pets need daily human care.';
 if(t==='house'||t==='cuddles'||t==='grab'||t==='secret'||t==='always')m='Do not treat wild animals as pets. Watch from a safe distance — no grabbing for cuddles.';
 if(t==='wool'||t==='pen'||t==='farmdef'||t==='meanspet')m='Farm animals are kept by people for food, wool or eggs — they are not wild and not house pets.';
 if(t==='nocare'||t==='never'||t==='hunt')m='Pets need people to feed and care for them every day. Wild animals hunt or forage alone.';
 if(t==='science'||t==='forbid')m='Science sorts animals into wild, farm and pet care groups. Watching wildlife from afar is fine.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Animal group controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:up});controls()}});
A.start()})})();
