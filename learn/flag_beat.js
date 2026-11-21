/* Flagship – hearing the beat in songs (ages 2–3; EYFS Development Matters 2021 C&L and EAD birth to three; Letters
   and Sounds Phase 1 Aspects 3 and 4). Scenes: tap the drum as the Duke marches on 8 lit hearts; keep with the beat as
   elephant steps turn into mouse steps; tap on the hearts and freeze on the stop signs; copy Teddy's 2 or 3 claps or
   stomps; free play with clap, stomp or pat knees, slow or fast. Song data in learn/beat_art.js. */
(()=>{const {DUKE,SPEED,FREEZE,COPY,BODY,PLAY,DESC,DONE,QS}=BEA;
VIS.reg('flagbeat',c=>{let A,pads,chal,cq=-1,run=0;const S={};c.fig.classList.add('young');
const INK='#0f172a',YES='#047857',OFF='#b45309',NO='#b91c1c',RING='#64748b',LIT='#f59e0b',FONT='px system-ui,sans-serif';
const now=()=>performance.now();
const room=()=>['tap','fast','stop','copy','play','chal'][A.step];
const em=n=>Math.round(A.narrow?n:n*1.18);
const on=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* a soft stage-coloured floor so the white discs and pads stay readable in both themes */
function floor(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#fce7f3',A.col.dark?.07:.5);g.fillRect(0,0,A.W,A.H)}
function say2(t,x,y,n,o){o=o||{};const g=A.ctx;let k=em(n);g.font=`${o.w||800} ${k}${FONT}`;while(o.fit&&k>9&&g.measureText(t).width>o.fit){k--;g.font=`${o.w||800} ${k}${FONT}`}
 g.fillStyle=o.col||INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y)}
function pad(r,f){f=f||{};const g=A.ctx;g.fillStyle=f.no?'#fee2e2':f.ok?'#d1fae5':f.off?'#fef3c7':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,Math.min(22,r.h/3));g.fill();
 g.lineWidth=f.no||f.ok||f.off||f.sel?5:2.5;g.strokeStyle=f.no?NO:f.ok?YES:f.off?OFF:f.sel?'#7c3aed':RING;g.stroke()}
function heading(t,good){const g=A.ctx;let k=em(15);g.font=`800 ${k}${FONT}`;let w=g.measureText(t).width+28;while(w>A.W-10&&k>10){k--;g.font=`800 ${k}${FONT}`;w=g.measureText(t).width+28}
 const r={x:(A.W-w)/2,y:A.H*.02,w,h:k+18};pad(r,{ok:good});say2(t,A.W/2,r.y+r.h/2+1,k/(A.narrow?1:1.18))}
/* ---------- the beat clock: per = list of gaps in ms, cycled ---------- */
function startClock(per,onBeat){const cum=[0];per.forEach((d,i)=>cum.push(cum[i]+d));const T=cum[per.length],e0=run;
 const K={per,cum,T,t0:now()+300,k:-1,at:k=>K.t0+Math.floor(k/per.length)*T+cum[((k%per.length)+per.length)%per.length]};S.clk=K;
 const step=()=>{if(e0!==run||!A.cv.isConnected)return;K.k++;onBeat&&onBeat(K.k);A.sound.tick();A.redraw();setTimeout(step,Math.max(0,K.at(K.k+1)-now()))};
 setTimeout(step,Math.max(0,K.at(0)-now()))}
/* nearest beat to this moment and how far off it is */
function nearest(){const K=S.clk;if(!K)return{k:-1,d:1e9};const a=K.k<0?1e9:Math.abs(now()-K.at(K.k)),b=Math.abs(K.at(K.k+1)-now());return a<=b?{k:K.k,d:a}:{k:K.k+1,d:b}}
const gapAt=k=>S.clk.per[((k%S.clk.per.length)+S.clk.per.length)%S.clk.per.length];
const windowAt=k=>Math.min(280,gapAt(k)*.45);
/* ---------- drawing the hearts ---------- */
function hearts(xs,y,lit,kinds,who){const g=A.ctx,mg=xs.length>1?Math.min(...xs.slice(1).map((x,i)=>x-xs[i])):99,R=Math.min(A.W/(Math.max(xs.length,6)*2.4),28,mg*.42);
 xs.forEach((x,i)=>{const stop=kinds&&kinds[i]===0,isLit=i===lit;g.beginPath();g.arc(x,y,isLit?R*1.25:R,0,7);g.fillStyle=stop?'#e5e7eb':isLit?'#fde68a':'#ffffff';g.fill();
  g.lineWidth=isLit?4:2;g.strokeStyle=isLit?LIT:RING;g.stroke();say2(stop?'🛑':'❤️',x,y+1,isLit?18:13)});
 if(lit>=0&&who)say2(who,xs[lit],y-R*2.4,30)}
const drum=()=>{const w=Math.min(A.W*.56,240),h=Math.max(96,A.H*.24);return{x:(A.W-w)/2,y:A.H*.72,w,h}};
function drawDrum(face){const r=drum(),f=S.flash||{};pad(r,{ok:f.ok&&now()-f.t<350,off:f.off&&now()-f.t<350});say2(face||'🥁',r.x+r.w/2,r.y+r.h*.42,36);say2('Tap!',r.x+r.w/2,r.y+r.h*.8,15)}
function blink(kind){S.flash={[kind]:1,t:now()};A.redraw();const e0=run;setTimeout(()=>{if(e0===run)A.redraw()},380)}
const spread=n=>Array.from({length:n},(_,i)=>A.W*(.08+.84*i/(n-1)));
/* ---------- 1. tap the beat ---------- */
function drawTap(){floor();const s=S.t,K=S.clk,lit=K&&K.k>=0?K.k%8:-1;heading(s.hits.length>=DUKE.need?'You tapped the beat!':'Tap the drum on each heart',s.hits.length>=DUKE.need);
 say2(DUKE.line,A.W/2,A.H*.16,13,{col:A.col.tx,fit:A.W-16,w:700});hearts(spread(8),A.H*.44,lit,null,'💂');
 say2(lit>=0?DUKE.beats[lit]:'',A.W/2,A.H*.58,16,{col:A.col.tx});say2('⭐'.repeat(Math.min(s.hits.length,DUKE.need))+'☆'.repeat(Math.max(0,DUKE.need-s.hits.length)),A.W/2,A.H*.66,18);drawDrum()}
/* ---------- 2. faster ---------- */
/* two rows: four elephant hearts spread wide, then six mouse hearts at half the spacing, because the gap is half as long */
function drawFast(){floor();const s=S.f,K=S.clk,i=K&&K.k>=0?K.k%SPEED.per.length:-1,good=s.slow.length>=SPEED.slow&&s.fast.length>=SPEED.fast,gap=A.W*.22;
 heading(good?'Slow, then fast. You kept up!':i>=4?'Faster now! Quick taps':'Big slow steps',good);
 const row1=[0,1,2,3].map(j=>A.W*.18+j*gap),row2=[0,1,2,3,4,5].map(j=>A.W*.18+j*gap/2);
 say2('🐘',A.W*.06,A.H*.3,20);say2('🐭',A.W*.06,A.H*.5,20);hearts(row1,A.H*.3,i<4?i:-1,null,'🐘');hearts(row2,A.H*.5,i>=4?i-4:-1,null,'🐭');
 say2(`🐘 ${Math.min(s.slow.length,2)} of 2   🐭 ${Math.min(s.fast.length,2)} of 2`,A.W/2,A.H*.63,15,{col:A.col.tx});drawDrum()}
/* ---------- 3. stop and freeze ---------- */
function drawStop(){floor();const s=S.s,K=S.clk,i=K&&K.k>=0?K.k%5:-1,quiet=i>=0&&FREEZE.pat[i]===0;
 heading(s.pass>=FREEZE.need?'You froze when it stopped!':quiet?'Shh… FREEZE!':'Tap on the hearts',s.pass>=FREEZE.need);
 say2(FREEZE.line,A.W/2,A.H*.16,13,{col:A.col.tx,fit:A.W-16,w:700});hearts(spread(5),A.H*.44,i,FREEZE.pat,quiet?'🧊':'💃');
 say2(`Froze ${Math.min(s.pass,2)} of 2`,A.W/2,A.H*.62,15,{col:A.col.tx});drawDrum(quiet?'🤫':'🥁')}
/* ---------- 4. copy my claps ---------- */
const copyPads=()=>{const w=Math.min(A.W*.42,200),h=Math.max(92,A.H*.22),y=A.H*.74;return[{k:'clap',x:A.W*.27-w/2,y,w,h},{k:'stomp',x:A.W*.73-w/2,y,w,h}]};
function drawCopy(){floor();const s=S.c;if(s.r>=COPY.length){heading('You copied Teddy 3 times!',1);say2('🧸 👍',A.W/2,A.H*.42,48);return}
 const R=COPY[s.r];heading(`Teddy’s turn, then yours (${s.r+1} of 3)`);say2('🧸',A.W*.16,A.H*.28,44);
 for(let j=0;j<R.n;j++)say2(BODY[R.k].e,A.W*(.38+j*.16),A.H*.28,j===s.lit?40:30);
 say2('🙂',A.W*.16,A.H*.52,40);for(let j=0;j<s.taps.length&&j<4;j++)say2(BODY[s.taps[j]].e,A.W*(.38+j*.16),A.H*.52,30);
 if(!s.taps.length)say2('Your turn',A.W*.56,A.H*.52,15,{col:A.col.tx});
 copyPads().forEach(r=>{pad(r,{no:s.bad===r.k});say2(BODY[r.k].e,r.x+r.w/2,r.y+r.h*.4,34);say2(BODY[r.k].t,r.x+r.w/2,r.y+r.h*.8,15)})}
/* ---------- 5. free play ---------- */
function drawPlay(){floor();const s=S.p,K=S.clk,lit=K&&K.k>=0?K.k%8:-1;heading(`${BODY[s.k].t}, ${s.sp==='slow'?'slow 🐘':'fast 🐭'}`);
 hearts(spread(8),A.H*.4,lit,null,'🕺');say2(`${s.n} taps on the beat`,A.W/2,A.H*.58,15,{col:A.col.tx});drawDrum(BODY[s.k].e)}
/* ---------- tapping ---------- */
function tap(){const k=room();if(!S.clk)return;const n=nearest(),hit=n.d<=windowAt(n.k);
 if(k==='tap'){const s=S.t;if(s.hits.length>=DUKE.need)return blink('ok');if(hit&&!s.hits.includes(n.k)){s.hits.push(n.k);blink('ok');A.sound.pop();return speak(`On the beat! ${s.hits.length} of ${DUKE.need}.`)}
  if(hit)return blink('ok');blink('off');return speak('Wait for the heart to light up, then tap.')}
 if(k==='fast'){const s=S.f,fastPart=((n.k%SPEED.per.length)+SPEED.per.length)%SPEED.per.length>=4;
  if(hit){const L=fastPart?s.fast:s.slow;if(!L.includes(n.k)){L.push(n.k);A.sound.pop()}blink('ok');return speak(fastPart?`Quick! 🐭 ${Math.min(s.fast.length,2)} of 2.`:`Stomp! 🐘 ${Math.min(s.slow.length,2)} of 2.`)}
  blink('off');return speak(fastPart?'Faster now! Quick little taps, like a mouse.':'Slow down. Wait for each big elephant step.')}
 if(k==='stop'){const s=S.s,j=((n.k%5)+5)%5,cyc=Math.floor(n.k/5),K=S.clk,cur=K.k>=0?K.k%5:-1;
  if(FREEZE.pat[j]===0||(cur>=0&&FREEZE.pat[cur]===0&&!hit)){s.spoil[cyc]=1;blink('off');A.sound.miss();return speak('Shh! The music stopped. Freeze!')}
  if(hit){s.tap[cyc]=1;blink('ok')}else blink('off');return}
 if(k==='play'){if(hit){S.p.n++;blink('ok')}else blink('off');A.redraw()}}
function onFreezeBeat(k){if(k%5!==4)return;const s=S.s,cyc=Math.floor(k/5),e0=run;
 setTimeout(()=>{if(e0!==run||s.pass>=FREEZE.need)return;if(s.tap[cyc]&&!s.spoil[cyc]){s.pass++;A.sound.pop();speak(`You froze! ${s.pass} of 2.`)}
  else if(!s.tap[cyc]&&!s.spoil[cyc])speak('Tap on the hearts, then freeze on the stop signs.')},FREEZE.P/2)}
function press(kind){const s=S.c;if(s.r>=COPY.length)return;const R=COPY[s.r];clearTimeout(s.quiet);
 if(kind!==R.k){s.bad=kind;s.taps=[];A.sound.miss();return speak(`Teddy did ${BODY[R.k].t.toLowerCase()}, not ${BODY[kind].t.toLowerCase()}. Try again.`)}
 s.bad='';s.taps.push(kind);A.sound.tick();A.redraw();buttons();const e0=run;s.quiet=setTimeout(()=>{if(e0===run)judgeCopy()},900)}
function judgeCopy(){const s=S.c;if(s.r>=COPY.length)return;const R=COPY[s.r],n=s.taps.length;clearTimeout(s.quiet);if(!n)return;
 if(n!==R.n){s.taps=[];A.sound.miss();return speak(n<R.n?`Teddy did ${R.n}. You did ${n}. One more! Count with me: ${[1,2,3].slice(0,R.n).join(', ')}.`:`Teddy did ${R.n}. You did ${n}. That is too many. Count with me: ${[1,2,3].slice(0,R.n).join(', ')}.`)}
 A.sound.pop();s.r++;s.taps=[];speak(s.r>=COPY.length?'You copied Teddy every time!':`Just like Teddy! Next one.`);if(s.r<COPY.length)teddy()}
function teddy(){const s=S.c,R=COPY[s.r],e0=run,ms=A.reduced()?0:420;for(let j=0;j<=R.n;j++)setTimeout(()=>{if(e0!==run)return;s.lit=j<R.n?j:-1;if(j<R.n)A.sound.tick();A.redraw()},ms*(j+1))}
/* ---------- input ---------- */
function draw(){const k=room();if(k==='chal'){floor();heading('Challenge',1);say2('Tap · faster · freeze · copy',A.W/2,A.H*.5,16,{col:A.col.tx,fit:A.W-20});return}
 ({tap:drawTap,fast:drawFast,stop:drawStop,copy:drawCopy,play:drawPlay})[k]();A.fx.draw(A.ctx)}
function down(p){const k=room();if(k==='copy'){const r=copyPads().find(r=>on(p,r));if(r)press(r.k);return false}
 if(k!=='chal'&&on(p,drum()))tap();return false}
function wipe(){run++;for(const k in S)delete S[k];Object.assign(S,{t:{hits:[]},f:{slow:[],fast:[]},s:{pass:0,tap:{},spoil:{}},c:{r:0,taps:[],bad:'',lit:-1},p:{k:'clap',sp:'slow',n:0},clk:null,flash:null,check:()=>{}})}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();S.check()}
const ready=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function begin(i,ok,clockArgs){wipe();if(clockArgs)startClock(...clockArgs);speak(DESC[i]);if(ok)S.check=ready(i,ok);buttons()}
/* demo taps land exactly on chosen beats of the fresh clock */
function onBeats(i,ks){steps[i].go();const e0=run;ks.forEach(k=>setTimeout(()=>{if(e0===run)tap()},Math.max(0,S.clk.at(k)-now()+5)))}
function playClock(){const s=S.p,n=s.n,k=s.k,sp=s.sp;run++;S.p={k,sp,n};startClock([PLAY[sp]])}
/* labelled buttons for every canvas action */
function buttons(){if(!pads)return;pads.innerHTML='';const k=room(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},pads,t).onclick=f};
 if(['tap','fast','stop'].includes(k))add('🥁 Tap the drum',tap);
 if(k==='copy'&&S.c.r<COPY.length){add('👏 Clap',()=>press('clap'));add('🦶 Stomp',()=>press('stomp'))}
 if(k==='play'){add(`${BODY[S.p.k].e} Tap`,tap,'Tap on the beat');Object.keys(BODY).forEach(b=>add(BODY[b].e+' '+BODY[b].t,()=>{S.p.k=b;A.sound.tick();speak(BODY[b].t+' along.');buttons()}));
  add('🐘 Slow',()=>{S.p.sp='slow';playClock();speak('Slow beat.');buttons()});add('🐭 Fast',()=>{S.p.sp='fast';playClock();speak('Fast beat.');buttons()})}}
