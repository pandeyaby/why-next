/* Flagship – questioning your own biases (ages 9–11): drag a friendliness guess about quiet new Kai, then uncover four
   clues and move it again; tap Mia's eight actions with the "Mia is bossy" filter on and count what fits and what doesn't;
   share ten tokens between two strangers sorted by a random sticker colour; flip four snap thoughts to test evidence
   against assumption; order the pause–ask–check routine. */
(()=>{
const CLUES=['Kai moved here from Poland last week and is still learning English.','Kai lent Leah a pencil when hers broke.','Kai smiled back when Jo said hi.','At lunch Kai asked, “Can I play football too?”'];
const ACTS=[['Mia told Sam where to stand in the game.',1],['Mia helped Jo tie her shoe.',0],['Mia shouted “My turn!”',1],['Mia let Ava go first on the swing.',0],
 ['Mia picked the team names.',1],['Mia shared her crisps with Ben.',0],['Mia told Leo to hurry up.',1],['Mia asked the new girl to play.',0]];
const THINK=[{t:'Ellie wears old clothes, so she must be bad at reading.',k:1,flip:'Flip it: would you think it about Ellie in new clothes? Clothes tell you nothing about reading.'},
 {t:'Ravi has scored in every match this term, so he is good at football.',k:0,flip:'Flip it: anyone who scored in every match would get the same verdict. It rests on what Ravi did.'},
 {t:'Sam uses a wheelchair, so he will not want to join our game.',k:1,flip:'Flip it: would you decide for any other child? Ask Sam. He may want to play, help make a version that works, or keep score.'},
 {t:'Leah got full marks in every spelling test, so she is a strong speller.',k:0,flip:'Flip it: the same marks would mean the same for anyone. It is built on evidence.'}];
const ROUTE=['Notice the snap thought','Pause before you act','Ask: what is my evidence?','Check: find out more or ask them'],MIX=[2,0,3,1];
VIS.reg('flagbias',c=>{let A,keys,box,cq=-1,streak=0,job=0;
const base=()=>({cb:()=>{},guess:5,first:5,open:0,moved:0,seen:{},tok:{b:0,g:0},shared:0,ans:{},flipd:{},row:[],hold:null,wrong:-1,spots:[]}),S=base();
const sect=()=>['kai','filter','group','flip','route','quiz'][A.step];
const px=n=>Math.round(n*(A.narrow?.95:1.1)),still=()=>A.reduced();
const voice=t=>{c.say(t);A&&A.cv.setAttribute('aria-label',t)};
function txt(g,t,x,y,mw,size,col,b){g.font=`${b?750:550} ${px(size)}px system-ui,sans-serif`;g.fillStyle=col||A.col.tx;g.textAlign='center';g.textBaseline='middle';
 const L=[];let s='';t.split(' ').forEach(w=>{const tr=s?s+' '+w:w;if(g.measureText(tr).width>mw&&s){L.push(s);s=w}else s=tr});L.push(s);const lh=px(size)*1.28;L.forEach((l,i)=>g.fillText(l,x,y+(i-(L.length-1)/2)*lh))}
function tile(g,x,y,w,h,tone,a,spot){g.fillStyle=A.alpha(tone,a);A.paint.rrect(x,y,w,h,12);g.fill();g.strokeStyle=tone;g.lineWidth=2.5;A.paint.rrect(x,y,w,h,12);g.stroke();if(spot)S.spots.push(Object.assign({x,y,w,h},spot))}
function meter(g,W,y){const C=A.col,x0=W*.1,x1=W*.9;g.strokeStyle=A.alpha(C.ln,.9);g.lineWidth=10;g.lineCap='round';g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();
 txt(g,'unfriendly',x0+20,y+px(20),120,11,C.mu);txt(g,'friendly',x1-20,y+px(20),120,11,C.mu);const at=v=>x0+v/10*(x1-x0);
 if(S.open){g.strokeStyle=C.mu;g.lineWidth=2;g.setLineDash([4,3]);g.beginPath();g.moveTo(at(S.first),y-16);g.lineTo(at(S.first),y+16);g.stroke();g.setLineDash([]);txt(g,'first guess',at(S.first),y-px(22),110,10,C.mu)}
 A.paint.ball(at(S.guess),y,px(13),C.vi);txt(g,String(S.guess),at(S.guess),y,30,11,'#fff',1);S.spots.push({x:x0-16,y:y-26,w:x1-x0+32,h:52,bar:{x0,x1}})}
function draw(A){const{ctx:g,W,H,col:C}=A,s=sect();S.spots=[];g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.05:.38);g.fillRect(0,0,W,H);
 if(s==='quiz'){g.font=`${px(60)}px system-ui`;g.textAlign='center';g.textBaseline='middle';g.fillText('🔍🧠',W/2,H*.45);return}
 if(s==='kai'){txt(g,'Day one: Kai is quiet and sits on his own.',W/2,H*.06,W-24,14,C.tx,1);g.font=`${px(40)}px system-ui`;g.textAlign='center';g.fillStyle=C.tx;g.fillText('🧒',W/2,H*.17);
  txt(g,'How friendly is Kai? Drag the dot.',W/2,H*.27,W-24,12,C.tx);meter(g,W,H*.35);const cw=(W-30)/2,ch=H*.25;
  CLUES.forEach((t,i)=>{const x=10+(i%2)*(cw+10),y=H*.46+Math.floor(i/2)*(ch+8),on=i<S.open;tile(g,x,y,cw,ch,on?C.gr:C.am,on?.16:.12,{clue:i});txt(g,on?t:'❓ Tap for clue '+(i+1),x+cw/2,y+ch/2,cw-14,on?11:13,C.tx,!on)})}
 if(s==='filter'){const n=Object.keys(S.seen).length,fit=ACTS.filter((a,i)=>S.seen[i]&&a[1]).length;txt(g,`Filter on: “Mia is bossy”. Noticed ${n} of 8 · fits ${fit} · does not fit ${n-fit}`,W/2,H*.06,W-20,12,C.tx,1);
  const cw=(W-30)/2,ch=H*.2;ACTS.forEach(([t,f],i)=>{const x=10+(i%2)*(cw+10),y=H*.13+Math.floor(i/2)*(ch+6),seen=S.seen[i],dim=!seen&&!f;
   g.globalAlpha=dim?.65:1;tile(g,x,y,cw,ch,seen?(f?C.or:C.gr):f?C.rd:C.ln,seen?.22:f?.14:.08,{act:i});txt(g,(seen?(f?'✔ fits: ':'✔ does not fit: '):'')+t,x+cw/2,y+ch/2,cw-12,11,C.tx,f&&!seen);g.globalAlpha=1})}
 if(s==='group'){txt(g,'Your sticker: 🔵 Blue. You have never met either child.',W/2,H*.06,W-20,13,C.tx,1);const left=10-S.tok.b-S.tok.g,pw=(W-40)/2;
  g.font=`${px(22)}px system-ui`;g.textAlign='center';g.fillStyle=C.tx;for(let i=0;i<left;i++)g.fillText('🪙',W/2+(i-(left-1)/2)*px(26),H*.18);txt(g,`${left} tokens to share`,W/2,H*.26,W,11,C.mu);
  [['b','🔵 Blue child',C.cy],['g','🟢 Green child',C.gr]].forEach(([k,n,tone],i)=>{const x=13+i*(pw+14),y=H*.33,h=H*.5;tile(g,x,y,pw,h,tone,.13,{pot:k});txt(g,`${n}: ${S.tok[k]}`,x+pw/2,y+px(16),pw-8,13,C.tx,1);
   g.font=`${px(20)}px system-ui`;g.fillStyle=C.tx;for(let j=0;j<S.tok[k];j++)g.fillText('🪙',x+pw/2+((j%3)-1)*px(26),y+h*.32+Math.floor(j/3)*px(26))});
  if(S.hold){g.font=`${px(24)}px system-ui`;g.fillStyle=C.tx;g.fillText('🪙',S.hold.x,S.hold.y)}if(S.shared)txt(g,'The stickers were handed out at random.',W/2,H*.92,W-20,12,C.tx,1);S.spots.push({x:0,y:H*.11,w:W,h:H*.18,pile:1})}
 if(s==='flip'){const i=Math.min(THINK.length-1,Object.keys(S.ans).length),T=THINK[i];if(Object.keys(S.ans).length>=THINK.length){txt(g,'Evidence is about what someone did. An assumption fills a gap with a guess.',W/2,H/2,W-40,15,C.tx,1);return A.fx.draw(g)}
  txt(g,`Thought ${i+1} of ${THINK.length}`,W/2,H*.06,W,12,C.mu);tile(g,W*.06,H*.12,W*.88,H*.26,S.wrong===9?C.rd:C.vi,.12);txt(g,'“'+T.t+'”',W/2,H*.25,W*.8,14,C.tx,1);
  tile(g,W*.06,H*.42,W*.88,H*.2,C.cy,S.flipd[i]?.16:.06,{flip:i});txt(g,S.flipd[i]?T.flip:'🔁 Tap to flip it: swap the person',W/2,H*.52,W*.8,S.flipd[i]?11:13,C.tx,!S.flipd[i]);
  const bw=(W-34)/2;[['📊 Based on evidence',C.gr],['🙈 An assumption',C.or]].forEach(([n,tone],k)=>{const x=12+k*(bw+10);tile(g,x,H*.68,bw,H*.26,tone,S.wrong===k?.4:.15,{judge:k});txt(g,n,x+bw/2,H*.81,bw-10,13,C.tx,1)})}
 if(s==='route'){txt(g,'Tap the steps in order, or drag each one down to the next slot.',W/2,H*.05,W-20,12,C.tx,1);const ch=H*.1;
  MIX.forEach((r,j)=>{if(S.row.includes(r)||(S.hold&&S.hold.r===r))return;const x=W*.08,y=H*.1+j*(ch+5);tile(g,x,y,W*.84,ch,S.wrong===r?C.rd:C.am,S.wrong===r?.35:.14,{card:r});txt(g,ROUTE[r],W/2,y+ch/2,W*.78,12,C.tx,1)});
  for(let k=0;k<4;k++){const y=H*.56+k*(ch+5),r=S.row[k];tile(g,W*.08,y,W*.84,ch,r!=null?C.gr:C.ln,r!=null?.18:.06,{slot:k});txt(g,`${k+1}. `+(r!=null?ROUTE[r]:'…'),W/2,y+ch/2,W*.78,12,r!=null?C.tx:C.mu,r!=null)}
  if(S.hold){tile(g,S.hold.x-W*.4,S.hold.y-ch/2,W*.8,ch,C.cy,.3);txt(g,ROUTE[S.hold.r],S.hold.x,S.hold.y,W*.74,12,C.tx,1)}}
 A.fx.draw(g)}
const buzz=(t,i)=>{A.sound.miss();S.wrong=i==null?-1:i;voice(t);setTimeout(()=>{S.wrong=-1;A.redraw()},still()?10:850);A.redraw()};
function setGuess(v){if(sect()!=='kai')return;const n=Math.max(0,Math.min(10,Math.round(v)));if(n===S.guess)return;S.guess=n;if(S.open>=CLUES.length)S.moved=1;
 voice(`Your guess: ${n} out of 10 friendly.`+(S.moved?' You changed your view after the evidence.':''));A.redraw();S.cb()}
function clue(){if(sect()!=='kai'||S.open>=CLUES.length)return;if(!S.open)S.first=S.guess;S.open++;A.sound.tick();
 voice(`Clue ${S.open}: ${CLUES[S.open-1]}`+(S.open===CLUES.length?' That is all four clues. Kai seems shy and new, not unfriendly. Move your guess.':''));kit();A.redraw();S.cb()}
function notice(i){if(sect()!=='filter'||S.seen[i])return;S.seen[i]=1;A.sound.tick();const n=Object.keys(S.seen).length;
 voice(`${ACTS[i][0]} ${ACTS[i][1]?'This fits the idea.':'This does not fit the idea, so a mind set on bossy can skip it.'}`+(n===8?' Four fit and four do not. Mia is not just bossy.':''));kit();A.redraw();S.cb()}
function give(k){if(sect()!=='group'||S.shared)return;if(S.tok.b+S.tok.g>=10)return voice('All 10 tokens are shared. Press Done.');S.tok[k]++;A.sound.tick();voice(`Blue ${S.tok.b}, Green ${S.tok.g}.`);kit();A.redraw()}
function undo(){if(sect()!=='group'||S.shared)return;const k=S.tok.b>=S.tok.g?'b':'g';if(!S.tok[k])return;S.tok[k]--;voice(`Blue ${S.tok.b}, Green ${S.tok.g}.`);kit();A.redraw()}
function settle(){if(sect()!=='group'||S.shared)return;const{b,g}=S.tok;if(b+g<10)return buzz(`Share all 10 first. ${10-b-g} left.`);S.shared=1;
 voice(b>g?`You gave your own colour ${b} and the other colour ${g}. The stickers were random, so nothing made Blue better. That pull towards your own side is in-group bias.`:
  b===g?'5 and 5: you shared fairly. In real experiments many people gave their own random group more without noticing.':`You gave Green ${g} and Blue ${b}. Fair would be 5 each: going against your own side is not the aim either.`);
 A.sound.pop();kit();A.redraw();S.cb()}
function flip(i){if(sect()!=='flip')return;S.flipd[i]=1;A.sound.tick();voice(THINK[i].flip);A.redraw()}
function judge(k){if(sect()!=='flip')return;const i=Object.keys(S.ans).length;if(i>=THINK.length)return;const T=THINK[i];
 if(k!==T.k)return buzz(T.k?`This fills a gap with a guess. ${T.flip}`:`This is based on what the person actually did, again and again. ${T.flip}`,k);
 S.ans[i]=k;A.sound.tick();voice((k?'An assumption. ':'Based on evidence. ')+(i+1<THINK.length?'Next thought.':''));kit();A.redraw();S.cb()}
function place(r){if(sect()!=='route'||S.row.includes(r))return;const want=S.row.length;
 if(r!==want)return buzz(r===3&&want<2?'Checking comes last. First notice the thought and pause.':r===2&&want===0?'You cannot ask about evidence until you notice the snap thought.':want===0?'Start by noticing the snap thought. You cannot question it until you catch it.':`Not yet. Step ${want+1} is: ${ROUTE[want]}.`,r);
 S.row.push(r);A.sound.tick();voice(`Step ${want+1}: ${ROUTE[r]}.`+(S.row.length===4?' Notice, pause, ask, check.':''));kit();A.redraw();S.cb()}
function kit(){if(!keys)return;keys.innerHTML='';const s=sect(),add=(t,fn,l)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},keys,t);b.onclick=fn};
 if(s==='kai'){add('◀ Less friendly',()=>setGuess(S.guess-1));add('Friendlier ▶',()=>setGuess(S.guess+1));if(S.open<CLUES.length)add(`Show clue ${S.open+1}`,clue)}
 if(s==='filter')ACTS.forEach(([t],i)=>{if(!S.seen[i])add(t,()=>notice(i),'Notice: '+t)});
 if(s==='group'&&!S.shared){add('+ 🔵 Blue',()=>give('b'),'Give a token to the Blue child');add('+ 🟢 Green',()=>give('g'),'Give a token to the Green child');add('↩ Take one back',undo);add('Done',settle)}
 if(s==='flip'&&Object.keys(S.ans).length<THINK.length){const i=Object.keys(S.ans).length;add('🔁 Flip it',()=>flip(i));add('📊 Evidence',()=>judge(0),'Based on evidence');add('🙈 Assumption',()=>judge(1),'An assumption')}
 if(s==='route')MIX.forEach(r=>{if(!S.row.includes(r))add(ROUTE[r],()=>place(r),'Next step: '+ROUTE[r])});A.redraw()}
