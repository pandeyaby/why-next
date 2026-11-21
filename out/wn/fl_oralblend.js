/* Flagship – oral blending (ages 3–4; Letters and Sounds Phase One, Aspect 7; Development Matters 2021). No letters to
   read: Robot says a word in parts and the child pushes the parts together in their head. Scenes go from big parts to
   small ones: slide two words together until they touch (rain + bow), match a word clapped in beats, give Robot the toy
   it says in sound talk, tap one sound on head, tummy and toes and clap to blend, then play I spy in robot talk.
   Every drag or tap on the canvas has a labelled button twin. Data in learn/oralblend_art.js. */
(()=>{const {JOIN,BEAT,TALK,BODY,PARTS,ROOM,SPY,DESC,DONE,QS}=OBL;
VIS.reg('flagoralblend',c=>{let A,ctl,chal,qn=-1,tok=0;c.fig.classList.add('young');
const T={ink:'#1f2937',ok:'#047857',bad:'#b91c1c',edge:'#94a3b8',hot:'#6d28d9',sky:'#e0f2fe',sun:'#fef3c7',leaf:'#dcfce7',rose:'#ffe4e6',lilac:'#ede9fe'};
const st={};const kind=()=>['join','beat','talk','body','spy','quiz'][A.step];
const sz=n=>Math.round(A.narrow?n:n*1.15);
const R=(x,y,w,h)=>({x,y,w,h}),inR=(p,r)=>r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
/* text that shrinks until it fits its width */
function say2(s,x,y,n,o){o=o||{};const g=A.ctx;let k=sz(n);do{g.font=`${o.w||800} ${k}px system-ui,"Noto Color Emoji",sans-serif`;k--}while(o.fit&&k>8&&g.measureText(s).width>o.fit);
 g.fillStyle=o.c||T.ink;g.textAlign='center';g.textBaseline='middle';g.fillText(s,x,y)}
/* a rounded tile; mood carries ✓ or ✗ in its words as well as its colour */
function tile(r,fill,mood,rad){const g=A.ctx,line={ok:T.ok,bad:T.bad,hot:T.hot}[mood]||T.edge;g.fillStyle=mood==='ok'?'#d1fae5':mood==='bad'?'#fee2e2':fill||'#ffffff';
 A.paint.rrect(r.x,r.y,r.w,r.h,rad||Math.min(18,r.h/3));g.fill();g.lineWidth=mood?4:2;g.strokeStyle=line;g.stroke()}
function ground(t){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,t,A.col.dark?.14:.45);g.fillRect(0,0,A.W,A.H)}
/* Robot and its speech bubble: each part of the word is a bead; gap says how far apart Robot says them */
function robot(parts,gap,head){const g=A.ctx,b=R(A.W*.2,8,A.W*.77,A.H*.15);say2('🤖',A.W*.1,b.y+b.h/2,40);tile(b,'#ffffff','',16);
 if(head)say2(head,b.x+b.w/2,b.y+b.h*.27,11,{w:700,c:'#475569',fit:b.w-12});
 const n=parts.length,space=gap==null?10:6+gap*A.W*.12,bw=Math.min(sz(70),(b.w-24-space*(n-1))/n),tot=n*bw+(n-1)*space;let x=b.x+(b.w-tot)/2;const y=b.y+b.h*(head?.62:.5);
 parts.forEach((p,i)=>{const q=R(x,y-sz(15),bw,sz(30));tile(q,T.sun,'',14);say2(p,q.x+q.w/2,q.y+q.h/2,17,{fit:bw-6});if(i<n-1&&gap!==0)say2('·',x+bw+space/2,y,16,{c:'#64748b'});x+=bw+space})}
function tally(t,n,of){say2(`${t}: ${n} of ${of}`,A.W/2,A.H*.95,13,{c:A.col.tx,w:700})}
/* ---------- 1. push two words together ---------- */
const jr=()=>{const cw=A.W*.3,x0=A.W*.06,maxG=A.W-2*x0-2*cw,y=A.H*.3,h=A.H*.15;return{a:R(x0,y,cw,h),b:R(x0+cw+st.gap*maxG,y,cw,h),maxG,x0,cw}};
function drawJoin(){ground(T.sky);const J=JOIN[Math.min(st.r,JOIN.length-1)],L=jr();robot(st.r<JOIN.length?[J.a,J.b]:['✓'],st.r<JOIN.length?st.gap:0,'Robot says:');
 if(st.r<JOIN.length){tile(L.a,T.leaf,'');say2(J.a,L.a.x+L.a.w/2,L.a.y+L.a.h/2,22);tile(L.b,T.leaf,st.grab?'hot':st.slip?'bad':'');say2((st.slip?'✗ ':'')+J.b+' ⇠',L.b.x+L.b.w/2,L.b.y+L.b.h/2,20,{fit:L.b.w-8});
  say2(st.gap>.02?'Push it along until they touch':'',A.W/2,A.H*.5,13,{c:A.col.tx,w:700})}
 const box=R(A.W*.06,A.H*.56,A.W*.88,A.H*.3);tile(box,'#ffffff',st.made.length?'ok':'');
 if(!st.made.length)say2('What new word will you hear?',box.x+box.w/2,box.y+box.h/2,14,{c:'#475569',fit:box.w-16});
 st.made.forEach((m,i)=>{const w=box.w/3,cx=box.x+w*i+w/2;say2(m.e,cx,box.y+box.h*.4,sz(30));say2('✓ '+m.w,cx,box.y+box.h*.78,12,{fit:w-6})});tally('New words',st.made.length,JOIN.length)}
function push(by){if(st.r>=JOIN.length)return;st.gap=Math.max(0,st.gap-by);st.slip='';if(st.gap<.06)return joined();A.sound.tick();
 const J=JOIN[st.r];tell(`${J.a} … ${J.b}. Still a gap, so they are 2 words. Push closer.`)}
function joined(){const J=JOIN[st.r];st.made.push(J);st.r++;st.gap=1;st.slip='';A.sound.pop();tell(`${J.a} + ${J.b}, no gap: ${J.w}! ${J.e}`+(st.r<JOIN.length?' Here are the next two words.':''))}
/* ---------- 2 and 3. give Robot the picture it says ---------- */
const listFor=()=>kind()==='beat'?BEAT:TALK;
function choices(){const L=listFor(),q=L[st.r];if(!q)return[];const all=[[q.e,q.w,''],...q.o],k=st.r%3;return all.slice(k).concat(all.slice(0,k))}
const cardR=i=>{const w=(A.W-40)/3;return R(10+i*(w+10),A.H*.6,w,A.H*.25)},basket=()=>R(A.W*.22,A.H*.26,A.W*.56,A.H*.26);
function drawGive(){const L=listFor(),beat=kind()==='beat',q=L[Math.min(st.r,L.length-1)];ground(beat?T.sun:T.lilac);
 robot(st.r<L.length?q.say:['✓'],st.r<L.length?.25:0,beat?'Robot claps:':'Robot says:');const b=basket();tile(b,'#ffffff',st.over?'hot':'');
 say2(st.got.length?st.got.map(x=>x.e).join(' '):'🤲',b.x+b.w/2,b.y+b.h*.42,st.got.length?26:40);say2(st.got.length?'✓ '+st.got.map(x=>x.w).join(', '):'Give it to Robot',b.x+b.w/2,b.y+b.h*.82,12,{fit:b.w-10});
 choices().forEach(([e,w],i)=>{let r=cardR(i);if(st.grab&&st.grab.i===i)r=R(st.grab.x-r.w/2,st.grab.y-r.h/2,r.w,r.h);const bad=st.wrong===w;tile(r,'#ffffff',bad?'bad':st.pick===i?'hot':'');
  say2(e,r.x+r.w/2,r.y+r.h*.42,sz(34));say2((bad?'✗ ':'')+w,r.x+r.w/2,r.y+r.h*.82,13,{fit:r.w-6})});tally(beat?'Words clapped':'Toys found',st.got.length,L.length)}
function give(i){const L=listFor(),q=L[st.r];if(!q)return;const [e,w,slip]=choices()[i];st.pick=null;
 if(!slip){st.got.push({e,w});st.r++;st.wrong='';A.sound.pop();return tell(`${q.say.join('-')}: ${w}! ${e}`+(st.r<L.length?' Listen to the next one.':''))}
 st.wrong=w;A.sound.miss();tell(`${w} ${e}? ${oops(slip,q.say,w)}`)}
/* ---------- 4. head, tummy, toes, clap ---------- */
const partR=i=>R(A.W*.06,A.H*(.22+i*.22),A.W*.46,A.H*.19),clapR=()=>R(A.W*.58,A.H*.42,A.W*.36,A.H*.19);
function drawBody(){ground(T.rose);const B=BODY[Math.min(st.r,BODY.length-1)],live=st.r<BODY.length;robot(live?B.s:['✓'],live?.3:0,'Robot says:');
 PARTS.forEach((P,i)=>{const r=partR(i),has=live&&i<st.k;tile(r,'#ffffff',has?'ok':st.slip==='order'&&i!==st.k?'':'');say2(P.e,r.x+r.h*.45,r.y+r.h/2,sz(26));
  say2(has?'✓ '+B.s[i]:'tap '+P.n,r.x+r.w*.62,r.y+r.h/2,has?20:13,{fit:r.w*.55,c:has?T.ok:'#475569'})});
 const k=clapR();tile(k,T.sun,st.slip==='early'?'bad':live&&st.k>=3?'hot':'');say2('👏',k.x+k.w/2,k.y+k.h*.38,sz(30));say2((st.slip==='early'?'✗ ':'')+'Clap!',k.x+k.w/2,k.y+k.h*.78,14);
 const out=R(A.W*.58,A.H*.66,A.W*.36,A.H*.19);tile(out,'#ffffff',st.made.length?'ok':'');say2(st.made.map(m=>m.e).join(' ')||'?',out.x+out.w/2,out.y+out.h*.4,st.made.length?26:24);
 if(st.made.length)say2('✓ '+st.made.map(m=>m.w).join(', '),out.x+out.w/2,out.y+out.h*.8,12,{fit:out.w-6});tally('Words blended',st.made.length,BODY.length)}
function touch(i){const B=BODY[st.r];if(!B)return;if(i!==st.k){st.slip='order';A.sound.miss();return tell(oops('order'))}
 st.k++;st.slip='';A.sound.tick();tell(`${PARTS[i].n}: ${B.s[i]}.`+(st.k<3?` Now your ${PARTS[st.k].n}.`:' All the sounds are said. Now clap!'))}
function clap(){const B=BODY[st.r];if(!B)return;if(st.k<3){st.slip='early';A.sound.miss();return tell(oops('early',B.s.slice(0,Math.max(1,st.k)),st.k<2?B.guess:''))}
 st.made.push(B);st.r++;st.k=0;st.slip='';A.sound.pop();tell(`${B.s.join('-')}: ${B.w}! ${B.e}`+(B.w==='fish'?' Fish has 4 letters but only 3 sounds.':' Now a new word.'))}
/* ---------- 5. I spy in robot talk ---------- */
const roomR=i=>{const w=(A.W-40)/3;return R(10+(i%3)*(w+10),A.H*(.27+Math.floor(i/3)*.31),w,A.H*.28)};
function drawSpy(){ground(T.leaf);const P=SPY[Math.min(st.r,SPY.length-1)],live=st.r<SPY.length;robot(live?P.say:['✓'],live?.25:0,'I spy, in robot talk, a…');
 ROOM.forEach(([w,e],i)=>{const r=roomR(i),got=st.found.includes(w),bad=st.wrong===w;tile(r,'#ffffff',got?'ok':bad?'bad':'');say2(e,r.x+r.w/2,r.y+r.h*.42,sz(36));
  say2((got?'✓ ':bad?'✗ ':'')+w,r.x+r.w/2,r.y+r.h*.82,13,{fit:r.w-6})});tally('Found',st.found.length,SPY.length)}
function spy(w){const P=SPY[st.r];if(!P)return;if(w===P.w){st.found.push(w);st.r++;st.wrong='';A.sound.pop();return tell(`${P.say.join('-')}: ${w}! You found it.`+(st.r<SPY.length?' Robot spies something else.':''))}
 st.wrong=w;A.sound.miss();tell(`${w}? `+oops(P.near[w]||(w[0]!==P.w[0]?'first':'last'),P.say,w))}
/* ---------- feedback that names the slip ---------- */
function oops(t,parts,w){let m='Listen to every part, then push them together.';const said=(parts||[]).join('-');
 if(t==='apart')m='Sounds with gaps are still just parts. Push them right up close, with no gap, to hear one word.';
 if(t==='first')m=`It starts the same way, but listen to the whole word. Robot said ${said||'every part'}, right to the end.`;
 if(t==='last')m=`Listen to the very last sound. ${w&&w.length<12?w+' ends a different way':'That one ends a different way'}. Robot said ${said||'it'}.`;
 if(t==='middle')m=`Listen to the middle sound. Robot said ${said||'it'}; ${w||'that one'} has a different middle.`;
 if(t==='short')m=`Count the beats. Robot clapped ${said||'more beats'}; ${w||'that word'} has fewer beats.`;
 if(t==='order')m=parts?`Same sounds, wrong order. Robot said ${said}, first to last.`:'First sound first! Start at your head, then tummy, then toes.';
 if(t==='early')m=`Wait for all the sounds! ${said?said+' … could be lots of words':'One sound'}${w?', like '+w:''}. Hear them all, then blend.`;
 if(t==='letters')m='You do not need letters for robot talk. Just listen with your ears and push the sounds together.';
 if(t==='names')m='Robot talk uses sounds, not letter names. c-a-t, not see-ay-tee.';
 return m}
/* ---------- drawing, pointer and buttons ---------- */
function draw(){const k=kind();if(k==='quiz'){ground(T.sun);say2('🤖 Challenge',A.W/2,A.H*.4,22,{c:A.col.tx});say2('Listen · Push together · Say the word',A.W/2,A.H*.55,13,{c:A.col.tx,fit:A.W-20});return}
 ({join:drawJoin,beat:drawGive,talk:drawGive,body:drawBody,spy:drawSpy})[k]();A.fx.draw(A.ctx)}
function down(p){const k=kind();
 if(k==='join'){if(inR(p,jr().b)&&st.r<JOIN.length){st.grab={dx:p.x-jr().b.x};A.redraw();return true}return false}
 if(k==='beat'||k==='talk'){const i=choices().findIndex((_,j)=>inR(p,cardR(j)));if(i>=0){st.grab={i,x:p.x,y:p.y,x0:p.x,y0:p.y};A.redraw();return true}if(inR(p,basket())&&st.pick!=null)give(st.pick);return false}
 if(k==='body'){for(let i=0;i<3;i++)if(inR(p,partR(i)))return touch(i),false;if(inR(p,clapR()))clap();return false}
 if(k==='spy'){const i=ROOM.findIndex((_,j)=>inR(p,roomR(j)));if(i>=0)spy(ROOM[i][0]);return false}return false}
function move(p){const g=st.grab;if(!g)return;const k=kind();
 if(k==='join'){const L=jr();st.gap=Math.max(0,Math.min(1,(p.x-g.dx-(L.x0+L.cw))/L.maxG));A.redraw();return}
 g.x=p.x;g.y=p.y;st.over=inR(p,basket());A.redraw()}
function up(p){const g=st.grab;if(!g)return;st.grab=null;st.over=false;const k=kind();
 if(k==='join'){if(st.gap<.06)return joined();const J=JOIN[st.r];st.slip=st.gap<.95?'gap':'';if(st.slip){A.sound.miss();return tell(`${J.a} … ${J.b}: ${oops('apart')}`)}return A.redraw()}
 if(Math.hypot(p.x-g.x0,p.y-g.y0)<10){st.pick=g.i;return tell(`${choices()[g.i][1]} picked. Tap Robot's basket to give it.`)}
 if(inR(p,basket()))return give(g.i);A.redraw()}
function tell(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();pads();st.hook()}
function pads(){if(!ctl)return;ctl.innerHTML='';const k=kind(),b=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},ctl,t).onclick=f};
 if(k==='join'&&st.r<JOIN.length)b('⇠ Push closer',()=>push(.35),`Push ${JOIN[st.r].b} closer to ${JOIN[st.r].a}`);
 if(k==='beat'||k==='talk')choices().forEach(([e,w],i)=>b(`${e} Give ${w}`,()=>give(i),`Give Robot the ${w}`));
 if(k==='body'){PARTS.forEach((P,i)=>b(`${P.e} Tap ${P.n}`,()=>touch(i)));b('👏 Clap',clap)}
 if(k==='spy')ROOM.forEach(([w,e])=>b(`${e} ${w}`,()=>spy(w),`Is it the ${w}?`))}
