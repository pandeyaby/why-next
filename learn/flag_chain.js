/* Flagship: simple food chains (ages 6-7): plant first, arrows from food to eater, producers and consumers,
   losing a link, filling gaps. Every drag or canvas tap has a button twin. */
(()=>{
const CHAINS=[[['grass','🌱'],['rabbit','🐇'],['fox','🦊']],[['leaf','🍃'],['caterpillar','🐛'],['bird','🐦']],[['wheat','🌾'],['mouse','🐭'],['owl','🦉']]];
const TRAY=[[2,0,1],[1,2,0],[2,1,0]];
const FLIPS=[['lettuce','🥬'],['snail','🐌'],['thrush','🐦'],['cat','🐈']];
const ROLES=[['grass','🌱',0],['rabbit','🐇',1],['tree','🌳',0],['owl','🦉',1],['sunflower','🌻',0],['crab','🦀',1]];
const LOSS=[['grass','🌱'],['rabbit','🐇'],['fox','🦊']];
const LOSE=[{gone:1,note:['grows tall','','less food'],say:'No rabbits. The fox has less food to eat, and the grass grows tall.'},
 {gone:0,note:['','no food','no food soon'],say:'No grass. The rabbits have no food, so soon the fox has no food either.'}];
const GAPS=[{c:[['pondweed','🌿'],null,['fish','🐟'],['otter','🦦']],o:[['tadpole','🐸','ok'],['otter','🦦','top'],['stone','🪨','alive']]},
 {c:[['leaf','🍃'],['caterpillar','🐛'],null,['hawk','🦅']],o:[['grass','🌱','plant'],['blue tit','🐦','ok'],['hawk','🦅','top']]},
 {c:[null,['snail','🐌'],['thrush','🐦'],['cat','🐈']],o:[['Sun','☀️','sun'],['cat','🐈','top'],['lettuce','🥬','ok']]}];
VIS.reg('flagchain',c=>{let A,pad,quiz,qn=-1,streak=0;const G={};
const stage=()=>['build','arrow','role','lose','gap','quiz'][A.step];
const beep=n=>A.sound[n](),redraw=()=>A.redraw(),refresh=()=>{redraw();controls()};
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
/* wraps instead of squashing on phones */
function text(t,x,y,size,col,weight){const g=A.ctx,px=Math.round(size*(A.narrow?1:1.15)),room=A.W-20;g.font=`${weight||700} ${px}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 if(g.measureText(t).width<=room)return g.fillText(t,x,y);const words=t.split(' '),lines=[''];words.forEach(w=>{const tryLine=(lines[lines.length-1]+' '+w).trim();if(g.measureText(tryLine).width>room&&lines[lines.length-1])lines.push(w);else lines[lines.length-1]=tryLine});
 lines.forEach((l,i)=>g.fillText(l,x,y+(i-(lines.length-1)/2)*px*1.22,room))}
function card(b,fill,edge,lw){const g=A.ctx;g.fillStyle=fill;A.paint.rrect(b.x,b.y,b.w,b.h,14);g.fill();g.lineWidth=lw||2;g.strokeStyle=edge||A.col.tx;A.paint.rrect(b.x,b.y,b.w,b.h,14);g.stroke()}
const inside=(p,b)=>b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
function spots(n){const r=Math.min(A.W/(n*3.4),A.H*.12),gap=(A.W-2*r*n)/(n+1);return[...Array(n)].map((_,i)=>({x:gap+r+i*(2*r+gap),y:A.H*.36,r}))}
function creature(s,who,ring,dim){const g=A.ctx,C=A.col;g.globalAlpha=dim?.35:1;g.beginPath();g.arc(s.x,s.y,s.r,0,7);g.fillStyle=A.alpha(ring,.22);g.fill();g.lineWidth=3;g.strokeStyle=ring;g.stroke();
 g.font=`${Math.round(s.r*1.05)}px system-ui,"Noto Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=C.tx;g.fillText(who[1],s.x,s.y+2);g.globalAlpha=1;
 text(who[0],s.x,s.y+s.r+16,13,C.tx,700);if(dim)text('✕ gone',s.x,s.y-s.r-12,13,C.rd,800)}
function hole(s){const g=A.ctx;g.setLineDash([6,5]);g.lineWidth=2.5;g.strokeStyle=A.col.mu;g.beginPath();g.arc(s.x,s.y,s.r,0,7);g.stroke();g.setLineDash([]);text('?',s.x,s.y,24,A.col.mu,800)}
function arrow(a,b,dir,col){const g=A.ctx,[p,q]=dir>0?[a,b]:[b,a],sgn=dir>0?1:-1,x1=p.x+sgn*(p.r+6),x2=q.x-sgn*(q.r+8),y=a.y;g.strokeStyle=col;g.fillStyle=col;g.lineWidth=4;
 g.beginPath();g.moveTo(x1,y);g.lineTo(x2,y);g.stroke();g.beginPath();g.moveTo(x2+sgn*8,y);g.lineTo(x2-sgn*6,y-9);g.lineTo(x2-sgn*6,y+9);g.closePath();g.fill()}
const plant=w=>/grass|leaf|wheat|lettuce|pondweed|tree|sunflower/.test(w[0]),art=w=>/^[aeiou]/i.test(w)?'an':'a',Art=w=>art(w)==='an'?'An':'A';
const ringOf=w=>plant(w)?A.col.gr:A.col.am;
/* big tray cards for small fingers */
function trayBox(i,n){const w=Math.min(150,(A.W-16-(n-1)*10)/n),h=Math.min(A.H*.2,86),x0=(A.W-(n*w+(n-1)*10))/2;return{x:x0+i*(w+10),y:A.H*.7,w,h}}
function trayCard(b,who,hot){card(b,hot?A.alpha(A.col.vi,.3):A.alpha(A.col.cy,.14),A.col.tx,hot?3.5:2);const g=A.ctx;g.font=`${Math.round(b.h*.42)}px system-ui,"Noto Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(who[1],b.x+b.w/2,b.y+b.h*.4);text(who[0],b.x+b.w/2,b.y+b.h*.8,13)}
function paint(A){const{ctx:g,W,H,col:C}=A,v=stage();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.05:.35);g.fillRect(0,0,W,H);
 ({build:drawBuild,arrow:drawArrows,role:drawRole,lose:drawLose,gap:drawGap,quiz:drawQuiz})[v](g,W,H,C);
 if(G.drag){const b={x:G.drag.x-45,y:G.drag.y-38,w:90,h:76};trayCard(b,G.drag.who,1)}A.fx.draw(g)}
function drawBuild(g,W,H,C){const r=Math.min(G.r,2),ch=CHAINS[r],sp=spots(3);
 if(G.r>=3){CHAINS.forEach((cc,k)=>text(cc.map(w=>w[1]+' '+w[0]).join('  →  '),W/2,H*(.25+k*.18),15));text('Every chain starts with a plant.',W/2,H*.85,16,C.tx,800);return}
 text(G.f?'Plant → eater → eater. The arrows show who is eaten by whom.':'Put them in order: first the plant, then who eats it.',W/2,H*.08,14);
 sp.forEach((s,i)=>{if(i<G.put.length)creature(s,ch[i],ringOf(ch[i]));else hole(s);if(i>0&&i<G.put.length)arrow(sp[i-1],s,1,C.tx)});
 TRAY[r].forEach((k,i)=>{if(G.put.includes(k)||(G.drag&&G.drag.k===k))return;trayCard(trayBox(i,3),ch[k],G.bad===k)})}
function drawArrows(g,W,H,C){const sp=spots(4);FLIPS.forEach((w,i)=>creature(sp[i],w,ringOf(w)));
 G.dir.forEach((d,i)=>{const ok=d>0;arrow(sp[i],sp[i+1],d,ok?C.gr:C.rd);const b=arrowBox(i);if(G.bad===i){g.lineWidth=2;g.strokeStyle=C.rd;g.strokeRect(b.x,b.y,b.w,b.h)}text(ok?'✓':'tap',(sp[i].x+sp[i+1].x)/2,sp[i].y-30,13,ok?C.gr:C.rd,800)});
 const fixed=G.dir.filter(d=>d>0).length;text(fixed===3?'Each arrow goes from the food to the eater.':'Tap an arrow to turn it round.',W/2,H*.08,14);
 text(`Arrows the right way: ${fixed} of 3`,W/2,H*.72,18,C.tx,800);text('The arrow means "is eaten by".',W/2,H*.84,14,C.tx,600)}
function arrowBox(i){const sp=spots(4),a=sp[i],b=sp[i+1];return{x:a.x+a.r,y:a.y-a.r,w:b.x-b.r-a.x-a.r,h:2*a.r}}
const roleBox=i=>{const w=(A.W-36)/2,h=Math.min(A.H*.16,70);return{x:12+i*(w+12),y:A.H*.72,w,h}};
function drawRole(g,W,H,C){if(G.r>=ROLES.length){text('Plants are producers. Animals are consumers.',W/2,H*.3,16,C.tx,800);text('Producers make food. Consumers eat it.',W/2,H*.45,15);return}
 const w=ROLES[G.r],s={x:W/2,y:H*.38,r:Math.min(W*.14,H*.18)};creature(s,w,G.f?(w[2]?C.am:C.gr):C.cy);
 text(G.f?(w[2]?`${Art(w[0])} ${w[0]} eats food: consumer.`:`${Art(w[0])} ${w[0]} makes its own food: producer.`):`${G.r+1} of ${ROLES.length}: producer or consumer?`,W/2,H*.08,15);
 ['Producer: makes food','Consumer: eats food'].forEach((t,i)=>{const b=roleBox(i);card(b,G.bad===i?A.alpha(C.rd,.25):G.f&&i===w[2]?A.alpha(C.gr,.3):A.alpha(C.vi,.12));text(A.narrow?t.split(':')[0]:t,b.x+b.w/2,b.y+b.h/2,15)})}
function drawLose(g,W,H,C){const sp=spots(3),r=Math.min(G.r,1),L=LOSE[r];
 if(G.r>=2){text('Lose one link and the whole chain feels it.',W/2,H*.3,15,C.tx,800);text('Eaters lose food. Their food may grow.',W/2,H*.45,15);return}
 LOSS.forEach((w,i)=>{creature(sp[i],w,ringOf(w),G.f&&i===L.gone);if(i>0)arrow(sp[i-1],sp[i],1,G.f&&(i===L.gone||i-1===L.gone)?A.alpha(C.mu,.6):C.tx);if(G.f&&L.note[i])text(L.note[i],sp[i].x,H*.62,13,i>L.gone?C.rd:C.gr,800)});
 text(G.f?L.say.split('. ')[0]+'.':`Tap the ${LOSS[L.gone][0]} to take ${L.gone?'all the rabbits':'all the grass'} away.`,W/2,H*.08,14);
 if(G.f)text(L.say.split('. ').slice(1).join('. '),W/2,H*.78,13)}
function drawGap(g,W,H,C){const r=Math.min(G.r,2),Q=GAPS[r],sp=spots(4);
 if(G.r>=3){text('Plants first, then plant eaters, then their eaters.',W/2,H*.3,15,C.tx,800);return}
 Q.c.forEach((w,i)=>{if(w)creature(sp[i],w,ringOf(w));else if(G.f)creature(sp[i],Q.o.find(o=>o[2]==='ok'),ringOf(Q.o.find(o=>o[2]==='ok')));else hole(sp[i]);if(i>0)arrow(sp[i-1],sp[i],1,C.tx)});
 text(G.f?'The chain works now.':`Chain ${r+1} of 3: which one fills the gap?`,W/2,H*.08,14);
 if(!G.f)Q.o.forEach((o,i)=>{if(G.drag&&G.drag.k===i)return;trayCard(trayBox(i,3),o,G.bad===i)})}
function drawQuiz(g,W,H,C){const sp=spots(3);CHAINS[0].forEach((w,i)=>{creature(sp[i],w,ringOf(w));if(i)arrow(sp[i-1],sp[i],1,C.tx)});text('producer',sp[0].x,H*.66,13,C.gr,800);text('consumer',sp[1].x,H*.66,13,C.am,800);text('consumer',sp[2].x,H*.66,13,C.am,800);text('Arrows go from the food to the eater.',W/2,H*.82,15)}
function flash(k){G.bad=k;setTimeout(()=>{G.bad=null;redraw()},A.reduced()?10:800)}
function place(k){if(stage()!=='build'||G.f||G.r>=3)return;const ch=CHAINS[G.r],want=G.put.length;
 if(k===want){G.put.push(k);beep('tick');if(G.put.length===3){G.f=1;beep('pop');speak(`${ch[0][0]} → ${ch[1][0]} → ${ch[2][0]}. The ${ch[1][0]} eats the ${ch[0][0]}, and the ${ch[2][0]} eats the ${ch[1][0]}.`)}else speak(want===0?`Yes, the ${ch[0][0]} is the plant. It starts the chain. Who eats it?`:`Yes, the ${ch[1][0]} eats the ${ch[0][0]}. Who eats the ${ch[1][0]}?`);return refresh()}
 beep('miss');flash(k);speak(want===0?`${Art(ch[k][0])} ${ch[k][0]} is an animal. It has to eat. A food chain starts with a plant, which makes its own food.`:`The ${ch[k][0]} does not eat the ${ch[want-1][0]}. Who eats the ${ch[want-1][0]}?`);redraw()}
function placeNext(){if(G.r<3&&!G.f)place(G.put.length)}
function flip(i){if(stage()!=='arrow'||G.dir.every(d=>d>0))return;G.dir[i]*=-1;const a=FLIPS[i][0],b=FLIPS[i+1][0];
 if(G.dir[i]>0){beep('tick');speak(`Right: the ${a} is eaten by the ${b}. The arrow goes from the food to the eater.`)}else{beep('miss');flash(i);speak(`Now it says the ${a} eats the ${b}. That is the wrong way round. Turn it back.`)}
 if(G.dir.every(d=>d>0)){beep('pop');speak('All three arrows go from the food to the eater: lettuce → snail → thrush → cat.')}refresh();G.want()}
function nextWrong(){const i=G.dir.findIndex(d=>d<0);if(i>=0)flip(i)}
function role(i){if(stage()!=='role'||G.f||G.r>=ROLES.length)return;const w=ROLES[G.r];
 if(i!==w[2]){beep('miss');flash(i);speak(w[2]?`${Art(w[0])} ${w[0]} cannot make its own food. It eats other living things, so it is a consumer.`:`${Art(w[0])} ${w[0]} is a plant. It makes its own food from sunlight, air and water, so it is a producer.`);return redraw()}
 G.f=1;beep('pop');speak(w[2]?`Yes: ${art(w[0])} ${w[0]} eats, so it is a consumer.`:`Yes: ${art(w[0])} ${w[0]} makes its own food, so it is a producer.`);refresh()}
function lose(i){if(stage()!=='lose'||G.f||G.r>=2)return;const L=LOSE[G.r];
 if(i!==L.gone){beep('miss');speak(`Tap the ${LOSS[L.gone][0]} this time.`);return}
 G.f=1;beep('whoosh');speak(L.say);refresh()}
function fill(i){if(stage()!=='gap'||G.f||G.r>=3)return;const o=GAPS[G.r].o[i];
 if(o[2]!=='ok'){beep('miss');flash(i);speak(gapSlip(o));return redraw()}
 G.f=1;beep('pop');speak(`Yes, the ${o[0]}. ${GAPS[G.r].c.map(w=>(w||o)[0]).join(' → ')}.`);refresh()}
function gapSlip(o){if(o[2]==='top')return`The ${o[0]} is a top eater. It goes at the end, not in the middle.`;if(o[2]==='alive')return'A stone is not alive, so it is not food.';
 if(o[2]==='plant')return'Grass is a plant. Plants come first, not after the caterpillar.';return'The Sun helps plants make food, but it is not food.'}
const okGap=()=>GAPS[G.r].o.findIndex(o=>o[2]==='ok');
function onward(){const v=stage(),last={build:2,role:ROLES.length-1,lose:1,gap:2}[v];if(!G.f||G.r>last)return;G.r++;Object.assign(G,{f:0,put:[],bad:null});beep('step');
 if(G.r>last){refresh();return G.want()}
 speak(v==='build'?'Next chain. Plant first.':v==='role'?`Producer or consumer?`:v==='lose'?'Now tap the grass to take it all away.':`Chain ${G.r+1}: which one fills the gap?`);refresh()}
function controls(){if(!pad)return;pad.innerHTML='';const v=stage(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(v==='arrow'){if(!G.dir.every(d=>d>0))G.dir.forEach((d,i)=>B(`Turn arrow ${i+1}`,()=>flip(i),`Turn arrow ${FLIPS[i][0]} to ${FLIPS[i+1][0]}`));return}
 const last={build:2,role:ROLES.length-1,lose:1,gap:2}[v];if(last==null||G.r>last)return;if(G.f){B(G.r<last?'Next one':'Finish',onward);return}
 if(v==='build')TRAY[G.r].forEach(k=>{if(!G.put.includes(k))B(`Add ${CHAINS[G.r][k][0]}`,()=>place(k))});
 if(v==='role')['Producer','Consumer'].forEach((t,i)=>B(t,()=>role(i)));
 if(v==='lose')B(`Take away the ${LOSS[LOSE[G.r].gone][0]}`,()=>lose(LOSE[G.r].gone));
 if(v==='gap')GAPS[G.r].o.forEach((o,i)=>B(`Put in ${o[0]}`,()=>fill(i)))}
/* drag a tray card up into the chain, or tap it */
function down(p){const v=stage();if(G.f&&v!=='arrow'){onward();return false}
 if(v==='build'&&G.r<3){const i=TRAY[G.r].findIndex((k,j)=>!G.put.includes(k)&&inside(p,trayBox(j,3)));if(i>=0){const k=TRAY[G.r][i];G.drag={k,who:CHAINS[G.r][k],x:p.x,y:p.y,sy:p.y};return true}}
 if(v==='gap'&&G.r<3){const i=[0,1,2].find(j=>inside(p,trayBox(j,3)));if(i!=null){G.drag={k:i,who:GAPS[G.r].o[i],x:p.x,y:p.y,sy:p.y};return true}}
 if(v==='arrow')[0,1,2].forEach(i=>{if(inside(p,arrowBox(i)))flip(i)});
 if(v==='role'&&G.r<ROLES.length)[0,1].forEach(i=>{if(inside(p,roleBox(i)))role(i)});
 if(v==='lose'&&G.r<2)spots(3).forEach((s,i)=>{if(Math.hypot(p.x-s.x,p.y-s.y)<=s.r+8)lose(i)});return false}
function move(p){if(G.drag){G.drag.x=p.x;G.drag.y=p.y;redraw()}}
function up(p){const d=G.drag;if(!d)return;G.drag=null;const tapped=Math.abs(p.y-d.sy)<8,lifted=p.y<A.H*.62;
 if(tapped||lifted){if(stage()==='build')place(d.k);else fill(d.k)}else redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(n,list){steps[n].go();const me=++G.ver;list.forEach((f,j)=>setTimeout(()=>{if(me===G.ver)f()},A.reduced()?40*(j+1):(j+1)*300))}
function reset(){const v=(G.ver||0)+1;Object.keys(G).forEach(k=>delete G[k]);Object.assign(G,{ver:v,want:()=>{},r:0,f:0,put:[],dir:[-1,-1,-1],bad:null,drag:null})}
const steps=[
{h:'Who eats what?',p:'A food chain shows who eats what. It starts with a plant. Next comes an animal that eats the plant. Then an animal that eats that animal.',
 predict:{q:'What comes first in every food chain?',opts:['The biggest animal','A plant','A small animal'],ans:1},task:'Build 3 food chains',
 show:()=>play(0,[0,1,2].flatMap(()=>[placeNext,placeNext,placeNext,onward])),
 go:()=>{reset();speak('Drag or tap the plant first.');controls();G.want=ready(0,()=>G.r>=3,'Every food chain starts with a plant.')}},
{h:'Which way?',p:'In a food chain the arrow means "is eaten by". It points from the food to the eater.',
 predict:{q:'A snail eats lettuce. Which way does the arrow point?',opts:['From the snail to the lettuce','From the lettuce to the snail','Both ways'],ans:1},task:'Turn 3 arrows the right way',
 show:()=>play(1,[nextWrong,nextWrong,nextWrong]),
 go:()=>{reset();speak('These arrows point the wrong way. Tap one to turn it.');controls();G.want=ready(1,()=>G.dir.every(d=>d>0),'The arrow goes from the food to the eater.')}},
{h:'Producer or consumer?',p:'A plant makes its own food from sunlight, air and water. It is a producer. An animal has to eat other living things. It is a consumer.',task:'Sort 6 living things',
 show:()=>play(2,ROLES.flatMap(w=>[()=>role(w[2]),onward])),
 go:()=>{reset();speak('1 of 6. Is it a producer or a consumer?');controls();G.want=ready(2,()=>G.r>=ROLES.length,'Plants produce food. Animals consume it.')}},
{h:'Take one away',p:'Each living thing in a chain is food for the next one. What happens if one of them is gone?',
 predict:{q:'All the rabbits go. What happens to the fox?',opts:['Nothing changes','It has less food','It eats the grass instead'],ans:1},task:'Take away 2 links',
 show:()=>play(3,[()=>lose(1),onward,()=>lose(0),onward]),
 go:()=>{reset();speak('Tap the rabbit to take it away.');controls();G.want=ready(3,()=>G.r>=2,'Lose one link and the eaters above it go hungry.')}},
{h:'Fill the gap',p:'Longer chains follow the same rule: a plant first, then a plant eater, then the animals that eat those.',task:'Fill 3 gaps',
 show:()=>play(4,[0,1,2].flatMap(r=>[()=>fill(okGap()),onward])),
 go:()=>{reset();speak('Chain 1 of 3. Which one fills the gap?');controls();G.want=ready(4,()=>G.r>=3,'Plant, then plant eater, then the eaters of those.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.want()});
const QS=[['In a food chain, which way does the arrow point?',[['From the food to the eater','ok'],['From the eater to its food','arrow'],['It does not matter','arrow2']]],
 ['What does every food chain start with?',[['A plant','ok'],['The biggest animal','big'],['The Sun','sun']]],
 ['Grass → rabbit → fox. Which one is the producer?',[['Grass','ok'],['Rabbit','eatsplant'],['Fox','top']]],
 ['Why is a cow a consumer?',[['It eats other living things','ok'],['It is big','big2'],['It lives on a farm','home']]],
 ['Leaf → caterpillar → bird. All the caterpillars go. What happens to the birds?',[['They have less food','ok'],['Nothing changes','nothing'],['They eat leaves instead','switch']]],
 ['Which one is a food chain?',[['Seeds → mouse → owl','ok'],['Owl → mouse → seeds','backward'],['Mouse → seeds → owl','middle']]],
 ['Where does a plant get its food?',[['It makes it, using sunlight','ok'],['It eats soil','soil'],['From the rain','rain']]]];
function slip(t){let m='Start with a plant; arrows point to the eater.';
 if(t==='arrow')m='That says the fox feeds the grass. Arrows go from the food to the eater.';
 if(t==='arrow2')m='It matters. Grass → rabbit means the rabbit eats the grass.';
 if(t==='big')m='Big animals come at the end. A chain starts with a plant.';
 if(t==='sun')m='The Sun gives plants light, but it is not food. A food chain starts with a plant.';
 if(t==='eatsplant')m='The rabbit eats the grass, so it is a consumer. The grass makes its own food: it is the producer.';
 if(t==='top')m='The fox eats the rabbit, so it is a consumer. The producer is the plant: grass.';
 if(t==='big2')m='Size does not matter. A cow eats grass, so it is a consumer.';
 if(t==='home')m='Where it lives does not matter. A cow eats grass, so it is a consumer.';
 if(t==='nothing')m='The birds ate the caterpillars. With no caterpillars, the birds have less food.';
 if(t==='switch')m='These birds eat caterpillars, not leaves, so they have less food.';
 if(t==='backward')m='That is back to front: an owl does not feed seeds. Start with the plant: seeds → mouse → owl.';
 if(t==='middle')m='A mouse does not come before seeds. Start with the plant the mouse eats: seeds → mouse → owl.';
 if(t==='soil')m='Plants do not eat soil. They make food in their leaves using sunlight.';
 if(t==='rain')m='Plants need rain, but water is not food. They make food in their leaves.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],k=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(k).concat(ops.slice(0,k)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});speak('Challenge: '+q);redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;beep('miss')}fb.innerHTML=(ok?`✓ Right! ${streak} in a row.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.1,draw:paint,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});controls()}});
A.start()})})();
