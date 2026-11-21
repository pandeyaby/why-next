/* Flagship – think, pair, share (ages 6–7; Lyman 1981; Rowe 1986 wait time; KS1 spoken language). Scenes: drag a
   think timer and watch how many children in a made-up class have an idea, fill your own think bubble with an idea and
   a reason, take turns with Mia and say her idea back, build the "We think… because…" sentence you share, then put
   the three steps in order. Every drag has a tap or button twin. Data in learn/tps_art.js. */
(()=>{const {READY,KIDS,MAXT,GOAL,QUESTION,THINK,MIA,HEARD,ROWS,STEPS,DESC,DONE,QS}=TPS;
VIS.reg('flagtps',c=>{let A,bar,box,round=-1,epoch=0;c.fig.classList.add('young');
const K={text:'#1e293b',yes:'#047857',no:'#b91c1c',line:'#94a3b8',sel:'#1d4ed8',paper:'#ffffff',cream:'#fef9c3',mint:'#dcfce7',blue:'#dbeafe',pink:'#fce7f3'};
const V={};const mode=()=>['wait','think','pair','share','order','quiz'][A.step];
const f=n=>Math.round(A.narrow?n:n*1.12);
const rect=(x,y,w,h)=>({x,y,w,h}),inside=(p,r)=>!!r&&p.x>r.x&&p.x<r.x+r.w&&p.y>r.y&&p.y<r.y+r.h;
/* draw text; long text breaks onto as many lines as it needs inside width w */
function label(s,x,y,n,o){o=o||{};const g=A.ctx;g.font=`${o.b||700} ${f(n)}px system-ui,"Noto Color Emoji",sans-serif`;g.fillStyle=o.c||K.text;g.textAlign='center';g.textBaseline='middle';
 if(!o.w||g.measureText(s).width<=o.w){g.fillText(s,x,y);return}const out=[];let cur='';for(const word of s.split(' ')){const t=cur?cur+' '+word:word;if(g.measureText(t).width>o.w&&cur){out.push(cur);cur=word}else cur=t}out.push(cur);
 const lh=f(n)*1.18;out.forEach((t,i)=>g.fillText(t,x,y+(i-(out.length-1)/2)*lh))}
/* a card; ✓ and ✗ are written in the words too, so colour is never the only cue */
function panel(r,bg,state){const g=A.ctx;g.fillStyle=state==='yes'?'#d1fae5':state==='no'?'#fee2e2':bg||K.paper;A.paint.rrect(r.x,r.y,r.w,r.h,Math.min(14,r.h/3));g.fill();
 g.lineWidth=state?3.5:1.8;g.strokeStyle=state==='yes'?K.yes:state==='no'?K.no:state==='sel'?K.sel:K.line;g.stroke()}
function wash(t){const g=A.ctx;g.fillStyle=A.mix(A.col.pn,t,A.col.dark?.13:.5);g.fillRect(0,0,A.W,A.H)}
function heading(s,done){const r=rect(8,6,A.W-16,A.H*.1);panel(r,done?'':K.paper,done?'yes':'');label(s,A.W/2,r.y+r.h/2,13,{w:r.w-14,b:800})}
/* ---------- 1. think time: how many have an idea? ---------- */
const ready=()=>READY.filter(s=>s<=V.t).length;
const track=()=>({x0:A.W*.1,x1:A.W*.9,y:A.H*.84});
function seat(i){const cols=4,w=(A.W-24)/cols,h=A.H*.16;return rect(12+(i%cols)*w,A.H*.15+Math.floor(i/cols)*h,w-6,h-6)}
function paintWait(){wash(K.blue);heading('Teacher: '+QUESTION,ready()>=GOAL);
 READY.forEach((s,i)=>{const r=seat(i),on=s<=V.t;panel(r,on?K.cream:K.paper,'');label(KIDS[i],r.x+r.w*.35,r.y+r.h*.58,f(22));label(on?'💡':'…',r.x+r.w*.78,r.y+r.h*.3,on?18:16,{c:on?K.text:'#64748b'})});
 const n=ready();label(`Ideas ready: ${n} of ${READY.length}`,A.W/2,A.H*.68,15,{c:A.col.tx,b:800});
 const T=track(),g=A.ctx;g.strokeStyle=A.col.tx;g.lineWidth=6;g.lineCap='round';g.beginPath();g.moveTo(T.x0,T.y);g.lineTo(T.x1,T.y);g.stroke();
 for(let s=0;s<=MAXT;s+=2)label(s+'s',T.x0+(T.x1-T.x0)*s/MAXT,T.y+f(22),11,{c:A.col.tx});
 const kx=T.x0+(T.x1-T.x0)*V.t/MAXT;g.fillStyle=V.hold?K.sel:'#f59e0b';g.beginPath();g.arc(kx,T.y,f(16),0,7);g.fill();g.lineWidth=3;g.strokeStyle=K.text;g.stroke();label('⏱',kx,T.y,14);
 label(`Think time: ${Math.round(V.t)} seconds`,A.W/2,A.H*.76,13,{c:A.col.tx})}
function setT(s,quiet){V.t=Math.max(0,Math.min(MAXT,s));if(quiet)return A.redraw();V.t=Math.round(V.t);const n=ready();A.sound.tick();
 if(n>=GOAL){V.best=1;return speak(`${V.t} seconds: ${n} of ${READY.length} have an idea. Think time lets nearly everyone get there.`)}
 speak(V.t<=1?`${n} of ${READY.length} have an idea. `+why('fast'):`${V.t} seconds: ${n} of ${READY.length} have an idea. Give a little longer.`)}
/* ---------- 2. think: my own idea and a reason ---------- */
const slotR=i=>rect(A.W*.08,A.H*(.17+i*.17),A.W*.84,A.H*.14),thinkCard=i=>{const w=(A.W-30)/2;return rect(10+(i%2)*(w+10),A.H*(.56+Math.floor(i/2)*.17),w,A.H*.14)};
const cloud=()=>rect(A.W*.04,A.H*.13,A.W*.92,A.H*.38);
function paintThink(){wash(K.cream);heading('🤔 '+QUESTION,V.idea&&V.why);const cl=cloud();panel(cl,K.paper,V.over?'sel':V.bad?'no':'');
 [['idea','My idea'],['why','because…']].forEach(([k,n],i)=>{const r=slotR(i);panel(r,K.mint,V[k]?'yes':'');label(V[k]?'✓ '+THINK.find(t=>t.good===k).t:n+' goes here',r.x+r.w/2,r.y+r.h/2,13,{w:r.w-12,c:V[k]?K.text:'#475569'})});
 THINK.forEach((t,i)=>{if(V[t.good])return;let r=thinkCard(i);if(V.carry&&V.carry.i===i)r=rect(V.carry.x-r.w/2,V.carry.y-r.h/2,r.w,r.h);panel(r,K.paper,V.chosen===i||(V.carry&&V.carry.i===i)?'sel':'');label(t.t,r.x+r.w/2,r.y+r.h/2,13,{w:r.w-10})})}
function putThink(i){const t=THINK[i];V.chosen=null;V.over=false;if(t.slip){V.bad=1;A.sound.miss();return speak(why(t.slip))}V[t.good]=1;V.bad=0;A.sound.pop();
 speak(t.good==='idea'?'Your own idea is in your think bubble. Now add a reason.':'A reason with because. Now you have something to say.')}
/* ---------- 3. pair: take turns, then say Mia's idea back ---------- */
const meR=()=>rect(A.W*.04,A.H*.14,A.W*.44,A.H*.3),miaR=()=>rect(A.W*.52,A.H*.14,A.W*.44,A.H*.3),heardR=i=>rect(A.W*.06,A.H*(.58+i*.13),A.W*.88,A.H*.11);
function tokenAt(){if(V.carry)return{x:V.carry.x,y:V.carry.y};const r=V.turn==='mia'?miaR():meR();return{x:r.x+r.w*.85,y:r.y+r.h*.18}}
function paintPair(){wash(K.pink);heading('👫 Take turns, then listen',V.heard);const me=meR(),mia=miaR();
 panel(me,K.paper,V.turn==='me'?'sel':'');label('🧒 Me',me.x+me.w/2,me.y+me.h*.2,14,{b:800});label(V.said?'“Build it in the shade, because the sun melts snow.”':'Tap here to say your idea',me.x+me.w/2,me.y+me.h*.62,12,{w:me.w-12,c:V.said?K.text:'#475569'});
 panel(mia,K.paper,V.turn==='mia'||V.dropHot?'sel':'');label('👧 Mia',mia.x+mia.w/2,mia.y+mia.h*.2,14,{b:800});label(V.turn==='mia'?'“'+MIA+'”':'Waiting for a turn',mia.x+mia.w/2,mia.y+mia.h*.62,12,{w:mia.w-12,c:V.turn==='mia'?K.text:'#475569'});
 const k=tokenAt(),g=A.ctx;g.fillStyle='#f59e0b';g.beginPath();g.arc(k.x,k.y,f(17),0,7);g.fill();g.lineWidth=2.5;g.strokeStyle=K.text;g.stroke();label('🗣️',k.x,k.y,15);
 label(V.turn==='mia'?'What did Mia say?':'The 🗣️ turn: whoever has it talks',A.W/2,A.H*.51,13,{c:A.col.tx,b:800,w:A.W-20});
 if(V.turn==='mia')HEARD.forEach((h,i)=>{const r=heardR(i),st=V.heard&&h.good?'yes':V.wrong===h.k?'no':'';panel(r,K.paper,st);label((st==='yes'?'✓ ':st==='no'?'✗ ':'')+h.t,r.x+r.w/2,r.y+r.h/2,13,{w:r.w-12})})}
function sayMine(){if(V.turn!=='me')return speak('It is Mia’s turn now. Listen to her.');if(V.said){A.sound.miss();return speak(why('hog'))}V.said=1;A.sound.tick();speak('You said your idea and your reason. Now pass the turn to Mia.')}
function passTurn(){if(V.turn==='mia')return;if(!V.said){A.sound.miss();return speak('Say your idea first, then pass the turn. Pairs take turns: one talks, one listens.')}
 V.turn='mia';A.sound.pop();speak(`Mia has the turn. Mia says: “${MIA}” What did Mia say?`)}
function pickHeard(i){if(V.turn!=='mia'||V.heard)return;const h=HEARD[i];if(h.slip){V.wrong=h.k;A.sound.miss();return speak(why(h.slip))}V.heard=1;V.wrong='';A.sound.pop();speak('Yes! Saying it back shows you listened: make it big, because big ones melt slower.')}
/* ---------- 4. share: we think… because… ---------- */
const optR=(r,i)=>rect(A.W*.04+((i+r)%3)*A.W*.32,A.H*(.32+r*.17),A.W*.3,A.H*.15),shareR=()=>rect(A.W*.2,A.H*.84,A.W*.6,A.H*.1);
function paintShare(){wash(K.mint);heading('🙋 Tell the class',V.shared);const said=ROWS.map((R,r)=>V.pick[r]==null?'…':R.o[V.pick[r]][0]).join(' ');
 const s=rect(8,A.H*.13,A.W-16,A.H*.16);panel(s,K.paper,V.shared?'yes':'');label(said,A.W/2,s.y+s.h/2,13,{w:s.w-14});
 ROWS.forEach((R,r)=>R.o.forEach(([t],i)=>{const q=optR(r,i),on=V.pick[r]===i;panel(q,K.paper,on?(V.badRow===r?'no':'sel'):'');label((on?'● ':'')+t,q.x+q.w/2,q.y+q.h/2,11,{w:q.w-8})}));
 const b=shareR();panel(b,K.cream,V.shared?'yes':'');label((V.shared?'✓ ':'')+'Share with the class',b.x+b.w/2,b.y+b.h/2,14,{w:b.w-10,b:800})}
function choose(r,i){V.pick[r]=i;V.badRow=-1;A.sound.tick();speak(`${ROWS[r].n}: ${ROWS[r].o[i][0]}.`)}
function share(){if(V.pick.some(v=>v==null)){A.sound.miss();return speak('Pick one card in each row first: a start, the idea and a reason.')}
 const r=V.pick.findIndex((v,j)=>ROWS[j].o[v][1]);if(r>=0){V.badRow=r;A.sound.miss();return speak(why(ROWS[r].o[V.pick[r]][1]))}
 V.shared=1;A.sound.pop();speak('“We think build it in the shade and make it big, because sun melts snow and big ones melt slower.” Both ideas, and a reason.')}
/* ---------- 5. put the steps in order ---------- */
const numR=i=>{const w=(A.W-32)/3;return rect(8+i*(w+8),A.H*.15,w,A.H*.3)},stepR=i=>rect(A.W*.08,A.H*(.52+i*.14),A.W*.84,A.H*.12);
const mixed=[2,0,1];
function paintOrder(){wash(K.blue);heading('Which comes first?',V.placed.length===3);
 [0,1,2].forEach(i=>{const r=numR(i),s=V.placed.includes(i)?STEPS[i]:null;panel(r,K.paper,s?'yes':V.badSlot===i?'no':V.hotSlot===i?'sel':'');label(String(i+1),r.x+r.w/2,r.y+r.h*.2,18,{b:800});
  if(s){label(s.e,r.x+r.w/2,r.y+r.h*.5,f(24));label('✓ '+s.n,r.x+r.w/2,r.y+r.h*.8,13,{w:r.w-6})}});
 mixed.forEach((k,j)=>{if(V.placed.includes(k))return;const s=STEPS[k];let r=stepR(j);if(V.carry&&V.carry.k===k)r=rect(V.carry.x-r.w/2,V.carry.y-r.h/2,r.w,r.h);
  panel(r,K.paper,V.chosen===k||(V.carry&&V.carry.k===k)?'sel':'');label(`${s.e} ${s.n}: ${s.d}`,r.x+r.w/2,r.y+r.h/2,13,{w:r.w-12})})}
function place(k,slot){V.chosen=null;V.hotSlot=-1;if(V.placed.includes(slot))return speak(`Box ${slot+1} is full. Choose another box.`);
 if(k!==slot){V.badSlot=slot;A.sound.miss();return speak(why(k===2&&slot<2?'order':k===1&&slot===0?'nothink':'order'))}
 V.placed.push(k);V.badSlot=-1;A.sound.pop();speak(`${slot+1}: ${STEPS[k].n}, ${STEPS[k].d}.`)}
/* ---------- why each wrong move is wrong ---------- */
function why(s){let m='Think on your own, then talk with a partner, then share with the class.';
 if(s==='fast')m='Answering straight away means only the fastest few get to think. Wait a few seconds so everyone can.';
 if(s==='shout')m='Shouting out takes away everyone else’s think time. Think quietly first.';
 if(s==='copy')m='Think time is for your own idea. If you just copy, you skip the thinking, and Mia hears her own idea back.';
 if(s==='hog')m='You have had your turn. Pass the turn so your partner can talk too.';
 if(s==='listen')m='When it is your partner’s turn, listen to them. Then you can say their idea back.';
 if(s==='mine')m='That was your idea, not your partner’s. Listen, then say back what they said.';
 if(s==='me')m='Say “we think”: you share the ideas of both of you, not just your own.';
 if(s==='unkind')m='Be kind about your partner’s idea. Say what you both think, even if you think different things.';
 if(s==='onlymine')m='That leaves out Mia’s idea. A share tells the class both your ideas.';
 if(s==='noidea')m='Give a real idea. Your pair talked about ideas, so you have something to say.';
 if(s==='noreason')m='Add a reason with because. A reason helps the class see why you think it.';
 if(s==='order')m='Share comes last. You need your own idea and partner talk before you tell the class.';
 if(s==='nothink')m='Think comes first. If you talk before you think, you just copy your partner.';
 if(s==='time')m='There is a reason: some children need more seconds to have an idea. Waiting lets everyone think.';
 return m}
/* ---------- pointer, drawing and buttons ---------- */
function draw(){const k=mode();if(k==='quiz'){wash(K.cream);heading('Challenge',1);label('🤔 Think · 👫 Pair · 🙋 Share',A.W/2,A.H*.5,15,{c:A.col.tx,w:A.W-20});return}
 ({wait:paintWait,think:paintThink,pair:paintPair,share:paintShare,order:paintOrder})[k]();A.fx.draw(A.ctx)}
function down(p){const k=mode();
 if(k==='wait'){const T=track();if(Math.abs(p.y-T.y)<f(34)&&p.x>T.x0-24&&p.x<T.x1+24){V.hold=1;setT((p.x-T.x0)/(T.x1-T.x0)*MAXT,1);return true}return false}
 if(k==='think'){const i=THINK.findIndex((t,j)=>!V[t.good]&&inside(p,thinkCard(j)));if(i>=0){V.carry={i,x:p.x,y:p.y,sx:p.x,sy:p.y};A.redraw();return true}if(V.chosen!=null&&inside(p,cloud()))putThink(V.chosen);return false}
 if(k==='pair'){const t=tokenAt();if(V.turn==='me'&&Math.hypot(p.x-t.x,p.y-t.y)<f(30)){V.carry={x:p.x,y:p.y,sx:p.x,sy:p.y};return true}
  if(inside(p,meR()))sayMine();else if(inside(p,miaR())&&V.turn==='me')passTurn();else{const i=HEARD.findIndex((_,j)=>inside(p,heardR(j)));if(i>=0)pickHeard(i)}return false}
 if(k==='share'){for(let r=0;r<3;r++)for(let i=0;i<3;i++)if(inside(p,optR(r,i)))return choose(r,i),false;if(inside(p,shareR()))share();return false}
 if(k==='order'){const j=mixed.findIndex((kk,jj)=>!V.placed.includes(kk)&&inside(p,stepR(jj)));if(j>=0){V.carry={k:mixed[j],x:p.x,y:p.y,sx:p.x,sy:p.y};A.redraw();return true}
  const s=[0,1,2].find(i=>inside(p,numR(i)));if(s!=null&&V.chosen!=null)place(V.chosen,s);return false}return false}
function move(p){const k=mode();if(k==='wait'&&V.hold){const T=track();return setT((p.x-T.x0)/(T.x1-T.x0)*MAXT,1)}if(!V.carry)return;V.carry.x=p.x;V.carry.y=p.y;
 if(k==='think')V.over=inside(p,cloud());if(k==='pair')V.dropHot=inside(p,miaR());if(k==='order')V.hotSlot=[0,1,2].find(i=>inside(p,numR(i)))??-1;A.redraw()}
function up(p){const k=mode();if(k==='wait'&&V.hold){V.hold=0;return setT(V.t)}const d=V.carry;if(!d)return;V.carry=null;V.over=V.dropHot=false;const tap=Math.hypot(p.x-d.sx,p.y-d.sy)<10;
 if(k==='think'){if(tap){V.chosen=d.i;return speak(`${THINK[d.i].t}: picked. Tap the think bubble to put it in.`)}if(inside(p,cloud()))return putThink(d.i)}
 if(k==='pair'){if(tap||inside(p,miaR()))return passTurn()}
 if(k==='order'){V.hotSlot=-1;if(tap){V.chosen=d.k;return speak(`${STEPS[d.k].n}: picked. Tap box 1, 2 or 3.`)}const s=[0,1,2].find(i=>inside(p,numR(i)));if(s!=null)return place(d.k,s)}A.redraw()}
function speak(t){c.say(t);A.cv.setAttribute('aria-label',t);A.redraw();controls();V.check()}
function controls(){if(!bar)return;bar.innerHTML='';const k=mode(),btn=(t,fn,l)=>{c.el('button',{type:'button',class:'lbtn','aria-label':l||t},bar,t).onclick=fn};
 if(k==='wait'){btn('⏱ Wait 1 more second',()=>setT(V.t+1));btn('Ask now (0 seconds)',()=>setT(0))}
 if(k==='think')THINK.forEach((t,i)=>{if(!V[t.good])btn(t.t,()=>putThink(i),`Put "${t.t}" in my think bubble`)});
 if(k==='pair'){if(V.turn==='me'){btn('🧒 Say my idea',sayMine);btn('🗣️ Pass the turn to Mia',passTurn)}else if(!V.heard)HEARD.forEach((h,i)=>btn(h.t,()=>pickHeard(i),`Mia said: ${h.t}`))}
 if(k==='share'){ROWS.forEach((R,r)=>R.o.forEach(([t],i)=>btn(t,()=>choose(r,i),`${R.n}: ${t}`)));btn('🙋 Share with the class',share)}
 if(k==='order'){if(V.chosen==null)mixed.filter(x=>!V.placed.includes(x)).forEach(x=>btn(`${STEPS[x].e} ${STEPS[x].n}`,()=>{V.chosen=x;speak(`${STEPS[x].n}: picked. Choose box 1, 2 or 3.`)},`Pick ${STEPS[x].n}`));
  else[0,1,2].filter(i=>!V.placed.includes(i)).forEach(i=>btn(`Put in box ${i+1}`,()=>place(V.chosen,i)))}}
function clean(){epoch++;for(const x in V)delete V[x];Object.assign(V,{t:0,hold:0,best:0,idea:0,why:0,bad:0,over:false,chosen:null,carry:null,turn:'me',said:0,heard:0,wrong:'',dropHot:false,pick:[null,null,null],badRow:-1,shared:0,placed:[],badSlot:-1,hotSlot:-1,check:()=>{}})}
const passed=(i,ok)=>()=>{if(A.step===i&&ok()&&(!steps[i].predict||A.pred[i]!=null)&&!A.isDone)A.done(DONE[i]+A.reveal(i))};
function begin(i,ok){clean();speak(DESC[i]);V.check=passed(i,ok)}
function act(i,list,ms){steps[i].go();const e=epoch;list.forEach((fn,j)=>setTimeout(()=>{if(e===epoch)fn()},ms*(j+1)))}
const steps=[
{h:'Think time',p:'The teacher asks a question. Some children have an idea fast; some need longer. Drag the timer to give more think time.',
 predict:{q:'The teacher picks the first hand straight away. Who got to think?',opts:['Everyone did','Only the fastest few'],ans:1},task:'Give enough think time for 10 of 12 to have an idea',
 show:()=>act(0,[()=>setT(1),()=>setT(3),()=>setT(5)],450),go:()=>begin(0,()=>V.best)},
{h:'Think',p:'Think time is quiet time. Put your own idea in your think bubble, and a reason with because.',
 task:'Fill your think bubble with an idea and a reason',show:()=>act(1,[()=>putThink(0),()=>putThink(1)],500),go:()=>begin(1,()=>V.idea&&V.why)},
{h:'Pair',p:'Now talk with Mia. Whoever has the 🗣️ turn talks. Say your idea, pass the turn to Mia, then show what she said.',
 predict:{q:'While Mia talks, what should you do?',opts:['Think about my next idea','Listen, so I can say her idea back'],ans:1},task:'Take turns, then say Mia’s idea back',
 show:()=>act(2,[sayMine,passTurn,()=>pickHeard(0)],500),go:()=>begin(2,()=>V.heard)},
{h:'Share',p:'Tell the class what your pair thinks. Pick a start, the idea and a reason, then share it.',
 predict:{q:'When you share, whose idea do you tell?',opts:['Just mine','Ours: mine and Mia’s'],ans:1},task:'Share a “We think… because…” sentence',
 show:()=>act(3,[()=>choose(0,0),()=>choose(1,0),()=>choose(2,0),share],400),go:()=>begin(3,()=>V.shared)},
{h:'In order',p:'Drag each step into box 1, 2 or 3 to put think, pair and share in order.',task:'Put the three steps in order',
 show:()=>act(4,[()=>place(0,0),()=>place(1,1),()=>place(2,2)],450),go:()=>begin(4,()=>V.placed.length===3)},
{h:'Challenge',p:'',go:()=>{clean();nextQ()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>V.check()});
function nextQ(){round++;const Q=QS[round%QS.length],all=[[Q.a,''],...Q.o],cut=(round*2)%3,list=all.slice(cut).concat(all.slice(0,cut));
 box.innerHTML=`<p><b>${Q.q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const g=box.querySelector('.fl-pick');list.forEach(([t,s])=>{c.el('button',{type:'button',class:'lbtn'},g,t).onclick=()=>grade(s,Q.a)});c.say('Challenge: '+Q.q);A.redraw()}
function grade(s,a){box.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=box.querySelector('.fl-fb');if(s)A.sound.miss();else A.win();
 fb.innerHTML=(s?'✗ '+why(s):`✓ Yes: ${a}`)+' <button type="button" class="linkish">Next one →</button>';fb.querySelector('button').onclick=nextQ;c.say(s?why(s):'Yes.')}
FK.shell(c,{steps,ratio:.68,tall:1.36,draw,onStep:X=>{box.hidden=X.step!==5;bar.hidden=X.step===5;controls()},
 init:X=>{A=X;const w=c.el('div',{class:'fl-below'},A.below);bar=c.el('div',{class:'fl-ctl',role:'group','aria-label':'Think, pair, share lab buttons'},w);box=c.el('div',{class:'fl-chal'},A.below);clean();A.gest({down,move,up});controls()}}).start()})})();
