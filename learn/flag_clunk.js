/* Flagship – monitoring comprehension (ages 6–8): reading the words is not the same as getting the meaning. Tap the line
   that clunks, use a clue line to fix a word you can say but not explain, reread to find who did what, choose the fix-up
   that suits each kind of clunk, then mark every line of a story click or clunk. Big rows to tap, a button for every row. */
(()=>{
const FIND=[{t:['Mia put on her boots.','She went out in the rain.','The rain was dry and hot.','She jumped in a big puddle.'],bad:2,why:'Rain is wet, not dry.'},
 {t:['It was the middle of the night.','The sun was hot on Ben\'s back.','He was in bed.','The moon shone in.'],bad:1,why:'There is no hot sun in the middle of the night.'},
 {t:['Tom had a cake for his birthday.','He lit seven candles.','He blew them out with his ears.','Then he cut the cake.'],bad:2,why:'You blow with your mouth, not your ears.'}];
const CLUE=[{t:['The puppy was famished.','It gobbled up its food in one go.','Then it had a nap.'],w:'famished',clue:1,ops:['very hungry','very sleepy','very wet'],ans:0,trap:{1:'The nap comes after. The clue line says it gobbled its food, so famished means very hungry.',2:'Nothing in the story is wet. Gobbling food is the clue: very hungry.'}},
 {t:['Kim came in from the storm.','She was drenched.','Water dripped from her hair onto the mat.'],w:'drenched',clue:2,ops:['very wet','very cross','very cold'],ans:0,trap:{1:'She might be cross, but the clue is water dripping from her hair. Drenched means very wet.',2:'Cold is a guess. Water dripping from her hair tells you: very wet.'}},
 {t:['The box was enormous.','It was too big to fit through the door.','Dad had to open it outside.'],w:'enormous',clue:1,ops:['very big','very old','very light'],ans:0,trap:{1:'Old things can fit through doors! Too big to fit is the clue: very big.',2:'Light means not heavy. Too big to fit through the door means very big.'}}];
const BACK=[{t:['Ben and his gran went to the beach.','He made a sandcastle.','She read a book.'],q:'Who read a book?',line:0,a:'Gran',why:'"She" is Gran. Line 1 says Ben went with his gran.'},
 {t:['Raj had a red kite.','His sister had a blue one.','The red one got stuck in a tree.'],q:'Whose kite got stuck?',line:0,a:'Raj',why:'Line 1 says Raj had the red kite.'},
 {t:['Lily fed the cat and the dog.','Then she gave the dog a bath.','It shook water all over her.'],q:'What shook water on Lily?',line:1,a:'the dog',why:'Line 2 says the dog had the bath, so "it" is the dog.'}];
const FIXES=[['reread','🔁 Reread'],['readon','⏩ Read on for a clue'],['picture','🖼️ Make a picture in my head'],['ask','🙋 Ask someone']];
const CLUNKS=[['I got to the end and forgot what it was about.','reread'],['I can say "gigantic" but I do not know what it means.','readon'],['I cannot see where the cat is hiding.','picture'],['I reread and read on, and I still do not get it.','ask']];
const CHECK=[{t:['Ana had a goldfish called Bob.','Bob lived in a glass bowl.','Every day Ana fed him seeds and hay.','He swam round and round.','At night Bob barked at the moon.'],bad:[2,4]},
 {t:['Sam made a jam sandwich.','He put the jam on the bread.','Then he put the bread in the fridge to warm it up.','He ate it at the park.'],bad:[2]}];
VIS.reg('flagclunk',c=>{let A,ctl,quiz,clock=0,gen=0,qi=-1,inrow=0;
const blank=()=>({r:0,won:0,phase:0,marks:[],hit:-1,good:-1,rects:[],tiles:[],flag:null,got:false,note:'',want:()=>{}});let S=blank();
const part=()=>['find','clue','back','fix','check','quiz'][A.step];
const need=()=>part()==='check'?2:3;
const quick=()=>A.reduced();
const voice=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const story=()=>{const k=part(),r=S.r;return k==='find'?FIND[r%3]:k==='clue'?CLUE[r%3]:k==='back'?BACK[r%3]:k==='check'?CHECK[r%2]:null};
const px=n=>Math.round(n*(A.narrow?1:1.15));
function wrapLines(g,t,maxw){const out=[''];t.split(' ').forEach(w=>{const tr=(out[out.length-1]+' '+w).trim();if(g.measureText(tr).width>maxw&&out[out.length-1])out.push(w);else out[out.length-1]=tr});return out}
/* rows: each story line in its own big tappable band with a status light on the left */
function rows(g,lines,top){const C=A.col,x=12,w=A.W-24,fs=px(15),lh=fs*1.3;g.font=`600 ${fs}px system-ui,sans-serif`;let y=top;S.rects=[];
 lines.forEach((t,i)=>{const L=wrapLines(g,t,w-58),h=Math.max(40,L.length*lh+16),m=S.marks[i],hot=S.hit===i,ok=S.good===i;
  g.fillStyle=hot?A.alpha(C.rd,.15):ok?A.alpha(C.gr,.18):m==='clunk'?A.alpha(C.am,.18):A.mix(C.pn,C.cy,C.dark?.12:.07);A.paint.rrect(x,y,w,h,12);g.fill();
  g.strokeStyle=hot?C.rd:ok?C.gr:m==='clunk'?C.am:A.alpha(C.cy,.7);g.lineWidth=hot||ok||m?4:2;A.paint.rrect(x,y,w,h,12);g.stroke();
  g.font=`${px(20)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(m==='clunk'?'🛑':m==='click'?'✅':ok?'✅':'⚪',x+24,y+h/2);
  g.font=`600 ${fs}px system-ui,sans-serif`;g.textAlign='left';g.fillStyle=C.tx;L.forEach((l,k)=>g.fillText(l,x+46,y+8+lh/2+k*lh));S.rects.push({x,y,w,h});y+=h+8});return y}
function banner(g,t,y,col){const C=A.col;g.font=`800 ${px(15)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||C.tx;wrapLines(g,t,A.W-30).forEach((l,k)=>g.fillText(l,A.W/2,y+k*px(15)*1.25))}
function tiles(g,labels,top){const C=A.col,n=labels.length,cols=A.narrow?2:n,gap=8,w=(A.W-24-gap*(cols-1))/cols,h=54;S.tiles=[];g.font=`700 ${px(14)}px system-ui,sans-serif`;
 labels.forEach((t,i)=>{const x=12+(i%cols)*(w+gap),y=top+Math.floor(i/cols)*(h+gap),bad=S.hit===100+i;g.fillStyle=bad?A.alpha(C.rd,.15):A.mix(C.pn,C.vi,C.dark?.2:.1);A.paint.rrect(x,y,w,h,12);g.fill();
  g.strokeStyle=bad?C.rd:C.vi;g.lineWidth=3;A.paint.rrect(x,y,w,h,12);g.stroke();g.fillStyle=C.tx;g.textAlign='center';const L=wrapLines(g,t,w-12);L.forEach((l,k)=>g.fillText(l,x+w/2,y+h/2+(k-(L.length-1)/2)*px(14)*1.2));S.tiles.push({x,y,w,h})})}
function draw(A){const g=A.ctx,C=A.col,k=part();g.fillStyle=A.mix(C.pn,'#fefce8',C.dark?.03:.45);g.fillRect(0,0,A.W,A.H);
 if(k==='quiz'){banner(g,'Does it make sense?',A.H*.4);banner(g,'Click ✅ or clunk 🛑',A.H*.55);return}
 if(k==='fix'){const cl=CLUNKS[S.r%4];banner(g,'Clunk! '+cl[0],28,C.tx);tiles(g,FIXES.map(f=>f[1]),A.H*.34);if(S.note)banner(g,S.note,A.H*.9,C.gr);return}
 const st=story();let top=k==='back'||k==='clue'&&S.phase===1?50:12;
 if(k==='back')banner(g,S.got?`${st.q} ${st.a}!`:st.q,26,S.got?C.gr:C.tx);
 if(k==='clue'&&S.phase===1)banner(g,`What does "${st.w}" mean?`,26);
 if(k==='clue'&&S.phase===0)banner(g,`Which line is the clue for "${st.w}"?`,24),top=50;
 const y=rows(g,st.t,top);if(S.note)banner(g,S.note,Math.min(A.H-20,y+18),C.gr);
 if(S.flag&&S.flag.x!=null){g.font=`${px(30)}px system-ui,sans-serif`;g.textAlign='center';g.fillStyle='#000';g.fillText('🛑',S.flag.x,S.flag.y)}A.fx.draw(g)}
function slip(m,i){A.sound.miss();S.hit=i;voice(m);clearTimeout(clock);clock=setTimeout(()=>{S.hit=-1;A.redraw()},quick()?10:900);A.redraw()}
function begin(){S.phase=0;S.marks=[];S.got=false;S.note='';S.good=-1;S.hit=-1;voice(lead())}
function lead(){const k=part(),st=story();if(k==='find')return 'Read each line. Tap the one that does not make sense.';if(k==='clue')return `You can say "${st.w}". Find the line that gives a clue to what it means.`;
 if(k==='back')return st.q+' Tap the line that tells you.';if(k==='fix')return 'Clunk: '+CLUNKS[S.r%4][0]+' Pick a fix-up.';if(k==='check')return 'Mark every line: tap once for clunk. Then press Check.';return ''}
function gotIt(m){S.won++;A.sound.pop();voice(m);S.note=m.length<60?m:'';buttons();A.redraw();const k=A.step;setTimeout(()=>{if(A.step!==k)return;if(S.won<need()){S.r++;begin();buttons();voice(m+' Next one. '+lead());A.redraw()}S.want()},quick()?20:700)}
/* the per-part rules: what counts as right, and the feedback that names the slip */
function tapRow(i){const k=part(),st=story();if(S.won>=need()&&k!=='check')return;
 if(k==='find'){if(i===st.bad){S.marks[i]='clunk';return gotIt('Clunk found! '+st.why)}return slip(`That line makes sense: "${st.t[i]}" Read on and find the one that clunks.`,i)}
 if(k==='clue'&&S.phase===0){if(i===st.clue){S.good=i;S.phase=1;A.sound.tick();voice(`Yes, that is the clue. What does "${st.w}" mean?`);buttons();return A.redraw()}
  return slip(i===0?`That is the line with "${st.w}" in it. The clue is in a line near it.`:'That line does not help with the word. Find the line that shows what it means.',i)}
 if(k==='back'){if(S.got)return;if(i===st.line){S.got=true;S.good=i;return gotIt(`${st.a}! ${st.why}`)}return slip(`That line does not tell you. Look back for the line that names who or what.`,i)}
 if(k==='check'){S.marks[i]=S.marks[i]==='clunk'?undefined:'clunk';A.sound.tick();voice(`Line ${i+1}: ${S.marks[i]==='clunk'?'clunk':'clear'}.`);A.redraw()}}
function meaning(o){const st=story();if(part()!=='clue'||S.phase!==1)return;if(o===st.ans)return gotIt(`Yes! "${st.w}" means ${st.ops[o]}. The clue line told you.`);slip(st.trap[o],null)}
function fixup(f){if(part()!=='fix'||S.won>=need())return;const want=CLUNKS[S.r%4][1];if(f===want)return gotIt('Good fix-up: '+FIXES.find(x=>x[0]===f)[1].replace(/^\S+ /,'')+'.');
 const m={reread:'Rereading helps when you lost track. This clunk needs something else.',readon:'Reading on helps with a word. This clunk is not about one word.',picture:'A picture helps you see where things are. Try a better fix-up.',ask:'Asking is great, but try a fix-up on your own first.'}[f];
 slip(m,100+FIXES.findIndex(x=>x[0]===f))}
function check(){if(part()!=='check'||S.won>=need())return;const st=story(),mk=st.t.map((_,i)=>S.marks[i]==='clunk');
 const wrong=mk.findIndex((m,i)=>m&&!st.bad.includes(i)),miss=st.bad.find(i=>!mk[i]);
 if(wrong>=0)return slip(`Line ${wrong+1} makes sense. You can read it and it fits the story.`,wrong);
 if(miss!=null)return slip(st.bad.length>1?'One more line still clunks. Read each line and ask: does it fit?':'A line still clunks. Read each line and ask: does it fit?',null);
 st.t.forEach((_,i)=>{if(!mk[i])S.marks[i]='click'});gotIt(`All checked! ${st.bad.length} clunk${st.bad.length>1?'s':''} found.`)}
function buttons(){if(!ctl)return;ctl.innerHTML='';const k=part(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=f};
 if(k==='quiz'||(S.won>=need()))return;const st=story();
 if(k==='fix')return FIXES.forEach(([f,t])=>B(t,()=>fixup(f)));
 if(k==='clue'&&S.phase===1)return st.ops.forEach((o,i)=>B(o,()=>meaning(i),`${st.w} means ${o}`));
 st.t.forEach((t,i)=>B(`Line ${i+1}`,()=>tapRow(i),k==='check'?`Mark line ${i+1} as clunk: ${t}`:`Pick line ${i+1}: ${t}`));if(k==='check')B('Check ✔',check,'Check my marks')}
const inside=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
function down(p){const k=part();if(k==='quiz')return false;if(k==='fix'){const i=S.tiles.findIndex(r=>inside(p,r));if(i>=0)fixup(FIXES[i][0]);return false}
 const i=S.rects.findIndex(r=>inside(p,r));if(i<0)return false;S.flag={i,x:null,y:null,x0:p.x,y0:p.y};return true}
function move(p){const f=S.flag;if(!f)return;if(f.x!=null||Math.hypot(p.x-f.x0,p.y-f.y0)>10){f.x=p.x;f.y=p.y;A.redraw()}}
function up(p){const f=S.flag;S.flag=null;if(!f)return;const i=f.x==null?f.i:S.rects.findIndex(r=>inside(p,r));if(i>=0)tapRow(i);A.redraw()}
const ready=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(fns,ms){const me=++gen;fns.forEach((f,j)=>setTimeout(()=>{if(me===gen)f()},quick()?j*40+30:(j+1)*(ms||850)))}
function wipe(){gen++;clearTimeout(clock);S=blank();if(A)begin()}
const steps=[
{h:'Words or meaning?',p:'You can read every word. But does each line make sense? Tap the line that clunks.',predict:{q:'Sam can read every word in a line. Does Sam get what it means?',opts:['Yes, always','Not always'],ans:1},task:'Find the clunk in 3 stories',
 show:()=>{steps[0].go();demo(FIND.map(s=>()=>tapRow(s.bad)))},go:()=>{wipe();buttons();S.want=ready(0,()=>S.won>=3,'Reading the words is not the same as getting the meaning.')}},
{h:'Read on for a clue',p:'You can say the word, but what does it mean? Tap the line that gives a clue. Then pick the meaning.',predict:{q:'You can say a word but do not know it. Best move?',opts:['Skip it and keep going','Read on for a clue'],ans:1},task:'Fix 3 tricky words',
 show:()=>{steps[1].go();const f=[];CLUE.forEach(s=>{f.push(()=>tapRow(s.clue));f.push(()=>meaning(s.ans));f.push(()=>{})});demo(f,520)},go:()=>{wipe();buttons();S.want=ready(1,()=>S.won>=3,'A line near the word often shows what it means.')}},
{h:'Reread to fix it',p:'Lost track of who is who? Go back. Tap the line that tells you.',task:'Answer 3 by rereading',
 show:()=>{steps[2].go();demo(BACK.map(s=>()=>tapRow(s.line)))},go:()=>{wipe();buttons();S.want=ready(2,()=>S.won>=3,'Rereading finds who "he", "she" and "it" are.')}},
{h:'Pick a fix-up',p:'Each clunk needs its own fix-up. Reread, read on, make a picture, or ask.',task:'Fix 3 clunks',
 show:()=>{steps[3].go();demo(CLUNKS.slice(0,3).map(cl=>()=>fixup(cl[1])))},go:()=>{wipe();buttons();S.want=ready(3,()=>S.won>=3,'Notice the clunk, then pick a fix-up that suits it.')}},
{h:'Click or clunk?',p:'Read the whole story. Tap each line that clunks. Then press Check.',task:'Check 2 stories',
 show:()=>{steps[4].go();const f=[];CHECK.forEach(s=>{s.bad.forEach(i=>f.push(()=>tapRow(i)));f.push(check);f.push(()=>{})});demo(f,450)},go:()=>{wipe();buttons();S.want=ready(4,()=>S.won>=2,'Good readers check every line as they go.')}},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Jo reads a page out loud with no mistakes. Then she cannot say what it was about. What should she do?',[['Reread it, thinking about the meaning','ok'],['Nothing, she read every word','words'],['Read faster','fast']]],
 ['"The ice cream was so hot it burned my tongue." Click or clunk?',[['Clunk: ice cream is cold','ok'],['Click: I can read all the words','words2'],['Click: it is a short line','short']]],
 ['"The lion was ferocious. It roared and showed its sharp teeth." What does ferocious mean?',[['Fierce and scary','ok'],['Sleepy','sleep'],['Small and soft','soft']]],
 ['You get to the end of a page and forgot what happened. Best fix-up?',[['Reread the page','ok'],['Read on for a clue','word'],['Turn the page and carry on','carry']]],
 ['"Max gave Ella a pen. She said thank you." Who said thank you?',[['Ella','ok'],['Max','max'],['You cannot tell','cant']]]];
function hint(t){let m='Stop when it clunks. Ask: does this make sense?';
 if(t==='words')m='Reading every word is not the same as understanding. She should stop and fix it.';
 if(t==='fast')m='Faster reading will not fix it. Slow down and reread for meaning.';
 if(t==='words2')m='You can read the words, but the meaning clashes: ice cream is cold.';
 if(t==='short')m='Short lines can clunk too. Hot ice cream does not make sense.';
 if(t==='sleep')m='The clue says it roared and showed its teeth. That is not sleepy.';
 if(t==='soft')m='Sharp teeth and a roar are the clue: fierce and scary.';
 if(t==='word')m='Reading on helps with one tricky word. Here you lost the whole page, so reread.';
 if(t==='carry')m='If you carry on, you stay lost. Go back and reread.';
 if(t==='max')m='"She" is a girl. Max gave the pen, so Ella said thank you.';
 if(t==='cant')m='Reread: Ella is the only girl, so "she" is Ella.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],sh=qi%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(sh).concat(ops.slice(0,sh)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>grade(t)});voice('Challenge: '+q);A.redraw()}
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){inrow++;A.win()}else{inrow=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! You checked the meaning.':'✗ '+hint(t)}${ok?` In a row: ${inrow}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;ctl.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});buttons()}});
A.start()})})();
