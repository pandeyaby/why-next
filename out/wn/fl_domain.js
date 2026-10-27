/* Flagship – domain vocabulary across subjects (ages 9–11): shelve subject words, pick the subject meaning of a
   multi-meaning word, find the context clue that defines a new term, match academic task words to answers that do
   what they ask, and drop the precise term into a vague sentence. */
(()=>{
const SHELVES=[['➗','Maths'],['🔬','Science'],['🏛️','History']];
const TERMS=[['numerator',0,'the top number in a fraction'],['photosynthesis',1,'how plants make food from light'],['parliament',2,'the group that makes a country\u2019s laws'],
 ['perimeter',0,'the distance all the way round a shape'],['circuit',1,'a loop that electricity flows round'],['empire',2,'many lands ruled by one ruler']];
const MEAN=[{sub:'Maths',s:'The product of 6 and 3 is 18.',w:'product',opts:[['the answer when you multiply',''],['something a factory makes to sell','That is the everyday meaning. In maths the product is the answer when you multiply: 6 × 3 = 18.'],['the answer when you add','6 + 3 is 9, not 18. Adding gives a sum; multiplying gives a product.']]},
 {sub:'Science',s:'The volume of water in the jug is 500 ml.',w:'volume',opts:[['how loud a sound is','That is volume on a speaker. Here it is measured in ml, so it is about space.'],['how much space something takes up',''],['how heavy something is','Heavy is mass, measured in grams. Volume is space, measured in ml.']]},
 {sub:'Science',s:'The current in the circuit made the bulb light up.',w:'current',opts:[['happening now','That is the everyday meaning, as in current news. In a circuit, current is a flow.'],['a flow of water in a river','Rivers have currents, but this sentence is about a circuit.'],['a flow of electric charge','']]}];
const CLUE=[{sub:'Science',s:'In a pond ecosystem, frogs eat insects and every plant and animal depends on the water and on each other.',w:'ecosystem',clue:[8,19],cand:[2,6,12],
  opts:[['living things and their surroundings, all depending on each other',''],['a kind of pond animal','The clue says every plant and animal, not one kind. Read the words after "and".'],['the water in a pond','Water is only one part. The clue says plants and animals depend on it and on each other.']]},
 {sub:'Maths',s:'In 3/4 the numerator 3 tells you how many of the equal parts you have.',w:'numerator',clue:[5,14],cand:[1,2,8],
  opts:[['the bottom number, the size of each part','The clue says how many parts you have. That is the top number; the bottom one is the denominator.'],['the top number, how many parts you have',''],['the whole fraction','The clue is about the 3 alone, not the whole fraction 3/4.']]},
 {sub:'History',s:'In a democracy adults vote in elections to choose who runs the country.',w:'democracy',clue:[3,12],cand:[0,1,4],
  opts:[['a country ruled by a king','A king is not chosen by votes. The clue says adults vote.'],['a big city','The clue does not mention a city. Look at what the adults do.'],['rule by leaders the people choose by voting','']]}];
const THINK=[{sub:'Contrast',s:'Contrast frogs and toads.',w:'Contrast',opts:[['Frogs have smooth, wet skin, but toads have dry, bumpy skin.',''],['Frogs and toads both lay eggs in water.','That says how they are alike. Contrast asks how they are different.'],['Frogs are green and can jump far.','That only describes frogs. Contrast needs both, and how they differ.']]},
 {sub:'Summarise',s:'Summarise The Three Little Pigs.',w:'Summarise',opts:[['I think the third pig was the cleverest one.','That is an opinion. A summary gives the main events, not what you think.'],['Three pigs build houses. The wolf blows down the straw and stick ones but not the brick one.',''],['The first pig met a man with straw and asked him for some, and then he built a house with it.','That retells every detail. A summary keeps only the main points.']]},
 {sub:'Evidence',s:'Give evidence that plants need light.',w:'evidence',opts:[['Plants are very important to us.','That is a claim, not evidence. Evidence is a fact or result that shows it is true.'],['I like plants with big leaves.','That is a feeling. Evidence is something seen or measured.'],['A plant kept in a dark cupboard went pale, but one on the windowsill stayed green.','']]}];
const GAPS=[{sub:'Science',a:'The puddle dried up because the water',b:'into the air.',opts:[['evaporated',''],['went','Went is true but vague. Science has an exact word for a liquid turning into a gas.'],['melted','Melting is a solid turning into a liquid, like ice. Here water turns into a gas.']]},
 {sub:'Maths',a:'The distance all the way round the field is its',b:'.',opts:[['area','Area is the space inside, in square metres. The distance round the edge is the perimeter.'],['perimeter',''],['outside','Outside is an everyday word. Maths uses perimeter.']]},
 {sub:'History',a:'Letters and diaries written at the time are',b:'sources.',opts:[['old','Old is vague. Historians call sources made at the time primary sources.'],['secondary','Secondary sources were made later, like a textbook about the past.'],['primary','']]}];
VIS.reg('flagdomain',c=>{let A,ctl,chal;const S={};
const phase=()=>['shelf','mean','clue','think','gap','quiz'][A.step];
const sz=n=>A.narrow?n:Math.round(n*1.15),ft=(n,b)=>`${b||700} ${sz(n)}px system-ui,sans-serif`;
function narrate(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function panel(g,r,col,a,strong){g.save();g.fillStyle=A.alpha(col,a);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=col;g.lineWidth=strong?3.5:1.5;g.stroke();g.restore()}
function write(g,t,x,y,n,col,b,al){g.font=ft(n,b);g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y)}
function lines(g,t,maxW,n){g.font=ft(n);const out=[];let ln='';t.split(' ').forEach(w=>{const tr=ln?ln+' '+w:w;if(ln&&g.measureText(tr).width>maxW){out.push(ln);ln=w}else ln=tr});out.push(ln);return out}
function block(g,t,r,n,col){const ls=lines(g,t,r.w-20,n),lh=sz(n)*1.3;ls.forEach((l,i)=>write(g,l,r.x+r.w/2,r.y+r.h/2+(i-(ls.length-1)/2)*lh,n,col))}
function flow(g,ws,r,n){g.font=ft(n);const gap=g.measureText(' ').width+4,lh=sz(n)*1.75,boxes=[];let x=r.x+12,y=r.y+sz(n)*1.4;
 ws.forEach((w,i)=>{const wd=g.measureText(w).width;if(x>r.x+12&&x+wd>r.x+r.w-12){x=r.x+12;y+=lh}boxes.push({i,w,x:x-4,y:y-sz(n)*.9,wd:wd+8,ht:sz(n)*1.5,tx:x,ty:y});x+=wd+gap});return boxes}
const asRect=b=>({x:b.x,y:b.y,w:b.wd,h:b.ht});
const badge=(t,x,y)=>A.paint.label(t,x,y,{font:ft(12,800),bg:'#4c1d95',align:'left'});
function stack(n,y0){const gap=8,h=(A.H-y0-10-gap*(n-1))/n;return[...Array(n)].map((_,i)=>({x:10,y:y0+i*(h+gap),w:A.W-20,h}))}
// ---------- step 1: shelve subject words (drag) ----------
function chipR(){const w=Math.min(A.W*.6,240);return{x:A.W/2-w/2,y:A.H*.1,w,h:A.H*.13}}
function shelfR(){const gap=8,w=(A.W-20-gap*2)/3;return SHELVES.map((_,i)=>({x:10+i*(w+gap),y:A.H*.42,w,h:A.H*.55}))}
function drawShelf(g){const C=A.col;write(g,'Which subject does this word belong to?',A.W/2,A.H*.05,13,C.tx,800);S.shelves=shelfR();
 S.shelves.forEach((r,i)=>{const bad=S.miss===i;panel(g,r,bad?C.rd:[C.cy,C.gr,C.or][i],.12,bad);write(g,SHELVES[i][0],r.x+r.w/2,r.y+22,22);write(g,SHELVES[i][1],r.x+r.w/2,r.y+50,13,C.tx,800);
  S.placed.filter(t=>t[1]===i).forEach((t,j)=>write(g,t[0],r.x+r.w/2,r.y+80+j*sz(13)*1.6,12,C.tx,600))});
 const t=TERMS[S.q];if(!t)return;const h=chipR(),r=S.grab&&S.pt?{x:S.pt.x-h.w/2,y:S.pt.y-h.h/2,w:h.w,h:h.h}:h;S.chip=h;panel(g,r,C.vi,.18,1);write(g,t[0],r.x+r.w/2,r.y+r.h/2,17,C.tx,800);
 if(!S.grab)A.paint.label('drag to a shelf ↓',A.W/2,h.y+h.h+14,{font:ft(11,700),bg:'#5b21b6'})}
function shelve(i){const t=TERMS[S.q];if(!t)return;if(t[1]===i){S.placed.push(t);S.miss=-1;S.q++;A.sound.pop();return update(`Yes: ${t[0]} means ${t[2]}. It is a ${SHELVES[i][1]} word.`)}
 S.miss=i;A.sound.miss();update(`${t[0]} means ${t[2]}. That is a ${SHELVES[t[1]][1]} word, not ${SHELVES[i][1]}.`)}
// ---------- steps 2-4: choose the meaning / the answer that fits ----------
const roundsFor=m=>m==='mean'?MEAN:m==='clue'?CLUE:THINK;
const round=()=>roundsFor(phase())[Math.min(S.r,2)];
function drawChoice(g){const C=A.col,R=round(),m=phase(),top={x:10,y:10,w:A.W-20,h:A.H*(m==='clue'?.34:.24)};panel(g,top,C.mu,.06);
 const ws=R.s.split(' '),bx=flow(g,ws,{x:top.x,y:top.y+18,w:top.w,h:top.h},15);S.words=bx;
 bx.forEach(b=>{const key=b.w.replace(/[.,]/g,'')===R.w,inClue=R.clue&&b.i>=R.clue[0]&&b.i<=R.clue[1];
  if(key)panel(g,asRect(b),C.vi,.25,1);else if(inClue&&S.found)panel(g,asRect(b),C.gr,.22,0);else if(S.miss==='w'+b.i)panel(g,asRect(b),C.rd,.2,1);
  g.font=ft(15);g.textAlign='left';g.textBaseline='middle';g.fillStyle=C.tx;g.fillText(b.w,b.tx,b.ty)});
 badge(m==='think'?'Task word: '+R.sub:R.sub,top.x+8,top.y+12);
 const y0=top.y+top.h+(m==='clue'?34:30);write(g,m==='think'?'Which answer does what the task word asks?':m==='clue'&&!S.found?`Tap a word that helps explain ${R.w}`:`What does ${R.w} mean here?`,A.W/2,y0-16,13,C.tx,800);
 S.opts=m==='clue'&&!S.found?null:stack(3,y0);if(!S.opts)return;
 S.opts.forEach((r,i)=>{const good=S.ok&&!R.opts[i][1],bad=S.miss===i;panel(g,r,good?C.gr:bad?C.rd:C.cy,.11,good||bad);block(g,R.opts[i][0],r,13)})}
function tapWord(i){const R=round();if(phase()!=='clue'||S.found||S.ok)return;if(i>=R.clue[0]&&i<=R.clue[1]){S.found=1;S.miss=-1;A.sound.pop();return update(`Good clue: "${R.s.split(' ').slice(R.clue[0],R.clue[1]+1).join(' ').replace(/[.,]$/,'')}". Now choose the meaning.`)}
 if(R.s.split(' ')[i].replace(/[.,]/g,'')===R.w)return update(`That is the new word itself. Find words nearby that explain it.`);
 S.miss='w'+i;A.sound.miss();update(`"${R.s.split(' ')[i]}" does not explain ${R.w}. Look for words that say what it is or does.`)}
function choose(i){const m=phase(),R=round(),list=roundsFor(m);if(S.ok||S.r>2||(m==='clue'&&!S.found))return;const o=R.opts[i];
 if(!o[1]){S.ok=1;S.miss=-1;A.sound.pop();const k=S.r;update(m==='think'?`Yes. That answer does what "${R.w}" asks.`:`Yes. In ${R.sub.toLowerCase()}, ${R.w} means ${o[0]}.`);
  if(S.r<list.length-1)later([()=>{if(S.r===k){S.r++;S.ok=0;S.found=0;update()}}],800);return}
 S.miss=i;A.sound.miss();update(o[1])}
// ---------- step 5: drop the precise word into the gap (drag) ----------
function chipsR(){const gap=8,w=(A.W-20-gap*2)/3;return[0,1,2].map(i=>({x:10+i*(w+gap),y:A.H*.6,w,h:A.H*.18}))}
function drawGap(g){const C=A.col,R=GAPS[Math.min(S.r,2)],top={x:10,y:10,w:A.W-20,h:A.H*.36};panel(g,top,C.mu,.06);badge(R.sub,top.x+8,top.y+12);
 const fill=S.ok?R.opts.find(o=>!o[1])[0]:'□□□□□□',ws=[...R.a.split(' '),fill,...R.b.split(' ')],gi=R.a.split(' ').length,bx=flow(g,ws,{x:top.x,y:top.y+22,w:top.w,h:top.h},16);
 bx.forEach(b=>{if(b.i===gi){S.hole=asRect(b);panel(g,S.hole,S.ok?C.gr:S.miss>=0?C.rd:C.or,.2,1);if(!S.ok)return}g.font=ft(16);g.textAlign='left';g.textBaseline='middle';g.fillStyle=C.tx;g.fillText(b.w,b.tx,b.ty)});
 write(g,'Drag the most precise word into the gap',A.W/2,A.H*.53,13,C.tx,800);S.chips=chipsR();
 S.chips.forEach((r,i)=>{if(S.ok&&!R.opts[i][1])return;const held=S.grab===i+1&&S.pt,q=held?{x:S.pt.x-r.w/2,y:S.pt.y-r.h/2,w:r.w,h:r.h}:r;panel(g,q,S.miss===i?C.rd:C.vi,.16,held);write(g,R.opts[i][0],q.x+q.w/2,q.y+q.h/2,14,C.tx,800)})}
function fillGap(i){const R=GAPS[S.r];if(S.ok||S.r>2)return;const o=R.opts[i];
 if(!o[1]){S.ok=1;S.miss=-1;A.sound.pop();const k=S.r;update(`Yes: "${R.a} ${o[0]} ${R.b}" uses the ${R.sub.toLowerCase()} word.`);if(S.r<2)later([()=>{if(S.r===k){S.r++;S.ok=0;update()}}],800);return}
 S.miss=i;A.sound.miss();update(o[1])}
function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.32);g.fillRect(0,0,W,H);const m=phase();
 if(m==='shelf')drawShelf(g);if(m==='mean'||m==='clue'||m==='think')drawChoice(g);if(m==='gap')drawGap(g);if(m==='quiz')write(g,'📚',W/2,H/2,64);A.fx.draw(g)}
// ---------- live text and buttons ----------
function update(msg){const m=phase();let t='';
 if(m==='shelf'&&TERMS[S.q])t=`Word: ${TERMS[S.q][0]}. Which shelf?`;
 if((m==='mean'||m==='think')&&!S.ok)t=round().s;
 if(m==='clue'&&!S.ok)t=round().s+(S.found?'':` Tap a clue word for ${round().w}.`);
 if(m==='gap'&&!S.ok)t=`${GAPS[S.r].a} blank ${GAPS[S.r].b}`;
 narrate((msg?msg+' ':'')+t);controls();S.onChange()}
function controls(){if(!A||!ctl)return;ctl.innerHTML='';const m=phase(),add=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);e.onclick=f};
 if(m==='shelf'&&TERMS[S.q])SHELVES.forEach((s,i)=>add(`${s[0]} ${s[1]}`,()=>shelve(i),`Put ${TERMS[S.q][0]} on the ${s[1]} shelf`));
 if(m==='clue'&&!S.found&&!S.ok){const R=round(),ws=R.s.split(' ');R.cand.forEach(i=>add(`🔎 ${ws[i]}`,()=>tapWord(i),`Is "${ws[i]}" a clue?`))}
 else if((m==='mean'||m==='clue'||m==='think')&&!S.ok)round().opts.forEach((o,i)=>add(o[0],()=>choose(i)));
 if(m==='gap'&&!S.ok)GAPS[S.r].opts.forEach((o,i)=>add(o[0],()=>fillGap(i),`Put ${o[0]} in the gap`));A.redraw()}
