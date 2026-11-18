/* Flagship – finding knowledge gaps (ages 10–11). Survey a whole topic honestly: label evidence as solid, shaky or a gap,
   test Kai's all-green fractions map and recolour it from the results, choose which gap to fix first (the one other
   parts are built on), and give each colour its own fix. Feeling sure is not evidence; a check without notes is. */
(()=>{
const LV=['Solid','Shaky','Gap'];
const PROOF=[['Got 3 out of 3 right with no notes',0,'3/3, no notes'],['Got it right, but only with my notes open',1,'only with notes'],['Could not even start the question',2,'could not start'],
 ['Got 2 of 3 and mixed up which number goes on the bottom',1,'2/3 with a slip'],['Explained it to a friend, then got a new question right',0,'taught it'],['Have never seen this word before',2,'never seen it']];
const HINT=['Solid needs proof: right answers with no help, more than once.','Shaky means some of it works, but only with help or with slips.','A gap means you cannot do it yet, even with help.'];
const MAP=[['Equivalent fractions','2 of 3 right, only with notes',1],['Comparing fractions','3 of 3 right, no notes',0],['Adding, same denominator','3 of 3 right, no notes',0],
 ['Adding, different denominators','Could not start any question',2],['Fraction of an amount','3 of 3 right, no notes',0],['Mixed numbers','1 of 3, mixed up wholes and parts',1]];
const FIRST=[{t:'Kai’s fractions map',o:[['Equivalent fractions (shaky)','Adding with different denominators needs it'],['Adding, different denominators (gap)','built on equivalent fractions'],['Comparing fractions (solid)','already solid']],a:0,
  no:['','This gap is built on equivalent fractions, which is still shaky. Fix the base first or the new work will not stick.','It is already solid. Practising what you know feels good but closes no gap.']},
 {t:'Ella’s times tables map',o:[['Division facts for 7 (gap)','uses the 7 times table'],['7 times table (gap)','division facts are built on it'],['2 times table (solid)','already solid']],a:1,
  no:['Division facts for 7 are the 7 times table done backwards. Learn the 7s first.','','The 2s are solid. Time spent there leaves both gaps open.']},
 {t:'Sam’s test is tomorrow on area',o:[['Area of rectangles (solid)','in the test'],['Volume of cubes (gap)','not in the test'],['Area of triangles (shaky)','in the test, uses rectangles']],a:2,
  no:['Already solid. Use a quick check, not your whole evening.','A real gap, but not in tomorrow’s test and not needed for it. Plan it for later.','']}];
const FIX=[['Plan a quick mixed check next week, so it stays solid',0,'check next week'],['Do practice questions with notes closed, then mark them',1,'practise, notes shut'],['Learn it again from a worked example, then ask for help',2,'relearn with help']];
VIS.reg('flaggapmap',c=>{let A,keys,quizBox,qx=-1,epoch=0,good=0;
const base=()=>({k:0,n:0,goal:3,bad:-1,done:[],open:-1,lab:[],hold:null,hits:[],cb:()=>{},rush:0}),S=base();
const view=()=>['label','test','first','plan','own','quiz'][A.step];
const u=v=>Math.round(v*(A.narrow?1:1.1)),quick=()=>A.reduced()||S.rush;
const say=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
const tint=i=>[A.col.gr,A.col.am,A.col.rd][i];
function write(g,t,x,y,w,px,col,wt){g.font=`${wt||700} ${u(px)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const rows=[];let line='';for(const w0 of String(t).split(' ')){const tryL=line?line+' '+w0:w0;if(line&&g.measureText(tryL).width>w){rows.push(line);line=w0}else line=tryL}rows.push(line);
 rows.forEach((r,i)=>g.fillText(r,x,y+(i-(rows.length-1)/2)*u(px)*1.24))}
function tile(g,r,hue,edge){const C=A.col;g.save();A.paint.shadow(6,2,.12);g.fillStyle=hue==null?C.pn:A.mix(C.pn,hue,.17);A.paint.rrect(r.x,r.y,r.w,r.h,12);g.fill();A.paint.noShadow();
 g.lineWidth=edge||(hue==null?1.5:3);g.strokeStyle=hue==null?C.ln:hue;A.paint.rrect(r.x,r.y,r.w,r.h,12);g.stroke();g.restore()}
const cols3=(y,h)=>{const gp=8,w=(A.W-24-2*gp)/3;return[0,1,2].map(i=>({x:12+i*(w+gp),y,w,h}))};
/* six map tiles: 2 columns on phones, 3 on wide screens */
function mapCells(){const n=A.narrow?2:3,gp=8,w=(A.W-24-gp*(n-1))/n,h=A.narrow?u(62):u(70),y0=A.H*.15;return MAP.map((_,i)=>({x:12+(i%n)*(w+gp),y:y0+Math.floor(i/n)*(h+gp),w,h}))}
const floater=()=>{const w=Math.min(A.W*.8,u(320)),h=u(76),d=S.hold;return{x:(d&&d.x!=null?d.x:A.W/2)-w/2,y:(d&&d.x!=null?d.y:A.H*.28)-h/2,w,h}};
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,v=view();
 if(v==='quiz'){write(g,'Feeling sure is not proof. Test each part, then fix the base first.',W/2,H*.45,W-40,18,C.tx,800);return}
 if(v==='label'||v==='plan'){const lanes=cols3(H*.56,H*.4);S.hits=lanes;write(g,v==='label'?'What does this proof show? Drag it to Solid, Shaky or Gap.':'Give each colour its own fix. Drag the fix to its colour.',W/2,H*.06,W-30,15,C.tx,800);
  lanes.forEach((r,i)=>{tile(g,r,S.bad===i?C.rd:tint(i),2.5);write(g,LV[i],r.x+r.w/2,r.y+u(18),r.w-8,15,C.tx,900);
   const list=v==='label'?PROOF:FIX;S.done.filter(j=>list[j][1]===i).forEach((j,m)=>write(g,'✓ '+list[j][2],r.x+r.w/2,r.y+u(50)+m*u(36),r.w-8,12,C.tx,700))});
  const list=v==='label'?PROOF:FIX;if(S.n<S.goal){const r=floater();tile(g,r,null,2.5);write(g,list[S.k][0],r.x+r.w/2,r.y+r.h/2,r.w-20,15,C.tx,800)}}
 if(v==='test'){write(g,S.n<6?'Kai felt sure of everything. Tap a part to test it, then label it.':'Kai’s real map: 3 solid, 2 shaky, 1 gap.',W/2,H*.06,W-24,15,S.n<6?C.tx:C.gr,800);
  const cells=mapCells();cells.forEach((r,i)=>{const lab=S.lab[i],live=S.open===i;tile(g,r,lab!=null?tint(lab):live?C.cy:C.gr,live?3.5:2);
   write(g,MAP[i][0],r.x+r.w/2,r.y+r.h*(lab!=null||live?.3:.5),r.w-10,12,C.tx,800);
   if(lab!=null||live)write(g,(lab!=null?LV[lab]+': ':'')+MAP[i][1],r.x+r.w/2,r.y+r.h*.72,r.w-10,10,C.tx,600);else write(g,'feels sure',r.x+r.w-u(34),r.y+u(10),u(70),9,C.tx,600)});
  if(S.open>=0){const b=cols3(H*.8,u(56));S.hits=b;b.forEach((r,i)=>{tile(g,r,S.bad===i?C.rd:tint(i),2.5);write(g,LV[i],r.x+r.w/2,r.y+r.h/2,r.w-8,16,C.tx,900)})}else S.hits=[]}
 if(v==='first'){const f=FIRST[S.k];write(g,f.t+': which part should be fixed first?',W/2,H*.07,W-24,15,C.tx,800);
  const gp=10,h=u(70),cards=f.o.map((_,i)=>({x:12,y:H*.2+i*(h+gp),w:W-24,h}));S.hits=cards;
  cards.forEach((r,i)=>{const pick=S.open===i;tile(g,r,pick?C.gr:S.bad===i?C.rd:null,pick||S.bad===i?3:1.5);write(g,f.o[i][0],r.x+r.w/2,r.y+r.h*.36,r.w-16,14,C.tx,800);write(g,f.o[i][1],r.x+r.w/2,r.y+r.h*.72,r.w-16,12,C.mu,600)});
  if(S.open>=0)write(g,'✓ Fix the part the others are built on, or the part you need soonest.',W/2,H*.2+3*(h+gp)+u(20),W-24,13,C.gr,800)}
 if(v==='own'){const L=['1. List the parts','2. Test each, notes closed','3. Colour: solid, shaky, gap','4. Fix the base first'],cx=W/2,cy=H*.45,R=Math.min(W*.36,H*.3);
  g.strokeStyle=A.alpha(C.cy,.7);g.lineWidth=3;g.setLineDash([6,6]);g.beginPath();g.arc(cx,cy,R,0,7);g.stroke();g.setLineDash([]);write(g,'↻ Then test again in a week',cx,Math.min(H-u(16),cy+R+u(52)),W-30,14,C.tx,800);
  L.forEach((t,i)=>{const a=-Math.PI/2+i*Math.PI/2,x=cx+R*Math.cos(a),y=cy+R*Math.sin(a),w=Math.min(W*.42,u(170)),r={x:Math.max(6,Math.min(W-6-w,x-w/2)),y:y-u(26),w,h:u(52)};tile(g,r,[C.vi,C.cy,C.am,C.gr][i],2.5);write(g,t,r.x+r.w/2,r.y+r.h/2,r.w-10,12,C.tx,800)})}
 A.fx.draw(g)}
function wrong(t,j){A.sound.miss();S.bad=j;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},quick()?10:1300);A.redraw()}
function point(t){S.n++;A.sound.pop();say(t);pads();A.redraw();S.cb()}
function place(i){const v=view(),list=v==='label'?PROOF:FIX;if((v!=='label'&&v!=='plan')||S.n>=S.goal)return;const d=list[S.k];
 if(i!==d[1])return wrong(v==='label'?`Not ${LV[i].toLowerCase()}. ${HINT[d[1]]}`:`That fix suits a ${LV[d[1]].toLowerCase()} part, not a ${LV[i].toLowerCase()} one.`,i);
 S.done.push(S.k);S.k++;point(`${LV[i]}: ${d[0]}.`+(S.n+1<S.goal?' Next card.':''))}
function probe(i){if(view()!=='test'||S.lab[i]!=null||S.n>=6)return;S.open=i;A.sound.tick();say(`${MAP[i][0]}: Kai's check says ${MAP[i][1]}. Is it solid, shaky or a gap?`);pads();A.redraw()}
function grade(l){if(view()!=='test'||S.open<0)return;const m=MAP[S.open];if(l!==m[2])return wrong(`Not ${LV[l].toLowerCase()}. ${m[1]}. ${HINT[m[2]]}`,l);
 S.lab[S.open]=l;S.open=-1;point(`${m[0]} is ${LV[l].toLowerCase()}.`+(S.n+1<6?' Test another part.':''))}
function priority(i){if(view()!=='first'||S.open>=0)return;const f=FIRST[S.k];if(i!==f.a)return wrong(f.no[i],i);S.open=i;const was=S.k,ep=epoch;
 point(`Yes: ${f.o[i][0]} first.`);if(S.n<S.goal)setTimeout(()=>{if(ep!==epoch||S.k!==was)return;S.k++;S.open=-1;say('Next map.');pads();A.redraw()},quick()?5:1500)}
function pads(){if(!keys)return;keys.innerHTML='';const v=view(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);b.onclick=f};
 if(v==='quiz'||S.n>=S.goal)return;
 if(v==='label'||v==='plan'){const t=(v==='label'?PROOF:FIX)[S.k][0];LV.forEach((n,i)=>B(n,()=>place(i),t+': '+n))}
 if(v==='test'){if(S.open<0)MAP.forEach((m,i)=>{if(S.lab[i]==null)B('Test '+m[0],()=>probe(i))});else LV.forEach((n,i)=>B(n,()=>grade(i),MAP[S.open][0]+' is '+n))}
 if(v==='first'&&S.open<0)FIRST[S.k].o.forEach((o,i)=>B(o[0],()=>priority(i),'Fix first: '+o[0]))}
const inBox=(p,r,m)=>(m=m||0,p.x>r.x-m&&p.x<r.x+r.w+m&&p.y>r.y-m&&p.y<r.y+r.h+m);
function down(p){const v=view();if(v==='quiz'||S.n>=S.goal)return false;
 if((v==='label'||v==='plan')&&inBox(p,floater(),6)){S.hold={x:null,x0:p.x,y0:p.y};return true}
 if(v==='test'){const j=mapCells().findIndex(r=>inBox(p,r,2));if(j>=0&&S.open<0){probe(j);return false}}
 const i=S.hits.findIndex(r=>inBox(p,r,3));if(i<0)return false;
 if(v==='label'||v==='plan')place(i);if(v==='test')grade(i);if(v==='first')priority(i);return false}
function move(p){const d=S.hold;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.hold;S.hold=null;if(!d)return;if(d.x==null){say('Drag the card onto a colour, or tap a colour.');return A.redraw()}
 const i=S.hits.findIndex(r=>inBox(p,r,16));if(i>=0)place(i);else{say('Drop the card on Solid, Shaky or Gap.');A.redraw()}}
const settle=(i,msg)=>()=>{if(A.step===i&&S.n>=S.goal&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function runAuto(f){const k=++epoch,go=()=>{if(k!==epoch||S.n>=S.goal)return;f();setTimeout(go,60)};setTimeout(go,30)}
const reset=()=>{epoch++;Object.assign(S,base())};
function nextMove(){const v=view();if(v==='label')return place(PROOF[S.k][1]);if(v==='plan')return place(FIX[S.k][1]);
 if(v==='test'){if(S.open<0)return probe(S.lab.length<6?MAP.findIndex((_,i)=>S.lab[i]==null):-1);return grade(MAP[S.open][2])}if(v==='first'&&S.open<0)return priority(FIRST[S.k].a)}
const show=i=>()=>{steps[i].go();S.rush=1;runAuto(nextMove)};
const steps=[
{h:'Solid, shaky or gap?',p:'To find your gaps, look at proof, not at how sure you feel. Solid: right with no help. Shaky: only with help, or with slips. Gap: cannot do it yet.',predict:{q:'Rana re-read her notes and they felt easy. Is that part solid?',opts:['Yes, it feels familiar','Not yet: she needs to test herself'],ans:1},task:'Sort 6 proof cards',show:show(0),
 go:()=>{reset();S.goal=6;say('Drag each proof card to Solid, Shaky or Gap, or tap a colour.');pads();S.cb=settle(0,'Only right answers without help count as solid. Familiar notes can feel like knowing when they are not.')}},
{h:'Test the whole map',p:'Kai rated every part of fractions green because it all felt fine. Test each part, read the result, and give it its real colour.',predict:{q:'Kai felt sure about all 6 parts. How many will turn out solid?',opts:['All 6','Only some of them'],ans:1},task:'Test and label 6 parts',show:show(1),
 go:()=>{reset();S.goal=6;say('Tap a part of Kai’s map to test it.');pads();S.cb=settle(1,'Kai’s real map has 3 solid parts, 2 shaky ones and 1 gap. A survey of the whole topic finds parts a feeling misses.')}},
{h:'Which gap first?',p:'You cannot fix everything at once. Pick the part the others are built on, or the part you need soonest.',task:'Choose for 3 maps',show:show(2),
 go:()=>{reset();say('Which part should be fixed first? Tap a card.');pads();S.cb=settle(2,'Fix the base first: a shaky part under a gap, or the part your next test needs.')}},
{h:'A fix for each colour',p:'Each colour needs a different fix. Drag each fix to the colour it suits.',predict:{q:'Is reading the whole topic again the best fix for every part?',opts:['Yes, re-read everything','No, each colour needs its own fix'],ans:1},task:'Match 3 fixes',show:show(3),
 go:()=>{reset();say('Drag each fix to Solid, Shaky or Gap.');pads();S.cb=settle(3,'Solid: a quick check later. Shaky: practice with notes closed. Gap: learn it again with help.')}},
{h:'Your own map',p:'Now try it on a topic of yours. List its parts, test each one with notes closed, colour it by the results, and fix the base first. Then test again in a week.',go:()=>{reset();say('The gap-finding loop: list the parts, test each with notes closed, colour them, fix the base first, then test again.')}},
{h:'Challenge',p:'',go:()=>{reset();quizNext()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.cb()});
const QS=[['You re-read a chapter and it feels easy. What does that tell you?',[['Not much yet: test yourself with notes closed','ok'],['That you know it all','easy'],['That you can stop studying it','stop']]],
 ['Which is the best proof that a part is solid?',[['You get new questions right with no notes','ok'],['You highlighted all of it','marker'],['The teacher explained it well','heard']]],
 ['Adding fractions with different denominators is a gap, and equivalent fractions is shaky. Fix which first?',[['Equivalent fractions','ok'],['Adding with different denominators','top'],['The solid parts, to feel good','comfort']]],
 ['Mo got 2 of 3 right with his notes open. How should he label it?',[['Shaky','ok'],['Solid','solid'],['Gap','gap']]],
 ['What is a knowledge gap?',[['A part you cannot do yet','ok'],['A part you will never be able to do','never'],['Something only weak learners have','weak']]]];
function why(t){let m='Test each part with notes closed, colour it by the results, then fix the base first.';
 if(t==='easy')m='Familiar is not the same as known. Re-reading makes notes feel easy; only a test without notes shows what you can do.';if(t==='stop')m='Feeling easy is not proof. Test yourself first, then decide.';
 if(t==='marker')m='Highlighting shows you read it, not that you can use it. Answer questions without notes.';if(t==='heard')m='A clear explanation helps, but it is the teacher’s knowledge. Test your own.';
 if(t==='top')m='The gap is built on equivalent fractions. While that is shaky, the new work will not stick.';if(t==='comfort')m='Practising solid parts feels good but closes no gap.';
 if(t==='solid')m='Solid means right with no help. With notes open and one slip, it is shaky.';if(t==='gap')m='He got 2 right, so it is not a gap. With help and a slip it is shaky.';
 if(t==='never')m='A gap means not yet. With the right fix it can become solid.';if(t==='weak')m='Everyone has gaps. Strong learners find theirs on purpose.';return m}
function quizNext(){qx++;const[q,ops]=QS[qx%QS.length],sh=qx%3;quizBox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');ops.slice(sh).concat(ops.slice(0,sh)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
function judge(t){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=t==='ok';if(ok){good++;A.win()}else{good=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Right.':'✗ '+why(t)}${ok?` Stars in a row: ${good}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quizNext}
A=FK.shell(c,{steps,ratio:.66,tall:1.35,draw,onStep:A=>{quizBox.hidden=A.step!==5;keys.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quizBox=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pads()}});
A.start()})})();
