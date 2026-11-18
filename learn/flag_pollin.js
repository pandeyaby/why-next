/* Flagship: Pollination & Seed Dispersal (ages 7–8; NC Y3 Plants — explore the part that flowers play in the
   life cycle of flowering plants, including pollination, seed formation and seed dispersal; NGSS 2-LS2-2).
   Move pollen anther→stigma, form a seed, choose dispersal (wind/animal/water/burst), catch “flowers only pretty”
   and “seeds need not move” myths. Distinct from flagseed (germination / growing from a seed), flagplant
   (plant parts), flagsprout (seedling growth), flagcycle (general life-cycle diagrams). */
(()=>{
VIS.reg('flagpollin',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['pollen','stigma','seed','disperse','myth','order','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function flower(g,W,H,pollenOn,onStigma){const C=A.col,cx=W/2,cy=H*.48;
 // petals
 for(let i=0;i<6;i++){const a=-Math.PI/2+i*Math.PI/3;g.beginPath();g.ellipse(cx+Math.cos(a)*W*.16,cy+Math.sin(a)*H*.12,W*.08,H*.07,a,0,7);g.fillStyle=A.alpha(C.am,.45);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke()}
 // stigma (top)
 g.beginPath();g.arc(cx,cy-H*.06,10,0,7);g.fillStyle=onStigma?A.alpha(C.ac,.9):A.alpha(C.tx,.15);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();T('stigma',cx,cy-H*.16,11,{c:C.mu});
 // anthers (sides)
 [[-1,'anther'],[1,'anther']].forEach(([s,lab],i)=>{const ax=cx+s*W*.22,ay=cy+H*.02;g.beginPath();g.ellipse(ax,ay,12,8,0,0,7);
  g.fillStyle=pollenOn?A.alpha(C.or||C.am,.85):A.alpha(C.tx,.2);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();T(lab,ax,ay+H*.08,11,{c:C.mu});
  if(pollenOn&&!onStigma){g.fillStyle=C.ac;for(let k=0;k<5;k++){g.beginPath();g.arc(ax+(k-2)*4,ay-10-k,2.5,0,7);g.fill()}}});
 if(onStigma){g.fillStyle=C.ac;for(let k=0;k<6;k++){g.beginPath();g.arc(cx+(k-2.5)*3,cy-H*.06-8,2.5,0,7);g.fill()}}
 T('flower',cx,H*.88,12,{c:C.mu})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.1:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Pollination & dispersal',W/2,H*.3,A.narrow?14:17,{w:900});T('Pollen → stigma → seed → move away',W/2,H*.52,A.narrow?11:13,{c:C.mu});A.fx.draw(g);return}
 if(k==='pollen'||k==='stigma'){T(S.title||'Move the pollen',W/2,H*.08,A.narrow?13:15,{w:800});flower(g,W,H*.9,!!S.pollen,!!S.onStigma);T(S.msg||'',W/2,H*.94,12,{c:C.mu,max:W*.92})}
 if(k==='seed'){T(S.title||'Seed forms',W/2,H*.1,A.narrow?13:15,{w:800});
  g.beginPath();g.ellipse(W/2,H*.45,W*.12,H*.1,0,0,7);g.fillStyle=S.formed?A.alpha(C.ac,.7):A.alpha(C.tx,.1);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
  T(S.formed?'seed':'ovary after pollination',W/2,H*.45,13,{w:800});T(S.msg||'After pollen reaches the stigma, a seed can form.',W/2,H*.75,12,{c:C.mu,max:W*.92})}
 if(k==='disperse'){T(S.title||'How does the seed move?',W/2,H*.08,A.narrow?13:15,{w:800});
  const modes=['wind','animal','water','burst'];(modes).forEach((m,i)=>{const x=W*(.08+i*.23);g.fillStyle=S.mode===m?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(x,H*.32,W*.2,H*.3);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x,H*.32,W*.2,H*.3);T(m,x+W*.1,H*.47,13,{w:800})});
  T(S.msg||'Pick a dispersal mode.',W/2,H*.82,12,{c:C.mu})}
 if(k==='myth'||k==='order'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(String(t),W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{pollen:0,onStigma:0,formed:0,mode:null,picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='pollen'){btn('Dust pollen on anther',()=>{S.pollen=1;S.msg='Pollen ready on the anther.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Show pollen on anther');
  btn('Reset',()=>{S.pollen=0;S.msg='Dust the anther.';A.redraw()},'Reset pollen')}
 if(kind()==='stigma'){btn('Move pollen to stigma',()=>{S.pollen=1;S.onStigma=1;S.msg='Pollination: pollen on the stigma.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Carry pollen to stigma');
  btn('Reset',()=>{S.onStigma=0;S.pollen=1;A.redraw()},'Reset stigma')}
 if(kind()==='seed'){btn('Form seed',()=>{S.formed=1;S.msg='Seed forms after pollination.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Show seed formation');
  btn('Reset',()=>{S.formed=0;A.redraw()},'Reset seed')}
 if(kind()==='disperse'){['wind','animal','water','burst'].forEach(m=>btn(m,()=>{S.mode=m;S.msg='Dispersal by '+m+'.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Choose '+m+' dispersal'))}
 if(kind()==='myth'||kind()==='order')(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say(String(t));A.redraw();S.check()},'Pick '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='pollen'){S.pollen=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='stigma'){S.pollen=1;S.onStigma=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='seed'){S.formed=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='disperse'){const i=Math.max(0,Math.min(3,Math.floor((p.x-A.W*.08)/(A.W*.23))));S.mode=['wind','animal','water','burst'][i];A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='myth'||kind()==='order'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Pollen on the anther',p:'Flowers make pollen on the anthers. Pollination starts with pollen ready to travel — insects, wind or touch can carry it.',
 predict:{q:'Where is pollen made?',opts:['on the anthers','only in the roots','only in the leaves'],ans:0},
 task:'Dust pollen on the anther',show:()=>auto(0,[()=>{S.pollen=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Pollen ready',pollen:0,msg:'Dust the anther with pollen.'});say('Show pollen on the anther.');controls();S.check=finish(0,()=>!!S.pollen,'Pollen is made on the anthers.')}},
{h:'Pollen to the stigma',p:'Pollination means pollen moves from an anther to a stigma (often of another flower). That is the key flower job in the life cycle.',
 predict:{q:'Pollination is…',opts:['pollen landing on a stigma','a seed sprouting in soil','a petal changing colour only'],ans:0},
 task:'Move pollen onto the stigma',show:()=>auto(1,[()=>{S.pollen=1;S.onStigma=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Pollinate',pollen:1,onStigma:0,msg:'Carry pollen to the stigma.'});say('Move pollen to the stigma.');controls();S.check=finish(1,()=>!!S.onStigma,'Pollination: pollen reaches the stigma.')}},
{h:'Seed formation',p:'After pollination, the flower can form a seed. No pollination → no new seed. Germination (growing) comes later — that is a different step.',
 predict:{q:'After pollen hits the stigma…',opts:['a seed can form','the plant always dies','petals become roots'],ans:0},
 task:'Form the seed',show:()=>auto(2,[()=>{S.formed=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Seed forms',formed:0,msg:'Tap to form a seed.'});say('Form a seed after pollination.');controls();S.check=finish(2,()=>!!S.formed,'Pollination leads to seed formation.')}},
{h:'Seed dispersal',p:'Seeds need to move away from the parent so new plants have space. Wind, animals, water and bursting pods are dispersal modes.',
 predict:{q:'Why disperse seeds?',opts:['so new plants have space away from the parent','so flowers look pretty','so roots grow upward'],ans:0},
 task:'Pick a dispersal mode',show:()=>auto(3,[()=>{S.mode='wind';A.redraw();S.check()}]),
 go:()=>{reset({title:'Disperse the seed',mode:null,msg:'Choose how the seed travels.'});say('Pick wind, animal, water or burst.');controls();S.check=finish(3,()=>!!S.mode,'Seeds disperse by wind, animals, water or burst.')}},
{h:'Catch a mix-up',p:'Slips: thinking flowers are only for looking pretty; thinking seeds can stay piled on the parent; mixing pollination with germination.',
 predict:{q:'Which is the mix-up?',opts:['Flowers are only for looking pretty','Flowers enable pollination and seeds','Seeds often need to travel away'],ans:0},
 task:'Tap the mix-up',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['Flowers are only for looking pretty','Flowers enable pollination and seeds','Seeds often need to travel away'],picked:null});say('Find the mix-up.');controls();S.check=finish(4,()=>S.picked===0,'Flowers do life-cycle work — not only decoration.')}},
{h:'Order the story',p:'Order: pollen made → pollination (to stigma) → seed forms → seed disperses → later a new plant may grow.',
 predict:{q:'Correct order starts with…',opts:['pollen → stigma → seed → disperse','disperse → then make pollen','seed grows before pollination'],ans:0},
 task:'Tap the correct order',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Life-cycle order',opts:['pollen → stigma → seed → disperse','disperse → then make pollen','seed grows before pollination'],picked:null});say('Pick the order.');controls();S.check=finish(5,()=>S.picked===0,'Pollen, pollination, seed, then dispersal.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Pollen is made…',[['on the anthers','ok'],['only in roots','root'],['only in leaves','leaf']]],
 ['Pollination means…',[['pollen on a stigma','ok'],['a seed sprouting','germ'],['petals falling only','pretty']]],
 ['After pollination…',[['a seed can form','ok'],['the plant always dies','die'],['roots become flowers','root']]],
 ['Seeds disperse so…',[['new plants have space','ok'],['flowers look pretty','pretty'],['leaves get salty','leaf']]],
 ['Which is the mix-up?',[['flowers are only decoration','ok'],['pollen must reach a stigma','true'],['seeds often travel away','true']]],
 ['Wind dispersal example…',[['light seeds blow away','ok'],['seeds stay on the parent forever','stay'],['pollen never moves','stay']]],
 ['Order starts with…',[['pollen then stigma','ok'],['disperse then pollen','order'],['grow then pollinate','germ']]]];
function why(t){let m='Pollen → stigma (pollination) → seed forms → seed disperses.';
 if(t==='root')m='Roots anchor and take water — they do not make pollen.';
 if(t==='leaf')m='Leaves make food with light. Pollen is made on anthers in the flower.';
 if(t==='germ')m='Germination is a seed starting to grow later — not the same as pollination.';
 if(t==='pretty')m='Flowers can look bright to attract pollinators, but their life-cycle job is pollination and seeds.';
 if(t==='die')m='Pollination leads to seeds, not automatic death of the whole plant.';
 if(t==='stay')m='Many seeds need to move away so seedlings are not crowded on the parent.';
 if(t==='true')m='That statement is true — not the mix-up.';
 if(t==='order')m='Make pollen and pollinate before a seed exists to disperse.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Pollination controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
