/* Flagship – if I get lost: stop, stay and ask a safe helper (Personal & Social, Responsible Decision-Making, ages
   4-5; NCMEC KidSmartz, Kidpower, PSHE Association KS1 Keeping safe, DfE Relationships Education 2019 Being safe).
   A lost child in a shop, a park and a zoo: stop and stay inside (running off, hiding, the car park and the gate are
   wrong turns); drag the child to a safe helper in the shop (the till, a mum with her child, a police officer, never
   the car park door, a dog or a hiding place); tell the helper three useful things; stay with the helper when
   someone says "come with me"; then get ready for a busy trip. Data and drawings: lost_art.js. */
(()=>{const L=LST;
VIS.reg('flaglost',c=>{let A,tray,chal,qn=-1,epoch=0,grab=null;const S={};c.fig.classList.add('young');
const MODES=['first','who','tell','stay','ready','quiz'],mode=()=>MODES[A.step];
const within=(p,b)=>!!b&&p.x>=b.x&&p.x<=b.x+b.w&&p.y>=b.y&&p.y<=b.y+b.h;
let SPOTS=[],HOME=null;
const fs=n=>A.narrow?n:Math.round(n*1.1),dark=()=>A.col.dark,ink=()=>dark()?'#f1f5f9':L.INK;
function lines(t,max,font){const g=A.ctx;g.font=font;const out=[];let cur='';for(const w of String(t).split(' ')){const nx=cur?cur+' '+w:w;if(cur&&g.measureText(nx).width>max){out.push(cur);cur=w}else cur=nx}if(cur)out.push(cur);return out}
/* the heading strip at the top of the canvas, then the latest reply under it; returns the first free y */
function banner(head,tone){const g=A.ctx,f=`800 ${fs(17)}${L.FONT}`,rows=lines(head,A.W-34,f),lh=fs(17)*1.3,h=rows.length*lh+14;
 g.fillStyle=tone==='ok'||tone==='quiz'?(dark()?'#14532d':'#dcfce7'):tone==='no'?(dark()?'#7f1d1d':'#fee2e2'):(dark()?'#1e293b':'#ffffff');L.box(g,8,8,A.W-16,h,10);g.fill();
 g.lineWidth=tone?2.5:1.2;g.strokeStyle=tone==='ok'||tone==='quiz'?L.OK:tone==='no'?L.NO:L.RIM;g.stroke();g.font=f;g.fillStyle=ink();g.textAlign='left';g.textBaseline='top';rows.forEach((r,i)=>g.fillText(r,17,15+i*lh));
 /* the reply area keeps the same height, so the scene never jumps when a reply appears */
 let y=h+14;const keep=A.narrow?3:2;if(S.msg){const f2=`700 ${fs(15)}${L.FONT}`,R=lines(S.msg,A.W-34,f2).slice(0,keep);g.font=f2;g.fillStyle=S.bad?(dark()?'#fca5a5':L.NO):(dark()?'#86efac':L.OK);R.forEach((r,i)=>g.fillText(r,17,y+i*fs(15)*1.3))}if(tone!=='quiz')y+=keep*fs(15)*1.3+6;return y}
/* a tappable answer tile */
function tile(r,word,o){o=o||{};const g=A.ctx;g.fillStyle=o.no?'#fee2e2':o.ok?'#dcfce7':'#ffffff';L.box(g,r.x,r.y,r.w,r.h,12);g.fill();g.lineWidth=o.no||o.ok?4:1.8;g.strokeStyle=o.no?L.NO:o.ok?L.OK:L.RIM;g.stroke();
 if(o.e)L.emo(g,o.e,r.x+r.w/2,r.y+r.h*.36,Math.min(r.w,r.h)*.36);if(!word)return;let n=fs(o.n||16),R;for(;;){R=lines(word,r.w-14,`800 ${n}${L.FONT}`);if(R.length*n*1.2<=(o.e?r.h*.42:r.h-8)||n<=12)break;n--}
 g.font=`800 ${n}${L.FONT}`;g.fillStyle=L.INK;g.textAlign='center';g.textBaseline='middle';const cy=o.e?r.y+r.h*.76:r.y+r.h/2;R.forEach((s,i)=>g.fillText(s,r.x+r.w/2,cy+(i-(R.length-1)/2)*n*1.2))}
function layout(n,top,cols,maxH){const gap=10,rows=Math.ceil(n/cols),w=(A.W-16-gap*(cols-1))/cols,h=Math.min((A.H-top-8)/rows-gap,maxH);return Array.from({length:n},(_,i)=>({i,x:8+(i%cols)*(w+gap),y:top+Math.floor(i/cols)*(h+gap),w,h}))}
const sceneBox=(y0,f)=>({x:8,y:y0,w:A.W-16,h:(A.H-y0-8)*f});
/* the right answer moves round the three slots, so it is never always first */
const order=(okText,wrong,k)=>{const all=[[okText,'ok'],...wrong],s=(k+1)%all.length;return all.slice(s).concat(all.slice(0,s))};
/* ---- rounds: the first move (step 1) and staying with the helper (step 4) share one round engine ---- */
const ROUNDS={first:L.FIRST,stay:L.STAY};
function roundPick(j){const R=S.r,list=ROUNDS[mode()];if(R.k>=list.length||R.wait)return;const cur=list[R.k],[,tag]=order(cur.ok,cur.o,R.k)[j];
 if(tag!=='ok'){R.miss=j;A.sound.miss();return say(why(tag),true)}
 R.miss=-1;R.wait=true;R.good=true;A.sound.pop();say(mode()==='first'?'Yes. You stopped and stayed inside.':'Yes. Stay with the helper, inside.',false);const e0=epoch;
 setTimeout(()=>{if(e0!==epoch)return;R.wait=false;R.good=false;R.k++;say(R.k>=list.length?'All 3 right. Well done!':`Next: ${list[R.k].cue}`,false)},700)}
function paintRounds(){const R=S.r,list=ROUNDS[mode()],fin=R.k>=list.length,cur=list[Math.min(R.k,list.length-1)],g=A.ctx;
 const y0=banner(fin?L.DONE[A.step]:`${cur.cue} (${R.k+1} of 3)`,fin?'ok':S.bad?'no':''),r=sceneBox(y0,.44),s=Math.min(r.h*.42,r.w*.2);
 L.place(g,r,mode()==='first'?cur.place:'shop',dark());
 if(mode()==='stay'){L.emo(g,'\u{1F9D1}\u200D\u{1F4BC}',r.x+r.w*.2,r.y+r.h*.5,s);L.till(g,r.x+r.w*.2,r.y+r.h*.5,s);if(fin)L.emo(g,'\u{1F469}',r.x+r.w*.82,r.y+r.h*.5,s)}
 L.kid(g,r.x+r.w*(mode()==='stay'?.42:.55),r.y+r.h*.62,s,fin||R.good?'ok':'lost');
 if(fin){SPOTS=[];return}const opts=order(cur.ok,cur.o,R.k);SPOTS=layout(3,r.y+r.h+10,A.narrow?1:3,84);SPOTS.forEach((b,i)=>tile(b,opts[i][0],{no:R.miss===i}))}
/* ---- step 2: drag the child to a safe helper ---- */
function whoPick(i){const W=S.w,x=L.WHO[i];if(W.found.includes(i))return;
 if(!x.ok){W.miss=i;A.sound.miss();return say(why(x.k),true)}
 W.found.push(i);W.miss=-1;A.sound.pop();say(W.found.length>=3?'3 safe helpers found!':`${x.t}: a safe helper. ${W.found.length} of 3.`,false)}
function paintWho(){const W=S.w,fin=W.found.length>=3,g=A.ctx,y0=banner(fin?L.DONE[1]:`Drag the child to a safe helper. ${W.found.length} of 3 found.`,fin?'ok':S.bad?'no':''),r=sceneBox(y0,1);
 g.fillStyle=dark()?'#1e3a8a':'#dbeafe';L.box(g,r.x,r.y,r.w,r.h,12);g.fill();g.fillStyle=dark()?'#334155':'#f8fafc';g.fillRect(r.x+8,r.y+r.h*.55,r.w-16,r.h*.45-8);
 const s=Math.min(r.w*.17,r.h*.21);SPOTS=L.WHO.map((x,i)=>{const cx=r.x+r.w*x.x,cy=r.y+r.h*x.y,b={i,x:cx-s*.9,y:cy-s*.8,w:s*1.8,h:s*1.6};
  g.fillStyle=W.found.includes(i)?'#dcfce7':W.miss===i?'#fee2e2':'rgba(255,255,255,.75)';L.box(g,b.x,b.y,b.w,b.h,12);g.fill();g.lineWidth=W.found.includes(i)||W.miss===i?4:1.5;g.strokeStyle=W.found.includes(i)?L.OK:W.miss===i?L.NO:L.RIM;g.stroke();
  const ey=cy-s*.2;if(x.e2){L.emo(g,x.e,cx-s*.22,ey,s*.72);L.emo(g,x.e2,cx+s*.3,ey+s*.1,s*.5)}else L.emo(g,x.e,cx,ey,s*.72);if(x.till)L.till(g,cx,ey,s*.72);
  const f=`800 ${fs(13)}${L.FONT}`,R=lines(x.s,b.w-8,f).slice(0,2);g.font=f;g.fillStyle=L.INK;g.textAlign='center';g.textBaseline='middle';R.forEach((t,k)=>g.fillText(t,cx,cy+s*(R.length>1?.38:.5)+k*fs(13)*1.15));
  if(W.found.includes(i))L.emo(g,'\u2705',b.x+b.w-10,b.y+10,18);return b});
 HOME={x:r.x+r.w/2,y:r.y+r.h*.55,s:s*.8};const at=grab||HOME;L.kid(g,at.x,at.y,HOME.s,fin?'ok':'lost')}
/* ---- step 3: what to tell the helper ---- */
function tellPick(i){const T=S.t,x=L.TELL[i];if(T.got.includes(i))return;if(!x.ok){T.miss=i;A.sound.miss();return say(why(x.k),true)}
 T.got.push(i);T.miss=-1;A.sound.pop();say(T.got.length>=3?'Now the helper can call Mum.':`Good: that helps. ${T.got.length} of 3.`,false)}
function paintTell(){const T=S.t,fin=T.got.length>=3,g=A.ctx,y0=banner(fin?L.DONE[2]:`The helper asks, \u201CWhat is your name? Who are you with?\u201D Tap 3 useful answers: ${T.got.length} of 3.`,fin?'ok':S.bad?'no':'');
 const s=Math.min(A.W*.12,64);L.emo(g,'\u{1F9D1}\u200D\u{1F4BC}',8+s*.7,y0+s*.6,s);L.kid(g,A.W-8-s*.9,y0+s*.65,s*.85,fin?'ok':'lost');
 if(fin)L.bubble(g,8+s*1.5,y0+4,A.W-16-s*3.3,'Thank you, Sam. I am calling Ana now.',fs(15),dark());
 SPOTS=layout(6,y0+s*1.4+10,A.narrow?2:3,86);SPOTS.forEach((b,i)=>tile(b,L.TELL[i].t,{ok:T.got.includes(i),no:T.miss===i,n:15}))}
/* ---- step 5: get ready for a busy trip ---- */
function readyPick(i){const D=S.d,x=L.READY[i];if(D.got.includes(i))return;if(!x.ok){D.miss=i;A.sound.miss();return say(why(x.k),true)}
 D.got.push(i);D.miss=-1;A.sound.pop();say(D.got.length>=3?'Ready to go!':`${x.t}: ready. ${D.got.length} of 3.`,false)}
function paintReady(){const D=S.d,fin=D.got.length>=3,y0=banner(fin?L.DONE[4]:`A busy day out. Tap 3 things that help if you get lost: ${D.got.length} of 3.`,fin?'ok':S.bad?'no':'');
 SPOTS=layout(6,y0+4,A.narrow?2:3,130);SPOTS.forEach((b,i)=>{const x=L.READY[i];tile(b,x.t,{e:x.e,ok:D.got.includes(i),no:D.miss===i,n:14})})}
/* ---- wiring ---- */
const PAINT={first:paintRounds,who:paintWho,tell:paintTell,stay:paintRounds,ready:paintReady},PICK={first:roundPick,who:whoPick,tell:tellPick,stay:roundPick,ready:readyPick};
function draw(){const g=A.ctx;g.fillStyle=dark()?'#0f172a':'#f8fafc';g.fillRect(0,0,A.W,A.H);const m=mode();
 if(m==='quiz'){const y0=banner('Challenge: lost and found','quiz'),r=sceneBox(y0,.8),s=Math.min(r.h*.4,r.w*.2);L.place(g,r,'shop',dark());L.kid(g,r.x+r.w*.4,r.y+r.h*.6,s,'ok');L.emo(g,'\u{1F469}',r.x+r.w*.66,r.y+r.h*.6,s);return}
 PAINT[m]();A.fx.draw(g)}
function down(p){if(mode()==='who'&&HOME&&Math.hypot(p.x-HOME.x,p.y-HOME.y)<HOME.s*.9&&S.w.found.length<3){grab={x:p.x,y:p.y};A.redraw();return true}
 const b=SPOTS.find(q=>within(p,q));if(b)PICK[mode()](b.i);return false}
function move(p){if(grab){grab={x:p.x,y:p.y};A.redraw()}}
function up(p){if(!grab)return;grab=null;const b=SPOTS.find(q=>within(p,q));if(b)whoPick(b.i);else A.redraw()}
function fresh(){epoch++;grab=null;for(const k in S)delete S[k];Object.assign(S,{r:{k:0,miss:-1,wait:false,good:false},w:{found:[],miss:-1},t:{got:[],miss:-1},d:{got:[],miss:-1},msg:null,bad:false,goal:()=>{}})}
function say(t,bad){S.msg=t;S.bad=!!bad;c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();S.goal()}
function begin(i,met){fresh();c.say(L.DESC[i]);A.cv.setAttribute('aria-label',L.DESC[i]);S.goal=()=>{if(A.step===i&&met()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(L.DONE[i]+A.reveal(i))};controls();A.redraw()}
function auto(i,acts,gap){steps[i].go();const e0=epoch;acts.reduce((t,f)=>{t+=gap||560;setTimeout(()=>{if(e0===epoch)f()},t);return t},0)}
const okIndex=(list,k)=>order(list[k].ok,list[k].o,k).findIndex(x=>x[1]==='ok');
function controls(){if(!tray)return;tray.innerHTML='';const m=mode(),add=(t,f,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},tray,t).onclick=f};
 if((m==='first'||m==='stay')&&S.r.k<ROUNDS[m].length){const cur=ROUNDS[m][S.r.k];order(cur.ok,cur.o,S.r.k).forEach(([t],j)=>add(t,()=>roundPick(j),`${cur.cue} ${t}`))}
 if(m==='who'&&S.w.found.length<3)L.WHO.forEach((x,i)=>{if(!S.w.found.includes(i))add(x.t,()=>whoPick(i),`Go to: ${x.t}`)});
 if(m==='tell'&&S.t.got.length<3)L.TELL.forEach((x,i)=>{if(!S.t.got.includes(i))add(x.t,()=>tellPick(i),`Tell the helper: ${x.t}`)});
 if(m==='ready'&&S.d.got.length<3)L.READY.forEach((x,i)=>{if(!S.d.got.includes(i))add(x.t,()=>readyPick(i),`Before a busy trip: ${x.t}`)})}
const steps=[
{h:'Stop and stay',p:L.TXT[0],predict:{q:'You cannot see Mum in the shop. Should you run to look for her?',opts:['Yes, run and look','No, stop and stay in the shop'],ans:1},task:'Choose the first thing to do in 3 places',
 show:()=>auto(0,L.FIRST.map((_,k)=>()=>roundPick(okIndex(L.FIRST,k))),1000),go:()=>begin(0,()=>S.r.k>=L.FIRST.length)},
{h:'Safe helpers',p:L.TXT[1],predict:{q:'Who is the best person to ask in a shop?',opts:['Someone outside in the car park','A person at the till'],ans:1},task:'Drag the child to 3 safe helpers',
 show:()=>auto(1,L.WHO.map((x,i)=>x.ok?()=>whoPick(i):null).filter(Boolean)),go:()=>begin(1,()=>S.w.found.length>=3)},
{h:'Say who you are',p:L.TXT[2],task:'Tell the helper 3 useful things',
 show:()=>auto(2,L.TELL.map((x,i)=>x.ok?()=>tellPick(i):null).filter(Boolean)),go:()=>begin(2,()=>S.t.got.length>=3)},
{h:'Stay with the helper',p:L.TXT[3],predict:{q:'A kind man says, \u201CCome with me, I know where your mum is.\u201D Do you go?',opts:['Yes, he is kind','No, I stay with the helper'],ans:1},task:'Choose what to do 3 times',
 show:()=>auto(3,L.STAY.map((_,k)=>()=>roundPick(okIndex(L.STAY,k))),1000),go:()=>begin(3,()=>S.r.k>=L.STAY.length)},
{h:'Be ready',p:L.TXT[4],task:'Tap 3 things that help',
 show:()=>auto(4,L.READY.map((x,i)=>x.ok?()=>readyPick(i):null).filter(Boolean)),go:()=>begin(4,()=>S.d.got.length>=3)},
{h:'Challenge',p:'',go:()=>{fresh();ask()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>S.goal()});
/* each wrong turn gets its own reply */
function why(tag){let m='Stop, stay inside, and ask a safe helper: a person who works there, a police officer or a mum with children.';
 if(tag==='run')m='Running off to look makes you harder to find. Stop where you are, and stay inside.';
 if(tag==='out')m='The car park, the gate and the road have cars, and your grown-up will look for you inside. Stay inside.';
 if(tag==='hide')m='If you hide, nobody can find you or help you. Stay where people can see you, and ask a helper.';
 if(tag==='go')m='Never go off with anyone, even if they say they know your grown-up. Say no, and stay with the helper.';
 if(tag==='dog')m='An animal cannot call your grown-up. Ask a person who works there, or a mum with children.';
 if(tag==='off')m='That is true, but it does not help find Mum. Say your name and your grown-up\u2019s name.';
 if(tag==='alone')m='Going off on your own can get you more lost. Stay with the helper while they call your grown-up.';
 if(tag==='ahead')m='Running ahead is how children get lost. Stay close to your grown-up in busy places.';
 if(tag==='seek')m='Hiding games in a busy shop can turn into really getting lost. Save hide and seek for home.';
 if(tag==='sweets')m='Never take sweets or go with someone you do not know. Stay close to your grown-up.';
 return m}
function ask(){qn++;const Q=L.QS[qn%L.QS.length],opts=order(Q.a,Q.o,qn);
 chal.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Choose an answer"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const row=chal.querySelector('.fl-pick');opts.forEach(([v,t])=>{c.el('button',{type:'button',class:'lbtn'},row,v).onclick=()=>mark(t,Q.a)});c.say('Challenge: '+Q.q);A.cv.setAttribute('aria-label','Challenge: '+Q.q);A.redraw()}
function mark(t,a){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),right=t==='ok';if(right)A.win();else A.sound.miss();
 fb.innerHTML=(right?`\u2713 Yes: ${a}`:'\u2717 '+why(t))+' <button type="button" class="linkish">Next one \u2192</button>';fb.querySelector('button').onclick=ask;c.say(right?'Yes.':why(t))}
FK.shell(c,{steps,ratio:.72,tall:1.5,draw,onStep:X=>{chal.hidden=X.step!==5;tray.hidden=X.step===5;controls()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);tray=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Getting lost lab buttons'},w);chal=c.el('div',{class:'fl-chal'},A.below);fresh();A.gest({down,move,up});controls()}}).start()})})();
