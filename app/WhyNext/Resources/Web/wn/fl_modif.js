/* Flagship: phrases, clauses and modifiers (ages 11-13; CCSS L.7.1a function of phrases and clauses, L.7.1c place
   phrases and clauses, correcting misplaced and dangling modifiers; KS3 grammar). Link each phrase to the word it
   describes, act out a relative clause with and without commas, slide a misplaced phrase next to its noun, fix
   dangling openers, and sort one prepositional phrase by its job. Distinct from flagclause (clause versus phrase and
   conjunctions) and flagnph (building noun phrases): here a modifier's position decides what it describes. */
(()=>{
VIS.reg('flagmodif',c=>{let A,ctl,ask,qk=-1,tick=0;const Z={};
const INK='#0f172a',OKG='#047857',BAD='#b91c1c',PH='#7c3aed',OW='#c2410c';
const LINK={words:['The','girl','with the red kite','ran','across the field','after lunch.'],ph:[[2,1,'adjectival: tells which girl'],[4,3,'adverbial: tells where she ran'],[5,3,'adverbial: tells when she ran']]};
const PLACE=[{base:['The','man','fed','the','dog.'],ph:'in a tuxedo',start:5,ok:2,own:{2:'the man',5:'the dog'},q:'Who is in a tuxedo?'},
 {base:['She','served','cake','to','the','children.'],ph:'on paper plates',start:6,ok:3,own:{3:'the cake',6:'the children'},q:'What is on paper plates?'},
 {base:['The','girl','was','chased','by','a','dog.'],ph:'riding her bike',start:7,ok:0,own:{0:'the girl',7:'the dog'},q:'Who is riding the bike?'}];
const DANG=[{op:'Walking to school,',q:'Who is walking?',r:[['the rain soaked me.','the rain'],['I got soaked by the rain.','I'],['my shoes got wet.','my shoes']],a:1},
 {op:'Covered in mud,',q:'Who is covered in mud?',r:[['Mum washed the dog.','Mum'],['the dog was washed by Mum.','the dog'],['the bath was run.','the bath']],a:1},
 {op:'After finishing my homework,',q:'Who finished the homework?',r:[['the TV was switched on.','the TV'],['the TV came on.','the TV'],['I switched on the TV.','I']],a:2}];
const JOBS=[['The cup on the table is mine.',0],['Put the cup on the table.',1],['The boy in the photo is my cousin.',0],['We swam in the lake.',1],['The house with the red door is ours.',0],['She left before dawn.',1]];
const which=()=>['link','commas','place','dangle','job','chal'][A.step];
const bnd=(v,a,b)=>v<a?a:v>b?b:v,dk=()=>A.col.dark;
function chip(t,x,y,o){o=o||{};const g=A.ctx;let f=o.f||(A.narrow?13:15);g.font=`700 ${f}px system-ui,sans-serif`;let w=g.measureText(t).width+16;
 while(w>A.W-8&&f>10){f--;g.font=`700 ${f}px system-ui,sans-serif`;w=g.measureText(t).width+16}const h=f+12,l=o.left?x:bnd(x-w/2,4,A.W-w-4);
 g.fillStyle=o.fill||'#ffffff';A.paint.rrect(l,y-h/2,w,h,8);g.fill();g.lineWidth=o.good||o.bad||o.ring?3:1.5;g.strokeStyle=o.good?OKG:o.bad?BAD:o.ring||'#64748b';g.stroke();
 g.fillStyle=o.ink||INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1);return{x:l,y:y-h/2,w,h}}
function paper(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#faf5ff',dk()?.06:.6);g.fillRect(0,0,A.W,A.H)}
/* lay out tokens as chips, wrapping lines; returns rects */
function line(toks,y,o,skip){const g=A.ctx,f=A.narrow?13:16,gap=6,h=f+12,R=[];g.font=`700 ${f}px system-ui,sans-serif`;let x=8,yy=y;
 toks.forEach((t,i)=>{const w=g.measureText(t).width+16;if(x+w>A.W-8){x=8;yy+=f+22}R.push({x,y:yy-h/2,cy:yy,w,h,i,t});x+=w+gap});
 if(!skip)R.forEach(r=>{const s=o&&o.style?o.style(r.i):{};chip(r.t,r.x,r.cy,Object.assign({f,left:1},s))});return R}
function arrow(a,b,col){const g=A.ctx,x0=a.x+a.w/2,y0=a.y+a.h+2,x1=b.x+b.w/2,y1=b.y+b.h+2,my=Math.max(y0,y1)+26;g.strokeStyle=col;g.lineWidth=3;
 g.beginPath();g.moveTo(x0,y0);g.bezierCurveTo(x0,my,x1,my,x1,y1);g.stroke();g.fillStyle=col;g.beginPath();g.moveTo(x1,y1);g.lineTo(x1-6,y1+10);g.lineTo(x1+6,y1+10);g.fill()}
/* 0: link phrase to the word it describes */
function drawLink(){paper();const L=Z.link,cur=LINK.ph[L.k];const st={style:i=>LINK.ph.some(p=>p[0]===i)?{fill:i===(cur&&cur[0])?'#ede9fe':'#ffffff',ring:PH}:{}},R=line(LINK.words,A.H*.18,st,1);Z.rects=R;
 L.done.forEach(k=>{const [p,w]=LINK.ph[k];arrow(R[p],R[w],dk()?'#c4b5fd':PH)});line(LINK.words,A.H*.18,st);
 L.done.forEach((k,j)=>chip(`"${LINK.words[LINK.ph[k][0]].replace('.','')}" → ${LINK.ph[k][2]}`,A.W/2,A.H*(.62+j*.11),{f:A.narrow?11:13,good:1}));
 chip(cur?`Tap the word that "${LINK.words[cur[0]]}" describes`:'Every phrase is linked to its word',A.W/2,A.H*.06,{f:A.narrow?11:14,good:!cur})}
function linkTo(w){const L=Z.link,cur=LINK.ph[L.k];if(!cur)return;const t=LINK.words[w];
 if(w!==cur[1]){A.sound.miss();return tell(LINK.ph.some(p=>p[0]===w)?'That is another phrase. Tap a single word.':cur[1]===1?`"${t}" does not have the kite. The phrase tells us which girl.`:`The phrase is about the action. It tells ${cur[0]===4?'where':'when'} the girl ran, so it describes "ran".`)}
 L.done.push(L.k);L.k++;A.sound.pop();tell(`Yes. "${LINK.words[cur[0]]}" describes "${t}". It is ${cur[2].replace(':',', it')}.`)}
/* 1: commas change who */
function drawCommas(){paper();const C=Z.commas,g=A.ctx,s=C.c?'The students, who finished early, went outside.':'The students who finished early went outside.';chip(s,A.W/2,A.H*.08,{f:A.narrow?12:15,ring:PH});
 const door=A.W*.9;g.fillStyle=dk()?'#475569':'#cbd5e1';g.fillRect(door-A.W*.04,A.H*.3,A.W*.08,A.H*.45);chip('outside',door,A.H*.25,{f:11});
 for(let i=0;i<6;i++){const early=C.c?1:i%2===0,go=C.run&&early,x=A.W*(.08+i*.11)+(go?C.t*(door-A.W*(.08+i*.11)-A.W*.02):0),y=A.H*.55;g.globalAlpha=go?Math.max(0,1-C.t):1;
  g.fillStyle=early?'#16a34a':'#64748b';g.beginPath();g.arc(x,y-A.H*.12,A.H*.045,0,7);g.fill();A.paint.rrect(x-A.H*.04,y-A.H*.07,A.H*.08,A.H*.14,6);g.fill();if(early&&!(go&&C.t>.9))chip('early',x,y+A.H*.13,{f:10});g.globalAlpha=1}
 if(C.run&&C.t>.99)chip(`${C.c?6:3} went outside`,door-A.W*.06,A.H*.82,{f:12,good:1});
 chip(C.c?'Commas: extra facts about ALL the students':'No commas: picks out WHICH students',A.W/2,A.H*.9,{f:A.narrow?11:13,good:C.seen[0]&&C.seen[1]})}
function act(){const C=Z.commas;C.run=1;C.t=0;A.sound.whoosh();A.tween(C,{t:1},800,'io',()=>{C.seen[C.c]=1;tell(C.c?'With commas, the clause just adds a fact. All 6 students finished early, and all 6 went outside.':'Without commas, "who finished early" picks out which students. Only the 3 early finishers went outside.')})}
function toggle(){const C=Z.commas;C.c=C.c?0:1;C.run=0;C.t=0;A.sound.pop();tell(C.c?'Commas added. Now act it out.':'Commas taken out. Now act it out.')}
/* 2: misplaced modifier */
function said(P,s){const w=P.base.slice(),ph=s===0?P.ph[0].toUpperCase()+P.ph.slice(1)+',':P.ph;if(s===0)w[0]=w[0].toLowerCase();
 if(s===w.length){w[w.length-1]=w[w.length-1].replace('.','');w.push(ph+'.')}else w.splice(s,0,ph);return w}
function drawPlace(){paper();const P=Z.place;const end=P.k>=PLACE.length,Q=PLACE[Q0()],toks=said(Q,end?Q.ok:P.s),pi=toks.findIndex(t=>t.toLowerCase().startsWith(Q.ph.slice(0,4)));
 Z.rects=line(toks,A.H*.2,{style:i=>i===pi?{fill:'#ede9fe',ring:PH}:{}});const ss=end?Q.ok:P.s,own=Q.own[ss]||'not clear';
 chip(`${Q.q} By the words: ${own}`,A.W/2,A.H*.62,{f:A.narrow?12:15,good:ss===Q.ok,bad:ss!==Q.ok});if(end)return chip('All 3 phrases sit next to their word',A.W/2,A.H*.8,{good:1});chip(`Sentence ${P.k+1} of 3. Tap a word to put the phrase after it, or the gap at the start.`,A.W/2,A.H*.06,{f:A.narrow?10:12})}
function Q0(){return Math.min(Z.place.k,PLACE.length-1)}
function putAt(s){const P=Z.place;if(P.k>=PLACE.length)return;const Q=PLACE[P.k];P.s=bnd(s,0,Q.base.length);A.sound.tick();
 if(P.s===Q.ok){P.k++;A.sound.pop();const k=P.k;P.s=k<PLACE.length?PLACE[k].start:0;return tell(`Fixed: "${said(Q,Q.ok).join(' ')}" Now it is clear: ${Q.own[Q.ok]}.`)}
 tell(Q.own[P.s]?`${Q.q} Here the phrase sits next to ${Q.own[P.s]}, so that is what it describes.`:'Now it is not clear what the phrase describes. Put it right next to its word.')}
/* 3: dangling modifiers */
function cards(){return[0,1,2].map(i=>({x:A.W*.05,y:A.H*(.3+i*.17),w:A.W*.9,h:A.H*.13}))}
function drawDangle(){paper();const D=Z.dang,g=A.ctx;const end=D.k>=DANG.length,Q=DANG[end?2:D.k];if(end){chip(`${Q.op} ${Q.r[Q.a][0]}`,A.W/2,A.H*.35,{f:A.narrow?12:15,good:1});chip(`The doer, ${Q.r[Q.a][1]}, is right after the comma`,A.W/2,A.H*.5,{f:A.narrow?11:13});return chip('All 3 openers now point at the right doer',A.W/2,A.H*.7,{good:1})}
 chip(`${Q.op} …   ${Q.q}`,A.W/2,A.H*.12,{f:A.narrow?12:15,ring:PH});
 cards().forEach((r,i)=>{g.fillStyle=dk()?'#1e293b':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=D.bad===i?BAD:'#64748b';g.lineWidth=D.bad===i?3:1.5;g.stroke();
  g.fillStyle=A.col.tx;g.font=`600 ${A.narrow?12:15}px system-ui,sans-serif`;g.textAlign='left';g.textBaseline='middle';g.fillText(`${Q.op} ${Q.r[i][0]}`,r.x+10,r.y+r.h/2,r.w-20)});
 if(D.bad>=0)chip(`By the grammar, ${Q.r[D.bad][1]} is doing it`,A.W/2,A.H*.86,{f:A.narrow?12:14,bad:1})}
function pickR(i){const D=Z.dang;if(D.k>=DANG.length)return;const Q=DANG[D.k],who=Q.r[i][1];
 if(i!==Q.a){D.bad=i;A.sound.miss();return tell(`Dangling. The opener attaches to the first noun after the comma, so ${who} ${who==='the rain'||who==='the TV'||who==='the bath'?'would be':'is'} the one doing it. That is not what we mean.`)}
 D.k++;D.bad=-1;A.sound.pop();tell(`Yes: "${Q.op} ${Q.r[i][0]}" The doer, ${who}, comes straight after the comma.`)}
/* 4: same phrase, different job */
function bins(){return[{t:'Adjectival: which noun?',v:0,x:A.W*.04,y:A.H*.5,w:A.W*.44,h:A.H*.38},{t:'Adverbial: where, when, how?',v:1,x:A.W*.52,y:A.H*.5,w:A.W*.44,h:A.H*.38}]}
function drawJob(){paper();const J=Z.job,g=A.ctx;if(J.k<JOBS.length)chip(JOBS[J.k][0],A.W/2,A.H*.25,{f:A.narrow?13:17,ring:PH});
 bins().forEach(b=>{g.fillStyle=A.alpha(b.v?OW:PH,.14);A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=b.v?OW:PH;g.lineWidth=2.5;g.stroke();chip(b.t,b.x+b.w/2,b.y+b.h/2,{f:A.narrow?10:13})});
 chip(J.k>=JOBS.length?'Same kind of phrase, two different jobs':`Card ${J.k+1} of ${JOBS.length}: what job does the phrase do?`,A.W/2,A.H*.08,{f:A.narrow?11:14,good:J.k>=JOBS.length})}
function file(v){const J=Z.job;if(J.k>=JOBS.length)return;const [t,ok]=JOBS[J.k];if(v!==ok){A.sound.miss();return tell(ok?'Ask: does the phrase tell where, when or how about the verb? Here it does, so it is adverbial.':'Ask: does the phrase pick out which one? Here it tells us which, so it is adjectival.')}
 J.k++;A.sound.pop();tell(`${ok?'Adverbial':'Adjectival'}: ${t}`)}
function draw(){const k=which();if(k==='chal'){paper();chip('Challenge',A.W/2,A.H*.4,{good:1});chip('Put each modifier next to what it describes',A.W/2,A.H*.6,{f:12});return}
 ({link:drawLink,commas:drawCommas,place:drawPlace,dangle:drawDangle,job:drawJob})[k]();A.fx.draw(A.ctx)}
function hitR(p){return(Z.rects||[]).find(r=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h)}
function down(p){const k=which();if(k==='link'){const r=hitR(p);if(r)linkTo(r.i);return false}
 if(k==='commas'){act();return false}
 if(k==='place'){const P=Z.place;if(P.k>=PLACE.length)return false;const Q=PLACE[P.k],toks=said(Q,P.s),pi=toks.findIndex(t=>t.toLowerCase().startsWith(Q.ph.slice(0,4))),r=hitR(p);
  if(!r){if(p.x<A.W*.12)putAt(0);return false}if(r.i===pi)return false;const base=r.i>pi?r.i:r.i+1;putAt(base);return false}
 if(k==='dangle'){const i=cards().findIndex(r=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h);if(i>=0)pickR(i);return false}
 if(k==='job'){const b=bins().find(b=>p.x>b.x&&p.x<b.x+b.w&&p.y>b.y&&p.y<b.y+b.h);if(b)file(b.v);return false}return false}
function fresh(){tick++;for(const k in Z)delete Z[k];Object.assign(Z,{link:{k:0,done:[]},commas:{c:0,run:0,t:0,seen:[0,0]},place:{k:0,s:PLACE[0].start},dang:{k:0,bad:-1},job:{k:0},check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();btns();Z.check()}
const reach=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,desc,ok,msg){fresh();c.say(desc);A.cv.setAttribute('aria-label',desc);btns();Z.check=reach(i,ok,msg)}
function auto(i,acts,ms){steps[i].go();const t0=tick;acts.forEach((f,j)=>setTimeout(()=>{if(t0===tick)f()},ms*(j+1)))}
function btns(){if(!ctl)return;ctl.innerHTML='';const k=which(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn sm','aria-label':l||t},ctl,t).onclick=f};
 if(k==='link'&&LINK.ph[Z.link.k])[1,3].forEach(w=>B(LINK.words[w],()=>linkTo(w),`It describes "${LINK.words[w]}"`));
 if(k==='commas'){B(Z.commas.c?'Take out the commas':'Add commas',toggle);B('Act it out',act,'Act out the sentence')}
 if(k==='place'&&Z.place.k<PLACE.length){const Q=PLACE[Z.place.k];B('Move earlier',()=>putAt(Z.place.s-1),'Move the phrase one word earlier');B('Move later',()=>putAt(Z.place.s+1),'Move the phrase one word later')}
 if(k==='dangle'&&Z.dang.k<DANG.length)DANG[Z.dang.k].r.forEach((r,i)=>B(`…${r[0]}`,()=>pickR(i),`${DANG[Z.dang.k].op} ${r[0]}`));
 if(k==='job'){B('Adjectival',()=>file(0),'The phrase tells which noun');B('Adverbial',()=>file(1),'The phrase tells where, when or how')}}
const steps=[
{h:'What does it describe?',p:'A phrase is a group of words with no verb of its own. Each purple phrase here describes one word. Tap that word.',
 predict:{q:'"The girl with the red kite ran." The phrase "with the red kite" describes…',opts:['the girl','how she ran','the field'],ans:0},task:'Link all 3 phrases',
 show:()=>auto(0,[()=>linkTo(1),()=>linkTo(3),()=>linkTo(3)],700),
 go:()=>begin(0,'The sentence: The girl with the red kite ran across the field after lunch. Three phrases are marked.',()=>Z.link.k>=3,'Phrases work like adjectives or adverbs.')},
{h:'Commas change who',p:'A relative clause starts with who, which or that. Act the sentence out, then add commas and act it out again.',
 predict:{q:'"The students, who finished early, went outside." Who went outside?',opts:['only the early finishers','all the students','nobody'],ans:1},task:'Act out both versions',
 show:()=>auto(1,[act,toggle,act],1000),
 go:()=>begin(1,'Six students. Three finished early. A door marked outside.',()=>Z.commas.seen[0]&&Z.commas.seen[1],'Without commas the clause picks which ones; with commas it adds a fact about all.')},
{h:'Misplaced modifiers',p:'A phrase describes what it sits next to. Move the purple phrase until it sits by the right word.',
 predict:{q:'"The man fed the dog in a tuxedo." By the words, who is in a tuxedo?',opts:['the man','the dog','it is clear it is the man'],ans:1},task:'Fix all 3 sentences',
 show:()=>auto(2,PLACE.map(q=>()=>putAt(q.ok)),700),
 go:()=>begin(2,'A sentence with a phrase in the wrong place.',()=>Z.place.k>=PLACE.length,'Put a modifier right next to the word it describes.')},
{h:'Dangling modifiers',p:'An opening phrase describes the first noun after the comma. Pick the ending that makes the right person the doer.',
 predict:{q:'"Covered in mud, Mum washed the dog." By the grammar, who is covered in mud?',opts:['the dog','Mum','it does not say'],ans:1},task:'Fix all 3 openers',
 show:()=>auto(3,DANG.map(q=>()=>pickR(q.a)),700),
 go:()=>begin(3,'An opening phrase and three possible endings.',()=>Z.dang.k>=DANG.length,'Put the real doer straight after the comma.')},
{h:'Same phrase, new job',p:'"On the table" can do two jobs. Does each phrase tell which noun, or where, when or how?',
 predict:{q:'In "Put the cup on the table", "on the table" tells…',opts:['which cup','where to put it','who put it'],ans:1},task:'Sort all 6 cards',
 show:()=>auto(4,JOBS.map(([,v])=>()=>file(v)),450),
 go:()=>begin(4,'A sentence card and two boxes: Adjectival and Adverbial.',()=>Z.job.k>=JOBS.length,'Judge a phrase by its job, not its first word.')},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.check()});
const QS=[
 {q:'Which sentence has a misplaced modifier?',a:'I saw a shark on holiday with huge teeth.',o:[['On holiday, I saw a shark with huge teeth.','fine'],['I saw a shark with huge teeth on holiday.','fine']]},
 {q:'"Running for the bus, my bag fell open." What is wrong?',a:'It says the bag was running',o:[['Nothing is wrong','dangle'],['The comma is missing','comma']]},
 {q:'"The pupils who had a ticket got in." Who got in?',a:'Only pupils with a ticket',o:[['Every pupil','rel'],['Nobody','rel']]},
 {q:'In "She sang in the hall", what job does "in the hall" do?',a:'Adverbial: where she sang',o:[['Adjectival: which hall','job'],['It is a clause','clause']]},
 {q:'Which fixes "Barking loudly, I saw the dog"?',a:'I saw the dog barking loudly.',o:[['Barking loudly, my eyes saw the dog.','dangle'],['Barking loudly I saw the dog.','comma']]},
 {q:'Why is "after lunch" a phrase, not a clause?',a:'It has no verb',o:[['It is too short','clause'],['It starts with a capital','clause']]}];
function why(t){let m='A modifier describes what it sits next to.';
 if(t==='fine')m='That one puts the phrase next to the right word. Look for a phrase that sits by the wrong noun.';
 if(t==='dangle')m='The opener must be followed by its real doer. Bags do not run, and the dog must bark.';
 if(t==='comma')m='Commas are not the problem. The doer is missing after the opener.';
 if(t==='rel')m='No commas: the clause picks out which pupils. Only the ones with a ticket got in.';
 if(t==='job')m='"In the hall" tells where she sang, so it describes the verb. That makes it adverbial.';
 if(t==='clause')m='A clause has a verb. A phrase does not, however long or short it is.';
 return m}
function quiz(){qk++;const Q=QS[qk%QS.length],all=[[Q.a,'ok'],...Q.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 ask.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=ask.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){ask.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=ask.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.05,draw,onStep:B=>{ask.hidden=B.step!==5;ctl.hidden=B.step===5;btns()},
 init:B=>{A=B;const box=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Modifier controls'},box);ask=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down});btns()}}).start()})})();
