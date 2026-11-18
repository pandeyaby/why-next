/* Flagship: shape and number patterns from a rule (ages 9–10; CCSS 4.OA.C.5 "generate a number or shape pattern that
   follows a given rule; identify apparent features of the pattern that were not explicit in the rule itself", NC Y4–5
   sequences). Build "add 3 from 1", label each term odd or even, test which step sizes switch odd and even with dot pairs,
   find the last digits "add 4 from 2" can never reach, and grow a matchstick row to see why 10 squares need 31, not 40.
   Every canvas tap has a button twin below the canvas. */
(()=>{
const PAL={ink:'#0f172a',dim:'#475569',rim:'#94a3b8',paper:'#ffffff',yes:'#047857',no:'#b91c1c',navy:'#1e3a8a',odd:'#fde68a',even:'#bfdbfe',hint:'#eef2ff',won:'#dcfce7',stick:'#b45309'};
const isOdd=n=>n%2===1,RULES=[2,3,4,5],ADD4=[2,6,10,14,18,22,26,30,34,38],ODDS=[1,3,5,7,9],TEN=[31,40,30,34];
VIS.reg('flagpatfeat',c=>{let A,G,pad,chal,qn=-1,streak=0;const M={then:()=>{}};
const sz=n=>Math.round(n*(A.narrow?1:1.12)),fnt=n=>`700 ${sz(n)}px system-ui,sans-serif`;
const within=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function say(s,x,y,n,col,al){G.font=fnt(n);G.fillStyle=col||PAL.ink;G.textAlign=al||'center';G.textBaseline='middle';G.fillText(String(s),x,y,A.W-16)}
function split(s,max,n){G.font=fnt(n);const rows=[];let line='';for(const w of String(s).split(' ')){const t=line?line+' '+w:w;if(line&&G.measureText(t).width>max){rows.push(line);line=w}else line=t}rows.push(line);return rows}
function tile(r,fill,rim,lw){G.fillStyle=fill;A.paint.rrect(r.x,r.y,r.w,r.h,8);G.fill();if(rim){G.strokeStyle=rim;G.lineWidth=lw||2;G.stroke()}}
function inTile(r,s,n,col){const L=split(s,r.w-10,n),lh=sz(n)+4;L.forEach((l,i)=>say(l,r.x+r.w/2,r.y+r.h/2+(i-(L.length-1)/2)*lh,n,col))}
function header(s,good){const L=split(s,A.W-32,13),r={x:10,y:8,w:A.W-20,h:Math.max(A.H*.1,L.length*(sz(13)+4)+12)};tile(r,good?PAL.won:PAL.hint,good?PAL.yes:PAL.navy);inTile(r,s,13,good?PAL.yes:PAL.ink)}
function footer(){if(!M.msg)return;const L=split((M.bad?'✗ ':'✓ ')+M.msg,A.W-40,13),lh=sz(13)+5,h=L.length*lh+10,y=A.H-h-6;tile({x:10,y,w:A.W-20,h},PAL.paper,M.bad?PAL.no:PAL.yes,3);L.forEach((l,i)=>say(l,A.W/2,y+5+lh*(i+.5),13))}
const live=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const oops=s=>{M.bad=true;M.msg=s;A.sound.miss();update()};
const yay=s=>{M.bad=false;M.msg=s;A.sound.pop()};
/* term boxes: 8 or 10 in one row (wide) or two rows (narrow) */
function slot(i,n,top){const cols=A.narrow?Math.ceil(n/2):n,row=Math.floor(i/cols),col=i%cols,gap=6,w=(A.W-24-(cols-1)*gap)/cols,h=sz(42);return{x:12+col*(w+gap),y:top+row*(h+gap),w,h}}
function terms(list,top,shade,n,sub){for(let i=0;i<(n||list.length);i++){const r=slot(i,n||list.length,top),v=list[i],tag=sub&&sub(v,i);tile(r,v==null?'#f1f5f9':shade?shade(v,i):PAL.paper,PAL.navy,2);if(v!=null)say(v,r.x+r.w/2,r.y+r.h*(tag?.36:.5),15);if(tag)say(tag,r.x+r.w/2,r.y+r.h*.78,10,PAL.ink)}}
function chipBox(i,n,y){const w=Math.min(sz(64),(A.W-28-(n-1)*8)/n),all=n*w+(n-1)*8;return{x:(A.W-all)/2+i*(w+8),y,w,h:sz(42)}}
function chipRow(vals,y,look,fmt){vals.forEach((v,i)=>{const r=chipBox(i,vals.length,y),s=look(v);tile(r,s==='ok'?PAL.won:s==='bad'?'#fee2e2':PAL.paper,s==='ok'?PAL.yes:s==='bad'?PAL.no:PAL.navy,2);say(fmt?fmt(v):v,r.x+r.w/2,r.y+r.h/2,15)})}
const chipHit=(p,vals,y)=>vals.findIndex((v,i)=>within(p,chipBox(i,vals.length,y)));
const R=k=>A.H*(A.narrow?[.24,.44,.6,.76][k]:[.24,.44,.6,.75][k]);
const sec=()=>['rule','parity','why','digits','grow','chal'][A.step];
/* step 1: follow "add 3" */
function offers(){const t=M.seq[M.seq.length-1],o=[t+3,t*3,t+1],r=M.seq.length%3;return o.slice(r).concat(o.slice(0,r))}
function drawRule(){const full=M.seq.length===8;header(full?'1, 4, 7, 10, 13, 16, 19, 22: every jump is +3. 100 − 1 = 99 = 33 jumps, so 100 is in it too.':'Rule: start at 1, add 3. Tap the next term.',full);
 terms(M.seq.concat(Array(8-M.seq.length).fill(null)),R(0),null,8);if(!full){say('Next term:',A.W/2,R(2)-sz(16),12,PAL.dim);chipRow(offers(),R(2),()=>'')}}
function nextTerm(v){if(M.seq.length>=8)return;const t=M.seq[M.seq.length-1];A.sound.tick();
 if(v===t*3&&v!==t+3)return oops(`${v} is ${t} × 3. The rule says ADD 3: ${t} + 3 = ${t+3}.`);
 if(v!==t+3)return oops(`${v} is only ${t} + 1. Each jump must be the rule's +3.`);
 M.seq.push(v);if(M.seq.length===8)yay('8 terms, all made by the same rule.');else{M.bad=false;M.msg=`${t} + 3 = ${v}.`}update()}
/* step 2: odd or even */
const SEQ=[1,4,7,10,13,16,19,22];
function drawParity(){const done=M.lab.length===8;header(done?'Odd, even, odd, even… The rule only said "add 3", yet the terms switch every time.':`Is ${SEQ[M.lab.length]} odd or even? Tap a button on the canvas.`,done);
 terms(SEQ,R(0),(v,i)=>M.lab[i]==null?(i===M.lab.length?'#fef9c3':PAL.paper):isOdd(v)?PAL.odd:PAL.even,8,(v,i)=>M.lab[i]==null?'':isOdd(v)?'odd':'even');
 if(!done)['odd','even'].forEach((w,i)=>{const r=pbtn(i);tile(r,i?PAL.even:PAL.odd,PAL.navy,2);say(w==='odd'?'Odd':'Even',r.x+r.w/2,r.y+r.h/2,16)})}
const pbtn=i=>{const w=(A.W-44)/2;return{x:14+i*(w+16),y:R(2),w,h:sz(48)}};
function label(odd){const i=M.lab.length;if(i>=8)return;const v=SEQ[i];A.sound.tick();
 if(odd!==isOdd(v))return oops(`${v} ends in ${v%10}, ${isOdd(v)?'an odd digit, so it is odd: it cannot be split into pairs.':'an even digit, so it is even: it splits into pairs.'}`);
 M.lab.push(odd);if(M.lab.length===8)yay('The pattern switches: odd, even, odd, even.');else{M.bad=false;M.msg=`${v} is ${odd?'odd':'even'}.`}update()}
/* step 3: why: dot pairs */
function dots(n,x,y,cell){for(let k=0;k<n;k++){const col=Math.floor(k/2),row=k%2;G.fillStyle=(k===n-1&&isOdd(n))?'#b91c1c':PAL.navy;G.beginPath();G.arc(x+col*cell,y+row*cell,cell*.32,0,7);G.fill()}}
function drawWhy(){const all=RULES.every(s=>M.tested.includes(s));header(all?'Odd steps (+3, +5) switch odd and even. Even steps (+2, +4) keep it. 3 is odd, so "add 3" switches for ever.':'Test each rule from 1. Which rules switch odd and even?',all);
 const s=M.rule;if(s){const seq=[1,1+s,1+2*s],cell=Math.min(sz(13),(A.W-40)/22);seq.forEach((n,j)=>{const y=R(0)+j*sz(40);say(n,26,y+cell/2,15,PAL.ink);dots(n,54,y,cell);say(isOdd(n)?'odd':'even',A.W-30,y+cell/2,12,isOdd(n)?PAL.stick:PAL.navy,'right')})}
 say('Rule: start at 1 and add…',A.W/2,R(2)+sz(6),12,PAL.dim);chipRow(RULES,R(2)+sz(20),v=>M.tested.includes(v)?'ok':'',v=>'+'+v)}
function testRule(s){A.sound.tick();M.rule=s;if(!M.tested.includes(s))M.tested.push(s);
 M.bad=false;M.msg=isOdd(s)?`+${s} is ${(s-1)/2} pair${s>3?'s':''} and one extra dot. The extra dot joins the odd one out, so odd becomes even, then even becomes odd.`:`+${s} is ${s/2} whole pair${s>2?'s':''}. The red odd-one-out dot is never paired, so every term stays odd.`;update()}
/* step 4: last digits of add 4 */
function drawDigits(){const all=ODDS.every(d=>M.never.includes(d));header(all?'Last digits go 2, 6, 0, 4, 8 and repeat. 1, 3, 5, 7 and 9 never come: even + even is always even.':'Rule: start at 2, add 4. Tap every last digit that can NEVER appear.',all);
 terms(ADD4,R(0),v=>PAL.paper);const D=[0,1,2,3,4,5,6,7,8,9];[D.slice(0,5),D.slice(5)].forEach((row,j)=>chipRow(row,R(2)+j*sz(50)-sz(12),v=>M.never.includes(v)?'ok':M.last===v?'bad':''))}
function digitAt(p){const D=[0,1,2,3,4,5,6,7,8,9];for(let j=0;j<2;j++){const row=D.slice(j*5,j*5+5),i=chipHit(p,row,R(2)+j*sz(50)-sz(12));if(i>=0)return row[i]}return -1}
function pickDigit(d){A.sound.tick();M.last=d;const seen=ADD4.filter(v=>v%10===d);
 if(seen.length)return oops(`${d} does appear: ${seen.slice(0,2).join(' and ')} end${seen.length>1?'':'s'} in ${d}.`);
 if(!M.never.includes(d))M.never.push(d);if(ODDS.every(x=>M.never.includes(x)))yay('Every term is even, so no odd last digit can ever appear.');else{M.bad=false;M.msg=`${d} never appears.`}update()}
/* step 5: matchstick squares */
function sticks(n){return n?3*n+1:0}
function drawGrow(){const ok=M.ans===31;header(ok?'4, 7, 10, 13… Each new square shares one side, so it adds 3 sticks: 4 + 9 × 3 = 31.':'Tap + square to grow the row. Count the sticks, then answer below.',ok);
 const n=M.sq,u=Math.min(sz(40),(A.W-60)/Math.max(5,n)),x0=(A.W-n*u)/2,y0=R(0);G.strokeStyle=PAL.stick;G.lineWidth=5;G.lineCap='round';
 for(let i=0;i<n;i++){const x=x0+i*u;[[x,y0,x+u,y0],[x,y0+u,x+u,y0+u],[x+u,y0,x+u,y0+u]].concat(i?[]:[[x,y0,x,y0+u]]).forEach(s=>{const hz=s[1]===s[3]?3:0,vt=3-hz;G.beginPath();G.moveTo(s[0]+hz,s[1]+vt);G.lineTo(s[2]-hz,s[3]-vt);G.stroke()})}
 say(`${n} square${n>1?'s':''}: ${sticks(n)} sticks`,A.W/2,y0+u+sz(16),14);const add={x:A.W/2-sz(60),y:y0+u+sz(32),w:sz(120),h:sz(36)};M.addR=add;if(n<5){tile(add,PAL.paper,PAL.navy,2);say('+ square',add.x+add.w/2,add.y+add.h/2,14)}
 say('How many sticks for 10 squares?',A.W/2,R(3)-sz(14),12,PAL.dim);chipRow(TEN,R(3),v=>M.ans===v?(v===31?'ok':'bad'):'')}
function grow(){if(M.sq>=5)return;M.sq++;A.sound.tick();M.bad=false;M.msg=M.sq>1?`+3 sticks: ${sticks(M.sq-1)} → ${sticks(M.sq)}.`:'';update()}
function guess(v){A.sound.tick();if(M.sq<4){M.ans=null;return oops('Build at least 4 squares first and watch how the stick count grows.')}M.ans=v;
 if(v===31){yay('31 sticks: the first square takes 4, and each of the other 9 adds 3.');return update()}
 oops(v===40?'10 × 4 counts each shared side twice. A new square only needs 3 new sticks: 4 + 9 × 3 = 31.':v===30?'10 × 3 misses the extra stick that closes the first square: 3 × 10 + 1 = 31.':'4 + 10 × 3 adds 10 squares after the first one. Only 9 are added: 4 + 9 × 3 = 31.')}
/* pointer */
function down(p){const m=sec();let j;
 if(m==='rule'){const o=offers();j=chipHit(p,o,R(2));if(j>=0&&M.seq.length<8){nextTerm(o[j]);return true}}
 if(m==='parity'){j=[0,1].find(i=>within(p,pbtn(i)));if(j!=null){label(j===0);return true}}
 if(m==='why'){j=chipHit(p,RULES,R(2)+sz(20));if(j>=0){testRule(RULES[j]);return true}}
 if(m==='digits'){j=digitAt(p);if(j>=0){pickDigit(j);return true}}
 if(m==='grow'){if(within(p,M.addR)&&M.sq<5){grow();return true}j=chipHit(p,TEN,R(3));if(j>=0){guess(TEN[j]);return true}}return false}
function draw(){G.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);G.fillRect(0,0,A.W,A.H);if(A.col.dark){G.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);G.fill()}
 const m=sec();if(m==='rule')drawRule();if(m==='parity')drawParity();if(m==='why')drawWhy();if(m==='digits')drawDigits();if(m==='grow')drawGrow();
 if(m==='chal'){header('Follow the rule, then look for features it never mentions: odd and even, last digits, shared sides.');terms(SEQ,R(0),v=>isOdd(v)?PAL.odd:PAL.even)}
 footer();A.fx.draw(G)}
function update(){const m=sec();let s='Challenge.';
 if(m==='rule')s=`Rule: start at 1, add 3. Terms so far: ${M.seq.join(', ')}.`+(M.seq.length<8?` Next term choices: ${offers().join(', ')}.`:'');
 if(m==='parity')s=`Terms 1, 4, 7, 10, 13, 16, 19, 22. Labelled: ${M.lab.map((o,i)=>SEQ[i]+(o?' odd':' even')).join(', ')||'none yet'}.`;
 if(m==='why')s=`Rules tested from 1: ${M.tested.map(r=>'+'+r+(isOdd(r)?' switches':' stays odd')).join(', ')||'none'}.`;
 if(m==='digits')s=`Rule add 4 from 2: ${ADD4.join(', ')}. Digits marked as never: ${M.never.join(', ')||'none'}.`;
 if(m==='grow')s=`${M.sq} square${M.sq>1?"s":""} in a row use ${sticks(M.sq)} sticks.`+(M.ans?` Answer chosen for 10 squares: ${M.ans}.`:'');
 live((M.msg?M.msg+' ':'')+s);controls();M.then()}
function controls(){if(!pad)return;pad.innerHTML='';const m=sec(),btn=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t).onclick=f};
 if(m==='rule'&&M.seq.length<8)offers().forEach(v=>btn('Next term '+v,()=>nextTerm(v)));
 if(m==='parity'&&M.lab.length<8){btn('Odd',()=>label(true));btn('Even',()=>label(false))}
 if(m==='why')RULES.forEach(v=>btn('Add '+v,()=>testRule(v)));
 if(m==='digits')[0,1,2,3,4,5,6,7,8,9].forEach(d=>btn('Ends in '+d,()=>pickDigit(d),'Never ends in '+d));
 if(m==='grow'){if(M.sq<5)btn('+ square',grow);TEN.forEach(v=>btn(v+' sticks',()=>guess(v)))}
 A.redraw()}
