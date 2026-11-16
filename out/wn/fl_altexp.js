/* Flagship: could there be another explanation? (ages 7–9; NC England Y3–4 working scientifically "use results to draw
   simple conclusions ... suggest improvements"; NGSS 3-5 science practices: construct explanations and compare them with
   evidence). Find other ideas that could make the grass wet, use clues to rule ideas out until one fits them all, set up a
   plant test so light is the only difference, pick the check that compares, and solve the shrinking puddle. Tap or buttons. */
(()=>{
const K={ink:'#0f172a',dim:'#475569',card:'#ffffff',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',noBg:'#ffe4e6',tip:'#eef2ff',edge:'#1e293b',
 seen:'#fef3c7',seenInk:'#713f12',clue:'#e0f2fe',clueInk:'#075985',gone:'#e2e8f0',goneInk:'#64748b',pick:'#1d4ed8'};
const D=ALTART;
VIS.reg('flagaltexp',c=>{let A,X,pad,chal,qi=-1,tok=0;const G={after:()=>{}};
const z=n=>Math.round(n*(A.narrow?1:1.12));
const write=(s,x,y,n,col,al,wt)=>{X.font=`${wt||700} ${z(n)}px system-ui,sans-serif`;X.fillStyle=col||K.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)};
function fold(s,maxW,n){X.font=`700 ${z(n)}px system-ui,sans-serif`;const out=[];let cur='';
 for(const w of String(s).split(' ')){const t=cur?cur+' '+w:w;if(cur&&X.measureText(t).width>maxW){out.push(cur);cur=w}else cur=t}out.push(cur);return out}
function tile(x,y,w,h,bg,edge,lw,r){A.paint.rrect(x,y,w,h,r==null?10:r);X.fillStyle=bg;X.fill();if(edge){X.lineWidth=lw||2;X.strokeStyle=edge;X.stroke()}}
function words(s,x,y,w,h,n,col,wt){const L=fold(s,w-14,n),lh=z(n)+4;L.forEach((r,i)=>write(r,x+w/2,y+h/2+(i-(L.length-1)/2)*lh,n,col,'center',wt))}
function top(s,won){const L=fold(s,A.W-40,13),lh=z(13)+4,h=Math.max(z(34),L.length*lh+12);tile(10,8,A.W-20,h,won?K.okBg:K.tip,won?K.ok:K.edge,2,8);
 L.forEach((r,i)=>write(r,A.W/2,8+h/2+(i-(L.length-1)/2)*lh,13,won?K.ok:K.ink));return 8+h}
function bottom(){if(!G.msg)return;const L=fold((G.bad?'✗ ':'✓ ')+G.msg,A.W-44,12),lh=z(12)+5,h=L.length*lh+10,y=A.H-h-8;
 tile(10,y,A.W-20,h,K.card,G.bad?K.no:K.ok,3,8);L.forEach((r,i)=>write(r,A.W/2,y+5+lh*(i+.5),12,G.bad?K.no:K.ink))}
const speak=s=>{c.say(s);A.cv.setAttribute('aria-label',s)};
const nope=s=>{G.bad=true;G.msg=s;A.sound.miss();sync()};
const yes=s=>{G.bad=false;G.msg=s;A.sound.pop();sync()};
const over=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function seenCard(s,y){const h=z(34);tile(14,y,A.W-28,h,K.seen,K.seenInk,2,10);words('We saw: '+s,14,y,A.W-28,h,12,K.seenInk,800);return y+h}
/* ---- step 0: other ideas ---- */
function chooseIdea(i){if(G.won||G.got.has(i))return;const [s,fits,why]=D.IDEAS[i];if(!fits)return nope(why);G.got.add(i);
 if(G.got.size===4){G.won=true;return yes('Rain, a sprinkler, dew, a dog bowl or a car wash: five ideas fit. The first idea is only one of them.')}
 G.bad=false;G.msg=`Yes: “${s}” could make the grass wet. ${4-G.got.size} more to find.`;A.sound.tick();sync()}
function drawIdeas(t){let y=seenCard(D.SEE,t+z(8))+z(6);tile(14,y,A.W-28,z(26),K.gone,null,0,8);write('First idea: '+D.FIRST,A.W/2,y+z(13),12,K.ink,'center',700);y+=z(34);
 const cols=2,gap=z(8),w=(A.W-28-gap)/cols,h=Math.min(z(44),(A.H-y-z(56))/4-gap);G.ideaHit=D.IDEAS.map((it,i)=>{const x=14+(i%cols)*(w+gap),yy=y+Math.floor(i/cols)*(h+gap),on=G.got.has(i);
  tile(x,yy,w,h,on?K.okBg:K.card,on?K.ok:K.edge,on?3:1.5,10);words((on?'✓ ':'')+it[0],x,yy,w,h,12,on?K.ok:K.ink,on?800:600);return{x,y:yy,w,h,i}})}
/* ---- steps 1 and 4: rule ideas out with clues ---- */
const CS=()=>D.CASES[A.step===1?0:1];
function openClue(j){if(G.won||G.open.has(j))return;G.open.add(j);const cl=CS().clues[j];A.sound.tick();G.bad=false;
 G.msg=`Clue: ${cl[1]}`+(cl[2].length?' Which idea does that rule out? Tap it.':' This clue fits the idea that is left.');checkCase();sync()}
function strike(i){if(G.won||G.out.has(i))return;const C=CS(),j=C.clues.findIndex((cl,k)=>G.open.has(k)&&cl[2].includes(i));
 if(i===C.keep)return nope(`“${C.ideas[i]}” still fits every clue so far. Keep an idea until a clue rules it out.`);
 if(j<0)return nope(`No clue rules out “${C.ideas[i]}” yet. Open another clue first.`);
 G.out.add(i);G.bad=false;G.msg=`Ruled out: ${C.clues[j][3]}`;A.sound.pop();checkCase();sync()}
function checkCase(){const C=CS();if(C.ideas.every((_,i)=>i===C.keep||G.out.has(i))&&G.open.size===C.clues.length){G.won=true;G.bad=false;
 G.msg=`Only “${C.ideas[C.keep]}” fits every clue. It is the best explanation for now, and a new clue could still change it.`;A.sound.pop()}}
function drawCase(t){const C=CS();let y=seenCard(C.see,t+z(6))+z(8);const gap=z(6),n=C.clues.length,cw=(A.W-28-gap*(n-1))/n,ch=z(48);
 G.clueHit=C.clues.map((cl,j)=>{const x=14+j*(cw+gap),on=G.open.has(j);tile(x,y,cw,ch,on?K.clue:K.card,K.clueInk,on?1.5:2.5,10);words(on?'Clue '+(j+1)+' ✓':cl[0],x,y,cw,ch,11,K.clueInk,800);return{x,y,w:cw,h:ch,j}});
 y+=ch+z(10);const h=Math.min(z(38),(A.H-y-z(58))/C.ideas.length-gap);G.caseHit=C.ideas.map((s,i)=>{const yy=y+i*(h+gap),gone=G.out.has(i),last=G.won&&i===C.keep;
  tile(14,yy,A.W-28,h,gone?K.gone:last?K.okBg:K.card,gone?K.goneInk:last?K.ok:K.edge,last?3:1.5,10);words((gone?'✗ ':last?'✓ ':'')+s,14,yy,A.W-28,h,12,gone?K.goneInk:last?K.ok:K.ink,last?800:600);
  if(gone){X.strokeStyle=K.goneInk;X.lineWidth=2;X.beginPath();X.moveTo(30,yy+h/2);X.lineTo(A.W-30,yy+h/2);X.stroke()}return{x:14,y:yy,w:A.W-28,h,i}})}
/* ---- step 2: only light differs ---- */
function flip(r){if(G.won)return;G.diff[r]=G.diff[r]?0:1;A.sound.tick();const row=D.FAIR[r];
 if(r===0&&!G.diff[0])return nope('Now both plants get the same light, so this test cannot show whether light matters. Light must be the one difference.');
 const left=G.diff.map((v,k)=>v&&k>0?D.FAIR[k][0].toLowerCase():null).filter(Boolean);
 if(G.diff[0]&&!left.length){G.won=true;return yes('Only the light is different now. If the window plant still grows taller, light is the best explanation.')}
 G.bad=false;G.msg=left.length?`Still different: ${left.join(', ')}. ${left.length>1?'Each one':'It'} could be another explanation.`:'Light must stay different.';sync()}
function drawFair(t){const y0=t+z(8),gap=z(6),hh=z(26),cw=(A.W-28)/3;write('What',14+cw/2,y0+hh/2,12,K.dim);write('Window plant',14+cw*1.5,y0+hh/2,12,K.dim);write('Cupboard plant',14+cw*2.5,y0+hh/2,12,K.dim);
 const h=Math.min(z(44),(A.H-y0-hh-z(60))/D.FAIR.length-gap);G.rowHit=D.FAIR.map((row,r)=>{const y=y0+hh+r*(h+gap),dif=G.diff[r];
  tile(14,y,A.W-28,h,dif?K.noBg:K.okBg,dif?K.no:K.ok,dif?2.5:1.5,10);write(row[0],14+cw/2,y+h/2,12,K.ink,'center',800);write(row[1],14+cw*1.5,y+h/2,12,K.ink,'center',600);
  write(dif?row[2]:row[1],14+cw*2.5,y+h/2,12,dif?K.no:K.ok,'center',800);return{x:14,y,w:A.W-28,h,r}})}
/* ---- step 3: the check that compares ---- */
const CQ=()=>D.CHECK[G.ri];
function pickCheck(k){if(G.won)return;const o=CQ().opts[k];if(!o[1])return nope(o[2]);
 if(G.ri===D.CHECK.length-1){G.won=true;return yes('Both checks compare: the same set-up with and without the cause. Then you can see if it makes a difference.')}
 G.ri++;yes('Yes: cress that is not sung to shows how much cress grows anyway. Next claim.')}
const order=()=>[0,1,2,3].map(j=>(j+G.ri*3)%4);
function drawCheck(t){const Q=CQ(),L=fold(Q.say,A.W-48,12),lh=z(12)+4,sh=L.length*lh+12;let y=t+z(8);tile(14,y,A.W-28,sh,K.seen,K.seenInk,2,10);L.forEach((r,i)=>write(r,A.W/2,y+6+lh*(i+.5),12,K.seenInk,'center',700));
 y+=sh+z(8);const gap=z(6),h=Math.min(z(50),(A.H-y-z(58))/4-gap);G.optHit=order().map((k,j)=>{const yy=y+j*(h+gap);tile(14,yy,A.W-28,h,K.card,K.pick,2,10);words(Q.opts[k][0],14,yy,A.W-28,h,12,K.ink,600);return{x:14,y:yy,w:A.W-28,h,k}})}
/* ---- input and drawing ---- */
const kind=()=>['ideas','case','fair','check','case','quiz'][A.step];
function down(p){const k=kind(),hit=L=>(L||[]).find(r=>over(p,r));
 if(k==='ideas'){const r=hit(G.ideaHit);if(r){chooseIdea(r.i);return true}}
 if(k==='case'){const q=hit(G.clueHit);if(q){openClue(q.j);return true}const r=hit(G.caseHit);if(r){strike(r.i);return true}}
 if(k==='fair'){const r=hit(G.rowHit);if(r){flip(r.r);return true}}
 if(k==='check'){const r=hit(G.optHit);if(r){pickCheck(r.k);return true}}
 return false}
function draw(){X.fillStyle=A.mix(A.col.pn,'#f8fafc',A.col.dark?.05:.5);X.fillRect(0,0,A.W,A.H);if(A.col.dark){X.fillStyle='#f8fafc';A.paint.rrect(6,6,A.W-12,A.H-12,16);X.fill()}
 const k=kind();let t;
 if(k==='ideas'){t=top(G.won?'One thing we see can have many explanations.':'What else could make the grass wet? Tap 4 more ideas.',G.won);drawIdeas(t)}
 if(k==='case'){t=top(G.won?'The idea that fits every clue is the best explanation, for now.':'Tap a clue to open it. Then tap each idea it rules out.',G.won);drawCase(t)}
 if(k==='fair'){t=top(G.won?'One difference left: light. Now the test can tell.':'Tap a row to make it the same or different. Only the light should differ.',G.won);drawFair(t)}
 if(k==='check'){t=top(G.won?'A check needs something to compare with.':'Which is the best way to check the claim?',G.won);drawCheck(t)}
 if(k==='quiz'){t=top('Ask: what else could explain it? Then look for a clue or a fair test.');seenCard(D.SEE,t+z(14))}
 bottom();A.fx.draw(X)}
function sync(){const k=kind();let d='Challenge.';
 if(k==='ideas')d=`We saw: ${D.SEE} Ideas found: ${[...G.got].map(i=>D.IDEAS[i][0]).join('; ')||'none'}.`;
 if(k==='case'){const C=CS();d=`We saw: ${C.see} Clues open: ${[...G.open].map(j=>C.clues[j][1]).join(' ')||'none'}. Ideas left: ${C.ideas.filter((_,i)=>!G.out.has(i)).join('; ')}.`}
 if(k==='fair')d='Plant test. '+D.FAIR.map((r,i)=>`${r[0]}: ${G.diff[i]?'different':'same'}`).join(', ')+'.';
 if(k==='check')d=CQ().say;
 speak((G.msg?G.msg+' ':'')+d);ctl();G.after()}
function ctl(){if(!pad)return;pad.innerHTML='';const k=kind(),b=(label,fn,aria)=>{c.el('button',{type:'button',class:'lbtn ghost','aria-label':aria||null},pad,label).onclick=()=>{fn();sync()}};
 if(k==='ideas'&&!G.won)D.IDEAS.forEach((it,i)=>{if(!G.got.has(i))b(it[0],()=>chooseIdea(i),`Could this make the grass wet: ${it[0]}?`)});
 if(k==='case'&&!G.won){const C=CS();C.clues.forEach((cl,j)=>{if(!G.open.has(j))b('Clue: '+cl[0],()=>openClue(j))});C.ideas.forEach((s,i)=>{if(!G.out.has(i))b('Rule out: '+s,()=>strike(i))})}
 if(k==='fair'&&!G.won)D.FAIR.forEach((r,i)=>b(`${r[0]}: make ${G.diff[i]?'the same':'different'}`,()=>flip(i)));
 if(k==='check'&&!G.won)order().forEach(k2=>b(CQ().opts[k2][0],()=>pickCheck(k2)));
 A.redraw()}
const settle=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const play=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();sync()}},(j+1)*(A.reduced()?30:ms)))};
function reset(){tok++;Object.assign(G,{after:()=>{},won:false,msg:'',bad:false,got:new Set(),open:new Set(),out:new Set(),diff:[1,1,1,0,1],ri:0})}
function solveCase(ci){const C=D.CASES[ci],f=[];C.clues.forEach((cl,j)=>{f.push(()=>openClue(j));cl[2].forEach(i=>f.push(()=>strike(i)))});return f}
const steps=[
{h:'More than one idea',p:'Scientists see something, then ask why. The first idea that comes to mind might be right, but it might not. So they ask: could there be another explanation?',
predict:{q:'The grass is wet this morning. Must it have rained?',opts:['Yes: only rain makes grass wet','No: other things could make it wet too','Yes, because it is the morning'],ans:1},
task:'Find 4 more ideas that could make the grass wet',show:()=>{steps[0].go();play([0,1,3,5].map(i=>()=>chooseIdea(i)),450)},go:()=>{reset();sync();G.after=settle(0,()=>G.won,'A sprinkler, dew, a dog bowl, a car wash, as well as rain.')}},
{h:'Clues rule ideas out',p:'With many ideas, look for a clue that one idea cannot explain. Each clue can rule some ideas out. Keep the ideas that still fit.',
task:'Use all 3 clues until one idea is left',show:()=>{steps[1].go();play(solveCase(0),380)},go:()=>{reset();sync();G.after=settle(1,()=>G.won,'Dew: grass wet all over, path dry, sprinkler broken.')}},
{h:'A fair test',p:'Ben’s window plant grew taller than his cupboard plant. Light is one idea. But if other things are different too, each of them is another explanation.',
predict:{q:'Does the taller window plant prove that light made the difference?',opts:['Yes: light is the only difference','No: it may also get more water or warmth','No: plants do not need light'],ans:1},
task:'Make light the only difference',show:()=>{steps[2].go();play([1,2,4].map(r=>()=>flip(r)),500)},go:()=>{reset();sync();G.after=settle(2,()=>G.won,'Same water, warmth, pot and seeds. Only light differs.')}},
{h:'Compare it',p:'To check a claim, you need to see what happens without the cause too. Then you can tell whether the cause made any difference.',
task:'Pick the best check for both claims',show:()=>{steps[3].go();play([()=>pickCheck(0),()=>pickCheck(0)],700)},go:()=>{reset();sync();G.after=settle(3,()=>G.won,'Cress not sung to, and a lolly in a plastic cup next to it.')}},
{h:'The shrinking puddle',p:'Now solve one by yourself. Open each clue, rule out the ideas it cannot explain, and see which idea fits every clue.',
predict:{q:'The playground is concrete. Which idea does that rule out?',opts:['The water evaporated','It soaked into the ground','A dog drank it'],ans:1},
task:'Find the idea that fits every clue',show:()=>{steps[4].go();play(solveCase(1),380)},go:()=>{reset();sync();G.after=settle(4,()=>G.won,'It evaporated: hot sun, no marks, concrete ground.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>G.after()});
function ask(){qi++;const [q,ans,wrongs]=D.bank[qi%D.bank.length],all=[[ans,'ok']].concat(wrongs),r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},row,w).onclick=()=>mark(tag,ans)});speak('Challenge: '+q);A.redraw()}
let streak=0;
function mark(tag,ans){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=tag==='ok';let m=D.WHY[tag]||'Ask what else could explain it.';
 if(tag==='firstIdea')m='That stops at the first idea. Think of at least one other explanation, then find a clue that tells them apart.';
 if(tag==='noCompare')m='Doing it again shows nothing new. Compare with the same thing without the cause.';
 if(tag==='notExplain')m='That is true, but it could not cause what was seen, so it is not an explanation.';
 if(ok){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes: '+ans+'. Streak: '+streak+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:B=>{chal.hidden=B.step!==5;pad.hidden=B.step===5;ctl()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);pad=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Another explanation lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);A.gest({down})}}).start()})})();
