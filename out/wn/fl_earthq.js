/* Flagship: What Is an Earthquake (ages 5–7; KS1 rocks/earth).
   Earth's crust in pieces (plates), plates bump/slide → ground shakes, sort quake vs storm/volcano clues,
   practise Drop-Cover-Hold, reject "earth opens forever" myth, then challenge. Distinct from volcano (flagvolc). */
(()=>{
VIS.reg('flagearthq',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['crust','shake','cause','sort','safe','myth','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function ground(g,W,H,shake){const{col:C}=A;const y=H*.62+((shake||0)%2?4:-2);g.fillStyle=A.alpha(C.gr,.55);g.fillRect(0,y,W,H-y);g.strokeStyle=C.tx;g.lineWidth=2;
 for(let i=0;i<5;i++){g.beginPath();g.moveTo(W*(.1+i*.18),y);g.lineTo(W*(.18+i*.18),y-((shake||0)?12:0));g.lineTo(W*(.26+i*.18),y);g.stroke()}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#ffedd5',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Earthquake = ground shake',W/2,H*.35,A.narrow?14:16,{w:900});T('Plates · Drop Cover Hold',W/2,H*.58,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='crust'){T('Earth has a cracked shell',W/2,H*.1,A.narrow?13:15,{w:800});
  g.fillStyle=A.alpha(C.am,.5);g.beginPath();g.arc(W/2,H*.55,Math.min(W,H)*.28,0,6.3);g.fill();g.strokeStyle=C.tx;g.lineWidth=3;g.stroke();
  g.strokeStyle=C.vi;g.lineWidth=3;for(let i=0;i<(S.cracks||0);i++){g.beginPath();g.moveTo(W/2,H*.55);g.lineTo(W/2+Math.cos(i*1.1)*Math.min(W,H)*.28,H*.55+Math.sin(i*1.1)*Math.min(W,H)*.28);g.stroke()}
  T(S.msg||`Plate cracks: ${S.cracks||0}/4`,W/2,H*.92,12,{c:C.mu})}
 if(k==='shake'){T('Plates bump — ground shakes',W/2,H*.1,A.narrow?13:15,{w:800});ground(g,W,H,S.shake||0);
  g.fillStyle=C.or;g.fillRect(W*.42,H*.35,W*.16,H*.22);T('house',W/2,H*.3,11,{c:C.mu});T(S.msg||'Tap to shake',W/2,H*.92,12,{c:C.mu})}
 if(k==='cause'){T('What makes an earthquake?',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 if(k==='sort'){T('Earthquake clue or not?',W/2,H*.1,A.narrow?14:16,{w:800});
  T(S.card||'ground suddenly shakes',W/2,H*.4,A.narrow?13:15,{max:W*.9});T(S.msg||'Tap Quake or Not',W/2,H*.88,12,{c:C.mu})}
 if(k==='safe'){T('Stay safe: Drop, Cover, Hold',W/2,H*.1,A.narrow?13:15,{w:800});
  const steps=['Drop','Cover','Hold'];steps.forEach((t,i)=>{const x=W*(.2+i*.3);g.fillStyle=S.done>i?A.alpha(C.gr,.5):A.alpha(C.tx,.1);g.beginPath();g.arc(x,H*.45,28,0,6.3);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();T(t,x,H*.45,A.narrow?11:13,{w:800})});
  T(S.msg||'Tap the next step',W/2,H*.88,12,{c:C.mu})}
 if(k==='myth'){T('True or mix-up?',W/2,H*.1,A.narrow?14:16,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{cracks:0,shake:0,picked:null,card:'',msg:'',opts:[],done:0,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*220))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='crust')btn('Add a crack',()=>{S.cracks=Math.min(4,(S.cracks||0)+1);S.msg=`Plate cracks: ${S.cracks}/4`;A.sound.tick();say(S.msg);A.redraw();S.check()},'Add plate crack');
 if(kind()==='shake')btn('Shake!',()=>{S.shake=(S.shake||0)+1;S.msg='The ground is shaking — earthquake!';A.sound.tick();say(S.msg);A.redraw();S.check()},'Shake the ground');
 if(kind()==='cause'||kind()==='myth')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t));
 if(kind()==='sort'){btn('Quake clue',()=>{S.picked=S.expect;S.msg=S.expect===1?'Yes — that fits an earthquake':'That is not a quake clue';S.expect===1?A.sound.tick():A.sound.miss();say(S.msg);A.redraw();S.check()},'Earthquake clue');btn('Not a quake',()=>{S.picked=1-S.expect;S.msg=S.expect===0?'Right — not a quake clue':'That one is a quake clue';S.expect===0?A.sound.tick():A.sound.miss();say(S.msg);A.redraw();S.check()},'Not earthquake')}
 if(kind()==='safe')btn('Next safety step',()=>{S.done=Math.min(3,(S.done||0)+1);S.msg=['','Drop low','Cover under a table','Hold on'][S.done]||'Done';A.sound.tick();say(S.msg);A.redraw();S.check()},'Next Drop Cover Hold step')}
function down(p){if(kind()==='chal')return false;
 if(kind()==='crust'){S.cracks=Math.min(4,(S.cracks||0)+1);A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='shake'){S.shake=(S.shake||0)+1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='cause'||kind()==='myth'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='sort'){S.picked=p.x<A.W/2?S.expect:1-S.expect; (S.picked===S.expect)?A.sound.tick():A.sound.miss();A.redraw();S.check();return true}
 if(kind()==='safe'){S.done=Math.min(3,(S.done||0)+1);A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Cracked shell',p:'Earth\'s outer shell is cracked into big pieces called plates. They fit like a puzzle.',
 predict:{q:'Earth\'s outer shell is…',opts:['cracked into plates','one smooth ball forever','only water'],ans:0},
 task:'Add 4 plate cracks',show:()=>auto(0,[()=>{S.cracks=4;A.redraw();S.check()}]),
 go:()=>{reset({cracks:0});say('Tap to show plate cracks.');controls();S.check=finish(0,()=>(S.cracks||0)>=4,'Plates make up the crust.')}},
{h:'Ground shakes',p:'When plates bump, scrape, or slide, the ground can shake. That shaking is an earthquake.',
 predict:{q:'An earthquake is…',opts:['the ground shaking','only loud thunder','only a rain storm'],ans:0},
 task:'Shake the ground',show:()=>auto(1,[()=>{S.shake=2;A.redraw();S.check()}]),
 go:()=>{reset({shake:0});say('Make the ground shake.');controls();S.check=finish(1,()=>(S.shake||0)>=1,'Earthquake means the ground shakes.')}},
{h:'What causes it',p:'Earthquakes start when plates push, pull, or slide past each other under the ground.',
 predict:{q:'Earthquakes are caused by…',opts:['plates moving','clouds bumping','the Moon falling'],ans:0},
 task:'Tap the true cause',show:()=>auto(2,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['plates bumping or sliding','clouds making thunder','trees growing too fast'],picked:null});say('What causes earthquakes?');controls();S.check=finish(2,()=>S.picked===0,'Moving plates cause earthquakes.')}},
{h:'Sort the clues',p:'Sudden ground shake is an earthquake clue. Ash clouds and lava point to a volcano. Heavy rain is weather.',
 predict:{q:'Sudden ground shake is…',opts:['an earthquake clue','a volcano ash cloud','just ordinary wind'],ans:0},
 task:'Sort: ground suddenly shakes',show:()=>auto(3,[()=>{S.expect=1;S.picked=1;A.redraw();S.check()}]),
 go:()=>{reset({card:'ground suddenly shakes',expect:1,picked:null});say('Is this an earthquake clue?');controls();S.check=finish(3,()=>S.picked===1,'Sudden shake = earthquake clue.')}},
{h:'Drop, Cover, Hold',p:'If the ground shakes, Drop low, Cover your head under a sturdy table, and Hold on until it stops.',
 predict:{q:'First safety move in a quake?',opts:['Drop low','Run to a window','Stand under a bookshelf'],ans:0},
 task:'Complete Drop-Cover-Hold',show:()=>auto(4,[()=>{S.done=3;A.redraw();S.check()}]),
 go:()=>{reset({done:0});say('Tap through Drop, Cover, Hold.');controls();S.check=finish(4,()=>(S.done||0)>=3,'Drop, Cover, Hold keeps you safer.')}},
{h:'Crack myth',p:'The ground shakes; it does not usually open into a forever canyon like in cartoons.',
 predict:{q:'In a real quake the ground…',opts:['shakes and may crack a little','always opens a huge forever hole','turns into water'],ans:0},
 task:'Tap the true idea',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Ground shakes; big forever holes are a myth','Earth always splits into a bottomless canyon','Earthquakes are only loud clouds'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Shaking is real; cartoon canyons are not.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['An earthquake is…',[['Ground shaking','ok'],['Only thunder','storm'],['Only heavy rain','rain']]],
 ['Caused by…',[['Moving plates','ok'],['Clouds bumping','storm'],['The Moon falling','moon']]],
 ['Sudden ground shake is…',[['Quake clue','ok'],['Volcano ash','volc'],['Ordinary wind','wind']]],
 ['First safety step?',[['Drop low','ok'],['Run to a window','window'],['Stand under a shelf','shelf']]],
 ['Real quakes…',[['Shake; forever holes are myth','ok'],['Always open bottomless canyons','canyon'],['Are only loud clouds','storm']]],
 ['Drop, Cover, Hold means…',[['Get low, cover, hold on','ok'],['Jump higher each time','jump'],['Stand by glass','glass']]],
 ['Plates are…',[['Pieces of Earth\'s shell','ok'],['Only puddles','puddle'],['Only clouds','storm']]]];
function why(t){let m='An earthquake is the ground shaking when plates move.';
 if(t==='storm'||t==='rain'||t==='wind'||t==='moon')m='Thunder, rain, and wind are weather — not plate motion under the ground.';
 if(t==='volc')m='Ash and lava point to a volcano; sudden shake points to an earthquake.';
 if(t==='window'||t==='shelf'||t==='jump'||t==='glass')m='Drop low, Cover under a sturdy table, Hold on — stay away from glass and shelves.';
 if(t==='canyon'||t==='puddle')m='The ground shakes and may crack a little; cartoon forever holes are a myth.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Earthquake controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
