/* Flagship – r-controlled vowels (ages 5–6; NC England Y1 spelling, English Appendix 1 graphemes ar (car), or (for), ore
   (more), ur (burn), er (her), ir (girl); Common Core RF.1.3 / RF.2.3 vowel teams and r-controlled syllables). Slide an r
   in after the vowel and watch a short-vowel word become a new word (cat → cart, bun → burn), hear that ir, ur and er make
   one sound, tap the letters that make the sound, choose between same-sound spellings, and decide when a word needs r. */
(()=>{
/* plain word, index where r goes (after the vowel), new word, what it means */
const SLIDE=[['cat',2,'cart','a cart has wheels'],['bun',2,'burn','a fire can burn'],['bid',2,'bird','a bird can fly'],['shot',3,'short','not long']];
/* word, sound box: 0 = ar as in car, 1 = or as in fork, 2 = er as in her (ir, ur, er) */
const SOUNDS=[['farm',0],['corn',1],['bird',2],['star',0],['turn',2],['horse',1],['her',2],['more',1],['shirt',2]];
const SBOX=['ar (car)','or (fork)','er (her)'];
/* word, first index of the sound letters, how many letters */
const SPOT=[['farm',1,2],['storm',2,2],['shirt',2,2],['turn',1,2],['her',1,2],['more',1,3]];
/* word with ** for the gap, right letters, other letters */
const PICK=[['g**l','ir','ur','girl'],['n**se','ur','ir','nurse'],['f**k','or','ar','fork'],['st**','ar','or','star']];
/* sentence, right word, the other word */
const NEED=[['The horse pulls a','cart','cat'],['I fell. It will','hurt','hut'],['A little','bird','bid'],['My dad is tall. I am','short','shot'],['The pet that says meow is a','cat','cart']];
VIS.reg('flagrvowel',c=>{let A,pad,qbox,qi=-1,ver=0;c.fig.classList.add('young');
const M={};
const INK='#1e293b',YES='#047857',NO='#b91c1c',GREY='#64748b',HOLDC='#1d4ed8',RINK='#9a3412',RBG='#ffedd5',WHITE='#ffffff',HI='#fef3c7',HIE='#b45309';
const sz=v=>Math.round(v*(A.narrow?1:1.15)),face=(v,w)=>`${w||800} ${sz(v)}px system-ui,sans-serif`;
const part=()=>['slide','sound','spot','pick','need','quiz'][A.step],on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function paper(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fffbeb',A.col.dark?.05:.55);g.fillRect(0,0,A.W,A.H)}
function banner(t,y,ok){const g=A.ctx;let n=15;g.font=face(n);while(g.measureText(t).width+30>A.W-8&&n>10){n--;g.font=face(n)}
 const w=g.measureText(t).width+26,h=sz(n)+16;g.fillStyle=WHITE;A.paint.rrect(A.W/2-w/2,y-h/2,w,h,h/2);g.fill();g.lineWidth=ok?3:1.5;g.strokeStyle=ok?YES:GREY;g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function tile(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||WHITE;A.paint.rrect(r.x,r.y,r.w,r.h,o.rr||10);g.fill();g.lineWidth=o.edge?4:2;g.strokeStyle=o.edge||GREY;if(o.dash)g.setLineDash([6,5]);g.stroke();g.setLineDash([]);
 if(t==null)return;g.fillStyle=o.ink||INK;g.font=face(o.n||26);g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-6)}
function line(t,y,n){const g=A.ctx;g.fillStyle=A.col.tx;g.font=face(n||15,700);g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y,A.W-12)}
/* ---- step 1: slide r in after the vowel ---- */
function letters(word,y){const n=word.length,gap=sz(26),w=Math.min(sz(54),(A.W-30-gap*(n+1))/n),tot=n*w+(n+1)*gap,x0=A.W/2-tot/2;
 return{cells:[...word].map((ch,i)=>({x:x0+gap+i*(w+gap),y,w,h:sz(60),ch})),slots:[...Array(n+1)].map((_,k)=>({x:x0+k*(w+gap)-2,y:y+sz(8),w:gap+4,h:sz(44),k}))}}
const rHome=()=>({x:A.W/2-sz(30),y:A.H*.68,w:sz(60),h:sz(56)});
function drawSlide(){const s=M.a;paper();if(s.n>=SLIDE.length){banner('All 4 new words made',A.H*.08,1);SLIDE.forEach((q,i)=>banner(`${q[0]} + r = ${q[2]}: ${q[3]}`,A.H*(.24+i*.16),1));return}
 const q=SLIDE[s.n],L=letters(q[0],A.H*.34);banner(`Word ${s.n+1} of 4: put r in ${q[0]} to make a new word`,A.H*.08);
 L.slots.forEach(z=>{if(z.k===0)return;tile(z,null,{dash:1,bg:A.col.dark?'#334155':'#f8fafc',edge:s.miss===z.k?NO:null,rr:6})});
 L.cells.forEach(t=>tile(t,t.ch));if(s.last)line(s.last,A.H*.22,16);
 const d=M.drag,h=rHome();tile(d?{...h,x:d.x-h.w/2,y:d.y-h.h/2}:h,'r',{bg:RBG,ink:RINK,edge:d?HOLDC:RINK,n:28})}
function slide(k){const s=M.a;if(s.n>=SLIDE.length)return;const [w,at,nw]=SLIDE[s.n];
 if(k!==at){s.miss=k;A.sound.miss();const made=w.slice(0,k)+'r'+w.slice(k),v=w[at-1];
  return say(`${made} is not a word. The r goes right after the vowel ${v}, and then ${v} and r make one sound: ${nw}.`)}
 s.n++;s.miss=null;A.sound.pop();s.last=`${w} → ${nw}`;say(`${w} + r = ${nw}. ${SLIDE[s.n-1][3]}. The ${nw.slice(at-1,at+1)} is one sound.`+(s.n>=SLIDE.length?' All 4 made.':''))}
/* ---- step 2: sound boxes ---- */
const boxes=()=>{const w=(A.W-40)/3;return SBOX.map((t,j)=>({x:10+j*(w+10),y:A.H*.42,w,h:A.H*.54,j}))};
const card=()=>{const w=Math.min(A.W-80,sz(170));return{x:A.W/2-w/2,y:A.H*.17,w,h:sz(56)}};
function drawSound(){const s=M.b,g=A.ctx;paper();banner(s.n>=SOUNDS.length?'All 9 sorted':`Word ${s.n+1} of 9: which sound does it have?`,A.H*.07,s.n>=SOUNDS.length);
 boxes().forEach(b=>{g.fillStyle=A.col.dark?'#e0f2fe':'#f0f9ff';A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=s.miss===b.j?NO:'#0369a1';g.lineWidth=s.miss===b.j?4:2.5;g.stroke();
  g.fillStyle=INK;g.textAlign='center';g.textBaseline='top';g.font=face(14);g.fillText(SBOX[b.j],b.x+b.w/2,b.y+8,b.w-6);g.font=face(16,700);
  SOUNDS.slice(0,s.n).filter(x=>x[1]===b.j).forEach((x,i)=>g.fillText(x[0],b.x+b.w/2,b.y+sz(34)+i*sz(24),b.w-6))});
 if(s.n<SOUNDS.length){const d=M.drag,r=card();tile(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,SOUNDS[s.n][0],{edge:d?HOLDC:null,n:28,rr:14})}}
function drop(j){const s=M.b;if(s.n>=SOUNDS.length)return;const [w,k]=SOUNDS[s.n];
 if(j!==k){s.miss=j;A.sound.miss();const tip=k===2?`${w} has ${w.match(/[iue]r/)[0]}. ir, ur and er all make the same sound, like in her.`:k===1?`${w} has ${w.includes('ore')?'ore':'or'}, the sound in fork.`:`${w} has ar, the sound in car.`;return say(tip)}
 s.n++;s.miss=null;A.sound.pop();say(`${w}: ${SBOX[k]}.`+(s.n>=SOUNDS.length?' All 9 sorted.':''))}
/* ---- step 3: tap the letters that make the sound ---- */
function drawSpot(){const s=M.c;paper();if(s.n>=SPOT.length){banner('All 6 found',A.H*.08,1);SPOT.forEach((q,i)=>banner(`${q[0]}: ${q[0].substr(q[1],q[2])}`,A.H*(.22+i*.12),1));return}
 const q=SPOT[s.n];banner(`Word ${s.n+1} of 6: tap the letters that make one sound`,A.H*.08);line('Look for a vowel with r after it.',A.H*.24);
 letters(q[0],A.H*.4).cells.forEach((t,i)=>tile(t,t.ch,{bg:s.miss===i?'#fee2e2':WHITE,edge:s.miss===i?NO:null}))}
function spot(i){const s=M.c;if(s.n>=SPOT.length)return;const [w,a,len]=SPOT[s.n],g=w.substr(a,len);
 if(i<a||i>=a+len){s.miss=i;A.sound.miss();return say(`${w[i]} makes its own sound. Look for the vowel and the r together: ${g}.`)}
 s.n++;s.miss=null;A.sound.pop();say(`${w}: ${g} makes one sound.`+(s.n>=SPOT.length?' All 6 found.':''))}
/* ---- step 4: which spelling? ---- */
const keyPair=()=>{const w=Math.min(sz(120),(A.W-40)/2),h=sz(58);return[0,1].map(j=>({x:A.W/2+(j?10:-w-10),y:A.H*.66,w,h,j}))};
const pOrder=n=>n%2?[PICK[n][2],PICK[n][1]]:[PICK[n][1],PICK[n][2]];
function drawPick(){const s=M.d;paper();if(s.n>=PICK.length){banner('All 4 spelled',A.H*.08,1);PICK.forEach((q,i)=>banner(`${q[3]}: ${q[1]}`,A.H*(.26+i*.16),1));return}
 const q=PICK[s.n];banner(`Word ${s.n+1} of 4: which letters fill the gap?`,A.H*.08);const L=letters(q[0].replace('**','#'),A.H*.32);
 L.cells.forEach(t=>t.ch==='#'?tile(t,'__',{dash:1}):tile(t,t.ch));const d=M.drag;
 pOrder(s.n).forEach((v,j)=>{const b=keyPair()[j];tile(d&&d.j===j?{...b,x:d.x-b.w/2,y:d.y-b.h/2}:b,v,{bg:RBG,ink:RINK,edge:d&&d.j===j?HOLDC:s.miss===v?NO:RINK,n:26})})}
function choose(v){const s=M.d;if(s.n>=PICK.length)return;const [pat,ok,,word]=PICK[s.n];
 if(v!==ok){s.miss=v;A.sound.miss();const same=(ok==='ir'||ok==='ur');return say(same?`${v} makes the same sound, but this word is spelt with ${ok}: ${word}. Learn how it looks.`:`${pat.replace('**',v)} says a different sound. ${word} needs ${ok}.`)}
 s.n++;s.miss=null;A.sound.pop();say(`${word}: ${ok}.`+(s.n>=PICK.length?' All 4 spelled.':''))}
/* ---- step 5: with r or without? ---- */
const nOrder=n=>n%2?[NEED[n][2],NEED[n][1]]:[NEED[n][1],NEED[n][2]];
function drawNeed(){const s=M.e,g=A.ctx;paper();if(s.n>=NEED.length){banner('All 5 sentences done',A.H*.07,1);NEED.forEach((q,i)=>banner(`${q[0]} ${q[1]}.`,A.H*(.22+i*.15),1));return}
 banner(`Sentence ${s.n+1} of 5`,A.H*.08);g.font=face(19,700);g.fillStyle=A.col.tx;g.textAlign='center';g.textBaseline='middle';
 const ws=(NEED[s.n][0]+' ___').split(' '),rows=[''];ws.forEach(w=>{const t=rows[rows.length-1]?rows[rows.length-1]+' '+w:w;if(g.measureText(t).width>A.W-30)rows.push(w);else rows[rows.length-1]=t});rows.forEach((l,k)=>g.fillText(l,A.W/2,A.H*.3+k*sz(28)));
 nOrder(s.n).forEach((v,j)=>tile(keyPair()[j],v,{bg:v.includes('r')?RBG:WHITE,ink:v.includes('r')?RINK:INK,edge:s.miss===v?NO:null,n:26}))}
function need(v){const s=M.e;if(s.n>=NEED.length)return;const [t,ok,other]=NEED[s.n];
 if(v!==ok){s.miss=v;A.sound.miss();return say(ok.includes('r')?`${other} has no r, so it is a different word. ${t} ${ok}.`:`${other} has an r, so it says a new sound. The pet is a ${ok}.`)}
 s.n++;s.miss=null;A.sound.pop();say(`${t} ${ok}.`+(s.n>=NEED.length?' All 5 done.':''))}
function draw(){const k=part();if(k==='quiz'){paper();banner('Challenge',A.H*.25,1);banner('car · fork · her, bird, burn',A.H*.55);return}
 ({slide:drawSlide,sound:drawSound,spot:drawSpot,pick:drawPick,need:drawNeed})[k]();A.fx.draw(A.ctx)}
function down(p){const k=part();
 if(k==='slide'&&M.a.n<SLIDE.length){if(on(p,rHome())){M.drag={x:p.x,y:p.y};return true}const z=letters(SLIDE[M.a.n][0],A.H*.34).slots.find(r=>r.k>0&&on(p,r));if(z)slide(z.k);return false}
 if(k==='sound'&&M.b.n<SOUNDS.length){if(on(p,card())){M.drag={x:p.x,y:p.y};return true}const b=boxes().find(r=>on(p,r));if(b)drop(b.j);return false}
 if(k==='spot'&&M.c.n<SPOT.length){const i=letters(SPOT[M.c.n][0],A.H*.4).cells.findIndex(r=>on(p,r));if(i>=0)spot(i);return false}
 if(k==='pick'&&M.d.n<PICK.length){const b=keyPair().find(r=>on(p,r));if(b){M.drag={j:b.j,x:p.x,y:p.y};return true}return false}
 if(k==='need'&&M.e.n<NEED.length){const b=keyPair().find(r=>on(p,r));if(b)need(nOrder(M.e.n)[b.j])}return false}
function move(p){if(M.drag){M.drag.x=p.x;M.drag.y=p.y;A.redraw()}}
function up(p){const d=M.drag;if(!d)return;M.drag=null;const k=part();
 if(k==='slide'){const z=letters(SLIDE[M.a.n][0],A.H*.34).slots.find(r=>r.k>0&&on(p,{x:r.x-8,y:r.y-24,w:r.w+16,h:r.h+48}));if(z)slide(z.k);else A.redraw();return}
 if(k==='sound'){const b=boxes().find(r=>on(p,r));if(b)drop(b.j);else A.redraw();return}
 if(k==='pick'){const gapY=A.H*.32;if(p.y<gapY+sz(90)||on(p,keyPair()[d.j]))choose(pOrder(M.d.n)[d.j]);else A.redraw()}}
function clear(){ver++;for(const k in M)delete M[k];Object.assign(M,{a:{n:0},b:{n:0},c:{n:0},d:{n:0},e:{n:0},drag:null,hook:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();M.hook()}
function begin(i,desc,ok,msg){clear();say(desc);M.hook=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=ver;acts.forEach((f,j)=>setTimeout(()=>{if(me===ver)f()},ms*(j+1)))}
function pads(){if(!pad)return;pad.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
 if(k==='slide'&&M.a.n<SLIDE.length){const w=SLIDE[M.a.n][0];for(let i=1;i<=w.length;i++)b(i===w.length?'r at the end':`r after ${w[i-1]}`,()=>slide(i),`${w}: put r ${i===w.length?'at the end':'after the '+w[i-1]}`)}
 if(k==='sound'&&M.b.n<SOUNDS.length)SBOX.forEach((t,j)=>b(t,()=>drop(j),`${SOUNDS[M.b.n][0]}: ${t}`));
 if(k==='spot'&&M.c.n<SPOT.length){const w=SPOT[M.c.n][0];[...w].forEach((ch,i)=>b(ch,()=>spot(i),`${w}: letter ${i+1}, ${ch}`))}
 if(k==='pick'&&M.d.n<PICK.length)pOrder(M.d.n).forEach(v=>b(v,()=>choose(v),`Fill the gap with ${v}`));
 if(k==='need'&&M.e.n<NEED.length)nOrder(M.e.n).forEach(v=>b(v,()=>need(v),`Finish the sentence with ${v}`))}
const steps=[
{h:'Add an r',p:'Put an r right after the vowel. The vowel and the r make a new sound. cat becomes cart.',
predict:{q:'Put r in cat to make cart. Does the a still sound like the a in cat?',opts:['Yes, the same','No, it changes'],ans:1},task:'Make all 4 new words',
show:()=>demo(0,SLIDE.map(q=>()=>slide(q[1])),650),
go:()=>begin(0,'Word: cat. Drag the r tile into a gap, or use the buttons.',()=>M.a.n>=SLIDE.length,'The vowel + r make one new sound: ar, ur, ir, or.')},
{h:'Three sounds',p:'ar says the sound in car. or says the sound in fork. ir, ur and er all say the sound in her. Drag each word to its sound.',
predict:{q:'Do bird and burn have the same middle sound?',opts:['No, they are different','Yes, the same'],ans:1},task:'Sort all 9 words',
show:()=>demo(1,SOUNDS.map(x=>()=>drop(x[1])),420),
go:()=>begin(1,'Word: farm. Boxes: ar as in car, or as in fork, er as in her.',()=>M.b.n>=SOUNDS.length,'ir, ur and er sound the same. ore sounds like or.')},
{h:'Spot the sound',p:'Tap the letters that make the sound together: the vowel and the r. In more, o, r and e work together.',task:'Find all 6',
show:()=>demo(2,SPOT.map(q=>()=>spot(q[1])),600),
go:()=>begin(2,'Word: farm. Tap the letters that make one sound.',()=>M.c.n>=SPOT.length,'A vowel then r: two letters, one sound.')},
{h:'Which letters?',p:'ir and ur sound the same, so you have to learn which one a word uses. Drag the right letters into the gap.',
predict:{q:'girl and nurse have the same sound. Are they spelt the same way?',opts:['Yes, both ir','No, ir and ur'],ans:1},task:'Spell all 4 words',
show:()=>demo(3,PICK.map(q=>()=>choose(q[1])),700),
go:()=>begin(3,'g, gap, l. Choices: ir or ur.',()=>M.d.n>=PICK.length,'Same sound, different letters: girl has ir, nurse has ur.')},
{h:'r or no r?',p:'One r makes a new word. Read the sentence and pick the word that makes sense.',task:'Finish all 5 sentences',
show:()=>demo(4,NEED.map(q=>()=>need(q[1])),650),
go:()=>begin(4,'The horse pulls a ___. Choices: cart or cat.',()=>M.e.n>=NEED.length,'cat and cart are different words. The r changes the sound and the meaning.')},
{h:'Challenge',p:'',go:()=>{clear();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.hook()});
const QS=[
{q:'Which word has the same sound as car?',a:'park',o:[['pack','short'],['pork','oror']]},
{q:'Which word has the same sound as her?',a:'bird',o:[['bid','short'],['barn','arar']]},
{q:'Which is spelt right?',a:'girl',o:[['gurl','irur'],['gril','order']]},
{q:'Which letters make one sound in fork?',a:'or',o:[['fo','split'],['rk','split']]},
{q:'Which word says the same sound as fork?',a:'more',o:[['mere','erore'],['mop','short']]},
{q:'What is hut with r after the u?',a:'hurt',o:[['hutr','end'],['hrut','front']]}];
function hint(t){let m='Look for the vowel with r right after it. The two letters make one sound.';
 switch(t){case 'short':m='No r there, so the vowel keeps its short sound.';break;
 case 'oror':m='pork has or, the sound in fork. car has ar.';break;
 case 'arar':m='barn has ar, like car. her has er, the same sound as ir in bird.';break;
 case 'irur':m='ur makes the same sound, but girl is spelt with ir.';break;
 case 'order':m='The r comes after the vowel: g, ir, l.';break;
 case 'split':m='The sound is the vowel and the r together: or.';break;
 case 'erore':m='mere does not say the or sound. more has ore, which says or.';break;
 case 'end':m='The r goes right after the vowel u, not at the end: hurt.';break;
 case 'front':m='The r comes after the vowel, not before it: hurt.';break}
 return m}
function quiz(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 qbox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+hint(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':hint(t))}
FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:B=>{qbox.hidden=B.step!==5;pad.hidden=B.step===5;pads()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'r-controlled vowel buttons'},w);qbox=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});pads()}}).start()})})();
