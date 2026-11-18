/* Flagship: choosing tenses for precise meaning (ages 10–11; CCSS ELA L.5.1b–d, NC England Y5–Y6 grammar: perfect and
   progressive forms, the subjunctive "If I were"). Work out which of two past events came first from the past perfect, pick
   the verb form that fits a scene (in progress, finished before, up to now, over), sort conditionals by what is real, fix the
   verbs that slip in a past story while keeping speech in the present, and put a mixed-tense paragraph on a timeline. */
(()=>{
const {FIRST,SCENES,BOXES,IFS,SHIFT,FLASH,STORY,MIXF,BANK,WHY}=TSEQART;
const C={text:'#111827',dim:'#374151',bg:'#fffdf8',rule:'#1f2937',hint:'#f5f3ff',pass:'#166534',passBg:'#dcfce7',fail:'#9f1239',failBg:'#ffe4e6',
 verb:'#1d4ed8',verbBg:'#dbeafe',past:'#fef3c7',now:'#dcfce7',fut:'#e0e7ff',slot:'#ffffff'};
VIS.reg('flagtseq',c=>{let A,X,keypad,qbox,qi=-1,inrow=0,gen=0;const K={after:()=>{}};
const u=n=>Math.round(n*(A.narrow?1:1.1));
function announce(s){c.say(s);A.cv.setAttribute('aria-label',s)}
function txt(s,x,y,n,col,w,al){X.font=`${w||700} ${u(n)}px system-ui,sans-serif`;X.fillStyle=col||C.text;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function breakUp(s,maxW,n,w){X.font=`${w||700} ${u(n)}px system-ui,sans-serif`;const out=[];let line='';for(const t of String(s).split(' ')){const cand=line?line+' '+t:t;if(line&&X.measureText(cand).width>maxW){out.push(line);line=t}else line=cand}out.push(line);return out}
function slab(x,y,w,h,f,e,lw,r){A.paint.rrect(x,y,w,h,r||10);X.fillStyle=f;X.fill();if(e){X.lineWidth=lw||2;X.strokeStyle=e;X.stroke()}}
function centred(s,R,n,col,w){const L=breakUp(s,R.w-u(14),n,w),lh=u(n)+4;L.forEach((t,i)=>txt(t,R.x+R.w/2,R.y+R.h/2+(i-(L.length-1)/2)*lh,n,col,w))}
const inside=(p,R)=>!!R&&p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h;
function topBar(s,won){const L=breakUp(s,A.W-44,14),lh=u(14)+4,h=Math.max(u(36),L.length*lh+14);slab(12,10,A.W-24,h,won?C.passBg:C.hint,won?C.pass:C.rule,2,12);L.forEach((t,i)=>txt(t,A.W/2,10+h/2+(i-(L.length-1)/2)*lh,14,won?C.pass:C.text));return 10+h}
function verdict(){if(!K.msg)return 0;const L=breakUp((K.bad?'✗ ':'✓ ')+K.msg,A.W-48,13),lh=u(13)+5,h=L.length*lh+12,y=A.H-h-10;slab(12,y,A.W-24,h,'#ffffff',K.bad?C.fail:C.pass,3,12);L.forEach((t,i)=>txt(t,A.W/2,y+6+lh*(i+.5),13,K.bad?C.fail:C.text));return h+14}
const nope=s=>{K.bad=true;K.msg=s;A.sound.miss();refresh()};
const yep=s=>{K.bad=false;K.msg=s;A.sound.pop()};
const mode=()=>['first','scene','ifs','shift','flash','quiz'][A.step];
/* ---------- step 0: which event came first? ---------- */
function chooseFirst(i){if(K.won)return;const F=FIRST[K.r];if(i!==F[2])return nope(F[4]);yep(F[3]);K.placed=i;K.r++;
 if(K.r>=FIRST.length){K.won=true;K.msg='Had + past participle marks the earlier past event, wherever it sits in the sentence.'}refresh()}
function drawFirst(t0,b0){const F=FIRST[Math.min(K.r,FIRST.length-1)],sR={x:u(14),y:t0,w:A.W-u(28),h:u(62)};slab(sR.x,sR.y,sR.w,sR.h,'#ffffff',C.rule,2);centred(F[0],sR,15,C.text,800);
 const ly=sR.y+sR.h+u(28),lx0=u(30),lx1=A.W-u(30);X.strokeStyle=C.rule;X.lineWidth=3;X.beginPath();X.moveTo(lx0,ly);X.lineTo(lx1,ly);X.stroke();X.beginPath();X.moveTo(lx1,ly);X.lineTo(lx1-10,ly-6);X.lineTo(lx1-10,ly+6);X.closePath();X.fillStyle=C.rule;X.fill();
 txt('earlier',lx0,ly-u(14),12,C.dim,800,'left');txt('later',lx1,ly-u(14),12,C.dim,800,'right');
 const slotR={x:u(14),y:ly+u(14),w:(A.W-u(38))/2,h:u(58)};K.slotR=slotR;slab(slotR.x,slotR.y,slotR.w,slotR.h,C.past,C.rule,2.5);centred('Happened first: drop here',slotR,13,C.dim);
 const gw=(A.W-u(38))/2,gh=u(64),gy=Math.min(b0-gh,slotR.y+slotR.h+u(26));K.evR=F[1].map((e,i)=>{const d=K.drag&&K.drag.i===i,R=d?{x:K.drag.x-gw/2,y:K.drag.y-gh/2,w:gw,h:gh,i}:{x:u(14)+i*(gw+u(10)),y:gy,w:gw,h:gh,i};return R});
 K.evR.forEach((R,i)=>{slab(R.x,R.y,R.w,R.h,C.verbBg,C.verb,2.5);centred(F[1][i],R,14,C.text,800)});txt(`Sentence ${Math.min(K.r+1,FIRST.length)} of ${FIRST.length}`,A.W/2,gy-u(12),12,C.dim,800)}
/* ---------- step 1: which verb form fits the scene? ---------- */
function chooseVerb(i){if(K.won)return;const S=SCENES[K.r],V=S[2][(i+K.r)%3];if(!V[1])return nope(V[2]);yep(`"${S[1].replace('___',V[0])}" ${V[2]}`);K.r++;
 if(K.r>=SCENES.length){K.won=true;K.msg='In progress: be + -ing. Finished before a moment: had or will have. Up to now: has or have. Over: simple past.'}refresh()}
const optsOf=r=>[0,1,2].map(i=>SCENES[r][2][(i+r)%3][0]);
function drawScene(t0,b0){const S=SCENES[Math.min(K.r,SCENES.length-1)],cR={x:u(14),y:t0,w:A.W-u(28),h:u(56)};slab(cR.x,cR.y,cR.w,cR.h,C.past,C.rule,2);centred(S[0],cR,14,C.text,700);
 const fR={x:u(14),y:cR.y+cR.h+u(14),w:A.W-u(28),h:u(60)};K.frameR=fR;slab(fR.x,fR.y,fR.w,fR.h,'#ffffff',K.drag?C.verb:C.rule,K.drag?3:2);centred(S[1].replace('___','_______'),fR,16,C.text,800);
 const o=optsOf(Math.min(K.r,SCENES.length-1)),th=u(52),tw=A.narrow?A.W-u(28):(A.W-u(48))/3,ty=fR.y+fR.h+u(26);
 K.verbR=o.map((v,i)=>{const home=A.narrow?{x:u(14),y:ty+i*(th+u(8)),w:tw,h:th,i}:{x:u(14)+i*(tw+u(10)),y:ty,w:tw,h:th,i};return K.drag&&K.drag.i===i?{...home,x:K.drag.x-tw/2,y:K.drag.y-th/2}:home});
 K.verbR.forEach((R,i)=>{slab(R.x,R.y,R.w,R.h,C.verbBg,C.verb,2.5,12);centred(o[i],R,16,C.text,800)});txt(`Scene ${Math.min(K.r+1,SCENES.length)} of ${SCENES.length}`,A.W/2,Math.min(b0-u(8),ty-u(12)),12,C.dim,800)}
/* ---------- step 2: sort conditionals by what is real ---------- */
function sortIf(b){if(K.won)return;const F=IFS[K.at];if(b!==F[1])return nope(F[2]);yep(F[2]);K.at++;if(K.at>=IFS.length){K.won=true;K.msg='Will = real. Would = imagined now. Would have = a past that did not happen.'}refresh()}
function drawIfs(t0,b0){const n=BOXES.length,bw=(A.W-u(28)-(n-1)*u(8))/n,bh=Math.min(u(96),(b0-t0)*.36),by=b0-bh,fills=[C.now,C.fut,C.past];
 K.boxR=BOXES.map((nm,i)=>{const R={x:u(14)+i*(bw+u(8)),y:by,w:bw,h:bh,i};slab(R.x,R.y,R.w,R.h,fills[i],C.rule,2.5);centred(nm,R,13,C.text,800);return R});
 if(K.at<IFS.length){const cw=Math.min(A.W-u(40),u(420)),L=breakUp(IFS[K.at][0],cw-u(20),15,800),ch=L.length*(u(15)+4)+u(24),home={x:(A.W-cw)/2,y:t0+(by-t0-ch)/2,w:cw,h:ch};K.cardR=home;
  const R=K.drag?{x:K.drag.x-cw/2,y:K.drag.y-ch/2,w:cw,h:ch}:home;slab(R.x,R.y,R.w,R.h,'#ffffff',K.drag?C.verb:C.rule,3);centred(IFS[K.at][0],R,15,C.text,800);txt(`Card ${K.at+1} of ${IFS.length}`,A.W/2,Math.max(t0+u(8),home.y-u(12)),12,C.dim,800)}}
/* ---------- step 3: fix the verbs that slip ---------- */
function tapWord(j){if(K.won)return;const T=SHIFT[j];if(!T[1])return;if(T[1]===1)return nope(T[3]);if(K.fixed.includes(j))return;K.fixed.push(j);yep(T[3]);
 if(K.fixed.length===SHIFT.filter(t=>t[1]===2).length){K.won=true;K.msg='The story stays in the past. The speech stays in the present, because that is when Maya says it.'}refresh()}
function drawShift(t0,b0){const R0={x:u(14),y:t0,w:A.W-u(28),h:b0-t0};slab(R0.x,R0.y,R0.w,R0.h,'#ffffff',C.rule,2);X.font=`700 ${u(17)}px system-ui,sans-serif`;
 const lh=u(46),sp=X.measureText(' ').width;let x=R0.x+u(12),y=R0.y+u(30);K.wordR=[];
 SHIFT.forEach((T,j)=>{const show=T[1]===2&&K.fixed.includes(j)?T[2]:T[0];const parts=T[1]?[show]:show.split(' ');
  parts.forEach(w=>{X.font=`${T[1]?800:600} ${u(17)}px system-ui,sans-serif`;const ww=X.measureText(w).width+(T[1]?u(18):0);if(x+ww>R0.x+R0.w-u(10)){x=R0.x+u(12);y+=lh}
   if(T[1]){const R={x,y:y-u(18),w:ww,h:u(36),j},ok=K.fixed.includes(j);K.wordR.push(R);slab(R.x,R.y,R.w,R.h,ok?C.passBg:C.verbBg,ok?C.pass:C.verb,2,8);txt(w,R.x+R.w/2,y,17,C.text,800)}else txt(w,x,y,17,C.text,600,'left');x+=ww+sp})});
 txt(`Slips fixed: ${K.fixed.length} of 2`,A.W/2,Math.min(b0-u(16),y+u(44)),14,C.dim,800)}
/* ---------- step 4: a mixed-tense paragraph on a timeline ---------- */
function placeEvent(k){if(K.won||K.line.includes(k))return;const want=K.line.length;if(k!==want)return nope(want===0?'Find the earliest event first. "Last month" and the simple past "joined" point back furthest.':`Not yet. Before that comes: "${FLASH[want][0]}"`);
 K.line.push(k);yep(`${FLASH[k][0]} (${FLASH[k][1]})`);if(K.line.length===FLASH.length){K.won=true;K.msg='Past, then a stretch up to now, then now, then the future. The tenses carry the order.'}refresh()}
function drawFlash(t0,b0){const sR={x:u(14),y:t0,w:A.W-u(28),h:u(74)};slab(sR.x,sR.y,sR.w,sR.h,C.hint,C.rule,2);centred(STORY,sR,13,C.text,700);
 const n=FLASH.length,gap=u(6),top=sR.y+sR.h+u(12),rh=Math.min(u(50),(b0-top-gap*(n-1))/n),cw=(A.W-u(38))/2;K.poolR=[];
 MIXF.forEach((k,j)=>{if(K.line.includes(k))return;const R={x:u(14),y:top+j*(rh+gap),w:cw,h:rh,k};K.poolR.push(R);slab(R.x,R.y,R.w,R.h,'#ffffff',C.rule,2);centred(FLASH[k][0],R,13,C.text,800)});
 const tags=['earliest','next','next','latest'];for(let s=0;s<n;s++){const R={x:u(24)+cw,y:top+s*(rh+gap),w:cw,h:rh},k=K.line[s];slab(R.x,R.y,R.w,R.h,k!=null?C.passBg:C.slot,k!=null?C.pass:C.dim,k!=null?2.5:1.5);centred(k!=null?`${s+1}. ${FLASH[k][1]}`:`${s+1}. ${tags[s]}`,R,13,k!=null?C.text:C.dim,800)}}
function draw(){X.fillStyle=A.col.dark?'#1f2937':C.bg;X.fillRect(0,0,A.W,A.H);X.fillStyle=C.bg;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const M=mode(),T={first:['Which happened first? Drag it to the slot, or tap it.','You can read time order from the tense.'],scene:['Which verb fits the scene? Drag it into the gap, or tap it.','Each form says something different about time.'],
  ifs:['Is it real, imagined now, or a past that did not happen? Drag the card.','Conditionals sorted.'],shift:['Two verbs slip out of the past. Tap them to fix them.','Tenses fixed, speech kept.'],
  flash:['Put the events in time order. Tap the earliest first.','The paragraph on a timeline.'],quiz:['Choose the tense that says what you mean.','']};
 const t=topBar(K.won?T[M][1]:T[M][0],K.won),b=A.H-verdict()-u(6);
 if(M==='first')drawFirst(t+u(10),b);if(M==='scene')drawScene(t+u(10),b);if(M==='ifs')drawIfs(t+u(10),b);if(M==='shift')drawShift(t+u(10),b);if(M==='flash')drawFlash(t+u(8),b);
 if(M==='quiz'){const R={x:u(30),y:t+u(30),w:A.W-u(60),h:Math.min(u(140),b-t-u(60))};slab(R.x,R.y,R.w,R.h,C.hint,C.rule,2);centred('Had: earlier past. Has: up to now. Be + -ing: in progress. Would have: did not happen.',R,15,C.text,800)}
 A.fx.draw(X)}
/* ---------- pointer ---------- */
let hold=null;
function down(p){const M=mode();
 if(M==='first'&&!K.won){const R=(K.evR||[]).find(q=>inside(p,q));if(R){hold={t:'ev',i:R.i,x0:p.x,y0:p.y};K.drag={i:R.i,x:p.x,y:p.y};A.redraw();return true}}
 if(M==='scene'&&!K.won){const R=(K.verbR||[]).find(q=>inside(p,q));if(R){hold={t:'vb',i:R.i,x0:p.x,y0:p.y};K.drag={i:R.i,x:p.x,y:p.y};A.redraw();return true}}
 if(M==='ifs'&&!K.won){if(inside(p,K.cardR)){hold={t:'if'};K.drag={x:p.x,y:p.y};A.redraw();return true}const R=(K.boxR||[]).find(q=>inside(p,q));if(R){sortIf(R.i);return true}}
 if(M==='shift'){const R=(K.wordR||[]).find(q=>inside(p,q));if(R){tapWord(R.j);return true}}
 if(M==='flash'){const R=(K.poolR||[]).find(q=>inside(p,q));if(R){placeEvent(R.k);return true}}
 return false}
function move(p){if(!hold||!K.drag)return;K.drag.x=p.x;K.drag.y=p.y;A.redraw()}
function up(p){const h=hold;hold=null;if(!h)return;K.drag=null;const tap=h.x0!=null&&Math.hypot(p.x-h.x0,p.y-h.y0)<8;
 if(h.t==='ev'){if(tap||inside(p,K.slotR))chooseFirst(h.i);else A.redraw()}
 if(h.t==='vb'){if(tap||inside(p,K.frameR))chooseVerb(h.i);else A.redraw()}
 if(h.t==='if'){const R=(K.boxR||[]).find(q=>inside(p,q));if(R)sortIf(R.i);else A.redraw()}}
/* ---------- live description and buttons ---------- */
function refresh(){const M=mode();let d='Challenge.';
 if(M==='first')d=K.won?'All four sentences done.':`Sentence: ${FIRST[K.r][0]} Events: ${FIRST[K.r][1].join('; ')}. Which happened first?`;
 if(M==='scene')d=K.won?'All six scenes done.':`Scene: ${SCENES[K.r][0]} Sentence: ${SCENES[K.r][1].replace('___','blank')}. Choices: ${optsOf(K.r).join(', ')}.`;
 if(M==='ifs')d=K.won?'All cards sorted.':`Card ${K.at+1} of ${IFS.length}: ${IFS[K.at][0]} Boxes: ${BOXES.join(', ')}.`;
 if(M==='shift')d=`Story: ${SHIFT.map((T,j)=>T[1]===2&&K.fixed.includes(j)?T[2]:T[0]).join(' ')} Verbs to check: ${SHIFT.filter(T=>T[1]).map(T=>T[0]).join(', ')}. Fixed ${K.fixed.length} of 2.`;
 if(M==='flash')d=`Timeline so far: ${K.line.map(k=>FLASH[k][0]).join(' then ')||'empty'}.`;
 announce((K.msg?K.msg+' ':'')+d);pads();K.after()}
function pads(){if(!keypad)return;keypad.innerHTML='';const M=mode(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},keypad,t).onclick=()=>{fn();refresh()}};
 if(!K.won){if(M==='first')FIRST[K.r][1].forEach((e,i)=>b(`First: ${e}`,()=>chooseFirst(i)));
  if(M==='scene')optsOf(K.r).forEach((v,i)=>b(v,()=>chooseVerb(i)));
  if(M==='ifs')BOXES.forEach((n,i)=>b(n,()=>sortIf(i)));
  if(M==='shift')SHIFT.forEach((T,j)=>{if(T[1]&&!K.fixed.includes(j))b(`Fix "${T[0].replace('.','')}"`,()=>tapWord(j))});
  if(M==='flash')MIXF.forEach(k=>{if(!K.line.includes(k))b(FLASH[k][0],()=>placeEvent(k))})}
 A.redraw()}
const ok=(n,test,msg)=>()=>{if(A.step===n&&test()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const auto=(fns,ms)=>{const id=++gen;fns.forEach((f,j)=>setTimeout(()=>{if(id===gen){f();refresh()}},(j+1)*(A.reduced()?50:ms)))};
function fresh(){gen++;Object.assign(K,{after:()=>{},won:false,msg:'',bad:false,r:0,at:0,drag:null,fixed:[],line:[]})}
const rightVerb=r=>[0,1,2].find(i=>SCENES[r][2][(i+r)%3][1]);
const steps=[
{h:'Which happened first?',p:'The past perfect (had + past participle, like had started) shows an action that happened before another past action.',
predict:{q:'"When we got to the cinema, the film had started." What happened first?',opts:['We got to the cinema','The film started'],ans:1},
task:'Find what happened first in all 4 sentences',show:()=>{steps[0].go();auto(FIRST.map(F=>()=>chooseFirst(F[2])),500)},go:()=>{fresh();refresh();K.after=ok(0,()=>K.won,'Time order read from tense.')}},
{h:'In progress, finished, or up to now?',p:'Progressive (was cooking) is in progress. Perfect (had cooked, has lived, will have finished) is complete by a moment. Simple past (lived) is over.',
predict:{q:'"Zara has lived here for three years." Does Zara still live here?',opts:['No, that time is over','Yes, it runs up to now'],ans:1},
task:'Choose the verb for all 6 scenes',show:()=>{steps[1].go();auto(SCENES.map((S,r)=>()=>chooseVerb(rightVerb(r))),480)},go:()=>{fresh();refresh();K.after=ok(1,()=>K.won,'Six scenes, six precise verbs.')}},
{h:'Real or imagined?',p:'Conditionals use tense to show how real something is: will for real, would for imagined now, would have for a past that did not happen.',
predict:{q:'"If I had left earlier, I would have caught the bus." Did I catch the bus?',opts:['Yes','No'],ans:1},
task:'Sort all 6 conditionals',show:()=>{steps[2].go();auto(IFS.map(F=>()=>sortIf(F[1])),450)},go:()=>{fresh();refresh();K.after=ok(2,()=>K.won,'Sorted by how real.')}},
{h:'Fix the tense slip',p:'Stay in one tense unless the time really changes. Speech inside speech marks can be in the present, because that is when it is said.',
predict:{q:'In a past story: "I love dogs!" she said. Is "love" a slip?',opts:['Yes, change it to loved','No, speech can be in the present'],ans:1},
task:'Fix the 2 verbs that slip',show:()=>{steps[3].go();auto(SHIFT.map((T,j)=>[T,j]).filter(q=>q[0][1]===2).map(q=>()=>tapWord(q[1])),600)},go:()=>{fresh();refresh();K.after=ok(3,()=>K.won,'Slips fixed.')}},
{h:'Tenses tell the order',p:'Writers mix tenses on purpose to move through time. Read each verb to place its event.',
task:'Tap the 4 events in time order',show:()=>{steps[4].go();auto(FLASH.map((f,k)=>()=>placeEvent(k)),480)},go:()=>{fresh();refresh();K.after=ok(4,()=>K.won,'Timeline built.')}},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>K.after()});
function quiz(){qi++;const [q,right,bad]=BANK[qi%BANK.length],all=[[right,'ok'],...bad],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 qbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qbox.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>judge(tag,right)});announce('Challenge: '+q);A.redraw()}
function judge(tag,right){qbox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qbox.querySelector('.fl-fb'),yes=tag==='ok';let m=WHY[tag]||'Ask when each action happens, and whether it is finished.';
 if(tag==='arrived')m='"Had left" is the earlier event. The train left first, so I missed it.';
 if(tag==='over')m='"Have known" is the present perfect: it runs up to now, so I still know Sam.';
 if(tag==='won')m='"Would have won" means it did not happen. We did not run and we did not win.';
 if(yes){inrow++;A.win()}else{inrow=0;A.sound.miss()}fb.innerHTML=`${yes?'✓ Yes: '+right+'. In a row: '+inrow+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
FK.shell(c,{steps,ratio:.66,tall:1.4,draw,onStep:B=>{qbox.hidden=B.step!==5;keypad.hidden=B.step===5;pads()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);keypad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Choosing tenses lab buttons'},w);qbox=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
