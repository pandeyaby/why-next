/* Flagship – suffix spelling rules (ages 6–7; NC England Y2 spelling, English Appendix 1: adding -ing, -ed, -er, -est and
   -y to words ending in -e with a consonant before it; doubling the final consonant after a single short vowel; changing
   y to i before -ed, -er, -est but not -ing; adding -ment, -ness, -ful, -less and -ly). The learner taps the letter of the
   root that has to change (cross out the e, double the last consonant, turn y into i) or taps "just add" when the root stays
   the same, then sorts finished words by the rule they used. */
(()=>{
/* rounds: root, suffix, what happens (drop | dbl | yi | add), finished word */
const DROPE=[['hope','ing','drop','hoping'],['bake','ed','drop','baked'],['smile','ing','drop','smiling'],['hope','ful','add','hopeful']];
const TWIN=[['run','ing','dbl','running'],['hop','ed','dbl','hopped'],['big','est','dbl','biggest'],['jump','ing','add','jumping'],['rain','ing','add','raining']];
const YTOI=[['cry','ed','yi','cried'],['happy','ly','yi','happily'],['copy','ed','yi','copied'],['cry','ing','add','crying'],['play','ed','add','played']];
const CONS=[['care','ful','add','careful','full of care'],['hope','less','add','hopeless','without hope'],['sad','ness','add','sadness','being sad'],['enjoy','ment','add','enjoyment','the enjoying'],['happy','ness','yi','happiness','being happy']];
const BOXES=['just add','drop the e','double it','y to i'],KEYOF={add:0,drop:1,dbl:2,yi:3};
const FINISHED=[['hoping','drop'],['running','dbl'],['cried','yi'],['careful','add'],['baked','drop'],['hottest','dbl'],['happily','yi'],['playing','add']];
const VOW='aeiou';
VIS.reg('flagsfxrule',c=>{let A,ctl,chal,cq=-1,gen=0;c.fig.classList.add('young');
const S={};
const INK='#1e293b',OKC='#047857',NOC='#b91c1c',EDGE='#64748b',GRAB='#1d4ed8',SUFI='#5b21b6',SUFB='#ede9fe',TILE='#ffffff',CUT='#fee2e2',ADDB='#ecfdf5',ADDE='#047857';
const z=v=>Math.round(v*(A.narrow?1:1.15)),ff=(v,w)=>`${w||800} ${z(v)}px system-ui,sans-serif`;
const phase=()=>['drop','twin','yi','cons','sort','chal'][A.step],inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function wash(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#f5f3ff',A.col.dark?.05:.5);g.fillRect(0,0,A.W,A.H)}
function pill(t,y,good){const g=A.ctx;let n=15;g.font=ff(n);while(g.measureText(t).width+30>A.W-8&&n>10){n--;g.font=ff(n)}
 const w=g.measureText(t).width+26,h=z(n)+16;g.fillStyle=TILE;A.paint.rrect(A.W/2-w/2,y-h/2,w,h,h/2);g.fill();g.lineWidth=good?3:1.5;g.strokeStyle=good?OKC:EDGE;g.stroke();
 g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+1)}
function box(r,txt,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||TILE;A.paint.rrect(r.x,r.y,r.w,r.h,o.rad||10);g.fill();g.lineWidth=o.line?4:2;g.strokeStyle=o.line||EDGE;g.stroke();
 if(txt==null)return;g.fillStyle=o.ink||INK;g.font=ff(o.n||24);g.textAlign='center';g.textBaseline='middle';g.fillText(txt,r.x+r.w/2,r.y+r.h/2+1,r.w-6)}
/* ---- the rule rounds shared by steps 1 to 4 ---- */
const SET={drop:DROPE,twin:TWIN,yi:YTOI,cons:CONS};
const cur=()=>{const k=phase(),L=SET[k];return L&&S.n<L.length?L[S.n]:null};
function tiles(){const q=cur();if(!q)return[];const n=q[0].length,gap=z(6),sw=z(70),w=Math.min(z(50),(A.W-24-sw-gap*(n+1))/n),tot=n*(w+gap)+sw,x0=A.W/2-tot/2,y=A.H*.36,h=z(58);
 const out=[...q[0]].map((ch,i)=>({x:x0+i*(w+gap),y,w,h,i,ch}));out.suf={x:x0+n*(w+gap)+gap,y,w:sw,h};return out}
const addKey=()=>{const w=Math.min(z(180),A.W*.5);return{x:A.W/2-w/2,y:A.H*.6,w,h:z(52)}};
function drawRule(){const k=phase(),L=SET[k],g=A.ctx;wash();
 if(S.n>=L.length){pill(`All ${L.length} words built`,A.H*.08,1);L.forEach((q,i)=>pill(`${q[0]} + ${q[1]} = ${q[3]}`+(q[4]?` (${q[4]})`:''),A.H*(.22+i*.15),1));return}
 const q=cur();pill(`Word ${S.n+1} of ${L.length}: ${q[0]} + ${q[1]}`,A.H*.08);
 g.fillStyle=A.col.tx;g.font=ff(15,700);g.textAlign='center';g.textBaseline='middle';g.fillText('Tap the letter that changes, or tap just add.',A.W/2,A.H*.24,A.W-12);
 const T=tiles();T.forEach(t=>box(t,t.ch,{bg:S.bad===t.i?CUT:TILE,line:S.bad===t.i?NOC:null,n:26}));box(T.suf,'-'+q[1],{bg:SUFB,ink:SUFI,line:SUFI,n:22});
 box(addKey(),'just add',{bg:ADDB,ink:ADDE,line:S.bad==='add'?NOC:ADDE,n:20,rad:26});
 if(S.last){g.fillStyle=A.col.tx;g.font=ff(17,700);g.fillText(S.last,A.W/2,A.H*.86,A.W-12)}}
/* what the learner tapped: a letter index, or 'add' */
function apply(pick){const k=phase(),L=SET[k];if(!L||S.n>=L.length)return;const [root,suf,act,word]=L[S.n],last=root.length-1,lc=root[last];
 const want=act==='add'?'add':last;
 if(pick!==want){S.bad=pick;A.sound.miss();return speak(why(root,suf,act,word,pick))}
 S.n++;S.bad=null;A.sound.pop();
 const how=act==='drop'?`drop the e, then add ${suf}`:act==='dbl'?`double the ${lc}, then add ${suf}`:act==='yi'?`change y to i, then add ${suf}`:`keep ${root} the same and add ${suf}`;
 S.last=`${root} + ${suf} = ${word}`;speak(`${word}: ${how}.`+(S.n>=L.length?` All ${L.length} built.`:''))}
function why(root,suf,act,word,pick){const last=root.length-1,lc=root[last],sv=VOW.includes(suf[0]);
 if(act==='add'){
  if(root.endsWith('e'))return `-${suf} starts with ${suf[0]}, not a vowel, so the e stays: ${word}.`;
  if(root.endsWith('y')&&suf==='ing')return `Keep the y before -ing, or you get two i's together: ${word}.`;
  if(root.endsWith('y'))return `${root} has a vowel before the y, so the y stays: ${word}.`;
  if(!sv)return `-${suf} starts with a consonant, so ${root} just adds it with no change: ${word}.`;
  if(/[aeiou]{2}/.test(root.slice(-3,-1)))return `${root} has two vowels before the last letter, so nothing doubles: ${word}.`;
  if(!VOW.includes(root[last-1]))return `${root} already ends in two consonants, so nothing doubles: ${word}.`;
  return `${root} stays the same here: ${word}.`}
 if(pick==='add'){
  if(act==='drop')return `${root} + ${suf} would give ${root+suf}. -${suf} starts with a vowel, so the e goes: ${word}.`;
  if(act==='dbl')return `${root} has one short vowel and one last consonant. Double the ${lc} first: ${word}.`;
  return `${root} has a consonant before the y. Change y to i first: ${word}.`}
 return `Not the ${root[pick]}. Only the last letter of ${root} changes: ${word}.`}
/* ---- step 5: which rule made it? ---- */
const bins=()=>{const w=(A.W-30)/2,h=A.H*.27;return BOXES.map((t,j)=>({x:10+(j%2)*(w+10),y:A.H*.42+Math.floor(j/2)*(h+8),w,h,j}))};
const chip=()=>{const w=Math.min(A.W-60,z(190));return{x:A.W/2-w/2,y:A.H*.17,w,h:z(54)}};
function drawSort(){const g=A.ctx;wash();pill(S.n>=FINISHED.length?'All 8 sorted':`Word ${S.n+1} of 8: which rule made it?`,A.H*.07,S.n>=FINISHED.length);
 bins().forEach(b=>{g.fillStyle=A.col.dark?'#e0f2fe':'#f0f9ff';A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=S.bad===b.j?NOC:'#0369a1';g.lineWidth=S.bad===b.j?4:2.5;g.stroke();
  g.fillStyle=INK;g.textAlign='center';g.textBaseline='top';g.font=ff(14);g.fillText(BOXES[b.j],b.x+b.w/2,b.y+6,b.w-8);g.font=ff(14,700);
  FINISHED.slice(0,S.n).filter(f=>KEYOF[f[1]]===b.j).forEach((f,i)=>g.fillText(f[0],b.x+b.w/2,b.y+z(26)+i*z(20),b.w-8))});
 if(S.n<FINISHED.length){const d=S.drag,r=chip();box(d?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,FINISHED[S.n][0],{line:d?GRAB:null,n:26,rad:14})}}
const ROOTOF={hoping:'hope',running:'run',cried:'cry',careful:'care',baked:'bake',hottest:'hot',happily:'happy',playing:'play'};
function file(j){if(S.n>=FINISHED.length)return;const [w,act]=FINISHED[S.n],r=ROOTOF[w],want=KEYOF[act];
 if(j!==want){S.bad=j;A.sound.miss();const tip=act==='drop'?`${w} comes from ${r}. The e went before a vowel ending.`:act==='dbl'?`${w} comes from ${r}. The last letter was doubled.`:act==='yi'?`${w} comes from ${r}. The y turned into i.`:`${w} is ${r} + ${w.slice(r.length)} with nothing changed.`;return speak(tip)}
 S.n++;S.bad=null;A.sound.pop();speak(`${w}: ${BOXES[want]} (${r}).`+(S.n>=FINISHED.length?' All 8 sorted.':''))}
function draw(){const k=phase();if(k==='chal'){wash();pill('Challenge',A.H*.25,1);pill('hope → hoping · run → running · cry → cried',A.H*.55);return}
 if(k==='sort')drawSort();else drawRule();A.fx.draw(A.ctx)}
function down(p){const k=phase();
 if(SET[k]&&cur()){const t=tiles().find(r=>inR(p,r));if(t){apply(t.i);return false}if(inR(p,addKey())){apply('add');return false}return false}
 if(k==='sort'&&S.n<FINISHED.length){if(inR(p,chip())){S.drag={x:p.x,y:p.y};return true}const b=bins().find(r=>inR(p,r));if(b)file(b.j)}return false}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){if(!S.drag)return;S.drag=null;const b=bins().find(r=>inR(p,r));if(b)file(b.j);else A.redraw()}
function fresh(){gen++;for(const k in S)delete S[k];Object.assign(S,{n:0,bad:null,last:'',drag:null,chk:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();S.chk()}
function arm(i,desc,goal,msg){fresh();speak(desc);S.chk=()=>{if(A.step===i&&goal()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,gap){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},gap*(j+1)))}
const rightPick=q=>q[2]==='add'?'add':q[0].length-1;
function keys(){if(!ctl)return;ctl.innerHTML='';const k=phase(),mk=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 const q=SET[k]&&cur();if(q){const lc=q[0][q[0].length-1];
  mk(lc==='e'?'cross out the e':lc==='y'?'change y to i':`double the ${lc}`,()=>apply(q[0].length-1),`${q[0]} + ${q[1]}: change the last letter ${lc}`);
  mk('just add',()=>apply('add'),`${q[0]} + ${q[1]}: just add the ending`)}
 if(k==='sort'&&S.n<FINISHED.length)BOXES.forEach((t,j)=>mk(t,()=>file(j),`${FINISHED[S.n][0]}: ${t}`))}
const steps=[
{h:'Drop the e',p:'Some words end in e, like hope. An ending that starts with a vowel (a, e, i, o, u) pushes the e out. Tap the e to cross it out.',
predict:{q:'hope + ing. What happens to the e?',opts:['It stays: hopeing','It goes: hoping'],ans:1},task:'Build all 4 words',
show:()=>auto(0,DROPE.map(q=>()=>apply(rightPick(q))),600),
go:()=>arm(0,'Root: hope. Ending: -ing. Tap the letter that changes, or just add.',()=>S.n>=DROPE.length,'The e goes before a vowel ending, but stays before -ful.')},
{h:'Double the last letter',p:'Short words like run have one short vowel and end in one consonant. Double that last letter before -ing, -ed, -er or -est.',
predict:{q:'hop + ing makes which word?',opts:['hoping','hopping'],ans:1},task:'Build all 5 words',
show:()=>auto(1,TWIN.map(q=>()=>apply(rightPick(q))),550),
go:()=>arm(1,'Root: run. Ending: -ing. Tap the letter that changes, or just add.',()=>S.n>=TWIN.length,'One short vowel and one last consonant: double it. jump and rain do not.')},
{h:'Change y to i',p:'When a word ends in a consonant and then y, the y turns into i before -ed, -er, -est and -ly. Before -ing the y stays.',
predict:{q:'cry + ed makes which word?',opts:['cryed','cried'],ans:1},task:'Build all 5 words',
show:()=>auto(2,YTOI.map(q=>()=>apply(rightPick(q))),550),
go:()=>arm(2,'Root: cry. Ending: -ed. Tap the letter that changes, or just add.',()=>S.n>=YTOI.length,'cried and happily change y to i; crying and played keep it.')},
{h:'-ful, -less, -ness, -ment',p:'These endings start with a consonant. Most words just add them with no change. Watch for a y after a consonant.',task:'Build all 5 words',
show:()=>auto(3,CONS.map(q=>()=>apply(rightPick(q))),550),
go:()=>arm(3,'Root: care. Ending: -ful. Tap the letter that changes, or just add.',()=>S.n>=CONS.length,'careful, hopeless, sadness, enjoyment: just add. happy + ness = happiness.')},
{h:'Which rule?',p:'Look at each finished word. Find the root inside it. Drag the word to the rule it used, or tap a box.',task:'Sort all 8 words',
show:()=>auto(4,FINISHED.map(f=>()=>file(KEYOF[f[1]])),450),
go:()=>arm(4,'Word: hoping. Boxes: just add, drop the e, double it, y to i.',()=>S.n>=FINISHED.length,'Find the root, then ask: what changed?')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.chk()});
const QZ=[
{q:'make + ing = ?',a:'making',o:[['makeing','keepe'],['makking','dble']]},
{q:'sit + ing = ?',a:'sitting',o:[['siting','nodbl'],['sitteing','extra']]},
{q:'fly + ing = ?',a:'flying',o:[['fliing','yiing'],['flieing','extra']]},
{q:'happy + er = ?',a:'happier',o:[['happyer','keepy'],['happer','lose']]},
{q:'care + less = ?',a:'careless',o:[['carless','drope'],['carelees','sufx']]},
{q:'hot + est = ?',a:'hottest',o:[['hotest','nodbl'],['hotttest','extra']]},
{q:'Why does jump + ing NOT double the p?',a:'It ends in two consonants',o:[['p never doubles','never'],['It is a long word','long']]}];
function why2(t){let m='Find the root, then check the last letters: e, one short vowel + consonant, or consonant + y.';
 switch(t){case 'keepe':m='-ing starts with a vowel, so the e of make goes: making.';break;
 case 'dble':m='make ends in e, so drop the e. Do not double the k: making.';break;
 case 'nodbl':m='One short vowel, then one consonant: double the last letter first.';break;
 case 'extra':m='Only one change happens. Do not add extra letters.';break;
 case 'yiing':m='Before -ing the y stays, or you would get ii: flying.';break;
 case 'keepy':m='happy ends in consonant + y, so y turns to i before -er: happier.';break;
 case 'lose':m='Do not throw letters away. Change the y to i, then add er: happier.';break;
 case 'drope':m='-less starts with a consonant, so the e of care stays: careless.';break;
 case 'sufx':m='The ending is spelt less, with one e and two s letters.';break;
 case 'never':m='p can double, as in hopping. jump does not double because it ends in m then p.';break;
 case 'long':m='Length is not the rule. jump ends in two consonants, m and p, so nothing doubles.';break}
 return m}
function ask(){cq++;const Q=QZ[cq%QZ.length],all=[[Q.a,'ok'],...Q.o],r=cq%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why2(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why2(t))}
FK.shell(c,{steps,ratio:.6,tall:1.05,draw,onStep:B=>{chal.hidden=B.step!==5;ctl.hidden=B.step===5;keys()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Suffix rule buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});keys()}}).start()})})();
