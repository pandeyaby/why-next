/* Flagship – magnetic fields (ages 11–12; KS3 physics: plotting fields with a compass, field lines, Earth's magnetism;
   NGSS MS-PS2-5). Scenes: drag a plotting compass round a bar magnet and plot arrows until field lines appear; rank three
   spots from strongest to weakest field by how close the lines are; flip a second magnet between attract and repel and
   find the neutral point; flip the magnet inside the Earth until compasses point to the Arctic; sort facts from myths.
   Every drag or tap has a button twin. Physics and drawings in learn/magf_art.js. */
(()=>{const {on,field,kit,SPOTS,PLACES,CARDS,START,LEARNT,QUIZ}=MAGF;
VIS.reg('flagmagfield',c=>{let A,K,ctl,chal,round=-1,epoch=0;
const C={ink:'#1f2937',ok:'#047857',ko:'#b91c1c',rim:'#64748b',sel:'#1d4ed8',warm:'#b45309',bg:'#f8fafc',hd:'#1e3a8a',npole:'#b91c1c',spole:'#1d4ed8',line:'#7c3aed',hi:'#fef08a',earth:'#bfdbfe',land:'#86efac'};
const W={};const part=()=>['plot','strength','pair','earth','facts','quiz'][A.step];
const head=t=>K.say(t,A.W/2,A.H*.04,13,{c:C.hd,w:A.W-20});
const tally=(t,good)=>K.say(t,A.W/2,A.H*.955,12,{b:800,c:good?C.ok:C.ink,w:A.W-20});
const box=()=>({x:0,y:A.H*.08,w:A.W,h:A.H*.8});
/* one bar magnet in the middle */
const mag=()=>({x:A.W/2,y:A.H*.46,L:Math.min(A.W*.17,A.H*.14)});
const poles1=()=>{const m=mag();return K.polesOf(m.x,m.y,m.L,true)};
const inMagnet=p=>{const m=mag();return Math.abs(p.x-m.x)<m.L+14&&Math.abs(p.y-m.y)<m.L*.25+14};
/* ---------- 1: plot with a compass ---------- */
const HOME=()=>{const m=mag();return[[1.9,0],[1.4,-1.1],[0,-1.3],[-1.4,-1.1],[-1.9,0],[-1.4,1.1],[0,1.3],[1.4,1.1]].map(([a,b])=>({x:m.x+a*m.L,y:m.y+b*m.L}))};
function paintPlot(){const m=mag(),P=poles1(),n=W.plots.length;head(n>=6?'The arrows join up into field lines':'Plot the field with a compass');
 if(n>=6)K.lines(P,box(),12,C.line);K.bar(m.x,m.y,m.L,true);
 W.plots.forEach(p=>{const f=field(P,p),a=Math.atan2(f.y,f.x),s=12;K.arrow({x:p.x-Math.cos(a)*s,y:p.y-Math.sin(a)*s},{x:p.x+Math.cos(a)*s*.4,y:p.y+Math.sin(a)*s*.4},C.ink);
  const g=A.ctx;g.strokeStyle=C.ink;g.lineWidth=2;g.beginPath();g.moveTo(p.x-Math.cos(a)*s,p.y-Math.sin(a)*s);g.lineTo(p.x+Math.cos(a)*s,p.y+Math.sin(a)*s);g.stroke()});
 const cp=W.grip?{x:W.grip.x,y:W.grip.y}:W.cp;K.compass(cp,field(P,cp),A.narrow?20:18,W.grip?C.sel:null);
 tally(n>=6?'✓ 6 arrows plotted: out of N, into S':`Arrows plotted: ${n} of 6`,n>=6)}
function plotAt(p){if(inMagnet(p)){A.sound.miss();return speak('That is on the magnet. Put the compass in the space around it.')}
 if(W.plots.some(q=>Math.hypot(q.x-p.x,q.y-p.y)<34)){A.sound.tick();return speak('You plotted near there already. Move further round the magnet.')}
 W.cp=p;W.plots.push(p);const f=field(poles1(),p),m=mag(),side=p.x>m.x+m.L*.3?'near N':p.x<m.x-m.L*.3?'near S':'beside the middle';A.sound.pop();
 speak(`Arrow ${W.plots.length} plotted ${side}: the needle points ${dirWord(f)}.`+(W.plots.length>=6?' Join the arrows and you get field lines.':''))}
function dirWord(f){const a=Math.atan2(-f.y,f.x)*180/Math.PI,k=Math.round(((a+360)%360)/45)%8;return['right','up and right','up','up and left','left','down and left','down','down and right'][k]}
function nextHome(){const H=HOME(),i=W.home%H.length;W.home++;W.cp=H[i];A.sound.tick();speak(`Compass moved to spot ${i+1}. The needle points ${dirWord(field(poles1(),W.cp))}.`)}
/* ---------- 2: strength ---------- */
const spotAt=i=>{const m=mag(),s=SPOTS[i];return{x:Math.max(24,Math.min(A.W-24,m.x+s.dx*m.L)),y:m.y+s.dy*m.L}};
const strength=i=>field(poles1(),spotAt(i)).m;
function paintStrength(){const m=mag(),P=poles1(),n=W.rank.length;head(n>=3?'Close lines, strong field':'Where is the field strongest?');
 K.lines(P,box(),16,C.line);K.bar(m.x,m.y,m.L,true);const top=strength(0);
 SPOTS.forEach((s,i)=>{const p=spotAt(i),k=W.rank.indexOf(i),g=A.ctx;g.fillStyle=k>=0?'#d1fae5':W.bad===i?'#fee2e2':C.hi;g.beginPath();g.arc(p.x,p.y,A.narrow?17:15,0,7);g.fill();
  g.lineWidth=2;g.strokeStyle=k>=0?C.ok:C.ink;g.stroke();K.say(k>=0?`${s.n} #${k+1}`:s.n,p.x,p.y,11,{b:800})});
 const y0=A.H*.8,bw=A.W*.25;W.rank.forEach((i,k)=>{const v=strength(i)/top,x=A.W*.12+k*A.W*.28;A.ctx.fillStyle='#e2e8f0';A.ctx.fillRect(x,y0,bw,12);A.ctx.fillStyle=C.line;A.ctx.fillRect(x,y0,bw*Math.max(.03,v),12);
  K.say(`${SPOTS[i].n}: ${Math.max(1,Math.round(v*100))}%`,x+bw/2,y0+24,10,{b:700})});
 tally(n>=3?'✓ Strongest at the pole, weakest far away':`Ranked: ${n} of 3 (strongest first)`,n>=3)}
function rankSpot(i){if(W.rank.includes(i)||W.rank.length>=3)return;const left=[0,1,2].filter(j=>!W.rank.includes(j)),best=left.reduce((a,b)=>strength(b)>strength(a)?b:a);
 if(i!==best){W.bad=i;A.sound.miss();return speak(`${SPOTS[i].n} is ${SPOTS[i].why}. `+slip(i===1?'middle':'far'))}
 W.bad=-1;W.rank.push(i);A.sound.pop();speak(`${SPOTS[i].n}, ${SPOTS[i].why}: number ${W.rank.length}.`+(W.rank.length>=3?' The closer the lines, the stronger the field.':''))}
/* ---------- 3: two magnets ---------- */
const pair=()=>{const L=Math.min(A.W*.13,A.H*.11);return{L,y:A.H*.46,xa:A.W*.27,xb:A.W*.73}};
const poles2=()=>{const q=pair();return K.polesOf(q.xa,q.y,q.L,true).concat(K.polesOf(q.xb,q.y,q.L,!W.like))};
const neutral=()=>{const q=pair();return{x:(q.xa+q.xb)/2,y:q.y}};
function paintPair(){const q=pair(),P=poles2();head(W.like?'N faces N: the magnets repel':'N faces S: the magnets attract');
 K.lines(P,box(),12,C.line);K.bar(q.xa,q.y,q.L,true);K.bar(q.xb,q.y,q.L,!W.like);K.say('A',q.xa,q.y+q.L*.6,12,{b:800,bg:'#ffffff'});K.say('B (tap to flip)',q.xb,q.y+q.L*.6,11,{b:800,bg:'#ffffff'});
 if(W.probe){const f=field(P,W.probe);K.compass(W.probe,f.m*q.L*q.L<.02?null:f,16,W.zero?C.ok:C.ko);if(W.zero)K.say('Neutral point: no field',W.probe.x,W.probe.y-34,11,{b:800,c:C.ok,bg:'#ffffff'})}
 const seen=(W.saw.a?1:0)+(W.saw.r?1:0);tally(W.zero&&seen>=2?'✓ Both patterns seen, neutral point found':`Patterns seen: ${seen} of 2${W.like?' · now find where the field is zero':''}`,W.zero&&seen>=2)}
function flipB(){W.like=!W.like;W.probe=null;W.zero=0;W.saw[W.like?'r':'a']=1;A.sound.tick();speak(W.like?'Magnet B flipped: N faces N. The lines turn away from each other.':'Magnet B flipped: N faces S. The lines run straight across the gap.')}
function probe(p){W.probe=p;const P=poles2(),q=pair(),f=field(P,p),n=neutral(),near=Math.hypot(p.x-n.x,p.y-n.y)<q.L*.45;
 if(W.like&&near){W.probe=n;W.zero=1;A.sound.pop();return speak('Here the two pushes cancel. A compass would not settle: this is a neutral point.')}
 W.zero=0;A.sound.miss();speak(W.like?`The compass still points ${dirWord(f)}, so there is a field here. `+slip('notzero'):slip('across'))}
/* ---------- 4: the Earth ---------- */
const globe=()=>({x:A.W/2,y:A.H*.47,r:Math.min(A.W*.32,A.H*.3)});
const earthPoles=()=>{const e=globe(),d=e.r*.32;return[{x:e.x,y:e.y-d,q:W.topN?1:-1},{x:e.x,y:e.y+d,q:W.topN?-1:1}]};
const placeAt=i=>{const e=globe(),a=PLACES[i].a*Math.PI/180;return{x:e.x+Math.sin(a)*(e.r+22),y:e.y-Math.cos(a)*(e.r+22)}};
function paintEarth(){const e=globe(),g=A.ctx,P=earthPoles();head('Why does a compass point north?');
 g.fillStyle=C.earth;g.beginPath();g.arc(e.x,e.y,e.r,0,7);g.fill();g.strokeStyle=C.ink;g.lineWidth=2;g.stroke();
 g.fillStyle=C.land;[[-.35,-.45,.32],[.3,-.25,.26],[.05,.35,.22]].forEach(([a,b,r])=>{g.beginPath();g.arc(e.x+a*e.r,e.y+b*e.r,r*e.r,0,7);g.fill()});
 g.globalAlpha=.75;K.lines(P,{x:-A.W*.2,y:-A.H*.2,w:A.W*1.4,h:A.H*1.4},12,'#6d28d9');g.globalAlpha=1;
 K.bar(e.x,e.y,e.r*.42,W.topN,-Math.PI/2);K.say('Arctic (geographic north)',e.x,e.y-e.r-14,11,{b:800,c:C.hd,bg:'#ffffff'});K.say('Antarctica',e.x,e.y+e.r+14,11,{b:800,c:C.hd,bg:'#ffffff'});
 W.checked.forEach(i=>{const p=placeAt(i);K.compass(p,flatField(i),15,W.okNow?C.ok:C.ko);K.say(PLACES[i].n,p.x,p.y+(PLACES[i].a===90?-26:26),10,{b:700,bg:'#ffffff'})});
 PLACES.forEach((s,i)=>{if(W.checked.includes(i))return;const p=placeAt(i);g.fillStyle=C.hi;g.beginPath();g.arc(p.x,p.y,13,0,7);g.fill();g.strokeStyle=C.ink;g.lineWidth=1.5;g.stroke();K.say('?',p.x,p.y,11,{b:800})});
 const ok=!W.topN&&W.checked.length>=3;tally(ok?'✓ Compasses point to the Arctic: a south pole is there':`Places checked: ${W.checked.length} of 3`,ok)}
/* a compass lies flat, so it shows only the part of the field along the ground */
function flatField(i){const a=PLACES[i].a*Math.PI/180,t={x:Math.cos(a),y:Math.sin(a)},f=field(earthPoles(),placeAt(i)),d=f.x*t.x+f.y*t.y;return{x:t.x*d,y:t.y*d,m:Math.abs(d)}}
function flipEarth(){W.topN=!W.topN;W.checked=[];W.okNow=!W.topN;A.sound.tick();speak(W.topN?'Now the N pole of the Earth’s magnet is in the Arctic. Check the places again.':'Now the S pole of the Earth’s magnet is in the Arctic. Check the places again.')}
function checkPlace(i){if(W.checked.includes(i))return;W.checked.push(i);W.okNow=!W.topN;
 if(W.topN){A.sound.miss();return speak(`In ${PLACES[i].n} the compass N end points along the ground towards Antarctica. `+slip('earthN'))}
 A.sound.pop();speak(`In ${PLACES[i].n} the N end points along the ground towards the Arctic.`+(W.checked.length>=3?' So the Arctic has a magnetic south pole: it pulls the N end of every compass.':''))}
/* ---------- 5: facts and myths ---------- */
const cardAt=i=>K.rows(CARDS.length,2,{x:A.W*.03,y:A.H*.09,w:A.W*.94,h:A.H*.56})[i],tray=k=>({x:A.W*(.03+k*.49),y:A.H*.69,w:A.W*.45,h:A.H*.2});
function paintFacts(){const n=Object.keys(W.sorted).length;head('True, or a myth?');
 [0,1].forEach(k=>{const b=tray(k);K.tile(b,k?'#ffe4e6':'#dcfce7',W.hot===k?'sel':'');K.say(k?'Myth':'True',b.x+b.w/2,b.y+b.h*.3,13,{b:800});
  K.say('✓'.repeat(CARDS.filter((o,i)=>W.sorted[i]===k).length)||'…',b.x+b.w/2,b.y+b.h*.68,12,{c:k?C.ko:C.ok})});
 CARDS.forEach((o,i)=>{if(i in W.sorted)return;const r=cardAt(i),rr=W.grip&&W.grip.i===i?{...r,x:W.grip.x-r.w/2,y:W.grip.y-r.h/2}:r;K.tile(rr,'#ffffff',W.bad===i?'ko':W.pick===i||(W.grip&&W.grip.i===i)?'sel':'');K.say(o.t,rr.x+rr.w/2,rr.y+rr.h/2,10,{w:rr.w-10})});
 tally(n>=8?'✓ All 8 sorted':`Sorted: ${n} of 8`,n>=8)}
function sortCard(i,k){if(i in W.sorted)return;W.pick=-1;const o=CARDS[i];if(o.k!==k){W.bad=i;A.sound.miss();return speak(o.k?slip(o.s):`“${o.t}” is true.`)}
 W.bad=-1;W.sorted[i]=k;A.sound.pop();speak(`“${o.t}”: ${k?'a myth. '+slip(o.s):'true.'}`)}
/* ---------- what went wrong, in words ---------- */
function slip(t){let m='Field lines leave N, curve round and go into S. They are closest where the field is strongest.';
 if(t==='dir')m='That is backwards. Outside a magnet, field lines go from the N pole to the S pole.';
 if(t==='straight')m='Field lines curve round from N to S. Plot a compass at the side and the arrow points along the magnet.';
 if(t==='middle')m='The lines are further apart beside the middle. They crowd together at the poles, so the field is strongest there.';
 if(t==='far')m='Far away the lines spread out, so the field is weak. Look where the lines are closest.';
 if(t==='same')m='Line spacing changes. Close lines at the poles mean a strong field; wide gaps far away mean a weak one.';
 if(t==='attractN')m='Like poles repel, so the compass’s N end is pushed away from the magnet’s N pole.';
 if(t==='earth')m='Close to a magnet its field is far stronger than the Earth’s, so the needle follows the magnet.';
 if(t==='cancel'||t==='cross')m='A field has one direction at each place, so a compass points one way. Two lines crossing would mean two directions.';
 if(t==='earthN')m='The N end of a compass is pulled to the Arctic. Unlike poles attract, so the pole there must be a south pole.';
 if(t==='star')m='A compass needle is a magnet. It lines up with the Earth’s magnetic field, not with stars.';
 if(t==='strong')m='The two pushes cancel midway between like poles. That is a neutral point, with no field.';
 if(t==='notzero')m='Look midway between the two N poles, where the lines turn away from each other.';
 if(t==='across')m='With N facing S the lines run straight across the gap, so the field there is strong. Flip magnet B first.';
 if(t==='broken'||t==='off')m='Steel near a compass is magnetised and changes the field there, so the needle swings.';
 if(t==='edge')m='The field spreads out into the space round a magnet. It gets weaker with distance but does not stop at the edge.';
 if(t==='flat')m='The field is all round the magnet: above, below and to the sides. We draw a flat slice of it.';
 if(t==='exact')m='Magnetic north is near the North Pole but not at it, and it moves a little every year.';
 return m}
/* ---------- canvas, pointer, buttons ---------- */
function draw(){const k=part(),g=A.ctx;g.fillStyle=C.bg;g.fillRect(0,0,A.W,A.H);K=MAGF.kit(A,C);
 if(k==='quiz'){const m=mag();K.lines(poles1(),box(),12,C.line);K.bar(m.x,m.y,m.L,true);K.say('Challenge',A.W/2,A.H*.86,20);return}
 ({plot:paintPlot,strength:paintStrength,pair:paintPair,earth:paintEarth,facts:paintFacts})[k]();A.fx.draw(g)}
function down(p){const k=part(),grab=i=>{W.grip={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true};
 if(k==='plot')return grab(-1);
 if(k==='strength'){const i=SPOTS.findIndex((_,j)=>Math.hypot(p.x-spotAt(j).x,p.y-spotAt(j).y)<30);if(i>=0)rankSpot(i);return false}
 if(k==='pair'){const q=pair();if(Math.abs(p.x-q.xb)<q.L+10&&Math.abs(p.y-q.y)<q.L*.5){flipB();return false}probe(p);return false}
 if(k==='earth'){const e=globe();if(Math.abs(p.x-e.x)<e.r*.2&&Math.abs(p.y-e.y)<e.r*.5){flipEarth();return false}const i=PLACES.findIndex((_,j)=>Math.hypot(p.x-placeAt(j).x,p.y-placeAt(j).y)<28);if(i>=0)checkPlace(i);return false}
 if(k==='facts'){const i=CARDS.findIndex((_,j)=>!(j in W.sorted)&&on(p,cardAt(j)));if(i>=0)return grab(i);const z=[0,1].find(x=>on(p,tray(x)));if(z!=null&&W.pick>=0)sortCard(W.pick,z)}
 return false}
function drag(p){const h=W.grip;if(!h)return;h.x=p.x;h.y=p.y;if(part()==='facts')W.hot=[0,1].find(x=>on(p,tray(x)));A.redraw()}
function lift_end(p){const h=W.grip;if(!h)return;W.grip=null;W.hot=undefined;const k=part(),tap=Math.hypot(p.x-h.x0,p.y-h.y0)<=12;
 if(k==='plot')return plotAt(p);
 if(k==='facts'){const z=[0,1].find(x=>on(p,tray(x)));if(z!=null)return sortCard(h.i,z);if(tap){W.pick=h.i;return speak(`“${CARDS[h.i].t}” picked. Now tap True or Myth.`)}}
 A.redraw()}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();W.test()}
function keys(){if(!ctl)return;ctl.innerHTML='';const k=part(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='plot'){btn('Move compass to the next spot',nextHome,'Move the compass to the next spot round the magnet');btn('Plot an arrow here',()=>plotAt(W.cp),'Plot an arrow where the compass is')}
 if(k==='strength')SPOTS.forEach((s,i)=>{if(!W.rank.includes(i))btn(`Spot ${s.n} is next strongest`,()=>rankSpot(i),`Spot ${s.n}, ${s.why}, is the next strongest`)});
 if(k==='pair'){btn('Flip magnet B',flipB);btn('Test midway between the magnets',()=>probe(neutral()),'Put a compass midway between the magnets');btn('Test above magnet A',()=>{const q=pair();probe({x:q.xa,y:q.y-q.L*1.2})},'Put a compass above magnet A')}
 if(k==='earth'){btn('Flip the Earth’s magnet',flipEarth,'Flip the magnet inside the Earth');PLACES.forEach((s,i)=>{if(!W.checked.includes(i))btn(`Check ${s.n}`,()=>checkPlace(i),`Put a compass in ${s.n}`)})}
 if(k==='facts')CARDS.forEach((o,i)=>{if(i in W.sorted)return;btn(`True: ${o.t}`,()=>sortCard(i,0),`“${o.t}” is true`);btn(`Myth: ${o.t}`,()=>sortCard(i,1),`“${o.t}” is a myth`)})}
function clear(){epoch++;for(const x in W)delete W[x];Object.assign(W,{plots:[],home:0,cp:{x:A.W*.82,y:A.H*.2},rank:[],like:0,saw:{a:1},probe:null,zero:0,topN:1,checked:[],okNow:0,sorted:{},bad:-1,pick:-1,grip:null,test:()=>{}})}
const doneWhen=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(LEARNT[i]+A.reveal(i))};
function begin(i,ok){clear();speak(START[i]);W.test=doneWhen(i,ok)}
function demo(i,acts,ms){steps[i].go();const e=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e===epoch)f()},ms*(j+1)))}
const plotNext=()=>{nextHome();plotAt(W.cp)};
const steps=[
{h:'Plot the field',p:'A plotting compass is a tiny magnet. Its red N end lines up with the field wherever you put it.',
 predict:{q:'You put a compass just past the N pole of the magnet. Where does its N end point?',opts:['Towards the magnet’s N pole','Away from the magnet’s N pole'],ans:1},task:'Plot 6 arrows round the magnet',
 show:()=>demo(0,[plotNext,plotNext,plotNext,plotNext,plotNext,plotNext],450),go:()=>begin(0,()=>W.plots.length>=6)},
{h:'Strong and weak',p:'Field lines show the field. Three spots: P next to a pole, Q beside the middle, R far away.',
 predict:{q:'Where is the field strongest?',opts:['Beside the middle of the magnet','Next to a pole'],ans:1},task:'Rank P, Q and R, strongest first',
 show:()=>demo(1,[()=>rankSpot(0),()=>rankSpot(1),()=>rankSpot(2)],600),go:()=>begin(1,()=>W.rank.length>=3)},
{h:'Two magnets',p:'Magnet B sits next to magnet A. The field lines show how they push or pull.',
 predict:{q:'Two N poles face each other. What do the field lines between them do?',opts:['Join straight across the gap','Turn away and leave a spot with no field'],ans:1},task:'See both patterns, then find the neutral point',
 show:()=>demo(2,[flipB,()=>probe(neutral())],800),go:()=>begin(2,()=>W.zero&&W.saw.a&&W.saw.r)},
{h:'The Earth is a magnet',p:'Deep inside, the Earth acts like a giant bar magnet. Real compasses point their N end to the Arctic.',
 predict:{q:'So what kind of magnetic pole is in the Arctic?',opts:['A north pole','A south pole'],ans:1},task:'Make compasses point to the Arctic in 3 places',
 show:()=>demo(3,[flipEarth,()=>checkPlace(0),()=>checkPlace(1),()=>checkPlace(2)],600),go:()=>begin(3,()=>!W.topN&&W.checked.length>=3)},
{h:'True or myth?',p:'Use what you found to sort these. Some are things people often get wrong.',task:'Sort all 8 cards',
 show:()=>demo(4,CARDS.map((o,i)=>()=>sortCard(i,o.k)),380),go:()=>begin(4,()=>Object.keys(W.sorted).length>=8)},
{h:'Challenge',p:'',go:()=>{clear();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W.test()});
function next(){round++;const X=QUIZ[round%QUIZ.length],all=[[X.a,''],...X.o],r=round%3,order=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${X.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');order.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>judge(s,X)});c.say('Challenge: '+X.q);A.cv.setAttribute('aria-label','Challenge: '+X.q);A.redraw()}
function judge(s,X){chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),m=s?slip(s):'';
 if(s)A.sound.miss();else A.win();fb.innerHTML=(s?'✗ '+m:'✓ '+X.a+'.')+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(s?m:'Yes.')}
FK.shell(c,{steps,ratio:.64,tall:1.3,draw,onStep:X=>{chal.hidden=X.step!==5;ctl.hidden=X.step===5;keys()},
 init:X=>{A=X;K=MAGF.kit(A,C);const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Magnetic field lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move:drag,up:lift_end});keys()}}).start()})})();
