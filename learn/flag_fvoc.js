/* Flagship: Forces Vocabulary (ages 5–8).
   Precise force words: push, pull, twist, stretch, squash, contact vs non-contact (gravity, magnets),
   friction, air resistance. Distinct from flagshove (push/pull play) and flagfdiag (scaled arrows). */
(()=>{
VIS.reg('flagfvoc',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['pushpull','shape','contact','friction','match','myth','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function scene(g,W,H){const C=A.col;g.fillStyle=A.alpha(C.tx,.06);g.fillRect(W*.1,H*.35,W*.8,H*.35);
 if(S.mode==='car'){g.fillStyle=C.ac;g.fillRect(W*.2+(S.x||0),H*.48,50,28);g.fillStyle=C.tx;g.beginPath();g.arc(W*.25+(S.x||0),H*.76,8,0,7);g.fill();g.beginPath();g.arc(W*.35+(S.x||0),H*.76,8,0,7);g.fill()}
 if(S.mode==='spring'){g.strokeStyle=C.vi;g.lineWidth=3;g.beginPath();g.moveTo(W*.2,H*.55);for(let i=0;i<8;i++)g.lineTo(W*.2+i*12,H*.55+((i%2)?-12-(S.stretch||0):12+(S.stretch||0)));g.stroke()}
 if(S.mode==='ball'){g.fillStyle=C.or;g.beginPath();g.arc(W/2,H*.3+(S.fall||0),18,0,7);g.fill();T('gravity',W/2,H*.18,13,{c:C.mu})}
 if(S.mode==='slide'){g.strokeStyle=C.tx;g.lineWidth=4;g.beginPath();g.moveTo(W*.15,H*.35);g.lineTo(W*.85,H*.7);g.stroke();g.fillStyle=C.ac;g.beginPath();g.arc(W*.3+(S.x||0),H*.4+(S.x||0)*.5,14,0,7);g.fill();if(S.fric)T('friction slows',W/2,H*.88,13,{c:C.mu})}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Name the force',W/2,H*.35,A.narrow?15:17,{w:900});T('push · pull · friction · gravity',W/2,H*.58,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='pushpull'||k==='shape'||k==='contact'||k==='friction'){T(S.title||'Forces words',W/2,H*.08,A.narrow?14:16,{w:800});scene(g,W,H);T(S.msg||'',W/2,H*.9,A.narrow?12:14,{c:C.mu,max:W*.92})}
 if(k==='match'||k==='myth'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(t,W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{mode:'car',x:0,stretch:0,fall:0,fric:0,picked:null,opts:[],title:'',msg:'',word:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='pushpull'){btn('Push the car',()=>{S.x=Math.min(120,(S.x||0)+40);S.word='push';S.msg='Push: force away from you.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Apply a push');btn('Pull the car',()=>{S.x=Math.max(0,(S.x||0)-40);S.word='pull';S.msg='Pull: force towards you.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Apply a pull')}
 if(kind()==='shape'){btn('Stretch',()=>{S.stretch=Math.min(10,(S.stretch||0)+3);S.word='stretch';S.msg='Stretch: pull to make longer.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Stretch the spring');btn('Squash',()=>{S.stretch=Math.max(-6,(S.stretch||0)-3);S.word='squash';S.msg='Squash: push to make shorter.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Squash the spring');btn('Twist',()=>{S.word='twist';S.msg='Twist: turn with a force.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Twist action')}
 if(kind()==='contact'){btn('Drop (gravity)',()=>{S.fall=Math.min(80,(S.fall||0)+40);S.word='gravity';S.msg='Gravity: non-contact pull down.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Show gravity');btn('Magnet (no touch)',()=>{S.word='noncontact';S.msg='Magnets: non-contact force.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Show non-contact magnet')}
 if(kind()==='friction'){btn('Slide with friction',()=>{S.x=Math.min(100,(S.x||0)+30);S.fric=1;S.word='friction';S.msg='Friction: contact force that slows.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Show friction');btn('Air resistance',()=>{S.word='air';S.msg='Air resistance slows things in air.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Show air resistance')}
 if(kind()==='match'||kind()==='myth')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='pushpull'){S.x=Math.min(120,(S.x||0)+30);S.word='push';S.msg='Push applied.';A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='shape'){S.stretch=Math.min(10,(S.stretch||0)+2);S.word=S.word||'stretch';A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='contact'){S.fall=Math.min(80,(S.fall||0)+30);S.word='gravity';A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='friction'){S.x=Math.min(100,(S.x||0)+25);S.fric=1;S.word='friction';A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='match'||kind()==='myth'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Push and pull',p:'A push is a force away from you. A pull is a force towards you. Both are force words.',
 predict:{q:'Opening a drawer is usually a…',opts:['pull','push','twist only'],ans:0},
 task:'Push and pull the car',show:()=>auto(0,[()=>{S.word='pull';S.x=40;A.redraw();S.check()}]),
 go:()=>{reset({mode:'car',title:'Name: push or pull',msg:'Try both buttons.'});say('Use push and pull.');controls();S.check=finish(0,()=>S.word==='push'||S.word==='pull','Push and pull are force words.')}},
{h:'Stretch, squash, twist',p:'Forces can change shape: stretch (longer), squash (shorter), twist (turn).',
 predict:{q:'Making a spring longer is…',opts:['stretch','squash','gravity'],ans:0},
 task:'Stretch or squash the spring',show:()=>auto(1,[()=>{S.stretch=6;S.word='stretch';A.redraw();S.check()}]),
 go:()=>{reset({mode:'spring',title:'Change shape with a force',msg:'Stretch, squash or twist.'});say('Change the spring’s shape.');controls();S.check=finish(1,()=>['stretch','squash','twist'].includes(S.word),'Stretch, squash and twist name shape-changing forces.')}},
{h:'Contact vs non-contact',p:'Contact forces need touch (push, friction). Non-contact forces act at a distance (gravity, magnets).',
 predict:{q:'Gravity is…',opts:['non-contact','only a contact push','not a force'],ans:0},
 task:'Show gravity pulling down',show:()=>auto(2,[()=>{S.fall=60;S.word='gravity';A.redraw();S.check()}]),
 go:()=>{reset({mode:'ball',title:'Contact or non-contact?',msg:'Drop with gravity (no touch).'});say('Gravity acts without touching.');controls();S.check=finish(2,()=>S.word==='gravity'||S.word==='noncontact','Gravity and magnets are non-contact forces.')}},
{h:'Friction and air',p:'Friction is a contact force that opposes sliding. Air resistance slows things moving through air.',
 predict:{q:'A sled slowing on snow meets…',opts:['friction','only gravity upward','twist'],ans:0},
 task:'Show friction slowing a slide',show:()=>auto(3,[()=>{S.fric=1;S.x=50;S.word='friction';A.redraw();S.check()}]),
 go:()=>{reset({mode:'slide',title:'What slows the slide?',msg:'Tap to feel friction.'});say('Friction slows motion.');controls();S.check=finish(3,()=>S.word==='friction'||S.word==='air','Friction and air resistance oppose motion.')}},
{h:'Match the word',p:'Match each scene to the precise force word — not just “a force”.',
 predict:{q:'Slowing on a rough mat is…',opts:['friction','flower force','seed pull'],ans:0},
 task:'Tap the best word',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'A book sliding stops because of…',opts:['friction (contact, slows)','the flower force','seed pull'],picked:null});say('Match the vocabulary.');controls();S.check=finish(4,()=>S.picked===0,'Use precise words like friction, gravity, push, pull.')}},
{h:'True vocabulary idea',p:'Force vocabulary names how forces act: push, pull, stretch, squash, twist, contact vs non-contact, friction, gravity.',
 predict:{q:'Weight (on Earth) links to…',opts:['gravity','only air resistance','only stretch'],ans:0},
 task:'Tap the true idea',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Tap the true idea',opts:['Forces have precise names for how they act','Every force needs a flower','Push and pull are not forces'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Precise force words describe action and contact.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Opening a drawer is a…',[['pull','ok'],['push only','push'],['twist only','twist']]],
 ['Longer spring means…',[['stretch','ok'],['squash','squash'],['friction','fric']]],
 ['Gravity is…',[['non-contact','ok'],['only contact','contact'],['not a force','noforce']]],
 ['Sled slowing meets…',[['friction','ok'],['only upward gravity','up'],['twist','tw']]],
 ['Book stops on a mat from…',[['friction','ok'],['flower force','flor'],['seed pull','seed']]],
 ['Weight links to…',[['gravity','ok'],['only air','air'],['only stretch','str']]],
 ['Kick a ball away: that is a…',[['push','ok'],['pull','pull'],['non-contact only','nc']]]];
function why(t){let m='Use precise force words: push, pull, stretch, squash, twist, friction, gravity, contact vs non-contact.';
 if(t==='push'||t==='twist'||t==='pull')m='Opening a drawer is usually a pull (towards you); kicking away is a push.';
 if(t==='squash'||t==='fric'||t==='str')m='Stretch makes longer; squash makes shorter; friction slows sliding.';
 if(t==='contact'||t==='noforce'||t==='nc')m='Gravity and magnets act without touching — non-contact forces.';
 if(t==='up'||t==='tw'||t==='flor'||t==='seed'||t==='air')m='Friction is the contact force that slows a sled or book; weight links to gravity.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Forces vocabulary controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
