/* Flagship: measuring mass and weight (ages 5–6; Y1 measure: mass with non-standard units).
   Balance an object with equal cubes, record number+unit, reject "bigger=heavier" without measuring,
   read a simple scale, then challenge. Distinct from qualitative heavy/light play (flagheavy)
   and capacity cups (flagcups). */
(()=>{
VIS.reg('flagmass',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['balance','cubes','record','biglight','scale','idea','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function pan(g,x,y,w,h,down,fill){g.strokeStyle=A.col.tx;g.lineWidth=2;g.beginPath();g.moveTo(x,y);g.lineTo(x+w,y);g.lineTo(x+w*.85,y+h);g.lineTo(x+w*.15,y+h);g.closePath();g.stroke();if(fill){g.fillStyle=A.alpha(fill,.5);g.fill()}if(down){g.fillStyle=A.col.tx;g.fillRect(x+w*.45,y+h+2,w*.1,6)}}
function cubes(g,n,x0,y0){const s=Math.min(A.W,A.H)*.05;for(let i=0;i<n;i++){const x=x0+(i%4)*s*1.15,y=y0-Math.floor(i/4)*s*1.15;g.fillStyle=A.alpha(A.col.ac,.7);g.fillRect(x,y,s,s);g.strokeStyle=A.col.tx;g.lineWidth=1;g.strokeRect(x,y,s,s)}}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.08:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Mass = how heavy (cubes / grams)',W/2,H*.32,A.narrow?13:16,{w:900});T('Balance, then count equal units.',W/2,H*.52,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='balance'){T('Heavier side goes down',W/2,H*.08,A.narrow?14:17,{w:800});
  g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(W*.2,H*.35);g.lineTo(W*.8,H*.35+(S.tip||0)*H*.08);g.stroke();
  pan(g,W*.12,H*.35+(S.tip||0)*H*.08,W*.28,H*.12,S.tip>0,C.cy);pan(g,W*.6,H*.35+(S.tip||0)*H*.08,W*.28,H*.12,S.tip<0,C.or);
  T('Apple',W*.26,H*.58,13);T('Feather',W*.74,H*.58,13);
  T(S.picked==null?'Which side is heavier?':'Picked '+S.picked,W/2,H*.88,A.narrow?12:14,{c:C.mu})}
 if(k==='cubes'){T('Add cubes until it balances',W/2,H*.08,A.narrow?13:16,{w:800});
  g.strokeStyle=C.tx;g.lineWidth=3;g.beginPath();g.moveTo(W*.2,H*.32);g.lineTo(W*.8,H*.32+(S.n-(S.want||4))*H*.02);g.stroke();
  pan(g,W*.12,H*.32,W*.28,H*.12,0,C.cy);T('Book',W*.26,H*.52,13);
  pan(g,W*.6,H*.32+(S.n-(S.want||4))*H*.02,W*.28,H*.12,0,C.ac);cubes(g,S.n||0,W*.64,H*.48);
  T(`${S.n||0} cubes (need ${S.want||4})`,W/2,H*.88,A.narrow?13:15,{c:C.mu})}
 if(k==='record'){T('Record the mass',W/2,H*.1,A.narrow?15:18,{w:800});
  T(`Book balances ${S.want||4} cubes`,W/2,H*.32,A.narrow?14:16);
  T(S.said?`${S.want} cubes`:'Tap to write number + unit',W/2,H*.55,A.narrow?16:20,{w:800});
  T(S.gram?'Also: scales can show grams':'Mark grams on a simple scale',W/2,H*.78,A.narrow?12:14,{c:C.mu})}
 if(k==='biglight'){T('Bigger is not always heavier',W/2,H*.08,A.narrow?13:15,{w:800});
  g.fillStyle=A.alpha(C.cy,.4);g.beginPath();g.ellipse(W*.28,H*.45,W*.16,H*.18,0,0,7);g.fill();g.strokeStyle=C.tx;g.stroke();
  g.fillStyle=A.alpha(C.or,.7);g.fillRect(W*.62,H*.4,W*.14,H*.14);g.strokeRect(W*.62,H*.4,W*.14,H*.14);
  T('Big balloon',W*.28,H*.72,12);T('Small stone',W*.69,H*.72,12);
  T(S.picked==null?'Which is heavier? Measure!':'Picked '+S.picked,W/2,H*.9,A.narrow?12:14,{c:C.mu})}
 if(k==='scale'){T('Read the simple scale',W/2,H*.08,A.narrow?14:17,{w:800});
  g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.2,H*.35,W*.6,H*.12);
  for(let i=0;i<=5;i++){const x=W*.2+i*W*.12;g.beginPath();g.moveTo(x,H*.35);g.lineTo(x,H*.5);g.stroke();T(String(i*2),x,H*.58,11)}
  const nx=W*.2+((S.n||6)/10)*W*.6;g.fillStyle=C.rd;g.beginPath();g.moveTo(nx,H*.33);g.lineTo(nx-6,H*.25);g.lineTo(nx+6,H*.25);g.closePath();g.fill();
  T(S.picked==null?'What mass does the pointer show?':'Picked '+S.picked+' cubes',W/2,H*.85,A.narrow?12:14,{c:C.mu})}
 if(k==='idea'){T('Tap the true sentence',W/2,H*.1,A.narrow?15:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{n:0,want:4,tip:1,picked:null,said:0,gram:0,opts:[],check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*280))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='balance'){btn('Apple heavier',()=>{S.picked='Apple';A.sound.tick();say('Apple side down');A.redraw();S.check()},'Apple is heavier');btn('Feather heavier',()=>{S.picked='Feather';A.sound.miss();say('Feather is lighter');A.redraw()},'Feather is heavier — wrong')}
 if(kind()==='cubes'){btn('+ Add cube',()=>{if(S.n<8){S.n++;A.sound.tick();say(S.n+' cubes');A.redraw();S.check()}},'Add one cube');btn('− Remove cube',()=>{if(S.n>0){S.n--;A.sound.tick();say(S.n+' cubes');A.redraw();S.check()}},'Remove one cube')}
 if(kind()==='record'){btn('Write cube count',()=>{S.said=1;A.sound.tick();say(S.want+' cubes');A.redraw();S.check()},'Record how many cubes');btn('Mark grams',()=>{S.gram=1;A.sound.tick();say('Grams on a scale');A.redraw();S.check()},'Mark gram unit')}
 if(kind()==='biglight'){btn('Balloon heavier',()=>{S.picked='Balloon';A.sound.miss();say('Big does not mean heavy');A.redraw()},'Balloon heavier — wrong');btn('Stone heavier',()=>{S.picked='Stone';A.sound.tick();say('Stone is heavier — measure!');A.redraw();S.check()},'Stone is heavier')}
 if(kind()==='scale'){btn('4 cubes',()=>{S.picked=4;A.sound.miss();say('Pointer is not at 4');A.redraw()},'Read 4');btn('6 cubes',()=>{S.picked=6;A.sound.tick();say('Pointer at 6');A.redraw();S.check()},'Read 6');btn('10 cubes',()=>{S.picked=10;A.sound.miss();say('Pointer is not at 10');A.redraw()},'Read 10')}
 if(kind()==='idea')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function down(p){if(kind()==='chal')return false;S.drag=1;
 if(kind()==='balance'){S.picked=p.x<A.W/2?'Apple':'Feather';if(S.picked==='Apple'){A.sound.tick();S.check()}else A.sound.miss();A.redraw();return true}
 if(kind()==='cubes'){if(p.x>A.W/2){if(S.n<8)S.n++}else if(S.n>0)S.n--;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='record'){if(p.y<A.H/2)S.said=1;else S.gram=1;A.redraw();S.check();return true}
 if(kind()==='biglight'){S.picked=p.x<A.W/2?'Balloon':'Stone';if(S.picked==='Stone'){A.sound.tick();S.check()}else A.sound.miss();A.redraw();return true}
 if(kind()==='scale'){S.picked=p.x<A.W*.4?4:p.x<A.W*.7?6:10;if(S.picked===6){A.sound.tick();S.check()}else A.sound.miss();A.redraw();return true}
 return true}
function move(){}
function up(){S.drag=0}
const steps=[
{h:'Balance tip',p:'On a balance, the heavier side goes down. That tip tells you which object has more mass before you count units.',
 predict:{q:'On a balance, the heavier side…',opts:['goes down','floats up','stays level always'],ans:0},
 task:'Pick the heavier apple side',show:()=>auto(0,[()=>{S.picked='Apple';A.redraw();S.check()}]),
 go:()=>{reset({tip:1,picked:null});say('Which side is heavier?');controls();S.check=finish(0,()=>S.picked==='Apple','Apple side goes down — more mass than the feather.')}},
{h:'Balance with cubes',p:'Mass can be measured with equal cubes. Add cubes until both sides balance — that cube count is the mass in non-standard units.',
 predict:{q:'To measure mass with cubes…',opts:['add equal cubes until it balances','only look at how big it is','guess without a balance'],ans:0},
 task:'Add cubes until you have 4',show:()=>auto(1,[()=>{S.n=4;A.redraw();S.check()}]),
 go:()=>{reset({n:0,want:4});say('Add cubes until the book balances.');controls();S.check=finish(1,()=>S.n===4,'4 equal cubes balance the book — mass is 4 cubes.')}},
{h:'Record the mass',p:'Write the mass with a number and a unit — for example 4 cubes. Simple scales may also show grams.',
 predict:{q:'A mass record needs…',opts:['a number and a unit','only a pretty drawing','the word light alone'],ans:0},
 task:'Record the cube count and mark grams',show:()=>auto(2,[()=>{S.said=1;S.gram=1;A.redraw();S.check()}]),
 go:()=>{reset({want:4,said:0,gram:0});say('Write the measure and mark grams.');controls();S.check=finish(2,()=>S.said&&S.gram,'Recorded as 4 cubes; grams name standard mass units.')}},
{h:'Big ≠ heavy',p:'A big balloon can be lighter than a small stone. Size is not mass — measure on a balance.',
 predict:{q:'A bigger object…',opts:['might be lighter than a smaller one','is always heavier','never needs measuring'],ans:0},
 task:'Pick the heavier stone',show:()=>auto(3,[()=>{S.picked='Stone';A.redraw();S.check()}]),
 go:()=>{reset({picked:null});say('Which is heavier — big balloon or small stone?');controls();S.check=finish(3,()=>S.picked==='Stone','The stone is heavier. Measure — do not trust size alone.')}},
{h:'Read a scale',p:'A simple scale pointer shows mass in units. Read the number the pointer aims at.',
 predict:{q:'A scale pointer shows…',opts:['the mass in units','only the colour','how tall the object is'],ans:0},
 task:'Read 6 cubes on the scale',show:()=>auto(4,[()=>{S.n=6;S.picked=6;A.redraw();S.check()}]),
 go:()=>{reset({n:6,picked:null});say('What mass does the pointer show?');controls();S.check=finish(4,()=>S.picked===6,'Pointer at 6 — the mass reading is 6 cubes.')}},
{h:'True sentence',p:'Pick the sentence that matches fair mass measuring.',
 predict:{q:'Mass is measured by…',opts:['balancing equal units (or reading grams)','only guessing from size','how splashy water looks'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Balance with equal cubes; record number + unit (or grams)','Bigger always means heavier','Mass is the same as how tall something is'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Mass = how heavy, measured in equal units on a balance or scale.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Mass means…',[['how heavy something is','ok'],['how tall something is','tall'],['how full a cup looks now','full']]],
 ['To measure with cubes…',[['add equal cubes until it balances','ok'],['use random different sizes','random'],['never use a balance','never']]],
 ['On a balance, the heavier side…',[['goes down','ok'],['always floats up','up'],['cannot be compared','cant']]],
 ['A mass record needs…',[['a number and a unit','ok'],['only a doodle','doodle'],['the word empty alone','empty']]],
 ['A big balloon…',[['might be lighter than a small stone','ok'],['is always the heaviest','heaviest'],['cannot be measured','cant2']]],
 ['Grams are…',[['standard units for mass','ok'],['only used for length','length'],['the same as counting leaves','leaves']]],
 ['Why not trust size alone?',[['measure on a balance with equal units','ok'],['bigger always wins','wins'],['cubes never help','nohelp']]]];
function why(t){let m='Mass is how heavy something is — balance equal cubes or read grams on a scale.';
 if(t==='tall'||t==='full'||t==='heaviest'||t==='wins')m='Size or how full something looks is not mass. A big light thing can lose to a small heavy thing — measure.';
 if(t==='random'||t==='never'||t==='nohelp'||t==='cant'||t==='cant2'||t==='up')m='Use equal cubes on a balance until both sides level. The heavier pan goes down.';
 if(t==='doodle'||t==='empty'||t==='length'||t==='leaves')m='Write a number with a unit (cubes or grams). Grams are for mass, not length.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Mass measuring controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:up});controls()}});
A.start()})})();
