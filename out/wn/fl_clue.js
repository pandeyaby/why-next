/* Flagship – reading between the lines (ages 5–10). Some answers are right there in the words (who, where, when).
   Others are not said, so you hunt for clues: sand + a wave means the beach. A good guess is clue + what I know,
   and it must fit every clue. Then prove it: point to the line that shows the answer. Tap words, drag guesses,
   and every action has a big button twin. */
(()=>{
const FIND={pic:'🐶',toks:[['Ben','who'],['fed','did'],['his dog Pip','pet'],['in the garden','where'],['after school.','when'],['They played','did'],['with a red ball.','thing']],
 qs:[['Who fed the dog?','who'],['Where did Ben feed Pip?','where'],['When did Ben feed Pip?','when']]};
const JOB={who:'names who did it',did:'is a doing word. It tells what happened',pet:'names the dog, not the one who fed it',where:'names a place',when:'tells a time',thing:'names a thing'};
const ASKS={who:'who did it',where:'a place',when:'a time'};
const HUNT=[{q:'Where is Mia?',a:'Mia is at the beach.',toks:[['Mia',0,'Mia tells you who. Look for things that belong in one place.'],['dug',0,'You can dig in lots of places. Find a thing you see in one place.'],['in the sand.',1],['A wave',1],['got her feet wet.',0,'Wet feet can happen in the bath. Find a word that fits just one place.']]},
 {q:'What time of year is it?',a:'It is winter.',toks:[['Sam put on',0,'That says what Sam did. What did he put on?'],['his coat and gloves.',1],['Then he made',0,'Made what? The thing he made is the clue.'],['a big snowman.',1]]},
 {q:'What time of day is it?',a:'It is night.',toks:[['Gran',0,'Gran tells you who, not when.'],['turned on the lamp.',1],['An owl hooted',1],['outside.',0,'Outside is a place, not a time. Look for things that happen when it is dark.']]}];
const SUM=[{clue:'The grass was wet. There were big puddles on the path.',know:'Rain makes puddles.',ops:[['It rained.',1],['It is a hot, dry day.',0,'A clue says the opposite: the grass is wet. A good guess fits every clue.'],['Ben spilt his drink.',0,'One drink cannot make big puddles all over the path. Use every clue.']]},
 {clue:'Lily’s plate had only crumbs left. She licked her lips.',know:'We eat up food we like.',ops:[['Lily is seven.',0,'No clue says how old Lily is. A guess must come from the words.'],['Lily liked her cake.',1],['Lily did not eat it.',0,'The crumbs say she ate it. That guess goes against a clue.']]},
 {clue:'Bees fly from flower to flower. Yellow dust sticks to their legs.',know:'Flowers make a yellow dust called pollen.',ops:[['Bees stay on one flower.',0,'The text says flower to flower. That guess goes against a clue.'],['Bees are scared of flowers.',0,'No clue says that. Bees go to flowers, so they are not scared.'],['Bees carry pollen to other flowers.',1]]}];
const CAMEL=['Camels live in hot, dry deserts.','A camel can go for days without a drink.','Its wide, flat feet do not sink in soft sand.','Its hump stores fat, not water.'];
const PROVE=[{q:'Could a camel make a long trip with very little water?',a:1,no:['True, but that says where camels live. Which line is about water?',0,'That line is about feet, not water.','That line says what is in the hump. Which line says how long a camel can go without a drink?']},
 {q:'Why is a camel good at walking on sand?',a:2,no:['Living in a desert does not explain how it walks. Find the line about feet.','That line is about drinking, not walking.',0,'The hump does not help it walk. Find the line about its feet.']},
 {q:'Is a camel’s hump full of water?',a:3,no:['That line does not say what is in the hump.','Going without a drink does not prove what is in the hump. Lots of people guess water!','That line is about feet.',0]}];
VIS.reg('flagclue',c=>{let A,pad,quiz,qn=-1,run=0,streak=0;c.fig.classList.add('young');
const S={};const blank=()=>Object.assign(S,{at:0,got:0,need:3,picked:[],bad:-1,solved:0,drag:null,hit:[],after:()=>{},auto:0});
const MODES=['hi','find','hunt','sum','prove','quiz'],mode=()=>MODES[A.step];
const z=v=>Math.round(v*(A.narrow?1:1.12)),fast=()=>A.reduced()||S.auto;
const say=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function txt(g,s,x,y,w,px,col,wt,left){g.font=`${wt||700} ${z(px)}px system-ui,sans-serif`;g.textAlign=left?'left':'center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const L=[];String(s).split(' ').forEach(p=>{const t=L.length?L[L.length-1]+' '+p:p;if(L.length&&g.measureText(t).width>w)L.push(p);else L[L.length?L.length-1:0]=t});
 L.forEach((l,i)=>g.fillText(l,x,y+(i-(L.length-1)/2)*z(px)*1.28));return L.length}
function card(g,r,tone,dash){const C=A.col,e={ok:C.gr,no:C.rd,cy:C.cy,am:C.am,vi:C.vi}[tone]||C.ln;g.save();
 if(dash){g.setLineDash([7,5])}else{A.paint.shadow(5,2,.1);g.fillStyle=tone?A.mix(C.pn,e,.13):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();A.paint.noShadow()}
 g.lineWidth=tone?3:2;g.strokeStyle=e;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.restore()}
function emoji(g,e,x,y,s){g.fillStyle='#000';g.font=`${Math.round(s)}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
/* lay word chips out like lines of text, wrapping inside the panel; returns one box per chip */
function flow(g,words,x0,y0,w,px){g.font=`800 ${z(px)}px system-ui,sans-serif`;const pd=z(10),h=z(px)+z(18),gap=z(7),out=[];let x=x0,y=y0;
 words.forEach((s,i)=>{const cw=Math.min(w,g.measureText(s).width+pd*2);if(x>x0&&x+cw>x0+w){x=x0;y+=h+gap}out.push({x,y,w:cw,h,i});x+=cw+gap});return out}
function chipRow(g,words,y0,tones){const W=A.W,box=flow(g,words,20,y0,W-40,19);box.forEach((b,i)=>{card(g,b,tones(i));txt(g,words[i],b.x+b.w/2,b.y+b.h/2,b.w-8,19,A.col.tx,800)});return box}
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,m=mode();S.hit=[];
 if(m==='quiz'){txt(g,'Some answers are right there. Some you work out from clues. Always point to the words that prove it.',W/2,H*.45,W-40,18,C.tx,800);return}
 if(m==='hi'){emoji(g,'🧥',W*.38,H*.12,z(44));emoji(g,'🛷',W*.62,H*.12,z(44));const r={x:16,y:H*.23,w:W-32,h:H*.3};card(g,r,'cy');
  txt(g,'Tom put on his coat. He pulled his sledge up the hill.',W/2,r.y+r.h/2,r.w-24,20,C.tx,800);
  txt(g,'It never says snow. But coat + sledge are clues: it is snowy!',W/2,H*.66,W-30,18,C.gr,800);txt(g,'Using clues to find what is not said is reading between the lines.',W/2,H*.84,W-30,15,C.mu,700);return}
 if(m==='find'){emoji(g,FIND.pic,W/2,H*.07,z(38));const words=FIND.toks.map(t=>t[0]),q=FIND.qs[S.at];
  const box=chipRow(g,words,H*.15,i=>S.picked.includes(i)?'ok':S.bad===i?'no':'vi');S.hit=box;const end=box[box.length-1].y+box[box.length-1].h;
  const qr={x:16,y:end+z(18),w:W-32,h:z(60)};card(g,qr,q?'am':'ok');txt(g,q?'❓ '+q[0]:'✓ All 3 found in the words.',W/2,qr.y+qr.h/2,qr.w-20,19,C.tx,800);
  txt(g,q?'Tap the words that answer it.':'',W/2,qr.y+qr.h+z(22),W-30,15,C.mu,700);
  FIND.qs.slice(0,S.at).forEach((d,i)=>txt(g,'✓ '+d[0]+' '+words[S.picked[i]],W/2,qr.y+qr.h+z(50)+i*z(26),W-30,15,C.gr,800))}
 if(m==='hunt'){const it=HUNT[S.at];if(!it)return;const qr={x:16,y:H*.04,w:W-32,h:z(56)};card(g,qr,'am');txt(g,'🔍 '+it.q+' The text does not say!',W/2,qr.y+qr.h/2,qr.w-20,17,C.tx,800);
  const words=it.toks.map(t=>t[0]),box=chipRow(g,words,qr.y+qr.h+z(20),i=>S.picked.includes(i)?'ok':S.bad===i?'no':'vi');S.hit=S.solved?[]:box;
  const end=box[box.length-1].y+box[box.length-1].h,n=S.picked.length;
  txt(g,S.solved?'✓ '+S.picked.map(i=>words[i].replace('.','')).join(' + ')+' → '+it.a:'Tap 2 clue words. Clues found: '+n+' of 2',W/2,end+z(36),W-30,17,S.solved?C.gr:C.tx,800)}
 if(m==='sum'){const it=SUM[S.at];if(!it)return;const gap=z(8),bw=(W-32-gap)/2,ch=Math.min(z(104),H*.24);
  const r1={x:16,y:H*.03,w:bw,h:ch},r2={x:16+bw+gap,y:H*.03,w:bw,h:ch};card(g,r1,'cy');card(g,r2,'vi');
  txt(g,'🔍 Clue',r1.x+r1.w/2,r1.y+z(16),bw,14,C.mu,800);txt(g,it.clue,r1.x+r1.w/2,r1.y+ch/2+z(8),bw-14,15,C.tx,800);
  txt(g,'🧠 I know',r2.x+r2.w/2,r2.y+z(16),bw,14,C.mu,800);txt(g,it.know,r2.x+r2.w/2,r2.y+ch/2+z(8),bw-14,15,C.tx,800);
  const slot={x:16,y:r1.y+ch+z(28),w:W-32,h:z(56)};txt(g,'Clue + what I know = my guess',W/2,slot.y-z(13),W-30,14,C.mu,800);
  const good=it.ops.find(o=>o[1]);card(g,slot,S.solved?'ok':S.bad>=0?'no':'am',!S.solved);txt(g,S.solved?'✓ '+good[0]:'My guess? Drag one here, or tap it.',W/2,slot.y+slot.h/2,slot.w-20,S.solved?18:15,S.solved?C.tx:C.mu,800);
  if(!S.solved){const y0=slot.y+slot.h+z(16),h=Math.min(z(54),(H-y0-12-2*gap)/3);it.ops.forEach((o,i)=>{const d=S.drag,r=d&&d.i===i&&d.x!=null?{x:d.x-(W-32)/2,y:d.y-h/2,w:W-32,h}:{x:16,y:y0+i*(h+gap),w:W-32,h};
   card(g,r,S.bad===i?'no':'vi');txt(g,o[0],W/2,r.y+h/2,r.w-20,17,C.tx,800);S.hit.push(Object.assign(r,{i}))});S.slot=slot}}
 if(m==='prove'){const it=PROVE[S.at];if(!it)return;const qr={x:16,y:H*.03,w:W-32,h:z(62)};card(g,qr,'am');txt(g,'🐪 '+it.q,W/2,qr.y+qr.h/2,qr.w-20,17,C.tx,800);
  txt(g,S.solved?'✓ That line proves it.':'Tap the line that proves the answer.',W/2,qr.y+qr.h+z(18),W-30,15,S.solved?C.gr:C.mu,800);
  const y0=qr.y+qr.h+z(36),gap=z(8),h=Math.min(z(58),(H-y0-10-3*gap)/4);CAMEL.forEach((s,i)=>{const r={x:16,y:y0+i*(h+gap),w:W-32,h,i};card(g,r,S.solved&&i===it.a?'ok':S.bad===i?'no':'cy');txt(g,s,W/2,r.y+h/2,r.w-20,16,C.tx,800);if(!S.solved)S.hit.push(r)})}
 A.fx.draw(g)}
function miss(t,j){A.sound.miss();S.bad=j;say(t);A.redraw();setTimeout(()=>{S.bad=-1;A.redraw()},fast()?10:1800)}
function score(t,wait){S.got++;A.sound.pop();say(t);refresh();A.redraw();if(S.got>=S.need)S.after();else later(advance,wait||1600)}
function later(f,ms){const r=run,at=S.at;setTimeout(()=>{if(r===run&&S.at===at)f()},fast()?5:ms)}
function advance(){S.at++;S.picked=mode()==='find'?S.picked:[];S.solved=0;say('Next one.');refresh();A.redraw()}
function pick(i){const m=mode();if(S.got>=S.need)return;
 if(m==='find'){const q=FIND.qs[S.at],tk=FIND.toks[i];if(!q||S.picked.includes(i))return;if(tk[1]!==q[1])return miss(`“${tk[0]}” ${JOB[tk[1]]}. The question wants ${ASKS[q[1]]}. Look again.`,i);
  S.picked.push(i);S.at++;A.sound.pop();S.got++;say(`Yes: ${tk[0]}. It is right there in the words.`);refresh();A.redraw();if(S.got>=S.need)S.after();return}
 if(m==='hunt'){const it=HUNT[S.at],tk=it.toks[i];if(S.solved||S.picked.includes(i))return;if(!tk[1])return miss(tk[2],i);S.picked.push(i);A.sound.tick();
  if(S.picked.length<2){say(`“${tk[0]}” is a clue. Find one more.`);refresh();A.redraw();return}S.solved=1;return score(`Clues: ${S.picked.map(j=>it.toks[j][0]).join(' and ')}. So: ${it.a}`,1900)}
 if(m==='sum'){const o=SUM[S.at].ops[i];if(S.solved)return;if(!o[1])return miss(o[2],i);S.solved=1;return score(`${o[0]} It fits every clue and what you know.`,1900)}
 if(m==='prove'){const it=PROVE[S.at];if(S.solved)return;if(i!==it.a)return miss(it.no[i],i);S.solved=1;return score(`“${CAMEL[i]}” That line proves it.`,1900)}}
function refresh(){if(!pad)return;pad.innerHTML='';const m=mode(),B=(t,i,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=()=>pick(i)};
 if(m==='quiz'||m==='hi'||S.got>=S.need||S.solved)return;
 if(m==='find')FIND.toks.forEach((t,i)=>{if(!S.picked.includes(i))B(t[0],i,'Answer with the words '+t[0])});
 if(m==='hunt')HUNT[S.at].toks.forEach((t,i)=>{if(!S.picked.includes(i))B(t[0],i,'Clue word: '+t[0])});
 if(m==='sum')SUM[S.at].ops.forEach((o,i)=>B(o[0],i,'My guess: '+o[0]));
 if(m==='prove')CAMEL.forEach((s,i)=>B('Line '+(i+1),i,'Line '+(i+1)+': '+s))}
const within=(p,r)=>p.x>r.x-4&&p.x<r.x+r.w+4&&p.y>r.y-4&&p.y<r.y+r.h+4;
function down(p){if(mode()==='quiz'||mode()==='hi'||S.got>=S.need)return false;const r=S.hit.find(b=>within(p,b));if(!r)return false;S.drag={i:r.i,x:null,sx:p.x,sy:p.y};return true}
function move(p){const d=S.drag;if(!d||mode()!=='sum')return;if(d.x!=null||Math.hypot(p.x-d.sx,p.y-d.sy)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.drag;S.drag=null;if(!d)return;if(d.x==null)return pick(d.i);if(S.slot&&p.y<S.slot.y+S.slot.h+z(10))return pick(d.i);say('Drop it in the My guess box, or just tap it.');A.redraw()}
function auto(f){const r=++run,go=()=>{if(r!==run||S.got>=S.need)return;f();setTimeout(go,60)};setTimeout(go,30)}
function answer(){const m=mode();if(m==='find'){const q=FIND.qs[S.at];if(q)pick(FIND.toks.findIndex(t=>t[1]===q[1]));return}
 if(m==='hunt'){if(S.solved)return;const it=HUNT[S.at],i=it.toks.findIndex((t,j)=>t[1]&&!S.picked.includes(j));if(i>=0)pick(i);return}
 if(m==='sum'){if(!S.solved)pick(SUM[S.at].ops.findIndex(o=>o[1]));return}if(m==='prove'&&!S.solved)pick(PROVE[S.at].a)}
const restart=()=>{run++;blank()};
const finish=(i,msg)=>()=>{if(A.step===i&&S.got>=S.need&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
const showMe=i=>()=>{steps[i].go();S.auto=1;auto(answer)};
const steps=[
{h:'Clues tell you more',p:'Some answers are right there in the words. Others are not said, so you use clues. That is reading between the lines.',go:()=>{restart();say('Tom put on his coat. He pulled his sledge up the hill. Coat and sledge are clues: it is snowy.')}},
{h:'Right there',p:'Who, where and when answers are often right there. Find the words in the text that answer the question.',predict:{q:'To answer “Who fed the dog?” you should…',opts:['look back and find it in the words','guess, because the text will not say'],ans:0},task:'Answer 3 questions from the words',show:showMe(1),
 go:()=>{restart();say('Ben fed his dog Pip in the garden after school. Tap the words that answer: Who fed the dog?');refresh();S.after=finish(1,'Who: Ben. Where: in the garden. When: after school. Who words name people, where words name places, when words tell a time.')}},
{h:'Hunt for clues',p:'Sometimes the text does not say the answer. Look for words that only fit one answer, like sand and a wave for the beach.',predict:{q:'“Mia dug in the sand. A wave got her feet wet.” Where is she?',opts:['We cannot tell. It does not say.','At the beach. The clues show it.'],ans:1},task:'Find 2 clues, 3 times',show:showMe(2),
 go:()=>{restart();say('Where is Mia? The text does not say. Tap 2 clue words.');refresh();S.after=finish(2,'Sand + a wave: the beach. Coat, gloves + a snowman: winter. A lamp + an owl: night. Two clues make a guess much stronger.')}},
{h:'Clue + what I know',p:'A good guess joins a clue from the text with something you already know. It must fit every clue.',predict:{q:'A good guess about a story…',opts:['can be anything that might be true','must fit the clues in the text'],ans:1},task:'Make 3 good guesses',show:showMe(3),
 go:()=>{restart();say('Read the clue and what you know. Drag the guess that fits into the box, or tap it.');refresh();S.after=finish(3,'Wet grass + rain makes puddles: it rained. A guess with no clue, or one that goes against a clue, is just a guess.')}},
{h:'Prove it',p:'When you answer, point to the line that shows you are right. A line can be true and still not prove the answer.',task:'Prove 3 answers',show:showMe(4),
 go:()=>{restart();say('Read the camel facts. Tap the line that proves the answer.');refresh();S.after=finish(4,'Each answer has one line that proves it. And the hump is fat, not water: the text proves lots of people wrong!')}},
{h:'Challenge',p:'',go:()=>{restart();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[['Tom put on his swimsuit and jumped in. Splash! Where is Tom?',[['At a pool','ok'],['In his bed','against'],['At school','noclue']]],
 ['“The baby woke up at seven.” Which words tell you when?',[['at seven','ok'],['The baby','who'],['woke up','did']]],
 ['Ella’s umbrella was dripping. Her boots were wet. What was the weather like?',[['It was raining','ok'],['It was sunny and dry','against'],['It was her birthday','noclue']]],
 ['“Owls hunt at night. Their big eyes see well in the dark.” Which line proves owls can see in the dark?',[['Their big eyes see well in the dark.','ok'],['Owls hunt at night.','true'],['Owls have soft feathers.','notin']]],
 ['Leo’s glass was empty. He had a white milk line on his lip. What did Leo drink?',[['Milk','ok'],['Orange juice','noclue'],['Nothing','against']]],
 ['“Max ran to the park after lunch.” Where did Max go?',[['To the park','ok'],['After lunch','when'],['Max','who']]]];
function why(t){let m='Find the words that answer the question, or the clues that point to it.';
 if(t==='against')m='One clue says the opposite. A good guess fits every clue in the text.';
 if(t==='noclue')m='No clue says that. Your guess must come from words in the text, plus what you know.';
 if(t==='who')m='Those words name who. The question asks for something else, so find the words that answer it.';
 if(t==='did')m='That is a doing word: it tells what happened. When words tell a time, like at seven.';
 if(t==='when')m='After lunch tells you when. Where words name a place, like to the park.';
 if(t==='true')m='That line is true, but it is about hunting, not seeing. The proof must match the question.';
 if(t==='notin')m='That line is not in the text. Proof has to come from the words you read.';return m}
function ask(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const el=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},el,o);b.onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
function judge(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes! You used the words.':'✗ '+why(t)}${ok?` Right in a row: ${streak}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.72,tall:1.4,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;refresh()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);restart();A.gest({down,move,up});refresh()}});
A.start()})})();
