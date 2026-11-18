/* Flagship – spelling -able and -ible, -ably and -ibly (ages 9–10; NC England English Appendix 1, Years 5–6 spelling).
   Both endings sound the same, so the learner tests the root, spells the word, handles e and y at the join, uses -ation
   cousins and soft c/g, turns adjectives into -ably/-ibly adverbs, and meets the rule breakers a dictionary settles. */
(()=>{
/* 1: [root, is it a whole word?, full word] */
const ROOT=[['enjoy',1,'enjoyable'],['vis',0,'visible'],['depend',1,'dependable'],['poss',0,'possible'],['comfort',1,'comfortable'],['horr',0,'horrible'],['understand',1,'understandable'],['terr',0,'terrible']];
/* 2: [root, 1 = -able] */
const SPELL=[['break',1],['aud',0],['accept',1],['ed',0],['fashion',1],['cred',0]];
/* 3: [root, fix: 0 keep e, 1 drop e, 2 y to i, result, why] */
const JOIN=[['adore',1,'adorable','Drop the e before a vowel ending: ador + able.'],['notice',0,'noticeable','Keep the e: without it, c before a would sound hard, like cap.'],
 ['rely',2,'reliable','A y after a consonant turns to i: reli + able.'],['change',0,'changeable','Keep the e: without it, g before a would sound hard, like gap.'],
 ['value',1,'valuable','Drop the e before a vowel ending: valu + able.'],['manage',0,'manageable','Keep the e so the g still says j.']];
const FIXN=['keep e','drop e','y → i'];
/* 4: [stem, vowel a or i, clue] */
const VOW=[['ador','a','adoration ends in -ation, so -able.'],['forc','i','c before i stays soft, like force, so -ible.'],['toler','a','toleration ends in -ation, so -able.'],
 ['leg','i','g before i stays soft, so -ible.'],['consider','a','consideration ends in -ation, so -able.'],['applic','a','application ends in -ation, and the c is hard: -able.']];
/* 5: [adjective, adverb, the tempting wrong spelling] */
const ADV=[['comfortable','comfortably','comfortablely'],['possible','possibly','possiblely'],['terrible','terribly','terriblely'],['reasonable','reasonably','reasonablly'],['visible','visibly','visibley']];
/* 6: [word, 0 follows the root guide, 1 breaks it, why] */
const ODD=[['sensible',1,'sense is a whole word, yet it takes -ible.'],['enjoyable',0,'enjoy is a whole word, so -able. It follows the guide.'],
 ['capable',1,'capable has no whole root word (cap means something else), yet it takes -able.'],['flexible',1,'flex is a whole word, yet it takes -ible.'],
 ['visible',0,'vis is not a word, so -ible. It follows the guide.'],['accessible',1,'access is a whole word, yet it takes -ible.'],
 ['probable',1,'prob is not a word, yet it takes -able.'],['reliable',0,'rely is a whole word (y to i), so -able.']];
VIS.reg('flagible',c=>{let A,G,ctl,chal,qq=-1,epoch=0,lift=null;const st={};
const DARK='#0b1324',WHITE='#ffffff',RULE='#475569',GOOD='#15803d',OOPS='#b91c1c',BLUE='#1d4ed8',ABLE='#bfdbfe',IBLE='#fbcfe8',SOFT='#fef3c7';
const k=n=>Math.round(n*(A.narrow?1:1.12)),f=(n,w)=>`${w||700} ${k(n)}px system-ui,sans-serif`;
const STAGES=['root','spell','join','vow','adv','odd','chal'],stage=()=>STAGES[A.step],DATA={root:ROOT,spell:SPELL,join:JOIN,vow:VOW,adv:ADV,odd:ODD},spent=s=>st[s].i>=DATA[s].length;
const hit=(p,r)=>!!r&&p.x>=r.x&&p.y>=r.y&&p.x<=r.x+r.w&&p.y<=r.y+r.h;
function ground(){G.fillStyle=A.col.dark?'#111827':'#f8fafc';G.fillRect(0,0,A.W,A.H)}
function put(t,x,y,n,w,col){G.fillStyle=col||DARK;G.font=f(n,w);G.textAlign='center';G.textBaseline='middle';G.fillText(t,x,y,A.W-14)}
function box(r,t,o){o=o||{};G.fillStyle=o.fill||WHITE;A.paint.rrect(r.x,r.y,r.w,r.h,o.r||11);G.fill();G.lineWidth=o.edge?3.5:1.6;G.strokeStyle=o.edge||RULE;G.stroke();if(t!=null)put(t,r.x+r.w/2,r.y+r.h/2+1,o.n||22,o.w,o.col)}
function pill(t,ok){G.font=f(15,800);const w=Math.min(A.W-12,G.measureText(t).width+30),h=k(15)+16,y=A.H*.03;box({x:A.W/2-w/2,y,w,h},null,{fill:ok?'#dcfce7':WHITE,edge:ok?GOOD:null,r:h/2});put(t,A.W/2,y+h/2+1,15,800)}
const sub=(t,y)=>put(t,A.W/2,A.H*y,14,600,A.col.tx);
function wrapNote(m,y){if(!m)return;G.font=f(14);const out=[];let cur='';for(const w of m.split(' ')){const t=cur?cur+' '+w:w;if(G.measureText(t).width>A.W-28&&cur){out.push(cur);cur=w}else cur=t}out.push(cur);
 out.forEach((t,j)=>put(t,A.W/2,A.H*y+(j-(out.length-1)/2)*k(18),14,700,A.col.tx))}
function list(t,L){ground();pill(t,1);L.forEach((s,j)=>put(s,A.W/2,A.H*(.17+j*.105),16,700,A.col.tx))}
/* two big choice keys side by side */
function keys(y,h){const g=12,w=(A.W-3*g)/2;return[0,1].map(j=>({j,x:g+j*(w+g),y:A.H*y,w,h:k(h||58)}))}
/* a word drawn as one tile per part: [[text, fill]] centred */
function parts(P,y,n){n=n||26;G.font=f(n,800);const ws=P.map(([t])=>G.measureText(t).width+k(14)),tot=ws.reduce((a,b)=>a+b,0);let x=(A.W-tot)/2;
 return P.map(([t,fill],j)=>{const r={x,y:A.H*y,w:ws[j],h:k(n*2.2)};x+=ws[j];box(r,t,{fill,n,w:800,r:6});return r})}
/* ---- 1: is the root a whole word? ---- */
function drawRoot(){const s=st.root;if(spent('root'))return list('All 8 roots tested',ROOT.map(([r,w,full])=>`${r} → ${full}`));
 const [r]=ROOT[s.i];ground();pill(`Root ${s.i+1} of 8: whole word?`);sub('Cover the ending. Is what is left a real word?',.15);
 parts([[r,WHITE],['…ble','#e5e7eb']],.24);keys(.55,64).forEach(b=>box(b,b.j?'Not a word':'Whole word',{fill:b.j?IBLE:ABLE,n:18,edge:s.bad===b.j?OOPS:null}));wrapNote(s.m,.86)}
function test(j){const s=st.root;if(spent('root'))return;const [r,whole,full]=ROOT[s.i],ok=whole?0:1;
 if(j!==ok){s.bad=j;A.sound.miss();s.m=whole?`${r} is a word you can use on its own: I ${r} it. So it takes -able.`:`Can you say "${r}" on its own? No, it is only part of a word, so -ible.`;return voice(s.m)}
 s.i++;s.bad=null;s.m='';A.sound.pop();voice(`${whole?'Whole word':'Not a word'}: ${full}.`+(spent('root')?' All 8 tested.':''))}
/* ---- 2: drag the ending onto the root ---- */
function ends(){const w=k(96),g=16;return[1,0].map((v,j)=>({v,t:v?'able':'ible',x:A.W/2-w-g/2+j*(w+g),y:A.H*.6,w,h:k(56)}))}
function drawSpell(){const s=st.spell;if(spent('spell'))return list('All 6 spelled',SPELL.map(([r,a])=>r+(a?'able':'ible')));
 const [r]=SPELL[s.i];ground();pill(`Word ${s.i+1} of 6: drag an ending`);sub('Whole word → able. Not a word → ible.',.15);
 s.slot=parts([[r,WHITE],['  ?  ',SOFT]],.27)[1];ends().forEach(e=>{const l=lift&&lift.v===e.v;box(l?{...e,x:lift.x-e.w/2,y:lift.y-e.h/2}:e,e.t,{fill:e.v?ABLE:IBLE,edge:l?BLUE:s.bad===e.v?OOPS:null,n:22,w:800})});wrapNote(s.m,.87)}
function attach(v){const s=st.spell;if(spent('spell'))return;const [r,a]=SPELL[s.i];
 if(v!==a){s.bad=v;A.sound.miss();s.m=a?`${r} is a whole word on its own, so it takes -able.`:`${r} is not a word on its own, so it takes -ible.`;return voice(s.m)}
 s.i++;s.bad=null;s.m='';A.sound.pop();voice(r+(a?'able':'ible')+'.'+(spent('spell')?' All 6 spelled.':''))}
/* ---- 3: what happens at the join ---- */
function fixKeys(){const g=8,w=(A.W-4*g)/3;return FIXN.map((t,j)=>({j,t,x:g+j*(w+g),y:A.H*.58,w,h:k(56)}))}
function drawJoin(){const s=st.join;if(spent('join'))return list('All 6 joined',JOIN.map(([r,,w])=>`${r} + able → ${w}`));
 const [r]=JOIN[s.i];ground();pill(`Root ${s.i+1} of 6: ${r} + able`);sub('What happens to the last letter?',.15);
 parts([[r.slice(0,-1),WHITE],[r.slice(-1),SOFT],['able',ABLE]],.26);fixKeys().forEach(b=>box(b,b.t,{n:18,edge:s.bad===b.j?OOPS:null}));wrapNote(s.m,.86)}
function fix(j){const s=st.join;if(spent('join'))return;const [r,want,w,why]=JOIN[s.i];
 if(j!==want){s.bad=j;A.sound.miss();s.m=j===2?`${r} ends in e, not y.`:want===2?'rely ends in y after a consonant. Change y to i.':j===1?`${r.slice(0,-1)}able: ${why}`:`${r}able has an extra e. ${why}`;return voice(s.m)}
 s.i++;s.bad=null;s.m='';A.sound.pop();voice(`${w}. ${why}`+(spent('join')?' All 6 joined.':''))}
/* ---- 4: one letter decides: a or i ---- */
function drawVow(){const s=st.vow;if(spent('vow'))return list('All 6 decided',VOW.map(([t,v])=>t+v+'ble'));
 const [t]=VOW[s.i];ground();pill(`Word ${s.i+1} of 6: a or i?`);sub('-able and -ible differ by one letter. Tap it.',.15);
 parts([[t,WHITE],['?',SOFT],['ble',WHITE]],.26);keys(.58,62).forEach(b=>box(b,b.j?'i':'a',{fill:b.j?IBLE:ABLE,n:30,w:900,edge:s.bad===b.j?OOPS:null}));wrapNote(s.m,.86)}
function vowel(j){const s=st.vow;if(spent('vow'))return;const [t,v,why]=VOW[s.i],want=v==='a'?0:1;
 if(j!==want){s.bad=j;A.sound.miss();s.m=want?`${t}able would make the ${t.slice(-1)} hard, like cap or gap. ${why}`:`Think of a cousin word: ${why}`;return voice(s.m)}
 s.i++;s.bad=null;s.m='';A.sound.pop();voice(`${t}${v}ble: ${why}`+(spent('vow')?' All 6 decided.':''))}
/* ---- 5: adjective to adverb: three spellings ---- */
function advOpts(){const [,a,w]=ADV[st.adv.i],o=[[a,1],[w,0],[a.slice(0,-1)+'ey',0]].filter((x,j,L)=>L.findIndex(y=>y[0]===x[0])===j),r=st.adv.i%o.length;return o.slice(r).concat(o.slice(0,r))}
function advRects(){const o=advOpts(),g=8,h=k(42);return o.map(([t,ok],j)=>({t,ok,x:14,y:A.H*.38+j*(h+g),w:A.W-28,h}))}
function drawAdv(){const s=st.adv;if(spent('adv'))return list('All 5 adverbs',ADV.map(([a,b])=>`${a} → ${b}`));
 const [a]=ADV[s.i];ground();pill(`Word ${s.i+1} of 5: make the adverb`);sub('How did they do it? Tap the right spelling.',.15);
 parts([[a.slice(0,-1),a.includes('ible')?IBLE:ABLE],[a.slice(-1),SOFT]],.17,21);advRects().forEach(r=>box(r,r.t,{n:20,edge:s.bad===r.t?OOPS:null}));wrapNote(s.m,.93)}
function adverb(t){const s=st.adv;if(spent('adv'))return;const [a,b]=ADV[s.i];
 if(t!==b){s.bad=t;A.sound.miss();s.m=/lely$/.test(t)?`Not ${t}. Swap the final e for y: ${b}.`:`Only the last letter changes: ${a} → ${b}.`;return voice(s.m)}
 s.i++;s.bad=null;s.m='';A.sound.pop();voice(`${b}: the e becomes y.`+(spent('adv')?' All 5 done.':''))}
/* ---- 6: rule breakers ---- */
function trays(){const g=10,w=(A.W-3*g)/2;return[0,1].map(j=>({j,x:g+j*(w+g),y:A.H*.46,w,h:A.H*.5}))}
function deal(){G.font=f(22,800);const w=G.measureText(ODD[st.odd.i][0]).width+k(40);return{x:A.W/2-w/2,y:A.H*.14,w,h:k(54)}}
const TRAY=['Follows the guide','Rule breaker'];
function drawOdd(){const s=st.odd;ground();pill(spent('odd')?'All 8 sorted: check a dictionary':`Word ${s.i+1} of 8: guide or breaker?`,spent('odd'));
 trays().forEach(b=>{box(b,null,{fill:b.j?'#ede9fe':'#dcfce7',edge:s.bad===b.j?OOPS:RULE});G.fillStyle=DARK;G.font=f(14,800);G.textAlign='center';G.textBaseline='top';G.fillText(TRAY[b.j],b.x+b.w/2,b.y+8,b.w-8);
  G.font=f(14,600);ODD.slice(0,s.i).filter(x=>x[1]===b.j).forEach((x,m)=>G.fillText(x[0],b.x+b.w/2,b.y+k(32)+m*k(20),b.w-8))});
 if(!spent('odd')){const r=deal();box(lift&&lift.odd?{...r,x:lift.x-r.w/2,y:lift.y-r.h/2}:r,ODD[s.i][0],{n:22,w:800,edge:lift?BLUE:null})}wrapNote(s.m,.36)}
function sortOdd(j){const s=st.odd;if(spent('odd'))return;const [w,b,why]=ODD[s.i];if(j!==b){s.bad=j;A.sound.miss();s.m=why;return voice(why)}
 s.i++;s.bad=null;s.m='';A.sound.pop();voice(`${TRAY[b]}: ${why}`+(spent('odd')?' The guide works most of the time; a dictionary settles the rest.':''))}
/* ---- pointer ---- */
function down(p){const s=stage();if(s==='chal'||spent(s))return false;
 if(s==='root'){const b=keys(.55,64).find(r=>hit(p,r));if(b)test(b.j)}
 if(s==='spell'){const e=ends().find(r=>hit(p,r));if(e){lift={v:e.v,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}}
 if(s==='join'){const b=fixKeys().find(r=>hit(p,r));if(b)fix(b.j)}
 if(s==='vow'){const b=keys(.58,62).find(r=>hit(p,r));if(b)vowel(b.j)}
 if(s==='adv'){const r=advRects().find(r=>hit(p,r));if(r)adverb(r.t)}
 if(s==='odd'){if(hit(p,deal())){lift={odd:1,x:p.x,y:p.y};return true}const b=trays().find(r=>hit(p,r));if(b)sortOdd(b.j)}return false}
function move(p){if(lift){lift.x=p.x;lift.y=p.y;A.redraw()}}
function up(p){if(!lift)return;const l=lift;lift=null;
 if(l.v!=null){const sl=st.spell.slot;if(hit(p,sl&&{x:sl.x-20,y:sl.y-20,w:sl.w+40,h:sl.h+40})||Math.hypot(p.x-l.x0,p.y-l.y0)<8)attach(l.v);else A.redraw()}
 else if(l.odd){const b=trays().find(r=>hit(p,r));if(b)sortOdd(b.j);else A.redraw()}}
function wipe(){epoch++;lift=null;for(const s in st)delete st[s];Object.keys(DATA).forEach(s=>st[s]={i:0});st.ping=()=>{}}
function voice(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();st.ping()}
function enter(i,first,ready,line){wipe();voice(first);st.ping=()=>{if(A.step===i&&ready()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(line+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=epoch;acts.forEach((fn,j)=>setTimeout(()=>{if(me===epoch)fn()},ms*(j+1)))}
function pads(){if(!ctl)return;ctl.innerHTML='';const s=stage(),B=(t,fn,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=fn};if(s==='chal'||spent(s))return;
 if(s==='root'){const r=ROOT[st.root.i][0];B('Whole word',()=>test(0),`${r} is a whole word`);B('Not a word',()=>test(1),`${r} is not a word`)}
 if(s==='spell'){const r=SPELL[st.spell.i][0];B(r+'able',()=>attach(1),`Add able to ${r}`);B(r+'ible',()=>attach(0),`Add ible to ${r}`)}
 if(s==='join')FIXN.forEach((t,j)=>B(t,()=>fix(j),`${JOIN[st.join.i][0]}: ${t}`));
 if(s==='vow'){const t=VOW[st.vow.i][0];B(t+'able',()=>vowel(0),`Spell it ${t}able`);B(t+'ible',()=>vowel(1),`Spell it ${t}ible`)}
 if(s==='adv')advOpts().forEach(([t])=>B(t,()=>adverb(t),`Spell it ${t}`));
 if(s==='odd')TRAY.forEach((t,j)=>B(t,()=>sortOdd(j),`${ODD[st.odd.i][0]}: ${t}`))}
const steps=[
{h:'Test the root',p:'Say enjoyable and visible. The endings sound the same, so your ear cannot choose. Cover the ending: if a whole word is left, it is usually -able. If not, it is usually -ible.',
predict:{q:'Say -able and -ible out loud. Can you hear which one a word has?',opts:['Yes, they sound different','No, they sound the same'],ans:1},task:'Test all 8 roots',
show:()=>demo(0,ROOT.map(([,w])=>()=>test(w?0:1)),420),go:()=>enter(0,'enjoy. Is it a whole word?',()=>spent('root'),'Whole word: -able. Not a word: -ible.')},
{h:'Spell it',p:'Use the root test to pick the ending, then drag it onto the root.',task:'Spell all 6 words',
show:()=>demo(1,SPELL.map(([,a])=>()=>attach(a)),420),go:()=>enter(1,'break. Drag an ending onto it.',()=>spent('spell'),'The root test picks the ending.')},
{h:'Changes at the join',p:'Most roots ending in e drop it: adore → adorable. After a soft c or g, keep the e so the sound stays soft: noticeable, changeable. A y after a consonant turns to i: reliable.',
predict:{q:'notice + able. Which is right?',opts:['noticable','noticeable'],ans:1},task:'Join all 6 roots',
show:()=>demo(2,JOIN.map(([,j])=>()=>fix(j)),420),go:()=>enter(2,'adore plus able. What happens to the e?',()=>spent('join'),'Drop e, keep e after soft c or g, y to i.')},
{h:'Clue words',p:'Only one letter differs: a or i. If there is a related word ending in -ation, use -able. After a soft c or g with no e, use -ible: forcible, legible.',task:'Decide all 6 words',
show:()=>demo(3,VOW.map(([,v])=>()=>vowel(v==='a'?0:1)),420),go:()=>enter(3,'ador, question mark, ble. Tap a or i.',()=>spent('vow'),'-ation cousin: -able. Soft c or g: -ible.')},
{h:'-ably and -ibly',p:'To make an adverb, swap the final e for y: comfortable → comfortably, possible → possibly. Do not add -ly to the whole word.',
predict:{q:'possible → adverb?',opts:['possiblely','possibly'],ans:1},task:'Make all 5 adverbs',
show:()=>demo(4,ADV.map(([,b])=>()=>adverb(b)),420),go:()=>enter(4,'comfortable. Tap the adverb.',()=>spent('adv'),'The e becomes y.')},
{h:'Rule breakers',p:'The root test is a guide, not a law. Some words break it, like sensible. When in doubt, check a dictionary.',task:'Sort all 8 words',
show:()=>demo(5,ODD.map(([,b])=>()=>sortOdd(b)),400),go:()=>enter(5,'sensible. Does it follow the guide?',()=>spent('odd'),'Learn the breakers; check a dictionary.')},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.ping()});
const QS=[
{q:'Which is spelled correctly?',a:'dependable',o:[['dependible','rootwhole'],['dependeble','vowel']]},
{q:'Which is spelled correctly?',a:'horrible',o:[['horrable','rootpart'],['horribel','order']]},
{q:'Which is spelled correctly?',a:'noticeable',o:[['noticable','soft'],['noticible','soft2']]},
{q:'Which is spelled correctly?',a:'terribly',o:[['terriblely','lely'],['terribley','ey']]},
{q:'Which is spelled correctly?',a:'reliable',o:[['relyable','yi'],['relible','lost']]},
{q:'Which is spelled correctly?',a:'adorable',o:[['adoreable','keepe'],['adorible','ation']]}];
function reason(t){let m='Use the root test, then check the join.';
 switch(t){case 'rootwhole':m='depend is a whole word, so it takes -able.';break;
 case 'vowel':m='The ending is -able or -ible. There is no -eble.';break;
 case 'rootpart':m='horr is not a word on its own, so it takes -ible.';break;
 case 'order':m='The ending is -ble, not -bel.';break;
 case 'soft':m='Keep the e after c, or c before a would sound hard, like cap.';break;
 case 'soft2':m='notice is a whole word, so -able, keeping the e to keep c soft.';break;
 case 'lely':m='Do not add -ly to the whole word. Swap the final e for y.';break;
 case 'ey':m='The le ending becomes ly: terribly.';break;
 case 'yi':m='A y after a consonant turns to i before -able.';break;
 case 'lost':m='Keep the root: reli + able. The a of -able is missing.';break;
 case 'keepe':m='Drop the e of adore before -able. Only soft c or g keep it.';break;
 case 'ation':m='adoration ends in -ation, so the ending is -able.';break}
 return m}
function ask(){qq++;const Q=QS[qq%QS.length],all=[[Q.a,'ok'],...Q.o],r=qq%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>reply(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function reply(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+reason(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':reason(t))}
function draw(){const s=stage();if(s==='chal'){ground();pill('Challenge',1);['whole word → -able','not a word → -ible','-ation cousin → -able','e → y for -ably / -ibly'].forEach((t,j)=>put(t,A.W/2,A.H*(.3+j*.13),17,800,A.col.tx));return}
 ({root:drawRoot,spell:drawSpell,join:drawJoin,vow:drawVow,adv:drawAdv,odd:drawOdd})[s]();A.fx.draw(G)}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{chal.hidden=B.step!==6;ctl.hidden=B.step===6;pads()},
 init:B=>{A=B;G=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Spelling buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});pads()}}).start()})})();
