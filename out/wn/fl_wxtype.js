/* Flagship: types of weather (ages 5–7; KS1 weather observation).
   Match sunny/rainy/cloudy/windy/snowy icons, sort a day card, predict from clues,
   catch mix-ups with seasons or clothing, then challenge.
   Distinct from what-to-wear (flagwear) and day/night/seasons (flagsky). */
(()=>{
VIS.reg('flagwxtype',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['sun','rain','cloud','wind','sort','idea','chal'][A.step];
const WX={sunny:{emoji:'☀️',label:'Sunny',sky:'#7dd3fc',note:'bright sun, clear sky'},
 rainy:{emoji:'🌧️',label:'Rainy',sky:'#94a3b8',note:'drops falling from clouds'},
 cloudy:{emoji:'☁️',label:'Cloudy',sky:'#cbd5e1',note:'thick cloud, little sun'},
 windy:{emoji:'💨',label:'Windy',sky:'#a5f3fc',note:'air pushing hard'},
 snowy:{emoji:'❄️',label:'Snowy',sky:'#e2e8f0',note:'cold white flakes'}};
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function scene(g,key){const w=WX[key]||WX.sunny,{W,H,col:C}=A;g.fillStyle=A.mix(w.sky,C.pn,C.dark?.35:.15);g.fillRect(0,0,W,H);
 g.fillStyle=A.alpha(C.tx,.1);g.fillRect(0,H*.72,W,H*.28);T(w.emoji,W/2,H*.38,A.narrow?48:64);T(w.label,W/2,H*.58,A.narrow?16:20,{w:800});T(w.note,W/2,H*.68,A.narrow?12:14,{c:C.mu})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();
 if(k==='chal'){g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.08:.35);g.fillRect(0,0,W,H);T('Types of weather',W/2,H*.32,A.narrow?15:18,{w:900});T('Sunny · rainy · cloudy · windy · snowy',W/2,H*.52,A.narrow?11:13,{c:C.mu});A.fx.draw(g);return}
 if(k==='sun'||k==='rain'||k==='cloud'||k==='wind'){scene(g,S.wx||'sunny');T(S.msg||(S.done?'Got it':'Look, then name it'),W/2,H*.9,12,{c:C.mu})}
 if(k==='sort'){g.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.08:.3);g.fillRect(0,0,W,H);T('Match the day card',W/2,H*.08,A.narrow?14:17,{w:800});
  T(S.card||'❄️ cold white flakes',W/2,H*.22,A.narrow?14:16,{w:800});
  ['Sunny','Rainy','Cloudy','Windy','Snowy'].forEach((t,i)=>{const x=W*(.06+(i%3)*.31),y=H*(i<3?.4:.68),ww=W*.28,hh=H*.18;
   g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.08);g.fillRect(x,y,ww,hh);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x,y,ww,hh);T(t,x+ww/2,y+hh/2,A.narrow?12:14)});
  T(S.msg||'Pick the matching type',W/2,H*.94,12,{c:C.mu})}
 if(k==='idea'){g.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.08:.3);g.fillRect(0,0,W,H);T('Tap the true sentence',W/2,H*.1,A.narrow?15:18,{w:800});
  (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
 A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{done:0,wx:'sunny',msg:'',picked:null,opts:[],card:'',check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*240))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='sun'||kind()==='rain'||kind()==='cloud'||kind()==='wind'){btn('Name this weather',()=>{S.done=1;S.msg=WX[S.wx].label+' — '+WX[S.wx].note;A.sound.tick();say(S.msg);A.redraw();S.check()},'Name the weather type shown')}
 if(kind()==='sort')['Sunny','Rainy','Cloudy','Windy','Snowy'].forEach((t,i)=>btn(t,()=>pick(i),'Pick '+t));
 if(kind()==='idea')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function pick(i){S.picked=i;const need=S.ans;if(i!==need){A.sound.miss();S.msg='Try another type';A.redraw();return}
 S.done=1;A.sound.tick();S.msg='Yes — '+['Sunny','Rainy','Cloudy','Windy','Snowy'][i];A.redraw();S.check()}
