/* Flagship – building sentences (ages 4–6): couple a "who" car to a "does" car to make a word train that says a
   complete thought; sort whole sentences from bits that are not finished (each bit says what it is missing); mend a
   fragment by dropping in the missing who or doing word; stretch a sentence with where/when/how details and see it stay
   ONE sentence; then give it a capital letter at the start and a full stop at the end. Challenge on spotting each slip. */
(()=>{const hy=Math.hypot;
const WHO=[['🐶','The dog'],['🐱','The cat'],['👧','Mia']],DOES=[['🏃','runs'],['😴','sleeps'],['🦘','jumps']];
const BITS=[['The cat sleeps.',0],['The big red',1,'“The big red” tells us no who and no doing. What is big and red? What does it do?'],['Mia sings.',0],['on the bed',1,'“on the bed” has no who and no doing word. Who is on the bed, and what do they do?'],['The bird flies.',0],['jumps high',1,'“jumps high” has a doing word, but who jumps? It needs a who.']];
const MEND=[{pre:'The bird',post:'',gap:1,pic:'🐦',ops:[['sings',1],['the tree',0,'“The bird the tree” still has no doing word.'],['big',0,'“The bird big” does not say what the bird does.']]},
 {pre:'',post:'swims',gap:0,pic:'🐟',ops:[['The fish',1],['fast',0,'“Fast swims” still does not say who swims.'],['in the pond',0,'“In the pond swims” tells where, not who.']]},
 {pre:'The baby',post:'',gap:1,pic:'👶',ops:[['cries',1],['a cot',0,'“The baby a cot” has no doing word.'],['soft',0,'“The baby soft” does not say what the baby does.']]}];
const MORE=[['on the mat','🟫','where'],['in the sun','☀️','where'],['all day','🕒','when'],['softly','💤','how']];
const CAPS=[['the','dog','runs'],['my','cat','naps'],['we','sing','songs']];
VIS.reg('flagsent',c=>{let A,ctl,chal,ask=-1,streak=0;c.fig.classList.add('young');
const S={k:0,want:()=>{},who:-1,does:-1,made:[],bit:0,binned:[],bad:-1,m:0,fixed:[],add:[],cap:0,big:false,dot:false,grab:null};
const view=()=>['train','sort','mend','grow','marks','quiz'][A.step];
const tell=t=>{c.say(t);if(A)A.cv.setAttribute('aria-label',t)};
const f=n=>Math.round(n*(A.narrow?1.05:1.2));
function word(g,t,x,y,n,col,wt){g.font=`${wt||700} ${f(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col||A.col.tx;g.fillText(t,x,y,A.W-8)}
function box(g,r,bg,line,lw){g.fillStyle=bg;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.lineWidth=lw||2;g.strokeStyle=line;A.paint.rrect(r.x,r.y,r.w,r.h,14);g.stroke()}
const hit=(p,r)=>p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
const row3=(i,y,h)=>{const w=(A.W-24)/3;return{x:6+i*(w+6),y:A.H*y,w,h:A.H*h}};
const car=i=>{const w=(A.W-30)*.4;return{x:8+i*(w+8),y:A.H*.68,w,h:A.H*.16}},stop=()=>({x:A.W-(A.W-30)*.2+4,y:A.H*.68,w:(A.W-30)*.2-12,h:A.H*.16});
const tray=()=>({x:A.W*.12,y:A.H*.06,w:A.W*.76,h:A.H*.2}),bin=i=>({x:6+i*A.W/2,y:A.H*.34,w:A.W/2-12,h:A.H*.62});
const gapBox=()=>({x:A.W*.08,y:A.H*.36,w:A.W*.84,h:A.H*.18});
const capWord=(i)=>{const n=CAPS[Math.min(S.cap,2)].length,w=(A.W-40)/(n+.6);return{x:8+i*(w+6),y:A.H*.42,w,h:A.H*.2}};
const capDot=()=>{const r=capWord(CAPS[Math.min(S.cap,2)].length-1);return{x:r.x+r.w+6,y:r.y,w:A.W-r.x-r.w-14,h:r.h}};
function engine(g,W,H,C){g.fillStyle=A.alpha(C.cy,.12);g.fillRect(0,H*.86,W,H*.02);[0,1].forEach(i=>{const r=car(i);[.25,.75].forEach(u=>{g.fillStyle=C.tx;g.beginPath();g.arc(r.x+r.w*u,r.y+r.h+4,5,0,7);g.fill()})})}
function draw(A){const{ctx:g,W,H,col:C}=A,v=view();g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.35);g.fillRect(0,0,W,H);
 if(v==='quiz'){word(g,'Who? + Does what? + .',W/2,H*.4,18,C.tx,800);word(g,'= a whole sentence',W/2,H*.56,15,C.tx,700);return}
 if(v==='train'){WHO.forEach(([e,t],i)=>{const r=row3(i,.04,.24);if(S.grab&&S.grab.s===0&&S.grab.i===i)return;box(g,r,A.alpha(C.or,S.who===i?.4:.2),C.tx,S.who===i?4:2);word(g,e,r.x+r.w/2,r.y+r.h*.35,24);word(g,t,r.x+r.w/2,r.y+r.h*.75,12)});
  DOES.forEach(([e,t],i)=>{const r=row3(i,.33,.24);if(S.grab&&S.grab.s===1&&S.grab.i===i)return;box(g,r,A.alpha(C.vi,S.does===i?.35:.15),C.tx,S.does===i?4:2);word(g,e,r.x+r.w/2,r.y+r.h*.35,24);word(g,t,r.x+r.w/2,r.y+r.h*.75,12)});
  engine(g,W,H,C);[0,1].forEach(i=>{const r=car(i),k=i?S.does:S.who;box(g,r,A.alpha(k>=0?C.gr:C.ln,.22),C.tx);word(g,k>=0?(i?DOES:WHO)[k][1]:(i?'does what?':'who?'),r.x+r.w/2,r.y+r.h/2,12,C.tx,k>=0?800:500)});
  const d=stop();box(g,d,A.alpha(C.gr,S.who>=0&&S.does>=0?.3:.08),C.tx);word(g,'.',d.x+d.w/2,d.y+d.h*.4,26,C.tx,900);
  word(g,'Sentences made: '+S.made.length+' of 3',W/2,H*.62,11,C.tx,600);
  if(S.grab){const r={x:S.grab.x-W*.13,y:S.grab.y-H*.06,w:W*.26,h:H*.12};box(g,r,A.alpha(C.or,.45),C.tx);word(g,(S.grab.s?DOES:WHO)[S.grab.i][1],S.grab.x,S.grab.y,12)}}
 if(v==='sort'){const t=tray();if(S.bit<BITS.length){const r=S.grab?{...t,x:S.grab.x-t.w/2,y:S.grab.y-t.h/2}:t;box(g,r,A.alpha(C.or,.28),C.tx);word(g,BITS[S.bit][0],r.x+r.w/2,r.y+r.h/2,15,C.tx,800)}else word(g,'All sorted!',W/2,t.y+t.h/2,16,C.gr,800);
  ['✅ Whole sentence','🧩 Not finished'].forEach((n,i)=>{const r=bin(i);box(g,r,A.alpha([C.gr,C.am][i],.12),S.bad===i?C.rd:C.tx,S.bad===i?4:2);word(g,n,r.x+r.w/2,r.y+f(16),12,C.tx,800);
   S.binned.filter(b=>BITS[b][1]===i).forEach((b,k)=>word(g,BITS[b][0],r.x+r.w/2,r.y+f(44)+k*f(24),A.narrow?10:11,C.tx,600))})}
 if(v==='mend'){const M=MEND[S.m]||MEND[2],gb=gapBox(),won=S.fixed.includes(S.m);word(g,M.pic,W/2,H*.18,46);box(g,gb,A.alpha(C.cy,.12),C.tx);
  const fill=won?M.ops.find(o=>o[1])[0]:'____',s=M.gap?`${M.pre} ${fill}.`:`${fill} ${M.post}.`;word(g,s,W/2,gb.y+gb.h/2,17,won?C.gr:C.tx,800);
  M.ops.forEach(([t],i)=>{if(S.grab&&S.grab.i===i)return;const r=row3(i,.66,.2);box(g,r,A.alpha(C.or,.22),S.bad===i?C.rd:C.tx,S.bad===i?4:2);word(g,t,r.x+r.w/2,r.y+r.h/2,13)});
  word(g,'Fixed: '+S.fixed.length+' of 3',W/2,H*.6,11,C.tx,600);if(S.grab){const r={x:S.grab.x-W*.14,y:S.grab.y-H*.07,w:W*.28,h:H*.14};box(g,r,A.alpha(C.or,.45),C.tx);word(g,M.ops[S.grab.i][0],S.grab.x,S.grab.y,13)}}
 if(v==='grow'){const gb=gapBox();word(g,'🐱'+S.add.map(i=>MORE[i][1]).join(''),W/2,H*.16,40);box(g,gb,A.alpha(C.gr,.14),C.tx);
  const s='The cat sleeps'+S.add.map(i=>' '+MORE[i][0]).join('')+'.';word(g,s,W/2,gb.y+gb.h/2,s.length>34?12:15,C.tx,800);
  word(g,'1 sentence: one who, one doing, one full stop',W/2,H*.6,11,C.tx,600);
  MORE.forEach(([t,e,k],i)=>{if(S.add.includes(i)||(S.grab&&S.grab.i===i))return;const w=(W-30)/4,r={x:6+i*(w+6),y:H*.68,w,h:H*.22};box(g,r,A.alpha(C.vi,.15),C.tx);word(g,e,r.x+w/2,r.y+r.h*.3,20);word(g,t,r.x+w/2,r.y+r.h*.62,A.narrow?9:11);word(g,k+'?',r.x+w/2,r.y+r.h*.85,A.narrow?8:10,C.tx,500)});
  if(S.grab){const r={x:S.grab.x-W*.12,y:S.grab.y-H*.06,w:W*.24,h:H*.12};box(g,r,A.alpha(C.vi,.4),C.tx);word(g,MORE[S.grab.i][0],S.grab.x,S.grab.y,11)}}
 if(v==='marks'){const ws=CAPS[Math.min(S.cap,2)];word(g,'Capital letter? Full stop?',W/2,H*.14,15,C.tx,800);word(g,'Tap a word, then tap the end box.',W/2,H*.26,12,C.tx,600);
  ws.forEach((w,i)=>{const r=capWord(i),t=i===0&&S.big?w[0].toUpperCase()+w.slice(1):w;box(g,r,A.alpha(i===0&&S.big?C.gr:C.cy,.18),S.bad===i?C.rd:C.tx,S.bad===i?4:2);word(g,t,r.x+r.w/2,r.y+r.h/2,17,C.tx,800)});
  const d=capDot();box(g,d,A.alpha(S.dot?C.gr:C.ln,.2),C.tx);word(g,S.dot?'.':'?',d.x+d.w/2,d.y+d.h/2,S.dot?28:14,C.tx,900);word(g,'Mended: '+S.cap+' of 3',W/2,H*.8,11,C.tx,600)}
 A.fx.draw(g)}
const miss=t=>{A.sound.miss();tell(t);A.redraw()},good=t=>{A.sound.pop();tell(t);keys();A.redraw();S.want()};
function couple(side,i){S.grab=null;if(i<0)return A.redraw();if(side)S.does=i;else S.who=i;A.sound.tick();
 if(S.who<0||S.does<0){tell(side?`“${DOES[i][1]}” on its own is not a sentence. Who ${DOES[i][1]}?`:`“${WHO[i][1]}” on its own is not a sentence. What does ${WHO[i][1].toLowerCase()} do?`);keys();return A.redraw()}
 const s=`${WHO[S.who][1]} ${DOES[S.does][1]}.`;if(!S.made.includes(s))S.made.push(s);const done=s;S.who=-1;S.does=-1;good(`${done} A who, a doing word and a full stop: a whole sentence!`)}
function drop(b){S.grab=null;if(S.bit>=BITS.length||b<0)return A.redraw();const B=BITS[S.bit];
 if(b!==B[1]){S.bad=b;return miss(B[1]?B[2]:`“${B[0]}” has a who and a doing word, so it is a whole sentence.`)}S.bad=-1;S.binned.push(S.bit);S.bit++;good(B[1]?B[2].split('.')[0]+'.':`Whole: “${B[0]}”`)}
function mend(i){S.grab=null;const M=MEND[S.m];if(!M||i<0)return A.redraw();const o=M.ops[i];if(!o[1]){S.bad=i;return miss(o[2])}
 S.bad=-1;S.fixed.push(S.m);const s=M.gap?`${M.pre} ${o[0]}.`:`${o[0]} ${M.post}.`;good(s+' Now it is a whole sentence.');const k=S.k;setTimeout(()=>{if(k===S.k&&S.m<2){S.m++;keys();A.redraw()}},A.reduced()?30:700)}
function grow(i){S.grab=null;if(i<0||S.add.includes(i))return A.redraw();S.add.push(i);A.sound.whoosh();good(`The cat sleeps ${S.add.map(j=>MORE[j][0]).join(' ')}. The ${MORE[i][2]} detail made it longer, and it is still one sentence.`)}
function mark(i){if(S.cap>=3)return;const ws=CAPS[S.cap];if(i===ws.length){if(S.dot)return;S.dot=true}else{if(i>0){S.bad=i;return miss(`“${ws[i]}” is in the middle. The capital letter goes on the first word.`)}S.big=true}
 S.bad=-1;A.sound.tick();if(S.big&&S.dot){const s=ws.join(' ');S.cap++;good(`${s[0].toUpperCase()+s.slice(1)}. Capital letter at the start, full stop at the end.`);if(S.cap<3){S.big=false;S.dot=false}}
 else{tell(S.big?'Capital letter done. Now the full stop at the end.':'Full stop done. Now the capital letter at the start.');keys();A.redraw()}}
function keys(){if(!ctl)return;ctl.innerHTML='';const v=view(),K=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},ctl,t);b.onclick=fn};
 if(v==='train'){WHO.forEach(([e,t],i)=>K(e+' '+t,()=>couple(0,i),'Who: '+t));DOES.forEach(([e,t],i)=>K(e+' '+t,()=>couple(1,i),'Does: '+t))}
 if(v==='sort'&&S.bit<BITS.length){K('✅ Whole sentence',()=>drop(0));K('🧩 Not finished',()=>drop(1))}
 if(v==='mend'&&MEND[S.m]&&!S.fixed.includes(S.m))MEND[S.m].ops.forEach(([t],i)=>K(t,()=>mend(i),'Fill the gap with '+t));
 if(v==='grow')MORE.forEach(([t,,k],i)=>{if(!S.add.includes(i))K('+ '+t,()=>grow(i),`Add ${k}: ${t}`)});
 if(v==='marks'&&S.cap<3){const ws=CAPS[S.cap];ws.forEach((w,i)=>K('Capital on “'+w+'”',()=>mark(i)));K('Full stop at the end',()=>mark(ws.length))}A.redraw()}
function down(p){const v=view();
 if(v==='train'){for(const s of[0,1])for(let i=0;i<3;i++)if(hit(p,row3(i,s?.33:.04,.24))){S.grab={s,i,x:p.x,y:p.y};return true}return false}
 if(v==='sort'&&S.bit<BITS.length&&hit(p,tray())){S.grab={x:p.x,y:p.y};return true}
 if(v==='mend'&&MEND[S.m]&&!S.fixed.includes(S.m)){const i=[0,1,2].find(i=>hit(p,row3(i,.66,.2)));if(i!=null){S.grab={i,x:p.x,y:p.y};return true}}
 if(v==='grow'){const w=(A.W-30)/4,i=MORE.findIndex((_,i)=>!S.add.includes(i)&&hit(p,{x:6+i*(w+6),y:A.H*.68,w,h:A.H*.22}));if(i>=0){S.grab={i,x:p.x,y:p.y};return true}}
 if(v==='marks'&&S.cap<3){const n=CAPS[S.cap].length;for(let i=0;i<n;i++)if(hit(p,capWord(i)))mark(i);if(hit(p,capDot()))mark(n)}return false}
function move(p){if(S.grab){S.grab.x=p.x;S.grab.y=p.y;A.redraw()}}
function up(p){const v=view(),G=S.grab;if(!G)return;
 if(v==='train'){const r=car(G.s);return couple(G.s,hy(p.x-(r.x+r.w/2),p.y-(r.y+r.h/2))<A.W*.3?G.i:-1)}
 if(v==='sort')return drop([0,1].find(i=>hit(p,bin(i)))??-1);
 if(v==='mend')return mend(hit(p,gapBox())||p.y<A.H*.6?G.i:-1);
 if(v==='grow')return grow(p.y<A.H*.62?G.i:-1)}
const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(fs,ms)=>{const k=++S.k;fs.forEach((fn,j)=>setTimeout(()=>{if(k===S.k)fn()},A.reduced()?j*25+25:(j+1)*ms))};
const reset=()=>{S.k++;Object.assign(S,{want:()=>{},who:-1,does:-1,made:[],bit:0,binned:[],bad:-1,m:0,fixed:[],add:[],cap:0,big:false,dot:false,grab:null})};
const steps=[
{h:'Who + does what',p:'A sentence tells a whole idea. Put a WHO car and a DOES car on the train.',
 predict:{q:'Is “The dog” a whole sentence?',opts:['Yes','No, something is missing'],ans:1},task:'Make 3 different sentences',
 show:()=>{steps[0].go();play([()=>couple(0,0),()=>couple(1,0),()=>couple(0,1),()=>couple(1,1),()=>couple(0,2),()=>couple(1,2)],380)},
 go:()=>{reset();tell('Pick a who, then a doing word.');keys();S.want=fin(0,()=>S.made.length>=3,'Every sentence had a who and a doing word.')}},
{h:'Whole or not finished?',p:'A bit of a sentence leaves you asking “who?” or “what happened?”. Drag each card into a box.',task:'Sort all 6 cards',
 show:()=>{steps[1].go();play(BITS.map(b=>()=>drop(b[1])),420)},go:()=>{reset();tell('“The cat sleeps.” Whole, or not finished?');keys();S.want=fin(1,()=>S.bit>=6,'A whole sentence makes sense on its own.')}},
{h:'Fix it',p:'Each one is not finished. Drag in the missing piece.',
 predict:{q:'“jumps high” is missing…',opts:['a full stop only','a who'],ans:1},task:'Fix all 3',
 show:()=>{steps[2].go();play([()=>mend(0),()=>{},()=>mend(0),()=>{},()=>mend(0)],420)},go:()=>{reset();tell('The bird, gap. What does the bird do?');keys();S.want=fin(2,()=>S.fixed.length>=3,'Fixed! Each one now says who and what they do.')}},
{h:'Make it bigger',p:'Add where, when or how. Drag a detail onto the sentence.',
 predict:{q:'Add “on the mat”. How many sentences now?',opts:['Two sentences','Still one sentence'],ans:1},task:'Add 2 details',
 show:()=>{steps[3].go();play([()=>grow(0),()=>grow(2)],600)},go:()=>{reset();tell('The cat sleeps. Add a detail.');keys();S.want=fin(3,()=>S.add.length>=2,'Longer, but still one who and one doing word: one sentence.')}},
{h:'Start and stop',p:'A written sentence starts with a capital letter and ends with a full stop.',task:'Mend all 3 sentences',
 show:()=>{steps[4].go();play([()=>mark(0),()=>mark(3),()=>mark(0),()=>mark(3),()=>mark(0),()=>mark(3)],380)},go:()=>{reset();tell('the dog runs. Tap where the capital letter goes.');keys();S.want=fin(4,()=>S.cap>=3,'Capital letter to start, full stop to stop.')}},
{h:'Challenge',p:'',go:()=>{reset();ask_()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which one is a whole sentence?',[['The frog hops.','ok'],['The green frog','nodo'],['hops on a log','nowho']]],
 ['What is missing from “The big dog”?',[['what it does','ok'],['a who','haswho'],['nothing','none']]],
 ['What is missing from “runs to the shop”?',[['who runs','ok'],['a doing word','hasdo'],['nothing','none']]],
 ['Make “The bee buzzes.” bigger. Which is best?',[['The bee buzzes in the garden.','ok'],['The bee buzzes. In the garden.','split'],['In the garden.','frag']]],
 ['Where does the full stop go?',[['at the end','ok'],['after the first word','early'],['at the start','start']]],
 ['Which is written the right way?',[['The sun is hot.','ok'],['the sun is hot.','lower'],['The sun is hot','nostop']]]];
function why(t){let m='Say it out loud. You are left asking a question, so a piece is missing.';
 if(t==='nodo')m='“The green frog” has a who, but no doing word. What does the frog do?';
 if(t==='nowho')m='“hops on a log” has a doing word, but who hops?';
 if(t==='haswho')m='“The big dog” already has a who: the dog. It needs what the dog does.';
 if(t==='hasdo')m='“runs” is the doing word. We still need who runs.';
 if(t==='split')m='“In the garden.” on its own is not finished. Keep the detail inside the one sentence.';
 if(t==='frag')m='“In the garden.” has no who and no doing word.';
 if(t==='early')m='A full stop in the middle chops the idea in half. It goes at the end.';
 if(t==='start')m='The start of a sentence gets a capital letter, not a full stop.';
 if(t==='lower')m='A sentence starts with a capital letter: The, not the.';
 if(t==='nostop')m='This one forgot the full stop at the end.';
 return m}
function ask_(){ask++;const[q,ops]=QS[ask%QS.length],r=ask%3;chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark_(t)});tell('Challenge: '+q);A.redraw()}
function mark_(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';let m=ok?'✓ Yes! Streak: ':'✗ '+why(t);
 if(ok){streak++;A.win();m+=streak+'.'}else{streak=0;A.sound.miss()}fb.innerHTML=m+' <button type="button" class="linkish">Another →</button>';fb.querySelector('button').onclick=ask_}
A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{chal.hidden=A.step!==5;ctl.hidden=A.step===5;keys()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});keys()}});
A.start()})})();
