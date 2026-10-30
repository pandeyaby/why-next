/* Flagship – sharing and publishing your writing (ages 5–11): turn a volume dial until your voice reaches the back row
   without shouting; tap the gaps where a reader pauses (after . ! ?); give each sentence its tune (a yes/no question
   goes up); press the key that fixes a typed line (Shift, space bar, Backspace, full stop); order plan → publish → share. */
(()=>{
const ROWS=4,GOOD=4;
const READ=['We','went','to','the','beach.','The','sea','was','cold!','Did','you','see','the','crab?','It','ran','away.'];
const TUNE=[{s:'Can I come too?',k:'up',why:'It asks a yes or no question, so your voice goes up at the end.'},
 {s:'Look out, a shark!',k:'strong',why:'The ! shows a strong feeling. Say it loudly, with a bang.'},
 {s:'The crab went home.',k:'down',why:'It just tells you something. Your voice goes down at the full stop.'}];
const SHAPES={up:'↗ Goes up',down:'↘ Goes down',strong:'‼ Strong'};
const TYPED=[{t:'my cat is fat.',f:'My cat is fat.',key:'shift',why:'A sentence starts with a capital letter. Hold Shift and press the letter.'},
 {t:'Ican run.',f:'I can run.',key:'space',why:'Words need a space between them. Press the space bar.'},
 {t:'The sun is hott.',f:'The sun is hot.',key:'back',why:'There is one t too many. Backspace deletes the letter before the cursor.'},
 {t:'We had fun',f:'We had fun.',key:'stop',why:'A sentence ends with a full stop. Press the . key.'}];
const KEYS={shift:'⇧ Shift',space:'Space bar',back:'⌫ Backspace',stop:'. Full stop'};
const ORDER=['Plan','Draft','Edit','Publish','Share'];
VIS.reg('flagpublish',c=>{let A,pad,quiz,qn=-1,tick=0;c.fig.classList.add('young');
const fresh0=()=>({cb:()=>{},vol:1,heard:0,read:0,marks:{},r:0,won:0,tune:null,fixed:'',order:[],drag:null,flash:-1,zones:[]}),S=fresh0();
const part=()=>['voice','pause','tune','type','publish','quiz'][A.step];
const sz=n=>Math.round(n*(A.narrow?1:1.15)),quick=()=>A.reduced();
const voice=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function txt(g,t,x,y,px,col,w,al){g.font=`${w||700} ${sz(px)}px system-ui,sans-serif`;g.fillStyle=col||A.col.tx;g.textAlign=al||'center';g.textBaseline='middle';g.fillText(t,x,y,A.W-12)}
function box(g,x,y,w,h,tone,fill){g.fillStyle=A.alpha(tone,fill==null?.16:fill);A.paint.rrect(x,y,w,h,12);g.fill();g.strokeStyle=tone;g.lineWidth=2.5;A.paint.rrect(x,y,w,h,12);g.stroke()}
const pupil=(r,i)=>({x:A.W*(.33+i*.18),y:A.H*(.3+r*.13)});
function scene(g){const{W,H,col:C}=A,reach=S.vol;txt(g,'You',W/2,H*.08,13);A.paint.ball(W/2,H*.15,Math.min(W,H)*.04,C.vi);
 if(S.read){for(let k=1;k<=reach;k++){g.strokeStyle=A.alpha(C.cy,.55-k*.08);g.lineWidth=3;g.beginPath();g.arc(W/2,H*.15,k*H*.13+H*.04,.12*Math.PI,.88*Math.PI);g.stroke()}}
 for(let r=0;r<ROWS;r++)for(let i=0;i<4;i++){const p=pupil(r,i),hear=S.read&&r<reach,loud=S.read&&S.vol>GOOD&&r===0;A.paint.ball(p.x,p.y,Math.min(W,H)*.035,hear?C.gr:C.mu);
  g.font=`${sz(16)}px system-ui`;g.textAlign='center';g.fillText(!S.read?'':loud?'🙉':hear?'👂':'❓',p.x,p.y-Math.min(W,H)*.06)}
 txt(g,'back row →',W*.03,pupil(ROWS-1,0).y,11,C.mu,600,'left');
 const x0=W*.12,x1=W*.88,y=H*.9;g.strokeStyle=C.ln;g.lineWidth=8;g.lineCap='round';g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();
 const hx=x0+(S.vol-1)/4*(x1-x0);g.strokeStyle=S.vol>GOOD?C.rd:C.gr;g.beginPath();g.moveTo(x0,y);g.lineTo(hx,y);g.stroke();A.paint.ball(hx,y,sz(13),S.vol>GOOD?C.rd:C.gr);
 txt(g,['whisper','quiet','talking','clear and loud','shouting'][S.vol-1],W/2,y-sz(22),13);S.zones=[{dial:1,x:x0-20,y:y-30,w:x1-x0+40,h:60}]}
function wordsRow(g){const{W,H,col:C}=A;S.zones=[];let x=12,y=H*.16;const lh=sz(46);g.font=`700 ${sz(17)}px system-ui,sans-serif`;
 READ.forEach((w,i)=>{const ww=g.measureText(w).width;if(x+ww>W-30){x=12;y+=lh}txt(g,w,x,y,17,C.tx,700,'left');x+=ww;
  if(i<READ.length-1){const gx=x+sz(11),mk=S.marks[i];if(mk==='ok'){g.fillStyle=C.gr;g.font=`800 ${sz(17)}px system-ui`;g.textAlign='center';g.fillText('⏸',gx,y)}
   else if(mk==='no'){g.strokeStyle=C.rd;g.lineWidth=3;g.beginPath();g.arc(gx,y,sz(9),0,7);g.stroke()}else{g.fillStyle=A.alpha(C.cy,.35);g.beginPath();g.arc(gx,y+sz(13),4,0,7);g.fill()}
   S.zones.push({gap:i,x:gx-sz(13),y:y-lh/2,w:sz(26),h:lh});x+=sz(22)}});
 const n=Object.values(S.marks).filter(m=>m==='ok').length;txt(g,`Pauses found: ${n} of ${stopsN()}`,W/2,H*.86,14)}
const stopsN=()=>READ.slice(0,-1).filter(w=>/[.!?]$/.test(w)).length;
function contour(g,k,x,y,w,h,col){g.strokeStyle=col;g.lineWidth=5;g.lineCap='round';g.beginPath();
 if(k==='up'){g.moveTo(x,y);g.lineTo(x+w*.7,y);g.quadraticCurveTo(x+w*.9,y,x+w,y-h)}else if(k==='down'){g.moveTo(x,y-h*.4);g.lineTo(x+w*.7,y-h*.4);g.quadraticCurveTo(x+w*.9,y-h*.4,x+w,y+h*.3)}
 else{g.moveTo(x,y-h*.2);for(let i=1;i<=6;i++)g.lineTo(x+w*i/6,y-h*.2-(i%2?h*.5:0))}g.stroke()}
function tuneScene(g){const{W,H,col:C}=A;if(S.won>=TUNE.length){txt(g,'Punctuation tells your voice what to do.',W/2,H/2,15);return}
 const t=TUNE[S.r];box(g,12,H*.08,W-24,H*.2,C.vi);txt(g,t.s,W/2,H*.18,20,C.tx,800);if(S.tune)contour(g,S.tune,W*.15,H*.44,W*.7,H*.12,S.tune===t.k?C.gr:C.rd);
 S.zones=[];const keys=Object.keys(SHAPES),bw=(W-48)/3;keys.forEach((k,i)=>{const x=12+i*(bw+12),y=H*.66,h=H*.26;box(g,x,y,bw,h,C.cy);contour(g,k,x+bw*.15,y+h*.55,bw*.7,h*.25,C.tx);txt(g,SHAPES[k],x+bw/2,y+h*.18,12,C.tx,800);S.zones.push({tune:k,x,y,w:bw,h})})}
function typeScene(g){const{W,H,col:C}=A;if(S.won>=TYPED.length){txt(g,'Capital, spaces, no extra letters, full stop. Ready to publish!',W/2,H*.4,14);return}
 const t=TYPED[S.r],line=S.fixed||t.t;box(g,12,H*.06,W-24,H*.22,C.ln,.12);g.font=`500 ${sz(22)}px ui-monospace,Menlo,monospace`;g.fillStyle=C.tx;g.textAlign='left';g.textBaseline='middle';
 const tw=g.measureText(line).width,x0=(W-tw)/2;g.fillText(line,x0,H*.17);if(!S.fixed&&(Date.now()/500|0)%2===0){g.fillStyle=C.ac;g.fillRect(t.key==='shift'?x0-3:t.key==='stop'?x0+tw+2:t.key==='back'?x0+g.measureText(line.slice(0,-1)).width+2:x0+g.measureText('I').width+1,H*.11,2,H*.12)}
 S.zones=[];const ks=Object.keys(KEYS),kw=(W-36)/2,kh=H*.17;ks.forEach((k,i)=>{const x=12+(i%2)*(kw+12),y=H*.4+Math.floor(i/2)*(kh+10),bad=S.flash===i;box(g,x,y,kw,kh,bad?C.rd:C.tx,bad?.25:.08);txt(g,KEYS[k],x+kw/2,y+kh/2,15,C.tx,800);S.zones.push({key:k,i,x,y,w:kw,h:kh})})}
function pubScene(g){const{W,H,col:C}=A;S.zones=[];const n=ORDER.length,sw=(W-24)/n-6;
 for(let i=0;i<n;i++){const x=12+i*(sw+6),y=H*.12,h=H*.2;box(g,x,y,sw,h,S.order[i]?C.gr:C.ln,S.order[i]?.2:.06);txt(g,String(i+1),x+sw/2,y-sz(10),11,C.mu);if(S.order[i])txt(g,S.order[i],x+sw/2,y+h/2,12,C.tx,800);if(i<n-1)txt(g,'→',x+sw+3,y+h/2,11,C.mu)}
 const left=shuffled().filter(w=>!S.order.includes(w)),cw=Math.min(130,(W-36)/3);left.forEach((w,j)=>{if(S.drag&&S.drag.w===w)return;const x=12+(j%3)*(cw+6),y=H*.5+Math.floor(j/3)*H*.2;box(g,x,y,cw,H*.15,S.flash===j?C.rd:C.vi);txt(g,w,x+cw/2,y+H*.075,14,C.tx,800);S.zones.push({word:w,x,y,w:cw,h:H*.15})});
 if(S.drag){box(g,S.drag.x-55,S.drag.y-22,110,44,C.cy);txt(g,S.drag.w,S.drag.x,S.drag.y,14,C.tx,800)}if(S.order.length===n)txt(g,'Your best copy goes out to readers last.',W/2,H*.62,14)}
const shuffled=()=>['Edit','Share','Plan','Publish','Draft'];
function draw(A){const{ctx:g,W,H,col:C}=A,v=part();g.fillStyle=A.mix(C.pn,'#e0e7ff',C.dark?.06:.45);g.fillRect(0,0,W,H);
 if(v==='voice')scene(g);if(v==='pause')wordsRow(g);if(v==='tune')tuneScene(g);if(v==='type')typeScene(g);if(v==='publish')pubScene(g);
 if(v==='quiz'){g.font=`${sz(70)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillText('📖🎤',W/2,H/2)}A.fx.draw(g)}
const nope=(t,i)=>{A.sound.miss();S.flash=i==null?-1:i;voice(t);setTimeout(()=>{S.flash=-1;A.redraw()},quick()?10:800);A.redraw()};
function setVol(n){if(part()!=='voice')return;S.vol=Math.max(1,Math.min(5,n));S.read=0;A.sound.tick();voice(`Voice: ${['whisper','quiet','talking','clear and loud','shouting'][S.vol-1]}.`);A.redraw()}
function readOut(){if(part()!=='voice')return;S.read=1;A.redraw();
 if(S.vol<GOOD)return nope(`Only ${S.vol} row${S.vol>1?'s':''} can hear you. The back row is lost. Turn your voice up.`);
 if(S.vol>GOOD)return nope('Everyone hears, but the front row covers their ears. Shouting is too loud. Turn it down one.');
 S.heard=1;A.sound.pop();voice('All 4 rows can hear you, and no one covers their ears. Clear and loud!');S.cb()}
function markGap(i){if(part()!=='pause'||S.marks[i]==='ok')return;const ok=/[.!?]$/.test(READ[i]);
 if(!ok){S.marks[i]='no';nope(`No pause after “${READ[i]}”: there is no full stop, ! or ? there, so keep reading.`);setTimeout(()=>{if(S.marks[i]==='no'){delete S.marks[i];A.redraw()}},quick()?20:900);return}
 S.marks[i]='ok';A.sound.tick();const n=Object.values(S.marks).filter(m=>m==='ok').length;voice(`Pause after “${READ[i]}”. ${n} of ${stopsN()}.`);A.redraw();S.cb()}
function pickTune(k){if(part()!=='tune'||S.won>=TUNE.length)return;const t=TUNE[S.r];S.tune=k;A.redraw();
 if(k!==t.k)return nope(k==='up'?'That would sound like a question, but there is no question mark here. '+t.why:k==='down'?'That sounds flat and calm. '+t.why:'That sounds like shouting. '+t.why);
 A.sound.tick();S.r++;S.won++;voice(t.why);setTimeout(()=>{S.tune=null;A.redraw()},quick()?5:500);if(S.won>=TUNE.length)A.sound.pop();S.cb()}
function pressKey(k){if(part()!=='type'||S.won>=TYPED.length||S.fixed)return;const t=TYPED[S.r];
 if(k!==t.key)return nope(({shift:'Shift makes a capital letter, but the start already has one or this line needs something else. ',space:'The space bar adds a gap, but the words here already have gaps. ',back:'Backspace deletes a letter. Nothing here is extra. ',stop:'The . key adds a full stop, but there is one already. '}[k])+t.why,Object.keys(KEYS).indexOf(k));
 S.fixed=t.f;A.sound.tick();voice(`Fixed: ${t.f}`);A.redraw();setTimeout(()=>{S.fixed='';S.r++;S.won++;if(S.won>=TYPED.length)A.sound.pop();A.redraw();S.cb()},quick()?5:420)}
function place(w){if(part()!=='publish')return;const want=ORDER[S.order.length];if(w!==want){const j=shuffled().filter(x=>!S.order.includes(x)).indexOf(w);
  return nope(w==='Publish'||w==='Share'?`Not yet. You ${w.toLowerCase()} after you ${want==='Edit'?'edit, so readers see your best copy':want.toLowerCase()}. Next comes ${want}.`:`${w} comes later. Next comes ${want}.`,j)}
 S.order.push(w);A.sound.tick();voice(`${S.order.length}. ${w}.`);controls();A.redraw();S.cb()}
function controls(){if(!pad)return;pad.innerHTML='';const v=part(),b=(t,fn,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=fn};
 if(v==='voice'){b('🔉 Quieter',()=>setVol(S.vol-1),'Make your voice quieter');b('🔊 Louder',()=>setVol(S.vol+1),'Make your voice louder');b('📖 Read it out',readOut,'Read your writing to the class')}
 if(v==='pause'){const nx=READ.findIndex((w,i)=>i<READ.length-1&&/[.!?]$/.test(w)&&S.marks[i]!=='ok');if(nx>=0)b('⏸ Mark the next pause',()=>markGap(nx),'Mark the next place to pause')}
 if(v==='tune')Object.keys(SHAPES).forEach(k=>b(SHAPES[k],()=>pickTune(k)));
 if(v==='type')Object.keys(KEYS).forEach(k=>b(KEYS[k],()=>pressKey(k),'Press '+KEYS[k].replace(/^\W+\s*/,'')));
 if(v==='publish')shuffled().filter(w=>!S.order.includes(w)).forEach(w=>b(w,()=>place(w),`Put ${w} next`));A.redraw()}
const hit=p=>S.zones.find(z=>p.x>=z.x&&p.x<=z.x+z.w&&p.y>=z.y&&p.y<=z.y+z.h);
function dialTo(p){const x0=A.W*.12,x1=A.W*.88,n=Math.round((p.x-x0)/(x1-x0)*4)+1;if(n!==S.vol)setVol(n)}
function down(p){const v=part(),z=hit(p);if(!z)return false;
 if(v==='voice'&&z.dial){dialTo(p);S.drag={dial:1};return true}
 if(v==='pause'&&z.gap!=null){markGap(z.gap);return false}if(v==='tune'&&z.tune){pickTune(z.tune);return false}if(v==='type'&&z.key){pressKey(z.key);return false}
 if(v==='publish'&&z.word){S.drag={w:z.word,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
function move(p){if(!S.drag)return;if(S.drag.dial)return dialTo(p);S.drag.x=p.x;S.drag.y=p.y;A.redraw()}
function up(p){const d=S.drag;S.drag=null;if(!d||d.dial)return;if(Math.hypot(p.x-d.x0,p.y-d.y0)<8||p.y<A.H*.36)return place(d.w);voice('Drop it on the row of steps at the top.');A.redraw()}
const ready=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function auto(list){const k=++tick;list.forEach((fn,j)=>setTimeout(()=>{if(k===tick)fn()},quick()?j*40+30:(j+1)*330))}
const clear=()=>{tick++;Object.assign(S,fresh0())};
const gaps=()=>READ.map((w,i)=>i).filter(i=>i<READ.length-1&&/[.!?]$/.test(READ[i]));
const steps=[
{h:'Loud enough',p:'You are reading your story to the class. Drag the dial, or use Louder and Quieter. Then press Read it out.',
 predict:{q:'When you read to the class, who needs to hear you?',opts:['Just the front row','Everyone, even the back row'],ans:1},task:'Make the back row hear you, without shouting',
 show:()=>{steps[0].go();auto([()=>setVol(2),readOut,()=>setVol(3),()=>setVol(4),readOut])},go:()=>{clear();voice('Your voice is a whisper. Can the back row hear?');controls();S.cb=ready(0,()=>S.heard,'Clear and loud reaches everyone. Shouting is too much.')}},
{h:'Pause at the marks',p:'Full stops, ! and ? tell a reader to pause. Tap each gap where you would stop for a breath.',task:'Find all 3 pauses',
 show:()=>{steps[1].go();auto(gaps().map(i=>()=>markGap(i)))},go:()=>{clear();voice('Where do you pause when you read this out?');controls();S.cb=ready(1,()=>gaps().every(i=>S.marks[i]==='ok'),'Pausing at the marks helps people follow your writing.')}},
{h:'Give it a tune',p:'Read each sentence. Tap how your voice should sound at the end.',
 predict:{q:'How does your voice go at the end of “Can I come too?”',opts:['Down, like a full stop','Up'],ans:1},task:'Match 3 sentences to their tune',
 show:()=>{steps[2].go();auto(TUNE.map(t=>()=>pickTune(t.k)))},go:()=>{clear();voice('How does it sound: '+TUNE[0].s);controls();S.cb=ready(2,()=>S.won>=3,'This is intonation: your voice shows the meaning.')}},
{h:'Type it',p:'Each typed line has one thing wrong. Tap the key that fixes it.',
 predict:{q:'How do you type a capital letter?',opts:['Press the letter harder','Hold Shift and press the letter'],ans:1},task:'Fix 4 typed lines',
 show:()=>{steps[3].go();auto(TYPED.flatMap(t=>[()=>pressKey(t.key),()=>{}]))},go:()=>{clear();voice('Fix the line: '+TYPED[0].t);controls();S.cb=ready(3,()=>S.won>=4,'Shift, space bar, Backspace and full stop make a typed copy neat.')}},
{h:'Publish',p:'Put the writing steps in order. Drag a card to the top row, or tap the buttons in order.',task:'Order the steps from plan to share',
 show:()=>{steps[4].go();auto(ORDER.map(w=>()=>place(w)))},go:()=>{clear();voice('What comes first, from plan to share?');controls();S.cb=ready(4,()=>S.order.length===5,'Publish means a neat final copy, after you edit.')}},
{h:'Challenge',p:'',go:()=>{clear();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.cb()});
const QS=[['You read your story to the class. How loud should you be?',[['Clear and loud, so the back row hears','ok'],['Very quiet, so no one laughs','quiet'],['Shouting as loud as you can','shout']]],
 ['What do you do when you reach a full stop as you read aloud?',[['Pause','ok'],['Read faster','rush'],['Stop and sit down','end']]],
 ['How does your voice go at the end of “Is it raining?”',[['Up','ok'],['Down','downq'],['It stays flat','flat']]],
 ['You typed “i like it.” Which key fixes it?',[['Shift, for a capital I','ok'],['The space bar','space'],['Backspace on the full stop','dot']]],
 ['When do you publish your writing?',[['After you edit it','ok'],['Before you draft it','early'],['Straight after you plan it','skip']]]];
function why(t){let m='Think about your readers and listeners: can they hear, follow and read it?';
 if(t==='quiet')m='If you are very quiet, the back row cannot hear your story.';
 if(t==='shout')m='Shouting hurts ears and sounds cross. Clear and loud is enough.';
 if(t==='rush')m='Rushing past the full stop runs two sentences together. Pause so listeners can follow.';
 if(t==='end')m='The full stop ends a sentence, not the story. Pause, then read on.';
 if(t==='downq')m='A yes or no question goes up at the end. Down sounds like telling, not asking.';
 if(t==='flat')m='A flat voice hides that it is a question. Let it go up.';
 if(t==='space')m='The spaces are fine. The sentence needs a capital I: hold Shift.';
 if(t==='dot')m='The full stop is right. The problem is the small i at the start: use Shift.';
 if(t==='early')m='You cannot publish before there is a draft. Plan, draft, edit, then publish.';
 if(t==='skip')m='Publishing straight after a plan skips the draft and the edit. Readers should get your best copy.';
 return m}
function nextQ(){qn++;const[q,o]=QS[qn%QS.length],k=qn%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');o.slice(k).concat(o.slice(0,k)).forEach(([a,t])=>{const e=c.el('button',{type:'button',class:'lbtn'},row,a);e.onclick=()=>grade(t)});voice('Challenge: '+q);A.redraw()}
let good=0;
function grade(t){quiz.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
 if(ok){good++;A.win()}else{good=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Right! Your readers will thank you.':'✗ '+why(t)}${ok?` Correct in a row: ${good}.`:''} <button type="button" class="linkish">Next one →</button>`;fb.querySelector('button').onclick=nextQ}
A=FK.shell(c,{steps,ratio:.64,tall:1.1,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);clear();A.gest({down,move,up});controls()}});
A.start()})})();
