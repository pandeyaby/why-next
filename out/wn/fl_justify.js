/* Flagship – justifying steps in solving equations (ages 14–16). Every line of a solution needs a reason: tag each step
   with the property of equality it uses, find the one invalid step in three broken chains (divide by x, divide by zero,
   multiply by 0), sort moves by whether they keep the solution set, order a shuffled solution, and run a chain backwards
   to see why the method works: each step is reversible, so every line has the same solutions. */
(()=>{
const TAGS=[['Distributive property','Distributive'],['Combine like terms','Like terms'],['Subtraction property of equality','Subtract (=)'],['Addition property of equality','Add (=)'],['Division property of equality','Divide (=)']];
const EQ=[['5(x − 1) + 2 = 2x + 9','Given'],['5x − 5 + 2 = 2x + 9','the bracket has been multiplied out'],['5x − 3 = 2x + 9','−5 and +2 became −3, on the left side only'],
 ['3x − 3 = 9','2x has gone from both sides'],['3x = 12','the −3 has gone from both sides'],['x = 4','both sides are a third of what they were, and 3 is not 0']];
const SPOT=[{t:'Solve x² = 3x',L:[['x² = 3x','given'],['x = 3','divide both sides by x'],['So the only solution is x = 3','conclusion']],bad:1,
  fix:'x could be 0, and you cannot divide by 0. Factorise instead: x(x − 3) = 0, so x = 0 or x = 3. This step lost x = 0.'},
 {t:'A “proof” that 2 = 1, starting from a = b',L:[['a = b','given'],['a² = ab','multiply both sides by a'],['a² − b² = ab − b²','subtract b² from both sides'],['(a + b)(a − b) = b(a − b)','factorise both sides'],['a + b = b','divide both sides by (a − b)'],['2b = b, so 2 = 1','substitute a = b']],bad:4,
  fix:'Since a = b, a − b is 0. Dividing both sides by zero is undefined, so the chain breaks here.'},
 {t:'Solve x + 1 = 5',L:[['x + 1 = 5','given'],['0(x + 1) = 0 × 5','multiply both sides by 0'],['0 = 0, so every x works','simplify']],bad:1,
  fix:'Multiplying by 0 makes both sides 0, so it cannot be undone. Only x = 4 works: 4 + 1 = 5.'}];
const KEEP=[['Add 7 to both sides',0,'+ 7','Adding 7 is undone by subtracting 7, so the solutions stay the same.'],['Multiply both sides by 0',1,'× 0','Multiplying by 0 turns both sides into 0, so every x fits. It cannot be undone.'],
 ['Subtract 2x from both sides',0,'− 2x','Subtracting 2x is undone by adding 2x. An expression works just like a number here.'],['Divide both sides by (x − 2)',1,'÷ (x − 2)','If x = 2 this divides by 0, so a solution can be lost.'],
 ['Multiply both sides by 4',0,'× 4','Multiplying by 4 is undone by dividing by 4, so nothing is gained or lost.'],['Square both sides',1,'square','Squaring can add a root: x = 3 becomes x² = 9, and x = −3 fits that too.']];
const ORD=[['4x + 8 = 2x − 6','distributive property'],['2x + 8 = −6','subtract 2x from both sides'],['2x = −14','subtract 8 from both sides'],['x = −7','divide both sides by 2']],SHUF=[2,0,3,1];
const UNDO=[{f:'x = 4',t:'3x = 12',a:0,o:['Multiply both sides by 3','Add 3 to both sides','Divide both sides by 3'],no:['','Adding 3 gives x + 3 = 7, not 3x = 12. The last step divided by 3.','That divides again. To undo ÷ 3, multiply by 3.']},
 {f:'3x = 12',t:'3x − 3 = 9',a:1,o:['Add 3 to both sides','Subtract 3 from both sides','Divide both sides by 3'],no:['That adds 3, giving 3x + 3 = 15. The step you are undoing added 3, so subtract 3.','','Dividing gives x = 4 again. You need to bring back the −3.']},
 {f:'3x − 3 = 9',t:'5x − 3 = 2x + 9',a:2,o:['Subtract 2x from both sides','Multiply both sides by 5','Add 2x to both sides'],no:['That takes 2x away again. To undo − 2x, add 2x.','× 5 would make 15x − 15 = 45. Only one move undoes − 2x.','']}];
const LK=['Keeps solutions','Can change them'];
VIS.reg('flagjustify',c=>{let A,keys,quizBox,qx=-1,epoch=0,good=0;
const base=()=>({k:0,n:0,goal:3,bad:-1,done:[],open:-1,hold:null,hits:[],cb:()=>{},rush:0}),S=base();
const view=()=>['tag','spot','keep','order','undo','quiz'][A.step];
const u=v=>Math.round(v*(A.narrow?1:1.1)),quick=()=>A.reduced()||S.rush;
const say=t=>{c.say(t);A.cv.setAttribute('aria-label',t)};
function write(g,t,x,y,w,px,col,wt){g.font=`${wt||700} ${u(px)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;
 const rows=[];let line='';for(const w0 of String(t).split(' ')){const tryL=line?line+' '+w0:w0;if(line&&g.measureText(tryL).width>w){rows.push(line);line=w0}else line=tryL}rows.push(line);
 rows.forEach((r,i)=>g.fillText(r,x,y+(i-(rows.length-1)/2)*u(px)*1.22))}
function tile(g,r,hue,edge){const C=A.col;g.save();A.paint.shadow(6,2,.12);g.fillStyle=hue==null?C.pn:A.mix(C.pn,hue,.17);A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fill();A.paint.noShadow();
 g.lineWidth=edge||(hue==null?1.5:3);g.strokeStyle=hue==null?C.ln:hue;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();g.restore()}
const rowsAt=(n,y0,y1)=>{const gp=5,h=Math.min(u(46),(y1-y0-gp*(n-1))/n);return Array.from({length:n},(_,i)=>({x:12,y:y0+i*(h+gp),w:A.W-24,h}))};
const grid=(n,y,cols,h)=>{const gp=8,w=(A.W-24-gp*(cols-1))/cols;return Array.from({length:n},(_,i)=>({x:12+(i%cols)*(w+gp),y:y+Math.floor(i/cols)*(h+gp),w,h}))};
function line(g,r,math,why,hue,edge){tile(g,r,hue,edge);const sp=r.w*.52;write(g,math,r.x+sp/2,r.y+r.h/2,sp-10,14,A.col.tx,800);write(g,why,r.x+sp+(r.w-sp)/2,r.y+r.h/2,r.w-sp-10,11,A.col.mu,600)}
const tagTiles=()=>grid(5,A.H*.66,A.narrow?3:5,u(50)),tagRows=()=>rowsAt(6,A.H*.12,A.H*.62);
const ordRows=()=>rowsAt(4,A.H*.17,A.H*.55),ordCards=()=>grid(4,A.H*.62,2,u(54));
const floater=()=>{const w=Math.min(A.W*.8,u(300)),h=u(60),d=S.hold;return{x:(d&&d.x!=null?d.x:A.W/2)-w/2,y:(d&&d.x!=null?d.y:A.H*.3)-h/2,w,h}};
function ghost(g,t){const d=S.hold;if(!d||d.x==null)return;const r={x:d.x-u(70),y:d.y-u(22),w:u(140),h:u(44)};tile(g,r,A.col.cy,3);write(g,t,d.x,d.y,r.w-10,12,A.col.tx,800)}
function draw(A){const g=A.ctx,C=A.col,W=A.W,H=A.H,v=view();
 if(v==='quiz'){write(g,'Every line needs a reason. Only reversible steps keep the same solutions.',W/2,H*.45,W-40,18,C.tx,800);return}
 if(v==='tag'){write(g,S.n<5?'Which property turns the line above into the highlighted line?':'Every line is justified.',W/2,H*.05,W-24,15,S.n<5?C.tx:C.gr,800);
  tagRows().forEach((r,i)=>{const got=i===0||S.done.includes(i),live=i===S.n+1&&S.n<5;line(g,r,EQ[i][0],i===0?'Given':got?TAGS[i-1][0]:live?'? drag a reason here':'',live?(S.bad>=0?C.rd:C.cy):got?C.gr:null,live?3.5:2)});
  S.hits=tagTiles();S.hits.forEach((r,i)=>{tile(g,r,S.bad===i?C.rd:C.vi,2);write(g,TAGS[i][1],r.x+r.w/2,r.y+r.h/2,r.w-8,13,C.tx,800)});ghost(g,S.hold?TAGS[S.hold.i][1]:'')}
 if(v==='spot'){const p=SPOT[S.k];write(g,p.t+': tap the one invalid step.',W/2,H*.05,W-24,15,C.tx,800);const rs=rowsAt(p.L.length,H*.12,H*(S.open>=0?.66:.84));S.hits=rs;
  rs.forEach((r,i)=>{const bad=S.open===i;line(g,r,p.L[i][0],(bad?'✗ ':'')+p.L[i][1],bad?C.rd:S.bad===i?C.am:null,bad||S.bad===i?3:1.5)});
  if(S.open>=0)write(g,p.fix,W/2,H*.82,W-30,13,C.tx,700)}
 if(v==='keep'){const ln=grid(2,H*.56,2,H*.4);S.hits=ln;write(g,'Does this move keep exactly the same solutions? Drag it to a side.',W/2,H*.06,W-30,15,C.tx,800);
  ln.forEach((r,i)=>{tile(g,r,S.bad===i?C.rd:[C.gr,C.am][i],2.5);write(g,LK[i],r.x+r.w/2,r.y+u(18),r.w-8,14,C.tx,900);
   S.done.filter(j=>KEEP[j][1]===i).forEach((j,m)=>write(g,'✓ '+KEEP[j][2],r.x+r.w/2,r.y+u(48)+m*u(30),r.w-8,13,C.tx,700))});
  if(S.n<S.goal){const r=floater();tile(g,r,null,2.5);write(g,KEEP[S.k][0],r.x+r.w/2,r.y+r.h/2,r.w-20,15,C.tx,800)}}
 if(v==='order'){write(g,'Solve 4(x + 2) = 2x − 6. Tap or drag the line that comes next.',W/2,H*.05,W-24,15,C.tx,800);write(g,'4(x + 2) = 2x − 6   (given)',W/2,H*.12,W-24,14,C.mu,800);
  ordRows().forEach((r,i)=>{const got=i<S.n;if(got)line(g,r,ORD[i][0],ORD[i][1],C.gr,2);else{g.save();g.setLineDash([5,5]);g.strokeStyle=i===S.n?C.cy:C.ln;g.lineWidth=2;A.paint.rrect(r.x,r.y,r.w,r.h,10);g.stroke();g.restore();if(i===S.n)write(g,'next line goes here',r.x+r.w/2,r.y+r.h/2,r.w-10,12,C.mu,600)}});
  S.hits=ordCards();S.hits.forEach((r,i)=>{const j=SHUF[i];if(j<S.n)return;tile(g,r,S.bad===i?C.rd:C.vi,2);write(g,ORD[j][0],r.x+r.w/2,r.y+r.h/2,r.w-8,14,C.tx,800)});ghost(g,S.hold?ORD[SHUF[S.hold.i]][0]:'')}
 if(v==='undo'){const q=UNDO[Math.min(S.k,2)];write(g,S.n<3?'Run the solution backwards. Which move undoes the step?':'Back to the start: every step undid cleanly.',W/2,H*.05,W-24,15,S.n<3?C.tx:C.gr,800);
  const ch=['x = 4','3x = 12','3x − 3 = 9','5x − 3 = 2x + 9'],rs=rowsAt(4,H*.12,H*.6);
  rs.forEach((r,i)=>{const live=i===S.n+1&&S.n<3,got=i<=S.n;tile(g,r,got?C.gr:live?C.cy:null,live?3.5:2);write(g,(got||live?'':'? ')+(got||live?ch[i]:''),r.x+r.w*.3,r.y+r.h/2,r.w*.55,14,C.tx,800);
   if(i>0&&i<=S.n)write(g,'↓ '+UNDO[i-1].o[UNDO[i-1].a],r.x+r.w*.76,r.y+r.h/2,r.w*.44,11,C.mu,600)});
  if(S.n<3){S.hits=grid(3,H*.66,A.narrow?1:3,u(A.narrow?38:56));S.hits.forEach((r,i)=>{tile(g,r,S.bad===i?C.rd:C.vi,2);write(g,q.o[i],r.x+r.w/2,r.y+r.h/2,r.w-10,13,C.tx,800)})}else S.hits=[]}
 A.fx.draw(g)}
function wrong(t,j){A.sound.miss();S.bad=j;say(t);setTimeout(()=>{S.bad=-1;A.redraw()},quick()?10:1400);A.redraw()}
function point(t){S.n++;A.sound.pop();say(t);pads();A.redraw();S.cb()}
function tag(i){if(view()!=='tag'||S.n>=5)return;const k=S.n+1;if(i!==k-1)return wrong(`${TAGS[i][0]} does not make this line. Compare it with the line above: ${EQ[k][1]}.`,i);
 S.done.push(k);point(`${EQ[k][0]}: ${TAGS[i][0]}.`+(S.n<4?' Next line.':''))}
function spot(i){if(view()!=='spot'||S.open>=0)return;const p=SPOT[S.k];
 if(i!==p.bad)return wrong(i===0?'That line is given, so it needs no proof. Look for a step that divides or multiplies by something.':S.k===1&&i===5?'This line has a problem too, but an earlier step already broke the chain. Find the first one.':`“${p.L[i][1]}” is valid: it keeps both sides equal and can be undone. Look for a step that divides or multiplies by something that could be 0.`,i);
 S.open=i;const was=S.k,ep=epoch;point('Found it: '+p.L[i][1]+'. '+p.fix);if(S.n<S.goal)setTimeout(()=>{if(ep!==epoch||S.k!==was)return;S.k++;S.open=-1;say('Next chain.');pads();A.redraw()},quick()?5:2600)}
function keep(i){if(view()!=='keep'||S.n>=S.goal)return;const d=KEEP[S.k];if(i!==d[1])return wrong(d[3],i);S.done.push(S.k);S.k++;point(`${LK[i]}: ${d[0]}. ${d[3]}`)}
function order(i){if(view()!=='order'||S.n>=4)return;const j=SHUF[i];if(j<S.n)return;const prev=S.n?ORD[S.n-1][0]:'4(x + 2) = 2x − 6';
 if(j!==S.n)return wrong(`${ORD[j][0]} skips a step. From ${prev}, what one move comes next?`,i);point(`${ORD[j][0]}: ${ORD[j][1]}.`)}
function undo(i){if(view()!=='undo'||S.n>=3)return;const q=UNDO[S.k];if(i!==q.a)return wrong(q.no[i],i);S.k++;point(`${q.o[i]} takes ${q.f} back to ${q.t}.`)}
function pads(){if(!keys)return;keys.innerHTML='';const v=view(),B=(t,f,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);b.onclick=f};
 if(v==='quiz'||S.n>=S.goal)return;
 if(v==='tag')TAGS.forEach((t,i)=>B(t[1],()=>tag(i),EQ[S.n+1][0]+': '+t[0]));
 if(v==='spot'&&S.open<0)SPOT[S.k].L.forEach((l,i)=>B(l[0],()=>spot(i),'Invalid step: '+l[0]+', '+l[1]));
 if(v==='keep')LK.forEach((n,i)=>B(n,()=>keep(i),KEEP[S.k][0]+': '+n));
 if(v==='order')SHUF.forEach((j,i)=>{if(j>=S.n)B(ORD[j][0],()=>order(i),'Next line: '+ORD[j][0])});
 if(v==='undo')UNDO[S.k].o.forEach((o,i)=>B(o,()=>undo(i),'Undo with: '+o))}
const inBox=(p,r,m)=>(m=m||0,p.x>r.x-m&&p.x<r.x+r.w+m&&p.y>r.y-m&&p.y<r.y+r.h+m);
function down(p){const v=view();if(v==='quiz'||S.n>=S.goal)return false;
 if(v==='keep'&&inBox(p,floater(),6)){S.hold={x:null,x0:p.x,y0:p.y};return true}
 const i=S.hits.findIndex(r=>inBox(p,r,3));if(i<0)return false;
 if(v==='tag'||v==='order'){if(v==='order'&&SHUF[i]<S.n)return false;S.hold={i,x:null,x0:p.x,y0:p.y};return true}
 if(v==='keep')keep(i);if(v==='spot')spot(i);if(v==='undo')undo(i);return false}
function move(p){const d=S.hold;if(!d)return;if(d.x!=null||Math.hypot(p.x-d.x0,p.y-d.y0)>8){d.x=p.x;d.y=p.y;A.redraw()}}
function up(p){const d=S.hold,v=view();S.hold=null;if(!d)return;
 if(v==='keep'){if(d.x==null){say('Drag the card to a side, or tap a side.');return A.redraw()}const i=S.hits.findIndex(r=>inBox(p,r,16));if(i>=0)keep(i);else{say('Drop the card on Keeps solutions or Can change them.');A.redraw()}return}
 const tgt=v==='tag'?tagRows()[S.n+1]:ordRows()[S.n];if(d.x==null||(tgt&&inBox(p,tgt,14)))return v==='tag'?tag(d.i):order(d.i);say('Drop it on the highlighted line.');A.redraw()}
const settle=(i,msg)=>()=>{if(A.step===i&&S.n>=S.goal&&(!steps[i].predict||A.pred[i]!=null))A.done(msg+A.reveal(i))};
function runAuto(f){const k=++epoch,go=()=>{if(k!==epoch||S.n>=S.goal)return;f();setTimeout(go,60)};setTimeout(go,30)}
const reset=()=>{epoch++;Object.assign(S,base())};
function nextMove(){const v=view();if(v==='tag')return tag(S.n);if(v==='spot'&&S.open<0)return spot(SPOT[S.k].bad);if(v==='keep')return keep(KEEP[S.k][1]);
 if(v==='order')return order(SHUF.indexOf(S.n));if(v==='undo')return undo(UNDO[S.k].a)}
const show=i=>()=>{steps[i].go();S.rush=1;runAuto(nextMove)};
const steps=[
{h:'A reason for every line',p:'Each line of a solution must follow from the one above. Its reason is a property: the distributive property, combining like terms, or a property of equality (do the same to both sides).',predict:{q:'Does every line of a solution need its own reason?',opts:['Only the hard lines','Yes, every line'],ans:1},task:'Justify 5 lines',show:show(0),
 go:()=>{reset();S.goal=5;say('Drag a reason onto the highlighted line, or tap a reason.');pads();S.cb=settle(0,'Distributive, like terms, then subtraction, addition and division properties of equality. A reason names exactly what changed.')}},
{h:'Spot the invalid step',p:'Doing the same to both sides is not always safe. Each chain has one step that breaks it. Find it.',predict:{q:'Is dividing both sides by x always a valid step?',opts:['Yes, it is the same on both sides','No, not if x could be 0'],ans:1},task:'Find 3 bad steps',show:show(1),
 go:()=>{reset();say('Tap the one invalid step.');pads();S.cb=settle(1,'Dividing by an expression that could be 0, or multiplying by 0, breaks the chain. You lose or invent solutions.')}},
{h:'Keeps the solutions?',p:'A step is safe when it can be undone. Then the new equation has exactly the same solutions as the old one.',predict:{q:'Does squaring both sides keep exactly the same solutions?',opts:['Yes, it is the same on both sides','Not always: it can add solutions'],ans:1},task:'Sort 6 moves',show:show(2),
 go:()=>{reset();S.goal=6;say('Drag each move to Keeps solutions or Can change them.');pads();S.cb=settle(2,'Adding, subtracting, or multiplying and dividing by a non-zero number can be undone. Multiplying by 0, dividing by an expression that might be 0, and squaring can change the solutions.')}},
{h:'Build a valid chain',p:'The lines of a solution are shuffled. Rebuild the chain so each line follows from the last by one property.',task:'Order 4 lines',show:show(3),
 go:()=>{reset();S.goal=4;say('Tap or drag the line that comes next.');pads();S.cb=settle(3,'Distribute, subtract 2x, subtract 8, divide by 2: x = −7. Check: 4(−5) = −20 and 2(−7) − 6 = −20.')}},
{h:'Why the method works',p:'Run the first solution backwards. If every step can be undone, every line has the same solutions, so x = 4 must solve the first equation.',task:'Undo 3 steps',show:show(4),
 go:()=>{reset();say('Which move undoes the step? Tap it.');pads();S.cb=settle(4,'Every step reversed cleanly, so the equations are equivalent. Check: 5(4 − 1) + 2 = 17 and 2(4) + 9 = 17.')}},
{h:'Challenge',p:'',go:()=>{reset();quizNext()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.cb()});
const QS=[['From 2x + 5 = 11 to 2x = 6. Which reason?',[['Subtraction property of equality','ok'],['Division property of equality','div'],['Combine like terms','like']]],
 ['Which step can lose a solution?',[['Divide both sides by x','ok'],['Add x to both sides','addx'],['Multiply both sides by 5','mul5']]],
 ['Squaring both sides of x = 3 gives x² = 9. What happened?',[['A new solution, x = −3, crept in','ok'],['Nothing: the solutions are the same','same'],['The solution x = 3 was lost','lost']]],
 ['Why does solving by balancing give the right answer?',[['Each step can be undone, so every line has the same solutions','ok'],['Because the answer looks neat','neat'],['Because anything done to both sides is fine','any']]],
 ['Lily writes 3x = 12, then x = 36. What went wrong?',[['She multiplied instead of dividing both sides by 3','ok'],['Nothing, x = 36','fine'],['She should have subtracted 3','sub3']]]];
function why(t){let m='Name the property for each line, and only use steps that can be undone.';
 if(t==='div')m='Nothing was divided: 2x stayed as 2x. The 5 was taken from both sides.';if(t==='like')m='Like terms are combined on one side. Here 5 was taken from both sides.';
 if(t==='addx')m='Adding x can be undone by subtracting x, so no solution is lost.';if(t==='mul5')m='Multiplying by 5 is undone by dividing by 5. Only 0 is a problem.';
 if(t==='same')m='Try x = −3: (−3)² = 9. It fits x² = 9 but not x = 3, so squaring added a root.';if(t==='lost')m='x = 3 still works: 3² = 9. The problem is the extra root, x = −3.';
 if(t==='neat')m='A neat answer can still be wrong. The steps being reversible is what proves it.';if(t==='any')m='Not anything: multiplying by 0 or dividing by something that is 0 breaks it.';
 if(t==='fine')m='Check it: 3 × 36 = 108, not 12. To undo × 3, divide both sides by 3.';if(t==='sub3')m='3x means 3 times x, so divide by 3. Subtracting 3 gives 3x − 3 = 9.';return m}
function quizNext(){qx++;const[q,ops]=QS[qx%QS.length],sh=qx%3;quizBox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quizBox.querySelector('.fl-pick');ops.slice(sh).concat(ops.slice(0,sh)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>judge(t)});say('Challenge: '+q);A.redraw()}
function judge(t){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=t==='ok';if(ok){good++;A.win()}else{good=0;A.sound.miss()}
 fb.innerHTML=`${ok?'✓ Right.':'✗ '+why(t)}${ok?` Stars in a row: ${good}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quizNext}
A=FK.shell(c,{steps,ratio:.66,tall:1.4,draw,onStep:A=>{quizBox.hidden=A.step!==5;keys.hidden=A.step===5;pads()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quizBox=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});pads()}});
A.start()})})();
