/* Flagship – winning and losing well (ages 6–7; DfE Relationships and Health Education 2019: a normal range of
   emotions, simple self-care, courtesy and fairness; EYFS ELGs Managing Self and Building Relationships). Scenes: lose
   a dice race and say good game, calm a cross feeling with slow breaths, sort kind winner words from boasting, judge
   fair and unfair moves, and keep playing from 0–2 down. Data in learn/goodgame_art.js. */
(()=>{const {ME,KAI,END,MOODS,SAYS,WORDS,BINS,MOVES,CARDS,END_SAY,QS}=GGM;
VIS.reg('flaggoodgame',c=>{let A,deck,quizBox,qk=-1,epoch=0;const G={};c.fig.classList.add('young');
const DARK='#111827',GOOD='#047857',BAD='#b91c1c',RIM='#6b7280',SEL='#7c3aed',YOU='#2563eb',KAIC='#ea580c',SF='px system-ui,sans-serif';
const view=()=>['race','calm','words','rules','again','quiz'][A.step];
const em=n=>A.narrow?n:Math.round(n*1.15);
function floor(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#dcfce7',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H)}
function pill(t,x,y,o){o=o||{};const g=A.ctx;let n=em(o.n||14);g.font=`800 ${n}${SF}`;let w=g.measureText(t).width+26;
 while(w>A.W-10&&n>10){n--;g.font=`800 ${n}${SF}`;w=g.measureText(t).width+26}
 const h=n+16,l=Math.max(5,Math.min(A.W-w-5,x-w/2));g.fillStyle=o.bg||'#ffffff';A.paint.rrect(l,y-h/2,w,h,h/2);g.fill();
 g.lineWidth=o.ok||o.no?3:1.5;g.strokeStyle=o.ok?GOOD:o.no?BAD:RIM;g.stroke();g.fillStyle=DARK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,l+w/2,y+1)}
function card(r,e,t,o){o=o||{};const g=A.ctx;g.fillStyle=o.bg||'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();
 g.lineWidth=o.ok||o.no||o.on?4:2;g.strokeStyle=o.no?BAD:o.ok?GOOD:o.on?SEL:RIM;g.stroke();g.textAlign='center';g.textBaseline='middle';
 if(e){g.font=`${Math.round(t?Math.min(r.h*.34,r.w*.3):Math.min(r.h*.6,r.w*.6))}${SF}`;g.fillStyle='#000';g.fillText(e,r.x+r.w/2,r.y+r.h*(t?.3:.5))}
 if(t){const n=Math.round(Math.max(11,Math.min(em(o.n||14),r.h*(e?.16:.28))));g.font=`800 ${n}${SF}`;g.fillStyle=DARK;const L=wrap(t,r.w-14,g).slice(0,3),cy=e?r.y+r.h*.7:r.y+r.h/2;L.forEach((s,j)=>g.fillText(s,r.x+r.w/2,cy+(j-(L.length-1)/2)*(n+3),r.w-10))}}
function wrap(t,max,g){const out=[''];t.split(' ').forEach(w=>{const s=out[out.length-1]?out[out.length-1]+' '+w:w;if(g.measureText(s).width>max&&out[out.length-1])out.push(w);else out[out.length-1]=s});return out}
function lay(n,top,h,per){per=per||n;const gap=10,w=Math.min(170,(A.W-gap*(per+1))/per),x0=(A.W-(w*per+gap*(per-1)))/2;return Array.from({length:n},(_,i)=>({i,x:x0+(i%per)*(w+gap),y:top+Math.floor(i/per)*(h+gap),w,h}))}
const hit=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* 1. the race: lose, finish, say good game */
const dieR=()=>{const s=Math.min(A.W*.22,A.H*.22,96);return{x:A.W/2-s/2,y:A.H*.5,w:s,h:s}},sayR=()=>lay(3,A.H*.5,A.H*.3);
function lane(y,pos,col,who){const g=A.ctx,gap=4,w=Math.min(52,(A.W-70-gap*END)/(END+1));for(let i=0;i<=END;i++){const x=60+i*(w+gap);g.fillStyle=i===END?'#fde68a':'#ffffff';A.paint.rrect(x,y,w,w,6);g.fill();g.strokeStyle=RIM;g.lineWidth=1.5;g.stroke();
  if(i===pos){g.fillStyle=col;g.beginPath();g.arc(x+w/2,y+w/2,w*.32,0,7);g.fill()}}
 g.fillStyle=A.col.tx;g.font=`800 ${em(13)}${SF}`;g.textAlign='left';g.textBaseline='middle';g.fillText(who,8,y+w/2);if(pos>=END){g.font=`${Math.round(w*.6)}${SF}`;g.fillText('🏁',60+END*(w+gap)+w*.2,y-w*.3)}}
function drawRace(){const s=G.a;floor();
 lane(A.H*.13,s.me,YOU,'You');lane(A.H*.29,s.kai,KAIC,'Kai');
 if(s.said){pill('You lost, finished, and said: Good game, Kai!',A.W/2,A.H*.62,{ok:1,n:13});return}
 if(s.kai>=END){pill('Kai wins. What do you say?',A.W/2,A.H*.43,{n:13});sayR().forEach((r,j)=>card(r,'',SAYS[j][0],{no:s.bad===SAYS[j][1],n:14}));return}
 const d=dieR();card(d,'🎲','',{no:s.bad==='quit'});pill(s.last?`You rolled ${s.last}, Kai rolled ${s.klast}`:'Tap the dice to take your turn',A.W/2,A.H*.88,{n:13})}
function roll(){const s=G.a;if(s.kai>=END)return;const t=s.t;s.last=ME[t];s.me+=ME[t];s.klast=KAI[t];s.kai=Math.min(END,s.kai+KAI[t]);s.t++;s.bad=null;A.sound.pop();
 tell(s.kai>=END?`Kai rolled ${KAI[t]} and reached the end first. Kai wins. You feel sad. What do you say?`:`You rolled ${ME[t]}. Kai rolled ${KAI[t]}. Kai is ahead. Keep going.`)}
function quitRace(){const s=G.a;if(s.kai>=END)return;s.bad='quit';A.sound.miss();tell('If you quit, the game stops for Kai too. Games can change. Keep playing to the end.')}
function reply(j){const s=G.a;if(s.kai<END||s.said)return;const t=SAYS[j][1];
 if(t!=='ok'){s.bad=t;A.sound.miss();return tell(t==='blame'?'Kai did not cheat. The dice gave him big numbers. Blaming him is unkind.':'Quitting at the end spoils it for Kai. Losing is part of playing.')}
 s.said=1;s.bad=null;A.sound.pop();tell('Good game, Kai! You lost, but you finished and were kind.')}
/* 2. calm down */
const stratR=()=>lay(3,A.H*.58,A.H*.3),candR=()=>lay(5,A.H*.6,A.H*.28);
function drawCalm(){const s=G.b,g=A.ctx;floor();const cols=['#16a34a','#65a30d','#ca8a04','#ea580c','#dc2626','#b91c1c'],w=Math.min(A.W*.7,320),x0=(A.W-w)/2,y=A.H*.2,h=A.H*.1;
 for(let i=0;i<6;i++){g.fillStyle=i<=s.heat?cols[i]:(A.col.dark?'#374151':'#e5e7eb');A.paint.rrect(x0+i*w/6+2,y,w/6-4,h,6);g.fill()}
 g.fillStyle=A.col.tx;g.font=`800 ${em(12)}${SF}`;g.textAlign='left';g.fillText('calm',x0,y+h+16);g.textAlign='right';g.fillText('very cross',x0+w,y+h+16);
 pill(s.heat<=0?'Calm again: ready to play':s.way?`Feeling: ${s.heat} of 5. Tap a candle and blow slowly`:'You lost and feel cross. What do you do?',A.W/2,A.H*.07,{n:13,ok:s.heat<=0});
 g.font=`${Math.round(A.H*.12)}${SF}`;g.textAlign='center';g.fillText(['😌','🙂','😐','😠','😡','😡'][Math.max(0,s.heat)],A.W/2,A.H*.45);
 if(!s.way)return stratR().forEach((r,j)=>card(r,MOODS[j][0],MOODS[j][1],{no:s.bad===MOODS[j][2],n:14}));
 candR().forEach(r=>{const out=r.i<s.blown,g2=A.ctx;card(r,out?'💨':'🕯️','',{ok:out})})}
function choose(j){const s=G.b;if(s.way)return;const t=MOODS[j][2];
 if(t!=='ok'){s.bad=t;A.sound.miss();return tell(t==='hit'?'Hitting hurts people or things and does not help the feeling go. Try something calm.':'Hiding away means you miss the next game. Try something that calms your body.')}
 s.way=1;s.bad=null;A.sound.pop();tell('Slow breaths. Tap each candle and blow it out slowly.')}
function blow(i){const s=G.b;if(!s.way||s.heat<=0)return;if(i!==s.blown)i=s.blown;s.blown++;s.heat--;A.sound.pop();tell(s.heat<=0?'Five slow breaths. The cross feeling has gone down. Feelings are OK; you chose a calm way.':`Breath ${s.blown}. Feeling ${s.heat} of 5.`)}
/* 3. kind winner or boasting */
const binR=()=>lay(2,A.H*.08,A.H*.3),slipR=()=>lay(6,A.H*.48,A.narrow?A.H*.15:A.H*.2,A.narrow?2:3);
function drawWords(){const s=G.c;floor();
 binR().forEach((r,k)=>{card(r,BINS[k][0],BINS[k][1]+(s.in.filter(i=>WORDS[i][1]===k).length?` (${s.in.filter(i=>WORDS[i][1]===k).length})`:''),{on:s.hot===k,bg:k?'#fee2e2':'#dcfce7',n:15})});
 slipR().forEach(r=>{if(s.in.includes(r.i)||(G.drag&&G.drag.i===r.i))return;card(r,'',WORDS[r.i][0],{no:s.bad===r.i,on:s.pick===r.i,n:14})});
 if(G.drag){const d=G.drag,r=slipR()[d.i];card({x:d.x-r.w/2,y:d.y-r.h/2,w:r.w,h:r.h},'',WORDS[d.i][0],{on:1,n:14})}
 pill(s.in.length>=6?'All 6 sorted':'You won! Drag each thing you might say',A.W/2,A.H*.03,{n:12,ok:s.in.length>=6})}
function sortWord(i,k){const s=G.c;if(s.in.includes(i))return;s.pick=null;
 if(WORDS[i][1]!==k){s.bad=i;A.sound.miss();return tell(WORDS[i][1]?`${WORDS[i][0]} makes the other player feel small. That is boasting.`:`${WORDS[i][0]} is kind to the player who lost.`)}
 s.in.push(i);s.bad=-1;A.sound.pop();tell(`${WORDS[i][0]}: ${BINS[k][1].toLowerCase()}.`+(s.in.length>=6?' A kind winner thinks about how the loser feels.':''))}
/* 4. fair or not fair */
const fairR=()=>lay(2,A.H*.62,A.H*.26);
function drawRules(){const s=G.d;floor();
 if(s.k>=MOVES.length){pill('Rules are the same for everyone',A.W/2,A.H*.1,{ok:1});MOVES.forEach((m,j)=>pill(`${m[2]?'✓ fair':'✗ not fair'}: ${m[1]}`,A.W/2,A.H*(.26+j*.15),{n:12}));return}
 const m=MOVES[s.k];pill(`Move ${s.k+1} of ${MOVES.length}: fair or not fair?`,A.W/2,A.H*.07,{n:13});card({x:A.W*.08,y:A.H*.16,w:A.W*.84,h:A.H*.38},m[0],m[1],{n:16});
 fairR().forEach((r,j)=>card(r,j?'✋':'👍',j?'Not fair':'Fair',{no:s.bad===j,n:15}))}
function judge(j){const s=G.d;if(s.k>=MOVES.length)return;const fair=MOVES[s.k][2]?0:1;
 if(j!==fair){s.bad=j;A.sound.miss();return tell(fair?'Not fair: that breaks the rules everyone agreed. Rules do not change when you are losing.':'That is fair: it follows the rules.')}
 s.k++;s.bad=null;A.sound.pop();tell((fair?'Not fair. ':'Fair. ')+(s.k>=MOVES.length?'All done. Fair play means the same rules for everyone.':MOVES[s.k][1]))}
/* 5. keep playing from behind */
const pairR=()=>lay(2,A.H*.24,A.H*.36),endR=()=>lay(2,A.H*.58,A.H*.3);
function drawAgain(){const s=G.e;floor();pill(`Card match: You ${s.me} – ${s.kai} Kai`,A.W/2,A.H*.07,{n:14,ok:s.me>=3});
 if(s.r>=CARDS.length){if(s.said)return pill('You came back from 0–2 and won kindly',A.W/2,A.H*.4,{ok:1,n:13});pill('You won 3–2! What do you say?',A.W/2,A.H*.4,{n:13});return endR().forEach((r,j)=>card(r,'',END_SAY[j][0],{no:s.bad===END_SAY[j][1],n:14}))}
 pill('Tap your card to turn it over. Higher wins.',A.W/2,A.H*.17,{n:12,no:s.bad==='quit'});
 const [m,k]=CARDS[s.r];pairR().forEach((r,j)=>{const up=s.flip;card(r,up?'':'🂠',up?String(j?k:m):'',{n:40,ok:up&&((j===0&&m>k)||(j===1&&k>m)),on:!j&&!up});const g=A.ctx;g.fillStyle=A.col.tx;g.font=`800 ${em(13)}${SF}`;g.textAlign='center';g.fillText(j?'Kai':'You',r.x+r.w/2,r.y+r.h+16)});
 if(s.flip)pill('Tap again for the next round',A.W/2,A.H*.86,{n:12})}
function flip(){const s=G.e;if(s.r>=CARDS.length)return;if(s.flip){s.flip=0;s.r++;return tell(s.r>=CARDS.length?`You won ${s.me} to ${s.kai}! What do you say?`:`Round ${s.r+1}. You ${s.me}, Kai ${s.kai}.`)}
 const [m,k]=CARDS[s.r];s.flip=1;s.bad=null;if(m>k)s.me++;else s.kai++;A.sound.pop();
 tell(`You ${m}, Kai ${k}. ${m>k?'You win this round':'Kai wins this round'}. ${s.me}–${s.kai}.`+(s.kai===2&&s.me===0?' You are behind. Keep going: games can change.':''))}
function quitCards(){const s=G.e;if(s.r>=CARDS.length)return;s.bad='quit';A.sound.miss();tell(`You are ${s.me}–${s.kai}, but the game is not over. Play to the end.`)}
function endSay(j){const s=G.e;if(s.r<CARDS.length||s.said)return;if(END_SAY[j][1]!=='ok'){s.bad='boast';A.sound.miss();return tell('That makes Kai feel bad. A kind winner says good game.')}
 s.said=1;s.bad=null;A.sound.pop();tell('Good game, Kai! You kept going from 0–2 and won kindly.')}
function draw(){const k=view();if(k==='quiz'){floor();pill('Challenge',A.W/2,A.H*.16,{ok:1});pill('🤝 Fair play · good game',A.W/2,A.H*.5,{n:14});return}
 ({race:drawRace,calm:drawCalm,words:drawWords,rules:drawRules,again:drawAgain})[k]();A.fx.draw(A.ctx)}
function down(p){const k=view();
 if(k==='race'){const s=G.a;if(s.kai<END){if(hit(p,dieR()))roll()}else{const r=sayR().find(r=>hit(p,r));if(r)reply(r.i)}return false}
 if(k==='calm'){const s=G.b;if(!s.way){const r=stratR().find(r=>hit(p,r));if(r)choose(r.i)}else{const r=candR().find(r=>hit(p,r));if(r)blow(r.i)}return false}
 if(k==='words'){const r=slipR().find(r=>hit(p,r)&&!G.c.in.includes(r.i));if(r){G.drag={i:r.i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}const b=binR().find(r=>hit(p,r));if(b&&G.c.pick!=null)sortWord(G.c.pick,b.i);return false}
 if(k==='rules'){const r=fairR().find(r=>hit(p,r));if(r)judge(r.i);return false}
 if(k==='again'){const s=G.e;if(s.r<CARDS.length){if(hit(p,pairR()[0])||s.flip)flip()}else{const r=endR().find(r=>hit(p,r));if(r)endSay(r.i)}return false}return false}
function move(p){const d=G.drag;if(!d)return;d.x=p.x;d.y=p.y;const b=binR().find(r=>hit(p,r));G.c.hot=b?b.i:-1;A.redraw()}
function lift(p){const d=G.drag;if(!d)return;G.drag=null;G.c.hot=-1;const b=binR().find(r=>hit(p,r));if(b)return sortWord(d.i,b.i);
 if(Math.hypot(p.x-d.x0,p.y-d.y0)<10){G.c.pick=d.i;return tell('Picked. Now tap Kind winner or Boasting.')}A.redraw()}
function reset(){epoch++;for(const k in G)delete G[k];Object.assign(G,{a:{t:0,me:0,kai:0,last:0,klast:0,said:0,bad:null},b:{heat:5,way:0,blown:0,bad:null},c:{in:[],bad:-1,hot:-1,pick:null},d:{k:0,bad:null},e:{r:0,me:0,kai:0,flip:0,said:0,bad:null},drag:null,hook:()=>{}})}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();keys();G.hook()}
const met=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,desc,ok,msg){reset();tell(desc);G.hook=met(i,ok,msg)}
function demo(i,acts,ms){steps[i].go();const e0=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(e0===epoch)f()},ms*(j+1)))}
function keys(){if(!deck)return;deck.innerHTML='';const k=view(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},deck,t).onclick=f};
 if(k==='race'){const s=G.a;if(s.kai<END){B('🎲 Roll',roll,'Roll the dice');B('🏳️ Quit',quitRace,'Quit the game')}else if(!s.said)SAYS.forEach((o,j)=>B(o[0],()=>reply(j)))}
 if(k==='calm'){const s=G.b;if(!s.way)MOODS.forEach((m,j)=>B(m[0]+' '+m[1],()=>choose(j)));else if(s.heat>0)B('🌬️ Blow out a candle',()=>blow(s.blown),'Take a slow breath and blow out a candle')}
 if(k==='words')WORDS.forEach((w,i)=>{if(!G.c.in.includes(i))BINS.forEach((b,k2)=>B(`${w[0]} → ${b[1]}`,()=>sortWord(i,k2)))});
 if(k==='rules'&&G.d.k<MOVES.length){B('👍 Fair',()=>judge(0));B('✋ Not fair',()=>judge(1))}
 if(k==='again'){const s=G.e;if(s.r<CARDS.length){B(s.flip?'Next round →':'🂠 Turn my card',flip,s.flip?'Next round':'Turn over my card');B('🏳️ Quit',quitCards,'Quit the match')}else if(!s.said)END_SAY.forEach((o,j)=>B(o[0],()=>endSay(j)))}}
