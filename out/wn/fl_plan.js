/* Flagship – making a simple plan for play (ages 4–5). Plan, do, review: pick the speech bubble that says what you
   will make ("I will build a house for Teddy"), drag only the things the plan needs into the basket, put the four
   plan cards in order, spot what is missing when you check against the plan, and pick a swap when something runs out. */
(()=>{
const SAY=[{goal:'🧸',what:'a house for Teddy',lines:[['I will build a house for Teddy.','plan'],['I like blocks.','like'],['Go!','rush']]},
 {goal:'🐱',what:'a cat picture',lines:[['Cats say miaow.','fact'],['I will paint a cat.','plan'],['I like paint.','like']]},
 {goal:'🚂',what:'a track for the train',lines:[['Go!','rush'],['Trains go fast.','fact'],['I will make a track for the train.','plan']]}];
const SAYWHY={like:'That says what you like. A plan says what you will make: I will…',fact:'That is true, but it is not a plan. Say what you will make: I will…',rush:'Go! means you start with no plan. Say what you will make first.'};
const SHELF=[['🧱','blocks',1,'Blocks go in the basket. The walls need them.'],['🥄','spoon',0],['🚪','door',1,'The door goes in. Teddy needs a way in.'],['⚽','ball',0],['🧸','Teddy',1,'Teddy goes in. The house is for him.'],['🚗','car',0]];
const SHELFWHY={spoon:'A spoon is for eating. The house plan does not need it.',ball:'A ball rolls away. The house plan does not need it.',car:'A car is fun, but the house plan does not need it.'};
const CARDS=[['🗣️','Say my plan'],['🧺','Get what I need'],['🔨','Make it'],['🔍','Check it']];
const PARTS=['roof','door','window'],DECK=[0,2,0,1];/* deck positions: Make it, Check it, Get what I need (card 0 starts placed) */
const SWAP=[{gone:'🧱',need:'blocks for the walls',opts:[['📦','boxes',1],['⚽','a ball',0],['💧','water',0]],why:{'a ball':'A ball rolls off. Walls need flat things that stack.',water:'Water runs away. Walls need flat things that stack.'}},
 {gone:'📄',need:'paper for the cat picture',opts:[['🍌','a banana',0],['🗒️','card',1],['🧦','a sock',0]],why:{'a banana':'You cannot paint on a banana. You need something flat to paint on.','a sock':'A sock is soft and bendy. You need something flat to paint on.'}},
 {gone:'🛤️',need:'track for the train',opts:[['🧸','Teddy',0],['🍪','a biscuit',0],['🧱','blocks in a line',1]],why:{Teddy:'Teddy is soft and short. A track needs a long, flat line.','a biscuit':'A biscuit is too small and it breaks. A track needs a long, flat line.'}}];
VIS.reg('flagplan',c=>{let A,pad,quiz,qn=-1,gen=0,streak=0;c.fig.classList.add('young');
const blank=()=>({r:0,n:0,busy:0,ok:0,bad:-1,drag:null,after:()=>{},bag:[],placed:1,fast:0}),S=blank();
const phase=()=>['say','get','order','check','swap','quiz'][A.step];
const z=n=>Math.round(n*(A.narrow?1:1.12)),fast=()=>A.reduced()||S.fast;
const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function txt(g,t,x,y,maxw,size,col,wt){g.font=`${wt||700} ${z(size)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const out=[];let line='';String(t).split(' ').forEach(w=>{const t2=line?line+' '+w:w;if(g.measureText(t2).width>maxw&&line){out.push(line);line=w}else line=t2});out.push(line);
 const lh=z(size)*1.22;out.forEach((s,i)=>g.fillText(s,x,y+(i-(out.length-1)/2)*lh))}
function emo(g,e,x,y,s){g.fillStyle='#000';g.font=`${s}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
function card(g,r,fill,edge,lw){g.save();A.paint.shadow(7,3,.15);g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();A.paint.noShadow();g.strokeStyle=edge;g.lineWidth=lw||2;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke();g.restore()}
const round=()=>({say:SAY,swap:SWAP}[phase()]||[])[S.r]||{};
/* the things you can pick in this phase, as labels for buttons */
function picks(){const p=phase(),it=round();if(p==='say')return it.lines.map(l=>l[0]);if(p==='get')return SHELF.map(s=>s[1]);if(p==='order')return CARDS.map(k=>k[1]);if(p==='swap')return it.opts.map(o=>o[1]);if(p==='check')return PARTS;return[]}
/* bubble or card rectangles at the bottom (say, swap), shelf grid (get), order deck (order) */
function spots(){const p=phase(),W=A.W,H=A.H;
 if(p==='get'){const cols=3,w=(W-24-20)/cols,h=Math.min(z(92),H*.2);return SHELF.map((_,i)=>({x:12+(i%cols)*(w+10),y:H*.13+Math.floor(i/cols)*(h+10),w,h}))}
 if(p==='order'){const n=3,w=Math.min(z(132),(W-24-20)/n),h=z(92),x0=(W-(w*n+20))/2;return CARDS.map((_,j)=>({x:x0+DECK[j]*(w+10),y:H-h-12,w,h}))}
 const n=3,stack=A.narrow&&p==='say',w=stack?W-40:Math.min(z(190),(W-24-20)/n),h=stack?z(54):z(p==='say'?96:100);
 return Array.from({length:n},(_,j)=>stack?{x:20,y:H-(n-j)*(h+8)-6,w,h}:{x:(W-(w*n+20))/2+j*(w+10),y:H-h-14,w,h})}
const kid=()=>{const s=z(70);return{x:A.W/2-s,y:A.H*(A.narrow?.2:.2),w:s*2,h:s*1.3}};
const basket=()=>{const w=Math.min(A.W-60,z(250)),h=z(84);return{x:(A.W-w)/2,y:A.H-h-14,w,h}};
const slotsRow=()=>{const n=4,w=Math.min(z(132),(A.W-24-30)/n),h=z(92),x0=(A.W-(w*n+30))/2;return CARDS.map((_,j)=>({x:x0+j*(w+10),y:A.H*.3,w,h}))};
/* two houses: the plan (left) and what was made (right); hit boxes are on the plan house */
function houseBox(side){const w=Math.min((A.W-40)/2,z(230)),h=w*1.1,x=side?A.W/2+10:A.W/2-10-w;return{x,y:A.H*.2,w,h}}
function partBoxes(){const b=houseBox(0),wy=b.y+b.h*.38;return{roof:{x:b.x,y:b.y,w:b.w,h:b.h*.36},door:{x:b.x+b.w*.4,y:wy+b.h*.24,w:b.w*.22,h:b.h*.38},window:{x:b.x+b.w*.12,y:wy+b.h*.1,w:b.w*.22,h:b.h*.2}}}
function house(g,b,missing,ring){const C=A.col,wy=b.y+b.h*.38,wh=b.h*.62;
 g.fillStyle=A.mix(C.pn,C.am,.25);g.strokeStyle=C.tx;g.lineWidth=2.5;g.fillRect(b.x+b.w*.08,wy,b.w*.84,wh);g.strokeRect(b.x+b.w*.08,wy,b.w*.84,wh);
 if(missing!=='roof'){g.fillStyle=A.mix(C.pn,C.rd,.55);g.beginPath();g.moveTo(b.x,wy);g.lineTo(b.x+b.w/2,b.y+b.h*.04);g.lineTo(b.x+b.w,wy);g.closePath();g.fill();g.stroke()}
 if(missing!=='door'){g.fillStyle=A.mix(C.pn,C.vi,.55);g.fillRect(b.x+b.w*.42,wy+wh*.42,b.w*.18,wh*.58);g.strokeRect(b.x+b.w*.42,wy+wh*.42,b.w*.18,wh*.58)}
 if(missing!=='window'){g.fillStyle=A.mix(C.pn,C.cy,.45);g.fillRect(b.x+b.w*.15,wy+wh*.2,b.w*.18,b.w*.16);g.strokeRect(b.x+b.w*.15,wy+wh*.2,b.w*.18,b.w*.16)}
 if(ring){const r=partBoxes()[ring];g.strokeStyle=C.gr;g.lineWidth=4;g.setLineDash([6,4]);g.strokeRect(r.x-3,r.y-3,r.w+6,r.h+6);g.setLineDash([])}}
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,p=phase(),it=round(),d=S.drag;
 if(p==='quiz'){txt(g,'Say it. Get it. Make it. Check it.',W/2,H*.45,W-40,19,C.tx,800);return}
 if(p==='say'){const k=kid();emo(g,it.goal,W/2-z(64),k.y+k.h*.45,z(60));emo(g,'🧒',W/2+z(40),k.y+k.h*.45,z(64));
  txt(g,S.ok?it.lines.find(l=>l[1]==='plan')[0]:`Goal: ${it.what}. Which one is a plan?`,W/2,H*.08,W-30,S.ok?17:15,S.ok?C.gr:C.tx,800);
  if(!S.ok)spots().forEach((r,j)=>{if(d&&d.j===j&&d.x!=null)return;bubble(g,r,j)});if(d&&d.x!=null){const r=spots()[d.j];bubble(g,{...r,x:d.x-r.w/2,y:d.y-r.h/2},d.j)}}
 if(p==='get'){txt(g,'Plan: a house for Teddy',W/2,H*.06,W-30,16,C.tx,800);
  spots().forEach((r,i)=>{if(S.bag.includes(i)||(d&&d.j===i&&d.x!=null))return;const s=SHELF[i];card(g,r,S.bad===i?A.mix(C.pn,C.rd,.2):C.pn,S.bad===i?C.rd:C.ln,S.bad===i?4:2);emo(g,s[0],r.x+r.w/2,r.y+r.h*.42,Math.round(r.h*.48));txt(g,s[1],r.x+r.w/2,r.y+r.h*.84,r.w-6,14,C.tx,700)});
  const b=basket();card(g,b,A.alpha(C.gr,.1),C.gr,3);emo(g,'🧺',b.x+z(34),b.y+b.h/2,z(40));S.bag.forEach((i,k)=>emo(g,SHELF[i][0],b.x+z(86)+k*z(46),b.y+b.h/2,z(34)));
  if(!S.bag.length)txt(g,'Drag what you need here',b.x+b.w/2+z(24),b.y+b.h/2,b.w-z(80),13,C.mu,600);
  if(d&&d.x!=null){const s=SHELF[d.j];emo(g,s[0],d.x,d.y,z(48))}}
 if(p==='order'){txt(g,S.placed>=4?'Say it, get it, make it, check it.':'What comes next?',W/2,H*.1,W-30,17,C.tx,800);
  slotsRow().forEach((r,j)=>{const on=j<S.placed;card(g,r,on?A.mix(C.pn,C.gr,.14):A.alpha(C.vi,.06),on?C.gr:C.vi,on?3:2);txt(g,String(j+1),r.x+z(14),r.y+z(14),20,12,C.tx,800);
   if(on){emo(g,CARDS[j][0],r.x+r.w/2,r.y+r.h*.38,z(34));txt(g,CARDS[j][1],r.x+r.w/2,r.y+r.h*.8,r.w-8,13,C.tx,700)}});
  if(S.placed<4)spots().forEach((r,j)=>{if(j<S.placed||(d&&d.j===j&&d.x!=null))return;deck(g,r,j)});if(d&&d.x!=null){const r=spots()[d.j];deck(g,{...r,x:d.x-r.w/2,y:d.y-r.h/2},d.j)}}
 if(p==='check'){const miss=PARTS[S.r%3];txt(g,S.ok?`The ${miss} was missing. Now it matches.`:'Plan (left) and what I made (right). What is missing?',W/2,H*.08,W-30,15,S.ok?C.gr:C.tx,800);
  const a=houseBox(0),b=houseBox(1);house(g,a,null,S.ok?miss:null);house(g,b,S.ok?null:miss,null);
  txt(g,'📋 Plan',a.x+a.w/2,a.y+a.h+z(16),a.w,13,C.tx,800);txt(g,'🧸 I made',b.x+b.w/2,b.y+b.h+z(16),b.w,13,C.tx,800);
  if(S.bad>=0){const r=partBoxes()[PARTS[S.bad]];g.strokeStyle=C.rd;g.lineWidth=4;g.strokeRect(r.x-3,r.y-3,r.w+6,r.h+6)}}
 if(p==='swap'){emo(g,it.gone,W/2-z(50),H*.2,z(54));g.strokeStyle=C.rd;g.lineWidth=5;g.beginPath();g.moveTo(W/2-z(84),H*.2-z(30));g.lineTo(W/2-z(16),H*.2+z(30));g.stroke();
  emo(g,'🧒',W/2+z(46),H*.2,z(56));txt(g,S.ok?`Good swap: it does the same job.`:`All gone! I need ${it.need}. What can I use?`,W/2,H*.4,W-30,16,S.ok?C.gr:C.tx,800);
  if(!S.ok)spots().forEach((r,j)=>{if(d&&d.j===j&&d.x!=null)return;swapCard(g,r,j)});if(d&&d.x!=null){const r=spots()[d.j];swapCard(g,{...r,x:d.x-r.w/2,y:d.y-r.h/2},d.j)}
  const k=kid();if(!S.ok){g.strokeStyle=A.alpha(C.vi,.7);g.setLineDash([7,5]);g.lineWidth=2;A.paint.rrect(W/2-z(30),H*.2-z(42),z(150),z(84),14);g.stroke();g.setLineDash([])}void k}
 A.fx.draw(g)}
function bubble(g,r,j){const C=A.col,bad=S.bad===j;card(g,r,bad?A.mix(C.pn,C.rd,.2):A.mix(C.pn,C.cy,.1),bad?C.rd:C.cy,bad?4:2.5);txt(g,round().lines[j][0],r.x+r.w/2,r.y+r.h/2,r.w-14,15,C.tx,700)}
function deck(g,r,j){const C=A.col,bad=S.bad===j;card(g,r,bad?A.mix(C.pn,C.rd,.2):C.pn,bad?C.rd:C.vi,bad?4:2.5);emo(g,CARDS[j][0],r.x+r.w/2,r.y+r.h*.38,z(32));txt(g,CARDS[j][1],r.x+r.w/2,r.y+r.h*.8,r.w-8,13,C.tx,700)}
function swapCard(g,r,j){const C=A.col,o=round().opts[j],bad=S.bad===j;card(g,r,bad?A.mix(C.pn,C.rd,.2):C.pn,bad?C.rd:C.am,bad?4:2.5);emo(g,o[0],r.x+r.w/2,r.y+r.h*.4,z(40));txt(g,o[1],r.x+r.w/2,r.y+r.h*.82,r.w-8,15,C.tx,700)}
function nope(t,j){A.sound.miss();S.bad=j==null?-1:j;tell(t);setTimeout(()=>{S.bad=-1;A.redraw()},fast()?10:1100);A.redraw()}
/* one success: count it, then move to the next round after a short pause */
function yes(t,stay){S.n++;A.sound.pop();if(S.n<3&&!stay){const r0=S.r,g0=gen;S.busy=1;setTimeout(()=>{if(S.r!==r0||g0!==gen)return;Object.assign(S,{busy:0,r:S.r+1,ok:0});tell(t+' Next one.');buttons();A.redraw()},fast()?5:1300)}tell(t);buttons();A.redraw();S.after()}
/* every choice lands here, from a drag, a tap or a button */
function choose(j){const p=phase();if(p==='quiz'||S.n>=3||S.busy||S.ok)return;const it=round();
 if(p==='say'){const kind=it.lines[j][1];if(kind!=='plan')return nope(SAYWHY[kind],j);S.ok=1;return yes(`Yes! "${it.lines[j][0]}" says what you will make.`)}
 if(p==='get'){if(S.bag.includes(j))return;const s=SHELF[j];if(!s[2])return nope(SHELFWHY[s[1]],j);S.bag.push(j);return yes(s[3],1)}
 if(p==='order'){if(j<S.placed)return;if(j!==S.placed){const m=j===3?'Check it comes at the end, when the thing is made.':S.placed===1?'First get what you need, then you can make it.':'You have got your things. Now make it, then check.';return nope(m,j)}
  S.placed++;return yes(`${S.placed}. ${CARDS[j][1]}.`,1)}
 if(p==='check'){const miss=PARTS[S.r%3];if(PARTS[j]!==miss)return nope(`The ${PARTS[j]} is there in both pictures. Look again: what is in the plan but not in mine?`,j);S.ok=1;return yes(`The plan has a ${miss}. Mine did not. Add the ${miss}!`)}
 if(p==='swap'){const o=it.opts[j];if(!o[2])return nope(it.why[o[1]],j);S.ok=1;return yes(`${o[1]} can do the same job. Change the plan and keep going.`)}}
function buttons(){if(!pad)return;pad.innerHTML='';const p=phase();if(p==='quiz'||S.n>=3||S.ok)return;
 const ord=p==='order'?[0,3,1,2]:picks().map((_,j)=>j);ord.forEach(j=>{const t=picks()[j];if(p==='get'&&S.bag.includes(j))return;if(p==='order'&&j<S.placed)return;const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':p==='get'?'Put '+t+' in the basket':p==='check'?'Missing: '+t:null},pad,p==='get'?SHELF[j][0]+' '+t:p==='swap'?round().opts[j][0]+' '+t:t);b.onclick=()=>choose(j)})}
const hit=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(pt){const p=phase();if(p==='quiz'||S.busy||S.ok||S.n>=3)return false;
 if(p==='check'){const pb=partBoxes(),k=PARTS.findIndex(n=>hit(pt,pb[n]));if(k>=0)choose(k);return false}
 const j=spots().findIndex((r,i)=>hit(pt,r)&&!(p==='get'&&S.bag.includes(i))&&!(p==='order'&&i<S.placed));if(j<0)return false;S.drag={j,x:null,x0:pt.x,y0:pt.y};return true}
function move(pt){const d=S.drag;if(d&&(d.x!=null||Math.hypot(pt.x-d.x0,pt.y-d.y0)>8)){d.x=pt.x;d.y=pt.y;A.redraw()}}
function target(){const p=phase();if(p==='get')return basket();if(p==='order'){const r=slotsRow()[Math.min(3,S.placed)];return r}const k=kid();return p==='swap'?{x:A.W/2-z(40),y:A.H*.2-z(50),w:z(170),h:z(100)}:k}
function up(pt){const d=S.drag;S.drag=null;if(!d)return;if(d.x==null)return choose(d.j);const t=target();if(hit(pt,{x:t.x-24,y:t.y-24,w:t.w+48,h:t.h+48}))choose(d.j);else{tell(phase()==='get'?'Drop it in the basket.':phase()==='order'?'Drop it in the next empty box.':'Drop it on the child.');A.redraw()}}
const finish=(i,msg)=>()=>{if(A.step===i&&S.n>=3&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function autoplay(f){const k=++gen,tick=()=>{if(k!==gen||S.n>=3)return;f();setTimeout(tick,60)};setTimeout(tick,30)}
const reset=()=>{gen++;Object.assign(S,blank())};
function answerKey(){const p=phase(),it=round();if(p==='say')return it.lines.findIndex(l=>l[1]==='plan');if(p==='get')return SHELF.findIndex((s,i)=>s[2]&&!S.bag.includes(i));if(p==='order')return S.placed;if(p==='check')return S.r%3;return it.opts.findIndex(o=>o[2])}
const show=i=>()=>{steps[i].go();S.fast=1;autoplay(()=>choose(answerKey()))};
const steps=[
{h:'Say your plan',p:'A plan says what you will make, before you start. Drag the plan bubble to the child, or tap it.',task:'Find 3 plans',show:show(0),
 go:()=>{reset();tell('Teddy needs a house. Which one is a plan?');buttons();S.after=finish(0,'A plan starts with I will, and it says what you will make.')}},
{h:'Get what you need',p:'The plan is a house for Teddy. Drag only what the plan needs into the basket.',predict:{q:'Should you take every toy from the box?',opts:['Yes, take them all','No, just what the plan needs'],ans:1},task:'Fill the basket',show:show(1),
 go:()=>{reset();tell('Plan: a house for Teddy. What do you need?');buttons();S.after=finish(1,'Blocks, a door and Teddy. The spoon, ball and car stay on the shelf.')}},
{h:'Plan steps in order',p:'Say my plan is first. Drag the card that comes next into the next box.',predict:{q:'When do you check your work?',opts:['At the start','At the end, with the plan'],ans:1},task:'Put 3 cards in order',show:show(2),
 go:()=>{reset();tell('Say my plan is first. What comes next?');buttons();S.after=finish(2,'Say it, get it, make it, check it.')}},
{h:'Check with the plan',p:'Look at the plan, then at what you made. Tap the part on the plan that is missing from yours.',predict:{q:'Teddy\'s house has no roof. Is it done?',opts:['Yes, I made a house','Not yet: the plan has a roof'],ans:1},task:'Spot 3 missing parts',show:show(3),
 go:()=>{reset();tell('Look at both houses. What is missing from mine?');buttons();S.after=finish(3,'Checking means looking back at the plan. Then you can fix what is missing.')}},
{h:'Change the plan',p:'Sometimes a thing runs out. Pick something else that does the same job.',task:'Make 3 swaps',show:show(4),
 go:()=>{reset();tell('The blocks are all gone! What can make the walls?');buttons();S.after=finish(4,'When something runs out, swap in a thing that does the same job.')}},
{h:'Challenge',p:'',go:()=>{reset();askQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[['Mia wants to build a car for Dolly. Which is her plan?',[['I will build a car for Dolly.','ok'],['I like cars.','like'],['Go!','rush']]],
 ['Plan: a tower. What do you get?',[['Blocks','ok'],['A spoon','extra'],['Every toy','all']]],
 ['What do you do just after you make it?',[['Check it with my plan','ok'],['Say my plan','order'],['Put it away','skip']]],
 ['The plan has a door. My house has no door. What now?',[['Add a door','ok'],['Say it is done','skip'],['Start a new thing','quit']]],
 ['No blocks left for the tower. What can you use?',[['Boxes that stack','ok'],['A ball','job'],['Nothing, stop','quit']]]];
function why(t){let m='Say what you will make, get what you need, make it, then check.';
 if(t==='like')m='That says what you like. A plan says what you will make: I will…';if(t==='rush')m='Go! starts with no plan. Say what you will make first.';
 if(t==='extra')m='A spoon is not part of a tower. Get only what the plan needs.';if(t==='all')m='Every toy makes a big mess. Get only what the plan needs.';
 if(t==='order')m='You say your plan first, at the start. After you make it, you check it.';if(t==='skip')m='Check first: look at the plan and see if a part is missing.';
 if(t==='quit')m='You do not need to stop. Fix the missing part, or swap in a thing that does the same job.';if(t==='job')m='A ball rolls off. Pick a thing that does the same job: flat things stack.';return m}
function askQ(){qn++;const[q,ops]=QS[qn%QS.length],rot=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>grade(t)});tell('Challenge: '+q);A.redraw()}
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! That is good planning.':'✗ '+why(t)}${ok?` Stars in a row: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=askQ}
A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}});
A.start()})})();
