/* Flagship – hearing rhyme in songs (ages 2–3; EYFS Development Matters 2021 Communication and Language, birth to three:
   enjoy singing, music and toys that make sounds; sing songs and say rhymes. Letters and Sounds Phase 1, Aspect 5
   rhythm and rhyme; spotting and suggesting rhymes comes later, at 3–4). Scenes: a frog hops along Twinkle, twinkle and the child claps on the rhyming words; fill the
   paused gap with the picture that sounds the same at the end; same at the end or not; tap the rhyming pair in a song;
   a song box where rhyming words light up. Song data in learn/songrhyme_art.js. */
(()=>{const {FROG,BREAK,GAPS,TRAYS,PAIRS,FIND,BOX,DESC,DONE,QS}=SRY;
VIS.reg('flagsongrhyme',c=>{let A,ctl,quiz,qi=-1,gen=0;const st={};c.fig.classList.add('young');
const INK='#0f172a',YES='#047857',NO='#b91c1c',RIM='#64748b',HOT='#7c3aed',GOLD='#b45309',FONT='px system-ui,sans-serif';
const scene=()=>['frog','gap','same','find','box','quiz'][A.step];
const fz=n=>Math.round(A.narrow?n:n*1.2);
const hit=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
const cap=t=>t[0].toUpperCase()+t.slice(1);
const box=(cx,cy,w,h)=>({x:cx-w/2,y:cy-h/2,w,h});
/* background: a soft music-room wash that keeps the white cards readable in both themes */
function wash(){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,'#e0f2fe',A.col.dark?.08:.55);g.fillRect(0,0,A.W,A.H)}
function word(t,x,y,n,col,w,max){const g=A.ctx;let k=fz(n);g.font=`${w||800} ${k}${FONT}`;while(max&&k>9&&g.measureText(t).width>max){k--;g.font=`${w||800} ${k}${FONT}`}g.fillStyle=col||INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,x,y)}
/* a rounded card; state colours: ok green, no red, on violet, lit gold */
function card(b,s){s=s||{};const g=A.ctx;g.fillStyle=s.no?'#fee2e2':s.ok?'#d1fae5':s.lit?'#fef3c7':'#ffffff';A.paint.rrect(b.x,b.y,b.w,b.h,Math.min(16,b.h/3));g.fill();
 g.lineWidth=s.no||s.ok||s.on||s.lit?4:2;g.strokeStyle=s.no?NO:s.ok?YES:s.on?HOT:s.lit?GOLD:RIM;g.stroke()}
/* the banner along the top: one short line telling the child what to do, or that they have done it */
function banner(t,ok){const g=A.ctx;let n=fz(14);g.font=`800 ${n}${FONT}`;let w=g.measureText(t).width+28;while(w>A.W-12&&n>10){n--;g.font=`800 ${n}${FONT}`;w=g.measureText(t).width+28}
 const h=n+18,x=(A.W-w)/2,y=A.H*.06-h/2;card({x,y,w,h},{ok});g.fillStyle=INK;g.textAlign='center';g.textBaseline='middle';g.fillText(t,A.W/2,y+h/2+1)}
/* lay song words out in rows that fit the width; returns a box per word */
function flow(words,y0,n,rowH){const g=A.ctx;g.font=`800 ${fz(n)}${FONT}`;const out=[];let row=[],w=0,y=y0;const gap=8,max=A.W-20;
 const flush=()=>{let x=(A.W-(w-gap))/2;row.forEach(r=>{r.b.x=x;r.b.y=y;x+=r.b.w+gap});row=[];w=0;y+=rowH+8};
 words.forEach((t,i)=>{const bw=Math.max(44,g.measureText(t).width+20);if(w+bw>max&&row.length)flush();const r={i,b:{x:0,y:0,w:bw,h:rowH}};row.push(r);out.push(r);w+=bw+gap});flush();return{boxes:out.map(r=>r.b),bottom:y}}
/* ---------- 1. the frog song: hop on, clap on the rhyme ---------- */
const padsF=()=>{const w=Math.min(A.W*.42,190),h=Math.max(64,A.H*.16),y=A.H*.84;return{hop:box(A.W*.28,y,w,h),clap:box(A.W*.72,y,w,h)}};
function stones(){const n=A.narrow?15:17,L1=FROG.slice(0,BREAK).map(f=>f.e?f.w+' '+f.e:f.w),L2=FROG.slice(BREAK).map(f=>f.e?f.w+' '+f.e:f.w);
 const a=flow(L1,A.H*.17,n,A.H*.11),b=flow(L2,a.bottom+A.H*.05,n,A.H*.11);return a.boxes.concat(b.boxes)}
function drawFrog(){const s=st.f,S=stones(),P=padsF();wash();
 S.forEach((b,i)=>{const f=FROG[i];card(b,{lit:s.clapped.includes(i),no:s.bad===i,on:i===s.at});word(f.e?f.w+' '+f.e:f.w,b.x+b.w/2,b.y+b.h/2,A.narrow?15:17,INK)});
 if(s.at<FROG.length){const b=S[s.at];word('🐸',b.x+b.w/2,b.y-fz(14),26)}
 card(P.hop,{on:1});word('🐸 Hop',P.hop.x+P.hop.w/2,P.hop.y+P.hop.h/2,20,INK);card(P.clap,{lit:1});word('👏 Clap',P.clap.x+P.clap.w/2,P.clap.y+P.clap.h/2,20,INK);
 banner(s.at>=FROG.length?'Song done: you clapped on the rhyme!':'Hop along. Clap on the rhyming word.',s.at>=FROG.length)}
function hop(){const s=st.f;if(s.at>=FROG.length)return;const f=FROG[s.at];
 if(f.r){s.bad=s.at;A.sound.miss();return say(`Wait! “${f.w}” is a rhyming word. Clap on it!`)}
 s.at++;s.bad=-1;A.sound.tick();say(s.at<FROG.length?`Hop. Now on “${FROG[s.at].w}”.`:'Song done.')}
function clap(){const s=st.f;if(s.at>=FROG.length)return;const f=FROG[s.at];
 if(!f.r){s.bad=s.at;A.sound.miss();return say(`“${f.w}” is not the rhyme. Hop on, and clap at the end of the line.`)}
 s.clapped.push(s.at);s.at++;s.bad=-1;A.sound.pop();
 say(s.clapped.length>=2?'Clap! Star … are! They sound the same at the end.':'Clap on star! Now listen for a word that sounds like star.')}
/* ---------- 2. fill the gap ---------- */
const gapBox=()=>box(A.W/2,A.H*.5,Math.min(A.W*.46,200),A.H*.17);
function tray(){const n=3,gap=10,w=Math.min(150,(A.W-gap*(n+1))/n),h=Math.min(w,A.H*.22),x0=(A.W-(n*w+(n-1)*gap))/2;return[0,1,2].map(k=>({k,x:x0+k*(w+gap),y:A.H*.74,w,h}))}
const choices=r=>{const G=GAPS[r];return TRAYS[r].map(j=>j===0?{...G.ok,good:1}:G.no[j-1])};
function drawGap(){const s=st.g;wash();if(s.r>=GAPS.length){banner('3 songs sung!',1);word('🎵 clock · shoe · spoon 🎵',A.W/2,A.H*.45,18,A.col.tx);return}
 const G=GAPS[s.r];banner(`Song ${s.r+1} of 3: fill the gap`);word(G.a,A.W/2,A.H*.2,A.narrow?16:18,A.col.tx);word(G.b,A.W/2,A.H*.31,A.narrow?16:18,A.col.tx);
 const gb=gapBox();card(gb,{on:s.hot});word('?',gb.x+gb.w/2,gb.y+gb.h/2,34,HOT);
 tray().forEach(t=>{if(s.drag&&s.drag.k===t.k)return;const ch=choices(s.r)[t.k];card(t,{no:s.bad===t.k});word(ch.e,t.x+t.w/2,t.y+t.h*.42,32);word(ch.w,t.x+t.w/2,t.y+t.h*.82,15,INK,800,t.w-8)});
 if(s.drag){const t=tray()[s.drag.k],ch=choices(s.r)[s.drag.k],q=box(s.drag.x,s.drag.y,t.w,t.h);card(q,{on:1});word(ch.e,q.x+q.w/2,q.y+q.h*.42,32);word(ch.w,q.x+q.w/2,q.y+q.h*.82,15,INK)}}
function fill(k){const s=st.g;if(s.r>=GAPS.length)return;const G=GAPS[s.r],ch=choices(s.r)[k];s.drag=null;s.hot=0;
 if(!ch.good){s.bad=k;A.sound.miss();return say(ch.t==='meaning'?`“${cap(ch.w)}” could fit the song, but say it: ${G.end} … ${ch.w}. It does not sound the same at the end.`:`${cap(ch.w)} starts like ${G.end}, but the end sounds different. Try again.`)}
 s.r++;s.bad=-1;A.sound.pop();say(`${cap(G.end)} … ${ch.w}! Same at the end.`+(s.r<GAPS.length?' Next song.':' All 3 songs sung.'))}
/* ---------- 3. same at the end? ---------- */
const padsS=()=>{const w=Math.min(A.W*.44,210),h=Math.max(64,A.H*.16),y=A.H*.82;return{yes:box(A.W*.27,y,w,h),no:box(A.W*.73,y,w,h)}};
function drawSame(){const s=st.s,P=padsS();wash();if(s.r>=PAIRS.length){banner('5 pairs checked!',1);word('⭐🚗  ⛰️👧',A.W/2,A.H*.45,30);return}
 const Q=PAIRS[s.r],w=Math.min(A.W*.4,170),h=Math.min(w*.95,A.H*.36);banner(`Pair ${s.r+1} of 5: same at the end?`);
 [[Q.a,Q.ea,A.W*.28],[Q.b,Q.eb,A.W*.72]].forEach(([t,e,x])=>{const b=box(x,A.H*.4,w,h);card(b,{no:s.bad,ok:s.good});word(e,x,b.y+h*.42,40);word(t,x,b.y+h*.84,18,INK)});
 card(P.yes,{lit:1});word('👍 Same',P.yes.x+P.yes.w/2,P.yes.y+P.yes.h/2,19,INK);card(P.no,{on:1});word('👎 Not the same',P.no.x+P.no.w/2,P.no.y+P.no.h/2,A.narrow?16:18,INK,800,P.no.w-16)}
function judge(v){const s=st.s;if(s.r>=PAIRS.length)return;const Q=PAIRS[s.r];
 if(v!==Q.s){s.bad=1;A.sound.miss();
  return say(Q.s?`Say them slowly: ${Q.a} … ${Q.b}. The ends sound the same, so they rhyme.`:Q.t==='start'?`${cap(Q.a)} and ${Q.b} start the same, but listen to the end. They do not rhyme.`:Q.t==='close'?`${cap(Q.a)} and ${Q.b} sound close, but the very end is different. They do not rhyme.`:`A ${Q.a} and a ${Q.b} go together, but they do not sound the same at the end.`)}
 s.bad=0;s.r++;A.sound.pop();say((Q.s?`Yes: ${Q.a}, ${Q.b}. They rhyme.`:`Right: ${Q.a} and ${Q.b} do not rhyme.`)+(s.r>=PAIRS.length?' All 5 done.':''))}
/* ---------- 4. where is the rhyme? ---------- */
function chips(){const s=st.w,F=FIND[Math.min(s.r,FIND.length-1)],n=A.narrow?14:16;const a=flow(F.l[0],A.H*.2,n,A.H*.1),b=flow(F.l[1],a.bottom+A.H*.06,n,A.H*.1);
 return a.boxes.map((bx,i)=>({k:'0:'+i,b:bx,t:F.l[0][i]})).concat(b.boxes.map((bx,i)=>({k:'1:'+i,b:bx,t:F.l[1][i]})))}
function drawFind(){const s=st.w;wash();if(s.r>=FIND.length){banner('3 songs: rhymes found!',1);word('wall · fall   spout · out   wool · full',A.W/2,A.H*.45,A.narrow?14:17,A.col.tx,800,A.W-20);return}
 banner(`${FIND[s.r].n}: tap the 2 rhyming words`);chips().forEach(c0=>{card(c0.b,{lit:s.got.includes(c0.k),no:s.bad===c0.k});word(c0.t,c0.b.x+c0.b.w/2,c0.b.y+c0.b.h/2,A.narrow?14:16,INK)});
 word('Found '+s.got.length+' of 2',A.W/2,A.H*.86,16,A.col.tx)}
function pickWord(k){const s=st.w;if(s.r>=FIND.length||s.got.includes(k))return;const F=FIND[s.r],[ln,ix]=k.split(':').map(Number),t=F.l[ln][ix];
 if(!F.r.includes(k)){s.bad=k;A.sound.miss();return say(ix===0?`“${t}” is at the start of the line. Listen at the end of each line.`:`“${t}” is not at the end of the line. The rhyme is the last word.`)}
 s.got.push(k);s.bad='';A.sound.pop();if(s.got.length<2)return say(`“${t}”! Now find the word that sounds like it.`);
 const [p,q]=F.r.map(z=>{const [a,b]=z.split(':').map(Number);return F.l[a][b].replace(/[?,]/g,'')});s.r++;s.got=[];say(`${cap(p)} … ${q}! Both at the end of a line.`+(s.r>=FIND.length?' All 3 songs done.':''))}
/* ---------- 5. song box (free play) ---------- */
function songCards(){const n=BOX.length,gap=8,cols=A.narrow?3:5,w=(A.W-gap*(cols+1))/cols,h=A.H*.17;return BOX.map((_,i)=>({i,x:gap+(i%cols)*(w+gap),y:A.H*.12+Math.floor(i/cols)*(h+gap),w,h}))}
function drawBox(){const s=st.b,C=songCards();wash();C.forEach(b=>{card(b,{on:s.pick===b.i});word(BOX[b.i].e,b.x+b.w/2,b.y+b.h*.38,24);word(BOX[b.i].n,b.x+b.w/2,b.y+b.h*.78,A.narrow?12:14,INK,800,b.w-10)});
 const y0=C[C.length-1].y+C[0].h+A.H*.08;if(s.pick==null){word('Tap a song to sing.',A.W/2,y0+16,A.narrow?15:17,A.col.tx,800,A.W-24);word('Stop before the last word!',A.W/2,y0+46,A.narrow?15:17,A.col.tx,800,A.W-24);return}
 BOX[s.pick].l.forEach((line,j)=>{const parts=line.split(' '),end=parts.pop(),g=A.ctx;let n=A.narrow?14:17;g.font=`700 ${n}${FONT}`;while(g.measureText(line).width>A.W-30&&n>10){n--;g.font=`700 ${n}${FONT}`}
  const head=parts.join(' ')+' ',tw=g.measureText(head).width,ew=g.measureText(end.toLowerCase()).width,x=(A.W-tw-ew-8)/2,y=y0+j*(n+22);
  g.textAlign='left';g.textBaseline='middle';g.fillStyle=A.col.tx;g.fillText(head,x,y);card({x:x+tw+1,y:y-n*.85,w:ew+10,h:n*1.7},{lit:1});g.font=`900 ${n}${FONT}`;g.fillStyle=INK;g.fillText(end.toLowerCase(),x+tw+6,y)})}
function choose(i){st.b.pick=i;const L=BOX[i].l.map(l=>l.split(' ').pop().toLowerCase());A.sound.tick();say(`${BOX[i].n}: ${L[0]} and ${L[1]} sound the same at the end.`)}
/* ---------- canvas input ---------- */
function draw(){const k=scene();if(k==='quiz'){wash();banner('Challenge',1);word('🎵 Listen for the end of the word 🎵',A.W/2,A.H*.5,A.narrow?15:18,A.col.tx,800,A.W-20);return}
 ({frog:drawFrog,gap:drawGap,same:drawSame,find:drawFind,box:drawBox})[k]();A.fx.draw(A.ctx)}
function down(p){const k=scene();
 if(k==='frog'){const P=padsF();if(hit(p,P.hop))hop();else if(hit(p,P.clap))clap();return false}
 if(k==='gap'){if(st.g.r>=GAPS.length)return false;const t=tray().find(t=>hit(p,t));if(t){st.g.drag={k:t.k,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}return false}
 if(k==='same'){const P=padsS();if(hit(p,P.yes))judge(1);else if(hit(p,P.no))judge(0);return false}
 if(k==='find'){if(st.w.r>=FIND.length)return false;const c0=chips().find(c0=>hit(p,c0.b));if(c0)pickWord(c0.k);return false}
 if(k==='box'){const b=songCards().find(b=>hit(p,b));if(b)choose(b.i);return false}return false}
function move(p){const d=st.g.drag;if(!d)return;d.x=p.x;d.y=p.y;st.g.hot=hit(p,gapBox())?1:0;A.redraw()}
function up(p){const d=st.g.drag;if(!d)return;const tap=Math.hypot(p.x-d.x0,p.y-d.y0)<10;if(tap||hit(p,gapBox()))return fill(d.k);st.g.drag=null;st.g.hot=0;A.redraw()}
function reset(){gen++;for(const k in st)delete st[k];Object.assign(st,{f:{at:0,clapped:[],bad:-1},g:{r:0,bad:-1,drag:null,hot:0},s:{r:0,bad:0,good:0},w:{r:0,got:[],bad:''},b:{pick:null},check:()=>{}})}
function say(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();buttons();st.check()}
const ready=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function begin(i,ok){reset();say(DESC[i]);if(ok)st.check=ready(i,ok)}
function play(i,acts,ms){steps[i].go();const g0=gen;acts.forEach((f,j)=>setTimeout(()=>{if(g0===gen)f()},ms*(j+1)))}
/* button twins for every canvas action */
function buttons(){if(!ctl)return;ctl.innerHTML='';const k=scene(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='frog'&&st.f.at<FROG.length){B('🐸 Hop',hop,'Hop to the next word');B('👏 Clap',clap,'Clap on this word')}
 if(k==='gap'&&st.g.r<GAPS.length)choices(st.g.r).forEach((ch,j)=>B(`${ch.e} ${ch.w}`,()=>fill(j),`Fill the gap with ${ch.w}`));
 if(k==='same'&&st.s.r<PAIRS.length){B('👍 Same',()=>judge(1),'Same at the end');B('👎 Not the same',()=>judge(0),'Not the same at the end')}
 if(k==='find'&&st.w.r<FIND.length)chips().forEach(c0=>{if(!st.w.got.includes(c0.k))B(c0.t,()=>pickWord(c0.k),`Line ${+c0.k[0]+1}: ${c0.t}`)});
 if(k==='box')BOX.forEach((b,i)=>B(`${b.e} ${b.n}`,()=>choose(i)))}
const steps=[
{h:'Clap on the rhyme',p:'Sing Twinkle, twinkle together. Tap Hop for each word. When you get to a rhyming word, tap Clap instead.',
 predict:{q:'In Twinkle, twinkle, when do you clap?',opts:['On every word','On the words that sound the same at the end'],ans:1},task:'Sing the frog song',
 show:()=>play(0,[hop,hop,hop,clap,hop,hop,hop,hop,hop,clap],320),go:()=>begin(0,()=>st.f.at>=FROG.length)},
{h:'Fill the gap',p:'A grown-up sings the first line and stops. Drag the picture that sounds the same at the end into the gap, or just tap it.',
 predict:{q:'Hickory, dickory, dock. The mouse ran up the …',opts:['dog, because it starts like dock','clock'],ans:1},task:'Fill the gap in 3 songs',
 show:()=>play(1,GAPS.map((_,r)=>()=>fill(TRAYS[r].indexOf(0))),550),go:()=>begin(1,()=>st.g.r>=GAPS.length)},
{h:'Same at the end?',p:'Say the two words out loud. Do they sound the same at the end? Tap Same or Not the same.',
 predict:{q:'Do moon and milk sound the same at the end?',opts:['Yes, they both start with m','No'],ans:1},task:'Check 5 pairs',
 show:()=>play(2,PAIRS.map(q=>()=>judge(q.s)),420),go:()=>begin(2,()=>st.s.r>=PAIRS.length)},
{h:'Where is the rhyme?',p:'Sing the song. Tap the two words that sound the same at the end.',
 predict:{q:'In a song, where do the rhyming words often come?',opts:['At the start of a line','At the end of a line'],ans:1},task:'Find the rhyme in 3 songs',
 show:()=>play(3,FIND.flatMap(F=>F.r.map(k=>()=>pickWord(k))),380),go:()=>begin(3,()=>st.w.r>=FIND.length)},
{h:'Song box',p:'Pick a song to sing. Stop before the last word and let your child sing it. The rhyming words light up.',go:()=>begin(4)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.check()});
/* one message per slip; the right answer is never named before they try again */
function hint(t){let m='Say both words slowly and listen to the very end.';
 if(t==='meaning')m='That word fits the story, but it does not sound the same at the end. Rhyme is about sound.';
 if(t==='start')m='Those words start the same. A rhyme sounds the same at the END, like star and car.';
 if(t==='close')m='Close is not the same. Bed and bell end in different sounds, so they do not rhyme.';
 if(t==='place')m='In most songs the rhyming words come at the end of each line: star … are.';
 if(t==='every')m='Not every word rhymes. Wait for the word that sounds like the end of the last line.';
 return m}
function ask(){qi++;const Q=QS[qi%QS.length],all=[[Q.a,'ok'],...Q.o],r=qi%3,ord=all.slice(r).concat(all.slice(0,r));
 quiz.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=quiz.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function mark(t,a){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+hint(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':hint(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:X=>{quiz.hidden=X.step!==5;ctl.hidden=X.step===5;buttons()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Song rhyme lab buttons'},w);quiz=c.el('div',{class:'fl-chal'},A.below);reset();A.gest({down,move,up});buttons()}}).start()})})();
