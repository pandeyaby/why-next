/* Flagship – spelling verb endings (ages 5–6; NC England Y1 spelling, English Appendix 1: adding -s and -es to words,
   -ing, -ed and -er to verbs where no change is needed to the root, and -er and -est to adjectives where no change is
   needed). Snap the ending that fits the time clue onto the root, spell -ed as ed whether it sounds like t, d or id,
   label tall / taller / tallest on real heights, cut a word back to its root, and finish sentences (fixes, laughed).
   Root words here never change (no doubling, no dropped e: that is the next topic, Suffixes). Not flagplural (nouns). */
(()=>{
/* time clue, who, root, ending */
const TIME=[['Now','Sam is','jump','ing'],['Yesterday','Sam','help','ed'],['Every day','Sam','play','s'],['Now','Mia is','look','ing'],['Yesterday','Mia','kick','ed']];
const ENDS=['s','ing','ed'];
/* word, how it sounds, wrong spellings */
const SOUND=[['jumped','jump-t',['jumpt','jumpd']],['played','play-d',['playd','plaid']],['wanted','want-id',['wantid','wantd']],['helped','help-t',['helpt','helpd']]];
const SIZES=[['tall','up'],['long','side']];
/* word and where the root ends */
const CUT=[['jumping',4],['helped',4],['quickest',5],['plays',4],['looked',4],['faster',4]];
const FIN=[['Every week Dad','fix','es',['s','ed'],'the bike.'],['The red car is','fast','er',['est','ing'],'than the van.'],['This is the','tall','est',['er','ed'],'tree of all.'],['Last night we','laugh','ed',['ing','s'],'at the joke.']];
VIS.reg('flagvend',c=>{let A,pad,ch,cn=-1,gen=0;c.fig.classList.add('young');
const S={};
const INK='#1e293b',OK='#047857',NO='#b91c1c',EDGE='#64748b',HOLD='#1d4ed8',TAIL='#6d28d9',TAILBG='#ede9fe',WHITE='#ffffff',BLOCK='#fbbf24',BLOCKR='#92400e';
const k=n=>Math.round(n*(A.narrow?1:1.2)),ft=(n,w)=>`${w||800} ${k(n)}px system-ui,sans-serif`;
const now=()=>['time','sound','size','cut','fin','chal'][A.step],inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function paper(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#f5f3ff',A.col.dark?.04:.5);g.fillRect(0,0,A.W,A.H)}
function top(t,ok){const g=A.ctx,y=A.H*.075;let n=15;g.font=ft(n);while(g.measureText(t).width+30>A.W-8&&n>10){n--;g.font=ft(n)}
const w=g.measureText(t).width+28,h=k(n)+16;g.fillStyle=WHITE;A.paint.rrect(A.W/2-w/2,y-h/2,w,h,9);g.fill();g.lineWidth=ok?3:1.5;g.strokeStyle=ok?OK:EDGE;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function lines(arr,ok){arr.forEach((t,i)=>{const g=A.ctx,y=A.H*(.25+i*.14);g.font=ft(16);const w=Math.min(A.W-16,g.measureText(t).width+26),h=k(34);g.fillStyle=WHITE;A.paint.rrect(A.W/2-w/2,y-h/2,w,h,9);g.fill();g.lineWidth=2;g.strokeStyle=ok?OK:EDGE;g.stroke();g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1,A.W-24)})}
/* box with a root word and an optional ending drawn in purple */
function word(r,root,end,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||WHITE;A.paint.rrect(r.x,r.y,r.w,r.h,13);g.fill();g.lineWidth=o.line?4:2;g.strokeStyle=o.line||EDGE;if(o.dash)g.setLineDash([6,6]);g.stroke();g.setLineDash([]);
if(root==null)return;g.font=ft(o.n||24);g.textBaseline='middle';const a=g.measureText(root).width,b=end?g.measureText(end).width:0,x=r.x+r.w/2-(a+b)/2,y=r.y+r.h/2+1;g.textAlign='left';g.fillStyle=o.ink||INK;g.fillText(root,x,y);if(end){g.fillStyle=TAIL;g.fillText(end,x+a,y)}}
function words(t,y,n){const g=A.ctx;g.fillStyle=A.col.tx;g.font=ft(n||18,700);g.textAlign='center';g.textBaseline='middle';const out=[''];t.split(' ').forEach(w=>{const s=out[out.length-1]?out[out.length-1]+' '+w:w;if(g.measureText(s).width>A.W-28)out.push(w);else out[out.length-1]=s});out.forEach((l,i)=>g.fillText(l,A.W/2,y+i*k(26)))}
/* ---- step 1: the time clue picks the ending ---- */
const tRoot=()=>{const w=Math.min(k(190),A.W*.55);return{x:A.W/2-w/2,y:A.H*.4,w,h:k(60)}};
const tTiles=()=>{const w=Math.min(k(96),(A.W-40)/3),h=k(56);return ENDS.map((e,i)=>({x:A.W/2-(w*1.5+12)+i*(w+12),y:A.H*.72,w,h,e}))};
function drawTime(){const s=S.t;paper();if(s.n>=5){top('All 5 done',1);lines(TIME.map(q=>`${q[0]}: ${q[1]} ${q[2]+q[3]}`),1);return}
const q=TIME[s.n];top(`Sentence ${s.n+1} of 5: drag an ending`);words(`${q[0]}, ${q[1]} ___`,A.H*.25,20);word(tRoot(),q[2],null,{n:28});
const d=S.drag;tTiles().forEach(r=>{const at=d&&d.e===r.e?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r;word(at,'-'+r.e,null,{bg:TAILBG,ink:TAIL,line:d&&d.e===r.e?HOLD:s.miss===r.e?NO:TAIL,n:22})})}
function snap(e){const s=S.t;if(s.n>=5)return;const q=TIME[s.n],w=q[2]+e;
if(e!==q[3]){s.miss=e;A.sound.miss();return tell(q[3]==='ing'?`${q[1]} ${w} does not fit. ${q[0]} is happening now, so add -ing: ${q[2]}ing.`:q[3]==='ed'?`${q[0]} is in the past. Past jobs end in -ed: ${q[2]}ed.`:`${q[0]} means it happens again and again. ${q[1]} ${q[2]}s.`)}
s.n++;s.miss=null;A.sound.pop();tell(`${q[0]}, ${q[1]} ${w}. ${q[2]} stays the same.`+(s.n>=5?' All 5 done.':''))}
/* ---- step 2: -ed is always spelt ed ---- */
const sOpts=n=>{const q=SOUND[n],all=[q[0],...q[2]],r=n%3;return all.slice(r).concat(all.slice(0,r))};
const sBoxes=()=>{const w=Math.min(k(220),A.W*.62),h=k(54);return[0,1,2].map(i=>({x:A.W/2-w/2,y:A.H*.42+i*(h+k(10)),w,h}))};
function drawSound(){const s=S.s,g=A.ctx;paper();if(s.n>=4){top('All 4 spelled',1);lines(SOUND.map(q=>`sounds like ${q[1]}: spelt ${q[0]}`),1);return}
const q=SOUND[s.n];top(`Word ${s.n+1} of 4: tap the right spelling`);
g.fillStyle=TAILBG;const bw=Math.min(A.W-40,k(230));A.paint.rrect(A.W/2-bw/2,A.H*.17,bw,k(58),k(29));g.fill();g.strokeStyle=TAIL;g.lineWidth=2;g.stroke();
g.fillStyle=INK;g.font=ft(14,700);g.textAlign='center';g.textBaseline='middle';g.fillText('It sounds like',A.W/2,A.H*.17+k(17));g.fillStyle=TAIL;g.font=ft(22);g.fillText(q[1],A.W/2,A.H*.17+k(40));
sOpts(s.n).forEach((w,i)=>word(sBoxes()[i],w,null,{line:s.miss===w?NO:null}))}
function spellEd(w){const s=S.s;if(s.n>=4)return;const q=SOUND[s.n],root=q[0].slice(0,-2);
if(w!==q[0]){s.miss=w;A.sound.miss();return tell(w.endsWith('t')||w.endsWith('d')&&!w.endsWith('ed')?`It sounds like ${q[1].split('-')[1]}, but the past ending is always spelt e then d: ${q[0]}.`:`Keep the root ${root} the same and add ed: ${q[0]}.`)}
s.n++;s.miss=null;A.sound.pop();tell(`${q[0]}: ${root} + ed. It sounds like ${q[1]}.`+(s.n>=4?' All 4 spelled.':''))}
/* ---- step 3: tall, taller, tallest ---- */
const ORDER=[[1,2,0],[2,0,1]];   /* size rank shown in each of the three places, per set */
const LAB=['','er','est'];
const zPlace=()=>{const w=(A.W-40)/3;return[0,1,2].map(i=>({x:12+i*(w+8),y:A.H*.18,w,h:A.H*.6,i}))};
function drawSize(){const s=S.z,g=A.ctx;paper();if(s.set>=2){top('Both sets labelled',1);lines(['tall, taller, tallest','long, longer, longest','-er: more. -est: the most of all.'],1);return}
const [adj,dir]=SIZES[s.set],ask=adj+LAB[s.got.length];top(`Set ${s.set+1} of 2: tap the ${ask} one`);
zPlace().forEach(r=>{const rank=ORDER[s.set][r.i],u=(rank+1)/3;g.fillStyle=s.miss===r.i?'#fecaca':BLOCK;g.strokeStyle=BLOCKR;g.lineWidth=2.5;
if(dir==='up'){const bw=r.w*.5,bh=r.h*.72*u;g.fillRect(r.x+r.w/2-bw/2,r.y+r.h*.8-bh,bw,bh);g.strokeRect(r.x+r.w/2-bw/2,r.y+r.h*.8-bh,bw,bh);for(let y=r.y+r.h*.8-bh+k(22);y<r.y+r.h*.8;y+=k(22)){g.beginPath();g.moveTo(r.x+r.w/2-bw/2,y);g.lineTo(r.x+r.w/2+bw/2,y);g.stroke()}}
else{const bl=r.w*.92*u,bh=k(26),y=r.y+r.h*.5;g.fillRect(r.x+r.w/2-bl/2,y-bh/2,bl,bh);g.strokeRect(r.x+r.w/2-bl/2,y-bh/2,bl,bh);g.fillStyle=INK;g.beginPath();g.arc(r.x+r.w/2+bl/2-k(6),y-k(3),k(2.5),0,7);g.fill()}
const lab=s.got.indexOf(rank);if(lab>=0)word({x:r.x+2,y:r.y+r.h*.84,w:r.w-4,h:k(40)},adj,LAB[lab]||null,{n:15,line:OK})})}
function tapSize(i){const s=S.z;if(s.set>=2)return;const [adj]=SIZES[s.set],rank=ORDER[s.set][i],want=s.got.length;
if(s.got.includes(rank))return tell('That one has its label already.');
if(rank!==want){s.miss=i;A.sound.miss();const ask=adj+LAB[want];
return tell(want===2?`That is not the most ${adj} of all. ${ask} means the most of all three.`:want===1?(rank===2?`That one is the ${adj}est of all. ${ask} is just more ${adj} than the first one.`:`That one is the least ${adj}. ${ask} means more ${adj}.`):`Start with the least ${adj} one. Then add -er, then -est.`)}
s.got.push(rank);s.miss=null;A.sound.pop();const said=adj+LAB[rank];if(s.got.length>=3){s.set++;s.got=[]}
tell(`${said}.`+(rank===1?` -er: more ${adj}.`:rank===2?` -est: the most ${adj}.`:'')+(s.set>=2?' Both sets done.':''))}
/* ---- step 4: cut back to the root ---- */
function cLay(w){const g=A.ctx;g.font=ft(30);const cw=Math.min(k(40),(A.W-30)/w.length),x0=A.W/2-cw*w.length/2;return{cw,x0,y:A.H*.36,h:k(64)}}
function drawCut(){const s=S.c,g=A.ctx;paper();if(s.n>=6){top('All 6 cut to the root',1);lines([CUT.slice(0,3).map(([w,i])=>w.slice(0,i)+' | '+w.slice(i)).join('   '),CUT.slice(3).map(([w,i])=>w.slice(0,i)+' | '+w.slice(i)).join('   '),'The root word did not change.'],1);return}
const [w,cut]=CUT[s.n],L=cLay(w);top(`Word ${s.n+1} of 6: tap where the root ends`);
for(let i=0;i<w.length;i++){const x=L.x0+i*L.cw;g.fillStyle=WHITE;A.paint.rrect(x+2,L.y,L.cw-4,L.h,8);g.fill();g.strokeStyle=EDGE;g.lineWidth=1.5;g.stroke();g.fillStyle=INK;g.font=ft(26);g.textAlign='center';g.textBaseline='middle';g.fillText(w[i],x+L.cw/2,L.y+L.h/2+1)}
if(s.miss!=null){const x=L.x0+s.miss*L.cw;g.strokeStyle=NO;g.lineWidth=4;g.beginPath();g.moveTo(x,L.y-k(10));g.lineTo(x,L.y+L.h+k(10));g.stroke()}
words('Tap a gap between two letters.',A.H*.72,15);if(s.last)words(s.last,A.H*.6,17)}
function cutAt(j){const s=S.c;if(s.n>=6)return;const [w,cut]=CUT[s.n],root=w.slice(0,j);if(j<1||j>=w.length)return;
if(j!==cut){s.miss=j;A.sound.miss();return tell(j<cut?`${root} is not the whole root. Keep going: ${w.slice(0,cut)}.`:`${root} is too much. The ending is ${w.slice(cut)}, so the root is ${w.slice(0,cut)}.`)}
s.n++;s.miss=null;s.last=`${w}: ${root} + ${w.slice(cut)}`;A.sound.pop();tell(`${root} + ${w.slice(cut)}. The root ${root} did not change.`+(s.n>=6?' All 6 done.':''))}
/* ---- step 5: finish the sentence ---- */
const fOpts=n=>{const q=FIN[n],all=[q[2],...q[3]],r=n%3;return all.slice(r).concat(all.slice(0,r))};
const fKeys=()=>{const w=Math.min(k(96),(A.W-40)/3),h=k(56);return[0,1,2].map(i=>({x:A.W/2-(w*1.5+12)+i*(w+12),y:A.H*.74,w,h,i}))};
const fRoot=()=>({x:A.W/2-k(90),y:A.H*.5,w:k(180),h:k(56)});
function drawFin(){const s=S.f;paper();if(s.n>=4){top('All 4 sentences done',1);lines(FIN.map(q=>`${q[0]} ${q[1]+q[2]} ${q[4]}`),1);return}
const q=FIN[s.n];top(`Sentence ${s.n+1} of 4`);words(`${q[0]} ___ ${q[4]}`,A.H*.22,19);word(fRoot(),q[1],null,{n:26});
const d=S.drag;fOpts(s.n).forEach((e,i)=>{const r=fKeys()[i],at=d&&d.i===i?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r;word(at,'-'+e,null,{bg:TAILBG,ink:TAIL,line:d&&d.i===i?HOLD:s.miss===e?NO:TAIL,n:22})})}
function finish(e){const s=S.f;if(s.n>=4)return;const q=FIN[s.n];
if(e!==q[2]){s.miss=e;A.sound.miss();return tell(q[2]==='es'?'fix ends in x. After s, x, z, sh or ch you add -es. You can hear it: fix-es.':q[2]==='er'?'Two things are compared, the car and the van, so use -er: faster.':q[2]==='est'?'of all means the most of all, so use -est: tallest.':'Last night is in the past, so add -ed: laughed.')}
s.n++;s.miss=null;A.sound.pop();tell(`${q[0]} ${q[1]+q[2]} ${q[4]}`+(s.n>=4?' All 4 done.':''))}
function draw(){const m=now();if(m==='chal'){paper();top('Challenge',1);lines(['jump + ing = jumping','help + ed = helped','tall, taller, tallest']);return}
({time:drawTime,sound:drawSound,size:drawSize,cut:drawCut,fin:drawFin})[m]();A.fx.draw(A.ctx)}
function down(p){const m=now();
if(m==='time'&&S.t.n<5){const r=tTiles().find(x=>inR(p,x));if(r){S.drag={e:r.e,x:p.x,y:p.y};return true}return false}
if(m==='sound'&&S.s.n<4){const i=sBoxes().findIndex(x=>inR(p,x));if(i>=0)spellEd(sOpts(S.s.n)[i]);return false}
if(m==='size'){const r=zPlace().find(x=>inR(p,x));if(r)tapSize(r.i);return false}
if(m==='cut'&&S.c.n<6){const w=CUT[S.c.n][0],L=cLay(w);if(p.y>L.y-k(30)&&p.y<L.y+L.h+k(30)){const j=Math.round((p.x-L.x0)/L.cw);cutAt(j)}return false}
if(m==='fin'&&S.f.n<4){const r=fKeys().find(x=>inR(p,x));if(r){S.drag={i:r.i,x:p.x,y:p.y};return true}}return false}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){const d=S.drag;if(!d)return;S.drag=null;const m=now();
if(m==='time'){const r=tRoot();if(inR(p,{x:r.x-30,y:r.y-30,w:r.w+60,h:r.h+60})||inR(p,tTiles().find(x=>x.e===d.e)))snap(d.e);else A.redraw();return}
if(m==='fin'){const r=fRoot();if(inR(p,{x:r.x-30,y:r.y-30,w:r.w+60,h:r.h+60})||inR(p,fKeys()[d.i]))finish(fOpts(S.f.n)[d.i]);else A.redraw()}}
function wipe(){gen++;for(const x in S)delete S[x];Object.assign(S,{t:{n:0},s:{n:0},z:{set:0,got:[]},c:{n:0},f:{n:0},drag:null,chk:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();S.chk()}
function begin(i,desc,fin,msg){wipe();tell(desc);S.chk=()=>{if(A.step===i&&fin()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,list,ms){steps[i].go();const me=gen;list.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function keys(){if(!pad)return;pad.innerHTML='';const m=now(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};
if(m==='time'&&S.t.n<5)ENDS.forEach(e=>B('-'+e,()=>snap(e),`Add -${e} to ${TIME[S.t.n][2]}`));
if(m==='sound'&&S.s.n<4)sOpts(S.s.n).forEach(w=>B(w,()=>spellEd(w),`Spell it ${w}`));
if(m==='size'&&S.z.set<2)['left','middle','right'].forEach((t,i)=>B(t,()=>tapSize(i),`The ${t} ${SIZES[S.z.set][1]==='up'?'tower':'snake'}`));
if(m==='cut'&&S.c.n<6){const w=CUT[S.c.n][0];for(let j=1;j<w.length;j++)B(w.slice(0,j)+'|'+w.slice(j),()=>cutAt(j),`Cut ${w} after ${w.slice(0,j)}`)}
if(m==='fin'&&S.f.n<4)fOpts(S.f.n).forEach(e=>B('-'+e,()=>finish(e),`Add -${e} to ${FIN[S.f.n][1]}`))}
const steps=[
{h:'Add an ending',p:'An ending tells you when. Now: -ing. In the past: -ed. Every day: -s. Drag an ending onto the word.',
predict:{q:'Add -ing to jump. What do you get?',opts:['jumpping','jumping'],ans:1},task:'Finish all 5',
show:()=>auto(0,TIME.map(q=>()=>snap(q[3])),650),
go:()=>begin(0,'Now, Sam is jump ___. Endings: -s, -ing, -ed.',()=>S.t.n>=5,'The root word stays the same. Only the ending changes.')},
{h:'-ed is always ed',p:'-ed can sound like t, d or id. It is still spelt e, d. Tap the right spelling.',
predict:{q:'You hear help-t. How do you spell it?',opts:['helpt','helped'],ans:1},task:'Spell all 4',
show:()=>auto(1,SOUND.map(q=>()=>spellEd(q[0])),800),
go:()=>begin(1,'It sounds like jump-t. Choices: jumped, jumpt, jumpd.',()=>S.s.n>=4,'jumped, played, wanted, helped: all spelt ed.')},
{h:'Taller and tallest',p:'-er means more. -est means the most of all. Tap the towers in order: tall, taller, tallest.',
predict:{q:'Of three towers, the very top one is the ...',opts:['taller','tallest'],ans:1},task:'Label both sets',
show:()=>auto(2,ORDER.flatMap(o=>[0,1,2].map(r=>()=>tapSize(o.indexOf(r)))),600),
go:()=>begin(2,'Three towers of different heights. Tap the tall one first.',()=>S.z.set>=2,'tall, taller, tallest: the root tall never changes.')},
{h:'Find the root',p:'Cut off the ending. What is left is the root word, and it is a real word.',task:'Cut all 6 words',
show:()=>auto(3,CUT.map(x=>()=>cutAt(x[1])),650),
go:()=>begin(3,'jumping. Tap the gap where the root ends.',()=>S.c.n>=6,'jump, help, quick, play, look, fast: the roots did not change.')},
{h:'Finish the sentence',p:'Read the sentence. Pick the ending that fits. Careful: after x you add -es.',task:'Finish all 4 sentences',
show:()=>auto(4,FIN.map(q=>()=>finish(q[2])),800),
go:()=>begin(4,'Every week Dad fix ___ the bike. Endings: -es, -s, -ed.',()=>S.f.n>=4,'fixes, faster, tallest, laughed.')},
{h:'Challenge',p:'',go:()=>{wipe();nextQ()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>S.chk()});
const QS=[
{q:'Yesterday I ... my mum.',a:'helped',o:[['helpt','sound'],['helping','now']]},
{q:'Which is right?',a:'She is jumping.',o:[['She is jumpping.','double'],['She is jumpin.','drop']]},
{q:'He ... the box every day.',a:'fixes',o:[['fixs','es'],['fix','nos']]},
{q:'The best of all three is the ...',a:'quickest',o:[['quicker','er'],['quickist','ist']]},
{q:'What is the root of playing?',a:'play',o:[['playi','toolong'],['pla','tooshort']]},
{q:'Mia is ... than Sam.',a:'taller',o:[['tallest','est'],['more taller','more']]}];
function slip(t){let m='Keep the root the same and pick the ending that fits.';
if(t==='sound')m='It sounds like t, but the past ending is spelt ed: helped.';
if(t==='now')m='Yesterday is in the past, so add -ed, not -ing.';
if(t==='double')m='jump ends in two consonants, m and p. Just add -ing: jumping. No extra p.';
if(t==='drop')m='Write the whole ending, i, n, g: jumping.';
if(t==='es')m='fix ends in x. After x you add -es: fixes.';
if(t==='nos')m='Every day he does it, so he fixes. It needs an ending.';
if(t==='er')m='quicker compares two. Of all three, it is quickest.';
if(t==='ist')m='The ending is spelt e, s, t: quickest.';
if(t==='toolong')m='The i belongs to the ending -ing. The root is play.';
if(t==='tooshort')m='pla is not a word. The root keeps its y: play.';
if(t==='est')m='Two people are compared, so use -er: taller.';
if(t==='more')m='taller already means more tall. Do not add more.';
return m}
function nextQ(){cn++;const Q=QS[cn%QS.length],all=[[Q.a,'yes'],...Q.o],r=cn%3,ord=all.slice(r).concat(all.slice(0,r));
ch.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
const bx=ch.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},bx,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function score(t,a){ch.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=ch.querySelector('.fl-fb'),ok=t==='yes';if(ok)A.win();else A.sound.miss();
fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+slip(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=nextQ;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:B=>{ch.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
init:B=>{A=B;const bx=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Word ending buttons'},bx);ch=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});keys()}}).start()})})();
