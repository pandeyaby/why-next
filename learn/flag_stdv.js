/* Flagship – Standard English verb forms (ages 8–9; NC England 2013 Year 4: "we were instead of we was, I did instead
   of I done"). was/were, did/done by the helper word, saw/seen pairs, swapping ain't, fixing a spoken recount, and
   when Standard English is expected. */
(()=>{
/* subject, 0 was / 1 were, why */
const WAS=[['I',0],['you (one friend)',1],['she',0],['we',1],['the dogs',1],['it',0],['they',1],['my dad',0],['you (the class)',1],['Sam and I',1]];
/* before, after, helper word or '', the right verb (0 did / 1 done) */
const DD=[['I','my homework.','',0],['I','my homework.','have',1],['She','a painting.','',0],['She','a painting.','has',1],['We','it yesterday.','',0],['They','it before.','had',1]];
/* past form, 0 on its own / 1 after has, have, had, its partner */
const PAIR=[['saw',0,'seen'],['gone',1,'went'],['did',0,'done'],['seen',1,'saw'],['went',0,'gone'],['done',1,'did'],['came',0,'come'],['written',1,'wrote'],['wrote',0,'written'],['come',1,'came']];
const AINT=[["We ain't ready.",'aren’t'],["I ain't got a pen.",'haven’t'],["She ain't here.",'isn’t'],["He ain't finished.",'hasn’t'],["They ain't seen it.",'haven’t'],["It ain't fair.",'isn’t']];
const AOPT=['isn’t','aren’t','hasn’t','haven’t'];
/* recount words; local form index -> Standard English */
const REC=['Yesterday','we','was','at','the','park.','Sam','done','a','cartwheel','and','I','seen','a','fox.','Then','Dad','come','to','get','us.'];
const FIX={2:'were',7:'did',12:'saw',17:'came'};
/* situation, 0 Standard English expected / 1 local form is fine */
const WHO=[['a report on volcanoes',0],['chatting with your cousin',1],['a letter to the head teacher',0],['what a character says in a story',1],['a talk in assembly',0],['playing football with friends',1]];
VIS.reg('flagstdv',c=>{let A,keys,chq,qk=-1,era=0;
const V={};
const DARK='#0f172a',GOOD='#047857',SLIP='#b91c1c',LINE='#64748b',MOVE='#4338ca',PAPER='#ffffff';
const WASC=['#fef3c7','#92400e'],WEREC=['#e0f2fe','#075985'],HELP=['#ede9fe','#5b21b6'],VERB=['#dcfce7','#14532d'];
const px=v=>Math.round(v*(A.narrow?.95:1.1)),type=(v,w)=>`${w||800} ${px(v)}px system-ui,sans-serif`;
const part=()=>['was','dd','pair','aint','rec','who','quiz'][A.step],on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function back(){const g=A.ctx;g.fillStyle=A.col.dark?'#0b1120':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function head(t,y,won){const g=A.ctx;let n=15;g.font=type(n);while(g.measureText(t).width+28>A.W-8&&n>10){n--;g.font=type(n)}
 const w=g.measureText(t).width+24,h=px(n)+15;g.fillStyle=won?'#d1fae5':PAPER;A.paint.rrect(A.W/2-w/2,y-h/2,w,h,10);g.fill();g.lineWidth=won?2.5:1.4;g.strokeStyle=won?GOOD:LINE;g.stroke();
 g.fillStyle=DARK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function pill(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||PAPER;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=o.rim?3.5:1.6;g.strokeStyle=o.rim||LINE;g.stroke();
 if(t==null)return;g.fillStyle=o.fg||DARK;g.font=type(o.n||19,o.w||800);g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-8)}
function line(t,y,n,col,w){const g=A.ctx;g.fillStyle=col||A.col.tx;g.font=type(n||15,w||600);g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y,A.W-14)}
const held=(r,j)=>{const h=V.hold;return h&&h.j===j?{...r,x:h.x-r.w/2,y:h.y-r.h/2}:r};
function trays(names,cols,y){const n=names.length,gp=8,w=(A.W-20-gp*(n-1))/n;return names.map((t,j)=>({x:10+j*(w+gp),y,w,h:A.H-y-8,t,j,c:cols[j]}))}
function drawTrays(list,names,cols,y,shown,bad,label){const g=A.ctx;trays(names,cols,y).forEach(b=>{g.fillStyle=b.c[0];A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=bad===b.j?SLIP:b.c[1];g.lineWidth=bad===b.j?4:2;g.stroke();
 g.fillStyle=DARK;g.textAlign='center';g.textBaseline='top';g.font=type(14,800);g.fillText(b.t,b.x+b.w/2,b.y+7,b.w-6);g.font=type(13,600);
 list.slice(0,shown).filter(x=>x[1]===b.j).forEach((x,i)=>g.fillText(label?label(x):x[0],b.x+b.w/2,b.y+px(28)+i*px(18),b.w-6))})}
const card=()=>{const w=Math.min(A.W-50,px(230));return{x:A.W/2-w/2,y:A.H*.16,w,h:px(54)}};
/* ---- 1: was or were ---- */
const WN=['was','were'];
function drawWas(){const s=V.was;back();head(s.n>=WAS.length?'All 10 sorted':`Subject ${s.n+1} of 10: was or were?`,A.H*.07,s.n>=WAS.length);
 drawTrays(WAS,WN,[WASC,WEREC],A.H*.42,s.n,s.bad,x=>`${x[0]} ${WN[x[1]]}`);if(s.n<WAS.length){pill(held(card(),0),WAS[s.n][0],{rim:V.hold?MOVE:null,n:22});if(!V.hold)line('Drag the subject to was or were',A.H*.16+px(70),13)}}
function was(j){const s=V.was;if(s.n>=WAS.length)return;const [w,k]=WAS[s.n];
 if(j!==k){s.bad=j;A.sound.miss();return say(k?(/you/.test(w)?`It is always you were, even for one person: ${w.split(' (')[0]} were.`:`${w} means more than one, so use were: ${w} were.`):`${w} is one person or thing, so use was: ${w} was.`)}
 s.n++;s.bad=null;A.sound.pop();say(`${w.split(' (')[0]} ${WN[k]}.`+(s.n>=WAS.length?' All 10 sorted.':''))}
/* ---- 2: did or done, with the helper lit or not ---- */
function ddParts(){const g=A.ctx,q=DD[V.dd.n],gap=px(90),h=px(54);g.font=type(20,700);const items=[q[0]].concat(q[2]?[q[2]]:[]),ws=items.map(t=>g.measureText(t).width+10);
 const tail=g.measureText(q[1]).width,tot=ws.reduce((a,b)=>a+b,0)+gap+(A.narrow?0:tail+8),x0=Math.max(8,A.W/2-tot/2);let x=x0;const out={y:A.H*.28,h,words:[]};
 items.forEach((t,i)=>{out.words.push({t,x,w:ws[i],helper:i===1});x+=ws[i]});out.gap={x,y:out.y,w:gap,h};x+=gap+8;out.tail=A.narrow?{x:A.W/2,y:out.y+h+px(24),c:1}:{x,y:out.y+h/2};return out}
const ddOpts=()=>{const w=Math.min(px(130),(A.W-30)/2),h=px(54);return['did','done'].map((t,j)=>({x:A.W/2+(j?8:-w-8),y:A.H*.68,w,h,t,j}))};
function drawDd(){const s=V.dd,g=A.ctx;back();if(s.n>=DD.length){head('All 6 sentences done',A.H*.07,1);DD.forEach((q,i)=>line(`${q[0]}${q[2]?' '+q[2]:''} ${q[3]?'done':'did'} ${q[1]}`,A.H*(.2+i*.12),16));return}
 const q=DD[s.n],P=ddParts();head(`Sentence ${s.n+1} of 6: did or done?`,A.H*.07);g.font=type(20,700);g.textBaseline='middle';
 P.words.forEach(w=>{if(w.helper){pill({x:w.x-2,y:P.y+8,w:w.w,h:P.h-16},w.t,{bg:HELP[0],fg:HELP[1],n:18})}else{g.fillStyle=A.col.tx;g.textAlign='left';g.fillText(w.t,w.x,P.y+P.h/2)}});
 pill(P.gap,'?',{rim:s.bad!=null?SLIP:MOVE,n:22});g.fillStyle=A.col.tx;g.font=type(20,700);g.textAlign=P.tail.c?'center':'left';g.fillText(q[1],P.tail.x,P.tail.y);
 line(q[2]?`Helper ${q[2]} is there.`:'No helper word.',A.H*.55,14,A.col.tx,700);ddOpts().forEach(r=>pill(held(r,r.j),r.t,{bg:VERB[0],fg:VERB[1],n:22,rim:V.hold&&V.hold.j===r.j?MOVE:s.bad===r.j?SLIP:null}))}
function dd(j){const s=V.dd;if(s.n>=DD.length)return;const [a,b,h,k]=DD[s.n];
 if(j!==k){s.bad=j;A.sound.miss();return say(k?`After ${h}, use done: ${a} ${h} done ${b} "${a} ${h} did" is not Standard English.`:`With no has, have or had, use did: ${a} did ${b}`)}
 s.n++;s.bad=null;A.sound.pop();say(`${a}${h?' '+h:''} ${k?'done':'did'} ${b}`+(s.n>=DD.length?' All 6 done.':''))}
/* ---- 3: on its own, or after a helper ---- */
const PN=['on its own: I saw','after has, have, had'];
function drawPair(){const s=V.pair;back();head(s.n>=PAIR.length?'All 10 sorted':`Verb ${s.n+1} of 10: where does it go?`,A.H*.07,s.n>=PAIR.length);
 drawTrays(PAIR,PN,[VERB,HELP],A.H*.42,s.n,s.bad,x=>x[1]?`have ${x[0]}`:`I ${x[0]}`);if(s.n<PAIR.length)pill(held(card(),0),PAIR[s.n][0],{rim:V.hold?MOVE:null,n:24})}
function pair(j){const s=V.pair;if(s.n>=PAIR.length)return;const [w,k,o]=PAIR[s.n];
 if(j!==k){s.bad=j;A.sound.miss();return say(k?`${w} needs a helper: I have ${w}. On its own, say I ${o}.`:`${w} stands on its own: I ${w}. After have, use ${o}.`)}
 s.n++;s.bad=null;A.sound.pop();say((k?`have ${w}`:`I ${w}`)+'.'+(s.n>=PAIR.length?' All 10 sorted.':''))}
/* ---- 4: swap ain't ---- */
function aOpts(){const gp=6,w=Math.min(px(90),(A.W-16-gp*3)/4),h=px(54),tot=4*w+3*gp;return AOPT.map((t,j)=>({x:A.W/2-tot/2+j*(w+gp),y:A.H*.64,w,h,t,j}))}
const aBox=()=>{const w=Math.min(A.W-30,px(300));return{x:A.W/2-w/2,y:A.H*.24,w,h:px(60)}};
function drawAint(){const s=V.aint;back();if(s.n>=AINT.length){head('All 6 swapped',A.H*.07,1);AINT.forEach((q,i)=>line(q[0].replace("ain't",q[1]),A.H*(.2+i*.12),17));return}
 head(`Sentence ${s.n+1} of 6: swap ain't`,A.H*.07);pill(aBox(),AINT[s.n][0],{bg:WASC[0],fg:WASC[1],n:20,rim:s.bad!=null?SLIP:null});line('Who is it? Is it be (is, are) or have?',A.H*.5,13);
 aOpts().forEach(r=>pill(held(r,r.j),r.t,{bg:WEREC[0],fg:WEREC[1],n:18,rim:V.hold&&V.hold.j===r.j?MOVE:s.bad===r.j?SLIP:null}))}
function aint(j){const s=V.aint;if(s.n>=AINT.length)return;const [t,ok]=AINT[s.n],pick=AOPT[j];
 if(pick!==ok){s.bad=j;A.sound.miss();const have=/got|finished|seen/.test(t);return say(have?`Here ain't means have: ${t.replace("ain't",ok)}`:`Here ain't means is or are: ${t.replace("ain't",ok)}`)}
 s.n++;s.bad=null;A.sound.pop();say(t.replace("ain't",ok)+(s.n>=AINT.length?' All 6 swapped.':''))}
/* ---- 5: catch the local forms ---- */
function recRects(){const g=A.ctx;g.font=type(17,700);const h=px(40),out=[];let row=[],y=A.H*.17,x=0;
 const put=()=>{const tot=row.reduce((a,r)=>a+r.w,0)+6*(row.length-1);let xx=A.W/2-tot/2;row.forEach(r=>{r.x=xx;xx+=r.w+6;out.push(r)});row=[]};
 REC.forEach((t,i)=>{const show=V.rec.fixed[i]?FIX[i]:t,w=g.measureText(show).width+16;if(x+w>A.W-14&&row.length){put();x=0;y+=h+8}row.push({x,y,w,h,t:show,i});x+=w+6});put();return out}
function drawRec(){const s=V.rec;back();const n=Object.keys(s.fixed).length;head(n>=4?'All 4 local forms fixed':`Tap the 4 local verbs (${n} found)`,A.H*.07,n>=4);
 recRects().forEach(r=>pill(r,r.t,{n:17,w:700,bg:s.fixed[r.i]?'#d1fae5':s.bad===r.i?'#ffe4e6':PAPER,fg:s.fixed[r.i]?GOOD:DARK,rim:s.fixed[r.i]?GOOD:s.bad===r.i?SLIP:null}));if(s.last)line(s.last,A.H*.88,15)}
function rec(i){const s=V.rec;if(Object.keys(s.fixed).length>=4)return;const w=REC[i].replace('.','');
 if(s.fixed[i])return;if(!(i in FIX)){s.bad=i;A.sound.miss();return say(w==='get'?'get is already Standard English.':/^(Yesterday|we|at|the|park|Sam|a|cartwheel|and|I|fox|Then|Dad|to|us)$/.test(w)?`${w} is not a verb. Look for the doing and being words.`:`${w} is already Standard English.`)}
 s.fixed[i]=1;s.bad=null;s.last=`${w} → ${FIX[i]}`;A.sound.pop();say(`${w} becomes ${FIX[i]}.`+(Object.keys(s.fixed).length>=4?' All 4 fixed.':''))}
/* ---- 6: who is listening? ---- */
const HN=['Standard English','local form is fine'];
function drawWho(){const s=V.who;back();head(s.n>=WHO.length?'All 6 decided':`Place ${s.n+1} of 6: which kind of English?`,A.H*.07,s.n>=WHO.length);
 drawTrays(WHO,HN,[WEREC,WASC],A.H*.45,s.n,s.bad);if(s.n<WHO.length){const r=card();pill(held({...r,w:Math.min(A.W-20,px(330)),x:A.W/2-Math.min(A.W-20,px(330))/2},0),WHO[s.n][0],{rim:V.hold?MOVE:null,n:17})}}
function who(j){const s=V.who;if(s.n>=WHO.length)return;const [t,k]=WHO[s.n];
 if(j!==k){s.bad=j;A.sound.miss();return say(k?`${t[0].toUpperCase()+t.slice(1)}: talk the way you and your listeners talk. Local forms are fine.`:`${t[0].toUpperCase()+t.slice(1)} is formal. Use Standard English so every reader understands.`)}
 s.n++;s.bad=null;A.sound.pop();say(`${t}: ${HN[k]}.`+(s.n>=WHO.length?' All 6 decided.':''))}
function draw(){const k=part();if(k==='quiz'){back();head('Challenge',A.H*.25,1);head('we were · I did · I have seen',A.H*.55);return}
 ({was:drawWas,dd:drawDd,pair:drawPair,aint:drawAint,rec:drawRec,who:drawWho})[k]();A.fx.draw(A.ctx)}
function press(p){const k=part(),lift=j=>{V.hold={j,x:p.x,y:p.y};return true};
 if(k==='was'&&V.was.n<WAS.length){if(on(p,card()))return lift(0);const b=trays(WN,[WASC,WEREC],A.H*.42).find(r=>on(p,r));if(b)was(b.j);return false}
 if(k==='dd'&&V.dd.n<DD.length){const r=ddOpts().find(r=>on(p,r));return r?lift(r.j):false}
 if(k==='pair'&&V.pair.n<PAIR.length){if(on(p,card()))return lift(0);const b=trays(PN,[VERB,HELP],A.H*.42).find(r=>on(p,r));if(b)pair(b.j);return false}
 if(k==='aint'&&V.aint.n<AINT.length){const r=aOpts().find(r=>on(p,r));return r?lift(r.j):false}
 if(k==='rec'){const r=recRects().find(r=>on(p,r));if(r)rec(r.i);return false}
 if(k==='who'&&V.who.n<WHO.length){if(p.y<A.H*.42&&p.y>A.H*.12)return lift(0);const b=trays(HN,[WEREC,WASC],A.H*.45).find(r=>on(p,r));if(b)who(b.j)}return false}
function slide(p){if(V.hold){V.hold.x=p.x;V.hold.y=p.y;A.redraw()}}
function release(p){const h=V.hold;if(!h)return;V.hold=null;const k=part();
 if(k==='was'){const b=trays(WN,[WASC,WEREC],A.H*.42).find(r=>on(p,r));if(b)was(b.j);else A.redraw();return}
 if(k==='pair'){const b=trays(PN,[VERB,HELP],A.H*.42).find(r=>on(p,r));if(b)pair(b.j);else A.redraw();return}
 if(k==='who'){const b=trays(HN,[WEREC,WASC],A.H*.45).find(r=>on(p,r));if(b)who(b.j);else A.redraw();return}
 if(k==='dd'){if(p.y<A.H*.6||on(p,ddOpts()[h.j]))dd(h.j);else A.redraw();return}
 if(k==='aint'){if(p.y<A.H*.58||on(p,aOpts()[h.j]))aint(h.j);else A.redraw()}}
function wipe(){era++;for(const k in V)delete V[k];Object.assign(V,{was:{n:0},dd:{n:0},pair:{n:0},aint:{n:0},rec:{fixed:{}},who:{n:0},hold:null,check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keypad();V.check()}
function open(i,desc,ok,msg){wipe();say(desc);V.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=era;acts.forEach((f,j)=>setTimeout(()=>{if(me===era)f()},ms*(j+1)))}
function keypad(){if(!keys)return;keys.innerHTML='';const k=part(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(k==='was'&&V.was.n<WAS.length)WN.forEach((t,j)=>b(t,()=>was(j),`${WAS[V.was.n][0]} ${t}`));
 if(k==='dd'&&V.dd.n<DD.length){const q=DD[V.dd.n];['did','done'].forEach((t,j)=>b(t,()=>dd(j),`${q[0]}${q[2]?' '+q[2]:''} ${t} ${q[1]}`))}
 if(k==='pair'&&V.pair.n<PAIR.length)PN.forEach((t,j)=>b(t,()=>pair(j),`${PAIR[V.pair.n][0]}: ${t}`));
 if(k==='aint'&&V.aint.n<AINT.length)AOPT.forEach((t,j)=>b(t,()=>aint(j),`Swap ain't for ${t}`));
 if(k==='rec'&&Object.keys(V.rec.fixed).length<4)REC.forEach((t,i)=>{if(!V.rec.fixed[i])b(t.replace('.',''),()=>rec(i),`${t.replace('.','')}: not Standard English`)});
 if(k==='who'&&V.who.n<WHO.length)HN.forEach((t,j)=>b(t,()=>who(j),`${WHO[V.who.n][0]}: ${t}`))}
const steps=[
{h:'was or were',p:'Standard English is the kind of English used in books and school writing. It uses was with I, he, she, it or one person. It uses were with we, they, more than one, and always with you. Drag each subject.',
predict:{q:'Talking to one friend: "You ___ brilliant!"',opts:['was','were'],ans:1},task:'Sort all 10 subjects',
show:()=>demo(0,WAS.map(x=>()=>was(x[1])),420),
go:()=>open(0,'I. Drag it to was or were.',()=>V.was.n>=WAS.length,'we was and you was are local forms. Write we were and you were.')},
{h:'did or done',p:'did stands on its own: I did it. done needs a helper word in front, has, have or had: I have done it. Look for the helper, then drag did or done into the gap.',
predict:{q:'"We ___ it yesterday." Which is Standard English?',opts:['done','did'],ans:1},task:'Finish all 6 sentences',
show:()=>demo(1,DD.map(q=>()=>dd(q[3])),600),
go:()=>open(1,'I, gap, my homework. No helper word. Drag did or done.',()=>V.dd.n>=DD.length,'No helper: did. After has, have or had: done.')},
{h:'Pairs that work the same way',p:'saw and seen, went and gone, came and come work like did and done. The first one stands on its own: I saw it. The second needs has, have or had: I have seen it.',task:'Sort all 10 verbs',
show:()=>demo(2,PAIR.map(x=>()=>pair(x[1])),420),
go:()=>open(2,'saw. Does it stand on its own, or come after has, have or had?',()=>V.pair.n>=PAIR.length,'I seen and he come are local forms. Write I saw and he came.')},
{h:'Swapping ain\'t',p:'ain\'t is a local form. In Standard English it can mean isn\'t, aren\'t, hasn\'t or haven\'t. Ask who it is about, and whether the sentence is about being or having.',task:'Swap all 6',
show:()=>demo(3,AINT.map(q=>()=>aint(AOPT.indexOf(q[1]))),600),
go:()=>open(3,"We ain't ready. Drag isn't, aren't, hasn't or haven't onto it.",()=>V.aint.n>=AINT.length,'be words: isn\'t, aren\'t. have words: hasn\'t, haven\'t.')},
{h:'Catch the local forms',p:'Here is how Ali told his news out loud. Four verbs are local forms. Tap each one to change it to Standard English for his school diary.',task:'Fix all 4',
show:()=>demo(4,Object.keys(FIX).map(i=>()=>rec(+i)),700),
go:()=>open(4,'Yesterday we was at the park. Sam done a cartwheel and I seen a fox. Then Dad come to get us. Tap the four local forms.',()=>Object.keys(V.rec.fixed).length>=4,'Yesterday we were at the park. Sam did a cartwheel and I saw a fox. Then Dad came.')},
{h:'Who is listening?',p:'Local forms are part of how many people talk. They are not mistakes in a chat. Standard English is expected when you write for school or speak to people you do not know well.',task:'Decide all 6',
show:()=>demo(5,WHO.map(x=>()=>who(x[1])),500),
go:()=>open(5,'a report on volcanoes. Standard English, or is a local form fine?',()=>V.who.n>=WHO.length,'Choose the English that fits who is reading or listening.')},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>V.check()});
const QS=[
{q:'Which sentence is Standard English?',a:'We were late.',o:[['We was late.','was'],['We is late.','be']]},
{q:'Which sentence is Standard English?',a:'She has done her best.',o:[['She has did her best.','over'],['She done her best.','helper']]},
{q:'Pick the Standard English: "I ___ a rainbow this morning."',a:'saw',o:[['seen','helper'],['have saw','over']]},
{q:'Pick the Standard English for one friend: "You ___ right."',a:'were',o:[['was','you'],['is','be']]},
{q:'"They ain\'t got time." In Standard English that is:',a:'They haven\'t got time.',o:[['They aren\'t got time.','aint'],['They hasn\'t got time.','agree']]},
{q:'Yesterday my gran ___ to visit.',a:'came',o:[['come','helper'],['has came','over']]}];
function slip(t){let m='Check the subject and look for a helper word.';
 switch(t){case 'was':m='we means more than one, so use were: we were.';break;
 case 'be':m='Check the tense: this happened in the past, so use was or were.';break;
 case 'over':m='After has, have or had, use the second form: has done, have seen, has come.';break;
 case 'helper':m='This form needs has, have or had in front. On its own, use did, saw or came.';break;
 case 'you':m='you always takes were, even for one person.';break;
 case 'aint':m='got shows this ain\'t means have, not are: haven\'t got.';break;
 case 'agree':m='they takes have, not has: they haven\'t.';break}
 return m}
function ask(){qk++;const Q=QS[qk%QS.length],all=[[Q.a,'ok'],...Q.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 chq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=chq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){chq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+slip(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.6,tall:1.12,draw,onStep:B=>{chq.hidden=B.step!==6;keys.hidden=B.step===6;keypad()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Verb buttons'},w);chq=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down:press,move:slide,up:release});keypad()}}).start()})})();
