/* Flagship: nocturnal animals (ages 5–7; KS1: animals active at night).
   Sort day vs night animals, define nocturnal, match dark-time adaptations
   (big eyes, big ears, whiskers), reject "all animals sleep at night", then challenge.
   Distinct from wild/farm/pet (flagfarm) and day/night seasons (flagsky). */
(()=>{
VIS.reg('flagnoc',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['sort','define','adapt','myth','name','idea','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function card(g,x,y,w,h,label,on){g.fillStyle=on?A.alpha(A.col.ac,.35):A.alpha(A.col.tx,.08);g.fillRect(x,y,w,h);g.strokeStyle=A.col.tx;g.lineWidth=2;g.strokeRect(x,y,w,h);T(label,x+w/2,y+h/2,A.narrow?12:14,{max:w-8})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,k==='sort'||k==='adapt'?'#1e293b':'#e0e7ff',C.dark?.12:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){g.fillStyle=A.mix(C.pn,'#e0e7ff',C.dark?.08:.35);g.fillRect(0,0,W,H);T('Nocturnal = active at night',W/2,H*.32,A.narrow?13:16,{w:900});T('Big eyes, ears, whiskers help in the dark.',W/2,H*.52,A.narrow?11:13,{c:C.mu});A.fx.draw(g);return}
 if(k==='sort'){T('Who is awake at night?',W/2,H*.08,A.narrow?14:17,{w:800,c:'#f8fafc'});
  card(g,W*.06,H*.22,W*.4,H*.2,'Owl',S.picked==='Owl');card(g,W*.54,H*.22,W*.4,H*.2,'Robin',S.picked==='Robin');
  card(g,W*.06,H*.5,W*.4,H*.2,'Bat',S.picked==='Bat');card(g,W*.54,H*.5,W*.4,H*.2,'Butterfly',S.picked==='Butterfly');
  T(S.n?`Night animals tapped: ${S.n}/2`:'Tap two nocturnal animals',W/2,H*.88,A.narrow?12:14,{c:'#e2e8f0'})}
 if(k==='define'){g.fillStyle=A.mix(C.pn,'#e0e7ff',C.dark?.08:.35);g.fillRect(0,0,W,H);T('What does nocturnal mean?',W/2,H*.1,A.narrow?14:17,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?12:14,{max:W*.84})})}
 if(k==='adapt'){T('Match the dark-time helper',W/2,H*.08,A.narrow?13:15,{w:800,c:'#f8fafc'});
  card(g,W*.08,H*.25,W*.38,H*.22,'Big eyes',S.feat==='eyes');card(g,W*.54,H*.25,W*.38,H*.22,'Big ears',S.feat==='ears');
  card(g,W*.08,H*.55,W*.38,H*.22,'Whiskers',S.feat==='whiskers');card(g,W*.54,H*.55,W*.38,H*.22,'Bright feathers',S.feat==='feathers');
  T(S.ok?`Matched ${S.ok}/3`:'Pick features that help at night',W/2,H*.9,A.narrow?11:13,{c:'#e2e8f0'})}
 if(k==='myth'){g.fillStyle=A.mix(C.pn,'#e0e7ff',C.dark?.08:.35);g.fillRect(0,0,W,H);T('Catch the myth',W/2,H*.1,A.narrow?15:18,{w:800});
  T(S.picked==null?'Which claim is false?':'Picked '+['all animals sleep at night','some animals hunt at night'][S.picked],W/2,H*.45,A.narrow?13:15,{max:W*.9});
  T('Tap the false claim',W/2,H*.75,13,{c:C.mu})}
 if(k==='name'){g.fillStyle=A.mix(C.pn,'#e0e7ff',C.dark?.08:.35);g.fillRect(0,0,W,H);T('Name nocturnal animals',W/2,H*.08,A.narrow?14:17,{w:800});
  ['Owl','Bat','Hedgehog','Cow'].forEach((t,i)=>{const x=W*(.08+(i%2)*.46),y=H*(.28+Math.floor(i/2)*.28);card(g,x,y,W*.4,H*.2,t,(S.named||{})[t])});
  T(`${Object.keys(S.named||{}).length}/3 night animals`,W/2,H*.92,13,{c:C.mu})}
 if(k==='idea'){g.fillStyle=A.mix(C.pn,'#e0e7ff',C.dark?.08:.35);g.fillRect(0,0,W,H);T('Tap the true sentence',W/2,H*.1,A.narrow?15:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{n:0,set:{},picked:null,feat:null,ok:0,feats:{},named:{},opts:[],check:()=>{}},o||{});if(!S.set)S.set={};if(!S.feats)S.feats={};if(!S.named)S.named={}}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*280))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='sort'){['Owl','Bat','Robin','Butterfly'].forEach(t=>btn(t,()=>{toggleNight(t)},'Toggle '+t))}
 if(kind()==='define')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t));
 if(kind()==='adapt'){[['Big eyes','eyes'],['Big ears','ears'],['Whiskers','whiskers'],['Bright feathers','feathers']].forEach(([lab,k])=>btn(lab,()=>{pickFeat(k)},'Feature '+lab))}
 if(kind()==='myth'){btn('All animals sleep at night',()=>{S.picked=0;A.sound.tick();say('That myth is false');A.redraw();S.check()},'False claim');btn('Some animals hunt at night',()=>{S.picked=1;A.sound.miss();say('That one is true');A.redraw()},'True claim — not the myth')}
 if(kind()==='name'){['Owl','Bat','Hedgehog','Cow'].forEach(t=>btn(t,()=>{toggleName(t)},'Name '+t))}
 if(kind()==='idea')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function toggleNight(t){const night=t==='Owl'||t==='Bat';if(!night){A.sound.miss();say(t+' is awake in the day');S.picked=t;A.redraw();return}
 if(S.set[t]){delete S.set[t]}else{S.set[t]=1;A.sound.tick();say(t+' is nocturnal')}
 S.n=Object.keys(S.set).length;S.picked=t;A.redraw();S.check()}