const finish=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const seqPlay=(fs,gap)=>{const id=++M.run;fs.forEach((f,j)=>setTimeout(()=>{if(id===M.run)f()},(j+1)*(A.reduced()?30:gap)))};
const reset=()=>{M.run=(M.run||0)+1;Object.assign(M,{then:()=>{},seq:[1],lab:[],tested:[],rule:0,never:[],last:null,sq:1,ans:null,msg:'',bad:false})};
const steps=[
{h:'Follow the rule',p:'A rule tells you how to get from one term to the next. Start at 1 and add 3 each time.',
predict:{q:'Start at 1, add 3. Will 100 be one of the terms?',opts:['Yes','No','You cannot tell'],ans:0},
task:'Make the first 8 terms',show:()=>{steps[0].go();seqPlay([4,7,10,13,16,19,22].map(v=>()=>nextTerm(v)),300)},go:()=>{reset();update();M.then=finish(0,()=>M.seq.length===8,'1, 4, 7 … 22.')}},
{h:'A feature the rule never said',p:'The rule only says "add 3". Look at each term: is it odd or even?',
predict:{q:'If you kept adding 3 for ever, would the terms keep switching odd, even, odd…?',opts:['Yes, for ever','No, it breaks somewhere','Only while the numbers are small'],ans:0},
task:'Label all 8 terms odd or even',show:()=>{steps[1].go();seqPlay(SEQ.map(v=>()=>label(isOdd(v))),260)},go:()=>{reset();update();M.then=finish(1,()=>M.lab.length===8,'Odd, even, odd, even.')}},
{h:'Why it switches',p:'An even number is all pairs. An odd number has one dot left over. Test four rules and watch the odd one out.',
task:'Test all 4 rules',show:()=>{steps[2].go();seqPlay(RULES.map(v=>()=>testRule(v)),420)},go:()=>{reset();update();M.then=finish(2,()=>RULES.every(s=>M.tested.includes(s)),'Odd steps switch.')}},
{h:'Last digits',p:'Start at 2 and add 4. Look only at the last digit of each term.',
predict:{q:'Start at 2, add 4. Will a term ever end in 5?',opts:['No, never','Yes, if you go far enough','Only after 100'],ans:0},
task:'Find all 5 digits that never appear',show:()=>{steps[3].go();seqPlay(ODDS.map(d=>()=>pickDigit(d)),320)},go:()=>{reset();update();M.then=finish(3,()=>ODDS.every(d=>M.never.includes(d)),'2, 6, 0, 4, 8 repeat.')}},
{h:'A growing shape',p:'Matchstick squares in a row. Count the sticks as the row grows, then predict 10 squares.',
task:'Find the sticks for 10 squares',show:()=>{steps[4].go();seqPlay([grow,grow,grow,()=>guess(31)],420)},go:()=>{reset();update();M.then=finish(4,()=>M.ans===31,'4 + 9 × 3 = 31.')}},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>M.then()});
const Q=[['Rule: start at 2, add 5. What is the 4th term?','17',[['22','extraJump'],['20','times']]],
['Rule: start at 1, add 2. Which is true?','Every term is odd',[['The terms switch odd and even','oddStep'],['Every term ends in 1','firstOnly']]],
['Rule: start at 1, add 3. Is 50 a term?','No: 49 is not a multiple of 3',[['Yes: the terms keep going up','passBy'],['Yes: 50 is even and every other term is even','parityOnly']]],
['Matchstick squares in a row: how many sticks for 6 squares?','19',[['24','shared'],['18','noFirst']]],
['Rule: start at 3, add 10. What do all the terms end in?','3',[['0','stepDigit'],['It keeps changing','noCheck']]],
['Why does "add 3" from 1 switch odd, even, odd…?','3 is odd: an odd step flips odd and even',[['3 is a small number','size'],['Because it started at 1','start']]]];
function why(tag){let m='Write out the first few terms with the rule, then check the feature on every term, not just one.';
 if(tag==='extraJump')m='The 4th term needs only 3 jumps from the first term: 2, 7, 12, 17. 22 is a 4th jump.';
 if(tag==='times')m='4 × 5 ignores the start. Begin at 2 and add 5 three times: 2, 7, 12, 17.';
 if(tag==='oddStep')m='Only an odd step switches. Adding 2 adds one whole pair, so odd stays odd: 1, 3, 5, 7.';
 if(tag==='firstOnly')m='Check more terms: 1, 3, 5, 7 end in different digits. They are all odd, though.';
 if(tag==='passBy')m='Going up does not mean landing on 50. Terms are 1 more than a multiple of 3; 49 is not a multiple of 3, so 50 is skipped (49, then 52).';
 if(tag==='parityOnly')m='Being even is not enough. The even terms are 4, 10, 16 … 46, 52: 50 is jumped over.';
 if(tag==='shared')m='6 × 4 counts each shared side twice. The first square takes 4 and the other 5 add 3 each: 4 + 15 = 19.';
 if(tag==='noFirst')m='6 × 3 misses the stick that closes the first square: 3 × 6 + 1 = 19.';
 if(tag==='stepDigit')m='Adding 10 never changes the last digit. 3, 13, 23, 33 all end in 3, the start\'s last digit.';
 if(tag==='noCheck')m='Look at the terms: 3, 13, 23, 33. Adding 10 only changes the tens, so they all end in 3.';
 if(tag==='size')m='Size does not matter: "add 2" is small too but never switches. It is because 3 is odd.';
 if(tag==='start')m='Start at 2 and add 3: 2, 5, 8, 11 still switches. The odd step makes the switch.';
 return m}
function quiz(){qn++;const [qq,ans,bad]=Q[qn%Q.length],all=[[ans,'ok']].concat(bad),r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${qq}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>grade(tag,ans)});live('Challenge: '+qq);A.redraw()}
function grade(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const ok=tag==='ok',fb=chal.querySelector('.fl-fb');
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+why(tag)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;controls()},
 init:B=>{A=B;G=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Pattern rule lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}}).start()})})();