function fresh(){tok++;for(const x in st)delete st[x];Object.assign(st,{r:0,gap:1,made:[],got:[],found:[],k:0,slip:'',wrong:'',pick:null,grab:null,over:false,hook:()=>{}})}
const ready=(i,test)=>()=>{if(A.step===i&&test()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function open(i,test){fresh();tell(DESC[i]);st.hook=ready(i,test)}
function play(i,acts,ms){steps[i].go();const t0=tok;acts.forEach((f,j)=>setTimeout(()=>{if(t0===tok)f()},ms*(j+1)))}
const right=()=>()=>give(choices().findIndex(x=>!x[2]));
const steps=[
{h:'Push words together',p:'Robot says two words with a gap. Slide the second word along until the two words touch. What new word do you hear?',
 predict:{q:'Robot says rain … bow. Push them together. What do you get?',opts:['Still two things: rain and a bow','One new word: rainbow'],ans:1},task:'Push 3 pairs of words together',
 show:()=>play(0,[()=>push(1),()=>push(1),()=>push(1)],450),go:()=>open(0,()=>st.made.length>=JOIN.length)},
{h:'Clap the beats',p:'Robot claps a word in beats: ba-na-na. Put the beats together. Give Robot the picture that has all the beats.',
 task:'Give Robot 3 clapped words',show:()=>play(1,[right(),right(),right()],450),go:()=>open(1,()=>st.got.length>=BEAT.length)},
{h:'Robot talk',p:'Now Robot says each sound: c … at, h-e-n. Listen to every sound, right to the end. Give Robot the toy it says.',
 predict:{q:'Robot says c … at. Hat also ends in at. Is it the hat?',opts:['Yes, it ends the same','No, listen to the first sound: c'],ans:1},task:'Give Robot 3 toys it says',
 show:()=>play(2,[right(),right(),right()],450),go:()=>open(2,()=>st.got.length>=TALK.length)},
{h:'Head, tummy, toes',p:'Robot says d-o-g. Tap the first sound on your head, the next on your tummy, the last on your toes. Then clap to blend!',
 predict:{q:'Robot has only said d. Can you say the word yet?',opts:['Yes: duck!','No, wait for all the sounds'],ans:1},task:'Blend 2 words with head, tummy, toes',
 show:()=>play(3,[()=>touch(0),()=>touch(1),()=>touch(2),clap,()=>touch(0),()=>touch(1),()=>touch(2),clap],320),go:()=>open(3,()=>st.made.length>=BODY.length)},
{h:'I spy',p:'I spy with my little eye, in robot talk, a b-a-g. Tap the thing Robot means. Watch out: some things sound nearly the same.',
 task:'Find 3 things Robot spies',show:()=>play(4,SPY.map(s=>()=>spy(s.w)),450),go:()=>open(4,()=>st.found.length>=SPY.length)},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>st.hook()});
function ask(){qn++;const Q=QS[qn%QS.length],opts=[[Q.a,''],...Q.o],k=qn%3,list=opts.slice(k).concat(opts.slice(0,k));
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Pick an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=chal.querySelector('.fl-pick');list.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>judge(s,Q,t)});c.say('Challenge: '+Q.q);A.redraw()}
function judge(s,Q,t){const a=Q.a,said=Q.say,word=t.split(' ').pop();chal.querySelectorAll('.fl-pick button').forEach(x=>x.disabled=true);const fb=chal.querySelector('.fl-fb'),why=s?oops(s,said,s==='early'?'dog or duck':word):'';if(!s)A.win();else A.sound.miss();
 fb.innerHTML=(s?'✗ '+why:`✓ Yes: ${a}`)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=ask;c.say(s?why:'Yes.')}
FK.shell(c,{steps,ratio:.66,tall:1.3,draw,onStep:X=>{chal.hidden=X.step!==5;ctl.hidden=X.step===5;pads()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);ctl=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Robot talk lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});pads()}}).start()})})();