function pickFeat(k){S.feat=k;if(k==='feathers'){A.sound.miss();say('Bright feathers are not a night helper');A.redraw();return}
 if(!S.feats[k]){S.feats[k]=1;S.ok=Object.keys(S.feats).length;A.sound.tick();say(k+' helps in the dark')}
 A.redraw();S.check()}
function toggleName(t){const night=t==='Owl'||t==='Bat'||t==='Hedgehog';if(!night){A.sound.miss();say('Cow is mostly day-active');delete S.named[t];A.redraw();return}
 if(S.named[t])delete S.named[t];else{S.named[t]=1;A.sound.tick();say(t)}
 A.redraw();S.check()}
function down(p){if(kind()==='chal')return false;S.drag=1;
 if(kind()==='sort'){const col=p.x<A.W/2?0:1,row=p.y<A.H*.45?0:1;toggleNight([['Owl','Robin'],['Bat','Butterfly']][row][col]);return true}
 if(kind()==='define'||kind()==='idea'){const i=Math.max(0,Math.min((S.opts||[]).length-1,Math.floor((p.y-A.H*.22)/(A.H*.18))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='adapt'){const col=p.x<A.W/2?0:1,row=p.y<A.H*.45?0:1;pickFeat([['eyes','ears'],['whiskers','feathers']][row][col]);return true}
 if(kind()==='myth'){S.picked=p.y<A.H/2?0:1;if(S.picked===0){A.sound.tick();S.check()}else A.sound.miss();A.redraw();return true}
 if(kind()==='name'){const col=p.x<A.W/2?0:1,row=p.y<A.H*.5?0:1;toggleName([['Owl','Bat'],['Hedgehog','Cow']][row][col]);return true}
 return true}
function move(){}
function up(){S.drag=0}
const steps=[
{h:'Night or day?',p:'Some animals are awake and hunting at night. Others are awake in the day. Sort who belongs to the night.',
 predict:{q:'A nocturnal animal is…',opts:['awake and active at night','only awake at noon','never alive'],ans:0},
 task:'Tap Owl and Bat (two nocturnal animals)',show:()=>auto(0,[()=>{S.set={Owl:1,Bat:1};S.n=2;A.redraw();S.check()}]),
 go:()=>{reset({set:{},n:0});say('Tap two nocturnal animals.');controls();S.check=finish(0,()=>S.set.Owl&&S.set.Bat&&S.n>=2,'Owl and bat are nocturnal — active at night.')}},
{h:'Define nocturnal',p:'Nocturnal means active at night and usually asleep in the day.',
 predict:{q:'Nocturnal means…',opts:['active at night','active only in bright sun','made of stone'],ans:0},
 task:'Tap the true definition',show:()=>auto(1,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Active at night and often asleep in the day','Awake only when the sun is brightest','Never needs food or rest'],picked:null});say('What does nocturnal mean?');controls();S.check=finish(1,()=>S.picked===0,'Nocturnal = active at night.')}},
{h:'Dark-time helpers',p:'Nocturnal animals often have big eyes, big ears or sensitive whiskers to find food in the dark.',
 predict:{q:'Big eyes help nocturnal animals…',opts:['see better in dim light','paint brighter feathers','sleep longer at noon only'],ans:0},
 task:'Pick big eyes, big ears and whiskers',show:()=>auto(2,[()=>{S.feats={eyes:1,ears:1,whiskers:1};S.ok=3;A.redraw();S.check()}]),
 go:()=>{reset({feats:{},ok:0,feat:null});say('Match the dark-time helpers.');controls();S.check=finish(2,()=>S.feats.eyes&&S.feats.ears&&S.feats.whiskers,'Eyes, ears and whiskers help animals at night.')}},
{h:'Catch the myth',p:'Not every animal sleeps at night. Some hunt while we sleep.',
 predict:{q:'"All animals sleep at night" is…',opts:['a myth — some are nocturnal','always true','why owls cannot fly'],ans:0},
 task:'Mark the false claim',show:()=>auto(3,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('Which claim is false?');controls();S.check=finish(3,()=>S.picked===0,'It is a myth that all animals sleep at night.')}},
{h:'Name three',p:'Owl, bat and hedgehog are nocturnal. A cow is mostly awake in the day.',
 predict:{q:'Which set is nocturnal?',opts:['owl, bat, hedgehog','cow, robin, butterfly','only rocks'],ans:0},
 task:'Tap Owl, Bat and Hedgehog',show:()=>auto(4,[()=>{S.named={Owl:1,Bat:1,Hedgehog:1};A.redraw();S.check()}]),
 go:()=>{reset({named:{}});say('Name three nocturnal animals.');controls();S.check=finish(4,()=>S.named.Owl&&S.named.Bat&&S.named.Hedgehog,'Owl, bat and hedgehog — three nocturnal animals.')}},
{h:'True sentence',p:'Pick the sentence that matches nocturnal animals.',
 predict:{q:'Nocturnal animals…',opts:['are active at night and often have dark-time helpers','only live under the midday sun','never use eyes or ears'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Active at night; big eyes, ears or whiskers help in the dark','Every animal sleeps when the sun goes down','Bright day colours always mean nocturnal'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Nocturnal = night-active, often with dark-time adaptations.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Nocturnal means…',[['active at night','ok'],['active only at noon','noon'],['never needs to eat','never']]],
 ['Which animal is nocturnal?',[['owl','ok'],['robin','robin'],['butterfly','butter']]],
 ['Big ears help a nocturnal animal…',[['hear prey or danger in the dark','ok'],['paint its feathers brighter','paint'],['sleep only at lunch','lunch']]],
 ['"All animals sleep at night" is…',[['a myth','ok'],['always true','true'],['why bats cannot fly','fly']]],
 ['A helpful night feature is…',[['sensitive whiskers','ok'],['needing bright midday sun','sun'],['never using hearing','nohear']]],
 ['Hedgehogs are often…',[['nocturnal','ok'],['only awake at noon','noon2'],['made of metal','metal']]],
 ['Why might an owl have big eyes?',[['to see better in dim light','ok'],['to stay awake only at lunch','lunch2'],['because night animals never hunt','nohunt']]]];
function why(t){let m='Nocturnal animals are active at night. Many have big eyes, big ears or whiskers for the dark.';
 if(t==='noon'||t==='noon2'||t==='lunch'||t==='lunch2'||t==='sun'||t==='true')m='Nocturnal means night-active — not only awake in bright midday sun. Not every animal sleeps at night.';
 if(t==='robin'||t==='butter'||t==='paint'||t==='fly'||t==='metal'||t==='never'||t==='nohear'||t==='nohunt')m='Owls, bats and hedgehogs are nocturnal. Robins and butterflies are day-active. Dark-time helpers are eyes, ears and whiskers — not bright day colours.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Nocturnal animals controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:up});controls()}});
A.start()})})();
