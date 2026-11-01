/* Flagship – four types of sentences (ages 6–7): sort sentences by their job (statement, question, exclamation,
   command), find the bossy verb that makes a command even when it is not the first word, move the verb to the front to
   turn a statement into a question, start an exclamation with What or How, and drop "You" to make a command. */
(()=>{
const KINDS=['Statement','Question','Exclamation','Command'],JOB=['tells you something','asks something','shows a big feeling, starting with What or How','tells someone to do something'];
const SORT=[['The cat is asleep.',0],['Sit down!',3],['Where is my hat?',1],['What a big dog that is!',2],['Pass me the ball, please.',3],['How tall you are!',2],['Can we go to the park?',1],['My bike is red.',0]];
const BOSS=[[['Please','shut','the','door.'],1],[['Stir','the','soup','slowly.'],0],[['Carefully','put','the','cup','down.'],1]];
const ASK=[['The dog is hungry.',['hungry','Is','dog','the','.','?'],['Is','the','dog','hungry','?']],['You can swim.',['swim','you','Can','.','?'],['Can','you','swim','?']]];
const WOW=[['___ a huge whale that is!',['What','How','Is'],'What'],['___ fast the cheetah runs!',['Can','How','What'],'How'],['___ a lovely song that was!',['Was','How','What'],'What']];
const BOSSY=[[['You','wash','your','hands.'],'Wash your hands.'],[['You','stir','the','paint.'],'Stir the paint.']];
VIS.reg('flagkinds',c=>{let A,keys,qa,qk=-1,tok=0;c.fig.classList.add('young');
const base=()=>({want:()=>{},won:0,r:0,grab:null,bad:-1,built:[],gone:false,said:''}),S=base();
const stage=()=>['sort','boss','ask','wow','drop','quiz'][A.step],snap=()=>A.reduced(),pt=n=>Math.round(n*(A.narrow?1:1.15));
const note=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
const need=()=>({sort:6,boss:3,ask:2,wow:3,drop:2}[stage()]||9);
function write(g,t,x,y,n,col,w){g.font=`${w||800} ${pt(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-14)}
function box(g,r,hot,on){const C=A.col;g.fillStyle=on?A.alpha(C.gr,.22):(C.dark?'#1e293b':'#f0f9ff');A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();g.strokeStyle=hot?C.rd:on?C.gr:C.tx;g.lineWidth=hot||on?5:2.5;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke()}
/* word tiles that wrap into centred rows */
function tiles(words,y0,size){const g=A.ctx,f=pt(size||18),pad=14,gap=8,h=f*2.1,rows=[[]];let w=0;g.font=`700 ${f}px system-ui,sans-serif`;
 const ws=words.map(t=>Math.max(44,g.measureText(t).width+pad*2));ws.forEach((v,i)=>{if(w+v>A.W-20&&rows[rows.length-1].length){rows.push([]);w=0}rows[rows.length-1].push(i);w+=v+gap});
 const out=[];rows.forEach((row,ri)=>{const tot=row.reduce((s,i)=>s+ws[i]+gap,-gap);let x=(A.W-tot)/2;row.forEach(i=>{out[i]={x,y:y0+ri*(h+gap),w:ws[i],h,f};x+=ws[i]+gap})});return out}
function tileText(g,t,r,col){g.font=`700 ${r.f}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,r.x+r.w/2,r.y+r.h/2+1)}
/* ---- sort by job ---- */
function bins(){const n=4,gap=8,two=A.narrow,w=two?(A.W-30)/2:(A.W-20-gap*3)/4,h=two?A.H*.15:A.H*.22;return KINDS.map((_,k)=>({x:two?10+(k%2)*(w+10):10+k*(w+gap),y:two?A.H*.6+(k>>1)*(h+8):A.H*.66,w,h}))}
function slip(){const[t]=SORT[S.r%SORT.length],g=A.ctx;g.font=`800 ${pt(17)}px system-ui,sans-serif`;const w=Math.min(A.W-24,g.measureText(t).width+40),h=pt(17)*2.6;
 if(S.grab&&S.grab.x!=null)return{x:S.grab.x-w/2,y:S.grab.y-h/2,w,h};return{x:(A.W-w)/2,y:A.H*.2,w,h}}
function drawSort(g){const C=A.col;write(g,'What is its job?',A.W/2,A.H*.08,14,C.mu,700);bins().forEach((r,k)=>{box(g,r,S.bad===k);write(g,KINDS[k],r.x+r.w/2,r.y+r.h*.38,14);write(g,['tells','asks','What! How!','bossy'][k],r.x+r.w/2,r.y+r.h*.72,11,C.mu,700)});
 const r=slip();box(g,r,false);write(g,SORT[S.r%SORT.length][0],r.x+r.w/2,r.y+r.h/2,17);write(g,`${S.won} of ${need()} sorted`,A.W/2,A.H*.48,12,C.mu,700)}
function file(k){if(stage()!=='sort'||S.won>=need())return;const[t,ans]=SORT[S.r%SORT.length];if(k!==ans){let m=`"${t}" ${JOB[ans]}. It is a ${KINDS[ans].toLowerCase()}.`;
  if(ans===3&&k===2)m=`It ends with !, but it starts with a bossy verb and tells someone what to do. That makes it a command.`;
  else if(ans===2&&k===1)m=`It starts with ${t.split(' ')[0]}, but it does not ask anything. It shows a big feeling, so it is an exclamation.`;
  else if(ans===3&&k===0)m=`It has a bossy verb, ${t.split(' ')[0]}. It tells someone to do something, so it is a command.`;return miss(m,k)}
 return win(`Yes! It ${JOB[ans].split(',')[0]}: a ${KINDS[ans].toLowerCase()}.`)}
/* ---- bossy verb ---- */
function drawBoss(g){const[ws,v]=BOSS[Math.min(S.r,2)],rs=tiles(ws,A.H*.32,20);write(g,'Command: tap the bossy verb',A.W/2,A.H*.12,15);rs.forEach((r,i)=>{box(g,r,S.bad===i,S.said===i);tileText(g,ws[i],r)});write(g,'The bossy verb says what to do.',A.W/2,A.H*.78,12,A.col.mu,700)}
function bossTap(i){if(stage()!=='boss'||S.won>=need()||S.said!=='')return;const[ws,v]=BOSS[Math.min(S.r,2)],w=ws[i].replace(/\W/g,'');
 if(i!==v){const m=/^(Please|Carefully)$/.test(w)?`${w} is polite or tells how. It is not the doing word. Which word says what to do?`:`"${w}" is not the doing word. Which word tells you what to do?`;return miss(m,i)}
 S.said=i;A.sound.tick();A.redraw();setTimeout(()=>{S.said='';win(`Yes! "${w}" is the bossy verb.${i?' It does not have to come first.':''}`)},snap()?20:450)}
/* ---- statement to question ---- */
function drawAsk(g){const C=A.col,[st,pool,goal]=ASK[Math.min(S.r,1)];write(g,`Statement: ${st}`,A.W/2,A.H*.08,15);
 const sw=S.built.map(i=>pool[i]),slots=tiles(goal.map((_,k)=>sw[k]||'   '),A.H*.2,18);slots.forEach((r,k)=>{g.setLineDash(sw[k]?[]:[5,5]);box(g,r,false,!!sw[k]);g.setLineDash([]);if(sw[k])tileText(g,sw[k],r)});
 write(g,'Make it a question: tap the words in order',A.W/2,A.H*.5,12,C.mu,700);tiles(pool,A.H*.58,18).forEach((r,i)=>{if(S.built.includes(i))return;box(g,r,S.bad===i);tileText(g,pool[i],r)})}
function askTap(i){if(stage()!=='ask'||S.won>=need()||S.built.includes(i))return;const[,pool,goal]=ASK[Math.min(S.r,1)],k=S.built.length,w=pool[i];
 if(w!==goal[k]){let m=`Not that one yet. A question here starts with the verb ${goal[0]}.`;if(k&&w==='.'||w==='.'&&k===goal.length-1)m='A question ends with a question mark, not a full stop.';
  else if(k===goal.length-1)m='All the words are in. Now end the question with its mark.';else if(k)m=`Next word: say the question out loud. ${goal.slice(0,k).join(' ')} …?`;return miss(m,i)}
 S.built.push(i);A.sound.tick();if(S.built.length===goal.length)return win(`${goal.slice(0,-1).join(' ')}? The verb moved to the front, and it ends with a question mark.`);note(`${goal.slice(0,k+1).join(' ')} …`);A.redraw()}
/* ---- exclamation starters ---- */
function drawWow(g){const[t,ops]=WOW[Math.min(S.r,2)];write(g,'Exclamation: pick the first word',A.W/2,A.H*.1,15);const r={x:12,y:A.H*.22,w:A.W-24,h:pt(18)*2.8};box(g,r,false,S.said!=='');
 write(g,S.said!==''?t.replace('___',ops[S.said]):t,A.W/2,r.y+r.h/2,18);picks(ops).forEach((p,k)=>{box(g,p,S.bad===k);write(g,ops[k],p.x+p.w/2,p.y+p.h/2,20)})}
function picks(ops){const n=ops.length,gap=10,w=Math.min((A.W-20-gap*(n-1))/n,150),x0=(A.W-n*w-gap*(n-1))/2;return ops.map((_,k)=>({x:x0+k*(w+gap),y:A.H*.58,w,h:Math.min(A.H*.2,76)}))}
function wowTap(k){if(stage()!=='wow'||S.won>=need()||S.said!=='')return;const[t,ops,ok]=WOW[Math.min(S.r,2)],o=ops[k];
 if(o!==ok){const m=/^(Is|Can|Was)$/.test(o)?`${o} would start a question. An exclamation starts with What or How.`:ok==='How'?`What fits "What a …". Here the next word is ${t.split(' ')[1]}, so use How.`:`How fits "How fast …". Here the next word is "a", so use What.`;return miss(m,k)}
 S.said=k;A.sound.tick();A.redraw();setTimeout(()=>{S.said='';win(`Yes! ${t.replace('___',o)}`)},snap()?20:450)}
/* ---- make a command ---- */
function drawDrop(g){const C=A.col,[ws,cmd]=BOSSY[Math.min(S.r,1)];write(g,S.gone?`Command: ${cmd}`:`Statement: ${ws.join(' ')}`,A.W/2,A.H*.1,15);
 const show=S.gone?cmd.split(' '):ws,rs=tiles(show,A.H*.32,20);rs.forEach((r,i)=>{box(g,r,S.bad===i,S.gone);tileText(g,show[i],r)});write(g,S.gone?'Bossy verb first. Who it is for is left out.':'Tap the word to take away',A.W/2,A.H*.72,13,C.mu,700)}
function dropTap(i){if(stage()!=='drop'||S.won>=need()||S.gone)return;const[ws,cmd]=BOSSY[Math.min(S.r,1)],w=ws[i].replace(/\W/g,'');
 if(i!==0){const m=i===1?`${w} is the bossy verb. Keep it! Take away the word that says who.`:`Without "${w}" the job is not clear. Take away who it is for.`;return miss(m,i)}
 S.gone=true;A.sound.tick();A.redraw();setTimeout(()=>{S.gone=false;win(`${cmd} Now it starts with the bossy verb. It is a command.`)},snap()?20:600)}
/* ---- shared ---- */
function draw(A){const{ctx:g,W,H,col:C}=A,v=stage();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.04:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){write(g,'.   ?   !   .',W/2,H*.38,28);write(g,'Tells, asks, wow, or bossy?',W/2,H*.6,15);return}
 if(S.won>=need()){write(g,wrap(),W/2,H/2,15);return A.fx.draw(g)}({sort:drawSort,boss:drawBoss,ask:drawAsk,wow:drawWow,drop:drawDrop})[v](g);A.fx.draw(g)}
const wrap=()=>({sort:'The job, not the mark, names the type.',boss:'A command has a bossy verb.',ask:'Move the verb to the front to ask.',wow:'Exclamations start with What or How.',drop:'Drop "You" and the verb leads.'}[stage()]);
function miss(t,b){A.sound.miss();S.bad=b==null?-1:b;note(t);setTimeout(()=>{S.bad=-1;A.redraw()},snap()?10:900);A.redraw()}
function win(t){S.won++;S.r++;S.built=[];A.sound.pop();note(S.won<need()?t+' Next one.':t);buttons();A.redraw();S.want()}
function buttons(){if(!keys)return;keys.innerHTML='';const v=stage(),B=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);b.onclick=fn};if(v==='quiz'||S.won>=need())return;
 if(v==='sort')KINDS.forEach((k,i)=>B(k,()=>file(i),`It is a ${k.toLowerCase()}`));
 if(v==='boss')BOSS[Math.min(S.r,2)][0].forEach((w,i)=>B(w.replace(/\W/g,''),()=>bossTap(i),`Bossy verb: ${w}`));
 if(v==='ask')ASK[Math.min(S.r,1)][1].forEach((w,i)=>B(w,()=>askTap(i),`Add ${w==='.'?'full stop':w==='?'?'question mark':w}`));
 if(v==='wow')WOW[Math.min(S.r,2)][1].forEach((w,k)=>B(w,()=>wowTap(k),`Start with ${w}`));
 if(v==='drop')BOSSY[Math.min(S.r,1)][0].forEach((w,i)=>B(w.replace(/\W/g,''),()=>dropTap(i),`Take away ${w}`))}
