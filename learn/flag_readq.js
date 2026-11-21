/* Flagship – what is this question asking me? (ages 7–9; EEF 2021 Metacognition and self-regulated learning: plan,
   monitor, evaluate; NC Mathematics Y2–Y3 one-step word problems). Scenes: tap the words that say what to find;
   sort four asks about the same 9 and 4 shells into Add or Take away; pick the card that says the ask in other
   words; pick the answer that fits the ask (a name, yes or no, or a number); change the ask and watch the answer
   change. Question data in learn/readq_art.js. */
(()=>{const {MARK,STORY,SORT,BINS,SAY,FIT,ASKS,DESC,DONE,QS}=RDQ;
VIS.reg('flagreadq',c=>{let A,bar,quiz,qk=-1,run=0;const S={};
const INK='#111827',GOOD='#047857',WRONG='#b91c1c',LINE='#6b7280',ASK='#1d4ed8',NUM='#b45309',UI='px system-ui,sans-serif';
const part=()=>['mark','sort','say','fit','change','chal'][A.step];
const pz=n=>Math.round(A.narrow?n:n*1.12);
const within=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
const isNum=t=>/^\d/.test(t);
/* paper-coloured desk so the white question slips read clearly in light and dark themes */
function desk(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#ecfeff',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H)}
function put(t,x,y,n,o){o=o||{};const g=A.ctx;let k=pz(n);g.font=`${o.b||700} ${k}${UI}`;while(o.max&&k>9&&g.measureText(t).width>o.max){k--;g.font=`${o.b||700} ${k}${UI}`}
 g.fillStyle=o.c||INK;g.textAlign=o.a||'center';g.textBaseline='middle';g.fillText(t,x,y)}
/* a slip of paper; ok green, no red, ask blue, sel violet */
function slip(r,f){f=f||{};const g=A.ctx;g.fillStyle=f.no?'#fee2e2':f.ok?'#dcfce7':f.ask?'#dbeafe':f.num?'#fef3c7':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,Math.min(12,r.h/3));g.fill();
 g.lineWidth=f.no||f.ok||f.ask||f.sel?3.5:1.5;g.strokeStyle=f.no?WRONG:f.ok?GOOD:f.ask?ASK:f.sel?'#6d28d9':LINE;g.stroke()}
/* break a sentence into lines no wider than w at size n */
function lines(t,w,n,b){const g=A.ctx;g.font=`${b||700} ${pz(n)}${UI}`;const out=[];let cur='';t.split(' ').forEach(x=>{const tryL=cur?cur+' '+x:x;if(cur&&g.measureText(tryL).width>w){out.push(cur);cur=x}else cur=tryL});if(cur)out.push(cur);return out}
function para(t,r,n,b){const L=lines(t,r.w-16,n,b),lh=pz(n)*1.25,y0=r.y+r.h/2-(L.length-1)*lh/2;L.forEach((s,i)=>put(s,r.x+r.w/2,y0+i*lh,n,{b}))}
function top(t,good){const g=A.ctx;let k=pz(14);g.font=`800 ${k}${UI}`;let w=g.measureText(t).width+24;while(w>A.W-10&&k>10){k--;g.font=`800 ${k}${UI}`;w=g.measureText(t).width+24}
 const r={x:(A.W-w)/2,y:A.H*.02,w,h:k+16};slip(r,{ok:good});put(t,A.W/2,r.y+r.h/2+1,k/(A.narrow?1:1.12),{b:800})}
/* ---------- 1. mark the ask ---------- */
const toks=()=>MARK[S.k.i].w.split(' ');
function chips(){const g=A.ctx,n=A.narrow?15:17;g.font=`700 ${pz(n)}${UI}`;const h=Math.max(44,A.H*.1),gap=7,out=[];let x=10,y=A.H*.2;
 toks().forEach(t=>{const w=Math.max(40,g.measureText(t).width+18);if(x+w>A.W-10){x=10;y+=h+gap}out.push({x,y,w,h,t});x+=w+gap});
 const rowsW={};out.forEach(r=>{rowsW[r.y]=Math.max(rowsW[r.y]||0,r.x+r.w)});out.forEach(r=>{r.x+=(A.W-10-rowsW[r.y])/2});return out}
function drawMark(){const s=S.k;desk();if(s.i>=MARK.length){top('All 3 asks marked',1);MARK.forEach((m,j)=>put('✓ '+m.say,A.W/2,A.H*(.3+j*.14),13,{c:A.col.tx,max:A.W-20}));return}
 const Q=MARK[s.i];top(`Question ${s.i+1} of 3: tap what it asks`);
 chips().forEach((r,j)=>{slip(r,{ask:s.lit&&Q.ask.includes(j),num:isNum(r.t)&&!s.lit,no:s.bad===j});put(r.t,r.x+r.w/2,r.y+r.h/2,A.narrow?15:17,{b:Q.ask.includes(j)&&s.lit?800:600})});
 put('Numbers are facts. The ask says what to find.',A.W/2,A.H*.9,12,{c:A.col.tx,max:A.W-16,b:600})}
function tapWord(j){const s=S.k;if(s.i>=MARK.length||s.lit)return;const Q=MARK[s.i],t=toks()[j];
 if(Q.ask.includes(j)){s.lit=1;s.bad=-1;A.sound.pop();speak(`Yes. It asks ${Q.say}.`);const e0=run;return setTimeout(()=>{if(e0!==run)return;s.i++;s.lit=0;speak(s.i>=MARK.length?'All 3 asks marked.':`Question ${s.i+1}: `+MARK[s.i].w)},A.reduced()?60:900)}
 s.bad=j;A.sound.miss();if(isNum(t))return speak(`${t.replace(/\W+$/,'')} is a fact you will use, not what to find. Look for the words that ask.`);
 speak(`“${t.replace(/[.?]$/,'')}” is not the ask. Read the question again and find the words that say what to find.`)}
/* ---------- 2. same numbers, different asks ---------- */
const cards=()=>{const gap=8,w=(A.W-gap*3)/2,h=A.H*(A.narrow?.2:.2);return SORT.map((_,i)=>({i,x:gap+(i%2)*(w+gap),y:A.H*.2+Math.floor(i/2)*(h+gap),w,h}))};
const bins=()=>{const gap=8,w=(A.W-gap*3)/2,h=A.H*.17;return BINS.map((_,i)=>({i,x:gap+i*(w+gap),y:A.H*.8,w,h}))};
function drawSort(){const s=S.s;desk();top(Object.keys(s.at).length>=SORT.length?'Same numbers, different methods':STORY,Object.keys(s.at).length>=SORT.length);
 bins().forEach(r=>{slip(r,{sel:s.hot===r.i,ok:Object.values(s.at).includes(r.i)});put(BINS[r.i],r.x+r.w/2,r.y+r.h/2,16,{b:800})});
 cards().forEach(r=>{if(s.drag&&s.drag.i===r.i)return;const P=s.at[r.i];slip(r,{ok:P!=null,no:s.bad===r.i,sel:s.pick===r.i});if(P==null)return para(SORT[r.i].q,r,12);para(SORT[r.i].q,{...r,h:r.h*.7},12);put(SORT[r.i].a,r.x+r.w/2,r.y+r.h*.83,13,{b:800,c:GOOD})});
 if(s.drag){const r=cards()[s.drag.i],m={...r,x:s.drag.x-r.w/2,y:s.drag.y-r.h/2};slip(m,{sel:1});para(SORT[s.drag.i].q,m,12)}}
function drop(i,b){const s=S.s;s.drag=null;s.pick=null;s.hot=-1;if(s.at[i]!=null)return A.redraw();const C=SORT[i];
 if(C.m!==b){s.bad=i;A.sound.miss();return speak(C.w)}s.at[i]=b;s.bad=-1;A.sound.pop();speak(`${C.a}. `+(Object.keys(s.at).length>=SORT.length?'All four sorted.':''))}
/* ---------- 3 and 4. choose a card ---------- */
const opts=()=>{const h=A.H*(A.narrow?.15:.14),gap=8;return[0,1,2].map(i=>({i,x:A.W*.06,y:A.H*.43+i*(h+gap),w:A.W*.88,h}))};
const qBox=()=>({x:A.W*.04,y:A.H*.14,w:A.W*.92,h:A.H*.22});
function drawPick(set,st,label){desk();if(st.i>=set.length){top(label+': 3 of 3',1);put('✓ ✓ ✓',A.W/2,A.H*.45,30,{c:GOOD,b:800});return}
 const Q=set[st.i];top(`${label}: ${st.i+1} of 3`);slip(qBox(),{});para(Q.q,qBox(),14,700);
 opts().forEach(r=>{slip(r,{no:st.bad===r.i,ok:st.win===r.i});para(Q.o[r.i],r,14,600)})}
function choose(set,st,j){if(st.i>=set.length||st.win!=null)return;const Q=set[st.i];
 if(j!==Q.good){st.bad=j;A.sound.miss();return speak(Q.slip[j])}st.win=j;st.bad=-1;A.sound.pop();speak(`Yes: ${Q.o[j]}.`);const e0=run;
 setTimeout(()=>{if(e0!==run)return;st.i++;st.win=null;speak(st.i>=set.length?'All 3 done.':set[st.i].q)},A.reduced()?60:800)}
/* ---------- 5. change the ask ---------- */
const askPads=()=>{const gap=8,w=(A.W-gap*3)/2,h=A.H*.12;return ASKS.map((_,i)=>({i,x:gap+(i%2)*(w+gap),y:A.H*.7+Math.floor(i/2)*(h+gap),w,h}))};
function drawChange(){const s=S.c;desk();top(STORY);const A1=s.i==null?null:ASKS[s.i];
 const r={x:A.W*.05,y:A.H*.14,w:A.W*.9,h:A.H*.16};slip(r,{ask:A1});para(A1?A1.q:'Tap a question below',r,14);
 if(A1){put(A1.how,A.W/2,A.H*.4,14,{c:A.col.tx,max:A.W-20});put('Answer: '+A1.a,A.W/2,A.H*.52,20,{c:A.col.tx,b:800,max:A.W-20})}
 askPads().forEach(p=>{slip(p,{sel:s.i===p.i});para(ASKS[p.i].b,p,13)})}
function setAsk(i){S.c.i=i;A.sound.tick();speak(`${ASKS[i].q} ${ASKS[i].how}. Answer: ${ASKS[i].a}.`)}
/* ---------- input ---------- */
function draw(){const k=part();if(k==='chal'){desk();top('Challenge',1);put('Read twice · mark the ask · check the answer fits',A.W/2,A.H*.5,14,{c:A.col.tx,max:A.W-16});return}
 if(k==='mark')drawMark();if(k==='sort')drawSort();if(k==='say')drawPick(SAY,S.y,'In my words');if(k==='fit')drawPick(FIT,S.f,'Answer fits');if(k==='change')drawChange();A.fx.draw(A.ctx)}
function down(p){const k=part();
 if(k==='mark'&&S.k.i<MARK.length){const j=chips().findIndex(r=>within(p,r));if(j>=0)tapWord(j);return false}
 if(k==='sort'){const r=cards().find(r=>within(p,r)&&S.s.at[r.i]==null);if(r){S.s.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};return true}
  const b=bins().find(b=>within(p,b));if(b&&S.s.pick!=null)drop(S.s.pick,b.i);return false}
 if(k==='say'||k==='fit'){const r=opts().find(r=>within(p,r));if(r)k==='say'?choose(SAY,S.y,r.i):choose(FIT,S.f,r.i);return false}
 if(k==='change'){const r=askPads().find(r=>within(p,r));if(r)setAsk(r.i);return false}return false}
function move(p){if(part()==='sort'&&S.s.drag){S.s.drag.x=p.x;S.s.drag.y=p.y;const b=bins().find(b=>within(p,b));S.s.hot=b?b.i:-1;A.redraw()}}
function up(p){if(part()!=='sort'||!S.s.drag)return;const d=S.s.drag,b=bins().find(b=>within(p,b));if(b)return drop(d.i,b.i);S.s.drag=null;S.s.hot=-1;
 if(Math.hypot(p.x-d.x0,p.y-d.y0)<10){S.s.pick=d.i;return speak('Card picked. Now tap Add or Take away.')}A.redraw()}
function reset(){run++;for(const k in S)delete S[k];Object.assign(S,{k:{i:0,lit:0,bad:-1},s:{at:{},bad:-1,drag:null,pick:null,hot:-1},y:{i:0,bad:-1,win:null},f:{i:0,bad:-1,win:null},c:{i:null},check:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();S.check()}
const finished=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function enter(i,ok){reset();speak(DESC[i]+(i===0?' '+MARK[0].w:''));if(ok)S.check=finished(i,ok)}
function play(i,acts,ms){steps[i].go();const e0=run;acts.forEach((f,j)=>setTimeout(()=>{if(e0===run)f()},ms*(j+1)))}
/* every canvas action has a labelled button */
function buttons(){if(!bar)return;bar.innerHTML='';const k=part(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=f};
 if(k==='mark'&&S.k.i<MARK.length&&!S.k.lit)toks().forEach((t,j)=>add(t,()=>tapWord(j),`Mark the word ${t}`));
 if(k==='sort'){if(S.s.pick==null)SORT.forEach((C,i)=>{if(S.s.at[i]==null)add(C.q,()=>{S.s.pick=i;speak('Card picked: '+C.q+' Now choose Add or Take away.')},'Pick: '+C.q)});
  else BINS.forEach((B,b)=>add(B,()=>drop(S.s.pick,b),`Put it in ${B.slice(2)}`))}
 if(k==='say'&&S.y.i<SAY.length)SAY[S.y.i].o.forEach((o,j)=>add(o,()=>choose(SAY,S.y,j)));
 if(k==='fit'&&S.f.i<FIT.length)FIT[S.f.i].o.forEach((o,j)=>add(o,()=>choose(FIT,S.f,j)));
 if(k==='change')ASKS.forEach((Q,i)=>add(Q.b,()=>setAsk(i),'Ask: '+Q.q))}
const steps=[
{h:'Find the ask',p:'Read the question twice. Then tap the words that say what you have to find. The numbers are facts you will use.',
 predict:{q:'A question has the numbers 8 and 5. What should you do first?',opts:['Add 8 and 5','Find what it asks'],ans:1},task:'Mark the ask in 3 questions',
 show:()=>play(0,MARK.map(m=>()=>tapWord(m.ask[0])),1000),go:()=>enter(0,()=>S.k.i>=MARK.length)},
{h:'Same numbers, new ask',p:'Every question uses 9 and 4. Drag each one to Add or Take away, or tap it and then tap a box.',
 predict:{q:'All four questions use 9 and 4. Do they all have the same answer?',opts:['Yes, 9 and 4 make 13','No, it depends on the ask'],ans:1},task:'Sort all 4 questions',
 show:()=>play(1,SORT.map((C,i)=>()=>drop(i,C.m)),450),go:()=>enter(1,()=>Object.keys(S.s.at).length>=SORT.length)},
{h:'Say it my way',p:'Saying the ask in your own words shows you know what to find. Tap the card that means the same as the question.',task:'Match 3 questions',
 show:()=>play(2,SAY.map(Q=>()=>choose(SAY,S.y,Q.good)),950),go:()=>enter(2,()=>S.y.i>=SAY.length)},
{h:'Does my answer fit?',p:'An answer must be the kind of thing the question asks for. Tap the answer that fits.',
 predict:{q:'Tom read 4 books and Ana read 9. Who read more? What kind of answer is that?',opts:['A number','A name'],ans:1},task:'Pick 3 answers that fit',
 show:()=>play(3,FIT.map(Q=>()=>choose(FIT,S.f,Q.good)),950),go:()=>enter(3,()=>S.f.i>=FIT.length)},
{h:'Change the ask',p:'The story stays the same. Tap a question and watch the method and the answer change.',go:()=>enter(4)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
/* wrong answers name the slip */
function slipOf(t){let m='Read the question again and find the words that say what to find.';
 if(t==='add')m='Adding every number you see is a guess. Read what it asks first, then choose the method.';
 if(t==='fact')m='That number is a fact from the story. The question asks you to find something new.';
 if(t==='type')m='Who wants a name, not a number. Check the kind of answer the question asks for.';
 if(t==='check')m='Check the numbers: is the money at least the price? Then say yes or no.';
 if(t==='other')m='That answers a different question. Mark the ask and answer just that.';
 return m}
function ask(){qk++;const Q=QS[qk%QS.length],L=[[Q.a,'ok'],...Q.o],r=qk%3,list=L.slice(r).concat(L.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quiz.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+slipOf(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':slipOf(t))}
FK.shell(c,{steps,ratio:.62,tall:1.25,draw,onStep:X=>{quiz.hidden=X.step!==5;bar.hidden=X.step===5;buttons()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Question lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
