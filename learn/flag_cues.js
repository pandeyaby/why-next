/* Flagship – social cues and group dynamics (ages 11–12; DfE RSE guidance 2019 "Respectful relationships, including
   friendships"; PSHE Association KS3: peer influence, assertive communication, gossip, exclusion). Read mixed cues at a
   lunch table, split points with a coin-toss team (Tajfel's minimal groups), stop a rumour as it sharpens (Allport &
   Postman), build a reply on a passive–assertive–aggressive gauge, and find a path through being left out. */
(()=>{const FONT='Nunito,ui-rounded,system-ui,sans-serif';
const PPL=[['Ana','#8d5524','Ana smiles and says "Hi!"','A clear welcome. One friendly cue already counts for something.','WELCOME'],
 ['Leo','#f1c27d','Leo moves his bag onto the empty seat','The strongest cue, but it could still mean "saving it for Kai". Check: "Is this seat free?"','STRONG: CHECK IT'],
 ['Priya','#c68642','Priya laughs at a joke you missed','An inside joke is not proof it is about you. It may be from a lesson you were not in.','PROVES NOTHING'],
 ['Sam','#e0ac69','Sam and Ana glance at each other','A glance is the weakest cue. It could mean anything: guessing the worst is a trap.','WEAKEST: PROVES NOTHING']];
const CHAIN=['Maya did not come to the party.','Maya skipped the party.','Maya skipped it on purpose.','Maya thinks she is too good for us.','Nobody should invite Maya.'];
const SLOT=[['Opening',[['"It\'s fine, I guess…"',0],['"I feel awkward when you post photos of me"',1],['"You always humiliate me!"',2]]],
 ['Ask',[['"…whatever you want."',0],['"Please ask me before you post one."',1],['"Delete it now or else."',2]]],
 ['Close',[['"Sorry for making a fuss."',0],['"I want us to stay friends."',1],['"You are so selfish."',2]]]];
const PATH=[['You see photos of a hangout you were not invited to.',[['Post an angry comment under the photos',2,'Public anger makes everyone pick a side.'],['Message one friend: "Saw the photos. Felt a bit left out. All OK?"',1,'Calm and private. You say how you feel and ask, not accuse.'],['Leave every group chat and say nothing',0,'Pulling away hides the hurt, and nothing gets fixed.']]],
 ['Your friend replies: "Sorry! It was last minute."',[['"OK, thanks. Can I come next time?"',1,'You accept the reason and ask for what you want. That keeps the door open.'],['"Who decided not to ask me?"',2,'Hunting for blame turns a slip into a fight.'],['Leave the message unread for a week',0,'Your friend may think you do not care.']]],
 ['The group starts making fun of a new kid. They look at you to join in.',[['Join in so you fit in',0,'That is belonging at the cost of your values.'],['Say "Not funny" and change the subject',1,'Short, calm, no speech. You keep your values and give others a way out.'],['Shout at them that they are cruel',2,'True, but shouting makes them defend the joke.']]]];
VIS.reg('flagcues',c=>{let A,pads,quiz,qi=-1,streak=0;const S={};
const sc=()=>['room','team','chain','gauge','path','quiz'][A.step];
const tell=s=>{c.say(s);if(A)A.cv.setAttribute('aria-label',s)};
const fs=n=>Math.round(n*(A.narrow?1:1.2));
function txt(g,s,x,y,n,colr,w,al){g.font=`${w||800} ${fs(n)}px ${FONT}`;g.textAlign=al||'center';g.textBaseline='middle';g.fillStyle=colr||A.col.tx;g.fillText(s,x,y,A.W-16)}
function wrap(g,s,x,y,maxw,n,colr,w){g.font=`${w||700} ${fs(n)}px ${FONT}`;const ws=s.split(' '),ls=[];let cur='';ws.forEach(v=>{const t=cur?cur+' '+v:v;if(g.measureText(t).width>maxw&&cur){ls.push(cur);cur=v}else cur=t});ls.push(cur);ls.forEach((l,i)=>txt(g,l,x,y+(i-(ls.length-1)/2)*fs(n)*1.22,n,colr,w||700));return ls.length}
function person(g,x,y,r,skin,shirt,lab){const K=A.col;g.lineWidth=2;g.strokeStyle=K.tx;g.beginPath();g.arc(x,y+r*1.5,r*1.1,Math.PI,0);g.fillStyle=shirt;g.fill();g.stroke();g.beginPath();g.arc(x,y,r*.7,0,7);g.fillStyle=skin;g.fill();g.stroke();if(lab)txt(g,lab,x,y+r*2.0,11,K.tx,800)}
const seat=i=>{const W=A.W,H=A.H;return{x:W*(.16+i*.227),y:H*.12,r:Math.min(W*.055,H*.05)}};
const knob=()=>{const W=A.W;return{x0:W*.12,x1:W*.88,y:A.H*.62}};
function draw(A){const{ctx:g,W,H,col:K}=A,v=sc();g.fillStyle=A.mix(K.pn,K.vi,K.dark?.05:.05);g.fillRect(0,0,W,H);
 if(v==='quiz'){txt(g,'Read the cues · check, do not guess',W/2,H*.32,15);txt(g,'Assertive: clear, calm, respectful',W/2,H*.5,14,K.tx,700);txt(g,'Stop gossip early',W/2,H*.66,14,K.tx,700);return}
 if(v==='room'){g.fillStyle=A.mix(K.pn,K.am,.25);g.fillRect(W*.06,H*.3,W*.88,H*.05);g.strokeStyle=K.tx;g.lineWidth=2;g.strokeRect(W*.06,H*.3,W*.88,H*.05);
  PPL.forEach((p,i)=>{const s=seat(i);person(g,s.x,s.y,s.r,p[1],[K.ac,K.am,K.vi,K.gr][i],p[0]);if(!S.seen[i]){g.save();g.setLineDash([4,4]);g.strokeStyle=K.mu;g.beginPath();g.arc(s.x,s.y,s.r*1.1,0,7);g.stroke();g.restore();txt(g,'?',s.x,s.y-s.r*1.5,14,K.mu)}});
  txt(g,'You sit down. The talk stops.',W/2,H*.41,13);let y=H*.47;S.seen.forEach((o,i)=>{if(!o)return;const r={x:W*.05,y,w:W*.9,h:H*.1};g.save();A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fillStyle=A.mix(K.pn,[K.gr,K.am,K.mu,K.mu][i],.16);g.fill();g.lineWidth=1.5;g.strokeStyle=K.mu;g.stroke();g.restore();
   txt(g,PPL[i][4],r.x+8,r.y+fs(9),9.5,K.tx,800,'left');wrap(g,PPL[i][2],r.x+r.w/2,r.y+r.h*.6,r.w-14,11.5,K.tx);y+=H*.115});
  if(S.seen.every(Boolean))txt(g,'One welcome, one to check, two that prove nothing.',W/2,H*.96,11,K.tx,800)}
 if(v==='team'){const k=knob(),mine=Math.round(S.v);[[0,K.ac,'Blue (your team)'],[1,K.gr,'Green']].forEach(([j,cl,lab])=>{const x=W*(j?.72:.28);person(g,x,H*.16,Math.min(W*.05,H*.06),'#d9a066',cl,'');txt(g,lab,x,H*.32,12,K.tx,800);
   const pts=j?20-mine:mine;g.fillStyle=cl;g.fillRect(x-W*.08,H*.5-pts*H*.006,W*.16,pts*H*.006);txt(g,pts+' pts',x,H*.5-pts*H*.006-fs(9),12,K.tx,800)});
  txt(g,'A coin picked your team. You know no one.',W/2,H*.04+fs(6),11,K.mu,700);
  g.strokeStyle=K.mu;g.lineWidth=4;g.beginPath();g.moveTo(k.x0,k.y);g.lineTo(k.x1,k.y);g.stroke();const kx=k.x0+(k.x1-k.x0)*(1-S.v/20);
  g.beginPath();g.arc(kx,k.y,fs(13),0,7);g.fillStyle=K.am;g.fill();g.lineWidth=2;g.strokeStyle=K.tx;g.stroke();txt(g,'more to Blue',k.x0,k.y+fs(24),10,K.mu,700,'left');txt(g,'more to Green',k.x1,k.y+fs(24),10,K.mu,700,'right');
  if(S.locked){const y=H*.82;wrap(g,'In Tajfel\'s studies most people gave their own coin-toss team more, often choosing the biggest gap over the most points.',W/2,y,W*.9,11.5,K.tx,800)}}
 if(v==='chain'){const n=CHAIN.length,gap=W/(n+.2);for(let i=0;i<n;i++){const x=gap*(i+.6),y=H*.2;person(g,x,y,Math.min(gap*.2,H*.06),['#8d5524','#f1c27d','#c68642','#e0ac69','#d9a066'][i],i<=S.hop?(S.stop!=null&&i>S.stop?K.mu:K.am):K.mu,'')}
  const hx=gap*(S.hop+.6);g.fillStyle=K.ac;g.beginPath();g.moveTo(hx,H*.31);g.lineTo(hx-8,H*.36);g.lineTo(hx+8,H*.36);g.fill();
  g.save();A.paint.rrect(W*.06,H*.4,W*.88,H*.2,12);g.fillStyle=K.pn;g.fill();g.lineWidth=2;g.strokeStyle=K.tx;g.stroke();g.restore();wrap(g,'"'+CHAIN[S.hop]+'"',W/2,H*.5,W*.8,15,K.tx,800);
  const harm=S.hop/(n-1);txt(g,'Harm to Maya',W*.06,H*.7,11,K.tx,800,'left');g.fillStyle=A.mix(K.pn,K.tx,.08);g.fillRect(W*.06,H*.74,W*.88,fs(14));g.fillStyle=K.rd;g.fillRect(W*.06,H*.74,W*.88*harm,fs(14));g.strokeStyle=K.tx;g.lineWidth=1.5;g.strokeRect(W*.06,H*.74,W*.88,fs(14));
  if(S.msg)wrap(g,S.msg,W/2,H*.88,W*.9,12,K.tx,800)}
 if(v==='gauge'){const cx=W/2,cy=H*.36,R=Math.min(W*.3,H*.26);[[K.mu,'Passive'],[K.gr,'Assertive'],[K.rd,'Aggressive']].forEach(([cl,lab],i)=>{g.beginPath();g.arc(cx,cy,R,Math.PI+i*Math.PI/3,Math.PI+(i+1)*Math.PI/3);g.lineWidth=fs(14);g.strokeStyle=cl;g.stroke();
   txt(g,lab,[cx-R,cx,cx+R][i],[cy+fs(20),cy-R-fs(16),cy+fs(20)][i],11,K.tx,800)});
  const ang=Math.PI+(S.nd/2)*Math.PI;g.strokeStyle=K.tx;g.lineWidth=4;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(ang)*R*.85,cy+Math.sin(ang)*R*.85);g.stroke();g.beginPath();g.arc(cx,cy,6,0,7);g.fillStyle=K.tx;g.fill();
  SLOT.forEach(([lab,opts],i)=>{const r=slotR(i),o=opts[S.pick[i]];g.save();A.paint.rrect(r.x,r.y,r.w,r.h,10);g.fillStyle=A.mix(K.pn,[K.mu,K.gr,K.rd][o[1]],.14);g.fill();g.lineWidth=2;g.strokeStyle=K.tx;g.stroke();g.restore();
   txt(g,lab+' (tap to change)',r.x+8,r.y+fs(9),9.5,K.mu,800,'left');wrap(g,o[0],r.x+r.w/2,r.y+r.h*.6,r.w-16,11.5,K.tx,700)})}
 if(v==='path'){const n=PATH.length;for(let i=0;i<n;i++){const x=W*(.2+i*.3),y=H*.1;g.beginPath();g.arc(x,y,fs(13),0,7);g.fillStyle=i<S.at?K.gr:i===S.at?K.am:A.mix(K.pn,K.tx,.1);g.fill();g.lineWidth=2;g.strokeStyle=K.tx;g.stroke();txt(g,String(i+1),x,y,12,K.tx,800);if(i<n-1){g.beginPath();g.moveTo(x+fs(15),y);g.lineTo(x+W*.3-fs(15),y);g.stroke()}}
  if(S.at<n){g.save();A.paint.rrect(W*.06,H*.22,W*.88,H*.28,12);g.fillStyle=K.pn;g.fill();g.lineWidth=2;g.strokeStyle=K.tx;g.stroke();g.restore();wrap(g,PATH[S.at][0],W/2,H*.36,W*.8,14,K.tx,800)}
  else wrap(g,'You kept your friends AND your values.',W/2,H*.36,W*.8,15,K.tx,800);
  if(S.msg)wrap(g,S.msg,W/2,H*.7,W*.88,12,K.tx,700)}
 A.fx.draw(g)}
function slotR(i){const W=A.W,H=A.H,h=H*.15;return{x:W*.05,y:H*.5+i*(h+H*.015),w:W*.9,h}}
function load(v){const t=S.tok;Object.keys(S).forEach(k=>delete S[k]);S.tok=t||0;S.want=()=>{};S.seen=[0,0,0,0];S.v=10;S.locked=0;S.hop=0;S.stop=null;S.pick=[0,2,2];S.nd=(0+2+2)/3;S.at=0;S.msg=''}
function look(i){if(sc()!=='room'||S.seen[i])return;S.seen[i]=1;A.sound.tick();tell(PPL[i][2]+'. '+PPL[i][3]);buttons();A.redraw();if(S.seen.every(Boolean)){S.ok=1;S.want()}}
function setV(v){if(S.locked)return;S.v=Math.max(0,Math.min(20,Math.round(v)));tell(`Blue ${S.v} points, Green ${20-S.v}.`);A.redraw()}
function lock(){if(S.locked)return;S.locked=1;A.sound.pop();const m=S.v>10?'You gave your own team more, like most people in the studies. A coin toss was enough to make an "us".':S.v===10?'You split it fairly. Fewer people do that: the pull of "us" is strong.':'You gave the other team more. That is rare: most people favour their own team.';
 tell(m);buttons();A.redraw();S.ok=1;S.want()}
function pass(){if(S.stop!=null||S.hop>=CHAIN.length-1)return;S.hop++;A.sound.tick();const end=S.hop===CHAIN.length-1;S.msg=end?'It reached everyone, and it is not even true. Start again and stop it early.':'';tell(`Person ${S.hop+1} hears: ${CHAIN[S.hop]}`+(end?' '+S.msg:''));if(end)A.sound.miss();buttons();A.redraw()}
function stop(){if(S.stop!=null)return;S.stop=S.hop;if(S.hop<=1){A.sound.pop();S.msg='"I don\'t know that\'s true. Ask Maya." You stopped it before it turned cruel.';S.ok=1;tell(S.msg);S.want()}
 else{A.sound.miss();S.msg='Stopped, but it already says something cruel and untrue. Start again and stop it sooner.';tell(S.msg)}buttons();A.redraw()}
function restart(){S.hop=0;S.stop=null;S.msg='';tell('Start again. Person 1 hears: '+CHAIN[0]);buttons();A.redraw()}
function cyc(i){if(sc()!=='gauge')return;S.pick[i]=(S.pick[i]+1)%3;const o=SLOT[i][1][S.pick[i]];A.tween(S,{nd:S.pick.reduce((a,b,j)=>a+SLOT[j][1][b][1],0)/3},350,'out');A.sound.tick();
 const kind=['passive','assertive','aggressive'][o[1]];tell(`${SLOT[i][0]}: ${o[0]} That part is ${kind}.`);if(S.pick.every((p,j)=>SLOT[j][1][p][1]===1)){S.ok=1;tell('All three parts are assertive: a clear feeling, a fair request, respect.');A.sound.pop();S.want()}buttons();A.redraw()}
function choose(j){if(sc()!=='path'||S.at>=PATH.length)return;const o=PATH[S.at][1][j];if(o[1]!==1){A.sound.miss();S.msg=o[2]+' Try another way.';tell(S.msg);A.redraw();return}
 A.sound.pop();S.msg=o[2];S.at++;tell(o[2]+(S.at<PATH.length?' Next: '+PATH[S.at][0]:''));if(S.at>=PATH.length){S.ok=1;S.want()}buttons();A.redraw()}
function buttons(){if(!pads)return;pads.innerHTML='';const v=sc(),E=(lab,fn,al)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':al||lab},pads,lab);b.onclick=fn;return b};
 if(v==='room')PPL.forEach((p,i)=>{if(!S.seen[i])E('Look at '+p[0],()=>look(i))});
 if(v==='team'&&!S.locked){E('More to Blue',()=>setV(S.v+2));E('More to Green',()=>setV(S.v-2));E('Lock in my split',lock)}
 if(v==='chain'){if(S.stop==null&&S.hop<CHAIN.length-1){E('Pass it on',pass);E('Stop it here',stop,'Stop the rumour here and say: I do not know that is true')}if(!S.ok&&(S.stop!=null||S.hop>=CHAIN.length-1))E('Start again',restart)}
 if(v==='gauge')SLOT.forEach(([lab,opts],i)=>E('Change '+lab,()=>cyc(i),`Change the ${lab.toLowerCase()}. Now: ${opts[S.pick[i]][0]}`));
 if(v==='path'&&S.at<PATH.length)PATH[S.at][1].forEach((o,j)=>E(o[0],()=>choose(j)))}
const inR=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function down(p){const v=sc();if(v==='room'){const i=PPL.findIndex((_,i)=>{const s=seat(i);return Math.hypot(p.x-s.x,p.y-s.y)<s.r*1.6});if(i>=0){look(i);return true}}
 if(v==='team'&&!S.locked){const k=knob();if(Math.abs(p.y-k.y)<fs(30)){S.drag=1;move(p);return true}}
 if(v==='gauge'){const i=SLOT.findIndex((_,i)=>inR(p,slotR(i)));if(i>=0){cyc(i);return true}}return false}
function move(p){if(!S.drag)return;const k=knob();setV(20*(1-(p.x-k.x0)/(k.x1-k.x0)))}
function up(){S.drag=0}
const ok=(n,msg)=>()=>{if(A.step===n&&S.ok&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
const play=(acts,ms)=>{const k=++S.tok;acts.forEach((fn,j)=>setTimeout(()=>{if(k===S.tok)fn()},A.reduced()?j*30+30:(j+1)*ms))};
const steps=[
{h:'Read the room',p:'Tap each person to notice their cue. Some cues are strong, some prove nothing.',predict:{q:'You sit down at lunch and the talk stops. What is the best first thought?',opts:['It might be about me, or not: look for more cues','They definitely do not want me here','It means nothing, so ignore everything'],ans:0},task:'Notice all four cues',
 show:()=>{steps[0].go();play([0,1,2,3].map(i=>()=>look(i)),600)},
 go:()=>{load();tell('You sit down at lunch. The talk stops. Look at each person.');buttons();S.want=ok(0,'Cues are clues, not proof. When a cue is unclear, check ("Is this seat free?") before guessing the worst.')}},
{h:'Us and them',p:'A coin toss put you in Blue. Drag the slider to share 20 points between a Blue and a Green you do not know, then lock it in.',predict:{q:'In experiments, teams were picked by a coin toss. Did people still favour their own team?',opts:['Yes, most gave their own team more','No, a coin toss means nothing','Only if they already knew their teammates'],ans:0},task:'Make your split and lock it in',
 show:()=>{steps[1].go();play([()=>setV(14),()=>setV(16),lock],600)},
 go:()=>{load();tell('Blue 10, Green 10. Drag or use the buttons.');buttons();S.want=ok(1,'"Us" can form from nothing at all. That pull explains why groups leave people out. Noticing it is the first step to resisting it.')}},
{h:'The gossip chain',p:'A story passes from person to person. Watch it change, and stop it before it turns cruel.',predict:{q:'A story passes through five people. What usually happens to it?',opts:['It changes and gets more extreme','It stays exactly the same','It gets kinder'],ans:0},task:'Stop the rumour early',
 show:()=>{steps[2].go();play([pass,stop],700)},
 go:()=>{load();tell('Person 1 hears: '+CHAIN[0]);buttons();S.want=ok(2,'Each retelling drops details and sharpens the drama. Gossip bonds the group, but someone always pays. "I don\'t know that\'s true" stops it.')}},
{h:'Assertive, not aggressive',p:'A friend keeps posting photos of you that you do not like. Tap each part of your reply to change it. Watch the gauge.',task:'Build a fully assertive reply',
 show:()=>{steps[3].go();play([()=>cyc(0),()=>cyc(1),()=>cyc(1),()=>cyc(2),()=>cyc(2)],500)},
 go:()=>{load();tell('Your reply now: '+SLOT.map((s,i)=>s[1][S.pick[i]][0]).join(' '));buttons();A.redraw();S.want=ok(3,'Assertive is clear and calm: say how you feel, ask for what you need, respect the other person. Loud is aggressive. Silent is passive.')}},
{h:'When you are left out',p:'Choose what you would do at each point. Find the path that keeps your friends and your values.',predict:{q:'You are left out of a hangout. Which first move works best?',opts:['Calmly tell one friend how you felt and ask','Post about it so everyone knows','Quietly drop all your friends'],ans:0},task:'Reach the end of the path',
 show:()=>{steps[4].go();play([()=>choose(1),()=>choose(0),()=>choose(1)],700)},
 go:()=>{load();tell(PATH[0][0]);buttons();S.want=ok(4,'Belonging should not cost your values. Calm, private and honest words keep friendships, and a short "Not funny" protects someone else.')}},
{h:'Challenge',p:'',go:()=>{load();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.want()});
const QS=[['Which reply is assertive?',[['"I felt hurt by that joke. Please don\'t make it again."','ok'],['"Say that again and you\'ll regret it."','aggr'],['"Haha, it\'s fine…" (but it isn\'t)','pass']]],
 ['A friend walks past without saying hi. What is the best first thought?',[['Maybe they did not see me. I can check later','ok'],['They must be angry with me','worst'],['I will ignore them too','tit']]],
 ['Someone tells you a rumour about a classmate. What stops it?',[['"I don\'t know that\'s true." and not passing it on','ok'],['Passing it on exactly as you heard it','exact'],['Asking more people if it is true','ask']]],
 ['Teams were picked by a coin toss. Why did people still favour their own team?',[['Just being in a group makes "us" feel special','ok'],['Their team was better','better'],['They knew their teammates','knew']]],
 ['The group mocks a new kid and looks at you. What keeps your values?',[['"Not funny." Then change the subject','ok'],['Laugh along so you fit in','fit'],['Shout that they are all cruel','shout']]],
 ['What is the difference between assertive and aggressive?',[['Assertive respects the other person; aggressive attacks them','ok'],['Assertive is quieter, so it is weaker','weak'],['There is no difference','none']]]];
function why(t){let m='Think about what is clear, calm and fair.';
 if(t==='aggr')m='A threat is aggressive. It attacks the person instead of the problem.';
 if(t==='pass')m='Saying it is fine when it is not is passive. Your friend cannot fix what they do not know.';
 if(t==='worst')m='That is guessing the worst from one unclear cue. Check before you decide.';
 if(t==='tit')m='Ignoring back turns a maybe into a real problem.';
 if(t==='exact')m='Passing it on still spreads it, and the next person will change it.';
 if(t==='ask')m='Asking around spreads the rumour further, even if you mean well.';
 if(t==='better')m='Nobody knew which team was better. The coin made the teams.';
 if(t==='knew')m='They knew no one. The studies used strangers on purpose.';
 if(t==='fit')m='Fitting in by mocking someone costs your values and hurts them.';
 if(t==='shout')m='True, but shouting makes the group defend the joke. Short and calm works better.';
 if(t==='weak')m='Assertive can be quiet and still firm. Volume is not strength.';
 if(t==='none')m='Assertive says what you need with respect. Aggressive gets its way by attacking.';
 return m}
function ask(){qi++;const[q,ops]=QS[qi%QS.length],rot=qi%3;quiz.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ops.slice(rot).concat(ops.slice(0,rot)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>mark(t)});tell('Challenge: '+q);A.redraw()}
function mark(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),good=t==='ok';
 if(good){streak++;A.win()}else{streak=0;A.sound.miss()}fb.innerHTML=(good?'Yes! In a row: '+streak+'.':'Not quite. '+why(t))+' <button type="button" class="linkish">Another question</button>';fb.querySelector('button').onclick=ask}
A=FK.shell(c,{steps,ratio:.62,tall:1.3,draw,onStep:A=>{quiz.hidden=A.step!==5;pads.hidden=A.step===5;buttons()},
 init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pads=E('div',{class:'fl-ctl',role:'group','aria-label':'Your moves'},w);quiz=E('div',{class:'fl-chal'},A.below);load();
  A.gest({down,move,up});if(typeof ResizeObserver!=='undefined')new ResizeObserver(()=>requestAnimationFrame(()=>A.redraw())).observe(A.stage);buttons()}});
A.start()})})();
