/* Flagship – Character traits and motivation (ages 8–9; CCSS RL.3.3 "describe characters (traits, motivations, feelings)
   and explain how their actions contribute to the events", RL.3.6 own point of view vs narrator; NC Y3–4 inference). */
(()=>{
const WORD=[['brave',0],['scared',1],['kind',0],['cross',1],['honest',0],['excited',1],['patient',0],['lonely',1],['selfish',0],['embarrassed',1]];
/* evidence about Tomas: 0 generous, 1 determined, 2 shows no trait */
const PROOF=[['He gave half his lunch to the new boy.',0],['He practised the jump every day after school.',1],['He had curly brown hair.',2],['"Take my coat, you are shivering," he said.',0],['He fell twice and got straight back up.',1],['He lived next to the park.',2],['He let his sister have the last go.',0],['"I will get it right if it takes all week."',1]];
/* action, clue in the story, motives (first is the one the clues support) */
const WHY=[['Priya hid the broken vase.','Mum had said: that vase was Gran\'s.',['She was afraid of upsetting Mum.','She wanted a new vase.','She is a bad person.']],
['Ben snapped at his best friend.','That morning Ben\'s dog was lost.',['He was worried about his dog.','He always hates his friend.','He wanted to win a game.']],
['Leo stayed late to tidy the classroom.','Leo wanted to be picked as class helper.',['He hoped to be chosen as helper.','He was locked in.','He was bored at home.']],
['Amira gave her prize to her little brother.','Her brother had cried all week about losing.',['She wanted to cheer him up.','She did not like prizes.','Her teacher made her.']]];
/* scale left/right, evidence lines, zone 0 left 1 middle 2 right */
const METER=[['careful','reckless',['Jake ran across the ice without testing it.','He laughed and jumped off the wall.'],2],['shy','outgoing',['Mia hid behind Dad at the party.','She whispered her answer.'],0],['mean','kind',['Sam kept the ball to himself at first.','Later he shared it with everyone.'],1],['lazy','hard-working',['Nadia finished every page.','She asked for extra work.'],2]];
/* narrator Mrs Grey story: 0 narrator says, 1 evidence shows, 2 my opinion */
const VIEW=[['"Mrs Grey was the grumpiest woman on the street."',0],['She left a bowl of water for every stray cat.',1],['I think she is lonely, not grumpy.',2],['"Nobody liked her," the narrator tells us.',0],['She mended the twins\' bike without being asked.',1],['I would want her as a neighbour.',2]];
/* claim, three evidence choices (first strongest), tag for each weak one */
const BEST=[['Ava is honest.',['She handed in a wallet she found.','She had a red coat.','The narrator calls her a good girl.'],['look','label']],
['Omar is curious.',['He took the clock apart to see how it ticked.','He was tall for his age.','He said he was fine.'],['look','off']],
['Kim is determined.',['She tried the puzzle ten times until it fitted.','Everyone said she was nice.','She liked blue.'],['label','off']],
['Raj is jealous.',['He frowned when his brother got a new bike.','He wore glasses.','He was happy.'],['look','opp']]];
VIS.reg('flagcharm',c=>{let A,ctl,quiz,qi=-1,run=0;
const M={};
const TX='#111827',YES='#065f46',NO='#9f1239',EDGE='#6b7280',GRAB='#3730a3',WHITE='#ffffff';
const HUE=[['#ffedd5','#7c2d12'],['#e0e7ff','#312e81'],['#f1f5f9','#334155']];
const k=v=>Math.round(v*(A.narrow?.93:1.08)),ft=(v,w)=>`${w||800} ${k(v)}px system-ui,sans-serif`;
const at=()=>['word','proof','why','meter','view','best','quiz'][A.step],inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function bg(){A.ctx.fillStyle=A.col.dark?'#0b1120':'#fafaf9';A.ctx.fillRect(0,0,A.W,A.H)}
function box(r,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||WHITE;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=o.rim?3.5:1.5;g.strokeStyle=o.rim||EDGE;g.stroke();
 if(t==null)return;g.fillStyle=o.fg||TX;g.textAlign='center';g.textBaseline='middle';const n=o.n||17;g.font=ft(n,o.w||800);
 if(g.measureText(t).width<=r.w-14){g.fillText(t,r.x+r.w/2,r.y+r.h/2+1);return}
 const ws=t.split(' '),L=[];let cur='';ws.forEach(w=>{const tr=cur?cur+' '+w:w;if(g.measureText(tr).width>r.w-14&&cur){L.push(cur);cur=w}else cur=tr});L.push(cur);
 const lh=k(n)+3;L.forEach((l,i)=>g.fillText(l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh+1,r.w-8))}
function top(t,won){const g=A.ctx;let n=15;g.font=ft(n);while(g.measureText(t).width+28>A.W-8&&n>10){n--;g.font=ft(n)}const w=g.measureText(t).width+24;
 box({x:A.W/2-w/2,y:A.H*.025,w,h:k(n)+14},t,{bg:won?'#d1fae5':WHITE,rim:won?YES:null,n})}
function say2(t,y,n){const g=A.ctx;g.fillStyle=A.col.tx;g.font=ft(n||14,650);g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y,A.W-12)}
const lifted=(r,j)=>M.hold&&M.hold.j===j?{...r,x:M.hold.x-r.w/2,y:M.hold.y-r.h/2}:r;
const deck=h=>{const w=Math.min(A.W-20,k(360));return{x:A.W/2-w/2,y:A.H*.12,w,h:h||k(56)}};
function cols(names,y){const n=names.length,gp=7,w=(A.W-16-gp*(n-1))/n;return names.map((t,j)=>({x:8+j*(w+gp),y,w,h:A.H-y-8,t,j}))}
function drawCols(names,y,list,s){const g=A.ctx;cols(names,y).forEach(b=>{box(b,null,{bg:HUE[b.j][0],rim:s.bad===b.j?NO:null});g.fillStyle=HUE[b.j][1];g.font=ft(14,800);g.textAlign='center';g.textBaseline='top';g.fillText(b.t,b.x+b.w/2,b.y+7,b.w-6);
 g.fillStyle=TX;g.font=ft(12,600);let y=b.y+k(28);list.slice(0,s.n).filter(x=>x[1]===b.j).forEach(x=>{const t=x[0].length>18?x[0].slice(0,17)+'…':x[0];g.fillText(t,b.x+b.w/2,y,b.w-6);y+=k(17)})})}
function sortStep(name,list,heads,y,label){const s=M[name];bg();top(s.n>=list.length?`All ${list.length} sorted`:`${label} ${s.n+1} of ${list.length}`,s.n>=list.length);drawCols(heads,y,list,s);
 if(s.n<list.length)box(lifted(deck(list===WORD?k(52):k(66)),0),list[s.n][0],{rim:M.hold?GRAB:null,n:list===WORD?22:15,w:list===WORD?800:700})}
const WH=['Trait: most of the time','Feeling: right now'],PH=['generous','determined','shows no trait'],VH=['narrator says','story shows','my opinion'];
const FEED={
 word:(t,want)=>want?`${t} is how someone feels at one moment. It can change by teatime: a feeling.`:`${t} describes what someone is like most of the time: a trait.`,
 proof:(t,want,got)=>want===2?'Looks and where someone lives do not show what they are like inside.':got===2?'This is an action or words, so it does show character.':want?'Keeping going after a fall or a setback shows determined.':'Giving something away for someone else shows generous.',
 view:(t,want)=>want===0?'This is the narrator telling you what to think. Check it against what she does.':want===1?'This is something she does. It is evidence from the story.':'This starts with I think or I would: it is your own opinion.'};
function place(name,list,j){const s=M[name];if(s.n>=list.length)return;const [t,want]=list[s.n];
 if(j!==want){s.bad=j;A.sound.miss();return out(FEED[name](t,want,j))}s.n++;s.bad=null;A.sound.pop();out(`${t}: ${({word:WH,proof:PH,view:VH})[name][want]}.`+(s.n>=list.length?' All sorted.':''))}
function whyOpts(){const q=WHY[M.why.n],gp=8,h=k(58),w=Math.min(A.W-20,k(380)),r=(M.why.n+1)%3;return q[2].map((t,j)=>({t,j,x:A.W/2-w/2,w,h,y:A.H*.5+((j+r)%3)*(h+gp)}))}
function drawWhy(){const s=M.why;bg();if(s.n>=WHY.length){top('All 4 motives found',1);WHY.forEach((q,i)=>say2(`${q[0]} ${q[2][0]}`,A.H*(.2+i*.18),13));return}
 const q=WHY[s.n];top(`Character ${s.n+1} of 4: why?`);box(deck(k(50)),q[0],{bg:HUE[0][0],fg:HUE[0][1],n:16});say2('Clue: '+q[1],A.H*.12+k(50)+k(22),13);
 say2('Drag the reason the clue supports',A.H*.45,12);whyOpts().forEach(r=>box(lifted(r,r.j),r.t,{bg:HUE[1][0],fg:HUE[1][1],n:15,w:700,rim:M.hold&&M.hold.j===r.j?GRAB:s.bad===r.j?NO:null}))}
function why(j){const s=M.why;if(s.n>=WHY.length)return;const q=WHY[s.n];
 if(j){s.bad=j;A.sound.miss();return out(/bad person|always hates/.test(q[2][j])?'That judges the whole person from one action. Use the clue: '+q[1]:`The story gives no clue for that. Look again: ${q[1]}`)}
 s.n++;s.bad=null;A.sound.pop();out(`${q[0]} Because: ${q[2][0]}`+(s.n>=WHY.length?' All 4 found.':''))}
function bar(){const w=A.W-k(60);return{x:A.W/2-w/2,y:A.H*.62,w,h:k(30)}}
function drawMeter(){const s=M.meter,g=A.ctx;bg();if(s.n>=METER.length){top('All 4 placed',1);METER.forEach((q,i)=>say2(`${q[0]} ← ${['●○○','○●○','○○●'][q[3]]} → ${q[1]}`,A.H*(.22+i*.17),15));return}
 const q=METER[s.n],B=bar();top(`Scale ${s.n+1} of 4: drag the marker`);q[2].forEach((t,i)=>say2(t,A.H*(.17+i*.1),14));
 [0,1,2].forEach(z=>box({x:B.x+z*B.w/3,y:B.y,w:B.w/3,h:B.h},null,{bg:['#ede9fe','#f8fafc','#ede9fe'][z],rim:s.bad===z?NO:null}));
 g.fillStyle=A.col.tx;g.font=ft(15,800);g.textBaseline='top';g.textAlign='left';g.fillText(q[0],B.x,B.y+B.h+8);g.textAlign='right';g.fillText(q[1],B.x+B.w,B.y+B.h+8);
 const x=s.x==null?B.x+B.w/2:s.x;g.fillStyle=GRAB;g.beginPath();g.arc(x,B.y+B.h/2,k(17),0,7);g.fill();g.strokeStyle=WHITE;g.lineWidth=3;g.stroke();say2(s.x==null?'Drag the dot, then let go':'',A.H*.5,12)}
function meter(z){const s=M.meter;if(s.n>=METER.length)return;const q=METER[s.n],B=bar();s.x=B.x+(z+.5)*B.w/3;
 if(z!==q[3]){s.bad=z;A.sound.miss();return out(q[3]===1?`Both lines count. One shows ${q[0]}, the other ${q[1]}: put the dot in the middle.`:`Both lines point the same way: ${q[3]?q[1]:q[0]}. Move the dot to that end.`)}
 s.bad=null;A.sound.pop();const t=`${['Very','Partly','Very'][z]} ${z===1?q[0]+' and partly '+q[1]:z?q[1]:q[0]}.`;s.n++;s.x=null;out(t+(s.n>=METER.length?' All 4 placed.':''))}
function bestOpts(){const q=BEST[M.best.n],gp=8,h=k(56),w=Math.min(A.W-20,k(380)),r=(M.best.n+1)%3;return q[1].map((t,j)=>({t,j,x:A.W/2-w/2,w,h,y:A.H*.36+((j+r)%3)*(h+gp)}))}
function drawBest(){const s=M.best;bg();if(s.n>=BEST.length){top('All 4 claims proved',1);BEST.forEach((q,i)=>say2(`${q[0]} ${q[1][0]}`,A.H*(.2+i*.18),12));return}
 const q=BEST[s.n];top(`Claim ${s.n+1} of 4: tap the best proof`);box(deck(k(50)),q[0],{bg:HUE[0][0],fg:HUE[0][1],n:19});
 bestOpts().forEach(r=>box(r,r.t,{n:15,w:700,rim:s.bad===r.j?NO:null}))}
function best(j){const s=M.best;if(s.n>=BEST.length)return;const q=BEST[s.n];
 if(j){s.bad=j;A.sound.miss();const tag=q[2][j-1];return out(tag==='look'?'Looks do not prove a trait. Find something the character does.':tag==='label'?'Someone just says it. The best proof is an action you can see.':tag==='opp'?'That shows the opposite feeling, not this trait.':'That does not link to the claim at all.')}
 s.n++;s.bad=null;A.sound.pop();out(`${q[0]} Proof: ${q[1][0]}`+(s.n>=BEST.length?' All 4 proved.':''))}
function draw(){const s=at();if(s==='quiz'){bg();top('Challenge',1);say2('trait + action that proves it',A.H*.5,17);return}
 if(s==='word')sortStep('word',WORD,WH,A.H*.36,'Word');else if(s==='proof')sortStep('proof',PROOF,PH,A.H*.36,'Clue');else if(s==='view')sortStep('view',VIEW,VH,A.H*.36,'Line');
 else({why:drawWhy,meter:drawMeter,best:drawBest})[s]();A.fx.draw(A.ctx)}
const SORTS={word:[WORD,WH],proof:[PROOF,PH],view:[VIEW,VH]};
function press(p){const s=at();
 if(SORTS[s]){const [L,H]=SORTS[s];if(M[s].n>=L.length)return false;if(p.y>A.H*.1&&p.y<A.H*.34){M.hold={j:0,x:p.x,y:p.y};return true}const b=cols(H,A.H*.36).find(r=>inR(p,r));if(b)place(s,L,b.j);return false}
 if(s==='why'&&M.why.n<WHY.length){const r=whyOpts().find(r=>inR(p,r));if(r){M.hold={j:r.j,x:p.x,y:p.y};return true}return false}
 if(s==='meter'&&M.meter.n<METER.length){const B=bar();if(p.y>B.y-k(30)&&p.y<B.y+B.h+k(30)){M.slide=1;M.meter.x=Math.max(B.x,Math.min(B.x+B.w,p.x));A.redraw();return true}return false}
 if(s==='best'&&M.best.n<BEST.length){const r=bestOpts().find(r=>inR(p,r));if(r)best(r.j)}return false}
function drag(p){const s=at();if(M.slide){const B=bar();M.meter.x=Math.max(B.x,Math.min(B.x+B.w,p.x));A.redraw();return}if(M.hold){M.hold.x=p.x;M.hold.y=p.y;A.redraw()}}
function drop(p){const s=at();if(M.slide){M.slide=0;const B=bar();meter(Math.min(2,Math.floor((M.meter.x-B.x)/(B.w/3))));return}const h=M.hold;if(!h)return;M.hold=null;
 if(SORTS[s]){const b=cols(SORTS[s][1],A.H*.36).find(r=>inR(p,r));b?place(s,SORTS[s][0],b.j):A.redraw();return}
 if(s==='why'){p.y<A.H*.46||inR(p,whyOpts()[h.j])?why(h.j):A.redraw()}}
function fresh(){run++;for(const x in M)delete M[x];Object.assign(M,{word:{n:0},proof:{n:0},why:{n:0},meter:{n:0},view:{n:0},best:{n:0},hold:null,slide:0,check:()=>{}})}
function out(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();M.check()}
function arm(i,desc,ok,msg){fresh();out(desc);M.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=run;acts.forEach((f,j)=>setTimeout(()=>{if(me===run)f()},ms*(j+1)))}
function keys(){if(!ctl)return;ctl.innerHTML='';const s=at(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(SORTS[s]&&M[s].n<SORTS[s][0].length){const [L,H]=SORTS[s];H.forEach((t,j)=>b(t,()=>place(s,L,j),`${L[M[s].n][0]}: ${t}`))}
 if(s==='why'&&M.why.n<WHY.length)WHY[M.why.n][2].forEach((t,j)=>b(t,()=>why(j),'Because '+t));
 if(s==='meter'&&M.meter.n<METER.length){const q=METER[M.meter.n];[q[0],'in between',q[1]].forEach((t,z)=>b(t,()=>meter(z),`Place the marker: ${t}`))}
 if(s==='best'&&M.best.n<BEST.length)BEST[M.best.n][1].forEach((t,j)=>b(t,()=>best(j),'Proof: '+t))}
const steps=[
{h:'Trait or feeling?',p:'A trait is what a character is like most of the time, like brave or honest. A feeling is how they feel at one moment, like scared or cross. Drag each word.',
predict:{q:'Zara is cross because her bike broke. Is cross a trait?',opts:['yes, she is a cross person','no, a feeling for now'],ans:1},task:'Sort all 10 words',
show:()=>auto(0,WORD.map(x=>()=>place('word',WORD,x[1])),400),
go:()=>arm(0,'brave. Drag it to trait or feeling.',()=>M.word.n>=WORD.length,'Feelings come and go. Traits last.')},
{h:'Prove it with evidence',p:'Writers rarely say a character is generous. They show it through what the character does and says. Drag each clue about Tomas to the trait it proves.',
predict:{q:'Which shows what Tomas is like?',opts:['his curly brown hair','what he does and says'],ans:1},task:'Sort all 8 clues',
show:()=>auto(1,PROOF.map(x=>()=>place('proof',PROOF,x[1])),480),
go:()=>arm(1,'He gave half his lunch to the new boy. Drag it to a trait.',()=>M.proof.n>=PROOF.length,'Actions and words are evidence. Looks are not.')},
{h:'Why did they do it?',p:'A motive is the reason behind an action: what the character wants or fears. Use the clue from earlier in the story, not a guess. Drag the reason the clue supports.',
predict:{q:'Ben snapped at his best friend. Ben is…',opts:['a mean person','upset about something: check the clues'],ans:1},task:'Find all 4 motives',
show:()=>auto(2,WHY.map(()=>()=>why(0)),700),
go:()=>arm(2,'Priya hid the broken vase. Drag the reason.',()=>M.why.n>=WHY.length,'Action, then because, then the clue.')},
{h:'The trait scale',p:'Traits come in amounts. Read both lines, then drag the dot along the scale. If the lines point both ways, the character sits in the middle.',task:'Place all 4 markers',
show:()=>auto(3,METER.map(q=>()=>meter(q[3])),700),
go:()=>arm(3,'Jake ran across the ice without testing it. Drag the dot between careful and reckless.',()=>M.meter.n>=METER.length,'Weigh all the evidence, not one line.')},
{h:'The narrator\'s view and yours',p:'The narrator may tell you what to think of a character. Check it against what she does. You can disagree, if you point to evidence. Drag each line.',task:'Sort all 6 lines',
show:()=>auto(4,VIEW.map(x=>()=>place('view',VIEW,x[1])),520),
go:()=>arm(4,'Mrs Grey was the grumpiest woman on the street. Who is saying this?',()=>M.view.n>=VIEW.length,'The narrator calls her grumpy; her actions say kind. Your view can differ.')},
{h:'The best proof',p:'A strong claim names a trait and backs it with an action. Tap the proof that shows the trait best.',task:'Prove all 4 claims',
show:()=>auto(5,BEST.map(()=>()=>best(0)),650),
go:()=>arm(5,'Ava is honest. Tap the best proof.',()=>M.best.n>=BEST.length,'Trait, then an action that shows it.')},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>M.check()});
const QS=[
{q:'Which word is a trait, not a feeling?',a:'generous',o:[['nervous','feel'],['tired','feel']]},
{q:'Best proof that Lily is brave:',a:'She climbed down to rescue the kitten.',o:[['She had a brave face.','look'],['Her friend said she was brave.','label']]},
{q:'Dan broke his sister\'s model, then hid it. His clue: he had promised to be careful. Why did he hide it?',a:'He was afraid of breaking his promise.',o:[['He is a liar.','judge'],['He wanted a new model.','guess']]},
{q:'The narrator says Mr Pike is cruel, but he feeds the birds every day. A fair view:',a:'He may be kinder than the narrator says.',o:[['He is cruel because the narrator said so.','trust'],['Feeding birds is not about character.','evid']]},
{q:'Which line is your own opinion?',a:'I think Tom is braver than his sister.',o:[['Tom jumped into the river.','evid2'],['"Tom was a coward," wrote the author.','trust']]}];
function hint(t){let m='Look for what the character does.';switch(t){case 'feel':m='That is how someone feels at one moment, so it is a feeling.';break;case 'look':m='Looks do not prove a trait. Choose an action.';break;
 case 'label':m='Someone just says it. Pick the action that shows it.';break;case 'judge':m='That judges the whole person from one action. Use the clue.';break;case 'guess':m='The story gives no clue for that. Use the promise.';break;
 case 'trust':m='That is the narrator\'s view. Check it against the actions.';break;case 'evid':m='Actions are the best evidence of character.';break;case 'evid2':m='That is something Tom does: evidence, not opinion.'}return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();const m=ok?'':hint(t);
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+m)+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':m)}
FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:B=>{quiz.hidden=B.step!==6;ctl.hidden=B.step===6;keys()},
 init:B=>{A=B;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Character buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down:press,move:drag,up:drop});keys()}}).start()})})();
