/* Flagship – herbivores, carnivores and omnivores (ages 5–6): feed a rabbit, a cat and a bear by dragging food to them
   and see which foods each one takes; sort six animals into a plant bowl, a meat bowl or a both bowl from what they eat;
   then choose the reason for a sort, which must be about food, not looks, size or home.
   The Challenge targets the usual slips: big animals must eat meat, small or cute animals must eat plants, an omnivore
   is put in a one-food group, and an animal is grouped by where it lives or how it looks. Every drag has a button twin. */
(()=>{
const FOOD=[['grass','🌿',0],['leaves','🍃',0],['berries','🫐',0],['fish','🐟',1],['meat','🍖',1]];
const EATERS=[{who:'rabbit',e:'🐇',kind:0,need:3},{who:'cat',e:'🐈',kind:1,need:2},{who:'bear',e:'🐻',kind:2,need:2}];
const GROUP=['herbivore','carnivore','omnivore'],BOWL=[['Herbivore','🌿','plants only'],['Carnivore','🍖','meat only'],['Omnivore','🌿🍖','plants and meat']];
const ZOO=[['cow','🐄',0,'🌿'],['lion','🦁',1,'🍖'],['pig','🐖',2,'🌽🐛'],['elephant','🐘',0,'🌿🍃'],['shark','🦈',1,'🐟'],['people','🧒',2,'🍎🍗']];
const WHY=[{who:'sheep',e:'🐑',g:0,r:[['It eats only grass','ok'],['It is white and fluffy','looks'],['It is small','size']]},
 {who:'owl',e:'🦉',g:1,r:[['It eats mice and insects','ok'],['It can fly','fly'],['It lives in a tree','home']]},
 {who:'hen',e:'🐔',g:2,r:[['It eats seeds and worms','ok'],['It lives on a farm','home'],['It has feathers','looks']]}];
VIS.reg('flagdiet',c=>{let A,pad,chal,turn=-1,streak=0;c.fig.classList.add('young');const D={};
const phase=()=>['herb','carn','omni','sort','why','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const px=n=>Math.round(n*(A.narrow?1:1.18));
function txt(g,s,x,y,n,w,col){g.font=`${w||800} ${px(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(s,x,y,A.W-12)}
function pic(g,e,x,y,n){g.font=`${Math.round(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
function tile(g,r,col,fillA,edge){g.fillStyle=A.alpha(col,fillA);A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=edge||2;g.strokeStyle=A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke()}
const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---- layout: the eater sits up top, the food row along the bottom, three bowls for sorting ---- */
const mouthR=()=>{const s=Math.min(A.W*.42,A.H*.44);return{x:A.W/2-s/2,y:A.H*.1,w:s,h:s}};
const foodR=i=>{const gap=8,w=(A.W-gap*6)/5;return{x:gap+i*(w+gap),y:A.H*.7,w,h:A.H*.26}};
const bowlR=b=>{const gap=8,w=(A.W-gap*4)/3;return{x:gap+b*(w+gap),y:A.H*.6,w,h:A.H*.36}};
const reasonR=i=>{const gap=8,h=A.H*.17;return{x:A.W*.06,y:A.H*.36+i*(h+gap),w:A.W*.88,h}};
const homeCard=()=>{const w=Math.min(A.W*.34,170),h=A.H*.4;return{x:A.W/2-w/2,y:A.H*.12,w,h}};
function draw(A){const{ctx:g,W,H,col:C}=A,v=phase();g.fillStyle=A.mix(C.pn,'#fef9c3',C.dark?.05:.45);g.fillRect(0,0,W,H);
 if(v==='quiz'){BOWL.forEach((b,i)=>{const r=bowlR(i);r.y=H*.3;tile(g,r,[C.gr,C.rd,C.or][i],.14);pic(g,b[1],r.x+r.w/2,r.y+r.h*.35,Math.min(34,r.w*.3));txt(g,b[0],r.x+r.w/2,r.y+r.h*.75,12)});txt(g,'Sort animals by what they eat.',W/2,H*.12,16);return}
 if(v==='herb'||v==='carn'||v==='omni'){const who=EATERS[A.step],m=mouthR();tile(g,m,D.flash==='yes'?C.gr:D.flash==='no'?C.rd:C.cy,D.flash?.2:.08,3);
  pic(g,who.e,m.x+m.w/2,m.y+m.h*.45,m.h*.5);txt(g,D.said||`Feed the ${who.who}. Drag food to it.`,W/2,H*.05,14);
  txt(g,`Ate ${D.ate.length}: `+D.ate.map(i=>FOOD[i][1]).join(' '),W/2,m.y+m.h+H*.06,13,700);
  FOOD.forEach((f,i)=>{if(D.drag&&D.drag.i===i)return;const r=foodR(i),no=D.no.includes(i);tile(g,r,no?C.mu:f[2]?C.rd:C.gr,no?.05:.14);pic(g,f[1],r.x+r.w/2,r.y+r.h*.4,Math.min(32,r.w*.42));txt(g,f[0],r.x+r.w/2,r.y+r.h*.82,11,700)});
  if(D.drag){const d=D.drag,r=foodR(d.i),q={x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h};tile(g,q,C.ac,.25,3);pic(g,FOOD[d.i][1],d.x,d.y-r.h*.1,Math.min(32,r.w*.42))}return A.fx.draw(g)}
 if(v==='sort'){BOWL.forEach((b,i)=>{const r=bowlR(i);tile(g,r,[C.gr,C.rd,C.or][i],.1,D.over===i?4:2);pic(g,b[1],r.x+r.w/2,r.y+r.h*.18,Math.min(26,r.w*.22));txt(g,b[0],r.x+r.w/2,r.y+r.h*.38,12);
   txt(g,b[2],r.x+r.w/2,r.y+r.h*.52,10,600);pic(g,D.inBowl[i].map(k=>ZOO[k][1]).join(''),r.x+r.w/2,r.y+r.h*.78,Math.min(24,r.w/4.5))});
  if(D.k<ZOO.length){const z=ZOO[D.k],r=D.drag?{...homeCard(),x:D.drag.x-homeCard().w/2,y:D.drag.y-homeCard().h/2}:homeCard();tile(g,r,C.cy,.12,3);pic(g,z[1],r.x+r.w/2,r.y+r.h*.34,r.h*.36);
   txt(g,z[0],r.x+r.w/2,r.y+r.h*.64,13);txt(g,'eats '+z[3],r.x+r.w/2,r.y+r.h*.85,11,700)}else txt(g,'All six sorted!',W/2,H*.3,18);
  txt(g,D.said||'Drag the animal to its bowl.',W/2,H*.05,13);return A.fx.draw(g)}
 if(v==='why'){if(D.k<WHY.length){const w=WHY[D.k];pic(g,w.e,W/2,H*.14,Math.min(54,H*.17));txt(g,`The ${w.who} is a ${GROUP[w.g]}. Why?`,W/2,H*.29,15);
   w.r.forEach((x,i)=>{const[t,tag]=w.r[slot(i)],r=reasonR(i),picked=D.tried.includes(slot(i));tile(g,r,picked?(tag==='ok'?C.gr:C.rd):C.cy,picked?.2:.07,picked?3:2);txt(g,t,r.x+r.w/2,r.y+r.h/2,13)})}
  else txt(g,'Food is the reason every time.',W/2,H*.4,17);txt(g,D.said||'',W/2,H*.95,11,700);return A.fx.draw(g)}}
/* steps 0-2: feeding. A herbivore takes plants, a carnivore takes meat, an omnivore takes both. */
function feed(i){const who=EATERS[A.step];if(!who||D.ate.length>=6)return;const f=FOOD[i],yes=who.kind===2||who.kind===f[2];
 if(!yes){D.flash='no';if(!D.no.includes(i))D.no.push(i);A.sound.miss();D.said=`No thanks! A ${who.who} does not eat ${f[0]}.`;tell(D.said+(who.kind?' It eats meat.':' It eats plants.'));A.redraw();return pads()}
 D.flash='yes';D.ate.push(i);A.sound.pop();D.said=`Yum! The ${who.who} eats ${f[0]}.`;tell(D.said);A.redraw();pads();D.check()}
function fedEnough(){const who=EATERS[A.step],kinds=new Set(D.ate.map(i=>FOOD[i][2]));return who.kind===2?kinds.size===2:D.ate.length>=who.need}
/* step 3: sorting animals into bowls */
function bowl(b){if(D.k>=ZOO.length)return;const z=ZOO[D.k];
 if(b!==z[2]){A.sound.miss();D.said=b===2?`A ${z[0]} does not eat both. Look at its food.`:z[2]===2?`A ${z[0]} eats plants and meat, so it needs the both bowl.`:`Look again: a ${z[0]} eats ${z[2]?'meat':'plants'}.`;tell(D.said);A.redraw();return}
 D.inBowl[b].push(D.k);D.k++;A.sound.pop();D.said=`Yes! ${z[0][0].toUpperCase()+z[0].slice(1)}: ${GROUP[b]}.`;tell(D.said);A.redraw();pads();D.check()}
/* step 4: picking the reason for a group */
/* the right reason moves to a different place for each animal */
const slot=i=>(i+D.k)%3;
function because(pos){if(D.k>=WHY.length)return;const w=WHY[D.k],i=slot(pos),[t,tag]=w.r[i];if(!D.tried.includes(i))D.tried.push(i);
 if(tag!=='ok'){A.sound.miss();D.said=tag==='looks'?'Looks do not tell us what it eats.':tag==='size'?'Size does not tell us what it eats.':tag==='fly'?'Lots of flying birds eat seeds. Look at its food.':'Where it lives does not tell us what it eats.';tell(D.said);A.redraw();return}
 A.sound.pop();D.said=`Yes: ${t.toLowerCase()}, so it is a ${GROUP[w.g]}.`;tell(D.said);D.k++;D.tried=[];A.redraw();pads();D.check()}
function pads(){if(!pad)return;pad.innerHTML='';const v=phase(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(['herb','carn','omni'].includes(v)&&!fedEnough())FOOD.forEach(([n,e],i)=>{if(!D.no.includes(i))B(e+' '+n,()=>feed(i),`Give ${n} to the ${EATERS[A.step].who}`)});
 if(v==='sort'&&D.k<ZOO.length)BOWL.forEach(([n,e],b)=>B(e+' '+n,()=>bowl(b),`Put the ${ZOO[D.k][0]} in the ${n} bowl`));
 if(v==='why'&&D.k<WHY.length)WHY[D.k].r.forEach((x,pos)=>{const t=WHY[D.k].r[slot(pos)][0];B(t,()=>because(pos),'Reason: '+t)})}
/* pointer: drag a food to the eater or an animal to a bowl; a tap on its own also counts */
function down(p){const v=phase();
 if(['herb','carn','omni'].includes(v)){const i=FOOD.findIndex((f,j)=>hit(p,foodR(j)));if(i<0)return false;D.drag={i,x:p.x,y:p.y,sx:p.x,sy:p.y};return true}
 if(v==='sort'&&D.k<ZOO.length){const b=[0,1,2].find(k=>hit(p,bowlR(k)));if(b!=null){bowl(b);return false}if(!hit(p,homeCard()))return false;D.drag={x:p.x,y:p.y,sx:p.x,sy:p.y};return true}
 if(v==='why')WHY[0].r.forEach((x,i)=>{if(hit(p,reasonR(i)))because(i)});return false}
function move(p){if(!D.drag)return;D.drag.x=p.x;D.drag.y=p.y;if(phase()==='sort'){const b=[0,1,2].find(k=>hit(p,bowlR(k)));D.over=b==null?-1:b}A.redraw()}
function up(p){const d=D.drag;if(!d)return;D.drag=null;D.over=-1;const tap=Math.hypot(p.x-d.sx,p.y-d.sy)<8,v=phase();
 if(v==='sort'){const b=[0,1,2].find(k=>hit(p,bowlR(k)));if(b!=null)bowl(b);else{D.said=tap?'Drag it to a bowl, or press a bowl button.':'Drop it on a bowl.';tell(D.said)}A.redraw();return}
 if(tap||hit(p,mouthR()))feed(d.i);else A.redraw()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list){const me=(D.run=(D.run||0)+1);let j=0;(function nxt(){if(me!==D.run||j>=list.length)return;const[f,ms]=list[j++];f();setTimeout(nxt,A.reduced()?40:ms)})()}
function reset(){const r=(D.run||0)+1;Object.keys(D).forEach(k=>delete D[k]);Object.assign(D,{run:r,check:()=>{},ate:[],no:[],flash:'',said:'',k:0,inBowl:[[],[],[]],tried:[],over:-1,drag:null})}
/* the three feeding steps share one runner: n is the eater, plan is the food order Show me uses */
const feeding=(n,plan,msg)=>({show:()=>{steps[n].go();play(plan.map(i=>[()=>feed(i),450]))},
 go:()=>{reset();tell(`Feed the ${EATERS[n].who}. Drag a food to it, or press a food button.`);pads();D.check=finish(n,fedEnough,msg)}});
const steps=[
{h:'Plant eaters',p:'A rabbit is hungry. Drag food to it. Which foods does it eat?',predict:{q:'Will a rabbit eat fish?',opts:['No, it eats only plants','Yes, all animals eat fish','Yes, if it is very hungry'],ans:0},task:'Give the rabbit 3 foods it eats',
 ...feeding(0,[3,0,1,2],'A rabbit eats only plants. An animal that eats only plants is a herbivore.')},
{h:'Meat eaters',p:'Now feed the cat. Try the plants too.',predict:{q:'A cat is small and soft. What does it eat?',opts:['Meat and fish','Grass and leaves','Berries'],ans:0},task:'Give the cat 2 foods it eats',
 ...feeding(1,[0,3,4],'A cat eats meat. An animal that eats only meat is a carnivore.')},
{h:'Plants and meat',p:'Feed the bear. Does it want plants, meat, or both?',predict:{q:'What does a bear eat?',opts:['Plants and meat','Only meat, it is big','Only plants'],ans:0},task:'Give the bear a plant and a meat',
 ...feeding(2,[2,3],'A bear eats berries and fish. An animal that eats plants and meat is an omnivore.')},
{h:'Sort the animals',p:'Look at what each animal eats. Put it in the right bowl.',task:'Sort all 6 animals',
 show:()=>{steps[3].go();play(ZOO.map(z=>[()=>bowl(z[2]),350]))},
 go:()=>{reset();tell('Drag the animal to a bowl: herbivore, carnivore or omnivore.');pads();D.check=finish(3,()=>D.k>=ZOO.length,'The elephant is huge but eats only plants. Food decides the group, not size.')}},
{h:'Say why',p:'Pick the reason for each group. A good reason is about food.',predict:{q:'A hen eats seeds and worms. What is it?',opts:['An omnivore','A herbivore','A carnivore'],ans:0},task:'Pick the reason for 3 animals',
 show:()=>{steps[4].go();play(WHY.map(()=>[()=>because((3-D.k%3)%3),400]))},
 go:()=>{reset();tell('Why is it in that group? Pick the reason.');pads();D.check=finish(4,()=>D.k>=WHY.length,'What an animal eats is the reason. Looks, size and home are not.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>D.check()});
const QS=[['A cow eats only grass. What is it?',[['A herbivore','ok'],['A carnivore','cowmeat'],['An omnivore','cowboth']]],
 ['What does a carnivore eat?',[['Meat','ok'],['Plants','carnplant'],['Plants and meat','carnboth']]],
 ['An elephant is very big. What does it eat?',[['Only plants','ok'],['Only meat','big'],['Plants and meat','bigboth']]],
 ['A bear eats berries and fish. What is it?',[['An omnivore','ok'],['A herbivore','onlyberry'],['A carnivore','onlyfish']]],
 ['Why is a cat a carnivore?',[['It eats meat','ok'],['It is small and furry','cute'],['It lives in a house','home']]],
 ['People eat bread, fruit, fish and chicken. What are people?',[['Omnivores','ok'],['Herbivores','pplplant'],['Carnivores','pplmeat']]]];
function slip(t){let m='Look at what the animal eats.';
 if(t==='cowmeat')m='Carnivores eat meat. A cow eats only grass, so it is a herbivore.';
 if(t==='cowboth')m='Omnivores eat plants and meat. A cow eats only plants.';
 if(t==='carnplant')m='Plant eaters are herbivores. Carnivores eat meat.';
 if(t==='carnboth')m='Eating both is an omnivore. A carnivore eats meat.';
 if(t==='big')m='Big does not mean meat eater. Elephants eat only plants.';
 if(t==='bigboth')m='Elephants do not eat meat. They eat grass, leaves and fruit.';
 if(t==='onlyberry')m='Fish is meat, so a bear eats more than plants. It is an omnivore.';
 if(t==='onlyfish')m='Berries are plants, so a bear eats more than meat. It is an omnivore.';
 if(t==='cute')m='Small and furry does not tell us its food. A cat eats meat.';
 if(t==='home')m='Where it lives is not the reason. It is a carnivore because it eats meat.';
 if(t==='pplplant')m='Fish and chicken are meat, so people are not herbivores.';
 if(t==='pplmeat')m='Bread and fruit come from plants, so people are not carnivores.';
 return m}
function ask(){turn++;const[q,ops]=QS[turn%QS.length],r=turn%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>answer(t)});tell('Challenge: '+q);A.redraw()}
function answer(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?'✓ Right! In a row: '+streak+'.':'✗ '+slip(t))+' <button type="button" class="linkish">Next question →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{chal.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pads()}});
A.start()})})();
