/* Flagship: Linear number sequences (ages 10–11; NC Year 6 Algebra: generate and describe
   linear number sequences). A linear sequence has a constant term-to-term rule (common
   difference). The step may add, take away, or use a decimal. Reveal every gap, continue
   the list, and find a later term by counting (n − 1) jumps from the first term. Distinct
   from flagarith (explicit a(n) = dn + c, graph of (n, a(n)), intercept): no graph and no a(n). */
(()=>{
VIS.reg('flaglinseq',c=>{
let A,pad,qa,turn=-1;const S={};
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const fmt=n=>Number.isInteger(n)?String(n):String(Math.round(n*10)/10);
const sg=d=>d===0?'+ 0':d>0?'+ '+fmt(d):'− '+fmt(-d);
const rule=d=>d===0?'add 0':d>0?'add '+fmt(d):'take away '+fmt(-d);
const mode=()=>['gaps','rule','next','tenth','sort','quiz'][A.step];
const RULES=[
 {seq:[20,17,14,11],d:-3,opts:[['take away 3','ok'],['take away 9','span'],['add 3','sign']]},
 {seq:[1,1.5,2,2.5],d:.5,opts:[['add 0.5','ok'],['add 1.5','span'],['add 5','dec']]},
 {seq:[2,7,12,17],d:5,opts:[['add 5','ok'],['add 15','span'],['take away 5','sign']]}];
const NEXT=[
 {seq:[5,9,13,17],d:4,ans:21,opts:[[21,'ok'],[25,'off'],[4,'step']]},
 {seq:[12,9,6,3],d:-3,ans:0,opts:[[0,'ok'],[3,'stay'],[-3,'step']]},
 {seq:[.5,1,1.5,2],d:.5,ans:2.5,opts:[[2.5,'ok'],[2,'stay'],[3,'off']]}];
const TENTH=[
 {a:3,d:4,ans:39,opts:[[39,'ok'],[43,'nsteps'],[19,'next']]},
 {a:10,d:-2,ans:-8,opts:[[-8,'ok'],[-10,'nsteps'],[8,'sign']]},
 {a:1,d:3,ans:28,opts:[[28,'ok'],[31,'nsteps'],[4,'next']]}];
const SORT=[
 {seq:[4,8,12,16],ok:'lin'},{seq:[2,4,8,16],ok:'not'},
 {seq:[9,6,3,0],ok:'lin'},{seq:[1,4,9,16],ok:'not'}];
function txt(s,x,y,px,o){o=o||{};const g=A.ctx;g.font=`${o.w||700} ${px}px system-ui,sans-serif`;g.textAlign=o.a||'center';g.textBaseline='middle';g.fillStyle=o.c||A.col.tx;g.fillText(String(s),x,y,o.max||A.W-12)}
function tileBox(n,i,y){const gap=8,tw=Math.min(84,(A.W-24)/n-gap),total=n*tw+(n-1)*gap,x0=(A.W-total)/2;
 return{x:x0+i*(tw+gap),y:y==null?A.H*.34:y,w:tw,h:A.narrow?50:56,cx:x0+i*(tw+gap)+tw/2}}
function drawTiles(seq,y){const g=A.ctx,C=A.col;seq.forEach((v,i)=>{const b=tileBox(seq.length,i,y);g.fillStyle=v==null?A.mix(C.pn,C.ac,C.dark?.2:.14):C.pn;
 A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
 txt(v==null?'?':fmt(v),b.cx,b.y+b.h/2,A.narrow?17:19);txt((i+1)+(['st','nd','rd'][i]||'th'),b.cx,b.y+b.h+13,11,{c:C.mu,w:600})})}
function drawGaps(seq,shown,y){const g=A.ctx,C=A.col;for(let i=0;i<seq.length-1;i++){const a=tileBox(seq.length,i,y),b=tileBox(seq.length,i+1,y);
 const x=(a.x+a.w+b.x)/2,gy=a.y-20,on=shown[i],d=+(seq[i+1]-seq[i]).toFixed(4);
 g.fillStyle=on?A.mix(C.pn,C.gr,C.dark?.28:.22):A.mix(C.pn,C.ac,C.dark?.22:.16);
 A.paint.rrect(x-30,gy-12,60,24,10);g.fill();g.strokeStyle=C.tx;g.lineWidth=1.5;g.stroke();txt(on?sg(d):'tap',x,gy,12,{w:700})}}
function line(g,t,y){const px=A.narrow?13:15,rows=[''];g.font=`600 ${px}px system-ui,sans-serif`;
 t.split(' ').forEach(w=>{const n=rows.length-1,s=(rows[n]+' '+w).trim();if(g.measureText(s).width>A.W-16&&rows[n])rows.push(w);else rows[n]=s});
 rows.slice(0,2).forEach((s,j)=>txt(s,A.W/2,y+(j-(Math.min(2,rows.length)-1)/2)*(px+3),px,{w:600}))}
function bin(k){const w=(A.W-28)/2;return{x:10+(k==='not'?w+8:0),y:A.H*.58,w,h:A.H*.34,k}}
function paint(){const{ctx:g,W,H,col:C}=A,k=mode();g.fillStyle=A.mix(C.pn,C.cy,C.dark?.08:.14);g.fillRect(0,0,W,H);
 if(k==='quiz'){txt('Name the rule, the next term, or a later term.',W/2,H*.42,A.narrow?16:18);txt('Answer below',W/2,H*.56,15,{c:C.mu,w:500});A.fx.draw(g);return}
 if(k==='gaps'){txt('3, 7, 11, 15  —  is each gap the same?',W/2,H*.1,A.narrow?15:17);drawTiles([3,7,11,15]);drawGaps([3,7,11,15],S.shown||[])}
 if(k==='rule'){const it=RULES[S.i];if(it){txt('What is the term-to-term rule?',W/2,H*.1,A.narrow?15:17);drawTiles(it.seq);drawGaps(it.seq,S.shown||[])}else txt('All three rules found ✓',W/2,H*.4,20,{c:C.gr})}
 if(k==='next'){const it=NEXT[S.i];if(it){txt('What comes next?',W/2,H*.1,A.narrow?16:18);drawTiles(it.seq.concat([S.placed==null?null:it.ans]))}else txt('All three continued ✓',W/2,H*.4,20,{c:C.gr})}
 if(k==='tenth'){const it=TENTH[S.i];if(it){const jumps=S.jumps||0,seq=[it.a,it.a+it.d,it.a+2*it.d,it.a+3*it.d];
  txt(`1st term ${fmt(it.a)}, step ${sg(it.d)}. Find the 10th term.`,W/2,H*.1,A.narrow?14:16,{max:W-12});
  drawTiles(seq);const b=tileBox(5,4);g.fillStyle=jumps>=9?A.mix(C.pn,C.gr,C.dark?.25:.18):A.mix(C.pn,C.ac,C.dark?.2:.14);
  A.paint.rrect(b.x,b.y,b.w,b.h,12);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();
  txt(jumps>=9?fmt(it.ans):'?',b.cx,b.y+b.h/2,A.narrow?17:19);txt('10th',b.cx,b.y+b.h+13,11,{c:C.mu,w:600});
  txt(`${jumps} of 9 jumps`,W/2,H*.72,16,{c:jumps>=9?C.gr:C.tx})}
  else txt('All three 10th terms found ✓',W/2,H*.4,20,{c:C.gr})}
 if(k==='sort'){[['lin','same step'],['not','step changes']].forEach(([id,lab])=>{const z=bin(id);g.fillStyle=A.mix(C.pn,id==='lin'?C.gr:C.or,C.dark?.22:.16);A.paint.rrect(z.x,z.y,z.w,z.h,16);g.fill();g.strokeStyle=C.tx;g.lineWidth=2;g.stroke();txt(lab,z.x+z.w/2,z.y+18,A.narrow?13:15,{max:z.w-8});
  (S.laid||[]).filter(p=>p.k===id).forEach((p,n)=>txt(p.seq.map(fmt).join(', '),z.x+z.w/2,z.y+44+n*22,A.narrow?12:13,{max:z.w-10,w:600}))});
  const it=SORT[S.i];if(it&&!S.drag)txt(it.seq.map(fmt).join(', '),W/2,H*.28,A.narrow?18:20);else if(!it)txt('All sorted ✓',W/2,H*.28,20,{c:C.gr});
  if(S.drag)txt(S.drag.seq.map(fmt).join(', '),S.drag.x,S.drag.y,16)}
 if(S.msg)line(g,S.msg,k==='sort'?H*.5:H*.86);A.fx.draw(g)}
function feedback(t,good){S.msg=t;if(good)A.sound.pop();else if(good===false)A.sound.miss();tell(t);buttons();A.redraw();S.after&&S.after()}
function reset(o){for(const k in S)delete S[k];Object.assign(S,{i:0,shown:[],laid:[],jumps:0,placed:null,drag:null,msg:'',after:()=>{}},o||{});A.redraw()}
function reveal(i){if(mode()!=='gaps'&&mode()!=='rule')return;if(S.shown[i])return;S.shown[i]=true;A.sound.tick();
 const seq=mode()==='gaps'?[3,7,11,15]:(RULES[S.i]||{}).seq;if(!seq)return;
 const d=+(seq[i+1]-seq[i]).toFixed(4);const same=S.shown.filter(Boolean).length===seq.length-1;
 feedback(same?`Every gap is ${sg(d)}. The term-to-term rule is ${rule(d)}.`:`This gap is ${sg(d)}. Check the others too.`,same||undefined)}
function pickRule(tag){const it=RULES[S.i];if(!it)return;
 if(tag!=='ok'){const m=tag==='span'?`Not ${rule(it.seq[it.seq.length-1]-it.seq[0])}. That is first to last, ${it.seq.length-1} steps in one go. Check each gap.`
  :tag==='dec'?'Not add 5. The numbers go 1, 1.5, 2, 2.5. Each gap is 0.5, not 5.':`The list goes ${it.seq.map(fmt).join(', ')}, so the step is ${rule(it.d)}, not the other way.`;
  return feedback(m,false)}
 S.i++;S.shown=[];feedback(`Yes: ${rule(it.d)} each time.`,true)}
function pickNext(tag,val){const it=NEXT[S.i];if(!it)return;
 if(tag!=='ok'){const m=tag==='off'?`Not ${fmt(val)}. That adds an extra step, or skips the pattern. Last term ${fmt(it.seq.at(-1))} ${sg(it.d)} is ${fmt(it.ans)}.`
  :tag==='stay'?`The last term is ${fmt(it.seq.at(-1))}. Apply the rule once more: ${sg(it.d)} gives ${fmt(it.ans)}.`
  :`The step is ${sg(it.d)}, not a new first term. ${fmt(it.seq.at(-1))} ${sg(it.d)} = ${fmt(it.ans)}.`;
  return feedback(m,false)}
 S.placed=it.ans;S.i++;S.placed=null;feedback(`Yes, ${fmt(it.ans)} comes next.`,true)}
function jump(){const it=TENTH[S.i];if(!it||S.jumps>=9)return;S.jumps++;A.sound.tick();
 feedback(S.jumps>=9?`9 jumps of ${sg(it.d)} from ${fmt(it.a)} is ${fmt(it.ans)}.`:`Jump ${S.jumps}: now at ${fmt(it.a+S.jumps*it.d)}. Need 9 jumps to reach the 10th term.`)}
function pickTenth(tag,val){const it=TENTH[S.i];if(!it)return;
 if(tag!=='ok'){const m=tag==='nsteps'?`Not ${fmt(val)}. The 10th term is 9 jumps after the first, not 10. ${fmt(it.a)} + 9 × ${fmt(it.d)} = ${fmt(it.ans)}.`
  :tag==='sign'?`The step is ${sg(it.d)}, so the terms go down. ${fmt(it.a)} + 9 × (${fmt(it.d)}) = ${fmt(it.ans)}.`
  :`That is only the next term. The 10th term needs 9 jumps: ${fmt(it.a)} + 9 × ${fmt(it.d)} = ${fmt(it.ans)}.`;
  return feedback(m,false)}
 S.i++;S.jumps=0;feedback(`Yes, the 10th term is ${fmt(it.ans)}.`,true)}
function drop(k){const it=SORT[S.i];if(!it)return;
 if(k!==it.ok){const diffs=it.seq.slice(1).map((v,i)=>+(v-it.seq[i]).toFixed(4));
  return feedback(it.ok==='lin'?`Look at the gaps: ${diffs.map(sg).join(', ')}. They match, so it is linear.`:`The gaps are ${diffs.map(sg).join(', ')}. The step changes, so it is not linear.`,false)}
 S.laid.push({seq:it.seq,k});S.i++;feedback(it.ok==='lin'?'Yes. The same step each time: linear.':'Yes. The step changes, so it is not linear.',true)}
function buttons(){if(!pad)return;pad.innerHTML='';const k=mode();if(k==='quiz')return;
 const add=(t,f,lab)=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:48px;padding:8px 12px', 'aria-label':lab||t},pad,t).onclick=f};
 if(k==='gaps'){const seq=[3,7,11,15];seq.slice(0,-1).forEach((_,i)=>add(`Gap ${i+1}`,()=>reveal(i),`Reveal gap ${i+1} between ${fmt(seq[i])} and ${fmt(seq[i+1])}`))}
 if(k==='rule'&&RULES[S.i]){RULES[S.i].seq.slice(0,-1).forEach((_,i)=>add(`Gap ${i+1}`,()=>reveal(i),`Reveal gap ${i+1}`));RULES[S.i].opts.forEach(([lab,tag])=>add(lab,()=>pickRule(tag)))}
 if(k==='next'&&NEXT[S.i])NEXT[S.i].opts.forEach(([v,tag])=>add(fmt(v),()=>pickNext(tag,v),`Next term ${fmt(v)}`));
 if(k==='tenth'&&TENTH[S.i]){add('Add one jump',jump,'Add one jump of the step');TENTH[S.i].opts.forEach(([v,tag])=>add(fmt(v),()=>pickTenth(tag,v),`10th term ${fmt(v)}`))}
 if(k==='sort'&&SORT[S.i]){add('Same step (linear)',()=>drop('lin'),`Mark ${SORT[S.i].seq.map(fmt).join(', ')} as linear`);add('Step changes',()=>drop('not'),`Mark ${SORT[S.i].seq.map(fmt).join(', ')} as not linear`)}}
function hitGap(p){const seq=mode()==='gaps'?[3,7,11,15]:(mode()==='rule'&&RULES[S.i]?RULES[S.i].seq:null);if(!seq)return -1;
 for(let i=0;i<seq.length-1;i++){const a=tileBox(seq.length,i),b=tileBox(seq.length,i+1),x=(a.x+a.w+b.x)/2,y=a.y-20;if(Math.abs(p.x-x)<34&&Math.abs(p.y-y)<22)return i}return -1}
function down(p){const k=mode();if(k==='quiz')return false;if(k==='gaps'||k==='rule'){const i=hitGap(p);if(i>=0){reveal(i);return true}}
 if(k==='next'){const it=NEXT[S.i];if(!it)return false;const b=tileBox(it.seq.length+1,it.seq.length);if(p.x>b.x&&p.x<b.x+b.w&&p.y>b.y-8&&p.y<b.y+b.h+8)return true}
 if(k==='tenth'){const it=TENTH[S.i];if(!it)return false;const b=tileBox(5,4);if(p.x>b.x-8&&p.x<b.x+b.w+8&&p.y>b.y-8&&p.y<b.y+b.h+8){jump();return true}}
 if(k==='sort'&&SORT[S.i]){if(p.y<A.H*.5){S.drag={x:p.x,y:p.y,seq:SORT[S.i].seq};return true}for(const id of ['lin','not']){const z=bin(id);if(p.x>z.x&&p.x<z.x+z.w&&p.y>z.y){drop(id);return true}}}
 return false}
function move(p){if(S.drag){S.drag.x=p.x;S.drag.y=p.y;A.redraw()}}
function up(p){if(!S.drag)return;S.drag=null;A.redraw();if(!p)return;if(mode()==='sort'){for(const id of ['lin','not']){const z=bin(id);if(p.x>z.x&&p.x<z.x+z.w&&p.y>z.y){drop(id);return}}}}
const finish=(i,ok,say)=>()=>{if(A.step===i&&!A.isDone&&A.pred[i]!=null&&ok())A.done(say()+A.reveal(i))};
function auto(i,acts){steps[i].go();acts.forEach((f,j)=>setTimeout(()=>{if(A.step===i)f()},A.reduced()?25*(j+1):(j+1)*350))}
function open(i,hint,ok,say){reset();feedback(hint);S.after=finish(i,ok,say)}
const steps=[
{h:'Same step each time',p:'A linear sequence uses the same step from each term to the next. That step is the term-to-term rule. Tap every gap in 3, 7, 11, 15.',
 predict:{q:'From 3 to 15 is 12. Is the term-to-term rule add 12?',opts:['Yes, 15 − 3 = 12','No, check each gap','Yes, because the list goes up'],ans:1},
 task:'Reveal all three gaps',show:()=>auto(0,[()=>reveal(0),()=>reveal(1),()=>reveal(2)]),
 go:()=>open(0,'Tap a gap, or use the buttons under the tiles.',()=>(S.shown||[]).filter(Boolean).length>=3,()=>'Each gap is + 4. The rule is add 4, not add 12.')},
{h:'Find the rule',p:'Check every gap, not first to last. The step can take away, or use a decimal.',
 predict:{q:'The list 20, 17, 14, 11. What is the term-to-term rule?',opts:['take away 9','take away 3','add 3'],ans:1},
 task:'Find the rule for each list',show:()=>auto(1,RULES.flatMap(it=>[()=>{S.shown=it.seq.slice(1).map(()=>true);pickRule('ok')}])),
 go:()=>open(1,'Reveal the gaps, then pick the rule.',()=>S.i>=RULES.length,()=>'take away 3, add 0.5, and add 5. Each list keeps its own step.')},
{h:'What comes next?',p:'Once you know the rule, apply it one more time to the last term.',
 predict:{q:'The list 5, 9, 13, 17. What comes next?',opts:['21','25','4'],ans:0},
 task:'Continue each sequence',show:()=>auto(2,NEXT.map(it=>()=>pickNext('ok',it.ans))),
 go:()=>open(2,'Pick the next term for each list.',()=>S.i>=NEXT.length,()=>'21, then 0, then 2.5. Apply the same step once more.')},
{h:'The 10th term',p:'The 10th term is 9 jumps after the first term, not 10. Add the step nine times, or use first + 9 × step.',
 predict:{q:'The list 3, 7, 11, 15… What is the 10th term?',opts:['3 + 10 × 4 = 43','3 + 9 × 4 = 39','15 + 4 = 19'],ans:1},
 task:'Find each 10th term',show:()=>auto(3,TENTH.map(it=>()=>{S.jumps=9;pickTenth('ok',it.ans)})),
 go:()=>open(3,'Add jumps if you like, then pick the 10th term.',()=>S.i>=TENTH.length,()=>'39, then −8, then 28. Nine jumps from the first term, not ten.')},
{h:'Linear or not?',p:'If every gap matches, the sequence is linear. If the gap itself grows, as in 2, 4, 8, 16, it is not linear.',
 predict:{q:'Is 1, 4, 9, 16 a linear sequence?',opts:['Yes, it goes up','No, the gaps are +3, +5, +7','Yes, each term is a square'],ans:1},
 task:'Sort each list',show:()=>auto(4,SORT.map(it=>()=>drop(it.ok))),
 go:()=>open(4,'Drag a list into a box, or use the buttons.',()=>S.i>=SORT.length,()=>'Same step: linear. Changing step: not linear.')},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.after()});
const QS=[
 ['A linear sequence starts at 4 and adds 6 each time. What is the 10th term?',[['58','ok'],['64','nsteps'],['10','next']]],
 ['The list 30, 24, 18, 12. What is the term-to-term rule?',[['take away 6','ok'],['take away 18','span'],['add 6','sign']]],
 ['The list 2, 2.5, 3, 3.5. What comes next?',[['4','ok'],['4.5','off'],['5','off']]],
 ['Is 3, 6, 12, 24 a linear sequence?',[['No, the step doubles each time','ok'],['Yes, it goes up by a rule','double'],['Yes, each term is even','double']]],
 ['The list 7, 7, 7, 7. What is the term-to-term rule?',[['add 0','ok'],['there is no rule','zero'],['add 7','span']]],
 ['A sequence starts at 5 and takes away 2 each time. What is the 10th term?',[['-13','ok'],['-15','nsteps'],['3','next']]],
 ['The list 1, 5, 9, 13. Someone says the rule is add 12. Why is that wrong?',[['12 is first to last, three steps at once','ok'],['The rule is add 1','sign'],['The list is not linear','double']]]];
function why(t){let m='Use the same step from each term to the next. The nth term is the first term plus (n − 1) jumps.';
 if(t==='nsteps')m='The 10th term is 9 jumps after the first term, not 10. First + 9 × step.';
 if(t==='span')m='Do not use first to last as the rule. That skips the gaps in between. Check each neighbouring pair.';
 if(t==='sign')m='Look at whether the list goes up or down. 30, 24, 18 is taking away, not adding.';
 if(t==='double')m='A linear sequence keeps the same step. Doubling (2, 4, 8, 16) changes the step, so it is not linear.';
 if(t==='off')m='Apply the rule once to the last term. Do not skip ahead or add a different number.';
 if(t==='next')m='That would be a nearby term, not the one the question asked for.';
 if(t==='zero')m='A constant list is linear: the step is add 0 each time.';
 if(t==='dec')m='Read the decimal carefully. 1, 1.5, 2, 2.5 adds 0.5, not 5.';
 return m}
function ask(){turn++;const Q=QS[turn%QS.length],r=turn%3,opts=[...Q[1].slice(r),...Q[1].slice(0,r)];
 qa.innerHTML=`<p><b>${Q[0]}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qa.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn',style:'min-height:48px'},row,v).onclick=()=>mark(t)});tell('Challenge: '+Q[0]);A.redraw()}
function mark(t){qa.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=qa.querySelector('.fl-fb'),ok=t==='ok';
 if(ok)A.win();else A.sound.miss();fb.innerHTML=(ok?'✓ Yes! ':'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.28,draw:paint,onStep:A=>{qa.hidden=A.step!==5;pad.hidden=A.step===5;buttons()},
 init:A=>{reset();const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Sequence buttons'},w);qa=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});buttons()}});
A.start()})})();
