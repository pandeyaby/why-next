/* Flagship – bullet point punctuation (ages 10–11; NC England Y6 Appendix 2): sentence or phrase, odd one out,
   run on from the lead-in, make a list match, sentence list to bullets. */
(()=>{
/* [bullet text, is a full sentence, why] */
const KIND=[['a water bottle',0,'No verb, so not a sentence: no full stop.'],
 ['The bus leaves at nine',1,'It has a subject and a verb, so it is a sentence: full stop.'],
 ['warm socks',0,'Just a noun phrase: no full stop.'],
 ['Lunch is in the hall',1,'It makes sense alone, so add a full stop.'],
 ['a torch with spare batteries',0,'It is long, but it still has no verb. No full stop.'],
 ['We will be back by six',1,'A whole sentence: full stop.']];
/* [lead-in or null, bullets, index of the odd one, why] */
const ODD=[['You will need:',['a pencil','a ruler','A rubber','a glue stick'],2,'The others start with a small letter. Make it a rubber.'],
 ['Pond rules:',['Stay behind the rail.','Walk on the path.','Keep dogs on a lead','Take your litter home.'],2,'The other sentences end with a full stop. This one has lost it.'],
 ['In the box there are:',['two cups','a jug','Some spoons are in it too.','four plates'],2,'The rest are short phrases. This one is a whole sentence.'],
 ['To make toast:',['put bread in the toaster','wait for it to pop','spread the butter.','eat it while it is warm'],2,'No other bullet ends with a full stop. Remove it.']];
/* [lead-in, two fixed bullets, options [text, why wrong or ''] ] */
const RUN=[['To stay safe on a bike, you should:',['wear a helmet','check your brakes'],[['use lights at night',''],['Lights are a good idea.','you should Lights are a good idea does not run on.'],['using lights at night','you should using lights does not work. Match wear: use.']]],
 ['At the farm we saw:',['three pigs','a black cow'],[['two white goats',''],['we fed the goats','we saw we fed the goats does not work.'],['Goats.','A capital and a full stop break the pattern of small phrases.']]],
 ['A good friend:',['listens to you','shares their things'],[['keeps your secrets',''],['keeping secrets','A good friend keeping secrets does not work. Match listens: keeps.'],['You can trust them.','That does not go on from A good friend.']]]];
/* [style label, bullets, start capital wanted, full stop wanted, start states, end states] */
const FIX=[['Not sentences: small letter, no full stop',['apples','pears','plums','grapes'],0,0,[1,0,1,0],[0,1,0,1]],
 ['Full sentences: capital letter and full stop',['The gate is shut','Dogs are not allowed','The café opens at ten'],1,1,[0,1,0],[1,0,0]]];
/* [lead words, items, joiners shown between items] */
const SPLIT=[['For the trip, bring',['a coat','a hat','a drink']],['Our class pet needs',['fresh water','hay every day','a clean cage']],['The robot can',['walk','talk','dance']]];
VIS.reg('flagbullet',c=>{let A,X,keys,chal,qno=-1,run=0;const G={};
const TXT='#0f172a',PAGE='#ffffff',LINE='#64748b',GOOD='#047857',MISS='#be123c',HOLD='#1d4ed8',PINK='#fde2e7',MINTY='#d1fae5',CREAM='#fef3c7',ICE='#e0f2fe',LILAC='#ede9fe';
const sz=n=>Math.round(n*(A.narrow?.9:1.05)),fnt=(n,w)=>`${w||700} ${sz(n)}px system-ui,sans-serif`,inBox=(p,r,m=0)=>r&&p.x>=r.x-m&&p.x<=r.x+r.w+m&&p.y>=r.y-m&&p.y<=r.y+r.h+m;
const PART=['kind','odd','run','fix','split','quiz'],now=()=>PART[A.step],DATA={kind:KIND,odd:ODD,run:RUN,fix:FIX,split:SPLIT},fin=n=>G[n].i>=DATA[n].length;
const warn=()=>A.col.dark?'#fda4af':MISS;
function wash(){X.fillStyle=A.col.dark?'#0b1120':'#f8fafc';X.fillRect(0,0,A.W,A.H)}
function pen(n,w,al){X.font=fnt(n,w);X.textAlign=al||'center';X.textBaseline='middle'}
function para(t,x,y,w,n){const L=[];let cur='';String(t).split(' ').forEach(wd=>{const nx=cur?cur+' '+wd:wd;if(cur&&X.measureText(nx).width>w){L.push(cur);cur=wd}else cur=nx});L.push(cur);
 const lh=sz(n)*1.28;L.forEach((s,i)=>X.fillText(s,x,y+(i-(L.length-1)/2)*lh))}
function card(r,t,o={}){X.fillStyle=o.bg||PAGE;A.paint.rrect(r.x,r.y,r.w,r.h,10);X.fill();X.lineWidth=o.ring?3.2:1.2;X.strokeStyle=o.ring||LINE;X.stroke();
 if(t!=null){X.fillStyle=o.fg||TXT;pen(o.n||17,o.w||700,o.al);para(t,o.al==='left'?r.x+12:r.x+r.w/2,r.y+r.h/2,r.w-20,o.n||17)}}
function head(t,won){pen(14,800);const w=Math.min(A.W-8,X.measureText(t).width+28),h=sz(14)+14,y=A.H*.02;card({x:A.W/2-w/2,y,w,h},null,{bg:won?MINTY:PAGE,ring:won?GOOD:null});X.fillStyle=TXT;X.fillText(t,A.W/2,y+h/2+1,w-12)}
function line(t,y,n,col){X.fillStyle=col||A.col.tx;pen(n||14,650);para(t,A.W/2,y,A.W-28,n||14)}
function closing(t,L){wash();head(t,1);L.forEach((s,i)=>card({x:12,y:A.H*(.16+i*.21),w:A.W-24,h:A.H*.17},s,{n:16,bg:'#ecfdf5'}))}
function sheet(lead,items,y0,o={}){const x=14,w=A.W-28,rh=sz(o.rh||40),top=lead?sz(36):sz(10),h=top+items.length*rh+sz(10);
 card({x,y:y0,w,h},null,{bg:A.col.dark?'#1e293b':'#fffdf7'});X.fillStyle=A.col.tx;if(lead){pen(17,800,'left');X.fillText(lead,x+14,y0+sz(20))}
 return items.map((t,i)=>{const r={i,x:x+8,y:y0+top+i*rh,w:w-16,h:rh-sz(6)};if(o.draw)o.draw(r,t,i);else{X.fillStyle=A.col.tx;pen(17,700,'left');X.fillText('•  '+t,r.x+10,r.y+r.h/2)}return r})}
/* ---- 1: sentence or not? ---- */
function kindR(){const w=(A.W-36)/2,h=sz(64);return[{v:1,t:'Sentence: full stop',x:12,y:A.H*.68,w,h},{v:0,t:'Not a sentence: no full stop',x:24+w,y:A.H*.68,w,h}]}
function drawKind(){const s=G.kind;wash();if(fin('kind'))return closing('All 6 bullets sorted',['Sentence: full stop.','Word or phrase: no full stop.']);
 head(`Bullet ${s.i+1} of 6: sentence or not?`);card({x:12,y:A.H*.14,w:A.W-24,h:A.H*.17},'•  '+KIND[s.i][0],{n:21,w:800,bg:ICE,al:'left'});
 line('Does it have a subject and a verb?',A.H*.42,13);if(s.msg)line(s.msg,A.H*.55,13,warn());
 kindR().forEach(r=>card(r,r.t,{n:16,bg:s.no===r.v?PINK:r.v?CREAM:MINTY,ring:s.no===r.v?MISS:null}))}
function kind(v){const s=G.kind;if(fin('kind'))return;const [t,ok,why]=KIND[s.i];let m;
 if(v===ok){s.i++;s.msg='';s.no=null;A.sound.pop();return speak(`Right. ${why}`)}
 s.no=v;A.sound.miss();m=`Look again. ${why}`;s.msg=m;speak(m)}
/* ---- 2: which bullet breaks the pattern? ---- */
function oddR(){const [lead,B]=ODD[G.odd.i];return sheet(lead,B,A.H*.12,{draw:()=>0})}
function drawOdd(){const s=G.odd;wash();if(fin('odd'))return closing('All 4 odd ones found',['Same start every time.','Same end every time.','Same kind of words.']);
 head(`List ${s.i+1} of 4: tap the bullet that breaks the pattern`);const [lead,B]=ODD[s.i];
 sheet(lead,B,A.H*.12,{draw:(r,t,i)=>{card(r,'•  '+t,{n:17,al:'left',bg:s.no===i?PINK:PAGE,ring:s.no===i?MISS:null})}});
 line('Check the first letter, the end and the kind of words.',A.H*.72,13);if(s.msg)line(s.msg,A.H*.84,13,warn())}
function odd(i){const s=G.odd;if(fin('odd'))return;const [,B,bad,why]=ODD[s.i];let m;
 if(i===bad){s.i++;s.msg='';s.no=null;A.sound.pop();return speak(`Found it: ${B[bad]}. ${why}`)}
 s.no=i;A.sound.miss();m=`${B[i]} matches the others. Check each start and end.`;s.msg=m;speak(m)}
/* ---- 3: drag the bullet that runs on ---- */
function runOpts(){const O=RUN[G.run.i][2],ord=[1,0,2].map(j=>O[(j+G.run.i)%3]);return ord}
function runR(){const h=sz(52);return runOpts().map((o,j)=>{const r={o,x:12,y:A.H*.58+j*(h+sz(8)),w:A.W-24,h};return G.hold&&G.hold.o===o?{...r,x:G.hold.x-r.w/2,y:G.hold.y-h/2}:r})}
function slotR(){return{x:22,y:A.H*.12+sz(36)+2*sz(40),w:A.W-44,h:sz(34)}}
function drawRun(){const s=G.run;wash();if(fin('run'))return closing('All 3 lists finished',['Read each bullet after the lead-in.','Start each with the same kind of word.']);
 const [lead,B]=RUN[s.i];head(`List ${s.i+1} of 3: drag the bullet that fits`);sheet(lead,[...B,''],A.H*.12);
 const sl=slotR();card(sl,'•  drag a bullet here',{n:15,w:600,bg:s.no!=null?PINK:LILAC,fg:'#3b0764',ring:s.no!=null?MISS:A.col.dark?'#93c5fd':HOLD,al:'left'});
 if(s.msg)line(s.msg,A.H*.5,13,warn());runR().forEach(r=>card(r,r.o[0],{n:16,bg:G.hold&&G.hold.o===r.o?ICE:PAGE,ring:G.hold&&G.hold.o===r.o?HOLD:null}))}
function runOn(o){const s=G.run;if(fin('run'))return;const [lead,B]=RUN[s.i];let m;
 if(!o[1]){s.i++;s.msg='';s.no=null;A.sound.pop();return speak(`Yes: ${lead} ${B.join(', ')}, ${o[0]}. Each bullet runs on from the lead-in.`)}
 s.no=1;A.sound.miss();m=o[1];s.msg=m;speak(m)}
/* ---- 4: make the list match ---- */
function fixRows(){const [, B]=FIX[G.fix.i];return sheet(null,B,A.H*.21,{rh:50,draw:()=>0})}
function shown(j){const [, B]=FIX[G.fix.i],cap=G.fix.cap[j],stop=G.fix.stop[j],w=B[j];return{first:cap?w[0].toUpperCase():w[0].toLowerCase(),rest:w.slice(1),end:stop?'.':''}}
function partsR(){return fixRows().map((r,j)=>{const z=sz(42);return{j,cap:{x:r.x+sz(26),y:r.y,w:z,h:r.h},end:{x:r.x+r.w-z-4,y:r.y,w:z,h:r.h},row:r}})}
function drawFix(){const s=G.fix;wash();if(fin('fix'))return closing('Both lists match',['Not sentences: small letter, no full stop.','Sentences: capital letter and full stop.','Pick one style and keep it.']);
 const [label,,wc,ws]=FIX[s.i];head(`List ${s.i+1} of 2: make every bullet match`);card({x:12,y:A.H*.09,w:A.W-24,h:A.H*.1},label,{n:14,bg:CREAM});
 partsR().forEach(P=>{const v=shown(P.j),okRow=s.cap[P.j]===wc&&s.stop[P.j]===ws;card(P.row,null,{bg:okRow?MINTY:PAGE,ring:okRow?GOOD:null});X.fillStyle=TXT;pen(17,700,'left');X.fillText('•',P.row.x+10,P.row.y+P.row.h/2);
  card(P.cap,v.first,{n:20,w:900,bg:LILAC,fg:'#3b0764'});X.fillStyle=TXT;pen(17,700,'left');X.fillText(v.rest,P.cap.x+P.cap.w+4,P.row.y+P.row.h/2,P.end.x-P.cap.x-P.cap.w-8);card(P.end,v.end,{n:22,w:900,bg:LILAC,fg:'#3b0764'})});
 line('Tap a letter to switch it. Tap an end box to add or remove a full stop.',A.H*.78,12);if(s.msg)line(s.msg,A.H*.9,12,warn())}
function fixTap(j,part){const s=G.fix;if(fin('fix'))return;const [,B,wc,ws]=FIX[s.i];let m;const arr=part==='cap'?s.cap:s.stop,want=part==='cap'?wc:ws;
 if(arr[j]===want){A.sound.miss();m=`Bullet ${j+1} was already right. `+(part==='cap'?(wc?'Sentences start with a capital.':'Phrases start small here.'):(ws?'A sentence needs its full stop.':'No full stop after a phrase.'));s.msg=m;return speak(m)}
 arr[j]=want;s.msg='';A.sound.pop();if(s.cap.every(x=>x===wc)&&s.stop.every(x=>x===ws)){s.i++;if(!fin('fix')){s.cap=[...FIX[s.i][4]];s.stop=[...FIX[s.i][5]]}return speak(`All ${B.length} bullets match.`)}
 speak(`Bullet ${j+1} fixed.`)}
/* ---- 5: sentence list to bullets ---- */
function splitTok(){const [lead,I]=SPLIT[G.split.i],T=[];I.forEach((it,j)=>{if(j===I.length-1)T.push({t:'and',k:'and'});T.push({t:it,k:'item',j});if(j<I.length-2)T.push({t:',',k:','})});return{lead,T}}
function splitR(){const {T}=splitTok();pen(17,750);const R=[];let x=0,y=A.H*.2;const h=sz(44),rows=[[]];
 T.forEach((q,n)=>{const w=X.measureText(q.t).width+sz(q.k===','?26:24);if(x+w>A.W-24&&x>0){rows.push([]);x=0;y+=h+sz(8)}rows[rows.length-1].push({...q,n,x,y,w,h});x+=w+sz(6)});
 rows.forEach(r=>{const e=r[r.length-1],off=(A.W-(e.x+e.w))/2;r.forEach(q=>{q.x+=off;R.push(q)})});return R}
function drawSplit(){const s=G.split;wash();if(fin('split'))return closing('All 3 turned into bullets',['The lead-in ends with a colon.','Drop the commas and the and.','One item per line.']);
 const {lead}=splitTok(),I=SPLIT[s.i][1];head(`Sentence ${s.i+1} of 3: tap the items in order`);X.fillStyle=A.col.tx;pen(17,800);X.fillText(lead+' …',A.W/2,A.H*.13);
 splitR().forEach(r=>{const used=r.k==='item'&&s.got.includes(r.j);card(r,r.t,{n:17,bg:used?MINTY:s.no===r.n?PINK:r.k==='item'?ICE:PAGE,ring:s.no===r.n?MISS:null,fg:used?'#065f46':TXT})});
 sheet(lead+':',s.got.map(j=>I[j]),A.H*.48,{rh:34});if(s.msg)line(s.msg,A.H*.9,12,warn())}
function split(n){const s=G.split;if(fin('split'))return;const {lead,T}=splitTok(),q=T[n],I=SPLIT[s.i][1];let m;if(!q)return;
 if(q.k==='item'){if(s.got.includes(q.j))return;if(q.j!==s.got.length){s.no=n;A.sound.miss();m='Keep the order: take the first item left.';s.msg=m;return speak(m)}
  s.got.push(q.j);s.no=null;s.msg='';A.sound.pop();if(s.got.length===I.length){s.i++;s.got=[];return speak(`${lead}: then ${I.join(' / ')}, one per line, with no commas and no and.`)}return speak(`${q.t} is bullet ${s.got.length}.`)}
 s.no=n;A.sound.miss();m=q.k==='and'?'In a bullet list the and is dropped. Each item stands on its own line.':'Bullets now split the items, so drop the comma.';s.msg=m;speak(m)}
/* ---- pointer ---- */
function down(p){const k=now();if(k==='quiz'||fin(k))return false;
 if(k==='kind'){const r=kindR().find(r=>inBox(p,r));if(r)kind(r.v)}
 if(k==='odd'){const r=oddR().find(r=>inBox(p,r));if(r)odd(r.i)}
 if(k==='run'){const r=runR().find(r=>inBox(p,r));if(r){G.hold={o:r.o,x:p.x,y:p.y};A.redraw();return true}}
 if(k==='fix'){for(const P of partsR()){if(inBox(p,P.cap,4))return fixTap(P.j,'cap'),false;if(inBox(p,P.end,4))return fixTap(P.j,'stop'),false}}
 if(k==='split'){const r=splitR().find(r=>inBox(p,r,4));if(r)split(r.n)}return false}
function move(p){if(G.hold){G.hold.x=p.x;G.hold.y=p.y;A.redraw()}}
function up(p){const h=G.hold;if(!h)return;G.hold=null;if(now()==='run'&&inBox(p,slotR(),sz(24)))return runOn(h.o);A.redraw()}
function fresh(){run++;for(const q in G)delete G[q];Object.assign(G,{kind:{i:0},odd:{i:0},run:{i:0},fix:{i:0,cap:[...FIX[0][4]],stop:[...FIX[0][5]]},split:{i:0,got:[]},hold:null,test:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();btns();G.test()}
function begin(i,first,ok,msg){fresh();speak(first);G.test=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=run;acts.forEach((f,j)=>setTimeout(()=>{if(me===run)f()},ms*(j+1)))}
function btns(){if(!keys)return;keys.innerHTML='';const k=now(),mk=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};if(k==='quiz'||fin(k))return;
 if(k==='kind')kindR().forEach(r=>mk(r.t,()=>kind(r.v),`${r.t}: ${KIND[G.kind.i][0]}`));
 if(k==='odd')ODD[G.odd.i][1].forEach((t,i)=>mk(t,()=>odd(i),`Bullet ${i+1} breaks the pattern: ${t}`));
 if(k==='run')runOpts().forEach(o=>mk(o[0],()=>runOn(o),`Use the bullet: ${o[0]}`));
 if(k==='fix')FIX[G.fix.i][1].forEach((t,j)=>{mk(`${j+1}: first letter`,()=>fixTap(j,'cap'),`First letter of bullet ${j+1}, ${t}`);mk(`${j+1}: end`,()=>fixTap(j,'stop'),`Full stop on bullet ${j+1}, ${t}`)});
 if(k==='split')splitTok().T.forEach((q,n)=>{if(!(q.k==='item'&&G.split.got.includes(q.j)))mk(q.t,()=>split(n),q.k==='item'?`Make ${q.t} the next bullet`:`Make the ${q.k==='and'?'word and':'comma'} a bullet`)})}
function fixDemo(){const acts=[];FIX.forEach((F,f)=>{F[1].forEach((_,j)=>{if(F[4][j]!==F[2])acts.push(()=>fixTap(j,'cap'));if(F[5][j]!==F[3])acts.push(()=>fixTap(j,'stop'))})});return acts}
const steps=[
{h:'Sentence or not?',p:'Some bullets are whole sentences. Some are just a word or a phrase. Which kind it is decides how it ends.',
predict:{q:'Should the bullet "a water bottle" end with a full stop?',opts:['yes, every bullet ends with one','no, it is not a sentence'],ans:1},task:'Sort all 6 bullets',
show:()=>auto(0,KIND.map(q=>()=>kind(q[1])),550),go:()=>begin(0,'Is the bullet a whole sentence? Tap your answer.',()=>fin('kind'),'Sentences end with full stops; phrases do not.')},
{h:'Spot the odd one out',p:'In a good list every bullet follows the same pattern. Look at how each one starts and ends.',
predict:{q:'A list has a pencil, a ruler, A rubber. Is that fine?',opts:['yes, any bullet can start with a capital','no, the bullets should all match'],ans:1},task:'Fix all 4 lists',
show:()=>auto(1,ODD.map(q=>()=>odd(q[2])),650),go:()=>begin(1,'Tap the bullet that does not match the others.',()=>fin('odd'),'Same start, same end, same kind of words.')},
{h:'Run on from the lead-in',p:'The line before a list is the lead-in. Read it, then each bullet straight after it. Every bullet should finish it the same way.',
predict:{q:'"To stay safe, you should: wear a helmet, check your brakes, …" Which fits?',opts:['Lights are a good idea.','use lights at night'],ans:1},task:'Finish all 3 lists',
show:()=>auto(2,RUN.map((q,j)=>()=>runOn(q[2][0])),700),go:()=>begin(2,'Drag the bullet that fits into the empty line, or use the buttons.',()=>fin('run'),'Every bullet runs on from the lead-in.')},
{h:'Make it match',p:'Pick one style and keep it. Phrases: small letter, no full stop. Sentences: capital letter and full stop.',task:'Fix both lists',
show:()=>auto(3,fixDemo(),400),go:()=>begin(3,'Tap a first letter or an end box to fix it.',()=>fin('fix'),'One style for the whole list.')},
{h:'From sentence to bullets',p:'A list in a sentence uses commas and and. In a bullet list the lead-in ends with a colon, and the commas and the and are dropped.',task:'Turn all 3 into bullets',
show:()=>auto(4,SPLIT.flatMap(q=>q[1].map(()=>()=>{const {T}=splitTok();split(T.findIndex(x=>x.k==='item'&&x.j===G.split.got.length))})),420),go:()=>begin(4,'Tap the items in order to put each one on its own line.',()=>fin('split'),'One item per line, no commas, no and.')},
{h:'Challenge',p:'',go:()=>{fresh();quizQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.test()});
const QS=[
{q:'Which bullet fits the list "You will need: a hat, a scarf, …"?',a:'gloves',o:[['Gloves.','The others start with a small letter and have no full stop.'],['You need gloves too.','That is a whole sentence among short phrases.']]},
{q:'A bullet says "The museum opens at ten". What should it end with?',a:'A full stop',o:[['Nothing','It is a whole sentence, so it needs a full stop.'],['A comma','Bullets never end with commas.']]},
{q:'"Our pet needs: food, water and a bed" as bullets. What goes on the last bullet?',a:'a bed',o:[['and a bed','Drop the and. Bullets do the job of joining.'],['a bed,','No comma at the end of a bullet.']]},
{q:'"To make a kite, you need to: cut the paper, …" Which bullet fits?',a:'tie on the string',o:[['tying on the string','you need to tying does not run on. Use the same form: tie.'],['The string is tied on.','That does not follow on from you need to.']]},
{q:'Which list is punctuated right?',a:'• red • blue • green',o:[['• Red • blue • Green','The capitals are mixed.'],['• red. • blue • green.','Mixed full stops, and phrases need none.']]},
{q:'What is the main rule for bullet points?',a:'Every bullet in a list follows the same pattern',o:[['Every bullet needs a capital and a full stop','Phrases need neither. Be consistent.'],['Any style, mixed freely','A mixed list slows the reader down.']]}];
function quizQ(){qno++;const Q=QS[qno%QS.length],all=[[Q.a,''],...Q.o],r=qno%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');ord.forEach(([v,why])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>judge(why,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(why,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=!why;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quizQ;c.say(ok?'Yes.':why)}
function draw(){const k=now();if(k==='quiz'){wash();head('Challenge',1);sheet('Bullet rules:',['every bullet runs on from the lead-in','same start and same end each time','sentences: capital and full stop'],A.H*.2,{rh:46});return}
 ({kind:drawKind,odd:drawOdd,run:drawRun,fix:drawFix,split:drawSplit})[k]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.7,tall:1.3,draw,onStep:B=>{chal.hidden=B.step!==5;keys.hidden=B.step===5;btns()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Bullet point buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});btns()}}).start()})})();