// ---------- canvas input ----------
function press(p){const m=phase();S.pt=p;S.p0=p;
 if(m==='shelf'){if(TERMS[S.q]&&within(p,S.chip)){S.grab=1;A.redraw();return true}const k=(S.shelves||[]).findIndex(r=>within(p,r));if(k>=0)shelve(k);return false}
 if(m==='gap'){const k=(S.chips||[]).findIndex(r=>within(p,r));if(k>=0&&!S.ok){S.grab=k+1;A.redraw();return true}return false}
 const w=(S.words||[]).find(b=>within(p,asRect(b)));if(w&&m==='clue'&&!S.found){tapWord(w.i);return false}
 const k=(S.opts||[]).findIndex(r=>within(p,r));if(k>=0)choose(k);return false}
function release(p){const m=phase(),g=S.grab;S.grab=0;S.pt=null;if(!g)return;
 if(m==='shelf'){const k=shelfR().findIndex(r=>within(p,r));return k>=0?shelve(k):update('Drop it on a shelf.')}
 const tap=Math.hypot(p.x-S.p0.x,p.y-S.p0.y)<8;if(tap||within(p,S.hole))fillGap(g-1);else update('Drop the word in the gap.')}
// ---------- steps ----------
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const later=(fns,ms)=>{const k=S.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===S.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
const reset=()=>{S.tok=(S.tok||0)+1;Object.assign(S,{onChange:()=>{},q:0,placed:[],miss:-1,grab:0,pt:null,r:0,ok:0,found:0,words:null,opts:null,chips:null,hole:null})};
const right=R=>R.opts.findIndex(o=>!o[1]);
const auto=(list,extra)=>list.map((R,k)=>()=>{S.ok=0;S.r=k;if(extra){S.found=0;extra(R)}choose(right(R))});
const steps=[
 {h:'Subject words',p:'Each subject has its own words. Drag each word to the subject it belongs to, or use the buttons.',task:'Shelve 6 words',
  show:()=>{steps[0].go();later(TERMS.map(t=>()=>shelve(t[1])),420)},go:()=>{reset();update();S.onChange=finish(0,()=>S.q>=TERMS.length,'Subject words name ideas that belong to one subject.')}},
 {h:'Same word, new meaning',p:'Some everyday words mean something exact in a subject. Read the sentence. What does the purple word mean here?',
  predict:{q:'"The product of 6 and 3 is 18." Here, product means…',opts:['something made in a factory','the answer to a multiplication'],ans:1},task:'Pick the subject meaning 3 times',
  show:()=>{steps[1].go();later(auto(MEAN),900)},go:()=>{reset();update();S.onChange=finish(1,()=>S.r===2&&S.ok,'Check which subject you are in before you trust the everyday meaning.')}},
 {h:'Clue hunt',p:'A new subject word is often explained nearby. Tap a word that helps explain it. Then choose the meaning.',task:'Work out 3 new words',
  show:()=>{steps[2].go();later(auto(CLUE,R=>tapWord(R.clue[0])),900)},go:()=>{reset();update();S.onChange=finish(2,()=>S.r===2&&S.ok,'Context clues and glossaries unlock new subject words.')}},
 {h:'Words that set the task',p:'Words like contrast, summarise and evidence tell you what to do. Pick the answer that does what the task word asks.',
  predict:{q:'"Contrast frogs and toads" asks you to…',opts:['say how they are alike','say how they are different'],ans:1},task:'Match 3 task words',
  show:()=>{steps[3].go();later(auto(THINK),900)},go:()=>{reset();update();S.onChange=finish(3,()=>S.r===2&&S.ok,'Task words tell you the job: different, short, or proof.')}},
 {h:'Say it precisely',p:'Swap a vague word for the exact subject word. Drag a word into the gap, or tap a button.',
  predict:{q:'A friend says: "Area is the distance around a shape." Right?',opts:['Yes, that is area','No, that is perimeter'],ans:1},task:'Fill 3 gaps',
  show:()=>{steps[4].go();later(GAPS.map((R,k)=>()=>{S.ok=0;S.r=k;fillGap(right(R))}),900)},go:()=>{reset();update();S.onChange=finish(4,()=>S.r===2&&S.ok,'The precise word says exactly what you mean.')}},
 {h:'Challenge',p:'',go:()=>{reset();pose()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.onChange()});
// ---------- challenge ----------
const QS=[['In maths, "Find the difference between 12 and 5." What do you do?',[['Subtract: 12 − 5 = 7','ok'],['Say how 12 and 5 look different','everyday'],['Add: 12 + 5 = 17','mixup']]],
 ['"Compare a cat and a dog" asks you to…',[['Say how they are alike and how they differ','ok'],['Only say how they differ','contrast'],['Describe the cat','one']]],
 ['In science, "The table shows our results." What is a table here?',[['Rows and columns of data','ok'],['Furniture you eat at','everyday'],['A list of times tables','mixup']]],
 ['Which sentence uses the most precise science word?',[['The ice melted in the sun.','ok'],['The ice went away in the sun.','vague'],['The ice evaporated in the sun.','mixup']]],
 ['"The river\u2019s source is in the hills." What does source mean here?',[['Where the river starts','ok'],['A book that gives facts','subject'],['Sauce for food','everyday']]],
 ['Which is evidence that exercise speeds up the heart?',[['My pulse went from 70 to 120 beats a minute after running.','ok'],['Exercise is good for you.','claim'],['I love running.','claim']]]];
function slip(t){let m='Think about which subject you are in.';
 if(t==='everyday')m='That is the everyday meaning. In this subject the word has an exact meaning.';
 if(t==='subject')m='That meaning belongs to a different subject. Here the topic is rivers.';
 if(t==='mixup')m='That is a different subject word. Check exactly what each word means.';
 if(t==='contrast')m='That is contrast. Compare asks for how they are alike as well as different.';
 if(t==='one')m='That covers only one of them. The task asks about both.';
 if(t==='vague')m='True, but vague. A subject word says exactly what happened.';
 if(t==='claim')m='That is a claim or a feeling. Evidence is a fact or measurement that shows it.';return m}
let qi=-1,streak=0;
function pose(){qi++;const[q,ops]=QS[qi%QS.length],turn=qi%3;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});narrate('Challenge: '+q);A.redraw()}
function grade(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),good=t==='ok';
 if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(good?`✓ Right. Streak: ${streak}.`:'✗ '+slip(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.66,tall:1.4,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Actions'},w);chal=E('div',{class:'fl-chal'},A.below);
  reset();A.gest({down:press,move:p=>{S.pt=p;if(S.grab)A.redraw()},up:release});controls()}});
A.start()})})();