const inside=(p,r)=>r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){const v=stage();if(S.won>=need())return false;
 if(v==='sort'){if(inside(p,slip())){S.grab={x:null,y:null,x0:p.x,y0:p.y};return true}const k=bins().findIndex(r=>inside(p,r));if(k>=0)file(k);return false}
 if(v==='boss'){const i=tiles(BOSS[Math.min(S.r,2)][0],A.H*.32,20).findIndex(r=>inside(p,r));if(i>=0)bossTap(i)}
 if(v==='ask'){const pool=ASK[Math.min(S.r,1)][1],i=tiles(pool,A.H*.58,18).findIndex((r,j)=>!S.built.includes(j)&&inside(p,r));if(i>=0)askTap(i)}
 if(v==='wow'){const k=picks(WOW[Math.min(S.r,2)][1]).findIndex(r=>inside(p,r));if(k>=0)wowTap(k)}
 if(v==='drop'){const i=tiles(BOSSY[Math.min(S.r,1)][0],A.H*.32,20).findIndex(r=>inside(p,r));if(i>=0)dropTap(i)}return false}
function move(p){if(!S.grab)return;if(S.grab.x!=null||Math.hypot(p.x-S.grab.x0,p.y-S.grab.y0)>8){S.grab.x=p.x;S.grab.y=p.y;A.redraw()}}
function up(p){const gr=S.grab;S.grab=null;if(!gr)return;if(gr.x==null){note('Now tap the box for its job.');return A.redraw()}const k=bins().findIndex(r=>inside(p,r));if(k>=0)file(k);A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(list,gap){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},snap()?j*40+30:(j+1)*(gap||260)))}
const restart=()=>{tok++;Object.assign(S,base())};
const steps=[
{h:'What is its job?',p:'Every sentence has a job. It tells, asks, shows a big feeling or tells someone what to do. Drag it to its box, or tap a box.',predict:{q:'"Sit down!" ends with an exclamation mark. Is it an exclamation?',opts:['Yes, it has !','No, it is a command'],ans:1},task:'Sort 6 sentences',
 show:()=>{steps[0].go();demo(SORT.slice(0,6).map(([,k])=>()=>file(k)),300)},go:()=>{restart();note('What is the job of this sentence?');buttons();S.want=ready(0,()=>S.won>=6,'The job tells you the type.')}},
{h:'Bossy verbs',p:'A command tells you to do something. The doing word is the bossy verb. Tap it.',predict:{q:'In "Please shut the door." is the first word the bossy verb?',opts:['Yes, Please','No, it is shut'],ans:1},task:'Find 3 bossy verbs',
 show:()=>{steps[1].go();demo(BOSS.map(([,v])=>()=>bossTap(v)),700)},go:()=>{restart();note('Which word says what to do?');buttons();S.want=ready(1,()=>S.won>=3,'Find the doing word; it can sit after Please.')}},
{h:'Make a question',p:'Turn a statement into a question. Move the verb to the front. End with a question mark.',predict:{q:'To ask, what do you change in "The dog is hungry."?',opts:['Just put ? at the end','Move is to the front and add ?'],ans:1},task:'Make 2 questions',
 show:()=>{steps[2].go();demo(ASK.flatMap(([,pool,goal])=>goal.map(w=>()=>askTap(ASK[Math.min(S.r,1)][1].indexOf(w)))),260)},go:()=>{restart();note('Tap the word that starts the question.');buttons();S.want=ready(2,()=>S.won>=2,'The verb jumps to the front to ask.')}},
{h:'Exclamations',p:'An exclamation shows a big feeling. It starts with What or How and ends with !. Pick the first word.',task:'Start 3 exclamations',
 show:()=>{steps[3].go();demo(WOW.map(([,ops,ok])=>()=>wowTap(WOW[Math.min(S.r,2)][1].indexOf(WOW[Math.min(S.r,2)][2]))),700)},go:()=>{restart();note('What or How?');buttons();S.want=ready(3,()=>S.won>=3,'What a … ! How … !')}},
{h:'Make a command',p:'A statement can become a command. Take away the word that says who. Then the bossy verb comes first.',task:'Make 2 commands',
 show:()=>{steps[4].go();demo([()=>dropTap(0),()=>dropTap(0)],900)},go:()=>{restart();note('Which word should go?');buttons();S.want=ready(4,()=>S.won>=2,'Same idea, new job.')}},
{h:'Challenge',p:'',go:()=>{restart();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['"Shut the gate!" What type of sentence is it?',[['Command','ok'],['Exclamation','bang'],['Statement','tell']]],
 ['"How cold it is!" What type of sentence is it?',[['Exclamation','ok'],['Question','how'],['Command','bossyx']]],
 ['Which mark ends a question?',[['?','ok'],['.','stop'],['!','bangq']]],
 ['Which one is a question?',[['Are you ready?','ok'],['You are ready.','tell'],['Get ready.','bossyq']]],
 ['In "Carefully cut the paper." which word is the bossy verb?',[['cut','ok'],['Carefully','first'],['paper','thing']]]];
function reason(t){let m='Ask: does it tell, ask, show a big feeling, or tell someone what to do?';
 if(t==='bang')m='It ends with !, but it tells someone to do something with the bossy verb Shut. That is a command.';if(t==='tell')m='A statement tells you something. This sentence does a different job.';
 if(t==='how')m='It starts with How, but it does not ask. It shows a big feeling and ends with !. It is an exclamation.';if(t==='bossyx')m='There is no bossy verb telling you to do something. How + ! shows a big feeling.';
 if(t==='stop')m='A full stop ends a statement or a command. A question ends with a question mark.';if(t==='bangq')m='! ends an exclamation or a strong command. A question ends with ?.';
 if(t==='bossyq')m='Get ready. tells you what to do, so it is a command. A question asks and ends with ?.';
 if(t==='first')m='Carefully tells how to do it. The doing word, the bossy verb, is cut.';if(t==='thing')m='Paper is a thing, a noun. The bossy verb says what to do: cut.';return m}
function pose(){qk++;const[q,ops]=QS[qk%QS.length],r=qk%3;
 qa.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});note('Challenge: '+q);A.redraw()}
let line=0;
function grade(t){qa.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){line++;A.win()}else{line=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! You know its job.':'✗ '+reason(t)}${ok?` Streak: ${line}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{qa.hidden=A.step!==5;keys.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qa=E('div',{class:'fl-chal'},A.below);restart();A.gest({down,move,up});buttons()}});
A.start()})})();
