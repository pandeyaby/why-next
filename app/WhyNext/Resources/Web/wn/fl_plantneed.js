/* Flagship: What Plants Need to Grow (ages 6–8; KS1 Year 2 Plants: find out how plants need water, light and a suitable
   temperature to grow and stay healthy; NGSS 2-LS2-1 plan an investigation of whether plants need sunlight and water).
   Grow two pots side by side for a week and change one thing each time: water or no water, window or dark cupboard,
   warm room or fridge; then find that too much water hurts too, set up a fair test, and nurse a sad plant back to
   health. Distinct from flagseed (a seed germinating) and flagxylem (water moving up a stem): this lab is about the
   conditions a growing plant needs. Big buttons and few words for young readers. */
(()=>{
// what a week does to a young bean plant (illustrative model): height 0..1.2, leaf colour, droop 0..1
function grow(p){if(!p.week)return{h:.3,leaf:'g',droop:0,why:'small'};
 if(p.water===0)return{h:.35,leaf:'b',droop:1,why:'no water'};
 if(p.water===2)return{h:.5,leaf:'y',droop:.7,why:'too much water'};
 if(!p.light)return{h:1.15,leaf:'y',droop:.5,why:'no light'};
 if(!p.warm)return{h:.38,leaf:'g',droop:.2,why:'too cold'};
 return{h:1,leaf:'g',droop:0,why:'healthy'}}
const BIG='min-height:52px;min-width:52px;font-size:1.06rem;padding:8px 18px;border-radius:12px';
const BASE={water:1,light:true,warm:true,week:false};
VIS.reg('flagplantneed',c=>{let A,pad,box,qn=-1;const P={};
const speak=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const now=()=>['water','light','warm','flood','fair','help','quiz'][A.step];
function word(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.thin?500:700} ${px}px system-ui,sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(s,x,y,o.max||A.W-12)}
function fresh(o){for(const k in P)delete P[k];Object.assign(P,{pots:[{...BASE},{...BASE}],tried:{},fixes:{},fairOk:false,note:'',after:()=>{}},o||{});A.redraw()}
// ---------- pictures ----------
const leafCol=k=>({g:A.mix(A.col.gr,'#16a34a',.3),y:'#d6c25a',b:'#9a6b3f'})[k];
function pot(g,x,base,w,p,tag){const C=A.col,s=grow(p),sh=w*1.9*s.h;
 // light behind the pot
 if(!p.light){g.fillStyle=A.mix(C.pn,'#000000',C.dark?.5:.55);A.paint.rrect(x-w*.95,base-w*2.75,w*1.9,w*2.9,12);g.fill()}
 else{g.fillStyle=A.alpha('#facc15',C.dark?.25:.35);g.beginPath();g.arc(x+w*.75,base-w*2.45,w*.28,0,7);g.fill()}
 if(!p.warm){g.fillStyle=A.alpha('#7dd3fc',.35);A.paint.rrect(x-w*.95,base-w*2.75,w*1.9,w*2.9,12);g.fill();word('❄',x-w*.7,base-w*2.45,w*.3)}
 // stem and leaves
 const lean=s.droop*w*.55,tipX=x+lean,tipY=base-w*.35-sh*(1-s.droop*.35);g.strokeStyle=leafCol(s.leaf);g.lineWidth=Math.max(3,w*.07*(p.light?1:.6));g.beginPath();g.moveTo(x,base-w*.35);g.quadraticCurveTo(x,tipY+sh*.2,tipX,tipY);g.stroke();
 g.fillStyle=leafCol(s.leaf);const n=Math.max(1,Math.round(s.h*3));for(let i=0;i<n;i++){const t=(i+1)/(n+1),lx=x+lean*t*t,ly=base-w*.35-(base-w*.35-tipY)*t,side=i%2?1:-1,lw=w*(p.light?.32:.2);
  g.beginPath();g.ellipse(lx+side*lw*.8,ly+s.droop*lw*.6,lw,lw*.42,side*(.4+s.droop*.9),0,7);g.fill()}
 // pot
 g.fillStyle=A.mix(C.pn,'#c2410c',.75);g.beginPath();g.moveTo(x-w*.45,base-w*.4);g.lineTo(x+w*.45,base-w*.4);g.lineTo(x+w*.35,base);g.lineTo(x-w*.35,base);g.closePath();g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
 if(p.water===2){g.fillStyle=A.alpha('#38bdf8',.75);g.fillRect(x-w*.42,base-w*.44,w*.84,w*.1)}
 word(tag,x,base+16,A.narrow?13:15);if(p.week)word(s.why,x,base+36,A.narrow?12:14,{c:s.why==='healthy'?C.gr:C.rd})}
function draw(A){const{ctx:g,W,H,col:C}=A,k=now();if(!P.pots)return;g.fillStyle=A.mix(C.pn,C.gr,C.dark?.04:.06);g.fillRect(0,0,W,H);const big=A.narrow?16:19;
 if(k==='quiz'){word('What does this plant need?',W/2,H*.42,A.narrow?16:19);word('Answer below',W/2,H*.56,13,{c:C.mu,thin:true});A.fx.draw(g);return}
 const head={water:'Water one pot. Leave one dry.',light:'One pot in the window, one in the dark',warm:'One pot in a warm room, one in the fridge',flood:'How much water?',fair:'Make a fair test for light',help:'Help the sad plant'}[k];
 word(head,W/2,H*.07,big);const base=H*.78,w=Math.min(W*.2,110);
 if(k==='flood'||k==='help'){pot(g,W/2,base,w*1.1,P.pots[0],k==='help'?(P.fixes.water&&P.fixes.light&&P.fixes.warm?'happy plant':'sad plant'):['no water','some water','too much'][P.pots[0].water])}
 else{pot(g,W*.28,base,w,P.pots[0],'pot A');pot(g,W*.72,base,w,P.pots[1],'pot B')}
 if(k==='water'&&!P.pots[0].week){word('💧',W*.28,H*.2,28);word('tap a pot to water it',W/2,H*.15,13,{c:C.mu,thin:true})}
 word(P.pots[0].week?'One week later':'Day 1',W/2,H*.95,13,{c:C.mu})
 if(P.note)word(P.note,W/2,H*.15,13,{c:C.mu,thin:true});A.fx.draw(g)}
// ---------- actions ----------
function week(){if(P.pots[0].week){P.pots.forEach(p=>p.week=false);P.note='';speak('Back to day 1.');pick();A.redraw();return}
 P.pots.forEach(p=>p.week=true);A.sound.whoosh();const s=P.pots.map(grow);P.tried[now()+':'+P.pots.map(p=>p.water+''+p.light+p.warm).join('|')]=1;
 speak(P.pots.length&&now()!=='flood'&&now()!=='help'?`A week later. Pot A: ${s[0].why}. Pot B: ${s[1].why}.`:`A week later: ${s[0].why}.`);pick();A.redraw();P.after()}
function setPot(i,key,val){const p=P.pots[i];if(now()==='fair'){P.fairOk=false;P.note=''}if(p.week){p.week=false;P.pots.forEach(q=>q.week=false)}p[key]=val;A.sound.tick();
 const say={water:['no water','some water','too much water'][val],light:val?'by the window':'in the dark cupboard',warm:val?'in a warm room':'in the fridge'}[key];speak(`Pot ${'AB'[i]}: ${say}.`);pick();A.redraw();P.after()}
function fairCheck(){const [a,b]=P.pots,diff=['water','light','warm'].filter(k=>a[k]!==b[k]);
 if(diff.length===1&&diff[0]==='light'){P.fairOk=true;P.note='Fair! Only the light is different.';A.sound.pop()}
 else{P.fairOk=false;P.note=diff.length?`Not fair yet: ${diff.filter(k=>k!=='light').map(k=>k==='warm'?'warmth':k).join(' and ')||'nothing'} is different too.`:'Both pots are the same. Change the light for pot B.';if(diff.length===1)P.note=`Not fair: you changed ${diff[0]==='warm'?'warmth':diff[0]}, not light.`;A.sound.miss()}
 speak(P.note);A.redraw();P.after()}
function fix(key){const p=P.pots[0];p.week=false;if(key==='water')p.water=1;if(key==='light')p.light=true;if(key==='warm')p.warm=true;P.fixes[key]=true;A.sound.pop();
 const left=['water','light','warm'].filter(k=>!P.fixes[k]);P.note=left.length?`Better! It still needs ${left.map(k=>k==='warm'?'warmth':k).join(' and ')}.`:'Water, light and warmth: now it can grow.';
 if(!left.length){p.week=true}speak(P.note);pick();A.redraw();P.after()}
function pick(){if(!pad||!P.pots)return;pad.innerHTML='';const k=now();if(k==='quiz')return;
 const add=(t,f,lab,on)=>{const e=c.el('button',{type:'button',class:'lbtn'+(on?' mine':''),style:BIG,'aria-label':lab||t},pad,t);if(on!=null)e.setAttribute('aria-pressed',String(!!on));e.onclick=f};
 const B=P.pots[1],A0=P.pots[0];
 if(k==='water'){add('💧 Water pot A',()=>setPot(0,'water',1),'Water pot A',A0.water===1);add('No water for pot B',()=>setPot(1,'water',0),'Give pot B no water',B.water===0)}
 if(k==='light'){add('☀ B by the window',()=>setPot(1,'light',true),'Put pot B by the window',B.light);add('🌑 B in the cupboard',()=>setPot(1,'light',false),'Put pot B in the dark cupboard',!B.light)}
 if(k==='warm'){add('Warm room',()=>setPot(1,'warm',true),'Put pot B in a warm room',B.warm);add('❄ Fridge',()=>setPot(1,'warm',false),'Put pot B in the fridge',!B.warm)}
 if(k==='flood'){['No water','Some water','Too much'].forEach((t,i)=>add(t,()=>setPot(0,'water',i),t,A0.water===i))}
 if(k==='fair'){add(B.light?'B: window':'B: cupboard',()=>setPot(1,'light',!B.light),'Pot B light: '+(B.light?'window':'cupboard'));add(B.water?'B: water':'B: no water',()=>setPot(1,'water',B.water?0:1),'Pot B water: '+(B.water?'yes':'no'));add(B.warm?'B: warm':'B: fridge',()=>setPot(1,'warm',!B.warm),'Pot B warmth: '+(B.warm?'warm':'fridge'));add('Is it fair?',fairCheck,'Check if the test is fair')}
 if(k==='help'){add('💧 Water',()=>fix('water'),'Give it water',!!P.fixes.water);add('☀ Light',()=>fix('light'),'Move it into the light',!!P.fixes.light);add('🌡 Warmth',()=>fix('warm'),'Move it somewhere warm',!!P.fixes.warm)}
 if(k!=='help'&&k!=='fair'||k==='fair'&&P.fairOk)add(P.pots[0].week?'↺ Day 1':'⏩ One week later',week,P.pots[0].week?'Go back to day 1':'Jump one week later')}
// ---------- canvas: tap a pot to change it, drag the can, tap the sky for a week ----------
function down(p){const k=now(),W=A.W,H=A.H;if(k==='quiz')return false;if(p.y<H*.12){if(k!=='help'&&(k!=='fair'||P.fairOk)){week();return true}return false}
 const side=p.x<W/2?0:1;
 if(k==='water'){setPot(side,'water',side?0:1);return true}
 if(k==='light'&&side){setPot(1,'light',!P.pots[1].light);return true}
 if(k==='warm'&&side){setPot(1,'warm',!P.pots[1].warm);return true}
 if(k==='flood'){P.drag=true;move(p);return true}
 if(k==='fair'&&side){setPot(1,'light',!P.pots[1].light);return true}
 if(k==='help'){const left=['water','light','warm'].find(z=>!P.fixes[z]);if(left)fix(left);return true}return false}
function move(p){if(!P.drag)return;const lvl=p.y<A.H*.35?2:p.y<A.H*.6?1:0;if(P.pots[0].water!==lvl)setPot(0,'water',lvl)}
function up(){P.drag=false}
const check=(i,ok,line)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(line()+A.reveal(i))};
function demo(i,list){steps[i].go();list.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?30*(j+1):(j+1)*420))}
const ran=t=>Object.keys(P.tried).some(k=>k.startsWith(now()+':')&&t(k.split(':')[1].split('|')));
const steps=[
{h:'Plants need water',p:'Two pots, two bean plants. Water pot A. Give pot B no water. Then jump a week.',
 predict:{q:'The plant with no water will…',opts:['grow bigger','go floppy and dry','stay just the same'],ans:1},
 task:'Water A, leave B dry, then jump a week',show:()=>demo(0,[()=>setPot(0,'water',1),()=>setPot(1,'water',0),week]),
 go:()=>{fresh({pots:[{...BASE,water:1},{...BASE,water:1}]});speak('Tap a pot, or use the big buttons.');pick();P.after=check(0,()=>P.pots[0].week&&P.pots[1].water===0,()=>'Pot B dried up and flopped. Plants need water.')}},
{h:'Plants need light',p:'Put pot B in a dark cupboard. Both pots get water. Then jump a week.',
 predict:{q:'The plant in the dark will…',opts:['grow better','stay green and strong','go pale, thin and weak'],ans:2},
 task:'Put pot B in the dark, then jump a week',show:()=>demo(1,[()=>setPot(1,'light',false),week]),
 go:()=>{fresh();speak('Tap pot B to move it.');pick();P.after=check(1,()=>P.pots[1].week&&!P.pots[1].light,()=>'In the dark it grew tall and thin, but pale and weak. Plants need light to make food.')}},
{h:'Plants need warmth',p:'Put pot B in the fridge. Both pots get water and light. Then jump a week.',
 predict:{q:'The plant in the fridge will…',opts:['hardly grow','grow the fastest','grow the same'],ans:0},
 task:'Put pot B in the fridge, then jump a week',show:()=>demo(2,[()=>setPot(1,'warm',false),week]),
 go:()=>{fresh();speak('Tap pot B to move it.');pick();P.after=check(2,()=>P.pots[1].week&&!P.pots[1].warm,()=>'In the cold it hardly grew. Plants need to be warm enough.')}},
{h:'Not too much water',p:'Water is good, but how much? Try no water, some water and too much water. Look after a week each time.',
 predict:{q:'More water is always better.',opts:['yes, always','no, too much water hurts the roots','only for small plants'],ans:1},
 task:'Try all three, a week each',show:()=>demo(3,[()=>setPot(0,'water',0),week,()=>setPot(0,'water',1),week,()=>setPot(0,'water',2),week]),
 go:()=>{fresh({pots:[{...BASE}]});speak('Choose how much water, then jump a week. Or drag up and down on the pot.');pick();P.after=check(3,()=>[0,1,2].every(w=>ran(a=>a[0][0]===String(w))),()=>'No water: dry. Too much: the roots sat in water and the leaves went yellow. Some water was just right.')}},
{h:'Make it fair',p:'To test light, the two pots must be the same in every way but one. Change only the light for pot B.',
 predict:{q:'To test light, what is different for pot B?',opts:['only the light','the light and the water','everything'],ans:0},
 task:'Make a fair test, then jump a week',show:()=>demo(4,[()=>setPot(1,'light',false),fairCheck,week]),
 go:()=>{fresh();speak('Change pot B, then press Is it fair?');pick();P.after=()=>{pick();check(4,()=>P.fairOk&&P.pots[0].week,()=>'Only the light changed, so the light made the difference.')()}}},
{h:'Help the sad plant',p:'This plant was left in a cold, dark place with no water. Give it what it needs.',
 predict:{q:'This plant is pale and floppy. It needs…',opts:['just a bigger pot','water, light and warmth','nothing, it is fine'],ans:1},
 task:'Give it all three things it needs',show:()=>demo(5,[()=>fix('water'),()=>fix('light'),()=>fix('warm')]),
 go:()=>{fresh({pots:[{water:0,light:false,warm:false,week:true}],fixes:{}});speak('Tap what it needs.');pick();P.after=check(5,()=>P.fixes.water&&P.fixes.light&&P.fixes.warm,()=>'Water, light and warmth: the plant can grow again.')}},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>P.after()});
