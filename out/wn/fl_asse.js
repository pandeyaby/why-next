/* Flagship: Interpreting parts of an expression in context (ages 14–16; CCSS A-SSE.1).
   Map terms, factors and coefficients onto a real situation; treat a bracket as one quantity;
   spot which part controls rate. Distinct from flagreveal (rewrite equivalent forms) and flaglmod (build a model). */
(()=>{
VIS.reg('flagasse',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['fare','growth','factor','rate','myth','order','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function chip(g,W,H,x,y,w,h,lab,on){const C=A.col;g.fillStyle=on?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(x,y,w,h);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x,y,w,h);T(lab,x+w/2,y+h/2,A.narrow?12:14,{w:800,max:w-8})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.08:.4);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Parts in context',W/2,H*.3,A.narrow?14:17,{w:900});T('term · factor · coefficient → meaning',W/2,H*.52,A.narrow?11:13,{c:C.mu});A.fx.draw(g);return}
 if(k==='fare'){T(S.title||'Taxi: 3 + 1.5m',W/2,H*.08,A.narrow?13:15,{w:800});
  T('3 + 1.5m',W/2,H*.28,A.narrow?18:22,{w:900});
  chip(g,W,H,W*.08,H*.48,W*.38,H*.2,'3 = flag fall',S.part===0);
  chip(g,W,H,W*.54,H*.48,W*.38,H*.2,'1.5 = £ per mile',S.part===1);
  T(S.msg||'Tap which part is the flag fall.',W/2,H*.85,12,{c:C.mu,max:W*.92})}
 if(k==='growth'){T(S.title||'P(1 + r)^n',W/2,H*.08,A.narrow?13:15,{w:800});
  T('P(1 + r)ⁿ',W/2,H*.26,A.narrow?18:22,{w:900});
  chip(g,W,H,W*.06,H*.42,W*.28,H*.22,'P start',S.part===0);
  chip(g,W,H,W*.36,H*.42,W*.28,H*.22,'(1+r) factor',S.part===1);
  chip(g,W,H,W*.66,H*.42,W*.28,H*.22,'n periods',S.part===2);
  T(S.msg||'Which part is the growth factor?',W/2,H*.82,12,{c:C.mu,max:W*.92})}
 if(k==='factor'){T(S.title||'Bracket as one quantity',W/2,H*.08,A.narrow?13:15,{w:800});
  T('2(x + 5) = 2 × (x + 5)',W/2,H*.32,A.narrow?14:17,{w:800});
  T(S.oneOn?'Treat (x + 5) as a single factor.':(S.msg||'See the bracket as one lump.'),W/2,H*.58,13,{c:C.mu,max:W*.9})}
 if(k==='rate'){T(S.title||'What controls the rate?',W/2,H*.08,A.narrow?13:15,{w:800});
  T('Cost = 20 + 4h',W/2,H*.28,16,{w:800});
  T(S.rateOn?'The 4 (coefficient of h) sets £ per hour.':(S.msg||'Which number is the hourly rate?'),W/2,H*.55,13,{c:C.mu,max:W*.9})}
 if(k==='myth'||k==='order'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(String(t),W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{part:null,oneOn:0,rateOn:0,picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='fare'){btn('3 is flag fall',()=>{S.part=0;S.msg='3 is the fixed flag-fall charge.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Mark flag fall');
  btn('1.5 is per mile',()=>{S.part=1;S.msg='1.5 is pounds per mile.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Mark rate')}
 if(kind()==='growth'){btn('P is start',()=>{S.part=0;A.sound.tick();say('P is starting amount');A.redraw();S.check()},'P');
  btn('(1+r) growth factor',()=>{S.part=1;S.msg='(1+r) is the growth factor each period.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Growth factor');
  btn('n periods',()=>{S.part=2;A.sound.tick();say('n counts periods');A.redraw();S.check()},'n')}
 if(kind()==='factor'){btn('Treat bracket as one',()=>{S.oneOn=1;S.msg='(x+5) is one factor multiplied by 2.';A.sound.tick();say(S.msg);A.redraw();S.check()},'One quantity');
  btn('Reset',()=>{S.oneOn=0;A.redraw()},'Reset')}
 if(kind()==='rate'){btn('Show hourly rate = 4',()=>{S.rateOn=1;S.msg='Coefficient 4 is pounds per hour.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Mark rate');
  btn('Reset',()=>{S.rateOn=0;A.redraw()},'Reset')}
 if(kind()==='myth'||kind()==='order')(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say(String(t));A.redraw();S.check()},'Pick '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='fare'){S.part=p.x<A.W/2?0:1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='growth'){const i=Math.max(0,Math.min(2,Math.floor((p.x-A.W*.06)/(A.W*.3))));S.part=i;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='factor'){S.oneOn=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='rate'){S.rateOn=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='myth'||kind()==='order'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Taxi fare parts',p:'In 3 + 1.5m, the term 3 is the flag-fall (fixed start). The coefficient 1.5 is pounds per mile. m is miles travelled.',
 predict:{q:'In 3 + 1.5m, the 1.5 means…',opts:['pounds per mile','total miles only','the flag fall'],ans:0},
 task:'Mark the flag-fall term (3)',show:()=>auto(0,[()=>{S.part=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Taxi parts',msg:'Tap the flag-fall term.'});say('Interpret the taxi formula.');controls();S.check=finish(0,()=>S.part===0,'3 is the fixed flag fall.')}},
{h:'Growth factor',p:'In P(1 + r)ⁿ, P is the starting amount, (1 + r) is the growth factor each period, and n counts periods. The bracket is one quantity.',
 predict:{q:'In P(1+r)ⁿ the growth factor is…',opts:['(1 + r)','P alone','only n'],ans:0},
 task:'Mark the growth factor (1+r)',show:()=>auto(1,[()=>{S.part=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Growth parts',msg:'Tap the growth factor.'});say('Find the growth factor.');controls();S.check=finish(1,()=>S.part===1,'(1+r) is the growth factor.')}},
{h:'Bracket as one factor',p:'Complicated parts can be one quantity. In 2(x + 5), the factor (x + 5) is a single lump multiplied by 2.',
 predict:{q:'In 2(x+5), (x+5) is…',opts:['one factor (a single quantity)','two unrelated answers','only the coefficient'],ans:0},
 task:'Treat (x+5) as one quantity',show:()=>auto(2,[()=>{S.oneOn=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'One quantity',msg:'See the bracket as one factor.'});say('Bracket as one lump.');controls();S.check=finish(2,()=>!!S.oneOn,'(x+5) is one factor.')}},
{h:'What sets the rate?',p:'In Cost = 20 + 4h, the coefficient 4 is the hourly rate. The 20 is a fixed start. Changing 4 changes how fast cost grows with h.',
 predict:{q:'Which part controls the hourly rate?',opts:['the coefficient 4','only the 20','the letter h alone'],ans:0},
 task:'Show that 4 is the hourly rate',show:()=>auto(3,[()=>{S.rateOn=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Rate control',msg:'Find what sets £ per hour.'});say('Spot the rate.');controls();S.check=finish(3,()=>!!S.rateOn,'4 is pounds per hour.')}},
{h:'Catch a mix-up',p:'Slips: calling every number a “rate”; treating (1+r) as two separate addends you ignore; saying P is the growth factor.',
 predict:{q:'Which is the mix-up?',opts:['P is the growth factor in P(1+r)ⁿ','(1+r) is the growth factor','3 in 3+1.5m can be a flag fall'],ans:0},
 task:'Tap the mix-up',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['P is the growth factor in P(1+r)ⁿ','(1+r) is the growth factor','3 in 3+1.5m can be a flag fall'],picked:null});say('Find the mix-up.');controls();S.check=finish(4,()=>S.picked===0,'P is the start; (1+r) grows it.')}},
{h:'Order the reading',p:'Order: name the situation → map each term/factor/coefficient to a meaning → say which part controls rate or start.',
 predict:{q:'Best first step is…',opts:['name what the formula models','multiply every number together','ignore the letters'],ans:0},
 task:'Tap the best first step',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Reading order',opts:['name what the formula models','multiply every number together','ignore the letters'],picked:null});say('Pick the first step.');controls();S.check=finish(5,()=>S.picked===0,'Start from the real situation.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['In 3+1.5m, 1.5 means…',[['£ per mile','ok'],['flag fall','fix'],['miles only','var']]],
 ['Growth factor in P(1+r)ⁿ?',[['(1+r)','ok'],['P','start'],['n alone','var']]],
 ['In 2(x+5), (x+5) is…',[['one factor','ok'],['two final answers','split'],['only a coefficient','coef']]],
 ['In 20+4h, hourly rate is…',[['4','ok'],['20','fix'],['h alone','var']]],
 ['Which is the mix-up?',[['P is the growth factor','ok'],['(1+r) grows each period','true'],['3 can be flag fall','true']]],
 ['First step?',[['name the situation','ok'],['multiply all numbers','mul'],['ignore letters','var']]],
 ['Coefficient means…',[['number multiplying a variable','ok'],['always the total cost','fix'],['the letter itself','var']]]];
function why(t){let m='Map each term, factor and coefficient onto the real situation.';
 if(t==='fix')m='A fixed start (flag fall / standing charge) is not the per-unit rate.';
 if(t==='var')m='The variable counts how many; the coefficient sets the rate per count.';
 if(t==='start')m='P is the starting amount. The growth factor is (1+r).';
 if(t==='split')m='A bracketed sum can be one factor — one quantity — not two separate final answers.';
 if(t==='coef')m='A coefficient multiplies a variable or factor; (x+5) itself is a factor.';
 if(t==='mul')m='Do not multiply every number blindly. Read what each part means first.';
 if(t==='true')m='That statement is true — not the mix-up.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Expression parts controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
