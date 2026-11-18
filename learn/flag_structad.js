/* Flagship: structural adaptations (ages 9–11; NC England Y6 evolution and inheritance: how animals are adapted to their
   environment; NGSS 4-LS1-1). Sort the three kinds, feed birds by beak shape, set fox ears for desert and Arctic heat,
   race body shapes through water, build a snow animal. Every canvas tap has a button twin. */
(()=>{
const K={ink:'#0f172a',soft:'#475569',line:'#94a3b8',white:'#ffffff',ok:'#047857',bad:'#b91c1c',deep:'#1e3a8a',info:'#eef2ff',win:'#dcfce7',sel:'#fde68a',fur:'#c2410c',snow:'#e2e8f0',sea:'#bae6fd',sand:'#fde68a',ice:'#dbeafe'};
const KINDS=['Structural','Behavioural','Physiological'],KWHY=['a body part or body shape','something the animal does','how its body works inside'];
const CARDS=[['Giraffe: long neck',0],['Eagle: sharp, curved talons',0],['Swallows fly south for winter',1],['Hedgehog hibernates in winter',1],['Arctic cod: antifreeze in its blood',2],['Camel: very little, very strong urine',2]];
const BIRDS=[['Finch','short, thick beak','cracks hard seeds'],['Hummingbird','long, thin beak','reaches deep into flowers'],['Eagle','hooked, sharp beak','tears meat'],['Duck','wide, flat bill','strains food from water']];
const FOODS=['Hard seeds','Flower nectar','Meat','Pond weed and tiny animals'];
const SHAPES=[['Flat block',.3,'Water piles up against the flat front and pushes hard back on it.'],['Ball',.55,'The round front is better, but water swirls behind the ball and drags it back.'],['Long, pointed shape',.92,'Water flows smoothly round the pointed front and tail: this is a streamlined shape.']];
const TRAITS=[['Coat',['thin','thick'],1,'A thin coat lets body heat escape. A thick coat traps warm air.'],['Colour',['brown','white'],1,'A brown animal stands out on snow, so hunters spot it. White blends in.'],['Ears',['large','small'],1,'Large ears lose heat fast. Small ears keep heat in the cold.'],['Feet',['small and bare','wide and furry'],1,'Small bare feet sink into soft snow and get cold. Wide furry feet spread the weight like snowshoes.']];
VIS.reg('flagstructad',c=>{let A,D,pad,chal,qi=-1,run=0;const T={after:()=>{}};
const px=n=>Math.round(n*(A.narrow?1:1.1)),face=n=>`700 ${px(n)}px system-ui,sans-serif`;
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function word(s,x,y,n,col,al){D.font=face(n);D.fillStyle=col||K.ink;D.textAlign=al||'center';D.textBaseline='middle';D.fillText(String(s),x,y,A.W-14)}
function fold(s,max,n){D.font=face(n);const out=[];let cur='';for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&D.measureText(t).width>max){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function pane(r,fill,edge,lw){D.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,9);D.fill();if(edge){D.strokeStyle=edge;D.lineWidth=lw||2;D.stroke()}}
function inPane(r,s,n,col){const L=fold(s,r.w-10,n),lh=px(n)+3;L.forEach((l,i)=>word(l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,n,col))}
function top(s,good){const L=fold(s,A.W-32,13),r={x:10,y:8,w:A.W-20,h:Math.max(A.H*.09,L.length*(px(13)+4)+12)};pane(r,good?K.win:K.info,good?K.ok:K.deep);inPane(r,s,13,good?K.ok:K.ink)}
function foot(){if(!T.msg)return;const L=fold((T.bad?'✗ ':'✓ ')+T.msg,A.W-40,13),lh=px(13)+5,h=L.length*lh+10,y=A.H-h-6;pane({x:10,y,w:A.W-20,h},K.white,T.bad?K.bad:K.ok,3);L.forEach((l,i)=>word(l,A.W/2,y+5+lh*(i+.5),13))}
const speak=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const no=s=>{T.bad=true;T.msg=s;A.sound.miss();sync()};
const yes=s=>{T.bad=false;T.msg=s;A.sound.pop()};
const Y=f=>A.H*f;
const part=()=>['kinds','beaks','ears','swim','snow','chal'][A.step];
/* step 1: sort three kinds */
const cardR=i=>{const cols=A.narrow?2:3,w=(A.W-28-(cols-1)*8)/cols,h=px(44);return{x:14+(i%cols)*(w+8),y:Y(A.narrow?.2:.22)+Math.floor(i/cols)*(h+8),w,h}};
const binR=i=>{const w=(A.W-36)/3;return{x:14+i*(w+4),y:Y(A.narrow?.56:.6),w,h:px(62)}};
function drawKinds(){const all=CARDS.every((x,i)=>T.put[i]!=null);top(all?'Structural = body part. Behavioural = what it does. Physiological = how the body works inside.':'Tap a card, then tap the kind of adaptation it is.',all);
 CARDS.forEach((x,i)=>{if(T.put[i]!=null)return;const r=cardR(i);pane(r,T.pick===i?K.sel:K.white,K.deep,2);inPane(r,x[0],12)});
 KINDS.forEach((k,i)=>{const r=binR(i),n=CARDS.filter((x,j)=>T.put[j]===i).length;pane(r,'#f1f5f9',K.deep,2);word(k,r.x+r.w/2,r.y+px(14),12);word(n+' card'+(n===1?'':'s'),r.x+r.w/2,r.y+px(40),11,K.soft)})}
function sortCard(i,k){if(T.put[i]!=null)return;A.sound.tick();const [name,want]=CARDS[i];
 if(k!==want){T.pick=i;return no(`${name.split(':')[0]}: that is ${KWHY[want]}, so it is ${KINDS[want].toLowerCase()}, not ${KINDS[k].toLowerCase()} (${KWHY[k]}).`)}
 T.put[i]=k;T.pick=null;if(CARDS.every((x,j)=>T.put[j]!=null))yes('All 6 sorted. Many animals have all three kinds.');else{T.bad=false;T.msg=`${name.split(':')[0]}: ${KINDS[k].toLowerCase()}.`}sync()}
/* step 2: beaks */
const foodR=i=>{const w=(A.W-34)/2,h=px(36);return{x:14+(i%2)*(w+6),y:Y(.15)+Math.floor(i/2)*(h+6)+px(12),w,h}};
const birdR=i=>{const w=(A.W-34)/2,h=px(A.narrow?80:92);return{x:14+(i%2)*(w+6),y:Y(.38)+Math.floor(i/2)*(h+6),w,h}};
function drawBeaks(){const all=T.fed.length===4;top(all?'Each beak shape fits one kind of food. A seed beak cannot sip nectar.':'Tap a food, then the bird whose beak fits it.',all);
 FOODS.forEach((f,i)=>{const r=foodR(i),used=T.fed.includes(i);pane(r,used?K.win:T.food===i?K.sel:K.white,used?K.ok:K.deep,2);inPane(r,f,12)});
 BIRDS.forEach((b,i)=>{const r=birdR(i),s=Math.min(r.h*.36,px(30)),cx=r.x+s*.7+6,cy=r.y+r.h*.4;pane(r,T.fed.includes(i)?K.win:K.white,K.deep,2);
  D.fillStyle=['#a16207','#059669','#78350f','#065f46'][i];D.beginPath();D.arc(cx,cy,s*.55,0,7);D.fill();D.fillStyle=K.white;D.beginPath();D.arc(cx+s*.2,cy-s*.15,s*.11,0,7);D.fill();SADART.beak(D,i,cx+s*.5,cy,s*.8);
  word(b[0],r.x+r.w-6,r.y+px(12),12,K.ink,'right');word(b[1],r.x+r.w/2,r.y+r.h-px(11),10,K.ink)})}
function feed(f,b){if(f==null)return no('Pick a food first.');A.sound.tick();if(T.fed.includes(f))return;
 if(f!==b){T.food=f;return no(`The ${BIRDS[b][0].toLowerCase()}'s ${BIRDS[b][1]} ${BIRDS[b][2]}. ${FOODS[f]} need${f===0?'':'s'} the ${BIRDS[f][1]} that ${BIRDS[f][2]}.`)}
 T.fed.push(f);T.food=null;if(T.fed.length===4)yes('All four fed: shape matches job.');else{T.bad=false;T.msg=`${BIRDS[b][0]}: its ${BIRDS[b][1]} ${BIRDS[b][2]}.`}sync()}
/* step 3: ears and heat */
const EAR=['small','medium','large'],FOX=[['Desert fox (fennec)',2,K.sand],['Arctic fox',0,K.ice]];
function feel(f){const e=T.ear[f];return f===0?['far too hot','too hot','cool enough'][e]:['warm enough','losing heat','far too cold'][e]}
const earBtn=(f,d)=>{const col=(A.W-30)/2,w=(col-12)/2;return{x:14+f*(col+6)+(d>0?w+8:0),y:Y(.72),w,h:px(38)}};
function drawEars(){const ok=T.ear[0]===2&&T.ear[1]===0;top(ok?'Big thin ears give off body heat: good in the desert. Small ears keep heat in: good in the Arctic.':'Set each fox\'s ears so it is comfortable where it lives.',ok);
 FOX.forEach(([n,want,bg],f)=>{const col=(A.W-30)/2,x=14+f*(col+6),y=Y(.2),h=Y(.5);pane({x,y,w:col,h},bg,K.deep,2);word(n,x+col/2,y+px(14),12);
  const cx=x+col/2,cy=y+h*.62,r=Math.min(col*.2,px(30)),e=[.55,1,1.6][T.ear[f]];D.fillStyle=f?'#f8fafc':'#fdba74';D.strokeStyle=K.ink;D.lineWidth=2;
  [-1,1].forEach(sg=>{D.beginPath();D.moveTo(cx+sg*r*.25,cy-r*.7);D.lineTo(cx+sg*r*(.55+e*.35),cy-r*(.8+e*.9));D.lineTo(cx+sg*r*.95,cy-r*.3);D.closePath();D.fill();D.stroke()});
  D.beginPath();D.arc(cx,cy,r,0,7);D.fill();D.stroke();D.fillStyle=K.ink;[-1,1].forEach(sg=>{D.beginPath();D.arc(cx+sg*r*.35,cy-r*.1,r*.1,0,7);D.fill()});
  const good=(f===0&&T.ear[0]===2)||(f===1&&T.ear[1]===0);fold(EAR[T.ear[f]]+' ears: '+feel(f),col-10,11).forEach((l,j,L)=>word(l,x+col/2,y+h-px(12)-(L.length-1-j)*px(14),11,good?K.ok:K.bad))});
 [0,1].forEach(f=>[-1,1].forEach(d=>{const r=earBtn(f,d);pane(r,K.white,K.deep,2);word(d<0?'Smaller':'Bigger',r.x+r.w/2,r.y+r.h/2,12)}))}
function ears(f,d){A.sound.tick();const e=Math.max(0,Math.min(2,T.ear[f]+d));if(e===T.ear[f])return no(`Those are already the ${d<0?'smallest':'biggest'} ears.`);T.ear[f]=e;
 if(f===0)T.msg=e===2?'Big ears: lots of thin skin and blood vessels give off heat, so the desert fox stays cool.':`Desert fox with ${EAR[e]} ears is ${feel(0)}: it cannot lose heat fast enough.`;
 else T.msg=e===0?'Small ears: less skin for heat to escape from, so the Arctic fox stays warm.':`Arctic fox with ${EAR[e]} ears is ${feel(1)}: heat escapes through its ears.`;
 T.bad=!((f===0&&e===2)||(f===1&&e===0));if(T.bad)A.sound.miss();else A.sound.pop();sync()}
/* step 4: streamlined shapes */
const laneY=i=>Y(.22)+i*Y(A.narrow?.15:.16);
function drawSwim(){const all=T.raced.length===3;top(all?'After the same push, the long pointed shape goes furthest. Dolphins, sharks and penguins share this streamlined body.':'Give each shape the same push through water. Tap a lane to race it.',all);
 SHAPES.forEach(([n],i)=>{const y=laneY(i),h=Y(A.narrow?.13:.14);pane({x:12,y,w:A.W-24,h},K.sea,K.deep,2);const s=Math.min(h*.42,px(34)),x0=26+s,x1=A.W-26-s,x=x0+(x1-x0)*(T.go[i]||0);
  SADART.body(D,i,x,y+h*.64,s);word(n,18,y+px(11),11,K.ink,'left');if(T.raced.includes(i))word(Math.round(SHAPES[i][1]*100)+'% of the lane',A.W-20,y+px(11),11,K.ink,'right')})}
function race(i){A.sound.tick();if(!T.raced.includes(i))T.raced.push(i);T.go[i]=0;A.tween(T.go,{[i]:SHAPES[i][1]},700,'out');
 T.bad=false;T.msg=SHAPES[i][2];if(T.raced.length===3)A.sound.pop();sync()}
/* step 5: build a snow animal */
const traitR=i=>{const w=(A.W-34)/2,h=px(46);return{x:14+(i%2)*(w+6),y:Y(.565)+Math.floor(i/2)*(h+6),w,h}};
function drawSnow(){const ok=TRAITS.every((t,i)=>T.trait[i]===t[2]);top(ok?'Thick white coat, small ears, wide furry feet: like a mountain hare. These built up over many generations.':'Tap a feature to swap it. Build an animal that survives in deep snow.',ok);
 const cx=A.W/2,cy=Y(.42),s=Math.min(A.W*.2,px(60));D.fillStyle=K.snow;D.fillRect(12,cy+s*.55,A.W-24,s*.35);
 const coat=T.trait[1]?'#ffffff':'#92400e',edge=T.trait[0]?7:2;D.fillStyle=coat;D.strokeStyle=K.ink;D.lineWidth=edge;D.beginPath();D.ellipse(cx,cy,s,s*.55,0,0,7);D.fill();D.stroke();
 D.lineWidth=2;D.beginPath();D.arc(cx+s*.95,cy-s*.4,s*.38,0,7);D.fill();D.stroke();const el=T.trait[2]?s*.35:s*.9;D.beginPath();D.ellipse(cx+s*.85,cy-s*.75-el/2,s*.1,el/2,-.2,0,7);D.fill();D.stroke();
 const fw=T.trait[3]?s*.42:s*.16;[-.55,.45].forEach(o=>{D.beginPath();D.ellipse(cx+o*s,cy+s*.6,fw,s*.1,0,0,7);D.fillStyle=T.trait[3]?coat:'#fca5a5';D.fill();D.stroke()});
 TRAITS.forEach((t,i)=>{const r=traitR(i),good=T.trait[i]===t[2];pane(r,good?K.win:K.white,good?K.ok:K.deep,2);inPane(r,`${t[0]}: ${t[1][T.trait[i]]}`,12)})}
function swap(i){A.sound.tick();T.trait[i]=1-T.trait[i];const t=TRAITS[i],good=T.trait[i]===t[2];T.bad=!good;T.msg=(good?'':'Not in snow. ')+t[3];if(!good)A.sound.miss();
 else if(TRAITS.every((x,j)=>T.trait[j]===x[2]))A.sound.pop();sync()}
/* pointer */
function down(p){const m=part();let j;
 if(m==='kinds'){j=CARDS.findIndex((x,i)=>T.put[i]==null&&on(p,cardR(i)));if(j>=0){T.pick=j;A.sound.tick();sync();return true}j=[0,1,2].find(i=>on(p,binR(i)));if(j!=null&&T.pick!=null){sortCard(T.pick,j);return true}}
 if(m==='beaks'){j=[0,1,2,3].find(i=>on(p,foodR(i)));if(j!=null&&!T.fed.includes(j)){T.food=j;A.sound.tick();sync();return true}j=[0,1,2,3].find(i=>on(p,birdR(i)));if(j!=null){feed(T.food,j);return true}}
 if(m==='ears'){for(const f of [0,1])for(const d of [-1,1])if(on(p,earBtn(f,d))){ears(f,d);return true}}
 if(m==='swim'){j=[0,1,2].find(i=>p.y>=laneY(i)&&p.y<=laneY(i)+Y(.15));if(j!=null){race(j);return true}}
 if(m==='snow'){j=[0,1,2,3].find(i=>on(p,traitR(i)));if(j!=null){swap(j);return true}}return false}
function draw(){D.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);D.fillRect(0,0,A.W,A.H);if(A.col.dark){D.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);D.fill()}
 const m=part();if(m==='kinds')drawKinds();if(m==='beaks')drawBeaks();if(m==='ears')drawEars();if(m==='swim')drawSwim();if(m==='snow')drawSnow();
 if(m==='chal'){top('Name the kind, match the feature to the place. Adaptations build up over many generations.');}
 foot();A.fx.draw(D)}
function sync(){const m=part();let s='Challenge.';
 if(m==='kinds')s='Cards left: '+(CARDS.filter((x,i)=>T.put[i]==null).map(x=>x[0]).join('; ')||'none')+'.'+(T.pick!=null?` Selected: ${CARDS[T.pick][0]}.`:'');
 if(m==='beaks')s=`Foods: ${FOODS.join(', ')}. Birds fed: ${T.fed.map(i=>BIRDS[i][0]).join(', ')||'none'}.`+(T.food!=null?` Selected food: ${FOODS[T.food]}.`:'');
 if(m==='ears')s=`Desert fox: ${EAR[T.ear[0]]} ears, ${feel(0)}. Arctic fox: ${EAR[T.ear[1]]} ears, ${feel(1)}.`;
 if(m==='swim')s='Shapes raced: '+(T.raced.map(i=>`${SHAPES[i][0]} ${Math.round(SHAPES[i][1]*100)}% of the lane`).join(', ')||'none')+'.';
 if(m==='snow')s='Snow animal: '+TRAITS.map((t,i)=>`${t[0].toLowerCase()} ${t[1][T.trait[i]]}`).join(', ')+'.';
 speak((T.msg?T.msg+' ':'')+s);keys();T.after()}
function keys(){if(!pad)return;pad.innerHTML='';const m=part(),k=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(m==='kinds'){const i=T.pick!=null?T.pick:CARDS.findIndex((x,j)=>T.put[j]==null);if(i>=0)KINDS.forEach((n,j)=>k(n,()=>sortCard(i,j),`${CARDS[i][0]} is ${n}`))}
 if(m==='beaks'){const f=T.food!=null?T.food:[0,1,2,3].find(i=>!T.fed.includes(i));if(f!=null)BIRDS.forEach((b,j)=>k(`${FOODS[f]} → ${b[0]}`,()=>feed(f,j)))}
 if(m==='ears')FOX.forEach((x,f)=>{k(x[0].split(' (')[0]+': smaller ears',()=>ears(f,-1));k(x[0].split(' (')[0]+': bigger ears',()=>ears(f,1))});
 if(m==='swim')SHAPES.forEach((x,i)=>k('Race the '+x[0].toLowerCase(),()=>race(i)));
 if(m==='snow')TRAITS.forEach((t,i)=>k(`${t[0]}: swap to ${t[1][1-T.trait[i]]}`,()=>swap(i)));
 A.redraw()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const later=(fs,gap)=>{const id=++T.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===T.run)f()},(j+1)*(A.reduced()?30:gap)))};
