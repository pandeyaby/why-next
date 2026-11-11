/* Flagship – shared research projects (ages 5–9): as a class, find out "What do hedgehogs eat?". Pick a real research
   question (not a topic word or an opinion question); sweep a magnifier over four sources and learn that a made-up story
   is not a source of facts, while a non-fiction book, an expert and your own experience are; keep only the facts that
   answer the question; tap key words to make notes; then build the class poster, leaving off a repeat and an opinion. */
(()=>{const hy=Math.hypot;
const ASK=[['Hedgehogs','topic','“Hedgehogs” is our topic, but it is not a question. What do we want to find out about them?'],['What do hedgehogs eat?','ok'],['Do you like hedgehogs?','opin','“Do you like them?” asks what someone feels. Books cannot find that out. Ask something with a fact for an answer.']];
const SRC=[['📘','Fact book','A non-fiction book about real hedgehogs.',1],['📕','Story book','Harry the Hedgehog has cake at his party. It is made up!',0],['🧑‍🌾','Park ranger','An expert. She looks after hedgehogs.',1],['👴','Grandpa','He saw a hedgehog eat a slug in his garden.',1]];
const FACTS=[['Hedgehogs eat beetles.',0],['Hedgehogs have thousands of spines.',1],['Hedgehogs eat slugs and worms.',0],['Hedgehogs sleep through the winter.',1],['Hedgehogs eat caterpillars.',0],['Baby hedgehogs are called hoglets.',1]];
const LINE=['At','night,','hedgehogs','hunt','for','beetles,','worms','and','slugs.'],FOOD=[5,6,8];
const CARDS=[['🪲 beetles','from the fact book','add'],['🐌 slugs','Grandpa saw it','add'],['🪲 beetles','from the ranger','dup'],['😍 Hedgehogs are the cutest!','Dee says','opin'],['🪱 worms','from the ranger','add']];
VIS.reg('flagresearch',c=>{let A,ctl,chal,ask=-1,streak=0;c.fig.classList.add('young');
const S={t:0,want:()=>{},q:-1,mag:null,used:{},f:0,kept:[],no:-1,picked:[],c:0,poster:[],off:[],drag:null};
const now=()=>['ask','where','fit','notes','poster','quiz'][A.step];
const speak=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const px=n=>Math.round(n*(A.narrow?1.05:1.2));
function lab(g,t,x,y,n,col,wt){g.font=`${wt||700} ${px(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-10)}
function tile(g,r,fill,edge,lw){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=lw||2;g.strokeStyle=edge;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}
const isIn=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
const qCard=i=>({x:A.W*.08,y:A.H*(.2+i*.25),w:A.W*.84,h:A.H*.19});
const src=i=>A.narrow?{x:6+(i%2)*(A.W/2),y:A.H*(.06+Math.floor(i/2)*.36),w:A.W/2-12,h:A.H*.32}:{x:6+i*(A.W/4),y:A.H*.1,w:A.W/4-12,h:A.H*.55};
const magHome=()=>({x:A.W/2,y:A.H*.88});
const top=()=>({x:A.W*.1,y:A.H*.05,w:A.W*.8,h:A.H*.18}),half=i=>({x:6+i*A.W/2,y:A.H*.3,w:A.W/2-12,h:A.H*.66});
const wbox=i=>{const per=A.narrow?3:5,w=(A.W-16)/per-6;return{x:8+(i%per)*(w+6),y:A.H*(.2+Math.floor(i/per)*.17),w,h:A.H*.13}};
const board=()=>({x:A.W*.05,y:A.H*.3,w:A.W*.58,h:A.H*.66}),bin=()=>({x:A.W*.66,y:A.H*.3,w:A.W*.3,h:A.H*.66});
function draw(A){const{ctx:g,W,H,col:C}=A,v=now();g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){lab(g,'❓ question → 📚 sources',W/2,H*.36,16,C.tx,800);lab(g,'→ ✏️ notes → 📰 share',W/2,H*.52,16,C.tx,800);return}
 if(v==='ask'){lab(g,'🦔 Our class project',W/2,H*.08,15,C.tx,800);ASK.forEach(([t],i)=>{const r=qCard(i),on=S.q===i;tile(g,r,A.alpha(on&&ASK[i][1]==='ok'?C.gr:C.cy,on?.3:.12),on&&ASK[i][1]!=='ok'?C.rd:C.tx,on?4:2);lab(g,t,r.x+r.w/2,r.y+r.h/2,15,C.tx,800)})}
 if(v==='where'){SRC.forEach(([e,n,d,ok],i)=>{const r=src(i),seen=S.used[i];tile(g,r,A.alpha(seen?(ok?C.gr:C.rd):C.or,seen?.22:.14),C.tx);lab(g,e,r.x+r.w/2,r.y+r.h*.25,30);lab(g,n,r.x+r.w/2,r.y+r.h*.52,12,C.tx,800);
   if(seen)lab(g,ok?'✓ useful':'✗ made up',r.x+r.w/2,r.y+r.h*.78,12,C.tx,800)});
  const m=S.mag||magHome();g.strokeStyle=C.vi;g.lineWidth=5;g.beginPath();g.arc(m.x,m.y,px(18),0,7);g.stroke();g.beginPath();g.moveTo(m.x+px(13),m.y+px(13));g.lineTo(m.x+px(26),m.y+px(26));g.stroke();lab(g,'🔍',m.x,m.y,13)}
 if(v==='fit'){const t=top();lab(g,'Our question: What do hedgehogs eat?',W/2,H*.27,11,C.tx,700);
  if(S.f<FACTS.length){const r=S.drag?{...t,x:S.drag.x-t.w/2,y:S.drag.y-t.h/2}:t;tile(g,r,A.alpha(C.or,.28),C.tx);lab(g,FACTS[S.f][0],r.x+r.w/2,r.y+r.h/2,13,C.tx,800)}else lab(g,'All checked!',W/2,t.y+t.h/2,16,C.gr,800);
  ['🍽 Answers it','📦 True, not about food'].forEach((n,i)=>{const r=half(i);tile(g,r,A.alpha([C.gr,C.cy][i],.12),S.no===i?C.rd:C.tx,S.no===i?4:2);lab(g,n,r.x+r.w/2,r.y+px(16),A.narrow?11:13,C.tx,800);
   S.kept.filter(k=>FACTS[k][1]===i).forEach((k,j)=>lab(g,FACTS[k][0].replace('Hedgehogs ','').replace('Baby hedgehogs','babies'),r.x+r.w/2,r.y+px(44)+j*px(24),A.narrow?9:11,C.tx,600))})}
 if(v==='notes'){lab(g,'Tap the words that answer our question.',W/2,H*.08,12,C.tx,700);LINE.forEach((w,i)=>{const r=wbox(i),on=S.picked.includes(i);tile(g,r,A.alpha(on?C.gr:C.cy,on?.3:.1),S.no===i?C.rd:C.tx,S.no===i?4:on?3:1.5);lab(g,w,r.x+r.w/2,r.y+r.h/2,13,C.tx,on?800:600)});
  const n={x:W*.15,y:H*.76,w:W*.7,h:H*.2};tile(g,n,A.alpha(C.am,.14),C.tx);lab(g,'✏️ Notes: '+(S.picked.map(i=>LINE[i].replace(/[.,]/g,'')).join(', ')||'…'),W/2,n.y+n.h/2,13,C.tx,800)}
 if(v==='poster'){const b=board(),o=bin();tile(g,b,A.alpha(C.gr,.12),C.tx);tile(g,o,A.alpha(C.ln,.16),S.no===1?C.rd:C.tx,S.no===1?4:2);
  lab(g,'📰 What do hedgehogs eat?',b.x+b.w/2,b.y+px(16),A.narrow?11:13,C.tx,800);S.poster.forEach((k,j)=>{lab(g,CARDS[k][0],b.x+b.w/2,b.y+px(46)+j*px(36),13,C.tx,800);lab(g,CARDS[k][1],b.x+b.w/2,b.y+px(62)+j*px(36),A.narrow?8:10,C.tx,500)});
  lab(g,'🚫 Leave off',o.x+o.w/2,o.y+px(16),A.narrow?11:13,C.tx,800);S.off.forEach((k,j)=>lab(g,CARDS[k][2]==='dup'?'repeat':'opinion',o.x+o.w/2,o.y+px(44)+j*px(22),A.narrow?9:11,C.tx,600));
  if(S.c<CARDS.length){const d=S.drag||{x:W/2,y:H*.14},r={x:d.x-W*.3,y:d.y-H*.1,w:W*.6,h:H*.2};tile(g,r,A.alpha(C.or,.3),C.tx);lab(g,CARDS[S.c][0],d.x,d.y-H*.03,13,C.tx,800);lab(g,CARDS[S.c][1],d.x,d.y+H*.05,A.narrow?9:10,C.tx,600)}}
 A.fx.draw(g)}
const oops=t=>{A.sound.miss();speak(t);A.redraw()},nice=t=>{A.sound.pop();speak(t);controls();A.redraw();S.want()};
function choose(i){S.q=i;const[t,k,why]=ASK[i];if(k!=='ok')return oops(why);nice('“What do hedgehogs eat?” is a research question: we can find facts that answer it.')}
function inspect(i){S.mag=null;if(i<0)return A.redraw();S.used[i]=1;const[,n,d,ok]=SRC[i];if(!ok)return oops(`${n}: ${d} A story is fun, but we cannot use it for facts.`);nice(`${n}: ${d} We can use it to find facts.`)}
const found=()=>SRC.filter((s,i)=>s[3]&&S.used[i]).length;
function place(b){S.drag=null;if(S.f>=FACTS.length||b<0)return A.redraw();const[t,k]=FACTS[S.f];
 if(b!==k){S.no=b;return oops(k?`“${t}” is true, but it does not tell us what they eat. Save it for another question.`:`“${t}” tells us food, so it answers our question.`)}S.no=-1;S.kept.push(S.f);S.f++;nice(k?`True, but not about food: “${t}”`:`Keep it: “${t}”`)}
function note(i){if(S.picked.includes(i))return;if(!FOOD.includes(i)){S.no=i;const w=LINE[i].replace(/[.,]/g,'');return oops(/night/.test(w)?'“night” tells when they hunt, not what they eat.':/hedgehogs/.test(w)?'We already know it is about hedgehogs. Notes keep the new facts.':`“${w}” is not a key word. Notes skip small words.`)}
 S.no=-1;S.picked.push(i);nice(`Note: ${LINE[i].replace(/[.,]/g,'')}. A few key words, not the whole sentence.`)}
function file(to){S.drag=null;if(S.c>=CARDS.length||to<0)return A.redraw();const[t,,k]=CARDS[S.c];
 if(to===0&&k!=='add'){S.no=0;return oops(k==='dup'?'We already have beetles on the poster. Saying it twice adds nothing new.':'“The cutest” is what Dee feels. It is an opinion, not a fact about food.')}
 if(to===1&&k==='add'){S.no=1;return oops(`${t} is a new fact that answers our question. Put it on the poster.`)}
 S.no=-1;(to?S.off:S.poster).push(S.c);S.c++;nice(to?(k==='dup'?'Left off: a repeat.':'Left off: an opinion.'):`Added ${t}, and we say where it came from.`)}
function controls(){if(!ctl)return;ctl.innerHTML='';const v=now(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='ask')ASK.forEach(([t],i)=>B(t,()=>choose(i),'Choose: '+t));
 if(v==='where')SRC.forEach(([e,n],i)=>{if(!S.used[i])B(e+' Check '+n,()=>inspect(i))});
 if(v==='fit'&&S.f<FACTS.length){B('🍽 Answers it',()=>place(0));B('📦 Not about food',()=>place(1))}
 if(v==='notes')LINE.forEach((w,i)=>{if(!S.picked.includes(i))B(w.replace(/[.,]/g,''),()=>note(i),'Note the word '+w.replace(/[.,]/g,''))});
 if(v==='poster'&&S.c<CARDS.length){B('📰 Add to poster',()=>file(0));B('🚫 Leave it off',()=>file(1))}A.redraw()}
function down(p){const v=now();
 if(v==='ask'){const i=ASK.findIndex((_,i)=>isIn(p,qCard(i)));if(i>=0)choose(i);return false}
 if(v==='where'){const m=S.mag||magHome();if(hy(p.x-m.x,p.y-m.y)<px(40)){S.mag={x:p.x,y:p.y};return true}const i=SRC.findIndex((_,i)=>isIn(p,src(i)));if(i>=0)inspect(i);return false}
 if(v==='fit'&&S.f<FACTS.length&&isIn(p,top())){S.drag={x:p.x,y:p.y};return true}
 if(v==='notes'){const i=LINE.findIndex((_,i)=>isIn(p,wbox(i)));if(i>=0)note(i);return false}
 if(v==='poster'&&S.c<CARDS.length&&p.y<A.H*.28){S.drag={x:p.x,y:p.y};return true}return false}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y}if(S.mag)S.mag={x:p.x,y:p.y};A.redraw()}
function up(p){const v=now();
 if(v==='where'&&S.mag)return inspect(SRC.findIndex((_,i)=>isIn(p,src(i))));
 if(v==='fit'&&S.drag)return place([0,1].find(i=>isIn(p,half(i)))??-1);
 if(v==='poster'&&S.drag)return file(isIn(p,board())?0:isIn(p,bin())?1:-1)}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const auto=(fs,ms)=>{const k=++S.t;fs.forEach((fn,j)=>setTimeout(()=>{if(k===S.t)fn()},A.reduced()?j*25+25:(j+1)*ms))};
const wipe=()=>{S.t++;Object.assign(S,{want:()=>{},q:-1,mag:null,used:{},f:0,kept:[],no:-1,picked:[],c:0,poster:[],off:[],drag:null})};
const steps=[
{h:'Ask a research question',p:'Research means finding out. First we need a question that facts can answer. Tap the best one.',
 predict:{q:'Can we research “Hedgehogs”?',opts:['Yes, it is a question','No, it is a topic, not a question'],ans:1},task:'Pick our research question',
 show:()=>{steps[0].go();auto([()=>choose(1)],500)},go:()=>{wipe();speak('Which one is a research question?');controls();S.want=fin(0,()=>S.q===1,'A good research question has facts for an answer.')}},
{h:'Where can we find out?',p:'A source is where facts come from. Drag the magnifier onto each one to check it.',
 predict:{q:'Harry the Hedgehog eats cake in a story. Is that a fact?',opts:['Yes, it is in a book','No, a story is made up'],ans:1},task:'Find the 3 useful sources',
 show:()=>{steps[1].go();auto([0,1,2,3].map(i=>()=>inspect(i)),550)},go:()=>{wipe();speak('Check the fact book, story book, park ranger and Grandpa.');controls();S.want=fin(1,()=>found()>=3,'Books with facts, experts and what we saw ourselves are all sources.')}},
{h:'Does it answer our question?',p:'The fact book has lots of facts. Keep the ones about food. Drag each fact into a box.',task:'Check all 6 facts',
 show:()=>{steps[2].go();auto(FACTS.map(f=>()=>place(f[1])),430)},go:()=>{wipe();speak('Hedgehogs eat beetles. Does it answer our question?');controls();S.want=fin(2,()=>S.f>=6,'A true fact is only useful if it answers our question.')}},
{h:'Make notes',p:'Notes are a few key words, not the whole sentence. Tap the food words.',
 predict:{q:'Good notes are…',opts:['every word copied out','a few key words'],ans:1},task:'Note the 3 food words',
 show:()=>{steps[3].go();auto(FOOD.map(i=>()=>note(i)),500)},go:()=>{wipe();speak('At night, hedgehogs hunt for beetles, worms and slugs.');controls();S.want=fin(3,()=>S.picked.length>=3,'beetles, worms, slugs: short notes we can use to write.')}},
{h:'Share it as a class',p:'Everyone brings a card. Drag it onto the poster, or into Leave off.',task:'Finish the class poster',
 show:()=>{steps[4].go();auto(CARDS.map(k=>()=>file(k[2]==='add'?0:1)),480)},go:()=>{wipe();speak('Ava found beetles in the fact book. Add it, or leave it off?');controls();S.want=fin(4,()=>S.c>=5,'Our poster answers the question, with no repeats and no opinions.')}},
{h:'Challenge',p:'',go:()=>{wipe();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which is a research question?',[['Where do owls sleep?','ok'],['Owls','topic'],['Are owls the best bird?','opin']]],
 ['We want facts about real bees. Which source is best?',[['A non-fiction bee book','ok'],['A story about a talking bee','story'],['A bee colouring page','nofact']]],
 ['Our question: What do frogs eat? Which fact helps?',[['Frogs eat flies.','ok'],['Frogs can jump far.','offq'],['Frogs are green.','offq2']]],
 ['Good notes about “Cows eat grass and hay in the barn” are…',[['grass, hay','ok'],['Cows eat grass and hay in the barn','copy'],['the, in','small']]],
 ['Two friends both found “bats eat moths”. On the poster we write it…',[['once','ok'],['twice','twice'],['not at all','none']]],
 ['Grandma saw a fox in her garden. Can we use that?',[['Yes, it is her own experience','ok'],['No, only books count','books'],['No, it is an opinion','notop']]]];
function why(t){let m='Think: does it help answer our question with a fact?';
 if(t==='topic')m='“Owls” is a topic. A research question asks something, like where or what.';
 if(t==='opin')m='“The best” is an opinion. Research questions have facts for answers.';
 if(t==='story')m='A story can be made up. For facts, use a non-fiction book or an expert.';
 if(t==='nofact')m='A colouring page has pictures, not facts to read.';
 if(t==='offq')m='True, but it is about jumping. Our question is about food.';
 if(t==='offq2')m='True, but colour does not tell us what frogs eat.';
 if(t==='copy')m='That copies the whole sentence. Notes are a few key words.';
 if(t==='small')m='Small words like “the” and “in” are not key words.';
 if(t==='twice')m='Saying the same fact twice adds nothing new. Write it once.';
 if(t==='none')m='It is a real fact that answers the question, so it goes on once.';
 if(t==='books')m='What we see for ourselves is a source too. Grandma saw it.';
 if(t==='notop')m='Seeing a fox is not an opinion. It really happened.';
 return m}
function next(){ask++;const[q,ops]=QS[ask%QS.length],r=ask%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});speak('Challenge: '+q);A.redraw()}
function grade(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(ok?`✓ Yes! Streak: ${streak}.`:'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});controls()}});
A.start()})})();
