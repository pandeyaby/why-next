/* Flagship – main ideas and note-taking (ages 7–10). Every drag or tap has a button twin; the canvas label narrates. */
(()=>{
/* each paragraph: text, main idea, one tempting detail, and the order its three cards appear in */
const HOG=[
 ['Hedgehogs live in hedges, woods and gardens. In the day they sleep in a nest of leaves under a bush or a log pile. They come out at night.','Where hedgehogs live and sleep','They sleep under a log pile',[0,1,2]],
 ['Hedgehogs eat beetles, worms, slugs and caterpillars. They sniff out food with their long nose. In one night a hedgehog can walk up to 2 km to find food.','What hedgehogs eat and how they find it','They eat slugs',[1,0,2]],
 ['A hedgehog has about 5,000 to 7,000 sharp spines. When it is scared, it rolls into a tight ball. Then the spines stick out and keep it safe from foxes and badgers.','How spines keep a hedgehog safe','It has about 6,000 spines',[2,1,0]],
 ['In winter there are very few insects to eat. So hedgehogs hibernate from about November to March. Their heart beats much more slowly, and they live off their body fat.','How hedgehogs get through winter','Their heart beats slowly',[0,2,1]]];
const cards=P=>P[3].map(k=>[[P[1],'ok'],[P[2],'one'],['Hedgehogs','whole']][k]);
const ODD=[[HOG[1][1],['Hedgehogs eat beetles, worms and slugs.','They sniff out food with their long nose.','Hedgehogs are in lots of picture books.','They can walk 2 km in a night to find food.'],2],
 [HOG[2][1],['A hedgehog has thousands of sharp spines.','Baby hedgehogs are called hoglets.','When it is scared, it rolls into a ball.','The spines stick out and keep it safe.'],1],
 [HOG[3][1],['In winter there are few insects to eat.','So hedgehogs hibernate until spring.','Their heart beats much more slowly.','Hedgehogs can swim and climb.'],3]];
const SUM=[['Hedgehogs sleep in leafy nests by day and look for bugs, worms and slugs at night.','ok'],['A hedgehog can walk up to 2 km in one night.','detail'],
 ['When a hedgehog is scared, it rolls into a spiky ball to stay safe.','ok'],['I think hedgehogs are the cutest animals.','view'],
 ['Hedgehogs eat beetles, worms, slugs and caterpillars. They sniff out food with their long nose.','copy'],['In winter, when food is scarce, hedgehogs hibernate.','ok']];
const BAT='Most bats in the UK roost in trees, caves and the roofs of houses. They hunt moths, midges and other insects at night. Bats find food in the dark by echolocation: they make high calls and listen for the echoes.';
const ROWS=['🏠 Home','🍽️ Food','📡 Finds food by','🗑️ Not a good note'];
const NOTES=[['trees, caves, roofs',0],['They hunt moths, midges and other insects at night.',3,'copy'],['moths, midges, insects',1],['spooky and scary',3,'view'],['echolocation: calls + echoes',2]];
const HOW=[['Compare where a hedgehog, a bat and a fox live and what they eat.',0],['Record how a frog grows, from frogspawn to adult.',1],['Jot down facts about owls under a few headings.',2]];
const KINDS=[['▦','Table','to compare things side by side','a table'],['①②③','Numbered steps','for things that happen in order','numbered steps'],['✳','Spider diagram','for facts about one thing','a spider diagram']];
VIS.reg('flaggist',c=>{let A,pad,qb,qi=-1,gen=0,streak=0;c.fig.classList.add('young');
const blank=()=>({next:()=>{},n:0,r:0,order:[],hold:null,wrong:-1,flash:-1,kept:[],tbl:['','','']}),S=blank();
const kind=()=>['idea','odd','sum','tbl','how','quiz'][A.step],fast=()=>A.reduced();
const need=()=>({idea:3,odd:3,sum:6,tbl:5,how:3}[kind()]||99);
function speak(t){c.say(t);A&&A.cv.setAttribute('aria-label',t)}
function txt(g,s,x,y,n,col,al,mw){g.font=`700 ${n+1}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(s,x,y,mw||A.W-12)}
/* wrap s to width mw; centre on y, or start at y when top */
function block(g,s,x,y,n,mw,col,al,top){g.font=`700 ${n+1}px system-ui,sans-serif`;const out=[];let line='';
 for(const w of s.split(' ')){const t=line?line+' '+w:w;if(line&&g.measureText(t).width>mw){out.push(line);line=w}else line=t}out.push(line);
 const lh=(n+1)*1.3,y0=top?y+lh/2:y-(out.length-1)*lh/2;out.forEach((l,i)=>txt(g,l,x,y0+i*lh,n,col,al,mw));return out.length*lh}
function tile(g,r,fill,line,lw,dash){g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();if(dash)g.setLineDash([7,5]);g.lineWidth=lw||2;g.strokeStyle=line;g.stroke();g.setLineDash([])}
const cb=(g,t,r,n,col)=>block(g,t,r.x+r.w/2,r.y+r.h/2,n,r.w-16,col),ring=(g,r,fill,col,on,dash)=>tile(g,r,fill,on?col:ink(),on?4:2,dash);
const inR=(p,r)=>r&&p.x>=r.x-5&&p.x<=r.x+r.w+5&&p.y>=r.y-5&&p.y<=r.y+r.h+5;
const ink=()=>A.mix(A.col.tx,A.col.pn,.4),paper=()=>A.col.dark?'#1e293b':'#ffffff',wash=h=>A.mix(A.col.pn,h,A.col.dark?.18:.5);
const moved=r=>{const h=S.hold;return h&&h.x!=null?{...r,x:h.x-r.w/2,y:h.y-r.h/2}:r};
/* layout */
const page=()=>({x:8,y:8,w:A.W-16,h:A.H*.4}),slot=()=>({x:8,y:A.H*.45,w:A.W-16,h:A.H*.11});
const tray=i=>({x:8,y:A.H*(.6+i*.13),w:A.W-16,h:A.H*.11});
const lineBox=i=>({x:8,y:A.H*(.14+i*.2),w:A.W-16,h:A.H*.18});
const sumBox=()=>({x:8,y:8,w:A.W-16,h:A.H*.4}),loose=()=>({x:8,y:A.H*.45,w:A.W-16,h:A.H*.2}),sumCard=()=>({x:8,y:A.H*.69,w:A.W-16,h:A.H*.29});
const batBox=()=>({x:8,y:6,w:A.W-16,h:A.H*.3}),row=i=>({x:8,y:A.H*(.33+i*.1),w:A.W-16,h:A.H*.09}),note=()=>({x:A.W*.1,y:A.H*.76,w:A.W*.8,h:A.H*.18});
const kTile=i=>{const w=(A.W-32)/3;return{x:8+i*(w+8),y:A.H*.4,w,h:A.H*.42}};
function drawIdea(g){const C=A.col,P=HOG[S.r%4],K=cards(P);tile(g,page(),paper(),ink());txt(g,`Paragraph ${S.r%4+1} of 4`,16,24,12,C.mu,'left');
 block(g,P[0],A.W/2,40,14,A.W-40,C.tx,'center',true);const sl=slot(),won=S.n>S.r;
 ring(g,sl,won?wash('#bbf7d0'):A.alpha(C.vi,.08),won?C.gr:C.vi,won||S.flash===0,!won);
 cb(g,won?'Main idea: '+P[1]:'Main idea: drop it here',sl,13,won?C.tx:C.mu);
 if(!won)S.order.forEach((k,j)=>{const r=S.hold&&S.hold.k===j?moved(tray(j)):tray(j),bad=S.wrong===j;ring(g,r,paper(),C.rd,bad);cb(g,K[k][0],r,13)})}
function drawOdd(g){const C=A.col,R=ODD[S.r%3],won=S.n>S.r;tile(g,{x:8,y:6,w:A.W-16,h:A.H*.11},wash('#bae6fd'),ink());block(g,'Main idea: '+R[0],A.W/2,6+A.H*.055,13,A.W-36);
 R[1].forEach((s,i)=>{const r=lineBox(i),out=won&&i===R[2],bad=S.wrong===i;ring(g,r,out?wash('#fecaca'):paper(),out?C.rd:bad?C.am:C.vi,out||bad||S.flash===i);
  cb(g,(out?'✗ ':'')+s,r,13)})}
function drawSum(g){const C=A.col,sb=sumBox();ring(g,sb,wash('#bbf7d0'),C.vi,S.flash===0);txt(g,`✓ Summary (${S.kept.length} of 3 sentences)`,16,sb.y+16,12,C.tx,'left');
 let y=sb.y+30;S.kept.slice().sort((a,b)=>a-b).forEach(k=>{y+=block(g,SUM[k][0],sb.x+12,y,12,sb.w-24,C.tx,'left',true)+4});
 const lb=loose();ring(g,lb,A.alpha(C.mu,.08),C.vi,S.flash===1,true);txt(g,`✗ Leave out (${S.n-S.kept.length})`,16,lb.y+16,12,C.tx,'left');
 const k=S.order[0];if(k==null)return;const r=moved(sumCard());ring(g,r,paper(),C.rd,S.wrong===k);cb(g,SUM[k][0],r,14)}
function drawTbl(g){const C=A.col,bb=batBox();tile(g,bb,paper(),ink());txt(g,'🦇 Bats',16,bb.y+14,12,C.mu,'left');block(g,BAT,A.W/2,bb.y+26,12,bb.w-20,C.tx,'center',true);
 ROWS.forEach((h,i)=>{const r=row(i),w=Math.min(150,r.w*.38);ring(g,r,i===3?A.alpha(C.mu,.08):paper(),C.vi,S.flash===i,i===3);
  txt(g,h,r.x+8,r.y+r.h/2,12,C.tx,'left',i<3?w-10:r.w);if(i<3){g.strokeStyle=ink();g.beginPath();g.moveTo(r.x+w,r.y+4);g.lineTo(r.x+w,r.y+r.h-4);g.stroke();txt(g,S.tbl[i]||'…',r.x+w+8,r.y+r.h/2,12,S.tbl[i]?C.tx:C.mu,'left',r.w-w-14)}});
 const k=S.order[0];if(k==null){txt(g,'✓ Table done: key words in the right rows',A.W/2,A.H*.85,13,C.tx);return}
 const r=moved(note());ring(g,r,wash('#fde68a'),C.rd,S.wrong===k);cb(g,NOTES[k][0],r,13)}
function drawHow(g){const C=A.col,R=HOW[S.r%3],won=S.n>S.r;tile(g,{x:8,y:8,w:A.W-16,h:A.H*.28},wash('#e9d5ff'),ink());block(g,'Task: '+R[0],A.W/2,8+A.H*.14,14,A.W-40);
 KINDS.forEach((K,i)=>{const r=kTile(i),hit=won&&i===R[1],bad=S.wrong===i;ring(g,r,hit?wash('#bbf7d0'):paper(),hit?C.gr:bad?C.rd:C.vi,hit||bad||S.flash===i);
  txt(g,K[0],r.x+r.w/2,r.y+r.h*.3,Math.min(28,r.w*.2),C.tx);block(g,K[1],r.x+r.w/2,r.y+r.h*.68,13,r.w-10)})}
function drawQuiz(g){tile(g,page(),paper(),ink());block(g,HOG[1][0],A.W/2,40,14,A.W-40,A.col.tx,'center',true)}
function draw(A){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.04:.3);g.fillRect(0,0,A.W,A.H);
 ({idea:drawIdea,odd:drawOdd,sum:drawSum,tbl:drawTbl,how:drawHow,quiz:drawQuiz}[kind()])(g);A.fx.draw(g)}
function pulse(i){S.flash=i;const v=gen;setTimeout(()=>{if(v===gen){S.flash=-1;A.redraw()}},420)}
function oops(t){A.sound.miss();speak(t);A.redraw()}
function yes(t){S.n++;S.wrong=-1;A.sound.pop();speak(t);buttons();A.redraw();S.next()}
const oddSay=()=>speak('Main idea: '+ODD[S.r%3][0]+'. Tap the sentence that does not fit.'),later=(f,ms)=>{const v=gen;setTimeout(()=>{if(v===gen)f()},fast()?20:ms)};
/* tray card j onto the main-idea slot */
function pickIdea(j){const K=cards(HOG[S.r%4]),k=S.order[j];if(k==null||S.n>S.r||S.n>=3)return;pulse(0);const tag=K[k][1];
 if(tag==='one'){S.wrong=j;return oops(`“${K[k][0]}” is only one detail. What is the whole paragraph about?`)}
 if(tag==='whole'){S.wrong=j;return oops('“Hedgehogs” is the topic of the whole article. What does this paragraph say about them?')}
 yes(`Yes. Every sentence tells about this: ${K[k][0].toLowerCase()}.`);if(S.n<3)later(()=>{S.r++;S.order=[0,1,2];S.wrong=-1;speak(`Paragraph ${S.r+1}. Drop its main idea in the box.`);buttons();A.redraw()},1100)}
/* tap the sentence that does not back up the main idea */
function tapLine(i){const R=ODD[S.r%3];if(S.n>S.r||S.n>=3)return;pulse(i);
 if(i!==R[2]){S.wrong=i;return oops(`“${R[1][i]}” backs up the main idea: a key detail. Find one about something else.`)}
 yes(`Right. It is true, but not about ${R[0].toLowerCase()}.`);if(S.n<3)later(()=>{S.r++;S.wrong=-1;oddSay();buttons();A.redraw()},1100)}
/* top card to the summary (0) or leave out (1) */
function sortSum(b){const k=S.order[0];if(k==null)return;pulse(b);const tag=SUM[k][1];
 if(b===0&&tag!=='ok'){S.wrong=k;return oops(tag==='detail'?'That is a small detail. A summary keeps only the main points.':tag==='view'?'That is your opinion. A summary only says what the text says.':'That is copied word for word from one paragraph. Use your own short words.')}
 if(b===1&&tag==='ok'){S.wrong=k;return oops('Keep this one: the main idea of a paragraph in a few words.')}
 S.order.shift();if(b===0)S.kept.push(k);yes(b===0?'Kept: a main point.':'Left out: '+{detail:'a small detail.',view:'an opinion.',copy:'copied and too long.'}[tag])}
/* top note to table row i (3 = bin) */
function file(i){const k=S.order[0];if(k==null)return;pulse(i);const N=NOTES[k];
 if(N[1]===3&&i!==3){S.wrong=k;return oops(N[2]==='copy'?'That is a whole sentence copied out. A note is just the key words.':'That is an opinion. The text never says bats are spooky.')}
 if(N[1]!==i){S.wrong=k;return oops(i===3?'This is a good note. Which row does it answer?':`This note does not answer “${ROWS[i].slice(3)}”.`)}
 S.order.shift();if(i<3)S.tbl[i]=N[0];yes(i<3?`Recorded under ${ROWS[i].slice(3)}: ${N[0]}.`:'Binned: '+(N[2]==='copy'?'a copied sentence.':'an opinion.'))}
function chooseHow(i){const R=HOW[S.r%3];if(S.n>S.r||S.n>=3)return;pulse(i);
 const K=KINDS[R[1]];if(i!==R[1]){S.wrong=i;return oops(`You picked ${KINDS[i][3]}: that is ${KINDS[i][2]}. This task needs ${K[3]}, ${K[2]}.`)}yes(`Yes: ${K[3]}, ${K[2]}.`);
 if(S.n<3)later(()=>{S.r++;S.wrong=-1;speak('Task: '+HOW[S.r][0]);buttons();A.redraw()},1100)}
function buttons(){if(!pad)return;pad.innerHTML='';const m=kind();if(m==='quiz'||S.n>=need())return;
 const B=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},pad,t);b.onclick=f};
 if(m==='idea'&&S.n<=S.r)S.order.forEach((k,j)=>{const t=cards(HOG[S.r%4])[k][0];B(t,'Main idea: '+t,()=>pickIdea(j))});
 if(m==='odd'&&S.n<=S.r)ODD[S.r%3][1].forEach((s,i)=>B(`Sentence ${i+1}`,'Does not fit: '+s,()=>tapLine(i)));
 if(m==='sum'&&S.order.length){B('✓ Keep in summary','Keep in the summary: '+SUM[S.order[0]][0],()=>sortSum(0));B('✗ Leave out','Leave out: '+SUM[S.order[0]][0],()=>sortSum(1))}
 if(m==='tbl'&&S.order.length)ROWS.forEach((h,i)=>B(h,`Put “${NOTES[S.order[0]][0]}” in ${h.slice(3)}`,()=>file(i)));
 if(m==='how'&&S.n<=S.r)KINDS.forEach((K,i)=>B(K[0]+' '+K[1],'Record it as a '+K[1],()=>chooseHow(i)))}
function down(p){const m=kind();if(m==='quiz'||S.n>=need())return false;
 if(m==='odd'){const i=[0,1,2,3].find(j=>inR(p,lineBox(j)));if(i!=null)tapLine(i);return false}
 if(m==='how'){const i=[0,1,2].find(j=>inR(p,kTile(j)));if(i!=null)chooseHow(i);return false}
 if(m==='idea'&&S.n<=S.r){const j=S.order.findIndex((_,x)=>inR(p,tray(x)));if(j>=0)return grab(j,p)}
 if(m==='sum'&&S.order.length&&inR(p,sumCard()))return grab(0,p);
 if(m==='sum'){if(inR(p,sumBox()))sortSum(0);else if(inR(p,loose()))sortSum(1)}
 if(m==='tbl'&&S.order.length&&inR(p,note()))return grab(0,p);
 if(m==='tbl'&&S.order.length){const i=[0,1,2,3].find(j=>inR(p,row(j)));if(i!=null)file(i)}return false}
const grab=(k,p)=>!!(S.hold={k,x:null,x0:p.x,y0:p.y});
function move(p){const h=S.hold;if(h&&(h.x!=null||Math.hypot(p.x-h.x0,p.y-h.y0)>8)){h.x=p.x;h.y=p.y;A.redraw()}}
function up(p){const h=S.hold,m=kind();S.hold=null;if(!h)return;const dragged=h.x!=null;
 if(m==='idea'){if(dragged&&!inR(p,slot())){speak('Drop the card in the main-idea box.');return A.redraw()}return pickIdea(h.k)}
 if(m==='sum'){const b=inR(p,sumBox())?0:inR(p,loose())?1:-1;if(b<0){speak('Drag it into the summary or Leave out.');return A.redraw()}return sortSum(b)}
 if(m==='tbl'){const i=[0,1,2,3].find(j=>inR(p,row(j)));if(i==null){speak('Drag the note into a row of the table.');return A.redraw()}return file(i)}}
const check=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(list,ms){const k=++gen;list.forEach((f,j)=>setTimeout(()=>{if(k===gen)f()},fast()?j*40+30:(j+1)*(ms||600)))}
const fresh=x=>{gen++;Object.assign(S,blank(),x||{});buttons()};
const rightIdea=()=>S.order.findIndex(k=>cards(HOG[S.r%4])[k][1]==='ok');
const steps=[
{h:'Main idea of a paragraph',p:'Read the paragraph. Drag the card that says what the whole paragraph is about into the box.',predict:{q:'Paragraph 2 says hedgehogs eat beetles, worms and slugs. What is its main idea?',opts:['They eat slugs','What hedgehogs eat and how they find it'],ans:1},task:'Find 3 main ideas',
 show:()=>{steps[0].go();auto([()=>pickIdea(rightIdea()),()=>pickIdea(rightIdea()),()=>pickIdea(rightIdea())],1250)},go:()=>{fresh({order:[0,1,2]});speak('Paragraph 1. Drop its main idea in the box.');S.next=check(0,()=>S.n>=3,'The main idea is what every sentence tells about.')}},
{h:'Key details',p:'Key details back up the main idea. One sentence here is true but about something else. Tap it.',predict:{q:'Is every true fact about hedgehogs a key detail for this paragraph?',opts:['Yes, if it is true it fits','No, it must tell about the main idea'],ans:1},task:'Spot 3 sentences that do not fit',
 show:()=>{steps[1].go();auto([()=>tapLine(ODD[0][2]),()=>tapLine(ODD[1][2]),()=>tapLine(ODD[2][2])],1250)},go:()=>{fresh();oddSay();S.next=check(1,()=>S.n>=3,'Key details support the main idea. A true fact can still be off the point.')}},
{h:'Summarise',p:'A summary keeps the main point of each paragraph in a few sentences. Drag each sentence to the summary or to Leave out.',predict:{q:'The article has 4 paragraphs. How long should its summary be?',opts:['About as long, so nothing is lost','2 or 3 short sentences with the main points'],ans:1},task:'Sort 6 sentences',
 show:()=>{steps[2].go();auto(SUM.map(()=>()=>sortSum(SUM[S.order[0]][1]==='ok'?0:1)))},go:()=>{fresh({order:[0,1,2,3,4,5]});speak('Drag the sentence to the summary or to Leave out.');S.next=check(2,()=>S.n>=6,'A summary joins the main ideas of the paragraphs in a few words.')}},
{h:'Retrieve and record',p:'Read about bats. Drag each note into the right row of the table. Bin any bad note.',task:'File 5 notes',
 show:()=>{steps[3].go();auto(NOTES.map(()=>()=>file(NOTES[S.order[0]][1])))},go:()=>{fresh({order:[0,1,2,3,4]});speak('Drag the note into a row of the table.');S.next=check(3,()=>S.n>=5,'Notes are key words from the text, filed where you can find them.')}},
{h:'Pick a way to record',p:'Notes can go in a table, numbered steps or a spider diagram. Tap the best one for each task.',task:'Choose for 3 tasks',
 show:()=>{steps[4].go();auto([()=>chooseHow(HOW[0][1]),()=>chooseHow(HOW[1][1]),()=>chooseHow(HOW[2][1])],1250)},go:()=>{fresh();speak('Task: '+HOW[0][0]);buttons();S.next=check(4,()=>S.n>=3,'Compare in a table, keep order in steps, sort facts about one thing in a spider diagram.')}},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.next()});
const QS=[['Paragraph 2 is above. Which is its main idea?',[['What hedgehogs eat and how they find it','ok'],['Hedgehogs can walk 2 km','tiny'],['Hedgehogs','topic']]],
 ['Which is the best summary of the whole hedgehog article?',[['Hedgehogs live in gardens, eat bugs, roll up when scared and hibernate in winter.','ok'],['Hedgehogs eat beetles, worms, slugs and caterpillars.','part'],['I love hedgehogs because they are so cute.','opinion']]],
 ['Which is a good note about what hedgehogs eat?',[['beetles, worms, slugs','ok'],['Hedgehogs eat beetles, worms, slugs and caterpillars.','copyall'],['yummy bugs','opinion']]],
 ['How should you record three animals’ homes and food to compare them?',[['A table','ok'],['Numbered steps','steps'],['Copy out the whole text','copyall']]],
 ['Main idea: how spines keep a hedgehog safe. Which is a key detail?',[['It rolls into a ball so the spines stick out.','ok'],['Hedgehogs eat slugs.','offtopic'],['Hedgehogs are in picture books.','offtopic']]]];
function why(t){let m='Look back at the lab.';
 if(t==='tiny')m='Walking 2 km is one detail. The paragraph is about what they eat and how they find it.';
 if(t==='topic')m='“Hedgehogs” is the topic of the whole article, not of this paragraph.';
 if(t==='part')m='That sums up one paragraph only. A summary needs the main point of each paragraph.';
 if(t==='opinion')m='That is an opinion. Summaries and notes only record what the text says.';
 if(t==='copyall')m='Copying whole sentences is not note-taking. Pick out the key words.';
 if(t==='steps')m='Numbered steps are for things in order. To compare, use a table.';
 if(t==='offtopic')m='That is not about how spines keep it safe, so it does not support this main idea.';return m}
function quiz(){qi++;const[q,ops]=QS[qi%QS.length],s=qi%3;
 qb.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=qb.querySelector('.fl-pick');ops.slice(s).concat(ops.slice(0,s)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>mark(t)});speak('Challenge: '+q);A.redraw()}
function mark(t){qb.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qb.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Sharp reading.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.66,tall:1.35,draw,onStep:A=>{qb.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qb=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});buttons()}});
A.start()})})();
