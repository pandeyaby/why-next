/* Flagship – reading inflectional endings (ages 5–7; NC England Year 1 word reading: read words with -s, -es, -ing, -ed,
   -er and -est endings and multi-syllable words; Year 2 spelling: doubling and dropping e before -ing, -ed, -er, -est;
   Common Core RF.1.3f, RF.1.3g, RF.2.3d). Cover the ending to find the root, clap the beats an ending adds (-ed after t or
   d, -es), use a doubled letter to find a short-vowel root (hopping → hop, hoping → hope), tell a real ending from a
   word that only ends in those letters (king, sister, bed), and spot every word with an ending in a sentence. */
(()=>{
/* step 1: [word, where the ending starts] */
const CUT=[['jumping',4],['wanted',4],['faster',4],['boxes',3],['helps',4],['coldest',4]];
/* step 2: [word, beats, why] */
const BEAT=[['jumped',1,'jump does not end in t or d, so ed just adds a t sound: jumpt. One beat.'],
 ['wanted',2,'want ends in t, so ed adds a beat: want-ed. Two beats.'],['played',1,'ed after play adds a d sound, not a beat: playd. One beat.'],
 ['landed',2,'land ends in d, so ed adds a beat: land-ed. Two beats.'],['boxes',2,'box ends in x, so es adds a beat: box-es. Two beats.'],
 ['cats',1,'s adds a sound, not a beat: cats. One beat.'],['wishes',2,'wish ends in sh, so es adds a beat: wish-es. Two beats.']];
/* step 3: [word, root, look-alike root] */
const TWIN=[['hopping','hop','hope'],['hoping','hope','hop'],['tapping','tap','tape'],['taped','tape','tap'],['running','run','rune'],['riding','ride','rid'],['biggest','big','bige']];
/* step 4: [word, 0 = root + ending, 1 = only ends in those letters, root or note] */
const REAL=[['jumping',0,'jump'],['king',1,'k'],['taller',0,'tall'],['sister',1,'sist'],['looked',0,'look'],['bed',1,'b'],['cats',0,'cat'],['bus',1,'bu']];
const REALB=['Root + ending','Just ends that way'];
/* step 5: [sentence, words with an ending] */
const SENT=[['The dogs jumped over the logs.',['dogs','jumped','logs']],['My sister is taller than me.',['taller']],
 ['The king was singing the longest song.',['singing','longest']],['She unlocked the boxes.',['unlocked','boxes']]];
const TRAP={sister:'sister just ends in er. Cover er: sist is not a word.',king:'king just ends in ing. Cover ing: k is not a word.',song:'song has no ending. It is a root.',the:'the has no ending added.',was:'was is a root word with no ending.'};
VIS.reg('flagendread',c=>{let A,X,pad,box,qi=-1,run=0,held=null;const R={};
const INK='#172554',PAPER='#ffffff',LINE='#64748b',YES='#15803d',NO='#b91c1c',SEL='#1d4ed8',CHIP='#fef3c7',ENDBG='#ffedd5',ENDINK='#9a3412';
const pz=n=>Math.round(n*(A.narrow?1:1.1)),ft=(n,w)=>`${w||800} ${pz(n)}px system-ui,sans-serif`;
const SEQ=['cut','beat','twin','real','sent','quiz'],at=()=>SEQ[A.step],SETS={cut:CUT,beat:BEAT,twin:TWIN,real:REAL,sent:SENT},fin=k=>R[k].i>=SETS[k].length;
const within=(p,r,m=0)=>!!r&&p.x>=r.x-m&&p.x<=r.x+r.w+m&&p.y>=r.y-m&&p.y<=r.y+r.h+m;
function wash(){X.fillStyle=A.col.dark?'#0c0a09':'#fff7ed';X.fillRect(0,0,A.W,A.H)}
function say(t,x,y,n,w,col){X.fillStyle=col||INK;X.font=ft(n,w);X.textAlign='center';X.textBaseline='middle';X.fillText(t,x,y,A.W-14)}
function tile(r,t,o){o=o||{};X.fillStyle=o.bg||PAPER;A.paint.rrect(r.x,r.y,r.w,r.h,o.rr||10);X.fill();X.lineWidth=o.ring?4:2;X.strokeStyle=o.ring||LINE;X.stroke();if(t!=null)say(t,r.x+r.w/2,r.y+r.h/2+1,o.n||26,o.w,o.ink)}
function top(t,won){X.font=ft(15);const w=Math.min(A.W-10,X.measureText(t).width+30),h=pz(15)+16,y=A.H*.025;tile({x:A.W/2-w/2,y,w,h},null,{bg:won?'#dcfce7':PAPER,ring:won?YES:null,rr:h/2});say(t,A.W/2,y+h/2+1,15)}
function list(t,L){wash();top(t,1);L.forEach((s,m)=>say(s,A.W/2,A.H*(.2+m*.13),19,800,A.col.tx))}
/* ---- 1: tap where the ending starts ---- */
function letters(w){const n=w.length,g=6,s=Math.min(pz(54),(A.W-24-g*(n-1))/n),x0=A.W/2-(n*s+g*(n-1))/2;return w.split('').map((ch,j)=>({ch,j,x:x0+j*(s+g),y:A.H*.36,w:s,h:pz(64)}))}
function drawCut(){const s=R.cut;if(fin('cut'))return list('All 6 roots found',CUT.map(([w,k])=>`${w.slice(0,k)} + ${w.slice(k)}`));
 const [w,k]=CUT[s.i];wash();top(`Word ${s.i+1} of 6: where does the ending start?`);
 letters(w).forEach(r=>{const isEnd=s.show&&r.j>=k,bad=s.bad===r.j;tile(r,r.ch,{bg:isEnd?ENDBG:bad?'#fee2e2':PAPER,ink:isEnd?ENDINK:INK,ring:bad?NO:null,n:30})});
 if(s.msg)say(s.msg,A.W/2,A.H*.68,15,700,A.col.tx)}
function cut(j){const s=R.cut;if(fin('cut'))return;const [w,k]=CUT[s.i],root=w.slice(0,k),end=w.slice(k);let m;
 if(j===k){s.i++;s.bad=null;s.msg='';A.sound.pop();return tell(`${root} + ${end}. Read the root, then the ending: ${w}.`+(fin('cut')?' All 6 found.':''))}
 s.bad=j;A.sound.miss();if(j===0)m='Nothing is left for the root. The ending is at the back.';else if(j<k)m=`${w.slice(0,j)} is not the whole root. Keep going: the root is ${root}.`;
 else m=`${w.slice(j)} is only part of the ending. The ending is ${end}, so the root is ${root}.`;s.msg=m;tell(m)}
/* ---- 2: tap the drum once per beat ---- */
const drum=()=>{const r=Math.min(A.W*.16,A.H*.16);return{x:A.W/2-r,y:A.H*.42,w:r*2,h:r*2,r}};
const okBtn=()=>({x:A.W-pz(110),y:A.H*.84,w:pz(100),h:pz(44)}),clrBtn=()=>({x:pz(10),y:A.H*.84,w:pz(100),h:pz(44)});
function drawBeat(){const s=R.beat;if(fin('beat'))return list('All 7 words clapped',BEAT.map(([w,n])=>`${w}: ${'● '.repeat(n).trim()}`));
 const [w]=BEAT[s.i],d=drum();wash();top(`Word ${s.i+1} of 7: one tap for each beat`);say(w,A.W/2,A.H*.22,34,800,A.col.tx);
 X.fillStyle='#b45309';X.beginPath();X.ellipse(d.x+d.r,d.y+d.r,d.r,d.r*.75,0,0,7);X.fill();X.fillStyle='#fde68a';X.beginPath();X.ellipse(d.x+d.r,d.y+d.r*.6,d.r,d.r*.35,0,0,7);X.fill();X.strokeStyle='#78350f';X.lineWidth=2;X.stroke();
 say('drum',d.x+d.r,d.y+d.r*.6,15,800,'#78350f');for(let b=0;b<s.n;b++){X.fillStyle=A.col.dark?'#fdba74':ENDINK;X.beginPath();X.arc(A.W/2+(b-(s.n-1)/2)*pz(30),A.H*.34,pz(9),0,7);X.fill()}
 tile(clrBtn(),'Again',{n:16});tile(okBtn(),'Check',{bg:'#fef9c3',n:16});if(s.msg)say(s.msg,A.W/2,A.H*.76,13,700,A.col.tx)}
function hitDrum(){const s=R.beat;if(fin('beat'))return;s.n=Math.min(4,s.n+1);s.msg='';A.sound.tick();tell(`${s.n} beat${s.n>1?'s':''}`)}
function again(){R.beat.n=0;R.beat.msg='';tell('Beats cleared.')}
function clap(){const s=R.beat;if(fin('beat'))return;const [w,n,why]=BEAT[s.i];
 if(s.n===n){s.i++;s.n=0;s.msg='';A.sound.pop();return tell(`${w}: ${n} beat${n>1?'s':''}.`+(fin('beat')?' All 7 clapped.':''))}
 A.sound.miss();s.msg=s.n?why:'Tap the drum for each beat first.';s.n=0;tell(s.msg)}
/* ---- 3: double letter or dropped e ---- */
const twinSide=i=>i%2?[TWIN[i][2],TWIN[i][1]]:[TWIN[i][1],TWIN[i][2]];
function twinKeys(){const w=Math.min(pz(150),(A.W-36)/2);return[0,1].map(j=>({j,x:A.W/2+(j?8:-w-8),y:A.H*.55,w,h:pz(64)}))}
function drawTwin(){const s=R.twin;if(fin('twin'))return list('All 7 roots found',TWIN.map(([w,r])=>`${w} ← ${r}`));
 const [w]=TWIN[s.i];wash();top(`Word ${s.i+1} of 7: which root is it?`);tile({x:A.W/2-pz(100),y:A.H*.2,w:pz(200),h:pz(64)},w,{n:32});
 twinSide(s.i).forEach((v,j)=>tile(twinKeys()[j],v,{n:28,bg:s.bad===v?'#fee2e2':PAPER,ring:s.bad===v?NO:null}))}
function twin(v){const s=R.twin;if(fin('twin'))return;const [w,root]=TWIN[s.i];
 if(v!==root){s.bad=v;A.sound.miss();const dbl=/(.)\1(ing|ed|er|est)$/.test(w);
  return tell(dbl?`${w} has a double letter before the ending. That tells you the root has a short vowel and no e: ${root}.`:`${w} has one letter before the ending. The root had an e that dropped off: ${root}.`)}
 s.i++;s.bad=null;A.sound.pop();tell(`${w} comes from ${root}.`+(fin('twin')?' All 7 found.':''))}
/* ---- 4: real ending or not ---- */
function bins(){const g=10,w=(A.W-3*g)/2;return[0,1].map(j=>({j,x:g+j*(w+g),y:A.H*.45,w,h:A.H*.52}))}
const deck=()=>{const w=Math.min(A.W-80,pz(160));return{x:A.W/2-w/2,y:A.H*.17,w,h:pz(58)}};
function drawReal(){const s=R.real;wash();top(fin('real')?'All 8 sorted':`Word ${s.i+1} of 8: a real ending?`,fin('real'));
 bins().forEach(b=>{tile(b,null,{bg:b.j?'#e0e7ff':CHIP,ring:s.bad===b.j?NO:'#92400e'});X.fillStyle=INK;X.font=ft(15);X.textAlign='center';X.textBaseline='top';X.fillText(REALB[b.j],b.x+b.w/2,b.y+8,b.w-8);
  X.font=ft(17,700);REAL.slice(0,s.i).filter(x=>x[1]===b.j).forEach((x,m)=>X.fillText(x[0],b.x+b.w/2,b.y+pz(32)+m*pz(23),b.w-8))});
 if(!fin('real')){const r=deck();tile(held?{...r,x:held.x-r.w/2,y:held.y-r.h/2}:r,REAL[s.i][0],{ring:held?SEL:null,n:30})}}
function sortReal(j){const s=R.real;if(fin('real'))return;const [w,ok,rt]=REAL[s.i];
 if(j!==ok){s.bad=j;A.sound.miss();return tell(ok?`Cover the end of ${w}: ${rt} is not a word. ${w} is a root by itself.`:`Cover the ending of ${w}: ${rt} is left, a word you know. So it is ${rt} + ${w.slice(rt.length)}.`)}
 s.i++;s.bad=null;A.sound.pop();tell(`${w}: ${REALB[ok].toLowerCase()}.`+(fin('real')?' All 8 sorted.':''))}
/* ---- 5: tap every word with an ending in the sentence ---- */
function chips(){const words=SENT[R.sent.i][0].replace('.','').split(' '),g=8,h=pz(48);X.font=ft(20,700);let x=12,y=A.H*.3;const out=[];
 words.forEach((w,j)=>{const cw=X.measureText(w).width+pz(22);if(x+cw>A.W-12){x=12;y+=h+g}out.push({w,j,x,y,w2:cw,h});x+=cw+g});
 const rows={};out.forEach(o=>{(rows[o.y]=rows[o.y]||[]).push(o)});Object.values(rows).forEach(L=>{const last=L[L.length-1],sh=(A.W-(last.x+last.w2)-12)/2;L.forEach(o=>o.x+=sh)});
 return out.map(o=>({w:o.w,j:o.j,x:o.x,y:o.y,w:o.w2,h:o.h,word:o.w}))}
function drawSent(){const s=R.sent;if(fin('sent'))return list('All 4 sentences read',SENT.map(([,t])=>t.join(', ')));
 const want=SENT[s.i][1];wash();top(`Sentence ${s.i+1} of 4: found ${s.got.length} of ${want.length}`);
 chips().forEach(r=>{const got=s.got.includes(r.word),bad=s.bad===r.word;tile(r,r.word,{n:20,w:700,bg:got?ENDBG:bad?'#fee2e2':PAPER,ink:got?ENDINK:INK,ring:got?'#c2410c':bad?NO:null})});
 if(s.msg)say(s.msg,A.W/2,A.H*.8,14,700,A.col.tx)}
function spot(w){const s=R.sent;if(fin('sent'))return;const want=SENT[s.i][1];if(s.got.includes(w))return;
 if(!want.includes(w)){s.bad=w;A.sound.miss();s.msg=TRAP[w.toLowerCase()]||`${w} has no ending added. It is a root word.`;return tell(s.msg)}
 s.got.push(w);s.bad=null;s.msg='';A.sound.pop();if(s.got.length===want.length){s.i++;s.got=[];return tell(`Found them all: ${want.join(', ')}.`+(fin('sent')?' All 4 read.':''))}tell(`${w}: yes, it has an ending.`)}
/* ---- pointer ---- */
function down(p){const k=at();if(k==='quiz'||fin(k))return false;
 if(k==='cut'){const r=letters(CUT[R.cut.i][0]).find(r=>within(p,r));if(r)cut(r.j)}
 if(k==='beat'){if(within(p,drum()))hitDrum();else if(within(p,okBtn()))clap();else if(within(p,clrBtn()))again()}
 if(k==='twin'){const r=twinKeys().find(r=>within(p,r));if(r)twin(twinSide(R.twin.i)[r.j])}
 if(k==='real'){if(within(p,deck())){held={x:p.x,y:p.y};return true}const b=bins().find(r=>within(p,r));if(b)sortReal(b.j)}
 if(k==='sent'){const r=chips().find(r=>within(p,r));if(r)spot(r.word)}return false}
function move(p){if(held){held.x=p.x;held.y=p.y;A.redraw()}}
function up(p){if(!held)return;held=null;const b=bins().find(r=>within(p,r));if(b)sortReal(b.j);else A.redraw()}
function wipe(){run++;held=null;for(const k in R)delete R[k];SEQ.slice(0,5).forEach(k=>R[k]={i:0});R.beat.n=0;R.sent.got=[];R.hook=()=>{}}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();R.hook()}
function into(i,first,ready,msg){wipe();tell(first);R.hook=()=>{if(A.step===i&&ready()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=run;acts.forEach((f,j)=>setTimeout(()=>{if(me===run)f()},ms*(j+1)))}
function keys(){if(!pad)return;pad.innerHTML='';const k=at(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};if(k==='quiz'||fin(k))return;
 if(k==='cut'){const w=CUT[R.cut.i][0];for(let j=1;j<w.length;j++)b(`${w.slice(0,j)} | ${w.slice(j)}`,()=>cut(j),`Ending starts at letter ${j+1}: ${w.slice(0,j)} and ${w.slice(j)}`)}
 if(k==='beat'){b('Tap the drum',hitDrum,'Tap the drum for one beat');b('Again',again,'Clear the beats');b('Check',clap,'Check the beats')}
 if(k==='twin')twinSide(R.twin.i).forEach(v=>b(v,()=>twin(v),`${TWIN[R.twin.i][0]} comes from ${v}`));
 if(k==='real'){const w=REAL[R.real.i][0];REALB.forEach((h,j)=>b(h,()=>sortReal(j),`${w}: ${h}`))}
 if(k==='sent')chips().forEach(r=>{if(!R.sent.got.includes(r.word))b(r.word,()=>spot(r.word),`${r.word} has an ending`)})}
const steps=[
{h:'Cover the ending',p:'A long word is often a root with an ending on the back. Find where the ending starts. Read the root, then add the ending.',
predict:{q:'Cover ing in jumping. What is left?',opts:['jum','jump'],ans:1},task:'Find all 6 roots',
show:()=>demo(0,CUT.map(([,k])=>()=>cut(k)),550),go:()=>into(0,'jumping. Tap the first letter of the ending.',()=>fin('cut'),'Root first, then the ending.')},
{h:'Clap the beats',p:'Some endings add a beat. ed adds a beat after t or d: want-ed. es adds a beat: box-es. Tap the drum once for each beat, then Check.',
predict:{q:'How many beats in jumped?',opts:['Two: jump-ed','One: jumpt'],ans:1},task:'Clap all 7 words',
show:()=>demo(1,BEAT.flatMap(([,n])=>[...Array(n)].map(()=>hitDrum).concat([clap])),260),go:()=>into(1,'jumped. Tap the drum for each beat.',()=>fin('beat'),'ed adds a beat only after t or d.')},
{h:'Double letter clue',p:'Two letters the same before the ending? The root has a short vowel: hopping comes from hop. One letter? The root lost its e: hoping comes from hope.',
predict:{q:'Do hopping and hoping come from the same root?',opts:['Yes','No'],ans:1},task:'Find all 7 roots',
show:()=>demo(2,TWIN.map(([,r])=>()=>twin(r)),500),go:()=>into(2,'hopping. Tap its root.',()=>fin('twin'),'Double letter: short vowel. One letter: the e dropped.')},
{h:'Ending or not?',p:'Cover the end. If a word you know is left, it is a root with an ending. If not, the word just ends that way.',task:'Sort all 8 words',
show:()=>demo(3,REAL.map(x=>()=>sortReal(x[1])),420),go:()=>into(3,'jumping. Drag it to a box, or use the buttons.',()=>fin('real'),'Cover it and check a real root is left.')},
{h:'Read the sentence',p:'Tap every word that has an ending. Watch out for words like sister and king.',task:'Read all 4 sentences',
show:()=>demo(4,SENT.flatMap(([,t])=>t.map(w=>()=>spot(w))),420),go:()=>into(4,'The dogs jumped over the logs. Tap each word with an ending.',()=>fin('sent'),'Root plus ending, read in two chunks.')},
{h:'Challenge',p:'',go:()=>{wipe();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>R.hook()});
const QS=[
{q:'What is the root in planted?',a:'plant',o:[['plan','short'],['planted','whole']]},
{q:'How many beats in rested?',a:'2',o:[['1','tend'],['3','toomany']]},
{q:'skipping comes from…',a:'skip',o:[['skipe','dropE'],['skipp','dbl']]},
{q:'Which word has a real ending?',a:'helper',o:[['letter','fakeer'],['ring','fakeing']]},
{q:'Read it: coldest. Which chunks?',a:'cold + est',o:[['col + dest','syll'],['co + ldest','syll2']]},
{q:'hoped comes from…',a:'hope',o:[['hop','single'],['hoppe','dbl2']]}];
function why(t){let m='Cover the ending and read the root first.';
 switch(t){case 'short':m='plan is too short. Cover ed: plant is left.';break;
 case 'whole':m='planted is the whole word. Cover ed to find the root plant.';break;
 case 'tend':m='rest ends in t, so ed adds a beat: rest-ed.';break;
 case 'toomany':m='rested has two beats: rest-ed. Clap it.';break;
 case 'dropE':m='skipping has a double p, so the root has no e: skip.';break;
 case 'dbl':m='The second p was added before ing. The root is skip.';break;
 case 'fakeer':m='Cover er in letter: lett is not a word. letter just ends in er.';break;
 case 'fakeing':m='Cover ing in ring: r is not a word. ring is a root.';break;
 case 'syll':m='Split at the root, not the sound: cold, then est.';break;
 case 'syll2':m='co is not the root. Cover est: cold is left.';break;
 case 'single':m='hoped has one p, so the root lost an e: hope. hop would be hopped.';break;
 case 'dbl2':m='hoppe is not a word. One p before ed means the root is hope.';break}
 return m}
function next(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>verdict(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function verdict(t,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=next;c.say(ok?'Yes.':why(t))}
function draw(){const k=at();if(k==='quiz'){wash();top('Challenge',1);say('jump + ing · want-ed · hop / hope · king',A.W/2,A.H*.5,17,800,A.col.tx);return}
 ({cut:drawCut,beat:drawBeat,twin:drawTwin,real:drawReal,sent:drawSent})[k]();A.fx.draw(X)}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{box.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
 init:B=>{A=B;X=A.ctx;c.fig.classList.add('young');const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Ending buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});keys()}}).start()})})();
