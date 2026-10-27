/* Flagship – sorting and categorising words (ages 5–8): drop picture-word cards into groups, spot the odd one out,
   sort the same cards by a new rule, say why a group belongs together, and match opposites. */
(()=>{
const KIND=[['🍎','apple',1,'An apple is food. You can eat it.'],['🐶','dog',0,'A dog is an animal. It can run and bark.'],
 ['🍌','banana',1,'A banana is food. You peel it and eat it.'],['🐸','frog',0,'A frog is an animal. It can hop.'],
 ['🥕','carrot',1,'A carrot is food. It grows in the ground.'],['🐮','cow',0,'A cow is an animal. It says moo.']];
const MIX=[['🍓','strawberry',0,0],['🚒','fire truck',0,1],['🍌','banana',1,0],['🚕','taxi',1,1]];
const RULES=[{ask:'Sort by colour: red or yellow?',bins:[['🟥','Red'],['🟨','Yellow']],name:'colour',col:3},
 {ask:'Same cards, new rule: food or things that go?',bins:[['🍽️','Food'],['🚦','Things that go']],name:'what kind of thing it is',col:4}];
const ODD=[{cards:[['🍎','apple'],['🍌','banana'],['🚗','car'],['🍇','grapes']],k:2,cat:'fruit',why:'Apple, banana and grapes are fruit. A car is not fruit.'},
 {cards:[['🪑','chair'],['🐶','dog'],['🐱','cat'],['🐰','rabbit']],k:0,cat:'an animal',why:'Dog, cat and rabbit are animals. A chair is not an animal.'},
 {cards:[['🚌','bus'],['🚲','bike'],['🍞','bread'],['🚗','car']],k:2,cat:'something that takes you places',why:'Bus, bike and car take you places. Bread does not.'}];
const WHY=[{pics:['🍎','🍌','🍇'],opts:[['They are all fruit',''],['They are all red','A banana is yellow, so they are not all red. Think about what kind of thing they are.'],['They are all round','A banana is long, not round. What kind of thing is each one?']]},
 {pics:['🧢','🧤','🧣'],opts:[['You wear them all',''],['They are all toys','You do not play with them. You put them on. What do you do with them?'],['They are all the same colour','They are not all one colour. What do you do with each one?']]},
 {pics:['🐟','🐙','🐳'],opts:[['They all live in the sea',''],['They can all fly','None of them can fly. Where do they all live?'],['They are all big','A small fish is not big. Where do they all live?']]}];
const OPP=[{e:'🐘',w:'big',opts:[['🐭','small',''],['🦣','huge','Huge means very big. That is nearly the same, not the opposite.'],['🩶','grey','An elephant is grey, but grey is not the opposite of big.']]},
 {e:'🔥',w:'hot',opts:[['☕','warm','Warm is a little bit hot. The opposite is as far from hot as you can go.'],['🧊','cold',''],['☀️','sun','The sun is hot, but sun is not the opposite of hot.']]},
 {e:'🐆',w:'fast',opts:[['💨','quick','Quick means fast too. That is the same, not the opposite.'],['🏃','run','You run fast, but run is not the opposite of fast.'],['🐢','slow','']]},
 {e:'⬆️',w:'up',opts:[['⬇️','down',''],['🪜','high','High is up in the air too. That is nearly the same.'],['☁️','sky','The sky is up, but sky is not the opposite of up.']]}];
VIS.reg('flagsortw',c=>{let A,pad,quiz;c.fig.classList.add('young');const G={};
const mode=()=>['kind','odd','rule','why','opp','quiz'][A.step];
const px=n=>A.narrow?n:Math.round(n*1.2),font=(n,w)=>`${w||800} ${px(n)}px system-ui,sans-serif`;
function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const hit=(p,r)=>!!r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function box(g,r,col,fa,bold){g.save();g.fillStyle=A.alpha(col,fa);A.paint.rrect(r.x,r.y,r.w,r.h,16);g.fill();g.lineWidth=bold?4:2;g.strokeStyle=col;g.stroke();g.restore()}
function txt(g,t,x,y,n,col){g.font=font(n);g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-20)}
function pic(g,e,x,y,s){g.font=`${Math.round(s)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
function wrap(g,t,r,n){g.font=font(n);const ls=[];let cur='';for(const w of t.split(' ')){const s=cur?cur+' '+w:w;if(cur&&g.measureText(s).width>r.w-16){ls.push(cur);cur=w}else cur=s}ls.push(cur);
 const lh=px(n)*1.3;ls.forEach((l,i)=>txt(g,l,r.x+r.w/2,r.y+r.h/2+(i-(ls.length-1)/2)*lh,n))}
function cells(n,y,h){const gap=10,w=(A.W-20-gap*(n-1))/n;return Array.from({length:n},(_,i)=>({x:10+i*(w+gap),y,w,h}))}
function card(g,r,e,word,col,bold){box(g,r,col,.13,bold);const s=Math.min(r.w*.55,r.h*.5);pic(g,e,r.x+r.w/2,r.y+r.h*.4,s);txt(g,word,r.x+r.w/2,r.y+r.h*.84,15)}
const tag=(t,x,y,bg)=>A.paint.label(t,x,y,{font:font(12),bg});
// ---------- sorting engine (steps 1 and 3) ----------
const deck=()=>mode()==='kind'?KIND:MIX,bins=()=>mode()==='kind'?[['🐾','Animals'],['🍽️','Food']]:RULES[G.ph].bins;
const goal=it=>mode()==='kind'?it[2]:it[RULES[G.ph].col-1];
const cur=()=>deck()[G.i];
function homeR(){const s=Math.min(A.H*.3,150);return{x:A.W/2-s/2,y:A.H*.12,w:s,h:s*1.05}}
const binR=()=>cells(2,A.H*.6,A.H*.37);
function drawSort(g){const C=A.col,bs=bins();txt(g,mode()==='kind'?'Animal or food?':RULES[G.ph].ask,A.W/2,A.H*.06,15);
 G.binR=binR();G.binR.forEach((r,b)=>{const bad=G.miss===b;box(g,r,bad?C.rd:b?C.or:C.cy,.12,bad);txt(g,bs[b][0]+' '+bs[b][1],r.x+r.w/2,r.y+22,15);
  G.put[b].forEach((it,j)=>pic(g,it[0],r.x+24+(j%4)*(r.w-40)/3.2,r.y+r.h*.55+Math.floor(j/4)*36,30))});
 const it=cur();if(!it)return;const h=homeR(),r=G.held&&G.at?{x:G.at.x-h.w/2,y:G.at.y-h.h/2,w:h.w,h:h.h}:h;G.cardR=h;card(g,r,it[0],it[1],C.vi,G.held);
 if(!G.held)tag('drag me ↓',A.W/2,h.y+h.h+14,'#5b21b6')}
function drop(b){const it=cur();if(!it)return;const bs=bins(),m0=mode();
 if(goal(it)===b){G.put[b].push(it);G.miss=-1;A.sound.pop();G.i++;let msg=m0==='kind'?it[3]:`Yes, the ${it[1]} goes in ${bs[b][1]}.`;
  if(m0==='rule'&&G.i>=MIX.length&&!G.ph){G.ph=1;G.i=0;G.put=[[],[]];msg+=' All sorted by colour! Now sort the same cards a new way.'}
  return report(msg)}
 G.miss=b;A.sound.miss();report(m0==='kind'?`The ${it[1]} is not ${b?'food':'an animal'}. ${it[3]}`:`The rule is ${RULES[G.ph].name}. The ${it[1]} goes in ${bs[goal(it)][1]}.`)}
// ---------- odd one out, why together, opposites ----------
function drawOdd(g){const C=A.col,R=ODD[Math.min(G.r,2)];txt(g,'Which one does not belong?',A.W/2,A.H*.08,16);txt(g,`Group ${Math.min(G.r,2)+1} of 3`,A.W/2,A.H*.16,12,C.mu);
 G.cards=cells(4,A.H*.26,A.H*.42);G.cards.forEach((r,i)=>{const[e,w]=R.cards[i],ok=G.ok&&i===R.k,bad=G.miss===i;card(g,r,e,w,ok?C.gr:bad?C.rd:C.cy,ok||bad)});
 if(G.ok)tag('✓ odd one out',G.cards[R.k].x+G.cards[R.k].w/2,A.H*.74,'#047857')}
function pickOdd(i){if(G.r>2||G.ok)return;const R=ODD[G.r];if(i===R.k){G.ok=1;G.miss=-1;A.sound.pop();const k=G.r;report(R.why);if(G.r<2)later([()=>{if(G.r===k){G.r++;G.ok=0;report()}}],800);return}
 G.miss=i;A.sound.miss();report(`The ${R.cards[i][1]} is ${R.cat} too. Find the one that is not ${R.cat}.`)}
function drawWhy(g){const C=A.col,R=WHY[Math.min(G.w,2)],top={x:10,y:10,w:A.W-20,h:A.H*.36};box(g,top,C.vi,.07);
 R.pics.forEach((e,i)=>pic(g,e,A.W*(i+1)/4,top.y+top.h*.5,Math.min(70,top.h*.6)));txt(g,'Why do these go together?',A.W/2,A.H*.43,15);
 G.cards=cells(3,A.H*.5,A.H*.46);G.cards.forEach((r,i)=>{const ok=G.ok&&!R.opts[i][1],bad=G.miss===i;box(g,r,ok?C.gr:bad?C.rd:C.cy,.12,ok||bad);wrap(g,R.opts[i][0],r,14)})}
function pickWhy(i){if(G.w>2||G.ok)return;const R=WHY[G.w],o=R.opts[i];if(!o[1]){G.ok=1;G.miss=-1;A.sound.pop();const k=G.w;report(`Yes! ${o[0]}. That is the rule for this group.`);if(G.w<2)later([()=>{if(G.w===k){G.w++;G.ok=0;report()}}],800);return}
 G.miss=i;A.sound.miss();report(o[1])}
function drawOpp(g){const C=A.col,R=OPP[Math.min(G.o,3)],top={x:A.W*.25,y:10,w:A.W*.5,h:A.H*.4};card(g,top,R.e,R.w,C.vi,0);
 txt(g,`What is the opposite of ${R.w}?`,A.W/2,A.H*.48,15);G.cards=cells(3,A.H*.54,A.H*.42);
 G.cards.forEach((r,i)=>{const[e,w,why]=R.opts[i],ok=G.ok&&!why,bad=G.miss===i;card(g,r,e,w,ok?C.gr:bad?C.rd:C.or,ok||bad)});if(G.ok)tag(`${R.w} ↔ ${R.opts.find(o=>!o[2])[1]}`,A.W/2,top.y+14,'#047857')}
function pickOpp(i){if(G.o>3||G.ok)return;const R=OPP[G.o],o=R.opts[i];if(!o[2]){G.ok=1;G.miss=-1;A.sound.pop();const k=G.o;report(`Yes! ${R.w} and ${o[1]} are opposites.`);if(G.o<3)later([()=>{if(G.o===k){G.o++;G.ok=0;report()}}],800);return}
 G.miss=i;A.sound.miss();report(o[2])}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.3);g.fillRect(0,0,W,H);const m=mode();
 if(m==='kind'||m==='rule')drawSort(g);if(m==='odd')drawOdd(g);if(m==='why')drawWhy(g);if(m==='opp')drawOpp(g);if(m==='quiz')pic(g,'🧺',W/2,H/2,80);A.fx.draw(g)}
// ---------- feedback line and buttons ----------
function report(msg){const m=mode();let t='';
 if((m==='kind'||m==='rule')&&cur())t=`Where does the ${cur()[1]} go?`;
 if(m==='odd'&&!G.ok)t='Tap the one that does not belong.';
 if(m==='why'&&!G.ok)t='Pick the reason.';
 if(m==='opp'&&!G.ok)t=`Find the opposite of ${OPP[G.o].w}.`;
 tell((msg?msg+' ':'')+t);buttons();G.onChange()}
function buttons(){if(!A||!pad)return;pad.innerHTML='';const m=mode(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f};
 if((m==='kind'||m==='rule')&&cur())bins().forEach((x,i)=>b(`${x[0]} ${x[1]}`,()=>drop(i),`Put the ${cur()[1]} in ${x[1]}`));
 if(m==='odd'&&!G.ok)ODD[G.r].cards.forEach((x,i)=>b(`${x[0]} ${x[1]}`,()=>pickOdd(i),`Is the ${x[1]} the odd one out?`));
 if(m==='why'&&!G.ok)WHY[G.w].opts.forEach((x,i)=>b(x[0],()=>pickWhy(i)));
 if(m==='opp'&&!G.ok)OPP[G.o].opts.forEach((x,i)=>b(`${x[0]} ${x[1]}`,()=>pickOpp(i),`Is ${x[1]} the opposite of ${OPP[G.o].w}?`));A.redraw()}
// ---------- canvas input ----------
function down(p){const m=mode(),k=(G.cards||[]).findIndex(r=>hit(p,r));G.at=p;
 if(m==='kind'||m==='rule'){if(cur()&&hit(p,G.cardR)){G.held=1;A.redraw();return true}const b=(G.binR||[]).findIndex(r=>hit(p,r));if(b>=0)drop(b);return false}
 if(k<0)return false;if(m==='odd')pickOdd(k);if(m==='why')pickWhy(k);if(m==='opp')pickOpp(k);return false}
function up(p){if(!G.held)return;G.held=0;G.at=null;const b=binR().findIndex(r=>hit(p,r));if(b>=0)drop(b);else report('Drop it in a basket.')}
// ---------- steps ----------
const whenDone=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const later=(fns,ms)=>{const k=G.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===G.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
const fresh=()=>{G.tok=(G.tok||0)+1;Object.assign(G,{onChange:()=>{},i:0,ph:0,put:[[],[]],miss:-1,held:0,at:null,r:0,w:0,o:0,ok:0,cards:null,cardR:null,binR:null})};
const sortAll=()=>{const out=[];[0,1].forEach(ph=>MIX.forEach(it=>out.push(()=>drop(it[RULES[ph].col-1]))));return out};
const steps=[
 {h:'Make groups',p:'Things that are the same kind go in one group. Drag each card to Animals or Food, or tap a button.',task:'Sort 6 cards',
  show:()=>{steps[0].go();later(KIND.map(it=>()=>drop(it[2])),420)},go:()=>{fresh();report();G.onChange=whenDone(0,()=>G.i>=KIND.length,'A group is things of the same kind.')}},
 {h:'Odd one out',p:'Three of the four belong together. One does not. Tap the odd one out.',
  predict:{q:'🐶 🐱 🐮 🌳 Which one does not belong?',opts:['🐮 cow, it is the biggest','🌳 tree, it is not an animal'],ans:1},task:'Find 3 odd ones out',
  show:()=>{steps[1].go();later(ODD.map(R=>()=>{G.ok=0;G.r=ODD.indexOf(R);pickOdd(R.k)}),900)},go:()=>{fresh();report();G.onChange=whenDone(1,()=>G.r===2&&G.ok,'Find what the others share. The odd one does not share it.')}},
 {h:'Same cards, new rule',p:'First sort by colour. Then sort the same cards by what kind of thing they are.',
  predict:{q:'🍓 strawberry and 🚒 fire truck. Do they go in the same group?',opts:['No, never: one is food','It depends on the sorting rule'],ans:1},task:'Sort 4 cards two ways',
  show:()=>{steps[2].go();later(sortAll(),400)},go:()=>{fresh();report();G.onChange=whenDone(2,()=>G.ph===1&&G.i>=MIX.length,'The rule decides the groups. Change the rule, change the groups.')}},
 {h:'Why together?',p:'Look at each group. What makes them belong together? Pick the reason.',task:'Explain 3 groups',
  show:()=>{steps[3].go();later(WHY.map((R,k)=>()=>{G.ok=0;G.w=k;pickWhy(0)}),900)},go:()=>{fresh();report();G.onChange=whenDone(3,()=>G.w===2&&G.ok,'A good reason fits every thing in the group.')}},
 {h:'Opposites',p:'Some words come in pairs that mean the other end, like big and small. Find each opposite.',
  predict:{q:'What is the opposite of hot?',opts:['Warm','Cold'],ans:1},task:'Match 4 opposites',
  show:()=>{steps[4].go();later(OPP.map((R,k)=>()=>{G.ok=0;G.o=k;pickOpp(R.opts.findIndex(o=>!o[2]))}),900)},go:()=>{fresh();report();G.onChange=whenDone(4,()=>G.o===3&&G.ok,'An opposite is at the other end, not nearly the same.')}},
 {h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.onChange()});
// ---------- challenge ----------
const QS=[['Which one does not belong: 🍎 apple, 🍐 pear, 🐷 pig, 🍊 orange?',[['🐷 pig','ok'],['🍊 orange','look'],['🍐 pear','look']]],
 ['What is the opposite of open?',[['shut','ok'],['door','goes'],['wide','same']]],
 ['🐝 bee, 🦋 butterfly, 🐦 bird. Why do they go together?',[['They can all fly','ok'],['They are all yellow','look'],['They are all big','look']]],
 ['We sort by colour. Where does a 🍋 lemon go?',[['Yellow','ok'],['Food','rule'],['Red','look']]],
 ['What is the opposite of full?',[['empty','ok'],['cup','goes'],['packed','same']]],
 ['Which group fits 🐄 cow, 🐑 sheep and 🐖 pig best?',[['Farm animals','ok'],['Pets','near'],['Things that swim','look']]]];
function slip(t){let m='Look again at each picture and think.';
 if(t==='look')m='Look past how it looks. Think about what kind of thing each one is.';
 if(t==='goes')m='That word goes with it, but an opposite means the other end.';
 if(t==='same')m='That means nearly the same. An opposite is as far away as it can be.';
 if(t==='rule')m='Use the rule you were given. The rule here is colour, not kind.';
 if(t==='near')m='Close! But not every one of them is a pet. Pick the group that fits all three.';return m}
let qn=-1,run=0;
function ask(){qn++;const[q,ops]=QS[qn%QS.length],sh=qn%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(sh).concat(ops.slice(0,sh)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=t==='ok';
 if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=(good?`✓ Yes! Streak: ${run}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.7,tall:1.25,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Actions'},w);quiz=E('div',{class:'fl-chal'},A.below);
  fresh();A.gest({down,move:p=>{G.at=p;if(G.held)A.redraw()},up});buttons()}});
A.start()})})();
