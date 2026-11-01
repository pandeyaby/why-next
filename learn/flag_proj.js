/* Flagship – short research projects (ages 8–11), topic: volcanoes. Plan three research questions that each cover a
   different part of the topic (not a feeling, a yes/no or "everything"); sort print and digital sources into ones you
   can use and ones to leave out (no author, a made-up story, an advert); turn a source sentence into a short note in your
   own words without changing the fact; sort notes into categories that match the questions; then cross-check a fact in
   two sources and check further when they disagree. Challenge on the usual slips: topics or opinions as questions,
   copying, changed facts, "the internet" as a source, trusting the first thing found. */
(()=>{
const PLAN=[['Where are most volcanoes found?','where'],['Why do volcanoes erupt?','why'],['What warns people that a volcano may erupt?','warn'],['What makes a volcano erupt?','why'],['Are volcanoes scary?','opin'],['Do volcanoes exist?','yes'],['Tell me everything about volcanoes.','big']];
const PBAD={opin:'Nobody can look up how scary something is. That asks for a feeling, not facts.',yes:'One word, “yes”, answers that. There is nothing to research.',big:'That is the whole topic, not one question. It is too big for a short project.'};
const SRC=[['📘 Encyclopedia of Earth, 2023','ok'],['💻 USGS volcano website (scientists)','ok'],['📘 World atlas','ok'],['💻 Video: a volcano scientist explains','ok'],['💻 Forum post, no name, no date','anon'],['📘 Story: The Dragon in the Volcano','story'],['💻 Advert: volcano holiday trips','ad']];
const SBAD={anon:'No name and no date: you cannot check who wrote it or if it is up to date.',story:'A story is made up. It is fun, but it is not a source of facts.',ad:'An advert wants to sell you something, so it only shows the good bits.'};
const NOTE=[['Encyclopedia of Earth','Most of the world’s active volcanoes are found around the edge of the Pacific Ocean, in a zone called the Ring of Fire.','most volcanoes: round the Pacific edge (“Ring of Fire”)','All volcanoes are in the Pacific Ocean.','It says “most”, not “all”, and “around the edge”, not in the sea. That note changed the fact.'],
 ['USGS website','Magma is melted rock under the ground. When it comes out of a volcano, it is called lava.','magma = melted rock underground; lava = once it comes out','Lava is melted rock under the ground.','Under the ground it is called magma. It is only lava once it comes out.'],
 ['Video: a volcano scientist','Scientists watch for lots of small earthquakes and for the ground swelling up, because these can be signs that magma is rising.','warning signs: many small quakes, ground swells → magma rising','Earthquakes make volcanoes.','The source says small quakes can be a sign of rising magma. It does not say quakes make volcanoes.']];
const CATS=['Where?','Why erupt?','Warning signs'];
const NOTES=[['Ring of Fire round the Pacific',0],['gas pressure builds up',1],['many small earthquakes',2],['hot spots, like Hawaii',0],['magma rises: lighter than rock',1],['the ground swells up',2]];
const CHECK=[['Encyclopedia','Mauna Loa in Hawaii is the largest active volcano on Earth.','USGS website','Mauna Loa is Earth’s largest active volcano.',0],
 ['Forum post, no name','Volcanoes are only found in hot countries.','Encyclopedia','Iceland and Alaska have many active volcanoes.',1],
 ['Volcano scientist (video)','Lava can be hotter than 1,000 °C.','USGS website','Lava erupts at about 700 to 1,200 °C.',0]];
VIS.reg('flagproj',c=>{let A,ctl,chal,qn=-1,streak=0;
const S={run:0,k:0,used:[],box:[[],[],[]],sel:-1,drag:null,bad:-1,msg:'',want:()=>{}};
const kind=()=>['plan','src','note','sort','check','quiz'][A.step];
const f=n=>Math.round(n*(A.narrow?1:1.15));
function say(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function lines(g,t,w){const out=[];let s='';t.split(' ').forEach(x=>{const y=s?s+' '+x:x;if(g.measureText(y).width>w&&s){out.push(s);s=x}else s=y});out.push(s);return out}
function para(g,t,x,y,w,n,wt,al){g.font=`${wt||600} ${f(n)}px system-ui,sans-serif`;g.textAlign=al||'left';g.textBaseline='middle';g.fillStyle=A.col.tx;const L=lines(g,t,w);L.forEach((l,i)=>g.fillText(l,x,y+i*f(n)*1.25));return L.length*f(n)*1.25}
function card(g,r,fill,edge,lw,dash){g.save();if(dash)g.setLineDash([6,4]);g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.strokeStyle=edge;g.lineWidth=lw||1.5;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.stroke();g.restore()}
// the cards still waiting to be placed: [text, index]
function deck(){const v=kind();if(v==='plan')return PLAN.map((p,i)=>[p[0],i]).filter(x=>!S.used.includes(x[1]));
 if(v==='src')return SRC.map((p,i)=>[p[0],i]).filter(x=>!S.used.includes(x[1]));
 if(v==='note'&&S.k<3){const q=NOTE[S.k],o=[[q[2],0],[q[1],1],[q[3],2]],t=S.k%3;return o.slice(t).concat(o.slice(0,t))}
 if(v==='sort')return NOTES.map((p,i)=>[p[0],i]).filter(x=>!S.used.includes(x[1]));return[]}
function zones(){const v=kind(),W=A.W,y=f(26);
 if(v==='plan')return[0,1,2].map(i=>({x:10,y:y+i*f(40),w:W-20,h:f(34),l:`Question ${i+1}`}));
 if(v==='src')return[0,1].map(i=>({x:10+i*(W-20)/2,y,w:(W-20)/2-6,h:f(66),l:i?'✗ Leave out':'✓ Use'}));
 if(v==='note')return[{x:10,y:noteTop(),w:W-20,h:f(40),l:'📒 My notebook'}];
 if(v==='sort')return[0,1,2].map(i=>({x:10+i*(W-20)/3,y,w:(W-20)/3-6,h:f(92),l:CATS[i]}));return[]}
let srcH=0;const noteTop=()=>f(30)+srcH+f(10);
function deckTop(){const z=zones(),L=z[z.length-1];return L?L.y+L.h+f(14):f(40)}
function slot(j,n){const v=kind(),cols=v==='note'?1:2,w=(A.W-20-(cols-1)*8)/cols,h=f(v==='note'?44:40),t=deckTop();return{x:10+(j%cols)*(w+8),y:t+Math.floor(j/cols)*(h+7),w,h}}
function draw(A){const{ctx:g,W,H,col:C}=A,v=kind();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){[['Ask questions facts can answer.',.3],['Use sources you can check.',.44],['Notes: key words, your own words.',.58],['Check facts in two sources.',.72]].forEach(([t,y])=>para(g,t,W/2,H*y,W-20,15,800,'center'));return}
 g.font=`700 ${f(12)}px system-ui,sans-serif`;g.textAlign='left';g.fillStyle=C.tx;g.textBaseline='middle';
 const top={plan:`Plan: ${S.used.length} of 3 questions`,src:`Sorted ${S.used.length} of 7 sources`,note:S.k<3?`Note ${S.k+1} of 3`:'Three notes made',sort:`Sorted ${S.used.length} of 6 notes`,check:S.k<3?`Fact ${S.k+1} of 3`:'All checked'}[v];g.fillText(top,10,f(12));
 if(v==='note'&&S.k<3){const q=NOTE[S.k];g.font=`600 ${f(13)}px system-ui,sans-serif`;srcH=lines(g,q[1],W-40).length*f(13)*1.25+f(24);card(g,{x:10,y:f(24),w:W-20,h:srcH},A.alpha(C.cy,.12),C.tx);para(g,'Source: '+q[0],20,f(24)+f(10),W-40,11,800);para(g,q[1],20,f(24)+f(26),W-40,13,600)}
 if(v==='check'&&S.k<3){const q=CHECK[S.k];[[q[0],q[1]],[q[2],q[3]]].forEach(([s,t],i)=>{const r={x:10,y:f(24)+i*f(76),w:W-20,h:f(68)};card(g,r,A.alpha(i?C.gr:C.or,.14),C.tx);para(g,s+' says:',20,r.y+f(12),W-40,11,800);para(g,'“'+t+'”',20,r.y+f(30),W-40,13,600)});
  verdicts().forEach((r,i)=>{card(g,r,A.alpha(S.bad===i?C.rd:C.vi,.22),C.tx,2);para(g,i?'🔍 They disagree: check more':'✓ They agree: use it',r.x+r.w/2,r.y+r.h/2,r.w-12,13,800,'center')})}
 zones().forEach((z,i)=>{const hot=S.drag&&S.drag.x!=null&&inside({x:S.drag.x,y:S.drag.y},z);card(g,z,A.alpha(S.bad===100+i?C.rd:hot?C.gr:C.or,hot||S.bad===100+i?.3:.12),C.tx,2,!S.box[i].length);
  g.font=`800 ${f(12)}px system-ui,sans-serif`;g.textAlign='left';g.fillStyle=C.tx;g.fillText(z.l,z.x+8,z.y+f(11),z.w-14);
  g.font=`600 ${f(11)}px system-ui,sans-serif`;S.box[i].forEach((t,j)=>g.fillText(t,z.x+8,z.y+f(25)+j*f(13),z.w-14))});
 deck().forEach(([t],j)=>{let r=slot(j);if(S.drag&&S.drag.j===j&&S.drag.x!=null)r={...r,x:S.drag.x-r.w/2,y:S.drag.y-r.h/2};card(g,r,A.alpha(S.sel===j?C.gr:C.cy,S.sel===j?.3:.16),C.tx,S.sel===j?3:1.5);
  g.font=`600 ${f(12)}px system-ui,sans-serif`;const L=lines(g,t,r.w-12).slice(0,2);g.fillStyle=C.tx;g.textAlign='center';L.forEach((l,i)=>g.fillText(l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*f(14)))});
 if(S.msg){g.font=`800 ${f(12)}px system-ui,sans-serif`;g.textAlign='center';g.fillStyle=C.tx;g.fillText(S.msg,W/2,H-f(10),W-16)}A.fx.draw(g)}
const verdicts=()=>[0,1].map(i=>({x:10+i*(A.W-20)/2,y:f(24)+2*f(76)+f(6),w:(A.W-20)/2-6,h:f(56)}));
const inside=(p,r)=>p&&r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const no=(t,short,z)=>{S.bad=z;S.sel=-1;A.sound.miss();S.msg=short;say(t);ctrl();A.redraw()};
const ok=(t,short)=>{S.bad=-1;S.sel=-1;A.sound.pop();S.msg=short;say(t);ctrl();A.redraw()};
const fin=()=>{S.k=99;S.want()};
// put card j (position in the deck) into zone z
function put(j,z){const v=kind(),d=deck()[j];S.drag=null;if(!d||z<0)return A.redraw();const[t,i]=d;
 if(v==='plan'){const g=PLAN[i][1];if(PBAD[g])return no(PBAD[g],'Not a research question',100+z);
  const twin=S.used.find(u=>PLAN[u][1]===g);if(twin!=null)return no(`That asks the same thing as “${PLAN[twin][0]}” Pick a question about a different part of volcanoes.`,'Same question twice!',100+z);
  S.used.push(i);S.box[S.box[z].length?S.box.findIndex(b=>!b.length):z].push(t);ok(`Added: ${t} It covers a new part of the topic.`,'Good question!');if(S.used.length>=3)fin();return}
 if(v==='src'){const bad=SRC[i][1]!=='ok';if(bad&&z===0)return no(SBAD[SRC[i][1]],'Can you check it?',100);if(!bad&&z===1)return no('That source is made by experts or checked by an editor, and you can see who made it. You can use it.','You can use that one!',101);
  S.used.push(i);S.box[z].push(t.slice(0,2)+' '+t.slice(3,24)+(t.length>27?'…':''));ok(z?`Left out: ${SBAD[SRC[i][1]]}`:`Use it: ${t}. You know who made it.`,z?'Left out':'Trusted source');if(S.used.length>=7){const u=S.used.filter(k=>SRC[k][1]==='ok');S.msg=`Using ${u.filter(k=>SRC[k][0][0]==='📘').length} print and ${u.length-u.filter(k=>SRC[k][0][0]==='📘').length} digital sources`;fin()}return}
 if(v==='note'){const q=NOTE[S.k],kindOf=t===q[2]?0:t===q[1]?1:2;if(kindOf===1)return no('That is the whole sentence copied. A note is a few key words, in your own words.','Copied, not a note',100);
  if(kindOf===2)return no(q[4],'The fact changed!',100);S.box[0]=[t];S.k++;ok(`Saved: ${t}. Short, in your own words, and the fact is still right.`,'✓ Good note');if(S.k>=3)fin();return}
 if(v==='sort'){const want=NOTES[i][1];if(z!==want)return no(`“${t}” answers “${CATS[want]}”, not “${CATS[z]}”.`,'Which question does it answer?',100+z);S.used.push(i);S.box[z].push(t.length>18?t.slice(0,17)+'…':t);ok(`“${t}” goes under ${CATS[z]}.`,'Sorted');if(S.used.length>=6)fin()}}
function judge(i){if(kind()!=='check'||S.k>=3)return;const q=CHECK[S.k];
 if(i!==q[4])return no(i?'Both sources say the same fact, and both are trusted. You can use it, and write down both sources.':'They say different things! Do not just pick one. Check a third trusted source.',i?'They agree!':'They disagree!',i);
 S.k++;ok(i?'They disagree. A trusted encyclopedia shows volcanoes in cold places too, so the forum post is wrong.':`They agree, so the fact is safe to use: ${q[3]}`,i?'Checked further':'✓ Safe to use');if(S.k>=3)fin()}
function ctrl(){if(!ctl)return;ctl.innerHTML='';const v=kind(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='check'&&S.k<3){B('✓ They agree: use it',()=>judge(0));B('🔍 They disagree: check more',()=>judge(1))}
 if(['plan','src','note','sort'].includes(v)&&S.k<3){if(S.sel<0)deck().forEach(([t],j)=>B(t.length>40?t.slice(0,38)+'…':t,()=>{S.sel=j;say('Picked: '+t+'. Now choose where it goes.');ctrl()},'Pick: '+t));
  else{zones().forEach((z,i)=>B('Put in '+z.l,()=>put(S.sel,i)));B('Cancel',()=>{S.sel=-1;ctrl()})}}
 A.redraw()}
function down(p){const v=kind();if(v==='check'){verdicts().forEach((r,i)=>{if(inside(p,r))judge(i)});return false}
 const n=deck().length;for(let j=0;j<n;j++)if(inside(p,slot(j))){S.drag={j,x:null,y:null,x0:p.x,y0:p.y};return true}
 if(S.sel>=0){const z=zones().findIndex(z=>inside(p,z));if(z>=0)put(S.sel,z)}return false}
function move(p){if(!S.drag)return;S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag;if(!d)return;S.drag=null;if(Math.hypot(p.x-d.x0,p.y-d.y0)<8){S.sel=S.sel===d.j?-1:d.j;say(S.sel<0?'Unpicked.':'Picked. Now tap where it goes.');return ctrl()}
 const z=zones().findIndex(z=>inside(p,z));if(z<0){say('Drop it on a box.');return A.redraw()}put(d.j,z)}
const done=(n,msg)=>()=>{if(A.step===n&&S.k===99&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function chain(acts){const k=++S.run;acts.forEach((fn,j)=>setTimeout(()=>{if(k===S.run)fn()},A.reduced()?j*40+30:(j+1)*420))}
const reset=()=>{S.run++;Object.assign(S,{k:0,used:[],box:[[],[],[]],sel:-1,drag:null,bad:-1,msg:'',want:()=>{}})};
const go=(n,t,msg)=>()=>{reset();say(t);ctrl();S.want=done(n,msg)};
const find=(t)=>()=>put(deck().findIndex(d=>d[0]===t),kind()==='src'?(SRC.find(s=>s[0]===t)[1]==='ok'?0:1):kind()==='sort'?NOTES.find(s=>s[0]===t)[1]:0);
const steps=[
{h:'Plan your questions',p:'Your project is about volcanoes. Drag three research questions into your plan. Each one should cover a different part of the topic.',
 predict:{q:'Is “Tell me everything about volcanoes” a good research question?',opts:['Yes, it covers it all','No, it is too big to answer'],ans:1},task:'Plan 3 different questions',
 show:()=>{steps[0].go();chain([0,1,2].map(i=>()=>put(deck().findIndex(d=>d[1]===i),S.used.length)))},go:go(0,'Drag a question into your plan.','Three questions, each about a different part of the topic.')},
{h:'Choose your sources',p:'Sort each source. Use print (📘) and digital (💻) sources you can check. Leave out the rest.',
 predict:{q:'Is a book always better than a website?',opts:['Yes, books are always right','No, check who made it'],ans:1},task:'Sort all 7 sources',
 show:()=>{steps[1].go();chain(SRC.map(s=>find(s[0])))},go:go(1,'Drag each source to Use or Leave out.','Use sources where you can see who made them and why.')},
{h:'Notes, not copies',p:'Read the source. Drag the best note into your notebook.',
 predict:{q:'What makes the best note?',opts:['The whole sentence copied out','Key words, in your own words'],ans:1},task:'Make 3 notes',
 show:()=>{steps[2].go();chain([0,1,2].map(k=>()=>put(deck().findIndex(d=>d[0]===NOTE[k][2]),0)))},go:go(2,'Drag the best note into the notebook.','Short notes in your own words, with the fact kept right.')},
{h:'Sort your notes',p:'Each note answers one of your questions. Drag it under the right heading.',task:'Sort all 6 notes',
 show:()=>{steps[3].go();chain(NOTES.map(n=>find(n[0])))},go:go(3,'Drag each note under a heading.','Notes sorted by question are ready to write up.')},
{h:'Check it twice',p:'Two sources, one fact. Do they agree? Tap your answer.',task:'Check 3 facts',
 show:()=>{steps[4].go();chain(CHECK.map(q=>()=>judge(q[4])))},go:go(4,'Read both sources, then tap agree or disagree.','When sources disagree, check a third trusted source.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which is the best question for a short project?',[['How do volcanoes make new islands?','ok'],['What is everything about Earth?','big'],['Which volcano is the coolest?','opin']]],
 ['Two sources say different things. What should you do?',[['Check a third trusted source','ok'],['Use the one you found first','first'],['Use the one with the bigger number','pick']]],
 ['The source says: “Volcanoes form where tectonic plates meet or pull apart.” Which is the best note?',[['volcanoes: where plates meet or pull apart','ok'],['Volcanoes form where tectonic plates meet or pull apart.','copy'],['plates are made by volcanoes','change']]],
 ['What goes in your list of sources?',[['The title and who made each one','ok'],['Just “the internet”','net'],['Nothing, if you used your own words','skip']]],
 ['Which source can you trust most for facts?',[['A science agency website','ok'],['A post with no name or date','anon'],['A story about a dragon','story']]]];
function slip(t){let m='Think about what a researcher needs: facts, checked sources and your own words.';
 if(t==='big')m='That is a whole topic, not one question. A short project needs a question you can answer.';
 if(t==='opin')m='“Coolest” is an opinion. Research questions have answers you can look up.';
 if(t==='first')m='Finding it first does not make it right. Check another trusted source.';
 if(t==='pick')m='A bigger number is not more true. Check who made each source, then check a third.';
 if(t==='copy')m='That is the sentence copied word for word. A note uses key words in your own words.';
 if(t==='change')m='That changes the fact. The source says volcanoes form at plates, not that volcanoes make plates.';
 if(t==='net')m='“The internet” is not a source. Write the website’s name and who made it, so others can check.';
 if(t==='skip')m='Own words still need a source list. The facts came from somewhere, so say where.';
 if(t==='anon')m='No name and no date means you cannot check who wrote it or if it is still true.';
 if(t==='story')m='A story is made up. Use it for fun, not for facts.';
 return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],turn=qn%3;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(turn).concat(ops.slice(0,turn)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
function mark(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! That is how researchers work.':'✗ '+slip(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;ctrl()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});ctrl()}});
A.start()})})();
