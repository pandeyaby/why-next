/* Flagship – answering why questions with because (English, Speaking & Listening, ages 4-5; Development Matters 2021
   ages 3-4 'understand why questions' and Reception 'connect one idea or action to another'; EYFS ELG Speaking 'offer
   explanations for why things might happen'). Hear that why wants a reason (where and what answers are refused), drag
   the real cause into a because gap, sort real reasons from 'because it is', put the reason after because the right
   way round (the backwards sentence is shown as silly), and tap picture clues to say why something might have
   happened. Data and drawings: because_art.js. */
(()=>{const B=BEC;
VIS.reg('flagbecause',c=>{let A,dock,chal,qi=-1,ticket=0,grab=null;const W={};c.fig.classList.add('young');
const PHASE=['ask','cause','sort','round','clue','chal'],phase=()=>PHASE[A.step];
const inside=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
let HIT=[],GAP=null,BINS=[];
function grid(n,top,cols,maxH){const sp=10,w=(A.W-16-sp*(cols-1))/cols,rows=Math.ceil(n/cols),h=Math.max(56,Math.min((A.H-top-8)/rows-sp,maxH));
 return Array.from({length:n},(_,i)=>({i,x:8+(i%cols)*(w+sp),y:top+Math.floor(i/cols)*(h+sp),w,h}))}
function tell(text,wrong){W.msg=text;W.wrong=!!wrong;c.say(text);A.cv.setAttribute('aria-label',text);A.redraw();buttons();W.check()}
const tone=ok=>ok?'ok':W.wrong?'no':'';
/* ---- 1. a why question wants a reason ---- */
function answerAsk(j){const s=W.ak;if(s.n>=B.ASK.length)return;const [t,k]=B.ASK[s.n].a[j];
 if(k!=='why'){s.bad=j;A.sound.miss();return tell(`"${t}". ${B.KIND_SAY[k]}`,true)}
 s.bad=-1;s.n++;A.sound.pop();tell(`Yes! "${t}" gives a reason.`,false)}
function paintAsk(){const s=W.ak,fin=s.n>=B.ASK.length,R=B.ASK[Math.min(s.n,B.ASK.length-1)],g=A.ctx;
 const y0=B.head(A,fin?B.DONE[0]:`Which answer tells WHY? (${s.n+1} of 3)`,tone(fin),W.msg,W.wrong);
 const ph=Math.min(110,(A.H-y0)*.26);B.emo(g,R.e,8+ph*.55,y0+ph*.55,ph*.7);B.emo(g,R.s,8+ph*1.25,y0+ph*.3,ph*.36);
 const bx=8+ph*1.6;B.bubble(g,{x:bx,y:y0+6,w:A.W-bx-10,h:ph*.72},R.q,A.col.dark);
 if(fin){HIT=[];return}HIT=grid(3,y0+ph+20,1,76);HIT.forEach(r=>B.card(g,r,R.a[r.i][0],{no:s.bad===r.i,n:18}))}
/* ---- 2. what made it happen? ---- */
function giveCause(j){const s=W.cz;if(s.n>=B.CAUSE.length)return;const R=B.CAUSE[s.n];
 if(j!==R.ok){s.bad=j;A.sound.miss();return tell(R.no[j],true)}
 s.done.push(`${R.fx} because ${R.c[j][0]}.`);s.bad=-1;s.n++;A.sound.pop();tell(`${R.fx} because ${R.c[j][0]}.`,false)}
function paintCause(){const s=W.cz,fin=s.n>=B.CAUSE.length,g=A.ctx,y0=B.head(A,fin?B.DONE[1]:`What made it happen? Drag it into the gap. (${s.n+1} of 4)`,tone(fin),W.msg,W.wrong);
 if(fin){HIT=[];GAP=null;s.done.forEach((t,i)=>B.strip(g,{x:8,y:y0+8+i*64,w:A.W-16,h:56},t.replace(/ because .*/,''),t.replace(/^.* because /,'').replace(/\.$/,''),{ok:1,dark:A.col.dark}));return}
 const R=B.CAUSE[s.n],eh=Math.min(90,(A.H-y0)*.2);B.emo(g,R.e,A.W/2,y0+eh*.55,eh*.8);
 GAP={x:8,y:y0+eh+10,w:A.W-16,h:Math.max(60,eh*.8)};B.strip(g,GAP,R.fx,grab?'':'',{dark:A.col.dark,no:s.bad>=0});
 HIT=grid(3,GAP.y+GAP.h+18,3,130);HIT.forEach(r=>{if(grab&&grab.i===r.i){B.card(g,r,'',{sel:1});return}B.card(g,r,R.c[r.i][0],{pic:R.c[r.i][1],no:s.bad===r.i,n:16})});
 if(grab){const C=R.c[grab.i];B.card(g,{x:grab.x-60,y:grab.y-45,w:120,h:90},C[0],{pic:C[1],sel:1,n:15})}}
/* ---- 3. real reason or not? ---- */
function sortOne(i,bin){const s=W.st;if(s.put[i]!=null)return;const X=B.SORT[i],want=X.r?0:1;
 if(bin!==want){s.bad=i;A.sound.miss();return tell(`"${X.t}": ${X.r?B.SORT_WHY[0]+' This one does.':B.SORT_WHY[1].replace('"Because it is"',`"${X.t}"`)}`,true)}
 s.put[i]=bin;s.bad=-1;s.k++;A.sound.pop();tell(X.r?`"${X.t}" says what made it wet. A real reason.`:`"${X.t}" does not say what made it wet. Not a reason.`,false)}
function paintSort(){const s=W.st,fin=s.k>=B.SORT.length,g=A.ctx,y0=B.head(A,fin?B.DONE[2]:`${B.SORTQ} Real reason or not? ${s.k} of 6.`,tone(fin),W.msg,W.wrong);
 const bh=Math.min(150,(A.H-y0)*.34),bw=(A.W-26)/2;BINS=[0,1].map(b=>{const r={i:b,x:8+b*(bw+10),y:y0+6,w:bw,h:bh};
  g.fillStyle=b?(A.col.dark?'#3f1d1d':'#fef2f2'):(A.col.dark?'#0f2e1f':'#f0fdf4');B.round(g,r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=b?'#b91c1c':'#047857';g.lineWidth=3;g.stroke();
  g.font=`800 ${A.narrow?16:18}px system-ui,sans-serif`;g.fillStyle=A.col.dark?B.DARK_INK:B.INK;g.textAlign='center';g.textBaseline='top';g.fillText(b?'\u2717 Not a reason':'\u2713 Real reason',r.x+r.w/2,r.y+8);
  B.SORT.forEach((X,i)=>{if(s.put[i]===b){const n=B.SORT.filter((_,k)=>s.put[k]===b&&k<i).length;B.emo(g,X.e,r.x+24+(n%3)*((r.w-40)/3),r.y+52+Math.floor(n/3)*40,30)}});return r});
 const left=B.SORT.map((_,i)=>i).filter(i=>s.put[i]==null);HIT=grid(left.length||1,y0+bh+18,2,74).slice(0,left.length).map((r,k)=>Object.assign(r,{i:left[k]}));
 HIT.forEach(r=>{if(grab&&grab.i===r.i)return B.card(g,r,'',{sel:1});const X=B.SORT[r.i];B.card(g,r,X.t,{sel:s.pick===r.i,no:s.bad===r.i,n:16})});
 if(grab){const X=B.SORT[grab.i];B.card(g,{x:grab.x-80,y:grab.y-34,w:160,h:68},X.t,{sel:1,n:15})}}
/* ---- 4. the right way round ---- */
function pickReason(j){const s=W.rd;if(s.n>=B.ROUND.length)return;const R=B.ROUND[s.n],halves=s.n%2?[R.cz,R.fx]:[R.fx,R.cz],isReason=halves[j]===R.cz;
 if(!isReason){s.bad=j;s.flip=true;A.sound.miss();return tell(R.silly,true)}
 s.bad=-1;s.flip=false;s.made.push(`${R.fx} because ${R.cz}.`);s.n++;A.sound.pop();tell(`${R.fx} because ${R.cz}. First ${R.cz}, then ${R.fx.toLowerCase()}.`,false)}
function paintRound(){const s=W.rd,fin=s.n>=B.ROUND.length,g=A.ctx,y0=B.head(A,fin?B.DONE[3]:`Tap the REASON. It goes after because. (${s.n+1} of 4)`,tone(fin),W.msg,W.wrong);
 if(fin){HIT=[];s.made.forEach((t,i)=>B.strip(g,{x:8,y:y0+8+i*62,w:A.W-16,h:54},t.split(' because ')[0],t.split(' because ')[1].replace(/\.$/,''),{ok:1,dark:A.col.dark}));return}
 const R=B.ROUND[s.n],halves=s.n%2?[R.cz,R.fx]:[R.fx,R.cz],ph=Math.min(80,(A.H-y0)*.18),mid=y0+ph*.6;
 B.emo(g,R.e[0],A.W*.25,mid,ph*.75);B.arrow(g,A.W*.25+ph*.5,mid,A.W*.75-ph*.5,A.col.dark);B.emo(g,R.e[1],A.W*.75,mid,ph*.75);
 g.font='700 15px system-ui,sans-serif';g.fillStyle=A.col.dark?B.DARK_INK:B.INK;g.textAlign='center';g.fillText('first',A.W*.25,mid+ph*.6);g.fillText('then',A.W*.75,mid+ph*.6);
 const sy=y0+ph*1.35;B.strip(g,{x:8,y:sy,w:A.W-16,h:56},s.flip?R.cz.charAt(0).toUpperCase()+R.cz.slice(1):R.fx,s.flip?R.fx.toLowerCase():'',{dark:A.col.dark,no:s.flip});
 HIT=grid(2,sy+74,A.narrow?1:2,84);HIT.forEach(r=>B.card(g,r,halves[r.i],{no:s.bad===r.i,n:19}))}
/* ---- 5. clue detective ---- */
function tapClue(j){const s=W.cl;if(s.n>=B.CLUE.length)return;const R=B.CLUE[s.n],S=R.spots[j];
 if(!S[2]){s.bad=j;A.sound.miss();return tell(`${S[1]}? That does not tell us why. ${R.no}`,true)}
 s.bad=-1;s.n++;A.sound.pop();tell(R.a,false)}
function paintClue(){const s=W.cl,fin=s.n>=B.CLUE.length,g=A.ctx,R=B.CLUE[Math.min(s.n,B.CLUE.length-1)],y0=B.head(A,fin?B.DONE[4]:`${R.q} Tap the clue. (${s.n+1} of 3)`,tone(fin),W.msg,W.wrong);
 const sh=Math.min(130,(A.H-y0)*.3);g.fillStyle=A.col.dark?'#14281d':'#ecfccb';B.round(g,8,y0+4,A.W-16,sh,14);g.fill();B.emo(g,fin?'\u{1F575}\uFE0F':R.e,A.W/2,y0+4+sh/2,sh*.6);
 if(fin){HIT=[];return}HIT=grid(4,y0+sh+16,2,110);HIT.forEach(r=>{const S=R.spots[r.i];B.card(g,r,S[1],{pic:S[0],no:s.bad===r.i,n:15})})}
/* ---- wiring ---- */
const PAINT={ask:paintAsk,cause:paintCause,sort:paintSort,round:paintRound,clue:paintClue};
const TAPS={ask:answerAsk,cause:giveCause,round:pickReason,clue:tapClue};
function draw(){const g=A.ctx;g.fillStyle=A.col.dark?'#111827':'#fafaf9';g.fillRect(0,0,A.W,A.H);const k=phase();
 if(k==='chal'){const y0=B.head(A,'Challenge: why and because','ok');B.emo(g,'\u2753',A.W*.35,y0+70,70);B.emo(g,'\u{1F4AC}',A.W*.65,y0+70,70);return}
 PAINT[k]();A.fx.draw(g)}
function down(p){const k=phase(),r=HIT.find(q=>inside(p,q));if(!r)return false;
 if(k==='cause'||k==='sort'){grab={i:r.i,x:p.x,y:p.y,sx:p.x,sy:p.y};A.redraw();return true}
 TAPS[k](r.i);return false}
function move(p){if(grab){grab.x=p.x;grab.y=p.y;A.redraw()}}
function up(p){if(!grab)return;const h=grab;grab=null;const k=phase(),tap=Math.hypot(p.x-h.sx,p.y-h.sy)<10;
 if(k==='cause'){if(tap||inside(p,GAP))giveCause(h.i);else A.redraw();return}
 if(k==='sort'){const b=BINS.find(q=>inside(p,q));if(b)sortOne(h.i,b.i);else if(tap){W.st.pick=h.i;tell(`"${B.SORT[h.i].t}". Now tap a box, or the buttons below.`,false)}else A.redraw()}}
function tapBin(p){if(phase()!=='sort'||W.st.pick==null)return;const b=BINS.find(q=>inside(p,q));if(b){const i=W.st.pick;W.st.pick=null;sortOne(i,b.i)}}
function reset(){ticket++;grab=null;for(const k in W)delete W[k];Object.assign(W,{ak:{n:0,bad:-1},cz:{n:0,bad:-1,done:[]},st:{put:{},k:0,bad:-1,pick:null},rd:{n:0,bad:-1,flip:false,made:[]},cl:{n:0,bad:-1},msg:null,wrong:false,check:()=>{}})}
function enter(i,met){reset();c.say(B.DESC[i]);A.cv.setAttribute('aria-label',B.DESC[i]);W.check=()=>{if(A.step===i&&met()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(B.DONE[i]+A.reveal(i))};buttons();A.redraw()}
function play(i,list){steps[i].go();const t=ticket;let at=0;list.forEach(([ms,f])=>{at+=ms;setTimeout(()=>{if(t===ticket)f()},at)})}
function buttons(){if(!dock)return;dock.innerHTML='';const k=phase(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},dock,t).onclick=f};
 if(k==='ask'&&W.ak.n<B.ASK.length){const R=B.ASK[W.ak.n];R.a.forEach(([t],j)=>add(t,()=>answerAsk(j),`Answer: ${t}`))}
 if(k==='cause'&&W.cz.n<B.CAUSE.length){const R=B.CAUSE[W.cz.n];R.c.forEach(([t],j)=>add(`because ${t}`,()=>giveCause(j),`${R.fx} because ${t}`))}
 if(k==='sort')B.SORT.forEach((X,i)=>{if(W.st.put[i]==null){add(`\u2713 ${X.t}`,()=>sortOne(i,0),`${X.t}: real reason`);add(`\u2717 ${X.t}`,()=>sortOne(i,1),`${X.t}: not a reason`)}});
 if(k==='round'&&W.rd.n<B.ROUND.length){const R=B.ROUND[W.rd.n],h=W.rd.n%2?[R.cz,R.fx]:[R.fx,R.cz];h.forEach((t,j)=>add(t,()=>pickReason(j),`The reason is: ${t}`))}
 if(k==='clue'&&W.cl.n<B.CLUE.length)B.CLUE[W.cl.n].spots.forEach((S,j)=>add(S[1],()=>tapClue(j),`Clue: ${S[1]}`))}
const steps=[
{h:'Why wants a reason',p:B.TXT[0],predict:{q:'A why question asks you for...',opts:['A place, like "in the garden"','A reason, starting with because'],ans:1},task:'Answer 3 why questions',
 show:()=>play(0,B.ASK.map(R=>[600,()=>answerAsk(R.a.findIndex(x=>x[1]==='why'))])),go:()=>enter(0,()=>W.ak.n>=B.ASK.length)},
{h:'What made it happen?',p:B.TXT[1],predict:{q:'Why did the ice cream melt?',opts:['Because it was yummy','Because the sun was hot'],ans:1},task:'Drag the reason into the gap 4 times',
 show:()=>play(1,B.CAUSE.map(R=>[600,()=>giveCause(R.ok)])),go:()=>enter(1,()=>W.cz.n>=B.CAUSE.length)},
{h:'Real reason or not?',p:B.TXT[2],predict:{q:'Ben says the floor is wet "because it is". Is that a reason?',opts:['Yes, it has because in it','No, it does not say what made it wet'],ans:1},task:'Sort all 6 answers',
 show:()=>play(2,B.SORT.map((X,i)=>[450,()=>sortOne(i,X.r?0:1)])),go:()=>enter(2,()=>W.st.k>=B.SORT.length)},
{h:'The right way round',p:B.TXT[3],task:'Put the reason after because 4 times',
 show:()=>play(3,B.ROUND.map((R,n)=>[600,()=>pickReason(n%2?0:1)])),go:()=>enter(3,()=>W.rd.n>=B.ROUND.length)},
{h:'Clue detective',p:B.TXT[4],task:'Find the clue in 3 pictures',
 show:()=>play(4,B.CLUE.map(R=>[650,()=>tapClue(R.spots.findIndex(S=>S[2]))])),go:()=>enter(4,()=>W.cl.n>=B.CLUE.length)},
{h:'Challenge',p:'',go:()=>{reset();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W.check()});
function slip(tag){let m='A why question wants a reason. Say because, then what made it happen.';
 switch(tag){case 'where':m='That tells WHERE, not why. A why answer gives a reason and starts with because.';break;
  case 'what':m='That names a thing or a word, not a reason. A why answer starts with because and says what made it happen.';break;
  case 'non':m='Having the word because is not enough. A real reason says what MADE it happen.';break;
  case 'flip':m='That is the wrong way round. The reason happens first, and it goes after because.';break;
  case 'fit':m='That does not make it happen. Think what really caused it, like heat, rain or mud.';break}
 return m}
function ask(){qi++;const Q=B.QS[qi%B.QS.length],all=[[Q.a,'ok'],...Q.o],k=(qi*2)%3,ord=all.slice(k).concat(all.slice(0,k));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},chal.querySelector('.fl-pick'),v).onclick=()=>judge(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function judge(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),ok=t==='ok';ok?A.win():A.sound.miss();
 fb.innerHTML=(ok?`\u2713 Yes: ${a}`:'\u2717 '+slip(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(ok?'Yes.':slip(t))}
FK.shell(c,{steps,ratio:.74,tall:1.55,draw,onStep:X=>{chal.hidden=X.step!==5;dock.hidden=X.step===5;buttons()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);dock=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Why and because lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);reset();
  A.gest({down:p=>{if(phase()==='sort'&&W.st.pick!=null&&BINS.some(q=>inside(p,q))){tapBin(p);return false}return down(p)},move,up});buttons()}}).start()})})();
