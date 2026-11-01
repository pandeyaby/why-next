/* Flagship – right and wrong choices (ages 5–7): choose kind or unkind and watch how the other child feels; play out
   telling the truth, hiding it or blaming the cat after an accident and see Mum's trust change; drag things into
   "ask first" or "mine to use"; share six strawberries fairly between three plates; take the harder right path. */
(()=>{
const KIND=[{e:'⚽',who:'Tom',q:'Tom wants a go with the ball.',ok:'Give Tom a turn',no:'Keep the ball all day',sad:'Tom feels left out and sad.',glad:'Tom smiles. Now you both play.'},
 {e:'🩹',who:'Ben',q:'Ben falls over and hurts his knee.',ok:'Help Ben up',no:'Laugh at Ben',sad:'Laughing hurts Ben’s feelings, as well as his knee.',glad:'Ben feels better. That was kind.'},
 {e:'👋',who:'Ava',q:'Ava is new. She stands on her own.',ok:'Ask Ava to play',no:'Walk past Ava',sad:'Ava feels lonely when no one asks her.',glad:'Ava has a new friend.'}];
const TALE={tell:{t:'Tell Mum the truth',f:['Zara: I broke your cup. Sorry!','Mum: Thank you for telling me.','They sweep it up together.'],trust:3},
 hide:{t:'Hide the bits',f:['Zara hides the bits under her bed.','Mum finds them.','Mum is sad that Zara did not tell her.'],trust:1},
 cat:{t:'Say the cat did it',f:['Zara: The cat did it!','The cat gets told off.','Mum finds out. Now she trusts Zara less.'],trust:0}};
const THINGS=[['🖍️','Ben’s crayons',0],['🧸','My own teddy',1],['✂️','Teacher’s scissors',0],['🚗','Toy car in the park',0],['🥪','My lunch',1],['🧥','Mia’s coat',0]];
const PATH=[{q:'A friend says: take a sweet from the shop. No one will see.',ok:'Say no and leave it',no:'Take a sweet',why:'Taking it without paying is stealing, even when no one sees.'},
 {q:'You spill paint on the floor. No one saw you.',ok:'Tell the teacher',no:'Walk away',why:'Someone could slip. It was an accident, and telling helps fix it.'},
 {q:'Some children are calling Sam names.',ok:'Say stop and tell a grown-up',no:'Join in so they like you',why:'Name calling hurts. Joining in makes it worse for Sam.'}];
const KIDS=['Zara','Tom','Ben'];
VIS.reg('flagright',c=>{let A,pad,quiz,qn=-1,tok=0;c.fig.classList.add('young');
const blank=()=>({cb:()=>{},r:0,won:0,face:0,seen:{},tale:null,frame:0,trust:2,bin:{},held:null,pick:-1,plate:[0,0,0],bowl:6,flash:-1,hit:[]}),S=blank();
const part=()=>['kind','truth','own','fair','hard','quiz'][A.step];
const big=n=>Math.round(n*(A.narrow?1:1.15)),fast=()=>A.reduced();
const tellAT=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function words(g,t,x,y,max,px,col,bold){g.font=`${bold?800:600} ${big(px)}px system-ui,sans-serif`;g.fillStyle=col||A.col.tx;g.textAlign='center';g.textBaseline='middle';
 const out=[];let line='';t.split(' ').forEach(w=>{const tr=line?line+' '+w:w;if(g.measureText(tr).width>max&&line){out.push(line);line=w}else line=tr});out.push(line);
 const lh=big(px)*1.25;out.forEach((l,i)=>g.fillText(l,x,y+(i-(out.length-1)/2)*lh));return out.length*lh}
function card(g,x,y,w,h,t,tone,act){const C=A.col;g.fillStyle=A.alpha(tone,.2);A.paint.rrect(x,y,w,h,16);g.fill();g.strokeStyle=tone;g.lineWidth=3;A.paint.rrect(x,y,w,h,16);g.stroke();
 words(g,t,x+w/2,y+h/2,w-16,14,C.tx,1);if(act)S.hit.push({x,y,w,h,act})}
function face(g,x,y,r,mood){const C=A.col;A.paint.ball(x,y,r,mood>0?'#fcd34d':mood<0?'#93c5fd':'#fde68a');g.fillStyle='#1f2937';
 [-.35,.35].forEach(d=>{g.beginPath();g.arc(x+d*r,y-r*.2,r*.1,0,7);g.fill()});g.strokeStyle='#1f2937';g.lineWidth=Math.max(2,r*.08);g.beginPath();
 if(mood>0)g.arc(x,y+r*.05,r*.45,.2*Math.PI,.8*Math.PI);else if(mood<0)g.arc(x,y+r*.6,r*.4,1.2*Math.PI,1.8*Math.PI);else{g.moveTo(x-r*.3,y+r*.35);g.lineTo(x+r*.3,y+r*.35)}g.stroke();
 if(mood<0){g.fillStyle='#2563eb';g.beginPath();g.ellipse(x+r*.42,y+r*.15,r*.08,r*.14,0,0,7);g.fill()}}
function hearts(g,n,x,y){for(let i=0;i<3;i++){g.font=`${big(22)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.globalAlpha=i<n?1:.25;g.fillText('❤️',x+(i-1)*big(30),y)}g.globalAlpha=1}
function draw(A){const{ctx:g,W,H,col:C}=A,v=part();S.hit=[];g.fillStyle=A.mix(C.pn,'#dcfce7',C.dark?.06:.4);g.fillRect(0,0,W,H);
 if(v==='quiz'){face(g,W/2,H*.45,Math.min(W,H)*.2,1);return}
 if(v==='kind'){if(S.won>=KIND.length){words(g,'Kind choices help other people feel happy and safe.',W/2,H/2,W-40,16,C.tx,1);return A.fx.draw(g)}
  const k=KIND[S.r];words(g,k.q,W/2,H*.1,W-30,15,C.tx,1);g.font=`${big(46)}px system-ui`;g.textAlign='center';g.fillText(k.e,W*.3,H*.38);face(g,W*.62,H*.38,Math.min(W,H)*.12,S.face);
  words(g,k.who,W*.62,H*.38+Math.min(W,H)*.17,120,13,C.tx,1);const cw=(W-36)/2;card(g,12,H*.66,cw,H*.26,k.ok,C.gr,()=>pickKind(1));card(g,24+cw,H*.66,cw,H*.26,k.no,C.rd,()=>pickKind(0))}
 if(v==='truth'){words(g,'Zara broke Mum’s cup by accident.',W/2,H*.08,W-30,15,C.tx,1);g.font=`${big(40)}px system-ui`;g.textAlign='center';g.fillText('☕💥',W*.5,H*.22);hearts(g,S.trust,W/2,H*.34);
  words(g,'Mum’s trust',W/2,H*.41,200,12,C.mu);if(S.tale){const f=TALE[S.tale].f;f.slice(0,S.frame).forEach((t,i)=>words(g,t,W/2,H*(.5+i*.08),W-40,13,C.tx))}
  const keys=Object.keys(TALE),cw=(W-48)/3;keys.forEach((k,i)=>card(g,12+i*(cw+12),H*.76,cw,H*.2,TALE[k].t,k==='tell'?C.gr:C.am,()=>playTale(k)))}
 if(v==='own'){const bw=(W-36)/2,by=H*.62,bh=H*.34;[['Ask first',C.am],['Mine to use',C.gr]].forEach(([t,tone],b)=>{const x=12+b*(bw+12);g.fillStyle=A.alpha(tone,S.flash===b?.35:.14);A.paint.rrect(x,by,bw,bh,16);g.fill();g.strokeStyle=tone;g.lineWidth=3;A.paint.rrect(x,by,bw,bh,16);g.stroke();
   words(g,(b?'✋ ':'🙋 ')+t,x+bw/2,by+big(16),bw-10,14,C.tx,1);let n=0;THINGS.forEach((it,i)=>{if(S.bin[i]===b){g.font=`${big(26)}px system-ui`;g.textAlign='center';g.fillText(it[0],x+22+(n%4)*((bw-30)/4)+8,by+bh*.62);n++}})});
  const left=THINGS.map((t,i)=>i).filter(i=>S.bin[i]==null),cw=Math.min(150,(W-24)/3-8);left.forEach((i,j)=>{if(S.held&&S.held.i===i)return;const x=12+(j%3)*(cw+8),y=H*.06+Math.floor(j/3)*H*.26;
   card(g,x,y,cw,H*.22,THINGS[i][0]+' '+THINGS[i][1],S.pick===i?C.cy:C.vi,null);S.hit.push({x,y,w:cw,h:H*.22,item:i})});
  if(S.held){card(g,S.held.x-60,S.held.y-26,120,52,THINGS[S.held.i][0]+' '+THINGS[S.held.i][1],C.cy,null)}
  if(!left.length)words(g,'All sorted!',W/2,H*.3,W,16,C.tx,1)}
 if(v==='fair'){const pw=(W-48)/3;g.font=`${big(30)}px system-ui`;g.textAlign='center';g.textBaseline='middle';words(g,`Bowl: ${S.bowl} left`,W/2,H*.07,W,14,C.tx,1);
  for(let i=0;i<S.bowl;i++)g.fillText('🍓',W/2+(i-(S.bowl-1)/2)*big(34),H*.2);
  KIDS.forEach((k,i)=>{const x=12+i*(pw+12),y=H*.42,h=H*.52,bad=S.flash===i;g.fillStyle=A.alpha(bad?C.rd:C.cy,.15);A.paint.rrect(x,y,pw,h,16);g.fill();g.strokeStyle=bad?C.rd:C.cy;g.lineWidth=3;A.paint.rrect(x,y,pw,h,16);g.stroke();
   words(g,`${k}: ${S.plate[i]}`,x+pw/2,y+big(16),pw,14,C.tx,1);g.font=`${big(24)}px system-ui`;for(let j=0;j<S.plate[i];j++)g.fillText('🍓',x+pw/2+((j%2)-.5)*big(30),y+h*.42+Math.floor(j/2)*big(28));S.hit.push({x,y,w:pw,h,plate:i})});
  if(S.held)g.fillText('🍓',S.held.x,S.held.y)}
 if(v==='hard'){if(S.won>=PATH.length){words(g,'The right thing can feel harder. It still feels good after.',W/2,H/2,W-40,16,C.tx,1);return A.fx.draw(g)}
  const p=PATH[S.r];words(g,p.q,W/2,H*.1,W-30,15,C.tx,1);g.strokeStyle=C.gr;g.lineWidth=10;g.beginPath();g.moveTo(W*.5,H*.62);g.quadraticCurveTo(W*.3,H*.5,W*.22,H*.28);g.stroke();
  g.strokeStyle=C.rd;g.beginPath();g.moveTo(W*.5,H*.62);g.quadraticCurveTo(W*.7,H*.62,W*.8,H*.6);g.stroke();g.font=`${big(26)}px system-ui`;g.textAlign='center';g.fillText('☀️',W*.2,H*.22);g.fillText('🌧️',W*.84,H*.54);
  words(g,'uphill: harder',W*.28,H*.42,140,12,C.tx);words(g,'downhill: easy',W*.72,H*.68,140,12,C.tx);face(g,W*.5,H*.66,Math.min(W,H)*.05,0);
  const cw=(W-36)/2;card(g,12,H*.76,cw,H*.2,p.ok,C.gr,()=>pickPath(1));card(g,24+cw,H*.76,cw,H*.2,p.no,C.rd,()=>pickPath(0))}
 A.fx.draw(g)}
const oops=(t,i)=>{A.sound.miss();S.flash=i==null?-1:i;tellAT(t);setTimeout(()=>{S.flash=-1;A.redraw()},fast()?10:800);A.redraw()};
function advance(t,len){S.r++;S.won++;S.face=0;if(S.won>=len){A.sound.pop();tellAT(t);controls();A.redraw();return S.cb()}A.sound.tick();tellAT(t+' Here is the next one.');controls();A.redraw()}
function pickKind(good){if(part()!=='kind'||S.won>=KIND.length)return;const k=KIND[S.r];if(good){S.face=1;A.redraw();return setTimeout(()=>advance(k.glad,KIND.length),fast()?5:350)}S.face=-1;oops(k.sad+' Think how '+k.who+' feels. Try the other choice.')}
function playTale(k){if(part()!=='truth')return;S.tale=k;S.frame=0;S.seen[k]=1;const T=TALE[k],my=S.tt=(S.tt||0)+1;A.sound.tick();
 const roll=()=>{if(my!==S.tt||part()!=='truth')return;S.frame++;if(S.frame>=3)S.trust=T.trust;A.redraw();if(S.frame<3)setTimeout(roll,fast()?5:280);else{tellAT(T.f.join(' ')+` Mum’s trust: ${T.trust} hearts.`);
  if(k!=='tell')A.sound.miss();S.cb()}};S.trust=2;roll()}
function drop(i,b){if(part()!=='own'||S.bin[i]!=null)return;const it=THINGS[i];S.pick=-1;
 if(b!==it[2]){return oops(it[2]?`${it[1]}: it is yours, so you can use it.`:i===3?'A toy left in the park still belongs to someone. Give it to a grown-up so they can find the owner.':`${it[1]} belong to someone else. Ask first.`,b)}
 S.bin[i]=b;A.sound.tick();tellAT(`${it[1]}: ${b?'mine to use':'ask first'}.`);controls();A.redraw();S.cb()}
function give(i){if(part()!=='fair')return;if(!S.bowl)return tellAT('The bowl is empty. Press Is it fair?');S.bowl--;S.plate[i]++;A.sound.tick();tellAT(`${KIDS[i]} has ${S.plate[i]}. ${S.bowl} left in the bowl.`);controls();A.redraw()}
function back(i){if(part()!=='fair'||!S.plate[i])return;S.plate[i]--;S.bowl++;A.sound.tick();tellAT(`One back in the bowl. ${KIDS[i]} has ${S.plate[i]}.`);controls();A.redraw()}
function fairCheck(){if(part()!=='fair')return;const p=S.plate,most=Math.max(...p),least=Math.min(...p);
 if(S.bowl)return oops(`There are still ${S.bowl} in the bowl. Share them all out.`);
 if(most!==least)return oops(`Not fair yet. ${KIDS[p.indexOf(most)]} has ${most} and ${KIDS[p.indexOf(least)]} has ${least}. Fair means the same for each.`,p.indexOf(most));
 S.won=1;A.sound.pop();tellAT('Fair! Everyone has 2.');controls();A.redraw();S.cb()}
function pickPath(good){if(part()!=='hard'||S.won>=PATH.length)return;const p=PATH[S.r];if(good)return advance('Good choice. '+p.why,PATH.length);oops(p.why+' Try the harder, right way.')}
function controls(){if(!pad)return;pad.innerHTML='';const v=part(),add=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);b.onclick=fn};
 if(v==='kind'&&S.won<KIND.length){const k=KIND[S.r];add(k.ok,()=>pickKind(1));add(k.no,()=>pickKind(0))}
 if(v==='truth')Object.keys(TALE).forEach(k=>add(TALE[k].t,()=>playTale(k)));
 if(v==='own'){const i=THINGS.findIndex((t,j)=>S.bin[j]==null);if(i>=0){add(`${THINGS[i][1]}: ask first`,()=>drop(i,0),`Put ${THINGS[i][1]} in ask first`);add(`${THINGS[i][1]}: mine`,()=>drop(i,1),`Put ${THINGS[i][1]} in mine to use`)}}
 if(v==='fair'){KIDS.forEach((k,i)=>add(`+ ${k}`,()=>give(i),`Give ${k} a strawberry`));add('↩ Take one back',()=>{const i=S.plate.indexOf(Math.max(...S.plate));back(i)},'Put one strawberry back from the fullest plate');add('Is it fair?',fairCheck)}
 if(v==='hard'&&S.won<PATH.length){const p=PATH[S.r];add(p.ok,()=>pickPath(1));add(p.no,()=>pickPath(0))}A.redraw()}
const inside=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function down(p){const v=part(),h=S.hit.find(r=>inside(p,r));
 if(v==='own'){if(h&&h.item!=null){S.held={i:h.item,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}if(S.pick>=0&&p.y>A.H*.62){drop(S.pick,p.x<A.W/2?0:1);return false}return false}
 if(v==='fair'){if(p.y<A.H*.32&&S.bowl){S.held={x:p.x,y:p.y,x0:p.x,y0:p.y};return true}if(h&&h.plate!=null){back(h.plate);return false}return false}
 if(h&&h.act){h.act();return false}return false}
function move(p){if(!S.held)return;S.held.x=p.x;S.held.y=p.y;A.redraw()}
function up(p){const d=S.held;if(!d)return;S.held=null;const v=part();const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<8;
 if(v==='own'){if(tap){S.pick=d.i;tellAT(`${THINGS[d.i][1]} picked. Now tap a box.`);return A.redraw()}if(p.y>A.H*.6)return drop(d.i,p.x<A.W/2?0:1);tellAT('Drop it on a box.');return A.redraw()}
 if(v==='fair'){const pl=S.hit.find(r=>r.plate!=null&&inside(p,r));if(pl)return give(pl.plate);tellAT('Drop the strawberry on a plate.');A.redraw()}}
const gate=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(list){const k=++tok;list.forEach((fn,j)=>setTimeout(()=>{if(k===tok)fn()},fast()?j*40+30:(j+1)*320))}
const reset=()=>{tok++;Object.assign(S,blank())};
const steps=[
{h:'How do they feel?',p:'Read the story. Tap the choice you would make. Watch the face.',task:'Make a kind choice in 3 stories',
 show:()=>{steps[0].go();demo([()=>pickKind(1),()=>pickKind(1),()=>pickKind(1)])},go:()=>{reset();tellAT(KIND[0].q);controls();S.cb=gate(0,()=>S.won>=3,'A right choice thinks about how the other person feels.')}},
{h:'Tell the truth',p:'Zara broke a cup by accident. Tap each choice to see what happens next.',
 predict:{q:'If Zara hides the broken cup, what happens?',opts:['No one finds out, so it is fine','Mum finds out and trusts her less'],ans:1},task:'See what happens if Zara hides it or tells',
 show:()=>{steps[1].go();demo([()=>playTale('hide'),()=>{},()=>{},()=>playTale('tell')])},go:()=>{reset();tellAT('Zara broke Mum’s cup. What should she do?');controls();S.cb=gate(1,()=>S.seen.tell&&(S.seen.hide||S.seen.cat)&&S.frame>=3,'Telling the truth keeps trust, even after a mistake.')}},
{h:'Whose is it?',p:'Drag each thing to a box, or tap it and then tap a box. Things that belong to someone else: ask first.',
 predict:{q:'You find a toy car in the park. No one is there. Is it yours now?',opts:['Yes, finders keepers','No, it still belongs to someone'],ans:1},task:'Sort all 6 things',
 show:()=>{steps[2].go();demo(THINGS.map((t,i)=>()=>drop(i,t[2])))},go:()=>{reset();tellAT('Whose is it? Sort the things.');controls();S.cb=gate(2,()=>THINGS.every((t,i)=>S.bin[i]!=null),'If it is not yours, ask first.')}},
{h:'Fair shares',p:'Drag strawberries from the bowl to the plates, or use the buttons. Tap a plate to take one back. Then press Is it fair?',
 predict:{q:'Zara found the 6 strawberries. Is it fair if she keeps 4?',opts:['Yes, she found them','No, share them the same'],ans:1},task:'Share 6 strawberries fairly',
 show:()=>{steps[3].go();demo([()=>give(0),()=>give(1),()=>give(2),()=>give(0),()=>give(1),()=>give(2),fairCheck])},go:()=>{reset();tellAT('Share 6 strawberries with Zara, Tom and Ben.');controls();S.cb=gate(3,()=>S.won>=1,'Fair means each person gets the same.')}},
{h:'Hard but right',p:'The right path can be uphill. Tap the right choice.',task:'Take the right path 3 times',
 show:()=>{steps[4].go();demo([()=>pickPath(1),()=>pickPath(1),()=>pickPath(1)])},go:()=>{reset();tellAT(PATH[0].q);controls();S.cb=gate(4,()=>S.won>=3,'Doing the right thing can be hard, and it is still right.')}},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.cb()});
const QS=[['Leo breaks a toy by mistake. What is the right thing to do?',[['Tell a grown-up the truth','ok'],['Hide it','hide'],['Say his sister did it','blame']]],
 ['Jo wants to use Ben’s crayons. What should she do?',[['Ask Ben first','ok'],['Just take them','grab'],['Take them when Ben is not looking','sneak']]],
 ['There are 4 biscuits for 2 children. What is fair?',[['2 each','ok'],['3 for me and 1 for you','more'],['All 4 for the one who got them out','found']]],
 ['A friend says: let’s take a pen from the shop. No one will see.',[['Say no','ok'],['Take it, no one will know','seen'],['Take it and give it to your friend','share']]],
 ['A child is crying on her own. What is kind?',[['Ask if she is OK','ok'],['Laugh at her','laugh'],['Walk away fast','ignore']]]];
function why(t){let m='Think: is it honest, fair and kind?';
 if(t==='hide')m='Hiding it does not fix it. A mistake is not naughty, so tell a grown-up.';
 if(t==='blame')m='Blaming someone else is a lie, and they get told off for something they did not do.';
 if(t==='grab')m='The crayons are Ben’s. Ask first, even if he is your friend.';
 if(t==='sneak')m='Taking things when no one is looking is still taking. Ask first.';
 if(t==='more')m='3 and 1 are not the same. Fair is 2 each.';
 if(t==='found')m='Getting them out does not make them all yours. Share: 2 each.';
 if(t==='seen')m='It is still stealing when no one sees. The shop paid for the pen.';
 if(t==='share')m='Giving it away does not make taking it right. Say no.';
 if(t==='laugh')m='Laughing makes her feel worse. Ask if she is OK.';
 if(t==='ignore')m='Walking away leaves her on her own. A kind thing is to ask if she is OK, or get a grown-up.';
 return m}
function ask(){qn++;const[q,opts]=QS[qn%QS.length],rot=qn%3;
 quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Choices"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');opts.slice(rot).concat(opts.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tellAT('Challenge: '+q);A.redraw()}
let run=0;
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=t==='ok';
 if(good){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Yes! That is the right choice.':'✗ '+why(t)}${good?` In a row: ${run}.`:''} <button type="button" class="linkish">Next question →</button>`;fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;controls()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);quiz=E('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});controls()}});
A.start()})})();
