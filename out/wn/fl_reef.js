/* Flagship: coral reefs (ages 7–9; NC England Y4 "living things and their habitats", Y2 habitats; NGSS 3-LS4-3 habitats
   and survival, 4-LS1-1 structures). Open tiny polyps to see coral is made of animals, grow a reef one century at a time,
   move a coral to find the warm, clear, sunny water it needs (and see bleaching), give six reef animals their homes, and
   pick why reefs are called rainforests of the sea. Drag or tap on the canvas, or use the buttons. */
(()=>{
const K={ink:'#0f172a',dim:'#334155',card:'#ffffff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',noBg:'#ffe4e6',tip:'#ecfeff',edge:'#1e293b',
 sea:'#cffafe',deep:'#155e75',lime:'#e2e8f0',limeInk:'#475569',polyp:'#f9a8d4',polypInk:'#831843',algae:'#a16207',sel:'#1d4ed8'};
const R=REEFART;
VIS.reg('flagreef',c=>{let A,X,pad,chal,qi=-1,tok=0;const G={after:()=>{}};
const z=n=>Math.round(n*(A.narrow?1:1.12));
const say=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${z(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)};
function wrap(s,maxW,n){X.font=`700 ${z(n)}px system-ui,sans-serif`;const out=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function box(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?10:r);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function label(s,x,y,w,h,n,col,wt){const L=wrap(s,w-12,n),lh=z(n)+3;L.forEach((r,i)=>say(r,x+w/2,y+h/2+(i-(L.length-1)/2)*lh,n,col,'center',wt))}
function banner(s,won){const L=wrap(s,A.W-40,13),lh=z(13)+4,h=Math.max(z(32),L.length*lh+12);box(10,8,A.W-20,h,won?K.okBg:K.tip,won?K.ok:K.edge,2,8);
 L.forEach((r,i)=>say(r,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?K.ok:K.ink));return 8+h}
function note(){if(!G.msg)return;const L=wrap((G.bad?'✗ ':'✓ ')+G.msg,A.W-44,12),lh=z(12)+5,h=L.length*lh+10,y=A.H-h-8;
 box(10,y,A.W-20,h,K.card,G.bad?K.no:K.ok,3,8);L.forEach((r,i)=>say(r,A.W/2,y+5+lh*(i+.5),12,G.bad?K.no:K.ink))}
const live=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const wrong=s=>{G.bad=true;G.msg=s;A.sound.miss();sync()};
const right=s=>{G.bad=false;G.msg=s;A.sound.pop();sync()};
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* ---- step 0: open the polyps ---- */
function openPolyp(i){if(G.won||G.open.has(i))return;G.open.add(i);A.sound.tick();
 if(G.open.size>=3){G.won=true;return right('Each bump is a polyp: a tiny soft animal, a cousin of jellyfish. Its tentacles catch plankton to eat.')}
 G.bad=false;G.msg=`A polyp opened its tentacles and caught plankton! ${3-G.open.size} more to open.`;sync()}
function polyp(x,y,r,on){if(on){X.strokeStyle=K.polypInk;X.lineWidth=2;for(let k=0;k<8;k++){const a=-Math.PI+k*Math.PI/7;X.beginPath();X.moveTo(x,y);X.lineTo(x+Math.cos(a)*r*2.1,y+Math.sin(a)*r*2.1);X.stroke();
  X.fillStyle=K.algae;X.beginPath();X.arc(x+Math.cos(a)*r*2.1,y+Math.sin(a)*r*2.1,2.5,0,7);X.fill()}}
 X.fillStyle=on?K.polyp:'#fbcfe8';X.strokeStyle=K.polypInk;X.lineWidth=2;X.beginPath();X.arc(x,y,r,0,7);X.fill();X.stroke();
 if(!on){X.fillStyle=K.polypInk;X.beginPath();X.arc(x,y,r*.25,0,7);X.fill()}}
function drawPolyps(t){const y0=t+z(10),h=A.H-y0-z(70);box(14,y0,A.W-28,h,K.sea,K.deep,2,12);say('Zoomed in on one coral branch',A.W/2,y0+z(14),12,K.deep);
 const base=y0+h-z(30);box(30,base,A.W-60,z(22),K.lime,K.limeInk,2,6);say('hard limestone cups',A.W/2,base+z(11),11,K.limeInk);
 const n=6,gx=(A.W-80)/n,r=Math.min(z(17),gx/4);G.polypHit=[];
 for(let i=0;i<n;i++){const x=40+gx*(i+.5),y=base-r-z(18)-(i%2)*z(22);polyp(x,y,r,G.open.has(i));G.polypHit.push({x:x-r*2.2,y:y-r*2.2,w:r*4.4,h:r*4.4,i})}}
/* ---- step 1: grow the reef ---- */
const GOAL=5;
function grow(){if(G.won)return;G.layers++;A.sound.tick();
 if(G.layers>=GOAL){G.won=true;return right(`${G.layers*100} years: the reef is ${G.layers} metres tall and reaches the sunny water. Only the top layer is alive; the rest is old limestone cups.`)}
 G.bad=false;G.msg=`${G.layers*100} years have passed. Old polyps died, but their cups stayed. New polyps grew on top.`;sync()}
function drawLayers(t){const y0=t+z(10),h=A.H-y0-z(70),x=14,w=A.W-28;box(x,y0,w,h,K.sea,K.deep,2,12);
 X.fillStyle='#fef9c3';X.fillRect(x+2,y0+2,w-4,z(24));say('Sunny water near the surface',A.W/2,y0+z(14),11,K.deep);
 const lh=(h-z(34))/(GOAL+.4),bx=x+w*.2,bw=w*.6;G.reefHit={x:bx,y:y0+z(28),w:bw,h:h-z(30)};
 for(let k=0;k<G.layers;k++){const y=y0+h-(k+1)*lh-4,top=k===G.layers-1;box(bx,y,bw,lh-3,top?K.polyp:K.lime,top?K.polypInk:K.limeInk,top?2.5:1.5,6);
  label(top?`Living polyps (${(k+1)*100} years)`:`Old cups, ${(k+1)*100} yrs`,bx,y,bw,lh-3,11,top?K.polypInk:K.limeInk,top?800:600)}
 if(!G.layers){say('Tap here to grow 100 years',A.W/2,y0+h-z(20),12,K.deep)}
 say(`${G.layers} m`,x+w*.1,y0+h-z(14),12,K.deep)}
/* ---- step 2: where can coral grow? ---- */
function place(i){if(G.won)return;G.at=i;const p=R.PLACES[i];G.tried.add(i);if(!p[1])return wrong(p[2]);G.won=true;right(p[2])}
function zones(t){const y0=t+z(10),cols=A.narrow?2:3,gap=z(8),w=(A.W-28-gap*(cols-1))/cols,rows=Math.ceil(R.PLACES.length/cols),h=Math.min(z(70),(A.H-y0-z(120))/rows-gap);
 return R.PLACES.map((p,i)=>({x:14+(i%cols)*(w+gap),y:y0+Math.floor(i/cols)*(h+gap),w,h,i}))}
const LOOK={dark:['#1e3a5f','#ffffff'],cold:['#dbeafe','#1e3a8a'],mud:['#d6c7a1','#422006'],hot:['#fed7aa','#7c2d12'],sun:['#a5f3fc','#164e63']};
function drawPlaces(t){G.zoneHit=zones(t);G.zoneHit.forEach(r=>{const p=R.PLACES[r.i],[bg,ink]=LOOK[p[3]],tried=G.tried.has(r.i);
  box(r.x,r.y,r.w,r.h,bg,ink,G.at===r.i?3.5:1.5,10);label(p[0]+(tried?(p[1]?' ✓':' ✗'):''),r.x,r.y,r.w,r.h,12,ink,800)});
 const last=G.zoneHit[G.zoneHit.length-1],ty=last.y+last.h+z(14),cr=z(20),cx=G.drag?G.drag.x:A.W/2,cy=G.drag?G.drag.y:ty+cr;
 G.coralHit={x:A.W/2-cr*1.6,y:ty,w:cr*3.2,h:cr*2.2};const bleached=G.at!=null&&R.PLACES[G.at][3]==='hot';
 X.fillStyle=bleached?'#f8fafc':K.polyp;X.strokeStyle=K.polypInk;X.lineWidth=2;for(const dx of[-1,0,1]){X.beginPath();X.ellipse(cx+dx*cr*.8,cy,cr*.45,cr*(dx?0.8:1),0,0,7);X.fill();X.stroke()}
 if(!G.drag)say(bleached?'Bleached coral':'Drag me',A.W/2,cy+cr+z(10),11,K.dim)}
/* ---- step 3: homes for reef animals ---- */
function house(a,h){if(G.won||G.home[a]!=null)return;const pet=R.PETS[a];G.pick=null;
 if(pet[1]!==h)return wrong(`Not there. The ${pet[0].toLowerCase()} needs something else: think about how it hides or feeds.`);
 G.home[a]=h;A.sound.pop();G.bad=false;G.msg=`${pet[0]}: ${pet[2]}`;
 if(R.PETS.every((_,k)=>G.home[k]!=null)){G.won=true;G.msg='Six kinds of animals, each using a different part of the reef. The bare sand next to it has almost no places to hide.'}sync()}
function drawHomes(t){const y0=t+z(8),gap=z(6),cols=3,w=(A.W-28-gap*2)/cols,ph=z(34);G.petHit=[];let k=0;
 R.PETS.forEach((p,i)=>{if(G.home[i]!=null)return;const x=14+(k%cols)*(w+gap),y=y0+Math.floor(k/cols)*(ph+gap);k++;
  const on=G.pick===i,r=G.drag&&G.drag.a===i?{x:G.drag.x-w/2,y:G.drag.y-ph/2}:{x,y};box(r.x,r.y,w,ph,on?'#dbeafe':K.card,on?K.sel:K.edge,on?3:1.5,16);label(p[0],r.x,r.y,w,ph,12,K.ink,800);G.petHit.push({x,y,w,h:ph,i})});
 const hy=y0+2*(ph+gap)+z(10),hh=Math.min(z(54),(A.H-hy-z(64))/2-gap);G.homeHit=R.HOMES.map((s,i)=>{const x=14+(i%cols)*(w+gap),y=hy+Math.floor(i/cols)*(hh+gap),who=R.PETS.findIndex((p,a)=>G.home[a]===i);
  box(x,y,w,hh,who>=0?K.okBg:K.sea,who>=0?K.ok:K.deep,who>=0?3:1.5,10);label(s+(who>=0?': '+R.PETS[who][0]:''),x,y,w,hh,11,who>=0?K.ok:K.deep,700);return{x,y,w,h:hh,i}})}
/* ---- step 4: rainforests of the sea ---- */
function reason(i){if(G.won||G.got.has(i))return;const r=R.WHY[i];if(!r[1])return wrong(r[2]);G.got.add(i);
 if(G.got.size===3){G.won=true;return right('Like a rainforest, a reef packs a huge variety of life into layers and hiding places. Reefs cover less than 1% of the sea floor but hold about a quarter of all sea species.')}
 G.bad=false;G.msg=`Yes. ${3-G.got.size} more.`;A.sound.tick();sync()}
function drawWhy(t){const y0=t+z(10),gap=z(8),w=(A.W-28-gap)/2,h=Math.min(z(52),(A.H-y0-z(70))/3-gap);G.whyHit=R.WHY.map((r,i)=>{const x=14+(i%2)*(w+gap),y=y0+Math.floor(i/2)*(h+gap),on=G.got.has(i);
  box(x,y,w,h,on?K.okBg:K.card,on?K.ok:K.edge,on?3:1.5,10);label((on?'✓ ':'')+r[0],x,y,w,h,12,on?K.ok:K.ink,on?800:600);return{x,y,w,h,i}})}
/* ---- input and drawing ---- */
const kind=()=>['polyps','layers','places','homes','why','quiz'][A.step];
function down(p){const k=kind(),hit=L=>(L||[]).find(r=>inside(p,r));
 if(k==='polyps'){const r=hit(G.polypHit);if(r){openPolyp(r.i);return true}}
 if(k==='layers'&&inside(p,G.reefHit)){grow();return true}
 if(k==='places'){if(inside(p,G.coralHit)&&!G.won){G.drag={x:p.x,y:p.y};A.redraw();return true}const r=hit(G.zoneHit);if(r){place(r.i);return true}}
 if(k==='homes'){const a=hit(G.petHit);if(a){G.pick=a.i;G.drag={a:a.i,x:p.x,y:p.y};A.sound.tick();sync();return true}const h=hit(G.homeHit);if(h&&G.pick!=null){house(G.pick,h.i);return true}}
 if(k==='why'){const r=hit(G.whyHit);if(r){reason(r.i);return true}}
 return false}
function move(p){if(!G.drag)return;G.drag.x=p.x;G.drag.y=p.y;A.redraw()}
function up(p){const d=G.drag;G.drag=null;if(!d){A.redraw();return}const k=kind();
 if(k==='places'){const r=(G.zoneHit||[]).find(q=>inside(p,q));if(r)place(r.i);else A.redraw()}
 if(k==='homes'){const r=(G.homeHit||[]).find(q=>inside(p,q));if(r)house(d.a,r.i);else A.redraw()}}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const k=kind();let t;
 if(k==='polyps'){t=banner(G.won?'Coral is made of tiny animals called polyps.':'Tap the bumps on the coral to see what they are. Open 3.',G.won);drawPolyps(t)}
 if(k==='layers'){t=banner(G.won?'A reef is built by many generations of polyps, slowly.':'Tap the reef to let 100 years pass. Grow it up to the sunny water.',G.won);drawLayers(t)}
 if(k==='places'){t=banner(G.won?'Reef coral needs warm, clear, shallow, sunny water.':'Drag the coral to a place, or tap a place. Where does it grow best?',G.won);drawPlaces(t)}
 if(k==='homes'){t=banner(G.won?'Every nook of a reef is someone’s home or food.':'Drag each animal to the part of the reef it uses. Or tap the animal, then the place.',G.won);drawHomes(t)}
 if(k==='why'){t=banner(G.won?'A small area, a huge variety of life: the rainforests of the sea.':'Why are reefs called rainforests of the sea? Tap the 3 true reasons.',G.won);drawWhy(t)}
 if(k==='quiz'){t=banner('Coral: tiny animals, limestone cups, sunny algae, and a home for a huge variety of life.');drawPolyps(t)}
 note();A.fx.draw(X)}
function sync(){const k=kind();let d='Challenge.';
 if(k==='polyps')d=`Coral branch with 6 bumps. Opened: ${G.open.size}.`;
 if(k==='layers')d=`Reef layers: ${G.layers} of ${GOAL}. ${G.layers*100} years. Only the top layer is alive.`;
 if(k==='places')d='Places: '+R.PLACES.map((p,i)=>p[0]+(G.tried.has(i)?(p[1]?' (grows)':' (does not grow)'):'')).join('; ')+'.';
 if(k==='homes')d='Animals housed: '+(R.PETS.filter((_,a)=>G.home[a]!=null).map(p=>p[0]).join(', ')||'none')+(G.pick!=null?`. Picked: ${R.PETS[G.pick][0]}.`:'.');
 if(k==='why')d='Reasons chosen: '+([...G.got].map(i=>R.WHY[i][0]).join('; ')||'none')+'.';
 live((G.msg?G.msg+' ':'')+d);buttons();G.after()}
function buttons(){if(!pad)return;pad.innerHTML='';const k=kind(),b=(t,fn,aria)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':aria||null},pad,t).onclick=()=>{fn();sync()}};
 if(k==='polyps'&&!G.won)[0,1,2,3,4,5].forEach(i=>{if(!G.open.has(i))b('Open bump '+(i+1),()=>openPolyp(i))});
 if(k==='layers'&&!G.won)b('Grow 100 years',grow);
 if(k==='places'&&!G.won)R.PLACES.forEach((p,i)=>b('Put coral in: '+p[0],()=>place(i)));
 if(k==='homes'&&!G.won){if(G.pick==null)R.PETS.forEach((p,i)=>{if(G.home[i]==null)b('Pick: '+p[0],()=>{G.pick=i;A.sound.tick()})});
  else{R.HOMES.forEach((s,i)=>b(`Put the ${R.PETS[G.pick][0].toLowerCase()} at: ${s}`,()=>house(G.pick,i)));b('Pick another animal',()=>{G.pick=null})}}
 if(k==='why'&&!G.won)R.WHY.forEach((r,i)=>{if(!G.got.has(i))b(r[0],()=>reason(i))});
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();sync()}},(j+1)*(A.reduced()?30:ms)))};
function reset(){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,open:new Set(),layers:0,at:null,tried:new Set(),drag:null,home:{},pick:null,got:new Set()})}
const steps=[
{h:'Rock, plant or animal?',p:'Coral feels hard like rock and can look like a plant. Zoom in close. Each little bump on a coral branch is something alive.',
predict:{q:'What is coral really?',opts:['A kind of rock','A sea plant','Lots of tiny animals'],ans:2},
task:'Open 3 of the bumps on the coral',show:()=>{steps[0].go();play([0,2,4].map(i=>()=>openPolyp(i)),450)},go:()=>{reset();sync();G.after=settle(0,()=>G.won,'Coral is made by tiny animals called polyps.')}},
{h:'Building a reef',p:'Each polyp builds a hard cup of limestone under its soft body. When a polyp dies, its cup stays. New polyps grow on top of the old cups, layer after layer.',
predict:{q:'How fast does a coral reef grow?',opts:['About a metre a week','Only a little each year, often about a centimetre','It does not grow: it is rock'],ans:1},
task:'Grow the reef up to the sunny water',show:()=>{steps[1].go();play([1,2,3,4,5].map(()=>grow),350)},go:()=>{reset();sync();G.after=settle(1,()=>G.won,'5 m took 500 years. Big reefs took thousands of years.')}},
{h:'Where can coral grow?',p:'Tiny algae live inside each polyp. Like plants, the algae use sunlight to make food, and they share it with the polyp. They also give coral its colours.',
predict:{q:'Polyps catch plankton. Do they need sunlight too?',opts:['No: they are animals, so light does not matter','Yes: the algae inside them need light to make food','Yes, because coral is a plant'],ans:1},
task:'Find the place where the coral grows best',show:()=>{steps[2].go();play([()=>place(3),()=>place(4)],700)},go:()=>{reset();sync();G.after=settle(2,()=>G.won,'Warm, clear, shallow and sunny.')}},
{h:'A home for many',p:'A reef is full of caves, cracks, ledges and branches. Each one gives some animal a place to hide, rest or find food.',
task:'Give all 6 animals the part of the reef they use',show:()=>{steps[3].go();play(R.PETS.map((p,a)=>()=>house(a,p[1])),380)},go:()=>{reset();sync();G.after=settle(3,()=>G.won,'Many hiding places means many kinds of animals.')}},
{h:'Rainforests of the sea',p:'People call coral reefs the rainforests of the sea. Think about what a rainforest and a reef have in common.',
task:'Tap the 3 true reasons for the name',show:()=>{steps[4].go();play([0,1,2].map(i=>()=>reason(i)),450)},go:()=>{reset();sync();G.after=settle(4,()=>G.won,'Variety, layers and lots of life in a small area.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
function ask(){qi++;const [q,ans,wrongs]=R.bank[qi%R.bank.length],all=[[ans,'ok']].concat(wrongs),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});live('Challenge: '+q);A.redraw()}
let streak=0;
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';let m=R.WHYM[tag]||'Think about what polyps are and what their algae need.';
 if(tag==='rock')m='Coral is hard because polyps build limestone cups. The builders are tiny living animals, not rock.';
 if(tag==='plant')m='The algae inside are plant-like, but coral itself is made of animals that catch food with tentacles.';
 if(tag==='white')m='White coral in hot water is bleached: it has lost the algae that feed it and can starve.';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Coral reef lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
