/* Flagship – reading Shakespeare in context (14–16), built on Macbeth (first staged about 1606). Match Early Modern words to
   their modern meaning (with "where" as the classic trap for "wherefore"); tap through paraphrases of "Stars, hide your fires"
   until each line means what Macbeth means; rebuild the Great Chain of Being; spot the signs of nature thrown into disorder
   after Duncan's murder (Act 2 Scene 4); then link details of the play to beliefs and events of King James's England. */
(()=>{const OLD=['thou','art','hath','doth','wherefore','ere'],NEW=['before','why','are','you','where','does','has'],OK=[3,2,6,5,1,0];
 const DET=['The witches and their prophecies','Banquo’s line of eight kings','The Porter’s joke about an “equivocator”','Lady Macbeth: “unsex me here”'],
  CTX=['Women were expected to be gentle and obey','In 1606 a priest linked to the Gunpowder Plot defended “equivocation” at his trial','King James wrote a book on witchcraft, Daemonologie (1597)','King James was said to descend from Banquo'],DK=[2,3,1,0],
  DHINT=['The witches link to what the king himself feared and wrote about.','Eight kings who descend from Banquo flatter someone in the audience.','An equivocator twists words to dodge the truth. Who was on trial for that in 1606?','She asks to lose the gentleness her time expected of women.'];
 const LN=['Stars, hide your fires;','Let not light see my black and deep desires.','The eye wink at the hand; yet let that be / Which the eye fears, when it is done, to see.'],
  PO=[['Stars, stop burning forever,','Let the night be dark,','Stars, shine down on me,'],['so daylight cannot touch my dark-coloured dreams.','so no one sees the evil thing I secretly want.','so I can forget my sad thoughts.'],
   ['Let my eye blink at my hand, and let my eye feel scared.','Let me not watch what my hand does, but let it happen, though I will dread seeing it.','Let me shut my eyes and decide not to do it.']],PK=[1,1,1],
  PF=[['Too literal: he is not asking the stars to die. Ask what he wants the dark for.','Not what he says: he wants darkness, not light.'],['Too literal: the “light” is people seeing, and “black” means evil, not a colour.','No: “desires” are wants, not sad thoughts.'],
   ['Too literal: “wink at” means shut your eyes to something, and “that” is the deed.','The opposite: “yet let that be” means let it happen anyway.']];
 const RANK=['God','Angels','The king','Nobles','Common people','Animals'],
  SG=[['The Captain praises Macbeth’s courage in battle (Act 1)',0],['By day, “dark night strangles the travelling lamp”: the sun stays hidden',1],['Duncan thanks Macbeth and names Malcolm as his heir',0],
   ['A falcon is killed by “a mousing owl”, a lowly bird',1],['Macbeth writes to his wife about the witches',0],['Duncan’s horses turn wild and “eat each other”',1]];
VIS.reg('flagbard',c=>{let A,ctl,chal,live;
 const S={pr:{},sel:-1,po:[0,0,0],ord:[3,0,5,2,4,1],sg:[],hold:null,at:null,note:'',fn:()=>{},tok:0};
 const kind=()=>['word','para','chain','sign','link','quiz'][A.step],two=()=>kind()==='word'||kind()==='link';
 const L=()=>kind()==='word'?OLD:DET,R=()=>kind()==='word'?NEW:CTX,K=()=>kind()==='word'?OK:DK;
 function wrap(x,s,X,Y,w,lh,max){const o=[];let r='';for(const t of s.split(' ')){const q=r?r+' '+t:t;if(r&&x.measureText(q).width>w){o.push(r);r=t}else r=q}o.push(r);o.slice(0,max||9).forEach((l,i)=>x.fillText(l,X,Y+i*lh));return Math.min(o.length,max||9)}
 function stack(n,x,w,top,bot){const g=6,h=(bot-top-g*(n-1))/n;return[...Array(n)].map((_,i)=>({i,x,y:top+i*(h+g),w,h}))}
 const inR=(p,b)=>b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
 function cols(){const w=(A.W-24)/2,t=38,b=A.H-8;return{l:stack(L().length,8,w,t,b),r:stack(R().length,16+w,w,t,b)}}
 function box(x,b,fill,edge,lw){x.fillStyle=fill;A.paint.rrect(b.x,b.y,b.w,b.h,10);x.fill();x.strokeStyle=edge;x.lineWidth=lw||1.3;x.stroke()}
 function draw(A){const{ctx:x,W,H,col:C}=A,k=kind(),f=n=>`${n} ${A.narrow?13:14}px system-ui`;x.fillStyle=A.mix(C.pn,C.vi,.05);x.fillRect(0,0,W,H);x.textAlign='left';x.textBaseline='alphabetic';
  x.fillStyle=C.tx;x.font=`800 ${A.narrow?15:17}px system-ui`;
  if(two()){x.fillText(k==='word'?'Old word → modern meaning':'In the play → in 1606',10,24);const{l,r}=cols(),sm=k==='link'&&A.narrow;
   for(const[i,j]of Object.entries(S.pr)){const a=l[i],b=r[j];x.strokeStyle=C.gr;x.lineWidth=3;x.beginPath();x.moveTo(a.x+a.w,a.y+a.h/2);x.lineTo(b.x,b.y+b.h/2);x.stroke()}
   l.forEach(b=>{const m=S.pr[b.i]!=null,s=S.sel===b.i;box(x,b,m?A.mix(C.pn,C.gr,.15):s?A.mix(C.pn,C.am,.25):C.pn,m?C.gr:s?C.am:A.alpha(C.tx,.35),s?2.5:1.3);x.fillStyle=C.tx;
    x.font=k==='word'?f('italic 800'):f(sm?'600':'700');if(sm)x.font='600 12px system-ui';wrap(x,(k==='link'?(b.i+1)+'. ':'')+L()[b.i],b.x+8,b.y+(k==='word'?b.h/2+5:16),b.w-14,sm?14:16,Math.max(1,Math.floor((b.h-4)/(sm?14:16))))});
   r.forEach(b=>{const u=Object.values(S.pr).includes(b.i);box(x,b,u?A.mix(C.pn,C.gr,.15):A.mix(C.pn,C.cy,.08),u?C.gr:A.alpha(C.cy,.6));x.fillStyle=C.tx;x.font=sm?'600 12px system-ui':f('600');
    wrap(x,(k==='link'?'ABCD'[b.i]+'. ':'')+R()[b.i],b.x+8,b.y+(k==='word'?b.h/2+5:16),b.w-14,sm?14:16,Math.max(1,Math.floor((b.h-4)/(sm?14:16))))});
   if(S.hold&&S.at&&S.sel>=0){const a=l[S.sel];x.strokeStyle=C.am;x.setLineDash([6,5]);x.lineWidth=2.5;x.beginPath();x.moveTo(a.x+a.w,a.y+a.h/2);x.lineTo(S.at.x,S.at.y);x.stroke();x.setLineDash([])}}
  if(k==='para'){x.fillText('Macbeth, Act 1 Scene 4',10,24);stack(3,8,W-16,38,H-70).forEach(b=>{const ok=S.po[b.i]===PK[b.i];box(x,b,ok?A.mix(C.pn,C.gr,.14):C.pn,ok?C.gr:A.alpha(C.tx,.35));
    x.fillStyle=C.vi;x.font=f('italic 700');const n=wrap(x,LN[b.i],b.x+10,b.y+20,b.w-20,17,3);x.fillStyle=C.tx;x.font=f('600');wrap(x,'→ '+PO[b.i][S.po[b.i]],b.x+10,b.y+26+n*17,b.w-20,17,3)});
   x.fillStyle=C.mu;x.font=f('600');wrap(x,S.note,10,H-48,W-20,16,3)}
  if(k==='chain'){x.fillText('The Great Chain of Being',10,24);if(!A.narrow){x.font='600 12px system-ui';x.fillStyle=C.mu;x.fillText('top: closest to God',W-140,24)}
   stack(6,8,W-16,36,H-56).forEach(b=>{const r=S.ord[b.i],ok=r===b.i,dr=S.hold&&S.drag===b.i,P=dr&&S.at?{...b,y:S.at.y-b.h/2}:b;box(x,P,ok?A.mix(C.pn,C.gr,.14):C.pn,ok?C.gr:A.alpha(C.tx,.35),dr?2.5:1.3);
    x.fillStyle=C.am;x.font='800 13px system-ui';x.fillText(b.i+1,P.x+10,P.y+P.h/2+5);x.fillStyle=C.tx;x.font=f('700');x.fillText(RANK[r]+(r===2?' 👑':''),P.x+34,P.y+P.h/2+5)});x.fillStyle=C.mu;x.font=f('600');wrap(x,S.note,10,H-36,W-20,16,2)}
  if(k==='sign'){x.fillText('Which events show nature out of order?',10,24);stack(6,8,W-16,36,H-56).forEach(b=>{const on=S.sg.includes(b.i),bad=on&&!SG[b.i][1];
    box(x,b,on?A.mix(C.pn,bad?C.rd:C.gr,.16):C.pn,on?(bad?C.rd:C.gr):A.alpha(C.tx,.35));x.fillStyle=C.tx;x.font=f('600');wrap(x,(on?(bad?'✗ ':'✓ '):'')+SG[b.i][0],b.x+10,b.y+18,b.w-20,15,Math.max(1,Math.floor((b.h-6)/15)))});
   x.fillStyle=C.mu;x.font=f('600');wrap(x,S.note,10,H-36,W-20,16,2)}
  if(k==='quiz'&&S.q){box(x,{x:10,y:10,w:W-20,h:H-20},A.mix(C.pn,C.vi,.12),A.alpha(C.vi,.5));x.fillStyle=C.tx;x.font=`700 ${A.narrow?15:17}px system-ui`;const n=wrap(x,S.q[0],26,42,W-52,22,6);x.font=f('600');x.fillStyle=C.mu;let y=60+n*22;[['Decoder',OLD.map((w,i)=>w+' = '+NEW[OK[i]]).join(' · ')],['Chain',RANK.join(' › ')]].forEach(([h,t])=>{x.fillStyle=C.vi;x.font=f('800');x.fillText(h,26,y);x.fillStyle=C.mu;x.font=f('600');y+=20+18*wrap(x,t,26,y+20,W-52,18,4)+8});
   if(S.q.done){x.fillStyle=C.gr;x.font=f('700');wrap(x,'✓ '+S.q[1],26,H-60,W-52,18,2)}}
  A.fx.draw(x)}
 function say(m){S.note=m||'';const k=kind();let t=m||'';
  if(two())t+=' Linked: '+(Object.entries(S.pr).map(([i,j])=>L()[i]+' to '+R()[j]).join('; ')||'none')+'.'+(S.sel>=0?' Holding: '+L()[S.sel]+'.':'');
  if(k==='para')t+=' Paraphrase: '+S.po.map((v,i)=>PO[i][v]).join(' ');if(k==='chain')t+=' Order from top: '+S.ord.map(r=>RANK[r]).join(', ')+'.';
  if(k==='sign')t+=' Marked: '+(S.sg.map(i=>i+1).join(', ')||'none')+'.';A.cv.setAttribute('aria-label',t.trim()||'Shakespeare lab');c.say(t);if(live)live.textContent=m||'';pads();A.redraw();S.fn()}
 function link(i,j){if(S.pr[i]!=null||Object.values(S.pr).includes(j))return say('That one is already linked.');S.sel=-1;
  if(K()[i]===j){S.pr[i]=j;A.sound.pop();say(kind()==='word'?`Yes: “${OLD[i]}” means “${NEW[j]}”.`+(i===0?' Thou is “you” for one person: a friend, a child or someone of lower rank.':''):`Linked: ${DET[i]} fits its time.`)}
  else{A.sound.miss();say(kind()==='link'?DHINT[i]:i===4&&j===4?'The classic slip: wherefore means why, not where. Juliet asks why Romeo must be a Montague.':i===1&&j===2?'Close, but no: thou art means you are, so art is “are”.':`“${OLD[i]}” does not mean “${NEW[j]}”. Try it in a sentence: does it make sense?`)}}
 function pick(i){if(S.pr[i]!=null)return;S.sel=i;A.sound.tick();say((kind()==='word'?'Holding “':'Holding: ')+L()[i]+(kind()==='word'?'”':'')+'. Now tap its match.')}
 function cyc(i,to){S.po[i]=to==null?(S.po[i]+1)%3:to;const v=S.po[i];if(v===PK[i]){A.sound.pop();say('Line '+(i+1)+' now means what Macbeth means.')}else{A.sound.miss();say(PF[i][v===0?0:1])}}
 function bad(){const o=S.ord;for(let p=0;p<6;p++)if(o[p]!==p){const r=o[p];return r>p?`${RANK[r]} is too high: ${RANK[p]} ranks above it.`:''}return''}
 function swap(a,b){if(a===b||b<0||b>5)return;[S.ord[a],S.ord[b]]=[S.ord[b],S.ord[a]];A.sound.tick();const k=S.ord.indexOf(2),n=S.ord.indexOf(3);
  say(S.ord.every((r,i)=>r===i)?'That is the order: God, angels, the king, nobles, common people, animals.':n<k?'The king must sit above the nobles: by divine right, God put him there.':bad()||'Keep going.')}
 function sign(i){if(S.sg.includes(i))return;S.sg.push(i);if(SG[i][1]){A.sound.pop();say('Yes: nature itself is upside down after a king is killed.')}else{A.sound.miss();say('That happens before the murder, and nothing in nature is wrong. Look for nature turned upside down.')}}
 function pads(){if(!ctl)return;ctl.innerHTML='';const k=kind(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn sm ghost','aria-label':l||null},ctl,t).onclick=f};
  if(two()){if(S.sel<0)L().forEach((w,i)=>{if(S.pr[i]==null)b(k==='word'?w:'Detail '+(i+1),()=>pick(i),'Pick '+w)});else R().forEach((w,j)=>{if(!Object.values(S.pr).includes(j))b(k==='word'?'= '+w:'Fact '+'ABCD'[j],()=>link(S.sel,j),`Link ${L()[S.sel]} to ${w}`)})}
  if(k==='para')LN.forEach((l,i)=>b('Change line '+(i+1),()=>cyc(i),'Try another paraphrase of: '+l));
  if(k==='chain')S.ord.forEach((r,p)=>{if(p)b('↑ '+RANK[r],()=>swap(p,p-1),`Move ${RANK[r]} up one place`)});
  if(k==='sign')SG.forEach((s,i)=>{if(!S.sg.includes(i))b('Mark '+(i+1),()=>sign(i),'Mark as nature out of order: '+s[0])})}
 const fin=(n,ok,m)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(m+A.reveal(n))};
 const seq=(fs,ms)=>{const t=++S.tok;fs.forEach((f,j)=>setTimeout(()=>{if(t===S.tok)f()},j*ms))};
 const reset=()=>{S.tok++;S.fn=()=>{};S.pr={};S.sel=-1;S.po=[0,0,0];S.ord=[3,0,5,2,4,1];S.sg=[];S.note=''};
 function sortShow(){const fs=[];const o=S.ord.slice();for(let p=0;p<6;p++){let q=o.indexOf(p);while(q>p){const a=q;fs.push(()=>swap(a,a-1));[o[q],o[q-1]]=[o[q-1],o[q]];q--}}seq(fs,350)}
 const steps=[
  {h:'Old words, new meaning',p:'Shakespeare’s English is early modern English. Most words are ours, but a few small ones trip readers up. Drag each old word to its meaning, or tap one then the other.',
   predict:{q:'Juliet asks, “Wherefore art thou Romeo?” What does she mean?',opts:['Where are you, Romeo?','Why are you Romeo, a son of the family I must hate?'],ans:1},
   task:'Match all six old words',show:()=>seq(OLD.map((w,i)=>()=>link(i,OK[i])),450),go:()=>{reset();S.fn=fin(0,()=>Object.keys(S.pr).length===6,'Swap in these meanings and most lines open up. Wherefore is the famous trap.')}},
  {h:'Paraphrase a key speech',p:'The king has just named his son Malcolm as the next king. Macbeth turns aside. Tap each line to try a paraphrase until it says what he means.',
   predict:{q:'What does Macbeth want the dark to hide?',opts:['The stars, because they are too bright','His secret wish to kill the king','His sadness about the war'],ans:1},
   task:'Make all three lines mean what he means',show:()=>seq(PK.map((v,i)=>()=>cyc(i,v)),500),go:()=>{reset();S.fn=fin(1,()=>S.po.every((v,i)=>v===PK[i]),'A good paraphrase keeps the meaning, not the picture. Darkness here is cover for murder.')}},
  {h:'The Great Chain of Being',p:'Many in Shakespeare’s time believed God had ranked everything in one chain. Drag a card onto another to swap them, or use the buttons. Put the top rank first.',
   predict:{q:'In 1606, who did most people believe chose the king?',opts:['The people, by voting','God','The strongest lord'],ans:1},
   task:'Rebuild the chain from God down',show:sortShow,go:()=>{reset();S.fn=fin(2,()=>S.ord.every((r,i)=>r===i),'Kill the king and you attack God’s order, not just one man.')}},
  {h:'Nature out of order',p:'Act 2 Scene 4, the morning after Duncan is murdered. Tap each event that shows nature itself gone wrong.',
   predict:{q:'How would a 1606 audience see the murder of a king?',opts:['As a crime against one man','As a crime against God and all of nature'],ans:1},
   task:'Find the three signs of disorder',show:()=>seq([1,3,5].map(i=>()=>sign(i)),500),go:()=>{reset();S.fn=fin(3,()=>[1,3,5].every(i=>S.sg.includes(i)),'Day turns to night and animals turn on their betters, because the chain has snapped.')}},
  {h:'Link the play to its time',p:'Context is only useful when it explains something in the play. Link each detail to the belief or event it speaks to.',
   task:'Link all four details',show:()=>seq(DK.map((j,i)=>()=>link(i,j)),500),go:()=>{reset();S.fn=fin(4,()=>Object.keys(S.pr).length===4,'Each link explains a choice in the play. Facts that explain nothing, like Shakespeare’s birthday, add no marks.')}},
  {h:'Challenge',p:'',go:()=>{S.tok++;S.fn=()=>{};ask()}}];
 steps.forEach(s=>{if(s.task)s.onPredict=()=>S.fn()});
 const QB=[['“Wherefore should I stay?” means:','Why should I stay?',[['Where should I stay?','where'],['When should I stay?','word']]],
  ['Lady Macbeth: “Look like th’ innocent flower, / But be the serpent under’t.” Best paraphrase?','Seem harmless, but be deadly underneath.',[['Hide a real snake under a flower.','lit'],['Be as kind and sweet as a flower.','half']]],
  ['Why would a 1606 audience be shocked when Duncan is killed?','Killing a king broke the order God had made.',[['Duncan was a weak king nobody liked.','small'],['Murder was never shown on stage then.','fact']]],
  ['Which sentence uses context best?','A Jacobean audience, who believed God chose kings, would see Duncan’s murder as a sin against heaven.',[['Shakespeare was born in Stratford in 1564.','bolt'],['Plays were staged in daylight because there was no electricity.','bolt']]],
  ['Why did the witches frighten audiences in 1606 more than most people today?','Many, King James included, believed witches were real and served the devil.',[['Witches were a brand-new idea in 1606.','fact'],['The witches wore frightening costumes.','bolt']]],
  ['“Is this a dagger which I see before me?” What does it show?','Macbeth’s mind is troubled by the murder he plans.',[['Macbeth has found a real dagger.','lit'],['Macbeth is calm and sure.','half']]],
  ['“Thou hast it now.” In modern English?','You have it now.',[['Where do you have it now?','where'],['They have it now.','word']]]];
 let qn=-1,run=0;
 function ask(){qn++;const[q,key,wr]=QB[qn%QB.length],o=[key,...wr.map(w=>w[0])],r=qn%3,op=o.slice(r).concat(o.slice(0,r));S.q=[q,key];
  chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  op.forEach(w=>{c.el('button',{type:'button',class:'lbtn sm'},chal.querySelector('.fl-pick'),w).onclick=()=>judge(w)});A.cv.setAttribute('aria-label','Challenge: '+q);c.say('Challenge: '+q);A.redraw()}
 function judge(w){chal.querySelectorAll('.fl-pick button').forEach(e=>e.disabled=true);const[,key,wr]=QB[qn%QB.length],ok=w===key,tag=(wr.find(x=>x[0]===w)||[])[1];let m;
  if(ok)m='Right.';else if(tag==='where')m='Wherefore means why, not where. Swap in “why” and the line makes sense.';
  else if(tag==='lit')m='Too literal. Shakespeare uses pictures: ask what the picture stands for.';
  else if(tag==='half')m='That reads only half the line. Look for the turn, such as “but”, and what the rest shows.';
  else if(tag==='small')m='Think bigger: a king was God’s choice, so the crime is against the whole order, not one man.';
  else if(tag==='bolt')m='True, maybe, but it explains nothing in the play. Good context changes how a line is understood.';
  else if(tag==='fact')m='Not true for 1606. Check the belief of the time before you build a point on it.';
  else m='Check the old word in a sentence: wherefore is why, hast is have, thou is you.';
  S.q.done=1;A.redraw();if(ok){run++;A.win()}else{run=0;A.sound.miss()}const fb=chal.querySelector('.fl-fb');fb.innerHTML=`${ok?'✓':'✗'} ${m}${ok?` Streak: ${run}.`:` Answer: ${key}`} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}
 function down(p){const k=kind();if(k==='quiz')return false;
  if(two()){const{l,r}=cols(),a=l.find(b=>inR(p,b)),z=r.find(b=>inR(p,b));if(a&&S.pr[a.i]==null){pick(a.i);S.hold=1;S.at=p;return true}if(z&&S.sel>=0)link(S.sel,z.i);return false}
  const B=k==='para'?stack(3,8,A.W-16,38,A.H-70):stack(6,8,A.W-16,36,A.H-56),h=B.find(b=>inR(p,b));if(!h)return false;
  if(k==='para'){cyc(h.i);return false}if(k==='sign'){sign(h.i);return false}S.drag=h.i;S.hold=1;S.at=p;A.redraw();return true}
 function move(p){if(S.hold){S.at=p;A.redraw()}}
 function up(p){const k=kind();if(!S.hold)return;S.hold=null;p=p||S.at;
  if(two()){const z=cols().r.find(b=>inR(p,b));if(z&&S.sel>=0)link(S.sel,z.i);else A.redraw();return}
  if(k==='chain'){const t=stack(6,8,A.W-16,36,A.H-56).find(b=>inR(p,b));if(t&&t.i!==S.drag)swap(S.drag,t.i);else A.redraw()}}
 A=FK.shell(c,{steps,ratio:.66,tall:1.45,draw,onStep:A=>{const q=A.step===5;chal.hidden=!q;live.hidden=q;ctl.hidden=q;pads();A.cv.setAttribute('aria-label',steps[A.step].p||'Challenge')},
  init:A=>{const E=c.el,box=E('div',{class:'fl-below'},A.below);live=E('p',{class:'fl-read','aria-hidden':'true'},box);
   ctl=E('div',{class:'fl-ctl',role:'group','aria-label':'Shakespeare lab controls'},box);chal=E('div',{class:'fl-chal'},A.below);A.gest({down,move,up});pads()}});
 A.start()})})();
