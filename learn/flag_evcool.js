/* Flagship: Evaporation causes cooling (ages 12–14; particle model — fastest particles escape as
   vapour so remaining average KE and temperature fall). Sweat / wet-skin cooling. Distinct from
   flagevap (water cycle), flagtemp (temperature & particle motion without evaporative cooling),
   flagtherm (thermometers), flagmelt (melting/freezing). */
(()=>{
VIS.reg('flagevcool',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['escape','average','temp','skin','myth','order','chal'][A.step];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function particles(g,W,H,escaped){const C=A.col,base=[[.2,.7,1],[.35,.65,2],[.5,.72,1],[.65,.68,3],[.8,.7,2],[.25,.55,3],[.55,.58,2],[.75,.55,3]];
 base.forEach(([fx,fy,spd],i)=>{const gone=escaped&&spd>=3;if(gone&&S.escaped){const y=H*(fy-.25*Math.min(1,S.escaped/3));g.beginPath();g.arc(W*fx,y,7,0,7);g.fillStyle=A.alpha(C.am,.5);g.fill();T('vapour',W*fx,y-14,10,{c:C.mu});return}
  if(gone)return;g.beginPath();g.arc(W*fx,H*fy,8+spd,0,7);g.fillStyle=spd>=3?A.alpha(C.or||C.am,.85):A.alpha(C.ac,.7);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke()});
 g.fillStyle=A.alpha(C.cy,.2);g.fillRect(W*.05,H*.78,W*.9,H*.12);T('liquid',W/2,H*.84,12,{c:C.mu})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.1:.35);g.fillRect(0,0,W,H);
 if(k==='chal'){T('Evaporation cools',W/2,H*.3,A.narrow?14:17,{w:900});T('fast leave → average KE falls → cooler',W/2,H*.52,A.narrow?11:13,{c:C.mu});A.fx.draw(g);return}
 if(k==='escape'){T(S.title||'Fast particles leave',W/2,H*.08,A.narrow?13:15,{w:800});particles(g,W,H*.9,true);T(S.msg||'Let the fastest particles escape.',W/2,H*.95,12,{c:C.mu,max:W*.92})}
 if(k==='average'){T(S.title||'Average KE falls',W/2,H*.08,A.narrow?13:15,{w:800});
  const lvl=S.avgOn?0.35:0.7;g.fillStyle=A.alpha(C.or||C.am,.5);g.fillRect(W*.2,H*(.7-lvl*.4),W*.6,H*lvl*.4);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.2,H*.3,W*.6,H*.4);
  T(S.avgOn?'lower average KE':'higher average KE',W/2,H*.5,14,{w:800});T(S.msg||'After fast particles leave…',W/2,H*.85,12,{c:C.mu})}
 if(k==='temp'){T(S.title||'Temperature falls',W/2,H*.08,A.narrow?13:15,{w:800});
  const t=S.coolOn?18:28;g.fillStyle=A.alpha(C.rd||C.or||C.am,.35);g.fillRect(W*.42,H*.25,W*.16,H*.45);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.42,H*.25,W*.16,H*.45);
  g.fillStyle=C.ac;g.fillRect(W*.45,H*(.65-t/80),W*.1,H*(t/80));T(t+'°',W/2,H*.8,16,{w:800});T(S.msg||'Temperature tracks average KE.',W/2,H*.92,12,{c:C.mu})}
 if(k==='skin'){T(S.title||'Wet skin cools',W/2,H*.08,A.narrow?13:15,{w:800});
  g.beginPath();g.ellipse(W/2,H*.45,W*.22,H*.16,0,0,7);g.fillStyle=A.alpha(C.am,.25);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();T('wet skin',W/2,H*.45,14,{w:800});
  T(S.blown?'Vapour carried away — skin cooler.':(S.msg||'Blow to help evaporation.'),W/2,H*.75,13,{c:C.mu,max:W*.9})}
 if(k==='myth'||k==='order'){T(S.title||'Choose',W/2,H*.1,A.narrow?13:15,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.28+i*.2);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.05,y-H*.08,W*.9,H*.16);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.05,y-H*.08,W*.9,H*.16);T(String(t),W/2,y,A.narrow?12:14,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{escaped:0,avgOn:0,coolOn:0,blown:0,picked:null,opts:[],title:'',msg:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*160))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='escape'){btn('Let fast particles escape',()=>{S.escaped=3;S.msg='Fast particles leave as vapour.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Escape as vapour');
  btn('Reset',()=>{S.escaped=0;A.redraw()},'Reset particles')}
 if(kind()==='average'){btn('Show lower average KE',()=>{S.avgOn=1;S.msg='Average KE of what remains falls.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Lower average KE');
  btn('Reset',()=>{S.avgOn=0;A.redraw()},'Reset average')}
 if(kind()==='temp'){btn('Show temperature fall',()=>{S.coolOn=1;S.msg='Temperature falls with average KE.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Cool the liquid');
  btn('Reset',()=>{S.coolOn=0;A.redraw()},'Reset temperature')}
 if(kind()==='skin'){btn('Blow across wet skin',()=>{S.blown=1;S.msg='Wind helps vapour leave — skin cools.';A.sound.tick();say(S.msg);A.redraw();S.check()},'Help evaporation');
  btn('Reset',()=>{S.blown=0;A.redraw()},'Reset skin')}
 if(kind()==='myth'||kind()==='order')(S.opts||[]).forEach((t,i)=>btn(String(t),()=>{S.picked=i;A.sound.tick();say(String(t));A.redraw();S.check()},'Pick '+t))}
function down(p){if(kind()==='chal')return false;
 if(kind()==='escape'){S.escaped=3;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='average'){S.avgOn=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='temp'){S.coolOn=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='skin'){S.blown=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='myth'||kind()==='order'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.2)/(A.H*.2))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Fast particles escape',p:'Particles in a liquid have different speeds. The fastest are most likely to leave the surface as vapour. That leaving is evaporation.',
 predict:{q:'Which particles leave most easily?',opts:['the fastest ones','only the slowest ones','only particles at rest'],ans:0},
 task:'Let the fastest particles escape as vapour',show:()=>auto(0,[()=>{S.escaped=3;A.redraw();S.check()}]),
 go:()=>{reset({title:'Escape as vapour',escaped:0,msg:'Tap to let fast particles leave.'});say('Let fast particles evaporate.');controls();S.check=finish(0,()=>S.escaped>=3,'Fast particles leave as vapour.')}},
{h:'Average KE falls',p:'When fast particles leave, the particles left in the liquid have a lower average kinetic energy. That is the energy story behind cooling.',
 predict:{q:'After fast particles leave, average KE of what remains…',opts:['falls','must rise','cannot change'],ans:0},
 task:'Show the lower average KE',show:()=>auto(1,[()=>{S.avgOn=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Average KE',avgOn:0,msg:'Show what happens to average KE.'});say('Average KE falls.');controls();S.check=finish(1,()=>!!S.avgOn,'Average KE of the remaining liquid falls.')}},
{h:'Temperature falls',p:'Temperature tracks average kinetic energy. Lower average KE means a lower temperature — evaporative cooling of the liquid left behind.',
 predict:{q:'Temperature falls because…',opts:['average KE of remaining particles falls','vapour paints the liquid cold','the liquid must freeze first'],ans:0},
 task:'Show the temperature fall',show:()=>auto(2,[()=>{S.coolOn=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Temperature',coolOn:0,msg:'Link temperature to average KE.'});say('Temperature falls.');controls();S.check=finish(2,()=>!!S.coolOn,'Temperature falls with average KE.')}},
{h:'Wet skin cools',p:'Sweat or a damp patch cools you the same way: water evaporates, energetic particles leave, and wind helps by carrying vapour away so more can evaporate.',
 predict:{q:'Wind helps wet-skin cooling by…',opts:['carrying vapour away so more can evaporate','painting the skin a colder colour','freezing the water instantly'],ans:0},
 task:'Blow across wet skin to help evaporation',show:()=>auto(3,[()=>{S.blown=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Wet skin',blown:0,msg:'Blow to help vapour leave.'});say('Cool wet skin.');controls();S.check=finish(3,()=>!!S.blown,'Evaporation cools wet skin.')}},
{h:'Catch a mix-up',p:'Slips: thinking evaporation heats the liquid; mixing this cooling idea with the water-cycle cloud story; thinking only boiling can cool.',
 predict:{q:'Which is the mix-up?',opts:['evaporation always heats the liquid','fast particles escape as vapour','remaining liquid can cool'],ans:0},
 task:'Tap the mix-up',show:()=>auto(4,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Which is the mix-up?',opts:['evaporation always heats the liquid','fast particles escape as vapour','remaining liquid can cool'],picked:null});say('Find the mix-up.');controls();S.check=finish(4,()=>S.picked===0,'Evaporation cools the remaining liquid.')}},
{h:'Order the cause',p:'Order: fast particles leave → average KE of what remains falls → temperature falls. Boiling is not required for evaporative cooling.',
 predict:{q:'Correct order is…',opts:['fast leave → average KE falls → temperature falls','temperature rises because vapour forms','liquid must boil before any cooling'],ans:0},
 task:'Tap the correct order',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({title:'Causal order',opts:['fast leave → average KE falls → temperature falls','temperature rises because vapour forms','liquid must boil before any cooling'],picked:null});say('Pick the order.');controls();S.check=finish(5,()=>S.picked===0,'Escape, then lower average KE, then cooler.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Which particles leave most easily?',[['the fastest ones','ok'],['only the slowest','slow'],['only particles at rest','slow']]],
 ['After they leave, average KE…',[['falls','ok'],['must rise','heat'],['cannot change','heat']]],
 ['Temperature falls because…',[['average KE of what remains falls','ok'],['vapour paints cold','paint'],['liquid must freeze first','freeze']]],
 ['Which is the mix-up?',[['evaporation always heats the liquid','ok'],['fast particles escape','true'],['remaining liquid can cool','true']]],
 ['Wind helps cooling by…',[['carrying vapour away','ok'],['painting skin colder','paint'],['freezing sweat','freeze']]],
 ['Order starts with…',[['fast particles leave','ok'],['temperature rises first','heat'],['boiling only','boil']]],
 ['This lesson’s key point vs water cycle?',[['why the liquid left behind cools','ok'],['how rain forms in clouds only','cycle'],['evaporation never below boiling','boil']]]];
function why(t){let m='Fast particles leave → average KE of what remains falls → temperature falls.';
 if(t==='slow')m='Slower particles are less likely to escape. The fastest leave as vapour first.';
 if(t==='heat')m='Evaporation cools the remaining liquid; it does not heat it or raise average KE.';
 if(t==='paint')m='Cooling is about particle energy, not paint or colour on the skin.';
 if(t==='freeze')m='Evaporative cooling does not require freezing. Liquid water can evaporate and cool.';
 if(t==='true')m='That statement is true — not the mix-up.';
 if(t==='boil')m='Evaporative cooling happens below boiling. Boiling is not required.';
 if(t==='cycle')m='Clouds and rain are the water-cycle path. Here the point is cooling of the liquid left behind.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Evaporative cooling controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
