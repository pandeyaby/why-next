/* Flagship – grammar terms: clauses and conjunctions (ages 7–9). A clause has a verb, a phrase does not; a main clause
   can stand alone as a sentence, a subordinate clause leaves you waiting; a subordinate clause on its own is a fragment
   and needs a main clause; the flip test sorts coordinating conjunctions (and, but, or, so: the clause cannot move) from
   subordinating ones (because, when, if, although: the clause can move to the front, with a comma); and the same word
   (after, until) is a conjunction before a clause but a preposition before a phrase. Tap or use the buttons. */
(()=>{
const PIECES=[[['the','dog','barked'],2],[['after','lunch'],-1],[['we','ate','pizza'],1],[['under','the','old','bridge'],-1]];
const MAINS=[[['We stayed in','because it rained'],0],[['When the bell rang','the children lined up'],1],[['Mia kept going','although she was tired'],0]];
const FRAG=[['Because the bus was late',[['we missed the start','ok'],['when we got there','sub'],['in the rain','phrase']]],
 ['When the sun came out',[['on the beach','phrase'],['the snow melted','ok'],['after it rained','sub']]],
 ['If you water the seeds',[['if they get light','sub'],['they will grow','ok'],['in a pot','phrase']]]];
const FLIP=[['because','Sam stayed up late','he wanted to read',1],['but','Sam stayed up late','he felt fine the next day',0],
 ['when','The owls woke up','the sun went down',1],['so','It was raining','we took our coats',0]];
const PREP=[['We played','after',['lunch'],-1],['We played','after',['we','ate'],1],['She waited','until',['the','end'],-1],['She waited','until',['the','bus','came'],2]];
const KINDS=['Coordinating','Subordinating'],ROLE=['Conjunction','Preposition'];
const cap=s=>s[0].toUpperCase()+s.slice(1),low=s=>/^(I|Mia|Sam)\b/.test(s)?s:s[0].toLowerCase()+s.slice(1);
VIS.reg('flagclause',c=>{let A,pad,quiz,qi=-1,run=0;
const B0=()=>({want:()=>{},won:0,r:0,bad:-1,pick:-1,lift:-1,flipped:false,note:'',hits:[]}),S=B0();
const mode=()=>['piece','main','frag','flip','prep','quiz'][A.step];
const R=()=>A.reduced(),fz=n=>Math.round(n*(A.narrow?1:1.18));
const say=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const total=()=>({piece:4,main:3,frag:3,flip:4,prep:4}[mode()]||9),cur=()=>Math.min(S.r,total()-1);
function write(g,t,x,y,n,w,col,al,mw){g.font=`${w||700} ${fz(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,mw||A.W-20)}
/* lay word or clause cards in centred rows; each card remembers what tapping it does */
function cards(list,top,n,minW){const g=A.ctx;g.font=`700 ${fz(n)}px system-ui,sans-serif`;const h=fz(n)+22,gap=9,rows=[[]];let x=0;
 list.forEach(it=>{const w=Math.min(A.W-24,Math.max(minW||0,g.measureText(it.t).width+26));if(x+w>A.W-20&&rows[rows.length-1].length){rows.push([]);x=0}rows[rows.length-1].push({it,w});x+=w+gap});
 let y=top;rows.forEach(row=>{const span=row.reduce((s,o)=>s+o.w,0)+gap*(row.length-1);let x0=(A.W-span)/2;
  row.forEach(({it,w})=>{const r={x:x0,y,w,h};x0+=w+gap;tile(g,r,it,n);if(it.fn)S.hits.push({r,fn:it.fn})});y+=h+gap});return y}
function tile(g,r,it,n){g.fillStyle=A.col.pn;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();g.lineWidth=it.edge?4:2;g.strokeStyle=it.edge||A.col.ln;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();
 if(it.dash){g.setLineDash([5,4]);g.lineWidth=2;g.strokeStyle=A.col.mu;g.beginPath();g.moveTo(r.x+12,r.y+r.h-6);g.lineTo(r.x+r.w-12,r.y+r.h-6);g.stroke();g.setLineDash([])}
 write(g,it.t,r.x+r.w/2,r.y+r.h/2,n,it.bold?800:600,null,null,r.w-16)}
function verdict(g,ok,head,sub,y){const{W}=A;write(g,(ok?'✓ ':'✗ ')+head,W/2,y,15,800);if(sub)write(g,sub,W/2,y+fz(15)+8,13,500,A.col.mu)}
function draw(A){const{ctx:g,W,H}=A,v=mode(),C=A.col;g.fillStyle=C.bg;g.fillRect(0,0,W,H);S.hits=[];
 if(v==='quiz'){write(g,'A clause has a verb.',W/2,H*.34,16,800);write(g,'A main clause can stand alone.',W/2,H*.5,16,800);write(g,'Conjunctions join clauses.',W/2,H*.66,16,800);return}
 if(S.won>=total()){write(g,S.note,W/2,H*.4,15,800);write(g,'All done here. Tap Next.',W/2,H*.56,14,600,C.mu);return A.fx.draw(g)}
 const i=cur();
 if(v==='piece'){const[w,vb]=PIECES[i];write(g,`Chunk ${i+1} of 4: tap the verb.`,W/2,H*.09,14,700,C.mu);
  const y=cards(w.map((t,j)=>({t,fn:()=>verb(j),edge:S.bad===j?C.rd:S.pick===j?C.gr:null})),H*.22,20,40);
  cards([{t:'No verb here',fn:()=>verb(-1),edge:S.bad===-1&&S.pick===-2?C.rd:null,bold:1}],Math.max(y+10,H*.48),15,W*.4);
  if(S.note)write(g,S.note,W/2,H*.86,14,700);return A.fx.draw(g)}
 if(v==='main'){const[parts,m]=MAINS[i],s=parts[0]+(m===1?', ':' ')+low(parts[1])+'.';write(g,`Sentence ${i+1} of 3: tap the main clause.`,W/2,H*.09,14,700,C.mu);
  const y=cards(parts.map((t,j)=>({t:j?low(t)+'.':t+(m===1?',':''),fn:()=>stand(j),edge:S.lift===j?(j===m?C.gr:C.rd):null})),H*.18,16);
  if(S.lift>=0){const ok=S.lift===m,t=cap(parts[S.lift]);cards([{t:ok?t+'.':t+' …?',dash:!ok,bold:1}],y+16,16);
   verdict(g,ok,ok?'It stands alone: main clause':'It leaves you waiting',ok?'':'"'+t+'" what? A subordinate clause.',y+fz(16)+64)}
  else write(g,s.length<60?'Which part could be a sentence on its own?':'Which part could stand alone?',W/2,H*.8,13,600,C.mu);return A.fx.draw(g)}
 if(v==='frag'){const[f,ops]=FRAG[i];write(g,`Fix ${i+1} of 3: this is not a full sentence.`,W/2,H*.09,14,700,C.mu);
  const done=S.pick>=0&&ops[S.pick][1]==='ok';let y=cards([{t:done?`${f}, ${ops[S.pick][0]}.`:f+' …?',dash:!done,bold:1,edge:done?C.gr:null}],H*.17,16);
  write(g,'Add the part it needs:',W/2,y+14,13,600,C.mu);
  cards(ops.map(([t],j)=>({t,fn:()=>mend(j),edge:S.bad===j?C.rd:S.pick===j&&done?C.gr:null})),y+34,15);
  if(S.note)write(g,S.note,W/2,H*.9,13,700);return A.fx.draw(g)}
 if(v==='flip'){const[cj,a,b]=FLIP[i];write(g,`Word ${i+1} of 4: flip it, then sort "${cj}".`,W/2,H*.08,14,700,C.mu);
  let y=cards([{t:a},{t:cj+' '+b+'.',fn:flip,edge:C.ac,bold:1}],H*.15,15);
  if(S.flipped){const ok=FLIP[i][3]===1;y=cards([{t:`${cap(cj)} ${b}, ${low(a)}.`,dash:!ok}],y+8,14);verdict(g,ok,ok?'Still makes sense':'That does not work',ok?'The clause can move.':'The clause cannot move.',y+16);y+=fz(15)+fz(13)+30}
  else{write(g,'Tap the blue part to move it to the front.',W/2,y+16,13,600,C.mu);y+=40}
  cards(KINDS.map((t,j)=>({t,fn:()=>sort(j),edge:S.bad===j?C.rd:null,bold:1})),Math.max(y,H*.72),14,W*.38);return A.fx.draw(g)}
 if(v==='prep'){const[a,k,tail,vb]=PREP[i];write(g,`Sentence ${i+1} of 4: what job does "${k}" do?`,W/2,H*.08,14,700,C.mu);
  const y=cards([{t:a},{t:k,edge:C.ac,bold:1}].concat(tail.map((t,j)=>({t:t+(j===tail.length-1?'.':''),fn:()=>peek(j),edge:S.pick===j?(j===vb?C.gr:C.rd):S.flipped&&j===vb?C.gr:null}))),H*.17,17);
  write(g,S.note||'Tip: tap the words after it. Is there a verb?',W/2,y+18,13,600,S.note?C.tx:C.mu);
  cards(ROLE.map((t,j)=>({t,fn:()=>job(j),edge:S.bad===j?C.rd:null,bold:1})),Math.max(y+44,H*.7),15,W*.38);return A.fx.draw(g)}}
const miss=(t,b)=>{A.sound.miss();S.bad=b;say(t);setTimeout(()=>{S.bad=-9;A.redraw()},R()?10:1000);A.redraw()};
function setup(){S.bad=-9;S.pick=-1;S.lift=-1;S.flipped=false}
function win(t){S.won++;S.r++;A.sound.pop();S.note=t;setup();say(S.won<total()?t+' Next one.':t);buttons();A.redraw();S.want()}
/* step 1: clause or phrase */
function verb(j){if(mode()!=='piece'||S.won>=total())return;const[w,vb]=PIECES[cur()],ch=w.join(' ');
 if(j===-1){if(vb<0)return win(`"${ch}" has no verb, so it is a phrase.`);S.pick=-2;return miss(`Look again. "${w[vb]}" is something happening, a verb.`,-1)}
 if(j!==vb)return miss(vb<0?`"${w[j]}" is not a verb. Nothing happens in "${ch}". Tap No verb.`:`"${w[j]}" is not the verb. Which word is the action?`,j);
 S.pick=j;win(`"${w[j]}" is the verb, so "${ch}" is a clause.`)}
/* step 2: which clause stands alone */
function stand(j){if(mode()!=='main'||S.won>=total())return;const[parts,m]=MAINS[cur()];S.lift=j;A.redraw();
 if(j!==m)return miss(`"${cap(parts[j])}." leaves you waiting. It is a subordinate clause. Find the part that makes sense alone.`,j);
 const keep=j;A.sound.tick();setTimeout(()=>{if(mode()==='main'&&S.lift===keep)win(`"${cap(parts[m])}." makes sense alone. It is the main clause.`)},R()?20:700)}
/* step 3: mend a fragment */
function mend(j){if(mode()!=='frag'||S.won>=total())return;const[f,ops]=FRAG[cur()],[t,tag]=ops[j];
 if(tag==='sub')return miss(`"${t}" is another subordinate clause. Still no main clause.`,j);
 if(tag==='phrase')return miss(`"${t}" is a phrase with no verb. It cannot finish the sentence.`,j);
 S.pick=j;A.redraw();const k=S.r;setTimeout(()=>{if(mode()==='frag'&&S.r===k)win(`Now it has a main clause: ${f}, ${t}.`)},R()?20:700)}
/* step 4: the flip test */
function flip(){if(mode()!=='flip'||S.won>=total())return;S.flipped=true;A.sound.tick();const[cj,a,b,sub]=FLIP[cur()];
 say(sub?`${cap(cj)} ${b}, ${low(a)}. That still works.`:`${cap(cj)} ${b}, ${low(a)}? That does not work.`);A.redraw()}
function sort(j){if(mode()!=='flip'||S.won>=total())return;const[cj,,,sub]=FLIP[cur()];
 if(j!==sub)return miss(sub?`"${cj}" makes its clause depend, and the clause can move to the front. That is subordinating.`:`"${cj}" joins two equal main clauses, and it cannot move to the front. That is coordinating.`,j);
 win(sub?`"${cj}" is a subordinating conjunction.`:`"${cj}" is a coordinating conjunction.`)}
/* step 5: conjunction or preposition */
function peek(j){if(mode()!=='prep'||S.won>=total())return;const[,k,tail,vb]=PREP[cur()];S.pick=j;A.sound.tick();
 S.note=j===vb?`"${tail[j]}" is a verb. A clause comes after "${k}".`:vb<0?`"${tail[j]}" is not a verb. No verb after "${k}".`:`"${tail[j]}" is not the verb. Try another word.`;say(S.note);A.redraw()}
function job(j){if(mode()!=='prep'||S.won>=total())return;const[,k,tail,vb]=PREP[cur()],want=vb<0?1:0;S.flipped=true;
 if(j!==want)return miss(want?`"${tail.join(' ')}" has no verb. It is a phrase, so "${k}" is a preposition here.`:`"${tail.join(' ')}" has the verb "${tail[vb]}". It is a clause, so "${k}" is a conjunction here.`,j);
 S.note='';win(want?`"${k}" is a preposition: "${k} ${tail.join(' ')}" has no verb.`:`"${k}" is a conjunction: it starts the clause "${tail.join(' ')}".`)}
function buttons(){if(!pad)return;pad.innerHTML='';const v=mode(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='quiz'||S.won>=total())return;const i=cur();
 if(v==='piece'){PIECES[i][0].forEach((t,j)=>B(t,()=>verb(j),`${t} is the verb`));B('No verb',()=>verb(-1),'There is no verb, it is a phrase')}
 if(v==='main')MAINS[i][0].forEach((t,j)=>B(t,()=>stand(j),`${t}: is this the main clause?`));
 if(v==='frag')FRAG[i][1].forEach(([t],j)=>B(t,()=>mend(j),`Add ${t}`));
 if(v==='flip'){B('Flip it ↺',flip,'Move the conjunction and its clause to the front');KINDS.forEach((t,j)=>B(t,()=>sort(j),`${t} conjunction`))}
 if(v==='prep'){PREP[i][2].forEach((t,j)=>B(t+'?',()=>peek(j),`Is ${t} a verb?`));ROLE.forEach((t,j)=>B(t,()=>job(j),`It is a ${t.toLowerCase()}`))}}
function down(p){for(let k=S.hits.length-1;k>=0;k--){const r=S.hits[k].r;if(p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h){S.hits[k].fn();buttons();break}}return false}
const chk=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function play(list,gap){const k=++run;list.forEach((fn,j)=>setTimeout(()=>{if(k===run){fn();buttons()}},R()?j*40+30:(j+1)*(gap||300)))}
const fresh=()=>{run++;Object.assign(S,B0());setup()};
const all=n=>()=>S.won>=n;
const steps=[
{h:'Clause or phrase?',p:'A clause has a verb, a doing or being word. A phrase has no verb. Tap the verb, or tap No verb.',task:'Check 4 chunks',
 show:()=>{steps[0].go();play(PIECES.map(([,vb])=>()=>verb(vb)),420)},go:()=>{fresh();say('Tap the verb in each chunk.');buttons();S.want=chk(0,all(4),'A clause has a verb. A phrase does not.')}},
{h:'The main clause',p:'A main clause makes sense on its own. Tap the part of each sentence that could stand alone.',predict:{q:'Could \u201cbecause it rained\u201d be a sentence on its own?',opts:['Yes, it has a verb','No, it leaves you waiting'],ans:1},task:'Find 3 main clauses',
 show:()=>{steps[1].go();play(MAINS.map(([,m])=>()=>stand(m)),900)},go:()=>{fresh();say('Tap the main clause.');buttons();S.want=chk(1,all(3),'A subordinate clause needs a main clause.')}},
{h:'Fix the fragment',p:'A subordinate clause alone is not a sentence. Add a main clause to finish it.',task:'Fix 3 fragments',
 show:()=>{steps[2].go();play(FRAG.map(([,o])=>()=>mend(o.findIndex(x=>x[1]==='ok'))),900)},go:()=>{fresh();say('Finish the sentence.');buttons();S.want=chk(2,all(3),'Every sentence needs a main clause.')}},
{h:'The flip test',p:'Move the conjunction and its clause to the front. If it still works, the conjunction is subordinating. If not, it is coordinating.',predict:{q:'Which one can move to the front with its clause?',opts:['but he felt fine','because he wanted to read'],ans:1},task:'Sort 4 conjunctions',
 show:()=>{steps[3].go();play(FLIP.flatMap(f=>[flip,()=>sort(f[3])]),330)},go:()=>{fresh();say('Flip it, then sort the conjunction.');buttons();S.want=chk(3,all(4),'And, but, or, so join equals. Because, when, if and although make a clause depend.')}},
{h:'Conjunction or preposition?',p:'After, before and until can do two jobs. Before a clause they are conjunctions. Before a phrase they are prepositions.',predict:{q:'\u201cWe played after lunch.\u201d What is \u201cafter\u201d here?',opts:['A conjunction','A preposition'],ans:1},task:'Name the job 4 times',
 show:()=>{steps[4].go();play(PREP.map(p=>()=>job(p[3]<0?1:0)),420)},go:()=>{fresh();say('Conjunction or preposition?');buttons();S.want=chk(4,all(4),'Look for a verb after the word.')}},
{h:'Challenge',p:'',go:()=>{fresh();next()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which one is a clause?',[['the cat slept','ok'],['on the mat','phrase'],['the sleepy cat','noun']]],
 ['Which is the main clause in "When it snowed, we built a snowman"?',[['we built a snowman','ok'],['When it snowed','first'],['a snowman','phrase']]],
 ['Which word is a coordinating conjunction?',[['but','ok'],['because','subord'],['when','subord']]],
 ['In "I read until the bus came", what is "until"?',[['A conjunction','ok'],['A preposition','prep'],['A verb','verbword']]],
 ['Which one is a full sentence?',[['Although it was late, we kept reading.','ok'],['Although it was late.','frag'],['After the long, dark night.','phrase']]]];
function why(t){let m='Look for a verb, and check what can stand alone.';
 if(t==='phrase')m='That has no verb, so it is a phrase, not a clause.';if(t==='noun')m='The sleepy cat names a thing, but nothing happens. No verb.';
 if(t==='first')m='Coming first does not make it main. When it snowed leaves you waiting.';if(t==='subord')m='That makes its clause depend on another. It passes the flip test, so it is subordinating.';
 if(t==='prep')m='A verb, came, follows until, so it starts a clause. That makes it a conjunction.';if(t==='verbword')m='Until is not an action. Came is the verb in that clause.';
 if(t==='frag')m='That is a subordinate clause alone. It needs a main clause.';return m}
function next(){qi++;const[q,ops]=QS[qi%QS.length],r=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});say('Challenge: '+q);A.redraw()}
let streak=0;
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Correct, grammar expert!':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=next}
A=FK.shell(c,{steps,ratio:.66,tall:1.1,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move:()=>{},up:()=>{}});buttons()}});
A.start()})})();
