/* Flagship – remembering what comes next (3–4): a Now and Next board for handwashing, building the going-out routine
   where order matters (socks before shoes), finding the missing step at bedtime, doing snack time again with the
   picture reminders taken away, and spotting Pip's slip. Every drag also has a button. */
(()=>{const m0=Math.min,m1=Math.max;
 const R={hand:[['💧','Wet hands'],['🧼','Soap'],['👐','Rub'],['🚿','Rinse'],['🧻','Dry']],out:[['🧦','Socks'],['👟','Shoes'],['🧥','Coat'],['🚪','Door']],
  bed:[['🛁','Bath'],['👕','Pyjamas'],['🪥','Teeth'],['📖','Story'],['🛏','Bed']],snack:[['🧼','Wash hands'],['🪑','Sit down'],['🍎','Eat'],['🧽','Tidy up']]};
 const WHY={hand:['You need wet hands before the soap.','Soap goes on before you rub.','Rub the soap all over first.','Rinse the soap off before you dry.','Dry comes last.'],
  out:['Socks go on first, under the shoes.','Shoes go on over socks.','The coat goes on before you go out.','The door is last, when you are ready.']};
 const GAP=[['bed',2,['🛏 Bed','🪥 Teeth','🧦 Socks'],1],['out',1,['🍎 Eat','🛁 Bath','👟 Shoes'],2]];
 const SLIP=[['out',[1,0,2,3]],['bed',[1,0,2,3,4]]];
VIS.reg('flagroutine',c=>{let A,row,cbox,aria;c.fig.classList.add('young');
 const G={gen:0,cb:()=>{},hd:'',hold:null,pt:null,mv:0};
 const voice=t=>{c.say(t);if(A){A.cv.setAttribute('aria-label',t);if(aria)aria.textContent=t}};
 const at=()=>['nownext','build','gap','fade','slip','quiz'][A.step];
 const wr=(x,t,X,Y,z,k,w)=>{x.font=`${w||800} ${A.narrow?z:z+3}px system-ui,sans-serif`;x.textAlign='center';x.textBaseline='middle';x.fillStyle=k;x.fillText(t,X,Y,A.W-12)};
 // one card: emoji over a word
 function card(x,X,Y,w,c2,o){const C=A.col;o=o||{};A.paint.shadow(6,2,.2);x.fillStyle=o.ghost?A.alpha(C.pn,.5):A.mix(C.pn,'#ffffff',C.dark?.06:.85);A.paint.rrect(X-w/2,Y-w*.62,w,w*1.24,10);x.fill();A.paint.noShadow();
  x.lineWidth=o.ring?4:2;x.strokeStyle=o.ring||A.mix(C.ln,C.tx,.3);x.stroke();if(!c2)return;x.globalAlpha=o.faint?.28:1;wr(x,c2[0],X,Y-w*.14,Math.round(w*.34),C.tx,400);wr(x,c2[1],X,Y+w*.38,11,C.tx,700);x.globalAlpha=1}
 const strip=(n,y)=>{const w=m0(A.W/(n+.7),A.H*.2);return{w,x:i=>A.W/2+(i-(n-1)/2)*(w+A.W*.012),y}};
 // ---- step 0: now and next board
 function nnV(x){const C=A.col,H=R.hand,w=m0(A.W*.27,A.H*.26),i=G.nn.i;
  [['Now',A.W*.3],['Next',A.W*.7]].forEach(([t,X],k)=>{x.fillStyle=A.alpha(k?C.gr:C.cy,.14);A.paint.rrect(X-w*.75,A.H*.13,w*1.5,A.H*.47,14);x.fill();wr(x,t,X,A.H*.18,14,C.tx);
   card(x,X,A.H*.39,w,k?(G.nn.ok?H[i+1]:null):H[i],{ring:k&&!G.nn.ok?C.gr:null})});
  G.nn.opts.forEach((j,k)=>{if(G.hold===k&&G.mv)return;card(x,A.W*(k+1)/4,A.H*.8,w*.62,H[j],{ring:G.nn.bad===k?C.rd:null})});
  if(G.hold!=null&&G.mv&&G.pt)card(x,G.pt.x,G.pt.y,w*.62,H[G.nn.opts[G.hold]],{ring:C.tx});
  wr(x,G.hd||(i>=H.length-1?'All done! Clean hands.':'What comes next? Drag it to Next'),A.W/2,A.H*.06,14,C.tx)}
 function nnRound(){const n=G.nn,want=n.i+1,pool=[0,1,2,3,4].filter(j=>j!==want&&j!==n.i);n.opts=[want,pool[n.i%pool.length],pool[(n.i+2)%pool.length]];n.opts.push(n.opts.shift());if(n.i%2)n.opts.reverse();n.ok=0;n.bad=null}
 function nnPick(k){const n=G.nn,j=n.opts[k];if(n.ok||n.i>=4)return;
  if(j!==n.i+1){n.bad=k;A.sound.miss();G.hd='';return say2(`Not ${R.hand[j][1]} yet. ${j<n.i?'That step is done already.':'That comes later.'} ${WHY.hand[n.i+1]}`)}
  n.ok=1;n.bad=null;n.done++;A.sound.pop();say2(`Yes, ${R.hand[j][1]} is next.`);const g=G.gen;setTimeout(()=>{if(g!==G.gen)return;n.i++;if(n.i<4)nnRound();say2()},650)}
 // ---- step 1: build going-out routine
 function buildV(x){const C=A.col,S=strip(4,A.H*.36),O=R.out;for(let s=0;s<4;s++){const j=G.b.slot[s];card(x,S.x(s),S.y,S.w,j!=null?O[j]:null,{ghost:j==null});if(j==null)wr(x,String(s+1),S.x(s),S.y,20,C.mu)}
  G.b.hand.forEach((j,k)=>{if(j==null||(G.hold===k&&G.mv))return;card(x,A.W*(k+1)/5,A.H*.8,S.w*.85,O[j],{ring:G.b.sel===k?C.tx:G.b.bad===j?C.rd:null})});
  if(G.hold!=null&&G.mv&&G.pt)card(x,G.pt.x,G.pt.y,S.w*.85,O[G.b.hand[G.hold]],{ring:C.tx});
  wr(x,G.hd||'Get ready to go out. Put the cards in order',A.W/2,A.H*.07,14,C.tx)}
 function buildPut(k,s){const B=G.b,j=B.hand[k];B.sel=null;if(j==null)return;if(B.slot[s]!=null){A.sound.miss();return say2(`Box ${s+1} is full. Pick another box.`)}
  if(j!==s){B.bad=j;A.sound.miss();G.hd='';return say2(`${R.out[j][1]} is not number ${s+1}. ${WHY.out[j]}`)}
  B.bad=null;B.slot[s]=j;B.hand[k]=null;A.sound.pop();say2(`${R.out[j][1]} is step ${s+1}.`)}
 // ---- step 2: missing step
 function gapV(x){const C=A.col,end=!GAP[G.g.r],[k,miss,ops]=GAP[G.g.r]||GAP[1],L=R[k],S=strip(L.length,A.H*.36);
  L.forEach((c2,i)=>{const hole=i===miss&&!G.g.ok&&!end;card(x,S.x(i),S.y,S.w,hole?null:c2,{ghost:hole,ring:hole?C.am:null});if(hole)wr(x,'?',S.x(i),S.y,26,C.tx)});
  ops.forEach((o,i)=>{if(G.hold===i&&G.mv)return;const[e,t]=o.split(' ');card(x,A.W*(i+1)/4,A.H*.8,S.w*1.05,[e,t],{ring:G.g.bad===i?C.rd:null})});
  if(G.hold!=null&&G.mv&&G.pt){const[e,t]=ops[G.hold].split(' ');card(x,G.pt.x,G.pt.y,S.w,[e,t],{ring:C.tx})}
  wr(x,G.hd||'A step is missing! Which one?',A.W/2,A.H*.07,14,C.tx)}
 function gapPick(i){const g=G.g,[k,miss,ops,ans]=GAP[g.r]||[];if(!k||g.ok)return;const name=ops[i].split(' ')[1];
  if(i!==ans){g.bad=i;A.sound.miss();G.hd='';return say2(name===R[k][R[k].length-1][1]?`${name} is already there at the end. Look at the gap.`:`${name} is not part of this routine. What goes between ${R[k][miss-1][1]} and ${R[k][miss+1][1]}?`)}
  g.ok=1;g.bad=null;A.sound.pop();say2(`Yes! ${R[k][miss-1][1]}, then ${name}, then ${R[k][miss+1][1]}.`);const gg=G.gen;setTimeout(()=>{if(gg!==G.gen)return;g.r++;g.ok=0;say2()},700)}
 // ---- step 3: fewer reminders
 const DAYS=[['Day 1: pictures help',[1,1,1]],['Day 5: no pictures',[0,0,0]]];
 function fadeV(x){const C=A.col,L=R.snack,S=strip(4,A.H*.36),f=G.f,d=DAYS[f.d]||DAYS[1];wr(x,d[0],A.W/2,A.H*.15,13,C.mu,700);
  L.forEach((c2,i)=>{const got=i<=f.k;card(x,S.x(i),S.y,S.w,got||d[1][i-1]?c2:null,{faint:!got,ring:i===f.k+1?C.am:null,ghost:!got&&!d[1][i-1]})});
  f.ops.forEach((j,i)=>card(x,A.W*(i+1)/4,A.H*.8,S.w*.9,L[j],{ring:f.bad===i?C.rd:null}));
  wr(x,G.hd||(f.k<3?`What comes after ${L[f.k][1]}?`:'Snack time done!'),A.W/2,A.H*.07,14,C.tx)}
 function fadeOps(){const f=G.f;f.ops=f.k%2?[3,1,2]:[2,3,1];f.bad=null}
 function fadePick(i){const f=G.f,j=f.ops[i],L=R.snack;if(f.k>=3||f.wait)return;
  if(j!==f.k+1){f.bad=i;A.sound.miss();G.hd='';return say2(`Not ${L[j][1]} yet. ${j<=f.k?'That one is done.':`${L[f.k+1][1]} comes first.`}`)}
  f.k++;f.bad=null;A.sound.pop();if(f.k<3){fadeOps();return say2(`Yes, ${L[j][1]}.`)}
  f.days++;f.wait=1;say2(f.d?'You did it with no pictures at all!':'Well done. Now try it again on day 5, with no pictures.');const g=G.gen;setTimeout(()=>{if(g!==G.gen)return;f.wait=0;if(f.d<1){f.d++;f.k=0;fadeOps()}say2()},700)}
 // ---- step 4: spot Pip's slip
 function slipV(x){const C=A.col,[k,ord]=SLIP[G.s.r]||SLIP[1],L=R[k],S=strip(L.length,A.H*.45);wr(x,"Pip's plan",A.W/2,A.H*.2,13,C.mu,700);
  G.s.now.forEach((j,i)=>card(x,S.x(i),S.y,S.w,L[j],{ring:G.s.fix?C.gr:G.s.bad===i?C.rd:null}));wr(x,G.hd||'Pip mixed up two steps. Tap one',A.W/2,A.H*.07,14,C.tx)}
 function slipLoad(){const s=G.s,d=SLIP[s.r];if(d)s.now=d[1].slice();s.fix=0;s.bad=null}
 function slipTap(i){const s=G.s,d=SLIP[s.r];if(!d||s.fix)return;const L=R[d[0]],j=s.now[i];
  if(j===i){s.bad=i;A.sound.miss();G.hd='';return say2(`${L[j][1]} is in the right place. Look for two steps that are swapped.`)}
  const o=s.now.indexOf(i);[s.now[i],s.now[o]]=[s.now[o],s.now[i]];s.fix=1;A.sound.pop();say2(`Yes! ${L[m0(i,o)][1]} must come before ${L[m1(i,o)][1]}. Swapped back.`);const g=G.gen;setTimeout(()=>{if(g!==G.gen)return;s.r++;slipLoad();say2()},800)}
 // ---- words for the canvas and buttons
 function say2(note){const v=at();let t='';
  if(v==='nownext'){const i=G.nn.i;t=i>=4?'Handwashing done.':`Now: ${R.hand[i][1]}. Choices: ${G.nn.opts.map(j=>R.hand[j][1]).join(', ')}.`}
  else if(v==='build')t=`Boxes: ${G.b.slot.map((j,s)=>`${s+1} ${j==null?'empty':R.out[j][1]}`).join(', ')}.`;
  else if(v==='gap'){const q=GAP[G.g.r];t=q?`Routine: ${R[q[0]].map((c2,i)=>i===q[1]?'gap':c2[1]).join(', ')}.`:'Both gaps filled.'}
  else if(v==='fade')t=`Snack routine, ${(DAYS[G.f.d]||DAYS[1])[0]}. Done: ${R.snack.slice(0,G.f.k+1).map(c2=>c2[1]).join(', ')}.`;
  else if(v==='slip'){const d=SLIP[G.s.r];t=d?`Pip's plan: ${G.s.now.map(j=>R[d[0]][j][1]).join(', ')}.`:'Both plans fixed.'}
  else t='Challenge time.';voice((note?note+' ':'')+t);keys();G.cb()}
 function keys(){if(!A||!row)return;row.innerHTML='';const v=at();
  const B=(t,f,al)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||null},row,t);e.onclick=f};
  if(v==='nownext'&&G.nn.i<4&&!G.nn.ok)G.nn.opts.forEach((j,k)=>B(R.hand[j].join(' '),()=>nnPick(k),`${R.hand[j][1]} is next`));
  if(v==='build'){const b=G.b;if(b.sel==null)b.hand.forEach((j,k)=>{if(j!=null)B(R.out[j].join(' '),()=>{b.sel=k;A.sound.tick();keys()},`Pick ${R.out[j][1]}`)});
   else{[0,1,2,3].forEach(s=>{if(b.slot[s]==null)B('Box '+(s+1),()=>buildPut(b.sel,s),`Put it in box ${s+1}`)});B('✋ Another',()=>{b.sel=null;keys()},'Pick another card')}}
  if(v==='gap'&&GAP[G.g.r]&&!G.g.ok)GAP[G.g.r][2].forEach((o,i)=>B(o,()=>gapPick(i),`${o.split(' ')[1]} goes in the gap`));
  if(v==='fade'&&G.f.k<3)G.f.ops.forEach((j,i)=>B(R.snack[j].join(' '),()=>fadePick(i),`${R.snack[j][1]} is next`));
  if(v==='slip'&&SLIP[G.s.r]&&!G.s.fix)G.s.now.forEach((j,i)=>B(R[SLIP[G.s.r][0]][j].join(' '),()=>slipTap(i),`Card ${i+1}: ${R[SLIP[G.s.r][0]][j][1]}. Tap if it is in the wrong place`));
  A.redraw()}
 const fin=(k,test,say)=>()=>{if(A.step===k&&test()&&(!steps[k].predict||A.pred[k]!=null))A.done(say()+A.reveal(k))};
 const tick=(fs,gap)=>{const g=G.gen;fs.forEach((f,j)=>setTimeout(()=>{if(g===G.gen)f()},j*gap))};
 const wipe=()=>{G.gen++;G.cb=()=>{};G.hold=null;G.pt=null;G.hd=''};
 const steps=[
  {h:'Now and next',p:'Now we wet our hands. What comes next? Drag the right card to Next.',task:'Pick the next step 3 times',
   show:()=>{steps[0].go();const a=()=>nnPick(G.nn.opts.indexOf(G.nn.i+1));tick([a,a,a],800)},
   go:()=>{wipe();G.nn={i:0,done:0};nnRound();say2();G.cb=fin(0,()=>G.nn.done>=3,()=>'Now and next helps you remember the next step.')}},
  {h:'Order matters',p:'Time to go out! Drag each card to its box: 1 is first.',predict:{q:'Can shoes go on before socks?',opts:['Yes, any order','No, socks first'],ans:1},task:'Put all 4 cards in order',
   show:()=>{steps[1].go();tick([0,1,2,3].map(s=>()=>buildPut(G.b.hand.indexOf(s),s)),450)},
   go:()=>{wipe();G.b={slot:[null,null,null,null],hand:[2,0,3,1],sel:null,bad:null};say2();G.cb=fin(1,()=>G.b.slot.every(v=>v!=null),()=>'Socks, shoes, coat, door. Some steps must come first.')}},
  {h:'What is missing?',p:'A step fell out! Find the card that fills the gap.',task:'Fill both gaps',
   show:()=>{steps[2].go();const a=()=>gapPick(GAP[G.g.r][3]);tick([a,a],900)},go:()=>{wipe();G.g={r:0,ok:0,bad:null};say2();G.cb=fin(2,()=>G.g.r>=GAP.length,()=>'Thinking what comes before and after helps you find a missing step.')}},
  {h:'Fewer reminders',p:'Snack time. First with pictures, then again with no pictures.',predict:{q:'Doing a routine every day makes it...',opts:['Harder to remember','Easier to remember'],ans:1},task:'Do snack time with no pictures',
   show:()=>{steps[3].go();const a=()=>fadePick(G.f.ops.indexOf(G.f.k+1));tick([a,a,a,()=>{},a,a,a],450)},
   go:()=>{wipe();G.f={d:0,k:0,days:0,wait:0};fadeOps();say2();G.cb=fin(3,()=>G.f.days>=2,()=>'The more you do a routine, the less you need reminders.')}},
  {h:'Spot Pip’s slip',p:'Pip made a plan, but two steps are swapped. Tap one of them to fix it.',task:'Fix both plans',
   show:()=>{steps[4].go();const a=()=>{const s=G.s;slipTap(s.now.findIndex((j,i)=>j!==i))};tick([a,a],1000)},
   go:()=>{wipe();G.s={r:0};slipLoad();say2();G.cb=fin(4,()=>G.s.r>=SLIP.length,()=>'You noticed when a step was in the wrong place.')}},
  {h:'Challenge',p:'',go:()=>{wipe();pose()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>G.cb()});
 const QZ=[['You put on socks. What comes next?','🧦',[['Shoes','ok'],['Socks again','again'],['Bed','bed']]],
  ['You have soap on your hands. What comes next?','🧼',[['Rub your hands','ok'],['Dry them','dry'],['Eat a snack','snack']]],
  ['Bath, pyjamas, ... , story. What is missing?','🛁',[['Teeth','ok'],['Shoes','shoes'],['Breakfast','bfast']]],
  ['Pip puts shoes on, then socks. What went wrong?','👟',[['Socks go first','ok'],['Nothing','fine'],['Shoes go last of all','last']]],
  ['What helps you remember a routine?','📋',[['Doing it every day','ok'],['Doing it once','once'],['Skipping steps','skip']]],
  ['Snack is eaten. What is the last step?','🍎',[['Tidy up','ok'],['Wash hands','wash'],['Sit down','sit']]]];
 let qi=-1,sc=0;
 function quizV(x){const s=QZ[qi%QZ.length][1];wr(x,s,A.W/2,A.H/2,Math.round(m0(A.W,A.H)*.3),A.col.tx,400)}
 function pose(){qi++;const[q,,ops]=QZ[qi%QZ.length],r=qi%3;
  cbox.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const rw=cbox.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,tag])=>{const b=c.el('button',{type:'button',class:'lbtn'},rw,o);b.onclick=()=>judge(tag)});voice('Challenge: '+q);A.redraw()}
 function judge(tag){cbox.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const fb=cbox.querySelector('.fl-fb');let m;
  switch(tag){case 'ok':m='Yes!';break;
   case 'again':m='Socks are on already. Next come the shoes, over the socks.';break;
   case 'bed':m='Bed is for night. After socks, the shoes go on.';break;
   case 'dry':m='Not yet! Rub, then rinse the soap off, then dry.';break;
   case 'snack':m='Snack is after the hands are clean. Rub the soap first.';break;
   case 'shoes':m='Shoes are for going out, not bedtime. Teeth go between pyjamas and story.';break;
   case 'bfast':m='Breakfast is in the morning. At bedtime, teeth come before the story.';break;
   case 'fine':m='Something went wrong. Shoes will not fit over feet with socks after.';break;
   case 'last':m='The door is last of all. The slip was socks after shoes.';break;
   case 'once':m='Once is not enough. Doing it every day makes it easy to remember.';break;
   case 'skip':m='Skipping steps makes it harder. Do every step, every day.';break;
   case 'wash':m='Wash hands comes first, before you eat. Tidy up is last.';break;
   default:m='You sit down before you eat. After eating, tidy up.'}
  const good=tag==='ok';if(good){sc++;A.win()}else{sc=0;A.sound.miss()}fb.innerHTML=`${good?'✓':'✗'} ${m}${good?` Stars: ${sc}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=pose}
 function draw(A){const{ctx:x,W,H,col:C}=A;x.fillStyle=A.mix(C.pn,'#fef3c7',C.dark?.05:.4);x.fillRect(0,0,W,H);
  ({nownext:nnV,build:buildV,gap:gapV,fade:fadeV,slip:slipV,quiz:quizV})[at()](x);A.fx.draw(x)}
 const by=(p,X,Y,d)=>Math.hypot(p.x-X,p.y-Y)<d;
 const lowK=(p,n,w)=>[...Array(n).keys()].find(k=>by(p,A.W*(k+1)/(n+1),A.H*.8,w));
 function pd(p){const v=at();G.hold=null;G.pt=null;G.mv=0;G.p0=p;const w=m0(A.W*.1,A.H*.1);
  if(v==='nownext'){const k=lowK(p,3,w*1.4);if(k!=null&&!G.nn.ok){G.hold=k;return true}return false}
  if(v==='build'){const k=lowK(p,4,w*1.2);if(k!=null&&G.b.hand[k]!=null){G.hold=k;return true}if(G.b.sel!=null){const S=strip(4,A.H*.36),s=[0,1,2,3].find(s=>by(p,S.x(s),S.y,S.w*.7));if(s!=null)buildPut(G.b.sel,s)}return false}
  if(v==='gap'){const k=lowK(p,3,w*1.4);if(k!=null){G.hold=k;return true}return false}
  if(v==='fade'){const k=lowK(p,3,w*1.4);if(k!=null)fadePick(k);return false}
  if(v==='slip'){const d=SLIP[G.s.r];if(d){const S=strip(d[1].length,A.H*.45),i=d[1].findIndex((j,i)=>by(p,S.x(i),S.y,S.w*.7));if(i>=0)slipTap(i)}return false}return false}
 function pm(p){if(G.hold==null)return;if(Math.hypot(p.x-G.p0.x,p.y-G.p0.y)>10)G.mv=1;G.pt=p;A.redraw()}
 function pu(p){const k=G.hold,v=at(),mv=G.mv;G.hold=null;G.mv=0;G.pt=null;if(k==null)return;const high=p.y<A.H*.62;
  if(v==='nownext'){if(!mv||(high&&p.x>A.W*.45))nnPick(k);else A.redraw();return}
  if(v==='gap'){if(!mv||high)gapPick(k);else A.redraw();return}
  if(v==='build'){if(!mv){G.b.sel=k;A.sound.tick();return say2(`${R.out[G.b.hand[k]][1]} picked. Tap a box.`)}const S=strip(4,A.H*.36),s=[0,1,2,3].find(s=>by(p,S.x(s),S.y,S.w*.8));if(s!=null)buildPut(k,s);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.62,tall:1.15,draw,onStep:A=>{cbox.hidden=A.step!==5;aria.hidden=A.step===5;row.hidden=A.step===5;keys()},
  init:A=>{const E=c.el,bx=E('div',{class:'fl-below'},A.below);aria=E('p',{class:'fl-read','aria-hidden':'true'});
   row=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},bx);cbox=E('div',{class:'fl-chal'},A.below);
   G.nn={i:0,done:0,opts:[1,2,3]};A.gest({down:pd,move:pm,up:pu});keys()}});
 A.start()})})();
