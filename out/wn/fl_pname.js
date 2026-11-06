/* Flagship: naming the planets (ages 5–8; KS1 Earth/space vocabulary).
   Order Mercury→Neptune from the Sun, fix a mix-up, use orbit, tell planet vs moon/star/asteroid, then challenge.
   Distinct from day/night/seasons (flagsky) and mnemonic tricks (flagmnem). */
(()=>{
VIS.reg('flagpname',c=>{let A,ctl,chal,qi=-1,run=0;const S={};c.fig.classList.add('young');
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const kind=()=>['order','fix','orbit','kind','sort','idea','chal'][A.step];
const PLANETS=['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune'];
const COL=['#a8a29e','#fbbf24','#38bdf8','#f87171','#fdba74','#fde68a','#67e8f9','#60a5fa'];
function T(t,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(t,x,y,o.max||A.W-8)}
function sun(g){const{W,H,col:C}=A;g.fillStyle=A.mix('#0b1220',C.pn,C.dark?.2:.55);g.fillRect(0,0,W,H);
 g.fillStyle='#fbbf24';g.beginPath();g.arc(W*.1,H*.5,A.narrow?14:18,0,Math.PI*2);g.fill();T('Sun',W*.1,H*.5+(A.narrow?22:26),11,{c:C.mu})}
function drawOrb(g){const{W,H,col:C}=A;sun(g);const cx=W*.55,cy=H*.5,rx=W*.32,ry=H*.28;
 g.strokeStyle=A.alpha(C.tx,.35);g.lineWidth=1.5;g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,Math.PI*2);g.stroke();
 g.fillStyle='#38bdf8';g.beginPath();g.arc(cx+rx*.7,cy,A.narrow?8:10,0,Math.PI*2);g.fill();
 T('Earth',cx+rx*.7,cy+(A.narrow?18:22),12);T(S.msg||'Planet on its path around the Sun',W/2,H*.9,12,{c:C.mu})}
function drawOrder(g){const{W,H,col:C}=A;sun(g);T(S.title||'Order from the Sun',W/2,H*.08,A.narrow?13:15,{w:800});
 const list=S.list||PLANETS;list.forEach((n,i)=>{const x=W*(.22+ (i%4)*.19),y=H*(i<4?.32:.62);g.fillStyle=COL[PLANETS.indexOf(n)>=0?PLANETS.indexOf(n):i];
  g.beginPath();g.arc(x,y,A.narrow?10:12,0,Math.PI*2);g.fill();g.strokeStyle=C.tx;g.lineWidth=1;g.stroke();T(n,x,y+(A.narrow?18:20),A.narrow?10:11,{max:W*.18})});
 T(S.msg||'',W/2,H*.92,11,{c:C.mu})}
function drawKind(g){const{W,H,col:C}=A;g.fillStyle=A.mix('#0b1220',C.pn,C.dark?.15:.5);g.fillRect(0,0,W,H);
 T(S.card||'Glows with its own light',W/2,H*.18,A.narrow?14:16,{w:800});
 ['Planet','Moon','Star','Asteroid'].forEach((t,i)=>{const x=W*(.08+(i%2)*.46),y=H*(i<2?.4:.68),ww=W*.4,hh=H*.18;
  g.fillStyle=S.picked===i?A.alpha(C.ac,.35):A.alpha(C.tx,.1);g.fillRect(x,y,ww,hh);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(x,y,ww,hh);T(t,x+ww/2,y+hh/2,A.narrow?13:15)});
 T(S.msg||'Pick the matching space word',W/2,H*.94,12,{c:C.mu})}
function drawIdea(g){const{W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0e7ff',C.dark?.08:.35);g.fillRect(0,0,W,H);T('Tap the true sentence',W/2,H*.1,A.narrow?15:18,{w:800});
 (S.opts||[]).forEach((t,i)=>{const y=H*(.3+i*.18);g.fillStyle=S.picked===i?A.alpha(C.ac,.3):A.alpha(C.tx,.08);g.fillRect(W*.06,y-H*.07,W*.88,H*.14);g.strokeStyle=C.tx;g.lineWidth=2;g.strokeRect(W*.06,y-H*.07,W*.88,H*.14);T(t,W/2,y,A.narrow?11:13,{max:W*.84})})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=kind();
 if(k==='chal'){g.fillStyle=A.mix('#0b1220',C.pn,C.dark?.1:.45);g.fillRect(0,0,W,H);T('Naming the planets',W/2,H*.32,A.narrow?14:17,{w:900});T('Mercury → Neptune · orbit · planet / moon / star',W/2,H*.52,A.narrow?10:12,{c:C.mu});A.fx.draw(g);return}
 if(k==='order'||k==='fix'||k==='sort')drawOrder(g); if(k==='orbit')drawOrb(g); if(k==='kind')drawKind(g); if(k==='idea')drawIdea(g); A.fx.draw(g)}
function reset(o){run++;for(const x in S)delete S[x];Object.assign(S,{done:0,msg:'',picked:null,opts:[],list:PLANETS.slice(),title:'',card:'',ans:0,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*240))}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function controls(){if(!ctl)return;ctl.innerHTML='';if(kind()==='chal')return;const btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(kind()==='order'){btn('Show correct order',()=>{S.list=PLANETS.slice();S.done=1;S.msg='Mercury closest → Neptune farthest';A.sound.tick();A.redraw();S.check()},'Show planets in order from the Sun')}
 if(kind()==='fix'){btn('Swap Mercury and Mars',()=>{S.list=['Mars','Venus','Earth','Mercury','Jupiter','Saturn','Uranus','Neptune'];S.msg='Mix-up: Mars is not first';A.sound.miss();A.redraw()},'Show a Mercury/Mars mix-up');btn('Fix: Mercury first',()=>{S.list=PLANETS.slice();S.done=1;S.msg='Mercury is closest to the Sun';A.sound.tick();A.redraw();S.check()},'Put Mercury first from the Sun')}
 if(kind()==='orbit'){btn('Say: Earth orbits the Sun',()=>{S.done=1;S.msg='Orbit = path around another body';A.sound.tick();say(S.msg);A.redraw();S.check()},'Confirm Earth orbits the Sun')}
 if(kind()==='kind')['Planet','Moon','Star','Asteroid'].forEach((t,i)=>btn(t,()=>pickKind(i),'Pick '+t));
 if(kind()==='sort'){btn('Put rocky four first',()=>{S.list=PLANETS.slice();S.done=1;S.msg='Mercury Venus Earth Mars, then gas giants';A.sound.tick();A.redraw();S.check()},'Order with inner rocky planets first')}
 if(kind()==='idea')(S.opts||[]).forEach((t,i)=>btn(t,()=>{S.picked=i;A.sound.tick();say(t);A.redraw();S.check()},'Pick: '+t))}
function pickKind(i){S.picked=i;if(i!==S.ans){A.sound.miss();S.msg='Try another space word';A.redraw();return}S.done=1;A.sound.tick();S.msg='Yes — '+['Planet','Moon','Star','Asteroid'][i];A.redraw();S.check()}
function down(p){if(kind()==='chal')return false;
 if(kind()==='order'||kind()==='sort'){S.list=PLANETS.slice();S.done=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='fix'){S.list=PLANETS.slice();S.done=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='orbit'){S.done=1;A.sound.tick();A.redraw();S.check();return true}
 if(kind()==='kind'){const col=p.x<A.W*.5?0:1,row=p.y<A.H*.58?0:1;pickKind(row*2+col);return true}
 if(kind()==='idea'){const i=Math.max(0,Math.min(2,Math.floor((p.y-A.H*.22)/(A.H*.18))));S.picked=i;A.sound.tick();A.redraw();S.check();return true}
 return true}
const steps=[
{h:'Order from the Sun',p:'Eight planets orbit our Sun. Closest is Mercury, then Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.',
 predict:{q:'Which planet is closest to the Sun?',opts:['Mercury','Neptune','Earth’s Moon'],ans:0},
 task:'Show the order from the Sun',show:()=>auto(0,[()=>{S.list=PLANETS.slice();S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Closest → farthest',list:PLANETS.slice(),done:0,msg:'Tap Show correct order'});say('Show planet order from the Sun.');controls();S.check=finish(0,()=>S.done,'Mercury closest, Neptune farthest.')}},
{h:'Fix Mercury and Mars',p:'Mercury is first from the Sun. Mars is the fourth rocky planet. Do not swap them.',
 predict:{q:'Mars is…',opts:['fourth from the Sun (after Earth)','closest to the Sun','a star that makes light'],ans:0},
 task:'Put Mercury first again',show:()=>auto(1,[()=>{S.list=PLANETS.slice();S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Catch the mix-up',list:['Mars','Venus','Earth','Mercury','Jupiter','Saturn','Uranus','Neptune'],done:0,msg:'Fix Mercury first'});say('Fix Mercury and Mars.');controls();S.check=finish(1,()=>S.done&&S.list[0]==='Mercury','Mercury first; Mars is fourth.')}},
{h:'Orbit means path',p:'An orbit is the path a planet takes around the Sun. Moons orbit planets.',
 predict:{q:'Earth orbits…',opts:['the Sun','the Moon only','an asteroid belt as its home'],ans:0},
 task:'Confirm Earth orbits the Sun',show:()=>auto(2,[()=>{S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({done:0,msg:'Planet on its path around the Sun'});say('Orbit means the path around the Sun.');controls();S.check=finish(2,()=>S.done,'Orbit: path around another body.')}},
{h:'Planet, moon, star',p:'A star makes its own light. A planet orbits a star. A moon orbits a planet. An asteroid is a rocky body, usually smaller.',
 predict:{q:'What makes its own light?',opts:['a star','a moon','an asteroid'],ans:0},
 task:'Match the star card',show:()=>auto(3,[()=>{S.picked=2;S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({card:'Glows with its own light',ans:2,picked:null,done:0});say('Match the space word.');controls();S.check=finish(3,()=>S.done,'Stars make their own light.')}},
{h:'Inner then outer',p:'The first four — Mercury, Venus, Earth, Mars — are rocky. Then come the giant planets.',
 predict:{q:'The first four planets from the Sun are…',opts:['rocky worlds','all moons of Jupiter','stars in a line'],ans:0},
 task:'Show rocky four first',show:()=>auto(4,[()=>{S.list=PLANETS.slice();S.done=1;A.redraw();S.check()}]),
 go:()=>{reset({title:'Rocky four, then giants',list:PLANETS.slice(),done:0});say('Inner rocky planets first.');controls();S.check=finish(4,()=>S.done,'Four rocky, then giant planets.')}},
{h:'True sentence',p:'Pick the sentence that matches planet names and space words.',
 predict:{q:'Our solar system’s planets…',opts:['orbit the Sun in a fixed order from Mercury to Neptune','are all stars that glow','are only moons of Earth'],ans:0},
 task:'Tap the true sentence',show:()=>auto(5,[()=>{S.picked=0;A.redraw();S.check()}]),
 go:()=>{reset({opts:['Eight planets orbit the Sun: Mercury to Neptune in order','The Moon is a planet between Earth and Mars','Asteroids make their own light like stars'],picked:null});say('Tap the true idea.');controls();S.check=finish(5,()=>S.picked===0,'Eight planets orbit the Sun in order.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['Closest planet to the Sun?',[['Mercury','ok'],['Neptune','nep'],['the Moon','moon']]],
 ['Mars is…',[['fourth from the Sun','ok'],['closest to the Sun','close'],['a glowing star','star']]],
 ['Earth orbits…',[['the Sun','ok'],['only the Moon as its star','moonstar'],['an asteroid as its sun','ast']]],
 ['What makes its own light?',[['a star','ok'],['a moon','moon2'],['an asteroid','ast2']]],
 ['First four planets are…',[['rocky worlds','ok'],['all gas giants','gas'],['moons of Neptune','nepmoons']]],
 ['Eight planets go…',[['Mercury → Neptune from the Sun','ok'],['Neptune → Mercury only','rev'],['Moon → Sun → Mars','mix']]],
 ['Why say orbit?',[['it names the path around the Sun or a planet','ok'],['it means the planet is a star','starorb'],['it means no order from the Sun','noord']]]];
function why(t){let m='Eight planets orbit the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.';
 if(t==='nep'||t==='moon'||t==='close'||t==='star')m='Mercury is closest. Mars is fourth. Moons and stars are not that first planet.';
 if(t==='moonstar'||t==='ast'||t==='starorb'||t==='noord')m='Orbit is the path around the Sun (or a planet for a moon).';
 if(t==='moon2'||t==='ast2')m='Stars make light. Planets, moons and asteroids shine by reflected light.';
 if(t==='gas'||t==='nepmoons'||t==='rev'||t==='mix')m='Rocky four first, then giants. Order starts at Mercury, not Neptune or the Moon.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+1)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const b=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},b,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Planet name controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:()=>{},up:()=>{}});controls()}});
A.start()})})();
