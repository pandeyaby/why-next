/* Flagship – concrete, then pictures, then symbols (ages 6–8; Bruner's enactive, iconic and symbolic modes; NCETM
   CPA; EEF maths guidance: use manipulatives and representations and link them to symbols). One new idea, division
   as fair sharing, met three ways: share 12 strawberries onto 3 plates, pick the quick drawing that shows it, write
   12 ÷ 3 = 4 with tiles, link each number back to the plates, then help Zak go back a step on 15 ÷ 5 by drawing dots.
   Every drag or tap has a labelled button twin. Data and drawings in learn/cpa_art.js. */
(()=>{const {box,inside,kit,PICS,TILES,WANT,MEAN,STUCK,ANS,DESC,DONE,QS,berry,plate,rings,child}=CPAX;
VIS.reg('flagcpa',c=>{let A,D,row,ask,qn=-1,run=0;
const K={ink:'#1f2937',ok:'#047857',ko:'#b91c1c',rim:'#64748b',sel:'#1d4ed8',bg:'#fff7ed',tile:'#e0e7ff',hi:'#fef3c7',head:'#9a3412'};
const V={};const at=()=>['share','draw','write','link','back','quiz'][A.step];
const R=(x,y,w,h)=>box(A.W*x,A.H*y,A.W*w,A.H*h);
/* ---------- places ---------- */
const pile=()=>R(.05,.1,.9,.3),dish=k=>R(.04+k*.32,.5,.28,.3);
const pic=j=>D.lay(4,2,R(.04,.1,.92,.72),10)[j],quick=j=>R(.04+j*.48,.22,.44,.52);
const slotB=i=>{const w=A.W*.17,gap=A.W*.04,x0=(A.W-(w*4+gap*3+A.W*.06))/2;return box(x0+i*(w+gap)+(i===3?A.W*.06:0),A.H*.11,w,A.H*.16)};
const tileB=j=>D.lay(TILES.length,A.narrow?4:7,R(.04,.36,.92,A.narrow?.24:.12),8)[j];
const cardB=j=>D.lay(4,2,R(.04,.4,.92,.48),10)[j],numB=()=>R(.38,.2,.24,.13);
const optB=j=>D.lay(4,A.narrow?2:4,R(.04,.44,.92,.42),8)[j],ringB=k=>R(.03+k*.19,.42,.18,.28),penB=()=>R(.3,.76,.4,.1),ansB=j=>D.lay(4,4,R(.08,.76,.84,.12),8)[j];
const top=t=>D.word(t,A.W/2,A.H*.045,12,{c:K.head,w:A.W-20});
const foot=(t,ok)=>D.word(t,A.W/2,A.H*.95,12,{b:700,c:ok?K.ok:K.ink,w:A.W-20});
const fair=(arr,k)=>arr[k]<=Math.min(...arr);
/* ---------- 1: share real things ---------- */
function showShare(){const g=A.ctx,left=12-V.pl.reduce((a,b)=>a+b,0),pb=pile();top('Share 12 strawberries fairly onto 3 plates');
 D.pad(pb,'#ffffff','');const r=Math.min(pb.w/16,pb.h/6);for(let i=0;i<left;i++){if(V.drag&&i===left-1)continue;berry(g,pb.x+pb.w*(.1+(i%6)*.16),pb.y+pb.h*(i<6?.3:.72),r)}
 if(!left)D.word('All shared!',pb.x+pb.w/2,pb.y+pb.h/2,13,{c:K.ok});
 V.pl.forEach((n,k)=>{const b=dish(k);plate(g,b.x+b.w/2,b.y+b.h*.55,b.w,b.h*.7);if(V.slip===k){g.strokeStyle=K.ko;g.lineWidth=3;g.strokeRect(b.x,b.y,b.w,b.h)}
  for(let i=0;i<n;i++)berry(g,b.x+b.w*(.3+(i%2)*.4),b.y+b.h*(.38+Math.floor(i/2)*.17),Math.min(b.w*.1,b.h*.08));D.word(`${n}`,b.x+b.w/2,b.y+b.h*1.08,13,{c:K.head})});
 if(V.drag)berry(g,V.drag.x,V.drag.y,r*1.2);
 foot(left?`Left to share: ${left}`:'✓ 4 on each plate',!left)}
function give(k){const left=12-V.pl.reduce((a,b)=>a+b,0);if(!left)return;if(!fair(V.pl,k)){V.slip=k;A.sound.miss();return note(slip('unfair'))}
 V.slip=-1;V.pl[k]++;A.sound.pop();note(left>1?`Plate ${k+1} has ${V.pl[k]}. ${left-1} left to share.`:'All 12 shared: 4 on each plate. Fair!')}
/* ---------- 2: a quick drawing ---------- */
function showDraw(){const g=A.ctx;
 if(!V.pic){top('Which drawing shows your 3 plates?');PICS.forEach((o,j)=>{const b=pic(j);D.pad(b,'#ffffff',V.slip===j?'ko':'');rings(g,box(b.x+6,b.y+6,b.w-12,b.h*.7),o.g,K.ink,o.s==='nogroups');D.word(o.t,b.x+b.w/2,b.y+b.h*.88,11,{w:b.w-10})});return foot('Tap the matching drawing',false)}
 top('Which drawing is quicker to make?');[0,1].forEach(j=>{const b=quick(j);D.pad(b,'#ffffff',V.slip===j+10?'ko':V.quick&&j===1?'ok':'');
  if(j===0){[0,1,2].forEach(k=>{const cx=b.x+b.w*(.18+k*.32),cy=b.y+b.h*.42;plate(g,cx,cy,b.w*.28,b.h*.3);for(let i=0;i<4;i++)berry(g,cx+(i%2-.5)*b.w*.09,cy+(Math.floor(i/2)-.5)*b.h*.1,Math.min(b.w*.04,9))})}
  else rings(g,box(b.x+6,b.y+b.h*.15,b.w-12,b.h*.55),[4,4,4],K.ink);
  D.word(j?'Dots in rings':'Strawberries with leaves and seeds',b.x+b.w/2,b.y+b.h*.86,11,{w:b.w-10})});
 foot(V.quick?'✓ Dots are enough':'Both are right. Tap the quick one.',V.quick)}
function choose(j){if(V.pic)return;const o=PICS[j];if(o.s){V.slip=j;A.sound.miss();return note(slip(o.s))}V.slip=-1;V.pic=true;A.sound.pop();note('Yes: 3 rings for 3 plates, 4 dots in each. Now, which drawing is quicker to make?')}
function speed(j){if(!V.pic||V.quick)return;if(j===0){V.slip=10;A.sound.miss();return note(slip('neat'))}V.slip=-1;V.quick=true;A.sound.pop();note('Dots in rings: quick, and they show the same 3 groups of 4.')}
/* ---------- 3: symbols ---------- */
function showWrite(){const g=A.ctx;top('Write it with symbols');
 [0,1,2,3].forEach(i=>{const b=slotB(i);D.pad(b,V.put[i]?'#dcfce7':'#ffffff',V.slip===100+i?'ko':V.put.length===i?'sel':'');D.word(V.put[i]||'?',b.x+b.w/2,b.y+b.h/2,18)});
 const e=slotB(3);D.word('=',e.x-A.W*.035,e.y+e.h/2,18);
 TILES.forEach((t,j)=>{if(V.used.includes(j))return;const b=V.drag&&V.drag.i===j?box(V.drag.x-tileB(j).w/2,V.drag.y-tileB(j).h/2,tileB(j).w,tileB(j).h):tileB(j);D.pad(b,K.tile,V.drag&&V.drag.i===j?'sel':'');D.word(t,b.x+b.w/2,b.y+b.h/2,17)});
 rings(g,R(.2,.66,.6,.2),[4,4,4],K.ink);D.word('Your drawing',A.W/2,A.H*.64,10,{b:700,c:K.head});
 foot(V.put.length>=4?'✓ 12 ÷ 3 = 4':`Box ${V.put.length+1} of 4`,V.put.length>=4)}
function place(j){const i=V.put.length;if(i>=4||V.used.includes(j))return;const t=TILES[j];
 if(t!==WANT[i]){V.slip=100+i;A.sound.miss();return note(slip(i===0?(t==='3'?'order':'startnum'):i===1?(t==='−'?'minus':t==='×'?'times':'sign'):i===2?'divisor':(t==='9'?'minus':'answer')))}
 V.slip=-1;V.put.push(t);V.used.push(j);A.sound.pop();note(['12: all the strawberries.','÷: shared into equal groups.','3: the 3 plates.','= 4: 4 on each plate. 12 ÷ 3 = 4.'][i])}
/* ---------- 4: link back ---------- */
const NUMS=['12','3','4'];
function showLink(){const g=A.ctx,cur=NUMS[V.li];top('What does each number stand for?');
 const s='12 ÷ 3 = 4'.split(' ');s.forEach((t,i)=>{const x=A.W*(.2+i*.15);D.word(t,x,A.H*.13,20,{c:t===cur?K.sel:K.ink})});
 if(cur){const b=V.drag?box(V.drag.x-numB().w/2,V.drag.y-numB().h/2,numB().w,numB().h):numB();D.pad(b,K.hi,'sel');D.word(cur,b.x+b.w/2,b.y+b.h/2,20)}
 MEAN.forEach((o,j)=>{const b=cardB(j),got=o.n&&NUMS.indexOf(o.n)<V.li;D.pad(b,'#ffffff',V.slip===j?'ko':got?'ok':'');
  const ib=box(b.x+b.w*.1,b.y+b.h*.08,b.w*.8,b.h*.5);
  if(j===0)for(let i=0;i<12;i++)berry(g,ib.x+ib.w*(.1+(i%6)*.16),ib.y+ib.h*(i<6?.3:.75),Math.min(ib.w*.05,ib.h*.14));
  if(j===1)[0,1,2].forEach(k=>plate(g,ib.x+ib.w*(.18+k*.32),ib.y+ib.h*.5,ib.w*.28,ib.h*.5));
  if(j===2){plate(g,ib.x+ib.w/2,ib.y+ib.h*.5,ib.w*.4,ib.h*.7);for(let i=0;i<4;i++)berry(g,ib.x+ib.w*(.45+(i%2)*.1),ib.y+ib.h*(.35+Math.floor(i/2)*.3),Math.min(ib.w*.04,ib.h*.12))}
  if(j===3)plate(g,ib.x+ib.w/2,ib.y+ib.h*.5,ib.w*.4,ib.h*.7);
  D.word((got?o.n+' = ':'')+o.t,b.x+b.w/2,b.y+b.h*.8,11,{w:b.w-10})});
 foot(V.li>=3?'✓ Every number links to the plates':`Number ${V.li+1} of 3`,V.li>=3)}
function link(j){const cur=NUMS[V.li];if(!cur)return;const o=MEAN[j];if(o.n!==cur){V.slip=j;A.sound.miss();return note(o.n==null?slip('leftover'):slip('count',o.t.toLowerCase(),o.n,cur))}
 V.slip=-1;V.li++;A.sound.pop();note(`${cur} is ${o.t.toLowerCase()}.`+(V.li<3?' Next number.':' The symbols say what the plates showed.'))}
/* ---------- 5: go back a step ---------- */
function showBack(){const g=A.ctx;child(g,A.W*.15,A.H*.2,Math.min(A.W*.2,A.H*.24),'#0e7490',V.ph>=3);
 const bb=R(.32,.08,.62,.2);D.pad(bb,V.ph>=3?'#dcfce7':'#ffffff','');D.word(V.ph>=3?'15 ÷ 5 = 3':'15 ÷ 5 = ?',bb.x+bb.w/2,bb.y+bb.h/2,22);
 if(V.ph===0){top('Zak is stuck. What should he do?');STUCK.forEach((o,j)=>{const b=optB(j);D.pad(b,'#ffffff',V.slip===j?'ko':'');D.word(o.t,b.x+b.w/2,b.y+b.h/2,12,{w:b.w-12})});return foot('Tap the best step',false)}
 top(V.ph===1?'Draw 15 dots fairly in 5 rings':V.ph===2?'How many dots in each ring?':'Zak went back a step');
 V.zr.forEach((n,k)=>{const b=ringB(k),cx=b.x+b.w/2,cy=b.y+b.h/2,r=Math.min(b.w,b.h)*.44;g.strokeStyle=V.slip===200+k?K.ko:K.ink;g.lineWidth=V.slip===200+k?3:2;g.beginPath();g.arc(cx,cy,r,0,7);g.stroke();
  for(let i=0;i<n;i++){g.fillStyle=K.ink;g.beginPath();g.arc(cx+[0,-.45,.45][i%3]*r,cy+(i<3?[-.45,.25,.25][i]:0)*r,Math.max(3,r*.14),0,7);g.fill()}});
 const left=15-V.zr.reduce((a,b)=>a+b,0);
 if(V.ph===1){const p=penB();D.pad(p,K.hi,V.drag?'sel':'');D.word(`✏️ Dots left: ${left}`,p.x+p.w/2,p.y+p.h/2,12,{w:p.w-8})}
 if(V.ph===2)ANS.forEach((o,j)=>{const b=ansB(j);D.pad(b,'#ffffff',V.slip===300+j?'ko':'');D.word(String(o.v),b.x+b.w/2,b.y+b.h/2,16)});
 if(V.drag)(g.fillStyle=K.ink,g.beginPath(),g.arc(V.drag.x,V.drag.y,6,0,7),g.fill());
 foot(V.ph>=3?'✓ 15 ÷ 5 = 3':V.ph===1?`Dots drawn: ${15-left} of 15`:'Count one ring',V.ph>=3)}
function step0(j){if(V.ph)return;const o=STUCK[j];if(!o.ok){V.slip=j;A.sound.miss();return note(slip(o.s))}V.slip=-1;V.ph=1;A.sound.pop();note('Good: going back a step is smart. Draw 5 rings for the 5 groups, then share 15 dots fairly.')}
function dot(k){if(V.ph!==1)return;if(!fair(V.zr,k)){V.slip=200+k;A.sound.miss();return note(slip('unfair'))}V.slip=-1;V.zr[k]++;A.sound.tick();
 const used=V.zr.reduce((a,b)=>a+b,0);if(used>=15){V.ph=2;A.sound.pop();note('All 15 dots drawn. Count the dots in one ring.')}else note(`Ring ${k+1} has ${V.zr[k]}. ${15-used} dots left to draw.`)}
function answer(j){if(V.ph!==2)return;const o=ANS[j];if(!o.ok){V.slip=300+j;A.sound.miss();return note(slip(o.s))}V.slip=-1;V.ph=3;A.sound.pop();note('3 in each ring: 15 ÷ 5 = 3. The drawing made the symbols make sense.')}
/* ---------- naming the slip ---------- */
function slip(t,a,b,d){let m='Look back at the plates or the drawing, then try again.';
 if(t==='unfair')m='Not fair: that one already has more than another. Give the next one to a group with fewer.';
 if(t==='swap')m='That shows 4 groups of 3. You had 3 plates, so count the rings: there should be 3.';
 if(t==='swap2')m='That shows 5 groups of 2. There are 2 plates, so draw 2 rings.';
 if(t==='unequal')m='Those groups are not equal. Fair sharing gives every group the same number.';
 if(t==='neat2')m='It does not need to look real. Dots in rings show the groups, and they are quick to draw.';
 if(t==='nogroups')m='All 12 are there, but there are no groups. The drawing needs 3 rings for the 3 plates.';
 if(t==='neat')m='Both are right, but drawing leaves and seeds takes ages. Dots in rings are quick and show the same groups.';
 if(t==='order')m='Start with how many you shared: 12. 3 ÷ 12 would mean sharing 3 things between 12 plates.';
 if(t==='startnum')m='Start with a number: how many strawberries did you share?';
 if(t==='minus')m='12 − 3 = 9 is take away. You shared into equal groups, so it is ÷, and each plate got 4.';
 if(t==='times')m='× puts equal groups together. You split 12 into equal groups, so it is ÷.';
 if(t==='sign')m='This box needs a sign. You shared into equal groups: which sign means that?';
 if(t==='divisor')m='This box is how many groups you shared into: the 3 plates.';
 if(t==='answer')m='This box is the answer: how many on each plate?';
 if(t==='leftover')m='Nothing is left over. 12 shared onto 3 plates is exactly 4 each.';
 if(t==='count')m=`Count in the picture: ${a} is ${b}, not ${d}.`;
 if(t==='each')m='In this story the 4 is the bags. The sweets in each bag is the answer, 5.';
 if(t==='guess')m='A guess does not help Zak understand. Go back a step and draw it.';
 if(t==='giveup')m='Zak can do this. When the symbols are hard, go back a step to a drawing or real things.';
 if(t==='copy')m='Copying gives an answer but not the idea. Draw it, so Zak can see why.';
 if(t==='groups')m='5 is the number of rings. The answer is how many dots are in one ring.';
 if(t==='plus')m='15 + 5 = 20 is adding. You shared 15 into 5 rings: count one ring.';
 if(t==='symfirst')m='Symbols are the last step. Start with real things, then a drawing, then the symbols.';
 if(t==='babyish')m='Objects and drawings are a smart step for anyone with a new idea, even grown-ups.';
 return m}
/* ---------- canvas, pointer, buttons ---------- */
function draw(){const k=at(),g=A.ctx;g.fillStyle=K.bg;g.fillRect(0,0,A.W,A.H);
 if(k==='quiz'){berry(g,A.W*.3,A.H*.38,A.H*.09);rings(g,R(.42,.28,.16,.2),[4],K.ink);D.word('÷',A.W*.72,A.H*.38,30);D.word('Challenge',A.W/2,A.H*.7,20);return}
 ({share:showShare,draw:showDraw,write:showWrite,link:showLink,back:showBack})[k]();A.fx.draw(g)}
function down(p){const k=at(),grab=i=>{V.drag={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true};
 if(k==='share'){if(inside(p,pile())&&V.pl.reduce((a,b)=>a+b,0)<12)return grab(0);const j=[0,1,2].find(x=>inside(p,dish(x)));if(j!=null)give(j)}
 if(k==='draw'){if(!V.pic){const j=[0,1,2,3].find(x=>inside(p,pic(x)));if(j!=null)choose(j)}else{const j=[0,1].find(x=>inside(p,quick(x)));if(j!=null)speed(j)}}
 if(k==='write'){const j=TILES.findIndex((_,x)=>!V.used.includes(x)&&inside(p,tileB(x)));if(j>=0)return grab(j)}
 if(k==='link'&&V.li<3){if(inside(p,numB()))return grab(0);const j=[0,1,2,3].find(x=>inside(p,cardB(x)));if(j!=null)link(j)}
 if(k==='back'){if(V.ph===0){const j=[0,1,2,3].find(x=>inside(p,optB(x)));if(j!=null)step0(j)}
  else if(V.ph===1){if(inside(p,penB()))return grab(0);const j=[0,1,2,3,4].find(x=>inside(p,ringB(x)));if(j!=null)dot(j)}
  else if(V.ph===2){const j=[0,1,2,3].find(x=>inside(p,ansB(x)));if(j!=null)answer(j)}}
 return false}
function move(p){if(!V.drag)return;V.drag.x=p.x;V.drag.y=p.y;A.redraw()}
function up(p){const d=V.drag;if(!d)return;V.drag=null;const k=at(),tap=Math.hypot(p.x-d.x0,p.y-d.y0)<=12;
 if(k==='share'){const j=[0,1,2].find(x=>inside(p,dish(x)));if(j!=null)return give(j);if(tap)return note('Drag a strawberry onto a plate, or tap a plate.')}
 if(k==='write'){const i=V.put.length;if(tap||(i<4&&inside(p,slotB(i))))return place(d.i)}
 if(k==='link'){const j=[0,1,2,3].find(x=>inside(p,cardB(x)));if(j!=null)return link(j);if(tap)return note('Drag the number onto what it stands for, or tap a card.')}
 if(k==='back'){const j=[0,1,2,3,4].find(x=>inside(p,ringB(x)));if(j!=null)return dot(j);if(tap)return note('Drag a dot into a ring, or tap a ring.')}
 A.redraw()}
function note(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();btns();V.hook()}
function btns(){if(!row)return;row.innerHTML='';const k=at(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='share'&&V.pl.reduce((a,x)=>a+x,0)<12)[0,1,2].forEach(j=>b(`Plate ${j+1}`,()=>give(j),`Put a strawberry on plate ${j+1}`));
 if(k==='draw'){if(!V.pic)PICS.forEach((o,j)=>b(o.t,()=>choose(j),`Drawing: ${o.t}`));else if(!V.quick){b('Strawberries with leaves',()=>speed(0),'Quicker: strawberries with leaves and seeds');b('Dots in rings',()=>speed(1),'Quicker: dots in rings')}}
 if(k==='write'&&V.put.length<4)TILES.forEach((t,j)=>{if(!V.used.includes(j))b(t,()=>place(j),`Put ${t} in box ${V.put.length+1}`)});
 if(k==='link'&&V.li<3)MEAN.forEach((o,j)=>b(o.t,()=>link(j),`${NUMS[V.li]} stands for: ${o.t}`));
 if(k==='back'){if(V.ph===0)STUCK.forEach((o,j)=>b(o.t,()=>step0(j)));if(V.ph===1)[0,1,2,3,4].forEach(j=>b(`Ring ${j+1}`,()=>dot(j),`Draw a dot in ring ${j+1}`));if(V.ph===2)ANS.forEach((o,j)=>b(String(o.v),()=>answer(j),`Dots in each ring: ${o.v}`))}}
function clear(){run++;for(const x in V)delete V[x];Object.assign(V,{pl:[0,0,0],slip:-1,pic:false,quick:false,put:[],used:[],li:0,ph:0,zr:[0,0,0,0,0],drag:null,hook:()=>{}})}
const pass=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function enter(i,ok){clear();note(DESC[i]);V.hook=pass(i,ok)}
function demo(i,acts,ms){steps[i].go();const r=run;acts.forEach((f,j)=>setTimeout(()=>{if(r===run)f()},ms*(j+1)))}
const steps=[
{h:'1. Real things',p:'A new idea: sharing fairly. Start with things you can move. Share 12 strawberries onto 3 plates, one at a time.',
 predict:{q:'You see 12 ÷ 3 for the first time. What helps most to start?',opts:['Look hard at the symbols','Share 12 real things into 3 groups'],ans:1},task:'Share all 12 fairly',
 show:()=>demo(0,Array.from({length:12},(_,i)=>()=>give(i%3)),260),go:()=>enter(0,()=>V.pl.every(n=>n===4))},
{h:'2. A picture',p:'Next, draw it. A drawing stands for the real things. Find the drawing of your plates, then the quick one.',
 predict:{q:'Does your drawing need to look like real strawberries?',opts:['Yes, draw them well','No, dots and rings are enough'],ans:1},task:'Pick the matching drawing, then the quick one',
 show:()=>demo(1,[()=>choose(1),()=>speed(1)],900),go:()=>enter(1,()=>V.quick)},
{h:'3. Symbols',p:'Last, the symbols. They say the same thing as the plates and the drawing. Build the number sentence.',
 predict:{q:'In the plates story, what does the 3 in 12 ÷ 3 stand for?',opts:['3 strawberries on each plate','The 3 plates'],ans:1},task:'Fill all 4 boxes',
 show:()=>demo(2,[0,3,1,2].map(j=>()=>place(j)),650),go:()=>enter(2,()=>V.put.length>=4)},
{h:'Link them up',p:'Each number in 12 ÷ 3 = 4 stands for something real. Drag each one onto its meaning.',task:'Link all 3 numbers',
 show:()=>demo(3,[0,1,2].map(j=>()=>link(j)),800),go:()=>enter(3,()=>V.li>=3)},
{h:'Go back a step',p:'Zak meets 15 ÷ 5. The symbols are not clear yet. Help him go back a step, draw it, and find the answer.',
 predict:{q:'Zak goes back to drawing dots. Is that babyish?',opts:['Yes, big kids only use symbols','No, going back a step is smart'],ans:1},task:'Help Zak solve 15 ÷ 5',
 show:()=>demo(4,[()=>step0(0),...Array.from({length:15},(_,i)=>()=>dot(i%5)),()=>answer(0)],220),go:()=>enter(4,()=>V.ph>=3)},
{h:'Challenge',p:'',go:()=>{clear();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>V.hook()});
function nextQ(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,''],...Q.o],r=qn%3,list=all.slice(r).concat(all.slice(0,r));
 ask.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=ask.querySelector('.fl-pick');list.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>grade(s,Q)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(s,Q){ask.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=ask.querySelector('.fl-fb'),m=s?slip(s):'';
 if(s)A.sound.miss();else A.win();fb.innerHTML=(s?'✗ '+m:'✓ '+Q.a+'.')+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=nextQ;c.say(s?m:'Yes.')}
FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:X=>{ask.hidden=X.step!==5;row.hidden=X.step===5;btns()},
 init:X=>{A=X;D=kit(A,K);const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Concrete, pictures, symbols lab buttons'},w);ask=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});btns()}}).start()})})();
