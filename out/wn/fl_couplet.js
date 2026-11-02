/* Flagship – writing poetry (ages 6–7). A poem plays with sound: rhyming words end with the same sound (bus, fuss;
   high, sky), each line has a beat you can clap (el-e-phants is 3 claps, not 1), a repeated pattern holds a poem
   together, and you read it aloud with a voice that fits the words. Finish couplets with a rhyme, match the claps of
   two lines, keep a pattern poem going, and choose loud, soft, fast or slow. Every drag has a big button twin. */
(()=>{
const RHY=[{e:'🚌',a:'I see a big red bus,',b:'It makes a lot of',ops:[['fuss',1],['bell',0,'Bell starts with b like bus, but the end is not the same. A rhyme matches at the end: bus, fuss.'],['noise',0,'Noise makes sense, but it does not rhyme. Say the ends: bus … fuss. They match.']]},
 {e:'🐸',a:'A frog sat on a log.',b:'He waved hello to a',ops:[['fish',0,'Fish starts like frog, but listen to the end. Log and fish do not end the same. Try log … dog.'],['cat',0,'A cat would be fun, but log and cat end with different sounds. Try log … dog.'],['dog',1]]},
 {e:'🌙',a:'The moon is up so high,',b:'It floats across the',ops:[['night',0,'Night ends with a t sound. High has no t. High … sky end the same.'],['sky',1],['star',0,'A star fits the picture, but star and high end with different sounds.']]}];
const BEAT=[{a:['Hop,','hop,','hop'],ops:[['Jump up and down on the ground',7],['Skip, skip, skip',3],['Run',1]]},
 {a:['Rain','on','the','roof'],ops:[['Pud-dles',2],['Splash-ing','in','big','mud-dy','pud-dles',8],['Drip','on','the','door',4]]},
 {a:['El-e-phants','stomp'],ops:[['Ti-gers','prowl',3],['Croc-o-diles','snap',4],['Big','bears',2]]}].map(r=>({a:r.a,ops:r.ops.map(o=>{const n=typeof o[o.length-1]==='number'?o[o.length-1]:0,w=o.filter(x=>typeof x==='string');return{w,n:n||w.join('-').split('-').length}})}));
const claps=w=>w.join(' ').split(/[\s-]+/).length,plain=w=>w.join(' ').replace(/-/g,'');
const PAT=[{have:['I can hear the bees buzz.'],ops:[['The rain is wet.',0,'That line does not start with “I can hear”. Keep the pattern going.'],['I can hear the rain drip.',1],['I can hear the bees buzz.',0,'That line is in the poem already. Keep the start, change the end.']]},
 {have:['I can hear the bees buzz.','I can hear the rain drip.'],ops:[['I can see a red kite.',0,'“I can see” changes the pattern. This poem is all about hearing.'],['I can hear.',0,'That line stops too soon. Say what you hear, like the other lines.'],['I can hear my dog bark.',1]]},
 {have:['I can hear the bees buzz.','I can hear the rain drip.','I can hear my dog bark.'],ops:[['I can hear my mum sing.',1],['My mum sings.',0,'The pattern is lost. Start with “I can hear”, then say the sound.'],['I can hear the rain drip.',0,'Copying a line adds nothing new. Same start, new sound at the end.']]}];
const VOICE={loud:['🔊','Loud'],soft:['🤫','Soft'],fast:['🐇','Fast'],slow:['🐢','Slow']};
const SAY=[{t:'Shh! The baby is asleep.',ok:'soft',ops:['loud','soft','fast'],w:{loud:'A loud voice would wake the baby! “Shh” tells you to read softly.',fast:'Fast is for busy, exciting lines. “Shh” means quiet, so read softly.'}},
 {t:'The rocket zooms up, up, UP!',ok:'loud',ops:['soft','slow','loud'],w:{soft:'A soft voice hides the big rocket. UP in big letters and the ! say read it loud.',slow:'A rocket does not go slowly! The big letters and ! say read it loud.'}},
 {t:'The snail creeps slowly home.',ok:'slow',ops:['fast','slow','loud'],w:{fast:'A snail is not fast! “Creeps slowly” tells you to read it slowly.',loud:'Nothing here is loud. “Creeps slowly” tells you to slow down.'}}];
VIS.reg('flagcouplet',c=>{let A,pad,quiz,qn=-1,run=0,row=0;c.fig.classList.add('young');
const fresh=()=>({at:0,got:0,need:3,bad:-1,ok:0,grab:null,hot:[],after:()=>{},auto:0,shake:0}),S=fresh();
const mode=()=>['hi','rhyme','beat','pattern','voice','quiz'][A.step];
const k=v=>Math.round(v*(A.narrow?1:1.15)),quick=()=>A.reduced()||S.auto;
const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function words(g,s,x,y,w,px,col,wt){g.font=`${wt||700} ${k(px)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const rows=[''];String(s).split(' ').forEach(p=>{const n=rows.length-1,t=rows[n]?rows[n]+' '+p:p;if(rows[n]&&g.measureText(t).width>w)rows.push(p);else rows[n]=t});
 rows.forEach((l,i)=>g.fillText(l,x,y+(i-(rows.length-1)/2)*k(px)*1.3))}
function pic(g,e,x,y,s){g.fillStyle='#000';g.font=`${Math.round(s)}px system-ui,"Noto Color Emoji","Apple Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
function tile(g,r,tone,dash){const C=A.col,h={ok:C.gr,no:C.rd,am:C.am,cy:C.cy,vi:C.vi,pk:C.pk}[tone];g.save();
 if(!dash){A.paint.shadow(6,3,.12);g.fillStyle=h?A.mix(C.pn,h,.15):C.pn;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();A.paint.noShadow()}
 if(dash)g.setLineDash([8,6]);g.lineWidth=h?3:2;g.strokeStyle=h||C.ln;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke();g.restore()}
/* answer tiles: a row of three big squares for words and voices, or three full-width strips for lines */
function row3(n,y0,h){const gap=10,w=(A.W-24-gap*(n-1))/n,d=S.grab;return[...Array(n)].map((_,i)=>d&&d.i===i&&d.x!=null?{x:d.x-w/2,y:d.y-h/2,w,h,v:i}:{x:12+i*(w+gap),y:y0,w,h,v:i})}
function strips(n,y0,y1){const gap=8,h=Math.min(k(58),(y1-y0-gap*(n-1))/n),d=S.grab;return[...Array(n)].map((_,i)=>d&&d.i===i&&d.x!=null?{x:d.x-(A.W-24)/2,y:d.y-h/2,w:A.W-24,h,v:i}:{x:12,y:y0+i*(h+gap),w:A.W-24,h,v:i})}
function dots(g,n,x,y,w,col){const r=Math.min(k(9),w/(n*3)),sp=Math.min(r*3.2,w/n);for(let i=0;i<n;i++){g.fillStyle=col;g.beginPath();g.arc(x-(n-1)*sp/2+i*sp,y,r,0,7);g.fill()}}
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,m=mode();S.hot=[];
 if(m==='quiz'){words(g,'A poem plays with sound: rhymes that end the same, beats you can clap, a pattern that repeats, and a voice that fits.',W/2,H*.45,W-40,18,C.tx,800);return}
 if(m==='hi'){pic(g,'🐱',W/2,H*.12,k(50));const r={x:16,y:H*.24,w:W-32,h:H*.36};tile(g,r,'cy');
  words(g,'The cat sat on a mat.',W/2,r.y+r.h*.3,r.w-20,21,C.tx,800);words(g,'The cat wore a hat.',W/2,r.y+r.h*.7,r.w-20,21,C.tx,800);
  words(g,'mat … hat: the ends sound the same. That is a rhyme.',W/2,H*.72,W-30,18,C.gr,800);words(g,'Clap it: the cat sat on a mat. 6 claps.',W/2,H*.86,W-30,15,C.mu,700);return}
 if(m==='rhyme'){const it=RHY[S.at];if(!it)return;pic(g,it.e,W/2,H*.09,k(44));const r={x:12,y:H*.17,w:W-24,h:H*.34};tile(g,r,'cy');
  words(g,it.a,W/2,r.y+r.h*.28,r.w-20,19,C.tx,800);const gw=Math.min(k(110),W*.3),gr={x:W/2-gw/2,y:r.y+r.h*.55,w:gw,h:r.h*.36};
  words(g,it.b,W/2,r.y+r.h*.46,r.w-20,17,C.tx,700);const won=S.ok;tile(g,gr,won?'ok':S.shake?'no':'am',!won);
  if(won)words(g,it.ops.find(o=>o[1])[0]+'.',gr.x+gr.w/2,gr.y+gr.h/2,gr.w,21,C.tx,900);else words(g,'?',gr.x+gr.w/2,gr.y+gr.h/2,gr.w,22,C.mu,900);
  words(g,won?'✓ It rhymes!':'Which word rhymes? Drag it into the gap, or tap it.',W/2,H*.58,W-24,16,won?C.gr:C.tx,800);
  if(!won){const t=row3(3,H*.66,Math.min(k(86),H*.3));t.forEach((q,i)=>{tile(g,q,S.bad===i?'no':'vi');words(g,it.ops[i][0],q.x+q.w/2,q.y+q.h/2,q.w-8,22,C.tx,900)});S.hot=t}}
 if(m==='beat'){const it=BEAT[S.at];if(!it)return;const top={x:12,y:H*.04,w:W-24,h:H*.24};tile(g,top,'cy');
  words(g,it.a.join(' '),W/2,top.y+top.h*.36,top.w-20,20,C.tx,800);dots(g,claps(it.a),W/2,top.y+top.h*.76,top.w-40,C.cy);
  const slot={x:12,y:H*.31,w:W-24,h:H*.17};const good=it.ops.find(o=>o.n===claps(it.a));tile(g,slot,S.ok?'ok':'am',!S.ok);
  if(S.ok){words(g,plain(good.w),W/2,slot.y+slot.h*.36,slot.w-20,19,C.tx,800);dots(g,good.n,W/2,slot.y+slot.h*.76,slot.w-40,C.gr)}
  else words(g,'Which line has '+claps(it.a)+' claps too? Drag it here, or tap it.',W/2,slot.y+slot.h/2,slot.w-20,15,C.tx,800);
  if(!S.ok){const t=strips(3,H*.52,H*.97);t.forEach((q,i)=>{const o=it.ops[i];tile(g,q,S.bad===i?'no':'vi');words(g,S.bad===i?o.w.join(' '):plain(o.w),q.x+q.w/2,q.y+q.h/2-(S.bad===i?k(8):0),q.w-16,17,C.tx,800);
   if(S.bad===i)dots(g,o.n,q.x+q.w/2,q.y+q.h-k(10),q.w-40,C.rd)});S.hot=t}else words(g,'✓ Same beat. The two lines sound like a pair.',W/2,H*.62,W-30,17,C.gr,800)}
 if(m==='pattern'){const it=PAT[S.at];if(!it)return;const lines=it.have.concat(S.ok?[it.ops.find(o=>o[1])[0]]:[]),lh=Math.min(k(34),H*.1);
  words(g,'Poem: I can hear',W/2,H*.05,W-20,15,C.mu,800);lines.forEach((l,i)=>{const r={x:12,y:H*.1+i*(lh+5),w:W-24,h:lh};tile(g,r,S.ok&&i===lines.length-1?'ok':'cy');words(g,l,W/2,r.y+lh/2,r.w-16,16,C.tx,800)});
  const y=H*.1+lines.length*(lh+5);if(!S.ok){const r={x:12,y,w:W-24,h:lh};tile(g,r,'am',1);words(g,'next line?',W/2,y+lh/2,r.w,15,C.mu,800);
   const t=strips(3,Math.max(y+lh+12,H*.6),H*.97);t.forEach((q,i)=>{tile(g,q,S.bad===i?'no':'vi');words(g,it.ops[i][0],q.x+q.w/2,q.y+q.h/2,q.w-16,17,C.tx,800)});S.hot=t}
  else words(g,'✓ Same start, new sound at the end.',W/2,Math.min(H*.9,y+lh),W-30,17,C.gr,800)}
 if(m==='voice'){const it=SAY[S.at];if(!it)return;const r={x:12,y:H*.05,w:W-24,h:H*.36};tile(g,r,'cy');
  if(S.ok){const v=it.ok,col=v==='soft'?C.mu:C.tx;g.save();if(v==='slow'&&'letterSpacing'in g)g.letterSpacing='4px';words(g,it.t,W/2,r.y+r.h/2,r.w-20,v==='loud'?25:v==='soft'?16:20,col,v==='soft'?500:900);g.restore()}
  else words(g,it.t,W/2,r.y+r.h/2,r.w-20,21,C.tx,800);
  words(g,S.ok?'✓ '+VOICE[it.ok][1]+' fits these words.':'How should you read it aloud? Drag a voice up, or tap it.',W/2,H*.49,W-24,16,S.ok?C.gr:C.tx,800);
  if(!S.ok){const t=row3(3,H*.58,Math.min(k(110),H*.36));t.forEach((q,i)=>{const v=VOICE[it.ops[i]];tile(g,q,S.bad===i?'no':'vi');pic(g,v[0],q.x+q.w/2,q.y+q.h*.38,k(34));words(g,v[1],q.x+q.w/2,q.y+q.h*.78,q.w-8,18,C.tx,900)});S.hot=t}}
 A.fx.draw(g)}
function oops(t,j){A.sound.miss();S.bad=j;S.shake=1;tell(t);setTimeout(()=>{S.bad=-1;S.shake=0;A.redraw()},quick()?10:1800);A.redraw()}
function yes(t){S.got++;S.ok=1;A.sound.pop();tell(t);buttons();A.redraw();S.after();hold(next,1700)}
function hold(f,ms){const r=run,at=S.at;setTimeout(()=>{if(r!==run||S.at!==at||S.got>=S.need)return;f()},quick()?5:ms)}
function next(){S.at++;S.ok=0;tell('Next one.');buttons();A.redraw()}
function choose(i){if(S.ok||S.got>=S.need)return;const m=mode();
 if(m==='rhyme'){const it=RHY[S.at],o=it.ops[i];if(!o[1])return oops(o[2],i);return yes(`${it.a} ${it.b} ${o[0]}. ${it.a.split(' ').pop().replace(/[.,]/g,'')} and ${o[0]} rhyme.`)}
 if(m==='beat'){const it=BEAT[S.at],o=it.ops[i],n=claps(it.a);if(o.n!==n)return oops(`${plain(o.w)} has ${o.n} clap${o.n>1?'s':''}: ${o.w.join(' ')}. The first line has ${n}: ${it.a.join(' ')}.`,i);return yes(`Yes: ${o.w.join(' ')}. ${n} claps, just like the first line.`)}
 if(m==='pattern'){const o=PAT[S.at].ops[i];if(!o[1])return oops(o[2],i);return yes(`“${o[0]}” keeps the pattern and adds a new sound.`)}
 if(m==='voice'){const it=SAY[S.at],v=it.ops[i];if(v!==it.ok)return oops(it.w[v],i);return yes(`${VOICE[v][1]}: the words tell you how to say them.`)}}
function buttons(){if(!pad)return;pad.innerHTML='';const m=mode(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=f};
 if(m==='quiz'||m==='hi'||S.got>=S.need||S.ok)return;
 if(m==='rhyme')RHY[S.at].ops.forEach((o,i)=>B(o[0],()=>choose(i),`Finish the line with ${o[0]}`));
 if(m==='beat')BEAT[S.at].ops.forEach((o,i)=>B(plain(o.w),()=>choose(i)));
 if(m==='pattern')PAT[S.at].ops.forEach((o,i)=>B(o[0],()=>choose(i)));
 if(m==='voice')SAY[S.at].ops.forEach((v,i)=>B(VOICE[v][0]+' '+VOICE[v][1],()=>choose(i),`Read it in a ${VOICE[v][1].toLowerCase()} voice`))}
const inside=(p,r,e)=>(e=e||0,p.x>r.x-e&&p.x<r.x+r.w+e&&p.y>r.y-e&&p.y<r.y+r.h+e);
function down(p){const m=mode();if(m==='quiz'||m==='hi'||S.got>=S.need||S.ok)return false;const j=S.hot.findIndex(r=>inside(p,r,4));if(j<0)return false;S.grab={i:j,x:null,x0:p.x,y0:p.y};return true}
function move(p){const d=S.grab;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.grab;S.grab=null;if(!d)return;const line=mode()==='rhyme'?H0():A.H*.52;if(d.x==null||p.y<line)return choose(d.i);tell('Drag it up higher, or just tap it.');A.redraw()}
const H0=()=>A.H*.62;
const fin=(i,msg)=>()=>{if(A.step===i&&S.got>=S.need&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function autoplay(f){const r=++run,go=()=>{if(r!==run||S.got>=S.need)return;f();setTimeout(go,60)};setTimeout(go,30)}
const reset=()=>{run++;Object.assign(S,fresh())};
function right(){if(S.ok)return;const m=mode();if(m==='rhyme')return choose(RHY[S.at].ops.findIndex(o=>o[1]));if(m==='beat'){const it=BEAT[S.at];return choose(it.ops.findIndex(o=>o.n===claps(it.a)))}
 if(m==='pattern')return choose(PAT[S.at].ops.findIndex(o=>o[1]));if(m==='voice'){const it=SAY[S.at];return choose(it.ops.indexOf(it.ok))}}
const showMe=i=>()=>{steps[i].go();S.auto=1;autoplay(right)};
const steps=[
{h:'Poems play with sound',p:'A poem is words that sound good together. Rhymes end the same, lines have a beat you can clap, and you say it in a voice that fits.',go:()=>{reset();tell('The cat sat on a mat. The cat wore a hat. Mat and hat rhyme.')}},
{h:'Find the rhyme',p:'Rhyming words end with the same sound, like bus and fuss. Finish each pair of lines with a word that rhymes.',predict:{q:'Two words rhyme when they…',opts:['start with the same sound','end with the same sound'],ans:1},task:'Finish 3 rhymes',show:showMe(1),
 go:()=>{reset();tell('Which word rhymes? Drag it into the gap, or tap it.');buttons();S.after=fin(1,'Rhymes match at the end: bus and fuss, log and dog, high and sky. High and sky are spelt differently but sound the same at the end.')}},
{h:'Clap the beat',p:'Clap once for each beat as you say the line. Two lines that go together sound best with the same number of claps.',predict:{q:'A long word like “elephants” gets…',opts:['one clap, because it is one word','a clap for each beat: el-e-phants'],ans:1},task:'Match the claps 3 times',show:showMe(2),
 go:()=>{reset();tell('Clap the first line. Then pick a line with the same number of claps.');buttons();S.after=fin(2,'Count beats, not words: el-e-phants stomp is 4 claps, and so is croc-o-diles snap.')}},
{h:'Keep the pattern',p:'Many poems repeat the start of each line. The start stays the same, and the end changes each time.',predict:{q:'The next line of an “I can hear” poem should…',opts:['start with “I can hear” and say a new sound','be a copy of the line before'],ans:0},task:'Add 3 lines to the poem',show:showMe(3),
 go:()=>{reset();tell('Pick the line that keeps the pattern going. Drag it up, or tap it.');buttons();S.after=fin(3,'Same start, new ending. That pattern makes the poem easy to remember and fun to say.')}},
{h:'Say it with feeling',p:'When you read a poem aloud, let the words tell your voice what to do: soft, loud, fast or slow.',predict:{q:'When you read a poem aloud, you should…',opts:['use the same voice for every line','change your voice to fit the words'],ans:1},task:'Pick the right voice 3 times',show:showMe(4),
 go:()=>{reset();tell('How should you read it aloud? Drag a voice up, or tap it.');buttons();S.after=fin(4,'Shh means soft, big letters and ! mean loud, creeps slowly means slow. The words tell your voice what to do.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[['Which word rhymes with cake?',[['lake','ok'],['cat','start'],['cook','start']]],
 ['How many claps in “butterfly”?',[['3','ok'],['1','oneword'],['9','letters']]],
 ['The poem goes: “I like jam. I like ham.” Which line comes next?',[['I like eggs.','ok'],['Eggs are nice.','break'],['I like jam.','copy']]],
 ['How should you read “Whisper, whisper, little mouse”?',[['Softly','ok'],['Very loudly','loud'],['As fast as you can','fast']]],
 ['Which two words rhyme?',[['blue and shoe','ok'],['blue and black','start'],['shoe and sock','start']]],
 ['Which line has the same claps as “Big black cat”?',[['Small grey mouse','ok'],['Mouse','short'],['A tiny little grey mouse','long']]]];
function why(t){let m='Listen to the ends, clap the beats, and keep the pattern.';
 if(t==='start')m='Starting the same is not a rhyme. Rhymes end the same: cake, lake; blue, shoe.';
 if(t==='oneword')m='One word can have more than one beat: but-ter-fly is 3 claps.';if(t==='letters')m='Clap the beats, not the letters: but-ter-fly, 3 claps.';
 if(t==='break')m='That line drops the pattern. Keep “I like” at the start.';if(t==='copy')m='That line is already in the poem. Same start, new ending.';
 if(t==='loud')m='“Whisper” tells you to be quiet. Read it softly.';if(t==='fast')m='A whisper is soft and gentle, not a race. Read it softly.';
 if(t==='short')m='“Mouse” is only 1 clap. Big black cat has 3.';if(t==='long')m='That line has 7 claps: a ti-ny lit-tle grey mouse. Big black cat has 3.';return m}
function ask(){qn++;const [q,ops]=QS[qn%QS.length],r=qn%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const el=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},el,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok){row++;A.win()}else{row=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Yes!':'✗ '+why(t)}${ok?` Right in a row: ${row}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.7,tall:1.35,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}});
A.start()})})();
