/* Flagship – tricky words / common exception words (ages 5–8; NC England Y1–Y2 spelling: "spell common exception words"
   and "spell the days of the week", English Appendix 1 Y1/Y2 word lists; Common Core L.1.2d, L.2.2d). Swap the one part
   of a sound-it-out spelling that breaks the usual rule (skool → school), learn a word with look, cover, write, check,
   build each day of the week, find and fix the tricky word in a sentence, and group words that share the same trick. */
(()=>{
/* sounded-out chunks, index of the chunk that is wrong, the chunk that replaces it, the real word */
const SWAP=[[['s','k','oo','l'],1,'ch','school'],[['l','uv'],1,'ove','love'],[['m','e','ny'],1,'a','many'],[['sh','u','d'],1,'oul','should'],[['w','er'],1,'ere','were']];
/* word, its letters plus one sound-it-out letter that does not belong */
const LCWC=[['come','u','cum'],['door','w','dor'],['eye','i','iy'],['pretty','i','pritty']];
/* real first part, sound-it-out first part, what to say about the slip */
const DAYS=[['Mon','Mun','Monday has an o, even though it sounds like Mun'],['Tues','Chews','Tuesday starts with T, then ues'],['Wednes','Wens','Wednesday has a d we do not say: Wed, nes, day'],
 ['Thurs','Thers','Thursday has ur, not er'],['Fri','Fry','Friday has an i after the r'],['Satur','Sater','Saturday has ur in the middle: Sat, ur, day'],['Sun','Son','Sunday has a u, like the sun in the sky']];
/* sentence words, index of the misspelt word, the right spelling */
const FIX=[['We had fun becos it was hot.',3,'because'],['My frend is kind.',1,'friend'],['I cud see the sea.',1,'could'],['Have you got enny pens?',3,'any'],['Lots of peepul came.',2,'people']];
const FAM=[['could',0],['come',1],['would',0],['some',1],['Monday',1],['should',0],['other',1]],FBOX=['ould says ood','o says u'];
VIS.reg('flagexcept',c=>{let A,keys,quizEl,round=-1,gen=0;c.fig.classList.add('young');
const st={};
const PEN='#0f172a',GOOD='#065f46',BAD='#b91c1c',RIM='#475569',LIFT='#1e40af',GOLD='#92400e',CREAM='#fef9c3',CARD='#ffffff',SKY='#e0f2fe';
const px=v=>Math.round(v*(A.narrow?1:1.12)),font=(v,w)=>`${w||800} ${px(v)}px system-ui,sans-serif`;
const stage=()=>['swap','lcwc','days','fix','fam','quiz'][A.step],hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function ground(){const g=A.ctx;g.fillStyle=A.col.dark?'#0b1220':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function pill(t,y,good){const g=A.ctx;let n=16;g.font=font(n);while(g.measureText(t).width+34>A.W-8&&n>10){n--;g.font=font(n)}
 const w=g.measureText(t).width+28,h=px(n)+18;g.fillStyle=good?'#d1fae5':CARD;A.paint.rrect(A.W/2-w/2,y-h/2,w,h,12);g.fill();g.lineWidth=2;g.strokeStyle=good?GOOD:RIM;g.stroke();
 g.fillStyle=PEN;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function box(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.fill||CARD;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=o.rim?4:2;g.strokeStyle=o.rim||RIM;g.stroke();
 if(t==null)return;g.fillStyle=o.ink||PEN;g.font=font(o.n||28);g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-6)}
function note(t,y,n){const g=A.ctx;g.fillStyle=A.col.tx;g.font=font(n||16,700);g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y,A.W-12)}
/* a row of tiles sized to fit the canvas */
function row(parts,y,maxW){const n=parts.length,gap=10,each=parts.map(t=>Math.max(px(48),px(20)*t.length+20)),tot=each.reduce((a,b)=>a+b,0)+gap*(n-1),k=Math.min(1,(A.W-24)/tot),x0=A.W/2-tot*k/2;
 let x=x0;return parts.map((t,i)=>{const r={x,y,w:each[i]*k,h:px(maxW||62),t,i};x+=(each[i]+gap)*k;return r})}
/* ---- 1: swap the tricky part ---- */
const tray=()=>({x:A.W/2-px(48),y:A.H*.66,w:px(96),h:px(60)});
function drawSwap(){const s=st.a;ground();if(s.n>=SWAP.length){pill('All 5 fixed',A.H*.08,1);SWAP.forEach((q,i)=>pill(`${q[0].join('')} → ${q[3]}`,A.H*(.22+i*.14),1));return}
 const [parts,,fix]=SWAP[s.n];pill(`Word ${s.n+1} of 5: fix the tricky part`,A.H*.08);
 row(parts,A.H*.3).forEach(r=>box(r,r.t,{rim:s.bad===r.i?BAD:null,fill:s.bad===r.i?'#fee2e2':CARD}));if(s.prev)note(s.prev,A.H*.2);
 const d=st.drag,h=tray();box(d?{...h,x:d.x-h.w/2,y:d.y-h.h/2}:h,fix,{fill:CREAM,ink:GOLD,rim:d?LIFT:GOLD})}
function swap(i){const s=st.a;if(s.n>=SWAP.length)return;const [parts,k,fix,word]=SWAP[s.n];
 if(i!==k){s.bad=i;A.sound.miss();return tell(`${parts[i]} is spelt the way it sounds, so it stays. The tricky part is ${parts[k]}: ${word} uses ${fix}.`)}
 s.n++;s.bad=null;A.sound.pop();s.prev=`${parts.join('')} → ${word}`;tell(`${word}. Only ${fix} is tricky. The rest sounds out.`+(s.n>=SWAP.length?' All 5 fixed.':''))}
/* ---- 2: look, cover, write, check ---- */
const lettersOf=n=>{const [w,extra]=LCWC[n],L=[...w,extra],k=(n*3+1)%L.length;return L.slice(k).concat(L.slice(0,k))};
function keyRects(n){const L=lettersOf(n),per=Math.min(L.length,4),w=Math.min(px(66),(A.W-20-(per-1)*10)/per),h=px(58);
 return L.map((t,i)=>{const r=Math.floor(i/per),cnt=Math.min(per,L.length-r*per),x0=A.W/2-(cnt*w+(cnt-1)*10)/2;return{x:x0+(i%per)*(w+10),y:A.H*.6+r*(h+10),w,h,t,i}})}
const coverBtn=()=>({x:A.W/2-px(80),y:A.H*.62,w:px(160),h:px(60)});
function drawLcwc(){const s=st.b;ground();if(s.n>=LCWC.length){pill('All 4 written from memory',A.H*.08,1);LCWC.forEach((q,i)=>pill(`${q[0]} ✓ (not ${q[2]})`,A.H*(.24+i*.16),1));return}
 const [w]=LCWC[s.n];pill(`Word ${s.n+1} of 4: ${s.hid?'write it from memory':'look, then cover it'}`,A.H*.08);
 if(!s.hid){note(w,A.H*.32,44);box(coverBtn(),'Cover it',{fill:SKY,ink:LIFT,rim:LIFT,n:22});return}
 const slots=row([...w].map(()=>' '),A.H*.28,56);slots.forEach((r,i)=>box(r,s.got[i]||'',{fill:s.got[i]?'#d1fae5':CARD,rim:i===s.got.length&&s.bad?BAD:null}));
 keyRects(s.n).forEach(r=>box(r,r.t,{fill:s.used.includes(r.i)?(A.col.dark?'#334155':'#e2e8f0'):CARD,ink:s.used.includes(r.i)?RIM:PEN}))}
function cover(){const s=st.b;if(s.n>=LCWC.length||s.hid)return;s.hid=1;s.got=[];s.used=[];A.sound.pop();tell(`${LCWC[s.n][0]} is covered. Tap the letters in order.`)}
function key(i){const s=st.b;if(s.n>=LCWC.length||!s.hid||s.used.includes(i))return;const [w,extra,wrong]=LCWC[s.n],t=lettersOf(s.n)[i],need=w[s.got.length];
 if(t!==need){s.bad=1;A.sound.miss();return tell(t===extra?`${t} is how it sounds, like ${wrong}. But ${w} is a tricky word. Next comes ${need}.`:`Not yet. After ${s.got.join('')||'the start'} comes ${need}.`)}
 s.got.push(t);s.used.push(i);s.bad=0;A.sound.pop();
 if(s.got.length<w.length)return tell(s.got.join(''));s.n++;s.hid=0;tell(`Check: ${w}. It matches.`+(s.n>=LCWC.length?' All 4 done.':''))}
function nextKey(){const s=st.b;if(!s.hid)return cover();const w=LCWC[s.n][0],L=lettersOf(s.n),i=L.findIndex((t,j)=>t===w[s.got.length]&&!s.used.includes(j));key(i)}
/* ---- 3: days of the week ---- */
const dayPair=()=>{const w=Math.min(px(130),(A.W-40)/2),h=px(60);return[0,1].map(j=>({x:A.W/2+(j?10:-w-10),y:A.H*.62,w,h,j}))};
const dOrder=n=>n%2?[DAYS[n][1],DAYS[n][0]]:[DAYS[n][0],DAYS[n][1]];
function drawDays(){const s=st.c,g=A.ctx;ground();const done=DAYS.slice(0,s.n).map(d=>d[0]+'day');
 if(s.n>=DAYS.length){pill('All 7 days spelt',A.H*.07,1);done.forEach((d,i)=>note(`${i+1}. ${d}`,A.H*(.19+i*.11),20));return}
 pill(`Day ${s.n+1} of 7: pick the start`,A.H*.08);g.font=font(14,700);g.fillStyle=A.col.tx;g.textAlign='center';g.fillText(done.join(' · '),A.W/2,A.H*.2,A.W-12);
 const gap={x:A.W/2-px(130),y:A.H*.32,w:px(150),h:px(62)};box(gap,'?',{fill:A.col.dark?'#1e293b':'#f1f5f9',ink:A.col.tx,rim:s.bad?BAD:RIM});box({x:gap.x+gap.w+6,y:gap.y,w:px(100),h:gap.h},'day',{fill:SKY,ink:LIFT,rim:LIFT});
 const d=st.drag;dOrder(s.n).forEach((v,j)=>{const b=dayPair()[j];box(d&&d.j===j?{...b,x:d.x-b.w/2,y:d.y-b.h/2}:b,v,{fill:CREAM,ink:GOLD,rim:d&&d.j===j?LIFT:GOLD,n:24})})}
function day(v){const s=st.c;if(s.n>=DAYS.length)return;const [ok,,why]=DAYS[s.n];
 if(v!==ok){s.bad=1;A.sound.miss();return tell(`${v}day is how it can sound, but ${why}.`)}
 s.n++;s.bad=0;A.sound.pop();tell(`${ok}day.`+(s.n>=DAYS.length?' All 7 days. Every one ends in day.':''))}
/* ---- 4: find and fix ---- */
function wordRects(n){const g=A.ctx,ws=FIX[n][0].split(' ');g.font=font(22);const h=px(54),out=[];let x=10,y=A.H*.28,line=[];
 const flush=()=>{const tot=line.reduce((a,r)=>a+r.w,0)+10*(line.length-1);let xx=A.W/2-tot/2;line.forEach(r=>{r.x=xx;xx+=r.w+10;out.push(r)});line=[]};
 ws.forEach((t,i)=>{const w=g.measureText(t).width+24;if(x+w>A.W-10&&line.length){flush();x=10;y+=h+10}line.push({x,y,w,h,t,i});x+=w+10});flush();return out}
function drawFix(){const s=st.d;ground();if(s.n>=FIX.length){pill('All 5 sentences fixed',A.H*.07,1);FIX.forEach((q,i)=>{const ws=q[0].split(' ');ws[q[1]]=q[2]+(q[0].split(' ')[q[1]].endsWith('.')?'.':'');pill(ws.join(' '),A.H*(.2+i*.15),1)});return}
 pill(`Sentence ${s.n+1} of 5: tap the wrong word`,A.H*.08);wordRects(s.n).forEach(r=>box(r,r.t,{n:22,rim:s.bad===r.i?BAD:null,fill:s.bad===r.i?'#fee2e2':CARD}));if(s.prev)note(s.prev,A.H*.7,18)}
function fix(i){const s=st.d;if(s.n>=FIX.length)return;const [t,k,right]=FIX[s.n],ws=t.split(' '),bare=w=>w.replace(/[.?]/g,'');
 if(i!==k){s.bad=i;A.sound.miss();return tell(`${bare(ws[i])} is spelt right. Look for a word written the way it sounds that is really a tricky word.`)}
 s.n++;s.bad=null;A.sound.pop();s.prev=`${bare(ws[k])} → ${right}`;tell(`${bare(ws[k])} is how it sounds. The real spelling is ${right}.`+(s.n>=FIX.length?' All 5 fixed.':''))}
/* ---- 5: same trick, same family ---- */
const bins=()=>{const w=(A.W-30)/2;return FBOX.map((t,j)=>({x:10+j*(w+10),y:A.H*.42,w,h:A.H*.54,j}))};
const fcard=()=>{const w=Math.min(A.W-80,px(180));return{x:A.W/2-w/2,y:A.H*.17,w,h:px(58)}};
function drawFam(){const s=st.e,g=A.ctx;ground();pill(s.n>=FAM.length?'All 7 in their family':`Word ${s.n+1} of 7: which trick?`,A.H*.07,s.n>=FAM.length);
 bins().forEach(b=>{g.fillStyle=A.col.dark?'#e0f2fe':'#f0f9ff';A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=s.bad===b.j?BAD:'#075985';g.lineWidth=s.bad===b.j?4:2.5;g.stroke();
  g.fillStyle=PEN;g.textAlign='center';g.textBaseline='top';g.font=font(15);g.fillText(FBOX[b.j],b.x+b.w/2,b.y+8,b.w-6);g.font=font(18,700);
  FAM.slice(0,s.n).filter(x=>x[1]===b.j).forEach((x,i)=>g.fillText(x[0],b.x+b.w/2,b.y+px(36)+i*px(26),b.w-6))});
 if(s.n<FAM.length){const d=st.drag,r=fcard();box(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,FAM[s.n][0],{rim:d?LIFT:null,n:28})}}
function fam(j){const s=st.e;if(s.n>=FAM.length)return;const [w,k]=FAM[s.n];
 if(j!==k){s.bad=j;A.sound.miss();return tell(k?`${w} has an o that says u, like come. It has no ould.`:`${w} ends in ould, which says ood. The l is silent.`)}
 s.n++;s.bad=null;A.sound.pop();tell(`${w}: ${FBOX[k]}.`+(s.n>=FAM.length?' All 7 sorted.':''))}
function draw(){const k=stage();if(k==='quiz'){ground();pill('Challenge',A.H*.25,1);pill('school · said · Wednesday · could',A.H*.55);return}
 ({swap:drawSwap,lcwc:drawLcwc,days:drawDays,fix:drawFix,fam:drawFam})[k]();A.fx.draw(A.ctx)}
function down(p){const k=stage();
 if(k==='swap'&&st.a.n<SWAP.length){if(hit(p,tray())){st.drag={x:p.x,y:p.y};return true}const r=row(SWAP[st.a.n][0],A.H*.3).find(r=>hit(p,r));if(r)swap(r.i);return false}
 if(k==='lcwc'&&st.b.n<LCWC.length){if(!st.b.hid){if(hit(p,coverBtn()))cover();return false}const r=keyRects(st.b.n).find(r=>hit(p,r));if(r)key(r.i);return false}
 if(k==='days'&&st.c.n<DAYS.length){const b=dayPair().find(r=>hit(p,r));if(b){st.drag={j:b.j,x:p.x,y:p.y};return true}return false}
 if(k==='fix'&&st.d.n<FIX.length){const r=wordRects(st.d.n).find(r=>hit(p,r));if(r)fix(r.i);return false}
 if(k==='fam'&&st.e.n<FAM.length){if(hit(p,fcard())){st.drag={x:p.x,y:p.y};return true}const b=bins().find(r=>hit(p,r));if(b)fam(b.j)}return false}
function move(p){if(st.drag){st.drag.x=p.x;st.drag.y=p.y;A.redraw()}}
function up(p){const d=st.drag;if(!d)return;st.drag=null;const k=stage();
 if(k==='swap'){const r=row(SWAP[st.a.n][0],A.H*.3).find(r=>hit(p,{x:r.x-6,y:r.y-20,w:r.w+12,h:r.h+40}));if(r)swap(r.i);else A.redraw();return}
 if(k==='days'){if(p.y<A.H*.5||hit(p,dayPair()[d.j]))day(dOrder(st.c.n)[d.j]);else A.redraw();return}
 if(k==='fam'){const b=bins().find(r=>hit(p,r));if(b)fam(b.j);else A.redraw()}}
function reset(){gen++;for(const k in st)delete st[k];Object.assign(st,{a:{n:0},b:{n:0,got:[],used:[]},c:{n:0},d:{n:0},e:{n:0},drag:null,check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();st.check()}
function open(i,desc,ok,msg){reset();tell(desc);st.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function buttons(){if(!keys)return;keys.innerHTML='';const k=stage(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(k==='swap'&&st.a.n<SWAP.length){const [parts,,fix]=SWAP[st.a.n];parts.forEach((t,i)=>b(t,()=>swap(i),`Put ${fix} in place of ${t}`))}
 if(k==='lcwc'&&st.b.n<LCWC.length){if(!st.b.hid)b('Cover it',cover);else lettersOf(st.b.n).forEach((t,i)=>{if(!st.b.used.includes(i))b(t,()=>key(i),`Letter ${t}`)})}
 if(k==='days'&&st.c.n<DAYS.length)dOrder(st.c.n).forEach(v=>b(v+'day',()=>day(v),`Spell it ${v}day`));
 if(k==='fix'&&st.d.n<FIX.length)FIX[st.d.n][0].split(' ').forEach((t,i)=>b(t.replace(/[.?]/g,''),()=>fix(i),`The word ${t.replace(/[.?]/g,'')} is wrong`));
 if(k==='fam'&&st.e.n<FAM.length)FBOX.forEach((t,j)=>b(t,()=>fam(j),`${FAM[st.e.n][0]}: ${t}`))}
const steps=[
{h:'Fix the tricky part',p:'A tricky word does not spell the way it sounds. But only one part is tricky. Drag the yellow tile onto the part that is wrong.',
predict:{q:'skool is how school sounds. How much of it is wrong?',opts:['All of it','Just one part'],ans:1},task:'Fix all 5 words',
show:()=>auto(0,SWAP.map(q=>()=>swap(q[1])),650),
go:()=>open(0,'skool. Drag ch onto the part that is wrong.',()=>st.a.n>=SWAP.length,'Most of a tricky word sounds out. Learn the one tricky part.')},
{h:'Look, cover, write',p:'Look at the word. Tap Cover it. Then write it from memory with the letter tiles. Then check.',
predict:{q:'Can you spell come by sounding it out?',opts:['Yes: c, u, m','No: it has o and an e'],ans:1},task:'Write all 4 words',
show:()=>auto(1,LCWC.flatMap(q=>[...Array(q[0].length+1)].map(()=>nextKey)),180),
go:()=>open(1,'Look: come. Then tap Cover it.',()=>st.b.n>=LCWC.length,'Look, cover, write, check: the way to learn a tricky word.')},
{h:'Days of the week',p:'Every day ends in day. The start of some days is tricky. Drag the right start into the gap.',
predict:{q:'Do you hear the d in Wednesday when you say it?',opts:['Yes','No, but it is there'],ans:1},task:'Spell all 7 days',
show:()=>auto(2,DAYS.map(q=>()=>day(q[0])),520),
go:()=>open(2,'Day 1: ___day. Choices: Mon or Mun.',()=>st.c.n>=DAYS.length,'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.')},
{h:'Find and fix',p:'One word in each sentence is spelt the way it sounds, but it is a tricky word. Tap it.',task:'Fix all 5 sentences',
show:()=>auto(3,FIX.map(q=>()=>fix(q[1])),650),
go:()=>open(3,'We had fun becos it was hot. Tap the word that is spelt wrong.',()=>st.d.n>=FIX.length,'Tricky words still need checking when you write.')},
{h:'Same trick',p:'Some tricky words share a trick. could, would and should all end in ould. come and some have an o that says u. Drag each word to its family.',task:'Sort all 7 words',
show:()=>auto(4,FAM.map(x=>()=>fam(x[1])),420),
go:()=>open(4,'could. Boxes: ould says ood, or o says u.',()=>st.e.n>=FAM.length,'Learn one, and you know the family.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.check()});
const QS=[
{q:'Which is spelt right?',a:'school',o:[['skool','sound'],['schol','vowel']]},
{q:'Mum ___ we can go. Which word?',a:'said',o:[['sed','sound'],['siad','order']]},
{q:'Which day is spelt right?',a:'Wednesday',o:[['Wensday','silent'],['Wendsday','order']]},
{q:'I ___ see the sea.',a:'could',o:[['cud','sound'],['cood','silent']]},
{q:'Which word has the same trick as would?',a:'should',o:[['wood','homo'],['some','family']]},
{q:'What helps you learn a tricky word?',a:'Look, cover, write, check',o:[['Sound out every letter','sound'],['Write it once','once']]}];
function why(t){let m='Most of the word sounds out. Look hard at the tricky part.';
 switch(t){case 'sound':m='That is how it sounds, but this is a tricky word. Learn the tricky part by heart.';break;
 case 'vowel':m='school has oo in the middle: s, ch, oo, l.';break;
 case 'order':m='The letters are all there, but in the wrong order. Look, cover, write, check.';break;
 case 'silent':m='Some letters are not heard but must be written: the d in Wednesday, the l in could.';break;
 case 'homo':m='wood sounds the same, but it is the stuff trees are made of. should ends in ould, like would.';break;
 case 'family':m='some has an o that says u. would and should end in ould.';break;
 case 'once':m='Once is not enough. Cover it and write it again on another day.';break}
 return m}
function ask(){round++;const Q=QS[round%QS.length],all=[[Q.a,'ok'],...Q.o],r=round%3,ord=all.slice(r).concat(all.slice(0,r));
 quizEl.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quizEl.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quizEl.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizEl.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:B=>{quizEl.hidden=B.step!==5;keys.hidden=B.step===5;buttons()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Tricky word buttons'},w);quizEl=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