const steps=[
{h:'Tap the beat',p:'A song has a beat. Tap the drum each time a heart lights up.',
 predict:{q:'Is the beat of a song like…',opts:['Rain: pitter-patter, all mixed up','A clock: tick, tick, tick'],ans:1},task:'Tap on 4 hearts',
 show:()=>onBeats(0,[0,1,2,3]),go:()=>begin(0,()=>S.t.hits.length>=DUKE.need,[[DUKE.P]])},
{h:'Faster!',p:'First big slow elephant steps. Then quick mouse steps. Tap the drum on each heart.',
 predict:{q:'The beat gets faster. What do your taps do?',opts:['Stay slow','Get faster too'],ans:1},task:'Tap 2 slow and 2 fast',
 show:()=>onBeats(1,[0,1,4,5]),go:()=>begin(1,()=>S.f.slow.length>=SPEED.slow&&S.f.fast.length>=SPEED.fast,[SPEED.per])},
{h:'Stop and freeze',p:'Tap on the hearts. When you see the stop signs, the music stops. Freeze!',
 predict:{q:'The music stops. What do you do?',opts:['Keep tapping','Stop and freeze'],ans:1},task:'Freeze 2 times',
 show:()=>onBeats(2,[0,1,2,5,6,7]),go:()=>begin(2,()=>S.s.pass>=FREEZE.need,[FREEZE.pat.map(()=>FREEZE.P),onFreezeBeat])},
{h:'Copy my claps',p:'Watch Teddy. Then do the same: clap or stomp, the same number of times.',task:'Copy Teddy 3 times',
 show:()=>{steps[3].go();const e0=run;let t=0;COPY.forEach(R=>{for(let j=0;j<R.n;j++){t+=220;setTimeout(()=>{if(e0===run)press(R.k)},t)}t+=220;setTimeout(()=>{if(e0===run)judgeCopy()},t);t+=200})},
 go:()=>{begin(3,()=>S.c.r>=COPY.length);teddy()}},
{h:'Play along',p:'Pick clap, stomp or pat your knees. Pick slow or fast. Tap along with the hearts.',go:()=>begin(4,null,[[PLAY.slow]])},
{h:'Challenge',p:'',go:()=>{wipe();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.check()});
/* each wrong answer names the slip */
function tellWhy(t){let m='Listen again, and tap with the beat.';
 if(t==='stop')m='When the music stops, we stop too. Freeze!';
 if(t==='count')m='Copy the same number. Count Teddy’s claps: 1, 2.';
 if(t==='speed')m='Big slow animals make a slow beat. Small quick animals make a fast beat.';
 if(t==='steady')m='A beat is steady, like a clock: the same gap every time.';
 return m}
function ask(){cq++;const Q=QS[cq%QS.length],L=[[Q.a,'ok'],...Q.o],r=cq%3,list=L.slice(r).concat(L.slice(0,r));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');list.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},box,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+tellWhy(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':tellWhy(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:X=>{chal.hidden=X.step!==5;pads.hidden=X.step===5;buttons()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);pads=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Beat lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);wipe();A.gest({down});buttons()}}).start()})})();
