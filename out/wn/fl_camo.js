/* Flagship: animal camouflage (ages 5-7; KS1 animals and habitats, 'living things live in habitats to which they are
   suited'). Painted scenes: tap the caterpillar a bird would miss, colour a moth to match bark, drag a white hare from
   brown earth to snow, choose the coat that hides a tiger in long grass, then let a bird hunt and see which moths are
   left. Camouflage depends on the background; hunters use it too. Every drag or tap has a button twin. */
(()=>{
const SCN={leaf:'#4d7c0f',bark:'#6b4a2b',snow:'#eef2f7',earth:'#7a5532',grass:'#b58a2a'};
const PAL={green:'#55861a',red:'#dc2626',yellow:'#facc15',brown:'#6e4c2c',white:'#f3f5f8',pink:'#ec4899',orange:'#ea7a1a'};
VIS.reg('flagcamo',c=>{let A,ctl,chal,qi=-1,run=0;const S={};
const kind=()=>['hide','match','move','pattern','hunt','chal'][A.step];
const say=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const rnd=s=>()=>(s=(s*16807)%2147483647)/2147483647;
const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const dist=(a,b)=>{const A1=rgb(a),B1=rgb(b);return Math.hypot(A1[0]-B1[0],A1[1]-B1[1],A1[2]-B1[2])};
function label(t,x,y){A.paint.label(t,x,y,{font:`700 ${A.narrow?13:15}px system-ui,sans-serif`,bg:'rgba(17,24,39,.82)',col:'#fff'})}
/* scenes are painted from a fixed seed so they never flicker */
function scene(kind2,x,y,w,h){const g=A.ctx,r=rnd(7+x|0);g.save();g.beginPath();g.rect(x,y,w,h);g.clip();g.fillStyle=SCN[kind2];g.fillRect(x,y,w,h);
 if(kind2==='leaf')for(let i=0;i<70;i++){g.fillStyle=['#3f6a0c','#5b8f1f','#365a0a'][i%3];g.beginPath();g.ellipse(x+r()*w,y+r()*h,10+r()*16,5+r()*7,r()*3,0,7);g.fill()}
 if(kind2==='bark')for(let i=0;i<46;i++){g.strokeStyle=['#563a20','#7d5a37','#4a321c'][i%3];g.lineWidth=2+r()*4;const sx=x+r()*w;g.beginPath();g.moveTo(sx,y);g.bezierCurveTo(sx+8,y+h*.3,sx-8,y+h*.6,sx+4,y+h);g.stroke()}
 if(kind2==='snow')for(let i=0;i<24;i++){g.fillStyle='rgba(148,163,184,.25)';g.beginPath();g.ellipse(x+r()*w,y+r()*h,18+r()*24,5+r()*5,0,0,7);g.fill()}
 if(kind2==='earth')for(let i=0;i<40;i++){g.fillStyle=['#5f4026','#8b6440'][i%2];g.beginPath();g.arc(x+r()*w,y+r()*h,2+r()*5,0,7);g.fill()}
 if(kind2==='grass')for(let i=0;i<90;i++){g.strokeStyle=['#7a5a17','#d4a73a','#3d2c0b'][i%3];g.lineWidth=3+r()*3;const sx=x+r()*w;g.beginPath();g.moveTo(sx,y+h);g.quadraticCurveTo(sx+6,y+h*.5,sx+(r()-.5)*24,y+r()*h*.3);g.stroke()}
 g.restore()}
function caterpillar(x,y,s,col){const g=A.ctx;for(let i=0;i<5;i++){g.fillStyle=col;g.beginPath();g.arc(x-s*1.6+i*s*.8,y+Math.sin(i)*s*.15,s*.5,0,7);g.fill()}g.fillStyle='#111';g.beginPath();g.arc(x+s*1.75,y-s*.1,s*.09,0,7);g.fill()}
function moth(x,y,s,col){const g=A.ctx;g.fillStyle=col;[[-1],[1]].forEach(([d])=>{g.beginPath();g.moveTo(x,y-s*.2);g.quadraticCurveTo(x+d*s*1.4,y-s*1.1,x+d*s*1.2,y+s*.5);g.quadraticCurveTo(x+d*s*.5,y+s*.7,x,y+s*.3);g.fill()});
 g.fillStyle=A.mix(col,'#000000',.35);g.beginPath();g.ellipse(x,y+s*.1,s*.14,s*.55,0,0,7);g.fill()}
function hare(x,y,s,col){const g=A.ctx;g.fillStyle=col;g.beginPath();g.ellipse(x,y,s*1.1,s*.75,0,0,7);g.fill();g.beginPath();g.arc(x+s*.95,y-s*.5,s*.45,0,7);g.fill();
 [[.8,-1.6],[1.15,-1.5]].forEach(([dx,dy])=>{g.beginPath();g.ellipse(x+s*dx,y+s*dy*.75-s*.25,s*.13,s*.5,.2,0,7);g.fill()});g.fillStyle='#111';g.beginPath();g.arc(x+s*1.1,y-s*.6,s*.07,0,7);g.fill()}
function tiger(x,y,s,coat){const g=A.ctx;g.save();g.beginPath();A.paint.rrect(x-s*1.4,y-s*.55,s*2.3,s*1.1,s*.5);g.arc(x+s*1.1,y-s*.25,s*.55,0,7);g.fillStyle=PAL.orange;g.fill();g.clip();
 g.fillStyle='#1c1306';if(coat==='stripes')for(let i=0;i<9;i++)g.fillRect(x-s*1.35+i*s*.32,y-s*.9,s*.1,s*1.8);
 if(coat==='spots'){const r=rnd(3);for(let i=0;i<14;i++){g.beginPath();g.arc(x-s*1.3+r()*s*2.9,y-s*.6+r()*s*1.2,s*.11,0,7);g.fill()}}g.restore();g.fillStyle='#111';g.beginPath();g.arc(x+s*1.3,y-s*.35,s*.07,0,7);g.fill()}
function sz(){return Math.min(A.W,A.H)*.075}
function draw(A){const{ctx:g,W,H}=A,k=kind(),s=sz();
 if(k==='chal'){g.fillStyle=A.mix(A.col.pn,'#ecfccb',A.col.dark?.04:.35);g.fillRect(0,0,W,H);const t=(m,y,w)=>{g.font=`${w} ${A.narrow?14:17}px system-ui,sans-serif`;g.textAlign='center';g.fillStyle=A.col.tx;g.fillText(m,W/2,y,W-12)};
  t('Camouflage: colours and patterns that blend in.',H*.36,800);t('It only works on the right background.',H*.5,700);t('Prey hide from predators. Predators hide too.',H*.64,700);A.fx.draw(g);return}
 if(k==='move'){scene('snow',0,0,W/2,H);scene('earth',W/2,0,W/2,H);label('snow',W*.25,H*.08);label('brown earth',W*.75,H*.08)}else scene(S.bg,0,0,W,H);
 S.animals.forEach((a,i)=>{if(a.gone)return;const x=a.x*W,y=a.y*H;
  if(a.t==='cat')caterpillar(x,y,s,PAL[a.c]);if(a.t==='moth')moth(x,y,s*(a.s||1),PAL[a.c]);if(a.t==='hare')hare(x,y,s*1.1,PAL[a.c]);if(a.t==='tiger')tiger(x,y,s*1.3,a.coat);
  if(S.ring===i){g.strokeStyle='#fff';g.lineWidth=4;g.beginPath();g.arc(x,y,s*2.3,0,7);g.stroke();g.strokeStyle='#111';g.lineWidth=2;g.beginPath();g.arc(x,y,s*2.3+3,0,7);g.stroke()}});
 if(S.bird){const b=S.bird;g.fillStyle='#111827';g.beginPath();g.moveTo(b.x-24,b.y);g.quadraticCurveTo(b.x-6,b.y-22,b.x,b.y-4);g.quadraticCurveTo(b.x+6,b.y-22,b.x+24,b.y);g.quadraticCurveTo(b.x,b.y-8,b.x-24,b.y);g.fill()}
 if(S.tag)label(S.tag,W/2,H-20);A.fx.draw(g)}
/* how much an animal stands out from what it sits on: the colour gap, made smaller by a pattern that matches the stripes */
function standOut(a){const bg=kind()==='move'?(a.x<.5?SCN.snow:SCN.earth):SCN[S.bg];let d=dist(PAL[a.c||'orange'],bg);if(a.coat==='stripes')d*=.35;if(a.coat==='spots')d*=.75;return d}
function tapAnimal(i){const a=S.animals[i];if(!a||a.gone)return;A.sound.tick();S.ring=i;const k=kind();
 if(k==='hide'){S.pick=a.c;say(a.c==='green'?'Yes. The green caterpillar blends in with the green leaves. A bird looking for food would find it last.':`The ${a.c} caterpillar stands out on green leaves. A bird would spot it first. Look for the one that matches.`)}
 A.redraw();S.check()}
function setColour(col){if(kind()!=='match')return;S.animals[0].c=col;A.sound.tick();
 say(col==='brown'?'The brown moth blends in with the brown bark. It is camouflaged.':col==='white'?'A white moth stands out on dark bark. It would be hidden on snow or pale stone, not here.':`A ${col} moth is easy to see on brown bark. Match the colour of the tree.`);A.redraw();S.check()}
function setCoat(coat){if(kind()!=='pattern')return;S.animals[0].coat=coat;A.sound.tick();
 say(coat==='stripes'?'The dark stripes look like the shadows between the grass. The tiger\u2019s outline breaks up and it is hard to see.':coat==='plain'?'A plain orange tiger shows its whole shape. The outline is easy to see in the grass.':'Round spots do not look like grass. The tiger is still easy to pick out.');A.redraw();S.check()}
function setHare(x){if(kind()!=='move')return;const a=S.animals[0];a.x=Math.max(.08,Math.min(.92,x));A.redraw()}
function hareSay(){const a=S.animals[0];say(a.x<.5?'The white hare is on the snow now. White on white: it is hidden.':'The white hare is on brown earth. White on brown stands out, so a fox would see it.');S.check()}
function hunt(){if(S.hunting||kind()!=='hunt')return;S.hunting=true;const r=run,order=S.animals.map((a,i)=>[standOut(a),i]).filter(z=>z[0]>60).sort((p,q)=>q[0]-p[0]);let j=0;say('The bird hunts. It catches the moths it can see best first.');
 const stepB=()=>{if(r!==run)return;if(j>=order.length){S.bird=null;S.hunting=false;S.hunted=true;const left=S.animals.filter(a=>!a.gone).length;S.tag=`${left} moths left`;say(`The bird has gone. ${left} moths are left, and they are all brown like the bark. They blended in.`);A.redraw();S.check();return}
  const a=S.animals[order[j][1]];S.bird={x:a.x*A.W,y:a.y*A.H-10};A.sound.pop();A.redraw();setTimeout(()=>{if(r!==run)return;a.gone=true;j++;A.redraw();stepB()},A.reduced()?20:420)};stepB()}
let drag=false;
function hit(p){const s=sz()*2.2;let best=-1,bd=1e9;S.animals.forEach((a,i)=>{if(a.gone)return;const d=Math.hypot(p.x-a.x*A.W,p.y-a.y*A.H);if(d<s&&d<bd){bd=d;best=i}});return best}
function down(p){const k=kind();if(k==='chal')return false;const i=hit(p);
 if(k==='move'){if(i===0){drag=true;return true}setHare(p.x/A.W);hareSay();return true}
 if(k==='hide'&&i>=0){tapAnimal(i);return true}
 if(k==='match'){const cs=['white','brown','green','pink'];setColour(cs[(cs.indexOf(S.animals[0].c)+1)%4]);return true}
 if(k==='pattern'){const cs=['plain','stripes','spots'];setCoat(cs[(cs.indexOf(S.animals[0].coat)+1)%3]);return true}
 if(k==='hunt'){hunt();return true}return false}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=kind(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||null},ctl,t).onclick=f};
 if(k==='hide')S.animals.forEach((a,i)=>btn(a.c+' caterpillar',()=>tapAnimal(i),`Choose the ${a.c} caterpillar`));
 if(k==='match')['white','brown','green','pink'].forEach(col=>btn(col,()=>setColour(col),`Make the moth ${col}`));
 if(k==='move'){btn('Move to snow',()=>{setHare(.25);hareSay()},'Move the hare onto the snow');btn('Move to earth',()=>{setHare(.75);hareSay()},'Move the hare onto the brown earth')}
 if(k==='pattern')[['plain','plain orange'],['stripes','stripes'],['spots','spots']].forEach(([v,n])=>btn(n,()=>setCoat(v),`Give the tiger a ${n} coat`));
 if(k==='hunt')btn('Bird hunts',()=>hunt(),'Let the bird hunt for moths')}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function reset(o){run++;drag=false;for(const x in S)delete S[x];Object.assign(S,{bg:'leaf',animals:[],ring:-1,check:()=>{}},o||{})}
function auto(i,acts){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},A.reduced()?25*(j+1):(j+1)*420))}
const steps=[
{h:'Hard to see',p:'Camouflage is when an animal\u2019s colour or pattern blends in with what is around it. Birds eat caterpillars. A caterpillar that is hard to see is more likely to stay safe.',
 predict:{q:'A bird looks for caterpillars on green leaves. Which one will it find last?',opts:['the green one','the red one','the yellow one'],ans:0},task:'Tap the caterpillar that is hardest to see',
 show:()=>auto(0,[()=>tapAnimal(1),()=>tapAnimal(0)]),
 go:()=>{reset({bg:'leaf',animals:[{t:'cat',c:'red',x:.24,y:.3},{t:'cat',c:'green',x:.62,y:.62},{t:'cat',c:'yellow',x:.78,y:.26}]});say('Three caterpillars on green leaves: red, green and yellow. Tap one, or use the buttons.');controls();S.check=finish(0,()=>S.pick==='green','The green one blends in with the leaves.')}},
{h:'Match the background',p:'To blend in, an animal needs to look like the place it lives. A moth that rests on tree bark in the day is safest if it is the colour of bark.',
 task:'Give the moth a colour that blends in with the bark',
 show:()=>auto(1,[()=>setColour('green'),()=>setColour('brown')]),
 go:()=>{reset({bg:'bark',animals:[{t:'moth',c:'white',x:.5,y:.48,s:1.5}]});say('A white moth rests on brown tree bark. Tap the moth to change its colour, or use the colour buttons.');controls();S.check=finish(1,()=>S.animals[0].c==='brown','A brown moth on brown bark is camouflaged.')}},
{h:'The wrong place',p:'Camouflage only works on the right background. A mountain hare has white fur in winter, which hides it on snow. On brown earth the same white fur stands out.',
 predict:{q:'A white hare sits on brown earth. Is it hidden?',opts:['No, it stands out','Yes, white always hides','Yes, if it is big'],ans:0},task:'Drag the hare to where it is hidden',
 show:()=>auto(2,[()=>setHare(.6),()=>setHare(.42),()=>{setHare(.25);hareSay()}]),
 go:()=>{reset({animals:[{t:'hare',c:'white',x:.72,y:.6}]});say('The scene is half snow and half brown earth. The white hare is on the brown earth. Drag it, or use the buttons.');controls();S.check=finish(2,()=>S.animals[0].x<.5,'White on snow: the hare is hidden.')}},
{h:'Patterns hide shapes',p:'Camouflage is not only colour. Stripes or spots can break up an animal\u2019s outline. Predators use camouflage too: a tiger hides in long grass to creep up on a deer.',
 predict:{q:'Which tiger is hardest to see in long grass?',opts:['the striped one','the plain orange one','the spotty one'],ans:0},task:'Choose the coat that hides the tiger best in the long grass',
 show:()=>auto(3,[()=>setCoat('spots'),()=>setCoat('stripes')]),
 go:()=>{reset({bg:'grass',animals:[{t:'tiger',coat:'plain',x:.5,y:.6}]});say('A plain orange tiger lies in long grass. Tap the tiger to change its coat, or use the buttons.');controls();S.check=finish(3,()=>S.animals[0].coat==='stripes','Stripes look like grass and shadow.')}},
{h:'The bird hunts',p:'Predators catch the animals they can see. The prey that blend in are left. That is why so many animals have colours and patterns like their habitat.',
 predict:{q:'A bird hunts moths on brown bark. Which moths are left at the end?',opts:['the brown ones','the bright ones','all of them'],ans:0},task:'Press Bird hunts and watch which moths are left',
 show:()=>{steps[4].go();setTimeout(hunt,60)},
 go:()=>{const cs=['brown','yellow','white','brown','red','green','brown','pink'],pos=[[.15,.25],[.42,.2],[.72,.22],[.86,.55],[.6,.5],[.3,.58],[.5,.82],[.16,.8]];
  reset({bg:'bark',animals:cs.map((col,i)=>({t:'moth',c:col,x:pos[i][0],y:pos[i][1]}))});say('Eight moths rest on brown bark: three brown, one yellow, one white, one red, one green and one pink. Tap the bark or press Bird hunts.');controls();S.check=finish(4,()=>S.hunted,'Only the brown moths are left.')}},
{h:'Challenge',p:'',go:()=>{reset();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
const QS=[['A green frog sits on a green leaf. Why is it hard to see?',[['its colour matches the leaf','ok'],['it is very small','size'],['it is asleep','still']]],
 ['A white hare sits on brown mud. What happens?',[['it is easy to see','ok'],['it is hidden: white always hides','always'],['it is hidden because it is big','size']]],
 ['Why does a polar bear have white fur?',[['to blend in with snow and ice','ok'],['to keep it clean','other'],['so other animals can see it','show']]],
 ['A tiger hides in long grass to catch a deer. Who is using camouflage?',[['the tiger, the predator','ok'],['only animals that get eaten','prey'],['nobody: tigers are too big','size']]],
 ['Which moth will a bird find first on brown bark?',[['a yellow moth','ok'],['a brown moth','match'],['they are all found at once','same']]],
 ['What is camouflage?',[['colours or patterns that help an animal blend in','ok'],['running very fast','fast'],['hiding in a hole','hole']]]];
function why(t){let m='Look at the animal and the background together. Does it blend in or stand out?';
 if(t==='size')m='Size is not the clue. Look at the colour and pattern next to the background.';
 if(t==='still')m='Keeping still helps, but the frog is hard to see because green matches green.';
 if(t==='always')m='Camouflage depends on the background. White hides on snow but stands out on brown mud.';
 if(t==='other')m='White fur matches snow and ice, so a polar bear can creep up on seals without being seen.';
 if(t==='show')m='The opposite: white on white is hard to see. That helps the bear hunt.';
 if(t==='prey')m='Predators use camouflage too. A striped tiger hides in the grass to creep close to its prey.';
 if(t==='match')m='A brown moth matches brown bark, so the bird finds it last. Bright colours stand out first.';
 if(t==='same')m='The bird sees the moths that stand out first. Moths that blend in are found last, or not at all.';
 if(t==='fast'||t==='hole')m='That is another way to stay safe. Camouflage means looking like the background.';
 return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],sh=(qi+2)%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');[...ops.slice(sh),...ops.slice(0,sh)].forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},box,o).onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
let streak=0;function judge(t){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.6,tall:.95,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Camouflage controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>down(p),move:p=>{if(drag)setHare(p.x/A.W)},up:()=>{if(drag){drag=false;hareSay()}}});controls()}});
A.start()})})();
