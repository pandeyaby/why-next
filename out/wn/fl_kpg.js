/* Flagship: the K-Pg extinction event (ages 9–11). Dig down a cliff and find where dinosaur fossils stop; probe each
   layer for iridium; drop the asteroid on the crater that matches the clay layer; order the impact-winter chain; sort
   who died out and who survived; build an animal with a survivor's traits; then a challenge. Data is in kpg_art.js. */
(()=>{
const K=KPG,L=K.LAYERS,NL=L.length;
VIS.reg('flagkpg',c=>{let A,g,ctl,chal,qn=-1,tok=0,hold=null;const st={};
function C(){const t=A.col;return{fg:t.tx,soft:t.mu,bg:t.pn,dk:t.dark,ink:'#0f172a',cover:t.dark?'#334155':'#e2e8f0',hatch:t.dark?'#64748b':'#94a3b8',good:'#166534',bad:'#9f1239',strip:t.dark?'#1e3a8a':'#dbeafe',probe:'#7c3aed',rock:'#57534e',sky:t.dark?'#0f172a':'#f1f5f9'}}
const sz=n=>Math.round(A.narrow?n:n*1.12);
const voice=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function put(t,x,y,n,col,w,al,mw){g.font=`${w||700} ${sz(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;g.fillText(String(t),x,y,mw||A.W-14)}
function split(t,max,n){g.font=`700 ${sz(n)}px system-ui,sans-serif`;const out=[];let line='';String(t).split(' ').forEach(w=>{const tr=line?line+' '+w:w;if(line&&g.measureText(tr).width>max){out.push(line);line=w}else line=tr});out.push(line);return out}
function tile(x,y,w,h,fill,edge,r){A.paint.rrect(x,y,w,h,r||8);g.fillStyle=fill;g.fill();if(edge){g.lineWidth=2;g.strokeStyle=edge;g.stroke()}}
function banner(t){const k=C(),rows=split(t,A.W-34,13),lh=sz(17),h=rows.length*lh+12;tile(8,6,A.W-16,h,k.strip);rows.forEach((r,i)=>put(r,A.W/2,12+lh*(i+.5),13,k.dk?'#f8fafc':k.ink));return 6+h+sz(8)}
function status(){if(!st.say)return;const k=C(),rows=split((st.no?'✗ ':'✓ ')+st.say,A.W-38,12),lh=sz(16),h=rows.length*lh+10,y=A.H-h-6;tile(8,y,A.W-16,h,'#ffffff',st.no?k.bad:k.good);rows.forEach((r,i)=>put(r,A.W/2,y+5+lh*(i+.5),12,st.no?k.bad:k.ink))}
const miss=t=>{st.no=true;st.say=t;A.sound.miss();voice(t);A.redraw()};
const good=t=>{st.no=false;st.say=t;A.sound.pop();voice(t);A.redraw();st.test()};
const info=t=>{st.no=false;st.say=t;voice(t);A.redraw()};
/* the cliff: six bands, the clay band thin; returns the band boxes */
function cliff(top,x0,w){const k=C(),room=A.H-top-sz(84),unit=room/(NL-.55),bands=[];let y=top;
 L.forEach((l,i)=>{const h=l.thin?unit*.45:unit,open=i<st.dug;g.fillStyle=open?l.fill:k.cover;g.fillRect(x0,y,w,h);g.strokeStyle=k.rock;g.lineWidth=1.5;g.strokeRect(x0,y,w,h);
  if(open){if(l.dino){g.fillStyle='#f8fafc';g.strokeStyle=k.ink;g.lineWidth=1.5;g.beginPath();g.ellipse(x0+w*.82,y+h/2,sz(14),sz(5),.3,0,7);g.fill();g.stroke()}
   put(l.name+(st.ages?' · '+l.age:''),x0+8,y+h*(l.thin||st.brief?.5:.33),l.thin?10:11,k.ink,800,'left',w-16);if(!l.thin&&!st.brief)split(l.find,w-16,10).slice(0,2).forEach((r,j)=>put(r,x0+8,y+h*.6+j*sz(12),10,k.ink,600,'left'))}
  else{g.strokeStyle=k.hatch;g.lineWidth=1;for(let q=x0+6;q<x0+w;q+=14){g.beginPath();g.moveTo(q,y+h-2);g.lineTo(q+8,y+2);g.stroke()}put('?',x0+w/2,y+h/2,12,k.fg,900)}
  if(st.mark===i){g.strokeStyle='#7c3aed';g.lineWidth=4;g.strokeRect(x0+2,y+2,w-4,h-4)}
  bands.push({x:x0,y,w,h,i});y+=h});return bands}
/* step 1: dig */
function viewDig(top){st.box=cliff(top,sz(14),A.W-sz(28));const k=C();put(st.dug<NL?`dug ${st.dug} of ${NL} layers`:'all layers open: where do the dinosaurs stop?',A.W/2,A.H-sz(64),12,k.fg,800)}
function dig(){if(st.dug>=NL){miss('Every layer is open. Now tap the layer where the dinosaur fossils stop.');return}st.dug++;A.sound.tick();const l=L[st.dug-1];info(`${l.name}: ${l.find}.`);tools()}
function markEnd(i){let m='';if(st.dug<NL)m='Dig all the way down first, so you can see every layer.';
 else if(L[i].dino)m=`${L[i].name} still has dinosaur fossils. Look higher up for where they stop.`;
 else if(i!==3)m=`${L[i].name} has no dinosaurs, but neither does the layer under it. Find the lowest layer with none, right on top of the bones.`;
 if(m){if(st.dug>=NL)st.mark=i;miss(m);return}st.mark=3;st.ages=1;good('Yes: this thin clay is the first layer with no dinosaurs above the last dinosaur bones.')}
/* step 2: iridium probe */
function viewProbe(top){const k=C(),w=A.W*.58;st.box=cliff(top,sz(12),w);const b=st.box[st.at],px=sz(12)+w+sz(10);
 g.fillStyle=k.probe;g.beginPath();g.moveTo(px,b.y+b.h/2);g.lineTo(px+sz(14),b.y+b.h/2-sz(9));g.lineTo(px+sz(14),b.y+b.h/2+sz(9));g.closePath();g.fill();
 const mx=px+sz(22),mw=A.W-mx-sz(12),mh=st.box[NL-1].y+st.box[NL-1].h-top;tile(mx,top,mw,mh,k.bg,k.fg,6);const v=L[st.at].ir,fill=Math.min(1,v/30);
 g.fillStyle='#be185d';g.fillRect(mx+mw*.3,top+mh-6-(mh-12)*fill,mw*.4,(mh-12)*fill);put('iridium',mx+mw/2,top+sz(12),10,k.fg,800);put(v,mx+mw/2,top+sz(28),14,k.fg,900);
 put(`probe at: ${L[st.at].name}`,A.W/2,A.H-sz(64),12,k.fg,800)}
function moveProbe(d){const n=Math.max(0,Math.min(NL-1,st.at+d));if(n===st.at)return;st.at=n;st.seen.add(n);A.sound.tick();voice(`${L[n].name}: iridium ${L[n].ir}.`);A.redraw()}
function pickHigh(){const v=L[st.at].ir;if(st.at!==3){miss(st.seen.size<NL?`${L[st.at].name} reads ${v}. You have not checked every layer yet; keep probing.`:`${L[st.at].name} reads only ${v}. One layer reads much higher.`);return}
 st.mark=3;good('The thin clay reads 30: about 30 times the layers around it. Iridium is common in asteroids, rare in Earth\'s crust.')}
/* step 3: craters */
function craterBoxes(top){const n=K.CRATERS.length,gap=sz(8),w=(A.W-sz(24)-gap*(n-1))/n,y=top+sz(70),h=A.H-y-sz(70);return K.CRATERS.map((cr,i)=>({x:sz(12)+i*(w+gap),y,w,h,i}))}
function viewCraters(top){const k=C(),bx=st.box=craterBoxes(top);bx.forEach(b=>{const cr=K.CRATERS[b.i];tile(b.x,b.y,b.w,b.h,k.bg,st.hit===b.i?'#7c3aed':k.fg);
  const r=Math.max(2,Math.min(b.w*.42,b.h*.22)*cr.km/180);g.fillStyle=k.dk?'#78350f':'#fde68a';g.beginPath();g.arc(b.x+b.w/2,b.y+b.h*.32,r,0,7);g.fill();g.strokeStyle=k.rock;g.lineWidth=2;g.stroke();
  const rows=[cr.name,cr.where,`${cr.km} km wide`,cr.age];let yy=b.y+b.h*.62;rows.forEach((t,j)=>{split(t,b.w-8,j?10:11).forEach(s2=>{put(s2,b.x+b.w/2,yy,j?10:11,k.fg,j?600:900);yy+=sz(13)})})});
 const ax=st.rock?st.rock.x:A.W/2,ay=st.rock?st.rock.y:top+sz(30);g.fillStyle='#57534e';g.beginPath();g.arc(ax,ay,sz(13),0,7);g.fill();g.strokeStyle='#f97316';g.lineWidth=3;g.stroke();put(st.hit==null?'drag me down':'',ax,ay+sz(24),10,k.soft,700)}
function dropOn(i){st.hit=i;st.rock=null;const cr=K.CRATERS[i];if(cr.ok){good('Chicxulub is 180 km wide and 66 million years old, the same age as the clay layer.');return}miss(cr.why)}
/* step 4: the chain */
function chainBoxes(top){const n=K.CHAIN.length,gap=sz(6),h=Math.min(sz(44),(A.H-top-sz(80)-gap*n)/n);return st.order.map((ci,j)=>({x:sz(14),y:top+sz(4)+j*(h+gap),w:A.W-sz(28),h,ci}))}
function viewChain(top){const k=C();st.box=chainBoxes(top);st.box.forEach(b=>{const n=st.done.indexOf(b.ci);tile(b.x,b.y,b.w,b.h,n<0?k.bg:'#dcfce7',n<0?k.fg:k.good);
  put(n<0?'·':String(n+1),b.x+sz(16),b.y+b.h/2,13,n<0?k.fg:k.ink,900);put(K.CHAIN[b.ci],b.x+sz(32),b.y+b.h/2,11,n<0?k.fg:k.ink,700,'left')})}
function pickLink(ci){if(st.done.includes(ci))return;const want=st.done.length;if(ci!==want){miss(K.CHAINWHY[want]);return}st.done.push(ci);A.sound.tick();tools();
 if(st.done.length===K.CHAIN.length){good('The chain broke from the bottom: no light, no plants, then no food for animals.');return}info(`${want+1}. ${K.CHAIN[ci]}.`)}
/* step 5: sort survivors */
function viewSort(top){const k=C(),a=K.ANIMALS[st.n],w=A.W*.42,mid=top+(A.H-top-sz(70))/2;
 tile(sz(10),top+sz(6),A.W*.27,A.H-top-sz(84),k.dk?'#4c0519':'#ffe4e6',k.bad);put('Died out',sz(10)+A.W*.135,top+sz(22),12,k.dk?'#ffe4e6':k.bad,900);
 tile(A.W*.73-sz(10),top+sz(6),A.W*.27,A.H-top-sz(84),k.dk?'#052e16':'#dcfce7',k.good);put('Survived',A.W*.865-sz(10),top+sz(22),12,k.dk?'#dcfce7':k.good,900);
 const tallyL=st.put.filter(p=>!p.side).map(p=>K.ANIMALS[p.n].name),tallyR=st.put.filter(p=>p.side).map(p=>K.ANIMALS[p.n].name);
 tallyL.forEach((t,j)=>put(t,sz(10)+A.W*.135,top+sz(44)+j*sz(15),9,k.dk?'#ffe4e6':k.bad,700));tallyR.forEach((t,j)=>put(t,A.W*.865-sz(10),top+sz(44)+j*sz(15),9,k.dk?'#dcfce7':k.good,700));
 if(!a){put('all sorted',A.W/2,mid,13,k.fg,900);return}const cx=A.W/2+(st.dx||0);st.card={x:cx-A.W*.21,y:mid-sz(30),w:A.W*.42,h:sz(60)};tile(st.card.x,st.card.y,st.card.w,st.card.h,'#ffffff',k.ink);
 split(a.name,st.card.w-10,12).forEach((r,j,arr)=>put(r,cx,mid+(j-(arr.length-1)/2)*sz(15),12,k.ink,900));put('← drag →',A.W/2,mid+sz(46),10,k.soft,700)}
function sortTo(side){const a=K.ANIMALS[st.n];st.dx=0;if(!a)return;if(+side!==a.lived){miss(a.why);return}st.put.push({n:st.n,side});st.n++;A.sound.tick();
 if(st.n>=K.ANIMALS.length){good('Sorted. The big animals and the sea animals that needed sunlight-fed food died out; small, flexible eaters lived on.');tools();return}info(a.why);tools()}
/* step 6: build a survivor */
function viewBuild(top){const k=C(),rowH=(A.H-top-sz(150))/K.BUILD.length;st.box=[];K.BUILD.forEach((b,i)=>{const y=top+i*rowH;put(b.q,sz(14),y+sz(10),11,k.fg,900,'left');
  b.opts.forEach((o,j)=>{const w=(A.W-sz(36))/2,x=sz(14)+j*(w+sz(8)),yy=y+sz(22),h=Math.max(sz(34),rowH-sz(30));const on=st.pick[b.k]===j;tile(x,yy,w,h,on?'#ede9fe':k.bg,on?'#7c3aed':k.fg);
   split(o[0],w-10,10).forEach((r,m,arr)=>put(r,x+w/2,yy+h/2+(m-(arr.length-1)/2)*sz(13),10,on?k.ink:k.fg,800));st.box.push({x,y:yy,w,h,i,j})})});
 const sc=score(),y=A.H-sz(132),bw=A.W-sz(28);tile(sz(14),y,bw,sz(16),k.cover);g.fillStyle=sc>=6?'#16a34a':sc>=3?'#d97706':'#dc2626';g.fillRect(sz(14),y,bw*sc/6,sz(16));put(!Object.keys(st.pick).length?'pick one in each row':`survival chance: ${['very low','very low','low','low','some','good','best'][sc]}`,A.W/2,y+sz(30),12,k.fg,900)}
const score=()=>K.BUILD.reduce((t,b)=>t+(st.pick[b.k]==null?0:b.opts[st.pick[b.k]][1]),0);
function choose(i,j){const b=K.BUILD[i];st.pick[b.k]=j;A.sound.tick();const o=b.opts[j];if(score()===6&&K.BUILD.every(x=>st.pick[x.k]!=null)){good(o[2]+' All three survivor traits.');return}(o[1]?info:miss)(o[2])}
const stage=()=>['dig','probe','crater','chain','sort','build','quiz'][A.step];
function draw(a){g=a.ctx;const k=C(),w=stage();g.fillStyle=k.bg;g.fillRect(0,0,A.W,A.H);
 if(w==='quiz'){put('The K-Pg extinction',A.W/2,A.H*.34,16,k.fg,900);put('layers · iridium · crater · survivors',A.W/2,A.H*.5,12,k.soft,700);A.fx.draw(g);return}
 const top=banner(st.title||'');({dig:viewDig,probe:viewProbe,crater:viewCraters,chain:viewChain,sort:viewSort,build:viewBuild})[w](top);status();A.fx.draw(g)}
function reset(o){tok++;hold=null;Object.keys(st).forEach(x=>delete st[x]);Object.assign(st,{say:'',no:false,test:()=>{},dug:0,mark:null,ages:0,at:0,seen:new Set([0]),hit:null,rock:null,order:[2,0,4,1,3],done:[],n:0,put:[],dx:0,pick:{}},o||{})}
function play(i,list){const me=tok;list.forEach((f,j)=>setTimeout(()=>{if(me===tok&&A.step===i)f()},A.reduced()?25*(j+1):280*(j+1)))}
const when=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function tools(){if(!ctl)return;ctl.innerHTML='';const w=stage(),add=(t,f)=>{c.el('button',{type:'button',class:'lbtn'},ctl,t).onclick=f};
 if(w==='dig'){if(st.dug<NL)add('Dig down one layer',dig);else L.forEach((l,i)=>add(l.name,()=>markEnd(i)))}
 if(w==='probe'){add('Probe up ↑',()=>moveProbe(-1));add('Probe down ↓',()=>moveProbe(1));add('This layer is highest',pickHigh)}
 if(w==='crater')K.CRATERS.forEach((cr,i)=>add('Drop on '+cr.name,()=>dropOn(i)));
 if(w==='chain')st.order.filter(ci=>!st.done.includes(ci)).forEach(ci=>add(K.CHAIN[ci],()=>pickLink(ci)));
 if(w==='sort'&&st.n<K.ANIMALS.length){add('← Died out',()=>sortTo(0));add('Survived →',()=>sortTo(1))}
 if(w==='build')K.BUILD.forEach((b,i)=>b.opts.forEach((o,j)=>add(`${b.q}: ${o[0]}`,()=>choose(i,j))))}
const inside=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function down(p){const w=stage();if(w==='quiz')return false;
 if(w==='dig'){const b=(st.box||[]).find(r=>inside(p,r));if(!b)return true;if(st.dug<NL){if(b.i===st.dug)dig();else if(b.i>st.dug)miss('Dig from the top down: open the next covered layer first.');return true}markEnd(b.i);return true}
 if(w==='probe'){hold={probe:1};return true}
 if(w==='crater'){hold={rock:1};st.rock={x:p.x,y:p.y};A.redraw();return true}
 if(w==='chain'){const b=(st.box||[]).find(r=>inside(p,r));if(b)pickLink(b.ci);return true}
 if(w==='sort'){if(inside(p,st.card))hold={x0:p.x};return true}
 if(w==='build'){const b=(st.box||[]).find(r=>inside(p,r));if(b)choose(b.i,b.j);return true}return true}
function move(p){if(!hold)return;const w=stage();
 if(w==='probe'){const b=(st.box||[]).find(r=>p.y>=r.y&&p.y<=r.y+r.h);if(b&&b.i!==st.at)moveProbe(b.i-st.at)}
 if(w==='crater'){st.rock={x:p.x,y:p.y};A.redraw()}
 if(w==='sort'&&hold.x0!=null){st.dx=p.x-hold.x0;A.redraw()}}
function up(){const h=hold;hold=null;if(!h)return;const w=stage();
 if(w==='crater'&&st.rock){const b=(st.box||[]).find(r=>inside(st.rock,r));if(b)dropOn(b.i);else{st.rock=null;A.redraw()}}
 if(w==='sort'){if(st.dx<-A.W*.18)sortTo(0);else if(st.dx>A.W*.18)sortTo(1);else{st.dx=0;A.redraw()}}}
const steps=[
{h:'Read the layers',p:K.STEPP[0],
 predict:{q:'In a cliff of rock layers, which layers are the oldest?',opts:['The top ones','The bottom ones','They are all the same age'],ans:1},
 task:'Dig to the bottom, then find where the dinosaurs stop',show:()=>play(0,[dig,dig,dig,dig,dig,dig,()=>markEnd(3)]),
 go:()=>{reset({title:K.TITLE[0]});voice(K.SAY[0]);tools();st.test=when(0,()=>st.mark===3,K.DONE[0])}},
{h:'The iridium clue',p:K.STEPP[1],
 predict:{q:'Iridium is rare in rocks at Earth\'s surface. Where is it much more common?',opts:['In sea water','In asteroids','In dinosaur bones'],ans:1},
 task:'Find the layer with the most iridium',show:()=>play(1,[()=>moveProbe(1),()=>moveProbe(1),()=>moveProbe(1),pickHigh]),
 go:()=>{reset({title:K.TITLE[1],dug:NL,brief:1});voice(K.SAY[1]);tools();st.test=when(1,()=>st.mark===3,K.DONE[1])}},
{h:'Find the crater',p:K.STEPP[2],
 task:'Drop the asteroid on the crater that fits',show:()=>play(2,[()=>dropOn(2)]),
 go:()=>{reset({title:K.TITLE[2]});voice(K.SAY[2]);tools();st.test=when(2,()=>st.hit===2,K.DONE[2])}},
{h:'Food chains break',p:K.STEPP[3],
 predict:{q:'What killed most of the dinosaurs?',opts:['Rocks from the asteroid hit each one','Food ran out when sunlight was blocked','They all drowned in the waves'],ans:1},
 task:'Put the five events in order',show:()=>play(3,[0,1,2,3,4].map(i=>()=>pickLink(i))),
 go:()=>{reset({title:K.TITLE[3]});voice(K.SAY[3]);tools();st.test=when(3,()=>st.done.length===K.CHAIN.length,K.DONE[3])}},
{h:'Who survived?',p:K.STEPP[4],
 predict:{q:'Did any dinosaurs survive?',opts:['No, none at all','Yes, the birds','Yes, Triceratops in caves'],ans:1},
 task:'Sort all eight groups',show:()=>play(4,K.ANIMALS.map(a=>()=>sortTo(a.lived))),
 go:()=>{reset({title:K.TITLE[4]});voice(K.SAY[4]);tools();st.test=when(4,()=>st.n>=K.ANIMALS.length,K.DONE[4])}},
{h:'Build a survivor',p:K.STEPP[5],
 task:'Give your animal the best chance',show:()=>play(5,[()=>choose(0,0),()=>choose(1,1),()=>choose(2,1)]),
 go:()=>{reset({title:K.TITLE[5]});voice(K.SAY[5]);tools();st.test=when(5,()=>score()===6,K.DONE[5])}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>st.test()});
function ask(){qn++;const [q,opts]=K.QZ[qn%K.QZ.length],rot=qn%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');opts.slice(rot).concat(opts.slice(0,rot)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>mark(t)});voice('Challenge: '+q);A.redraw()}
let streak=0;function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Correct! ${streak} in a row.`:'✗ '+(K.WHY[t]||'Look back at that lab step.'))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.45,draw,onStep:A=>{chal.hidden=A.step!==6;ctl.hidden=A.step===6;tools()},
 init:A=>{g=A.ctx;const box=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Dig site controls'},box);chal=c.el('div',{class:'fl-chal'},A.below);reset();
  A.gest({down,move,up});tools()}});
A.start()})})();
