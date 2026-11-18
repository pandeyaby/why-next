/* Flagship – joining in with repeated refrains (ages 2–3; EYFS Development Matters Communication and Language, birth–3
   and 3–4: "sing songs and say rhymes", "join in with familiar rhymes and stories", "anticipate key events and phrases in
   rhymes and stories"; Literacy 3–4 "engage in extended conversations about stories"). Five scenes: read a Gingerbread
   Man story and join in only at the pause, put the pattern in order (meet, stop, refrain), match four traditional refrains
   to their tales, keep the words the same each time, and make Teddy's own refrain and join in. Data in
   learn/refrain_art.js. */
(()=>{const {PAGES,ORDER,SHOW,TALES,SAME,LINES,OWN,QS}=REF;
VIS.reg('flagrefrain',c=>{let A,row,quizBox,qn=-1,tick=0;const R={};c.fig.classList.add('young');
const INKY='#1f2937',WIN='#047857',MISS='#b91c1c',RIM='#6b7280',PURPLE='#7c3aed',SANS='px system-ui,sans-serif';
const now=()=>['read','order','tales','same','own','quiz'][A.step];
const up=n=>A.narrow?n:Math.round(n*1.15);
function page(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fce7f3',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H)}
function sign(t,x,y,o){o=o||{};const g=A.ctx;let n=up(o.n||14);g.font=`800 ${n}${SANS}`;let w=g.measureText(t).width+28;
 while(w>A.W-10&&n>10){n--;g.font=`800 ${n}${SANS}`;w=g.measureText(t).width+28}
 const h=n+18,l=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle=o.tint||'#ffffff';A.paint.rrect(l,y-h/2,w,h,8);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?WIN:o.no?MISS:RIM;g.stroke();g.fillStyle=INKY;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
function split(t,max,g){const out=[''];t.split(' ').forEach(w=>{const s=out[out.length-1]?out[out.length-1]+' '+w:w;if(g.measureText(s).width>max&&out[out.length-1])out.push(w);else out[out.length-1]=s});return out}
function slab(r,e,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.tint||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,18);g.fill();
 g.lineWidth=o.ok||o.no||o.on?4:2;g.strokeStyle=o.ok?WIN:o.no?MISS:o.on?PURPLE:RIM;g.stroke();g.textAlign='center';g.textBaseline='middle';
 const top=e?r.y+r.h*.3:0;if(e){g.font=`${Math.round(Math.min(r.h*.32,r.w*.3))}${SANS}`;g.fillStyle='#000';g.fillText(e,r.x+r.w/2,top)}
 const n=Math.round(Math.max(11,Math.min(up(o.n||14),r.h*.15)));g.font=`800 ${n}${SANS}`;g.fillStyle=INKY;const L=split(t,r.w-14,g).slice(0,4),cy=e?r.y+r.h*.72:r.y+r.h/2;
 L.forEach((s,j)=>g.fillText(s,r.x+r.w/2,cy+(j-(L.length-1)/2)*(n+3),r.w-10))}
function cols(n,top,h,per){per=per||n;const gap=10,w=Math.min(170,(A.W-gap*(per+1))/per),x0=(A.W-(w*per+gap*(per-1)))/2;return Array.from({length:n},(_,i)=>({i,x:x0+(i%per)*(w+gap),y:top+Math.floor(i/per)*(h+gap),w,h}))}
const hits=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* 1 and 5. read along: join in at the pause */
const twoBtn=()=>cols(2,A.H*.72,A.H*.22);
function drawBook(s,pages,line,title){const g=A.ctx;page();
 if(s.p>=pages.length){sign(`${title}: you joined in ${s.joins} times`,A.W/2,A.H*.12,{ok:1});sign(`🗣️ ${line}`,A.W/2,A.H*.42,{n:15,tint:'#fef08a'});sign('Same words, every time, at the pause',A.W/2,A.H*.66,{n:13,ok:1});return}
 const [e,t,pause]=pages[s.p];sign(`Page ${s.p+1} of ${pages.length}`,A.W/2,A.H*.06,{n:12});
 slab({x:A.W*.06,y:A.H*.13,w:A.W*.88,h:A.H*.38},e,t,{n:16,no:s.bad});
 if(s.said)sign('🗣️ '+line,A.W/2,A.H*.6,{n:15,tint:'#fef08a',ok:1});else if(pause)sign('… the reader waits …',A.W/2,A.H*.6,{n:13});
 twoBtn().forEach((r,j)=>slab(r,j?'👂':'🗣️',j?'Listen':'Join in',{n:15,no:s.bad&&s.last===j}))}
function turn(s,pages,line,join){if(s.p>=pages.length)return;const pause=pages[s.p][2];
 if(s.said){s.p++;s.said=0;s.bad=0;return speak(s.p>=pages.length?`The end. You joined in ${s.joins} times, always with the same words.`:pages[s.p][1])}
 if(!!join!==!!pause){s.bad=1;s.last=join?0:1;A.sound.miss();return speak(join?'Not yet. Nobody stopped to wait for you. Listen to this page.':'The reader stopped and is waiting. That is your turn: join in!')}
 s.bad=0;A.sound.pop();if(join){s.said=1;s.joins++;return speak(`You joined in: ${line} Tap again to turn the page.`)}
 s.p++;return speak(s.p>=pages.length?`The end. You joined in ${s.joins} times.`:pages[s.p][1])}
/* 2. what comes next */
const slotsR=()=>cols(3,A.H*.12,A.H*.38),deckR=()=>cols(3,A.H*.6,A.H*.36);
function drawOrder(){const s=R.b,g=A.ctx;page();
 if(s.got.length>=3){sign('Meet → Stop! → the line',A.W/2,A.H*.2,{ok:1});sign('🏃 '+ORDER[2][1],A.W/2,A.H*.45,{n:14,tint:'#fef08a'});sign('When someone says Stop, the line is next',A.W/2,A.H*.7,{n:13,ok:1});return}
 sign(`What comes ${['first','next','last'][s.got.length]}?`,A.W/2,A.H*.05,{n:13});
 slotsR().forEach((r,j)=>{if(j<s.got.length)return slab(r,ORDER[j][0],ORDER[j][1],{ok:1,n:13});g.setLineDash([7,6]);g.lineWidth=3;g.strokeStyle=A.col.dark?'#e5e7eb':'#374151';A.paint.rrect(r.x,r.y,r.w,r.h,18);g.stroke();g.setLineDash([]);
  g.font=`900 ${up(26)}${SANS}`;g.fillStyle=A.col.tx;g.textAlign='center';g.textBaseline='middle';g.fillText(String(j+1),r.x+r.w/2,r.y+r.h/2)});
 deckR().forEach(r=>{const k=SHOW[r.i];if(s.got.includes(k)||(R.drag&&R.drag.i===r.i))return;slab(r,ORDER[k][0],ORDER[k][1],{no:s.bad===k,n:13})});
 if(R.drag){const d=R.drag,r=deckR()[d.i],k=SHOW[d.i];slab({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},ORDER[k][0],ORDER[k][1],{on:1,n:13})}}
function lay(j){const s=R.b,k=SHOW[j];if(s.got.includes(k)||s.got.length>=3)return;
 if(k!==s.got.length){s.bad=k;A.sound.miss();return speak(k===2?'Not yet. The line comes after someone says Stop.':s.got.length===0?'First the Gingerbread Man meets someone.':'Next the pig says Stop. Then the line.')}
 s.got.push(k);s.bad=-1;A.sound.pop();speak(s.got.length>=3?`${ORDER[2][1]} The pattern: meet, Stop, then the line.`:`${ORDER[k][1]} That is number ${k+1}.`)}
/* 3. whose line is it? */
const LSH=[2,0,3,1],taleR=()=>cols(4,A.H*.1,A.narrow?A.H*.2:A.H*.32,A.narrow?2:4),lineR=()=>cols(4,A.narrow?A.H*.58:A.H*.56,A.narrow?A.H*.18:A.H*.36,A.narrow?2:4).map((r,j)=>({...r,i:LSH[j]}));
function drawTales(){const s=R.c;page();sign(s.got.length>=4?'Every story has its own line':'Drag each line to its story',A.W/2,A.H*.04,{n:12,ok:s.got.length>=4});
 taleR().forEach(r=>{const t=TALES[r.i];slab(r,t[0],s.got.includes(r.i)?'✓ '+t[1]:t[1],{ok:s.got.includes(r.i),on:s.hot===r.i,n:12})});
 lineR().forEach(r=>{if(s.got.includes(r.i)||(R.drag&&R.drag.i===r.i))return;slab(r,'',TALES[r.i][2],{tint:'#fef08a',no:s.bad===r.i,on:s.pick===r.i,n:12})});
 if(R.drag){const d=R.drag,r=lineR().find(q=>q.i===d.i);slab({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},'',TALES[d.i][2],{tint:'#fef08a',on:1,n:12})}}
function pin(i,k){const s=R.c;if(s.got.includes(i))return;s.pick=null;
 if(i!==k){s.bad=i;A.sound.miss();return speak(`${TALES[i][2]} is not from ${TALES[k][1]}. It is from ${TALES[i][1]}.`)}
 s.got.push(i);s.bad=-1;A.sound.pop();speak(`${TALES[i][1]}: ${TALES[i][2]}`+(s.got.length>=4?' All 4 matched.':''))}
/* 4. same words every time */
const pickR=()=>{const w=Math.min(A.W-24,440),h=A.H*.15;return[0,1,2].map(i=>({i,x:(A.W-w)/2,y:A.H*.42+i*(h+10),w,h}))};
const choices=()=>{const [ok,bad]=SAME[R.d.r],all=[[ok,'ok'],...bad],z=(R.d.r+1)%3;return all.slice(z).concat(all.slice(0,z))};
function drawSame(){const s=R.d;page();
 if(s.r>=3){sign('3 lines, the same words each time',A.W/2,A.H*.12,{ok:1});SAME.forEach(([t],j)=>sign(t,A.W/2,A.H*(.36+j*.18),{n:13,tint:'#fef08a'}));return}
 const t=TALES[s.r];sign(`${t[0]} ${t[1]}: the line comes again`,A.W/2,A.H*.08,{n:13});sign('Which words are the same as before?',A.W/2,A.H*.27,{n:13});
 pickR().forEach((r,j)=>{const o=choices()[j];slab(r,'',o[0],{no:s.bad===o[1],n:14})})}
function keep(tag){const s=R.d;if(s.r>=3)return;
 if(tag!=='ok'){s.bad=tag;A.sound.miss();return speak(tag==='swap'?'Those are different words. The line uses the same words every time.':'Some words are missing. Say the whole line, the same as before.')}
 s.r++;s.bad=null;A.sound.pop();speak(`Yes: ${SAME[s.r-1][0]} The same every time.`+(s.r>=3?' All 3 kept the same.':''))}
/* 5. Teddy's own line */
function drawOwn(){const s=R.e;if(s.line<0){page();sign('Pick a line for Teddy\'s story',A.W/2,A.H*.08,{n:13});pickR().forEach((r,j)=>slab(r,'',LINES[j][0]+' '+LINES[j][1],{n:15,tint:'#fef08a'}));return}
 drawBook(s,OWN,LINES[s.line][1],'Teddy')}
function choose(j){R.e.line=j;A.sound.pop();speak(`Teddy's line: ${LINES[j][1]} Now read along and join in.`)}
function draw(){const k=now();if(k==='quiz'){page();sign('Challenge',A.W/2,A.H*.16,{ok:1});sign('🗣️ Same words · at the pause',A.W/2,A.H*.5,{n:14});return}
 if(k==='read')drawBook(R.a,PAGES,GBL,'Gingerbread Man');else ({order:drawOrder,tales:drawTales,same:drawSame,own:drawOwn})[k]();A.fx.draw(A.ctx)}
const GBL='Run, run, as fast as you can!';
function down(p){const k=now();
 if(k==='read'||(k==='own'&&R.e.line>=0)){const r=twoBtn().find(r=>hits(p,r));if(r)k==='read'?turn(R.a,PAGES,GBL,!r.i):turn(R.e,OWN,LINES[R.e.line][1],!r.i);return false}
 if(k==='own'){const r=pickR().find(r=>hits(p,r));if(r)choose(r.i);return false}
 if(k==='order'){const r=deckR().find(r=>hits(p,r)&&!R.b.got.includes(SHOW[r.i]));if(r){R.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
 if(k==='tales'){const r=lineR().find(r=>hits(p,r)&&!R.c.got.includes(r.i));if(r){R.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}
  const t=taleR().find(r=>hits(p,r));if(t&&R.c.pick!=null)pin(R.c.pick,t.i);return false}
 if(k==='same'&&R.d.r<3){const r=pickR().find(r=>hits(p,r));if(r)keep(choices()[r.i][1]);return false}return false}
function move(p){const d=R.drag;if(!d)return;d.x=p.x;d.y=p.y;if(now()==='tales'){const t=taleR().find(r=>hits(p,r));R.c.hot=t?t.i:-1}A.redraw()}
function lift(p){const d=R.drag;if(!d)return;R.drag=null;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10,k=now();
 if(k==='order'){if(tap||slotsR().some(r=>hits(p,r)))lay(d.i);else A.redraw();return}
 if(k==='tales'){R.c.hot=-1;const t=taleR().find(r=>hits(p,r));if(t)return pin(d.i,t.i);if(tap){R.c.pick=d.i;return speak('Line picked. Now tap its story.')}A.redraw()}}
function reset(){tick++;for(const k in R)delete R[k];Object.assign(R,{a:{p:0,said:0,bad:0,joins:0,last:-1},b:{got:[],bad:-1},c:{got:[],bad:-1,hot:-1,pick:null},d:{r:0,bad:null},e:{line:-1,p:0,said:0,bad:0,joins:0,last:-1},drag:null,hook:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();R.hook()}
const finish=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function enter(i,desc,ok,msg){reset();speak(desc);R.hook=finish(i,ok,msg)}
function demo(i,acts,ms){steps[i].go();const t0=tick;acts.forEach((f,j)=>setTimeout(()=>{if(t0===tick)f()},ms*(j+1)))}
const readAll=(s,pages,line)=>pages.flatMap(pg=>pg[2]?[()=>turn(s(),pages,line(),1),()=>turn(s(),pages,line(),1)]:[()=>turn(s(),pages,line(),0)]);
function controls(){if(!row)return;row.innerHTML='';const k=now(),Bt=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},row,t).onclick=f};
 if(k==='read'&&R.a.p<PAGES.length){Bt('🗣️ Join in',()=>turn(R.a,PAGES,GBL,1));Bt('👂 Listen',()=>turn(R.a,PAGES,GBL,0))}
 if(k==='own'){if(R.e.line<0)LINES.forEach((l,j)=>Bt(l[0]+' '+l[1],()=>choose(j)));else if(R.e.p<OWN.length){Bt('🗣️ Join in',()=>turn(R.e,OWN,LINES[R.e.line][1],1));Bt('👂 Listen',()=>turn(R.e,OWN,LINES[R.e.line][1],0))}}
 if(k==='order'&&R.b.got.length<3)SHOW.forEach((x,j)=>{if(!R.b.got.includes(x))Bt(ORDER[x][0]+' '+ORDER[x][1],()=>lay(j),`Put next: ${ORDER[x][1]}`)});
 if(k==='tales')TALES.forEach((t,i)=>{if(!R.c.got.includes(i))TALES.forEach((u,k2)=>Bt(`${t[2]} → ${u[0]}`,()=>pin(i,k2),`${t[2]}: from ${u[1]}`))});
 if(k==='same'&&R.d.r<3)choices().forEach(o=>Bt(o[0],()=>keep(o[1])))}
const steps=[
{h:'Join in at the pause',p:'A grown-up reads the Gingerbread Man. When the reader stops and waits, tap Join in. Otherwise tap Listen.',
 task:'Read to the end and join in at every pause',show:()=>demo(0,readAll(()=>R.a,PAGES,()=>GBL),500),
 go:()=>enter(0,PAGES[0][1],()=>R.a.p>=PAGES.length,'You joined in only at the pauses, and the line was the same both times.')},
{h:'What comes next?',p:'A pig sees the Gingerbread Man. Put the three cards in order: first, next, last. Drag a card or tap it.',
 predict:{q:'The pig says: Stop! What comes next?',opts:['The end','Run, run, as fast as you can!'],ans:1},task:'Put the 3 cards in order',
 show:()=>demo(1,[1,2,0].map(j=>()=>lay(j)),650),
 go:()=>enter(1,'Three cards: a pig, Stop!, and the line.',()=>R.b.got.length>=3,'Meet, Stop, then the line. The pattern tells you when the line is coming.')},
{h:'Whose line?',p:'Each story has its own line. Drag each yellow line to its story, or tap a line and then a story.',
 task:'Match all 4 lines',show:()=>demo(2,[0,1,2,3].map(i=>()=>pin(i,i)),600),
 go:()=>enter(2,'Four stories and four lines to match.',()=>R.c.got.length>=4,'Run, run is the Gingerbread Man. Huff and puff is the Pigs. Trip-trap is the Goats. Not I is the Little Red Hen.')},
{h:'Same words',p:'The line comes back. Tap the words that are the same as before.',
 predict:{q:'Does the line change each time it comes back?',opts:['Yes, new words each time','No, the same words'],ans:1},task:'Keep all 3 lines the same',
 show:()=>demo(3,[0,1,2].map(()=>()=>keep('ok')),650),
 go:()=>enter(3,'The Gingerbread Man runs again. Which words does he shout?',()=>R.d.r>=3,'A refrain uses the same words every time. That is why you can join in.')},
{h:'Teddy\'s line',p:'Pick a line for Teddy. Then read along and join in each time the reader waits.',
 task:'Pick a line and join in 3 times',show:()=>demo(4,[()=>choose(0)].concat(readAll(()=>R.e,OWN,()=>LINES[0][1])),450),
 go:()=>enter(4,'Teddy needs a line. Pick one.',()=>R.e.line>=0&&R.e.p>=OWN.length&&R.e.joins>=3,'You made a refrain: the same words, at each pause. You can use it in your own play.')},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>R.hook()});
function hint(t){let m='Listen for the pause, then say the same words.';
 if(t==='quiet')m='When the reader stops and waits, it is your turn. Say the line!';
 if(t==='swap')m='A refrain keeps the same words every time.';
 if(t==='drop')m='Say the whole line, all the words.';
 if(t==='tale')m='Each story has its own line. Think which story it comes from.';
 if(t==='when')m='The line comes at the pause, after someone says Stop. Not at every page.';
 return m}
function quiz(){qn++;const Q=QS[qn%QS.length],all=[[Q.a,'ok'],...Q.o],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 quizBox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quizBox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>score(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function score(t,a){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}`:'✗ '+hint(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':hint(t))}
FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:S=>{quizBox.hidden=S.step!==5;row.hidden=S.step===5;controls()},
 init:S=>{A=S;const w=c.el('div',{class:'fl-below'},A.below);row=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Refrain buttons'},w);quizBox=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up:lift});controls()}}).start()})})();