const steps=[
{h:'Race to the flag',p:'Play a dice race with Kai. Tap the dice for your turn. Play to the end, then say something.',
 task:'Finish the race and say good game',show:()=>demo(0,[()=>roll(),()=>roll(),()=>roll(),()=>reply(0)],600),
 go:()=>begin(0,'A race track for you and Kai. Both counters are on the start.',()=>G.a.said,'You lost, but you finished the game and said good game. Kai will want to play with you again.')},
{h:'Cross feelings',p:'You lost and you feel cross. Pick a way to calm down. Then tap each candle and blow slowly.',
 predict:{q:'You lose. Is it OK to feel cross?',opts:['No, you must never feel cross','Yes, feelings are OK; what you do matters'],ans:1},task:'Calm down to green',
 show:()=>demo(1,[()=>choose(0)].concat([0,1,2,3,4].map(i=>()=>blow(i))),450),
 go:()=>begin(1,'A feelings meter showing very cross.',()=>G.b.heat<=0,'Feeling cross after losing is normal. Slow breaths help it go down, so you can play again.')},
{h:'Kind winner',p:'You won! Drag each thing you might say to Kind winner or Boasting, or tap it and then a box.',
 task:'Sort all 6',show:()=>demo(2,WORDS.map((w,i)=>()=>sortWord(i,w[1])),500),
 go:()=>begin(2,'Six things a winner might say.',()=>G.c.in.length>=6,'Good game, Well played and Want another go are kind. Boasting makes the loser feel worse.')},
{h:'Fair or not fair?',p:'Watch each move. Tap Fair or Not fair.',
 predict:{q:'You are losing. Can you change the rules now?',opts:['Yes, if I am losing','No, the rules stay the same'],ans:1},task:'Judge all 5 moves',
 show:()=>demo(3,MOVES.map(m=>()=>judge(m[2]?0:1)),550),
 go:()=>begin(3,'Kai rolls 3 and moves 3.',()=>G.d.k>=MOVES.length,'Moving the number you rolled and waiting your turn are fair. Changing the rules when you are losing is not.')},
{h:'Keep going',p:'Play five rounds with Kai. Tap your card to turn it. You may fall behind: keep going to the end.',
 task:'Finish the match and win kindly',show:()=>demo(4,[...Array(10)].map(()=>()=>flip()).concat([()=>endSay(0)]),350),
 go:()=>begin(4,'Card match, round 1. You 0, Kai 0.',()=>G.e.said,'You were behind 0–2 and won 3–2. Games can change, so finish them, and win kindly.')},
{h:'Challenge',p:'',go:()=>{reset();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>G.hook()});
function why(t){let m='Play fair, finish the game and be kind.';
 if(t==='blame')m='Losing does not mean someone cheated. Say good game.';
 if(t==='quit')m='Quitting spoils the game. Games can change, so keep going.';
 if(t==='boast')m='Boasting makes the loser feel bad. Say good game.';
 if(t==='rules')m='Rules are the same for everyone, even when you are losing.';
 if(t==='feel')m='Feeling cross is OK. What matters is what you do next.';
 if(t==='hit')m='Hitting does not help. Try slow breaths.';
 return m}
function quiz(){qk++;const Q=QS[qk%QS.length],all=[[Q.a,'ok'],...Q.o],r=qk%3,ord=all.slice(r).concat(all.slice(0,r));
 quizBox.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quizBox.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>verdict(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function verdict(t,a){quizBox.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizBox.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a.replace(/[.!?]$/,'')}.`:'✗ '+why(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.62,tall:1.12,draw,onStep:S=>{quizBox.hidden=S.step!==5;deck.hidden=S.step===5;keys()},
 init:S=>{A=S;const w=c.el('div',{class:'fl-below'},A.below);deck=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Game buttons'},w);quizBox=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up:lift});keys()}}).start()})})();
