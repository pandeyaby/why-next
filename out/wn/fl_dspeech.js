/* Flagship: punctuating direct speech (ages 7-10; NC Y3-4 inverted commas, CCSS L.3.2c, L.4.2b). Bubble words into a
   sentence, place the marks, choose the mark inside, fix the slip, sort direct from reported speech. Not flagdlg (11-14). */
(()=>{
const PN=/^[,.?!“”]$/;
const BUB=[{who:'Tom',bub:'Let’s go!',t:['Let’s','go','!','shouted','Tom','.'],say:[0,1],q:'“Let’s go!” shouted Tom.'},
{who:'Mum',bub:'Time for bed.',t:['Mum','said',',','Time','for','bed','.'],say:[3,4,5],q:'Mum said, “Time for bed.”'},
{who:'Ava',bub:'Can I help?',t:['Can','I','help','?','asked','Ava','.'],say:[0,1,2],q:'“Can I help?” asked Ava.'}];
const MARK=[{t:['Come','here',',','called','Dad','.'],o:0,c:3},{t:['Ben','asked',',','Where','is','my','hat','?'],o:3,c:8},{t:['Look','out','!','yelled','Zoe','.'],o:0,c:3}];
const INS=[{a:'“Time for bed',b:'” said Mum.',ok:',',w:{'.':'Said Mum comes next, so the full stop turns into a comma.','?':'Mum is telling, not asking. Use a comma.'}},
{a:'“Is it raining',b:'” asked Ella.',ok:'?',w:{',':'Ella is asking, so keep the ?. It does the comma’s job.','.':'It is a question. Use a question mark.'}},
{a:'Dad said, “I will make lunch',b:'”',ok:'.',w:{',':'The sentence ends here, so a full stop goes inside.','?':'Dad is telling us, not asking. End with a full stop.'}},
{a:'Kim asked, “Can I come too',b:'”',ok:'?',w:{',':'It ends here, and it is a question: use a question mark.','.':'Kim is asking. The question mark goes inside, with no full stop too.'}}];
const OPTS=[',','.','?'],ONAME={',':'comma','.':'full stop','?':'question mark','“':'the opening mark','”':'the closing mark'};
const SLIP=[{t:['“','Can','we','go','?','”','Asked','Lily','.'],bad:6,fix:'asked',why:'The sentence carries on after the speech, so asked starts with a small letter.'},
{t:['Mum','said',',','“','time','to','go','.','”'],bad:4,fix:'Time',why:'Spoken words start with a capital letter, even in the middle of a sentence.'},
{t:['“','I','am','hungry','.','”','said','Raj','.'],bad:4,fix:',',why:'Said Raj comes next, so the sentence is not over. Use a comma inside the closing mark.'}];
const SORTS=[['I am cold, said Tom.',0,'Tom’s exact words: “I am cold,” said Tom.'],['Tom said that he was cold.',1,'Said that: reported, not Tom’s own words.'],
['Can I play? asked Mia.',0,'Mia’s exact words: “Can I play?” asked Mia.'],['Mia asked if she could play.',1,'Asked if reports it. Her own words were “Can I play?”'],
['Sit down, said Mr Lee.',0,'His exact words: “Sit down,” said Mr Lee.'],['Mr Lee told us to sit down.',1,'Told us to: reported, not his own words.']];
VIS.reg('flagdspeech',c=>{let A,pad,quiz,qn=-1,gen=0;const Z={};c.fig.classList.add('young');
const INK='#0f172a',OK='#047857',NO='#b91c1c',RIM='#64748b',PICK='#1d4ed8',SAYB='#dbeafe',SF='system-ui,sans-serif';
const F=(n,w)=>`${w||800} ${n}px ${SF}`,sz=n=>A.narrow?n:Math.round(n*1.2),cc=g=>{g.textAlign='center';g.textBaseline='middle'};
const miss=()=>A.sound.miss(),pop=()=>A.sound.pop(),mode=()=>['bub','mark','ins','slip','sort','chal'][A.step];
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function sum(t,L){pill(t,A.W/2,A.H*.08,{ok:1});L.forEach((q,j)=>pill(q,A.W/2,A.H*(.3+j*.18),{n:17,ok:1}))}
function bg(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fef3c7',A.col.dark?.06:.45);g.fillRect(0,0,A.W,A.H)}
function pill(t,x,y,o){o=o||{};const g=A.ctx;let n=sz(o.n||14);g.font=F(n);let w=g.measureText(t).width+24;while(w>A.W-10&&n>10){n--;g.font=F(n);w=g.measureText(t).width+24}
const h=n+16,l=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle='#ffffff';A.paint.rrect(l,y-h/2,w,h,h/2);g.fill();g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?OK:o.no?NO:RIM;g.stroke();g.fillStyle=INK;cc(g);g.fillText(t,l+w/2,y+1)}
function box(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.fill||(o.slot?'#f8fafc':'#ffffff');A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();
g.lineWidth=o.ok||o.no||o.sel?3.5:1.5;g.strokeStyle=o.ok?OK:o.no?NO:o.sel?PICK:RIM;if(o.slot&&!t)g.setLineDash([4,4]);g.stroke();g.setLineDash([]);if(!t)return;
g.fillStyle=o.col||INK;g.font=F(o.n||sz(20),o.slot||PN.test(t)?900:700);cc(g);g.fillText(t,r.x+r.w/2,r.y+r.h/2+1)}
function flow(items,y0,n){const g=A.ctx;g.font=F(n,700);const h=n+22,sp=A.narrow?5:7,maxW=A.W-16;const rows=[[]];let w=0;
items.forEach(it=>{const iw=it.slot?Math.max(24,n*1.15):Math.max(PN.test(it.s)?30:42,g.measureText(it.s).width+18);if(w+iw>maxW&&rows[rows.length-1].length){rows.push([]);w=0}rows[rows.length-1].push({...it,w:iw});w+=iw+sp});
const out=[];rows.forEach((r,ri)=>{const tot=r.reduce((a,b)=>a+b.w,0)+sp*(r.length-1);let x=(A.W-tot)/2;r.forEach(it=>{out.push({...it,x,y:y0+ri*(h+10),h});x+=it.w+sp})});return out}
function bubR(){const s=BUB[Math.min(Z.b.k,2)];return flow(s.t.map((w,i)=>({s:w,i})),A.H*(A.narrow?.5:.46),sz(20))}
function face(x,y,r,nm){const g=A.ctx;g.fillStyle='#fde68a';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();
g.fillStyle=INK;g.beginPath();g.arc(x-r*.35,y-r*.15,r*.1,0,7);g.arc(x+r*.35,y-r*.15,r*.1,0,7);g.fill();g.beginPath();g.arc(x,y+r*.15,r*.4,.2,Math.PI-.2);g.stroke();
g.fillStyle=A.col.tx;g.font=F(sz(13));cc(g);g.fillText(nm,x,y+r+13)}
function bubble(x,y,w,h,t,tx){const g=A.ctx;g.fillStyle='#ffffff';A.paint.rrect(x,y,w,h,16);g.fill();g.strokeStyle=INK;g.lineWidth=2;g.stroke();
g.beginPath();g.moveTo(x+6,y+h*.6);g.lineTo(tx,y+h*.85);g.lineTo(x+14,y+h*.8);g.fillStyle='#ffffff';g.fill();g.stroke();
g.fillStyle=INK;g.font=F(sz(19),800);cc(g);g.fillText(t,x+w/2,y+h/2+1)}
function drawBub(){const s=Z.b,g=A.ctx;bg();
if(s.k>=3){sum('All 3 found',BUB.map(b=>b.q));pill('Speech marks go round the exact words',A.W/2,A.H*.86,{n:12});return}
const b=BUB[s.k];pill(`Line ${s.k+1} of 3: tap the words ${b.who} says`,A.W/2,A.H*.06,{n:13});
const r=Math.min(30,A.W*.07),fx=A.W*.16,fy=A.H*.24;face(fx,fy,r,b.who);const bw=Math.min(260,A.W*.58);bubble(fx+r+18,fy-r-8,bw,Math.min(64,A.H*.15),b.bub,fx+r+2);
bubR().forEach(it=>{if(PN.test(it.s)){box(it,it.s);return}
const got=s.got.includes(it.i);box(it,it.s,{ok:got,no:s.no===it.i,fill:got?SAYB:null})});
pill(`Found ${s.got.length} of ${b.say.length} spoken words`,A.W/2,A.H*.9,{n:12,ok:s.got.length===b.say.length})}
function tapBub(i){const s=Z.b;if(s.k>=3)return;const b=BUB[s.k],w=b.t[i];if(PN.test(w)||s.got.includes(i))return;
if(!b.say.includes(i)){s.no=i;miss();return tell(`${w} is not in the bubble. `+(w===b.who?'It is who speaks':`It tells how ${b.who} spoke`)+', so it stays outside the marks.')}
s.got.push(i);s.no=null;pop();if(s.got.length<b.say.length)return tell(`${w}: yes, ${b.who} says that. Find the rest.`);
const q=b.q;s.k++;s.got=[];tell(`All found. Those exact words go inside the speech marks: ${q}`+(s.k>=3?' All 3 lines done.':''))}
function markR(){const m=MARK[Math.min(Z.m.k,2)],s=Z.m,it=[];for(let gp=0;gp<=m.t.length;gp++){it.push({slot:1,gp});if(gp<m.t.length)it.push({s:m.t[gp]})}
return flow(it,A.H*.24,sz(20))}
function drawMark(){const s=Z.m;bg();
if(s.k>=3){sum('All 3 punctuated',['“Come here,” called Dad.','Ben asked, “Where is my hat?”','“Look out!” yelled Zoe.']);pill('The comma, ? or ! goes inside the closing mark',A.W/2,A.H*.86,{n:12});return}
pill(`Line ${s.k+1} of 3: tap a gap for the ${s.open==null?'opening “':'closing ”'} mark`,A.W/2,A.H*.08,{n:13});
markR().forEach(it=>{if(it.slot){const v=it.gp===s.open?'“':null;box(it,v,{slot:1,ok:!!v,no:s.no===it.gp})}else box(it,it.s)})}
function gapName(m,gp){return gp===0?`before ${m.t[0]}`:gp===m.t.length?'at the very end':`between ${m.t[gp-1]} and ${m.t[gp]}`}
function tapGap(gp){const s=Z.m;if(s.k>=3)return;const m=MARK[s.k];
if(s.open==null){if(gp===m.o){s.open=gp;s.no=null;pop();return tell(`Opening mark placed ${gapName(m,gp)}. The spoken words start here. Now the closing mark.`)}
s.no=gp;miss();return tell((gp>m.o&&gp<m.c?'That is inside the spoken words.':'Those words are not spoken.')+' Open right before the first spoken word.')}
if(gp===m.c){s.k++;s.open=null;s.no=null;pop();return tell(`Closed after the ${ONAME[m.t[m.c-1]]||'mark'}, which belongs to the speech.`+(s.k>=3?' All 3 done.':''))}
s.no=gp;miss();
if(gp===m.c-1)return tell(`Not quite. The ${ONAME[m.t[gp]]||'mark'} belongs to the spoken words, so close the speech marks after it.`);
tell(gp<=s.open?'Close after the spoken words, not before.':gp<m.c?'Some spoken words are still outside.':'Those words tell us who spoke. They stay outside.')}
function optR(){const n=OPTS.length,w=Math.min(110,(A.W-40)/n-10),h=Math.min(90,A.H*.22),x0=(A.W-(n*w+(n-1)*14))/2;return OPTS.map((o,i)=>({o,x:x0+i*(w+14),y:A.H*.62,w,h}))}
function drawIns(){const s=Z.i,g=A.ctx;bg();
if(s.k>=4){pill('All 4 marks chosen',A.W/2,A.H*.08,{ok:1});INS.forEach((t,j)=>pill(t.a+t.ok+t.b,A.W/2,A.H*(.24+j*.16),{n:16,ok:1}));return}
const t=INS[s.k];pill(`Line ${s.k+1} of 4: which mark goes in the box?`,A.W/2,A.H*.08,{n:13});
let n=sz(21);const bw=sz(34),mw=()=>{g.font=F(n,700);return g.measureText(t.a).width+bw+g.measureText(t.b).width+12};while(mw()>A.W-16&&n>13)n--;
const tot=mw(),wa=g.measureText(t.a).width,x=(A.W-tot)/2,y=A.H*.32;g.fillStyle=A.col.tx;g.textAlign='left';g.textBaseline='middle';g.fillText(t.a,x,y);g.fillText(t.b,x+wa+bw+12,y);
box({x:x+wa+6,y:y-bw*.7,w:bw,h:bw*1.4},s.pick,{slot:1,ok:s.pick===t.ok,no:s.pick&&s.pick!==t.ok});
optR().forEach(r=>{box(r,r.o,{n:sz(40),no:s.no===r.o});g.fillStyle=INK;g.font=F(sz(11),700);cc(g);g.fillText(ONAME[r.o],r.x+r.w/2,r.y+r.h-11)})}
function pickIns(o){const s=Z.i;if(s.k>=4)return;const t=INS[s.k];s.pick=o;
if(o!==t.ok){s.no=o;miss();return tell(t.w[o])}
pop();const done=t.a+o+t.b;s.no=null;s.pick=null;s.k++;tell(`${done} Right: `+(o===','?'it goes on, so a comma.':o==='.'?'it ends, so a full stop.':'it is a question.')+(s.k>=4?' All 4 done.':''))}
function slipR(){const L=SLIP[Math.min(Z.s.k,2)];return flow(L.t.map((w,i)=>({s:w,i})),A.H*.3,sz(21))}
function drawSlip(){const s=Z.s;bg();
if(s.k>=3){sum('All 3 slips fixed',['“Can we go?” asked Lily.','Mum said, “Time to go.”','“I am hungry,” said Raj.']);return}
pill(`Line ${s.k+1} of 3: one part is wrong. Tap it.`,A.W/2,A.H*.08,{n:13});slipR().forEach(it=>box(it,it.s,{no:s.no===it.i}));pill('Check capitals, commas and full stops',A.W/2,A.H*.82,{n:12})}
function tapSlip(i){const s=Z.s;if(s.k>=3)return;const L=SLIP[s.k];
if(i!==L.bad){s.no=i;miss();return tell(`${L.t[i]} is fine. Check capitals and the mark before ”.`)}
s.no=null;s.k++;pop();tell(`Found it: ${L.t[i]} should be ${L.fix}. ${L.why}`+(s.k>=3?' All 3 fixed.':''))}
function binR(){const w=(A.W-30)/2,h=A.H*.3;return[{x:10,y:A.H*.64,w,h},{x:20+w,y:A.H*.64,w,h}]}
function cardR(){const w=Math.min(330,A.W-30),h=Math.min(78,A.H*.17);return{x:A.W/2-w/2,y:A.H*.24,w,h}}
function drawSort(){const s=Z.o,g=A.ctx;bg();pill(s.k>=6?'All 6 sorted':`Card ${s.k+1} of 6: drag it to a box, or tap a box`,A.W/2,A.H*.08,{n:13,ok:s.k>=6});
binR().forEach((r,j)=>{g.fillStyle=j?'#f1f5f9':'#ecfdf5';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=j?RIM:OK;g.lineWidth=2.5;g.stroke();
g.fillStyle=INK;const lb=j?'No speech marks':'Needs speech marks';let fn=sz(13);g.font=F(fn);while(g.measureText(lb).width>r.w-10&&fn>10){fn--;g.font=F(fn)}g.textAlign='center';g.textBaseline='top';g.fillText(lb,r.x+r.w/2,r.y+8);g.font=F(sz(12),600);
g.fillText(j?'(reported)':'(exact words)',r.x+r.w/2,r.y+8+sz(17));const n=SORTS.slice(0,s.k).filter(x=>x[1]===j).length;g.font=F(sz(22),900);g.fillText(String(n),r.x+r.w/2,r.y+r.h*.55)});
if(s.k<6){const r=cardR(),d=Z.drag;box(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,SORTS[s.k][0],{n:sz(17),no:s.no,sel:!!d})}}
function sortIt(j){const s=Z.o;if(s.k>=6)return;const [,bin,why]=SORTS[s.k];
if(j!==bin){s.no=1;miss();return tell(bin?`Look again. ${why}`:`Look again. Exact words need speech marks. ${why}`)}
s.k++;s.no=0;pop();tell((bin?'Yes, reported. ':'Yes, exact words. ')+why+(s.k>=6?' All 6 sorted.':''))}
function draw(){const k=mode();if(k==='chal'){bg();pill('Challenge',A.W/2,A.H*.16,{ok:1});pill('“Exact words,” said Tom.',A.W/2,A.H*.5,{n:16});return}
({bub:drawBub,mark:drawMark,ins:drawIns,slip:drawSlip,sort:drawSort})[k]();A.fx.draw(A.ctx)}
function down(p){const k=mode();
if(k==='bub'&&Z.b.k<3){const it=bubR().find(r=>inR(p,r));if(it)tapBub(it.i);return false}
if(k==='mark'&&Z.m.k<3){const it=markR().find(r=>r.slot&&inR(p,{x:r.x-4,y:r.y,w:r.w+8,h:r.h}));if(it)tapGap(it.gp);return false}
if(k==='ins'&&Z.i.k<4){const r=optR().find(r=>inR(p,r));if(r)pickIns(r.o);return false}
if(k==='slip'&&Z.s.k<3){const it=slipR().find(r=>inR(p,r));if(it)tapSlip(it.i);return false}
if(k==='sort'&&Z.o.k<6){if(inR(p,cardR())){Z.drag={x:p.x,y:p.y,x0:p.x,y0:p.y};return true}const b=binR().findIndex(r=>inR(p,r));if(b>=0)sortIt(b)}return false}
function move(p){if(!Z.drag)return;Z.drag.x=p.x;Z.drag.y=p.y;A.redraw()}
function up(p){const d=Z.drag;if(!d)return;Z.drag=null;const b=binR().findIndex(r=>inR(p,r));if(b>=0)sortIt(b);else A.redraw()}
function fresh(){gen++;for(const k in Z)delete Z[k];Object.assign(Z,{b:{k:0,got:[]},m:{k:0},i:{k:0},s:{k:0},o:{k:0},drag:null,hook:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();Z.hook()}
const watch=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function open(i,desc,ok,msg){fresh();tell(desc);Z.hook=watch(i,ok,msg)}
function play(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
function controls(){if(!pad)return;pad.innerHTML='';const k=mode(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
if(k==='bub'&&Z.b.k<3){const b=BUB[Z.b.k];b.t.forEach((w,i)=>{if(!PN.test(w)&&!Z.b.got.includes(i))B(w,()=>tapBub(i))})}
if(k==='mark'&&Z.m.k<3){const m=MARK[Z.m.k];for(let gp=0;gp<=m.t.length;gp++)B(gapName(m,gp),()=>tapGap(gp),`Mark ${gapName(m,gp)}`)}
if(k==='ins'&&Z.i.k<4)OPTS.forEach(o=>B(`${o}  ${ONAME[o]}`,()=>pickIns(o)));
if(k==='slip'&&Z.s.k<3)SLIP[Z.s.k].t.forEach((w,i)=>B(w,()=>tapSlip(i),`Is ${ONAME[w]||w} wrong?`));
if(k==='sort'&&Z.o.k<6){B('Needs speech marks',()=>sortIt(0));B('No speech marks',()=>sortIt(1))}}
const steps=[
{h:'Words in the bubble',p:'A speech bubble holds the exact words someone says. Tap the words from the bubble in the sentence below.',
predict:{q:'Sam says “I am cold.” In: I am cold, said Sam. Which words go inside the speech marks?',opts:['I am cold, said Sam','I am cold'],ans:1},task:'Find the spoken words in all 3 lines',
show:()=>play(0,BUB.flatMap(b=>b.say.map(i=>()=>tapBub(i))),550),
go:()=>open(0,'Tom’s bubble says Let’s go! Below: Let’s go ! shouted Tom .',()=>Z.b.k>=3,'Only the bubble words go inside the marks. Said, shouted and the name stay outside.')},
{h:'Put the marks on',p:'Speech marks, also called inverted commas, open before the first spoken word and close after the last one. Tap the gaps.',
predict:{q:'Come here, called Dad. Where does the closing mark go?',opts:['Before the comma: here”,','After the comma: here,”'],ans:1},task:'Punctuate all 3 lines',
show:()=>play(1,MARK.flatMap(m=>[()=>tapGap(m.o),()=>tapGap(m.c)]),650),
go:()=>open(1,'Come here , called Dad . with a gap between each part.',()=>Z.m.k>=3,'The comma, ? or ! belongs to the speech, so it goes inside the closing mark.')},
{h:'Which mark goes inside?',p:'Something always goes inside the closing mark. If the sentence carries on, use a comma. If it ends, use a full stop. A question gets a question mark.',
task:'Choose the mark for all 4 lines',show:()=>play(2,INS.map(t=>()=>pickIns(t.ok)),700),
go:()=>open(2,'“Time for bed, box, ” said Mum. Buttons: comma, full stop, question mark.',()=>Z.i.k>=4,'Carries on: comma. Ends: full stop. A question: question mark.')},
{h:'Spot the slip',p:'Each line has one mistake. Tap the part that is wrong.',task:'Fix all 3 lines',show:()=>play(3,SLIP.map(L=>()=>tapSlip(L.bad)),700),
go:()=>open(3,'“Can we go?” Asked Lily. Each part in a box.',()=>Z.s.k>=3,'Speech starts with a capital. Said or asked after it takes a small letter, and a comma comes before said.')},
{h:'Exact words or not?',p:'Speech marks are only for exact words. Reported speech tells us what someone said, without their exact words. Drag each card to a box.',
predict:{q:'Tom said that he was cold. Does it need speech marks?',opts:['Yes, Tom is talking','No, these are not his exact words'],ans:1},task:'Sort all 6 cards',
show:()=>play(4,SORTS.map(x=>()=>sortIt(x[1])),600),
go:()=>open(4,'Card: I am cold, said Tom. Boxes: Needs speech marks, No speech marks.',()=>Z.o.k>=6,'Exact words need speech marks. Said that, asked if and told us to report speech.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.hook()});
const QS=[
{q:'Which line is punctuated correctly?',a:'“Come here,” called Dad.',o:[['“Come here”, called Dad.','outside'],['“Come here, called Dad.”','all']]},
{q:'Which line is right?',a:'“I am hungry,” said Raj.',o:[['“I am hungry.” said Raj.','stop'],['“I am hungry,” Said Raj.','cap']]},
{q:'Which one needs speech marks?',a:'Help me, cried Sam.',o:[['Sam cried that he needed help.','rep'],['Sam asked us for some help.','rep']]},
{q:'Which line is right?',a:'Mum said, “Time for bed.”',o:[['Mum said, “time for bed.”','low'],['Mum said “Time for bed.”','nocomma']]},
{q:'What do speech marks show?',a:'The exact words someone said',o:[['Who is speaking','who'],['That the words are loud','loud']]},
{q:'Which line is right?',a:'“Can I play?” asked Mia.',o:[['“Can I play?,” asked Mia.','both'],['“Can I play” asked Mia?','qend']]}];
function why(t){let m='Speech marks go round the exact spoken words.';
if(t==='outside')m='The comma belongs to the speech, so it goes inside: here,”';
if(t==='all')m='Called Dad is not spoken. Close the marks before it.';
if(t==='stop')m='Said Raj comes next, so the sentence goes on. Use a comma, not a full stop.';
if(t==='cap')m='The sentence carries on after the speech, so said takes a small letter.';
if(t==='rep')m='That one reports what was said. Only exact words get speech marks.';
if(t==='low')m='Spoken words start with a capital letter, even after Mum said: “Time…';
if(t==='nocomma')m='When the speaker comes first, put a comma after said.';
if(t==='who')m='The name shows who speaks. Speech marks show the exact words.';
if(t==='loud')m='Loud words get a ! mark. Speech marks show the spoken words.';
if(t==='both')m='A question mark does the comma’s job. Do not add a comma too.';
if(t==='qend')m='The question mark belongs to Mia’s words, so it goes inside the closing mark.';
return m}
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const row=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else miss();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;controls()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Speech punctuation buttons'},bx);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});controls()}}).start()})})();
