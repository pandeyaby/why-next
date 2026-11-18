/* Flagship – animal body groups (ages 5–7): match each animal to its body covering, sort animals into mammals, birds,
   fish, reptiles and amphibians (with the tricky whale, bat and penguin), build an animal from its body parts, find
   the odd one out and pick the clue that tells two look-alikes apart. Every drag or tap has a button twin. */
(()=>{
const GR=['Mammal','Bird','Fish','Reptile','Amphibian'],GC=['or','am','cy','gr','vi'];
const COATS=['Fur','Feathers','Scales','Damp skin'];
const FEEL=[['🐻','bear',0],['🦉','owl',1],['🐟','fish',2],['🐸','frog',3],['🐍','snake',2]];
const ZOO=[['🐕','dog',0],['🦆','duck',1],['🦈','shark',2],['🐊','crocodile',3],['🐸','frog',4],['🐋','whale',0],['🦇','bat',0],['🐧','penguin',1]];
const KIT=[[1,['Feathers','Beak','Wings'],['Fur','Fins','Gills']],[2,['Scales','Fins','Gills'],['Feathers','Fur','Beak']],[0,['Fur','Babies drink milk','Breathes air'],['Feathers','Gills','Beak']]];
const ODD=[[['🐬','dolphin',0],['🐠','goldfish',2],['🦈','shark',2]],[['🦅','eagle',1],['🦇','bat',0],['🐧','penguin',1]],[['🐍','snake',3],['🐊','crocodile',3],['🐸','frog',4]],[['🐈','cat',0],['🐔','hen',1],['🐄','cow',0]]];
const PAIR=[[['🦈','shark'],['🐬','dolphin'],[['Both live in the sea',0],['Both have fins',0],['Dolphin babies drink milk',1]]],
 [['🐧','penguin'],['🦭','seal'],[['A penguin has feathers',1],['Both swim',0],['Both eat fish',0]]],
 [['🦎','lizard'],['🐸','frog'],[['Both have four legs',0],['A frog has smooth, damp skin',1],['Both can walk on land',0]]]];
const oddOf=row=>row.findIndex(a=>row.filter(b=>b[2]===a[2]).length===1);
const deck=r=>{const[,ok,no]=KIT[r];return[ok[0],no[0],ok[1],no[1],ok[2],no[2]]};
VIS.reg('flagcoat',c=>{let A,pad,quiz,qi=-1,streak=0;c.fig.classList.add('young');const S={};
const here=()=>['coat','sort','build','odd','pair','quiz'][A.step];
const speak=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fs=n=>Math.round(n*(A.narrow?1:1.15));
function txt(g,t,x,y,n,col,wt){g.font=`${wt||800} ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-14)}
function emo(g,e,x,y,n){g.font=`${Math.round(n)}px "Noto Color Emoji","Apple Color Emoji","Segoe UI Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(e,x,y)}
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function pill(g,r,fill,edge){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=2.5;g.strokeStyle=edge||A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke()}
const oops=v=>{S.bad=v;setTimeout(()=>{S.bad=null;A.redraw()},A.reduced()?10:800)};
const grid2=(i,n,top)=>{const cols=n===5?3:2,w=(A.W-16-(cols-1)*8)/cols,h=Math.min(A.H*.15,64);return{x:8+(i%cols)*(w+8),y:A.H*top+Math.floor(i/cols)*(h+8),w,h}};
const row3=i=>{const w=(A.W-32)/3;return{x:8+i*(w+8),y:A.H*.22,w,h:A.H*.42}};
const clue=i=>{const h=Math.min(A.H*.14,58);return{x:12,y:A.H*.44+i*(h+8),w:A.W-24,h}};
/* swatches: what each covering looks like */
function swatch(g,k,x,y,w,h){const C=A.col;g.save();g.beginPath();g.rect(x,y,w,h);g.clip();
 if(k===0){g.fillStyle=A.mix(C.or,'#7c2d12',.35);g.fillRect(x,y,w,h);g.strokeStyle=A.mix(C.or,'#fde68a',.5);g.lineWidth=2;for(let i=0;i<w;i+=5){g.beginPath();g.moveTo(x+i,y+h);g.quadraticCurveTo(x+i+4,y+h*.5,x+i+1,y+4);g.stroke()}}
 if(k===1){g.fillStyle=A.mix(C.am,'#fff',.3);g.fillRect(x,y,w,h);g.strokeStyle=A.mix(C.am,'#713f12',.5);g.lineWidth=1.5;for(let j=0;j<h+10;j+=12)for(let i=-6;i<w;i+=14){g.beginPath();g.ellipse(x+i+(j/12%2)*7,y+j,7,10,.5,0,Math.PI);g.stroke()}}
 if(k===2||k===5){g.fillStyle=k===2?A.mix(C.cy,'#0c4a6e',.3):A.mix(C.gr,'#365314',.3);g.fillRect(x,y,w,h);g.strokeStyle=A.alpha('#fff',.7);g.lineWidth=1.5;for(let j=0;j<h+8;j+=8)for(let i=0;i<w+10;i+=10){g.beginPath();g.arc(x+i+(j/8%2)*5,y+j,5,0,Math.PI);g.stroke()}}
 if(k===3){const gr=g.createLinearGradient(x,y,x+w,y+h);gr.addColorStop(0,A.mix(C.vi,'#14532d',.4));gr.addColorStop(1,A.mix(C.gr,'#fff',.2));g.fillStyle=gr;g.fillRect(x,y,w,h);g.fillStyle=A.alpha('#fff',.75);[[.3,.3],[.7,.6],[.45,.75]].forEach(([a,b])=>{g.beginPath();g.ellipse(x+w*a,y+h*b,4,2.5,0,0,7);g.fill()})}
 g.restore();g.lineWidth=1.5;g.strokeStyle=C.tx;g.strokeRect(x,y,w,h)}
/* the build-an-animal figure */
function creature(g,have){const C=A.col,cx=A.W*.5,cy=A.H*.25,rx=Math.min(A.W*.22,110),ry=A.H*.12,coat=have.find(p=>['Fur','Feathers','Scales'].includes(p));
 g.save();g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,7);g.clip();if(coat)swatch(g,['Fur','Feathers','Scales'].indexOf(coat),cx-rx,cy-ry,rx*2,ry*2);else{g.fillStyle=A.alpha(C.mu,.25);g.fillRect(cx-rx,cy-ry,rx*2,ry*2)}g.restore();
 g.lineWidth=3;g.strokeStyle=C.tx;g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,7);g.stroke();g.fillStyle=C.tx;g.beginPath();g.arc(cx+rx*.62,cy-ry*.3,4,0,7);g.fill();
 have.forEach(p=>{g.lineWidth=2.5;g.strokeStyle=C.tx;
  if(p==='Beak'){g.fillStyle=A.mix(C.am,'#b45309',.3);g.beginPath();g.moveTo(cx+rx*.92,cy-ry*.35);g.lineTo(cx+rx*1.35,cy-ry*.05);g.lineTo(cx+rx*.92,cy+ry*.2);g.closePath();g.fill();g.stroke()}
  if(p==='Wings'){g.fillStyle=A.alpha(C.am,.8);g.beginPath();g.ellipse(cx-rx*.1,cy-ry*.75,rx*.5,ry*.45,-.4,0,7);g.fill();g.stroke()}
  if(p==='Fins'){g.fillStyle=A.alpha(C.cy,.85);[[cx-rx,cy,cx-rx*1.4,cy-ry*.6,cx-rx*1.4,cy+ry*.6],[cx,cy-ry,cx-rx*.35,cy-ry*1.5,cx+rx*.3,cy-ry*.95]].forEach(([a,b,d,e,f,h])=>{g.beginPath();g.moveTo(a,b);g.lineTo(d,e);g.lineTo(f,h);g.closePath();g.fill();g.stroke()})}
  if(p==='Gills')[0,1,2].forEach(i=>{g.beginPath();g.arc(cx+rx*(.35-i*.12),cy,ry*.4,-1.1,1.1);g.stroke()});
  if(p==='Babies drink milk')emo(g,'🍼',cx-rx*.9,cy+ry*1.25,fs(26));
  if(p==='Breathes air')emo(g,'💨',cx+rx*1.3,cy+ry*.8,fs(24))})}
/* drawing */
function draw(A){const{ctx:g,W,H,col:C}=A,v=here();g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){GR.forEach((k,i)=>{const r=grid2(i,5,.3);pill(g,r,A.alpha(C[GC[i]],.22));txt(g,k,r.x+r.w/2,r.y+r.h/2,14)});txt(g,'Five animal groups',W/2,H*.12,18);return}
 if(v==='coat'){const a=FEEL[Math.min(S.r,4)];if(S.r>=5){FEEL.forEach((f,i)=>{emo(g,f[0],W*(.12+i*.19),H*.2,fs(34));txt(g,COATS[f[2]],W*(.12+i*.19),H*.33,11,C.tx,700)});txt(g,'Every animal has a covering.',W/2,H*.05,15)}
  else{emo(g,a[0],W/2,H*.24,fs(64));txt(g,S.f?`A ${a[1]} has ${COATS[a[2]].toLowerCase()}.`:`What covers a ${a[1]}?`,W/2,H*.05,16)}
  COATS.forEach((k,i)=>{const r=grid2(i,4,.48),hit=S.f&&S.r<5&&FEEL[S.r][2]===i;pill(g,r,S.bad===i?A.alpha(C.rd,.3):hit?A.alpha(C.gr,.3):A.alpha(C.pn,.9),C.tx);swatch(g,i,r.x+8,r.y+8,r.h-16,r.h-16);txt(g,k,r.x+r.h+(r.w-r.h)/2,r.y+r.h/2,15)});return A.fx.draw(g)}
 if(v==='sort'){GR.forEach((k,i)=>{const r=grid2(i,5,.46),n=S.done.filter(d=>ZOO[d][2]===i);pill(g,r,S.bad===i?A.alpha(C.rd,.3):A.alpha(C[GC[i]],.2),C.tx);txt(g,k,r.x+r.w/2,r.y+r.h*.3,13);n.forEach((d,j)=>emo(g,ZOO[d][0],r.x+14+j*22,r.y+r.h*.72,fs(17)))});
  if(S.r>=ZOO.length)txt(g,'Sorted by body, not by home.',W/2,H*.2,17);else{const a=ZOO[S.r],p=S.drag||{x:W/2,y:H*.22};emo(g,a[0],p.x,p.y,fs(58));txt(g,S.drag?'Drop it on its group.':`Drag the ${a[1]} to its group, or tap a group.`,W/2,H*.05,14)}
  return A.fx.draw(g)}
 if(v==='build'){const r=Math.min(S.r,2),[grp]=KIT[r];if(S.r>=3)KIT.forEach(([k,ok],i)=>{txt(g,GR[k]+':',W/2,H*(.2+i*.22),17,C.tx);txt(g,ok.join(', ').toLowerCase(),W/2,H*(.29+i*.22),14,C.tx,700)});else creature(g,S.have);
  txt(g,S.r>=3?'Body parts tell you the group.':S.f?`A ${GR[grp].toLowerCase()}!`:`Build a ${GR[grp].toLowerCase()}: pick its 3 parts.`,W/2,H*.05,15);
  if(S.r<3)deck(r).forEach((k,i)=>{const b=grid2(i,6,.5),on=S.have.includes(k);pill(g,b,S.bad===k?A.alpha(C.rd,.3):on?A.alpha(C.gr,.3):A.alpha(C.cy,.12),C.tx);txt(g,k,b.x+b.w/2,b.y+b.h/2,k.length>12?12:15)});return A.fx.draw(g)}
 if(v==='odd'){const r=Math.min(S.r,3),row=ODD[r],o=oddOf(row);txt(g,S.r>=4?'Same group, same body plan.':'Which one is in a different group?',W/2,H*.08,15);
  if(S.r>=4)ODD.forEach((rw,i)=>{const a=rw[oddOf(rw)];emo(g,a[0],W*(.15+i*.23),H*.35,fs(40));txt(g,GR[a[2]],W*(.15+i*.23),H*.5,12,C.tx,700)});else row.forEach((a,i)=>{const b=row3(i),win=S.f&&i===o;pill(g,b,S.bad===i?A.alpha(C.rd,.3):win?A.alpha(C.gr,.3):A.alpha(C.pn,.9),C.tx);emo(g,a[0],b.x+b.w/2,b.y+b.h*.4,fs(48));txt(g,a[1],b.x+b.w/2,b.y+b.h*.78,14,C.tx,700);if(S.f)txt(g,GR[a[2]],b.x+b.w/2,b.y+b.h*.92,11,C.tx,700)});return A.fx.draw(g)}
 if(v==='pair'){const r=Math.min(S.r,2),[a,b,cl]=PAIR[r];if(S.r>=3){txt(g,'Look at the body to tell them apart.',W/2,H*.08,15);PAIR.forEach(([a,b],i)=>{const y=H*(.25+i*.22);emo(g,a[0],W*.3,y,fs(36));emo(g,b[0],W*.7,y,fs(36));txt(g,GR[[2,1,3][i]],W*.3,y+H*.09,12,C.tx,700);txt(g,GR[[0,0,4][i]],W*.7,y+H*.09,12,C.tx,700)});return A.fx.draw(g)}
  emo(g,a[0],W*.3,H*.2,fs(54));emo(g,b[0],W*.7,H*.2,fs(54));txt(g,a[1],W*.3,H*.34,14);txt(g,b[1],W*.7,H*.34,14);txt(g,'Which clue tells them apart?',W/2,H*.05,15);
  cl.forEach(([t,k],i)=>{const q=clue(i);pill(g,q,S.bad===i?A.alpha(C.rd,.3):S.f&&k?A.alpha(C.gr,.3):A.alpha(C.vi,.1),C.tx);txt(g,t,q.x+q.w/2,q.y+q.h/2,14,C.tx,700)});return A.fx.draw(g)}}
/* actions */
function coatPick(i){if(here()!=='coat'||S.f||S.r>=5)return;const a=FEEL[S.r];
 if(i!==a[2]){A.sound.miss();oops(i);speak(a[1]==='snake'&&i===3?'Snake skin looks shiny, but it is dry and covered in scales.':a[1]==='frog'&&i===2?'Frog skin has no scales. It is smooth and damp.':`Look again. A ${a[1]} is not covered in ${COATS[i].toLowerCase()}.`);return A.redraw()}
 S.f=1;A.sound.pop();speak(`Yes. A ${a[1]} has ${COATS[i].toLowerCase()}.`);A.redraw();buttons()}
function place(i){if(here()!=='sort'||S.r>=ZOO.length)return;const a=ZOO[S.r];
 if(i!==a[2]){A.sound.miss();oops(i);speak(a[1]==='whale'?'A whale lives in the sea, but it breathes air and its babies drink milk. It is a mammal.':a[1]==='bat'?'A bat flies, but it has fur, not feathers, and feeds its babies milk. It is a mammal.':a[1]==='penguin'?'A penguin cannot fly, but it has feathers and a beak. It is a bird.':`Not a ${GR[i].toLowerCase()}. Look at its body: ${['fur','feathers','fins and gills','dry scales','smooth damp skin'][a[2]]}.`);return A.redraw()}
 S.done.push(S.r);S.r++;A.sound.pop();speak(`${a[1]}: ${GR[i].toLowerCase()}.`+(S.r<ZOO.length?` Next: ${ZOO[S.r][1]}.`:' All sorted!'));A.redraw();buttons();if(S.r>=ZOO.length)S.want()}
function part(k){if(here()!=='build'||S.f||S.r>=3||S.have.includes(k))return;const[grp,ok]=KIT[S.r];
 if(!ok.includes(k)){A.sound.miss();oops(k);speak(`A ${GR[grp].toLowerCase()} does not have ${k.toLowerCase()}.`);return A.redraw()}
 S.have.push(k);A.sound.tick();if(S.have.length===3){S.f=1;A.sound.pop();speak(`${ok.join(', ')}: that makes a ${GR[grp].toLowerCase()}.`)}else speak(`${k}. Pick ${3-S.have.length} more.`);A.redraw();buttons()}
function oddPick(i){if(here()!=='odd'||S.f||S.r>=4)return;const row=ODD[S.r],o=oddOf(row);
 if(i!==o){A.sound.miss();oops(i);speak(`The ${row[i][1]} is a ${GR[row[i][2]].toLowerCase()}, like another one here. Find the one on its own.`);return A.redraw()}
 S.f=1;A.sound.pop();speak(`Yes! The ${row[o][1]} is a ${GR[row[o][2]].toLowerCase()}. The others are ${GR[row[(o+1)%3][2]].toLowerCase()}s.`);A.redraw();buttons()}
function cluePick(i){if(here()!=='pair'||S.f||S.r>=3)return;const[a,b,cl]=PAIR[S.r];
 if(!cl[i][1]){A.sound.miss();oops(i);speak(`That is true of both the ${a[1]} and the ${b[1]}, so it cannot tell them apart.`);return A.redraw()}
 S.f=1;A.sound.pop();speak(cl[i][0]+'. '+['The shark is a fish and the dolphin is a mammal.','The penguin is a bird and the seal is a mammal.','The lizard is a reptile with dry scales and the frog is an amphibian.'][S.r]);A.redraw();buttons()}
function nextOne(){const v=here(),end={coat:4,build:2,odd:3,pair:2}[v];if(!S.f||S.r>end)return;S.r++;S.f=0;S.have=[];S.bad=null;A.sound.step();
 if(S.r>end){A.redraw();buttons();return S.want()}
 speak(v==='coat'?`What covers a ${FEEL[S.r][1]}?`:v==='build'?`Build a ${GR[KIT[S.r][0]].toLowerCase()}.`:v==='odd'?'Find the odd one out.':'Which clue tells them apart?');A.redraw();buttons()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=here(),B=(t,f)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,t).onclick=f};
 if(S.f){B('Next',nextOne);return}
 if(v==='coat'&&S.r<5)COATS.forEach((k,i)=>B(k,()=>coatPick(i)));
 if(v==='sort'&&S.r<ZOO.length)GR.forEach((k,i)=>B(k,()=>place(i)));
 if(v==='build'&&S.r<3)deck(S.r).forEach(k=>B(k,()=>part(k)));
 if(v==='odd'&&S.r<4)ODD[S.r].forEach((a,i)=>B(a[1],()=>oddPick(i)));
 if(v==='pair'&&S.r<3)PAIR[S.r][2].forEach(([t],i)=>B(t,()=>cluePick(i)))}
