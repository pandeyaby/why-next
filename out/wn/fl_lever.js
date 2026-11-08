/* Flagship: Levers, pulleys and gears (ages 9–10; NC Year 5 Forces: mechanisms including
   levers, pulleys and gears allow a smaller force to have a greater effect). A lever needs
   less effort when that effort is farther from the pivot than the load. A single fixed
   pulley (flagpole) changes direction but not the size of the force. Extra pulleys that
   share the load cut the effort, but you pull more rope. A small gear turning a large gear
   gives a stronger, slower turn. Work is conserved: smaller force × longer distance.
   Distinct from flagdrop (gravity and falling) and flagramp (rolling down a slope). */
(()=>{
VIS.reg('flaglever',c=>{
let A,pad,qa,turn=-1;const S={};
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const mode=()=>['lever','flag','share','gears','work','quiz'][A.step];
const LOAD=6, LARM=2; // effort = 12 / d
const need=d=>+(12/d).toFixed(2);
function txt(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.a||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(String(s),x,y,o.max||A.W-12)}
function line(g,t,y){const px=A.narrow?13:15,rows=[''];g.font=`600 ${px}px system-ui,sans-serif`;
 t.split(' ').forEach(w=>{const n=rows.length-1,s=(rows[n]+' '+w).trim();if(g.measureText(s).width>A.W-16&&rows[n])rows.push(w);else rows[n]=s});
 rows.slice(0,2).forEach((s,j)=>txt(s,A.W/2,y+(j-(Math.min(2,rows.length)-1)/2)*(px+3),px,{w:600}))}
function pivotX(){return A.W/2}function baseY(){return A.H*.52}function unit(){return Math.min(52,(A.W-40)/10)}
function loadPos(){return{x:pivotX()-LARM*unit(),y:baseY()}}
function effPos(){const d=S.d||4;return{x:pivotX()+d*unit(),y:baseY()}}
function drawLever(){const g=A.ctx,C=A.col,px=pivotX(),y=baseY(),u=unit(),d=S.d||4;
 g.strokeStyle=C.tx;g.lineWidth=8;g.lineCap='round';g.beginPath();g.moveTo(px-4.2*u,y);g.lineTo(px+5.4*u,y);g.stroke();
 g.fillStyle=C.tx;g.beginPath();g.moveTo(px,y+6);g.lineTo(px-14,y+28);g.lineTo(px+14,y+28);g.closePath();g.fill();txt('pivot',px,y+40,12,{c:C.mu,w:600});
 const L=loadPos();g.fillStyle=A.mix(C.pn,C.or,C.dark?.35:.4);A.paint.rrect(L.x-18,L.y-46,36,40,6);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();txt('6',L.x,L.y-26,16);txt('load',L.x,L.y+16,12,{c:C.mu,w:600});
 const E=effPos();g.fillStyle=A.mix(C.pn,C.cy,C.dark?.35:.35);g.beginPath();g.arc(E.x,E.y-22,18,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();txt('you',E.x,E.y-22,12);txt('effort',E.x,E.y+16,12,{c:C.mu,w:600});
 const n=need(d);txt(`Load arm ${LARM}  ·  Effort arm ${d}`,A.W/2,A.H*.12,A.narrow?14:16);
 txt(`Push needed: ${n}`,A.W/2,A.H*.22,A.narrow?18:22,{c:n<=3?C.gr:C.tx})}
function drawFlag(){const g=A.ctx,C=A.col,cx=A.W/2,top=A.H*.18,bot=A.H*.78,lift=S.lift||0;
 const fy=bot-lift*(bot-top-50);
 g.strokeStyle=C.tx;g.lineWidth=6;g.beginPath();g.moveTo(cx,top);g.lineTo(cx,bot);g.stroke(); // pole
 g.fillStyle=C.pn;g.beginPath();g.arc(cx,top,16,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke(); // wheel
 g.strokeStyle=C.mu;g.lineWidth=3;g.beginPath();g.moveTo(cx-22,fy);g.lineTo(cx-22,top);g.arc(cx,top,22,Math.PI,0);g.lineTo(cx+22,top+lift*(bot-top-50)+40);g.stroke();
 g.fillStyle=A.mix(C.pn,C.rd,C.dark?.3:.45);g.beginPath();g.moveTo(cx-22,fy);g.lineTo(cx-70,fy+12);g.lineTo(cx-22,fy+24);g.closePath();g.fill();g.strokeStyle=C.tx;g.stroke();
 g.fillStyle=A.mix(C.pn,C.cy,C.dark?.3:.3);g.beginPath();g.arc(cx+22,top+lift*(bot-top-50)+48,14,0,7);g.fill();g.strokeStyle=C.tx;g.stroke();txt('pull',cx+22,top+lift*(bot-top-50)+48,11);
 txt('One fixed pulley: pull down, flag up. Force stays about the same.',A.W/2,A.H*.08,A.narrow?13:15,{max:A.W-12})}
function drawShare(){const g=A.ctx,C=A.col,n=S.strands||1,cx=A.W*.38,top=A.H*.2,bot=A.H*.72;
 g.fillStyle=A.mix(C.pn,C.or,C.dark?.3:.4);A.paint.rrect(cx-28,bot-10,56,36,6);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();txt('8',cx,bot+8,16);
 g.fillStyle=C.pn;g.beginPath();g.arc(cx,top,14,0,7);g.fill();g.strokeStyle=C.tx;g.stroke();
 g.strokeStyle=C.mu;g.lineWidth=3;
 if(n===1){g.beginPath();g.moveTo(cx,bot-10);g.lineTo(cx,top);g.stroke();txt('1 rope holds 8',A.W*.72,A.H*.4,15);txt('You pull: 8',A.W*.72,A.H*.52,18)}
 else{g.beginPath();g.moveTo(cx-12,bot-10);g.lineTo(cx-12,top);g.moveTo(cx+12,bot-10);g.lineTo(cx+12,top);g.stroke();
  g.fillStyle=C.pn;g.beginPath();g.arc(cx,bot-24,12,0,7);g.fill();g.strokeStyle=C.tx;g.stroke();
  txt('2 ropes share 8',A.W*.72,A.H*.36,15);txt('You pull: 4',A.W*.72,A.H*.48,18,{c:C.gr});txt('but twice the rope',A.W*.72,A.H*.58,14,{c:C.mu,w:600})}
 txt('Sharing the load cuts the pull. You pull more rope.',A.W/2,A.H*.08,A.narrow?13:15,{max:A.W-12})}
function drawGears(){const g=A.ctx,C=A.col,x1=A.W*.34,x2=A.W*.66,y=A.H*.48,r1=42,r2=78,ang=S.ang||0;
 function gear(x,y,r,teeth,rot,col){g.save();g.translate(x,y);g.rotate(rot);g.fillStyle=A.mix(C.pn,col,C.dark?.3:.32);g.beginPath();
  for(let i=0;i<teeth*2;i++){const a=i*Math.PI/teeth,rr=i%2?r:r+9;g[i?'lineTo':'moveTo'](Math.cos(a)*rr,Math.sin(a)*rr)}
  g.closePath();g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();g.fillStyle=C.pn;g.beginPath();g.arc(0,0,r*.35,0,7);g.fill();g.stroke();g.restore()}
 const small=S.driver!=='big';
 gear(x1,y,r1,8,small?ang:-ang/2,C.cy);gear(x2,y,r2,16,small?-ang/2:ang,C.or);
 txt('8 teeth',x1,y+r1+28,13,{c:C.mu,w:600});txt('16 teeth',x2,y+r2+16,13,{c:C.mu,w:600});
 const turns=Math.abs(ang)/(Math.PI*2);
 txt(small?`Small turns ${turns.toFixed(1)}  →  large turns ${(turns/2).toFixed(1)}`:`Large turns ${turns.toFixed(1)}  →  small turns ${(turns*2).toFixed(1)}`,A.W/2,A.H*.1,A.narrow?13:15,{max:A.W-12});
 txt(small?'Stronger turn on the large gear, but slower.':'Faster turn on the small gear, but weaker.',A.W/2,A.H*.2,A.narrow?14:16)}
function drawWork(){const g=A.ctx,C=A.col;
 const rows=[['See-saw','push 3 over 4 spaces','load 6 over 2 spaces','3 × 4 = 6 × 2'],
  ['Two pulleys','pull 4 along 2 ropes','lift 8 by 1 height','4 × 2 = 8 × 1'],
  ['Gears 8 to 16','small turns twice','large turns once, stronger','2 × 1 = 1 × 2']];
 txt('A smaller force acts over a longer distance.',A.W/2,A.H*.1,A.narrow?14:16,{max:A.W-12});
 rows.forEach((r,i)=>{const y=A.H*(.26+i*.2);g.fillStyle=A.mix(C.pn,C.cy,C.dark?.15:.1);A.paint.rrect(12,y-28,A.W-24,56,12);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();
  txt(r[0],A.W*.16,y,14,{w:800,max:A.W*.28});txt(r[1],A.W*.5,y-10,13,{max:A.W*.4,w:600});txt(r[2],A.W*.5,y+12,13,{max:A.W*.4,w:600});txt(r[3],A.W*.84,y,14,{c:C.gr,w:700,max:A.W*.24})})}
function paint(){const{ctx:g,W,H,col:C}=A,k=mode();g.fillStyle=A.mix(C.pn,C.am,C.dark?.06:.1);g.fillRect(0,0,W,H);
 if(k==='quiz'){txt('Lever, pulley or gear?',W/2,H*.42,A.narrow?16:18);txt('Answer below',W/2,H*.56,15,{c:C.mu,w:500});A.fx.draw(g);return}
 if(k==='lever')drawLever();if(k==='flag')drawFlag();if(k==='share')drawShare();if(k==='gears')drawGears();if(k==='work')drawWork();
 if(S.msg)line(g,S.msg,H*.88);A.fx.draw(g)}
function feedback(t,good){S.msg=t;if(good)A.sound.pop();else if(good===false)A.sound.miss();tell(t);buttons();A.redraw();S.after&&S.after()}
function reset(o){for(const k in S)delete S[k];Object.assign(S,{d:2,lift:0,strands:1,ang:0,driver:'small',seen:{},msg:'',after:()=>{}},o||{});A.redraw()}
function setD(d){d=Math.max(1,Math.min(6,Math.round(d)));if(d===S.d)return;S.d=d;S.seen[d]=true;const n=need(d);
 feedback(n<LOAD?`Farther from the pivot: you push only ${n}, less than the load of ${LOAD}.`:`At ${d} spaces, you must push ${n}. Move farther from the pivot to push less.`,n<LOAD?true:undefined)}
function lift(dir){const next=Math.max(0,Math.min(1,S.lift+(dir>0?.2:-.2)));if(next===S.lift)return;S.lift=next;
 if(S.lift>=1){S.up=true;return feedback('The flag went up because you pulled down. The pull is still about as big as the flag. Direction changed, not weight.',true)}
 feedback('Keep pulling down. A single fixed pulley turns your pull over the wheel.',undefined)}
function setStrands(n){S.strands=n;if(n===2){S.shared=true;return feedback('Two ropes share the load of 8, so you pull 4. You pull twice as much rope. Smaller force, longer distance.',true)}
 feedback('One rope holds all 8, so you pull 8. Add a second pulley to share the load.',false)}
function spin(delta){S.ang=(S.ang||0)+delta;S.spun=(S.spun||0)+Math.abs(delta);if(S.spun>2.5){S.turned=true;feedback(S.driver==='small'?'The large gear turns half as far, with a stronger turning force.':'The small gear turns twice as far, with a weaker turning force.',true)}
 else{feedback('Keep turning. Count how far each gear moves.',undefined);A.redraw()}}
function setDriver(which){S.driver=which;S.ang=0;S.spun=0;S.turned=false;feedback(which==='small'?'Small gear is driving. It must turn twice for one turn of the large gear.':'Large gear is driving. One of its turns spins the small gear twice.');A.redraw()}
function markWork(){S.ok=true;feedback('Yes. Smaller force × longer distance keeps the work the same. The load does not get lighter for free.',true)}
function buttons(){if(!pad)return;pad.innerHTML='';const k=mode();if(k==='quiz')return;
 const add=(t,f,lab)=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:48px;padding:8px 12px','aria-label':lab||t},pad,t).onclick=f};
 if(k==='lever'){add('Closer to pivot',()=>setD((S.d||4)-1),'Move effort closer to the pivot');add('Farther from pivot',()=>setD((S.d||4)+1),'Move effort farther from the pivot')}
 if(k==='flag'){add('Pull down',()=>lift(1));add('Let the flag down',()=>lift(-1))}
 if(k==='share'){add('One pulley (pull 8)',()=>setStrands(1));add('Two pulleys (pull 4)',()=>setStrands(2))}
 if(k==='gears'){add('Small drives large',()=>setDriver('small'));add('Large drives small',()=>setDriver('big'));add('Turn →',()=>spin(.4),'Turn the driving gear')}
 if(k==='work')add('Force × distance stays the same',markWork)}
function down(p){const k=mode();if(k==='quiz')return false;
 if(k==='lever'){const E=effPos();if(Math.abs(p.x-E.x)<30&&Math.abs(p.y-(baseY()-22))<30){S.drag='rider';return true}
  const u=unit(),d=Math.round((p.x-pivotX())/u);if(d>=1&&d<=6&&Math.abs(p.y-baseY())<40){setD(d);return true}}
 if(k==='flag'){S.drag='rope';return true}
 if(k==='share'){if(p.x>A.W*.55){setStrands(S.strands===1?2:1);return true}}
 if(k==='gears'){S.drag='gear';S.last=p;return true}
 if(k==='work'){markWork();return true}
 return false}
function move(p){if(S.drag==='rider'){const d=Math.round((p.x-pivotX())/unit());setD(d);S.drag='rider'}
 if(S.drag==='rope'){lift(p.y>(S.last&&S.last.y||p.y)?1: (S.last&&p.y<S.last.y?-1:1));S.last=p}
 if(S.drag==='gear'&&S.last){spin((p.x-S.last.x+(p.y-S.last.y))*.02);S.last=p}}
function up(){S.drag=null}
const finish=(i,ok,say)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(say()+A.reveal(i))};
function auto(i,acts){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?25*(j+1):(j+1)*350))}
function open(i,hint,ok,say){reset();feedback(hint);S.after=finish(i,ok,say)}
const steps=[
{h:'The see-saw',p:'A lever is a bar that turns on a pivot. The load is what you want to move. The effort is your push. Sit farther from the pivot than the load to push with a smaller force.',
 predict:{q:'To lift a heavy friend with less push, should you sit…',opts:['closer to the middle (the pivot)','farther from the middle','exactly on the pivot'],ans:1},
 task:'Move the rider farther from the pivot than the box',show:()=>auto(0,[()=>setD(5)]),
 go:()=>open(0,'Drag the rider, or use the buttons. Watch the push change.',()=>(S.d||0)>LARM,()=>'Farther from the pivot, the push is smaller than the load.')},
{h:'A flagpole pulley',p:'A single fixed pulley is a wheel that a rope runs over. You pull down and the flag goes up. That changes direction. It does not make the flag lighter.',
 predict:{q:'Does one pulley on a flagpole make the flag lighter?',opts:['Yes, any pulley cuts the force in half','No, it mainly changes the direction of your pull','Yes, the flag loses mass going over the wheel'],ans:1},
 task:'Pull down to raise the flag',show:()=>auto(1,[()=>lift(1),()=>lift(1),()=>lift(1),()=>lift(1),()=>lift(1)]),
 go:()=>open(1,'Pull the rope down. The flag rises. The pull stays about as big as the flag.',()=>S.up,()=>'Direction changed. The force did not shrink.')},
{h:'Sharing the load',p:'Extra pulleys can share the load between two (or more) pieces of rope. You pull with less force, but you pull more rope.',
 predict:{q:'Two pulleys share a load of 8 equally. What do you pull with, and how much rope?',opts:['Pull 4, and pull twice the rope','Pull 4, and pull half the rope','Pull 16, because two wheels add up'],ans:0},
 task:'Switch to two pulleys and see the pull drop',show:()=>auto(2,[()=>setStrands(2)]),
 go:()=>open(2,'Compare one pulley with two. Watch both the pull and the rope.',()=>S.shared,()=>'Two ropes share 8, so you pull 4, over twice the distance.')},
{h:'Gears',p:'Gears are wheels with teeth that slot together. A small gear turning a large gear gives a stronger turn, but the large gear turns more slowly.',
 predict:{q:'A small gear (8 teeth) turns a large gear (16 teeth). The large gear…',opts:['turns faster, with less force','turns slower, with more turning force','turns at the same speed, for free extra force'],ans:1},
 task:'Turn the gears and compare how far each moves',show:()=>auto(3,[()=>setDriver('small'),()=>spin(2.8)]),
 go:()=>open(3,'Turn the small gear, then try the large gear as the driver.',()=>S.turned,()=>'Twice the teeth means half the turns and a stronger turning force.')},
{h:'Nothing for free',p:'A smaller force always acts over a longer distance. On the see-saw, 3 × 4 = 6 × 2. With two pulleys, 4 × 2 = 8 × 1. The load does not get lighter for free.',
 predict:{q:'If a machine lets you push with a smaller force, what else must change?',opts:['You get extra energy for nothing','You push over a longer distance','The load itself gets lighter'],ans:1},
 task:'Read the three matches, then confirm',show:()=>auto(4,[()=>markWork()]),
 go:()=>open(4,'Check the matching products on the cards.',()=>S.ok,()=>'Smaller force × longer distance keeps the work the same.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[
 ['To lift a heavy box with a lever, you should push…',[['farther from the pivot than the box sits','ok'],['as close to the pivot as you can','closer'],['exactly on the pivot','closer']]],
 ['A single flagpole pulley mainly…',[['changes the direction of your pull','ok'],['cuts the flag’s weight in half','fixed'],['gives you extra energy','free']]],
 ['Two pulleys share a load of 8. You pull with 4. What is the catch?',[['you have to pull twice as much rope','ok'],['the load loses half its mass','free'],['the extra pulley removes friction for free','free']]],
 ['A small gear turning a large gear makes the large gear…',[['turn more slowly, with a stronger turning force','ok'],['turn faster, so hills are harder','gear'],['turn with extra force and extra speed together','free']]],
 ['On a bicycle, a low gear (easier up a hill) means…',[['you pedal more turns for each turn of the wheel','ok'],['you pedal fewer turns and the bike leaps forward','gear'],['the bike gets lighter going uphill','free']]],
 ['A see-saw has a load of 6, two spaces from the pivot. You sit four spaces away. What push balances it?',[['3','ok'],['6','closer'],['12','closer']]],
 ['Why can none of these machines give you a smaller force and a shorter distance together?',[['work stays the same: smaller force × longer distance','ok'],['they can, if you add enough wheels','free'],['only gears can do that, not levers','gear']]]];
function why(t){let m='Levers, pulleys and gears can let a smaller force have a greater effect, but the smaller force acts over a longer distance.';
 if(t==='closer')m='Sitting closer to the pivot makes you push harder, not less. Move farther from the pivot than the load.';
 if(t==='fixed')m='A single fixed pulley changes direction (pull down to lift up). It does not make the load lighter.';
 if(t==='free')m='You never get extra energy. If the force gets smaller, the distance you act over gets longer.';
 if(t==='gear')m='A low gear trades speed for force: more turns of the pedals, an easier push. A small gear driving a large one does the same.';
 return m}
function ask(){turn++;const Q=QS[turn%QS.length],r=turn%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 qa.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:48px'},row,v).onclick=()=>mark(t)});tell('Challenge: '+Q[0]);A.redraw()}
function mark(t){qa.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes! ':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.28,draw:paint,onStep:A=>{qa.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{reset();const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Machine buttons'},w);qa=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});buttons()}});
A.start()})})();
