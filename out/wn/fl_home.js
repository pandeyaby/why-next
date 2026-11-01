/* Flagship – where animals live (ages 4–5): carry each animal to its habitat (pond, nest, burrow, soil), lift a log and
   let woodlice choose dark-and-damp over bright-and-dry, put a blackbird's nest where the fox cannot reach, tap the way
   each home helps (water to breathe, damp soil, a safe hole, warm eggs), then build a minibeast home from logs, leaves
   and stones. Every drag on the canvas has a big button twin. */
(()=>{
const ZOO=[{k:'fish',e:'🐟',n:'Fish',h:0},{k:'bird',e:'🐦',n:'Bird',h:1},{k:'rabbit',e:'🐇',n:'Rabbit',h:2},{k:'worm',e:'🪱',n:'Worm',h:3}];
const HOMES=[{e:'💧',n:'Pond',why:'It swims and breathes in the water.'},{e:'🪺',n:'Nest',why:'The nest keeps its eggs warm and safe.'},{e:'🕳️',n:'Burrow',why:'It hides from foxes down the hole.'},{e:'🟫',n:'Soil',why:'Damp soil keeps its skin wet.'}];
const HELP=[['Water to breathe and swim','Damp soil to keep its skin wet','A high nest'],['Damp soil to keep its skin wet','A dark hole to hide in','Water to breathe and swim'],['A dark hole to hide in','Water to breathe and swim','A warm nest for eggs'],['A warm nest for eggs','A dark hole to hide in','Damp soil to keep its skin wet']];
const HELPOK=['Water to breathe and swim','Damp soil to keep its skin wet','A dark hole to hide in','A warm nest for eggs'],HELPWHO=[0,3,2,1];
const KIT=[{e:'🪵',n:'Log',good:2},{e:'🍂',n:'Dead leaves',good:2},{e:'🪨',n:'Stones',good:1},{e:'🛍️',n:'Plastic bag',good:0}];
VIS.reg('flaghome',c=>{let A,pad,qb,qn=-1,run=0,ver=0;c.fig.classList.add('young');
const S={at:[-1,-1,-1,-1],drag:null,sel:-1,lift:0,bugs:[],walked:false,nest:-1,fox:0,ask:0,got:0,built:[],come:0,want:()=>{}};
const mode=()=>['match','log','nest','help','build','quiz'][A.step];
const speak=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
const px=n=>Math.round(n*(A.narrow?1:1.2));
function word(g,t,x,y,n,col,wt){g.font=`${wt||800} ${px(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-14)}
function pic(g,e,x,y,n){g.font=`${px(n)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
const soft=(hex,t)=>A.mix(A.col.pn,hex,A.col.dark?t*.25:t);
/* home boxes for the matching step: 2 x 2 under the animal tray */
function homeBox(i){const w=(A.W-30)/2,h=A.H*.3;return{x:10+(i%2)*(w+10),y:A.H*.25+Math.floor(i/2)*(h+8),w,h}}
function trayPos(i){return{x:A.W*(i+.5)/4,y:A.H*.13}}
function inBox(p,b){return p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h}
function paint(A){const{ctx:g,W,H,col:C}=A,m=mode();g.fillStyle=soft('#e0f2fe',.45);g.fillRect(0,0,W,H);
 if(m==='match'){HOMES.forEach((h,i)=>{const b=homeBox(i),tint=['#bae6fd','#fef3c7','#d6d3d1','#e7d3b5'][i];g.fillStyle=soft(tint,.9);A.paint.rrect(b.x,b.y,b.w,b.h,14);g.fill();g.lineWidth=2;g.strokeStyle=A.mix(C.tx,C.pn,.55);g.stroke();
   pic(g,h.e,b.x+26,b.y+24,22);word(g,h.n,b.x+b.w/2,b.y+b.h-16,15,C.tx);const who=S.at.indexOf(i);if(who>=0)pic(g,ZOO[who].e,b.x+b.w/2,b.y+b.h*.45,34)});
  ZOO.forEach((z,i)=>{if(S.at[i]>=0)return;const d=S.drag&&S.drag.i===i,p=d?S.drag:trayPos(i);if(S.sel===i){g.fillStyle=soft('#fde68a',1);g.beginPath();g.arc(p.x,p.y,30,0,7);g.fill()}pic(g,z.e,p.x,p.y,36)});
  word(g,S.at.every(v=>v>=0)?'Every animal is home!':'Drag each animal to its home',W/2,H*.94,13,C.mu,700)}
 if(m==='log'){g.fillStyle=soft('#bbf7d0',.8);g.fillRect(0,H*.1,W,H*.38);g.fillStyle=soft('#78350f',.55);g.fillRect(0,H*.48,W,H*.06);
  const ly=H*.38-S.lift*H*.14;if(S.lift>.5){['🐜','🪱','🪲'].forEach((e,i)=>pic(g,e,W*(.35+i*.15),H*.44,20))}g.fillStyle=A.mix('#92400e',C.pn,C.dark?.2:0);A.paint.rrect(W*.25,ly-H*.06,W*.5,H*.12,H*.06);g.fill();pic(g,'🪵',W*.5,ly,26);
  word(g,S.lift>.5?'Under the log: dark and damp':'Lift the log',W/2,H*.05,14,C.tx);
  const by=H*.58,bh=H*.3;g.fillStyle='#fde68a';A.paint.rrect(10,by,W/2-10,bh,10);g.fill();g.fillStyle='#1e293b';A.paint.rrect(W/2,by,W/2-10,bh,10);g.fill();
  word(g,'☀️ bright, dry',W*.27,by+14,12,'#111827',700);word(g,'🌑 dark, damp',W*.73,by+14,12,'#f8fafc',700);
  S.bugs.forEach(b=>{g.fillStyle=b.x<W/2?'#1f2937':'#e5e7eb';g.beginPath();g.ellipse(b.x,b.y,7,4.5,b.a,0,7);g.fill()});
  if(S.walked){const n=S.bugs.filter(b=>b.x>W/2).length;word(g,`${n} of ${S.bugs.length} chose dark and damp`,W/2,H*.95,13,C.tx)}}
 if(m==='nest'){g.fillStyle=soft('#bbf7d0',.8);g.fillRect(0,H*.78,W,H*.22);g.fillStyle=A.mix('#78350f',C.pn,C.dark?.25:0);g.fillRect(W*.62,H*.2,W*.05,H*.6);g.fillRect(W*.62,H*.3,W*.25,10);pic(g,'🌳',W*.645,H*.16,46);
  const spots=[{x:W*.3,y:H*.82,n:'ground'},{x:W*.78,y:H*.27,n:'branch'}];spots.forEach((s,i)=>{g.setLineDash([5,5]);g.strokeStyle=C.mu;g.lineWidth=2;g.beginPath();g.arc(s.x,s.y,26,0,7);g.stroke();g.setLineDash([]);if(S.nest!==i)word(g,s.n,s.x,s.y+38,12,C.mu,700)});
  const np=S.drag?S.drag:S.nest>=0?spots[S.nest]:{x:W*.15,y:H*.15};pic(g,'🪺',np.x,np.y,30);if(S.fox)pic(g,'🦊',W*(.05+S.fox*.22),H*.86,34);
  if(S.fox>=1&&S.nest>=0)word(g,S.nest?'Safe! Fox can\'t climb.':'Fox can reach it!',W*.68,H*.93,13,C.tx)}
 if(m==='help'){const z=ZOO[HELPWHO[S.ask%4]],h=HOMES[z.h];g.fillStyle=soft('#fef3c7',.7);A.paint.rrect(10,H*.05,W-20,H*.3,14);g.fill();pic(g,z.e,W*.3,H*.2,40);pic(g,h.e,W*.5,H*.2,30);word(g,`${z.n} in the ${h.n.toLowerCase()}`,W*.72,H*.2,14,C.tx);
  word(g,'How does this home help?',W/2,H*.42,14,C.tx);HELP[S.ask%4].forEach((t,i)=>{const y=H*(.5+i*.15);g.fillStyle=soft('#ffffff',.9);A.paint.rrect(14,y,W-28,H*.12,10);g.fill();g.lineWidth=2;g.strokeStyle=A.mix(C.tx,C.pn,.5);g.stroke();word(g,t,W/2,y+H*.06,13,C.tx,700)});
  word(g,`${S.got} of 4 done`,W/2,H*.97,12,C.mu,700)}
 if(m==='build'){g.fillStyle=soft('#bbf7d0',.8);g.fillRect(0,H*.55,W,H*.45);g.fillStyle=soft('#a8a29e',.6);A.paint.rrect(W*.3,H*.58,W*.4,H*.3,12);g.fill();word(g,'Bug home',W/2,H*.62,12,C.tx,700);
  S.built.forEach((k,i)=>pic(g,KIT[k].e,W*(.38+(i%3)*.12),H*(.72+Math.floor(i/3)*.1),24));
  KIT.forEach((k,i)=>{const x=W*(i+.5)/4;g.fillStyle=soft('#ffffff',.85);A.paint.rrect(x-W*.1,H*.06,W*.2,H*.3,12);g.fill();pic(g,k.e,x,H*.16,30);word(g,k.n,x,H*.3,11,C.tx,700)});
  const mb=['🐞','🐌','🪱','🐜','🕷️','🪲'];for(let i=0;i<S.come;i++)pic(g,mb[i%6],W*(.08+(i%2)*.84),H*(.66+Math.floor(i/2)*.1),20);word(g,`${S.come} minibeasts moved in`,W/2,H*.47,14,C.tx)}
 if(m==='quiz'){pic(g,'🏡',W/2,H*.3,44);word(g,'Every animal needs the right home.',W/2,H*.62,15,C.tx)}A.fx.draw(g)}
/* ---------- actions ---------- */
function place(i,h){if(S.at[i]>=0)return;S.sel=-1;if(ZOO[i].h===h){S.at[i]=h;A.sound.pop();speak(`${ZOO[i].n} lives in the ${HOMES[h].n.toLowerCase()}. ${HOMES[h].why}`);S.want()}
 else{A.sound.miss();const z=ZOO[i].k;let t=`Not the ${HOMES[h].n.toLowerCase()}. `;if(z==='fish')t+='A fish needs water. Out of water it cannot breathe.';else if(z==='worm')t+='A worm needs damp soil, or its skin dries out.';else if(z==='bird')t+='A bird lays eggs in a nest.';else t+='A rabbit digs a hole, a burrow, to hide in.';speak(t)}
 keys();A.redraw()}
function lift(){if(S.lift)return;const o=S;A.tween(o,{lift:1},A.reduced()?1:500,'out',()=>{speak('Under the log it is dark and damp. Woodlice, worms and beetles live here.');keys();A.redraw()});A.sound.pop()}
function walk(){if(S.lift<1||S.walked||S.bugs.length)return;const W=A.W,H=A.H,k=ver;S.bugs=Array.from({length:8},(_,i)=>({x:W/2+(i%2?-1:1)*(6+i*3),y:H*(.66+(i%4)*.05),a:i,tx:i===3?W*.2:W*(.62+(i%3)*.1),ty:H*(.66+(i%4)*.055)}));
 const o={u:0};A.tween(o,{u:1},A.reduced()?1:1400,'io',()=>{if(k!==ver)return;S.bugs.forEach(b=>{b.x=b.tx;b.y=b.ty});S.walked=true;speak('7 of 8 woodlice went to the dark, damp side. That is why they live under logs and stones.');S.want();keys();A.redraw()});
 A.every(()=>{if(k!==ver||S.walked||!S.bugs.length)return false;S.bugs.forEach(b=>{b.x+=(b.tx-b.x)*o.u*.12;b.y+=(b.ty-b.y)*o.u*.12;b.a+=.2});return true})}
function putNest(i){S.nest=i;S.fox=0;A.sound.tick();speak(i?'The nest is high on the branch.':'The nest is on the ground.');keys();A.redraw()}
function fox(){if(S.nest<0)return speak('Put the nest somewhere first.');const k=ver;S.fox=0;A.tween(S,{fox:1},A.reduced()?1:900,'io',()=>{if(k!==ver)return;if(S.nest){A.sound.pop();speak('The fox cannot climb up. The eggs stay safe and warm, high in the tree.');S.want()}else{A.sound.miss();speak('The fox can reach a nest on the ground. Move it up high where the fox cannot climb.')}keys();A.redraw()})}
function pickHelp(j){if(S.got>=4)return;const t=HELP[S.ask%4][j],z=ZOO[HELPWHO[S.ask%4]];if(t===HELPOK[S.ask%4]){S.got++;S.ask++;A.sound.pop();speak(`Yes. ${z.n}: ${t.toLowerCase()}. ${S.got<4?'Next animal.':'All 4 done!'}`);S.want()}
 else{A.sound.miss();speak(`${t} does not help a ${z.n.toLowerCase()}. Think about what a ${z.n.toLowerCase()} needs.`)}keys();A.redraw()}
function add(k){if(S.built.length>=6)return;S.built.push(k);const g=KIT[k].good;S.come=Math.min(6,S.come+g);A.sound[g?'pop':'miss']();speak(g?`${KIT[k].n} makes it dark and damp. ${S.come} minibeasts moved in.`:'A plastic bag is not dark and damp. No minibeast came. Try logs, leaves or stones.');S.want();keys();A.redraw()}
function keys(){if(!pad)return;pad.innerHTML='';const m=mode(),B=(t,f)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,t).onclick=f};
 if(m==='match'){if(S.sel<0)ZOO.forEach((z,i)=>{if(S.at[i]<0)B(`${z.e} Pick the ${z.n.toLowerCase()}`,()=>{S.sel=i;speak(`${z.n} picked. Now pick its home.`);keys();A.redraw()})});else HOMES.forEach((h,j)=>B(`${h.e} Put it in the ${h.n.toLowerCase()}`,()=>place(S.sel,j)))}
 if(m==='log'){if(!S.lift)B('🪵 Lift the log',lift);else if(!S.bugs.length)B('🐜 Let the woodlice walk',walk)}
 if(m==='nest'){B('🪺 Nest on the ground',()=>putNest(0));B('🌳 Nest high on the branch',()=>putNest(1));B('🦊 Here comes the fox',fox)}
 if(m==='help'&&S.got<4)HELP[S.ask%4].forEach((t,j)=>B(t,()=>pickHelp(j)));
 if(m==='build')KIT.forEach((k,i)=>B(`${k.e} Add ${k.n.toLowerCase()}`,()=>add(i)))}
function down(p){const m=mode();if(m==='match'){const i=ZOO.findIndex((z,j)=>S.at[j]<0&&Math.hypot(p.x-trayPos(j).x,p.y-trayPos(j).y)<34);if(i>=0){S.drag={i,x:p.x,y:p.y};return true}
  if(S.sel>=0){const h=[0,1,2,3].find(j=>inBox(p,homeBox(j)));if(h!=null)place(S.sel,h)}return false}
 if(m==='log'){if(!S.lift&&p.y>A.H*.25&&p.y<A.H*.5){S.drag={y0:p.y,x:p.x,y:p.y};return true}if(S.lift&&p.y>A.H*.55)walk();return false}
 if(m==='nest'){const np=S.nest>=0?[{x:A.W*.3,y:A.H*.82},{x:A.W*.78,y:A.H*.27}][S.nest]:{x:A.W*.15,y:A.H*.15};if(Math.hypot(p.x-np.x,p.y-np.y)<40){S.drag={x:p.x,y:p.y};return true}return false}
 if(m==='help'&&p.y>A.H*.5){const j=Math.floor((p.y-A.H*.5)/(A.H*.15));if(j>=0&&j<3)pickHelp(j);return false}
 if(m==='build'&&p.y<A.H*.38){add(Math.max(0,Math.min(3,Math.floor(p.x/(A.W/4)))));return false}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;if(mode()==='log'&&S.drag.y0-p.y>A.H*.12){S.drag=null;lift()}A.redraw()}
function up(p){const d=S.drag;S.drag=null;if(!d)return;const m=mode();if(m==='match'){const h=[0,1,2,3].find(j=>inBox(p,homeBox(j)));if(h!=null)place(d.i,h)}
 if(m==='nest'){const g=Math.hypot(p.x-A.W*.3,p.y-A.H*.82),b=Math.hypot(p.x-A.W*.78,p.y-A.H*.27);if(Math.min(g,b)<70)putNest(b<g?1:0)}A.redraw()}
const ok=(n,f,msg)=>()=>{if(A.step===n&&f()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const reset=(n,f,msg,t)=>{ver++;Object.assign(S,{at:[-1,-1,-1,-1],drag:null,sel:-1,lift:0,bugs:[],walked:false,nest:-1,fox:0,ask:0,got:0,built:[],come:0});S.want=ok(n,f,msg);speak(t);keys()};
function later(fs,gap){const k=ver;fs.forEach((f,j)=>setTimeout(()=>{if(k===ver)f()},A.reduced()?j*20+10:j*gap+200))}
const steps=[
{h:'Who lives where?',p:'Each animal has a home that suits it. Drag each animal to its home, or pick it and then pick a home.',
 predict:{q:'Where does a fish live?',opts:['In a nest','In water','In a burrow'],ans:1},task:'Take all 4 animals home',
 show:()=>{steps[0].go();later([0,1,2,3].map(i=>()=>place(i,ZOO[i].h)),350)},go:()=>reset(0,()=>S.at.every(v=>v>=0),'Every animal is in the home that suits it.','Four animals need to get home.')},
{h:'Under the log',p:'Lift the log and look. Then put woodlice in a box. One side is bright and dry. One side is dark and damp.',
 predict:{q:'Where will most woodlice go?',opts:['The bright, dry side','The dark, damp side','They will split half and half'],ans:1},task:'Lift the log, then let the woodlice walk',
 show:()=>{steps[1].go();later([lift,walk],700)},go:()=>reset(1,()=>S.walked,'Woodlice pick dark, damp places, like under a log.','A log lies on the grass.')},
{h:'A safe nest',p:'A blackbird needs a place for her nest. A fox is hungry. Drag the nest to a spot, then let the fox come by.',
 predict:{q:'Where are the eggs safe from the fox?',opts:['On the ground','High in a tree'],ans:1},task:'Keep the eggs safe from the fox',
 show:()=>{steps[2].go();later([()=>putNest(1),fox],500)},go:()=>reset(2,()=>S.nest===1&&S.fox>=1,'High in the tree, the nest keeps the eggs safe and warm.','Where should the nest go?')},
{h:'How a home helps',p:'A home gives an animal what it needs. Tap the way each home helps.',task:'Answer for all 4 animals',
 show:()=>{steps[3].go();later([0,1,2,3].map(()=>()=>pickHelp(HELP[S.ask%4].indexOf(HELPOK[S.ask%4]))),400)},go:()=>reset(3,()=>S.got>=4,'Each home gives its animal something it needs.','Fish in the pond. How does it help?')},
{h:'Build a bug home',p:'Minibeasts like dark, damp places. Add things to the bug home and see who moves in.',task:'Get 5 minibeasts to move in',
 show:()=>{steps[4].go();later([()=>add(0),()=>add(1),()=>add(2)],400)},go:()=>reset(4,()=>S.come>=5,'Logs, leaves and stones make it dark and damp, so minibeasts moved in.','An empty bug home.')},
{h:'Challenge',p:'',go:()=>{ver++;quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Where does a worm live?',[['In damp soil','ok'],['On a dry, sunny path','dry'],['In a nest','mix']]],
 ['Why does a fish live in water?',[['It breathes and swims in water','ok'],['It likes to look at the sky','fun'],['Any home would do','any']]],
 ['You lift a stone. Woodlice run about. Why do they live there?',[['It is dark and damp','ok'],['It is bright and dry','dry'],['They are lost','fun']]],
 ['How does a nest help a baby bird?',[['It keeps the eggs warm and safe','ok'],['It helps the bird swim','mix'],['It is a toy','fun']]],
 ['A rabbit sees a fox. Where does it go?',[['Down its burrow','ok'],['Into the pond','mix'],['Up to a nest','any']]]];
function why(t){let m='Each animal lives where it gets what it needs.';
 if(t==='dry')m='Worms and woodlice dry out in the sun. They need dark, damp places, like soil or under a log.';
 if(t==='mix')m='That is another animal\'s home. Fish need water, birds need nests, rabbits need burrows, worms need soil.';
 if(t==='any')m='Not any home will do. A home must give the animal what it needs, like water, food or a safe place.';
 if(t==='fun')m='Animals do not pick homes for fun. The home keeps them safe, or gives water or food.';return m}
function quiz(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;qb.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qb.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});speak('Challenge: '+q);A.redraw()}
function mark(t){qb.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qb.querySelector('.fl-fb'),y=t==='ok';if(y){run++;A.win()}else{run=0;A.sound.miss()}
 fb.innerHTML=(y?`✓ Yes! The right home gives it what it needs. ${run} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw:paint,onStep:A=>{qb.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qb=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
A.start()})})();
