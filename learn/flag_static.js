/* Flagship – static electricity and sparks (ages 11–12): rub electrons across, like and unlike charges, lift neutral
   paper, make a spark at a door handle, insulators keep charge and metals lose it. Data in learn/static_art.js. */
(()=>{const {RUBS,BAL,JUM,PAIRS,BITS,SPARKS,QMAX,ITEMS,BINS,T,DESC,DONE,QS}=STA;
VIS.reg('flagstatic',c=>{let A,g,dock,box,n=-1,epoch=0;const W={};
const NAVY='#0b1324',WIN='#047857',ERR='#b91c1c',GREY='#4b5563',PICK='#7c3aed',NEG='#1d4ed8',POS='#c2410c',SF='system-ui,sans-serif';
const part=()=>['rub','pair','paper','spark','sort','end'][A.step];
const em=v=>A.narrow?v:Math.round(v*1.12);
const inR=(p,r)=>!!r&&p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
function sky(){g.fillStyle=A.mix(A.col.pn,'#ecfeff',A.col.dark?.06:.5);g.fillRect(0,0,A.W,A.H)}
function txt(s,x,y,n,col,wt){g.font=`${wt||700} ${em(n)}px ${SF}`;g.fillStyle=col||NAVY;g.textAlign='center';g.textBaseline='middle';g.fillText(s,x,y)}
function plate(r,st){st=st||'';g.fillStyle=st==='bad'?'#fee2e2':st==='good'?'#d1fae5':'#ffffff';A.paint.rrect(r.x,r.y,r.w,r.h,9);g.fill();g.lineWidth=st?3:1.5;g.strokeStyle=st==='bad'?ERR:st==='good'?WIN:st==='sel'?PICK:GREY;g.stroke()}
function head(s,good){let f=em(13);g.font=`800 ${f}px ${SF}`;let w=g.measureText(s).width+24;while(w>A.W-10&&f>9){f--;g.font=`800 ${f}px ${SF}`;w=g.measureText(s).width+24}
 const h=f+14,y=A.H*.05;g.fillStyle=good?'#d1fae5':'#ffffff';A.paint.rrect((A.W-w)/2,y-h/2,w,h,h/2);g.fill();g.lineWidth=good?3:1.5;g.strokeStyle=good?WIN:GREY;g.stroke();txt(s,A.W/2,y+1,13,good?WIN:NAVY,800)}
function sign(s,x,y,r){g.fillStyle=s==='-'?NEG:POS;g.beginPath();g.arc(x,y,r,0,7);g.fill();g.fillStyle='#ffffff';g.fillRect(x-r*.55,y-r*.14,r*1.1,r*.28);if(s==='+')g.fillRect(x-r*.14,y-r*.55,r*.28,r*1.1)}
function balloon(x,y,R,col,plus,minus){g.fillStyle=col;g.beginPath();g.ellipse(x,y,R*.8,R,0,0,7);g.fill();g.strokeStyle='#374151';g.lineWidth=2;g.stroke();g.beginPath();g.moveTo(x,y+R);g.lineTo(x,y+R*1.5);g.stroke();
 const all=Array(plus).fill('+').concat(Array(minus).fill('-'));all.forEach((s,i)=>{const a=i*2.4,rr=R*.55*Math.sqrt((i+.5)/all.length);sign(s,x+Math.cos(a)*rr*.8,y+Math.sin(a)*rr,Math.max(5,R*.1))})}
/* 1. rub the balloon on the jumper */
const wool=()=>({x:A.W*.1,y:A.H*.56,w:A.W*.8,h:A.H*.24});
const knobs=()=>{const w=Math.min(92,A.W*.2),h=em(34),y=A.H*.86;return[{k:'bal',s:'-',x:A.W*.04,y,w,h},{k:'bal',s:'+',x:A.W*.04+w+6,y,w,h},{k:'jum',s:'-',x:A.W*.96-2*w-6,y,w,h},{k:'jum',s:'+',x:A.W*.96-w,y,w,h}]};
function drawRub(){const s=W.a,J=wool(),R=Math.min(A.W*.12,A.H*.12);sky();
 g.fillStyle='#be185d';A.paint.rrect(J.x,J.y,J.w,J.h,14);g.fill();g.strokeStyle='#831843';g.lineWidth=2;g.stroke();
 for(let i=0;i<JUM.p;i++){const x=J.x+J.w*(i+.5)/JUM.p;sign('+',x,J.y+J.h*.32,Math.max(5,R*.1));if(i>=s.moved)sign('-',x,J.y+J.h*.7,Math.max(5,R*.1))}
 balloon(s.bx,s.by,R,'#fde047',BAL.p,BAL.p+s.moved);
 txt(`Balloon: ${s.moved?s.moved+' extra electrons':'neutral'}`,A.W*.27,A.H*.135,12,A.col.tx);txt(`Jumper: ${s.moved?s.moved+' electrons missing':'neutral'}`,A.W*.73,A.H*.135,12,A.col.tx);
 if(s.moved>=RUBS){txt('Balloon is…',A.W*.04+Math.min(92,A.W*.2)+3,A.H*.83,11,A.col.tx);txt('Jumper is…',A.W*.96-Math.min(92,A.W*.2)-3,A.H*.83,11,A.col.tx);
  knobs().forEach(b=>{const pick=s[b.k]===b.s;plate(b,pick?'good':s.bad===b.k+b.s?'bad':'');txt(b.s==='-'?'− negative':'+ positive',b.x+b.w/2,b.y+b.h/2+1,11,NAVY,800)})}
 head(s.moved<RUBS?`Rub the balloon on the jumper: ${s.moved} of ${RUBS}`:s.bal&&s.jum?'Electrons moved; no charge was made':'Now pick the charge on each',s.moved>=RUBS&&s.bal&&s.jum)}
function rub(){const s=W.a;if(s.moved>=RUBS)return;s.moved++;A.sound.tick();report(`Rub ${s.moved}: one electron moved from the jumper to the balloon.`+(s.moved>=RUBS?' Now say what charge each one has.':''))}
function label(k,v){const s=W.a;if(s.moved<RUBS)return report(T.rubFirst);const want=k==='bal'?'-':'+';
 if(v!==want){s.bad=k+v;A.sound.miss();return report(k==='bal'?T.signBal:T.signJum)}s[k]=v;s.bad=null;A.sound.pop();report(k==='bal'?'Yes: the balloon is negative.':'Yes: the jumper is positive.')}
/* 2. attract or repel */
const choose=()=>{const w=(A.W-36)/2,h=em(44);return[{k:'att',t:'Attract (pull together)',x:12,y:A.H*.62,w,h},{k:'rep',t:'Repel (push apart)',x:24+w,y:A.H*.62,w,h}]};
function drawPair(){const s=W.b,P=PAIRS[Math.min(s.i,PAIRS.length-1)],r=Math.min(A.W*.1,A.H*.09),gap=A.W*.18+s.shift*A.W*.09,cy=A.H*.36;sky();
 if(s.i<PAIRS.length){txt(P.t,A.W/2,A.H*.15,13,A.col.tx);[[P.a,-1],[P.b,1]].forEach(([q,e])=>{const x=A.W/2+e*gap;g.fillStyle='#e5e7eb';g.beginPath();g.arc(x,cy,r,0,7);g.fill();g.strokeStyle='#374151';g.lineWidth=2;g.stroke();sign(q,x,cy,r*.5)});
  choose().forEach(b=>{plate(b,s.bad===b.k?'bad':'');txt(b.t,b.x+b.w/2,b.y+b.h/2+1,12,NAVY,800)})}
 s.log.forEach((l,j)=>txt(l,A.W/2,A.H*(s.i>=PAIRS.length?.3+j*.12:.8+j*.05),s.i>=PAIRS.length?15:11,A.col.dark?'#6ee7b7':WIN,800));
 head(s.i>=PAIRS.length?'Like repel, unlike attract':`Pair ${s.i+1} of ${PAIRS.length}: attract or repel?`,s.i>=PAIRS.length)}
function judgePair(k){const s=W.b;if(s.i>=PAIRS.length)return;const P=PAIRS[s.i],want=P.a===P.b?'rep':'att';
 if(k!==want){s.bad=k;A.sound.miss();return report(want==='rep'?T.like:T.unlike)}
 s.bad=null;s.shift=want==='rep'?1:-1;A.sound.pop();s.log.push(`${P.a==='-'?'−':'+'} and ${P.b==='-'?'−':'+'}: ${want==='rep'?'repel':'attract'} ✓`);s.i++;const v=epoch;setTimeout(()=>{if(v===epoch){s.shift=0;A.redraw()}},500);
 report(want==='rep'?'Yes: same sign, so they push apart.':'Yes: opposite signs, so they pull together.')}
/* 3. lift neutral paper */
const table=()=>({y:A.H*.8});
const bitXY=i=>({x:A.W*(.2+i*.12),y:table().y-6});
const swap=()=>({x:A.W-12-Math.min(150,A.W*.42),y:A.H*.1,w:Math.min(150,A.W*.42),h:em(34)});
function drawPaper(){const s=W.c,R=Math.min(A.W*.1,A.H*.1);sky();g.fillStyle='#92400e';g.fillRect(0,table().y,A.W,A.H-table().y);
 for(let i=0;i<BITS;i++){if(s.stuck.includes(i))continue;const b=bitXY(i);g.fillStyle='#f8fafc';g.fillRect(b.x-9,b.y-8,18,8);g.strokeStyle='#64748b';g.lineWidth=1;g.strokeRect(b.x-9,b.y-8,18,8);
  if(s.live&&Math.hypot(s.px-b.x,s.py-b.y)<A.W*.35){g.fillStyle=POS;g.fillRect(b.x-2,b.y-8,4,3);g.fillStyle=NEG;g.fillRect(b.x-2,b.y-3,4,3)}}
 balloon(s.px,s.py,R,s.live?'#fde047':'#d1d5db',BAL.p,s.live?BAL.p+4:BAL.p);
 s.stuck.forEach((i,j)=>{g.fillStyle='#f8fafc';g.fillRect(s.px-R*.6+j*R*.24,s.py+R*.8,14,7);g.strokeStyle='#64748b';g.strokeRect(s.px-R*.6+j*R*.24,s.py+R*.8,14,7)});
 const sw=swap();plate(sw,s.tried?'good':'');txt(s.live?'Try uncharged':'Use charged',sw.x+sw.w/2,sw.y+sw.h/2+1,12,NAVY,800);
 head(s.best>=BITS&&s.tried?'Neutral paper is pulled up':`Lower the balloon: ${s.stuck.length} of ${BITS} lifted`,s.best>=BITS&&s.tried)}
function near(){const s=W.c;const close=[...Array(BITS).keys()].filter(i=>Math.hypot(s.px-bitXY(i).x,s.py-bitXY(i).y)<A.W*.16);if(!close.length)return;
 if(!s.live){if(!s.tried){s.tried=true;A.sound.miss();report(T.flat)}return}const free=close.filter(i=>!s.stuck.includes(i));if(!free.length)return;
 free.forEach(i=>s.stuck.push(i));s.best=Math.max(s.best,s.stuck.length);A.sound.pop();report(`${s.stuck.length} of ${BITS} bits jumped up. The balloon pushes their electrons down, so their top edge is left positive and is pulled.`)}
function toggle(){const s=W.c;s.live=!s.live;s.stuck=[];A.sound.tick();report(s.live?'Charged balloon back in your hand; the paper is back on the table.':'The paper is back on the table. Now bring this uncharged balloon to it.')}
function lower(){const s=W.c,free=[...Array(BITS).keys()].filter(i=>!s.stuck.includes(i));if(!free.length)return;const b=bitXY(free[0]);s.px=b.x;s.py=b.y-Math.min(A.W*.1,A.H*.1)*1.1;near();A.redraw()}
/* 4. spark at the door handle */
const handle=()=>({x:A.W*.86,y:A.H*.42});
const shuf=()=>({x:12,y:A.H*.84,w:A.W*.44,h:em(40)});
function drawSpark(){const s=W.d,H=handle();sky();g.fillStyle='#a3a3a3';g.fillRect(A.W*.8,A.H*.12,A.W*.2,A.H*.68);g.fillStyle='#facc15';g.beginPath();g.arc(H.x,H.y,10,0,7);g.fill();g.strokeStyle='#713f12';g.lineWidth=2;g.stroke();
 g.fillStyle='#86198f';g.fillRect(0,A.H*.72,A.W,A.H*.06);const bx=A.W*.25;g.fillStyle='#f5d0a9';g.beginPath();g.arc(bx,A.H*.24,A.W*.05,0,7);g.fill();g.strokeStyle='#374151';g.lineWidth=5;
 g.beginPath();g.moveTo(bx,A.H*.3);g.lineTo(bx,A.H*.55);g.moveTo(bx,A.H*.55);g.lineTo(bx-A.W*.05,A.H*.72);g.moveTo(bx,A.H*.55);g.lineTo(bx+A.W*.05,A.H*.72);g.moveTo(bx,A.H*.36);g.lineTo(s.hx,H.y);g.stroke();
 g.fillStyle='#f5d0a9';g.beginPath();g.arc(s.hx,H.y,8,0,7);g.fill();for(let i=0;i<s.q;i++)sign('-',bx-A.W*.06+(i%3)*A.W*.06,A.H*.4+Math.floor(i/3)*A.W*.06,6);
 if(s.flash>0){g.strokeStyle='#eab308';g.lineWidth=3;g.beginPath();g.moveTo(s.hx+8,H.y);const d=(H.x-10-s.hx-8)/4;for(let k=1;k<=4;k++)g.lineTo(s.hx+8+d*k,H.y+(k%2?-8:8));g.stroke()}
 txt(`Extra electrons: ${s.q}   Sparks: ${s.sparks} of ${SPARKS}`,A.W*.4,A.H*.8+em(2)-A.H*.05,12,A.col.tx);
 plate(shuf());txt('Shuffle feet',shuf().x+shuf().w/2,shuf().y+shuf().h/2+1,13,NAVY,800);
 head(s.sparks>=SPARKS?'Charge jumped the gap: zap!':'Shuffle, then drag your hand to the handle',s.sparks>=SPARKS)}
function shuffle(){const s=W.d;if(s.q>=QMAX)return report('You are fully charged. Now reach for the handle.');s.q++;A.sound.tick();report(`Shuffle: ${s.q} extra electrons on you.`)}
function reach(x){const s=W.d,H=handle();s.hx=Math.max(A.W*.3,Math.min(H.x-14,x));const gap=H.x-s.hx;
 if(gap>A.W*.04*(s.q+1))return A.redraw();if(!s.q){if(!s.warned){s.warned=1;report(T.noQ)}return}
 s.sparks++;s.q=0;s.flash=1;A.sound.whoosh();const v=epoch;setTimeout(()=>{if(v===epoch){s.flash=0;s.hx=A.W*.45;A.redraw()}},500);report(`Zap! Spark ${s.sparks}: the extra electrons jumped to the metal. You are neutral now.`)}
/* 5. insulator or conductor */
const pots=()=>{const w=(A.W-36)/2;return BINS.map((t,i)=>({i,x:12+i*(w+12),y:A.H*.12,w,h:A.H*.36}))};
const chips=()=>{const w=(A.W-36)/3,h=em(36);return ITEMS.map((q,i)=>({i,x:12+(i%3)*(w+6),y:A.H*.6+Math.floor(i/3)*(h+8),w,h}))};
function drawSort(){const s=W.e;sky();pots().forEach(b=>{plate(b,'');const words=BINS[b.i].split(' (');txt(words[0],b.x+b.w/2,b.y+em(16),11,NAVY,800);txt('('+words[1],b.x+b.w/2,b.y+em(32),11,GREY,700);
  s.done.filter(i=>ITEMS[i].k===b.i).forEach((i,j)=>txt(ITEMS[i].t,b.x+b.w/2,b.y+em(54)+j*em(17),11,WIN,800))});
 chips().forEach(b=>{if(s.done.includes(b.i))return;plate(b,s.bad===b.i?'bad':s.pick===b.i?'sel':'');txt(ITEMS[b.i].t,b.x+b.w/2,b.y+b.h/2+1,11,NAVY,800)});
 head(s.done.length>=ITEMS.length?'Insulators hold charge; metals pass it':'Tap a rubbed object, then where it goes',s.done.length>=ITEMS.length)}
function place(i,k){const s=W.e;if(s.done.includes(i))return;s.pick=null;if(ITEMS[i].k!==k){s.bad=i;A.sound.miss();return report(T.item[i])}
 s.done.push(i);s.bad=null;A.sound.pop();report(T.item[i].split(':')[0]+'.'+(s.done.length>=ITEMS.length?' All 6 sorted.':''))}
function draw(){const k=part();if(k==='end'){sky();head('Challenge',true);txt('Electrons move; like repel, unlike attract',A.W/2,A.H*.5,13,A.col.tx);return}
 ({rub:drawRub,pair:drawPair,paper:drawPaper,spark:drawSpark,sort:drawSort})[k]();A.fx.draw(g)}
function down(p){const k=part(),R=Math.min(A.W*.12,A.H*.12);
 if(k==='rub'){const kb=W.a.moved>=RUBS&&knobs().find(b=>inR(p,b));if(kb){label(kb.k,kb.s);return false}if(Math.hypot(p.x-W.a.bx,p.y-W.a.by)<R*1.3){W.hold={x:p.x,y:p.y,run:0};return true}return false}
 if(k==='pair'){const b=choose().find(b=>inR(p,b));if(b)judgePair(b.k);return false}
 if(k==='paper'){if(inR(p,swap())){toggle();return false}if(Math.hypot(p.x-W.c.px,p.y-W.c.py)<R*1.4){W.hold={};return true}return false}
 if(k==='spark'){if(inR(p,shuf())){shuffle();return false}if(Math.hypot(p.x-W.d.hx,p.y-handle().y)<40){W.hold={};return true}return false}
 if(k==='sort'){const ch=chips().find(b=>inR(p,b)&&!W.e.done.includes(b.i));if(ch){W.e.pick=ch.i;report(`${ITEMS[ch.i].t} picked. Now tap a box.`);return false}const b=pots().find(b=>inR(p,b));if(b&&W.e.pick!=null)place(W.e.pick,b.i);return false}
 return false}
function move(p){const h=W.hold;if(!h)return;const k=part();
 if(k==='rub'){const s=W.a,J=wool();s.bx=p.x;s.by=p.y;if(inR(p,{x:J.x,y:J.y-A.H*.1,w:J.w,h:J.h+A.H*.1})){h.run+=Math.abs(p.x-h.x);if(h.run>A.W*.3){h.run=0;rub()}}h.x=p.x;A.redraw()}
 if(k==='paper'){W.c.px=p.x;W.c.py=Math.min(p.y,table().y-20);near();A.redraw()}
 if(k==='spark')reach(p.x)}
function up(){W.hold=null}
function fresh(){epoch++;for(const k in W)delete W[k];Object.assign(W,{a:{moved:0,bx:A.W/2,by:A.H*.36,bal:null,jum:null,bad:null},b:{i:0,shift:0,log:[],bad:null},c:{px:A.W*.75,py:A.H*.35,live:true,stuck:[],best:0,tried:false},d:{q:0,hx:A.W*.45,sparks:0,flash:0},e:{done:[],bad:null,pick:null},hold:null,after:()=>{}})}
function report(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();W.after()}
const settle=(i,ok,msg)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(msg+A.reveal(i))};
function begin(i,ok){fresh();report(DESC[i]);W.after=settle(i,ok,DONE[i])}
function replay(i,acts,ms){steps[i].go();const v=epoch;acts.forEach((f,j)=>setTimeout(()=>{if(v===epoch)f()},ms*(j+1)))}
function controls(){if(!dock)return;dock.innerHTML='';const k=part(),B=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},dock,t).onclick=f};
 if(k==='rub'){if(W.a.moved<RUBS)B('Rub the balloon on the jumper',rub);else{B('Balloon is negative',()=>label('bal','-'));B('Balloon is positive',()=>label('bal','+'));B('Jumper is negative',()=>label('jum','-'));B('Jumper is positive',()=>label('jum','+'))}}
 if(k==='pair'&&W.b.i<PAIRS.length){B('They attract',()=>judgePair('att'));B('They repel',()=>judgePair('rep'))}
 if(k==='paper'){B('Bring the balloon down to the paper',lower);B(W.c.live?'Swap to an uncharged balloon':'Swap to the charged balloon',toggle)}
 if(k==='spark'){B('Shuffle feet on the carpet',shuffle);B('Reach towards the door handle',()=>reach(W.d.hx+A.W*.08))}
 if(k==='sort')ITEMS.forEach((q,i)=>{if(!W.e.done.includes(i))BINS.forEach((t,b)=>B(`${q.t}: ${b?'conductor':'insulator'}`,()=>place(i,b),`Rubbed ${q.t.toLowerCase()}: ${t}`))})}
