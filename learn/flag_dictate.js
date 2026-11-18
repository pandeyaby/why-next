/* Flagship – spelling from dictation (ages 5–8; NC England Year 1 writing transcription: write from memory simple sentences
   dictated by the teacher that include words using the GPCs and common exception words taught so far; Year 2: the same with
   longer sentences and punctuation). Hold the sentence by counting its words, spell each word one sound at a time with the
   right grapheme (sh, ai, ck, igh, oa), learn the tricky words by heart (said, was, they), rebuild a sentence from memory,
   then check it for capital letters, full stops and tricky words. Works with sound off: a grown-up reads, or the clue does. */
(()=>{
/* step 1: [sentence, number of words, the little word children skip] */
const HOLD=[['I can see a cat.',5,'a'],['The dog is on the mat.',6,'is'],['We had fun at the park.',6,'at'],['My mum got a big red hat.',7,'a']];
/* step 2: [word, clue, [sound, right grapheme, wrong grapheme, why]...] */
const SOUNDS=[['ship','a big boat at sea',[['/sh/','sh','s','sh is one sound made by two letters. Both go in one box.'],['/i/','i','e','ship has the short i sound, like in it.'],['/p/','p','b','Say it slowly: the end sound is p, a puff of air.']]],
 ['rain','water falling from clouds',[['/r/','r','w','rain starts with r, like run.'],['/ai/','ai','ay','ay goes at the end of a word. In the middle, use ai.'],['/n/','n','m','The last sound is n, like nut.']]],
 ['duck','a bird that swims and quacks',[['/d/','d','b','d and b look alike. duck starts with d, like dog.'],['/u/','u','a','duck has the short u sound, like in up.'],['/k/','ck','k','Right after a short vowel like u, the k sound is spelt ck.']]],
 ['night','when it is dark and you sleep',[['/n/','n','m','night starts with n.'],['/igh/','igh','i','The long i sound here is three letters: igh.'],['/t/','t','d','The end sound is t, a short tap.']]],
 ['boat','it floats on water',[['/b/','b','d','boat starts with b, like bed.'],['/oa/','oa','o','The long o sound in the middle is spelt oa.'],['/t/','t','tt','One t is enough at the end of boat.']]]];
/* step 3: [tricky word, wrong spelling a child writes by sound] */
const TRICK=[['said','sed'],['was','woz'],['they','thay'],['the','thu'],['have','hav'],['come','cum'],['one','wun']];
/* step 4: [sentence to hold, extra word that is not in it] */
const REB=[['The cat sat on a hat.','mat'],['They said it was hot.','is'],['I have one red ball.','a']];
/* step 5: [words as written, index of each slip -> fix] */
const PROOF=[[['the','dog','ran','to','the','park.'],{0:['The','A sentence starts with a capital letter.']}],
 [['I','sed','we','can','go.'],{1:['said','said is a tricky word: s-ai-d, not sed.']}],
 [['My','cat','was','hot'],{3:['hot.','Every sentence ends with a full stop.']}],
 [['we','woz','in','the','sun.'],{0:['We','A sentence starts with a capital letter.'],1:['was','was is a tricky word: w-a-s, not woz.']}]];
VIS.reg('flagdictate',c=>{let A,X,pad,box,qi=-1,gen=0,drag=null;const S={};
const INK='#1c1917',CARD='#ffffff',EDGE='#57534e',GOOD='#166534',BAD='#991b1b',HOT='#1e40af',SOFT='#fef9c3',PINK='#fee2e2',LEAF='#dcfce7';
const sz=n=>Math.round(n*(A.narrow?1:1.12)),font=(n,w)=>`${w||800} ${sz(n)}px system-ui,sans-serif`;
const ORDER=['hold','snd','trick','reb','proof','chal'],cur=()=>ORDER[A.step],DATA={hold:HOLD,snd:SOUNDS,trick:TRICK,reb:REB,proof:PROOF},over=k=>S[k].i>=DATA[k].length;
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function ground(){X.fillStyle=A.col.dark?'#1c1917':'#fffbeb';X.fillRect(0,0,A.W,A.H)}
function txt(t,x,y,n,w,col){X.fillStyle=col||INK;X.font=font(n,w);X.textAlign='center';X.textBaseline='middle';X.fillText(t,x,y,A.W-16)}
function card(r,t,o){o=o||{};X.fillStyle=o.fill||CARD;A.paint.rrect(r.x,r.y,r.w,r.h,o.round||12);X.fill();X.lineWidth=o.edge?4:2;X.strokeStyle=o.edge||EDGE;X.stroke();if(t!=null)txt(t,r.x+r.w/2,r.y+r.h/2+1,o.n||26,o.w,o.ink)}
function banner(t,ok){X.font=font(15);const w=Math.min(A.W-12,X.measureText(t).width+32),h=sz(15)+16,y=A.H*.03;card({x:A.W/2-w/2,y,w,h},null,{fill:ok?LEAF:CARD,edge:ok?GOOD:null,round:h/2});txt(t,A.W/2,y+h/2+1,15)}
function recap(t,L){ground();banner(t,1);L.forEach((s,m)=>txt(s,A.W/2,A.H*(.21+m*.14),18,800,A.col.tx))}
function note(m,y){if(!m)return;X.font=font(14,700);const L=[];let ln='';m.split(' ').forEach(w=>{const t=ln?ln+' '+w:w;if(X.measureText(t).width>A.W-28&&ln){L.push(ln);ln=w}else ln=t});L.push(ln);L.forEach((t,j)=>txt(t,A.W/2,A.H*(y||.86)+(j-(L.length-1)/2)*sz(18),14,700,A.col.tx))}
/* ---- 1: count the words to hold the sentence ---- */
const nums=()=>{const g=10,w=Math.min(sz(70),(A.W-5*g)/4);return[4,5,6,7].map((v,j)=>({v,x:A.W/2-(4*w+3*g)/2+j*(w+g),y:A.H*.55,w,h:sz(70)}))};
function drawHold(){const s=S.hold;if(over('hold'))return recap('All 4 sentences counted',HOLD.map(([t,n])=>`${t}  (${n})`));
 const [t]=HOLD[s.i];ground();banner(`Sentence ${s.i+1} of 4: how many words?`);txt('Say it. Count a finger for each word.',A.W/2,A.H*.17,14,700,A.col.tx);
 card({x:16,y:A.H*.25,w:A.W-32,h:sz(64)},t,{fill:SOFT,n:24});nums().forEach(r=>card(r,String(r.v),{n:30,fill:s.miss===r.v?PINK:CARD,edge:s.miss===r.v?BAD:null}));note(s.m,.82)}
function count(v){const s=S.hold;if(over('hold'))return;const [t,n,small]=HOLD[s.i];
 if(v===n){s.i++;s.miss=null;s.m='';A.sound.pop();return speak(`${n} words. Now you can hold it in your head.`+(over('hold')?' All 4 counted.':''))}
 s.miss=v;A.sound.miss();s.m=v<n?`Count again. Did you count the little word ${small}?`:`That is too many. ${t} has fewer words.`;speak(s.m)}
/* ---- 2: one box per sound, pick the grapheme ---- */
function boxes(){const n=SOUNDS[S.snd.i][2].length,w=Math.min(sz(96),(A.W-40)/n);return[...Array(n)].map((_,j)=>({j,x:A.W/2-(n*w+(n-1)*8)/2+j*(w+8),y:A.H*.36,w,h:sz(70)}))}
function opts(){const s=S.snd,[, ,ph]=SOUNDS[s.i],p=ph[s.k],L=s.k%2?[p[2],p[1]]:[p[1],p[2]],w=Math.min(sz(130),(A.W-40)/2);return L.map((g,j)=>({g,x:A.W/2+(j?10:-w-10),y:A.H*.64,w,h:sz(68)}))}
function drawSnd(){const s=S.snd;if(over('snd'))return recap('All 5 words spelt',SOUNDS.map(([w,,ph])=>`${w}: ${ph.map(p=>p[1]).join(' | ')}`));
 const [,clue,ph]=SOUNDS[s.i];ground();banner(`Word ${s.i+1} of 5: ${clue}`);txt(`Sound ${s.k+1} of ${ph.length}: ${ph[s.k][0]}`,A.W/2,A.H*.25,17,800,A.col.tx);
 boxes().forEach((r,j)=>card(r,j<s.k?ph[j][1]:'',{n:30,fill:j<s.k?LEAF:CARD,edge:j===s.k?HOT:null}));
 opts().forEach(r=>card(r,r.g,{n:30,fill:s.miss===r.g?PINK:SOFT,edge:s.miss===r.g?BAD:null}));note(s.m,.9)}
function pickG(g){const s=S.snd;if(over('snd'))return;const [w,,ph]=SOUNDS[s.i],p=ph[s.k];
 if(g!==p[1]){s.miss=g;s.m=p[3];A.sound.miss();return speak(p[3])}
 s.miss=null;s.m='';s.k++;A.sound.pop();if(s.k<ph.length)return speak(`${p[1]}. Next sound.`);
 s.i++;s.k=0;speak(`${w}: ${ph.map(q=>q[1]).join(', ')}.`+(over('snd')?' All 5 spelt.':''))}
/* ---- 3: tricky words ---- */
const pair=()=>{const w=Math.min(sz(150),(A.W-40)/2);return[0,1].map(j=>({j,x:A.W/2+(j?10:-w-10),y:A.H*.45,w,h:sz(76)}))};
const sides=i=>i%2?[TRICK[i][1],TRICK[i][0]]:[TRICK[i][0],TRICK[i][1]];
function drawTrick(){const s=S.trick;if(over('trick'))return recap('All 7 tricky words',[TRICK.slice(0,4).map(x=>x[0]).join('  '),TRICK.slice(4).map(x=>x[0]).join('  ')]);
 ground();banner(`Tricky word ${s.i+1} of 7: which one is right?`);txt('Sounding out will not work here. Remember it.',A.W/2,A.H*.24,14,700,A.col.tx);
 sides(s.i).forEach((v,j)=>card(pair()[j],v,{n:32,fill:s.miss===v?PINK:CARD,edge:s.miss===v?BAD:null}));note(s.m,.8)}
function trick(v){const s=S.trick;if(over('trick'))return;const [ok,bad]=TRICK[s.i];
 if(v!==ok){s.miss=v;A.sound.miss();s.m=`${bad} is how it sounds, but the real spelling is ${ok}. Look, cover, write, check.`;return speak(s.m)}
 s.i++;s.miss=null;s.m='';A.sound.pop();speak(`Yes: ${ok}.`+(over('trick')?' All 7 learnt.':''))}
/* ---- 4: rebuild the sentence from memory ---- */
function tiles(){const s=S.reb,[t,extra]=REB[s.i],ws=t.replace('.','').split(' ').concat(extra),sh=ws.map((w,j)=>[w,(j*5+s.i*3)%ws.length]).sort((a,b)=>a[1]-b[1]).map(x=>x[0]);
 X.font=font(20,700);let x=12,y=A.H*.5;const out=[];sh.forEach((w,j)=>{if(s.got.includes(j))return;const cw=X.measureText(w).width+sz(28);if(x+cw>A.W-12){x=12;y+=sz(56)}out.push({w,j,x,y,cw,h:sz(48)});x+=cw+8});
 return out.map(o=>({word:o.w,j:o.j,x:o.x,y:o.y,w:o.cw,h:o.h}))}
const shelf=()=>({x:12,y:A.H*.2,w:A.W-24,h:sz(70)});
function drawReb(){const s=S.reb;if(over('reb'))return recap('All 3 sentences written',REB.map(x=>x[0]));
 const [t]=REB[s.i],want=t.replace('.','').split(' ');ground();
 if(!s.hid){banner(`Sentence ${s.i+1} of 3: read it, then hide it`);card({x:16,y:A.H*.3,w:A.W-32,h:sz(70)},t,{fill:SOFT,n:24});card({x:A.W/2-sz(80),y:A.H*.62,w:sz(160),h:sz(60)},'Hide it',{n:22,edge:HOT});return}
 banner(`From memory: word ${s.got.length+1} of ${want.length}`);card(shelf(),s.got.length?want.slice(0,s.got.length).join(' ')+(s.got.length===want.length?'.':''):'drag words here',{n:20,fill:CARD,ink:s.got.length?INK:'#57534e'});
 tiles().forEach(r=>{const d=drag&&drag.j===r.j;card(d?{...r,x:drag.x-r.w/2,y:drag.y-r.h/2}:r,r.word,{n:20,w:700,fill:s.miss===r.word?PINK:CARD,edge:d?HOT:s.miss===r.word?BAD:null})});note(s.m,.94)}
function place(word,j){const s=S.reb;if(over('reb')||!s.hid)return;const [t,extra]=REB[s.i],want=t.replace('.','').split(' '),need=want[s.got.length];
 if(word!==need){s.miss=word;A.sound.miss();s.m=word===extra?`${word} is not in the sentence. Say it again in your head.`:`Not yet. Say the sentence again: the next word is not ${word}.`;return speak(s.m)}
 const t2=tiles().find(r=>r.word===word&&(j==null||r.j===j));s.got.push(t2?t2.j:j);s.miss=null;s.m='';A.sound.pop();
 if(s.got.length===want.length){s.i++;s.got=[];s.hid=false;return speak(`${t} Written from memory.`+(over('reb')?' All 3 done.':''))}speak(`${word}. Next word.`)}
function hide(){if(over('reb'))return;S.reb.hid=true;speak('Hidden. Say it in your head, then build it.')}
/* ---- 5: check it ---- */
function chips(){const s=S.proof,ws=PROOF[s.i][0];X.font=font(22,700);let x=12,y=A.H*.36;const out=[];
 ws.forEach((w0,j)=>{const w=s.fixed[j]||w0,cw=Math.max(sz(56),X.measureText(w).width+sz(30));if(x+cw>A.W-12){x=12;y+=sz(62)}out.push({w,j,x,y,cw,h:sz(54)});x+=cw+10});
 return out.map(o=>({word:o.w,j:o.j,x:o.x,y:o.y,w:o.cw,h:o.h}))}
function drawProof(){const s=S.proof;if(over('proof'))return recap('All 4 checked',PROOF.map(([ws,f])=>ws.map((w,j)=>f[j]?f[j][0]:w).join(' ')));
 const left=Object.keys(PROOF[s.i][1]).length-Object.keys(s.fixed).length;ground();banner(`Check ${s.i+1} of 4: ${left} slip${left===1?'':'s'} to fix`);
 txt('Tap the word with a slip.',A.W/2,A.H*.24,15,700,A.col.tx);
 chips().forEach(r=>card(r,r.word,{n:22,w:700,fill:s.fixed[r.j]?LEAF:s.miss===r.j?PINK:CARD,edge:s.fixed[r.j]?GOOD:s.miss===r.j?BAD:null}));note(s.m,.84)}
function fix(j){const s=S.proof;if(over('proof'))return;const [ws,slips]=PROOF[s.i];if(s.fixed[j])return;
 if(!slips[j]){s.miss=j;A.sound.miss();s.m=`${ws[j]} is right. Look for a capital, a full stop or a tricky word.`;return speak(s.m)}
 s.fixed[j]=slips[j][0];s.miss=null;s.m=slips[j][1];A.sound.pop();
 if(Object.keys(s.fixed).length===Object.keys(slips).length){s.i++;s.fixed={};s.m='';return speak(`${slips[j][1]} Fixed.`+(over('proof')?' All 4 checked.':''))}speak(s.m)}
/* ---- pointer ---- */
function down(p){const k=cur();if(k==='chal'||over(k))return false;
 if(k==='hold'){const r=nums().find(r=>hit(p,r));if(r)count(r.v)}
 if(k==='snd'){const r=opts().find(r=>hit(p,r));if(r)pickG(r.g)}
 if(k==='trick'){const r=pair().find(r=>hit(p,r));if(r)trick(sides(S.trick.i)[r.j])}
 if(k==='reb'){if(!S.reb.hid){if(p.y>A.H*.55)hide();return false}const r=tiles().find(r=>hit(p,r));if(r){drag={j:r.j,word:r.word,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}}
 if(k==='proof'){const r=chips().find(r=>hit(p,r));if(r)fix(r.j)}return false}
function move(p){if(drag){drag.x=p.x;drag.y=p.y;A.redraw()}}
function up(p){if(!drag)return;const d=drag;drag=null;if(hit(p,shelf())||Math.hypot(p.x-d.x0,p.y-d.y0)<8)place(d.word,d.j);else A.redraw()}
function reset(){gen++;drag=null;for(const k in S)delete S[k];ORDER.slice(0,5).forEach(k=>S[k]={i:0});S.snd.k=0;S.reb.got=[];S.proof.fixed={};S.cb=()=>{}}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.cb()}
function enter(i,first,ready,msg){reset();speak(first);S.cb=()=>{if(A.step===i&&ready()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function buttons(){if(!pad)return;pad.innerHTML='';const k=cur(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};if(k==='chal'||over(k))return;
 if(k==='hold')[4,5,6,7].forEach(v=>b(String(v),()=>count(v),`${v} words`));
 if(k==='snd')opts().forEach(r=>b(r.g,()=>pickG(r.g),`Spell the sound with ${r.g}`));
 if(k==='trick')sides(S.trick.i).forEach(v=>b(v,()=>trick(v),`The spelling is ${v}`));
 if(k==='reb'){if(!S.reb.hid)b('Hide it',hide,'Hide the sentence');else tiles().forEach(r=>b(r.word,()=>place(r.word,r.j),`Next word: ${r.word}`))}
 if(k==='proof')chips().forEach(r=>{if(!S.proof.fixed[r.j])b(r.word,()=>fix(r.j),`${r.word} has a slip`)})}
const steps=[
{h:'Count the words',p:'Before you write, say the sentence and count its words on your fingers. Then you can hold it in your head.',
predict:{q:'How many words in: I can see a cat.',opts:['4','5'],ans:1},task:'Count all 4 sentences',
show:()=>play(0,HOLD.map(x=>()=>count(x[1])),500),go:()=>enter(0,'I can see a cat. Tap how many words.',()=>over('hold'),'Count every word, even little ones like a.')},
{h:'One sound at a time',p:'Say the word slowly. Each sound goes in one box. Some sounds need two or three letters: sh, ai, ck, igh, oa.',
predict:{q:'ship has 4 letters. How many sounds?',opts:['4: s-h-i-p','3: sh-i-p'],ans:1},task:'Spell all 5 words',
show:()=>play(1,SOUNDS.flatMap(([,,ph])=>ph.map(p=>()=>pickG(p[1]))),300),go:()=>enter(1,'A big boat at sea. Pick the letters for the first sound.',()=>over('snd'),'One box for each sound.')},
{h:'Tricky words',p:'Some words do not follow the sound rules: said, was, they. You learn them by heart: look, cover, write, check.',
predict:{q:'Can you spell said by its sounds: s-e-d?',opts:['Yes','No, it is tricky'],ans:1},task:'Pick all 7 tricky words',
show:()=>play(2,TRICK.map(x=>()=>trick(x[0])),450),go:()=>enter(2,'Which is the right spelling?',()=>over('trick'),'Tricky words are learnt by heart.')},
{h:'Write it from memory',p:'Read the sentence, hide it, then build it again. Say it in your head before each word.',task:'Write all 3 sentences',
show:()=>play(3,REB.flatMap(([t])=>[hide,...t.replace('.','').split(' ').map(w=>()=>place(w))]),280),go:()=>enter(3,'Read the sentence. Then tap Hide it.',()=>over('reb'),'Say it, then write it.')},
{h:'Check it',p:'Read back what you wrote. Look for a capital letter at the start, a full stop at the end, and tricky words.',task:'Check all 4 sentences',
show:()=>play(4,PROOF.flatMap(([,f])=>Object.keys(f).map(j=>()=>fix(+j))),500),go:()=>enter(4,'the dog ran to the park. Tap the slip.',()=>over('proof'),'Capital, full stop, tricky words.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.cb()});
const QS=[
{q:'How many sounds in chip?',a:'3',o:[['4','letters'],['2','merge']]},
{q:'Which is right?',a:'they',o:[['thay','soundit'],['thai','soundit2']]},
{q:'Spell the sound /ai/ in the middle of tail.',a:'ai',o:[['ay','ayend'],['a','single']]},
{q:'How many words in: We ran to the bus.',a:'5',o:[['4','skip'],['6','extra']]},
{q:'Which sentence is right?',a:'I can run.',o:[['i can run.','lowi'],['I can run','nostop']]},
{q:'Spell the end sound of sock.',a:'ck',o:[['k','kafter'],['c','conly']]}];
function why(t){let m='Say it slowly and check each part.';
 switch(t){case 'letters':m='ch is one sound made by two letters: ch-i-p is 3 sounds.';break;
 case 'merge':m='Say it slowly: ch, i, p. That is 3 sounds.';break;
 case 'soundit':m='thay is how it sounds. they is a tricky word: t-h-e-y.';break;
 case 'soundit2':m='they ends in ey. It is a tricky word to learn by heart.';break;
 case 'ayend':m='ay goes at the end of a word, like play. In the middle, use ai.';break;
 case 'single':m='a alone makes a short sound, like in tap. tail needs ai.';break;
 case 'skip':m='Count again: we, ran, to, the, bus is 5 words.';break;
 case 'extra':m='Count each word once: we, ran, to, the, bus is 5.';break;
 case 'lowi':m='I on its own is always a capital letter.';break;
 case 'nostop':m='A sentence needs a full stop at the end.';break;
 case 'kafter':m='After a short vowel like o, the k sound is spelt ck: sock.';break;
 case 'conly':m='soc is missing a letter. After a short vowel, use ck.';break}
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
function draw(){const k=cur();if(k==='chal'){ground();banner('Challenge',1);txt('count · sound boxes · said · check',A.W/2,A.H*.5,17,800,A.col.tx);return}
 ({hold:drawHold,snd:drawSnd,trick:drawTrick,reb:drawReb,proof:drawProof})[k]();A.fx.draw(X)}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{box.hidden=B.step!==5;pad.hidden=B.step===5;buttons()},
 init:B=>{A=B;X=A.ctx;c.fig.classList.add('young');const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Spelling buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