/* pointer */
function down(p){const v=here();if(S.f){nextOne();return false}
 if(v==='coat')COATS.forEach((k,i)=>{if(inside(p,grid2(i,4,.48)))coatPick(i)});
 if(v==='sort'&&S.r<ZOO.length){if(Math.hypot(p.x-A.W/2,p.y-A.H*.22)<A.H*.14){S.drag={x:p.x,y:p.y};return true}GR.forEach((k,i)=>{if(inside(p,grid2(i,5,.46)))place(i)})}
 if(v==='build'&&S.r<3)deck(S.r).forEach((k,i)=>{if(inside(p,grid2(i,6,.5)))part(k)});
 if(v==='odd'&&S.r<4)[0,1,2].forEach(i=>{if(inside(p,row3(i)))oddPick(i)});
 if(v==='pair'&&S.r<3)[0,1,2].forEach(i=>{if(inside(p,clue(i)))cluePick(i)});return false}
function move(p){if(S.drag){S.drag={x:p.x,y:p.y};A.redraw()}}
function up(p){if(!S.drag)return;S.drag=null;const i=GR.findIndex((k,j)=>inside(p,grid2(j,5,.46)));if(i>=0)place(i);else{speak('Drop it on one of the five groups.');A.redraw()}}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const me=++S.ver;list.forEach((f,j)=>setTimeout(()=>{if(me===S.ver)f()},A.reduced()?40*(j+1):(j+1)*gap))}
function fresh(){const v=(S.ver||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{ver:v,want:()=>{},r:0,f:0,done:[],have:[],bad:null,drag:null})}
const steps=[
{h:'What covers it?',p:'Animals are covered in different things. Look at the animal, then tap what covers its body.',predict:{q:'What covers a snake?',opts:['Slime','Dry scales','Fur'],ans:1},task:'Match 5 animals',
 show:()=>{steps[0].go();play(FEEL.flatMap(a=>[()=>coatPick(a[2]),nextOne]),380)},
 go:()=>{fresh();speak('What covers a bear?');buttons();S.want=ready(0,()=>S.r>=5,'Fur, feathers, scales or smooth, damp skin.')}},
{h:'Five groups',p:'Mammals have fur or hair. Birds have feathers. Fish have fins and gills. Reptiles have dry scales. Amphibians have smooth, damp skin.',predict:{q:'A whale lives in the sea. Which group is it in?',opts:['Fish','Mammal','Reptile'],ans:1},task:'Sort 8 animals',
 show:()=>{steps[1].go();play(ZOO.map(a=>()=>place(a[2])),360)},
 go:()=>{fresh();speak('Drag the dog to its group.');buttons();S.want=ready(1,()=>S.r>=ZOO.length,'A whale and a bat are mammals. A penguin is a bird.')}},
{h:'Build an animal',p:'Each group has its own body parts. Pick the 3 parts that build the animal.',predict:{q:'Which part does every bird have?',opts:['Fur','Feathers','Fins'],ans:1},task:'Build 3 animals',
 show:()=>{steps[2].go();play(KIT.flatMap(([,ok])=>[...ok.map(k=>()=>part(k)),nextOne]),330)},
 go:()=>{fresh();speak('Build a bird. Pick its 3 parts.');buttons();S.want=ready(2,()=>S.r>=3,'Feathers and a beak make a bird. Fins and gills make a fish. Fur and milk make a mammal.')}},
{h:'Odd one out',p:'Three animals. Two are in the same group. Tap the one that is different.',predict:{q:'Goldfish, shark, dolphin. Which one is not a fish?',opts:['Shark','Dolphin','Goldfish'],ans:1},task:'Find 4 odd ones',
 show:()=>{steps[3].go();play(ODD.flatMap(row=>[()=>oddPick(oddOf(row)),nextOne]),420)},
 go:()=>{fresh();speak('Find the odd one out.');buttons();S.want=ready(3,()=>S.r>=4,'The body tells you the group, not where it lives.')}},
{h:'Tell them apart',p:'Some animals look alike but are in different groups. Pick the clue that shows the difference.',task:'Tell 3 pairs apart',
 show:()=>{steps[4].go();play(PAIR.flatMap(([,,cl])=>[()=>cluePick(cl.findIndex(x=>x[1])),nextOne]),420)},
 go:()=>{fresh();speak('Shark and dolphin. Which clue tells them apart?');buttons();S.want=ready(4,()=>S.r>=3,'A clue only helps if it is true for one animal and not the other.')}},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['A bat can fly. Which group is it in?',[['Mammal','ok'],['Bird','fly'],['Reptile','batrep']]],
 ['Which animal is an amphibian?',[['Frog','ok'],['Lizard','lizard'],['Goldfish','water']]],
 ['What covers a bird?',[['Feathers','ok'],['Fur','fur'],['Scales','scales']]],
 ['A whale lives in the sea. What group is it in?',[['Mammal','ok'],['Fish','sea'],['Amphibian','amph']]],
 ['Which animal is a reptile?',[['Snake','ok'],['Frog','frogrep'],['Eel','eel']]],
 ['Can every bird fly?',[['No, a penguin is a bird that swims','ok'],['Yes, all birds fly','allfly'],['No, a penguin is a fish','pengfish']]],
 ['Shark or dolphin: which is a fish?',[['Shark','ok'],['Dolphin','dolph'],['Both','both']]]];
