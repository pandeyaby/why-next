/* Flagship – comparatives and superlatives (ages 8–9; NC England Y1–Y2 grammar: -er and -est on adjectives where no change
   to the root is needed, English Appendix 2; Common Core L.3.1g "form and use comparative and superlative adjectives and
   adverbs, and choose between them depending on what is to be modified"). Compare two towers or a whole row, choose -er
   or more by counting syllables, fill in the rule-breakers (good, better, best), pick the adverb form, and delete the
   extra word in "more taller". */
(()=>{
/* how many towers, heights, which tower the sentence is about (others are compared), base word, right form, wrong forms */
const TOW=[[2,[60,90],1,'tall','taller',['tallest','tall']],[3,[50,95,70],1,'tall','tallest',['taller','tall']],[2,[80,40],1,'short','shorter',['shortest','short']],
 [3,[85,30,55],1,'short','shortest',['shorter','more short']],[3,[40,65,90],2,'big','biggest',['bigger','most big']]];
/* adjective, syllables, 0 = add -er, 1 = use more; the form it takes */
const SYL=[['cold',1,0,'colder'],['beautiful',3,1,'more beautiful'],['quick',1,0,'quicker'],['careful',2,1,'more careful'],['happy',2,0,'happier'],['dangerous',3,1,'more dangerous'],['big',1,0,'bigger'],['famous',2,1,'more famous']];
/* irregular: base, comparative, superlative; which cell is blank (1 or 2), wrong tile */
const IRR=[['good','better','best',1,'gooder'],['bad','worse','worst',2,'baddest'],['many','more','most',1,'manier'],['good','better','best',2,'goodest'],['far','further','furthest',2,'farest']];
/* sentence with ___, right adverb form, wrong form, why */
const ADV=[['She runs ___ than her brother.','faster','more fast','fast is one syllable: fast, faster'],['He writes ___ than me.','more carefully','carefullier','carefully ends in -ly, so use more'],
 ['Of the three, Mo sings the ___.','most loudly','loudliest','loudly ends in -ly, so use most'],['I can kick ___ than you.','harder','more hard','hard takes -er: hard, harder'],['Jo played ___ today than yesterday.','better','gooder','well becomes better']];
/* words of a sentence, index of the extra word to delete */
const DUP=[['Sam','is','more','taller','than','me.',2],['That','is','the','most','biggest','cake.',3],['This','one','is','more','better.',3],['She','is','the','most','fastest','runner.',3]];
VIS.reg('flagcmpsup',c=>{let A,ctl,chal,qn=-1,tok=0;
const K={};
const INK='#111827',OKC='#047857',ERR='#b91c1c',EDGE='#6b7280',DRAG='#1d4ed8',TOWC=['#7c3aed','#0e7490','#c2410c'],NAMES=['A','B','C'],PAPER='#ffffff',TAG='#ede9fe',TAGI='#5b21b6';
const fs=v=>Math.round(v*(A.narrow?.95:1.1)),ff=(v,w)=>`${w||700} ${fs(v)}px system-ui,sans-serif`;
const now=()=>['tow','syl','irr','adv','dup','quiz'][A.step],inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function bg(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#faf5ff';g.fillRect(0,0,A.W,A.H)}
function head(t,y,ok){const g=A.ctx;let n=15;g.font=ff(n,800);while(g.measureText(t).width+30>A.W-8&&n>10){n--;g.font=ff(n,800)}
 const w=g.measureText(t).width+26,h=fs(n)+16;g.fillStyle=ok?'#d1fae5':PAPER;A.paint.rrect(A.W/2-w/2,y-h/2,w,h,8);g.fill();g.lineWidth=ok?2.5:1.5;g.strokeStyle=ok?OKC:EDGE;g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function card(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||PAPER;A.paint.rrect(r.x,r.y,r.w,r.h,8);g.fill();g.lineWidth=o.edge?3.5:1.8;g.strokeStyle=o.edge||EDGE;g.stroke();
 if(t==null)return;g.fillStyle=o.ink||INK;g.font=ff(o.n||20,800);g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-8)}
function say1(t,y,n){const g=A.ctx;g.fillStyle=A.col.tx;g.font=ff(n||15,600);g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y,A.W-12)}
function opts(list,y){const n=list.length,w=Math.min(fs(150),(A.W-20-(n-1)*8)/n),h=fs(52);return list.map((t,j)=>({x:A.W/2-(n*w+(n-1)*8)/2+j*(w+8),y,w,h,t,j}))}
/* ---- 1: two towers or a whole row ---- */
const towOrder=n=>{const q=TOW[n],all=[q[4],...q[5]],r=n%3;return all.slice(r).concat(all.slice(0,r))};
function towSentence(n){const [cnt,,who,base]=TOW[n];return cnt===2?`Tower ${NAMES[who]} is ___ than tower ${NAMES[1-who]}.`:`Tower ${NAMES[who]} is the ___ of all ${cnt}.`}
function drawTow(){const s=K.a,g=A.ctx;bg();if(s.n>=TOW.length){head('All 5 sentences right',A.H*.08,1);say1('Two things: -er + than. Three or more: the + -est.',A.H*.3,16);say1('taller than · the tallest · bigger · the biggest',A.H*.45,16);return}
 const [cnt,hs,who]=TOW[s.n];head(`Picture ${s.n+1} of 5: ${cnt} towers`,A.H*.07);
 const base=A.H*.5,unit=(A.H*.34)/100,w=Math.min(fs(64),A.W/(cnt*2.2));
 hs.forEach((h,i)=>{const x=A.W/2+(i-(cnt-1)/2)*w*1.8-w/2,top=base-h*unit;g.fillStyle=TOWC[i];A.paint.rrect(x,top,w,h*unit,4);g.fill();if(i===who){g.lineWidth=4;g.strokeStyle=A.col.dark?'#fde68a':'#111827';g.stroke()}
  g.fillStyle=A.col.tx;g.font=ff(15,800);g.textAlign='center';g.textBaseline='top';g.fillText(NAMES[i],x+w/2,base+4)});
 say1(towSentence(s.n),A.H*.62,16);const d=K.drag;
 opts(towOrder(s.n),A.H*.7).forEach(r=>card(d&&d.j===r.j?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,r.t,{bg:TAG,ink:TAGI,edge:d&&d.j===r.j?DRAG:s.bad===r.t?ERR:null}))}
function tow(v){const s=K.a;if(s.n>=TOW.length)return;const [cnt,,,base,ok]=TOW[s.n];
 if(v!==ok){s.bad=v;A.sound.miss();return tell(v===base?`${base} on its own does not compare. Add -er or -est.`:v.startsWith('more')||v.startsWith('most')?`${base} is one syllable, so it takes an ending, not ${v.split(' ')[0]}.`:cnt===2?`Only two towers, so compare them with -er and than: ${ok}.`:`${cnt} towers, so pick out one with the and -est: the ${ok}.`)}
 s.n++;s.bad=null;A.sound.pop();tell(towSentence(s.n-1).replace('___',ok)+(s.n>=TOW.length?' All 5 done.':''))}
/* ---- 2: count syllables, then -er or more ---- */
const pots=()=>{const w=(A.W-30)/2;return['add -er / -est','use more / most'].map((t,j)=>({x:10+j*(w+10),y:A.H*.44,w,h:A.H*.52,t,j}))};
const sylCard=()=>{const w=Math.min(A.W-60,fs(200));return{x:A.W/2-w/2,y:A.H*.2,w,h:fs(56)}};
function drawSyl(){const s=K.b,g=A.ctx;bg();head(s.n>=SYL.length?'All 8 sorted':`Word ${s.n+1} of 8: clap it, then choose`,A.H*.07,s.n>=SYL.length);
 pots().forEach(b=>{g.fillStyle=A.col.dark?'#ede9fe':'#f5f3ff';A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.strokeStyle=s.bad===b.j?ERR:'#6d28d9';g.lineWidth=s.bad===b.j?4:2;g.stroke();
  g.fillStyle=INK;g.textAlign='center';g.textBaseline='top';g.font=ff(14,800);g.fillText(b.t,b.x+b.w/2,b.y+8,b.w-6);g.font=ff(14,600);
  SYL.slice(0,s.n).filter(x=>x[2]===b.j).forEach((x,i)=>g.fillText(x[3],b.x+b.w/2,b.y+fs(32)+i*fs(22),b.w-6))});
 if(s.n<SYL.length){const d=K.drag,r=sylCard(),q=SYL[s.n];card(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,q[0],{edge:d?DRAG:null,n:24});if(!d)say1(`${q[1]} syllable${q[1]>1?'s':''}`+(q[0].endsWith('y')?', ends in y':''),r.y+r.h+fs(16),14)}}
function syl(j){const s=K.b;if(s.n>=SYL.length)return;const [w,n,k,form]=SYL[s.n];
 if(j!==k){s.bad=j;A.sound.miss();return tell(k?`${w} has ${n} syllables. Long words take more: ${form}, not ${w}er.`:w.endsWith('y')?`${w} has 2 syllables but ends in y, so change y to i and add -er: ${form}.`:`${w} has 1 syllable, so add -er: ${form}. more ${w} sounds wrong.`)}
 s.n++;s.bad=null;A.sound.pop();tell(`${w}: ${form}.`+(s.n>=SYL.length?' All 8 sorted.':''))}
/* ---- 3: rule-breakers ---- */
function irrCells(){const w=Math.min(fs(110),(A.W-36)/3),h=fs(56),y=A.H*.3;return[0,1,2].map(i=>({x:A.W/2-(3*w+16)/2+i*(w+8),y,w,h,i}))}
const irrOrder=n=>{const q=IRR[n],ok=q[q[3]];return n%2?[q[4],ok]:[ok,q[4]]};
function drawIrr(){const s=K.c,g=A.ctx;bg();if(s.n>=IRR.length){head('All 5 rule-breakers filled',A.H*.08,1);['good, better, best','bad, worse, worst','many, more, most','far, further, furthest'].forEach((t,i)=>head(t,A.H*(.26+i*.16),1));return}
 const q=IRR[s.n];head(`Row ${s.n+1} of 5: fill the gap`,A.H*.08);g.fillStyle=A.col.tx;g.font=ff(13,700);g.textAlign='center';
 const cells=irrCells();['word','compare 2','the most of all'].forEach((t,i)=>g.fillText(t,cells[i].x+cells[i].w/2,cells[i].y-12));
 cells.forEach(r=>r.i===q[3]?card(r,'?',{bg:A.col.dark?'#1f2937':'#f3f4f6',ink:A.col.tx,edge:s.bad?ERR:null}):card(r,q[r.i]));const d=K.drag;
 opts(irrOrder(s.n),A.H*.62).forEach(r=>card(d&&d.j===r.j?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,r.t,{bg:TAG,ink:TAGI,edge:d&&d.j===r.j?DRAG:null}))}
function irr(v){const s=K.c;if(s.n>=IRR.length)return;const q=IRR[s.n],ok=q[q[3]];
 if(v!==ok){s.bad=1;A.sound.miss();return tell(`${v} is not a word. ${q[0]} breaks the rule: ${q[0]}, ${q[1]}, ${q[2]}.`)}
 s.n++;s.bad=0;A.sound.pop();tell(`${q[0]}, ${q[1]}, ${q[2]}.`+(s.n>=IRR.length?' All 5 done.':''))}
/* ---- 4: adverbs ---- */
const advOrder=n=>n%2?[ADV[n][2],ADV[n][1]]:[ADV[n][1],ADV[n][2]];
function wrapText(t,y){const g=A.ctx;g.font=ff(18,700);g.fillStyle=A.col.tx;g.textAlign='center';g.textBaseline='middle';const rows=[''];t.split(' ').forEach(w=>{const z=rows[rows.length-1]?rows[rows.length-1]+' '+w:w;if(g.measureText(z).width>A.W-24)rows.push(w);else rows[rows.length-1]=z});rows.forEach((l,k)=>g.fillText(l,A.W/2,y+k*fs(26)))}
function drawAdv(){const s=K.d;bg();if(s.n>=ADV.length){head('All 5 adverbs right',A.H*.07,1);ADV.forEach((q,i)=>head(q[0].replace('___',q[1]),A.H*(.2+i*.15),1));return}
 head(`Sentence ${s.n+1} of 5: how is it done?`,A.H*.08);wrapText(ADV[s.n][0],A.H*.3);opts(advOrder(s.n),A.H*.6).forEach(r=>card(r,r.t,{bg:TAG,ink:TAGI,edge:s.bad===r.t?ERR:null,n:18}))}
function adv(v){const s=K.d;if(s.n>=ADV.length)return;const [t,ok,,why]=ADV[s.n];
 if(v!==ok){s.bad=v;A.sound.miss();return tell(`${v} is not right here: ${why}. ${t.replace('___',ok)}`)}
 s.n++;s.bad=null;A.sound.pop();tell(t.replace('___',ok)+(s.n>=ADV.length?' All 5 done.':''))}
/* ---- 5: delete the extra word ---- */
function dupRects(n){const g=A.ctx,ws=DUP[n].slice(0,-1);g.font=ff(19,800);const h=fs(50),out=[];let line=[],y=A.H*.32,x=0;
 const put=()=>{const tot=line.reduce((a,r)=>a+r.w,0)+8*(line.length-1);let xx=A.W/2-tot/2;line.forEach(r=>{r.x=xx;xx+=r.w+8;out.push(r)});line=[]};
 ws.forEach((t,i)=>{const w=g.measureText(t).width+22;if(x+w>A.W-16&&line.length){put();x=0;y+=h+10}line.push({x,y,w,h,t,i});x+=w+8});put();return out}
function drawDup(){const s=K.e;bg();if(s.n>=DUP.length){head('All 4 fixed: one way to compare, not two',A.H*.08,1);DUP.forEach((q,i)=>head(q.slice(0,-1).filter((w,k)=>k!==q[q.length-1]).join(' '),A.H*(.26+i*.16),1));return}
 head(`Sentence ${s.n+1} of 4: tap the extra word`,A.H*.08);dupRects(s.n).forEach(r=>card(r,r.t,{n:19,edge:s.bad===r.i?ERR:null,bg:s.bad===r.i?'#fee2e2':PAPER}))}
function dup(i){const s=K.e;if(s.n>=DUP.length)return;const q=DUP[s.n],k=q[q.length-1],ws=q.slice(0,-1);
 if(i!==k){s.bad=i;A.sound.miss();return tell(`${ws[i].replace('.','')} is needed. Look for two words that both compare: ${ws[k]} and ${ws[k+1].replace('.','')}.`)}
 s.n++;s.bad=null;A.sound.pop();tell(`${ws[k+1].replace('.','')} already compares, so ${ws[k]} goes.`+(s.n>=DUP.length?' All 4 fixed.':''))}
function draw(){const k=now();if(k==='quiz'){bg();head('Challenge',A.H*.25,1);head('-er · -est · more · most',A.H*.55);return}
 ({tow:drawTow,syl:drawSyl,irr:drawIrr,adv:drawAdv,dup:drawDup})[k]();A.fx.draw(A.ctx)}
function down(p){const k=now();
 if(k==='tow'&&K.a.n<TOW.length){const r=opts(towOrder(K.a.n),A.H*.7).find(r=>inR(p,r));if(r){K.drag={j:r.j,x:p.x,y:p.y};return true}return false}
 if(k==='syl'&&K.b.n<SYL.length){if(inR(p,sylCard())){K.drag={x:p.x,y:p.y};return true}const b=pots().find(r=>inR(p,r));if(b)syl(b.j);return false}
 if(k==='irr'&&K.c.n<IRR.length){const r=opts(irrOrder(K.c.n),A.H*.62).find(r=>inR(p,r));if(r){K.drag={j:r.j,x:p.x,y:p.y};return true}return false}
 if(k==='adv'&&K.d.n<ADV.length){const r=opts(advOrder(K.d.n),A.H*.6).find(r=>inR(p,r));if(r)adv(r.t);return false}
 if(k==='dup'&&K.e.n<DUP.length){const r=dupRects(K.e.n).find(r=>inR(p,r));if(r)dup(r.i)}return false}
function move(p){if(K.drag){K.drag.x=p.x;K.drag.y=p.y;A.redraw()}}
function up(p){const d=K.drag;if(!d)return;K.drag=null;const k=now();
 if(k==='tow'){const r=opts(towOrder(K.a.n),A.H*.7)[d.j];if(p.y<A.H*.68||inR(p,r))tow(r.t);else A.redraw();return}
 if(k==='syl'){const b=pots().find(r=>inR(p,r));if(b)syl(b.j);else A.redraw();return}
 if(k==='irr'){const r=opts(irrOrder(K.c.n),A.H*.62)[d.j];if(p.y<A.H*.55||inR(p,r))irr(r.t);else A.redraw()}}
function wipe(){tok++;for(const k in K)delete K[k];Object.assign(K,{a:{n:0},b:{n:0},c:{n:0},d:{n:0},e:{n:0},drag:null,after:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();fill();K.after()}
function enter(i,desc,ok,msg){wipe();tell(desc);K.after=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function play(i,acts,ms){steps[i].go();const me=tok;acts.forEach((f,j)=>setTimeout(()=>{if(me===tok)f()},ms*(j+1)))}
function fill(){if(!ctl)return;ctl.innerHTML='';const k=now(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='tow'&&K.a.n<TOW.length)towOrder(K.a.n).forEach(v=>b(v,()=>tow(v),`Fill the gap with ${v}`));
 if(k==='syl'&&K.b.n<SYL.length)['add -er / -est','use more / most'].forEach((t,j)=>b(t,()=>syl(j),`${SYL[K.b.n][0]}: ${t}`));
 if(k==='irr'&&K.c.n<IRR.length)irrOrder(K.c.n).forEach(v=>b(v,()=>irr(v),`Fill the gap with ${v}`));
 if(k==='adv'&&K.d.n<ADV.length)advOrder(K.d.n).forEach(v=>b(v,()=>adv(v),`Fill the gap with ${v}`));
 if(k==='dup'&&K.e.n<DUP.length)DUP[K.e.n].slice(0,-1).forEach((t,i)=>b(t.replace('.',''),()=>dup(i),`Delete ${t.replace('.','')}`))}
const steps=[
{h:'Two or more?',p:'Compare two things with -er and than: taller than. Pick one out of three or more with the and -est: the tallest. Drag the right word into the sentence.',
predict:{q:'Three towers. B is the highest. Is B taller or the tallest?',opts:['taller','the tallest'],ans:1},task:'Finish all 5 sentences',
show:()=>play(0,TOW.map(q=>()=>tow(q[4])),600),
go:()=>enter(0,'Two towers. Tower B is ___ than tower A.',()=>K.a.n>=TOW.length,'-er compares two. -est picks one out of a group.')},
{h:'-er or more?',p:'Clap the word. Short words (1 syllable) add -er and -est. Long words (3 or more) use more and most. Words like happy end in y and add -er after y turns to i.',
predict:{q:'Which is right?',opts:['beautifuller','more beautiful'],ans:1},task:'Sort all 8 words',
show:()=>play(1,SYL.map(x=>()=>syl(x[2])),420),
go:()=>enter(1,'cold. Boxes: add -er, or use more.',()=>K.b.n>=SYL.length,'Count the syllables to choose between -er and more.')},
{h:'Rule-breakers',p:'A few words change completely: good, better, best. bad, worse, worst. Fill the gap in each row.',task:'Fill all 5 rows',
show:()=>play(2,IRR.map(q=>()=>irr(q[q[3]])),600),
go:()=>enter(2,'good, ?, best. Choices: better or gooder.',()=>K.c.n>=IRR.length,'gooder, baddest and manier are not words.')},
{h:'Comparing actions',p:'Adverbs compare too. Most -ly adverbs use more and most: more carefully. A few short ones take -er: fast, faster. well becomes better.',
predict:{q:'She runs ___ than her brother.',opts:['more fast','faster'],ans:1},task:'Finish all 5 sentences',
show:()=>play(3,ADV.map(q=>()=>adv(q[1])),600),
go:()=>enter(3,'She runs ___ than her brother. Choices: faster or more fast.',()=>K.d.n>=ADV.length,'-ly adverbs take more. Short adverbs take -er.')},
{h:'One, not two',p:'Use -er or more, never both. more taller compares twice. Tap the extra word to delete it.',task:'Fix all 4 sentences',
show:()=>play(4,DUP.map(q=>()=>dup(q[q.length-1])),600),
go:()=>enter(4,'Sam is more taller than me. Tap the extra word.',()=>K.e.n>=DUP.length,'taller already means more tall.')},
{h:'Challenge',p:'',go:()=>{wipe();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>K.after()});
const QS=[
{q:'Mia and Leo raced. Mia won. Mia was ___.',a:'faster than Leo',o:[['the fastest than Leo','group'],['more faster than Leo','double']]},
{q:'Which is right?',a:'more beautiful',o:[['beautifuller','long'],['most beautifuller','double']]},
{q:'This is the ___ cake I have ever had!',a:'best',o:[['goodest','irreg'],['most good','irreg']]},
{q:'The puppy is ___ than the kitten.',a:'bigger',o:[['biger','spell'],['more big','short']]},
{q:'Of all the class, Zoe is the ___.',a:'happiest',o:[['happyest','yrule'],['happier','pair']]},
{q:'He reads ___ than his sister.',a:'more slowly',o:[['slowlier','ly'],['more slowlier','double']]}];
function slip(t){let m='Count how many things you compare, then count syllables.';
 switch(t){case 'group':m='Only two racers, and "than" needs -er: faster than.';break;
 case 'double':m='That compares twice. Use -er or more, not both.';break;
 case 'long':m='beautiful has 3 syllables, so use more: more beautiful.';break;
 case 'irreg':m='good breaks the rule: good, better, best.';break;
 case 'spell':m='big ends in one vowel then one consonant, so double the g: bigger.';break;
 case 'short':m='big has 1 syllable, so add -er, not more.';break;
 case 'yrule':m='Change y to i before -est: happiest.';break;
 case 'pair':m='The whole class is more than two, so use the and -est.';break;
 case 'ly':m='slowly ends in -ly, so use more: more slowly.';break}
 return m}
function quiz(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function score(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:B=>{chal.hidden=B.step!==5;ctl.hidden=B.step===5;fill()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Comparing buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});fill()}}).start()})})();
