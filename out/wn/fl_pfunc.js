/* Flagship: How Plant Parts Work (ages 7–8; NC Y3 Plants).
   Jobs of flowering-plant parts: roots absorb water+minerals, stem transports, leaves make food (photosynthesis),
   flowers enable reproduction. Predict wilt/no-food/no-seeds when a part fails. Distinct from flagplant (name/build
   parts for ages 5–6) and flagsprout (water/light needs). */
(()=>{
VIS.reg('flagpfunc',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['roots','stem','leaves','flower','fail','myth','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function plant(g,W,H,on){const C=A.col,px=W*.35,gy=H*.72;g.fillStyle=A.alpha(C.or,C.dark?.3:.35);g.fillRect(0,gy,W,H-gy);
 if(on.roots){g.strokeStyle=A.mix(C.or,'#3b2412',.4);g.lineWidth=4;[[0,1],[-.7,.85],[.7,.85]].forEach(([dx,dy])=>{g.beginPath();g.moveTo(px,gy);g.lineTo(px+dx*40,gy+dy*36);g.stroke()})}
 if(on.stem){g.strokeStyle=A.mix(C.gr,'#14532d',.2);g.lineWidth=8;g.beginPath();g.moveTo(px,gy);g.lineTo(px,H*.28);g.stroke()}
 if(on.leaves){[-1,1].forEach(s=>{g.fillStyle=A.mix(C.gr,'#14532d',.15);g.beginPath();g.ellipse(px+s*38,H*.48,28,14,s*-.4,0,7);g.fill()})}
 if(on.flower){const fr=18;for(let i=0;i<6;i++){const a=i*Math.PI/3;g.fillStyle='#f9a8d4';g.beginPath();g.arc(px+Math.cos(a)*fr,H*.26+Math.sin(a)*fr,10,0,7);g.fill()}g.fillStyle='#facc15';g.beginPath();g.arc(px,H*.26,9,0,7);g.fill()}
 if(on.dye){g.fillStyle=A.alpha('#2563eb',.55);g.fillRect(px-4,H*.3,8,gy-H*.3)}
 if(on.wilt){g.strokeStyle=A.alpha(C.rd,.7);g.lineWidth=3;g.beginPath();g.moveTo(px,H*.35);g.quadraticCurveTo(px+30,H*.5,px+10,gy);g.stroke()}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Match each part to its job',W/2,H*.35,A.narrow?15:17,{w:900});T('Roots · stem · leaves · flower',W/2,H*.58,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='roots'||k==='stem'||k==='leaves'||k==='flower'){const on={roots:1,stem:1,leaves:k!=='roots',flower:k==='flower'||k==='leaves',dye:!!S.dye,wilt:!!S.wilt};plant(g,W,H,on);T(S.title||'Plant jobs',W/2,H*.08,A.narrow?14:16,{w:800});T(S.msg||'',W/2,H*.9,A.narrow?12:14,{c:C.mu,max:W*.92})}
 if(k==='fail'||k==='myth'){T(S.title||'Think',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(t,W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{picked:null,opts:[],dye:0,wilt:0,title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='roots'){btn('Tap roots drinking',()=>{S.dye=1;S.msg='Roots take in water and minerals.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Show roots absorbing');btn('Done',()=>S.check(),'Mark roots job done')}
 if(kind()==='stem'){btn('Send water up stem',()=>{S.dye=1;S.msg='The stem carries water up to the leaves.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Show stem transport');btn('Done',()=>S.check(),'Mark stem job done')}
 if(kind()==='leaves'){btn('Let leaf make food',()=>{S.msg='Leaves use light, air and water to make food.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Show leaf food-making');btn('Done',()=>S.check(),'Mark leaves job done')}
 if(kind()==='flower'){btn('Make seeds',()=>{S.msg='The flower helps the plant make seeds.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Show flower reproduction');btn('Done',()=>S.check(),'Mark flower job done')}
 if(kind()==='fail'||kind()==='myth')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='roots'||kind()==='stem'||kind()==='leaves'||kind()==='flower'){if(kind()==='roots'||kind()==='stem')S.dye=1;S.msg=S.msg||'Job shown';A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='fail'||kind()==='myth'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Roots absorb',p:'Roots grow under the soil. Their job is to take in water and minerals — not to eat soil.',
 predict:{q:'Roots mainly…',opts:['take in water and minerals','eat the soil','make seeds'],ans:0},
 task:'Show roots taking in water',show:()=>auto(0,[()=>{S.dye=1;S.msg='Roots absorb water and minerals.';A.redraw();S.check()}]),
 go:()=>{reset({title:'Job of the roots',msg:'Tap to show roots drinking.'});say('Show roots absorbing water.');controls();S.check=finish(0,()=>!!S.dye,'Roots absorb water and minerals from the soil.')}},
{h:'Stem transports',p:'The stem holds the plant up and is a pathway: it carries water and minerals up to the leaves.',
 predict:{q:'The stem’s main job is to…',opts:['carry materials up','make all the food','store seeds'],ans:0},
 task:'Send water up the stem',show:()=>auto(1,[()=>{S.dye=1;S.msg='Stem transports water upward.';A.redraw();S.check()}]),
 go:()=>{reset({title:'Job of the stem',msg:'Tap to send water up.'});say('Show stem transport.');controls();S.check=finish(1,()=>!!S.dye,'The stem transports water and minerals.')}},
{h:'Leaves make food',p:'Leaves catch light. With light, air and water they make the plant’s food (photosynthesis). Plants do not eat soil.',
 predict:{q:'Leaves mainly…',opts:['make food using light','drink soil','only look pretty'],ans:0},
 task:'Show a leaf making food',show:()=>auto(2,[()=>{S.msg='Leaves make food with light.';A.redraw();S.check()}]),
 go:()=>{reset({title:'Job of the leaves',msg:'Tap to let leaves make food.'});say('Show food-making in leaves.');controls();S.check=finish(2,()=>/food|light/i.test(S.msg||''),'Leaves make food using light, air and water.')}},
{h:'Flower reproduces',p:'Flowers help the plant reproduce. They can attract insects and lead to seeds for new plants.',
 predict:{q:'Flowers mainly…',opts:['help make seeds','absorb water','carry water up'],ans:0},
 task:'Show the flower making seeds',show:()=>auto(3,[()=>{S.msg='Flower helps make seeds.';A.redraw();S.check()}]),
 go:()=>{reset({title:'Job of the flower',msg:'Tap to make seeds.'});say('Show flower reproduction.');controls();S.check=finish(3,()=>/seed/i.test(S.msg||''),'Flowers enable reproduction and seeds.')}},
{h:'If a part fails',p:'If roots are cut, the plant wilts — it cannot take in water. If leaves are covered, it cannot make food.',
 predict:{q:'Cut the roots. The plant…',opts:['wilts (no water in)','makes more seeds','grows taller fast'],ans:0},
 task:'Tap what happens with no roots',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'No roots — what happens?',opts:['Plant wilts — no water absorbed','Flower makes extra seeds','Stem makes food alone'],picked:null});say('Predict the failure.');controls();S.check=finish(4,()=>S.picked===0,'Without roots, water and minerals cannot enter.')}},
{h:'True plant-job idea',p:'Each part has a job: roots absorb, stem transports, leaves make food, flowers help reproduction.',
 predict:{q:'Plants get food by…',opts:['leaves making it with light','eating soil through roots','flowers drinking water'],ans:0},
 task:'Tap the true idea',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Tap the true idea',opts:['Leaves make food; roots take water in','Roots eat soil for food','Flowers absorb all the water'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Jobs: absorb, transport, make food, reproduce.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Roots mainly…',[['take in water and minerals','ok'],['eat the soil','soil'],['make the seeds','seeds']]],
 ['Stem mainly…',[['carries water up','ok'],['makes all food','food'],['eats minerals','eat']]],
 ['Leaves mainly…',[['make food with light','ok'],['only look pretty','pretty'],['store seeds','store']]],
 ['Flowers mainly…',[['help make seeds','ok'],['absorb soil water','abs'],['hold the plant up','hold']]],
 ['No roots means…',[['plant wilts','ok'],['more flowers','flor'],['faster food','fast']]],
 ['Plant food comes from…',[['leaves + light','ok'],['eating soil','soil2'],['only the flower','flor2']]],
 ['Cover the leaves. Then…',[['less food made','ok'],['more water in roots','water'],['extra seeds','seed2']]]];
function why(t){let m='Each plant part has a job: roots absorb, stem transports, leaves make food, flowers help seeds.';
 if(t==='soil'||t==='soil2'||t==='eat')m='Roots take in water and minerals; they do not eat soil. Food is made in leaves.';
 if(t==='seeds'||t==='store'||t==='flor'||t==='flor2'||t==='seed2')m='Flowers help reproduction and seeds; leaves make food; roots absorb.';
 if(t==='food'||t==='pretty'||t==='hold'||t==='abs')m='The stem carries materials; leaves make food with light; flowers are not the water path.';
 if(t==='fast'||t==='water')m='Cut roots → wilt. Covered leaves → less food. Water enters at the roots.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Plant part job controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
