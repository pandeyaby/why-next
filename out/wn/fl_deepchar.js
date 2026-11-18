/* Flagship: in-depth character and setting analysis (ages 9–10; CCSS RL.4.3: describe in depth a character, setting or event,
   drawing on specific details such as a character's thoughts, words and actions). One short story, "The Lighthouse Key".
   Sort clues into says / does / thinks / how others respond, gather evidence for a trait from the beginning, middle and end,
   tap the sense details in a setting and name its mood, rebuild an event's chain of effects, and pick the stronger of two
   descriptions. Every tap and drag has a button. */
(()=>{
const {KINDS,KINDBOX,PARTS,SENSES,MOODS,CHAIN,CHAINBOX,PAIRS,BANK,WHY}=DEEPCHARART;
const Q={ink:'#111827',grey:'#374151',page:'#fffdf8',edge:'#1f2937',lead:'#e0f2fe',ok:'#166534',okBg:'#dcfce7',no:'#9f1239',noBg:'#ffe4e6',
 say:'#fef3c7',act:'#dbeafe',mind:'#f3e8ff',them:'#fce7f3',chip:'#ffffff',sea:'#0c4a6e'};
const ORDER=[2,0,3,1];
VIS.reg('flagdeepchar',c=>{let A,X,panel,quizEl,qn=-1,tok=0,row=0;const T={after:()=>{}};
const fs=n=>Math.round(n*(A.narrow?1.03:1.1));
function voice(s){c.say(s);A.cv.setAttribute('aria-label',s)}
function word(s,x,y,n,col,wt,al){X.font=`${wt||800} ${fs(n)}px system-ui,sans-serif`;X.fillStyle=col||Q.ink;X.textAlign=al||'center';X.textBaseline='middle';X.fillText(String(s),x,y)}
function lines(s,w,n,wt){X.font=`${wt||800} ${fs(n)}px system-ui,sans-serif`;const r=[];let l='';String(s).split(' ').forEach(t=>{const z=l?l+' '+t:t;if(l&&X.measureText(z).width>w){r.push(l);l=t}else l=z});r.push(l);return r}
function tile(x,y,w,h,f,e,lw,r){A.paint.rrect(x,y,w,h,r||10);X.fillStyle=f;X.fill();if(e){X.lineWidth=lw||2;X.strokeStyle=e;X.stroke()}}
function centred(s,R,n,col,wt){const L=lines(s,R.w-fs(12),n,wt),lh=fs(n)+4;L.forEach((t,i)=>word(t,R.x+R.w/2,R.y+R.h/2+(i-(L.length-1)/2)*lh,n,col,wt))}
const tall=(s,w,n,wt)=>lines(s,w-fs(12),n,wt).length*(fs(n)+4)+fs(14);
const on=(p,R)=>!!R&&p.x>=R.x&&p.x<=R.x+R.w&&p.y>=R.y&&p.y<=R.y+R.h;
const now=()=>['kinds','parts','senses','chain','pairs','quiz'][A.step];
const miss=s=>{T.bad=true;T.msg=s;A.sound.miss();talk()};
const good=s=>{T.bad=false;T.msg=s;A.sound.pop()};
function banner(s,won){const L=lines(s,A.W-44,15),lh=fs(15)+4,h=Math.max(fs(38),L.length*lh+12);tile(12,10,A.W-24,h,won?Q.okBg:Q.lead,won?Q.ok:Q.edge,2,12);L.forEach((t,i)=>word(t,A.W/2,10+h/2+(i-(L.length-1)/2)*lh,15,won?Q.ok:Q.ink));return 10+h}
function note(){if(!T.msg)return 0;const L=lines((T.bad?'✗ ':'✓ ')+T.msg,A.W-44,13),lh=fs(13)+5,h=L.length*lh+12,y=A.H-h-10;tile(12,y,A.W-24,h,'#ffffff',T.bad?Q.no:Q.ok,3,12);L.forEach((t,i)=>word(t,A.W/2,y+6+lh*(i+.5),13,T.bad?Q.no:Q.ink));return h+14}
/* ---------- step 0: four kinds of clue ---------- */
function sortKind(b){if(T.won)return;const it=KINDS[T.at];if(b!==it[1])return miss(`Not ${KINDBOX[b].toLowerCase()}. ${it[2]}`);good(it[2]);T.at++;
 if(T.at>=KINDS.length){T.won=true;T.msg='Four kinds of clue: what a character says, does and thinks, and how others respond to them.'}talk()}
function drawKinds(t0,b0){const g=fs(8),cols=A.narrow?2:4,bw=(A.W-28-g*(cols-1))/cols,bh=fs(54),rows=4/cols,by=b0-rows*bh-(rows-1)*g;
 T.bins=KINDBOX.map((s,i)=>{const R={x:14+(i%cols)*(bw+g),y:by+Math.floor(i/cols)*(bh+g),w:bw,h:bh,i};tile(R.x,R.y,R.w,R.h,[Q.say,Q.act,Q.mind,Q.them][i],Q.edge,2.5);centred(s,R,14,Q.ink);return R});
 if(T.at<KINDS.length){const cw=Math.min(A.W-36,fs(380)),ch=tall(KINDS[T.at][0],cw,15,700)+fs(8),home={x:(A.W-cw)/2,y:t0+(by-t0-ch)/2,w:cw,h:ch},d=T.drag;T.card=home;
  const R=d?{x:d.x-cw/2,y:d.y-ch/2,w:cw,h:ch}:home;tile(R.x,R.y,R.w,R.h,'#ffffff',d?Q.sea:Q.edge,3,12);centred(KINDS[T.at][0],R,15,Q.ink,700);word(`Clue ${T.at+1} of ${KINDS.length}`,A.W/2,Math.max(t0+fs(4),home.y-fs(12)),12,Q.grey,800)}}
/* ---------- step 1: evidence from every part of the story ---------- */
function pickClue(p,j){if(T.won)return;if(T.got[p]!=null)return miss(`You already have a ${PARTS[p][0].toLowerCase()} clue. Find one in another part of the story.`);
 const [s,ok,why]=PARTS[p][1][j];if(!ok)return miss(why);T.got[p]=j;good(`${PARTS[p][0]}: "${s}" ${why}`);
 if(T.got.every(v=>v!=null)){T.won=true;T.msg='Nell is determined, and you have proof from the beginning, the middle and the end.'}talk()}
function drawParts(t0,b0){const g=fs(8),side=!A.narrow,cw=side?(A.W-28-g*2)/3:A.W-28;const intro=lines('Nell is determined. Tap one clue in each part that proves it.',A.W-28,12,800);intro.forEach((t,i)=>word(t,A.W/2,t0+fs(8)+i*(fs(12)+4),12,Q.grey,800));
 let y=t0+fs(10)+intro.length*(fs(12)+4);T.chips=[];PARTS.forEach(([name,S],p)=>{const x=side?14+p*(cw+g):14;let yy=side?y:y;word(name,x+cw/2,yy+fs(8),13,Q.sea,900);yy+=fs(20);
  S.forEach(([s],j)=>{const h=tall(s,cw,12,700),R={x,y:yy,w:cw,h,p,j},mine=T.got[p]===j;tile(R.x,R.y,R.w,R.h,mine?Q.okBg:Q.chip,mine?Q.ok:Q.edge,mine?3:1.5,8);centred((mine?'✓ ':'')+s,R,12,Q.ink,700);T.chips.push(R);yy+=h+fs(5)});
  if(!side)y=yy+fs(6)})}
/* ---------- step 2: sense details, then the mood ---------- */
const need=SENSES.filter(s=>s[1]).length;
function tapSense(i){if(T.won)return;const [s,sense,why]=SENSES[i];if(T.found.includes(i))return;if(!sense)return miss(why);T.found.push(i);good(`${sense[0].toUpperCase()+sense.slice(1)}: ${why}`);
 if(T.found.length>=need)T.msg+=' All the sense details found. Now, what mood do they build?';talk()}
function pickMood(k){if(T.won)return;if(T.found.length<need)return miss('Find all the sense details first. They are the evidence for the mood.');const [m,ok,why]=MOODS[k];if(!ok)return miss(why);T.won=true;good(why);talk()}
function drawSenses(t0,b0){const g=fs(6),side=!A.narrow,cw=side?(A.W-28-g)/2:A.W-28,h=fs(40);T.chips=SENSES.map(([s,sense],i)=>{const R={x:14+(side?(i%2)*(cw+g):0),y:t0+(side?Math.floor(i/2):i)*(h+g),w:cw,h,i},f=T.found.includes(i);
  tile(R.x,R.y,R.w,R.h,f?Q.okBg:Q.chip,f?Q.ok:Q.edge,f?3:1.5,8);centred((f?`✓ ${sense}: `:'')+s,R,12,Q.ink,700);return R});
 const my=t0+(side?3:6)*(h+g)+fs(8),open=T.found.length>=need,mw=(A.W-28-g*2)/3,mh=Math.min(fs(48),Math.max(fs(36),b0-my-4));
 T.moods=MOODS.map(([m],k)=>{const R={x:14+k*(mw+g),y:my,w:mw,h:mh,k};tile(R.x,R.y,R.w,R.h,open?'#fef9c3':'#f3f4f6',open?Q.edge:'#6b7280',2,10);centred(m,R,12,Q.ink,800);return R})}
/* ---------- step 3: one event, four links ---------- */
function linkCard(k){if(T.won)return;if(k<T.chain)return;if(k!==T.chain){return miss(`That card is the ${CHAINBOX[k].toLowerCase()}. The next box needs the ${CHAINBOX[T.chain].toLowerCase()}: ${T.chain?CHAIN[T.chain][1]:'start with what happened.'}`)}
 good(`${CHAINBOX[k]}: ${CHAIN[k][1]}`);T.chain++;if(T.chain>=CHAIN.length){T.won=true;T.msg='Event, reaction, consequence, change: that is how one event drives a story and changes a character.'}talk()}
function drawChain(t0,b0){const g=fs(6),half=(b0-t0)/2;T.cards=[];let y=t0;ORDER.forEach(k=>{if(k<T.chain)return;const h=tall(CHAIN[k][0],A.W-28,12,700),R={x:14,y,w:A.W-28,h,k};tile(R.x,R.y,R.w,R.h,'#ffffff',Q.edge,1.5,8);centred(CHAIN[k][0],R,12,Q.ink,700);T.cards.push(R);y+=h+g});
 const cols=A.narrow?2:4,sw=(A.W-28-g*(cols-1))/cols,sy=Math.max(y+fs(10),t0+half*.9),rows=4/cols,sh=Math.max(fs(56),(b0-sy-4-(rows-1)*g)/rows);CHAINBOX.forEach((n,i)=>{const R={x:14+(i%cols)*(sw+g),y:sy+Math.floor(i/cols)*(sh+g),w:sw,h:sh},full=i<T.chain;
  tile(R.x,R.y,R.w,R.h,full?Q.okBg:'#f8fafc',full?Q.ok:'#6b7280',2,8);word(`${i+1}. ${n}`,R.x+sw/2,R.y+fs(12),12,full?Q.ok:Q.grey,900);if(full){const L=lines(CHAIN[i][0],sw-fs(8),11,700);L.slice(0,5).forEach((t,j)=>word(t,R.x+sw/2,R.y+fs(30)+j*(fs(11)+3),11,Q.ink,700))}})}
/* ---------- step 4: which description is stronger? ---------- */
function choose(k){if(T.won)return;const [a,b,best,why]=PAIRS[T.pair];if(k!==best)return miss(`That one is thinner. ${why}`);good(why);T.pair++;
 if(T.pair>=PAIRS.length){T.won=true;T.msg='Strong descriptions name a trait or mood, then prove it with exact details from the text.'}talk()}
function drawPairs(t0,b0){if(T.pair>=PAIRS.length){T.opts=[];return}const [a,b]=PAIRS[T.pair],g=fs(10),side=!A.narrow,w=side?(A.W-28-g)/2:A.W-28;word(`Pair ${T.pair+1} of ${PAIRS.length}: tap the stronger description.`,A.W/2,t0+fs(8),13,Q.grey,800);
 const h=Math.max(tall(a,w,14,700),tall(b,w,14,700))+fs(18);T.opts=[a,b].map((s,k)=>{const R={x:14+(side?k*(w+g):0),y:t0+fs(26)+(side?0:k*(h+g)),w,h,k};tile(R.x,R.y,R.w,R.h,k?Q.act:Q.say,Q.edge,2.5,12);
  word(k?'B':'A',R.x+fs(14),R.y+fs(14),13,Q.sea,900);centred(s,{x:R.x,y:R.y+fs(8),w:R.w,h:R.h-fs(8)},14,Q.ink,700);return R})}
/* ---------- drawing ---------- */
function draw(){X.fillStyle=A.col.dark?'#1f2937':Q.page;X.fillRect(0,0,A.W,A.H);X.fillStyle=Q.page;A.paint.rrect(5,5,A.W-10,A.H-10,16);X.fill();
 const k=now(),H={kinds:['What kind of clue is it? Drag each one to a box.','Every kind of clue sorted.'],parts:['Find proof in every part of the story.','Proof from start to finish.'],
  senses:['Tap every detail you could see, hear, feel or smell.','Setting and mood described.'],chain:['Tap the cards in order: event first.','The chain is complete.'],
  pairs:['Which description goes deeper?','You can spot a deep description.'],quiz:['Trait or mood, then the exact words that prove it.','']};
 const t=banner(T.won?H[k][1]:H[k][0],T.won),b=A.H-note()-fs(6);
 ({kinds:drawKinds,parts:drawParts,senses:drawSenses,chain:drawChain,pairs:drawPairs})[k]?.(t+fs(10),b);
 if(k==='quiz'){const R={x:fs(28),y:t+fs(26),w:A.W-fs(56),h:Math.min(fs(150),b-t-fs(50))};tile(R.x,R.y,R.w,R.h,Q.mind,Q.edge,2,12);centred('Say what the character is like, or how the place feels. Then prove it with what they say, do and think, and with sense details.',R,16,Q.ink)}
 A.fx.draw(X)}
/* ---------- pointer ---------- */
let grab=null;
function down(p){const k=now();if(T.won&&k!=='kinds')return false;
 if(k==='kinds'&&!T.won){if(on(p,T.card)){grab=1;T.drag={x:p.x,y:p.y};A.redraw();return true}const R=(T.bins||[]).find(q=>on(p,q));if(R){sortKind(R.i);return true}}
 if(k==='parts'){const R=(T.chips||[]).find(q=>on(p,q));if(R){pickClue(R.p,R.j);return true}}
 if(k==='senses'){const R=(T.chips||[]).find(q=>on(p,q));if(R){tapSense(R.i);return true}const M=(T.moods||[]).find(q=>on(p,q));if(M){pickMood(M.k);return true}}
 if(k==='chain'){const R=(T.cards||[]).find(q=>on(p,q));if(R){linkCard(R.k);return true}}
 if(k==='pairs'){const R=(T.opts||[]).find(q=>on(p,q));if(R){choose(R.k);return true}}
 return false}
function move(p){if(grab){T.drag={x:p.x,y:p.y};A.redraw()}}
function up(p){if(!grab)return;grab=null;T.drag=null;const R=(T.bins||[]).find(q=>on(p,q));if(R)sortKind(R.i);else A.redraw()}
/* ---------- live description and buttons ---------- */
function talk(){const k=now();let d='Challenge.';
 if(k==='kinds')d=T.won?'All clues sorted.':`Clue ${T.at+1} of ${KINDS.length}: ${KINDS[T.at][0]} Boxes: ${KINDBOX.join(', ')}.`;
 if(k==='parts')d=`Proof found: ${T.got.filter(v=>v!=null).length} of 3 parts. `+PARTS.map(([n,S])=>n+': '+S.map(s=>s[0]).join(' / ')).join('. ');
 if(k==='senses')d=`Sense details found: ${T.found.length} of ${need}. Moods: ${MOODS.map(m=>m[0]).join(', ')}.`;
 if(k==='chain')d=T.won?'Chain complete.':`Boxes filled: ${T.chain} of 4. Next box: ${CHAINBOX[T.chain]}. Cards: ${ORDER.filter(i=>i>=T.chain).map(i=>CHAIN[i][0]).join(' / ')}`;
 if(k==='pairs')d=T.won?'All pairs done.':`Pair ${T.pair+1}. A: ${PAIRS[T.pair][0]} B: ${PAIRS[T.pair][1]}`;
 voice((T.msg?T.msg+' ':'')+d);keys();T.after()}
function keys(){if(!panel)return;panel.innerHTML='';const k=now(),b=(t,fn)=>{c.el('button',{type:'button',class:'lbtn ghost'},panel,t).onclick=()=>{fn();talk()}};
 if(!T.won){if(k==='kinds')KINDBOX.forEach((n,i)=>b(n,()=>sortKind(i)));
  if(k==='parts')PARTS.forEach(([n,S],p)=>S.forEach(([s],j)=>b(`${n}: ${s}`,()=>pickClue(p,j))));
  if(k==='senses'){SENSES.forEach(([s],i)=>{if(!T.found.includes(i))b(s,()=>tapSense(i))});MOODS.forEach(([m],i)=>b(`Mood: ${m}`,()=>pickMood(i)))}
  if(k==='chain')ORDER.forEach(i=>{if(i>=T.chain)b(CHAIN[i][0],()=>linkCard(i))});
  if(k==='pairs'){b('A is stronger',()=>choose(0));b('B is stronger',()=>choose(1))}}
 A.redraw()}
const complete=(n,test,msg)=>()=>{if(A.step===n&&test()&&!(steps[n].predict&&A.pred[n]==null))A.done(msg+A.reveal(n))};
const auto=(fns,ms)=>{const id=++tok;fns.forEach((f,j)=>setTimeout(()=>{if(id===tok){f();talk()}},(j+1)*(A.reduced()?50:ms)))};
function fresh(){tok++;Object.assign(T,{after:()=>{},won:false,msg:'',bad:false,at:0,drag:null,got:[null,null,null],found:[],chain:0,pair:0})}
const steps=[
{h:'Four kinds of clue',p:'Nell, 10, is helping her grandad run a lighthouse when a storm hits. To describe a character in depth, collect clues of four kinds.',
predict:{q:'What tells you most about what a character is like?',opts:['Their hair and clothes','What they say, do and think'],ans:1},
task:'Sort all 6 clues',show:()=>{steps[0].go();auto(KINDS.map(k=>()=>sortKind(k[1])),380)},go:()=>{fresh();talk();T.after=complete(0,()=>T.won,'Clues sorted.')}},
{h:'Proof from the whole story',p:'A trait is what a character is like most of the time. To prove one, find clues from the beginning, the middle and the end.',
predict:{q:'Is one clue from one page enough to show a character is determined?',opts:['Yes, one clue proves it','No, look across the whole story'],ans:1},
task:'Find proof in all 3 parts',show:()=>{steps[1].go();auto(PARTS.map(([,S],p)=>()=>pickClue(p,S.findIndex(s=>s[1]))),480)},go:()=>{fresh();talk();T.after=complete(1,()=>T.won,'Trait proved.')}},
{h:'Setting through the senses',p:'The setting is where and when a story happens. Writers make you feel it with sense details. Together those details build a mood.',
predict:{q:'Which helps you picture a setting best?',opts:['Dates and facts about the place','Details you could see, hear, feel or smell'],ans:1},
task:'Find all 4 sense details, then the mood',show:()=>{steps[2].go();auto([...SENSES.map((s,i)=>s[1]?()=>tapSense(i):null).filter(Boolean),()=>pickMood(0)],420)},go:()=>{fresh();talk();T.after=complete(2,()=>T.won,'Setting described in depth.')}},
{h:'How an event changes things',p:'A key event sets off a chain. A character reacts, the reaction has a consequence, and by the end the character may have changed.',
task:'Put all 4 cards in the chain',show:()=>{steps[3].go();auto(CHAIN.map((x,k)=>()=>linkCard(k)),480)},go:()=>{fresh();talk();T.after=complete(3,()=>T.won,'Chain built.')}},
{h:'Deep or thin?',p:'A thin description names a trait or a place. A deep one adds exact details from the text that prove it.',
task:'Choose the stronger description 4 times',show:()=>{steps[4].go();auto(PAIRS.map(x=>()=>choose(x[2])),480)},go:()=>{fresh();talk();T.after=complete(4,()=>T.won,'You can tell deep from thin.')}},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(x=>{if(x.task)x.onPredict=()=>T.after()});
function quiz(){qn++;const [q,ans,bad]=BANK[qn%BANK.length],all=[[ans,'ok'],...bad],r=qn%3,ord=all.slice(r).concat(all.slice(0,r));
 quizEl.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=quizEl.querySelector('.fl-pick');ord.forEach(([w,tag])=>{c.el('button',{type:'button',class:'lbtn'},box,w).onclick=()=>judge(tag,ans)});voice('Challenge: '+q);A.redraw()}
function judge(tag,ans){quizEl.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quizEl.querySelector('.fl-fb'),yes=tag==='ok';let m=WHY[tag]||'Ask: which exact words in the text prove it?';
 if(tag==='looks')m=`Looks are not character. ${WHY.looks}`;
 if(tag==='one')m=`One clue might be a one-off. Check the beginning, middle and end.`;
 if(tag==='fact')m=`A fact or date does not show a person or a place in depth. ${WHY.fact}`;
 if(yes){row++;A.win()}else{row=0;A.sound.miss()}fb.innerHTML=`${yes?'✓ Yes: '+ans+'. In a row: '+row+'.':'✗ '+m} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
FK.shell(c,{steps,ratio:.72,tall:1.75,draw,onStep:B=>{quizEl.hidden=B.step!==5;panel.hidden=B.step===5;keys()},
 init:B=>{A=B;X=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);panel=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Character and setting lab buttons'},w);quizEl=c.el('div',{class:'fl-chal'},A.below);A.gest({down,move,up})}}).start()})})();
