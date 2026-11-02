/* Flagship – modal verbs and clauses (ages 9–10, Year 5 grammar). Drag modal verbs onto a possible / likely / certain
   scale, turn a certainty dial to match the evidence in a weather forecast, find the modal verb in a sentence (with an
   adverb of possibility as the trap), drop the right relative pronoun into a relative clause, and lift out a
   parenthesis to prove the sentence still works. */
(()=>{
const SCALE=[['Possible','might, could, may'],['Likely','should'],['Certain','will, must']];
const R1=[{m:'might',z:0,s:'It ___ snow tomorrow.',why:'Might only says it is possible, not likely or certain.'},
 {m:'must',z:2,s:'You ___ wear a seatbelt in the car.',why:'Must is the strongest: it is certain, or there is no choice.'},
 {m:'should',z:1,s:'The bus ___ be here soon.',why:'Should means likely, but not certain. The bus could still be late.'}];
const DIAL=['might','could','should','will','must'];
const R2=[{p:15,ok:[0,1],e:'🌤️',start:4},{p:70,ok:[2],e:'🌦️',start:0},{p:100,ok:[3,4],e:'🌧️',start:0}];
const R3=[{w:'We should leave before it gets dark.',k:1},{w:'Tom can swim two lengths now.',k:1},{w:'Maybe you could help me later.',k:2}];
const MODALS=['can','could','may','might','shall','should','will','would','must'];
const R4=[{s:'The girl ___ won the race is my sister.',a:'who',ch:['which','who','where']},
 {s:'The cake, ___ was huge, vanished by lunch.',a:'which',ch:['who','whose','which']},
 {s:'This is the park ___ we play football.',a:'where',ch:['when','where','which']}];
const PRON={who:'Who is for people.',which:'Which is for things and animals, not people.',where:'Where is for places.',when:'When is for times.',whose:'Whose shows belonging, as in "the boy whose bike was stolen".'};
const R5=[{c:['My dog','a cheeky terrier','ate my sock.'],k:1,mk:[',',',']},
 {c:['On Friday','our class','all thirty of us','went to the zoo.'],k:2,mk:[' –',' –']},
 {c:['Mum bought apples','the green ones','for the picnic.'],k:1,mk:[' (',')']}];
VIS.reg('flagmodal',c=>{let A,pad,quiz,qn=-1,gen=0,streak=0;
const blank=()=>({r:0,n:0,busy:0,ok:0,bad:-1,drag:null,after:()=>{},dial:R2[0].start,fast:0}),S=blank();
const part=()=>['scale','dial','spot','rel','paren','quiz'][A.step];
const z=n=>Math.round(n*(A.narrow?1:1.12)),fast=()=>A.reduced()||S.fast;
const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function words(g,t,x,y,maxw,size,col,wt){g.font=`${wt||700} ${z(size)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const ls=[];let cur='';String(t).split(' ').forEach(w=>{const n=cur?cur+' '+w:w;if(g.measureText(n).width>maxw&&cur){ls.push(cur);cur=w}else cur=n});ls.push(cur);
 const lh=z(size)*1.24;ls.forEach((s,i)=>g.fillText(s,x,y+(i-(ls.length-1)/2)*lh))}
function box(g,r,fill,edge,lw,dash){g.save();A.paint.shadow(5,2,.12);g.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();A.paint.noShadow();if(dash)g.setLineDash([6,5]);g.strokeStyle=edge;g.lineWidth=lw||2;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.restore()}
function row(n,h,y){const w=Math.min(z(130),(A.W-24-(n-1)*10)/n),x0=(A.W-(w*n+(n-1)*10))/2;return Array.from({length:n},(_,j)=>({x:x0+j*(w+10),y:y==null?A.H-h-12:y,w,h}))}
/* lay out word tiles in centred lines; gap tiles ('___') get a fixed width */
function tiles(list,y,size){const g=A.ctx;g.font=`700 ${z(size)}px system-ui,sans-serif`;const h=z(size)*2,gap=z(7),mw=A.W-24,lines=[[]];let w=0;
 list.forEach(t=>{const tw=t==='___'?z(86):g.measureText(t).width+z(18);if(w+tw>mw&&lines[lines.length-1].length){lines.push([]);w=0}lines[lines.length-1].push({t,w:tw});w+=tw+gap});
 const out=[];lines.forEach((L,i)=>{const tot=L.reduce((s,q)=>s+q.w,0)+gap*(L.length-1);let x=(A.W-tot)/2;L.forEach(q=>{out.push({t:q.t,x,y:y+i*(h+gap),w:q.w,h});x+=q.w+gap})});return out}
const chipSpot=()=>{const w=z(124),h=z(50);return{x:A.W/2-w/2,y:A.H*.3,w,h}};
const zones=()=>row(3,z(86));
const gauge=()=>({x:A.W/2,y:A.H*.7,r:Math.min(A.W*.38,A.H*.42)});
const spotTiles=()=>tiles(R3[S.r].w.split(' '),A.H*.3,17);
const relTiles=()=>tiles(R4[S.r].s.split(' '),A.H*.16,16);
const relChips=()=>row(3,z(54));
const parenTiles=()=>tiles(R5[S.r].c,A.H*.2,15);
function draw(A,dt){const g=A.ctx,C=A.col,W=A.W,H=A.H,p=part(),d=S.drag;
 if(p==='quiz'){words(g,'Might, should, must: how sure are you?',W/2,H*.45,W-40,19,C.tx,800);return}
 if(p==='scale'){const q=R1[S.r];words(g,q.s.replace('___',S.ok?q.m:'___'),W/2,H*.11,W-30,18,S.ok?C.gr:C.tx,800);
  if(!S.ok){const s=chipSpot(),at=d&&d.x!=null?{...s,x:d.x-s.w/2,y:d.y-s.h/2}:s;box(g,at,S.bad>=0?A.mix(C.pn,C.rd,.2):C.pn,S.bad>=0?C.rd:C.vi,3);words(g,q.m,at.x+at.w/2,at.y+at.h/2,at.w-8,19,C.tx,800)}
  const zs=zones();g.fillStyle=A.alpha(C.cy,.35);g.fillRect(zs[0].x,zs[0].y-z(16),zs[2].x+zs[2].w-zs[0].x,z(6));
  zs.forEach((r,j)=>{box(g,r,A.mix(C.pn,C.cy,.08+j*.12),C.cy,S.ok&&q.z===j?4:2);words(g,SCALE[j][0],r.x+r.w/2,r.y+r.h*.3,r.w-8,15,C.tx,800);words(g,SCALE[j][1],r.x+r.w/2,r.y+r.h*.68,r.w-10,12,C.tx,600);
   if(S.ok&&q.z===j)words(g,'✓ '+q.m,r.x+r.w/2,chipSpot().y+z(25),r.w+20,19,C.gr,800)});
  words(g,'less sure → more sure',W/2,zs[0].y-z(32),W-30,13,C.tx,600)}
 if(p==='dial'){const q=R2[S.r],G=gauge(),m=DIAL[S.dial];
  box(g,{x:W/2-z(120),y:H*.04,w:z(240),h:z(58)},C.pn,C.cy,2);words(g,`${q.e} Chance of rain: ${q.p}%`,W/2,H*.04+z(29),z(230),17,C.tx,800);
  for(let i=0;i<5;i++){const a0=Math.PI+i*Math.PI/5,a1=a0+Math.PI/5;g.beginPath();g.moveTo(G.x,G.y);g.arc(G.x,G.y,G.r,a0,a1);g.closePath();g.fillStyle=A.mix(C.pn,C.cy,.08+i*.11);g.fill();g.strokeStyle=C.ln;g.lineWidth=1.5;g.stroke();
   const am=(a0+a1)/2;words(g,DIAL[i],G.x+Math.cos(am)*G.r*.72,G.y+Math.sin(am)*G.r*.72,z(60),13,C.tx,i===S.dial?800:600)}
  const an=Math.PI+(S.dial+.5)*Math.PI/5;g.strokeStyle=S.bad>=0?C.rd:C.vi;g.lineWidth=z(5);g.lineCap='round';g.beginPath();g.moveTo(G.x,G.y);g.lineTo(G.x+Math.cos(an)*G.r*.5,G.y+Math.sin(an)*G.r*.5);g.stroke();
  g.fillStyle=C.vi;g.beginPath();g.arc(G.x,G.y,z(9),0,7);g.fill();
  words(g,`It ${m} rain.`,W/2,G.y+z(28),W-30,19,S.ok?C.gr:S.bad>=0?C.rd:C.tx,800)}
 if(p==='spot'){const q=R3[S.r];words(g,S.ok?`✓ ${q.w.split(' ')[q.k]} is the modal verb.`:'Tap the modal verb.',W/2,H*.1,W-30,17,S.ok?C.gr:C.tx,800);
  spotTiles().forEach((r,i)=>{const on=S.ok&&i===q.k,bad=S.bad===i;box(g,r,on?A.mix(C.pn,C.gr,.25):bad?A.mix(C.pn,C.rd,.22):C.pn,on?C.gr:bad?C.rd:C.ln,on||bad?3:1.5);words(g,r.t,r.x+r.w/2,r.y+r.h/2,r.w,17,C.tx,700)})}
 if(p==='rel'){const q=R4[S.r];relTiles().forEach(r=>{if(r.t==='___'){box(g,r,S.ok?A.mix(C.pn,C.gr,.25):A.alpha(C.cy,.08),S.ok?C.gr:C.cy,S.ok?3:2,!S.ok);if(S.ok)words(g,q.a,r.x+r.w/2,r.y+r.h/2,r.w,16,C.tx,800)}else words(g,r.t,r.x+r.w/2,r.y+r.h/2,r.w+4,16,C.tx,600)});
  words(g,S.ok?'✓ That starts the relative clause.':'Drag a word into the gap.',W/2,H*.56,W-30,15,S.ok?C.gr:C.tx,700);
  if(!S.ok)relChips().forEach((r,j)=>{const at=d&&d.j===j&&d.x!=null?{...r,x:d.x-r.w/2,y:d.y-r.h/2}:r,bad=S.bad===j;box(g,at,bad?A.mix(C.pn,C.rd,.22):C.pn,bad?C.rd:C.vi,bad?4:2.5);words(g,q.ch[j],at.x+at.w/2,at.y+at.h/2,at.w-6,17,C.tx,800)})}
 if(p==='paren'){const q=R5[S.r];words(g,S.ok?'✓ Lift it out and the sentence still works.':'Tap the extra information.',W/2,H*.08,W-30,16,S.ok?C.gr:C.tx,800);
  parenTiles().forEach((r,i)=>{const on=S.ok&&i===q.k,bad=S.bad===i;box(g,r,on?A.mix(C.pn,C.gr,.25):bad?A.mix(C.pn,C.rd,.22):C.pn,on?C.gr:bad?C.rd:C.ln,on||bad?3:1.5);words(g,r.t,r.x+r.w/2,r.y+r.h/2,r.w,15,C.tx,700)});
  if(S.ok){words(g,'With punctuation:',W/2,H*.6,W-30,13,C.tx,600);words(g,punct(q),W/2,H*.6+z(26),W-24,15,C.tx,800);words(g,'Without it: '+lift(q,q.k),W/2,H*.6+z(62),W-24,15,C.gr,800)}}
 A.fx.draw(g)}
const punct=q=>q.c.map((t,i)=>i===q.k?q.mk[0]+(q.mk[0]===' ('?'':' ')+t+q.mk[1]:(i?' ':'')+t).join('').replace(/ +/g,' ');
const lift=(q,k)=>q.c.filter((_,i)=>i!==k).join(' ');
function nope(t,j){A.sound.miss();S.bad=j==null?0:j;tell(t);setTimeout(()=>{S.bad=-1;A.redraw()},fast()?10:1200);A.redraw()}
function hooray(t){S.n++;A.sound.pop();if(S.n<3){const r0=S.r,g0=gen;S.busy=1;setTimeout(()=>{if(S.r!==r0||g0!==gen)return;Object.assign(S,{busy:0,r:S.r+1,ok:0});if(part()==='dial')S.dial=R2[S.r].start;tell(t+' Next one.');pads();A.redraw()},fast()?5:1400)}tell(t);pads();A.redraw();S.after()}
/* every answer comes here, from a drag, a tap or a button */
function pick(j){const p=part();if(p==='quiz'||S.n>=3||S.busy||S.ok)return;
 if(p==='scale'){const q=R1[S.r];if(j!==q.z)return nope(`Not ${SCALE[j][0].toLowerCase()}. ${q.why}`,0);S.ok=1;return hooray(`${q.m}: ${SCALE[j][0].toLowerCase()}. ${q.why}`)}
 if(p==='spot'){const q=R3[S.r],w=q.w.split(' ')[j].replace(/[.,]/g,''),lw=w.toLowerCase();if(j===q.k){S.ok=1;return hooray(`${w} is a modal verb. It helps the main verb and shows how sure or how able.`)}
  if(lw==='maybe')return nope('Maybe is an adverb of possibility. It shows possibility, but it is not a verb. Find the helper verb.',j);
  if(j===q.k+1)return nope(`${w} is the main verb. The modal verb comes just before it.`,j);return nope(`${w} is not a modal verb. Modals are helper verbs: ${MODALS.join(', ')}.`,j)}
 if(p==='rel'){const q=R4[S.r],w=q.ch[j];if(w!==q.a)return nope(`${PRON[w]} Try another word.`,j);S.ok=1;return hooray(`${w}: ${PRON[w]}`)}
 if(p==='paren'){const q=R5[S.r];if(j!==q.k)return nope(`Lift out "${q.c[j]}" and you get "${lift(q,j)}". That breaks the sentence, so it is not the parenthesis.`,j);S.ok=1;return hooray(`"${q.c[j]}" is the parenthesis. Without it: ${lift(q,j)}`)}}
function setDial(i){if(part()!=='dial'||S.ok||S.busy||S.n>=3)return;S.dial=Math.max(0,Math.min(4,i));tell(`It ${DIAL[S.dial]} rain.`);A.redraw()}
function lock(){if(part()!=='dial'||S.ok||S.busy||S.n>=3)return;const q=R2[S.r],m=DIAL[S.dial];
 if(!q.ok.includes(S.dial))return nope(S.dial>q.ok[q.ok.length-1]?`At ${q.p}% rain is not that sure. "${m}" is too strong: turn the dial down.`:`At ${q.p}% rain is ${q.p>60?'very likely':'possible'}. "${m}" is too weak: turn the dial up.`);
 S.ok=1;hooray(`${q.p}%: "It ${m} rain." The modal matches the evidence.`)}
function pads(){if(!pad)return;pad.innerHTML='';const p=part(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};if(p==='quiz'||S.n>=3||S.ok)return;
 if(p==='scale')SCALE.forEach((s,j)=>B(s[0],()=>pick(j),`${R1[S.r].m}: ${s[0]}`));
 if(p==='dial'){B('◀ Less sure',()=>setDial(S.dial-1));B('More sure ▶',()=>setDial(S.dial+1));B('✓ Lock in',lock,'Lock in this modal verb')}
 if(p==='spot')R3[S.r].w.split(' ').forEach((w,j)=>B(w,()=>pick(j),'Pick '+w));
 if(p==='rel')R4[S.r].ch.forEach((w,j)=>B(w,()=>pick(j),'Fill the gap with '+w));
 if(p==='paren')R5[S.r].c.forEach((w,j)=>B(w,()=>pick(j),'Extra information: '+w))}
const inside=(q,r)=>q.x>r.x&&q.x<r.x+r.w&&q.y>r.y&&q.y<r.y+r.h;
const dialAt=q=>{const G=gauge();if(q.y>G.y+z(10))return null;const a=Math.atan2(q.y-G.y,q.x-G.x),t=(a<0?a+2*Math.PI:a)-Math.PI;return Math.max(0,Math.min(4,Math.floor(t/(Math.PI/5))))};
function down(q){const p=part();if(p==='quiz'||S.busy||S.ok||S.n>=3)return false;
 if(p==='dial'){const G=gauge();if(Math.hypot(q.x-G.x,q.y-G.y)>G.r+z(10)||dialAt(q)==null)return false;setDial(dialAt(q));S.drag={dial:1};return true}
 if(p==='spot'){const j=spotTiles().findIndex(r=>inside(q,r));if(j>=0)pick(j);return false}
 if(p==='paren'){const j=parenTiles().findIndex(r=>inside(q,r));if(j>=0)pick(j);return false}
 if(p==='scale'){if(inside(q,chipSpot())){S.drag={j:0,x:null,x0:q.x,y0:q.y};return true}const j=zones().findIndex(r=>inside(q,r));if(j>=0)pick(j);return false}
 if(p==='rel'){const j=relChips().findIndex(r=>inside(q,r));if(j<0)return false;S.drag={j,x:null,x0:q.x,y0:q.y};return true}return false}
function move(q){const d=S.drag;if(!d)return;if(d.dial){const i=dialAt(q);if(i!=null&&i!==S.dial)setDial(i);return}
 if(d.x!=null||Math.hypot(q.x-d.x0,q.y-d.y0)>8){d.x=q.x;d.y=q.y;A.redraw()}}
function up(q){const d=S.drag;S.drag=null;if(!d||d.dial)return;const p=part();
 if(p==='scale'){if(d.x==null)return A.redraw();const j=zones().findIndex(r=>inside(q,{x:r.x-6,y:r.y-40,w:r.w+12,h:r.h+50}));if(j>=0)pick(j);else{tell('Drop it on a box.');A.redraw()}return}
 if(d.x==null)return pick(d.j);const gp=relTiles().find(r=>r.t==='___');if(gp&&inside(q,{x:gp.x-24,y:gp.y-24,w:gp.w+48,h:gp.h+48}))pick(d.j);else{tell('Drop it in the gap.');A.redraw()}}
const doneWhen=(i,msg)=>()=>{if(A.step===i&&S.n>=3&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function autoplay(f){const k=++gen,go=()=>{if(k!==gen||S.n>=3)return;f();setTimeout(go,60)};setTimeout(go,30)}
const fresh=()=>{gen++;Object.assign(S,blank())};
function solveOne(){const p=part();if(S.busy||S.ok)return;if(p==='scale')return pick(R1[S.r].z);if(p==='spot')return pick(R3[S.r].k);if(p==='rel')return pick(R4[S.r].ch.indexOf(R4[S.r].a));if(p==='paren')return pick(R5[S.r].k);
 if(p==='dial'){const ok=R2[S.r].ok;if(ok.includes(S.dial))return lock();setDial(S.dial+(S.dial<ok[0]?1:-1))}}
const show=i=>()=>{steps[i].go();S.fast=1;autoplay(solveOne)};
const steps=[
{h:'The certainty scale',p:'Modal verbs show how sure we are. Drag each modal verb onto the scale, or tap a box.',predict:{q:'Is "should" as sure as "must"?',opts:['Yes, they mean the same','No, must is stronger'],ans:1},task:'Place 3 modal verbs',show:show(0),
 go:()=>{fresh();tell('It might snow tomorrow. Where does might go?');pads();S.after=doneWhen(0,'Might and could: possible. Should: likely. Will and must: certain.')}},
{h:'Match the evidence',p:'Read the forecast. Turn the dial until the modal verb fits the chance of rain, then lock it in.',task:'Match 3 forecasts',show:show(1),
 go:()=>{fresh();tell('Chance of rain: 15%. Turn the dial.');pads();S.after=doneWhen(1,'Weak evidence needs a weak modal; strong evidence can take a strong one.')}},
{h:'Spot the modal verb',p:'A modal verb helps the main verb. Tap the modal verb in each sentence.',predict:{q:'Is "can" a modal verb?',opts:['Yes','No, it is a main verb'],ans:0},task:'Find 3 modal verbs',show:show(2),
 go:()=>{fresh();tell('We should leave before it gets dark. Tap the modal verb.');pads();S.after=doneWhen(2,'Modal verbs: can, could, may, might, shall, should, will, would, must. Maybe and perhaps are adverbs.')}},
{h:'Relative clauses',p:'A relative clause adds detail about a noun. Drag the right word into the gap.',predict:{q:'For a thing, not a person, which word fits?',opts:['who','which'],ans:1},task:'Fill 3 gaps',show:show(3),
 go:()=>{fresh();tell('The girl, gap, won the race is my sister.');pads();S.after=doneWhen(3,'Relative clauses start with who, which, where, when, whose or that.')}},
{h:'Lift out the parenthesis',p:'A parenthesis is extra information. Tap the part you could lift out.',predict:{q:'If you lift out a parenthesis, does the sentence still make sense?',opts:['Yes, it still works','No, it breaks'],ans:0},task:'Find 3 parentheses',show:show(4),
 go:()=>{fresh();tell('My dog a cheeky terrier ate my sock. Tap the extra information.');pads();S.after=doneWhen(4,'Commas, brackets or dashes go round a parenthesis. The sentence works without it.')}},
{h:'Challenge',p:'',go:()=>{fresh();challenge()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[['Which sentence is most certain?',[['The shop will open at nine.','ok'],['The shop might open at nine.','weak'],['The shop could open at nine.','weak']]],
 ['Which word is a modal verb?',[['must','ok'],['maybe','adverb'],['always','adverb']]],
 ['"The boy ___ bike was stolen." Which word fits?',[['whose','ok'],['who','who'],['which','which']]],
 ['"Our teacher, Ms Cole, loves maps." Which part is the parenthesis?',[['Ms Cole','ok'],['Our teacher','core'],['loves maps','core']]],
 ['"I saw the man with the telescope." Why is this ambiguous?',[['It has two possible meanings','ok'],['It has no verb','noverb'],['It is too short','short']]]];
function why(t){let m='Think about how sure the sentence is.';
 if(t==='weak')m='Might and could only say it is possible. Will makes it certain.';if(t==='adverb')m='That is an adverb. Modal verbs are helper verbs like can, will, must and should.';
 if(t==='who')m='Who is for people doing something. For belonging, use whose.';if(t==='which')m='Which is for things. For belonging, use whose.';
 if(t==='core')m='Lift that part out and the sentence breaks. The extra bit inside the commas is Ms Cole.';
 if(t==='noverb')m='It has a verb: saw. It is ambiguous because we cannot tell who has the telescope.';if(t==='short')m='Length is not the problem. Who has the telescope: you or the man?';return m}
function challenge(){qn++;const[q,ops]=QS[qn%QS.length],rot=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box2=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box2,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! You read the grammar clue.':'✗ '+why(t)}${ok?` Streak: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=challenge}
A=FK.shell(c,{steps,ratio:.66,tall:1.2,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});pads()}});
A.start()})})();
