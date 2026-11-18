/* Flagship: Calculating wave speed (v = fλ) (ages 13–15; KS3 Waves / NGSS HS-PS4-1).
   Use v = f × λ, rearrange for f or λ, convert kHz/cm → Hz/m, catch v=f+λ and unit slips.
   Distinct from flagwave (rope properties / measure λ by eye) and flagwread (diagrams). */
(()=>{
VIS.reg('flagvfl',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['link','speed','wave','units','myth','order','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function wave(g,W,H,lam,f){const C=A.col,y0=H*.45,amp=H*.12;g.strokeStyle=C.ac;g.lineWidth=3;g.beginPath();
 for(let x=0;x<=W;x+=2){const y=y0+amp*Math.sin((x/W)*2*Math.PI*(W/(lam||W*.35)));x?g.lineTo(x,y):g.moveTo(x,y)}g.stroke();
 g.setLineDash([5,4]);g.strokeStyle=C.mu;g.beginPath();g.moveTo(W*.15,y0+amp+18);g.lineTo(W*.15+(lam||W*.35),y0+amp+18);g.stroke();g.setLineDash([]);
 T('λ',W*.15+(lam||W*.35)/2,y0+amp+32,12,{c:C.mu});T(S.fOn?('f = '+(f||2)+' Hz'):'f',W*.82,H*.18,13,{c:C.mu})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.1:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Wave speed',W/2,H*.3,A.narrow?14:17,{w:900});T('v = f × λ  (Hz · m → m/s)',W/2,H*.52,A.narrow?12:14,{c:C.mu});A.fx.draw(g);return}
 if(k==='link'){T(S.title||'v = f × λ',W/2,H*.1,A.narrow?13:15,{w:800});
  T(S.showEq?'v = f × λ':'Tap to reveal the wave equation',W/2,H*.4,A.narrow?16:20,{w:900});
  T(S.msg||'Speed equals frequency times wavelength.',W/2,H*.7,13,{c:C.mu,max:W*.9})}
 if(k==='speed'){T(S.title||'Find speed',W/2,H*.08,A.narrow?13:15,{w:800});wave(g,W,H,W*.4,5);
  T(S.vOn?('v = 5 × 2 = 10 m/s'):(S.msg||'f = 5 Hz, λ = 2 m → find v'),W/2,H*.82,13,{c:C.mu,max:W*.92})}
 if(k==='wave'){T(S.title||'Find wavelength',W/2,H*.08,A.narrow?13:15,{w:800});
  T('v = 340 m/s, f = 680 Hz',W/2,H*.28,14,{w:800});
  T(S.lOn?('λ = v ÷ f = 0.5 m'):(S.msg||'Rearrange: λ = v ÷ f'),W/2,H*.55,A.narrow?14:16,{w:800});
  T('Sound example',W/2,H*.78,12,{c:C.mu})}
 if(k==='units'){T(S.title||'Convert units first',W/2,H*.08,A.narrow?13:15,{w:800});
  T('f = 2 kHz, λ = 15 cm',W/2,H*.28,14,{w:800});
  T(S.uOn?('2 kHz → 2000 Hz; 15 cm → 0.15 m; v = 300 m/s'):(S.msg||'Convert before multiplying'),W/2,H*.55,A.narrow?12:14,{c:C.mu,max:W*.9})}
 if(k==='myth'||k==='order'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(String(t),W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{showEq:0,vOn:0,lOn:0,uOn:0,fOn:0,picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='link'){btn('Show v = f × λ',()=>{S.showEq=1;S.msg='Speed = frequency × wavelength.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Reveal equation');
  btn('Reset',()=>{S.showEq=0;A.redraw()},'Reset')}
 if(kind()==='speed'){btn('Calculate v',()=>{S.vOn=1;S.fOn=1;S.msg='v = 5 × 2 = 10 m/s';A.sound.tick();say(S.msg);A.redraw();S.check()},'Compute speed');
  btn('Reset',()=>{S.vOn=0;A.redraw()},'Reset speed')}
 if(kind()==='wave'){btn('Find λ = v ÷ f',()=>{S.lOn=1;S.msg='λ = 340 ÷ 680 = 0.5 m';A.sound.tick();say(S.msg);A.redraw();S.check()},'Compute wavelength');
  btn('Reset',()=>{S.lOn=0;A.redraw()},'Reset wavelength')}
 if(kind()==='units'){btn('Convert then multiply',()=>{S.uOn=1;S.msg='2000 Hz × 0.15 m = 300 m/s';A.sound.tick();say(S.msg);A.redraw();S.check()},'Convert units');
  btn('Reset',()=>{S.uOn=0;A.redraw()},'Reset units')}
 if(kind()==='myth'||kind()==='order')(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say(String(t));A.redraw();S.check()},'Pick '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='link'){S.showEq=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='speed'){S.vOn=1;S.fOn=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='wave'){S.lOn=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='units'){S.uOn=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='myth'||kind()==='order'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'The wave equation',p:'Wave speed v equals frequency f times wavelength λ. Units: Hz × m gives m/s. Energy travels; the medium mostly stays put.',
 predict:{q:'v equals…',opts:['f × λ','f + λ','f ÷ λ only'],ans:0},
 task:'Reveal v = f × λ',show:()=>auto(0,[()=>{S.showEq=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Wave equation',msg:'Show the link between v, f and λ.'});say('Reveal the wave equation.');controls();S.check=finish(0,()=>!!S.showEq,'v = f × λ.')}},
{h:'Calculate speed',p:'Given f and λ, multiply. Example: f = 5 Hz, λ = 2 m → v = 10 m/s. Do not add frequency and wavelength.',
 predict:{q:'f = 5 Hz, λ = 2 m. Speed is…',opts:['10 m/s','7 m/s','2.5 m/s'],ans:0},
 task:'Calculate v = f × λ',show:()=>auto(1,[()=>{S.vOn=1;S.fOn=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Find v',msg:'Multiply frequency by wavelength.'});say('Calculate speed.');controls();S.check=finish(1,()=>!!S.vOn,'v = 10 m/s.')}},
{h:'Rearrange for λ',p:'To find wavelength: λ = v ÷ f. Sound at 340 m/s and 680 Hz has λ = 0.5 m.',
 predict:{q:'λ = v ÷ f. If you use λ = v × f you…',opts:['get a huge wrong answer','always get the same right λ','convert units for free'],ans:0},
 task:'Find λ = v ÷ f',show:()=>auto(2,[()=>{S.lOn=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Find λ',msg:'Divide speed by frequency.'});say('Rearrange for wavelength.');controls();S.check=finish(2,()=>!!S.lOn,'λ = 0.5 m.')}},
{h:'Units first',p:'Convert before calculating: 1 kHz = 1000 Hz, 1 cm = 0.01 m. Mixing kHz with cm without converting breaks the answer.',
 predict:{q:'Before v = f × λ you should…',opts:['put f in Hz and λ in m','keep kHz and cm mixed','add the unit numbers'],ans:0},
 task:'Convert kHz and cm, then find v',show:()=>auto(3,[()=>{S.uOn=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Units',msg:'Convert, then multiply.'});say('Fix the units.');controls();S.check=finish(3,()=>!!S.uOn,'Converted, then v = 300 m/s.')}},
{h:'Catch a mix-up',p:'Slips: v = f + λ; forgetting to convert kHz/cm; using λ = v × f; thinking Hz × m is not m/s.',
 predict:{q:'Which is the mix-up?',opts:['v = f + λ','v = f × λ','λ = v ÷ f'],ans:0},
 task:'Tap the mix-up',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['v = f + λ','v = f × λ','λ = v ÷ f'],picked:null});say('Find the mix-up.');controls();S.check=finish(4,()=>S.picked===0,'Speed is a product, not a sum.')}},
{h:'Order the method',p:'Order: convert units → choose rearrange (v, f or λ) → multiply or divide → check units are m/s, Hz or m.',
 predict:{q:'Correct first step is…',opts:['convert to Hz and m','add f and λ','skip units and guess'],ans:0},
 task:'Tap the correct first step',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Method order',opts:['convert to Hz and m','add f and λ','skip units and guess'],picked:null});say('Pick the first step.');controls();S.check=finish(5,()=>S.picked===0,'Convert units before calculating.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['v equals…',[['f × λ','ok'],['f + λ','add'],['f − λ','add']]],
 ['f = 4 Hz, λ = 3 m. v?',[['12 m/s','ok'],['7 m/s','add'],['1.33 m/s','div']]],
 ['λ from v and f?',[['λ = v ÷ f','ok'],['λ = v × f','mul'],['λ = v + f','add']]],
 ['2 kHz in Hz?',[['2000 Hz','ok'],['2 Hz','unit'],['0.002 Hz','unit']]],
 ['Which is the mix-up?',[['v = f + λ','ok'],['v = f × λ','true'],['λ = v ÷ f','true']]],
 ['First step?',[['convert to Hz and m','ok'],['add f and λ','add'],['ignore units','unit']]],
 ['Hz × m gives…',[['m/s','ok'],['Hz only','unit'],['no unit','unit']]]];
function why(t){let m='Use v = f × λ with Hz and metres; rearrange by dividing when needed.';
 if(t==='add')m='Do not add frequency and wavelength. Speed is the product f × λ.';
 if(t==='div')m='For speed you multiply. Division is for λ = v ÷ f or f = v ÷ λ.';
 if(t==='mul')m='Wavelength is v ÷ f, not v × f. Multiplying gives a huge wrong value.';
 if(t==='unit')m='Convert first: kHz → Hz (×1000), cm → m (÷100). Mixed units break the answer.';
 if(t==='true')m='That statement is true — not the mix-up.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Wave speed controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
