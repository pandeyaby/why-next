/* Flagship – rules that keep us safe (ages 3–4, with a grown-up): hold hands and wait for the cars before crossing;
   walk, not run, past toys on the floor; sort hot things from things that are fine to touch (a teapot can be hot with
   no steam); match each rule to the reason it keeps us safe; then pick the safe choice in three quick moments. */
(()=>{
 const HOT=[['teapot','🫖',1],['teddy','🧸',0],['candle','🕯️',1],['apple','🍎',0]];
 const RULES=[['Hold hands by the road','🤝'],['Walk inside','🚶'],['Stay away from hot things','🔥'],['Stay with your grown-up in the shop','🛒']];
 const WHYS=[['Cars are big and fast','🚗',0],['We can trip and bump','🤕',1],['Hot things can burn','✋',2],['We can get lost','🔍',3]],ORDER=[2,0,3,1];
 const MOMENTS=[['Your ball rolls into the road!','⚽',[['🙋 Tell a grown-up',1],['🏃 Run and get it',0,'Stop! Cars are fast and may not see you. A grown-up can get the ball.']]],
  ['The pan on the cooker smells yummy.','🍳',[['✋ Touch the pan',0,'Ouch! A pan can burn you, even with no fire you can see.'],['👀 Look from far away',1]]],
  ['At the shop you see the toys.','🧸',[['🤝 Stay with your grown-up',1],['🏃 Go off on your own',0,'You could get lost. Stay where your grown-up can see you.']]]];
VIS.reg('flagsafe',c=>{let A,pad,quiz;c.fig.classList.add('young');
 const s={tok:0,cb:()=>{}};
 const view=()=>['road','walk','hot','why','pick','quiz'][A.step];
 function tell(t){c.say(t);if(A)A.cv.setAttribute('aria-label',t)}
 const fs=n=>A.narrow?n:Math.round(n*1.2);
 function txt(g,t,x,y,n,col,wt){g.font=`${wt||800} ${fs(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(t,x,y,A.W-16)}
 function emo(g,e,x,y,n){g.font=`${Math.round(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
 function card(g,r,col,on,a){g.fillStyle=A.alpha(col,a||.14);A.paint.rrect(r.x,r.y,r.w,r.h,14);g.fill();g.strokeStyle=col;g.lineWidth=on?4:2;g.stroke()}
 const hit=(p,r)=>p.x>=r.x&&p.x<=r.x+r.w&&p.y>=r.y&&p.y<=r.y+r.h;
 const tag=(t,x,y,bg)=>A.paint.label(t,x,y,{font:`800 ${fs(12)}px system-ui,sans-serif`,bg});
 const em=()=>Math.min(A.W*.11,A.H*.13);

 // ---------- 1. the road ----------
 const roadY=()=>[A.H*.3,A.H*.66];
 function road(g){const C=A.col,[t,b]=roadY();g.fillStyle=A.mix('#d1d5db',C.pn,C.dark?.45:.1);g.fillRect(0,0,A.W,t);g.fillRect(0,b,A.W,A.H-b);g.fillStyle='#1f2937';g.fillRect(0,t,A.W,b-t);g.fillStyle='#f8fafc';g.fillRect(0,t-3,A.W,3);g.fillRect(0,b,A.W,3);
  g.strokeStyle='#fde68a';g.lineWidth=3;g.setLineDash([18,14]);g.beginPath();g.moveTo(0,(t+b)/2);g.lineTo(A.W,(t+b)/2);g.stroke();g.setLineDash([]);
  s.cars.forEach(k=>emo(g,'🚗',k.x,(t+b)/2,em()*1.1));const y=s.kid.y,n=em();emo(g,'🧑',A.W*.5-n*.55,y,n*1.15);emo(g,'🧒',s.kid.x,y+n*.12,n*.9);
  if(s.hold)emo(g,'🤝',A.W*.5,y-n*.85,n*.6);if(s.hold&&!s.crossed)tag(s.clear?'road clear':'car coming!',A.W*.5,A.H*.06+8,s.clear?'#047857':'#b91c1c')}
 function holdHands(){if(s.hold)return;s.hold=1;s.kid.x=A.W*.5+em()*.5;A.sound.pop();say('You hold hands. Now stop, look and listen.');traffic()}
 function traffic(){const k=s.tok;s.clear=0;let n=0;const go=()=>{if(k!==s.tok)return;if(n++>=2){s.clear=1;say('No more cars. The road is clear.');return}
   const car={x:A.W+50};s.cars.push(car);A.sound.whoosh();A.tween(car,{x:-60},A.reduced()?1:1300,'io',()=>{s.cars=s.cars.filter(z=>z!==car);go()})};go()}
 function cross(){if(s.crossed)return;if(!s.hold){A.sound.miss();return say('Wait! Cars are big and fast.')}
  if(!s.clear){A.sound.miss();return say('Stop! A car is coming. Wait on the path.')}
  s.crossed=1;A.sound.tick();A.tween(s.kid,{y:A.H*.17},A.reduced()?1:1200,'io',()=>say('Safe across! You held hands and waited for the cars.'))}

 // ---------- 2. walk inside ----------
 function hall(g){const C=A.col,fy=A.H*.72,n=em();g.fillStyle=A.alpha('#d6a96b',.4);g.fillRect(0,fy,A.W,A.H-fy);emo(g,'🚪',A.W*.9,fy-n*.75,n*1.6);
  emo(g,'🧱',A.W*.5,fy-n*.3,n*.7);emo(g,'🚗',A.W*.6,fy-n*.3,n*.6);const w=s.who;emo(g,w.hurt?'🤕':'🧒',w.x,w.y,n);
  if(w.hurt)tag('bump! ouch',w.x,w.y-n*.9,'#b91c1c');if(w.home)tag('safe at the door',A.W*.75,A.H*.12,'#047857')}
 function move(run){const w=s.who;if(w.busy||w.home)return;w.busy=1;w.hurt=0;w.x=A.W*.1;const fy=A.H*.72-em()*.5;w.y=fy;
  if(run){A.sound.whoosh();A.tween(w,{x:A.W*.47},A.reduced()?1:500,'out',()=>{w.hurt=1;w.busy=0;A.sound.miss();say('Kit ran and tripped on the toys. Ouch! Running inside, we can trip and bump. Try walking.')})}
  else{A.sound.tick();A.tween(w,{x:A.W*.8},A.reduced()?1:2200,'io',()=>{w.busy=0;w.home=1;say('Kit walked, saw the toys and stepped round them. Safe at the door!')})}}

 // ---------- 3. hot or OK ----------
 const binR=i=>{const gap=12,w=(A.W-gap*3)/2;return{x:gap+i*(w+gap),y:A.H*.44,w,h:A.H*.52}};
 const tileR=i=>{const gap=10,w=(A.W-gap*5)/4,h=Math.min(96,A.H*.26);return{x:gap+i*(w+gap),y:A.H*.05,w,h}};
 const todo=()=>HOT.map((h,i)=>i).filter(i=>s.put[i]==null);
 function kitchen(g){const C=A.col;[['🔥 Hot! Stay away',C.rd],['✋ OK to touch',C.gr]].forEach(([t,col],b)=>{const r=binR(b);card(g,r,col,0,.1);txt(g,t,r.x+r.w/2,r.y+22,13,C.tx);
   HOT.forEach((h,i)=>{if(s.put[i]===b){const j=HOT.filter((z,q)=>q<i&&s.put[q]===b).length;emo(g,h[1],r.x+r.w*(.3+j*.4),r.y+r.h*.55,em()*1.1)}})});
  todo().forEach(i=>{let r=tileR(i);if(s.grab===i&&s.at)r={...r,x:s.at.x-r.w/2,y:s.at.y-r.h/2};card(g,r,s.oops===i?C.rd:i===todo()[0]?C.or:C.mu,i===todo()[0],.14);
   emo(g,HOT[i][1],r.x+r.w/2,r.y+r.h*.42,Math.min(40,r.h*.45));txt(g,HOT[i][0],r.x+r.w/2,r.y+r.h*.85,12,C.tx,700)});
  const i=todo()[0];txt(g,i==null?'All sorted!':`The ${HOT[i][0]}: hot, or OK to touch?`,A.W/2,A.H*.37,13,i==null?C.gr:C.tx)}
 function put(i,b){if(i==null||s.put[i]!=null)return;const[n,,hot]=HOT[i];s.grab=null;s.at=null;
  if((b===0)!==!!hot){s.oops=i;A.sound.miss();return say(hot?`Careful! A ${n} can be hot and burn you${n==='teapot'?', even with no steam you can see':''}. Keep away.`:`A ${n} is not hot. It is OK to touch.`)}
  s.put[i]=b;s.oops=null;A.sound.pop();say(hot?`Yes! Stay away from the ${n}. It can burn.`:`Yes! The ${n} is OK to touch.`)}

 // ---------- 4. why the rule ----------
 const ruleR=i=>({x:8,y:A.H*(.04+i*.24),w:A.W*.46,h:A.H*.2}),whyR=j=>({x:A.W*.52,y:A.H*(.04+j*.24),w:A.W*.46,h:A.H*.2});
 const open=()=>RULES.map((r,i)=>i).filter(i=>s.link[i]==null);
 function reasons(g){const C=A.col,on=s.pickRule!=null?s.pickRule:open()[0];
  RULES.forEach(([t,e],i)=>{const r=ruleR(i),ok=s.link[i]!=null;card(g,r,ok?C.gr:i===on?C.or:C.mu,i===on,.12);emo(g,e,r.x+r.h*.4,r.y+r.h/2,r.h*.42);
   g.font=`700 ${fs(11)}px system-ui,sans-serif`;g.textAlign='left';g.fillStyle=C.tx;wrap(g,t,r.x+r.h*.8,r.y+r.h/2,r.w-r.h*.85)});
  ORDER.forEach((w,j)=>{const[t,e]=WHYS[w],r=whyR(j),ok=Object.values(s.link).includes(w);card(g,r,ok?C.gr:s.miss===w?C.rd:C.cy,0,.1);emo(g,e,r.x+r.h*.4,r.y+r.h/2,r.h*.42);
   g.font=`700 ${fs(11)}px system-ui,sans-serif`;g.textAlign='left';g.fillStyle=C.tx;wrap(g,t,r.x+r.h*.8,r.y+r.h/2,r.w-r.h*.85);
   if(ok){const i=+Object.keys(s.link).find(i=>s.link[i]===w);emo(g,RULES[i][1],r.x+r.w-14,r.y+14,r.h*.24)}})}
 function wrap(g,t,x,y,w){const ws=t.split(' '),L=[];let l='';ws.forEach(z=>{const m=l?l+' '+z:z;if(g.measureText(m).width>w&&l){L.push(l);l=z}else l=m});L.push(l);
  const lh=fs(11)*1.2;g.textBaseline='middle';L.forEach((q,k)=>g.fillText(q,x,y+(k-(L.length-1)/2)*lh))}
 function link(i,w){if(i==null||s.link[i]!=null)return;if(w!==i){s.miss=w;A.sound.miss();return say(`"${WHYS[w][0]}" is the reason for a different rule. Why do we ${RULES[i][0].toLowerCase()}?`)}
  s.link[i]=w;s.miss=null;s.pickRule=null;A.sound.pop();say(`Yes! ${RULES[i][0]}, because ${WHYS[w][0].toLowerCase()}.`)}

 // ---------- 5. safe choice ----------
 const sideR=k=>({x:k?A.W*.52:A.W*.02,y:A.H*.42,w:A.W*.46,h:A.H*.5});
 function pick(g){const C=A.col,m=MOMENTS[s.mo];if(!m){txt(g,'Three safe choices!',A.W/2,A.H/2,16,C.gr);return}
  emo(g,m[1],A.W/2,A.H*.14,em()*1.2);txt(g,m[0],A.W/2,A.H*.31,13,C.tx);
  m[2].forEach(([t],k)=>{const r=sideR(k);card(g,r,s.wrongK===k?C.rd:C.or,0,.12);g.font=`800 ${fs(13)}px system-ui,sans-serif`;g.fillStyle=C.tx;g.textAlign='center';
   const[e,...rest]=t.split(' ');emo(g,e,r.x+r.w/2,r.y+r.h*.35,em());txt(g,rest.join(' '),r.x+r.w/2,r.y+r.h*.72,12,C.tx,700)})}
 function choose(k){const m=MOMENTS[s.mo];if(!m)return;const o=m[2][k];if(!o[1]){s.wrongK=k;A.sound.miss();return say(o[2])}
  s.wrongK=null;A.sound.pop();s.mo++;say(`Safe choice: ${o[0].replace(/^\S+\s/,'')}.`+(MOMENTS[s.mo]?' Next: '+MOMENTS[s.mo][0]:''))}

 function draw(A){const{ctx:g,W,H,col:C}=A;g.fillStyle=A.mix(C.pn,'#e0f2fe',C.dark?.04:.35);g.fillRect(0,0,W,H);const v=view();
  if(v==='road')road(g);if(v==='walk')hall(g);if(v==='hot')kitchen(g);if(v==='why')reasons(g);if(v==='pick')pick(g);if(v==='quiz')emo(g,'🦺',W/2,H/2,70);A.fx.draw(g)}

 function say(msg){const v=view();let t='';
  if(v==='road')t=s.crossed?'':!s.hold?'Hold hands first.':s.clear?'Now you can cross.':'Wait for the cars.';
  else if(v==='walk')t=s.who.home?'':'Walk or run to the door.';
  else if(v==='hot')t=todo().length?`Still to sort: ${todo().map(i=>HOT[i][0]).join(', ')}.`:'All sorted.';
  else if(v==='why')t=open().length?`Next rule: ${RULES[open()[0]][0]}.`:'Every rule has its reason.';
  else if(v==='pick')t=MOMENTS[s.mo]?`Pick the safe choice: ${MOMENTS[s.mo][2].map(o=>o[0].replace(/^\S+\s/,'')).join(' or ')}?`:'';else t='Challenge time.';
  tell(((msg||'')+' '+t).trim());pads();s.cb()}
 function pads(){if(!A||!pad)return;pad.innerHTML='';const v=view(),B=(t,f,l)=>{const e=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l||null},pad,t);e.onclick=f};
  if(v==='road'&&!s.crossed){if(!s.hold)B('🤝 Hold hands',holdHands);B('🚶 Cross the road',cross)}
  if(v==='walk'&&!s.who.home){B('🚶 Walk',()=>move(0),'Walk to the door');B('🏃 Run',()=>move(1),'Run to the door')}
  if(v==='hot'&&todo().length){const i=todo()[0];B('🔥 Hot',()=>put(i,0),`The ${HOT[i][0]} is hot, stay away`);B('✋ OK',()=>put(i,1),`The ${HOT[i][0]} is OK to touch`)}
  if(v==='why'&&open().length){const i=s.pickRule!=null?s.pickRule:open()[0];ORDER.forEach(w=>{if(!Object.values(s.link).includes(w))B(WHYS[w][1]+' '+WHYS[w][0],()=>link(i,w))})}
  if(v==='pick'&&MOMENTS[s.mo])MOMENTS[s.mo][2].forEach((o,k)=>B(o[0],()=>choose(k)));A.redraw()}

 function down(p){const v=view();s.at=p;s.from=p;
  if(v==='road'){if(!s.hold&&Math.hypot(p.x-s.kid.x,p.y-s.kid.y)<em()*1.2){s.grab=1;return true}if(p.y<roadY()[1])cross();else holdHands();return false}
  if(v==='walk'){move(p.y<A.H*.5?1:0);return false}
  if(v==='hot'){const i=todo().find(i=>hit(p,tileR(i)));if(i!=null){s.grab=i;s.oops=null;return true}[0,1].forEach(b=>{if(hit(p,binR(b)))put(todo()[0],b)});return false}
  if(v==='why'){const i=RULES.findIndex((r,i)=>hit(p,ruleR(i)));if(i>=0&&s.link[i]==null){s.pickRule=i;pads();return false}
   const j=ORDER.findIndex((w,j)=>hit(p,whyR(j)));if(j>=0)link(s.pickRule!=null?s.pickRule:open()[0],ORDER[j]);return false}
  if(v==='pick'){[0,1].forEach(k=>{if(hit(p,sideR(k)))choose(k)});return false}return false}
 function up(p){const v=view(),far=s.from&&Math.hypot(p.x-s.from.x,p.y-s.from.y)>12;
  if(v==='road'&&s.grab){s.grab=null;if(Math.abs(p.x-A.W*.5)<em()*1.5||!far)holdHands();return}
  if(v==='hot'&&s.grab!=null){const i=s.grab;s.grab=null;s.at=null;const b=[0,1].find(b=>hit(p,binR(b)));if(far&&b!=null)put(i,b);else A.redraw()}}

 const fin=(n,ok,msg)=>()=>{if(A.step===n&&ok()&&(!steps[n].predict||A.pred[n]!=null))A.done(msg+A.reveal(n))};
 const seq=(fns,ms)=>{const k=s.tok;fns.forEach((f,j)=>setTimeout(()=>{if(k===s.tok)f()},A.reduced()?j*20:j*ms))};
 const reset=()=>{s.tok++;s.cb=()=>{};Object.assign(s,{hold:0,clear:0,crossed:0,cars:[],kid:{x:A.W*.72,y:A.H*.84},who:{x:A.W*.1,y:A.H*.72-em()*.5},
  put:{},grab:null,oops:null,link:{},pickRule:null,miss:null,mo:0,wrongK:null})};
 const steps=[
  {h:'By the road',p:'Hold hands with your grown-up. Wait for the cars. Then cross.',task:'Hold hands and cross safely',
   show:()=>{steps[0].go();seq([holdHands],10);seq([()=>{},cross],3000)},go:()=>{reset();say();s.cb=fin(0,()=>s.crossed,'Hold hands, stop, look, then cross.')}},
  {h:'Walk inside',p:'Kit wants to get to the door. Walk or run?',predict:{q:'Kit runs inside. What can happen?',opts:['Kit gets there fine','Kit can trip and bump'],ans:1},
   task:'Get Kit to the door safely',show:()=>{steps[1].go();seq([()=>move(0)],10)},go:()=>{reset();say();s.cb=fin(1,()=>s.who.home,'Walking inside keeps us from tripping.')}},
  {h:'Hot things',p:'Hot things can burn. Sort: hot, or OK to touch?',predict:{q:'The teapot has no steam now. Is it safe to touch?',opts:['Yes, no steam','No, it can still be hot'],ans:1},
   task:'Sort 4 things',show:()=>{steps[2].go();seq(HOT.map((h,i)=>()=>put(i,h[2]?0:1)),500)},go:()=>{reset();say();s.cb=fin(2,()=>!todo().length,'Stay away from hot things, even with no steam.')}},
  {h:'Why the rule?',p:'Every rule has a reason. Tap a rule, then its reason.',task:'Match 4 rules',
   show:()=>{steps[3].go();seq([0,1,2,3].map(i=>()=>link(i,i)),500)},go:()=>{reset();say();s.cb=fin(3,()=>!open().length,'Rules keep us safe. Now you know why.')}},
  {h:'Safe choice',p:'Pick the safe thing to do.',predict:{q:'Your ball rolls into the road. What do you do?',opts:['Run and get it fast','Stop and tell a grown-up'],ans:1},
   task:'Make 3 safe choices',show:()=>{steps[4].go();seq(MOMENTS.map(m=>()=>choose(m[2].findIndex(o=>o[1]))),600)},go:()=>{reset();say();s.cb=fin(4,()=>s.mo>=MOMENTS.length,'Stop and think, then choose the safe way.')}},
  {h:'Challenge',p:'',go:()=>{reset();ask()}}];
 steps.forEach(x=>{if(x.task)x.onPredict=()=>s.cb()});

 const QS=[['Why do we hold hands by the road?','🚸',[['Cars are big and fast','ok'],['To go faster','fast'],['Because it is fun','why']]],
  ['The kettle has stopped. There is no steam. Can you touch it?','🫖',[['No, it can still be hot','ok'],['Yes, no steam means cold','see'],['Yes, if you are quick','fast']]],
  ['You are late for snack. Do you run inside?','🍪',[['No, walk so you do not trip','ok'],['Yes, run fast','fast'],['Yes, if no one sees','why']]],
  ['In the shop, your grown-up is looking at bread. What do you do?','🛒',[['Stay close to them','ok'],['Go to the toys alone','alone'],['Hide to play a game','alone']]],
  ['Your ball rolls into the road. What do you do?','⚽',[['Tell a grown-up','ok'],['Run and get it','fast'],['Wait in the road','why']]],
  ['Which one is hot and can burn?','🔥',[['🕯️ A lit candle','ok'],['🧸 A teddy','why'],['🍎 An apple','see']]]];
 function hint(t){let m='Think: what could hurt you?';
  if(t==='fast')m='Rushing is how we get hurt. Slow down and stay safe.';
  if(t==='see')m='You cannot always see hot. Keep away from cookers, kettles and candles.';
  if(t==='alone')m='On your own you could get lost. Stay where your grown-up can see you.';
  if(t==='why')m='Rules are not just for fun. Each one stops us getting hurt.';
  return m}
 let qn=-1,run=0;
 function ask(){qn++;const[q,e,ops]=QS[qn%QS.length],r=qn%3;
  quiz.innerHTML=`<p><b>${e} ${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
  const row=quiz.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},row,o);b.onclick=()=>check(t)});tell('Challenge: '+q);A.redraw()}
 function check(t){quiz.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=quiz.querySelector('.fl-fb'),ok=t==='ok';
  if(ok){run++;A.win()}else{run=0;A.sound.miss()}fb.innerHTML=`${ok?'✓ Yes! Stars: '+run+'.':'✗ '+hint(t)} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=ask}

 A=FK.shell(c,{steps,ratio:.66,tall:1.15,draw,onStep:A=>{quiz.hidden=A.step!==5;pad.hidden=A.step===5;pads()},
  init:A=>{const E=c.el,w=E('div',{class:'fl-below'},A.below);pad=E('div',{class:'fl-ctl',role:'group','aria-label':'Actions'},w);quiz=E('div',{class:'fl-chal'},A.below);
   reset();A.gest({down,move:p=>{s.at=p;if(view()==='road'&&s.grab)s.kid.x=p.x;A.redraw()},up});pads()}});
 A.start()})})();
