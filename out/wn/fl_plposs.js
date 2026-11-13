/* Flagship – apostrophes for plural possession (ages 7–10; NC England English Appendix 2, Year 4: "the possessive
   apostrophe with plural nouns", e.g. girls', boys'; Appendix 1 Y3–4 spelling; CCSS L.3.2d, L.4.2d). Count the owners in a
   picture, drop the mark after the whole owner word, add 's to plurals with no s, read who owns what, and proofread. */
(()=>{
/* who owns it: [owner noun, how many owners, the thing] */
const COUNT=[['girl',3,'bags'],['dog',1,'bowl'],['horse',2,'field'],['boy',1,'bikes']];
/* where does the mark go: [owner word as written, the thing, the plain-English phrase] */
const DROP=[['girls','coats','the coats that belong to the girls'],['cat','tail','the tail that belongs to the cat'],['teachers','room','the room that belongs to the teachers'],['horse','saddle','the saddle that belongs to the horse'],['babies','cots','the cots that belong to the babies']];
/* plurals that do not end in s: [plural, singular, the thing] */
const NOS=[['children','child','toys'],['women','woman','team'],['men','man','shoes'],['mice','mouse','tails']];
const ENDS=["'s","'","s'"];
/* read it back: [phrase, 0 one owner / 1 more than one, owner word] */
const READ=[["the dog's bones",0,'dog'],["the dogs' bones",1,'dogs'],["the girls' team",1,'girls'],["the cat's kittens",0,'cat'],["the men's coats",1,'men']];
/* proofread: [sentence words, index of the wrong word, its fix, slip] */
const PROOF=[[['The','three',"boy's",'bikes','were','red.'],2,"boys'",'one'],[['Both',"cat's",'were','asleep.'],1,'cats','plain'],
 [['The',"childrens'",'coats','were','wet.'],1,"children's",'nos'],[['All','the',"girls's",'shoes','were','muddy.'],2,"girls'",'double'],[['The','womens','race','starts','at','ten.'],1,"women's",'none']];
const SLIPS={one:"boy's means one boy. There are three boys, so the owner word is boys and the mark goes after it: boys'.",
 plain:'cats just means more than one cat. Nothing belongs to them in this sentence, so there is no apostrophe.',
 nos:"children is already plural and does not end in s. Add 's to the whole word: children's.",
 double:"girls already ends in s, so add only the mark: girls'. Do not add another s.",none:"The race belongs to the women, so it needs a possessive apostrophe. women does not end in s: women's."};
const plus=w=>w.endsWith('s')?w+"'":w+"'s";
VIS.reg('flagplposs',c=>{let A,g,keys,quiz,round=-1,gen=0;const st={};
const DK='#0f172a',GOOD='#047857',BAD='#be123c',PAPER='#ffffff',EDGE='#64748b',MARK='#b45309',TAG='#fef3c7',PICK='#1d4ed8';
const FIG=['#2563eb','#db2777','#059669','#7c3aed'];
const sz=n=>Math.round(n*(A.narrow?.95:1.08)),fnt=(n,w)=>`${w||700} ${sz(n)}px system-ui,sans-serif`;
const mode=()=>['count','drop','nos','read','proof','quiz'][A.step],inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
const LISTS={count:COUNT,drop:DROP,nos:NOS,read:READ,proof:PROOF},finished=k=>st[k].n>=LISTS[k].length;
function paper(){g.fillStyle=A.col.dark?'#0b1120':'#f8fafc';g.fillRect(0,0,A.W,A.H)}
function font(n,w,al){g.font=fnt(n,w);g.textAlign=al||'center';g.textBaseline='middle'}
function card(r,label,o){o=o||{};g.fillStyle=o.fill||PAPER;A.paint.rrect(r.x,r.y,r.w,r.h,11);g.fill();g.lineWidth=o.edge?3.5:1.4;g.strokeStyle=o.edge||EDGE;g.stroke();
 if(label!=null){g.fillStyle=o.ink||DK;font(o.n||17,o.w||750);lines(label,r.x+r.w/2,r.y+(o.top?sz(o.n||17):r.h/2),r.w-16,o.n||17)}}
/* text centred on (x, y), broken onto extra lines when wider than w */
function lines(t,x,y,w,n){const out=[];let row='';t.split(' ').forEach(word=>{const k=row?row+' '+word:word;if(g.measureText(k).width>w&&row){out.push(row);row=word}else row=k});out.push(row);
 const lh=sz(n)*1.25;out.forEach((s,i)=>g.fillText(s,x,y+(i-(out.length-1)/2)*lh))}
function title(t,won){font(14,800);const w=Math.min(A.W-8,g.measureText(t).width+26),h=sz(14)+14,y=A.H*.02;card({x:A.W/2-w/2,y,w,h},null,{fill:won?'#d1fae5':PAPER,edge:won?GOOD:null});g.fillStyle=DK;g.fillText(t,A.W/2,y+h/2+1,w-12)}
function note(t,y,n,col){g.fillStyle=col===BAD&&A.col.dark?'#fda4af':col||A.col.tx;font(n||15,650);lines(t,A.W/2,y,A.W-26,n||15)}
function wrapUp(t,L){paper();title(t,1);L.forEach((s,i)=>card({x:12,y:A.H*(.14+i*.2),w:A.W-24,h:A.H*.17},s,{n:17,fill:'#ecfdf5'}))}
/* a simple person or animal: round head, body, coloured by k */
function owner(x,y,s,k){g.fillStyle=FIG[k%4];g.beginPath();g.arc(x,y-s*.55,s*.3,0,7);g.fill();A.paint.rrect(x-s*.32,y-s*.2,s*.64,s*.75,s*.2);g.fill()}
function thing(x,y,s){g.fillStyle=MARK;A.paint.rrect(x-s*.22,y-s*.18,s*.44,s*.36,4);g.fill()}
function crowd(cx,y,n,s,withThing){const gap=s*.95;for(let i=0;i<n;i++){const x=cx+(i-(n-1)/2)*gap;owner(x,y,s,i);if(withThing)thing(x+s*.38,y+s*.32,s*.8)}}
/* step 1: count the owners */
function cTiles(){const w=Math.min(sz(170),(A.W-36)/2),h=sz(58),flip=st.count.n%2;return [0,1].map(j=>({j,x:A.W/2+((j+flip)%2?6:-w-6),y:A.H*.7,w,h}))}
function cWords(i){const [o,,t]=COUNT[i];return [`the ${o}'s ${t}`,`the ${o}s' ${t}`]}
function drawCount(){const s=st.count;paper();if(finished('count'))return wrapUp('All 4 pictures named',COUNT.map(q=>q[1]>1?`the ${q[0]}s' ${q[2]}: ${q[1]} owners`:`the ${q[0]}'s ${q[2]}: 1 owner`));
 const [o,n]=COUNT[s.n];title(`Picture ${s.n+1} of 4: how many owners?`);crowd(A.W/2,A.H*.36,n,sz(50),1);note(`${n} ${n>1?o+'s':o}`,A.H*.54,17);
 cTiles().forEach(r=>card(r,cWords(s.n)[r.j],{n:17,edge:s.bad===r.j?BAD:null,fill:s.bad===r.j?'#ffe4e6':PAPER}));if(s.msg)note(s.msg,A.H*.9,14,BAD)}
function count(j){const s=st.count;if(finished('count'))return;const [o,n,t]=COUNT[s.n],ok=n>1?1:0;let m;
 if(j===ok){s.n++;s.bad=null;s.msg='';A.sound.pop();return tell(n>1?`Yes: ${n} ${o}s own them, so write the owner word ${o}s, then the mark: the ${o}s' ${t}.`:`Yes: one ${o}, so write ${o}, then 's: the ${o}'s ${t}.`)}
 s.bad=j;A.sound.miss();m=n>1?`${o}'s means one ${o}. The picture shows ${n} ${o}s, so the mark goes after the s: ${o}s'.`:`${o}s' means more than one ${o}. There is only one, so write ${o}'s.`;s.msg=m;tell(m)}
/* step 2: drop the mark after the whole owner word */
function dGaps(){const w=DROP[st.drop.n][0],cw=Math.min(sz(40),(A.W-30)/(w.length+1.2)),h=sz(56),x0=A.W/2-cw*w.length/2,y=A.H*.36;
 const L=[...w].map((ch,i)=>({ch,x:x0+i*cw,y,w:cw,h})),G=[...Array(w.length+1)].map((_,i)=>({i,x:x0+i*cw-cw*.32,y:y-6,w:cw*.64,h:h+12}));return {L,G}}
function home(){return {x:A.W/2-sz(30),y:A.H*.66,w:sz(60),h:sz(60)}}
function drawDrop(){const s=st.drop;paper();if(finished('drop'))return wrapUp('All 5 marks placed',DROP.slice(0,4).map(q=>`the ${plus(q[0])} ${q[1]}`));
 const [w,t,plain]=DROP[s.n],{L,G}=dGaps();title(`Word ${s.n+1} of 5: drag the ' into a gap`);note(plain,A.H*.17,15);
 L.forEach(r=>card(r,r.ch,{n:24,w:800}));G.forEach(r=>{g.strokeStyle=s.bad===r.i?BAD:st.drag?PICK:EDGE;g.lineWidth=2;g.setLineDash([4,3]);g.strokeRect(r.x+r.w*.3,r.y,r.w*.4,r.h);g.setLineDash([])});
 font(18,750);g.fillStyle=A.col.tx;g.fillText(t,A.W/2,L[0].y+L[0].h+sz(28));
 const hm=home(),at=st.drag?{...hm,x:st.drag.x-hm.w/2,y:st.drag.y-hm.h/2}:hm;card(at,"'",{n:34,w:900,fill:TAG,ink:'#78350f',edge:st.drag?PICK:null});
 if(s.msg)note(s.msg,A.H*.89,14,BAD)}
function drop(i){const s=st.drop;if(finished('drop'))return;const [w,t]=DROP[s.n];let m;s.msg='';
 if(i===w.length){s.n++;s.bad=null;A.sound.pop();return tell(w.endsWith('s')?`the ${w}' ${t}: ${w} already ends in s, so the mark goes after it and no extra s is added.`:`the ${w}'s ${t}: ${w} is one owner, so write ${w}, then 's.`)}
 s.bad=i;A.sound.miss();
 if(w.endsWith('s')&&i===w.length-1)m=`That makes ${w.slice(0,-1)}'s, which means one. The owner word is ${w}, so the mark goes after its last letter.`;
 else m=`That splits the word ${w}. Never break the owner word: write all of it first, then add the mark at the end.`;s.msg=m;tell(m)}
/* step 3: plurals that do not end in s */
function eTiles(){const w=Math.min(sz(84),(A.W-40)/3),h=sz(58),all=3*w+20;return ENDS.map((e,j)=>({j,e,x:A.W/2-all/2+j*(w+10),y:A.H*.68,w,h}))}
function slotNos(){const [p]=NOS[st.nos.n];font(26,800);const tw=g.measureText(p).width,x=A.W/2-(tw+sz(70))/2;return {x,tw,box:{x:x+tw+6,y:A.H*.3,w:sz(64),h:sz(56)}}}
function drawNos(){const s=st.nos;paper();if(finished('nos'))return wrapUp('All 4 owners written',NOS.map(q=>`the ${q[0]}'s ${q[2]}`));
 const [p,one,t]=NOS[s.n],{x,box}=slotNos();title(`Word ${s.n+1} of 4: which ending?`);note(`one ${one}, many ${p}: the ${t} belong to the ${p}`,A.H*.18,15);
 g.fillStyle=A.col.tx;font(26,800,'left');g.fillText(p,x,box.y+box.h/2);g.strokeStyle=s.bad!=null?BAD:PICK;g.lineWidth=2;g.setLineDash([5,4]);g.strokeRect(box.x,box.y,box.w,box.h);g.setLineDash([]);
 font(18,700);g.fillStyle=A.col.tx;g.fillText(t,A.W/2,box.y+box.h+sz(30));
 eTiles().forEach(r=>{const d=st.drag&&st.drag.j===r.j;card(d?{...r,x:st.drag.x-r.w/2,y:st.drag.y-r.h/2}:r,r.e,{n:26,w:900,fill:TAG,ink:'#78350f',edge:s.bad===r.j?BAD:d?PICK:null})});
 if(s.msg)note(s.msg,A.H*.89,14,BAD)}
function ending(j){const s=st.nos;if(finished('nos'))return;const [p,,t]=NOS[s.n];let m;
 if(j===0){s.n++;s.bad=null;s.msg='';A.sound.pop();return tell(`the ${p}'s ${t}: ${p} is plural but has no s at the end, so it takes 's.`)}
 s.bad=j;A.sound.miss();m=j===1?`${p}' is missing its s. Only a word that ends in s gets the mark alone. ${p} does not, so add 's.`:`There is no word ${p}s: ${p} is already plural. Write the owner word as it is, then 's.`;s.msg=m;tell(m)}
/* step 4: read who owns it */
function rCards(){const w=Math.min(sz(200),(A.W-36)/2),h=A.H*.4;return [0,1].map(j=>({j,x:A.W/2+(j?6:-w-6),y:A.H*.36,w,h}))}
function drawRead(){const s=st.read;paper();if(finished('read'))return wrapUp('All 5 phrases read',['Everything before the mark is the owner word.',"dog's: one dog. dogs': more than one.","men's: men is already more than one."]);
 const [ph]=READ[s.n];title(`Phrase ${s.n+1} of 5: one owner or more?`);note(ph,A.H*.22,22);
 rCards().forEach(r=>{card(r,r.j?'more than one owner':'one owner',{n:15,top:1,edge:s.bad===r.j?BAD:null,fill:s.bad===r.j?'#ffe4e6':PAPER});g.save();crowdOn(r);g.restore()});if(s.msg)note(s.msg,A.H*.88,14,BAD)}
function crowdOn(r){const n=r.j?3:1,s=Math.min(sz(40),r.w/(n+.6));const sv=g.fillStyle;crowd(r.x+r.w/2,r.y+r.h*.64,n,s,0);g.fillStyle=sv}
function read(j){const s=st.read;if(finished('read'))return;const [ph,ans,ow]=READ[s.n];let m;
 if(j===ans){s.n++;s.bad=null;s.msg='';A.sound.pop();return tell(`Yes: the owner word is ${ow}, so ${ans?'more than one':'one'} owns it.`)}
 s.bad=j;A.sound.miss();
 if(ow==='men')m='men is already more than one man, even though it has no s. men\'s means the coats of many men.';
 else if(ans)m=`Everything before the mark is the owner word: ${ow}. That is more than one.`;
 else m=`The mark comes straight after ${ow}, so the owner word is ${ow}: just one. The things can be many, but they belong to one.`;s.msg=m;tell(m)}
/* step 5: proofread */
function pChips(){const [W]=PROOF[st.proof.n];font(19,750);const h=sz(19)+sz(20);let x=12,y=A.H*.3;return W.map((t,i)=>{const w=g.measureText(t).width+sz(16);if(x+w>A.W-12&&x>12){x=12;y+=h+8}const r={t,i,x,y,w,h};x+=w+7;return r})}
function drawProof(){const s=st.proof;paper();if(finished('proof'))return wrapUp('All 5 sentences fixed',PROOF.slice(0,4).map(q=>q[0].map((t,i)=>i===q[1]?q[2]:t).join(' ')));
 title(`Sentence ${s.n+1} of 5: tap the word with the mistake`);
 pChips().forEach(r=>{const no=s.bad===r.i;g.fillStyle=no?'#ffe4e6':PAPER;A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.lineWidth=no?3:1.3;g.strokeStyle=no?BAD:EDGE;g.stroke();g.fillStyle=DK;font(19,750);g.fillText(r.t,r.x+r.w/2,r.y+r.h/2+1)});
 if(s.msg)note(s.msg,A.H*.8,14,BAD)}
function proof(i){const s=st.proof;if(finished('proof'))return;const [W,k,fx,slip]=PROOF[s.n];let m;
 if(i===k){s.n++;s.bad=null;s.msg='';A.sound.pop();return tell(`Fixed: ${W.map((t,j)=>j===k?fx:t).join(' ')} ${SLIPS[slip]}`)}
 s.bad=i;A.sound.miss();m=`“${W[i]}” is fine. Look for the owner word, or a word with an apostrophe it should not have.`;s.msg=m;tell(m)}
/* pointer input: taps for cards and chips, drags for the apostrophe and ending tiles */
function down(p){const k=mode();
 if(k==='count'&&!finished('count')){const r=cTiles().find(r=>inside(p,r));if(r)count(r.j)}
 if(k==='read'&&!finished('read')){const r=rCards().find(r=>inside(p,r));if(r)read(r.j)}
 if(k==='proof'&&!finished('proof')){const r=pChips().find(r=>inside(p,r));if(r)proof(r.i)}
 if(k==='drop'&&!finished('drop')&&inside(p,home())){st.drag={x:p.x,y:p.y};A.redraw();return true}
 if(k==='nos'&&!finished('nos')){const r=eTiles().find(r=>inside(p,r));if(r){st.drag={j:r.j,x:p.x,y:p.y};A.redraw();return true}}return false}
function move(p){if(st.drag){st.drag.x=p.x;st.drag.y=p.y;A.redraw()}}
function up(p){const d=st.drag;if(!d)return;st.drag=null;const k=mode();
 if(k==='drop'){const {G}=dGaps(),best=G.map(r=>({i:r.i,d:Math.hypot(p.x-(r.x+r.w/2),p.y-(r.y+r.h/2))})).sort((a,b)=>a.d-b.d)[0];if(best&&best.d<sz(60))return drop(best.i)}
 if(k==='nos'){const {box}=slotNos();if(p.y<A.H*.6||inside(p,box))return ending(d.j)}A.redraw()}
function reset(){gen++;for(const k in st)delete st[k];Object.assign(st,{count:{n:0},drop:{n:0},nos:{n:0},read:{n:0},proof:{n:0},drag:null,check:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keyRow();st.check()}
function open(i,first,ok,msg){reset();tell(first);st.check=()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))}}
function demo(i,acts,ms){steps[i].go();const me=gen;acts.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},ms*(j+1)))}
function keyRow(){if(!keys)return;keys.innerHTML='';const k=mode(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},keys,t).onclick=f};
 if(k==='count'&&!finished('count'))cTiles().sort((x,y)=>x.x-y.x).forEach(r=>b(cWords(st.count.n)[r.j],()=>count(r.j)));
 if(k==='drop'&&!finished('drop')){const w=DROP[st.drop.n][0];[...Array(w.length+1)].forEach((_,i)=>b(i===w.length?w+" ▸ '":w.slice(0,i)+"'"+w.slice(i),()=>drop(i),i===w.length?`Apostrophe after the whole word ${w}`:`Apostrophe after ${w.slice(0,i)||'nothing'}, before ${w.slice(i)}`))}
 if(k==='nos'&&!finished('nos'))ENDS.forEach((e,j)=>b(NOS[st.nos.n][0]+(e==="s'"?"s'":e),()=>ending(j),`Write ${NOS[st.nos.n][0]}${e==="s'"?"s'":e}`));
 if(k==='read'&&!finished('read'))['one owner','more than one owner'].forEach((t,j)=>b(t,()=>read(j)));
 if(k==='proof'&&!finished('proof'))PROOF[st.proof.n][0].forEach((t,i)=>b(t,()=>proof(i),`The word ${t} has the mistake`))}
