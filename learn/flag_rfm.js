/* Flagship: relative formula mass Mr (ages 14–16; GCSE). Mr is the sum of relative atomic masses Ar of every atom
   in the formula. Count atoms carefully when brackets multiply a group (Ca(OH)₂ → Ca + 2O + 2H). Percentage by mass
   of an element = (total Ar of that element / Mr) × 100. Common slips: forgetting bracket multipliers; using Ar once
   for O₂; mixing Mr with molar mass units narrative; % as Ar/Mr without ×100. */
(()=>{
VIS.reg('flagrfm',c=>{let A,ctl,chal,qi=-1,run=0;const S={};
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['ar','sum','bracket','pct','trap','build','chal'][A.step];
const AR={H:1,C:12,N:14,O:16,Na:23,Mg:24,Al:27,S:32,Cl:35.5,K:39,Ca:40,Fe:56,Cu:63.5};
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#ecfccb',C.dark?.08:.3);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Mr = sum of every Ar in the formula',W/2,H*.35,A.narrow?13:16,{w:900});T('Brackets multiply the group inside.',W/2,H*.55,A.narrow?12:15,{w:800});A.fx.draw(g);return}
 if(k==='ar'){T('Tap each atom to add its Ar',W/2,H*.08,A.narrow?13:16,{w:800});
  T(S.formula||'CO₂',W/2,H*.22,A.narrow?22:28,{w:900});
  (S.atoms||[]).forEach((a,i)=>{const x=W*.18+i*W*.22,y=H*.5;const on=S.got&&S.got[i];g.fillStyle=on?A.alpha(C.gr,.4):A.alpha(C.tx,.08);g.fillRect(x-W*.09,y-H*.1,W*.18,H*.2);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x-W*.09,y-H*.1,W*.18,H*.2);T(a,x,y,A.narrow?14:16,{w:800})});
  T(`Running total: ${S.tot||0}`,W/2,H*.82,A.narrow?14:17,{c:C.mu})}
 if(k==='sum'){T('Choose the correct Mr',W/2,H*.1,A.narrow?14:17,{w:800});
  T(S.formula||'',W/2,H*.3,A.narrow?20:26,{w:900});
  (S.opts||[]).forEach((t,i)=>{const y=H*.5+i*H*.12;g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(W*.15,y-H*.05,W*.7,H*.1);g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(W*.15,y-H*.05,W*.7,H*.1);T(String(t),W/2,y,A.narrow?14:16,{w:700})})}
 if(k==='bracket'){T('Expand the brackets, then sum',W/2,H*.08,A.narrow?13:16,{w:800});
  T(S.formula||'Ca(OH)₂',W/2,H*.24,A.narrow?20:24,{w:900});
  T(S.expand||'Tap Expand',W/2,H*.4,A.narrow?13:15,{c:C.mu,max:W*.92});
  (S.opts||[]).forEach((t,i)=>{const y=H*.55+i*H*.12;g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(W*.15,y-H*.05,W*.7,H*.1);g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(W*.15,y-H*.05,W*.7,H*.1);T(String(t),W/2,y,A.narrow?14:16,{w:700})})}
 if(k==='pct'){T('% by mass of an element',W/2,H*.08,A.narrow?13:16,{w:800});
  T(S.prompt||'',W/2,H*.28,A.narrow?13:15,{w:700,max:W*.92});
  (S.opts||[]).forEach((t,i)=>{const y=H*.48+i*H*.13;g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(W*.12,y-H*.05,W*.76,H*.11);g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(W*.12,y-H*.05,W*.76,H*.11);T(String(t),W/2,y,A.narrow?13:15,{w:700})})}
 if(k==='trap'){T('Spot the counting mistake',W/2,H*.08,A.narrow?13:16,{w:800});
  T(S.scene||'',W/2,H*.3,A.narrow?13:15,{w:700,max:W*.92});
  (S.opts||[]).forEach((t,i)=>{const y=H*.5+i*H*.13;g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(W*.1,y-H*.05,W*.8,H*.11);g.strokeStyle=C.tx;g.lineWidth=1.5;g.strokeRect(W*.1,y-H*.05,W*.8,H*.11);T(t,W/2,y,A.narrow?12:14,{w:700,max:W*.76})})}
 if(k==='build'){T('Build Mr for H₂SO₄',W/2,H*.08,A.narrow?14:17,{w:800});
  [['2×H (2)',S.h],['1×S (32)',S.s],['4×O (64)',S.o]].forEach((p,i)=>{const y=H*.3+i*H*.16;g.fillStyle=p[1]?A.alpha(C.gr,.4):A.alpha(C.tx,.08);g.fillRect(W*.15,y-H*.06,W*.7,H*.12);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.15,y-H*.06,W*.7,H*.12);T((p[1]?'✓ ':'○ ')+p[0],W/2,y,A.narrow?13:15,{w:700})});
  T(S.h&&S.s&&S.o?'Mr = 98':'Add each atom contribution',W/2,H*.88,A.narrow?12:14,{c:C.mu})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{got:{},tot:0,picked:null,expand:'',formula:'',atoms:[],opts:[],prompt:'',scene:'',h:0,s:0,o:0,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*260))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='ar'){(S.atoms||[]).forEach((a,i)=>btn(a+' Ar='+AR[a.replace(/\d/g,'')||a],()=>{if(S.got[i])return;S.got[i]=1;const el=a.replace(/\d/g,'')||a;S.tot=(S.tot||0)+AR[el];A.sound.tick();say(el+' contributes '+AR[el]);A.redraw();S.check()},'Add '+a))}
 if(kind()==='sum'||kind()==='bracket'||kind()==='pct'||kind()==='trap'){(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();A.redraw();S.check()},String(t)))}
 if(kind()==='bracket'){btn('Expand brackets',()=>{S.expand='Ca + 2×O + 2×H';A.sound.tick();say(S.expand);A.redraw()},'Expand brackets')}
 if(kind()==='build'){btn('Add 2×H',()=>{S.h=1;A.sound.tick();A.redraw();S.check()},'Add hydrogen');btn('Add S',()=>{S.s=1;A.sound.tick();A.redraw();S.check()},'Add sulfur');btn('Add 4×O',()=>{S.o=1;A.sound.tick();A.redraw();S.check()},'Add oxygen')}
}
function down(p){if(kind()==='chal')return false;S.drag=1;return true}
function move(p){if(!S.drag)return;
 if(kind()==='ar'){const i=Math.floor((p.x-A.W*.09)/(A.W*.22));if(i>=0&&i<(S.atoms||[]).length&&!S.got[i]){S.got[i]=1;const el=(S.atoms[i]||'').replace(/\d/g,'');S.tot=(S.tot||0)+(AR[el]||0);A.redraw()}}
 if(kind()==='sum'||kind()==='bracket'||kind()==='pct'||kind()==='trap'){const base=kind()==='pct'?A.H*.43:A.H*.45;const i=Math.floor((p.y-base)/(A.H*.12));if(i>=0&&i<(S.opts||[]).length){S.picked=i;A.redraw()}}
 if(kind()==='build'){const i=Math.floor((p.y-A.H*.22)/(A.H*.16));if(i===0)S.h=1;if(i===1)S.s=1;if(i===2)S.o=1;A.redraw()}
}
function up(){if(kind()!=='chal')S.check();S.drag=0}
const steps=[
{h:'Add each Ar',p:'Relative formula mass Mr is the sum of the relative atomic masses Ar of every atom in the formula. C=12, O=16.',
 predict:{q:'For CO₂ you must add oxygen…',opts:['twice (16+16)','once only','never'],ans:0},
 task:'Tap C and both O atoms to total Mr for CO₂',show:()=>auto(0,[()=>{S.got={0:1,1:1,2:1};S.tot=44;A.redraw();S.check()}]),
 go:()=>{reset({formula:'CO₂',atoms:['C','O','O'],got:{},tot:0});say('Add Ar for each atom in CO₂.');controls();S.check=finish(0,()=>Object.keys(S.got).length>=3&&S.tot===44,'Mr(CO₂)=12+16+16=44.')}},
{h:'Pick the Mr',p:'H₂O: 2×1 + 16 = 18. NaCl: 23+35.5 = 58.5. Always count every atom shown by the formula.',
 predict:{q:'Mr(H₂O) is…',opts:['18','17','32'],ans:0},
 task:'Choose Mr for H₂O',show:()=>auto(1,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({formula:'H₂O',opts:[18,17,2],picked:null});say('What is Mr of water?');controls();S.check=finish(1,()=>S.picked===0,'Mr(H₂O)=2×1+16=18.')}},
{h:'Brackets multiply',p:'In Ca(OH)₂ the ₂ multiplies everything inside the brackets: Ca + 2O + 2H. Ar: Ca=40, O=16, H=1 → Mr=74.',
 task:'Expand then choose Mr for Ca(OH)₂',show:()=>auto(2,[()=>{S.expand='Ca + 2×O + 2×H';S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({formula:'Ca(OH)₂',expand:'',opts:[74,57,40],picked:null});say('Expand brackets, then pick Mr.');controls();S.check=finish(2,()=>S.picked===0,'Mr(Ca(OH)₂)=40+32+2=74.')}},
{h:'Percentage by mass',p:'Percentage by mass of an element = (total Ar of that element ÷ Mr) × 100. For O in CO₂: (32/44)×100 ≈ 72.7%.',
 predict:{q:'% by mass needs…',opts:['(element total Ar / Mr)×100','Ar only','Mr − Ar'],ans:0},
 task:'Choose % by mass of O in CO₂',show:()=>auto(3,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({prompt:'% by mass of oxygen in CO₂ (Mr=44)',opts:['(32/44)×100 ≈ 72.7%','16/44 without ×100','12/44 ×100'],picked:null});say('Pick the correct % by mass.');controls();S.check=finish(3,()=>S.picked===0,'Use both oxygens: 32/44 × 100.')}},
{h:'Catch the trap',p:'A common mistake: treating O₂ in a formula as one oxygen, or ignoring the bracket multiplier.',
 task:'Name the mistake in the wrong working',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({scene:'Someone writes Mr(CO₂)=12+16=28',opts:['Forgot the second oxygen','Used the wrong Ar for C','Added an extra calcium'],picked:null});say('What went wrong?');controls();S.check=finish(4,()=>S.picked===0,'CO₂ has two oxygens: 12+16+16=44, not 28.')}},
{h:'Build H₂SO₄',p:'Sulfuric acid H₂SO₄: 2×H + S + 4×O = 2+32+64 = 98.',
 task:'Add each contribution until Mr=98',show:()=>auto(5,[()=>{S.h=S.s=S.o=1;A.redraw();S.check()}]),
 go:()=>{reset();say('Build Mr for H₂SO₄.');controls();S.check=finish(5,()=>S.h&&S.s&&S.o,'Mr(H₂SO₄)=2+32+64=98.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Mr means…',[['sum of every Ar in the formula','ok'],['only the biggest Ar','big'],['number of bonds only','bonds']]],
 ['Mr(CO₂) is…',[['44','ok'],['28','28'],['12','12']]],
 ['In Ca(OH)₂ the ₂ multiplies…',[['everything inside the brackets','ok'],['only the calcium','ca'],['nothing','nothing']]],
 ['% by mass of an element uses…',[['(element Ar total / Mr)×100','ok'],['Mr alone','mr'],['Ar − Mr','sub']]],
 ['Mr(H₂O) is…',[['18','ok'],['17','17'],['16','16']]],
 ['Forgetting a bracket multiplier…',[['undercounts atoms and Mr','ok'],['always raises Mr','raise'],['has no effect','none']]],
 ['Mr(H₂SO₄) is…',[['98','ok'],['49','49'],['64','64']]]];
function why(t){let m='Mr is the sum of Ar for every atom. Brackets multiply the group. % by mass = (element total / Mr)×100.';
 if(t==='big')m='You add every atom\'s Ar, not only the largest.';
 if(t==='bonds')m='Mr counts atoms\' Ar values, not the number of bonds.';
 if(t==='28')m='CO₂ has two oxygens: 12+16+16=44, not 12+16.';
 if(t==='12')m='12 is only carbon. Add both oxygens too.';
 if(t==='ca')m='The subscript after brackets multiplies O and H, not only Ca.';
 if(t==='nothing')m='Ca(OH)₂ means two hydroxide groups: 2O and 2H.';
 if(t==='mr')m='You need the element\'s Ar total divided by Mr, then ×100.';
 if(t==='sub')m='Do not subtract. Divide element total by Mr, then multiply by 100.';
 if(t==='17')m='Two hydrogens contribute 2, not 1: 2+16=18.';
 if(t==='16')m='16 is only oxygen. Include 2×H.';
 if(t==='raise')m='Missing a multiplier makes Mr too small, not larger.';
 if(t==='none')m='Ignoring brackets undercounts atoms, so Mr is wrong.';
 if(t==='49')m='H₂SO₄ is 2+32+64=98, not half of that.';
 if(t==='64')m='64 is only the oxygen part. Add 2×H and S as well.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Mr controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>move(p),up:p=>up(p||{x:0,y:0})});controls()}});
A.start()})})();
