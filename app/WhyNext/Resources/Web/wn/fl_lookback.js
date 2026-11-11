/* Flagship – reflecting after learning (ages 9–10): replay Maya's fractions homework moment by moment and tag what helped
   and what was confusing, sharpen a vague reflection until the usefulness meter is full, build the
   do – look back – work out why – plan cycle, choose the changes that lift session 2, and place four pupils on a
   result-versus-next-step grid. Drag or tap on the canvas; every action has a button twin. */
(()=>{
const MOM=[['📖','Read the worked example first',1],['📊','Drew a bar model to compare 2/3 and 3/4',1],['❓','Stuck on common denominators; kept guessing',0],
 ['🗣️','Asked a partner to explain one step',1],['⏩','Rushed the last two questions',0],['✅','Checked answers with the bar model',1]];
const SLOT=[['What helped',[['It was fine','vague'],['I am just good at maths','person'],['The bar model showed me 3/4 is bigger than 2/3','ok']]],
 ['What was confusing',[['Fractions are hard','vague'],['The teacher was boring','blame'],['I could not find a common denominator','ok']]],
 ['Next time I will',[['Try harder','vague'],['Do it all the same way','same'],['Practise 3 common-denominator questions first','ok']]]];
const SAY={vague:'Too vague: which part, and what will you actually do?',person:'That is about you, not about how you learned. Name the strategy.',blame:'Blame gives you nothing to change. Name the step that confused you.',same:'Doing it the same way gives the same result, including the lost marks.'};
const LOOP=['Do it','Look back','Work out why','Plan next time'];
const FIX=[['🧮 Practise common denominators first',2,1],['🐢 Slow down on the last questions',4,1],['🚫 Skip the bar model to save time',1,-2],['🔁 Do it exactly the same',-1,0]];
const KIDS=[['Leo','10/10. "Dunno, I got lucky."',1,0],['Ava','6/10. "I mix up the top and bottom. I will use bar models."',0,1],['Sam','9/10. "The bar model helped; I will use it again."',1,1],['Kit','4/10. "It was bad."',0,0]];
VIS.reg('flaglookback',c=>{let A,pad,qb,qn=-1,streak=0,ver=0;
const S={at:0,tag:[],cur:[0,0,0],ring:[],picks:[],ran:false,score:8,place:[-1,-1,-1,-1],sel:-1,drag:null,want:()=>{}};
const md=()=>['replay','sharp','cycle','fix','grid','quiz'][A.step];
const tell=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
const fz=n=>Math.round(n*(A.narrow?1:1.12));
function txt(g,t,x,y,n,col,w,al){g.font=`${w||700} ${fz(n)}px system-ui,sans-serif`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-16)}
function glyph(g,e,x,y,n){g.font=`${fz(n)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(e,x,y)}
function card(x,y,w,h,tint,edge){const g=A.ctx,C=A.col;g.fillStyle=A.mix(C.pn,tint,C.dark?.18:.75);A.paint.rrect(x,y,w,h,10);g.fill();g.lineWidth=edge?3:1.5;g.strokeStyle=edge||A.mix(C.tx,C.pn,.6);g.stroke()}
/* wrap a sentence into lines that fit width w */
function wrap(g,t,w,n){g.font=`600 ${fz(n)}px system-ui,sans-serif`;const out=[];let line='';t.split(' ').forEach(wd=>{const tr=line?line+' '+wd:wd;if(g.measureText(tr).width>w&&line){out.push(line);line=wd}else line=tr});out.push(line);return out}
const trackX=i=>A.W*(.1+i*.16);
function draw(A){const{ctx:g,W,H,col:C}=A,m=md();g.fillStyle=A.mix(C.pn,'#ede9fe',C.dark?.06:.35);g.fillRect(0,0,W,H);
 if(m==='replay'||m==='fix'){const y=H*.16;g.strokeStyle=C.mu;g.lineWidth=3;g.beginPath();g.moveTo(trackX(0),y);g.lineTo(trackX(5),y);g.stroke();
  MOM.forEach((mo,i)=>{const t=S.tag[i],fixed=m==='fix'&&S.ran&&FIX.some(f=>S.picks.includes(FIX.indexOf(f))&&f[1]===i);const broke=S.ran&&S.picks.includes(2)&&i===1,col=m==='fix'?(broke?C.rd:fixed||mo[2]?C.gr:C.rd):t==null?C.mu:t?C.gr:C.or;
   g.fillStyle=col;g.beginPath();g.arc(trackX(i),y,i===S.at&&m==='replay'?13:9,0,7);g.fill();glyph(g,mo[0],trackX(i),y-26,16);if(t!=null&&m==='replay')txt(g,t?'👍':'🤔',trackX(i),y+24,13,C.tx)});
  if(m==='replay'){const mo=MOM[S.at];card(14,H*.34,W-28,H*.26,'#ffffff');wrap(g,`Moment ${S.at+1}: ${mo[1]}`,W-50,15).forEach((l,j)=>txt(g,l,W/2,H*.42+j*fz(20),15,C.tx,600));
   card(14,H*.66,W/2-21,H*.2,'#bbf7d0');card(W/2+7,H*.66,W/2-21,H*.2,'#fed7aa');txt(g,'👍 Helped',W*.25,H*.76,15,C.tx,800);txt(g,'🤔 Confusing',W*.75,H*.76,15,C.tx,800);
   txt(g,`Score: 8/10 · tagged ${S.tag.filter(v=>v!=null).length} of 6`,W/2,H*.94,12,C.mu)}
  else{FIX.forEach((f,i)=>{const on=S.picks.includes(i),y=H*(.3+i*.13);card(14,y,W-28,H*.11,on?'#c7d2fe':'#ffffff',on?C.vi:null);txt(g,f[0],W/2,y+H*.055,13,C.tx,on?800:600)});
   txt(g,S.ran?`Session 2 score: ${S.score}/10`:`Pick up to 2 changes (${S.picks.length}/2), then run session 2`,W/2,H*.88,14,S.ran?C.tx:C.mu,800)}}
 if(m==='sharp'){const full=S.cur.filter((v,i)=>SLOT[i][1][v][1]==='ok').length;SLOT.forEach(([lab,ops],i)=>{const y=H*(.04+i*.25),[t,k]=ops[S.cur[i]];card(14,y,W-28,H*.22,k==='ok'?'#bbf7d0':'#ffffff',k==='ok'?C.gr:null);
   txt(g,lab+'  (tap to change)',24,y+fz(13),12,C.mu,700,'left');wrap(g,t,W-56,14).slice(0,2).forEach((l,j)=>txt(g,l,W/2,y+H*.12+j*fz(18),14,C.tx,600))});
  const mw=W-28;g.fillStyle=A.mix(C.pn,C.mu,.25);A.paint.rrect(14,H*.8,mw,16,8);g.fill();g.fillStyle=C.gr;if(full)A.paint.rrect(14,H*.8,mw*full/3,16,8),g.fill();txt(g,`Usefulness: ${full} of 3 specific`,W/2,H*.92,14,C.tx,800)}
 if(m==='cycle'){const cx=W/2,cy=H*.44,r=Math.min(W*.3,H*.3);g.strokeStyle=A.mix(C.tx,C.pn,.5);g.lineWidth=2;g.setLineDash([6,6]);g.beginPath();g.arc(cx,cy,r,0,7);g.stroke();g.setLineDash([]);
  if(S.ring.length===4){const t=(performance.now()/900)%4,a=-Math.PI/2+t*Math.PI/2;A.paint.ball(cx+r*Math.cos(a),cy+r*Math.sin(a),8,C.vi)}
  LOOP.forEach((_,i)=>{const a=-Math.PI/2+i*Math.PI/2,x=cx+r*Math.cos(a),y=cy+r*Math.sin(a),k=S.ring[i];card(x-W*.17,y-17,W*.34,34,k!=null?'#c7d2fe':'#ffffff',k!=null?C.vi:null);txt(g,k!=null?`${i+1}. ${LOOP[k]}`:`${i+1}. ?`,x,y,13,C.tx,800)});
  const left=LOOP.map((l,i)=>i).filter(i=>!S.ring.includes(i));left.forEach((k,j)=>{const x=W*(j+.5)/Math.max(1,left.length);card(x-W*.11,H*.86,W*.22,30,'#fef3c7');txt(g,LOOP[k],x,H*.86+15,11,C.tx,800)})}
 if(m==='grid'){const gx=W*.14,gy=H*.06,gw=W*.82,gh=H*.6;[[0,0,'#fed7aa'],[1,0,'#fde68a'],[0,1,'#bfdbfe'],[1,1,'#bbf7d0']].forEach(([x,y,t])=>card(gx+x*gw/2,gy+(1-y)*gh/2,gw/2-4,gh/2-4,t));
  txt(g,'low score',gx+gw*.25,gy+gh+12,11,C.mu);txt(g,'high score',gx+gw*.75,gy+gh+12,11,C.mu);g.save();g.translate(W*.06,gy+gh/2);g.rotate(-Math.PI/2);txt(g,'knows what to do next →',0,0,11,C.mu);g.restore();
  KIDS.forEach((k,i)=>{let p;if(S.drag&&S.drag.i===i)p=S.drag;else if(S.place[i]>=0){const q=S.place[i];p={x:gx+(q%2+.5)*gw/2+(i%2?16:-16),y:gy+(1-Math.floor(q/2)+.5)*gh/2}}else p={x:W*(i+.5)/4,y:H*.86};
   g.fillStyle=S.sel===i?C.vi:A.mix(C.pn,'#ffffff',C.dark?.15:.9);g.beginPath();g.arc(p.x,p.y,22,0,7);g.fill();g.strokeStyle=C.vi;g.lineWidth=2;g.stroke();txt(g,k[0],p.x,p.y,12,S.sel===i?'#ffffff':C.tx,800)})}
 if(m==='quiz'){glyph(g,'🔍',W/2,H*.3,40);txt(g,'Look back at how you learned, not just the score.',W/2,H*.6,14,C.tx,800)}A.fx.draw(g)}
/* ---------- actions ---------- */
function tagAt(v){if(S.tag.filter(x=>x!=null).length>=6)return;const i=S.at,mo=MOM[i];if(v===mo[2]){S.tag[i]=v;A.sound.pop();tell(`Moment ${i+1}: ${v?'it helped':'it was confusing or slow'}. ${['Seeing a worked example first gave Maya a model.','The picture made the sizes clear.','Guessing wasted time; she did not know the method.','Explaining one step unlocked it.','Both lost marks were in these two questions.','Checking caught a slip.'][i]}`);
  const nx=MOM.findIndex((_,j)=>S.tag[j]==null);if(nx>=0)S.at=nx;S.want()}
 else{A.sound.miss();tell(v?`Look at the evidence: ${mo[1].toLowerCase()}. That cost Maya time or marks, so it did not help.`:`That helped: ${mo[1].toLowerCase()}. A good reflection keeps what worked, too.`)}keys();A.redraw()}
function cycleSlot(i){S.cur[i]=(S.cur[i]+1)%3;const[t,k]=SLOT[i][1][S.cur[i]];A.sound[k==='ok'?'pop':'tick']();tell(k==='ok'?`Specific: "${t}". You can act on that.`:SAY[k]);S.want();keys();A.redraw()}
function ringAdd(k){if(S.ring.includes(k))return;const need=S.ring.length;if(k===need){S.ring.push(k);A.sound.pop();tell(S.ring.length===4?'The cycle is complete: do it, look back, work out why, plan next time, then do it again, better.':`${need+1}. ${LOOP[k]}. What comes next?`);if(S.ring.length===4){const v=ver;A.every(()=>v===ver&&md()==='cycle')}S.want()}
 else{A.sound.miss();tell(k===3&&need<2?'You cannot plan a change until you know why something happened. Look back first.':k===2&&need<1?'Work out why after you look back at what happened.':`${LOOP[k]} is not next. Start by doing the learning, then look back.`)}keys();A.redraw()}
function pick(i){if(S.ran)S.ran=false;const at=S.picks.indexOf(i);if(at>=0)S.picks.splice(at,1);else{if(S.picks.length>=2)S.picks.shift();S.picks.push(i)}A.sound.tick();tell(`Changes: ${S.picks.map(j=>FIX[j][0].slice(3)).join(' and ')||'none'}.`);keys();A.redraw()}
function runTwo(){const gain=S.picks.reduce((s,i)=>s+FIX[i][2],0);S.score=Math.max(0,Math.min(10,8+gain));S.ran=true;A.sound[S.score>8?'pop':'miss']();
 let t=`Session 2: ${S.score}/10. `;if(S.picks.includes(2))t+='Dropping the bar model removed something that helped, so more answers went wrong. ';if(S.picks.includes(3)||!S.picks.length)t+='The same plan repeats the same mistakes. ';if(S.picks.includes(0))t+='Practising common denominators fixed the stuck moment. ';if(S.picks.includes(1))t+='Slowing down saved the last two questions. ';tell(t.trim());S.want();keys();A.redraw()}
function placeKid(i,q){if(i<0)return;const k=KIDS[i],want=k[3]*2+k[2];S.sel=-1;if(q===want){S.place[i]=q;A.sound.pop();tell(`${k[0]}: ${['low score, no next step. "It was bad" tells Kit nothing to change.','high score, but no next step. Luck will not repeat.','low score, but Ava knows exactly what to fix. She will improve.','high score and a clear next step. Sam knows why it worked.'][q]}`);S.want()}
 else{A.sound.miss();tell(k[2]!==q%2?`Check ${k[0]}'s score: ${k[1].split('.')[0]}.`:`Read what ${k[0]} said. Does it name a next step? ${k[1].split('. ').slice(1).join('. ')}`)}keys();A.redraw()}
function quad(p){const gx=A.W*.14,gy=A.H*.06,gw=A.W*.82,gh=A.H*.6;if(p.x<gx||p.x>gx+gw||p.y<gy||p.y>gy+gh)return -1;return(p.x>gx+gw/2?1:0)+(p.y<gy+gh/2?2:0)}
function keys(){if(!pad)return;pad.innerHTML='';const m=md(),B=(t,f)=>{c.el('button',{type:'button',class:'lbtn ghost'},pad,t).onclick=f};
 if(m==='replay'&&S.tag.filter(v=>v!=null).length<6){B('👍 It helped',()=>tagAt(1));B('🤔 It was confusing or slow',()=>tagAt(0));B('Next moment →',()=>{S.at=(S.at+1)%6;tell(`Moment ${S.at+1}: ${MOM[S.at][1]}`);A.redraw()})}
 if(m==='sharp')SLOT.forEach(([l],i)=>B(`Change "${l}"`,()=>cycleSlot(i)));
 if(m==='cycle')LOOP.forEach((l,k)=>{if(!S.ring.includes(k))B(l,()=>ringAdd(k))});
 if(m==='fix'){FIX.forEach((f,i)=>B((S.picks.includes(i)?'✓ ':'')+f[0],()=>pick(i)));B('▶ Run session 2',runTwo)}
 if(m==='grid'){if(S.sel<0)KIDS.forEach((k,i)=>{if(S.place[i]<0)B(`Pick ${k[0]}: ${k[1]}`,()=>{S.sel=i;tell(`${k[0]} picked: ${k[1]} Now pick a box.`);keys();A.redraw()})});
  else ['Low score, no next step','High score, no next step','Low score, knows next step','High score, knows next step'].forEach((t,q)=>B(t,()=>placeKid(S.sel,q)))}}
function down(p){const m=md();
 if(m==='replay'){if(p.y<A.H*.3){S.drag={track:1};move(p);return true}if(p.y>A.H*.66&&p.y<A.H*.86)tagAt(p.x<A.W/2?1:0);return false}
 if(m==='sharp'){const i=Math.floor((p.y-A.H*.04)/(A.H*.25));if(i>=0&&i<3)cycleSlot(i);return false}
 if(m==='cycle'&&p.y>A.H*.8){const left=LOOP.map((l,i)=>i).filter(i=>!S.ring.includes(i));const j=Math.floor(p.x/(A.W/Math.max(1,left.length)));if(left[j]!=null)ringAdd(left[j]);return false}
 if(m==='fix'){const i=Math.floor((p.y-A.H*.3)/(A.H*.13));if(p.y>A.H*.3&&i>=0&&i<4)pick(i);return false}
 if(m==='grid'){const i=KIDS.findIndex((k,j)=>S.place[j]<0&&Math.hypot(p.x-A.W*(j+.5)/4,p.y-A.H*.86)<30);if(i>=0){S.drag={i,x:p.x,y:p.y};return true}if(S.sel>=0){const q=quad(p);if(q>=0)placeKid(S.sel,q)}return false}return false}
function move(p){const d=S.drag;if(!d)return;if(d.track){const i=Math.round((p.x/A.W-.1)/.16);S.at=Math.max(0,Math.min(5,i));tell(`Moment ${S.at+1}: ${MOM[S.at][1]}`)}else{d.x=p.x;d.y=p.y}A.redraw()}
function up(p){const d=S.drag;S.drag=null;if(d&&d.i!=null){const q=quad(p);if(q>=0)placeKid(d.i,q)}A.redraw()}
const ok=(n,f,msg)=>()=>{if(A.step===n&&f()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const fresh=(n,f,msg,t)=>{ver++;Object.assign(S,{at:0,tag:[],cur:[0,0,0],ring:[],picks:[],ran:false,score:8,place:[-1,-1,-1,-1],sel:-1,drag:null});S.want=ok(n,f,msg);tell(t);keys()};
function seq(fs,gap){const k=ver;fs.forEach((f,j)=>setTimeout(()=>{if(k===ver)f()},A.reduced()?j*20+10:j*gap+200))}
const steps=[
{h:'Replay the session',p:'Maya did her fractions homework and scored 8/10. Replay it moment by moment. Drag along the timeline and tag each moment.',
 predict:{q:'Maya got 8/10. Is it worth looking back?',opts:['No, 8 is a good score','Yes: keep what helped and fix what lost marks'],ans:1},task:'Tag all 6 moments',
 show:()=>{steps[0].go();seq(MOM.map(mo=>()=>tagAt(mo[2])),300)},go:()=>fresh(0,()=>S.tag.filter(v=>v!=null).length===6,'Four moments helped and two lost time or marks. The score alone did not show that.','Moment 1: Read the worked example first')},
{h:'Make it specific',p:'A reflection is only useful if you can act on it. Tap each part to change it until the meter is full.',
 predict:{q:'Which reflection helps Maya more next time?',opts:['Fractions are hard. Try harder.','I could not find a common denominator, so I will practise 3 first'],ans:1},task:'Fill the usefulness meter',
 show:()=>{steps[1].go();seq([0,0,1,1,2,2].map(i=>()=>cycleSlot(i)),250)},go:()=>fresh(1,()=>S.cur.every((v,i)=>SLOT[i][1][v][1]==='ok'),'Specific words name the strategy, the confusing step and one action.','A vague reflection. Make it useful.')},
{h:'The reflection cycle',p:'Reflecting is part of a loop. Put the four parts in order, starting with doing the learning.',task:'Build the cycle',
 show:()=>{steps[2].go();seq([0,1,2,3].map(k=>()=>ringAdd(k)),300)},go:()=>fresh(2,()=>S.ring.length===4,'Do it, look back, work out why, plan next time, and go round again.','Which part comes first?')},
{h:'Change what matters',p:'Pick up to 2 changes for session 2, then run it. Watch the timeline.',
 predict:{q:'Which plan will lift Maya’s score most?',opts:['Do it exactly the same','Fix the two moments that went wrong','Skip the bar model to save time'],ans:1},task:'Get 10/10 in session 2',
 show:()=>{steps[3].go();seq([()=>pick(0),()=>pick(1),runTwo],350)},go:()=>fresh(3,()=>S.ran&&S.score===10,'Changing the two weak moments, and keeping what helped, gave 10/10.','Pick the changes for session 2.')},
{h:'Score or next step?',p:'Four pupils finished the same test. Drag each one to a box. Who knows what to do next time?',task:'Place all 4 pupils',
 show:()=>{steps[4].go();seq(KIDS.map((k,i)=>()=>placeKid(i,k[3]*2+k[2])),300)},go:()=>fresh(4,()=>S.place.every(v=>v>=0),'A high score without a reason will not repeat. A low score with a clear next step improves.','Leo, Ava, Sam and Kit finished the test.')},
{h:'Challenge',p:'',go:()=>{ver++;quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['You got 9/10 on a spelling test. What is the most useful reflection?',[['Saying words in syllables helped; I missed "necessary", so I will practise its double s','ok'],['9/10, good','score'],['Spelling is easy','vague']]],
 ['Your science model fell over. What should you reflect on?',[['Why it fell: the base was too narrow, so next time I will widen it','ok'],['The glue was rubbish','blame'],['Nothing, it is finished','late']]],
 ['When is the best time to reflect?',[['Soon after you finish, while you remember','ok'],['A month later','late'],['Never, if you passed','score']]],
 ['What should a reflection include?',[['What helped, what was confusing, and one change','ok'],['Only what went wrong','onlybad'],['Only the mark','score']]],
 ['Your times tables practice went badly again. What next?',[['Change the strategy, like testing myself with cards','ok'],['Do the same thing again','same'],['Decide I am bad at maths','vague']]]];
function why(t){let m='A useful reflection names what helped, what was confusing and one change.';
 if(t==='score')m='The score tells you how it went, not why. Look at how you learned so you know what to keep and change.';
 if(t==='vague')m='Too general to act on. Name the exact step or strategy, like the bar model or the double s.';
 if(t==='blame')m='Blaming something else gives you nothing to change. Ask what you could do differently.';
 if(t==='same')m='The same strategy gives the same result. Reflecting is for choosing a change.';
 if(t==='late')m='Reflect soon after, while you still remember the details, and before the next task.';
 if(t==='onlybad')m='Also note what helped, so you keep doing it. In the lab, skipping the bar model made things worse.';return m}
function quiz(){qn++;const[q,ops]=QS[qn%QS.length],r=qn%3;qb.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=qb.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{c.el('button',{type:'button',class:'lbtn'},row,o).onclick=()=>judge(t)});tell('Challenge: '+q);A.redraw()}
function judge(t){qb.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=qb.querySelector('.fl-fb'),y=t==='ok';if(y){streak++;A.win()}else{streak=0;A.sound.miss()}
 fb.innerHTML=(y?`✓ Yes: specific, about the process, with a next step. ${streak} in a row.`:'✗ '+why(t))+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=quiz}
A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{qb.hidden=A.step!==5;pad.hidden=A.step===5;keys()},
 init:A=>{const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);qb=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up});keys()}});
A.start()})})();
