/* Flagship: Polar Animals (ages 7–9; NC Year 2 living things and habitats, Year 4 grouping
   and environments, Year 6 adaptation). The Arctic (north) is a frozen ocean ringed by land:
   polar bears, Arctic foxes, walruses. The Antarctic (south) is an icy continent: penguins,
   Weddell seals, albatrosses. Cold-beating adaptations: blubber, thick fur, small ears,
   huddling, a white winter coat.
   Sort six animals to the right pole, thicken a walrus's blubber in icy water, drag emperor
   penguins into a huddle, change an Arctic fox's coat with the seasons, and build a polar
   body from features, then test it in a blizzard.
   Distinct from flagdesert (heat and water), flagmigrate and flagcamo. */
(()=>{
VIS.reg('flagpolaran',c=>{
let A,dock,cq,qq=-1;const S={};
const SCENES=['poles','blubber','huddle','coat','build','quiz'];
const BEASTS=[['polar bear','🐻‍❄️','N'],['emperor penguin','🐧','S'],['Arctic fox','🦊','N'],['wandering albatross','🐦','S'],['walrus','🦭','N'],['Weddell seal','🦭','S']];
const PEN=6,FEAT=[['thick fur',1,'Thick fur traps warm air next to the skin.'],['blubber',1,'A thick layer of fat under the skin keeps heat in.'],['small ears',1,'Small ears lose less heat.'],['big thin ears',0,'Big thin ears let heat out: that is a desert trick.'],['short thin fur',0,'Short thin fur lets the cold wind reach the skin.'],['sweats a lot',0,'Wet skin loses heat fast in the cold.']];
const speak=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const scene=()=>SCENES[A.step];
function lab(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,"Noto Color Emoji",sans-serif`;g.textAlign=o.al||'center';g.textBaseline='middle';g.fillStyle=o.col||A.col.tx;g.fillText(String(s),x,y,o.max||A.W-12)}
function banner(t){const g=A.ctx,px=A.narrow?13:15,L=[''];g.font=`600 ${px}px system-ui,sans-serif`;
 for(const w of t.split(' ')){const j=L.length-1,t2=(L[j]+' '+w).trim();if(g.measureText(t2).width>A.W-22&&L[j])L.push(w);else L[j]=t2}
 const n=Math.min(4,L.length),lh=px+5,y0=A.H-n*lh-12;g.fillStyle=A.alpha(A.col.pn,.94);g.fillRect(0,y0,A.W,A.H-y0);L.slice(0,4).forEach((s,i)=>lab(s,A.W/2,y0+6+i*lh+lh/2,px,{w:600}))}
const ice=(k,a)=>A.mix(A.col.pn,A.col[k],A.col.dark?a*.8:a);
function slab(b,k,a,r){const g=A.ctx;g.fillStyle=ice(k,a);A.paint.rrect(b.x,b.y,b.w,b.h,r||12);g.fill();g.strokeStyle=A.alpha(A.col.tx,.7);g.lineWidth=1.5;g.stroke()}
const over=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function meter(x,y,w,v,label,good){const g=A.ctx;slab({x,y,w,h:16},'ln',.12,6);g.fillStyle=good?A.col.gr:A.col.rd;g.fillRect(x+2,y+2,(w-4)*Math.max(0,Math.min(1,v)),12);lab(label,x+w/2,y-11,13,{w:600})}
/* ---- poles: north or south ---- */
const pole=k=>k==='N'?{x:12,y:A.H*.28,w:A.W/2-18,h:A.H*.46}:{x:A.W/2+6,y:A.H*.28,w:A.W/2-18,h:A.H*.46};
function drawPoles(){const C=A.col,cur=BEASTS[S.bi];
 [['N','Arctic (north)','frozen ocean, land around it'],['S','Antarctic (south)','icy land, ocean around it']].forEach(([k,nm,sub])=>{const b=pole(k);slab(b,k==='N'?'cy':'vi',.16);lab(nm,b.x+b.w/2,b.y+18,A.narrow?14:16,{max:b.w-6});lab(sub,b.x+b.w/2,b.y+38,A.narrow?11:12,{w:600,col:C.mu,max:b.w-6});
  S.home.filter(h=>h[2]===k).forEach((h,i)=>lab(h[1]+' '+h[0],b.x+b.w/2,b.y+66+i*26,A.narrow?12:14,{w:600,max:b.w-8}))});
 if(cur){const b={x:A.W/2-85,y:A.H*.1,w:170,h:50},d=S.lift;slab(d?{x:d.x-85,y:d.y-25,w:170,h:50}:b,'am',.3);lab(cur[1]+' '+cur[0],d?d.x:A.W/2,d?d.y:b.y+25,A.narrow?15:16,{max:164});S.chip=b}
 else lab('Six animals, two poles',A.W/2,A.H*.15,A.narrow?16:18,{col:C.gr})}
function send(k){const cur=BEASTS[S.bi];S.lift=null;if(!cur)return;
 if(k!==cur[2])return tell(cur[2]==='N'?`The ${cur[0]} lives in the Arctic, in the far north.`:`The ${cur[0]} lives in the far south, around Antarctica.`,false);
 S.home.push(cur);S.bi++;if(S.bi>=BEASTS.length){S.sorted=true;return tell('Polar bears live only in the north. Penguins live in the south, and none live in the Arctic. They never meet in the wild.',true)}
 tell(`Yes: the ${cur[0]} lives in the ${k==='N'?'Arctic':'Antarctic'}.`,true)}
/* ---- blubber: walrus in icy water ---- */
function tank(){return{x:A.W*.1,y:A.H*.2,w:A.W*.8,h:A.H*.42}}
function drawBlubber(){const g=A.ctx,C=A.col,T=tank(),t=S.fat,warm=t>=.75;
 slab(T,'cy',.3,8);lab('icy water, about 0 °C',T.x+T.w/2,T.y+14,13,{w:600});
 const cx=A.W/2,cy=T.y+T.h*.58,rx=T.w*.28,ry=T.h*.26,ring=6+t*28;g.fillStyle=ice('am',.55);g.beginPath();g.ellipse(cx,cy,rx+ring,ry+ring,0,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();
 g.fillStyle=ice('rd',.45);g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,7);g.fill();g.stroke();lab('warm body',cx,cy,14);lab(`blubber: ${Math.round(t*15)} cm thick`,A.W/2,A.H*.145,A.narrow?14:15,{w:600,col:C.mu});
 S.edge={x:cx+rx+ring,y:cy};g.fillStyle=C.rd;g.beginPath();g.arc(S.edge.x,S.edge.y,10,0,7);g.fill();
 meter(A.W*.15,A.H*.71,A.W*.7,1-t*.85,`heat lost: ${Math.round((1-t*.85)*100)}%`,warm);
 lab(warm?'Warm walrus':'Cold walrus: drag the red dot out',A.W/2,A.H*.08,A.narrow?16:19,{col:warm?C.gr:C.tx})}
function setFat(v){S.fat=Math.max(0,Math.min(1,v));if(S.wrapped){A.redraw();return}
 if(S.fat>=.75){S.wrapped=true;return tell('Thick blubber is fat under the skin. Heat from the body passes through it slowly, so the walrus stays warm in icy water.',true)}
 speak(S.fat<.3?'Thin fat: body heat escapes into the icy water fast.':'Thicker blubber, less heat lost. Keep going.');A.redraw()}
function swim(){tell('Swimming harder burns energy fast and still loses heat to the water. A thick blubber layer is what keeps the heat in.',false)}
/* ---- huddle: emperor penguins ---- */
const ring=()=>({x:A.W*.62,y:A.H*.5,r:Math.min(A.W*.22,A.H*.2)});
function spot(i){const R=ring(),a=i/PEN*6.283;return i===0?{x:R.x,y:R.y}:{x:R.x+Math.cos(a)*R.r*.55,y:R.y+Math.sin(a)*R.r*.55}}
function drawHuddle(){const g=A.ctx,C=A.col,R=ring(),n=S.inside.length,loss=1-n/PEN*.5;
 g.strokeStyle=C.cy;g.lineWidth=2;for(let i=0;i<4;i++){const y=A.H*(.25+i*.13);g.beginPath();g.moveTo(8,y);g.lineTo(A.W*.25,y-6);g.stroke()}lab('wind',A.W*.12,A.H*.2,13,{w:600});
 g.setLineDash([6,5]);g.strokeStyle=A.alpha(C.tx,.6);g.beginPath();g.arc(R.x,R.y,R.r,0,7);g.stroke();g.setLineDash([]);lab('huddle',R.x,R.y-R.r-12,14);
 S.peng.forEach((p,i)=>{const at=S.inside.includes(i)?spot(S.inside.indexOf(i)):p;lab('🐧',at.x,at.y,A.narrow?28:32)});
 meter(A.W*.12,A.H*.74,A.W*.76,loss,`heat lost by each penguin: ${Math.round(loss*100)}%`,n===PEN);
 lab(n===PEN?'All six huddled':'Drag each penguin into the huddle',A.W/2,A.H*.08,A.narrow?16:18,{col:n===PEN?C.gr:C.tx})}
function huddle(i){if(S.inside.includes(i))return;S.inside.push(i);const n=S.inside.length;
 if(n===PEN){S.huddled=true;return tell('Huddled close, each penguin loses much less heat, up to about half. They take turns on the cold outside edge.',true)}
 tell(`${n} in the huddle. Less wind reaches each one.`,true)}
function hidePen(){tell('No polar bears live in Antarctica, so there is nothing to hide from here. Penguins huddle to share warmth and block the wind.',false)}
/* ---- coat: Arctic fox and the seasons ---- */
const swatch=i=>({x:i?A.W*.55:A.W*.08,y:A.H*.6,w:A.W*.37,h:50});
function drawCoat(){const g=A.ctx,C=A.col,win=S.season==='winter';g.fillStyle=win?ice('ln',.12):ice('am',.35);g.fillRect(0,A.H*.3,A.W,A.H*.24);
 lab(win?'Winter: snow everywhere':'Summer: brown rocks and plants',A.W/2,A.H*.08,A.narrow?16:18);lab(`Season ${S.round+1} of 2`,A.W/2,A.H*.16,13,{w:600,col:C.mu});
 const fx=A.W/2,fy=A.H*.43;g.fillStyle=S.fur==='white'?'#f4f4f4':S.fur==='brown'?'#7a5230':ice('ln',.35);g.strokeStyle=C.tx;g.lineWidth=2;g.beginPath();g.ellipse(fx,fy,48,24,0,0,7);g.fill();g.stroke();g.beginPath();g.arc(fx+50,fy-16,16,0,7);g.fill();g.stroke();S.foxAt={x:fx-60,y:fy-44,w:130,h:80};
 if(!S.fur)lab('?',fx,fy,18);
 [['white',0],['brown',1]].forEach(([k,i])=>{if(S.pull&&S.pull.k===k)return;const b=swatch(i);slab(b,k==='white'?'ln':'am',k==='white'?.08:.45);lab(k+' coat',b.x+b.w/2,b.y+25,15)});
 if(S.pull){slab({x:S.pull.x-60,y:S.pull.y-22,w:120,h:44},'vi',.3);lab(S.pull.k+' coat',S.pull.x,S.pull.y,15)}}
function dress(k){if(S.coated)return;const win=S.season==='winter',right=win?'white':'brown';
 if(k!==right){S.fur=k;return tell(win?'A brown fox shows up on white snow. Prey would see it coming. Try again.':'A white fox shows up on brown summer ground. Its coat changes with the seasons.',false)}
 S.fur=k;if(S.round===0){tell(win?'White on snow: hidden. The winter coat is also thicker and warmer. Now it is summer.':'Brown on brown ground: hidden.',true);setTimeout(()=>{if(scene()!=='coat')return;S.round=1;S.season='summer';S.fur=null;A.redraw();keys()},A.reduced()?10:900);return}
 S.coated=true;tell('The Arctic fox moults: thick and white in winter, thinner and brown in summer, so it stays hidden all year.',true)}
/* ---- build: features then blizzard test ---- */
const chipB=i=>{const cols=2,w=(A.W-34)/cols,h=A.narrow?42:40;return{x:12+(i%cols)*(w+10),y:A.H*.2+Math.floor(i/cols)*(h+8),w,h}};
function drawBuild(){const C=A.col,on=S.feat;
 lab(S.tested?(S.passed?'It survives the blizzard!':'Too cold: change the features'):'Pick features for a polar animal',A.W/2,A.H*.08,A.narrow?16:18,{col:S.passed?C.gr:C.tx});
 FEAT.forEach(([nm],i)=>{const b=chipB(i),sel=on.includes(i);slab(b,sel?'cy':'ln',sel?.4:.1);lab((sel?'✓ ':'')+nm,b.x+b.w/2,b.y+b.h/2,A.narrow?14:15,{max:b.w-8})});
 const good=on.filter(i=>FEAT[i][1]).length,bad=on.length-good,heat=Math.max(0,Math.min(1,.2+good*.27-bad*.3));
 S.test={x:A.W/2-80,y:A.H*.2+3*((A.narrow?42:40)+8)+8,w:160,h:46};slab(S.test,'vi',.3);lab('❄️ Blizzard test',A.W/2,S.test.y+23,15);
 if(S.tested)meter(A.W*.15,S.test.y+76,A.W*.7,heat,`body heat kept: ${Math.round(heat*100)}%`,S.passed)}
function toggle(i){S.tested=false;const k=S.feat.indexOf(i);if(k>=0)S.feat.splice(k,1);else S.feat.push(i);speak((k>=0?'Removed ':'Added ')+FEAT[i][0]+'.');A.redraw();keys()}
function blizzard(){const bad=S.feat.filter(i=>!FEAT[i][1]),good=S.feat.filter(i=>FEAT[i][1]);S.tested=true;
 if(bad.length)return tell(FEAT[bad[0]][2]+' Take it off.',false);
 if(good.length<3)return tell(`Only ${good.length} warm feature${good.length===1?'':'s'}. Add more ways to keep heat in.`,false);
 S.passed=true;S.built=true;tell('Thick fur, blubber and small ears keep heat in. Polar bears and walruses have these features.',true)}
/* ---- frame ---- */
function draw(){const{ctx:g,W:w,H:h,col:C}=A,k=scene();g.fillStyle=A.mix(C.pn,C.cy,C.dark?.05:.07);g.fillRect(0,0,w,h);
 if(k==='quiz'){lab('❄️ Polar animals check',w/2,h*.42,A.narrow?18:21);lab('Answer below',w/2,h*.55,14,{col:C.mu,w:500});A.fx.draw(g);return}
 ({poles:drawPoles,blubber:drawBlubber,huddle:drawHuddle,coat:drawCoat,build:drawBuild})[k]();if(S.msg)banner(S.msg);A.fx.draw(g)}
function tell(t,good){S.msg=t;if(good)A.sound.pop();else if(good===false)A.sound.miss();speak(t);keys();A.redraw();S.then&&S.then()}
function clean(){for(const k in S)delete S[k];Object.assign(S,{bi:0,home:[],fat:.1,inside:[],peng:[...Array(PEN)].map((_,i)=>({x:A.W*(.08+.06*(i%3)),y:A.H*(.38+.12*Math.floor(i/3))+(i%2)*14})),season:'winter',round:0,fur:null,feat:[],msg:'',then:()=>{}});A.redraw()}
function keys(){if(!dock)return;dock.innerHTML='';const k=scene();if(k==='quiz')return;
 const add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:48px;padding:8px 12px','aria-label':l||t},dock,t).onclick=f};
 if(k==='poles'&&BEASTS[S.bi]){add('Arctic (north)',()=>send('N'),`${BEASTS[S.bi][0]}: Arctic`);add('Antarctic (south)',()=>send('S'),`${BEASTS[S.bi][0]}: Antarctic`)}
 if(k==='blubber'&&!S.wrapped){add('Thicker blubber',()=>setFat(S.fat+.25));add('Thinner blubber',()=>setFat(S.fat-.25));add('Swim harder instead',swim)}
 if(k==='huddle'&&!S.huddled){const next=[...Array(PEN).keys()].find(i=>!S.inside.includes(i));add('Add a penguin to the huddle',()=>huddle(next));add('Huddle to hide from polar bears',hidePen)}
 if(k==='coat'&&!S.coated){add('White coat',()=>dress('white'));add('Brown coat',()=>dress('brown'))}
 if(k==='build'&&!S.built){FEAT.forEach(([nm],i)=>add((S.feat.includes(i)?'Remove ':'Add ')+nm,()=>toggle(i)));add('Blizzard test',blizzard)}}
function grab(p){const k=scene();if(k==='quiz')return false;
 if(k==='poles'&&BEASTS[S.bi]){if(over(p,S.chip)){S.lift={x:p.x,y:p.y};return true}for(const q of['N','S'])if(over(p,pole(q))){send(q);return true}return false}
 if(k==='blubber'){if(S.edge&&Math.hypot(p.x-S.edge.x,p.y-S.edge.y)<34){S.hand='fat';return true}return false}
 if(k==='huddle'){for(let i=0;i<PEN;i++)if(!S.inside.includes(i)&&Math.hypot(p.x-S.peng[i].x,p.y-S.peng[i].y)<26){S.hand=i;return true}return false}
 if(k==='coat'){for(const[q,i]of[['white',0],['brown',1]])if(over(p,swatch(i))){S.pull={k:q,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
 if(k==='build'){for(let i=0;i<FEAT.length;i++)if(over(p,chipB(i))){toggle(i);return true}if(over(p,S.test)){blizzard();return true}}
 return false}
function drag(p){const T=tank();
 if(S.hand==='fat')setFat((p.x-(A.W/2+T.w*.28)-6)/28);
 else if(typeof S.hand==='number'){S.peng[S.hand]={x:p.x,y:p.y};A.redraw()}
 else if(S.pull){S.pull.x=p.x;S.pull.y=p.y;A.redraw()}else if(S.lift){S.lift={x:p.x,y:p.y};A.redraw()}}
function drop(){const h=S.hand;S.hand=null;
 if(typeof h==='number'){const R=ring(),p=S.peng[h];if(Math.hypot(p.x-R.x,p.y-R.y)<R.r+10)huddle(h);else A.redraw();return}
 if(S.pull){const d=S.pull;S.pull=null;if(Math.hypot(d.x-d.x0,d.y-d.y0)<10||over(d,S.foxAt))dress(d.k);else A.redraw();return}
 if(S.lift){const d=S.lift;for(const q of['N','S'])if(over(d,pole(q)))return send(q);S.lift=null;A.redraw()}}
const doneIf=(i,ok,line)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(line()+A.reveal(i))};
function demo(i,acts,ms){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?30*(j+1):(j+1)*(ms||360)))}
function enter(i,hint,ok,line){clean();tell(hint);S.then=doneIf(i,ok,line)}
const steps=[
{h:'Two poles, two sets of animals',p:'The Arctic is at the top of the world. The Antarctic is at the bottom. Each has its own animals.',
 predict:{q:'Do polar bears and penguins meet in the wild?',opts:['yes, they share the icy poles','no: bears are north, penguins are south'],ans:1},
 task:'Send all six animals to the right pole',show:()=>demo(0,BEASTS.map(b=>()=>send(b[2]))),
 go:()=>enter(0,'Drag the animal card to a pole, or tap a pole.',()=>S.sorted,()=>'North and south sorted.')},
{h:'Blubber',p:'Walruses, seals and whales have blubber: a thick layer of fat under the skin. A walrus’s blubber can be about 15 cm thick.',
 predict:{q:'In icy water, what keeps a walrus warm?',opts:['swimming fast all the time','a thick layer of blubber'],ans:1},
 task:'Give the walrus enough blubber to stay warm',show:()=>demo(1,[()=>setFat(.35),()=>setFat(.6),()=>setFat(.85)]),
 go:()=>enter(1,'Drag the red dot outwards to add blubber.',()=>S.wrapped,()=>'Blubber keeps heat in.')},
{h:'The huddle',p:'In the Antarctic winter, emperor penguins stand close together in a huddle. Thousands can huddle at once.',
 predict:{q:'Why do emperor penguins huddle?',opts:['to share warmth and block the wind','to hide from polar bears','to keep their eggs dry'],ans:0},
 task:'Move all six penguins into the huddle',show:()=>demo(2,[...Array(PEN).keys()].map(i=>()=>huddle(i))),
 go:()=>enter(2,'Drag each penguin into the dashed circle.',()=>S.huddled,()=>'A warm huddle.')},
{h:'A coat for each season',p:'The Arctic fox grows a thick white coat for winter. In summer it moults into a thinner brown or grey coat.',
 predict:{q:'What colour is an Arctic fox in summer?',opts:['white all year','brown or grey'],ans:1},
 task:'Give the fox the right coat in winter and in summer',show:()=>demo(3,[()=>dress('white'),()=>dress('brown')],1200),
 go:()=>enter(3,'Drag a coat onto the fox, or tap a coat.',()=>S.coated,()=>'Hidden all year.')},
{h:'Build a polar body',p:'Pick the features that keep heat in, then test your animal in a blizzard.',
 predict:{q:'Which feature helps in the cold?',opts:['big thin ears','small ears'],ans:1},
 task:'Build an animal that survives the blizzard',show:()=>demo(4,[()=>toggle(0),()=>toggle(1),()=>toggle(2),blizzard]),
 go:()=>enter(4,'Tap features to add them, then tap Blizzard test.',()=>S.built,()=>'Ready for the cold.')},
{h:'Challenge',p:'',go:()=>{clean();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.then()});
const QS=[
 ['Where do polar bears live?',[['only in the Arctic, in the north','ok'],['at both poles','pole'],['in Antarctica with penguins','pole']]],
 ['Where do emperor penguins live?',[['around Antarctica, in the south','ok'],['in the Arctic','south'],['at the North Pole','south']]],
 ['What is blubber?',[['a thick layer of fat under the skin','ok'],['a kind of thick fur','blub'],['a big muscle for swimming','blub']]],
 ['Why do emperor penguins huddle?',[['to share warmth and block the wind','ok'],['to hide from polar bears','huddle'],['to sleep standing up','huddle']]],
 ['What colour is an Arctic fox in winter?',[['white','ok'],['brown all year','coat'],['the same in every season','coat']]],
 ['Which ears help an animal keep warm?',[['small ears','ok'],['big thin ears','ears'],['ears make no difference','ears']]],
 ['How does thick fur keep a polar bear warm?',[['it traps warm air next to the skin','ok'],['it makes heat like a heater','fur'],['it lets the cold out','fur']]]];
function why(t){let m='Think: how does this animal keep its body heat in?';
 if(t==='pole')m='Polar bears live only in the Arctic, in the far north. There are none in Antarctica.';
 if(t==='south')m='Almost all wild penguins live in the southern half of the world. None live in the Arctic.';
 if(t==='blub')m='Blubber is fat under the skin, not fur or muscle. It slows heat escaping.';
 if(t==='huddle')m='No polar bears live near penguins. Huddling shares warmth and blocks the icy wind.';
 if(t==='coat')m='The Arctic fox moults: white in snowy winter, brown or grey in summer.';
 if(t==='ears')m='Small ears lose less heat. Big thin ears let heat out, which helps in hot deserts.';
 if(t==='fur')m='Fur does not make heat. It traps a layer of warm air so body heat stays in.';
 return m}
function pose(){qq++;const Q=QS[qq%QS.length],r=qq%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 cq.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=cq.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:48px'},row,v).onclick=()=>judge(t)});speak('Challenge: '+Q[0]);A.redraw()}
function judge(t){cq.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes! ':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.72,tall:1.35,draw,onStep:A=>{cq.hidden=A.step!==5;dock.hidden=A.step===5;keys()},
 init:A=>{clean();const w=c.el('div',{class:'fl-below'},A.below);dock=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Polar animal buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);A.gest({down:grab,move:drag,up:drop});keys()}});
A.start()})})();
