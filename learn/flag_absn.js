/* Flagship – abstract nouns (ages 8–9; Common Core L.3.1c "use abstract nouns (e.g., childhood)"; NC England Y2 Appendix 2:
   forming nouns with suffixes such as -ness and -er; Y3–4 word families). Sort nouns by the touch test, build abstract
   nouns from a describing word plus -ness, -ment, -hood, -ship or -dom, choose noun or adjective for a gap, find the
   abstract noun in a sentence, and group abstract nouns into feelings, qualities and states. */
(()=>{
const TOUCH=[['table',0],['courage',1],['pencil',0],['freedom',1],['puppy',0],['joy',1],['river',0],['honesty',1]];
/* base word, suffix it takes, the noun, a note when the spelling changes */
const BUILD=[['kind','ness','kindness',''],['enjoy','ment','enjoyment',''],['child','hood','childhood',''],['friend','ship','friendship',''],['free','dom','freedom',''],['happy','ness','happiness','y turns to i']];
const SUFS=['ness','ment','hood','ship','dom'];
/* sentence with ___, the right word, the other form, 1 if the gap needs a noun */
const GAP=[['Her ___ helped the whole team.','bravery','brave',1],['We felt ___ when we won.','proud','pride',0],['Thank you for your ___.','kindness','kind',1],
 ['The children were ___.','happy','happiness',0],['He told the truth. I like his ___.','honesty','honest',1]];
/* sentence words, index of the abstract noun, indexes of concrete nouns in it */
const SPOT=[[['The','children','shouted','with','joy.'],4,[1]],[['Ella','showed','great','patience','with','the','puppy.'],3,[0,6]],
 [['Fear','made','the','cat','hide','under','the','bed.'],0,[3,7]],[['Our','friendship','began','at','school.'],1,[4]],[['Tom','felt','anger','when','his','bike','broke.'],2,[0,5]]];
const KINDS=[['joy',0],['honesty',1],['childhood',2],['fear',0],['patience',1],['freedom',2],['anger',0],['kindness',1],['peace',2]],KBOX=['feeling','quality','time or state'];
VIS.reg('flagabsn',c=>{let A,tray,cq,qi=-1,ver=0;
const G={};
const TXT='#0c0a09',RIGHT='#15803d',WRONG='#be123c',RULE='#64748b',GRAB='#2563eb',SOLID='#fef3c7',SOLIDI='#92400e',IDEA='#ede9fe',IDEAI='#5b21b6',CHIP='#cffafe',CHIPI='#155e75';
const k1=v=>Math.round(v*(A.narrow?.96:1.1)),fnt=(v,w)=>`${w||800} ${k1(v)}px system-ui,sans-serif`;
const part=()=>['touch','build','gap','spot','kind','quiz'][A.step],inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function base(){const g=A.ctx;g.fillStyle=A.col.dark?'#0f172a':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function title(t,y,won){const g=A.ctx;let n=15;g.font=fnt(n);while(g.measureText(t).width+30>A.W-8&&n>10){n--;g.font=fnt(n)}
 const w=g.measureText(t).width+26,h=k1(n)+16;g.fillStyle=won?'#dcfce7':'#ffffff';A.paint.rrect(A.W/2-w/2,y-h/2,w,h,9);g.fill();g.lineWidth=won?2.5:1.5;g.strokeStyle=won?RIGHT:RULE;g.stroke();
 g.fillStyle=TXT;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function chip(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.lineWidth=o.edge?3.5:1.8;g.strokeStyle=o.edge||RULE;g.stroke();
 if(t==null)return;g.fillStyle=o.ink||TXT;g.font=fnt(o.n||20,800);g.textAlign='center';g.textBaseline='middle';g.fillText(t,r.x+r.w/2,r.y+r.h/2+1,r.w-8)}
function caption(t,y,n){const g=A.ctx;g.fillStyle=A.col.tx;g.font=fnt(n||15,600);g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y,A.W-12)}
const dragged=(r,j)=>{const d=G.hold;return d&&d.j===j?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r};
/* boxes across the bottom of the canvas */
function bins(names,y){const n=names.length,gap=8,w=(A.W-20-gap*(n-1))/n;return names.map((t,j)=>({x:10+j*(w+gap),y,w,h:A.H-y-8,t,j}))}
function drawBins(list,names,y,filled,bad,cols){const g=A.ctx;bins(names,y).forEach(b=>{g.fillStyle=cols[b.j][0];A.paint.rrect(b.x,b.y,b.w,b.h,10);g.fill();g.strokeStyle=bad===b.j?WRONG:cols[b.j][1];g.lineWidth=bad===b.j?4:2;g.stroke();
 g.fillStyle=TXT;g.textAlign='center';g.textBaseline='top';g.font=fnt(13,800);g.fillText(b.t,b.x+b.w/2,b.y+7,b.w-6);g.font=fnt(14,600);
 list.slice(0,filled).filter(x=>x[1]===b.j).forEach((x,i)=>g.fillText(x[0],b.x+b.w/2,b.y+k1(28)+i*k1(20),b.w-6))})}
const cardAt=()=>{const w=Math.min(A.W-60,k1(190));return{x:A.W/2-w/2,y:A.H*.17,w,h:k1(54)}};
/* ---- 1: the touch test ---- */
const TNAMES=['concrete: touch it','abstract: cannot'],TCOL=[[SOLID,'#b45309'],[IDEA,'#6d28d9']];
function drawTouch(){const s=G.touch;base();title(s.n>=TOUCH.length?'All 8 sorted':`Noun ${s.n+1} of 8: can you touch it?`,A.H*.07,s.n>=TOUCH.length);
 drawBins(TOUCH,TNAMES,A.H*.42,s.n,s.bad,TCOL);if(s.n<TOUCH.length){chip(dragged(cardAt(),0),TOUCH[s.n][0],{edge:G.hold?GRAB:null,n:24});if(!G.hold)caption('Drag it to a box',A.H*.17+k1(70),13)}}
function touch(j){const s=G.touch;if(s.n>=TOUCH.length)return;const [w,k]=TOUCH[s.n];
 if(j!==k){s.bad=j;A.sound.miss();return report(k?`You cannot see, hear or hold ${w}. It names an idea or feeling, so it is an abstract noun.`:`You can see and touch a ${w}. It is a concrete noun.`)}
 s.n++;s.bad=null;A.sound.pop();report(`${w}: ${k?'abstract':'concrete'}.`+(s.n>=TOUCH.length?' All 8 sorted. Both kinds are nouns.':''))}
/* ---- 2: suffix factory ---- */
function sufRects(){const n=SUFS.length,w=Math.min(k1(76),(A.W-20-(n-1)*6)/n),h=k1(52);return SUFS.map((t,j)=>({x:A.W/2-(n*w+(n-1)*6)/2+j*(w+6),y:A.H*.68,w,h,t:'-'+t,j}))}
const baseBox=()=>{const w=Math.min(A.W-40,k1(220));return{x:A.W/2-w/2,y:A.H*.3,w,h:k1(60)}};
function drawBuild(){const s=G.build;base();if(s.n>=BUILD.length){title('All 6 nouns built',A.H*.07,1);BUILD.forEach((q,i)=>caption(`${q[0]} + ${q[1]} = ${q[2]}`+(q[3]?` (${q[3]})`:''),A.H*(.2+i*.13),17));return}
 const q=BUILD[s.n];title(`Word ${s.n+1} of 6: make it a noun`,A.H*.07);chip(baseBox(),s.made||q[0]+' + ?',{bg:s.made?'#dcfce7':SOLID,ink:s.made?RIGHT:SOLIDI,edge:s.bad!=null?WRONG:null,n:26});
 if(s.prev)caption(s.prev,A.H*.2,14);caption('Drag an ending onto the word',A.H*.58,13);sufRects().forEach(r=>chip(dragged(r,r.j),r.t,{bg:CHIP,ink:CHIPI,edge:G.hold&&G.hold.j===r.j?GRAB:s.bad===r.j?WRONG:null,n:18}))}
function build(j){const s=G.build;if(s.n>=BUILD.length)return;const [w,suf,noun,note]=BUILD[s.n],pick=SUFS[j];
 if(pick!==suf){s.bad=j;A.sound.miss();return report(`${w}${pick} is not a word. ${w} takes -${suf}: ${noun}.`)}
 s.n++;s.bad=null;s.prev=`${w} + ${suf} = ${noun}`;A.sound.pop();report(`${w} + ${suf} = ${noun}.`+(note?` The ${note}.`:'')+(s.n>=BUILD.length?' All 6 built.':''))}
/* ---- 3: noun or describing word? ---- */
const gapOrder=n=>n%2?[GAP[n][2],GAP[n][1]]:[GAP[n][1],GAP[n][2]];
function optRow(list,y){const w=Math.min(k1(150),(A.W-28)/2),h=k1(54);return list.map((t,j)=>({x:A.W/2+(j?6:-w-6),y,w,h,t,j}))}
function wrapAt(t,y){const g=A.ctx;g.font=fnt(19,700);g.fillStyle=A.col.tx;g.textAlign='center';g.textBaseline='middle';const rows=[''];t.split(' ').forEach(w=>{const z=rows[rows.length-1]?rows[rows.length-1]+' '+w:w;if(g.measureText(z).width>A.W-24)rows.push(w);else rows[rows.length-1]=z});rows.forEach((l,i)=>g.fillText(l,A.W/2,y+i*k1(26)))}
function drawGap(){const s=G.gap;base();if(s.n>=GAP.length){title('All 5 gaps filled',A.H*.07,1);GAP.forEach((q,i)=>title(q[0].replace('___',q[1]),A.H*(.2+i*.15),1));return}
 title(`Sentence ${s.n+1} of 5: noun or describing word?`,A.H*.07);wrapAt(GAP[s.n][0],A.H*.3);caption('After her, your, his: a noun.',A.H*.47,14);caption('After felt, were: a describing word.',A.H*.54,14);
 optRow(gapOrder(s.n),A.H*.64).forEach(r=>chip(dragged(r,r.j),r.t,{bg:IDEA,ink:IDEAI,edge:G.hold&&G.hold.j===r.j?GRAB:s.bad===r.t?WRONG:null}))}
function gap(v){const s=G.gap;if(s.n>=GAP.length)return;const [t,ok,,noun]=GAP[s.n];
 if(v!==ok){s.bad=v;A.sound.miss();return report(noun?`After her, your or his we need a noun, a naming word: ${ok}. ${v} describes.`:`After felt or were we need a describing word: ${ok}. ${v} is the noun.`)}
 s.n++;s.bad=null;A.sound.pop();report(t.replace('___',ok)+(s.n>=GAP.length?' All 5 filled.':''))}
/* ---- 4: spot it ---- */
function spotRects(n){const g=A.ctx,ws=SPOT[n][0];g.font=fnt(19,800);const h=k1(50),out=[];let row=[],y=A.H*.32,x=0;
 const put=()=>{const tot=row.reduce((a,r)=>a+r.w,0)+8*(row.length-1);let xx=A.W/2-tot/2;row.forEach(r=>{r.x=xx;xx+=r.w+8;out.push(r)});row=[]};
 ws.forEach((t,i)=>{const w=g.measureText(t).width+22;if(x+w>A.W-16&&row.length){put();x=0;y+=h+10}row.push({x,y,w,h,t,i});x+=w+8});put();return out}
function drawSpot(){const s=G.spot;base();if(s.n>=SPOT.length){title('All 5 abstract nouns found',A.H*.07,1);SPOT.forEach((q,i)=>caption(`${q[0][q[1]].replace('.','')}: you cannot touch it`,A.H*(.22+i*.14),17));return}
 title(`Sentence ${s.n+1} of 5: tap the abstract noun`,A.H*.07);spotRects(s.n).forEach(r=>chip(r,r.t,{n:19,edge:s.bad===r.i?WRONG:null,bg:s.bad===r.i?'#ffe4e6':'#ffffff'}));if(s.prev)caption(s.prev,A.H*.72,15)}
function spot(i){const s=G.spot;if(s.n>=SPOT.length)return;const [ws,k,solid]=SPOT[s.n],bare=w=>w.replace('.','');
 if(i!==k){s.bad=i;A.sound.miss();return report(solid.includes(i)?`${bare(ws[i])} is a noun you can see and touch: concrete. Find the one you cannot.`:`${bare(ws[i])} is not a noun. Look for a naming word for a feeling or an idea.`)}
 s.n++;s.bad=null;s.prev=`${bare(ws[k])} is abstract`;A.sound.pop();report(`${bare(ws[k])}: you cannot see or hold it, so it is an abstract noun.`+(s.n>=SPOT.length?' All 5 found.':''))}
/* ---- 5: what kind of idea? ---- */
const KCOL=[['#fee2e2','#b91c1c'],['#dcfce7','#15803d'],['#e0f2fe','#0369a1']];
function drawKind(){const s=G.kind;base();title(s.n>=KINDS.length?'All 9 grouped':`Noun ${s.n+1} of 9: what does it name?`,A.H*.07,s.n>=KINDS.length);
 drawBins(KINDS,KBOX,A.H*.42,s.n,s.bad,KCOL);if(s.n<KINDS.length)chip(dragged(cardAt(),0),KINDS[s.n][0],{edge:G.hold?GRAB:null,n:24})}
function kind(j){const s=G.kind;if(s.n>=KINDS.length)return;const [w,k]=KINDS[s.n];
 if(j!==k){s.bad=j;A.sound.miss();return report([`${w} is something you feel inside, like joy or fear.`,`${w} is what a person is like, like honest or patient.`,`${w} is a time of life or a state you are in, like childhood or peace.`][k])}
 s.n++;s.bad=null;A.sound.pop();report(`${w}: a ${KBOX[k]}.`+(s.n>=KINDS.length?' All 9 grouped.':''))}
function draw(){const k=part();if(k==='quiz'){base();title('Challenge',A.H*.25,1);title('joy · honesty · childhood · freedom',A.H*.55);return}
 ({touch:drawTouch,build:drawBuild,gap:drawGap,spot:drawSpot,kind:drawKind})[k]();A.fx.draw(A.ctx)}
function grab(p){const k=part(),hold=j=>{G.hold={j,x:p.x,y:p.y};return true};
 if(k==='touch'&&G.touch.n<TOUCH.length){if(inside(p,cardAt()))return hold(0);const b=bins(TNAMES,A.H*.42).find(r=>inside(p,r));if(b)touch(b.j);return false}
 if(k==='build'&&G.build.n<BUILD.length){const r=sufRects().find(r=>inside(p,r));return r?hold(r.j):false}
 if(k==='gap'&&G.gap.n<GAP.length){const r=optRow(gapOrder(G.gap.n),A.H*.64).find(r=>inside(p,r));return r?hold(r.j):false}
 if(k==='spot'&&G.spot.n<SPOT.length){const r=spotRects(G.spot.n).find(r=>inside(p,r));if(r)spot(r.i);return false}
 if(k==='kind'&&G.kind.n<KINDS.length){if(inside(p,cardAt()))return hold(0);const b=bins(KBOX,A.H*.42).find(r=>inside(p,r));if(b)kind(b.j)}return false}
function drag(p){if(G.hold){G.hold.x=p.x;G.hold.y=p.y;A.redraw()}}
function drop(p){const d=G.hold;if(!d)return;G.hold=null;const k=part();
 if(k==='touch'){const b=bins(TNAMES,A.H*.42).find(r=>inside(p,r));if(b)touch(b.j);else A.redraw();return}
 if(k==='kind'){const b=bins(KBOX,A.H*.42).find(r=>inside(p,r));if(b)kind(b.j);else A.redraw();return}
 if(k==='build'){const r=sufRects()[d.j];if(inside(p,baseBox())||inside(p,r))build(d.j);else A.redraw();return}
 if(k==='gap'){const r=optRow(gapOrder(G.gap.n),A.H*.64)[d.j];if(p.y<A.H*.55||inside(p,r))gap(r.t);else A.redraw()}}
function clear(){ver++;for(const k in G)delete G[k];Object.assign(G,{touch:{n:0},build:{n:0},gap:{n:0},spot:{n:0},kind:{n:0},hold:null,test:()=>{}})}
function report(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();G.test()}
function launch(i,desc,ok,msg){clear();report(desc);G.test=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function replay(i,acts,ms){steps[i].go();const me=ver;acts.forEach((f,j)=>setTimeout(()=>{if(me===ver)f()},ms*(j+1)))}
function controls(){if(!tray)return;tray.innerHTML='';const k=part(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},tray,t).onclick=f};
 if(k==='touch'&&G.touch.n<TOUCH.length)['concrete','abstract'].forEach((t,j)=>btn(t,()=>touch(j),`${TOUCH[G.touch.n][0]} is ${t}`));
 if(k==='build'&&G.build.n<BUILD.length)SUFS.forEach((t,j)=>btn('-'+t,()=>build(j),`Add -${t} to ${BUILD[G.build.n][0]}`));
 if(k==='gap'&&G.gap.n<GAP.length)gapOrder(G.gap.n).forEach(v=>btn(v,()=>gap(v),`Fill the gap with ${v}`));
 if(k==='spot'&&G.spot.n<SPOT.length)SPOT[G.spot.n][0].forEach((t,i)=>btn(t.replace('.',''),()=>spot(i),`${t.replace('.','')} is the abstract noun`));
 if(k==='kind'&&G.kind.n<KINDS.length)KBOX.forEach((t,j)=>btn(t,()=>kind(j),`${KINDS[G.kind.n][0]} is a ${t}`))}
const steps=[
{h:'The touch test',p:'A noun names something. If you can see, hear, touch, taste or smell it, it is concrete. If it names a feeling, a quality or an idea, it is abstract. Drag each noun to a box.',
predict:{q:'Is bravery a noun?',opts:['No, you cannot touch it','Yes, it names a quality'],ans:1},task:'Sort all 8 nouns',
show:()=>replay(0,TOUCH.map(x=>()=>touch(x[1])),420),
go:()=>launch(0,'table. Drag it to concrete or abstract.',()=>G.touch.n>=TOUCH.length,'Abstract nouns are still nouns. They name things you cannot touch.')},
{h:'Make a noun',p:'Many abstract nouns are built from a describing word plus an ending: -ness, -ment, -hood, -ship or -dom. Drag the right ending onto the word.',
predict:{q:'happy + ness = ?',opts:['happyness','happiness'],ans:1},task:'Build all 6 nouns',
show:()=>replay(1,BUILD.map(q=>()=>build(SUFS.indexOf(q[1]))),500),
go:()=>launch(1,'kind + ? Drag an ending onto kind.',()=>G.build.n>=BUILD.length,'Endings turn a word into an abstract noun.')},
{h:'Noun or describing word?',p:'brave describes a person. bravery is the noun. After her, your or his, use the noun. After felt or were, use the describing word.',task:'Fill all 5 gaps',
show:()=>replay(2,GAP.map(q=>()=>gap(q[1])),600),
go:()=>launch(2,'Her ___ helped the whole team. Choices: bravery or brave.',()=>G.gap.n>=GAP.length,'Pick the noun when the sentence needs a naming word.')},
{h:'Spot it',p:'A sentence can have concrete and abstract nouns. Tap the noun you cannot see or touch.',task:'Find all 5',
show:()=>replay(3,SPOT.map(q=>()=>spot(q[1])),600),
go:()=>launch(3,'The children shouted with joy. Tap the abstract noun.',()=>G.spot.n>=SPOT.length,'children is concrete. joy is abstract.')},
{h:'What does it name?',p:'Abstract nouns name feelings (joy), qualities a person has (honesty) or times and states (childhood, peace). Drag each one to its group.',task:'Group all 9',
show:()=>replay(4,KINDS.map(x=>()=>kind(x[1])),380),
go:()=>launch(4,'joy. Is it a feeling, a quality, or a time or state?',()=>G.kind.n>=KINDS.length,'Feelings, qualities and states are all abstract nouns.')},
{h:'Challenge',p:'',go:()=>{clear();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.test()});
const QS=[
{q:'Which word is an abstract noun?',a:'honesty',o:[['table','concrete'],['honest','adj']]},
{q:'Her ___ amazed everyone.',a:'bravery',o:[['brave','adj'],['bravely','adv']]},
{q:'happy + ness = ?',a:'happiness',o:[['happyness','yrule'],['happyment','suffix']]},
{q:'Which sentence has an abstract noun?',a:'We laughed with delight.',o:[['We ate a big cake.','concrete'],['We ran very fast.','verb']]},
{q:'Why is freedom a noun?',a:'It names an idea.',o:[['It names a thing you can hold.','touch'],['It is a doing word.','verb']]},
{q:'The time when you are a child is your ___.',a:'childhood',o:[['childness','suffix'],['childship','suffix']]}];
function slip(t){let m='Ask: does it name something? Can I touch it?';
 switch(t){case 'concrete':m='You can see and touch that. It is a concrete noun.';break;
 case 'adj':m='That describes. The abstract noun is the naming word: honesty, bravery.';break;
 case 'adv':m='bravely says how something is done. After her you need a noun: bravery.';break;
 case 'yrule':m='Change y to i before -ness: happiness.';break;
 case 'suffix':m='That ending does not fit this word. Say it aloud: is it a real word?';break;
 case 'verb':m='That is a doing word, not a naming word.';break;
 case 'touch':m='You cannot hold freedom. It names an idea, so it is abstract.';break}
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 cq.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=cq.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){cq.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=cq.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+slip(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.6,tall:1.1,draw,onStep:B=>{cq.hidden=B.step!==5;tray.hidden=B.step===5;controls()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);tray=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Abstract noun buttons'},w);cq=c.el('div',{class:'fl-chal'},A.below);clear();A.gest({down:grab,move:drag,up:drop});controls()}}).start()})})();
