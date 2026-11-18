/* Flagship: Alternating and direct current (ages 14–16; KS4 Electricity).
   Compare pd–time graphs for dc (battery) vs ac (mains), state UK 230 V / 50 Hz, name what reverses in ac.
   Distinct from flagcirc (current/voltage in a circuit) and flagseries (series/parallel words). */
(()=>{
VIS.reg('flagacdc',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['dc','ac','mains','reverse','myth','order','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function axis(g,W,H){const C=A.col,y0=H*.48;g.strokeStyle=C.mu;g.lineWidth=1;g.beginPath();g.moveTo(W*.08,y0);g.lineTo(W*.92,y0);g.moveTo(W*.1,H*.18);g.lineTo(W*.1,H*.78);g.stroke();T('pd',W*.1,H*.14,11,{c:C.mu});T('t',W*.94,y0,11,{c:C.mu})}
function drawDC(g,W,H){const C=A.col,y=H*.32;axis(g,W,H);g.strokeStyle=C.ac;g.lineWidth=3;g.beginPath();g.moveTo(W*.12,y);g.lineTo(W*.88,y);g.stroke();T('steady pd',W/2,H*.86,12,{c:C.mu})}
function drawAC(g,W,H){const C=A.col,y0=H*.48,amp=H*.22;axis(g,W,H);g.strokeStyle=C.ac;g.lineWidth=3;g.beginPath();
 for(let x=W*.12;x<=W*.88;x+=2){const y=y0-amp*Math.sin(((x-W*.12)/(W*.76))*2*Math.PI*2);x===W*.12?g.moveTo(x,y):g.lineTo(x,y)}g.stroke();T('pd reverses each half-cycle',W/2,H*.86,12,{c:C.mu})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#dbeafe',C.dark?.1:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('a.c. and d.c.',W/2,H*.3,A.narrow?14:17,{w:900});T('battery → d.c. · mains → a.c.',W/2,H*.52,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='dc'){T(S.title||'Direct current (d.c.)',W/2,H*.08,A.narrow?13:15,{w:800});
  if(S.showDC)drawDC(g,W,H);else T(S.msg||'Tap to show a battery pd–time graph',W/2,H*.45,14,{c:C.mu,max:W*.9})}
 if(k==='ac'){T(S.title||'Alternating current (a.c.)',W/2,H*.08,A.narrow?13:15,{w:800});
  if(S.showAC)drawAC(g,W,H);else T(S.msg||'Tap to show a mains pd–time graph',W/2,H*.45,14,{c:C.mu,max:W*.9})}
 if(k==='mains'){T(S.title||'UK mains values',W/2,H*.1,A.narrow?13:15,{w:800});
  T(S.mOn?'230 V at 50 Hz (UK)':'Tap to reveal UK mains voltage and frequency',W/2,H*.4,A.narrow?14:17,{w:900});
  T(S.msg||'US mains is about 120 V at 60 Hz.',W/2,H*.7,13,{c:C.mu,max:W*.9})}
 if(k==='reverse'){T(S.title||'What reverses in a.c.?',W/2,H*.1,A.narrow?13:15,{w:800});
  T(S.rOn?'The potential difference (and current) reverse direction each half-cycle.':(S.msg||'Name what changes direction'),W/2,H*.45,A.narrow?13:15,{c:C.mu,max:W*.9})}
 if(k==='myth'||k==='order'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(String(t),W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{showDC:0,showAC:0,mOn:0,rOn:0,picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='dc'){btn('Show d.c. graph',()=>{S.showDC=1;S.msg='Battery pd stays in one direction.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Show DC');
  btn('Reset',()=>{S.showDC=0;A.redraw()},'Reset')}
 if(kind()==='ac'){btn('Show a.c. graph',()=>{S.showAC=1;S.msg='Mains pd swings positive and negative.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Show AC');
  btn('Reset',()=>{S.showAC=0;A.redraw()},'Reset')}
 if(kind()==='mains'){btn('Show 230 V, 50 Hz',()=>{S.mOn=1;S.msg='UK mains: about 230 V at 50 Hz.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Reveal mains');
  btn('Reset',()=>{S.mOn=0;A.redraw()},'Reset')}
 if(kind()==='reverse'){btn('pd (and current) reverse',()=>{S.rOn=1;S.msg='In a.c. the pd and current reverse each half-cycle.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Name reverse');
  btn('Reset',()=>{S.rOn=0;A.redraw()},'Reset')}
 if(kind()==='myth'||kind()==='order')(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say(String(t));A.redraw();S.check()},'Pick '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='dc'){S.showDC=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='ac'){S.showAC=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='mains'){S.mOn=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='reverse'){S.rOn=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='myth'||kind()==='order'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Direct current',p:'Direct current (d.c.) from a cell or battery keeps the same direction. On a pd–time graph it is a flat line (steady potential difference).',
 predict:{q:'A battery supplies…',opts:['direct current (d.c.)','alternating current (a.c.)','no potential difference'],ans:0},
 task:'Show the d.c. pd–time graph',show:()=>auto(0,[()=>{S.showDC=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'d.c. from a battery',msg:'Reveal the flat pd–time graph.'});say('Show direct current.');controls();S.check=finish(0,()=>!!S.showDC,'d.c. stays in one direction.')}},
{h:'Alternating current',p:'Alternating current (a.c.) from the mains reverses direction many times each second. The pd–time graph is a wave that crosses zero.',
 predict:{q:'Mains electricity is…',opts:['alternating current (a.c.)','only d.c. from a cell','a flat pd forever'],ans:0},
 task:'Show the a.c. pd–time graph',show:()=>auto(1,[()=>{S.showAC=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'a.c. from the mains',msg:'Reveal the waving pd–time graph.'});say('Show alternating current.');controls();S.check=finish(1,()=>!!S.showAC,'a.c. reverses each half-cycle.')}},
{h:'Mains values',p:'In the UK, mains is about 230 V at 50 Hz (50 cycles per second). In the US it is about 120 V at 60 Hz. Frequency is how many full cycles happen each second.',
 predict:{q:'UK mains frequency is about…',opts:['50 Hz','230 Hz','5 Hz'],ans:0},
 task:'Reveal UK mains 230 V, 50 Hz',show:()=>auto(2,[()=>{S.mOn=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Mains numbers',msg:'Show UK voltage and frequency.'});say('Recall mains values.');controls();S.check=finish(2,()=>!!S.mOn,'UK: 230 V at 50 Hz.')}},
{h:'What reverses?',p:'In a.c., the potential difference (and therefore the current) reverse direction each half-cycle. The wires do not swap places; the push of the pd flips.',
 predict:{q:'In a.c., what reverses each half-cycle?',opts:['the pd (and current)','the copper atoms in the wire','only the frequency number'],ans:0},
 task:'Name what reverses in a.c.',show:()=>auto(3,[()=>{S.rOn=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Direction change',msg:'Say what flips in a.c.'});say('Name the reverse.');controls();S.check=finish(3,()=>!!S.rOn,'pd and current reverse.')}},
{h:'Catch a mix-up',p:'Slips: calling battery supply a.c.; saying UK mains is 50 V; thinking frequency is the voltage; claiming nothing reverses in a.c.',
 predict:{q:'Which is the mix-up?',opts:['a battery supplies a.c.','a battery supplies d.c.','UK mains is about 50 Hz'],ans:0},
 task:'Tap the mix-up',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['a battery supplies a.c.','a battery supplies d.c.','UK mains is about 50 Hz'],picked:null});say('Find the mix-up.');controls();S.check=finish(4,()=>S.picked===0,'Batteries give d.c., not a.c.')}},
{h:'Order the check',p:'Order: sketch or read the pd–time graph → say d.c. or a.c. → recall local mains V and Hz → name what reverses in a.c.',
 predict:{q:'Best first step to tell a.c. from d.c. is…',opts:['look at the pd–time graph shape','guess from the wire colour','ignore the time axis'],ans:0},
 task:'Tap the best first step',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Check order',opts:['look at the pd–time graph shape','guess from the wire colour','ignore the time axis'],picked:null});say('Pick the first step.');controls();S.check=finish(5,()=>S.picked===0,'Graph shape tells a.c. from d.c.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Battery supply is…',[['d.c.','ok'],['a.c.','ac'],['neither','miss']]],
 ['Mains supply is…',[['a.c.','ok'],['only d.c.','dc'],['a flat line','dc']]],
 ['UK mains is about…',[['230 V at 50 Hz','ok'],['50 V at 230 Hz','swap'],['12 V d.c.','bat']]],
 ['In a.c., what reverses?',[['pd and current','ok'],['copper atoms','atom'],['only the Hz label','miss']]],
 ['Which is the mix-up?',[['battery supplies a.c.','ok'],['battery supplies d.c.','true'],['mains can be a.c.','true']]],
 ['First step?',[['read the pd–time graph','ok'],['guess from colour','miss'],['ignore time','miss']]],
 ['50 Hz means…',[['50 cycles each second','ok'],['50 volts','swap'],['d.c. only','dc']]]];
function why(t){let m='d.c. stays one way (battery); a.c. reverses (mains). UK mains ≈ 230 V, 50 Hz.';
 if(t==='ac')m='Cells and batteries give direct current, not alternating current.';
 if(t==='dc')m='Mains electricity is alternating current — the pd swings both ways.';
 if(t==='swap')m='Do not swap voltage and frequency. UK: about 230 V at 50 Hz.';
 if(t==='bat')m='12 V d.c. is typical of a car battery, not the mains.';
 if(t==='atom')m='Metal atoms stay in the wire. It is the pd (and current) that reverse.';
 if(t==='miss')m='Use the graph and the definitions — do not guess from colour or ignore time.';
 if(t==='true')m='That statement is true — not the mix-up.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'a.c. and d.c. controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
