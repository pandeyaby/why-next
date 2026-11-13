/* Flagship – correlative conjunctions (ages 10–11; Common Core L.5.1e: use correlative conjunctions, e.g. either/or,
   neither/nor; NC England KS2 grammar: co-ordinating conjunctions and cohesion). Match each first word to its partner, choose
   the pair whose meaning fits, balance the two halves (parallel structure), make the verb agree with the nearer subject, and
   drag the first word to the spot where both halves match. */
(()=>{
const FIRST=['either','neither','both','not only','whether'],SECOND=['or','nor','and','but also'],PART=[0,1,2,3,0];
const MISS={'either nor':'Nor goes with neither: the two n-words go together. Either pairs with or.','neither or':'Neither ... nor: the two n-words go together. Neither ... or is a common slip.',
 'both or':'Both means the two together, so it pairs with and.','both nor':'Nor goes with neither. Both means the two together, so it pairs with and.','both but also':'But also partners not only. Both pairs with and.',
 'not only and':'Not only pairs with but also: not only kind but also funny.','not only or':'Not only adds more, so it pairs with but also.','not only nor':'Nor goes with neither. Not only pairs with but also.',
 'whether nor':'Whether is about a choice, so it pairs with or: whether to stay or go.','whether and':'Whether is about a choice between two, so it pairs with or.','whether but also':'But also partners not only. Whether pairs with or.'};
const PICK=[['either','or'],['neither','nor'],['both','and'],['whether','or']];
const MEAN=['one of the two, not both','not this one and not that one','the two of them together','a choice still to be made'];
const GAPS=[['___ Sam ___ Priya can have the last seat.',0],['___ the cat ___ the dog was hungry. They had just eaten.',1],['___ Mum ___ Dad came to watch, and they sat together.',2],['I cannot decide ___ to laugh ___ to cry.',3]];
const BAL=[['She likes both swimming and','to run.','swimming',[['running',''],['to running','To running does not match swimming. Use the same -ing form.'],['she runs','She runs is a whole clause, but swimming is one word. Keep them the same kind.']]],
 ['You can either walk or','by bus.','walk',[['take the bus',''],['by the bus','By the bus still has no action word to match walk.'],['walking','Walking does not match walk. After can, both should be plain verbs: walk / take.']]],
 ['He is not only clever but also','has kindness.','clever',[['kind',''],['being kind','Clever is a describing word. Being kind is not the same kind of word.'],['has kind','Has kind is not English. Clever matches another describing word.']]],
 ['Neither the rain nor','feeling cold stopped us.','the rain',[['the cold',''],['being cold','The rain is a thing. Being cold is not; use another thing.'],['it was cold','It was cold is a whole clause, but the rain is a thing. Use another thing.']]]];
const VERB=[['Neither the players nor the coach','ready.',['was','were'],0,'the coach','The verb agrees with the nearer one, the coach. One coach, so was.'],
 ['Either my sisters or my brother','coming.',['is','are'],0,'my brother','The verb agrees with the nearer one, my brother. One brother, so is.'],
 ['Either my brother or my sisters','coming.',['is','are'],1,'my sisters','The verb agrees with the nearer one, my sisters. More than one, so are.'],
 ['Both the cake and the biscuits','gone.',['was','were'],1,'both','Both ... and always means two or more things, so the verb is plural: were.']];
const cap=t=>t[0].toUpperCase()+t.slice(1);
const MOVE=[['I will phone you or text you.','either',2,'or'],['She plays the piano and the violin.','both',2,'and'],['He forgot his coat but also his hat.','not only',2,'but also']];
VIS.reg('flagcorrel',c=>{let A,X,ctl,quiz,qn=-1,gen=0;const G={};
const INK='#111827',TILE='#ffffff',RIM='#4b5563',GOOD='#15803d',WRONG='#b91c1c',FOCUS='#1d4ed8',ONE='#dbeafe',TWO='#fef3c7';
const phase=()=>['pair','gap','bal','verb','move','quiz'][A.step],u=n=>Math.round(n*(A.narrow?1:1.15)),font=(n,w)=>`${w||700} ${u(n)}px system-ui,sans-serif`;
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function word(t,x,y,n,col,w){X.font=font(n,w);X.fillStyle=col||INK;X.textAlign='center';X.textBaseline='middle';X.fillText(t,x,y,A.W-16)}
function lines(t,max,n,w){X.font=font(n,w);const L=[];let s='';t.split(' ').forEach(d=>{const z=s?s+' '+d:d;if(s&&X.measureText(z).width>max){L.push(s);s=d}else s=z});if(s)L.push(s);return L}
function text(t,x,y,max,n,col,w){const L=lines(t,max,n,w),lh=u(n)*1.3;L.forEach((s,i)=>word(s,x,y+(i-(L.length-1)/2)*lh,n,col,w))}
function box(r,t,o){o=o||{};X.fillStyle=o.bg||TILE;A.paint.rrect(r.x,r.y,r.w,r.h,o.r||10);X.fill();X.lineWidth=o.edge?4:2;X.strokeStyle=o.edge||RIM;X.stroke();if(t)text(t,r.x+r.w/2,r.y+r.h/2+1,r.w-12,o.n||16,o.ink,o.w||800)}
function paper(){X.fillStyle=A.col.dark?'#0f172a':'#f8fafc';X.fillRect(0,0,A.W,A.H)}
function head(t,won){X.font=font(14,800);const w=Math.min(A.W-10,X.measureText(t).width+28),h=u(14)+16;box({x:A.W/2-w/2,y:A.H*.02,w,h},'',{r:h/2,bg:won?'#dcfce7':TILE,edge:won?GOOD:null});word(t,A.W/2,A.H*.02+h/2+1,14,INK,800)}
function row(n,top,h,gap){const g=gap||u(8),w=(A.W-u(28)-g*(n-1))/n;return[...Array(n)].map((_,j)=>({j,x:u(14)+j*(w+g),y:top,w,h}))}
const card=()=>({x:u(14),y:A.H*.13,w:A.W-u(28),h:A.H*.24});
/* ---- 1: match the partner ---- */
const left=()=>FIRST.map((t,j)=>({j,t,x:u(14),y:A.H*.14+j*A.H*.15,w:A.W*.42,h:A.H*.12})),right=()=>SECOND.map((t,j)=>({j,t,x:A.W*.54,y:A.H*.2+j*A.H*.17,w:A.W*.46-u(14),h:A.H*.13}));
function drawPair(){const s=G.pair,done=s.i>=FIRST.length;paper();head(done?'5 pairs matched':`Which word partners "${FIRST[s.i]}"?`,done);
 left().forEach(q=>{const got=q.j<s.i;box(q,got?`${q.t} … ${SECOND[PART[q.j]]}`:q.t,{n:16,bg:got?'#dcfce7':TILE,edge:q.j===s.i?FOCUS:got?GOOD:null});if(q.j===s.i&&!done){X.strokeStyle=FOCUS;X.lineWidth=3;X.beginPath();X.moveTo(q.x+q.w,q.y+q.h/2);X.lineTo(A.W*.53,q.y+q.h/2);X.stroke()}});
 right().forEach(q=>box(q,q.t,{n:17,bg:s.bad===q.j?'#fee2e2':TILE,edge:s.bad===q.j?WRONG:null}))}
function pairTap(j){const s=G.pair;if(s.i>=FIRST.length)return;const f=FIRST[s.i];
 if(j===PART[s.i]){s.i++;s.bad=null;A.sound.pop();return tell(`${f} … ${SECOND[j]}.`+(s.i>=FIRST.length?' All 5 pairs matched. Either and whether both take or.':''))}
 s.bad=j;A.sound.miss();let m=MISS[`${f} ${SECOND[j]}`];if(!m)m=`${f} does not pair with ${SECOND[j]}.`;tell(m)}
/* ---- 2: choose the pair that fits the meaning ---- */
const pTiles=()=>[...row(2,A.H*.5,A.H*.17),...row(2,A.H*.71,A.H*.17)].map((q,j)=>({...q,j}));
function fill(t,p){let k=0;return t.replace(/___/g,()=>p[k++]).replace(/^./,m=>m.toUpperCase())}
function drawGap(){const s=G.gap,done=s.i>=GAPS.length;paper();head(done?'Each pair carries a meaning':`Sentence ${s.i+1} of 4: which pair fits?`,done);
 if(done){GAPS.forEach(([t,k],j)=>text(fill(t,PICK[k]),A.W/2,A.H*(.21+j*.2),A.W-u(30),15,A.col.tx,700));return}
 box(card(),s.try||GAPS[s.i][0],{n:18,bg:s.try?'#fee2e2':TILE,edge:s.try?WRONG:FOCUS});
 pTiles().forEach(q=>box(q,PICK[q.j].join(' … '),{n:17,edge:s.bad===q.j?WRONG:null,bg:s.bad===q.j?'#fee2e2':TILE}))}
function gapTap(k){const s=G.gap;if(s.i>=GAPS.length)return;const [t,want]=GAPS[s.i];
 if(k===want){s.i++;s.bad=null;s.try=null;A.sound.pop();return tell(`${fill(t,PICK[k])} ${cap(PICK[k].join(' … '))} means ${MEAN[k]}.`+(s.i>=GAPS.length?' All 4 done.':''))}
 s.bad=k;s.try=fill(t,PICK[k]);A.sound.miss();tell(`${cap(PICK[k].join(' … '))} means ${MEAN[k]}. This sentence needs ${MEAN[want]}.`)}
/* ---- 3: balance the halves ---- */
const bTiles=()=>[0,1,2].map(j=>({j,x:u(14),y:A.H*.53+j*A.H*.14,w:A.W-u(28),h:A.H*.12}));
const bOpts=()=>{const b=BAL[G.bal.i];return b?b[3].map((o,j)=>b[3][(j+G.bal.i)%3]):[]};
function drawBal(){const s=G.bal,done=s.i>=BAL.length;paper();head(done?'Both halves match':`Sentence ${s.i+1} of 4: balance it`,done);
 if(done){s.made.forEach((t,j)=>text(t,A.W/2,A.H*(.21+j*.2),A.W-u(30),15,A.col.tx,700));return}
 const b=BAL[s.i];box(card(),s.try||`${b[0]} ${b[1]}`,{n:18,bg:s.try?'#fee2e2':TILE,edge:s.try?WRONG:FOCUS});
 text(`First half: "${b[2]}". The second half must be the same kind of word.`,A.W/2,A.H*.45,A.W-u(30),13,A.col.tx,600);
 bTiles().forEach((q,j)=>box(q,`… ${bOpts()[j][0]}`,{n:16}))}
function balTap(o){const s=G.bal;if(s.i>=BAL.length)return;const b=BAL[s.i],hit=b[3].find(z=>z[0]===o);if(!hit)return;const end=b[1].replace(/^\S+( \S+)?/,'').trim(),res=`${b[0]} ${o}${end?' '+end:'.'}`;
 if(!hit[1]){s.made.push(res);s.i++;s.try=null;A.sound.pop();return tell(`${res} Now ${b[2]} and ${o} match.`+(s.i>=BAL.length?' All 4 balanced.':''))}
 s.try=res;A.sound.miss();tell(hit[1])}
/* ---- 4: the verb agrees with the nearer subject ---- */
const vTiles=()=>row(2,A.H*.56,A.H*.2,u(20));
function drawVerb(){const s=G.verb,done=s.i>=VERB.length;paper();head(done?'Nearer one decides (both = plural)':`Sentence ${s.i+1} of 4: which verb?`,done);
 if(done){VERB.forEach((v,j)=>text(`${v[0]} ${v[2][v[3]]} ${v[1]}`,A.W/2,A.H*(.21+j*.2),A.W-u(30),15,A.col.tx,700));return}
 const v=VERB[s.i];box(card(),`${v[0]} ___ ${v[1]}`,{n:18,edge:FOCUS});
 text(s.bad!=null?`Nearest the gap: ${v[4]==='both'?'both … and':v[4]}`:'Look at the word just before the gap.',A.W/2,A.H*.45,A.W-u(30),13,A.col.tx,600);
 vTiles().forEach((q,j)=>box(q,v[2][j],{n:24,bg:s.bad===j?'#fee2e2':TILE,edge:s.bad===j?WRONG:null}))}
function verbTap(j){const s=G.verb;if(s.i>=VERB.length)return;const v=VERB[s.i];
 if(j===v[3]){s.i++;s.bad=null;A.sound.pop();return tell(`${v[0]} ${v[2][j]} ${v[1]} ${v[5]}`+(s.i>=VERB.length?' All 4 agree.':''))}
 s.bad=j;A.sound.miss();let m=`Look at the subject nearest the verb: ${v[4]}. ${/s$/.test(v[4])?'More than one':'Only one'}, so ${v[2][v[3]]}. The first subject does not decide.`;if(v[4]==='both')m='Both ... and joins two things, so the verb is plural, never singular.';tell(m)}
/* ---- 5: drag the first word to where both halves match ---- */
function chips(){const m=MOVE[G.move.i];if(!m)return[];const W=m[0].split(' ');X.font=font(18,700);const out=[];let x=0,y=A.H*.17,max=A.W-u(28);
 W.forEach((w,j)=>{const cw=X.measureText(w).width+u(16);if(x&&x+cw>max){x=0;y+=u(54)}out.push({t:w,j,x:u(14)+x,y,w:cw,h:u(38)});x+=cw+u(14)});return out}
const chipHome=()=>({x:A.W/2-u(70),y:A.H*.74,w:u(140),h:u(48)});
function drawMove(){const s=G.move,done=s.i>=MOVE.length;paper();head(done?'First word placed: halves match':`Sentence ${s.i+1} of 3: drag "${MOVE[Math.min(s.i,2)][1]}" into place`,done);
 if(done){s.made.forEach((t,j)=>text(t,A.W/2,A.H*(.25+j*.22),A.W-u(30),16,A.col.tx,700));return}
 const m=MOVE[s.i],sec=m[3].split(' ')[0];chips().forEach(q=>{box(q,q.t,{n:18,w:700,bg:q.t===sec&&q.j>1?TWO:TILE});if(s.bad===q.j){X.fillStyle=WRONG;X.fillRect(q.x-u(9),q.y,u(4),q.h)}
  X.fillStyle=A.col.mu;X.fillRect(q.x-u(8),q.y+q.h+u(3),u(2),u(6))});
 const h=chipHome(),r=s.drag?{...h,x:s.drag.x-h.w/2,y:s.drag.y-h.h/2}:h;box(r,m[1],{n:19,bg:ONE,edge:FOCUS});
 word('Drop it in a gap, or tap a gap',A.W/2,A.H*.66,13,A.col.tx,600)}
function nearGap(p){const C=chips();let best=null,d=1e9;C.forEach(q=>{const dd=Math.hypot(p.x-(q.x-u(7)),p.y-(q.y+q.h/2));if(dd<d){d=dd;best=q.j}});return d<u(46)?best:null}
function place(j){const s=G.move;if(s.i>=MOVE.length)return;const [t,f,want,sec]=MOVE[s.i],W=t.slice(0,-1).split(' '),res=[...W.slice(0,j),f,...W.slice(j)].join(' ')+'.';
 if(j===want){s.made.push(res);s.i++;s.bad=null;A.sound.pop();return tell(`${res} Both halves now match.`+(s.i>=MOVE.length?' All 3 placed.':''))}
 const si=W.join(' ').indexOf(' '+sec+' '),before=W.join(' ').slice(0,si).split(' ').slice(j).join(' '),after=W.join(' ').slice(si+sec.length+2);
 s.bad=j;A.sound.miss();let m=`${res} After ${f} comes "${before}", but after ${sec} comes "${after}". They do not match. Move ${f}.`;if(j>=W.length||si<0||!before)m=`${f} must come before the first half, not after it.`;tell(m)}
/* ---- input ---- */
function down(p){const k=phase();
 if(k==='pair'){const q=right().find(q=>inside(p,q));if(q)pairTap(q.j)}
 if(k==='gap'){const q=pTiles().find(q=>inside(p,q));if(q)gapTap(q.j)}
 if(k==='bal'){const q=bTiles().find(q=>inside(p,q));if(q&&bOpts()[q.j])balTap(bOpts()[q.j][0])}
 if(k==='verb'){const q=vTiles().find(q=>inside(p,q));if(q)verbTap(q.j)}
 if(k==='move'&&G.move.i<MOVE.length){if(inside(p,chipHome())){G.move.drag={x:p.x,y:p.y};A.redraw();return true}const g=nearGap(p);if(g!=null)place(g)}return false}
function move(p){if(G.move&&G.move.drag){G.move.drag={x:p.x,y:p.y};A.redraw()}}
function up(p){const s=G.move;if(!s||!s.drag)return;s.drag=null;const g=p&&nearGap(p);if(g!=null)place(g);else A.redraw()}
function reset(){gen++;for(const q in G)delete G[q];G.pair={i:0};G.gap={i:0};G.bal={i:0,made:[]};G.verb={i:0};G.move={i:0,made:[]};G.cb=()=>{}}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();G.cb()}
function begin(i,first,ready,msg){reset();tell(first);G.cb=()=>{if(A.step===i&&ready()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function controls(){if(!ctl)return;ctl.innerHTML='';const k=phase(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='pair'&&G.pair.i<FIRST.length)SECOND.forEach((t,j)=>b(t,()=>pairTap(j),`${FIRST[G.pair.i]} pairs with ${t}`));
 if(k==='gap'&&G.gap.i<GAPS.length)PICK.forEach((p,j)=>b(p.join(' … '),()=>gapTap(j),`Use ${p.join(' and ')}`));
 if(k==='bal'&&G.bal.i<BAL.length)bOpts().forEach(o=>b(o[0],()=>balTap(o[0]),`End with: ${o[0]}`));
 if(k==='verb'&&G.verb.i<VERB.length)VERB[G.verb.i][2].forEach((v,j)=>b(v,()=>verbTap(j),`Fill the gap with ${v}`));
 if(k==='move'&&G.move.i<MOVE.length){const m=MOVE[G.move.i];m[0].slice(0,-1).split(' ').forEach((w,j)=>b(`before ${w}`,()=>place(j),`Put ${m[1]} before word ${j+1}, ${w}`))}}
const steps=[
{h:'Words that come in pairs',p:'Correlative conjunctions are pairs of joining words that work together: either … or, neither … nor, both … and, not only … but also, whether … or. Tap the partner of each first word.',
predict:{q:'Which word goes with neither?',opts:['or','nor'],ans:1},task:'Match all 5 pairs',
show:()=>auto(0,PART.map(j=>()=>pairTap(j)),600),go:()=>begin(0,'Either goes with which word? Tap it.',()=>G.pair.i>=FIRST.length,'Each first word has one partner.')},
{h:'Pick the pair for the meaning',p:'Each pair means something different. Either … or picks one. Neither … nor rules out both. Both … and takes the two together. Whether … or is a choice still to make.',task:'Fill all 4 sentences',
show:()=>auto(1,GAPS.map(([,k])=>()=>gapTap(k)),650),go:()=>begin(1,'Only one seat is left. Which pair fits?',()=>G.gap.i>=GAPS.length,'Choose the pair whose meaning fits.')},
{h:'Keep it balanced',p:'The words after the first partner and the words after the second must be the same kind: two -ing words, two verbs, two describing words, or two things. This is parallel structure.',
predict:{q:'Is "You can either walk or by bus." balanced?',opts:['Yes: it has either and or','No: walk is an action, by bus is not'],ans:1},task:'Balance all 4 sentences',
show:()=>auto(2,BAL.map(b=>()=>balTap(b[3][0][0])),650),go:()=>begin(2,'She likes both swimming and to run. Choose a match for swimming.',()=>G.bal.i>=BAL.length,'Match the two halves.')},
{h:'Which verb?',p:'With either … or and neither … nor, the verb agrees with the subject nearer to it. With both … and, the verb is always plural.',
predict:{q:'Neither the players nor the coach ___ happy.',opts:['were: there are lots of players','was: the coach is nearer the verb'],ans:1},task:'Fix all 4 verbs',
show:()=>auto(3,VERB.map(v=>()=>verbTap(v[3])),650),go:()=>begin(3,'Neither the players nor the coach ___ ready. Pick a verb.',()=>G.verb.i>=VERB.length,'The nearer subject decides.')},
{h:'Put the first word in place',p:'Place the first partner just before the first half, so what follows it matches what follows the second partner. Drag the word into a gap, or tap a gap.',task:'Place all 3 first words',
show:()=>auto(4,MOVE.map(m=>()=>place(m[2])),700),go:()=>begin(4,'I will phone you or text you. Where does either go?',()=>G.move.i>=MOVE.length,'Both halves now match.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.cb()});
const QS=[
{q:'Which is correct?',a:'Neither Ali nor Ben was late.',o:[['Neither Ali or Ben was late.','Neither pairs with nor, not or.'],['Neither Ali nor Ben were late.','The verb agrees with the nearer subject, Ben: one person, so was.']]},
{q:'Which is balanced?',a:'She is both funny and kind.',o:[['She is both funny and has kindness.','Funny is a describing word, so the second half needs one too: kind.'],['She both is funny and kind.','Both sits before is, but and sits before kind. Move both before funny.']]},
{q:'Fill the gap: "Either the twins or their dad ___ driving."',a:'is',o:[['are','The nearer subject is their dad: one person, so is.'],['were','Were is plural and past. The nearer subject is one person, their dad.']]},
{q:'Which pair fits? "We can go ___ today ___ tomorrow, but not both days."',a:'either … or',o:[['both … and','Both … and means the two together, but the sentence says not both.'],['neither … nor','Neither … nor rules out both days, but we can go on one of them.']]},
{q:'What partners "not only"?',a:'but also',o:[['and','And partners both. Not only … but also adds the second thing as extra.'],['or','Or partners either and whether. Not only pairs with but also.']]},
{q:'Fill the gap: "Both the bread and the milk ___ fresh."',a:'are',o:[['is','Both … and always means two things, so the verb is plural: are.'],['was','Was is singular. Both the bread and the milk are two things.']]}];
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,''],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=quiz.querySelector('.fl-pick');ord.forEach(([v,why])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>mark(why,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(why,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=!why;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why)}
function draw(){const k=phase();if(k==='quiz'){paper();head('Challenge',1);text('either … or · neither … nor · both … and · not only … but also · whether … or',A.W/2,A.H*.5,A.W-u(40),16,A.col.tx,800);return}
 ({pair:drawPair,gap:drawGap,bal:drawBal,verb:drawVerb,move:drawMove})[k]();A.fx.draw(X)}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{quiz.hidden=B.step!==5;ctl.hidden=B.step===5;controls()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Conjunction buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});controls()}}).start()})})();
