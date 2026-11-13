/* Flagship – converting nouns and adjectives into verbs (ages 9–10; NC England Y5 Appendix 2 word structure:
   suffixes -ate, -ise (-ize) and -ify; -en also makes verbs). Drag a suffix onto a root, drop a final e or y,
   choose root or verb by the job the gap needs, tap the converted verb, then find the slip. */
(()=>{
const SUF=['-ify','-ise','-ate','-en'];
/* [root, word class, right suffix, verb, meaning] */
const ROOTS=[['class','noun','-ify','classify','sort into groups'],['final','adjective','-ise','finalise','make final'],
 ['sharp','adjective','-en','sharpen','make sharp'],['solid','adjective','-ify','solidify','turn solid'],
 ['hyphen','noun','-ate','hyphenate','join with a hyphen'],['fossil','noun','-ise','fossilise','turn into a fossil']];
/* [root, suffix, index of the letter to drop or -1 to keep all, verb] */
const TRIM=[['simple','-ify',5,'simplify'],['solid','-ify',-1,'solidify'],['apology','-ise',6,'apologise'],
 ['active','-ate',5,'activate'],['length','-en',-1,'lengthen'],['memory','-ise',5,'memorise']];
/* [sentence with ▢, root, verb, 0 = root fits / 1 = verb fits, why] */
const JOB=[['The ▢ in the flower makes me sneeze.','pollen','pollinate',0,'After The we need a thing, a noun: pollen.'],
 ['Bees ▢ the flowers.','pollen','pollinate',1,'Bees do something to the flowers, so the gap needs a verb: pollinate.'],
 ['These sums are very ▢.','simple','simplify',0,'After are very we describe the sums with an adjective: simple.'],
 ['Can you ▢ this sum?','simple','simplify',1,'Can you asks for an action, so use the verb: simplify.'],
 ['Our ▢ went to the zoo.','class','classify',0,'Our is followed by a thing, so the noun: class.'],
 ['We will ▢ the shells by shape.','class','classify',1,'We will is followed by an action, so the verb: classify.']];
/* [words, index of the converted verb, root, class of the root] */
const FIND=[[['The','cold','will','solidify','the','wax.'],3,'solid','adjective'],
 [['They','needed','to','classify','the','animals.'],3,'class','noun'],
 [['Please','shorten','your','long','story.'],1,'short','adjective'],
 [['The','judges','will','finalise','the','list.'],3,'final','adjective']];
/* [words, index of the wrong word, fix] */
const FIX=[[['Please','simpleify','the','plan.'],1,'Drop the e of simple first: simplify.'],
 [['The','teacher','will','classise','the','rocks.'],3,'class takes -ify, not -ise: classify.'],
 [['I','want','to','apologyse','to','Mum.'],3,'Drop the y, then add -ise: apologise.'],
 [['The','cold','will','solid','the','fat.'],3,'solid is an adjective. The gap needs the verb solidify.']];
VIS.reg('flagmkverb',c=>{let A,X,pad,quiz,qn=-1,epoch=0,drag=null;const V={};
const DARK='#0f172a',WHITE='#ffffff',RIM='#64748b',YES='#047857',NO='#be123c',BLUE='#1d4ed8',BLUSH='#fde2e7',MINT='#dcfce7',BUTTER='#fef9c3',FROST='#e0f2fe',PLUM='#ede9fe';
const px=n=>Math.round(n*(A.narrow?.9:1.05)),face=(n,w)=>`${w||700} ${px(n)}px system-ui,sans-serif`,inside=(p,r,m=0)=>r&&p.x>=r.x-m&&p.x<=r.x+r.w+m&&p.y>=r.y-m&&p.y<=r.y+r.h+m;
const SEQ=['build','trim','job','find','fix','quiz'],cur=()=>SEQ[A.step],SETS={build:ROOTS,trim:TRIM,job:JOB,find:FIND,fix:FIX},spent=n=>V[n].i>=SETS[n].length;
const red=()=>A.col.dark?'#fda4af':NO;
function ground(){X.fillStyle=A.col.dark?'#0b1120':'#f8fafc';X.fillRect(0,0,A.W,A.H)}
function txt(n,w,al){X.font=face(n,w);X.textAlign=al||'center';X.textBaseline='middle'}
function lines(t,x,y,w,n){const rows=[];let row='';for(const wd of String(t).split(' ')){const tr=row?row+' '+wd:wd;if(row&&X.measureText(tr).width>w){rows.push(row);row=wd}else row=tr}rows.push(row);
 const lh=px(n)*1.28;rows.forEach((s,i)=>X.fillText(s,x,y+(i-(rows.length-1)/2)*lh))}
function card(r,t,o={}){X.fillStyle=o.bg||WHITE;A.paint.rrect(r.x,r.y,r.w,r.h,10);X.fill();X.lineWidth=o.ring?3.2:1.2;X.strokeStyle=o.ring||RIM;X.stroke();
 if(t!=null){X.fillStyle=o.fg||DARK;txt(o.n||17,o.w||700);lines(t,r.x+r.w/2,r.y+r.h/2,r.w-14,o.n||17)}}
function head(t,won){txt(14,800);const w=Math.min(A.W-8,X.measureText(t).width+28),h=px(14)+14,y=A.H*.02;card({x:A.W/2-w/2,y,w,h},null,{bg:won?MINT:WHITE,ring:won?YES:null});X.fillStyle=DARK;X.fillText(t,A.W/2,y+h/2+1,w-12)}
function line(t,y,n,col){X.fillStyle=col||A.col.tx;txt(n||14,650);lines(t,A.W/2,y,A.W-28,n||14)}
function wrapUp(t,L){ground();head(t,1);L.forEach((s,i)=>card({x:12,y:A.H*(.16+i*.21),w:A.W-24,h:A.H*.17},s,{n:16,bg:'#ecfdf5'}))}
/* ---- 1: drag a suffix onto the root ---- */
function pairW(){const rw=Math.min((A.W-36)*.44,px(170)),sw=Math.min((A.W-36)*.56,px(200));return{rw,sw,x0:(A.W-rw-12-sw)/2}}
function slotR(){const q=pairW();return{x:q.x0+q.rw+12,y:A.H*.2,w:q.sw,h:px(66)}}
function rootR(){const q=pairW();return{x:q.x0,y:A.H*.2,w:q.rw,h:px(66)}}
function sufR(){const n=SUF.length,g=px(10),w=(A.W-24-g*(n-1))/n,h=px(60);return SUF.map((t,j)=>({t,j,x:12+j*(w+g),y:A.H*.72,w,h}))}
function drawBuild(){const s=V.build;ground();if(spent('build'))return wrapUp('All 6 verbs made',['class → classify, solid → solidify','final → finalise, fossil → fossilise','hyphen → hyphenate, sharp → sharpen']);
 const [root,kind]=ROOTS[s.i];head(`Word ${s.i+1} of 6: make it a verb`);card(rootR(),root,{n:26,w:800,bg:FROST});
 card(slotR(),s.made||'drop a suffix here',{n:s.made?22:14,w:s.made?800:600,bg:s.made?MINT:WHITE,ring:A.col.dark?'#93c5fd':BLUE});
 line(`${root} is a ${kind}. Which ending turns it into a verb?`,A.H*.44,14);if(s.msg)line(s.msg,A.H*.57,13,red());
 sufR().forEach(r=>{const d=drag&&drag.j===r.j;card(d?{...r,x:drag.x-r.w/2,y:drag.y-r.h/2}:r,r.t,{n:22,w:800,bg:s.bad===r.t?BLUSH:BUTTER,ring:s.bad===r.t?NO:d?BLUE:null})})}
function build(t){const s=V.build;if(spent('build'))return;const [root,,ok,verb,mean]=ROOTS[s.i];let m;
 if(t===ok){s.i++;s.msg='';s.bad=null;s.made=null;A.sound.pop();return speak(`Yes: ${root} + ${ok} = ${verb}, which means ${mean}.`)}
 s.bad=t;A.sound.miss();m=`${root+t.slice(1)} is not a word. Say each one aloud; ${root} takes ${ok}.`;s.msg=m;speak(m)}
/* ---- 2: drop the final e or y ---- */
function letR(){const [root]=TRIM[V.trim.i],n=root.length,g=px(6),w=Math.min(px(52),(A.W-24-g*(n-1))/n),tot=n*w+g*(n-1),x0=A.W/2-tot/2;return[...root].map((ch,j)=>({ch,j,x:x0+j*(w+g),y:A.H*.2,w,h:px(62)}))}
function keepR(){const w=Math.min(A.W-24,px(240));return{x:A.W/2-w/2,y:A.H*.72,w,h:px(58)}}
function drawTrim(){const s=V.trim;ground();if(spent('trim'))return wrapUp('All 6 roots fixed',['simple → simplify, active → activate','apology → apologise, memory → memorise','solid, length: keep every letter']);
 const [root,suf]=TRIM[s.i];head(`Root ${s.i+1} of 6: ${root} + ${suf}`);letR().forEach(r=>card(r,r.ch,{n:26,w:800,bg:s.bad===r.j?BLUSH:FROST,ring:s.bad===r.j?NO:null}));
 line('The suffix starts with a vowel. Tap the letter that has to go, or keep them all.',A.H*.45,13);if(s.msg)line(s.msg,A.H*.58,13,red());
 card(keepR(),'Keep every letter',{n:18,bg:s.bad===-1?BLUSH:MINT,ring:s.bad===-1?NO:null})}
function trim(j){const s=V.trim;if(spent('trim'))return;const [root,suf,ok,verb]=TRIM[s.i];let m;
 if(j===ok){s.i++;s.msg='';s.bad=null;A.sound.pop();return speak(ok<0?`Right: ${root} ends in ${root.slice(-1)}, so just add ${suf}: ${verb}.`:`Right: drop the ${root[ok]}, then add ${suf}: ${verb}.`)}
 s.bad=j;A.sound.miss();if(j<0)m=`Keep it all and you get ${root+suf.slice(1)}. The final ${root[ok]} drops: ${verb}.`;
 else if(ok<0)m=`${root} ends in ${root.slice(-1)}, not e or y, so no letter drops: ${verb}.`;else m=`Only the last letter, ${root[ok]}, drops. Keep the ${root[j]}: ${verb}.`;s.msg=m;speak(m)}
/* ---- 3: root or verb? ---- */
function jobR(){const [,a,b]=JOB[V.job.i],w=(A.W-36)/2,h=px(64);return[{v:0,t:a,x:12,y:A.H*.68,w,h},{v:1,t:b,x:24+w,y:A.H*.68,w,h}]}
function drawJob(){const s=V.job;ground();if(spent('job'))return wrapUp('All 6 gaps filled',['A thing or a describing word: keep the root.','An action: use the verb.','Bees pollinate flowers. The pollen is yellow.']);
 head(`Sentence ${s.i+1} of 6: which word does the job?`);card({x:12,y:A.H*.13,w:A.W-24,h:A.H*.24},JOB[s.i][0],{n:19,bg:BUTTER});
 line('Does the gap need a thing, a describing word, or an action?',A.H*.45,13);if(s.msg)line(s.msg,A.H*.56,13,red());
 jobR().forEach(r=>card(r,r.t,{n:21,w:800,bg:s.bad===r.v?BLUSH:r.v?PLUM:FROST,ring:s.bad===r.v?NO:null}))}
function job(v){const s=V.job;if(spent('job'))return;const [t,a,b,ok,why]=JOB[s.i];let m;
 if(v===ok){s.i++;s.msg='';s.bad=null;A.sound.pop();return speak(`Yes: ${t.replace('▢',ok?b:a)} ${why}`)}
 s.bad=v;A.sound.miss();m=v?`${b} is a verb, an action word. ${why}`:`${a} is not an action word. ${why}`;s.msg=m;speak(m)}
/* ---- shared: tap a word in a sentence ---- */
function rowR(W){txt(20,750);const R=[];let x=0,y=A.H*.22;const h=px(46),rows=[[]];
 W.forEach((t,j)=>{const w=X.measureText(t).width+px(18);if(x+w>A.W-24&&x>0){rows.push([]);x=0;y+=h+px(10)}rows[rows.length-1].push({t,j,x,y,w,h});x+=w+px(8)});
 rows.forEach(r=>{const e=r[r.length-1],off=(A.W-(e.x+e.w))/2;r.forEach(q=>{q.x+=off;R.push(q)})});return R}
/* ---- 4: tap the converted verb ---- */
function drawFind(){const s=V.find;ground();if(spent('find'))return wrapUp('All 4 verbs found',['solidify, from the adjective solid','classify, from the noun class','shorten from short, finalise from final']);
 head(`Sentence ${s.i+1} of 4: tap the verb made with a suffix`);rowR(FIND[s.i][0]).forEach(r=>card(r,r.t,{n:20,w:750,bg:s.bad===r.j?BLUSH:WHITE,ring:s.bad===r.j?NO:null}));
 line('Look for a root word with -ify, -ise, -ate or -en on the end.',A.H*.6,13);if(s.msg)line(s.msg,A.H*.72,13,red())}
function find(j){const s=V.find;if(spent('find'))return;const [W,ok,root,kind]=FIND[s.i],w=W[j].replace('.','');let m;
 if(j===ok){s.i++;s.msg='';s.bad=null;A.sound.pop();return speak(`Found it: ${w} is a verb made from the ${kind} ${root}.`)}
 s.bad=j;A.sound.miss();m=/ed$/.test(w)?`${w} is a verb, but no suffix made it from a noun or adjective.`:`${w} has no verb-making suffix. Look again.`;s.msg=m;speak(m)}
/* ---- 5: find the slip ---- */
function drawFix(){const s=V.fix;ground();if(spent('fix'))return wrapUp('All 4 slips fixed',['simplify: drop the e first.','classify: class takes -ify.','apologise: drop the y. solidify: the verb.']);
 head(`Sentence ${s.i+1} of 4: tap the word that is wrong`);rowR(FIX[s.i][0]).forEach(r=>card(r,r.t,{n:20,w:750,bg:s.bad===r.j?BLUSH:WHITE,ring:s.bad===r.j?NO:null}));
 line('One word has the wrong ending, a spelling slip, or the wrong word class.',A.H*.6,13);if(s.msg)line(s.msg,A.H*.72,13,red())}
function fix(j){const s=V.fix;if(spent('fix'))return;const [W,bad,why]=FIX[s.i];let m;
 if(j===bad){s.i++;s.msg='';s.bad=null;A.sound.pop();return speak(`Found it. ${why}`)}
 s.bad=j;A.sound.miss();m=`${W[j].replace('.','')} is fine. Look for the verb that is spelt or built wrong.`;s.msg=m;speak(m)}
/* ---- pointer ---- */
function down(p){const n=cur();if(n!=='quiz'&&spent(n))return false;
 if(n==='build'){const r=sufR().find(r=>inside(p,r));if(r){drag={j:r.j,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}}
 if(n==='trim'){const r=letR().find(r=>inside(p,r,3));if(r)trim(r.j);else if(inside(p,keepR()))trim(-1)}
 if(n==='job'){const r=jobR().find(r=>inside(p,r));if(r)job(r.v)}
 if(n==='find'){const r=rowR(FIND[V.find.i][0]).find(r=>inside(p,r,4));if(r)find(r.j)}
 if(n==='fix'){const r=rowR(FIX[V.fix.i][0]).find(r=>inside(p,r,4));if(r)fix(r.j)}return false}
function move(p){if(!drag)return;drag.x=p.x;drag.y=p.y;A.redraw()}
function up(p){if(!drag)return;const d=drag,tap=Math.hypot(p.x-d.x0,p.y-d.y0)<8;drag=null;
 if(tap||inside(p,slotR(),20)||inside(p,rootR(),10)){const t=SUF[d.j];build(t)}else A.redraw()}
function reset(){epoch++;drag=null;for(const q in V)delete V[q];Object.assign(V,{build:{i:0},trim:{i:0},job:{i:0},find:{i:0},fix:{i:0},check:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();V.check()}
function begin(i,first,ok,msg){reset();speak(first);V.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function auto(i,acts,ms){steps[i].go();const me=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(me===epoch)f()},ms*(j+1)))}
function keys(){if(!pad)return;pad.innerHTML='';const n=cur(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pad,t).onclick=f};if(n==='quiz'||spent(n))return;
 if(n==='build'){const r=ROOTS[V.build.i][0];SUF.forEach(t=>add(t,()=>build(t),`Add ${t} to ${r}`))}
 if(n==='trim'){const [root]=TRIM[V.trim.i];[...root].forEach((ch,j)=>add(ch,()=>trim(j),`Drop letter ${j+1}, ${ch}`));add('Keep every letter',()=>trim(-1))}
 if(n==='job')jobR().forEach(r=>add(r.t,()=>job(r.v),`Use ${r.t}`));
 if(n==='find')FIND[V.find.i][0].forEach((w,j)=>add(w.replace('.',''),()=>find(j),`${w.replace('.','')} is the verb`));
 if(n==='fix')FIX[V.fix.i][0].forEach((w,j)=>add(w.replace('.',''),()=>fix(j),`${w.replace('.','')} is wrong`))}
const steps=[
{h:'Suffixes make verbs',p:'A verb is a doing word. Add a suffix to some nouns and adjectives and they become verbs. Drag a suffix onto the word, or tap a button.',
predict:{q:'Can any of these suffixes go on any word, like classise?',opts:['yes, they all mean make','no, each word takes its own'],ans:1},task:'Make all 6 verbs',
show:()=>auto(0,ROOTS.map(q=>()=>build(q[2])),550),go:()=>begin(0,'Drag the suffix that turns the word into a verb.',()=>spent('build'),'Each root takes one suffix.')},
{h:'Drop the e or y',p:'These suffixes start with a vowel. Some roots end in a letter that has to go first. Tap the letter that drops, or keep them all.',
predict:{q:'simple + -ify: do you keep every letter, simpleify?',opts:['yes, never change the root','no, the final e drops'],ans:1},task:'Fix all 6 roots',
show:()=>auto(1,TRIM.map(q=>()=>trim(q[2])),550),go:()=>begin(1,'Tap the letter that drops, or Keep every letter.',()=>spent('trim'),'A final e or y drops before the suffix.')},
{h:'Noun, adjective or verb?',p:'The root and the verb do different jobs. Read the words around the gap. Is it a thing, a describing word, or an action?',
predict:{q:'Bees ▢ the flowers. Can pollen fill the gap?',opts:['yes, the sentence is about pollen','no, the gap needs a verb'],ans:1},task:'Fill all 6 gaps',
show:()=>auto(2,JOB.map(q=>()=>job(q[3])),550),go:()=>begin(2,'Pick the word that does the job in the gap.',()=>spent('job'),'The job in the sentence picks the word class.')},
{h:'Spot the new verb',p:'Find the verb that was made from a noun or an adjective. Not every verb was made this way.',task:'Find all 4',
show:()=>auto(3,FIND.map(q=>()=>find(q[1])),650),go:()=>begin(3,'Tap the verb made with a suffix.',()=>spent('find'),'Every converted verb found.')},
{h:'Find the slip',p:'Use every rule at once. One word in each sentence is wrong.',task:'Fix all 4',
show:()=>auto(4,FIX.map(q=>()=>fix(q[1])),650),go:()=>begin(4,'Tap the word that is wrong.',()=>spent('fix'),'Every slip found.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>V.check()});
const QS=[
{q:'Turn the adjective pure into a verb.',a:'purify',o:[['pureify','Drop the final e before -ify: purify.'],['purise','pure takes -ify, not -ise.']]},
{q:'Which suffix turns the noun hyphen into a verb?',a:'-ate',o:[['-ify','hyphenify is not a word. It is hyphenate.'],['-en','hyphenen is not a word. Try -ate.']]},
{q:'We need to ▢ the shells into groups.',a:'classify',o:[['class','class is a noun. After need to, use the verb.'],['classate','class takes -ify: classify.']]},
{q:'Which word is spelt right?',a:'apologise',o:[['apologyse','Drop the y before -ise.'],['apologyise','The y must go: apologise.']]},
{q:'In "The cold will solidify the wax", which word class was solid before the suffix?',a:'adjective',o:[['verb','solid on its own is a describing word, not a verb.'],['noun','solid describes a thing, so it is an adjective.']]},
{q:'Which sentence uses the verb correctly?',a:'Knives sharpen well on stone.',o:[['Knives sharp well on stone.','sharp is an adjective. The verb is sharpen.'],['Knives sharpify well on stone.','sharp takes -en, not -ify.']]}];
function ask(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,''],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=quiz.querySelector('.fl-pick');ord.forEach(([v,why])=>{c.el('button',{type:'button',class:'lbtn'},g,v).onclick=()=>mark(why,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(why,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=!why;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+why)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':why)}
function draw(){const n=cur();if(n==='quiz'){ground();head('Challenge',1);['noun or adjective + suffix = verb','-ify, -ise, -ate, -en','drop a final e or y first'].forEach((t,i)=>card({x:14,y:A.H*(.2+i*.24),w:A.W-28,h:A.H*.18},t,{n:17,bg:[BUTTER,MINT,FROST][i]}));return}
 ({build:drawBuild,trim:drawTrim,job:drawJob,find:drawFind,fix:drawFix})[n]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:B=>{quiz.hidden=B.step!==5;pad.hidden=B.step===5;keys()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Verb buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});keys()}}).start()})})();