const wipe=()=>{T.run=(T.run||0)+1;Object.assign(T,{after:()=>{},put:{},pick:null,fed:[],food:null,ear:[1,1],raced:[],go:{},trait:[0,0,0,0],msg:'',bad:false})};
const steps=[
{h:'Three kinds of adaptation',p:'An adaptation is a feature that helps a living thing survive where it lives.',
predict:{q:'A hedgehog sleeps through the winter. This adaptation is…',opts:['something it does (behavioural)','a body part (structural)','not an adaptation: it is just tired'],ans:0},
task:'Sort all 6 adaptations',show:()=>{steps[0].go();later(CARDS.map((x,i)=>()=>sortCard(i,x[1])),280)},go:()=>{wipe();sync();T.after=finish(0,()=>CARDS.every((x,i)=>T.put[i]!=null),'3 kinds sorted.')}},
{h:'Beaks fit food',p:'A beak is a structural adaptation. Its shape matches the job it does.',
task:'Feed all 4 birds',show:()=>{steps[1].go();later([0,1,2,3].map(i=>()=>feed(i,i)),380)},go:()=>{wipe();sync();T.after=finish(1,()=>T.fed.length===4,'Shape fits food.')}},
{h:'Big ears, small ears',p:'Ears are thin and full of blood vessels, so body heat escapes through them.',
predict:{q:'Which fox needs the bigger ears?',opts:['The desert fox','The Arctic fox','Neither: ear size does not matter'],ans:0},
task:'Make both foxes comfortable',show:()=>{steps[2].go();later([()=>ears(0,1),()=>ears(1,-1)],450)},go:()=>{wipe();sync();T.after=finish(2,()=>T.ear[0]===2&&T.ear[1]===0,'Ears control heat loss.')}},
{h:'Shaped for water',p:'Water pushes back on anything moving through it. Give three shapes the same push.',
predict:{q:'Which shape will go furthest after the same push?',opts:['The long, pointed shape','The ball','The flat block'],ans:0},
task:'Race all 3 shapes',show:()=>{steps[3].go();later([0,1,2].map(i=>()=>race(i)),450)},go:()=>{wipe();sync();T.after=finish(3,()=>T.raced.length===3,'Streamlined goes furthest.')}},
{h:'Build for the snow',p:'Put together features that help an animal survive in a cold, snowy place.',
task:'Build an animal for deep snow',show:()=>{steps[4].go();later([0,1,2,3].map(i=>()=>swap(i)),380)},go:()=>{wipe();sync();T.after=finish(4,()=>TRAITS.every((t,i)=>T.trait[i]===t[2]),'Built for snow.')}},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>T.after()});
const Q=[['A polar bear has a thick layer of fat under its skin. What kind of adaptation is this?','Structural',[['Behavioural','doing'],['It chose to get fat for winter','chose']]],
['Swallows fly south every autumn. What kind of adaptation is this?','Behavioural',[['Structural','bodyPart'],['Physiological','inside']]],
['Arctic cod have antifreeze in their blood. What kind of adaptation is this?','Physiological',[['Structural','seeIt'],['Behavioural','doing']]],
['Which beak is best for cracking hard seeds?','Short, thick and strong',[['Long and thin','nectar'],['Hooked and sharp','meat']]],
['Why does a desert fox have big ears?','To give off body heat',[['To keep its head warm','warm'],['It stretched them to hear better','stretch']]],
['How did giraffes come to have long necks?','Over many generations, longer-necked giraffes survived and had more young',[['Each giraffe stretched its neck and passed it on','stretch'],['Giraffes decided they needed long necks','need']]]];
function why(tag){let m='Ask: is it a body part, something the animal does, or how its body works inside?';
 if(tag==='doing')m='Behaviour is something an animal does, like migrating. Fat is part of its body, so it is structural.';
 if(tag==='chose')m='Animals do not choose adaptations. Bears with thick fat survived the cold and had more cubs, over many generations.';
 if(tag==='bodyPart')m='Flying south is something swallows do each year, not a body part. That makes it behavioural.';
 if(tag==='inside')m='Physiological means a process inside the body. Flying south is an action: behavioural.';
 if(tag==='seeIt')m='Antifreeze is a chemical in the blood that stops it freezing: how the body works inside, so physiological.';
 if(tag==='nectar')m='A long, thin beak reaches into flowers for nectar. Hard seeds need a short, thick beak to crack them.';
 if(tag==='meat')m='A hooked beak tears meat. Hard seeds need a short, thick, strong beak.';
 if(tag==='warm')m='Big ears lose heat, they do not keep it. In the desert, losing heat keeps the fox cool.';
 if(tag==='stretch')m='Stretching in one lifetime is not passed to the young. Features that help survival build up over many generations.';
 if(tag==='need')m='Needing a feature does not make it appear. Giraffes born with longer necks reached more leaves and passed the feature on.';
 return m}
function ask(){qi++;const [qq,ans,bad]=Q[qi%Q.length],all=[[ans,'ok']].concat(bad),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>check(tag,ans)});speak('Challenge: '+qq);A.redraw()}
let run2=0;function check(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){run2++;A.win()}else{run2=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+run2+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.7,tall:1.4,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
 init:B=>{A=B;D=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Adaptations lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}}).start()})})();