function down(p){if(kind()==='chal')return false;
 if(kind()==='sun'||kind()==='rain'||kind()==='cloud'||kind()==='wind'){S.done=1;S.msg=WX[S.wx].label;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='sort'){const col=Math.max(0,Math.min(2,Math.floor((p.x-A.W*.06)/(A.W*.31))));const row=p.y<A.H*.58?0:1;const i=row*3+col;if(i<=4)pick(i);return true}
 if(kind()==='idea'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.22)/(A.H*.18))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Sunny',p:'Sunny weather means a bright sun and a mostly clear sky. You see strong light and sharp shadows.',
 predict:{q:'Sunny weather has…',opts:['a bright sun and clear sky','thick falling snow','only night-time stars'],ans:0},
 task:'Name the sunny day',show:()=>auto(0,[()=>{S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({wx:'sunny',done:0,msg:'Look at the sky'});say('Name sunny weather.');controls();S.check=finish(0,()=>S.done,'Sunny: bright sun, clear sky.')}},
{h:'Rainy',p:'Rainy weather means water drops falling from clouds. Puddles grow on the ground.',
 predict:{q:'Rainy weather means…',opts:['drops falling from clouds','hot dry sand only','snow without clouds'],ans:0},
 task:'Name the rainy day',show:()=>auto(1,[()=>{S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({wx:'rainy',done:0});say('Name rainy weather.');controls();S.check=finish(1,()=>S.done,'Rainy: drops falling from clouds.')}},
{h:'Cloudy',p:'Cloudy weather means thick cloud covers much of the sky. The sun may be hidden.',
 predict:{q:'Cloudy weather means…',opts:['thick cloud covering the sky','clear blue with no cloud','only strong wind'],ans:0},
 task:'Name the cloudy day',show:()=>auto(2,[()=>{S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({wx:'cloudy',done:0});say('Name cloudy weather.');controls();S.check=finish(2,()=>S.done,'Cloudy: thick cloud, little sun.')}},
{h:'Windy',p:'Windy weather means the air is pushing hard. Flags flap and leaves move fast.',
 predict:{q:'Windy weather means…',opts:['air pushing hard','still air with no movement','only frozen puddles'],ans:0},
 task:'Name the windy day',show:()=>auto(3,[()=>{S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({wx:'windy',done:0});say('Name windy weather.');controls();S.check=finish(3,()=>S.done,'Windy: air pushing hard.')}},
{h:'Match a day card',p:'Read the clue on the day card and match it to the weather type.',
 predict:{q:'Cold white flakes mean…',opts:['snowy','sunny','just cloudy with no cold'],ans:0},
 task:'Match the snowy card',show:()=>auto(4,[()=>{S.picked=4;S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({card:'❄️ cold white flakes',ans:4,picked:null,done:0,msg:''});say('Match the day card.');controls();S.check=finish(4,()=>S.done,'Snowy: cold white flakes.')}},
{h:'True sentence',p:'Pick the sentence that matches weather types — not seasons or clothes.',
 predict:{q:'Weather types name…',opts:['what the sky and air are doing today','which season lasts three months','only the coat you must wear'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Weather types name sunny, rainy, cloudy, windy or snowy skies','Weather is the same word as season','Windy always means it must be winter'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Weather types describe today’s sky and air.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Sunny weather has…',[['a bright sun and clear sky','ok'],['thick falling snow','snow'],['only night-time stars','stars']]],
 ['Rainy weather means…',[['drops falling from clouds','ok'],['hot dry sand only','sand'],['frozen flakes only','flakes']]],
 ['Cloudy weather means…',[['thick cloud covering the sky','ok'],['no cloud at all','nocloud'],['only strong wind','onlywind']]],
 ['Windy weather means…',[['air pushing hard','ok'],['still air with no movement','still'],['only puddles with no air move','puddle']]],
 ['Cold white flakes mean…',[['snowy','ok'],['sunny','sun'],['just rainy and warm','warmrain']]],
 ['Weather types name…',[['what the sky and air are doing today','ok'],['which season lasts three months','season'],['only the coat you must wear','coat']]],
 ['Why watch the sky to name weather?',[['to see sun, cloud, rain, wind or snow clues','ok'],['to choose a favourite colour','colour'],['because seasons never change the sky','noseason']]]];
function why(t){let m='Weather types: sunny, rainy, cloudy, windy, snowy — what the sky and air are doing today.';
 if(t==='snow'||t==='stars'||t==='sand'||t==='flakes')m='Sunny is bright clear sky. Snow and stars are not sunny-day clues.';
 if(t==='nocloud'||t==='onlywind'||t==='still'||t==='puddle')m='Cloudy = thick cloud. Windy = air pushing. Rain makes drops and puddles.';
 if(t==='sun'||t==='warmrain')m='Cold white flakes are snowy weather, not sunny or warm rain.';
 if(t==='season'||t==='coat'||t==='colour'||t==='noseason')m='Weather is today’s sky and air. Season is a longer stretch; coats are clothing choices.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Weather type controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
