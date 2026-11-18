/* Flagship – drawing to help me think (dual coding, ages 6–7): make a quick sketch that shows one idea with two stamps
   (and find that glitter and rainbows add nothing), label a plant diagram, add pictures to word cards and use a picture
   clue to find a word again, put picture cards into a seed-to-flower timeline, then pick the picture that really helps
   explain something. Challenge targets the usual slips: thinking a thinking picture must be neat and coloured in,
   thinking pictures are only for fun, and mistaking decoration for explanation. */
(()=>{const TRAY=[['sun','☀️'],['tree','🌳'],['glitter','✨'],['rainbow','🌈']],PARTS=['roots','flower','leaf','stem'],
 CARDS=[['dog','🐶'],['apple','🍎'],['rain','🌧️'],['boat','⛵']],STAGES=['Seed','Roots','Shoot','Flower'],MIX=[2,0,3,1],
 ROUNDS=[{t:'How rain makes a puddle',ops:{help:[['☁️','cloud'],['⬇',''],['🌧️','rain'],['⬇',''],['💧','puddle']],deco:[['✨',''],['🌈',''],['💖',''],['⭐',''],['✨','']],off:[['🚗','car'],['🏠','house']]}},
 {t:'What a plant needs to grow',ops:{help:[['🌱','plant'],['＋',''],['☀️','light'],['＋',''],['💧','water']],deco:[['🌱',''],['✨',''],['💖',''],['✨',''],['🌈','']],off:[['🐶','dog'],['🦴','bone']]}},
 {t:'What I did first, next and last',ops:{help:[['1 🥣','bowl'],['2 🥛','milk'],['3 🥄','eat']],deco:[['🥣',''],['✨',''],['💖',''],['⭐','']],off:[['⚽','ball'],['🧦','sock']]}}];
VIS.reg('flagsketch',c=>{let A,pad,quiz,qn=-1,run=0;c.fig.classList.add('young');
const G={};
const part=()=>['sketch','label','cards','line','pick','quiz'][A.step];
const speak=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fz=n=>Math.round(n*(A.narrow?1.05:1.2));
/* every word is drawn in the theme's text colour over pale tints, so contrast holds in light and dark themes */
function txt(g,s,x,y,n,w,al){g.font=`${w||700} ${fz(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(s,x,y,A.W-12)}
function box(g,x,y,w,h,col,a,edge,lw){g.fillStyle=A.alpha(col,a);A.paint.rrect(x,y,w,h,12);g.fill();g.lineWidth=lw||2;g.strokeStyle=edge||A.col.tx;A.paint.rrect(x,y,w,h,12);g.stroke()}
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---------- step 0: quick sketch ---------- */
const page=()=>({x:8,y:A.H*.1,w:A.W-16,h:A.H*.6});
const trayAt=i=>({x:A.W*(.14+i*.24),y:A.H*.82});
const TR=()=>Math.min(A.W/11,A.H/10);
/* ---------- step 1: plant diagram ---------- */
const PX=()=>A.W*.3,SOIL=()=>A.H*.64;
function zone(k){const x=PX(),W=A.W,H=A.H;return{flower:{x:x-W*.1,y:H*.06,w:W*.2,h:H*.2},leaf:{x:x+W*.02,y:H*.33,w:W*.15,h:H*.12},stem:{x:x-W*.035,y:H*.27,w:W*.05,h:H*.36},roots:{x:x-W*.12,y:SOIL(),w:W*.24,h:H*.2}}[k]}
const tagY=k=>({flower:.16,leaf:.39,stem:.53,roots:.74}[k]*A.H);
/* ---------- step 2: word cards ---------- */
const card=i=>{const w=(A.W-16)/4;return{x:8+i*w+4,y:A.H*.1,w:w-8,h:A.H*.3}};
/* ---------- step 3: timeline ---------- */
const slot=i=>{const w=(A.W-16)/4;return{x:8+i*w+4,y:A.H*.1,w:w-8,h:A.H*.28}};
const trayCard=i=>{const w=(A.W-16)/4;return{x:8+i*w+4,y:A.H*.56,w:w-8,h:A.H*.28}};
/* ---------- step 4: three pictures ---------- */
const panel=i=>{const w=(A.W-16)/3;return{x:8+i*w+4,y:A.H*.18,w:w-8,h:A.H*.62}};
const order=()=>{const k=['help','deco','off'],r=(G.rnd+1)%3;return k.slice(r).concat(k.slice(0,r))};
function plant(g,x,soil,top,k,s){const C=A.col;g.lineCap='round';
 g.strokeStyle=A.alpha(C.am,.9);g.lineWidth=2;g.beginPath();g.moveTo(x-s*.5,soil);g.lineTo(x+s*.5,soil);g.stroke();
 if(k>=1){g.strokeStyle=C.tx;g.lineWidth=Math.max(1.5,s*.025);[-1,-.4,.4,1].forEach(d=>{g.beginPath();g.moveTo(x,soil+s*.12);g.quadraticCurveTo(x+d*s*.25,soil+s*.4,x+d*s*.5,soil+s*.7);g.stroke()})}
 g.fillStyle=A.alpha(C.am,.9);g.beginPath();g.ellipse(x,soil+s*.1,s*.16,s*.1,0,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();
 if(k>=2){g.strokeStyle=C.gr;g.lineWidth=Math.max(3,s*.09);g.beginPath();g.moveTo(x,soil);g.lineTo(x,k>=3?top:soil-(soil-top)*.45);g.stroke();
  g.fillStyle=A.alpha(C.gr,.85);g.beginPath();g.ellipse(x+s*.2,soil-(soil-top)*.35,s*.2,s*.08,-.4,0,7);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.2;g.stroke();
  if(k>=3){g.beginPath();g.ellipse(x-s*.2,soil-(soil-top)*.6,s*.2,s*.08,.4,0,7);g.fill();g.stroke();
   for(let a=0;a<6;a++){A.paint.ball(x+Math.cos(a*1.05)*s*.17,top+Math.sin(a*1.05)*s*.17,s*.11,C.pk)}A.paint.ball(x,top,s*.1,C.am)}}}
function draw(A){const{ctx:g,W,H,col:C}=A,v=part();g.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.05:.45);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'✏️ quick sketch',W/2,H*.28,20,800);txt(g,'🏷️ labels',W/2,H*.46,20,800);txt(g,'1 → 2 → 3 timeline',W/2,H*.64,20,800);return}
 if(v==='sketch'){const pg=page(),r=TR();box(g,pg.x,pg.y,pg.w,pg.h,C.cy,.06,C.tx,1.5);txt(g,'Show: the sun is above the tree',W/2,H*.05,13,800);
  G.items.forEach(it=>txt(g,TRAY.find(t=>t[0]===it.k)[1],it.x,it.y,30));
  TRAY.forEach(([k,e],i)=>{const p=trayAt(i);box(g,p.x-r,p.y-r,r*2,r*2,k==='sun'||k==='tree'?C.gr:C.pk,.14,G.oops===k?C.rd:C.tx,G.oops===k?4:1.5);txt(g,e,p.x,p.y-r*.1,20);txt(g,k,p.x,p.y+r*.68,9,700)});
  if(G.hold)txt(g,TRAY.find(t=>t[0]===G.hold.k)[1],G.hold.x,G.hold.y,32);
  txt(g,G.done?'Done: 2 quick stamps':`Stamps used: ${G.items.length}`,W/2,H*.97,11,600)}
 if(v==='label'){const x=PX(),soil=SOIL();g.fillStyle=A.alpha(C.am,.2);g.fillRect(8,soil,W*.58,H*.24);g.strokeStyle=C.tx;g.lineWidth=1.5;g.beginPath();g.moveTo(8,soil);g.lineTo(W*.58,soil);g.stroke();
  plant(g,x,soil,H*.16,3,Math.min(W*.42,H*.36));
  G.tags.forEach(k=>{const z=zone(k),ty=tagY(k);g.strokeStyle=C.tx;g.lineWidth=1.5;g.beginPath();g.moveTo(W*.64,ty);g.lineTo(z.x+z.w*.6,z.y+z.h/2);g.stroke();box(g,W*.64,ty-fz(11),W*.32,fz(22),C.gr,.22,C.tx,1.5);txt(g,k,W*.8,ty,12,800)});
  if(G.oops){const z=zone(G.oops);g.strokeStyle=C.rd;g.lineWidth=3;g.strokeRect(z.x,z.y,z.w,z.h)}
  txt(g,G.tags.length<4?`Where does “${PARTS[G.tags.length]}” go? Tap the part.`:'All 4 parts labelled!',W/2,H*.93,12,800)}
 if(v==='cards'){const brain={x:W/2,y:H*.8};CARDS.forEach(([w,e],i)=>{const b=card(i),pic=i<G.pics;box(g,b.x,b.y,b.w,b.h,pic?C.gr:C.cy,pic?.16:.08,G.oops===i?C.rd:C.tx,G.oops===i?4:2);
   if(G.hide)txt(g,'?',b.x+b.w/2,b.y+b.h/2,24,800);else{if(pic)txt(g,e,b.x+b.w/2,b.y+b.h*.36,26);txt(g,w,b.x+b.w/2,b.y+b.h*(pic?.78:.5),14,800)}
   const sx=b.x+b.w/2,sy=b.y+b.h;g.lineWidth=2.5;g.strokeStyle=C.vi;g.setLineDash([5,5]);g.beginPath();g.moveTo(sx-6,sy);g.lineTo(brain.x-8,brain.y-14);g.stroke();g.setLineDash([]);
   if(pic){g.strokeStyle=C.gr;g.beginPath();g.moveTo(sx+6,sy);g.lineTo(brain.x+8,brain.y-14);g.stroke()}});
  txt(g,'🧠',brain.x,brain.y,30);txt(g,'- - word path    —— picture path',W/2,H*.95,10,600);
  txt(g,G.hide?(G.done?'Found it with the picture clue!':'Clue: 🌧️ Which word was on that card?'):`Pictures added: ${G.pics} of 4`,W/2,H*.05,12,800)}
 if(v==='line'){const nm=['First','Next','Then','Last'],s=Math.min(card(0).w,A.H*.28);
  for(let i=0;i<4;i++){const b=slot(i),k=G.line[i];box(g,b.x,b.y,b.w,b.h,k==null?C.cy:C.gr,k==null?.06:.16,C.tx,1.5);txt(g,nm[i],b.x+b.w/2,b.y-fz(8),11,800);
   if(k!=null){plant(g,b.x+b.w/2,b.y+b.h*.55,b.y+b.h*.16,k,s*.5);txt(g,STAGES[k],b.x+b.w/2,b.y+b.h*.9,10,700)}}
  if(G.line.length>1){g.strokeStyle=C.tx;g.lineWidth=1.5;for(let i=1;i<G.line.length;i++){const a=slot(i-1),b=slot(i);txt(g,'→',(a.x+a.w+b.x)/2,a.y+a.h/2,12,800)}}
  MIX.forEach((k,i)=>{if(G.line.includes(k))return;const b=trayCard(i);box(g,b.x,b.y,b.w,b.h,C.or,.12,G.oops===k?C.rd:C.tx,G.oops===k?4:2);plant(g,b.x+b.w/2,b.y+b.h*.55,b.y+b.h*.16,k,s*.5);txt(g,STAGES[k],b.x+b.w/2,b.y+b.h*.9,10,700)});
  txt(g,G.line.length<4?'Tap the picture that comes '+['first','next','then','last'][G.line.length]:'Seed → roots → shoot → flower',W/2,H*.94,12,800)}
 if(v==='pick'){const R=ROUNDS[Math.min(G.rnd,2)];txt(g,G.rnd<3?'Which picture helps explain:':'All 3 picked!',W/2,H*.05,12,700);if(G.rnd<3)txt(g,R.t,W/2,H*.12,13,800);
  if(G.rnd<3)order().forEach((k,i)=>{const b=panel(i),rows=R.ops[k],rh=b.h/(rows.length+1);box(g,b.x,b.y,b.w,b.h,C.cy,.06,G.oops===k?C.rd:C.tx,G.oops===k?4:2);txt(g,'ABC'[i],b.x+14,b.y+14,10,800);
   rows.forEach(([e,l],j)=>{const y=b.y+rh*(j+.9);if(l){txt(g,e,b.x+b.w*.3,y,15);txt(g,l,b.x+b.w*.68,y,9,700)}else txt(g,e,b.x+b.w/2,y,15)})});
  txt(g,`Picked: ${G.rnd} of 3`,W/2,H*.9,11,600)}
 A.fx.draw(g)}
const no=(t,mark)=>{G.oops=mark;A.sound.miss();speak(t);A.redraw()},yes=t=>{G.oops=null;A.sound.pop();speak(t);buttons();A.redraw();G.want()};
/* step 0 */
function place(k,x,y){G.hold=null;const it=G.items.find(i=>i.k===k);if(it){it.x=x;it.y=y}else G.items.push({k,x,y});A.sound.tick();
 if(k==='glitter'||k==='rainbow'){G.deco=1;return no('Pretty! But it does not show the sun or the tree. A thinking picture stays quick and simple.',k)}
 G.oops=null;speak(k==='sun'?'A sun. Where is it?':'A tree.');buttons();A.redraw()}
function check(){const s=G.items.find(i=>i.k==='sun'),t=G.items.find(i=>i.k==='tree');
 if(!s||!t)return no('Put a sun and a tree on the page first.',null);
 if(s.y>=t.y-10)return no('The sun is not above the tree yet. Drag the sun higher up the page.','sun');
 G.done=1;yes(G.deco?'Yes! The sun is above the tree. The sparkles were not needed.':'Yes! Two quick stamps show the idea. No colouring in.')}
/* step 1 */
const WHERE={roots:'Roots grow under the soil. Tap the part below the brown line.',flower:'The flower is the round, bright part at the top.',leaf:'A leaf is a flat green part on the side of the stem.',stem:'The stem is the long middle part that holds the plant up.'};
function tag(k){const want=PARTS[G.tags.length];if(!want)return;
 if(k!==want)return no(`That is the ${k}. ${WHERE[want]}`,k);
 G.tags.push(k);G.oops=null;A.sound.tick();if(G.tags.length<4){speak(`Yes, ${k}. Now find the ${PARTS[G.tags.length]}.`);buttons();return A.redraw()}
 yes('All 4 labels! A labelled diagram names each part, so you can explain it.')}
/* step 2 */
function addPic(){if(G.pics>=4)return;G.pics++;A.sound.tick();if(G.pics<4){speak(CARDS[G.pics-1][0]+' has a picture now. Two paths into your brain.');buttons();return A.redraw()}
 G.hide=1;speak('Cards turned over. Clue: rain drops. Which word was on that card?');buttons();A.redraw()}
function recall(w){if(!G.hide||G.done)return;if(w!=='rain')return no(`The ${w} card had a different picture. Think: which word goes with drops of rain?`,CARDS.findIndex(c=>c[0]===w));
 G.done=1;yes('Rain! The picture clue helped you find the word.')}
/* step 3 */
function put(k){if(G.line.length>=4||G.line.includes(k))return;const want=G.line.length;
 if(k!==want)return no(`${STAGES[k]} comes later. What happens ${['first','next','then','last'][want]}?`,k);
 G.line.push(k);G.oops=null;A.sound.tick();if(G.line.length<4){speak(STAGES.slice(0,G.line.length).join(', ')+'…');buttons();return A.redraw()}
 yes('Seed, roots, shoot, flower. A timeline shows the order at a glance.')}
/* step 4 */
function pick(k){if(G.rnd>=3)return;
 if(k!=='help')return no(k==='deco'?'Pretty, but sparkles do not explain anything. Find the picture that shows the idea.':'That picture is about something else. Find the one that shows the idea.',k);
 G.rnd++;G.oops=null;A.sound.tick();if(G.rnd<3){speak('Yes. Next: '+ROUNDS[G.rnd].t);buttons();return A.redraw()}
 yes('All 3! The helpful pictures were simple, with words or arrows, and no extra sparkle.')}
function buttons(){if(!pad)return;pad.innerHTML='';const v=part(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='sketch'&&!G.done){const pg=page();B('☀️ Sun',()=>place('sun',A.W*.32,pg.y+pg.h*.22),'Put a sun near the top of the page');B('🌳 Tree',()=>place('tree',A.W*.6,pg.y+pg.h*.7),'Put a tree near the bottom of the page');B('✨ Glitter',()=>place('glitter',A.W*.82,pg.y+pg.h*.2),'Add glitter');B('✔ Check',check,'Check the sketch')}
 if(v==='label'&&G.tags.length<4)[['🌸 Top','flower'],['🍃 Side','leaf'],['│ Middle','stem'],['〰 In the soil','roots']].forEach(([t,k])=>B(t,()=>tag(k),'Label the '+k));
 if(v==='cards'){if(G.pics<4)B('🖼 Add a picture',addPic,'Add a picture to the next card');else if(!G.done)['boat','rain','dog'].forEach(w=>B(w,()=>recall(w),'The word was '+w))}
 if(v==='line'&&G.line.length<4)MIX.filter(k=>!G.line.includes(k)).forEach(k=>B(STAGES[k],()=>put(k),'Put '+STAGES[k]+' next'));
 if(v==='pick'&&G.rnd<3)order().forEach((k,i)=>B('Picture '+'ABC'[i],()=>pick(k),'Choose picture '+'ABC'[i]))}
function down(p){const v=part(),r=TR();
 if(v==='sketch'&&!G.done){const i=TRAY.findIndex((_,j)=>Math.hypot(p.x-trayAt(j).x,p.y-trayAt(j).y)<r);if(i>=0){G.hold={k:TRAY[i][0],x:p.x,y:p.y,x0:p.x,y0:p.y};return true}
  const it=G.items.find(o=>Math.hypot(p.x-o.x,p.y-o.y)<r*1.2);if(it){G.hold={k:it.k,x:p.x,y:p.y,x0:-99,y0:-99};return true}return false}
 if(v==='label'){const k=['flower','leaf','roots','stem'].find(k=>inside(p,zone(k)));if(k)tag(k);return false}
 if(v==='cards'){if(G.pics<4&&inside(p,card(G.pics)))addPic();return false}
 if(v==='line'){MIX.forEach((k,i)=>{if(!G.line.includes(k)&&inside(p,trayCard(i)))put(k)});return false}
 if(v==='pick'&&G.rnd<3){order().forEach((k,i)=>{if(inside(p,panel(i)))pick(k)})}return false}
function move(p){if(G.hold){G.hold.x=p.x;G.hold.y=p.y;A.redraw()}}
function up(p){const h=G.hold;if(!h||part()!=='sketch')return;const pg=page(),tap=Math.hypot(p.x-h.x0,p.y-h.y0)<12;
 if(tap){const d={sun:[.32,.22],tree:[.6,.7],glitter:[.82,.2],rainbow:[.18,.55]}[h.k];return place(h.k,A.W*d[0],pg.y+pg.h*d[1])}
 return inside(p,pg)?place(h.k,p.x,p.y):(G.hold=null,A.redraw())}
const ok=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const seq=(fns,ms)=>{const k=++G.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===G.tok)fn()},A.reduced()?j*20+20:(j+1)*ms))};
const clean=()=>{const t=(G.tok||0)+1;Object.keys(G).forEach(k=>delete G[k]);Object.assign(G,{tok:t,want:()=>{},items:[],hold:null,oops:null,deco:0,done:0,tags:[],pics:0,hide:0,line:[],rnd:0})};
const steps=[
{h:'Quick sketch',p:'A thinking picture is quick. Drag stamps onto the page, or use the buttons.',predict:{q:'A picture that helps you think must be…',opts:['Neat and coloured in','Quick and simple'],ans:1},task:'Show the sun above the tree, then Check',
 show:()=>{steps[0].go();const pg=page();seq([()=>place('tree',A.W*.6,pg.y+pg.h*.7),()=>place('sun',A.W*.32,pg.y+pg.h*.22),check],400)},
 go:()=>{clean();speak('Show the sun above the tree. Keep it quick.');buttons();G.want=ok(0,()=>G.done,'A sketch only needs the shapes that show the idea.')}},
{h:'Label it',p:'Labels are words that name the parts of a picture. Tap the part for each label.',task:'Put all 4 labels on the plant',
 show:()=>{steps[1].go();seq(PARTS.map(k=>()=>tag(k)),300)},
 go:()=>{clean();speak('Where do the roots go? Tap the part.');buttons();G.want=ok(1,()=>G.tags.length>=4,'Words plus a picture: you can point and explain each part.')}},
{h:'Word plus picture',p:'Add a picture to each word card. Then the cards turn over. Can a picture clue help you?',predict:{q:'Which is easier to remember?',opts:['A word on its own','A word with a picture'],ans:1},task:'Add 4 pictures, then use the clue',
 show:()=>{steps[2].go();seq([addPic,addPic,addPic,addPic,()=>recall('rain')],300)},
 go:()=>{clean();speak('Tap Add a picture for the dog card.');buttons();G.want=ok(2,()=>G.done,'A word with a picture gives your brain two ways to find it again.')}},
{h:'Make a timeline',p:'A timeline shows what happens in order. Tap the picture that comes first.',task:'Put the 4 pictures in order',
 show:()=>{steps[3].go();seq([0,1,2,3].map(k=>()=>put(k)),300)},
 go:()=>{clean();speak('A seed grows into a flower. What comes first?');buttons();G.want=ok(3,()=>G.line.length>=4,'Pictures in order help you remember and retell the steps.')}},
{h:'Pick the helpful picture',p:'Some pictures explain. Some just look nice. Pick the one that explains.',predict:{q:'Does lots of sparkle make a picture more helpful?',opts:['Yes, more is better','No, it gets in the way'],ans:1},task:'Pick the helpful picture 3 times',
 show:()=>{steps[4].go();seq([0,1,2].map(()=>()=>pick('help')),450)},
 go:()=>{clean();speak('Which picture helps explain how rain makes a puddle?');buttons();G.want=ok(4,()=>G.rnd>=3,'Helpful pictures are simple and show the idea with words or arrows.')}},
{h:'Challenge',p:'',go:()=>{clean();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.want()});
const QS=[['You want to remember how a seed grows. What helps most?',[['A quick sketch with labels','ok'],['Colour it in very neatly','neat'],['Read the words only','words']]],
 ['What is a label?',[['A word that names a part','ok'],['A pretty sticker','sticker'],['A whole page of writing','long']]],
 ['Which picture shows the order things happen?',[['A timeline','ok'],['A rainbow border','deco'],['One big flower','one']]],
 ['How long should a thinking sketch take?',[['A minute or two','ok'],['All afternoon','slow'],['Until it is perfect','perfect']]],
 ['Why does a word with a picture help you remember?',[['Your brain gets two ways to find it','ok'],['Pictures are just for fun','fun'],['The picture means you skip the words','skip']]],
 ['You draw the parts of a fish. What makes it helpful?',[['Labels: fin, tail, eye','ok'],['Lots of glitter','deco'],['A nice frame around it','frame']]]];
function why(t){let m='Keep it quick, simple and about the idea.';
 if(t==='neat')m='Neat colouring takes time but does not explain more. Quick shapes and labels are enough.';
 if(t==='words')m='Words alone are one way in. Add a quick picture and you have two ways to remember.';
 if(t==='sticker')m='A label is not decoration. It is a word that names a part, like roots or stem.';
 if(t==='long')m='A label is short: one or two words next to the part they name.';
 if(t==='deco')m='Decoration looks nice but does not explain. Pick what shows the idea.';
 if(t==='one')m='One picture shows one moment. A timeline shows first, next and last.';
 if(t==='slow')m='A thinking sketch is quick. The point is the idea, not the art.';
 if(t==='perfect')m='It does not need to be perfect. Simple shapes are fine if they show the idea.';
 if(t==='fun')m='Pictures can be fun, but they also help you think and remember.';
 if(t==='skip')m='Keep the words too. Words and picture together work best.';
 if(t==='frame')m='A frame is decoration. Labels show what each part is.';
 return m}
function nextQ(){qn++;const[q,ops]=QS[qn%QS.length],rot=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});speak('Challenge: '+q);A.redraw()}
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=t==='ok';
 if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(good?'✓ Yes! In a row: '+run+'.':'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=nextQ}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);clean();A.gest({down,move,up});buttons()}});
A.start()})})();
