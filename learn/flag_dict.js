/* Flagship – using a dictionary to check spellings (ages 7–11; NC England Y3–4 statutory: use the first two or three
   letters of a word to check its spelling in a dictionary; CCSS L.2.2e consult reference materials). Order words to
   the second letter, file words between guide words, page earlier or later to a target, pick the right entry for a
   misspelling, and swap the first letters when a sound has another spelling (skool → sch). Not flagabc or flagdefine. */
(()=>{
const SETS=[['bus','bag','bed','box','big'],['crab','cake','city','cup','cow'],['shop','ship','shed','shut','shark']];
const PAGES=[['bad','bell'],['bike','boot'],['brick','bus']];
const FILE=[['bed',0],['bone',1],['brush',2],['bag',0],['bin',1],['bun',2]];
const BOOK=[['ant','axe'],['bag','bun'],['cap','cut'],['dad','dry'],['egg','eye'],['fan','fun'],['gap','gum'],['hat','hut'],['jam','jug'],['kid','kit']];
const HUNT=[{w:'frog',at:5},{w:'hen',at:7},{w:'cow',at:2},{w:'jet',at:8},{w:'egg',at:4}];
const LOOK=[{bad:'freind',ents:['fridge','friend','fright','frog'],ok:'friend'},{bad:'beutiful',ents:['beach','bead','beautiful','because'],ok:'beautiful'},
{bad:'diffrent',ents:['diet','different','difficult','dig'],ok:'different'},{bad:'sentance',ents:['sense','sentence','separate','set'],ok:'sentence'}];
const START=[{bad:'skool',ok:'sch',word:'school',why:'The k sound here is ch. school starts sch.'},{bad:'nife',ok:'kn',word:'knife',why:'knife has a silent k: kn.'},
{bad:'fone',ok:'ph',word:'phone',why:'In phone the f sound is ph.'},{bad:'rite',ok:'wr',word:'write',why:'write (with a pen) has a silent w: wr.'}];
const ST=['sch','kn','ph','wr'];
VIS.reg('flagdict',c=>{let A,row,cq,ci=-1,tok=0;const D={};
const TXT='#111827',RIGHT='#047857',WRONG='#b91c1c',EDGE='#6b7280',LIFT='#1d4ed8',PG='#fffbeb',PGL='#92400e',TAB='#e0e7ff',TABI='#3730a3';
const fnt=(n,w)=>`${w||800} ${n}px system-ui,sans-serif`,u=n=>A.narrow?n:Math.round(n*1.18),ctr=g=>{g.textAlign='center';g.textBaseline='middle'};
const mode=()=>['abc','file','hunt','look','start','quiz'][A.step],inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const hit=()=>A.sound.pop(),miss=()=>A.sound.miss(),RR=(...a)=>A.paint.rrect(...a);
function ground(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#eef2ff',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H)}
function plate(t,y,ok,n){const g=A.ctx;let s=u(n||14);g.font=fnt(s);let w=g.measureText(t).width+26;while(w>A.W-10&&s>10){s--;g.font=fnt(s);w=g.measureText(t).width+26}
const h=s+16,x=Math.max(5,A.W/2-w/2);g.fillStyle='#ffffff';RR(x,y-h/2,w,h,9);g.fill();g.lineWidth=ok?3:1.5;g.strokeStyle=ok?RIGHT:EDGE;g.stroke();g.fillStyle=TXT;ctr(g);g.fillText(t,x+w/2,y+1)}
function box(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';RR(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=(o.ok||o.no||o.up)?4:2;
g.strokeStyle=o.ok?RIGHT:o.no?WRONG:o.up?LIFT:EDGE;g.stroke();if(t==null)return;g.fillStyle=o.ink||TXT;g.font=fnt(o.px||Math.round(r.h*.44));ctr(g);g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-8)}
/* a dictionary page: guide words in the top corners, entries below */
function page(r,gw,ents,o){o=o||{};const g=A.ctx;g.fillStyle=PG;RR(r.x,r.y,r.w,r.h,8);g.fill();g.lineWidth=o.lit?4:2;g.strokeStyle=o.lit?RIGHT:o.no?WRONG:PGL;g.stroke();
g.fillStyle=PGL;g.font=fnt(u(o.gpx||14));g.textBaseline='top';g.textAlign='left';g.fillText(gw[0],r.x+8,r.y+6,r.w/2-10);g.textAlign='right';g.fillText(gw[1],r.x+r.w-8,r.y+6,r.w/2-10);
g.strokeStyle=PGL;g.lineWidth=1;g.beginPath();g.moveTo(r.x+6,r.y+u(o.gpx||14)+12);g.lineTo(r.x+r.w-6,r.y+u(o.gpx||14)+12);g.stroke();
if(ents){g.fillStyle=TXT;g.font=fnt(u(13),700);g.textAlign='center';ents.forEach((e,i)=>g.fillText(e,r.x+r.w/2,r.y+u(o.gpx||14)+20+i*u(17),r.w-10))}}
/* step 1: alphabetical order to the second letter */
function abcCards(){const L=SETS[Math.min(D.a.k,2)],n=L.length,gap=8,w=Math.min(u(92),(A.W-20-gap*(n-1))/n);const x0=(A.W-(n*w+gap*(n-1)))/2;return L.map((t,i)=>({t,x:x0+i*(w+gap),y:A.H*.62,w,h:u(52)}))}
function drawAbc(){const s=D.a,g=A.ctx;ground();if(s.k>=3){plate('3 lists in ABC order',A.H*.08,1);SETS.forEach((L,j)=>plate([...L].sort().join(' · '),A.H*(.3+j*.18),1,16));return}
const L=SETS[s.k];plate(`List ${s.k+1} of 3: tap the word that comes next`,A.H*.08,0,13);g.fillStyle=A.col.tx;g.font=fnt(u(13),700);ctr(g);
g.fillText(`All start with ${L[0].slice(0,L[0].startsWith('sh')?2:1)}. Look at the next letter.`,A.W/2,A.H*.19,A.W-12);
const sl=s.got.length,w=Math.min(u(88),(A.W-60)/5);for(let i=0;i<5;i++){const r={x:(A.W-(5*w+32))/2+i*(w+8),y:A.H*.3,w,h:u(48)};box(r,s.got[i]||null,{ok:!!s.got[i],bg:s.got[i]?TAB:null,ink:TABI,px:u(17)})}
abcCards().forEach(r=>{if(!s.got.includes(r.t))box(r,r.t,{no:s.miss===r.t,px:u(18)})});if(sl)plate(`${sl} of 5 in order`,A.H*.9,sl===5,12)}
function pickAbc(t){const s=D.a;if(s.k>=3)return;const L=SETS[s.k],want=[...L].sort()[s.got.length];if(s.got.includes(t))return;
if(t!==want){s.miss=t;miss();const i=[...t].findIndex((ch,j)=>ch!==want[j]);return say(`${t} comes after ${want}. Same start, so look at letter ${i+1}: ${want[i]} comes before ${t[i]}.`)}
s.got.push(t);s.miss=null;hit();if(s.got.length<5)return say(`${t}. Next?`);s.k++;s.got=[];say(`${[...L].sort().join(', ')}.`+(s.k>=3?' All 3 lists done.':''))}
/* step 2: file words between guide words */
function fPages(){const w=(A.W-40)/3,h=A.H*.34;return PAGES.map((gw,j)=>({gw,x:10+j*(w+10),y:A.H*.58,w,h}))}
function fCard(){const w=Math.min(u(150),A.W*.42),h=u(54);return{x:A.W/2-w/2,y:A.H*.3,w,h}}
function drawFile(){const s=D.f;ground();plate(s.k>=6?'All 6 filed':`Word ${s.k+1} of 6: which page is it on?`,A.H*.08,s.k>=6,13);
fPages().forEach((r,j)=>page(r,r.gw,FILE.slice(0,s.k).filter(x=>x[1]===j).map(x=>x[0]),{gpx:13}));
if(s.k<6){const r=fCard(),d=D.drag;box(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,FILE[s.k][0],{up:!!d,no:s.miss,px:u(22)})}}
function fileTo(j){const s=D.f;if(s.k>=6)return;const [w,a]=FILE[s.k],[lo,hi]=PAGES[j];
if(j!==a){s.miss=1;miss();return say(w<lo?`${w} comes before ${lo}, the first guide word, so it is on an earlier page.`:`${w} comes after ${hi}, the last guide word, so it is on a later page.`)}
s.k++;s.miss=0;hit();say(`${w} is between ${lo} and ${hi}.`+(s.k>=6?' All 6 filed.':''))}
/* step 3: page earlier or later until the word is between the guide words */
function hKeys(){const w=Math.min(u(120),(A.W-40)/3),x0=(A.W-(3*w+20))/2;return['Earlier','On this page','Later'].map((t,j)=>({t,j,x:x0+j*(w+10),y:A.H*.78,w,h:u(50)}))}
function drawHunt(){const s=D.h,g=A.ctx;ground();if(s.k>=5){plate('All 5 words found',A.H*.08,1);HUNT.forEach((q,j)=>plate(`${q.w}: page ${BOOK[q.at].join(' – ')}`,A.H*(.22+j*.14),1,15));return}
const q=HUNT[s.k],gw=BOOK[s.p];plate(`Find ${q.w}. ${s.moves} page turns so far.`,A.H*.08,0,13);
const pw=Math.min(u(260),A.W*.7);page({x:A.W/2-pw/2,y:A.H*.2,w:pw,h:A.H*.48},gw,null,{gpx:20,lit:s.p===q.at&&s.win,no:s.miss});
g.fillStyle=TXT;g.font=fnt(u(15),700);ctr(g);g.fillText(`Is ${q.w} between ${gw[0]} and ${gw[1]}?`,A.W/2,A.H*.5,pw-12);g.fillText(`Page ${s.p+1} of ${BOOK.length}`,A.W/2,A.H*.6);hKeys().forEach(r=>box(r,r.t,{px:u(15)}))}
function turn(j){const s=D.h;if(s.k>=5)return;const q=HUNT[s.k],gw=BOOK[s.p];const where=q.w<gw[0]?0:q.w>gw[1]?2:1;
if(j!==where){s.miss=1;miss();return say(where===1?`${q.w} is between ${gw[0]} and ${gw[1]}, so it is on this page.`:where===0?`${q.w} comes before ${gw[0]}. Go earlier.`:`${q.w} comes after ${gw[1]}. Go later.`)}
s.miss=0;if(j===0||j===2){s.p+=j===0?-1:1;s.moves++;A.sound.tick();return say(`Turned ${j?'later':'earlier'}: now ${BOOK[s.p].join(' to ')}.`)}
s.k++;hit();const n=s.moves;s.moves=0;s.p=4;say(`Found ${q.w} in ${n} turns.`+(s.k>=5?' All 5 found.':''))}
/* step 4: look up the first letters, pick the real entry */
function lEnts(){const q=LOOK[Math.min(D.l.k,3)],w=Math.min(u(200),(A.W-30)/2),h=u(46);return q.ents.map((t,i)=>({t,x:A.W/2-w-5+(i%2)*(w+10),y:A.H*.5+Math.floor(i/2)*(h+10),w,h}))}
function drawLook(){const s=D.l,g=A.ctx;ground();if(s.k>=4){plate('All 4 checked',A.H*.08,1);LOOK.forEach((q,j)=>plate(`${q.bad} → ${q.ok}`,A.H*(.26+j*.16),1,17));return}
const q=LOOK[s.k],pre=q.bad.slice(0,2);plate(`Word ${s.k+1} of 4: tap the right spelling`,A.H*.08,0,13);
box({x:A.W/2-u(90),y:A.H*.18,w:u(180),h:u(48)},q.bad,{no:1,px:u(22)});g.fillStyle=A.col.tx;g.font=fnt(u(14),700);ctr(g);g.fillText(`Look up ${pre}… Entries:`,A.W/2,A.H*.42);
lEnts().forEach(r=>box(r,r.t,{bg:PG,ink:TXT,no:s.miss===r.t,px:u(18)}))}
function pickLook(t){const s=D.l;if(s.k>=4)return;const q=LOOK[s.k];
if(t!==q.ok){s.miss=t;miss();return say(t.slice(0,3)===q.ok.slice(0,3)?`${t} starts the same, but it is a different word. Check every letter.`:`${t} is a different word. Which one means what you wanted to write?`)}
s.k++;s.miss=null;hit();say(`${q.bad} → ${q.ok}.`+(s.k>=4?' All 4 checked.':''))}
/* step 5: not there? try another spelling of the first sound */
function sKeys(){const w=Math.min(u(90),(A.W-50)/4),x0=(A.W-(4*w+30))/2;return ST.map((t,j)=>({t,x:x0+j*(w+10),y:A.H*.76,w,h:u(52)}))}
function sSlot(){const w=u(150);return{x:A.W/2-w/2,y:A.H*.5,w,h:u(46)}}
function drawStart(){const s=D.s,g=A.ctx;ground();if(s.k>=4){plate('All 4 found',A.H*.08,1);START.forEach((q,j)=>plate(`${q.bad} → ${q.word}`,A.H*(.26+j*.16),1,17));return}
const q=START[s.k];plate(`Word ${s.k+1} of 4: not in the book. Try new first letters.`,A.H*.08,0,12);
page({x:A.W/2-u(110),y:A.H*.16,w:u(220),h:A.H*.24},[q.bad.slice(0,2)+'…',q.bad.slice(0,2)+'…'],[`no ${q.bad} here`],{gpx:15});
g.fillStyle=A.col.tx;g.font=fnt(u(14),700);ctr(g);g.fillText('Drag in another way to spell the first sound:',A.W/2,A.H*.45,A.W-12);
box(sSlot(),s.win?q.word:null,{no:s.miss,bg:TAB});const d=D.drag;sKeys().forEach((r,j)=>{const rr=d&&d.j===j?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r;box(rr,r.t,{bg:TAB,ink:TABI,up:d&&d.j===j,px:u(20)})})}
function tryStart(t){const s=D.s;if(s.k>=4)return;const q=START[s.k];
if(t!==q.ok){s.miss=1;miss();return say(`${t} does not make the sound at the start of ${q.bad}. Say it again and think.`)}
s.k++;s.miss=0;hit();say(`${q.ok} → ${q.word}. ${q.why}`+(s.k>=4?' All 4 found.':''))}
function draw(){const k=mode();if(k==='quiz'){ground();plate('Challenge',A.H*.2,1);plate('first letters · guide words',A.H*.5,0,18);return}
({abc:drawAbc,file:drawFile,hunt:drawHunt,look:drawLook,start:drawStart})[k]();A.fx.draw(A.ctx)}
function down(p){const k=mode();
if(k==='abc'&&D.a.k<3){const r=abcCards().find(r=>inR(p,r)&&!D.a.got.includes(r.t));if(r)pickAbc(r.t);return false}
if(k==='file'&&D.f.k<6){if(inR(p,fCard())){D.drag={x:p.x,y:p.y};return true}const j=fPages().findIndex(r=>inR(p,r));if(j>=0)fileTo(j);return false}
if(k==='hunt'&&D.h.k<5){const r=hKeys().find(r=>inR(p,r));if(r)turn(r.j);return false}
if(k==='look'&&D.l.k<4){const r=lEnts().find(r=>inR(p,r));if(r)pickLook(r.t);return false}
if(k==='start'&&D.s.k<4){const j=sKeys().findIndex(r=>inR(p,r));if(j>=0){D.drag={j,x:p.x,y:p.y};return true}}return false}
function move(p){if(!D.drag)return;D.drag.x=p.x;D.drag.y=p.y;A.redraw()}
function lift(p){const d=D.drag;if(!d)return;D.drag=null;const k=mode();
if(k==='start'){const sl=sSlot();if(inR(p,{x:sl.x-30,y:sl.y-30,w:sl.w+60,h:sl.h+60})||inR(p,sKeys()[d.j]))tryStart(ST[d.j]);else A.redraw();return}
const j=fPages().findIndex(r=>inR(p,r));if(j>=0)fileTo(j);else A.redraw()}
function clear(){tok++;for(const k in D)delete D[k];Object.assign(D,{a:{k:0,got:[]},f:{k:0},h:{k:0,p:4,moves:0},l:{k:0},s:{k:0},drag:null,check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();D.check()}
function enter(i,desc,ok,msg){clear();say(desc);D.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=tok;acts.forEach((f,j)=>setTimeout(()=>{if(me===tok)f()},ms*(j+1)))}
function huntPlan(){const out=[];let p=4;HUNT.forEach(q=>{while(p!==q.at){const j=q.at<p?0:2;out.push(()=>turn(j));p+=j?1:-1}out.push(()=>turn(1));p=4});return out}
function pads(){if(!row)return;row.innerHTML='';const k=mode(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
if(k==='abc'&&D.a.k<3)SETS[D.a.k].forEach(t=>{if(!D.a.got.includes(t))B(t,()=>pickAbc(t),`${t} comes next`)});
if(k==='file'&&D.f.k<6)PAGES.forEach((gw,j)=>B(`${gw[0]} – ${gw[1]}`,()=>fileTo(j),`File on page ${gw[0]} to ${gw[1]}`));
if(k==='hunt'&&D.h.k<5)['Earlier','On this page','Later'].forEach((t,j)=>B(t,()=>turn(j)));
if(k==='look'&&D.l.k<4)LOOK[D.l.k].ents.forEach(t=>B(t,()=>pickLook(t),`The right spelling is ${t}`));
if(k==='start'&&D.s.k<4)ST.forEach(t=>B(t,()=>tryStart(t),`Start with ${t}`))}
const steps=[
{h:'ABC order',p:'A dictionary lists words in ABC order. When the first letters match, look at the next letter. Tap the words in order.',
predict:{q:'Which comes first: bus or bag?',opts:['bus, they both start with b','bag, a comes before u'],ans:1},task:'Order all 3 lists',
show:()=>demo(0,SETS.flatMap(L=>[...L].sort().map(t=>()=>pickAbc(t))),300),
go:()=>enter(0,'Cards: bus, bag, bed, box, big. Tap the first in ABC order.',()=>D.a.k>=3,'Same first letter? Use the second.')},
{h:'Guide words',p:'The two words at the top of a page are guide words. Every word between them in ABC order is on that page.',
predict:{q:'A page has guide words bad and bell. Is bed on it?',opts:['No, bed is not a guide word','Yes, bed is between bad and bell'],ans:1},task:'File all 6 words',
show:()=>demo(1,FILE.map(x=>()=>fileTo(x[1])),600),
go:()=>enter(1,'Card: bed. Pages: bad to bell, bike to boot, brick to bus.',()=>D.f.k>=6,'Between the guide words means on the page.')},
{h:'Turn the pages',p:'Compare your word with the guide words. Before the first? Go earlier. After the last? Go later.',task:'Find all 5 words',
show:()=>demo(2,huntPlan(),280),
go:()=>enter(2,'Find frog. Page 5: egg to eye. Earlier, on this page, or later?',()=>D.h.k>=5,'Guide words tell you which way to turn.')},
{h:'Check a spelling',p:'Not sure how to spell a word? Look up its first two or three letters, then find the word that matches.',task:'Check all 4 words',
show:()=>demo(3,LOOK.map(q=>()=>pickLook(q.ok)),700),
go:()=>enter(3,'freind. Look up fr. Entries: fridge, friend, fright, frog.',()=>D.l.k>=4,'First letters find the page. Every letter must match.')},
{h:'Try another start',p:'If the word is not there, the first sound may have another spelling. Drag in new first letters.',
predict:{q:'skool is not in the dictionary. What now?',opts:['It is not a real word','Try sch, another k sound'],ans:1},task:'Find all 4 words',
show:()=>demo(4,START.map(q=>()=>tryStart(q.ok)),700),
go:()=>enter(4,'skool: no entry. Try sch, kn, ph or wr.',()=>D.s.k>=4,'sch, kn, ph, wr: same sound, new start.')},
{h:'Challenge',p:'',go:()=>{clear();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>D.check()});
const QS=[
{q:'Which comes first in a dictionary?',a:'chip',o:[['crab','first'],['cup','first']]},
{q:'Guide words: fan, fun. Which word is on the page?',a:'fig',o:[['egg','before'],['gap','after']]},
{q:'You look up "lite". It is not there. Try…',a:'ligh, like light',o:[['give up','give'],['the L page only','one']]},
{q:'The word is after the last guide word. Turn…',a:'later',o:[['earlier','back'],['stay here','stay']]},
{q:'How do you find "beautiful"?',a:'look up be…',o:[['look up the last letters','end'],['read every page','every']]},
{q:'Which is spelt right?',a:'friend',o:[['freind','ie'],['frend','miss']]}];
function why(t){let m='Use the first letters, then the guide words.';
if(t==='first')m='All three start with c. Look at the second letter: h comes before r and u.';
if(t==='before')m='egg starts with e, which comes before f. It is on an earlier page.';
if(t==='after')m='gap starts with g, after fun. It is on a later page.';
if(t==='give')m='Not there does not mean not a word. Try another spelling of the sound, like igh.';
if(t==='one')m='l is right, but the next letters may be spelt another way: ligh.';
if(t==='back')m='After the last guide word means later, not earlier.';
if(t==='stay')m='The word is past this page. Turn later.';
if(t==='end')m='Dictionaries are in order from the first letters, not the last.';
if(t==='every')m='Too slow. Use b, then e, to jump to the right part.';
if(t==='ie')m='freind swaps i and e. The dictionary shows friend.';
if(t==='miss')m='frend misses the i. Check every letter with the entry.';
return m}
function pose(){ci++;const Q=QS[ci%QS.length],all=[[Q.a,'ok'],...Q.o],r=ci%3,ord=all.slice(r).concat(all.slice(0,r));
cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const bx=cq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},bx,v).onclick=()=>rule(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function rule(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else miss();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=pose;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.1,draw,onStep:B=>{cq.hidden=B.step!==5;row.hidden=B.step===5;pads()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Dictionary buttons'},bx);cq=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up:lift});pads()}}).start()})})();