function slip(t){let m='Look at the body: fur, feathers, fins, scales or damp skin?';
 if(t==='fly')m='Flying does not make a bird. A bat has fur and feeds its babies milk, so it is a mammal.';
 if(t==='batrep')m='Reptiles have dry scales. A bat has fur, so it is a mammal.';
 if(t==='lizard')m='A lizard has dry scales, so it is a reptile. A frog has smooth, damp skin: an amphibian.';
 if(t==='water')m='A goldfish has fins and gills, so it is a fish. A frog is the amphibian.';
 if(t==='fur')m='Fur is for mammals. Birds have feathers.';
 if(t==='scales')m='Fish and reptiles have scales. Birds have feathers.';
 if(t==='sea')m='Living in the sea does not make a fish. A whale breathes air and feeds its babies milk: a mammal.';
 if(t==='amph')m='Amphibians have smooth, damp skin, like a frog. A whale is a mammal.';
 if(t==='frogrep')m='A frog has smooth, damp skin, so it is an amphibian. A snake has dry scales: a reptile.';
 if(t==='eel')m='An eel has fins and gills, so it is a fish. A snake is the reptile.';
 if(t==='allfly')m='A penguin cannot fly, but it has feathers and a beak, so it is still a bird.';
 if(t==='pengfish')m='A penguin swims, but it has feathers and a beak. It is a bird.';
 if(t==='dolph')m='A dolphin breathes air and feeds its babies milk, so it is a mammal. The shark is the fish.';
 if(t==='both')m='Only the shark is a fish. A dolphin feeds its babies milk, so it is a mammal.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],k=qi%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(k).concat(ops.slice(0,k)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});speak('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Yes! ${streak} right in a row.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.7,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});buttons()}});
A.start()})})();