const QS=[
 ['A plant is kept in a dark box for two weeks. What happens?',[['it goes pale and weak','ok'],['it grows big and green','dark'],['nothing changes','same']]],
 ['Mia forgot to water her plant for a week. What will it look like?',[['dry and floppy','ok'],['taller than before','dark'],['the same as before','same']]],
 ['Which pot will grow best?',[['on a warm, sunny windowsill, watered','ok'],['in the fridge, watered','cold'],['in a cupboard, watered','dark']]],
 ['Tom gives his plant a whole jug of water every day. Is that good?',[['no, too much water hurts the roots','ok'],['yes, more water is always better','flood'],['yes, if it is in the dark','dark']]],
 ['To test if plants need light, what should you change?',[['only the light','ok'],['the light and the water','fair'],['nothing at all','same']]],
 ['What three things does a plant need to grow?',[['water, light and warmth','ok'],['sweets, music and toys','silly'],['only soil','soil']]]];
function said(t){let m='Plants need water, light and warmth, and not too much water.';
 if(t==='dark')m='Without light a plant cannot make its food. It goes pale and weak, even if it grows a bit taller.';
 if(t==='same')m='Plants change when they miss what they need. Look after a week: it is not the same.';
 if(t==='cold')m='In the cold a plant hardly grows. It needs to be warm enough.';
 if(t==='flood')m='Too much water drowns the roots. Some water is just right.';
 if(t==='fair')m='Change only one thing. If you change the water too, you cannot tell what made the difference.';
 if(t==='silly')m='Those are fun for us, but a plant needs water, light and warmth.';
 if(t==='soil')m='Soil helps, but on its own it is not enough. A plant needs water, light and warmth.';
 return m}
function quiz(){qn++;const Q=QS[qn%QS.length],r=(qn+1)%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 box.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=box.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn',style:BIG},g,v).onclick=()=>score(t)});speak('Challenge: '+Q[0]);A.redraw()}
function score(t){box.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes! Water, light and warmth help a plant grow.':'✗ '+said(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:A=>{box.hidden=A.step!==6;pad.hidden=A.step===6;pick()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Plant lab controls'},w);box=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pick()}});
A.start()})})();