const steps=[
{h:'Rub to charge',p:'Drag the balloon back and forth across the wool jumper. Watch the minus charges (electrons). Then pick the charge on each.',
 predict:{q:'When you rub the balloon on the jumper, what moves?',opts:['Positive charges move to the balloon','Electrons move from the jumper to the balloon'],ans:1},task:'Rub 4 times, then name both charges',
 show:()=>replay(0,[rub,rub,rub,rub,()=>label('bal','-'),()=>label('jum','+')],380),go:()=>begin(0,()=>W.a.bal&&W.a.jum)},
{h:'Push or pull?',p:'For each pair of charged objects, tap Attract or Repel.',
 predict:{q:'Two balloons are rubbed on the same jumper. Hung side by side, they will…',opts:['Pull together','Push apart'],ans:1},task:'Decide for all 4 pairs',
 show:()=>replay(1,PAIRS.map(P=>()=>judgePair(P.a===P.b?'rep':'att')),650),go:()=>begin(1,()=>W.b.i>=PAIRS.length)},
{h:'Neutral paper',p:'Drag the charged balloon down to the paper bits. Then swap to an uncharged balloon and try again.',
 predict:{q:'Will a charged balloon pick up paper that has no charge?',opts:['No, the paper is neutral','Yes, it pulls the paper up'],ans:1},task:'Lift all 6 bits, then test an uncharged balloon',
 show:()=>replay(2,[lower,lower,lower,lower,lower,lower,toggle,lower],340),go:()=>begin(2,()=>W.c.best>=BITS&&W.c.tried)},
{h:'Spark!',p:'Tap Shuffle feet to pick up extra electrons, then drag your hand towards the metal handle.',
 predict:{q:'After the spark, is your hand still charged?',opts:['Yes, even more','No, the extra electrons jumped to the metal'],ans:1},task:'Make 2 sparks',
 show:()=>replay(3,[shuffle,shuffle,shuffle,()=>reach(handle().x),shuffle,shuffle,()=>reach(handle().x)],380),go:()=>begin(3,()=>W.d.sparks>=SPARKS)},
{h:'Keep it or lose it',p:'Each object was rubbed while you held it. Tap one, then tap the box it belongs in.',
 predict:{q:'You rub a metal spoon while holding it. Will it pick up paper?',opts:['Yes, just like a plastic ruler','No, its charge flows away through you'],ans:1},task:'Sort all 6 objects',
 show:()=>replay(4,ITEMS.map((q,i)=>()=>place(i,q.k)),420),go:()=>begin(4,()=>W.e.done.length>=ITEMS.length)},
{h:'Challenge',p:'',go:()=>{fresh();quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>W.after()});
function fix(t){let m='Rubbing moves electrons; like charges repel and unlike charges attract.';
 if(t==='plus')m='Only electrons move, and they are negative. Losing electrons leaves something positive.';
 if(t==='make')m='Charge is never made or destroyed: rubbing only moves electrons from one thing to another.';
 if(t==='like')m='Like charges repel. Two negative balloons push each other apart.';
 if(t==='gap')m='Electric forces act across a gap, without touching.';
 if(t==='neutral')m='A charged object pulls on neutral bits too: it moves their electrons, leaving the near side with the opposite charge.';
 if(t==='spark')m='In a spark the extra electrons jump to the metal, so you end up neutral.';
 if(t==='metal')m='Metals do gain charge, but they are conductors: it flows away through your hand to the ground.';
 return m}
function quiz(){n++;const Q=QS[n%QS.length],all=[[Q.a,'ok'],...Q.o],r=n%3,ord=all.slice(r).concat(all.slice(0,r));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const grp=box.querySelector('.fl-pick');ord.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},grp,v).onclick=()=>grade(t,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(t,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb'),ok=t==='ok';if(ok)A.win();else A.sound.miss();
 fb.innerHTML=(ok?`✓ Yes: ${a}.`:'✗ '+fix(t))+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=quiz;c.say(ok?'Yes.':fix(t))}
FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:Z=>{box.hidden=Z.step!==5;dock.hidden=Z.step===5;controls()},
 init:Z=>{A=Z;g=A.ctx;const w=c.el('div',{class:'fl-below'},A.below);dock=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Static lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});controls()}}).start()})})();
