/* Flagship – parts of a plant (ages 5–6): build a plant (roots, stem, leaves, flower), match each part to its job, follow
   blue water up the roots and stem until a white flower turns blue, label a tree (a trunk is a woody stem) and sort foods
   by the part we eat. Challenge slips: plants eat soil, trees are not plants, a carrot is a fruit, flowers are just pretty.
   Every drag has a button twin. */
(()=>{
const PARTS=['Roots','Stem','Leaves','Flower'],TREE=['Roots','Trunk','Branches','Leaves'];
const PLACE={Roots:'under the soil',Stem:'up the middle',Leaves:'on the sides of the stem',Flower:'at the top',Trunk:'the thick part above the soil',Branches:'out from the trunk'};
const JOBS=[['Hold the plant in the soil and take in water',0],['Hold the plant up and carry water',1],['Catch sunlight to make food',2],['Make seeds',3]];
const FOODS=[['🥕','carrot',0,'A carrot grows down in the soil. It is a root.'],['🥬','lettuce',2,'We eat the leaves of a lettuce.'],['🥦','broccoli',3,'Broccoli is lots of tiny flower buds.'],
 ['🌱','asparagus',1,'Asparagus is a young stem.'],['🍃','spinach',2,'Spinach is a pile of soft leaves.'],['🔴','radish',0,'A radish is a round root.']];
const BINS=['Root','Stem','Leaf','Flower'];
VIS.reg('flagplant',c=>{let A,pad,quiz,qNo=-1,run=0;c.fig.classList.add('young');const M={};
const scene=()=>['build','jobs','water','tree','food','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const sz=n=>Math.round(n*(A.narrow?1:1.15));
function say(g,t,x,y,n,col,wt){g.font=`${wt||800} ${sz(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-16)}
const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function card(g,r,fill,edge){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=2.5;g.strokeStyle=edge||A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}
/* ---- layout ---- */
function geo(){const px=A.W*.3,gy=A.H*.64,ty=gy-A.H*.36,R=Math.min(A.H*.15,A.W*.14),fr=Math.min(A.W*.06,26),L=Math.min(A.W*.09,40),mid=gy-A.H*.17;
 return{px,gy,ty,R,fr,L,mid,slot:{Roots:{x:px-R*.9,y:gy+4,w:R*1.8,h:R},Flower:{x:px-fr*1.7,y:ty-fr*1.7,w:fr*3.4,h:fr*3.4},Leaves:{x:px-L*2.3,y:mid-L*.75,w:L*4.6,h:L*1.5},Stem:{x:px-20,y:mid+L*.8,w:40,h:gy-mid-L*.8}}}}
function tgeo(){const px=A.W*.3,gy=A.H*.64,R=Math.min(A.H*.15,A.W*.14),tw=Math.max(16,A.W*.06),tt=gy-A.H*.2,cr=Math.min(A.W*.2,A.H*.15),cy=gy-A.H*.44;
 return{px,gy,R,tw,tt,cr,cy,slot:{Roots:{x:px-R*.9,y:gy+4,w:R*1.8,h:R},Trunk:{x:px-tw/2-8,y:tt,w:tw+16,h:gy-tt},Branches:{x:px-cr*1.1,y:gy-A.H*.33,w:cr*2.2,h:A.H*.13},Leaves:{x:px-cr*1.3,y:cy-cr*.9,w:cr*2.6,h:cr*1.5}}}}
const labelCard=i=>{const h=Math.min(A.H*.11,48);return{x:A.W*.6,y:A.H*.14+i*(h+8),w:A.W*.36,h}};
const jobCard=i=>{const h=Math.min(A.H*.15,64);return{x:A.W*.56,y:A.H*.1+i*(h+6),w:A.W*.42,h}};
const foodCard=i=>{const w=(A.W-32)/3,h=Math.min(A.H*.15,62);return{x:8+(i%3)*(w+8),y:A.H*.1+Math.floor(i/3)*(h+8),w,h}};
const bin=i=>{const w=(A.W-40)/4;return{x:8+i*(w+8),y:A.H*.58,w,h:A.H*.38}};
/* ---- drawing ---- */
function ground(g){const{W,H,col:C}=A,gy=A.H*.64;g.fillStyle=A.alpha(C.or,C.dark?.3:.35);g.fillRect(0,gy,W,H-gy);g.fillStyle=A.mix(C.or,'#3b2412',.4);g.fillRect(0,gy,W,3)}
function plantPart(g,k,P,dye){const C=A.col,{px,gy,ty,R,fr,L,mid}=P,green=A.mix(C.gr,'#14532d',C.dark?0:.2);g.lineCap='round';
 if(k==='Roots'){g.strokeStyle=A.mix(C.or,'#3b2412',.35);g.lineWidth=4;[[0,1],[-.6,.8],[.6,.8],[-.35,.45],[.4,.4]].forEach(([dx,dy])=>{g.beginPath();g.moveTo(px,gy);g.quadraticCurveTo(px+dx*R*.3,gy+dy*R*.6,px+dx*R*.8,gy+dy*R*.95);g.stroke()})}
 if(k==='Stem'){g.strokeStyle=green;g.lineWidth=7;g.beginPath();g.moveTo(px,gy);g.lineTo(px,ty);g.stroke()}
 if(k==='Leaves')[-1,1].forEach(s=>{g.save();g.translate(px+s*L,mid);g.rotate(s*-.35);g.fillStyle=green;g.beginPath();g.ellipse(0,0,L,L*.42,0,0,7);g.fill();g.lineWidth=2;g.strokeStyle=C.tx;g.stroke();g.restore()});
 if(k==='Flower'){const pet=A.mix('#f8fafc','#2563eb',dye||0);for(let i=0;i<6;i++){const a=i*Math.PI/3;g.fillStyle=pet;g.beginPath();g.arc(px+Math.cos(a)*fr,ty+Math.sin(a)*fr,fr*.62,0,7);g.fill();g.lineWidth=1.5;g.strokeStyle=C.tx;g.stroke()}g.fillStyle='#facc15';g.beginPath();g.arc(px,ty,fr*.55,0,7);g.fill();g.stroke()}
 g.lineCap='butt'}
function treePart(g,k,T){const C=A.col,{px,gy,R,tw,tt,cr,cy}=T,wood=A.mix(C.or,'#3b2412',.45);
 if(k==='Roots')plantPart(g,'Roots',{px,gy,R});
 if(k==='Trunk'){g.fillStyle=wood;g.fillRect(px-tw/2,tt,tw,gy-tt);g.lineWidth=2;g.strokeStyle=C.tx;g.strokeRect(px-tw/2,tt,tw,gy-tt)}
 if(k==='Branches'){g.strokeStyle=wood;g.lineCap='round';g.lineWidth=6;[[-1,.9],[1,.9],[-.45,1.25],[.5,1.2]].forEach(([s,u])=>{g.beginPath();g.moveTo(px,tt+4);g.lineTo(px+s*cr*.95,tt-A.H*.1*u);g.stroke()});g.lineCap='butt'}
 if(k==='Leaves'){g.fillStyle=A.alpha(C.gr,.85);[[0,-.25,1],[-.6,.1,.7],[.6,.1,.7]].forEach(([dx,dy,r])=>{g.beginPath();g.arc(px+dx*cr,cy+dy*cr,cr*r*.75,0,7);g.fill()})}}
function slotMark(g,r,k,on){g.setLineDash([6,5]);g.lineWidth=2;g.strokeStyle=on?A.col.vi:A.col.mu;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();g.setLineDash([]);if(!on)return;g.fillStyle=A.alpha(A.col.vi,.12);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill()}
function tag(g,k,r){A.paint.label(k,r.x+r.w/2,r.y+r.h/2,{font:`700 ${sz(13)}px system-ui,sans-serif`,bg:A.alpha(A.col.pn,.92),col:A.col.tx})}
function draw(A){const{ctx:g,W,H,col:C}=A,v=scene();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){ground(g);const P=geo();PARTS.forEach(k=>plantPart(g,k,P));say(g,'Roots, stem, leaves, flower.',W/2,H*.08,17);return}
 if(v==='build'||v==='tree'){ground(g);const tree=v==='tree',P=tree?tgeo():geo(),list=tree?TREE:PARTS;
  list.forEach(k=>{if(M.placed.includes(k))tree?treePart(g,k,P):plantPart(g,k,P);else slotMark(g,P.slot[k],k,M.sel>=0)});
  if(M.placed.length>=4)list.forEach(k=>tag(g,k,P.slot[k]));
  say(g,M.placed.length>=4?(tree?'A trunk is a big, woody stem.':'A whole plant!'):M.sel>=0?`${list[M.sel]}: now tap its place.`:'Tap a label, then tap its place.',W/2,H*.06,14);
  list.forEach((k,i)=>{if(M.placed.includes(k))return;const r=labelCard(i);card(g,r,M.sel===i?A.alpha(C.vi,.3):M.bad===i?A.alpha(C.rd,.25):A.alpha(C.cy,.14),M.sel===i?C.vi:C.tx);say(g,k,r.x+r.w/2,r.y+r.h/2,17)});return A.fx.draw(g)}
 if(v==='jobs'){ground(g);const P=geo();PARTS.forEach(k=>plantPart(g,k,P));PARTS.forEach((k,i)=>{if(M.done.includes(i))tag(g,k,P.slot[k]);else if(M.sel===i)slotMark(g,P.slot[k],k,true)});
  say(g,M.done.length>=4?'Every part has a job.':M.sel>=0?`What do the ${PARTS[M.sel].toLowerCase()} do?`:'Tap a part of the plant.',W/2,H*.05,14);
  JOBS.forEach(([t],j)=>{const r=jobCard(j),gone=M.done.includes(JOBS[j][1]);card(g,r,gone?A.alpha(C.gr,.22):M.bad===j?A.alpha(C.rd,.25):A.alpha(C.or,.12),C.tx);wrap(g,t,r)});return A.fx.draw(g)}
 if(v==='water'){ground(g);const P=geo();PARTS.forEach(k=>plantPart(g,k,P,M.dye));
  M.drops.forEach(d=>{g.fillStyle='#2563eb';g.beginPath();g.arc(d.x,d.y,4,0,7);g.fill()});
  PARTS.slice(0,3).forEach((k,i)=>{if(M.path.includes(i))tag(g,`${M.path.indexOf(i)+1}. ${k}`,P.slot[k])});
  say(g,M.path.length>=3?'Water goes in at the roots and up.':M.watered?'Tap the parts the water goes through, in order.':'Tap the watering can.',W/2,H*.05,14);
  g.font=`${Math.round(Math.min(46,H*.11))}px system-ui,sans-serif`;g.textAlign='center';g.fillStyle='#000';g.fillText('🚿',W*.78,H*.5);return A.fx.draw(g)}
 if(v==='food'){say(g,M.sel>=0?`Which part is ${FOODS[M.sel][1]}?`:'Tap a food, then the part of the plant it is.',W/2,H*.05,14);
  FOODS.forEach((f,i)=>{const r=foodCard(i),done=M.done.includes(i);if(done)return;card(g,r,M.sel===i?A.alpha(C.vi,.3):A.alpha(C.cy,.12),M.sel===i?C.vi:C.tx);say(g,f[0],r.x+r.w/2,r.y+r.h*.36,20);say(g,f[1],r.x+r.w/2,r.y+r.h*.76,13,C.tx,700)});
  BINS.forEach((b,i)=>{const r=bin(i);card(g,r,M.bad===i?A.alpha(C.rd,.25):A.alpha(C.gr,.14),C.tx);say(g,b,r.x+r.w/2,r.y+18,15);M.done.filter(k=>FOODS[k][2]===i).forEach((k,n)=>say(g,FOODS[k][0],r.x+r.w/2,r.y+48+n*30,20))});return A.fx.draw(g)}}
function wrap(g,t,r){g.font=`700 ${sz(13)}px system-ui,sans-serif`;const words=t.split(' '),lines=[];let cur='';words.forEach(w=>{const s=cur?cur+' '+w:w;if(g.measureText(s).width>r.w-14&&cur){lines.push(cur);cur=w}else cur=s});lines.push(cur);
 lines.forEach((l,i)=>say(g,l,r.x+r.w/2,r.y+r.h/2+(i-(lines.length-1)/2)*sz(16),13,A.col.tx,700))}
/* ---- actions ---- */
function waterTick(dt){const P=geo();if(scene()!=='water'||!M.drops.length)return false;let live=false;
 M.drops.forEach(d=>{d.t+=dt*(A.reduced()?6:1);if(d.t<0)return;live=true;const u=Math.min(1,d.t/1.8);if(u<.3){d.x+=(P.px-d.x)*.2;d.y=P.gy+P.R*.9*(1-u/.3)}else d.y=P.gy-(P.gy-P.ty)*((u-.3)/.7);if(u>=1)d.t=99});
 M.drops=M.drops.filter(d=>d.t<99);if(!M.drops.length){M.dye=1;A.redraw();return false}M.dye=Math.min(1,M.dye+dt*.15);return live}
const listNow=()=>scene()==='tree'?TREE:PARTS;
function pickLabel(i){const v=scene();if(v!=='build'&&v!=='tree')return;if(M.placed.includes(listNow()[i]))return;M.sel=i;A.sound.tick();tell(`${listNow()[i]}. Tap where it goes.`);A.redraw();buttons()}
function putAt(k){const v=scene();if((v!=='build'&&v!=='tree')||M.sel<0||M.placed.includes(k))return;const want=listNow()[M.sel];
 if(k!==want){A.sound.miss();M.bad=M.sel;tell(`That is where the ${k.toLowerCase()} go. ${want} go ${PLACE[want]}.`);setTimeout(()=>{M.bad=-1;A.redraw()},A.reduced()?10:900);return A.redraw()}
 M.placed.push(k);M.sel=-1;A.sound.pop();tell(v==='tree'&&k==='Trunk'?'The trunk is the tree\'s stem: thick and woody.':`Yes. ${k} go ${PLACE[k]}.`);A.redraw();buttons();M.want()}
function pickPart(i){if(scene()!=='jobs'||M.done.includes(i))return;M.sel=i;A.sound.tick();tell(`What do the ${PARTS[i].toLowerCase()} do?`);A.redraw();buttons()}
function pickJob(j){if(scene()!=='jobs'||M.sel<0)return;const[t,owner]=JOBS[j];if(M.done.includes(owner))return;
 if(owner!==M.sel){A.sound.miss();M.bad=j;tell(`${PARTS[owner]} do that job. The ${PARTS[M.sel].toLowerCase()} are ${PLACE[PARTS[M.sel]]}.`);setTimeout(()=>{M.bad=-1;A.redraw()},A.reduced()?10:900);return A.redraw()}
 M.done.push(owner);M.sel=-1;A.sound.pop();tell(`Yes. ${PARTS[owner]}: ${t.toLowerCase()}.`);A.redraw();buttons();M.want()}
function water(){if(scene()!=='water'||M.watered)return;M.watered=1;A.sound.whoosh();const P=geo();tell('Water soaks in. Watch where it goes.');A.kick();
 for(let i=0;i<14;i++)M.drops.push({x:P.px+(Math.random()-.5)*P.R,y:P.gy+P.R*.9,t:-i*.12});A.redraw();buttons()}
function follow(i){if(scene()!=='water'||!M.watered||M.path.length>=3)return;const need=M.path.length;
 if(i!==need){A.sound.miss();M.bad=i;tell(i===3?'The flower is at the very top. Water gets there last.':i===2?'Water does not go in at the leaves. It goes in at the roots.':`Start where the water goes in: the roots.`);setTimeout(()=>{M.bad=-1;A.redraw()},A.reduced()?10:900);return A.redraw()}
 M.path.push(i);A.sound.pop();tell(['Roots take in the water from the soil.','The stem carries it up, like a straw.','Then to the leaves and flower. See the white flower turn blue.'][i]);A.redraw();buttons();M.want()}
function pickFood(i){if(scene()!=='food'||M.done.includes(i))return;M.sel=i;A.sound.tick();tell(`${FOODS[i][1]}. Which part of a plant is it?`);A.redraw();buttons()}
function toBin(b){if(scene()!=='food'||M.sel<0)return;const f=FOODS[M.sel];
 if(f[2]!==b){A.sound.miss();M.bad=b;tell(`Not a ${BINS[b].toLowerCase()}. ${f[3]}`);setTimeout(()=>{M.bad=-1;A.redraw()},A.reduced()?10:900);return A.redraw()}
 M.done.push(M.sel);M.sel=-1;A.sound.pop();tell(`Yes! ${f[3]}`);A.redraw();buttons();M.want()}
function buttons(){if(!pad)return;pad.innerHTML='';const v=scene(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='build'||v==='tree'){const L=listNow();if(M.placed.length>=4)return;if(M.sel<0)L.forEach((k,i)=>{if(!M.placed.includes(k))B(k,()=>pickLabel(i),`Pick the ${k} label`)});else L.forEach(k=>{if(!M.placed.includes(k))B('Put here: '+PLACE[k],()=>putAt(k),`Put the label ${PLACE[k]}`)})}
 if(v==='jobs'&&M.done.length<4){if(M.sel<0)PARTS.forEach((k,i)=>{if(!M.done.includes(i))B(k,()=>pickPart(i),`Pick the ${k}`)});else JOBS.forEach(([t,o],j)=>{if(!M.done.includes(o))B(t,()=>pickJob(j))})}
 if(v==='water'&&M.path.length<3){if(!M.watered)B('Water the soil',water);else PARTS.forEach((k,i)=>B(k,()=>follow(i),`Water goes to the ${k} next`))}
 if(v==='food'&&M.done.length<FOODS.length){if(M.sel<0)FOODS.forEach((f,i)=>{if(!M.done.includes(i))B(f[0]+' '+f[1],()=>pickFood(i),`Pick ${f[1]}`)});else BINS.forEach((b,i)=>B(b,()=>toBin(i),`${FOODS[M.sel][1]} is a ${b}`))}}
/* ---- pointer: tap to pick, tap (or drag) to place ---- */
function spotAt(p){const v=scene(),P=v==='tree'?tgeo():geo(),order=v==='tree'?['Leaves','Branches','Trunk','Roots']:['Flower','Leaves','Roots','Stem'];return order.find(k=>hit(p,P.slot[k]))}
function down(p){const v=scene();
 if(v==='build'||v==='tree'){const L=listNow(),i=L.findIndex((k,i)=>!M.placed.includes(k)&&hit(p,labelCard(i)));if(i>=0){pickLabel(i);M.drag={x0:p.x,y0:p.y};return true}const k=spotAt(p);if(k)putAt(k)}
 if(v==='jobs'){const j=JOBS.findIndex((x,j)=>hit(p,jobCard(j)));if(j>=0)pickJob(j);else{const k=spotAt(p);if(k)pickPart(PARTS.indexOf(k))}}
 if(v==='water'){if(!M.watered&&p.x>A.W*.6)water();else if(M.watered){const k=spotAt(p);if(k)follow(PARTS.indexOf(k))}}
 if(v==='food'){const i=FOODS.findIndex((f,i)=>!M.done.includes(i)&&hit(p,foodCard(i)));if(i>=0){pickFood(i);M.drag={x0:p.x,y0:p.y};return true}const b=BINS.findIndex((x,b)=>hit(p,bin(b)));if(b>=0)toBin(b)}
 return false}
function move(p){if(M.drag){M.drag.x=p.x;M.drag.y=p.y}}
function up(p){const d=M.drag,v=scene();M.drag=null;if(!d||d.x==null||Math.hypot(p.x-d.x0,p.y-d.y0)<12)return;
 if(v==='build'||v==='tree'){const k=spotAt(p);if(k)putAt(k)}if(v==='food'){const b=BINS.findIndex((x,b)=>hit(p,bin(b)));if(b>=0)toBin(b)}}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function runList(fns,gap){const me=++M.ver;fns.forEach((f,j)=>setTimeout(()=>{if(me===M.ver)f()},A.reduced()?40*(j+1):(j+1)*gap))}
function reset(){const v=(M.ver||0)+1;Object.keys(M).forEach(k=>delete M[k]);Object.assign(M,{ver:v,want:()=>{},sel:-1,bad:-1,placed:[],done:[],path:[],drops:[],dye:0,watered:0,drag:null})}
const steps=[
{h:'Build a plant',p:'A plant has roots, a stem, leaves and a flower. Tap a label, then tap the place it goes.',predict:{q:'Where do the roots grow?',opts:['At the top','Under the soil','On the leaves'],ans:1},task:'Put all 4 parts in place',
 show:()=>{steps[0].go();runList(PARTS.flatMap((k,i)=>[()=>pickLabel(i),()=>putAt(k)]),260)},
 go:()=>{reset();tell('Tap the Roots label, then tap where roots grow.');buttons();M.want=ready(0,()=>M.placed.length>=4,'Roots under the soil, stem up the middle, leaves on the stem, flower on top.')}},
{h:'Every part has a job',p:'Tap a part of the plant, then tap the job it does.',task:'Match all 4 jobs',
 show:()=>{steps[1].go();runList([0,1,2,3].flatMap(i=>[()=>pickPart(i),()=>pickJob(i)]),260)},
 go:()=>{reset();tell('Tap the roots, then tap what roots do.');buttons();M.want=ready(1,()=>M.done.length>=4,'Roots hold and drink, the stem holds up and carries, leaves catch sunlight, and flowers make seeds.')}},
{h:'Follow the water',p:'This flower is white. Water the soil with blue water and watch.',predict:{q:'You water the soil. How does water reach the leaves?',opts:['It falls on them like rain','Up the roots and stem','It cannot get there'],ans:1},task:'Tap the 3 parts the water goes through, in order',
 show:()=>{steps[2].go();runList([water,()=>follow(0),()=>follow(1),()=>follow(2)],420)},
 go:()=>{reset();tell('Tap the watering can to water the soil.');buttons();M.want=ready(2,()=>M.path.length>=3,'Water goes in at the roots, up the stem and out to the leaves and flower.')}},
{h:'A tree is a plant',p:'A tree has roots, a trunk, branches and leaves. Label the tree.',predict:{q:'Is a tree a plant?',opts:['No, it is too big','Yes','No, it is made of wood'],ans:1},task:'Label all 4 parts of the tree',
 show:()=>{steps[3].go();runList(TREE.flatMap((k,i)=>[()=>pickLabel(i),()=>putAt(k)]),260)},
 go:()=>{reset();tell('Tap a label, then tap its place on the tree.');buttons();M.want=ready(3,()=>M.placed.length>=4,'A tree is a big plant. Its trunk is a thick, woody stem.')}},
{h:'Which part do we eat?',p:'Lots of food comes from plants. Is it a root, a stem, a leaf or a flower?',predict:{q:'Which part of a plant is a carrot?',opts:['A fruit','A leaf','A root'],ans:2},task:'Sort all 6 foods',
 show:()=>{steps[4].go();runList(FOODS.flatMap((f,i)=>[()=>pickFood(i),()=>toBin(f[2])]),220)},
 go:()=>{reset();tell('Tap the carrot, then tap the part of the plant it is.');buttons();M.want=ready(4,()=>M.done.length>=FOODS.length,'We eat roots, stems, leaves and flowers.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.want()});
const QS=[['Which part holds the plant in the soil and takes in water?',[['Roots','ok'],['Leaves','leafdrink'],['Flower','flowerjob']]],
 ['Which part of a tree is its stem?',[['The trunk','ok'],['The branches','branch'],['The roots','rootstem']]],
 ['Where does a plant make its food?',[['In its leaves, with sunlight','ok'],['It eats food from the soil','soil'],['In its flower','flowerjob']]],
 ['Is an oak tree a plant?',[['Yes, it has roots, a stem and leaves','ok'],['No, it is too big','big'],['No, it is wood','wood']]],
 ['Which part of a plant is a carrot?',[['Root','ok'],['Fruit','fruit'],['Stem','carrot']]],
 ['What is the flower for?',[['Making seeds','ok'],['Taking in water','flowerdrink'],['Only for looking pretty','pretty']]]];
function slip(t){let m='Think about where that part is on the plant.';
 if(t==='leafdrink')m='Leaves are up in the air. Roots in the soil hold on and take in water.';
 if(t==='flowerjob')m='The flower is at the top. Its job is to make seeds.';
 if(t==='branch')m='Branches grow out of the trunk. The trunk is the stem.';
 if(t==='rootstem')m='Roots are under the soil. The trunk is the stem.';
 if(t==='soil')m='Plants do not eat soil. Roots take in water. Leaves use sunlight to make the food.';
 if(t==='big')m='Big or small, a tree has roots, a stem and leaves. It is a plant.';
 if(t==='wood')m='A woody stem is still a stem, so a tree is a plant.';
 if(t==='fruit')m='A fruit holds seeds. A carrot grows down in the soil. It is a root.';
 if(t==='carrot')m='A stem grows up out of the soil. A carrot grows down into it. It is a root.';
 if(t==='flowerdrink')m='Roots take in water. A flower makes seeds.';
 if(t==='pretty')m='Flowers look pretty, but their job is to make seeds.';
 return m}
function ask(){qNo++;const[q,ops]=QS[qNo%QS.length],r=qNo%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Yes! ${run} right in a row.`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.64,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});A.every(waterTick);buttons()}});
A.start()})})();
