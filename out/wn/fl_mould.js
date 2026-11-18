/* Flagship – mould and mushrooms are fungi (ages 5–7): leave bread out for a week and watch mould spots grow, sort
   fungi from plants, find the places fungi grow (old food, rotting wood, dead leaves), drag a fungus onto dead things
   and watch them break down into soil, and sort what is safe to do when you find a wild mushroom.
   The Challenge targets the usual slips: mould is just dirt or colour, a mushroom is a plant, wild mushrooms are fine
   to taste, fungi grow on clean dry things, fungi do nothing, and mould appears from nowhere. */
(()=>{const FP=[['🍄','Mushroom',0],['🌼','Daisy',1],['🦠','Bread mould',0],['🌳','Tree',1],['🍄','Toadstool',0],['🌱','Grass',1]];
const SAFE=[['👀','Look with my eyes',0],['😋','Taste a park mushroom',1],['🙋','Tell a grown-up',0],['🍞','Eat bread with mould on',1],['🧼','Wash hands after',0],['✋','Pick a toadstool to eat',1]];
const SPOTS=[[.22,.3],[.7,.62],[.45,.75],[.8,.25],[.3,.6],[.58,.38],[.15,.78],[.66,.14],[.4,.18],[.86,.8],[.5,.55],[.24,.46],[.74,.44],[.36,.88]];
const PLACES=[['🍞','Old bread',1],['🪨','A stone',0],['🍂','Dead leaves',1],['🍽️','Clean plate',0],['🪵','Rotting log',1],['🍊','Old orange',1]];
const DEAD=[['🍂','Leaf'],['🪵','Log'],['🍎','Apple core']];
VIS.reg('flagmould',c=>{let A,ctl,chal,qi=-1,run=0;c.fig.classList.add('young');
const S={};
const view=()=>['bread','sortfp','places','rot','safe','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fs=n=>Math.round(n*(A.narrow?1.05:1.2));
function txt(g,s,x,y,n,wt){g.font=`${wt||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(s,x,y,A.W-10)}
function card(g,r,col,a,ring){g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=ring?4:2;g.strokeStyle=ring==='bad'?A.col.rd:ring==='ok'?A.col.gr:A.col.tx;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke()}
const inR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const binR=k=>{const w=(A.W-30)/2;return{x:10+k*(w+10),y:A.H*.66,w,h:A.H*.3}};
const cardR=()=>{const w=Math.min(A.W*.5,240),h=A.H*.4;return{x:(A.W-w)/2,y:A.H*.13,w,h}};
const placeR=i=>{const cols=3,w=(A.W-40)/cols,h=A.H*.38;return{x:10+(i%cols)*(w+10),y:A.H*.14+Math.floor(i/cols)*(h+8),w,h}};
const deadR=i=>{const w=(A.W-40)/3;return{x:10+i*(w+10),y:A.H*.12,w,h:A.H*.5}};
const shroomR=()=>({x:A.W/2-A.H*.09,y:A.H*.74,w:A.H*.18,h:A.H*.2});
const list=()=>view()==='safe'?SAFE:FP,bins=()=>view()==='safe'?['✅ Safe','⛔ Not safe']:['🍄 Fungus','🌱 Plant'];
function draw(A){const{ctx:g,W,H,col:C}=A,v=view();g.fillStyle=A.mix(C.pn,'#ecfccb',C.dark?.05:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'🍄 Fungi are alive',W/2,H*.25,20,800);txt(g,'They are not plants',W/2,H*.45,18,700);txt(g,'Look, do not eat',W/2,H*.65,18,700);return}
 if(v==='bread'){const b={x:W*.25,y:H*.12,w:W*.5,h:H*.55};g.fillStyle=A.mix('#d6a96b',C.pn,C.dark?.25:0);A.paint.rrect(b.x,b.y,b.w,b.h,b.w*.18);g.fill();g.lineWidth=3;g.strokeStyle=C.tx;g.stroke();
  const d=S.day;SPOTS.slice(0,d*2).forEach(([u,w],i)=>{const r=Math.min(b.w,b.h)*(.03+.012*(d-Math.floor(i/2)));g.fillStyle=i%3?'#2f7d5b':'#3b6fb6';g.globalAlpha=.85;g.beginPath();g.arc(b.x+u*b.w,b.y+w*b.h,r,0,7);g.fill();g.globalAlpha=1});
  txt(g,d?`Day ${d}`:'Day 0: fresh bread',W/2,H*.05,14,800);
  const t=barR();g.fillStyle=A.alpha(C.tx,.15);A.paint.rrect(t.x,t.y,t.w,t.h,t.h/2);g.fill();g.fillStyle=C.vi;g.beginPath();g.arc(t.x+t.w*d/7,t.y+t.h/2,t.h*.9,0,7);g.fill();g.lineWidth=2;g.strokeStyle=C.tx;g.stroke();
  txt(g,d>=7?'Fuzzy mould has grown. It is alive!':'Drag the dot, or tap Next day',W/2,H*.94,12,700)}
 if(v==='sortfp'||v==='safe'){const L=list(),done=S.k>=L.length;if(!done){const[e,n]=L[S.k],r=S.hold?{...cardR(),x:S.hold.x-cardR().w/2,y:S.hold.y-cardR().h/2}:cardR();card(g,r,C.or,.18,S.oops?'bad':0);txt(g,e,r.x+r.w/2,r.y+r.h*.4,34);txt(g,n,r.x+r.w/2,r.y+r.h*.8,14,800)}
  else txt(g,'All sorted!',W/2,H*.32,18,800);bins().forEach((n,k)=>{const r=binR(k);card(g,r,k?C.cy:C.gr,.14,0);txt(g,n,r.x+r.w/2,r.y+r.h*.3,14,800);txt(g,String(S.put[k].length),r.x+r.w/2,r.y+r.h*.68,16,800)});
  txt(g,`${Math.min(S.k,L.length)} of ${L.length}`,W/2,H*.06,12,700)}
 if(v==='places'){PLACES.forEach(([e,n],i)=>{const r=placeR(i),f=S.found.includes(i);card(g,r,f?C.gr:C.am,f?.28:.1,S.oops===i?'bad':f?'ok':0);txt(g,e,r.x+r.w/2,r.y+r.h*.38,26);txt(g,n,r.x+r.w/2,r.y+r.h*.8,12,800);if(f)txt(g,'🍄',r.x+r.w*.85,r.y+r.h*.18,14)});
  txt(g,`Fungi found here: ${S.found.length} of 4`,W/2,H*.06,13,800)}
 if(v==='rot'){DEAD.forEach(([e,n],i)=>{const r=deadR(i),k=S.rot[i]||0;card(g,r,C.or,.1,k>=1?'ok':0);g.globalAlpha=1-k*.85;txt(g,e,r.x+r.w/2,r.y+r.h*.35,30);g.globalAlpha=1;
   const mh=r.h*.3*k;g.fillStyle='#6b4423';g.beginPath();g.ellipse(r.x+r.w/2,r.y+r.h*.86,r.w*.38,Math.max(1,mh*.6),0,Math.PI,0);g.fill();txt(g,k>=1?'Soil!':n,r.x+r.w/2,r.y+r.h*.94,12,800)});
  const s=S.hold?{...shroomR(),x:S.hold.x-shroomR().w/2,y:S.hold.y-shroomR().h/2}:shroomR();txt(g,'🍄',s.x+s.w/2,s.y+s.h/2,30);
  txt(g,'Drag the mushroom onto a dead thing',W/2,H*.68,12,700)}
 A.fx.draw(g)}
const barR=()=>({x:A.W*.12,y:A.H*.78,w:A.W*.76,h:Math.max(12,A.H*.04)});
const bad=(t,mark)=>{S.oops=mark;A.sound.miss();tell(t);A.redraw()},good=t=>{S.oops=null;A.sound.pop();tell(t);pad();A.redraw();S.want()};
/* step 0 */
function setDay(d){d=Math.max(0,Math.min(7,d));if(d===S.day)return;S.day=d;A.sound.tick();
 tell(d<2?`Day ${d}. The bread looks fine.`:d<7?`Day ${d}. Spots are growing and spreading.`:'Day 7. Fuzzy mould all over. Mould is a fungus. It is alive.');pad();A.redraw();if(d>=7)good('Day 7: the mould grew from tiny spots. Mould is a living fungus.')}
/* steps 1 and 4 */
function drop(k){const L=list();if(S.k>=L.length)return;const[,n,ans]=L[S.k];S.hold=null;
 if(k!==ans){const msg=view()==='safe'?(ans?`${n}: not safe. Wild mushrooms and mould can make you very ill.`:`${n}: that is safe to do.`):(ans?`${n} has green leaves and needs light. It is a plant.`:`${n} is not a plant. It has no green leaves. It is a fungus.`);return bad(msg,1)}
 S.put[k].push(S.k);S.k++;S.oops=null;A.sound.tick();if(S.k>=L.length)return good(view()==='safe'?'Look, tell a grown-up, wash your hands. Never eat a wild mushroom.':'Mushrooms, toadstools and mould are fungi. Daisies, trees and grass are plants.');tell(`Yes! ${n}.`);pad();A.redraw()}
/* step 2 */
function tapPlace(i){if(S.found.includes(i))return;const[,n,yes]=PLACES[i];if(!yes)return bad(`${n}: nothing old to eat there. Fungi grow on old food and dead plants.`,i);
 S.found.push(i);S.oops=null;A.sound.tick();if(S.found.length>=4)return good('Old bread, old oranges, dead leaves and rotting logs. Fungi feed on old and dead things.');tell(`Yes! Fungi grow on ${n.toLowerCase()}.`);pad();A.redraw()}
/* step 3 */
function feed(i){S.hold=null;if((S.rot[i]||0)>0){tell('That one is done. Try another.');return A.redraw()}const R=S.rot;R[i]=.01;A.sound.tick();
 A.tween(R,{[i]:1},A.reduced()?10:900,'io',()=>{if(R!==S.rot)return;R[i]=1;const n=R.filter(x=>x>=1).length;n>=3?good('The fungus broke them all down into soil. Fungi tidy up dead things.'):(tell(`The ${DEAD[i][1].toLowerCase()} broke down into soil.`),pad(),A.redraw())})}
function pad(){if(!ctl)return;ctl.innerHTML='';const v=view(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='bread'&&S.day<7)B('➡️ Next day',()=>setDay(S.day+1),'Go to the next day');
 if((v==='sortfp'||v==='safe')&&S.k<list().length)bins().forEach((n,k)=>B(n,()=>drop(k),`Put ${list()[S.k][1]} in ${n.slice(2)}`));
 if(v==='places')PLACES.forEach(([,n],i)=>{if(!S.found.includes(i))B(n,()=>tapPlace(i),`Do fungi grow on ${n.toLowerCase()}?`)});
 if(v==='rot')DEAD.forEach(([,n],i)=>{if(!S.rot[i])B('🍄 '+n,()=>feed(i),`Put the fungus on the ${n.toLowerCase()}`)})}
function down(p){const v=view();
 if(v==='bread'){const t=barR();if(p.y>t.y-30&&p.y<t.y+t.h+30){S.drag=1;setDay(Math.round((p.x-t.x)/t.w*7));return true}return false}
 if((v==='sortfp'||v==='safe')&&S.k<list().length){if(inR(p,cardR())){S.hold={x:p.x,y:p.y,x0:p.x,y0:p.y};return true}[0,1].forEach(k=>{if(inR(p,binR(k)))drop(k)});return false}
 if(v==='places'){PLACES.forEach((_,i)=>{if(inR(p,placeR(i)))tapPlace(i)});return false}
 if(v==='rot'){if(inR(p,shroomR())){S.hold={x:p.x,y:p.y};return true}DEAD.forEach((_,i)=>{if(inR(p,deadR(i)))feed(i)});return false}return false}
function move(p){if(view()==='bread'&&S.drag){const t=barR();return setDay(Math.round((p.x-t.x)/t.w*7))}if(S.hold){S.hold.x=p.x;S.hold.y=p.y;A.redraw()}}
function up(p){S.drag=0;const h=S.hold,v=view();if(!h)return;
 if(v==='rot'){const i=DEAD.findIndex((_,j)=>inR(p,deadR(j)));if(i>=0)return feed(i)}
 else{const k=[0,1].find(j=>inR(p,binR(j)));if(k!=null)return drop(k)}S.hold=null;A.redraw()}
const check=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const seq=(fns,ms)=>{const k=++S.tok;fns.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*20+20:(j+1)*ms))};
const reset=()=>{const t=(S.tok||0)+1;Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,{tok:t,want:()=>{},day:0,k:0,put:[[],[]],oops:null,hold:null,found:[],rot:[0,0,0],drag:0})};
const steps=[
{h:'Watch the bread',p:'Leave a slice of bread in a warm, damp place. Look at it each day for a week.',predict:{q:'After a week, what will the bread look like?',opts:['Fuzzy spots grow on it','It looks just the same','It grows into a plant'],ans:0},task:'Watch for 7 days',
 show:()=>{steps[0].go();seq([1,2,3,4,5,6,7].map(d=>()=>setDay(d)),300)},
 go:()=>{reset();tell('Day 0. Fresh bread. Tap Next day.');pad();S.want=check(0,()=>S.day>=7,'Mould grew on the bread. It is a living thing called a fungus.')}},
{h:'Fungus or plant?',p:'Mushrooms, toadstools and mould are fungi. They are alive, but they are not plants. They have no green leaves.',predict:{q:'Is a mushroom a plant?',opts:['Yes, it is a plant','No, it is a fungus'],ans:1},task:'Sort 6 living things',
 show:()=>{steps[1].go();seq(FP.map(([,,a])=>()=>drop(a)),450)},
 go:()=>{reset();tell('Drag the card to Fungus or Plant, or tap a box.');pad();S.want=check(1,()=>S.k>=FP.length,'Fungi are a different group from plants.')}},
{h:'Where fungi grow',p:'Fungi feed on old food and dead plants. Tap every place where fungi can grow.',task:'Find 4 places',
 show:()=>{steps[2].go();seq([0,2,4,5].map(i=>()=>tapPlace(i)),450)},
 go:()=>{reset();tell('Tap the places where fungi grow.');pad();S.want=check(2,()=>S.found.length>=4,'Fungi grow where there is something old or dead to feed on.')}},
{h:'Fungi tidy up',p:'Fungi break down dead leaves, logs and old fruit. What is left turns into soil.',predict:{q:'A fungus grows on a dead leaf. What happens to the leaf?',opts:['It turns back green','It breaks down into soil','It turns into a mushroom'],ans:1},task:'Break down 3 dead things',
 show:()=>{steps[3].go();seq([0,1,2].map(i=>()=>feed(i)),1000)},
 go:()=>{reset();tell('Drag the mushroom onto the leaf, the log or the apple core.');pad();S.want=check(3,()=>S.rot.filter(x=>x>=1).length>=3,'Fungi break dead things down. That makes new soil for plants.')}},
{h:'Look, do not eat',p:'Some wild mushrooms are poison. Never eat one you find, and never eat mouldy food.',task:'Sort 6 things to do',
 show:()=>{steps[4].go();seq(SAFE.map(([,,a])=>()=>drop(a)),450)},
 go:()=>{reset();tell('Is it safe? Drag the card or tap a box.');pad();S.want=check(4,()=>S.k>=SAFE.length,'Look with your eyes, tell a grown-up, wash your hands.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Is the fuzzy mould on old bread alive?',[['Yes, it is a fungus','ok'],['No, it is just dirt','dirt'],['No, the bread changed colour','colour']]],
 ['Is a mushroom a plant?',[['No, it is a fungus','ok'],['Yes, it is a plant','plant'],['No, it is an animal','animal']]],
 ['You find a mushroom in the park. What do you do?',[['Look, but do not eat it','ok'],['Taste a little bit','eat'],['Take it home for tea','eat']]],
 ['Where does mould grow?',[['On old food','ok'],['On a clean, dry plate','clean'],['On a stone','clean']]],
 ['What do fungi do to a dead log?',[['Break it down into soil','ok'],['Make it grow new leaves','plant'],['Nothing at all','nothing']]],
 ['How does mould get onto bread?',[['Tiny spores float in the air','ok'],['The baker puts it there','baker'],['It comes from nowhere','magic']]]];
function hintFor(t){let m='Fungi are living things. They grow on old and dead things.';
 if(t==='dirt')m='Dirt does not grow. Mould gets bigger every day, so it is alive. It is a fungus.';
 if(t==='colour')m='The bread did not just change colour. Fuzzy mould grew on it. Mould is alive.';
 if(t==='plant')m='Fungi are not plants. They have no green leaves and do not make food from light.';
 if(t==='animal')m='Fungi are not animals. They cannot move about. They are their own group: fungi.';
 if(t==='eat')m='Never eat a wild mushroom. Some are poison. Look with your eyes and tell a grown-up.';
 if(t==='clean')m='Fungi need food. A clean plate or a stone has nothing old to feed on.';
 if(t==='nothing')m='Fungi feed on dead things and break them down into soil.';
 if(t==='baker')m='Bakers do not add mould. Tiny spores in the air land on old bread and grow.';
 if(t==='magic')m='Mould grows from tiny spores, too small to see, that float in the air.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=qi%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(ok?'✓ Yes! In a row: '+run+'.':'✗ '+hintFor(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;pad()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pad()}});
A.start()})})();
