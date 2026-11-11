/* Flagship – coping with life changes (ages 5–7): tap the things that are changes (a new baby, a new teacher, moving
   house) and the things that stay the same, fill Mia's heart with mixed feelings about moving, sort what changes and what
   stays the same at Leo's new school, find the grown-ups to talk to, and cool Mia's worry with coping tools. */
(()=>{
const CHG=[['👶','A new baby comes home',1],['🦷','Brush teeth, like every day',0],['🏠','Move to a new house',1],['🧑‍🏫','Get a new teacher',1],['🛏️','Sleep in your own bed',0]];
const FEEL=[['😟','Worried'],['😢','Sad'],['🤩','Excited'],['🤔','Not sure']];
const DAY=[['🏫','A new classroom',0],['📖','Bedtime story with Dad',1],['🧑‍🏫','A new teacher',0],['🧸','Teddy on my bed',1]];
const HELP=[['👩‍🏫','Teacher',1,'Yes! A teacher at school can help.'],['👨','Dad',1,'Yes! Dad loves you and will listen.'],['🧍','A stranger',0,'You do not know a stranger. Tell a grown-up you know and trust.'],
 ['👵','Grandma',1,'Yes! Grandma is a trusted grown-up.'],['📺','The TV',0,'The TV cannot listen to you. Talk to a person you trust.']];
const TOOL=[['🧸','Take a favourite toy',1,'A toy from home feels safe and the same.'],['🌬️','Big, slow breaths',1,'Slow breaths calm your body down.'],['🙈','Hide all day',0,'Hiding keeps the worry inside. Try a tool that helps.'],
 ['🗣️','Talk about it',1,'Saying how you feel makes it smaller.'],['😠','Shout and kick',0,'Shouting can hurt people and it does not fix the worry.'],['🗓️','Make a picture plan',1,'A plan shows what will happen, so there are fewer surprises.']];
VIS.reg('flagadapt',c=>{let L,row,chal,cur=-1,wins=0,ver=0;c.fig.classList.add('young');
const zero=()=>({hand:[],have:[],k:0,hold:null,oops:-1,glow:-1,heat:4,run:()=>{}}),Z=zero();
const part=()=>['spot','heart','same','who','tools','quiz'][L.step],aim=()=>({spot:3,heart:3,same:4,who:3,tools:3}[part()]||99);
const px=n=>Math.round(n*(L.narrow?1.05:1.18));
function announce(t){c.say(t);if(L)L.cv.setAttribute('aria-label',t)}
function txt(g,s,x,y,maxw,n,colr){g.font=`800 ${px(n)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=colr||L.col.tx;const ws=s.split(' '),ls=[];
 for(const w of ws){const last=ls.length?ls[ls.length-1]:null;if(last!=null&&g.measureText(last+' '+w).width<=maxw)ls[ls.length-1]=last+' '+w;else ls.push(w)}
 ls.forEach((l,i)=>g.fillText(l,x,y+(i-(ls.length-1)/2)*px(n)*1.2,maxw))}
function face(g,e,x,y,s){g.font=`${Math.round(s)}px system-ui,sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#000';g.fillText(e,x,y)}
function pill(g,r,bg,stroke,w){g.fillStyle=bg;L.paint.rrect(r.x,r.y,r.w,r.h,18);g.fill();g.strokeStyle=stroke;g.lineWidth=w||2;g.stroke()}
const on=(p,r)=>p.x>r.x-6&&p.x<r.x+r.w+6&&p.y>r.y-6&&p.y<r.y+r.h+6;
const rim=()=>L.mix(L.col.tx,L.col.pn,.42),sheet=()=>L.col.dark?'#1e293b':'#ffffff',wash=(h,k)=>L.mix(L.col.pn,h,L.col.dark?.2:k||.6),okc=()=>L.col.dark?'#4ade80':'#15803d';
/* places on the canvas */
const grid=n=>{const cols=L.narrow?2:3,w=(L.W-16)/cols-10,h=L.H*(L.narrow?.2:.27),y0=L.H*(part()==='tools'?.3:.06);return Array.from({length:n},(_,i)=>({x:8+(i%cols)*(w+10)+5,y:y0+Math.floor(i/cols)*(h+10),w,h}))};
const heartR=()=>({x:L.W*.22,y:L.H*.05,w:L.W*.56,h:L.H*.5});
const faces=()=>{const w=(L.W-20)/4-8,h=L.H*.24;return FEEL.map((_,i)=>({x:10+i*(w+8)+4,y:L.H*.66,w,h}))};
const sides=()=>[0,1].map(i=>({x:i*L.W/2+6,y:L.H*.04,w:L.W/2-12,h:L.H*.66}));
const tray=()=>({x:L.W*.08,y:L.H*.76,w:L.W*.84,h:L.H*.18});
const ring=()=>{const cx=L.W/2,cy=L.H*.5,rx=L.W*.36,ry=L.H*.34,s=Math.min(L.W*.27,L.H*.27,130);return HELP.map((_,i)=>{const a=-Math.PI/2+i*2*Math.PI/5;return{x:cx+rx*Math.cos(a)-s/2,y:cy+ry*Math.sin(a)-s/2,w:s,h:s}})};
const lifted=r=>Z.hold&&Z.hold.x!=null?{...r,x:Z.hold.x-r.w/2,y:Z.hold.y-r.h/2}:r;
function tapCard(g,r,e,s,state){const C=L.col;pill(g,r,state===1?wash('#bbf7d0',.7):sheet(),state===2?C.rd:state===1?okc():state===3?C.vi:rim(),state?4:2);face(g,e,r.x+r.w/2,r.y+r.h*.3,Math.min(r.h*.36,44));txt(g,s,r.x+r.w/2,r.y+r.h*.72,r.w-12,12)}
function paintSpot(g){CHG.forEach((it,i)=>tapCard(g,grid(5)[i],it[0],it[1],Z.have.includes(i)?1:Z.oops===i?2:Z.glow===i?3:0));txt(g,`Changes found: ${Z.k} of 3`,L.W*.72,L.H*.9,L.W*.5,14)}
function paintHeart(g){const C=L.col,r=heartR(),cx=r.x+r.w/2,cy=r.y+r.h*.55,s=Math.min(r.w,r.h)*.48;g.fillStyle=wash('#fecdd3',.75);g.strokeStyle=Z.glow===0?C.vi:rim();g.lineWidth=Z.glow===0?5:2;
 g.beginPath();g.moveTo(cx,cy+s);g.bezierCurveTo(cx-s*1.9,cy-s*.2,cx-s*.7,cy-s*1.5,cx,cy-s*.55);g.bezierCurveTo(cx+s*.7,cy-s*1.5,cx+s*1.9,cy-s*.2,cx,cy+s);g.fill();g.stroke();
 if(!Z.have.length)txt(g,'Mia is moving house',cx,cy-s*.1,r.w*.7,13);Z.have.forEach((k,j)=>face(g,FEEL[k][0],cx+(j-(Z.have.length-1)/2)*s*.62,cy-s*.15,s*.5));
 if(Z.have.length>1)txt(g,Z.have.map(k=>FEEL[k][1]).join(' + '),cx,cy+s*.45,r.w*.8,12);face(g,'👧',L.W*.1,L.H*.3,Math.min(L.W*.12,56));
 faces().forEach((b,i)=>{if(Z.have.includes(i))return;const rr=Z.hold&&Z.hold.i===i?lifted(b):b;tapCard(g,rr,FEEL[i][0],FEEL[i][1],0)})}
function paintSame(g){const C=L.col;sides().forEach((r,i)=>{pill(g,r,wash(i?'#bfdbfe':'#fde68a'),i===Z.glow?C.vi:rim(),i===Z.glow?5:2);txt(g,i?'🔁 Stays the same':'✨ Changes',r.x+r.w/2,r.y+24,r.w-8,14);
  Z.have.filter(o=>o.at===i).forEach((o,j)=>face(g,DAY[o.k][0],r.x+r.w*(.3+.4*(j%2)),r.y+r.h*.5,Math.min(r.w*.26,48)))});
 const k=Z.hand[0];if(k!=null){const r=lifted(tray());pill(g,r,sheet(),Z.oops===k?C.rd:rim(),Z.oops===k?4:2);face(g,DAY[k][0],r.x+r.h*.5,r.y+r.h/2,r.h*.55);txt(g,DAY[k][1],r.x+r.h+(r.w-r.h)/2,r.y+r.h/2,r.w-r.h*1.1,13)}}
function paintWho(g){const C=L.col;face(g,'🧒',L.W/2,L.H*.47,Math.min(L.W*.14,64));txt(g,'Leo is worried',L.W/2,L.H*.62,L.W*.34,12);
 ring().forEach((r,i)=>tapCard(g,r,HELP[i][0],HELP[i][1],Z.have.includes(i)?1:Z.oops===i?2:Z.glow===i?3:0));
 Z.have.forEach(i=>{const r=ring()[i];g.strokeStyle=okc();g.lineWidth=3;g.setLineDash([5,5]);g.beginPath();g.moveTo(L.W/2,L.H*.47);g.lineTo(r.x+r.w/2,r.y+r.h/2);g.stroke();g.setLineDash([])})}
function paintTools(g){const C=L.col,t={x:L.W*.06,y:L.H*.06,w:L.W*.88,h:L.H*.18},f=Z.heat/4;pill(g,t,C.pn,rim());
 g.fillStyle=L.mix('#22c55e','#ef4444',f);L.paint.rrect(t.x+8,t.y+t.h*.55,Math.max(18,(t.w-16)*f),t.h*.3,8);g.fill();txt(g,`😟 Mia’s worry: ${['tiny','small','medium','big','very big'][Z.heat]}`,L.W/2,t.y+t.h*.3,t.w-16,13);
 TOOL.forEach((it,i)=>tapCard(g,grid(6)[i],it[0],it[1],Z.have.includes(i)?1:Z.oops===i?2:Z.glow===i?3:0))}
function draw(L){const g=L.ctx,C=L.col;g.fillStyle=L.mix(C.pn,'#dcfce7',C.dark?.03:.3);g.fillRect(0,0,L.W,L.H);const m=part();
 if(m==='spot')paintSpot(g);if(m==='heart')paintHeart(g);if(m==='same')paintSame(g);if(m==='who')paintWho(g);if(m==='tools'||m==='quiz'){if(m==='quiz'){Z.heat=0;Z.have=[0,1,3,5]}paintTools(g)}L.fx.draw(g)}
function glow(i){Z.glow=i;const v=ver;setTimeout(()=>{if(v===ver){Z.glow=-1;L.redraw()}},420)}
function bad(t){L.sound.miss();announce(t);L.redraw()}
function ok(t){Z.k++;Z.oops=-1;L.sound.pop();announce(t);pads();L.redraw();Z.run()}
function spot(i){if(Z.k>=3||Z.have.includes(i))return;glow(i);const it=CHG[i];if(!it[2]){Z.oops=i;return bad(`${it[1]} is the same every day. That is not a change. Look for something new.`)}Z.have.push(i);ok(`Yes! ${it[1]} is a change.`+(Z.k>=2?' Changes happen to everyone.':''))}
function feel(i){if(Z.k>=3||Z.have.includes(i))return;glow(0);Z.have.push(i);ok(Z.k?`Mia feels ${FEEL[i][1].toLowerCase()} too. Two feelings at once is OK!`:`Mia feels ${FEEL[i][1].toLowerCase()}. That is OK.`)}
function file(at){const k=Z.hand[0];if(k==null||Z.k>=4)return;glow(at);const it=DAY[k];if(it[2]!==at){Z.oops=k;return bad(at?`${it[1]} is new for Leo. That is a change.`:`${it[1]} is just like before. It stays the same.`)}
 Z.have.push({k:Z.hand.shift(),at});ok(at?`Yes! ${it[1]} stays the same. Same things help Leo feel safe.`:`Yes! ${it[1]} is new. That is a change.`)}
function ask(i){if(Z.k>=3||Z.have.includes(i))return;glow(i);const it=HELP[i];if(!it[2]){Z.oops=i;return bad(it[3])}Z.have.push(i);ok(it[3])}
function tool(i){if(Z.k>=3||Z.have.includes(i))return;glow(i);const it=TOOL[i];if(!it[2]){Z.oops=i;return bad(it[3])}Z.have.push(i);Z.heat=Math.max(1,Z.heat-1);ok(it[3]+(Z.k>=2?' Mia’s worry is small now.':''))}
function pads(){if(!row)return;row.innerHTML='';const m=part();if(m==='quiz'||Z.k>=aim())return;
 const P=(t,l,f)=>{const b=c.el('button',{type:'button',class:'lbtn ghost','aria-label':l},row,t);b.onclick=f};
 if(m==='spot')CHG.forEach((it,i)=>{if(!Z.have.includes(i))P(it[0]+' '+it[1],'Is it a change? '+it[1],()=>spot(i))});
 if(m==='heart')FEEL.forEach((it,i)=>{if(!Z.have.includes(i))P(it[0]+' '+it[1],`Mia feels ${it[1]}`,()=>feel(i))});
 if(m==='same'&&Z.hand.length)[['✨ Changes',0],['🔁 Stays the same',1]].forEach(([t,i])=>P(t,`${DAY[Z.hand[0]][1]}: ${t.slice(2)}`,()=>file(i)));
 if(m==='who')HELP.forEach((it,i)=>{if(!Z.have.includes(i))P(it[0]+' '+it[1],'Talk to '+it[1],()=>ask(i))});
 if(m==='tools')TOOL.forEach((it,i)=>{if(!Z.have.includes(i))P(it[0]+' '+it[1],'Try: '+it[1],()=>tool(i))})}
function press(p){const m=part();if(m==='quiz'||Z.k>=aim())return false;
 if(m==='spot'){const i=grid(5).findIndex(r=>on(p,r));if(i>=0)spot(i);return false}
 if(m==='who'){const i=ring().findIndex(r=>on(p,r));if(i>=0)ask(i);return false}
 if(m==='tools'){const i=grid(6).findIndex(r=>on(p,r));if(i>=0)tool(i);return false}
 if(m==='heart'){const i=faces().findIndex(r=>on(p,r));if(i>=0&&!Z.have.includes(i)){Z.hold={i,x:null,x0:p.x,y0:p.y};return true}if(on(p,heartR()))announce('Drag a feeling into the heart, or tap a button.');return false}
 if(Z.hand.length&&on(p,lifted(tray()))){Z.hold={x:null,x0:p.x,y0:p.y};return true}const i=sides().findIndex(r=>on(p,r));if(i>=0)file(i);return false}
function drag(p){const h=Z.hold;if(h&&(h.x!=null||Math.hypot(p.x-h.x0,p.y-h.y0)>8)){h.x=p.x;h.y=p.y;L.redraw()}}
function drop(p){const h=Z.hold,m=part();Z.hold=null;if(!h)return;
 if(m==='heart'){if(h.x==null||on(p,heartR()))return feel(h.i);announce('Drop the feeling inside the heart.');return L.redraw()}
 const i=sides().findIndex(r=>on(p,r));if(h.x==null||i<0){announce('Drag the card into a box, or tap a button.');return L.redraw()}file(i)}
const close=(n,test,msg)=>()=>{if(L.step===n&&test()&&(!steps[n].predict||L.pred[n]!=null))L.done(msg+L.reveal(n))};
function demo(fs,gap){const v=++ver;fs.forEach((f,j)=>setTimeout(()=>{if(v===ver)f()},L.reduced()?j*40+30:(j+1)*(gap||450)))}
const reset=(hand,more)=>{ver++;Object.assign(Z,zero(),{hand},more||{})};
const steps=[
{h:'What is a change?',p:'A change is when something is new or different. Tap the 3 changes.',task:'Find 3 changes',
 show:()=>{steps[0].go();demo([0,2,3].map(i=>()=>spot(i)))},go:()=>{reset([]);announce('Tap the things that are changes.');pads();Z.run=close(0,()=>Z.k>=3,'New baby, new house, new teacher: these are changes. Brushing teeth stays the same.')}},
{h:'Lots of feelings',p:'Mia is moving to a new house. How might she feel? Drag 3 feelings into her heart.',predict:{q:'Can Mia feel sad and excited at the same time?',opts:['No, just one feeling','Yes, both at once'],ans:1},task:'Fill the heart',
 show:()=>{steps[1].go();demo([1,2,0].map(i=>()=>feel(i)))},go:()=>{reset([]);announce('Drag a feeling into Mia’s heart.');pads();Z.run=close(1,()=>Z.k>=3,'A change can bring lots of feelings at once. Every one of them is OK.')}},
{h:'What stays the same?',p:'Leo starts a new school. Some things change. Some things stay the same. Sort the cards.',task:'Sort 4 cards',
 show:()=>{steps[2].go();demo([0,1,2,3].map(()=>()=>file(DAY[Z.hand[0]][2])))},go:()=>{reset([0,1,2,3]);announce('Does it change, or stay the same?');pads();Z.run=close(2,()=>Z.k>=4,'Lots stays the same, like the bedtime story. Same things help you feel safe.')}},
{h:'Who can help?',p:'Leo feels worried about his new school. Tap 3 people he can talk to.',predict:{q:'Leo feels worried. What helps most?',opts:['Keep it a secret','Tell a grown-up he trusts'],ans:1},task:'Find 3 helpers',
 show:()=>{steps[3].go();demo([0,1,3].map(i=>()=>ask(i)))},go:()=>{reset([]);announce('Who can Leo talk to?');pads();Z.run=close(3,()=>Z.k>=3,'Talk to a grown-up you trust, like a teacher, Dad or Grandma.')}},
{h:'Coping tools',p:'Mia’s worry is very big. Tap 3 tools that help her worry get smaller.',predict:{q:'Mia feels worried about her new house. What will help?',opts:['Hide under the bed all day','Take her teddy and talk about it'],ans:1},task:'Shrink the worry',
 show:()=>{steps[4].go();demo([0,1,3].map(i=>()=>tool(i)))},go:()=>{reset([],{heat:4});announce('Tap a tool that helps.');pads();Z.run=close(4,()=>Z.k>=3,'Take a toy, breathe slowly, and talk about it. The worry gets smaller.')}},
{h:'Challenge',p:'',go:()=>{reset([]);quiz()}}];
steps.forEach(s=>{if(s.task)s.onPredict=()=>Z.run()});
const QS=[['Which one is a change?',[['Getting a new teacher','ok'],['Brushing your teeth','same'],['Sleeping in your bed','same2']]],
 ['You move house. You feel sad AND excited. Is that OK?',[['Yes, you can feel both','ok'],['No, pick one','onefeel'],['No, hide it','hide']]],
 ['A change feels hard. Who can you tell?',[['A grown-up you trust','ok'],['Nobody','secret'],['A stranger','stranger']]],
 ['What helps when you feel worried about a change?',[['Talk about it','ok'],['Shout and kick','shout'],['Hide all day','hide']]],
 ['You start a new school. What can stay the same?',[['Your bedtime story','ok'],['Your classroom','new'],['Your teacher','new']]]];
function why(t){let m='Look back at the lab: changes bring feelings, and there are people and tools that help.';
 if(t==='same')m='You brush your teeth every day. That stays the same. A change is something new.';
 if(t==='same2')m='Your own bed is the same every night. Look for something new or different.';
 if(t==='onefeel')m='You can have two feelings at once. Sad and excited together is OK.';
 if(t==='hide')m='Hiding keeps the feeling stuck inside. Talk to someone or try a tool.';
 if(t==='secret')m='Keeping it secret makes it feel bigger. Tell a grown-up you trust.';
 if(t==='stranger')m='You do not know a stranger. Tell a teacher or someone in your family.';
 if(t==='shout')m='Shouting can hurt people and does not fix the worry. Try slow breaths or talking.';
 if(t==='new')m='At a new school that is new. Things at home, like your bedtime story, stay the same.';return m}
function quiz(){cur++;const[q,ops]=QS[cur%QS.length],r=cur%3;
 chal.innerHTML=`<p><b>${q}</b></p><div class="fl-pick" role="group" aria-label="Answers"></div><p class="fl-fb" role="status" aria-live="polite"></p>`;
 const box=chal.querySelector('.fl-pick');ops.slice(r).concat(ops.slice(0,r)).forEach(([o,t])=>{const b=c.el('button',{type:'button',class:'lbtn'},box,o);b.onclick=()=>judge(t)});announce('Challenge: '+q);L.redraw()}
function judge(t){chal.querySelectorAll('.fl-pick button').forEach(b=>b.disabled=true);const fb=chal.querySelector('.fl-fb'),yes=t==='ok';
 if(yes){wins++;L.win()}else{wins=0;L.sound.miss()}fb.innerHTML=`${yes?'✓ Yes! Well done.':'✗ '+why(t)}${yes?` Streak: ${wins}.`:''} <button type="button" class="linkish">Another →</button>`;fb.querySelector('button').onclick=quiz}
L=FK.shell(c,{steps,ratio:.62,tall:1.2,draw,onStep:L=>{chal.hidden=L.step!==5;row.hidden=L.step===5;pads()},
 init:L=>{const E=c.el,w=E('div',{class:'fl-below'},L.below);row=E('div',{class:'fl-ctl',role:'group','aria-label':'Lab controls'},w);chal=E('div',{class:'fl-chal'},L.below);const A=L;A.gest({down:press,move:drag,up:drop});pads()}});
L.start()})})();
