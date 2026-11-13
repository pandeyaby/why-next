/* Flagship – fixing fragments and run-ons (ages 9–10; Common Core L.4.1f: produce complete sentences, recognising and
   correcting inappropriate fragments and run-ons; NC England KS2 grammar: sentence, clause, subject, verb). Test word groups
   for a who (subject) and a did-what (predicate), mend fragments with the missing part, find where a run-on breaks, mend it
   with a full stop, a semicolon or a comma plus a joining word (never a comma alone), and sort a paragraph's word groups. */
(()=>{
const TEST=[['The dog ran across the field.',0],['Running through the park.',1],['My little brother and his friend.',2],['Because it was raining.',3],['Birds sing.',0],['Jumped over the wall.',1]];
const KIND=['Full sentence','Missing who','Missing did-what','Only half: needs a main part'];
const WHY=['Who? Then did what? Both parts are there, so it is a full sentence.','Who is doing it? Nobody is named. It has no subject.','We know who, but what did they do? It has no verb part (predicate).','A word like because makes it hang. It needs a main part, like: We stayed in because it was raining.'];
const FIX=[['Running through the park.',[['The dog was',''],['Quickly','Quickly running through the park still says nobody who runs.'],['And then','And then running through the park still has no who.']],1],
 ['My little brother and his friend.',[['laughed at the joke',''],['in the garden','Now we know where they are, but not what they did. Still no verb part.'],['with a red hat','That tells us more about them, but they still do nothing.']],0],
 ['Because it was raining.',[['We stayed inside',''],['And the rain','And the rain because it was raining still has no main part: who did what?'],['Very wet','Very wet is not a who-did-what part.']],1],
 ['Jumped over the wall.',[['The cat',''],['Very high','Very high says how, not who jumped.'],['After lunch','After lunch says when, not who jumped.']],1]];
const RUN=[['I like cats I also like dogs',3],['We went to the beach it was sunny',5],['Mia found a shell she gave it to her gran',4],['The bell rang everyone ran outside',3]];
const MEND=[['It was raining we stayed inside',3,{but:'But marks a contrast or surprise. Staying in when it rains is no surprise. Try so or and.'}],
 ['Sam was tired he kept running',3,{so:'So marks a result. Being tired would make Sam stop, not keep going. Try but.'}],
 ['The bell rang everyone ran outside',3,{but:'But marks a contrast. Running out when the bell rings is what we expect. Try and or so.'}],
 ['I like cats I also like dogs',3,{so:'So marks a result, but liking cats does not cause liking dogs. Try and.'}]];
const FIXES=[['Full stop','. '],['Semicolon',';'],[', and',', and'],[', but',', but'],[', so',', so'],['Comma only',',']];
const SORT=[['Sophie fed the cat.',0],['After the match.',1],['The film ended we went home.',2],['Under the old bridge.',1],['Dad cooked, and we laid the table.',0],['My bag is heavy it is full of books.',2]];
const BINS=['Sentence','Fragment','Run-on'],SWHY=['This has a who and a did-what, and only one main idea (or two joined properly).','Ask who did what. One part is missing, so it is a fragment.','Two who-did-what parts are squashed together with no full stop, semicolon or joining word.'];
const cap=s=>s[0].toUpperCase()+s.slice(1),low=s=>/^I\b/.test(s)?s:s[0].toLowerCase()+s.slice(1);
VIS.reg('flagrunon',c=>{let A,X,ctl,quiz,qn=-1,gen=0;const G={};
const INK='#111827',TILE='#ffffff',RIM='#4b5563',GOOD='#15803d',WRONG='#b91c1c',FOCUS='#1d4ed8',SUBJ='#dbeafe',PRED='#fef3c7';
const phase=()=>['test','fix','join','mend','sort','quiz'][A.step],u=n=>Math.round(n*(A.narrow?1:1.15)),font=(n,w)=>`${w||700} ${u(n)}px system-ui,sans-serif`;
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function word(t,x,y,n,col,w,al){X.font=font(n,w);X.fillStyle=col||INK;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(t,x,y,A.W-16)}
function lines(t,max,n,w){X.font=font(n,w);const L=[];let s='';t.split(' ').forEach(d=>{const z=s?s+' '+d:d;if(s&&X.measureText(z).width>max){L.push(s);s=d}else s=z});if(s)L.push(s);return L}
function text(t,x,y,max,n,col,w){const L=lines(t,max,n,w),lh=u(n)*1.3;L.forEach((s,i)=>word(s,x,y+(i-(L.length-1)/2)*lh,n,col,w))}
function box(r,t,o){o=o||{};X.fillStyle=o.bg||TILE;A.paint.rrect(r.x,r.y,r.w,r.h,o.r||10);X.fill();X.lineWidth=o.edge?4:2;X.strokeStyle=o.edge||RIM;X.stroke();if(t)text(t,r.x+r.w/2,r.y+r.h/2+1,r.w-14,o.n||16,o.ink,o.w||800)}
function paper(){X.fillStyle=A.col.dark?'#0f172a':'#f8fafc';X.fillRect(0,0,A.W,A.H)}
function head(t,won){X.font=font(14,800);const w=Math.min(A.W-10,X.measureText(t).width+28),h=u(14)+16;box({x:A.W/2-w/2,y:A.H*.02,w,h},'',{r:h/2,bg:won?'#dcfce7':TILE,edge:won?GOOD:null});word(t,A.W/2,A.H*.02+h/2+1,14,INK,800)}
const card=()=>({x:u(14),y:A.H*.13,w:A.W-u(28),h:A.H*.24});
function grid(n,cols,top,hgt){const g=u(8),w=(A.W-u(28)-g*(cols-1))/cols,rows=Math.ceil(n/cols),h=Math.min(u(64),(hgt-g*(rows-1))/rows);return[...Array(n)].map((_,j)=>({j,x:u(14)+(j%cols)*(w+g),y:top+Math.floor(j/cols)*(h+g),w,h}))}
/* ---- 1: the who + did-what test ---- */
const kTiles=()=>grid(4,2,A.H*.5,A.H*.4);
function drawTest(){const s=G.test,done=s.i>=TEST.length;paper();head(done?'Who + did what = a sentence':`Group ${Math.min(s.i+1,6)} of 6: is it a sentence?`,done);
 if(done){TEST.forEach(([t,k],j)=>word(`${k?'✗':'✓'} ${t}`,A.W/2,A.H*(.17+j*.12),14,A.col.tx,700));return}
 box(card(),TEST[s.i][0],{n:20,edge:FOCUS});word('Ask: who? Then: did what?',A.W/2,A.H*.43,13,A.col.tx,600);
 kTiles().forEach(q=>box(q,KIND[q.j],{n:14,bg:s.bad===q.j?'#fee2e2':TILE,edge:s.bad===q.j?WRONG:null}))}
function judge(k){const s=G.test;if(s.i>=TEST.length)return;const [t,want]=TEST[s.i];
 if(k===want){s.i++;s.bad=null;A.sound.pop();return tell(`${KIND[want]}: ${t} ${WHY[want]}`+(s.i>=TEST.length?' All 6 tested.':''))}
 s.bad=k;A.sound.miss();let m=WHY[want];if(want&&!k)m='A capital letter and a full stop do not make a sentence. '+m;tell(m)}
/* ---- 2: mend a fragment by adding the missing part ---- */
const opts=()=>{const i=G.fix.i,f=FIX[i];return f?f[1].map((o,j)=>f[1][(j+i)%3]):[]};
const oTiles=()=>grid(3,1,A.H*.47,A.H*.46);
function joinFix(f,o){return f[2]===0&&o===f[1][0][0]?f[0].slice(0,-1)+' '+o+'.':o+' '+low(f[0])}
function drawFix(){const s=G.fix,done=s.i>=FIX.length;paper();head(done?'4 fragments mended':`Fragment ${s.i+1} of 4: add the missing part`,done);
 if(done){s.made.forEach((t,j)=>text(t,A.W/2,A.H*(.2+j*.19),A.W-u(30),15,A.col.tx,700));return}
 box(card(),s.last||FIX[s.i][0],{n:19,bg:s.last?'#fee2e2':TILE,edge:s.last?WRONG:FOCUS});
 word(FIX[s.i][2]===0?'Which part says what they did?':'Which part adds a who (or a main part)?',A.W/2,A.H*.42,13,A.col.tx,600);
 oTiles().forEach((q,j)=>box(q,opts()[j][0],{n:16}))}
function addPart(o){const s=G.fix;if(s.i>=FIX.length)return;const f=FIX[s.i],hit=f[1].find(z=>z[0]===o);if(!hit)return;
 if(!hit[1]){const t=joinFix(f,o);s.made.push(t);s.i++;s.last=null;A.sound.pop();return tell(`${t} Now it has a who and a did-what.`+(s.i>=FIX.length?' All 4 mended.':''))}
 s.last=(FIX[s.i][2]===0?f[0].slice(0,-1)+' '+o:o+' '+low(f[0]));A.sound.miss();tell(hit[1])}
/* ---- 3: tap the last word of the first sentence ---- */
function chips(t,top){const W=t.split(' '),n=u(19);X.font=font(19,700);const rows=[];let row=[],x=0,max=A.W-u(28);
 W.forEach((w,j)=>{const cw=X.measureText(w).width+u(18);if(row.length&&x+cw>max){rows.push(row);row=[];x=0}row.push({w,j,cw,x});x+=cw+u(8)});rows.push(row);
 const out=[];rows.forEach((R,ri)=>{const tw=R.reduce((a,q)=>a+q.cw,0)+u(8)*(R.length-1),x0=(A.W-tw)/2;R.forEach(q=>out.push({t:q.w,j:q.j,x:x0+q.x,y:top+ri*(n+u(26)),w:q.cw,h:n+u(16)}))});return out}
function drawJoin(){const s=G.join,done=s.i>=RUN.length;paper();head(done?'Each run-on held two sentences':`Run-on ${s.i+1} of 4: where does sentence 1 end?`,done);
 if(done){RUN.forEach(([t,k],j)=>{const w=t.split(' ');text(w.slice(0,k).join(' ')+'. '+cap(w.slice(k).join(' '))+'.',A.W/2,A.H*(.2+j*.19),A.W-u(30),15,A.col.tx,700)});return}
 const k=RUN[s.i][1];chips(RUN[s.i][0],A.H*.2).forEach(q=>box(q,q.t,{n:19,w:700,bg:s.bad===q.j?'#fee2e2':s.show&&q.j<k?SUBJ:TILE,edge:s.bad===q.j?WRONG:null}));
 text('Tap the last word of sentence 1. Each sentence needs its own who and did-what.',A.W/2,A.H*.8,A.W-u(30),13,A.col.tx,600)}
function pickEnd(j){const s=G.join;if(s.i>=RUN.length)return;const [t,k]=RUN[s.i],w=t.split(' ');
 if(j===k-1){s.i++;s.bad=null;A.sound.pop();return tell(`Yes: ${w.slice(0,k).join(' ')} | ${w.slice(k).join(' ')}. Two sentences.`+(s.i>=RUN.length?' All 4 found.':''))}
 s.bad=j;A.sound.miss();tell(j<k-1?`"${w.slice(0,j+1).join(' ')}" is not a whole idea yet. Read on.`:j===w.length-1?'That is the very end. Sentence 1 ends sooner: look for a new who.':`Then "${w.slice(j+1).join(' ')}" has no who of its own. Sentence 1 ends sooner.`)}
/* ---- 4: mend each run-on ---- */
const fTiles=()=>grid(6,3,A.H*.56,A.H*.36);
function mended(t,k,f){const w=t.split(' '),a=w.slice(0,k).join(' '),b=w.slice(k).join(' ');return f==='. '?a+'. '+cap(b)+'.':a+f+' '+low(b)+'.'}
function drawMend(){const s=G.mend,done=s.i>=MEND.length;paper();head(done?'Mended 4 ways, no comma splices':`Run-on ${s.i+1} of 4: choose a mend`,done);
 if(done){s.made.forEach((t,j)=>text(t,A.W/2,A.H*(.2+j*.19),A.W-u(30),15,A.col.tx,700));return}
 const [t,k]=MEND[s.i];box(card(),s.try||t,{n:19,bg:s.try?'#fee2e2':TILE,edge:s.try?WRONG:FOCUS});
 word('Full stop, semicolon, or a comma with a joining word',A.W/2,A.H*.47,12,A.col.tx,600);
 fTiles().forEach(q=>box(q,FIXES[q.j][0],{n:15,bg:s.bad===q.j?'#fee2e2':TILE,edge:s.bad===q.j?WRONG:null}))}
function mend(j){const s=G.mend;if(s.i>=MEND.length)return;const [t,k,bad]=MEND[s.i],f=FIXES[j][1],res=mended(t,k,f),cj=f.slice(2);
 if(f===','){s.bad=j;s.try=res;A.sound.miss();return tell('That is a comma splice. A comma alone cannot hold two sentences together. Add and, but or so after it, or use a full stop or semicolon.')}
 if(bad[cj]){s.bad=j;s.try=res;A.sound.miss();return tell(bad[cj])}
 s.made.push(res);s.i++;s.bad=null;s.try=null;A.sound.pop();tell(`${res}`+(s.i>=MEND.length?' All 4 mended.':''))}
/* ---- 5: drag each card into a box ---- */
const bins=()=>grid(3,3,A.H*.66,A.H*.26),home=()=>({x:A.W/2-Math.min(u(150),A.W*.45),y:A.H*.2,w:Math.min(u(300),A.W*.9),h:A.H*.24});
function drawSort(){const s=G.sort,done=s.i>=SORT.length;paper();head(done?'Paragraph sorted':`Card ${s.i+1} of 6: drag it into a box`,done);
 bins().forEach(q=>{box(q,BINS[q.j],{n:15,bg:s.bad===q.j?'#fee2e2':TILE,edge:s.bad===q.j?WRONG:null});word(String(s.got[q.j]),q.x+q.w/2,q.y-u(12),13,A.col.tx,800)});
 if(done)return;const h=home(),r=s.drag?{...h,x:s.drag.x-h.w/2,y:s.drag.y-h.h/2}:h;box(r,SORT[s.i][0],{n:17,edge:FOCUS})}
function drop(b){const s=G.sort;if(s.i>=SORT.length)return;const [t,k]=SORT[s.i];
 if(b===k){s.got[k]++;s.i++;s.bad=null;A.sound.pop();return tell(`${BINS[k]}: ${t}`+(s.i>=SORT.length?' All 6 sorted.':''))}
 s.bad=b;A.sound.miss();let m=SWHY[k];if(k===0&&/, and/.test(t))m='A comma plus and is a proper join, so this is one correct sentence.';else if(b===0&&k===2)m='Two sentences are squashed together here. Find where the first one ends.';tell(m)}
/* ---- input ---- */
function down(p){const k=phase();
 if(k==='test'){const q=kTiles().find(q=>inside(p,q));if(q)judge(q.j)}
 if(k==='fix'){const q=oTiles().find(q=>inside(p,q));if(q&&opts()[q.j])addPart(opts()[q.j][0])}
 if(k==='join'&&G.join.i<RUN.length){const q=chips(RUN[G.join.i][0],A.H*.2).find(q=>inside(p,q));if(q)pickEnd(q.j)}
 if(k==='mend'){const q=fTiles().find(q=>inside(p,q));if(q)mend(q.j)}
 if(k==='sort'&&G.sort.i<SORT.length){if(inside(p,home())){G.sort.drag={x:p.x,y:p.y};A.redraw();return true}const q=bins().find(q=>inside(p,q));if(q)drop(q.j)}return false}
function move(p){if(G.sort.drag){G.sort.drag={x:p.x,y:p.y};A.redraw()}}
function up(p){const s=G.sort;if(!s.drag)return;s.drag=null;const q=p&&bins().find(q=>inside(p,q));if(q)drop(q.j);else A.redraw()}
function reset(){gen++;for(const q in G)delete G[q];G.test={i:0};G.fix={i:0,made:[]};G.join={i:0};G.mend={i:0,made:[]};G.sort={i:0,got:[0,0,0]};G.cb=()=>{}}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();G.cb()}
function begin(i,first,ready,msg){reset();tell(first);G.cb=()=>{if(A.step===i&&ready()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=phase(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='test'&&G.test.i<TEST.length)KIND.forEach((n,j)=>b(n,()=>judge(j)));
 if(k==='fix'&&G.fix.i<FIX.length)opts().forEach(o=>b(o[0],()=>addPart(o[0]),`Add: ${o[0]}`));
 if(k==='join'&&G.join.i<RUN.length)RUN[G.join.i][0].split(' ').forEach((w,j)=>b(w,()=>pickEnd(j),`Sentence 1 ends after word ${j+1}, ${w}`));
 if(k==='mend'&&G.mend.i<MEND.length)FIXES.forEach(([n],j)=>b(n,()=>mend(j),`Mend with: ${n}`));
 if(k==='sort'&&G.sort.i<SORT.length)BINS.forEach((n,j)=>b(n,()=>drop(j),`Put it in ${n}`))}
const steps=[
{h:'Who and did what?',p:'A sentence needs a who (the subject) and a did-what (the predicate, with a verb). A word group that is missing one is a fragment, even with a capital letter and a full stop.',
predict:{q:'Is "Running through the park." a sentence? It has a capital and a full stop.',opts:['Yes: capital letter and full stop','No: nobody is doing the running'],ans:1},task:'Test all 6 word groups',
show:()=>auto(0,TEST.map(([,k])=>()=>judge(k)),600),go:()=>begin(0,'Running? Barking? Ask who, then did what. Tap a box.',()=>G.test.i>=TEST.length,'A sentence needs both parts.')},
{h:'Mend a fragment',p:'Add the part that is missing. A fragment with no who needs a subject. One with no did-what needs a verb part. A because-part needs a main part to hang on.',task:'Mend all 4 fragments',
show:()=>auto(1,FIX.map(f=>()=>addPart(f[1][0][0])),700),go:()=>begin(1,'Running through the park. Who was running? Tap the part that fixes it.',()=>G.fix.i>=FIX.length,'Add the missing who or did-what.')},
{h:'Find the break',p:'A run-on squashes two sentences into one with nothing between them. Read it aloud. Tap the last word of the first sentence.',
predict:{q:'How many sentences hide in "I like cats I also like dogs"?',opts:['One: there is only one full stop','Two: there are two who-did-what parts'],ans:1},task:'Split all 4 run-ons',
show:()=>auto(2,RUN.map(([,k])=>()=>pickEnd(k-1)),650),go:()=>begin(2,'I like cats I also like dogs. Where does the first sentence end?',()=>G.join.i>=RUN.length,'Each sentence gets its own who and did-what.')},
{h:'Mend a run-on',p:'Three safe mends: a full stop and a capital, a semicolon, or a comma with a joining word (and, but, so). Pick a joining word that fits the meaning.',
predict:{q:'Is "It was raining, we stayed inside." mended?',opts:['Yes: the comma splits the ideas','No: a comma alone cannot join two sentences'],ans:1},task:'Mend all 4 run-ons',
show:()=>auto(3,[()=>mend(4),()=>mend(3),()=>mend(0),()=>mend(1)],700),go:()=>begin(3,'It was raining we stayed inside. Choose a mend.',()=>G.mend.i>=MEND.length,'Full stop, semicolon, or comma plus a joining word.')},
{h:'Edit the paragraph',p:'Writers check every word group. Drag each card into a box: full sentence, fragment, or run-on. You can tap a box instead.',task:'Sort all 6 cards',
show:()=>auto(4,SORT.map(([,k])=>()=>drop(k)),500),go:()=>begin(4,'Sophie fed the cat. Drag the card into a box.',()=>G.sort.i>=SORT.length,'Fragments miss a part; run-ons need a break.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.cb()});
const QS=[
{q:'Which one is a full sentence?',a:'The bus was late.',o:[['Waiting for the bus.','Who was waiting? There is no subject, so it is a fragment.'],['Because the bus was late.','Because leaves it hanging. It needs a main part: We walked because the bus was late.']]},
{q:'Best mend for: "The sun came out we went to the park."',a:'The sun came out, so we went to the park.',o:[['The sun came out, we went to the park.','A comma alone is a comma splice. Add so after it, or use a full stop.'],['The sun came out, but we went to the park.','But marks a contrast. Going out when the sun shines is no surprise.']]},
{q:'What is wrong with "Ate all the cake."?',a:'It has no who',o:[['It has no verb','Ate is the verb. The missing part is who ate the cake.'],['Nothing: it has a full stop','A full stop does not make a sentence. Who ate it?']]},
{q:'What is wrong with "My friend lives next door she has a dog."?',a:'It is a run-on',o:[['It is a fragment','Nothing is missing: there are two whole sentences squashed together.'],['Nothing','Two who-did-what parts need a full stop, a semicolon or a comma and a joining word between them.']]},
{q:'Which mends "Jake slipped he was fine."?',a:'Jake slipped; he was fine.',o:[['Jake slipped, he was fine.','That is a comma splice. Use a semicolon, a full stop, or a comma and but.'],['Jake slipped he was fine because.','Because at the end leaves a half sentence. The run-on is still there too.']]},
{q:'Which fixes the fragment "In the morning."?',a:'We left in the morning.',o:[['In the morning, and.','And adds nothing. It still has no who and no did-what.'],['In the early morning.','A longer fragment is still a fragment: who did what?']]}];
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,''],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=quiz.querySelector('.fl-pick');ord.forEach(([v,why])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>mark(why,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(why,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=!why;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why)}
function draw(){const k=phase();if(k==='quiz'){paper();head('Challenge',1);text('Who + did what. Break run-ons with . or ; or a comma and a joining word.',A.W/2,A.H*.5,A.W-u(40),16,A.col.tx,800);return}
 ({test:drawTest,fix:drawFix,join:drawJoin,mend:drawMend,sort:drawSort})[k]();A.fx.draw(X)}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{quiz.hidden=B.step!==5;ctl.hidden=B.step===5;controls()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Sentence buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});controls()}}).start()})})();
