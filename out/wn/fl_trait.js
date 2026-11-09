/* Flagship: Inherited characteristics (ages 8–9; NGSS 3-LS3-1 "analyze and interpret data to provide evidence that plants
   and animals have traits inherited from parents and that variation of these traits exists in a group of similar
   organisms"; NC Y6 "offspring vary and are not identical to their parents").
   Match a baby rabbit to the parents it got its floppy ears and fur from; sort features into inherited and not inherited
   (a torn ear or a learned trick is not passed on); breed a litter from the same two parents and see the babies vary;
   measure ten sunflowers grown from one plant's seeds into a bar chart; read the most common height and the spread.
   Not flagbaby (animals and their young), flagadapt (adaptation) or flagalike (sorting by features). */
(()=>{
VIS.reg('flagtrait',c=>{let A,pad,quiz,qn=-1,gen=0;const S={};
const part=()=>['parents','sort','litter','measure','read','chal'][A.step];
const INK='#0f172a',PILL='#f8fafc',OK='#15803d',BAD='#b91c1c',PICK='#f59e0b',FUR={brown:'#a16207',white:'#f8fafc',black:'#1f2937',grey:'#9ca3af'};
function say(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const f1=()=>A.narrow?15:18,f2=()=>A.narrow?13:15,lim=(v,a,b)=>Math.max(a,Math.min(b,v));
function pill(s,x,y,px,edge,w0){const g=A.ctx;g.font=`700 ${px}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';const w=w0||g.measureText(s).width+16;
 x=lim(x,w/2+4,A.W-w/2-4);g.fillStyle=PILL;A.paint.rrect(x-w/2,y-px*.8,w,px*1.6,px*.6);g.fill();if(edge){g.strokeStyle=edge;g.lineWidth=3;g.stroke()}g.fillStyle=INK;g.fillText(s,x,y);return{x:x-w/2,y:y-px*.8,w,h:px*1.6}}
/* ---------- a simple rabbit: fur colour, ear shape (up or floppy), optional patch, torn ear or bow ---------- */
function rabbit(x,y,s,r){const g=A.ctx,fur=FUR[r.fur],edge=A.col.dark?'#e2e8f0':INK;g.lineWidth=2;g.strokeStyle=edge;
 const ear=(dx,side)=>{g.save();g.translate(x+dx*s,y-s*.55);g.rotate(r.ears==='floppy'?side*1.9:side*.18);g.beginPath();g.ellipse(0,-s*.42,s*.13,s*.42,0,0,7);g.fillStyle=fur;g.fill();g.stroke();
  if(r.torn&&side>0){g.fillStyle=A.mix(A.col.pn,'#fde68a',.5);g.beginPath();g.moveTo(-s*.14,-s*.7);g.lineTo(s*.05,-s*.55);g.lineTo(-s*.14,-s*.45);g.fill()}g.restore()};
 ear(-.16,-1);ear(.16,1);
 g.beginPath();g.ellipse(x,y+s*.35,s*.55,s*.42,0,0,7);g.fillStyle=fur;g.fill();g.stroke();
 if(r.patch){g.beginPath();g.ellipse(x+s*.22,y+s*.4,s*.2,s*.16,0,0,7);g.fillStyle=FUR.brown;g.fill()}
 g.beginPath();g.arc(x,y-s*.25,s*.34,0,7);g.fillStyle=fur;g.fill();g.stroke();
 g.fillStyle=r.fur==='black'?'#f8fafc':INK;g.beginPath();g.arc(x-s*.12,y-s*.3,s*.05,0,7);g.arc(x+s*.12,y-s*.3,s*.05,0,7);g.fill();
 if(r.bow){g.fillStyle='#db2777';g.beginPath();g.moveTo(x,y+s*.02);g.lineTo(x-s*.18,y-s*.07);g.lineTo(x-s*.18,y+s*.11);g.closePath();g.moveTo(x,y+s*.02);g.lineTo(x+s*.18,y-s*.07);g.lineTo(x+s*.18,y+s*.11);g.closePath();g.fill()}}
/* ---------- 1. which pair are the parents? ---------- */
const BABY={fur:'brown',ears:'floppy'},PAIRS=[[{fur:'white',ears:'up'},{fur:'grey',ears:'up'}],[{fur:'brown',ears:'floppy'},{fur:'white',ears:'floppy'}],[{fur:'black',ears:'up'},{fur:'black',ears:'up'}]];
const pairX=i=>A.W*(i+.5)/3,pairY=()=>A.H*.78,rs=()=>Math.min(A.W/8.5,A.H/6.5);
function drawParents(){const s=rs();rabbit(A.W/2,A.H*.3,s*.8,BABY);pill('baby',A.W/2,A.H*.3+s*1.05,f2());
 PAIRS.forEach((p,i)=>{const x=pairX(i),y=pairY();const g=A.ctx;g.strokeStyle=S.pick===i?(i===1?OK:BAD):A.alpha(A.col.dark?'#e2e8f0':INK,.35);g.lineWidth=S.pick===i?4:2;A.paint.rrect(x-A.W/6+6,y-s*1.5,A.W/3-12,s*2.6,12);g.stroke();
  rabbit(x-s*.62,y,s*.7,p[0]);rabbit(x+s*.62,y,s*.7,p[1]);pill('pair '+'ABC'[i],x,y-s*1.5,f2())});
 pill(S.pick===1?'Pair B: floppy ears and brown fur':'Tap the parents',A.W/2,A.H*.07,f1(),S.pick===1?OK:null)}
function choose(i){if(i<0)return;S.pick=i;S.tries++;i===1?A.sound.pop():A.sound.miss();
 after(i===1?'Yes, pair B. Both parents have floppy ears, and one has brown fur. The baby got its ears and fur from them: they are inherited.':
  i===0?'Pair A both have ears that stand up, and neither is brown. Where would the floppy ears come from?':'Pair C are black with upright ears. The baby\'s brown fur and floppy ears did not come from them.')}
/* ---------- 2. inherited or not? ---------- */
const CARDS=[['Floppy ears',1],['A torn ear from a fight',0],['Brown fur',1],['Knows a trick',0],['Eye colour',1],['A bow tied on',0]];
function binBox(k){const w=A.W*.44,h=A.H*.3;return{x:k?A.W*.53:A.W*.03,y:A.H*.66,w,h}}
function cardPos(i){const cols=A.narrow?2:3,w=(A.W-24)/cols-8,h=A.narrow?34:38,r=Math.floor(i/cols),q=i%cols;return{x:12+q*(w+8),y:A.H*.14+r*(h+8),w,h}}
function drawSort(){const g=A.ctx;[1,0].forEach(k=>{const b=binBox(k?0:1),inh=k;g.fillStyle=A.alpha(inh?OK:BAD,.15);A.paint.rrect(b.x,b.y,b.w,b.h,14);g.fill();g.strokeStyle=inh?OK:BAD;g.lineWidth=3;g.stroke();
  pill(inh?'🧬 Inherited':'🩹 Not inherited',b.x+b.w/2,b.y+20,f2());const got=CARDS.map((c2,i)=>[c2,i]).filter(([c2,i])=>S.put[i]===inh);got.forEach(([c2],j)=>pill(c2[0],b.x+b.w/2,b.y+46+j*(f2()+10),A.narrow?12:14))});
 CARDS.forEach((c2,i)=>{if(S.put[i]!=null)return;const p=S.drag&&S.drag.i===i?{...cardPos(i),x:S.drag.x-cardPos(i).w/2,y:S.drag.y-18}:cardPos(i);const g=A.ctx;g.fillStyle=PILL;A.paint.rrect(p.x,p.y,p.w,p.h,10);g.fill();g.strokeStyle=i===nextCard()?PICK:INK;g.lineWidth=i===nextCard()?3:1.5;g.stroke();
  g.fillStyle=INK;g.font=`700 ${A.narrow?12:14}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(c2[0],p.x+p.w/2,p.y+p.h/2)});
 pill(`Sorted ${Object.keys(S.put).length} of ${CARDS.length}`,A.W/2,A.H*.06,f1())}
const nextCard=()=>CARDS.findIndex((x,i)=>S.put[i]==null);
function drop(i,inh){if(i<0||S.put[i]!=null)return;const [name,real]=CARDS[i];
 if(inh!==real){A.sound.miss();return after(real?`${name} is passed on from parents, so it is inherited. Try the other box.`:`${name} happened during the rabbit's life. Babies are not born with it, so it is not inherited.`)}
 S.put[i]=real;A.sound.pop();const left=nextCard();after(left<0?'All sorted. Features that come from parents are inherited. Injuries, tricks and things put on a rabbit are not.':`${name}: ${real?'inherited, it comes from the parents':'not inherited, it happened during its life'}.`)}
/* ---------- 3. a litter from the same two parents ---------- */
const KITS=[{fur:'brown',ears:'floppy',z:.6},{fur:'white',ears:'floppy',z:.52},{fur:'white',ears:'floppy',patch:1,z:.58},{fur:'brown',ears:'floppy',z:.48},{fur:'white',ears:'floppy',patch:1,z:.55},{fur:'brown',ears:'floppy',z:.62}];
function drawLitter(){const s=rs()*.8,P=PAIRS[1];rabbit(A.W*.36,A.H*.24,s,P[0]);rabbit(A.W*.64,A.H*.24,s,P[1]);pill('parents',A.W/2,A.H*.07,f1());
 for(let i=0;i<S.kits;i++){const x=A.W*(i%3+.5)/3,y=A.H*(.66+.22*Math.floor(i/3));rabbit(x,y,rs()*1.45*KITS[i].z,KITS[i])}
 if(S.kits)pill(S.kits===6?'6 babies: all rabbits, none exactly alike':`${S.kits} ${S.kits>1?'babies':'baby'}`,A.W/2,A.H*.44,f2())}
function birth(){if(S.kits>=6)return;const k=KITS[S.kits++];A.sound.pop();
 after(S.kits===6?'Six babies from the same two parents. They are all rabbits with floppy ears like both parents, but their fur and their size vary. Babies are like their parents, but not identical: this is variation.':
  `Baby ${S.kits}: ${k.fur} fur${k.patch?' with a brown patch':''}, ${k.ears==='up'?'ears that stand up':'floppy ears'}.`)}
/* ---------- 4. measure ten sunflowers from one plant's seeds; 5. read the chart ---------- */
const H=[160,170,150,180,170,160,190,170,180,170],BINS=[150,160,170,180,190];
function flowerX(i){return A.W*(i+.5)/10}
function drawFlowers(){const g=A.ctx,top=A.H*.1,base=A.H*.5,sc=(base-top)/200;H.forEach((h,i)=>{const x=flowerX(i),y=base-h*sc;g.strokeStyle='#15803d';g.lineWidth=A.narrow?3:4;g.beginPath();g.moveTo(x,base);g.lineTo(x,y);g.stroke();
  const r=A.narrow?7:10;g.fillStyle='#facc15';g.beginPath();g.arc(x,y,r*1.6,0,7);g.fill();g.fillStyle='#78350f';g.beginPath();g.arc(x,y,r*.8,0,7);g.fill();if(S.done[i])pill(String(h),x,base+12,A.narrow?10:12)})}
function chartBox(){return{x:A.W*.12,y:A.H*.6,w:A.W*.84,h:A.H*.32}}
function barX(k){const b=chartBox();return b.x+b.w*(k+.5)/BINS.length}
function drawChart(){const g=A.ctx,b=chartBox(),unit=b.h/5,bw=b.w/BINS.length*.6;g.strokeStyle=A.col.dark?'#e2e8f0':INK;g.lineWidth=2;g.beginPath();g.moveTo(b.x,b.y);g.lineTo(b.x,b.y+b.h);g.lineTo(b.x+b.w,b.y+b.h);g.stroke();
 BINS.forEach((v,k)=>{const n=H.filter((h,i)=>S.done[i]&&h===v).length,x=barX(k);g.fillStyle=S.bar===k?(k===2?OK:BAD):'#f59e0b';g.fillRect(x-bw/2,b.y+b.h-n*unit,bw,n*unit);g.strokeStyle=INK;g.lineWidth=1.5;for(let j=0;j<n;j++)g.strokeRect(x-bw/2,b.y+b.h-(j+1)*unit,bw,unit);
  g.fillStyle=A.col.dark?'#e2e8f0':INK;g.font=`700 ${A.narrow?11:13}px system-ui,sans-serif`;g.textAlign='center';g.fillText(String(v),x,b.y+b.h+12)});
 g.save();g.translate(b.x-14,b.y+b.h/2);g.rotate(-Math.PI/2);g.fillText('number',0,0);g.restore()}
function drawMeasure(){drawFlowers();drawChart();pill(part()==='read'?(S.bar===2?'Most common: 170 cm · spread 150 to 190 cm':'Tap the tallest bar'):`Measured ${count()} of 10 (cm)`,A.W/2,A.H*.05,f2(),S.bar===2?OK:null)}
const count=()=>Object.keys(S.done).length;
function measure(i){if(i<0||S.done[i])return;S.done[i]=1;A.sound.tick();after(count()===10?'All 10 measured. Same parent plant, same kind of plant, but the heights vary from 150 cm to 190 cm.':`This sunflower is ${H[i]} cm tall. It goes in the ${H[i]} cm bar.`)}
function readBar(k){if(k<0)return;S.bar=k;k===2?A.sound.pop():A.sound.miss();const n=H.filter(h=>h===BINS[k]).length;
 after(k===2?'Yes: 4 sunflowers are 170 cm, the most common height. The others are a bit shorter or taller. That spread is variation in an inherited trait.':`${n} sunflower${n>1?'s are':' is'} ${BINS[k]} cm. Look for the bar that is tallest.`)}
function draw(){const g=A.ctx,k=part();g.fillStyle=A.mix(A.col.pn,'#dcfce7',A.col.dark?.06:.4);g.fillRect(0,0,A.W,A.H);
 if(k==='parents')drawParents();if(k==='sort')drawSort();if(k==='litter')drawLitter();if(k==='measure'||k==='read')drawMeasure();
 if(k==='chal'){const q=QS[qn%QS.length];if(q&&q.r){rabbit(A.W/2,A.H*.5,rs()*1.3,q.r)}pill('Challenge',A.W/2,A.H*.08,f1())}}
function fresh(o){gen++;for(const k in S)delete S[k];Object.assign(S,{pick:null,tries:0,put:{},drag:null,kits:0,done:{},bar:null,ok:()=>{}},o||{})}
const doneIf=(i,cond,msg)=>()=>{if(A.step===i&&cond()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function auto(i,acts,gap){steps[i].go();const t=gen;acts.forEach((f,j)=>setTimeout(()=>{if(t===gen)f()},A.reduced()?25*(j+1):(gap||450)*(j+1)))}
function after(m){say(m);A.redraw();keys();S.ok()}
function keys(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='parents')PAIRS.forEach((p,i)=>b('Pair '+'ABC'[i],()=>choose(i),`Choose pair ${'ABC'[i]}: ${p[0].fur} and ${p[1].fur}, ears ${p[0].ears==='up'?'standing up':'floppy'}`));
 if(k==='sort'){const i=nextCard();if(i>=0){b(`${CARDS[i][0]}: inherited`,()=>drop(i,1));b(`${CARDS[i][0]}: not inherited`,()=>drop(i,0))}}
 if(k==='litter'&&S.kits<6)b('Have a baby',birth,'The parents have another baby');
 if(k==='measure'&&count()<10)b('Measure the next one',()=>measure(H.findIndex((h,i)=>!S.done[i])));
 if(k==='read')BINS.forEach((v,j)=>b(`${v} cm bar`,()=>readBar(j),`Choose the ${v} centimetre bar`))}
/* pointer: tap a pair, drag a card to a box, tap a sunflower or a bar */
function inBox(p,b){return p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h}
function down(p){const k=part();
 if(k==='parents'){if(p.y>pairY()-rs()*1.6)choose(Math.floor(p.x/(A.W/3)));return false}
 if(k==='sort'){const i=CARDS.findIndex((x,j)=>S.put[j]==null&&inBox(p,cardPos(j)));if(i<0)return false;S.drag={i,x:p.x,y:p.y};A.redraw();return true}
 if(k==='litter'){birth();return false}
 if(k==='measure'){let best=-1,bd=A.W/20;H.forEach((h,i)=>{const d=Math.abs(p.x-flowerX(i));if(d<bd&&!S.done[i]&&p.y<A.H*.58){bd=d;best=i}});measure(best);return false}
 if(k==='read'){const b=chartBox();if(p.y<b.y-10)return false;let best=-1,bd=b.w/10;BINS.forEach((v,j)=>{const d=Math.abs(p.x-barX(j));if(d<bd){bd=d;best=j}});readBar(best);return false}return false}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){if(!S.drag)return;const i=S.drag.i;S.drag=null;if(p&&inBox(p,binBox(0)))drop(i,1);else if(p&&inBox(p,binBox(1)))drop(i,0);else A.redraw()}
const steps=[
{h:'Find the parents',p:'This baby rabbit has brown fur and floppy ears. Tap the pair of grown-up rabbits that could be its parents.',
 predict:{q:'Where do the baby\'s floppy ears come from?',opts:['It grew them by eating carrots','Its parents passed them on','It chose them'],ans:1},
 task:'Find the baby\'s parents',show:()=>auto(0,[()=>choose(0),()=>choose(1)],1100),
 go:()=>{fresh();say('A brown baby rabbit with floppy ears, and three pairs of grown-up rabbits.');keys();S.ok=doneIf(0,()=>S.pick===1,'A trait passed from parents to babies is inherited.')}},
{h:'Inherited or not?',p:'Drag each card into a box. Inherited means it came from the parents. Not inherited means it happened during the rabbit\'s life.',
 predict:{q:'A rabbit tore its ear in a fight. Will its babies be born with a torn ear?',opts:['Yes','No','Only the girl babies'],ans:1},
 task:'Sort all six cards',show:()=>auto(1,CARDS.map((x,i)=>()=>drop(i,x[1])),420),
 go:()=>{fresh();say('Six cards about a rabbit, and two boxes: inherited and not inherited.');keys();S.ok=doneIf(1,()=>Object.keys(S.put).length===6,'Injuries and learned tricks are not passed on.')}},
{h:'Same parents, new babies',p:'These two parents have a litter of babies. Tap to have a baby, until there are six.',
 predict:{q:'Will all six babies look exactly the same?',opts:['Yes, they have the same parents','No, they will be alike but not all the same','No, some will not be rabbits'],ans:1},
 task:'Have six babies',show:()=>auto(2,Array.from({length:6},()=>birth),400),
 go:()=>{fresh();say('Two parent rabbits with floppy ears: one brown, one white.');keys();S.ok=doneIf(2,()=>S.kits===6,'Babies inherit traits from their parents, but they vary.')}},
{h:'Measure the sunflowers',p:'All ten sunflowers grew from seeds of one plant. Tap each one to measure it. Its height goes on the bar chart.',
 predict:{q:'The seeds all came from one plant. The sunflowers will grow…',opts:['all exactly the same height','to different heights, but all sunflower-tall','to any height, from 1 cm to 10 m'],ans:1},
 task:'Measure all ten sunflowers',show:()=>auto(3,Array.from({length:10},(x,i)=>()=>measure(i)),260),
 go:()=>{fresh();say('Ten sunflowers of different heights and an empty bar chart.');keys();S.ok=doneIf(3,()=>count()===10,'Same parent plant, different heights: variation.')}},
{h:'Read the chart',p:'Which height did the most sunflowers grow to? Tap that bar.',
 task:'Find the most common height',show:()=>auto(4,[()=>readBar(0),()=>readBar(2)],1000),
 go:()=>{fresh({done:Object.fromEntries(H.map((h,i)=>[i,1]))});say('A bar chart of ten sunflower heights from 150 to 190 cm.');keys();S.ok=doneIf(4,()=>S.bar===2,'Most are 170 cm, but they spread from 150 to 190 cm.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.ok()});
const QS=[
 {q:'A baby rabbit has floppy ears like its mum. Are floppy ears inherited?',ans:'Yes, passed on from a parent',bad:[['No, it learned them','learned'],['No, it got them from its food','food']],r:{fur:'white',ears:'floppy'}},
 {q:'A dog learns to sit when told. Will her puppies know how to sit without being taught?',ans:'No, learned skills are not inherited',bad:[['Yes, she passes it on','learnpass'],['Only if they look like her','looks']]},
 {q:'Two brown rabbits have five babies. What is most likely?',ans:'All rabbits, but not all exactly the same',bad:[['All exactly the same','identical'],['Some will be kittens','kind']],r:{fur:'brown',ears:'up'}},
 {q:'Ten sunflowers grown from one plant\'s seeds are 150 to 190 cm tall. What does this show?',ans:'Variation: living things of the same kind differ',bad:[['Some are not really sunflowers','notsame'],['Someone measured them wrong','error']]},
 {q:'A rabbit lost part of its ear in an accident. Its babies will have…',ans:'Normal ears',bad:[['Torn ears like hers','injury'],['No ears','injury']],r:{fur:'grey',ears:'up',torn:1}},
 {q:'Which of these is an inherited characteristic of a person?',ans:'Natural eye colour',bad:[['Being able to ride a bike','learned'],['A short haircut','life']]}];
function why(t){let m='Ask: did it come from the parents, or did it happen during the animal\'s life?';
 if(t==='learned')m='Learning happens during life. Floppy ears and eye colour are there from birth, passed on by the parents.';
 if(t==='food')m='Food helps a rabbit grow, but it does not change the shape of its ears. Ear shape comes from the parents.';
 if(t==='learnpass')m='A trick is learned during life, so it is not inherited. Each puppy has to be taught.';
 if(t==='looks')m='Looking like a parent is about inherited body features. Skills like sitting are learned, whatever the puppy looks like.';
 if(t==='identical')m='Babies of the same parents vary. Remember the litter: different fur and different sizes.';
 if(t==='kind')m='Living things make babies of the same kind. Rabbits always have baby rabbits.';
 if(t==='notsame')m='They are all sunflowers. Plants of the same kind still vary in height: that is variation.';
 if(t==='error')m='Different heights are normal, not a mistake. Living things of the same kind vary.';
 if(t==='injury')m='An injury happens during life. It is not passed on, so the babies are born with normal ears.';
 if(t==='life')m='A haircut changes hair during life. It is not passed on to children.';
 return m}
function ask(){qn++;const Q=QS[qn%QS.length],opts=[[Q.ans,'ok'],...Q.bad],r=qn%3,order=opts.slice(r).concat(opts.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');order.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn','aria-label':'Answer: '+v},row,v).onclick=()=>mark(t,Q.ans)});say('Challenge: '+Q.q);A.redraw()}
function mark(t,ans){quiz.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';ok?A.win():A.sound.miss();say(ok?'Yes: '+ans+'.':why(t));
 fb.innerHTML=(ok?`✓ Yes: ${ans}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:Q=>{quiz.hidden=Q.step!==5;pad.hidden=Q.step===5;keys()},
 init:Q=>{const w=c.el('div',{class:'fl-below'},Q.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=c.el('div',{class:'fl-chal'},Q.below);fresh();A.gest({down,move,up});keys()}});
A.start()})})();
