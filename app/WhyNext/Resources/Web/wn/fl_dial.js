/* Flagship – dialects and registers (ages 10–11): match regional dialect words to their meaning, sort dialect grammar
from Standard English (dialects have rules too), help Kirsty switch her English for three listeners, work out what an
author's dialogue tells you (where, when or who), then translate a Scots line and watch the voice drain away. */
(()=>{
// matching boards: left cards [big, small], right boxes, ans[left]=right index, context line used when a match is wrong
const WORDS={L:[['wee','Scots'],['bairn','Scots, N. England'],['nowt','Yorkshire'],['y’all','Southern US'],['arvo','Australia']],
R:['afternoon','small','you (all of you)','child','nothing'],ans:[1,3,4,2,0],
ctx:['“Pass me that wee cup.”','“The bairn is asleep in her cot.”','“There’s nowt in the fridge.”','“Are y’all coming to the game?”','“See you this arvo, after lunch.”']};
const KIRSTY={L:[['👵 Gran','at home in Glasgow'],['💻 Priya','London friend, video call'],['🏫 Mr Shah','new teacher, first day']],
R:['“Yes, Mr Shah. I am very tired today.”','“Aye, Gran, ah’m fair puggled the day.”','“Honestly, I’m totally wiped out today.”'],ans:[1,2,0],
ctx:['With Gran at home, Kirsty uses the Scots they share: aye, puggled, the day.','Priya may not know Scots words like puggled. Kirsty stays chatty but uses words they both know.','A new teacher on day one calls for a formal register: Yes, Mr Shah, and full words.']};
// decks: [line, right bin, why it goes there]
const GRAM={bins:['Standard English','Dialect grammar'],items:[['We was late for the bus.',1,'Many English dialects use “was” with every person: I was, you was, we was. It is a regular pattern, not random.'],
['We were late for the bus.',0,'“We were” is the Standard English form, the one expected in formal writing.'],
['I done my homework.',1,'“I done” is a past form used in many dialects in Britain and the USA. Standard English says “I did”.'],
['I did my homework.',0,'“I did” is the Standard English past form.'],
['She don’t like peas.',1,'Some dialects use “don’t” with she and he too. Standard English says “she doesn’t”.'],
['She doesn’t like peas.',0,'“She doesn’t” is the Standard English form.']]};
const WHY={bins:['📍 Where','🕰️ When','👤 Who'],items:[['“Eh, lass, tha mun come up on t’ moor,” said the farm lad.',0,'tha (you), mun (must) and t’ (the) are Yorkshire dialect. They place the story in the north of England.'],
['“Prithee, good sir, whither goest thou?” asked the maid.',1,'prithee, whither and thou are old forms of English. They set the story centuries ago, not in a place today.'],
['“One simply does not eat chips in the street, darling.”',2,'This is not about a place or a time. The posh, stiff words show what kind of person she is.']]};
// Scots line to translate: [word, Standard English or 0]
const LINE=[['Ah','I'],['cannae','can’t'],['find',0],['ma','my'],['wee','little'],['bairn’s','child’s'],['shoes.',0]];
VIS.reg('flagdial',c=>{let A,pad,quiz;
const S={got:{},pick:null,held:null,at:null,from:null,miss:null,k:0,put:[],swapped:{},tok:0,onChange:()=>{}};
const kind=()=>['words','gram','kirsty','why','swap','quiz'][A.step];
const board=()=>kind()==='words'?WORDS:KIRSTY,deck=()=>kind()==='gram'?GRAM:WHY;
const C=()=>A.col,fs=n=>Math.round(n*(A.narrow?1.12:1.35));
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function speak(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
function txt(g,t,x,y,n,col,al,w){g.font=`${w||700} ${fs(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||C().tx;g.fillText(t,x,y)}
function wrap(g,t,x,y,w,n,col,al){g.font=`700 ${fs(n)}px system-ui,sans-serif`;const rows=[];let cur='';
t.split(' ').forEach(s=>{const k=cur?cur+' '+s:s;if(g.measureText(k).width>w&&cur){rows.push(cur);cur=s}else cur=k});rows.push(cur);
const lh=fs(n)*1.3,y0=y-(rows.length-1)*lh/2;rows.forEach((r,i)=>txt(g,r,x,y0+i*lh,n,col,al));return rows.length}
function box(g,r,col,thick,fill){g.fillStyle=A.alpha(col,fill==null?.12:fill);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.strokeStyle=col;g.lineWidth=thick||2;g.stroke()}

// matching board geometry
const lr=i=>{const n=board().L.length,h=Math.min(A.H*.88/n-8,fs(70));return{x:A.W*.03,y:A.H*.05+i*(h+8),w:A.W*.4,h}};
const rr=j=>{const n=board().R.length,h=Math.min(A.H*.88/n-8,fs(70));return{x:A.W*.52,y:A.H*.05+j*(h+8),w:A.W*.45,h}};
const open=()=>board().L.map((x,i)=>i).filter(i=>S.got[i]==null);
function drawBoard(g){const B=board();
Object.keys(S.got).forEach(i=>{const a=lr(+i),b=rr(S.got[i]);g.strokeStyle=C().gr;g.lineWidth=3;g.beginPath();g.moveTo(a.x+a.w,a.y+a.h/2);g.lineTo(b.x,b.y+b.h/2);g.stroke()});
B.R.forEach((t,j)=>{const r=rr(j),used=Object.values(S.got).includes(j);box(g,r,used?C().gr:C().vi,S.miss===j?3.5:2,used?.2:.1);
if(S.miss===j){g.strokeStyle=C().rd;g.lineWidth=3.5;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke()}wrap(g,t,r.x+r.w/2,r.y+r.h/2,r.w-10,B===KIRSTY?9:12,C().tx)});
B.L.forEach(([big,small],i)=>{let r=lr(i);if(S.held===i&&S.at)r={...r,x:S.at.x-r.w/2,y:S.at.y-r.h/2};
box(g,r,S.got[i]!=null?C().gr:C().cy,S.pick===i?3.5:2,S.pick===i?.25:.12);txt(g,big,r.x+r.w/2,r.y+r.h*.36,13,C().tx);txt(g,small,r.x+r.w/2,r.y+r.h*.74,9,C().tx,'center',600)})}
// deck geometry
const cardR=()=>({x:A.W*.06,y:A.H*.05,w:A.W*.88,h:A.H*.3});
const binR=j=>{const n=deck().bins.length,gap=8,w=(A.W*.94-gap*(n-1))/n;return{x:A.W*.03+j*(w+gap),y:A.H*.5,w,h:A.H*.46}};
function drawDeck(g){const D=deck(),cur=D.items[S.k];
D.bins.forEach((t,j)=>{const r=binR(j);box(g,r,S.miss===j?C().rd:C().vi,S.miss===j?3.5:2,.08);txt(g,t,r.x+r.w/2,r.y+fs(13),11,C().tx);
S.put.filter(p=>D.items[p][1]===j).forEach((p,n)=>{const s=D.items[p][0];txt(g,'✓ '+(s.length>24?s.slice(0,22)+'…':s),r.x+6,r.y+fs(32)+n*fs(16),8,C().tx,'left',600)})});
if(cur){let r=cardR();if(S.held!=null&&S.at)r={...r,x:S.at.x-r.w/2,y:S.at.y-r.h/2};g.save();A.paint.shadow(10,3,.2);box(g,r,C().cy,2.5,.18);g.restore();
wrap(g,cur[0],r.x+r.w/2,r.y+r.h/2,r.w-20,13,C().tx);txt(g,`card ${S.k+1} of ${D.items.length} · drag me to a box`,A.W/2,A.H*.42,9,C().tx,'center',600)}
else txt(g,'All sorted ✓',A.W/2,A.H*.2,15,C().gr)}
// translate line
function toks(g){g.font=`800 ${fs(15)}px system-ui,sans-serif`;const out=[];let x=A.W*.05,y=A.H*.18;const sp=fs(10),h=fs(36);
LINE.forEach(([w,s],i)=>{const t=S.swapped[i]?s:w,tw=g.measureText(t).width+20;if(x+tw>A.W*.95){x=A.W*.05;y+=h+10}out.push({i,t,x,y,w:tw,h,dial:!!s});x+=tw+sp});return out}
function bar(g,y,label,v,col){const x=A.W*.05,w=A.W*.9;txt(g,label,x,y,10,C().tx,'left',800);g.strokeStyle=A.alpha(C().tx,.6);g.lineWidth=1.5;A.paint.rrect(x,y+fs(12),w,16,8);g.stroke();
g.fillStyle=col;A.paint.rrect(x+2,y+fs(12)+2,Math.max(6,(w-4)*v),12,6);g.fill();txt(g,Math.round(v*100)+'%',x+w,y,10,C().tx,'right',800)}
function drawSwap(g){const T=toks(g),n=LINE.filter(x=>x[1]).length,d=Object.keys(S.swapped).length;
txt(g,'🗣️ Kirsty, from Glasgow, says:',A.W*.05,A.H*.07,11,C().tx,'left',800);
T.forEach(o=>{const done=S.swapped[o.i];if(o.dial){box(g,o,done?C().gr:C().pk,done?2.5:2,done?.2:.12)}txt(g,o.t,o.x+o.w/2,o.y+o.h/2,15,C().tx,'center',800);
if(o.dial&&!done){g.setLineDash([4,4]);g.strokeStyle=C().tx;g.lineWidth=1.5;g.beginPath();g.moveTo(o.x+8,o.y+o.h-5);g.lineTo(o.x+o.w-8,o.y+o.h-5);g.stroke();g.setLineDash([])}});
bar(g,A.H*.56,'📖 Easy for any English reader',.4+.6*d/n,C().cy);bar(g,A.H*.76,'🎭 Sounds like Kirsty from Glasgow',1-.85*d/n,C().pk)}
function draw(A){const g=A.ctx;g.fillStyle=A.mix(C().pn,'#ede9fe',C().dark?.05:.3);g.fillRect(0,0,A.W,A.H);const k=kind();
if(k==='words'||k==='kirsty')drawBoard(g);if(k==='gram'||k==='why')drawDeck(g);if(k==='swap')drawSwap(g);
if(k==='quiz'){txt(g,'🗺️ 🕰️ 👤',A.W/2,A.H*.45,34,null,'center',400);txt(g,'Which English, and why?',A.W/2,A.H*.68,13,C().tx)}A.fx.draw(g)}

// actions
function match(i,j){if(i==null||S.got[i]!=null)return;const B=board();S.held=null;S.at=null;
if(B.ans[i]!==j){S.miss=j;S.pick=i;A.sound.miss();speak(B===WORDS?`“${B.L[i][0]}” does not mean “${B.R[j]}”. Use the sentence: ${B.ctx[i]}`:`Not that one. ${B.ctx[i]}`);
setTimeout(()=>{S.miss=null;A.redraw()},900);ctl();return}
S.got[i]=j;S.miss=null;S.pick=open()[0]??null;A.sound.pop();
note(B===WORDS?`${B.L[i][0]} (${B.L[i][1]}) means “${B.R[j]}”. ${B.ctx[i]}`:B.ctx[i])}
function sort(j){const D=deck(),cur=D.items[S.k];S.held=null;S.at=null;if(!cur)return;
if(cur[1]!==j){S.miss=j;A.sound.miss();speak(D===GRAM?(j===0?`Not quite. “${cur[0]}” is not the Standard form. ${cur[2]}`:`That one is Standard English already. ${cur[2]}`):`Look again. ${cur[2]}`);
setTimeout(()=>{S.miss=null;A.redraw()},900);ctl();return}
S.put.push(S.k);S.k++;S.miss=null;A.sound.pop();note(cur[2])}
function swapW(i){if(!LINE[i][1]||S.swapped[i])return;S.swapped[i]=1;A.sound.tick();note(`“${LINE[i][0]}” becomes “${LINE[i][1]}”.`)}
function note(msg){const k=kind();let t='';
if(k==='words'||k==='kirsty')t=open().length?`Still to match: ${open().map(i=>board().L[i][0]).join(', ')}.`:'All matched.';
else if(k==='gram'||k==='why'){const cur=deck().items[S.k];t=cur?`Next card: ${cur[0]}`:'All sorted.'}
else if(k==='swap'){const left=LINE.filter((x,i)=>x[1]&&!S.swapped[i]).map(x=>x[0]);t=left.length?`Dialect words left: ${left.join(', ')}.`:'Now it reads: '+LINE.map(x=>x[1]||x[0]).join(' ')}
speak((msg?msg+' ':'')+t);ctl();S.onChange()}
function ctl(){if(!A||!pad)return;pad.innerHTML='';const k=kind(),b=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f;return e};
if(k==='words'||k==='kirsty'){const B=board();if(S.pick==null)S.pick=open()[0]??null;if(S.pick!=null){open().forEach(i=>{if(i!==S.pick)b(B.L[i][0],()=>{S.pick=i;ctl()},`Choose ${B.L[i][0]}`)});
B.R.forEach((t,j)=>{if(!Object.values(S.got).includes(j))b('→ '+t,()=>match(S.pick,j),`Match ${B.L[S.pick][0]} to ${t}`)})}}
if(k==='gram'||k==='why'){const D=deck();if(D.items[S.k])D.bins.forEach((t,j)=>b('→ '+t,()=>sort(j),`Put the card in ${t}`))}
if(k==='swap')LINE.forEach((x,i)=>{if(x[1]&&!S.swapped[i])b(`${x[0]} → ${x[1]}`,()=>swapW(i),`Translate ${x[0]}`)});
A.redraw()}

// canvas input
function down(p){const k=kind();S.at=p;S.from=p;
if(k==='words'||k==='kirsty'){const i=open().find(i=>inR(p,lr(i)));if(i!=null){S.held=i;S.pick=i;A.redraw();return true}
const j=board().R.findIndex((t,j)=>inR(p,rr(j)));if(j>=0&&S.pick!=null)match(S.pick,j);return false}
if(k==='gram'||k==='why'){if(deck().items[S.k]&&inR(p,cardR())){S.held=S.k;A.redraw();return true}const j=deck().bins.findIndex((t,j)=>inR(p,binR(j)));if(j>=0)sort(j);return false}
if(k==='swap'){const o=toks(A.ctx).find(o=>inR(p,o));if(o)swapW(o.i);return false}return false}
function move(p){S.at=p;A.redraw()}
function up(p){const k=kind(),far=S.from&&Math.hypot(p.x-S.from.x,p.y-S.from.y)>12;
if((k==='words'||k==='kirsty')&&S.held!=null){const i=S.held,j=board().R.findIndex((t,j)=>inR(p,rr(j)));S.held=null;S.at=null;if(far&&j>=0)match(i,j);else{speak(`${board().L[i][0]}: now tap its partner on the right.`);A.redraw()}}
if((k==='gram'||k==='why')&&S.held!=null){const j=deck().bins.findIndex((t,j)=>inR(p,binR(j)));S.held=null;S.at=null;if(far&&j>=0)sort(j);else A.redraw()}}

// steps
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const auto=(fns,ms)=>{const k=S.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===S.tok)f()},A.reduced()?j*20+20:(j+1)*ms))};
const clean=()=>{S.tok++;S.onChange=()=>{};Object.assign(S,{got:{},pick:null,held:null,at:null,miss:null,k:0,put:[],swapped:{}})};
const solveBoard=B=>B.ans.map((j,i)=>()=>match(i,j)),solveDeck=D=>D.items.map(it=>()=>sort(it[1]));
const steps=[
{h:'One meaning, many Englishes',p:'A dialect is the English of a place or group, with its own words and grammar. Drag each dialect word to its meaning.',task:'Match 5 dialect words',
show:()=>{steps[0].go();auto(solveBoard(WORDS),420)},go:()=>{clean();note();S.onChange=finish(0,()=>!open().length,'Same English language, different local words.')}},
{h:'Dialects have rules',p:'Some dialects build sentences differently from Standard English. Sort each card. Read the reason each time.',
predict:{q:'Is “We was late” just bad English?',opts:['Yes, it is a mistake','No, it follows a dialect rule'],ans:1},task:'Sort 6 sentences',
show:()=>{steps[1].go();auto(solveDeck(GRAM),380)},go:()=>{clean();note();S.onChange=finish(1,()=>S.k>=GRAM.items.length,'Dialect grammar is regular. Standard English is the variety for formal writing.')}},
{h:'Switching for the listener',p:'Kirsty speaks Scots at home. Match each listener to what she would say to them.',task:'Match Kirsty’s 3 lines',
show:()=>{steps[2].go();auto(solveBoard(KIRSTY),450)},go:()=>{clean();note();S.onChange=finish(2,()=>!open().length,'One speaker, three varieties. She picks the one that fits the listener and the place.')}},
{h:'Why write it that way?',p:'Authors write speech in dialect on purpose. What does each line tell you: where, when, or who?',
predict:{q:'Why would an author write “tha mun come” in a story?',opts:['The author cannot spell','To show where the character is from'],ans:1},task:'Sort 3 story lines',
show:()=>{steps[3].go();auto(solveDeck(WHY),450)},go:()=>{clean();note();S.onChange=finish(3,()=>S.k>=WHY.items.length,'Dialect and old forms build setting and character.')}},
{h:'Translate it',p:'Tap each Scots word to swap it for Standard English. Watch both bars.',
predict:{q:'After you translate, will it still sound like Kirsty?',opts:['Yes, nothing is lost','No, some of her voice goes'],ans:1},task:'Translate all 5 Scots words',
show:()=>{steps[4].go();auto(LINE.map((x,i)=>x[1]?()=>swapW(i):null).filter(Boolean),380)},go:()=>{clean();note();S.onChange=finish(4,()=>LINE.every((x,i)=>!x[1]||S.swapped[i]),'Clear to everyone, but her voice and Glasgow are gone. That is why authors keep some dialect.')}},
{h:'Challenge',p:'',go:()=>{clean();askQ()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.onChange()});

// challenge
const QS=[['A farmer in a story says, “Ah’ve got nowt left.” What does “nowt” tell you?','🚜',[['It means nothing; he may be from northern England','ok'],['The author made a spelling mistake','bad'],['It is a made-up word nobody uses','fake']]],
['Some speakers say “I was, you was, we was.” Which is true?','📏',[['It follows its own regular rule','ok'],['It is random mistakes','bad'],['Nobody really talks like that','fake']]],
['Jo uses Scots with her gran but Standard English in a job interview. What is she doing?','🔀',[['Switching variety to fit the listener','ok'],['Speaking wrongly at home','bad'],['Using the same English everywhere','fit']]],
['Why might an author write “Whither goest thou?”','📜',[['To show the story is set long ago','ok'],['Because old words are more correct','one'],['To show the speaker is from Australia','place']]],
['You are writing a formal report. Which should you use?','📝',[['Standard English, because it suits formal writing','ok'],['Dialect, because any variety suits any setting','fit'],['Standard English, because dialect is wrong','bad']]],
['What happens if you turn Martha’s Yorkshire speech into Standard English?','🎭',[['The meaning stays, but her voice is lost','ok'],['Nothing changes at all','voice'],['Old words are always better, so it improves','one']]]];
function slip(t){let m='Think about place, time, listener and purpose.';
if(t==='bad')m='Dialect is not bad English. It has regular rules that a whole community shares.';
if(t==='fake')m='Dialect words are real. Millions of people use them every day in their region.';
if(t==='one')m='No variety is more correct in itself. Pick the one that fits the time, place and listener.';
if(t==='fit')m='Register matters: formal writing and talks expect Standard English, even if you speak a dialect at home.';
if(t==='place')m='Thou and whither are old English forms from centuries ago, not a place today.';
if(t==='voice')m='Dialect carries the character’s voice and home. Standard English keeps the meaning but loses that.';
return m}
let qn=-1,run=0;
function askQ(){qn++;const[q,e,ops]=QS[qn%QS.length],r=qn%3;
quiz.innerHTML=`<p><b>${e} ${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});speak('Challenge: '+q);A.redraw()}
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! In a row: '+run+'.':'✗ '+slip(t)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=askQ}

A=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;ctl()},
init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Actions'},w);quiz=E('div',{class:'fl-chal'},A.below);
clean();A.gest({down,move,up});ctl()}});
A.start()})})();