const hits=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h,find=p=>S.spots.find(r=>hits(p,r));
function down(p){const s=sect(),h=find(p);if(!h)return false;
 if(h.bar){S.hold={bar:h.bar};setGuess((p.x-h.bar.x0)/(h.bar.x1-h.bar.x0)*10);return true}
 if(h.clue!=null){clue();return false}if(h.act!=null){notice(h.act);return false}if(h.flip!=null){flip(h.flip);return false}if(h.judge!=null){judge(h.judge);return false}
 if(h.pile&&!S.shared&&S.tok.b+S.tok.g<10){S.hold={coin:1,x:p.x,y:p.y};A.redraw();return true}if(h.pot){give(h.pot);return false}
 if(h.card!=null){S.hold={r:h.card,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
function move(p){const d=S.hold;if(!d)return;if(d.bar)return setGuess((p.x-d.bar.x0)/(d.bar.x1-d.bar.x0)*10);d.x=p.x;d.y=p.y;A.redraw()}
function up(p){const d=S.hold;S.hold=null;if(!d||d.bar)return;const h=find(p);
 if(d.coin){if(h&&h.pot)return give(h.pot);voice('Drop the token on a child.');return A.redraw()}
 if(Math.hypot(p.x-d.x0,p.y-d.y0)<8||(h&&h.slot!=null)||p.y>A.H*.55)return place(d.r);voice('Drop the step on the slots below.');A.redraw()}
const pass=(n,test,msg)=>()=>{if(A.step===n&&test()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
function demo(list){const k=++job;list.forEach((fn,j)=>setTimeout(()=>{if(k===job)fn()},still()?j*40+30:(j+1)*300))}
const wipe=()=>{job++;Object.assign(S,base())};
const steps=[
{h:'First impressions',p:'Drag the dot to guess how friendly Kai is. Then tap each clue and move your guess again.',
 predict:{q:'Kai is quiet on his first day. What does that tell you?',opts:['He is probably unfriendly','Not much yet: I need more evidence'],ans:1},task:'Open all 4 clues, then move your guess',
 show:()=>{steps[0].go();demo([()=>setGuess(3),clue,clue,clue,clue,()=>setGuess(6),()=>setGuess(8)])},go:()=>{wipe();voice('Kai is quiet on day one. How friendly is he?');kit();S.cb=pass(0,()=>S.open>=4&&S.moved,'A first impression is a guess. Evidence can change it.')}},
{h:'The noticing filter',p:'Someone told you Mia is bossy. The things that fit are bright; the others are faded. Tap all 8 to notice them.',
 predict:{q:'If you already think Mia is bossy, what will you notice most?',opts:['Everything she does, the same','The things that fit the idea'],ans:1},task:'Notice all 8 things Mia did',
 show:()=>{steps[1].go();demo(ACTS.map((a,i)=>()=>notice(i)))},go:()=>{wipe();voice('Filter on: Mia is bossy. Tap each thing she did.');kit();S.cb=pass(1,()=>Object.keys(S.seen).length>=8,'Confirmation bias makes us notice what fits and skip what does not.')}},
{h:'People like me',p:'You have a Blue sticker. Share 10 tokens between two children you have never met. Drag tokens or use the buttons, then press Done.',task:'Share all 10 tokens and press Done',
 show:()=>{steps[2].go();demo([...Array(10)].map((x,i)=>()=>give(i%2?'g':'b')).concat([settle]))},go:()=>{wipe();voice('Share 10 tokens between a Blue child and a Green child.');kit();S.cb=pass(2,()=>S.shared,'Favouring your own side, even a random one, is in-group bias.')}},
{h:'Flip it',p:'Read each snap thought. Tap to flip it and swap the person. Then decide: evidence or assumption?',task:'Judge all 4 thoughts',
 show:()=>{steps[3].go();demo(THINK.flatMap((t,i)=>[()=>flip(i),()=>judge(t.k)]))},go:()=>{wipe();voice('Thought 1: '+THINK[0].t);kit();S.cb=pass(3,()=>Object.keys(S.ans).length>=4,'Evidence is what someone did. An assumption is a guess about who they are.')}},
{h:'Pause, ask, check',p:'Put the four steps for catching a bias in order.',task:'Put the 4 steps in order',
 show:()=>{steps[4].go();demo([0,1,2,3].map(r=>()=>place(r)))},go:()=>{wipe();voice('Put the steps in order.');kit();S.cb=pass(4,()=>S.row.length>=4,'Notice, pause, ask, check: practise it every time.')}},
{h:'Challenge',p:'',go:()=>{wipe();pose()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.cb()});
const QS=[['Ana thinks a boy with a skateboard will be rude. What is that?',[['An assumption','ok'],['A fact','fact'],['Evidence','evid']]],
 ['Who has unconscious biases?',[['Everyone does','ok'],['Only unkind people','bad'],['Only adults','adult']]],
 ['You think Max is lazy. You remember the two days he was late, but forget the ten days he was early. What is this?',[['Confirmation bias','ok'],['Good evidence','fair'],['Just a bad memory','memory']]],
 ['Which question best checks your own bias?',[['Would I think the same about someone else?','ok'],['How can I prove I am right?','prove'],['Who agrees with me?','agree']]],
 ['You realise you judged the new girl unfairly. What is the best next step?',[['Find out more and change my view','ok'],['Hide it so no one knows','hide'],['Decide I am a bad person','shame']]]];
function why(t){let m='Ask: is this based on what the person did, or a guess?';
 if(t==='fact')m='Nothing the boy did is known. A skateboard is not a reason; that is a guess, not a fact.';
 if(t==='evid')m='Evidence is something the boy said or did. Owning a skateboard is not evidence of being rude.';
 if(t==='bad')m='Bias is not only for unkind people. Every brain makes quick guesses; the skill is catching them.';
 if(t==='adult')m='Children have biases too. Everyone learns quick guesses from what they see and hear.';
 if(t==='fair')m='Two late days out of twelve is not the full picture. Remembering only what fits is confirmation bias.';
 if(t==='memory')m='It is not random forgetting: you kept what fits your idea and dropped what did not. That is confirmation bias.';
 if(t==='prove')m='Trying to prove yourself right makes you hunt for what fits. Swap the person instead.';
 if(t==='agree')m='Other people can share the same bias. Check the evidence, not how many agree.';
 if(t==='hide')m='Hiding it lets the bias stay. Noticing it, finding out more and changing your view is the fix.';
 if(t==='shame')m='Having a bias does not make you bad. What matters is what you do next: find out more.';
 return m}
function pose(){cq++;const[q,o]=QS[cq%QS.length],turn=cq%3;
 box.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Choices"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=box.querySelector('.fl-pick');o.slice(turn).concat(o.slice(0,turn)).forEach(([t,k])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,t);b.onclick=()=>grade(k)});voice('Challenge: '+q);A.redraw()}
function grade(k){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),good=k==='ok';
 if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=`${good?'✓ Right.':'✗ '+why(k)}${good?` Streak: ${streak}.`:''} <button type="button" class="linkish">Next question →</button>`;fb.querySelector('button').onclick=pose}
A=FK.shell(c,{steps,ratio:.66,tall:1.25,draw,onStep:A=>{box.hidden=A.step!==5;keys.hidden=A.step===5;kit()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);keys=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);box=E('div',{class:'fl-chal'},A.below);wipe();A.gest({down,move,up});kit()}});
A.start()})})();