const steps=[
{h:'Count the owners',p:"Look at the picture. Count who owns the things. One owner takes 's. More than one owner that ends in s takes just the mark after the s.",
predict:{q:'Three girls each have a bag. Which is right?',opts:["the girl's bags","the girls' bags"],ans:1},task:'Name all 4 pictures',
show:()=>demo(0,COUNT.map(q=>()=>count(q[1]>1?1:0)),650),go:()=>open(0,'Tap the words that match the picture.',()=>finished('count'),'Count the owners first.')},
{h:'Owner word first',p:"Write the whole owner word first. Then put the apostrophe straight after it. If the owner word already ends in s, stop there. If not, add s.",
predict:{q:"The owner word is teachers. Where does the mark go?",opts:["teacher's","teachers'"],ans:1},task:'Place all 5 marks',
show:()=>demo(1,DROP.map(q=>()=>drop(q[0].length)),600),go:()=>open(1,"Drag the ' into a gap.",()=>finished('drop'),'Whole word, then the mark.')},
{h:'Plurals with no s',p:"Some plurals do not end in s: children, women, men, mice. They still mean more than one, but they take 's, just like one owner.",
predict:{q:'Which is right?',opts:["the childrens' toys","the children's toys"],ans:1},task:'Write all 4 owners',
show:()=>demo(2,NOS.map(()=>()=>ending(0)),600),go:()=>open(2,'Drag the right ending into the box.',()=>finished('nos'),"No s at the end? Add 's.")},
{h:'Read it back',p:'To read a possessive, look at the word before the apostrophe. That is the owner word. It tells you if there is one owner or more.',task:'Read all 5 phrases',
show:()=>demo(3,READ.map(q=>()=>read(q[1])),600),go:()=>open(3,'Tap one owner or more than one owner.',()=>finished('read'),'The owner word is everything before the mark.')},
{h:'Proofread',p:'Each sentence has one mistake. It could be a mark in the wrong place, a missing mark, or a mark on a word that owns nothing.',task:'Fix all 5 sentences',
show:()=>demo(4,PROOF.map(q=>()=>proof(q[1])),650),go:()=>open(4,'Tap the word with the mistake.',()=>finished('proof'),'Check every word that ends in s.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.check()});
const QS=[
{q:'Lots of dogs share one kennel. Which is right?',a:"the dogs' kennel",o:[["the dog's kennel","dog's means one dog. With many dogs the owner word is dogs, so the mark goes after the s."],["the dogs kennel","The kennel belongs to the dogs, so it needs an apostrophe."]]},
{q:'Which is right?',a:"the women's coats",o:[["the womens' coats","There is no word womens. women is already plural: women's."],["the women' coats","women does not end in s, so it needs 's, not the mark alone."]]},
{q:"What does “the boys' bikes” tell you?",a:'more than one boy owns them',o:[['one boy owns them',"The owner word is boys, everything before the mark: more than one."],['the bikes are boys','The mark shows the bikes belong to the boys.']]},
{q:'Which sentence is right?',a:'I picked three apples.',o:[["I picked three apple's.","apples just means more than one apple. Nothing belongs to them, so no apostrophe."],["I picked three apples'.","The apples do not own anything, so there is no apostrophe at all."]]},
{q:'The mice share a nest. Which is right?',a:"the mice's nest",o:[["the mices' nest","There is no word mices. mice is already plural, so add 's."],["the mouse's nest","mouse's means one mouse. There are many mice."]]}];
function ask(){round++;const Q=QS[round%QS.length],all=[[Q.a,''],...Q.o],r=round%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([v,m])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>verdict(m,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function verdict(m,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=!m;if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+m)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':m)}
function draw(){const k=mode();if(k==='quiz'){paper();title('Challenge',1);["one owner: the girl's bag","many owners: the girls' bags","plural with no s: the children's toys"].forEach((t,i)=>note(t,A.H*(.32+i*.16),17));return}
 ({count:drawCount,drop:drawDrop,nos:drawNos,read:drawRead,proof:drawProof})[k]();A.fx.draw(A.ctx)}
FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:B=>{quiz.hidden=B.step!==5;keys.hidden=B.step===5;keyRow()},
 init:B=>{A=B;g=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);keys=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Apostrophe buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});keyRow()}}).start()})})();
