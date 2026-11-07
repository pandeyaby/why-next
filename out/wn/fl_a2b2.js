/* Flagship: Factorising a difference of two squares (ages 14–16; a² − b² = (a+b)(a−b); CCSS A-SSE.2).
   Spot square terms, write (a+b)(a−b), handle coefficients like 9x²−25, reject x²+49.
   Distinct from flagsqr (area model / geometric identity demo). */
(()=>{
VIS.reg('flaga2b2',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['id','simp','coef','reject','myth','order','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function tile(g,W,H,x,y,w,h,lab,on){const C=A.col;g.fillStyle=on?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(x,y,w,h);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x,y,w,h);T(lab,x+w/2,y+h/2,A.narrow?12:14,{w:800,max:w-8})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#fce7f3',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Difference of squares',W/2,H*.3,A.narrow?14:17,{w:900});T('a² − b² = (a + b)(a − b)',W/2,H*.52,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='id'){T(S.title||'The identity',W/2,H*.1,A.narrow?13:15,{w:800});
  T(S.showId?'a² − b² = (a + b)(a − b)':'Tap to reveal the factorisation',W/2,H*.4,A.narrow?15:18,{w:900});
  T(S.msg||'Two square terms, linked by a minus.',W/2,H*.7,13,{c:C.mu,max:W*.9})}
 if(k==='simp'){T(S.title||'Factorise x² − 49',W/2,H*.08,A.narrow?13:15,{w:800});
  T('x² − 7²',W/2,H*.28,16,{w:800});
  tile(g,W,H,W*.08,H*.45,W*.38,H*.2,'(x + 7)',S.pick===0);
  tile(g,W,H,W*.54,H*.45,W*.38,H*.2,'(x − 7)',S.pick===1);
  T(S.done?('= (x + 7)(x − 7)'):(S.msg||'Tap both brackets'),W/2,H*.82,13,{c:C.mu,max:W*.9})}
 if(k==='coef'){T(S.title||'With coefficients',W/2,H*.08,A.narrow?13:15,{w:800});
  T('9x² − 25 = (3x)² − 5²',W/2,H*.28,A.narrow?13:15,{w:800});
  T(S.cOn?('= (3x + 5)(3x − 5)'):(S.msg||'Write roots as 3x and 5'),W/2,H*.55,A.narrow?14:16,{w:800})}
 if(k==='reject'){T(S.title||'When it does NOT work',W/2,H*.1,A.narrow?13:15,{w:800});
  T('x² + 49',W/2,H*.32,18,{w:900});
  T(S.rejOn?('Sum of squares — not a² − b² over the reals'):(S.msg||'Why can this not factorise that way?'),W/2,H*.6,13,{c:C.mu,max:W*.9})}
 if(k==='myth'||k==='order'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(String(t),W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{showId:0,pick:null,seenA:0,seenB:0,done:0,cOn:0,rejOn:0,picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function markBracket(which){if(which===0)S.seenA=1;if(which===1)S.seenB=1;S.pick=which;if(S.seenA&&S.seenB){S.done=1;S.msg='(x + 7)(x − 7)'}A.sound.tick();A.redraw();S.check()}
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='id'){btn('Show a² − b² = (a+b)(a−b)',()=>{S.showId=1;S.msg='Factorise as a sum times a difference.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Reveal identity');
  btn('Reset',()=>{S.showId=0;A.redraw()},'Reset')}
 if(kind()==='simp'){btn('(x + 7)',()=>markBracket(0),'Mark plus bracket');btn('(x − 7)',()=>markBracket(1),'Mark minus bracket');
  btn('Reset',()=>{S.seenA=0;S.seenB=0;S.done=0;S.pick=null;A.redraw()},'Reset')}
 if(kind()==='coef'){btn('Show (3x + 5)(3x − 5)',()=>{S.cOn=1;S.msg='Root of 9x² is 3x; root of 25 is 5.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Factorise coefficients');
  btn('Reset',()=>{S.cOn=0;A.redraw()},'Reset')}
 if(kind()==='reject'){btn('Sum of squares — no',()=>{S.rejOn=1;S.msg='Plus means it is not a difference of squares.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Reject sum');
  btn('Reset',()=>{S.rejOn=0;A.redraw()},'Reset')}
 if(kind()==='myth'||kind()==='order')(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say(String(t));A.redraw();S.check()},'Pick '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='id'){S.showId=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='simp'){markBracket(p.x<A.W/2?0:1);return true}
 if(kind()==='coef'){S.cOn=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='reject'){S.rejOn=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='myth'||kind()==='order'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'The identity',p:'A difference of two squares factorises as a² − b² = (a + b)(a − b). You need two perfect-square terms joined by a minus.',
 predict:{q:'a² − b² factorises as…',opts:['(a + b)(a − b)','(a − b)²','(a + b)²'],ans:0},
 task:'Reveal a² − b² = (a+b)(a−b)',show:()=>auto(0,[()=>{S.showId=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Identity',msg:'Show the factorisation pattern.'});say('Reveal the identity.');controls();S.check=finish(0,()=>!!S.showId,'a² − b² = (a + b)(a − b).')}},
{h:'Simple case',p:'x² − 49 is x² − 7², so it factorises as (x + 7)(x − 7). Check by expanding: the middle terms cancel.',
 predict:{q:'x² − 49 equals…',opts:['(x + 7)(x − 7)','(x − 7)²','(x + 49)(x − 1)'],ans:0},
 task:'Mark both (x+7) and (x−7)',show:()=>auto(1,[()=>{S.seenA=1;S.seenB=1;S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'x² − 49',msg:'Tap each bracket factor.'});say('Build the factors.');controls();S.check=finish(1,()=>!!S.done,'(x + 7)(x − 7).')}},
{h:'Coefficients',p:'9x² − 25 is (3x)² − 5², so (3x + 5)(3x − 5). Take square roots of both square terms, including any coefficient on x.',
 predict:{q:'9x² − 25 factorises as…',opts:['(3x + 5)(3x − 5)','(9x + 5)(x − 5)','(3x − 5)²'],ans:0},
 task:'Show (3x + 5)(3x − 5)',show:()=>auto(2,[()=>{S.cOn=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Coefficients',msg:'Root each square term.'});say('Factorise with coefficients.');controls();S.check=finish(2,()=>!!S.cOn,'(3x + 5)(3x − 5).')}},
{h:'Sums do not factorise this way',p:'x² + 49 is a sum of squares, not a difference. Over the real numbers it does not factorise with this pattern.',
 predict:{q:'Why does x² + 49 not use a² − b²?',opts:['it is a sum, not a difference','49 is not a square','x² is not a square'],ans:0},
 task:'Mark that the sum does not factorise this way',show:()=>auto(3,[()=>{S.rejOn=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Reject the sum',msg:'Explain why + blocks the pattern.'});say('Catch the sum.');controls();S.check=finish(3,()=>!!S.rejOn,'Need a minus between squares.')}},
{h:'Catch a mix-up',p:'Slips: writing (a − b)² for a² − b²; treating x² + 49 as a difference; taking √(9x²) as 9x instead of 3x; forgetting the second bracket.',
 predict:{q:'Which is the mix-up?',opts:['a² − b² = (a − b)²','a² − b² = (a + b)(a − b)','9x² − 25 = (3x + 5)(3x − 5)'],ans:0},
 task:'Tap the mix-up',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['a² − b² = (a − b)²','a² − b² = (a + b)(a − b)','9x² − 25 = (3x + 5)(3x − 5)'],picked:null});say('Find the mix-up.');controls();S.check=finish(4,()=>S.picked===0,'(a − b)² expands to a² − 2ab + b².')}},
{h:'Order the method',p:'Order: check both terms are squares → confirm the sign is minus → write (√first + √second)(√first − √second) → expand to check.',
 predict:{q:'Correct first step is…',opts:['check both terms are perfect squares','always write (x − n)²','ignore the sign'],ans:0},
 task:'Tap the correct first step',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Method order',opts:['check both terms are perfect squares','always write (x − n)²','ignore the sign'],picked:null});say('Pick the first step.');controls();S.check=finish(5,()=>S.picked===0,'Squares first, then the minus.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['a² − b² equals…',[['(a + b)(a − b)','ok'],['(a − b)²','sq'],['(a + b)²','sq']]],
 ['x² − 64?',[['(x + 8)(x − 8)','ok'],['(x − 8)²','sq'],['(x + 64)(x − 1)','miss']]],
 ['4x² − 81?',[['(2x + 9)(2x − 9)','ok'],['(4x + 9)(x − 9)','coef'],['(2x − 9)²','sq']]],
 ['x² + 36 factorises as a² − b²?',[['no — it is a sum','ok'],['yes as (x + 6)(x − 6)','sum'],['yes as (x − 6)²','sq']]],
 ['Which is the mix-up?',[['a² − b² = (a − b)²','ok'],['a² − b² = (a + b)(a − b)','true'],['need a minus','true']]],
 ['First step?',[['check both are squares','ok'],['write (x − n)² always','sq'],['ignore the sign','miss']]],
 ['√(9x²) as a factor part is…',[['3x','ok'],['9x','coef'],['x only','miss']]]];
function why(t){let m='Use a² − b² = (a + b)(a − b). Both terms must be squares with a minus between them.';
 if(t==='sq')m='(a − b)² is a² − 2ab + b², not a difference of squares. You need both a sum and a difference bracket.';
 if(t==='coef')m='Take the square root of the coefficient too: √(9x²) = 3x, not 9x.';
 if(t==='sum')m='A plus sign means a sum of squares — this pattern needs a minus.';
 if(t==='miss')m='Read both square roots carefully and keep the minus between the original terms.';
 if(t==='true')m='That statement is true — not the mix-up.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Difference of squares controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
